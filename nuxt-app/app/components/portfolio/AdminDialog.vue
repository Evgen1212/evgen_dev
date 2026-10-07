<script setup lang="ts">
import {
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ClipboardCopy,
  Clock3,
  Download,
  Inbox,
  Loader2,
  Lock,
  LogOut,
  RefreshCw,
  Search,
  Sparkles,
  Trash2,
  TrendingUp,
  X,
} from "lucide-vue-next";

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

type ChartDay = { date: Date; count: number };

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

/** Пагинация списка заявок: сколько строк показывать за раз */
const PAGE_SIZE = 10;

const fieldClass =
  "rounded-xl border-white/10 bg-white/[0.05] text-white placeholder:text-zinc-500";

// ─── Базовые классы shadcn-примитивов (порт src/components/ui/*) — cn() смержит с кастомными ───
const inputBase =
  "border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive";
const labelBase = "flex items-center gap-2 text-sm leading-none font-medium select-none";
const btnBase =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive";
const btnDefault = "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90";
const btnGhost = "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50";
const btnOutline =
  "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50";
const btnSizeIcon = "size-9";
const btnSizeSm = "h-8 rounded-md gap-1.5 px-3";
const selectTriggerBase =
  "border-input data-[placeholder]:text-muted-foreground dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 h-9";

/** Русская плюрализация: 1 заявка / 2 заявки / 5 заявок */
function pluralRequests(n: number) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} заявка`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${n} заявки`;
  return `${n} заявок`;
}

const dateFmt = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});
const chartDayFmt = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "short" });
const chartTitleFmt = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" });

const { toast } = useToast();

const open = ref(false);
const authed = ref<boolean | null>(null);
const password = ref("");
const loginError = ref<string | null>(null);
const loggingIn = ref(false);
const rows = ref<RequestRow[]>([]);
const stats = ref<Stats | null>(null);
const filter = ref<StatusFilter>("all");
const query = ref("");
const sortDir = ref<"desc" | "asc">("desc");
const shown = ref(PAGE_SIZE);
const loading = ref(false);
const busyId = ref<string | null>(null);
const deleteTarget = ref<RequestRow | null>(null);

const passwordInput = ref<HTMLInputElement | null>(null);

async function loadRequests() {
  loading.value = true;
  try {
    const data = await $fetch<{ ok: boolean; stats: Stats; requests: RequestRow[] }>(
      "/api/admin/requests",
      { cache: "no-store" }
    );
    if (data?.ok) {
      authed.value = true;
      stats.value = data.stats;
      rows.value = data.requests;
    } else {
      authed.value = false;
    }
  } catch (e) {
    const status =
      (e as any)?.response?.status ?? (e as any)?.statusCode ?? (e as any)?.status;
    if (status === 401) {
      authed.value = false;
      return;
    }
    toast({
      title: "Ошибка сети",
      description: "Не удалось загрузить заявки.",
      variant: "destructive",
    });
  } finally {
    loading.value = false;
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key !== "Escape") return;
  if (deleteTarget.value) {
    deleteTarget.value = null;
    return;
  }
  if (open.value) open.value = false;
}

// При каждом открытии диалога проверяем авторизацию, тянем данные,
// вешаем Escape и блокируем скролл (порт radix-диалога)
watch(open, (o) => {
  if (o) {
    loginError.value = null;
    password.value = "";
    query.value = "";
    filter.value = "all";
    sortDir.value = "desc";
    shown.value = PAGE_SIZE;
    void loadRequests();
    window.addEventListener("keydown", onKeydown);
    document.body.style.overflow = "hidden";
  } else {
    window.removeEventListener("keydown", onKeydown);
    document.body.style.overflow = "";
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
  document.body.style.overflow = "";
});

// фокус в поле пароля при показе формы логина (аналог autoFocus в исходнике)
watch([open, authed], async () => {
  if (open.value && authed.value === false) {
    await nextTick();
    passwordInput.value?.focus();
  }
});

async function handleLogin() {
  loggingIn.value = true;
  loginError.value = null;
  try {
    const data = await $fetch<{ ok: boolean; error?: string }>("/api/admin/login", {
      method: "POST",
      body: { password: password.value },
    });
    if (data?.ok) {
      password.value = "";
      await loadRequests();
    } else {
      loginError.value = (data as any)?.error ?? "Неверный пароль";
      toast({ title: loginError.value, variant: "destructive" });
    }
  } catch (e) {
    loginError.value =
      (e as any)?.data?.data?.error ??
      (e as any)?.data?.message ??
      "Ошибка сети, попробуйте ещё раз";
    toast({ title: loginError.value, variant: "destructive" });
  } finally {
    loggingIn.value = false;
  }
}

async function handleLogout() {
  await $fetch("/api/admin/logout", { method: "POST" }).catch(() => null);
  authed.value = false;
  rows.value = [];
  stats.value = null;
  toast({ title: "Вы вышли из админ-панели" });
}

async function handleStatusChange(id: string, status: string) {
  busyId.value = id;
  const prev = rows.value;
  // оптимистично обновляем UI (новые объекты — снапшот prev не затрагивается)
  rows.value = rows.value.map((x) => (x.id === id ? { ...x, status } : x));
  try {
    await $fetch("/api/admin/requests", { method: "PATCH", body: { id, status } });
    // перезагружаем список и статистику
    await loadRequests();
  } catch {
    rows.value = prev;
    toast({ title: "Не удалось изменить статус", variant: "destructive" });
  } finally {
    busyId.value = null;
  }
}

function onRowStatusChange(r: RequestRow, e: Event) {
  const status = (e.target as HTMLSelectElement).value;
  void handleStatusChange(r.id, status);
}

async function handleDelete() {
  const target = deleteTarget.value;
  if (!target) return;
  deleteTarget.value = null;
  busyId.value = target.id;
  try {
    await $fetch("/api/admin/requests", { method: "DELETE", query: { id: target.id } });
    rows.value = rows.value.filter((x) => x.id !== target.id);
    toast({ title: "Заявка удалена" });
    await loadRequests();
  } catch {
    toast({ title: "Не удалось удалить заявку", variant: "destructive" });
  } finally {
    busyId.value = null;
  }
}

/** Экспорт всех заявок в CSV (BOM + «;» — дружелюбно к Excel/Numbers) */
function exportCsv() {
  if (rows.value.length === 0) return;
  const esc = (v: string) => `"${String(v).replace(/"/g, '""')}"`;
  const head = ["Дата", "Имя", "Контакт", "Тип задачи", "Статус", "Сообщение"]
    .map(esc)
    .join(";");
  const lines = rows.value.map((r) =>
    [
      new Date(r.createdAt).toLocaleString("ru-RU"),
      r.name,
      r.contact,
      taskTypeLabels[r.taskType] ?? r.taskType,
      statusLabels[r.status] ?? r.status,
      r.message,
    ]
      .map(esc)
      .join(";")
  );
  const csv = "\uFEFF" + [head, ...lines].join("\r\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `portfolio-requests-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  toast({
    title: "CSV выгружен",
    description: `В файле ${rows.value.length} заявок`,
  });
}

function copyContact(text: string) {
  navigator.clipboard
    .writeText(text)
    .then(() => toast({ title: "Контакт скопирован", description: text }))
    .catch(() => toast({ title: "Не удалось скопировать", variant: "destructive" }));
}

const todayCount = computed(() => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  return rows.value.filter((r) => new Date(r.createdAt) >= start).length;
});

/** Последние 14 дней: количество заявок по дням (для мини-графика) */
const chart = computed<ChartDay[]>(() => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const days: ChartDay[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(start);
    d.setDate(d.getDate() - i);
    days.push({ date: d, count: 0 });
  }
  for (const r of rows.value) {
    const created = new Date(r.createdAt);
    created.setHours(0, 0, 0, 0);
    const idx = days.findIndex((d) => d.date.getTime() === created.getTime());
    if (idx !== -1) days[idx].count++;
  }
  return days;
});

const chartMax = computed(() => Math.max(1, ...chart.value.map((d) => d.count)));

function isToday(d: ChartDay) {
  const last = chart.value[chart.value.length - 1];
  return d.date.getTime() === last.date.getTime();
}

const visibleRows = computed(() => {
  const q = query.value.trim().toLowerCase();
  const filtered = rows.value.filter((r) => {
    if (filter.value !== "all" && r.status !== filter.value) return false;
    if (!q) return true;
    const haystack = [
      r.name,
      r.contact,
      r.message,
      taskTypeLabels[r.taskType] ?? r.taskType,
      statusLabels[r.status] ?? r.status,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
  return filtered.sort((a, b) =>
    sortDir.value === "desc"
      ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
});

const statCards = computed(() => [
  { label: "Всего", value: stats.value?.total ?? 0, icon: Inbox, tint: "text-zinc-300" },
  { label: "Новые", value: stats.value?.new ?? 0, icon: Sparkles, tint: "text-fuchsia-300" },
  { label: "В работе", value: stats.value?.in_progress ?? 0, icon: Clock3, tint: "text-amber-300" },
  {
    label: "Выполнено",
    value: stats.value?.done ?? 0,
    icon: CheckCircle2,
    tint: "text-emerald-300",
  },
  { label: "Сегодня", value: todayCount.value, icon: CalendarDays, tint: "text-sky-300" },
]);
</script>

<template>
  <!-- Кнопка-триггер (живёт в футере) -->
  <button
    type="button"
    aria-label="Админ-панель"
    title="Админ-панель"
    class="grid size-8 place-items-center rounded-lg border border-white/10 text-zinc-500 transition-colors hover:border-white/25 hover:text-zinc-200"
    @click="open = true"
  >
    <Lock class="size-3.5" aria-hidden="true" />
  </button>

  <Teleport to="body">
    <!-- Оверлей -->
    <Transition
      enter-active-class="animate-in fade-in-0 duration-200"
      leave-active-class="animate-out fade-out-0 duration-150"
    >
      <div
        v-if="open"
        aria-hidden="true"
        class="fixed inset-0 z-50 bg-black/50"
        @click="open = false"
      />
    </Transition>

    <!-- Диалог -->
    <Transition
      enter-active-class="animate-in fade-in-0 zoom-in-95 duration-200"
      leave-active-class="animate-out fade-out-0 zoom-out-95 duration-150"
    >
      <div
        v-if="open"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-dialog-title"
        aria-describedby="admin-dialog-description"
        class="fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-2xl border border-white/10 bg-[#111113] p-6 shadow-lg max-h-[85vh] overflow-y-auto text-zinc-50 sm:max-w-2xl"
      >
        <!-- Загрузка -->
        <div v-if="authed === null || (loading && !authed)" class="grid place-items-center py-16">
          <!-- sr-only заголовок — требование доступности диалога -->
          <h2 id="admin-dialog-title" class="sr-only">Админ-панель</h2>
          <p id="admin-dialog-description" class="sr-only">Загрузка заявок</p>
          <Loader2 class="size-7 animate-spin text-fuchsia-400" aria-hidden="true" />
        </div>

        <!-- Логин -->
        <div v-else-if="!authed">
          <div class="flex flex-col gap-2 text-center sm:text-left">
            <h2
              id="admin-dialog-title"
              class="flex items-center gap-2 font-display text-xl font-semibold leading-none"
            >
              <Lock class="size-4 text-fuchsia-400" aria-hidden="true" />
              Админ-панель
            </h2>
            <p id="admin-dialog-description" class="text-sm text-muted-foreground text-zinc-400">
              Введите пароль, чтобы посмотреть заявки с формы
            </p>
          </div>
          <form class="mt-6 grid gap-4" @submit.prevent="handleLogin">
            <div class="grid gap-2">
              <label for="admin-pass" :class="cn(labelBase, 'text-zinc-300')">Пароль</label>
              <input
                id="admin-pass"
                ref="passwordInput"
                v-model="password"
                type="password"
                placeholder="••••••••"
                :class="cn(inputBase, fieldClass)"
                autocomplete="current-password"
              />
              <p v-if="loginError" class="text-xs text-red-400" role="alert">{{ loginError }}</p>
            </div>
            <button
              type="submit"
              :disabled="loggingIn || password.length === 0"
              :class="
                cn(
                  btnBase,
                  btnDefault,
                  'h-11 rounded-xl bg-white font-bold text-black transition-all hover:bg-white active:scale-95 disabled:opacity-60'
                )
              "
            >
              <template v-if="loggingIn">
                <Loader2 class="size-4 animate-spin" aria-hidden="true" />
                Проверяю…
              </template>
              <template v-else>Войти</template>
            </button>
          </form>
        </div>

        <!-- Дашборд -->
        <div v-else>
          <div class="flex flex-col gap-2 text-center sm:text-left">
            <h2
              id="admin-dialog-title"
              class="flex items-center justify-between gap-3 font-display text-xl font-semibold leading-none"
            >
              <span class="flex items-center gap-2">
                <Inbox class="size-5 text-fuchsia-400" aria-hidden="true" />
                Заявки
              </span>
              <span class="flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label="Экспорт в CSV"
                  title="Экспорт в CSV"
                  :disabled="rows.length === 0"
                  :class="
                    cn(
                      btnBase,
                      btnGhost,
                      btnSizeIcon,
                      'size-8 rounded-lg text-zinc-400 hover:bg-white/10 hover:text-white disabled:opacity-40'
                    )
                  "
                  @click="exportCsv"
                >
                  <Download class="size-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Обновить"
                  title="Обновить"
                  :class="
                    cn(
                      btnBase,
                      btnGhost,
                      btnSizeIcon,
                      'size-8 rounded-lg text-zinc-400 hover:bg-white/10 hover:text-white'
                    )
                  "
                  @click="loadRequests"
                >
                  <RefreshCw
                    :class="cn('size-4', loading && 'animate-spin')"
                    aria-hidden="true"
                  />
                </button>
                <button
                  type="button"
                  aria-label="Выйти"
                  title="Выйти"
                  :class="
                    cn(
                      btnBase,
                      btnGhost,
                      btnSizeIcon,
                      'size-8 rounded-lg text-zinc-400 hover:bg-white/10 hover:text-white'
                    )
                  "
                  @click="handleLogout"
                >
                  <LogOut class="size-4" aria-hidden="true" />
                </button>
              </span>
            </h2>
            <p id="admin-dialog-description" class="text-sm text-muted-foreground text-zinc-400">
              Заявки с формы «Обсудить задачу»
            </p>
          </div>

          <!-- Статистика -->
          <div class="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
            <div
              v-for="s in statCards"
              :key="s.label"
              class="rounded-xl border border-white/10 bg-white/[0.04] p-3"
            >
              <div
                class="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500"
              >
                <component :is="s.icon" :class="cn('size-3.5', s.tint)" aria-hidden="true" />
                {{ s.label }}
              </div>
              <div class="mt-1 font-display text-2xl font-bold">{{ s.value }}</div>
            </div>
          </div>

          <!-- Мини-график заявок за 14 дней -->
          <div v-if="rows.length > 0" class="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
            <div class="mb-2.5 flex items-center justify-between gap-2">
              <span
                class="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500"
              >
                <TrendingUp class="size-3.5 text-fuchsia-400" aria-hidden="true" />
                Заявки за 14 дней
              </span>
              <span class="text-[11px] text-zinc-600">максимум {{ chartMax }} в день</span>
            </div>
            <div class="flex h-16 items-end gap-[3px]">
              <div
                v-for="d in chart"
                :key="d.date.toISOString()"
                class="group flex h-full min-w-0 flex-1 flex-col justify-end"
                :title="`${chartTitleFmt.format(d.date)} — ${pluralRequests(d.count)}`"
              >
                <div
                  :class="
                    cn(
                      'w-full rounded-t-sm transition-all duration-300 group-hover:opacity-100',
                      d.count === 0
                        ? 'h-[3px] bg-white/10'
                        : isToday(d)
                          ? 'bg-gradient-to-t from-fuchsia-500 to-purple-300 opacity-100'
                          : 'bg-gradient-to-t from-fuchsia-600/70 to-purple-400/90 opacity-80 group-hover:from-fuchsia-500 group-hover:to-purple-300'
                    )
                  "
                  :style="
                    d.count === 0
                      ? undefined
                      : { height: `${Math.max(12, (d.count / chartMax) * 100)}%` }
                  "
                />
              </div>
            </div>
            <div class="mt-1.5 flex justify-between text-[9px] font-medium text-zinc-600">
              <span>{{ chartDayFmt.format(chart[0].date) }}</span>
              <span class="text-fuchsia-400/80">сегодня</span>
              <span>{{ chartDayFmt.format(chart[chart.length - 1].date) }}</span>
            </div>
          </div>

          <!-- Фильтр + поиск -->
          <div class="mt-4 flex flex-wrap items-center gap-2">
            <div class="relative shrink-0">
              <select
                v-model="filter"
                aria-label="Фильтр по статусу"
                :class="
                  cn(
                    selectTriggerBase,
                    'h-9 w-44 shrink-0 appearance-none rounded-xl pr-9 text-sm',
                    fieldClass
                  )
                "
                @change="shown = PAGE_SIZE"
              >
                <option value="all" class="bg-[#141416] text-white">Все заявки</option>
                <option value="new" class="bg-[#141416] text-white">Только новые</option>
                <option value="in_progress" class="bg-[#141416] text-white">В работе</option>
                <option value="done" class="bg-[#141416] text-white">Выполненные</option>
              </select>
              <ChevronDown
                class="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
            </div>

            <button
              type="button"
              :aria-label="
                sortDir === 'desc'
                  ? 'Сортировка: сначала новые — переключить на старые'
                  : 'Сортировка: сначала старые — переключить на новые'
              "
              :title="sortDir === 'desc' ? 'Сначала новые' : 'Сначала старые'"
              :class="
                cn(
                  btnBase,
                  btnGhost,
                  btnSizeIcon,
                  'size-9 shrink-0 rounded-xl text-zinc-400 hover:bg-white/10 hover:text-white'
                )
              "
              @click="sortDir = sortDir === 'desc' ? 'asc' : 'desc'"
            >
              <ArrowDownWideNarrow v-if="sortDir === 'desc'" class="size-4" aria-hidden="true" />
              <ArrowUpNarrowWide v-else class="size-4" aria-hidden="true" />
            </button>

            <div class="relative min-w-0 flex-1">
              <Search
                class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500"
                aria-hidden="true"
              />
              <input
                v-model="query"
                type="search"
                placeholder="Поиск: имя, контакт, текст…"
                aria-label="Поиск по заявкам"
                :class="cn(inputBase, fieldClass, 'h-9 rounded-xl pl-9 pr-8 text-sm')"
                @input="shown = PAGE_SIZE"
              />
              <button
                v-if="query"
                type="button"
                aria-label="Очистить поиск"
                class="absolute right-2 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-md text-zinc-500 transition-colors hover:bg-white/10 hover:text-white"
                @click="query = ''; shown = PAGE_SIZE"
              >
                <X class="size-3.5" aria-hidden="true" />
              </button>
            </div>

            <span class="shrink-0 text-xs text-zinc-500">
              {{ visibleRows.length }} из {{ rows.length }}
            </span>
          </div>

          <!-- Список заявок -->
          <div class="mt-4 max-h-[46vh] space-y-3 overflow-y-auto pr-1">
            <div
              v-if="visibleRows.length === 0"
              class="grid place-items-center gap-2 rounded-2xl border border-dashed border-white/10 py-12 text-center"
            >
              <Inbox class="size-8 text-zinc-600" aria-hidden="true" />
              <p class="text-sm text-zinc-500">
                {{
                  rows.length === 0
                    ? "Заявок пока нет — они появятся здесь после отправки формы"
                    : query.trim()
                      ? `По запросу «${query.trim()}» ничего не найдено`
                      : "В этом статусе заявок нет"
                }}
              </p>
            </div>
            <template v-else>
              <article
                v-for="r in visibleRows.slice(0, shown)"
                :key="r.id"
                class="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-white/20"
              >
                <div class="flex flex-wrap items-center justify-between gap-2">
                  <div class="flex items-center gap-2.5">
                    <span class="font-display text-base font-bold">{{ r.name }}</span>
                    <span
                      :class="
                        cn(
                          'rounded-full border px-2.5 py-0.5 text-[11px] font-semibold',
                          statusBadge[r.status] ?? statusBadge.new
                        )
                      "
                    >
                      {{ statusLabels[r.status] ?? r.status }}
                    </span>
                  </div>
                  <time :datetime="r.createdAt" class="text-xs text-zinc-500">
                    {{ dateFmt.format(new Date(r.createdAt)) }}
                  </time>
                </div>

                <div class="mt-2 flex flex-wrap items-center gap-2 text-sm">
                  <button
                    type="button"
                    title="Скопировать контакт"
                    class="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.06] px-2.5 py-1 font-medium text-zinc-200 transition-colors hover:bg-white/15"
                    @click="copyContact(r.contact)"
                  >
                    <ClipboardCopy class="size-3.5" aria-hidden="true" />
                    {{ r.contact }}
                  </button>
                  <span class="rounded-lg border border-white/10 px-2.5 py-1 text-xs text-zinc-400">
                    {{ taskTypeLabels[r.taskType] ?? r.taskType }}
                  </span>
                </div>

                <p class="mt-2.5 whitespace-pre-line text-sm leading-relaxed text-zinc-300">
                  {{ r.message }}
                </p>

                <div class="mt-3 flex items-center justify-between border-t border-white/5 pt-3">
                  <div class="relative">
                    <select
                      :value="r.status"
                      aria-label="Статус заявки"
                      :class="
                        cn(
                          selectTriggerBase,
                          'h-8 w-40 appearance-none rounded-lg pr-9 text-xs',
                          fieldClass
                        )
                      "
                      @change="onRowStatusChange(r, $event)"
                    >
                      <option value="new" class="bg-[#141416] text-white">Новая</option>
                      <option value="in_progress" class="bg-[#141416] text-white">В работе</option>
                      <option value="done" class="bg-[#141416] text-white">Выполнено</option>
                    </select>
                    <ChevronDown
                      class="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </div>

                  <button
                    type="button"
                    :disabled="busyId === r.id"
                    :class="
                      cn(
                        btnBase,
                        btnGhost,
                        btnSizeSm,
                        'rounded-lg text-zinc-500 hover:bg-red-500/10 hover:text-red-400'
                      )
                    "
                    @click="deleteTarget = r"
                  >
                    <Loader2
                      v-if="busyId === r.id"
                      class="size-4 animate-spin"
                      aria-hidden="true"
                    />
                    <Trash2 v-else class="size-4" aria-hidden="true" />
                    Удалить
                  </button>
                </div>
              </article>
            </template>
          </div>

          <!-- «Показать ещё» — пагинация длинного списка -->
          <button
            v-if="visibleRows.length > shown"
            type="button"
            class="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-2.5 text-sm font-semibold text-zinc-300 transition-all hover:border-white/25 hover:bg-white/10 hover:text-white active:scale-[0.98]"
            @click="shown = shown + PAGE_SIZE"
          >
            <Inbox class="size-4 text-zinc-500" aria-hidden="true" />
            Показать ещё {{ Math.min(PAGE_SIZE, visibleRows.length - shown) }} — всего скрыто
            {{ visibleRows.length - shown }}
          </button>
        </div>

        <!-- Крестик закрытия диалога -->
        <button
          type="button"
          class="absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0"
          @click="open = false"
        >
          <X class="size-4" aria-hidden="true" />
          <span class="sr-only">Close</span>
        </button>
      </div>
    </Transition>

    <!-- Подтверждение удаления -->
    <Transition
      enter-active-class="animate-in fade-in-0 duration-200"
      leave-active-class="animate-out fade-out-0 duration-150"
    >
      <div
        v-if="deleteTarget"
        aria-hidden="true"
        class="fixed inset-0 z-50 bg-black/50"
        @click="deleteTarget = null"
      />
    </Transition>
    <Transition
      enter-active-class="animate-in fade-in-0 zoom-in-95 duration-200"
      leave-active-class="animate-out fade-out-0 zoom-out-95 duration-150"
    >
      <div
        v-if="deleteTarget"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="admin-delete-title"
        class="fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-2xl border border-white/10 bg-[#141416] p-6 shadow-lg text-zinc-50 sm:max-w-lg"
      >
        <div class="flex flex-col gap-2 text-center sm:text-left">
          <h2 id="admin-delete-title" class="text-lg font-semibold leading-none">Удалить заявку?</h2>
          <p class="text-sm text-muted-foreground text-zinc-400">
            Заявка от {{ deleteTarget?.name }} будет удалена безвозвратно.
          </p>
        </div>
        <div class="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            :class="
              cn(
                btnBase,
                btnOutline,
                'rounded-xl border-white/10 bg-transparent text-zinc-300 hover:bg-white/10 hover:text-white'
              )
            "
            @click="deleteTarget = null"
          >
            Отмена
          </button>
          <button
            type="button"
            :class="cn(btnBase, btnDefault, 'rounded-xl bg-red-500 text-white hover:bg-red-600')"
            @click="handleDelete"
          >
            Удалить
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
