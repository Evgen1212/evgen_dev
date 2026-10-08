import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { ADMIN_COOKIE, isValidToken } from "@/lib/admin-auth";

const STATUSES = ["new", "in_progress", "done"] as const;

const patchSchema = z.object({
  id: z.string().min(1),
  status: z.enum(STATUSES),
});

function unauthorized() {
  return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
}

function isAuthed(request: NextRequest): boolean {
  return isValidToken(request.cookies.get(ADMIN_COOKIE)?.value);
}

// GET: список заявок + статистика
export async function GET(request: NextRequest) {
  if (!isAuthed(request)) return unauthorized();

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

    return NextResponse.json({ ok: true, stats, requests });
  } catch (error) {
    console.error("[api/admin/requests GET] failed:", error);
    return NextResponse.json(
      { ok: false, error: "Не удалось загрузить заявки" },
      { status: 500 }
    );
  }
}

// PATCH: сменить статус заявки
export async function PATCH(request: NextRequest) {
  if (!isAuthed(request)) return unauthorized();

  try {
    const body = await request.json().catch(() => null);
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Некорректные данные" },
        { status: 400 }
      );
    }

    const existing = await db.contactRequest.findUnique({
      where: { id: parsed.data.id },
    });
    if (!existing) {
      return NextResponse.json(
        { ok: false, error: "Заявка не найдена" },
        { status: 404 }
      );
    }

    const updated = await db.contactRequest.update({
      where: { id: parsed.data.id },
      data: { status: parsed.data.status },
    });

    return NextResponse.json({ ok: true, request: updated });
  } catch (error) {
    console.error("[api/admin/requests PATCH] failed:", error);
    return NextResponse.json(
      { ok: false, error: "Не удалось обновить заявку" },
      { status: 500 }
    );
  }
}

// DELETE: удалить заявку (?id=...)
export async function DELETE(request: NextRequest) {
  if (!isAuthed(request)) return unauthorized();

  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { ok: false, error: "Не указан id" },
        { status: 400 }
      );
    }

    const existing = await db.contactRequest.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { ok: false, error: "Заявка не найдена" },
        { status: 404 }
      );
    }

    await db.contactRequest.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/admin/requests DELETE] failed:", error);
    return NextResponse.json(
      { ok: false, error: "Не удалось удалить заявку" },
      { status: 500 }
    );
  }
}
