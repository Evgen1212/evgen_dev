import { db } from "../../utils/db";
import { ADMIN_COOKIE, isValidToken } from "../../utils/admin-auth";

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

// DELETE: удалить заявку (?id=...)
export default defineEventHandler(async (event) => {
  if (!isAuthed(event)) unauthorized();

  try {
    const id = getQuery(event).id;
    if (typeof id !== "string" || !id) {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        data: { ok: false, error: "Не указан id" },
      });
    }

    const existing = await db.contactRequest.findUnique({ where: { id } });
    if (!existing) {
      throw createError({
        statusCode: 404,
        statusMessage: "Not Found",
        data: { ok: false, error: "Заявка не найдена" },
      });
    }

    await db.contactRequest.delete({ where: { id } });
    return { ok: true };
  } catch (error) {
    if (error && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error("[api/admin/requests DELETE] failed:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      data: { ok: false, error: "Не удалось удалить заявку" },
    });
  }
});
