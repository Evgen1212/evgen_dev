import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  COOKIE_MAX_AGE,
  checkPassword,
  expectedToken,
  loginThrottled,
  registerFail,
} from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";

    if (loginThrottled(ip)) {
      return NextResponse.json(
        { ok: false, error: "Слишком много попыток. Подождите 10 минут." },
        { status: 429 }
      );
    }

    const body = (await request.json().catch(() => null)) as {
      password?: string;
    } | null;

    if (
      !body ||
      typeof body.password !== "string" ||
      !checkPassword(body.password)
    ) {
      registerFail(ip);
      return NextResponse.json(
        { ok: false, error: "Неверный пароль" },
        { status: 401 }
      );
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set(ADMIN_COOKIE, expectedToken(), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });
    return res;
  } catch (error) {
    console.error("[api/admin/login] failed:", error);
    return NextResponse.json(
      { ok: false, error: "Внутренняя ошибка" },
      { status: 500 }
    );
  }
}
