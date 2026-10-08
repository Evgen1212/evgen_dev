import { z } from "zod";
import { db } from "../../utils/db";
import { ADMIN_COOKIE, isValidToken } from "../../utils/admin-auth";

const STATUSES = ["new", "in_progress", "done"] as const;

const patchSchema = z.object({
  id: z.string().min(1),
  status: z.enum(STATUSES),
});

function unauthorized() {
  throw createError({
    statusCode: 401,
    statusMessage: "Unauthorized",
    data: { ok: false, error: "unauthorized" },
  });
}

function isAuthed(event: any): boolean {
  return isValidToken(getCookie(event, ADMIN_COOKIE));
}

// PATCH: сменить статус заявки
export default defineEventHandler(async (event) => {
  if (!isAuthed(event)) unauthorized();

  try {
    const body = await readBody(event).catch(() => null);
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success) {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        data: { ok: false, error: "Некорректные данные" },
      });
    }

    const existing = await db.contactRequest.findUnique({
      where: { id: parsed.data.id },
    });
    if (!existing) {
      throw createError({
        statusCode: 404,
        statusMessage: "Not Found",
        data: { ok: false, error: "Заявка не найдена" },
      });
    }

    const updated = await db.contactRequest.update({
      where: { id: parsed.data.id },
      data: { status: parsed.data.status },
    });

    return { ok: true, request: updated };
  } catch (error) {
    if (error && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error("[api/admin/requests PATCH] failed:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      data: { ok: false, error: "Не удалось обновить заявку" },
    });
  }
});
