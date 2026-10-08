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

// GET: список заявок + статистика
export default defineEventHandler(async (event) => {
  if (!isAuthed(event)) unauthorized();

  try {
    const requests = await db.contactRequest.findMany({
      orderBy: { createdAt: "desc" },
      take: 300,
    });

    const stats = {
      total: requests.length,
      new: requests.filter((r) => r.status === "new").length,
      in_progress: requests.filter((r) => r.status === "in_progress").length,
      done: requests.filter((r) => r.status === "done").length,
    };

    return { ok: true, stats, requests };
  } catch (error) {
    console.error("[api/admin/requests GET] failed:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      data: { ok: false, error: "Не удалось загрузить заявки" },
    });
  }
});
