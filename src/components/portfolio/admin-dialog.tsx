"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  ClipboardCopy,
  Clock3,
  Inbox,
  Loader2,
  Lock,
  LogOut,
  RefreshCw,
  Sparkles,
  Trash2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type RequestRow = {
  id: string;
  name: string;
  contact: string;
  taskType: string;
  message: string;
  status: string;
  createdAt: string;
};

type Stats = {
  total: number;
  new: number;
  in_progress: number;
  done: number;
};

type StatusFilter = "all" | "new" | "in_progress" | "done";

const taskTypeLabels: Record<string, string> = {
  landing: "Лендинг",
  multipage: "Многостраничный сайт",
  webapp: "Веб-сервис / SPA",
  bot: "Бот или автоматизация",
  other: "Другое",
};

const statusLabels: Record<string, string> = {
  new: "Новая",
  in_progress: "В работе",
  done: "Выполнено",
};

const statusBadge: Record<string, string> = {
  new: "border-fuchsia-400/30 bg-fuchsia-500/15 text-fuchsia-300",
  in_progress: "border-amber-400/30 bg-amber-500/15 text-amber-300",
  done: "border-emerald-400/30 bg-emerald-500/15 text-emerald-300",
};

const fieldClass =
  "rounded-xl border-white/10 bg-white/[0.05] text-white placeholder:text-zinc-500";

const dateFmt = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

export default function AdminDialog() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);
  const [rows, setRows] = useState<RequestRow[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<RequestRow | null>(null);

  const loadRequests = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/requests", { cache: "no-store" });
      if (res.status === 401) {
        setAuthed(false);
        return;
      }
      const data = (await res.json().catch(() => null)) as
        | { ok: boolean; stats: Stats; requests: RequestRow[] }
        | null;
      if (res.ok && data?.ok) {
        setAuthed(true);
        setStats(data.stats);
        setRows(data.requests);
      } else {
        setAuthed(false);
      }
    } catch {
      toast({
        title: "Ошибка сети",
        description: "Не удалось загрузить заявки.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // При каждом открытии диалога проверяем авторизацию и тянем данные
  useEffect(() => {
    if (open) {
      setLoginError(null);
      setPassword("");
      loadRequests();
    }
  }, [open, loadRequests]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok: boolean; error?: string }
        | null;
      if (res.ok && data?.ok) {
        setPassword("");
        await loadRequests();
      } else {
        setLoginError(data?.error ?? "Неверный пароль");
      }
    } catch {
      setLoginError("Ошибка сети, попробуйте ещё раз");
    } finally {
      setLoggingIn(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => null);
    setAuthed(false);
    setRows([]);
    setStats(null);
    toast({ title: "Вы вышли из админ-панели" });
  }

  async function handleStatusChange(id: string, status: string) {
    setBusyId(id);
    const prev = rows;
    // оптимистично обновляем UI
    setRows((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));
    try {
      const res = await fetch("/api/admin/requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error();
      // перезагружаем список и статистику
      await loadRequests();
    } catch {
      setRows(prev);
      toast({
        title: "Не удалось изменить статус",
        variant: "destructive",
      });
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    const target = deleteTarget;
    setDeleteTarget(null);
    setBusyId(target.id);
    try {
      const res = await fetch(`/api/admin/requests?id=${encodeURIComponent(target.id)}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      setRows((r) => r.filter((x) => x.id !== target.id));
      toast({ title: "Заявка удалена" });
      await loadRequests();
    } catch {
      toast({ title: "Не удалось удалить заявку", variant: "destructive" });
    } finally {
      setBusyId(null);
    }
  }

  function copyContact(text: string) {
    navigator.clipboard
      .writeText(text)
      .then(() => toast({ title: "Контакт скопирован", description: text }))
      .catch(() =>
        toast({ title: "Не удалось скопировать", variant: "destructive" })
      );
  }

  const visibleRows = useMemo(
    () => (filter === "all" ? rows : rows.filter((r) => r.status === filter)),
    [rows, filter]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label="Админ-панель"
          title="Админ-панель"
          className="grid size-8 place-items-center rounded-lg border border-white/10 text-zinc-500 transition-colors hover:border-white/25 hover:text-zinc-200"
        >
          <Lock className="size-3.5" aria-hidden="true" />
        </button>
      </DialogTrigger>

      <DialogContent className="max-h-[85vh] overflow-y-auto rounded-2xl border-white/10 bg-[#111113] text-zinc-50 sm:max-w-2xl">
        {authed === null || (loading && !authed) ? (
          <div className="grid place-items-center py-16">
            {/* sr-only заголовок — требование доступности DialogContent */}
            <DialogTitle className="sr-only">Админ-панель</DialogTitle>
            <DialogDescription className="sr-only">
              Загрузка заявок
            </DialogDescription>
            <Loader2 className="size-7 animate-spin text-fuchsia-400" aria-hidden="true" />
          </div>
        ) : !authed ? (
          /* ---------- Логин ---------- */
          <div>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 font-display text-xl">
                <Lock className="size-4 text-fuchsia-400" aria-hidden="true" />
                Админ-панель
              </DialogTitle>
              <DialogDescription className="text-zinc-400">
                Введите пароль, чтобы посмотреть заявки с формы
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleLogin} className="mt-6 grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="admin-pass" className="text-zinc-300">
                  Пароль
                </Label>
                <Input
                  id="admin-pass"
                  type="password"
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={fieldClass}
                  autoComplete="current-password"
                />
                {loginError && (
                  <p className="text-xs text-red-400" role="alert">
                    {loginError}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                disabled={loggingIn || password.length === 0}
                className="h-11 rounded-xl bg-white font-bold text-black transition-all hover:bg-white active:scale-95 disabled:opacity-60"
              >
                {loggingIn ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    Проверяю…
                  </>
                ) : (
                  "Войти"
                )}
              </Button>
            </form>
          </div>
        ) : (
          /* ---------- Дашборд ---------- */
          <div>
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between gap-3 font-display text-xl">
                <span className="flex items-center gap-2">
                  <Inbox className="size-5 text-fuchsia-400" aria-hidden="true" />
                  Заявки
                </span>
                <span className="flex items-center gap-1.5">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Обновить"
                    title="Обновить"
                    onClick={loadRequests}
                    className="size-8 rounded-lg text-zinc-400 hover:bg-white/10 hover:text-white"
                  >
                    <RefreshCw
                      className={cn("size-4", loading && "animate-spin")}
                      aria-hidden="true"
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Выйти"
                    title="Выйти"
                    onClick={handleLogout}
                    className="size-8 rounded-lg text-zinc-400 hover:bg-white/10 hover:text-white"
                  >
                    <LogOut className="size-4" aria-hidden="true" />
                  </Button>
                </span>
              </DialogTitle>
              <DialogDescription className="text-zinc-400">
                Заявки с формы «Обсудить задачу»
              </DialogDescription>
            </DialogHeader>

            {/* Статистика */}
            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {[
                { label: "Всего", value: stats?.total ?? 0, icon: Inbox, tint: "text-zinc-300" },
                { label: "Новые", value: stats?.new ?? 0, icon: Sparkles, tint: "text-fuchsia-300" },
                { label: "В работе", value: stats?.in_progress ?? 0, icon: Clock3, tint: "text-amber-300" },
                { label: "Выполнено", value: stats?.done ?? 0, icon: CheckCircle2, tint: "text-emerald-300" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-white/10 bg-white/[0.04] p-3"
                >
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                    <s.icon className={cn("size-3.5", s.tint)} aria-hidden="true" />
                    {s.label}
                  </div>
                  <div className="mt-1 font-display text-2xl font-bold">{s.value}</div>
                </div>
              ))}
            </div>

            {/* Фильтр */}
            <div className="mt-4 flex items-center gap-2">
              <Select value={filter} onValueChange={(v) => setFilter(v as StatusFilter)}>
                <SelectTrigger
                  aria-label="Фильтр по статусу"
                  className={cn("h-9 w-44 rounded-xl text-sm", fieldClass)}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-white/10 bg-[#141416] text-white">
                  <SelectItem value="all" className="rounded-lg focus:bg-white/10">
                    Все заявки
                  </SelectItem>
                  <SelectItem value="new" className="rounded-lg focus:bg-white/10">
                    Только новые
                  </SelectItem>
                  <SelectItem value="in_progress" className="rounded-lg focus:bg-white/10">
                    В работе
                  </SelectItem>
                  <SelectItem value="done" className="rounded-lg focus:bg-white/10">
                    Выполненные
                  </SelectItem>
                </SelectContent>
              </Select>
              <span className="text-xs text-zinc-500">
                {visibleRows.length} из {rows.length}
              </span>
            </div>

            {/* Список заявок */}
            <div className="mt-4 max-h-[46vh] space-y-3 overflow-y-auto pr-1">
              {visibleRows.length === 0 ? (
                <div className="grid place-items-center gap-2 rounded-2xl border border-dashed border-white/10 py-12 text-center">
                  <Inbox className="size-8 text-zinc-600" aria-hidden="true" />
                  <p className="text-sm text-zinc-500">
                    {rows.length === 0
                      ? "Заявок пока нет — они появятся здесь после отправки формы"
                      : "В этом статусе заявок нет"}
                  </p>
                </div>
              ) : (
                visibleRows.map((r) => (
                  <article
                    key={r.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-white/20"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="font-display text-base font-bold">{r.name}</span>
                        <span
                          className={cn(
                            "rounded-full border px-2.5 py-0.5 text-[11px] font-semibold",
                            statusBadge[r.status] ?? statusBadge.new
                          )}
                        >
                          {statusLabels[r.status] ?? r.status}
                        </span>
                      </div>
                      <time
                        dateTime={r.createdAt}
                        className="text-xs text-zinc-500"
                      >
                        {dateFmt.format(new Date(r.createdAt))}
                      </time>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                      <button
                        type="button"
                        onClick={() => copyContact(r.contact)}
                        title="Скопировать контакт"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.06] px-2.5 py-1 font-medium text-zinc-200 transition-colors hover:bg-white/15"
                      >
                        <ClipboardCopy className="size-3.5" aria-hidden="true" />
                        {r.contact}
                      </button>
                      <span className="rounded-lg border border-white/10 px-2.5 py-1 text-xs text-zinc-400">
                        {taskTypeLabels[r.taskType] ?? r.taskType}
                      </span>
                    </div>

                    <p className="mt-2.5 whitespace-pre-line text-sm leading-relaxed text-zinc-300">
                      {r.message}
                    </p>

                    <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3">
                      <Select
                        value={r.status}
                        onValueChange={(v) => handleStatusChange(r.id, v)}
                      >
                        <SelectTrigger
                          aria-label="Статус заявки"
                          className={cn("h-8 w-40 rounded-lg text-xs", fieldClass)}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-white/10 bg-[#141416] text-white">
                          <SelectItem value="new" className="rounded-lg focus:bg-white/10">
                            Новая
                          </SelectItem>
                          <SelectItem value="in_progress" className="rounded-lg focus:bg-white/10">
                            В работе
                          </SelectItem>
                          <SelectItem value="done" className="rounded-lg focus:bg-white/10">
                            Выполнено
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={busyId === r.id}
                        onClick={() => setDeleteTarget(r)}
                        className="rounded-lg text-zinc-500 hover:bg-red-500/10 hover:text-red-400"
                      >
                        {busyId === r.id ? (
                          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                        ) : (
                          <Trash2 className="size-4" aria-hidden="true" />
                        )}
                        Удалить
                      </Button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        )}
      </DialogContent>

      {/* Подтверждение удаления */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent className="rounded-2xl border-white/10 bg-[#141416] text-zinc-50">
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить заявку?</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              Заявка от {deleteTarget?.name} будет удалена безвозвратно.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl border-white/10 bg-transparent text-zinc-300 hover:bg-white/10 hover:text-white">
              Отмена
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="rounded-xl bg-red-500 text-white hover:bg-red-600"
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}
