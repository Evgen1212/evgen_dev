import {
  ADMIN_COOKIE,
  COOKIE_MAX_AGE,
  checkPassword,
  expectedToken,
  loginThrottled,
  registerFail,
} from "../../utils/admin-auth";

export default defineEventHandler(async (event) => {
  try {
    const ip =
      getRequestHeader(event, "x-forwarded-for")?.split(",")[0]?.trim() ??
      "local";

    if (loginThrottled(ip)) {
      throw createError({
        statusCode: 429,
        statusMessage: "Too Many Requests",
        data: {
          ok: false,
          error: "Слишком много попыток. Подождите 10 минут.",
        },
      });
    }

    const body = await readBody<{ password?: string }>(event).catch(() => null);

    if (
      !body ||
      typeof body.password !== "string" ||
      !checkPassword(body.password)
    ) {
      registerFail(ip);
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
        data: { ok: false, error: "Неверный пароль" },
      });
    }

    setCookie(event, ADMIN_COOKIE, expectedToken(), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });
    return { ok: true };
  } catch (error) {
    if (error && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error("[api/admin/login] failed:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      data: { ok: false, error: "Внутренняя ошибка" },
    });
  }
});
