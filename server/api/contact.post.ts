import { z } from "zod";
import { db } from "../utils/db";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Имя слишком короткое").max(60),
  contact: z.string().trim().min(3, "Укажите контакт").max(120),
  taskType: z
    .enum(["landing", "multipage", "webapp", "bot", "other"])
    .default("other"),
  message: z.string().trim().min(10, "Опишите задачу подробнее").max(2000),
  // honeypot — заполняется только ботами
  website: z.string().max(0).optional(),
});

const TASK_LABELS: Record<string, string> = {
  landing: "Лендинг",
  multipage: "Многостраничный сайт",
  webapp: "Веб-сервис",
  bot: "Бот / автоматизация",
  other: "Другое",
};

/**
 * Уведомление в Telegram о новой заявке.
 * Опционально: срабатывает только если заданы TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID.
 * Ошибки не влияют на ответ клиенту — заявка уже сохранена в БД.
 */
async function notifyTelegram(req: {
  name: string;
  contact: string;
  taskType: string;
  message: string;
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const text = [
    "🆕 Новая заявка с сайта-портфолио",
    `Имя: ${req.name}`,
    `Контакт: ${req.contact}`,
    `Тип: ${TASK_LABELS[req.taskType] ?? req.taskType}`,
    `Сообщение: ${req.message.slice(0, 800)}`,
    new Date().toLocaleString("ru-RU"),
  ].join("\n");

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      }),
    });
    if (!res.ok) {
      console.error(
        "[api/contact] telegram notify failed:",
        res.status,
        await res.text().catch(() => "")
      );
    }
  } catch (error) {
    console.error("[api/contact] telegram notify error:", error);
  }
}

// простой in-memory rate-limit: 5 заявок с одного IP в 10 минут
const RATE_LIMIT_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_MS);
  if (arr.length >= RATE_LIMIT_MAX) {
    hits.set(ip, arr);
    return true;
  }
  arr.push(now);
  hits.set(ip, arr);
  return false;
}

export default defineEventHandler(async (event) => {
  try {
    const ip =
      getRequestHeader(event, "x-forwarded-for")?.split(",")[0]?.trim() ??
      "local";

    if (rateLimited(ip)) {
      throw createError({
        statusCode: 429,
        statusMessage: "Too Many Requests",
        data: { ok: false, error: "Слишком много заявок. Попробуйте позже." },
      });
    }

    const body = await readBody<Record<string, unknown>>(event).catch(
      () => null
    );
    if (!body) {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        data: { ok: false, error: "Некорректный запрос" },
      });
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        data: {
          ok: false,
          error: first?.message ?? "Проверьте поля формы",
        },
      });
    }

    const { name, contact, taskType, message } = parsed.data;

    const saved = await db.contactRequest.create({
      data: { name, contact, taskType, message },
    });

    // не блокируем ответ — уведомление уходит в фоне
    void notifyTelegram({ name, contact, taskType, message });

    return { ok: true, id: saved.id };
  } catch (error) {
    // createError уже несёт нужный статус — пробрасываем как есть
    if (error && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error("[api/contact] failed:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      data: {
        ok: false,
        error: "Не удалось отправить заявку. Напишите в Telegram.",
      },
    });
  }
});
