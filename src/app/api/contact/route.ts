import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

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

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";

    if (rateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: "Слишком много заявок. Попробуйте позже." },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { ok: false, error: "Некорректный запрос" },
        { status: 400 }
      );
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return NextResponse.json(
        { ok: false, error: first?.message ?? "Проверьте поля формы" },
        { status: 400 }
      );
    }

    const { name, contact, taskType, message } = parsed.data;

    const saved = await db.contactRequest.create({
      data: { name, contact, taskType, message },
    });

    return NextResponse.json({ ok: true, id: saved.id });
  } catch (error) {
    console.error("[api/contact] failed:", error);
    return NextResponse.json(
      { ok: false, error: "Не удалось отправить заявку. Напишите в Telegram." },
      { status: 500 }
    );
  }
}
