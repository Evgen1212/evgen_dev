<script setup lang="ts">
import {
  ArrowUpRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Link2,
  Share2,
  SlidersHorizontal,
  Sparkles,
  UserRound,
  X,
} from "lucide-vue-next";
import {
  caseCategories,
  caseDetails,
  type CaseCategory,
  type CaseDetail,
} from "./data";

type GridItem = {
  id: string;
  className: string;
};

const rowOne: GridItem[] = [
  { id: "modern", className: "block h-64 md:h-72 lg:h-80" },
  { id: "craftout", className: "hidden h-64 md:block lg:h-80" },
  { id: "granline", className: "block h-64 md:h-72 lg:h-80" },
];

const rowTwo: GridItem[] = [
  { id: "lawyer", className: "block aspect-square" },
  { id: "shadows", className: "block aspect-square" },
  { id: "mineplay", className: "block aspect-square" },
  { id: "cataclysm", className: "block aspect-square" },
];

const allItems: GridItem[] = [...rowOne, ...rowTwo];

/** Deep-link: синхронизирует открытый кейс с ?case=<id> в адресной строке */
function setUrlCase(id: string | null) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (id) url.searchParams.set("case", id);
  else url.searchParams.delete("case");
  const qs = url.searchParams.toString();
  window.history.replaceState(
    null,
    "",
    url.pathname + (qs ? `?${qs}` : "") + url.hash,
  );
}

const { toast } = useToast();

const active = ref<CaseDetail | null>(null);
const filter = ref<CaseCategory | "all">("all");
// navigator.share доступен только на клиентах с системным шитом (мобилки)
const canShare = ref(false);
const touchStart = ref<{ x: number; y: number } | null>(null);

// Порядок кейсов для навигации «предыдущий / следующий»
const order = allItems.map((i) => i.id);

/** Открыть кейс + записать deep-link в адресную строку */
function openCase(id: string) {
  const d = caseDetails[id];
  if (!d) return;
  active.value = d;
  setUrlCase(id);
}

/** Закрыть модалку + убрать deep-link из адреса */
function closeCase() {
  active.value = null;
  setUrlCase(null);
}

/** Скопировать ссылку на кейс (https://…/?case=<id>) */
function copyCaseLink(id: string) {
  const link = `${window.location.origin}/?case=${id}`;
  navigator.clipboard
    .writeText(link)
    .then(() => toast({ title: "Ссылка на кейс скопирована", description: link }))
    .catch(() =>
      toast({
        title: "Скопируйте ссылку вручную",
        description: link,
      }),
    );
}

/** Системный шит (Web Share API); при отмене — тихо, при ошибке — копируем ссылку */
async function shareCase(d: CaseDetail) {
  const link = `${window.location.origin}/?case=${d.id}`;
  try {
    await navigator.share({
      title: `${d.title} — Абрамов Евгений`,
      text: `${d.tag} — кейс фронтенд-разработчика Евгения Абрамова`,
      url: link,
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") return;
    copyCaseLink(d.id);
  }
}

// Счётчики чипсов фильтра
const counts = computed<Record<string, number>>(() => {
  const map: Record<string, number> = { all: allItems.length };
  for (const item of allItems) {
    const c = caseDetails[item.id]?.category;
    if (c) map[c] = (map[c] ?? 0) + 1;
  }
  return map;
});

const filtered = computed<GridItem[]>(() =>
  filter.value === "all"
    ? allItems
    : allItems.filter((i) => caseDetails[i.id]?.category === filter.value),
);

function stepCase(id: string, dir: 1 | -1) {
  const idx = order.indexOf(id);
  if (idx === -1) return;
  const nextId = order[(idx + dir + order.length) % order.length];
  active.value = caseDetails[nextId] ?? null;
  setUrlCase(nextId);
}

// Клавиатура в открытой модалке: Escape закрывает, стрелки листают кейсы
function onKeydown(e: KeyboardEvent) {
  if (!active.value) return;
  if (e.key === "Escape") closeCase();
  else if (e.key === "ArrowRight") stepCase(active.value.id, 1);
  else if (e.key === "ArrowLeft") stepCase(active.value.id, -1);
}

// Свайп на сенсорных экранах: горизонтальный жест > 64px листает кейс
function onTouchStart(e: TouchEvent) {
  const t = e.touches[0]!;
  touchStart.value = { x: t.clientX, y: t.clientY };
}

function onTouchEnd(e: TouchEvent) {
  if (!touchStart.value || !active.value) return;
  const t = e.changedTouches[0]!;
  const dx = t.clientX - touchStart.value.x;
  const dy = t.clientY - touchStart.value.y;
  touchStart.value = null;
  if (Math.abs(dx) > 64 && Math.abs(dx) > Math.abs(dy) * 1.6) {
    stepCase(active.value.id, dx < 0 ? 1 : -1);
  }
}

const activeIdx = computed(() =>
  active.value ? order.indexOf(active.value.id) : -1,
);
const prevCase = computed(() =>
  active.value
    ? (caseDetails[order[(activeIdx.value - 1 + order.length) % order.length]] ??
      null)
    : null,
);
const nextCase = computed(() =>
  active.value
    ? (caseDetails[order[(activeIdx.value + 1) % order.length]] ?? null)
    : null,
);

// Блокировка скролла body на время открытой модалки.
// flush: "sync" — снимаем лок синхронно при закрытии, чтобы переход по
// <a href="#contact"> (CTA модалки) успел проскроллить страницу.
watch(
  active,
  (v) => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = v ? "hidden" : "";
  },
  { flush: "sync" },
);

onMounted(() => {
  canShare.value = typeof navigator !== "undefined" && "share" in navigator;

  // Deep-link на загрузке: /?case=<id> открывает модалку этого кейса.
  // Модалка стартует закрытой в SSR (active = null) — hydration безопасен.
  const id = new URLSearchParams(window.location.search).get("case");
  if (id && caseDetails[id]) active.value = caseDetails[id]!;

  window.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
  if (typeof document !== "undefined") document.body.style.overflow = "";
});
</script>

<template>
  <div>
    <!-- фильтр портфолио -->
    <div
      data-reveal
      role="group"
      aria-label="Фильтр кейсов по типу"
      class="mb-8 flex flex-wrap items-center gap-2 sm:mb-10"
    >
      <SlidersHorizontal class="mr-1 size-4 text-zinc-600" aria-hidden="true" />
      <button
        v-for="cat in caseCategories"
        :key="cat.key"
        type="button"
        :aria-pressed="filter === cat.key"
        :class="
          cn(
            'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 active:scale-95',
            filter === cat.key
              ? 'border-transparent bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg shadow-fuchsia-900/30'
              : 'border-white/10 bg-white/[0.04] text-zinc-400 hover:border-white/25 hover:text-zinc-200',
          )
        "
        @click="filter = cat.key"
      >
        {{ cat.label }}
        <span
          :class="
            cn(
              'rounded-full px-1.5 text-[10px] font-bold leading-4',
              filter === cat.key
                ? 'bg-black/25 text-white'
                : 'bg-white/10 text-zinc-500',
            )
          "
        >
          {{ counts[cat.key] ?? 0 }}
        </span>
      </button>
    </div>

    <template v-if="filter === 'all'">
      <div class="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-[1fr_1.95fr_1fr]">
        <button
          v-for="item in rowOne"
          :key="item.id"
          type="button"
          data-reveal="true"
          :aria-label="`${caseDetails[item.id]?.title ?? item.id} — открыть детали кейса`"
          :class="cn('cursor-pointer text-left', item.className)"
          @click="openCase(item.id)"
        >
          <span
            class="card-shine group relative block h-full w-full overflow-hidden rounded-3xl border border-white/10 shadow-lg shadow-black/40 transition-all duration-500 hover:-translate-y-1.5 hover:border-white/25 hover:shadow-2xl hover:shadow-black/60"
          >
            <span
              class="block h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            >
              <CaseArt :id="item.id" />
            </span>
            <!-- hover overlay -->
            <span
              class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/20 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            >
              <span
                class="translate-y-3 transition-transform duration-500 group-hover:translate-y-0"
              >
                <span
                  class="block text-[11px] font-bold uppercase tracking-[0.22em] text-fuchsia-300"
                >
                  {{ caseDetails[item.id]?.tag }}
                </span>
                <span
                  class="flex items-center gap-1.5 font-display text-xl font-bold text-white"
                >
                  {{ caseDetails[item.id]?.title }}
                  <ArrowUpRight
                    class="size-4 opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </span>
              </span>
            </span>
          </span>
        </button>
      </div>

      <div class="mt-4 grid gap-4 sm:mt-5 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <button
          v-for="item in rowTwo"
          :key="item.id"
          type="button"
          data-reveal="true"
          :aria-label="`${caseDetails[item.id]?.title ?? item.id} — открыть детали кейса`"
          :class="cn('cursor-pointer text-left', item.className)"
          @click="openCase(item.id)"
        >
          <span
            class="card-shine group relative block h-full w-full overflow-hidden rounded-3xl border border-white/10 shadow-lg shadow-black/40 transition-all duration-500 hover:-translate-y-1.5 hover:border-white/25 hover:shadow-2xl hover:shadow-black/60"
          >
            <span
              class="block h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            >
              <CaseArt :id="item.id" />
            </span>
            <!-- hover overlay -->
            <span
              class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/20 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            >
              <span
                class="translate-y-3 transition-transform duration-500 group-hover:translate-y-0"
              >
                <span
                  class="block text-[11px] font-bold uppercase tracking-[0.22em] text-fuchsia-300"
                >
                  {{ caseDetails[item.id]?.tag }}
                </span>
                <span
                  class="flex items-center gap-1.5 font-display text-xl font-bold text-white"
                >
                  {{ caseDetails[item.id]?.title }}
                  <ArrowUpRight
                    class="size-4 opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </span>
              </span>
            </span>
          </span>
        </button>
      </div>
    </template>

    <div
      v-else
      :key="filter"
      class="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      <button
        v-for="(item, i) in filtered"
        :key="`${filter}-${item.id}`"
        type="button"
        :aria-label="`${caseDetails[item.id]?.title ?? item.id} — открыть детали кейса`"
        :style="{ animationDelay: `${i * 70}ms` }"
        :class="
          cn(
            'cursor-pointer text-left filter-in',
            'block h-64 md:h-72 lg:h-80',
          )
        "
        @click="openCase(item.id)"
      >
        <span
          class="card-shine group relative block h-full w-full overflow-hidden rounded-3xl border border-white/10 shadow-lg shadow-black/40 transition-all duration-500 hover:-translate-y-1.5 hover:border-white/25 hover:shadow-2xl hover:shadow-black/60"
        >
          <span
            class="block h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          >
            <CaseArt :id="item.id" />
          </span>
          <!-- hover overlay -->
          <span
            class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/20 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          >
            <span
              class="translate-y-3 transition-transform duration-500 group-hover:translate-y-0"
            >
              <span
                class="block text-[11px] font-bold uppercase tracking-[0.22em] text-fuchsia-300"
              >
                {{ caseDetails[item.id]?.tag }}
              </span>
              <span
                class="flex items-center gap-1.5 font-display text-xl font-bold text-white"
              >
                {{ caseDetails[item.id]?.title }}
                <ArrowUpRight
                  class="size-4 opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />
              </span>
            </span>
          </span>
        </span>
      </button>
    </div>

    <!-- модалка кейса (порт radix Dialog из React: портал в body, оверлей, Esc) -->
    <Teleport to="body">
      <Transition name="dlg-overlay">
        <div
          v-if="active"
          aria-hidden="true"
          class="fixed inset-0 z-50 bg-black/50"
          @click="closeCase"
        />
      </Transition>
      <Transition name="dlg-content">
        <div
          v-if="active"
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-dialog-title"
          class="fixed top-[50%] left-[50%] z-50 grid max-h-[90vh] w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-0 overflow-hidden overflow-y-auto rounded-3xl border border-white/10 bg-[#141416] p-0 text-white shadow-lg duration-200 sm:max-w-2xl"
          @touchstart.passive="onTouchStart"
          @touchend.passive="onTouchEnd"
        >
          <h2 id="case-dialog-title" class="sr-only">{{ active.title }}</h2>
          <p class="sr-only">{{ active.tag }} — {{ active.year }}</p>

          <div class="group relative aspect-[16/9] w-full overflow-hidden">
            <div class="ken-burns h-full w-full">
              <CaseArt :id="active.id" />
            </div>
            <div
              class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#141416] to-transparent p-5 pt-14"
            >
              <span
                class="rounded-full border border-fuchsia-400/30 bg-fuchsia-500/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-fuchsia-300"
              >
                {{ active.tag }}
              </span>
              <p
                class="mt-2 font-display text-xl font-bold text-white drop-shadow-lg sm:text-2xl"
              >
                {{ active.title }}
              </p>
            </div>
          </div>

          <div class="space-y-6 p-6 sm:p-8">
            <div class="flex flex-wrap items-start justify-between gap-3">
              <h3 class="font-display text-2xl font-bold sm:text-3xl">
                {{ active.title }}
              </h3>
              <div
                class="flex flex-wrap items-center gap-4 text-xs text-zinc-400"
              >
                <span class="flex items-center gap-1.5">
                  <CalendarDays class="size-3.5" aria-hidden="true" />
                  {{ active.year }}
                </span>
                <span class="flex items-center gap-1.5">
                  <Clock class="size-3.5" aria-hidden="true" />
                  {{ active.timeline }}
                </span>
                <button
                  type="button"
                  title="Скопировать ссылку на этот кейс"
                  aria-label="Скопировать ссылку на этот кейс"
                  class="group/link inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-semibold text-zinc-400 transition-all hover:border-fuchsia-400/40 hover:bg-fuchsia-500/10 hover:text-fuchsia-300 active:scale-95"
                  @click="copyCaseLink(active.id)"
                >
                  <Link2
                    class="size-3.5 transition-transform group-hover/link:-rotate-45"
                    aria-hidden="true"
                  />
                  Ссылка
                </button>
                <button
                  v-if="canShare"
                  type="button"
                  title="Поделиться кейсом"
                  aria-label="Поделиться кейсом"
                  class="group/share inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-semibold text-zinc-400 transition-all hover:border-fuchsia-400/40 hover:bg-fuchsia-500/10 hover:text-fuchsia-300 active:scale-95"
                  @click="shareCase(active)"
                >
                  <Share2
                    class="size-3.5 transition-transform group-hover/share:translate-x-0.5 group-hover/share:-translate-y-0.5"
                    aria-hidden="true"
                  />
                  Поделиться
                </button>
              </div>
            </div>

            <p class="text-sm leading-relaxed text-zinc-300 sm:text-base">
              {{ active.description }}
            </p>

            <div>
              <div
                class="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500"
              >
                Результаты
              </div>
              <ul class="grid gap-2.5 sm:grid-cols-2">
                <li
                  v-for="h in active.highlights"
                  :key="h"
                  class="flex items-start gap-2 text-sm text-zinc-200"
                >
                  <Sparkles
                    class="mt-0.5 size-4 shrink-0 text-fuchsia-400"
                    aria-hidden="true"
                  />
                  {{ h }}
                </li>
              </ul>
            </div>

            <div>
              <div
                class="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500"
              >
                Стек
              </div>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="s in active.stack"
                  :key="s"
                  class="rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-1.5 text-xs font-semibold text-zinc-200"
                >
                  {{ s }}
                </span>
              </div>
            </div>

            <div
              class="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-zinc-300"
            >
              <UserRound class="size-4 shrink-0 text-zinc-500" aria-hidden="true" />
              {{ active.role }}
            </div>

            <!-- навигация между кейсами -->
            <nav
              aria-label="Навигация по кейсам"
              class="flex items-center justify-between gap-2"
            >
              <button
                type="button"
                class="group flex min-w-0 items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                @click="stepCase(active.id, -1)"
              >
                <ChevronLeft
                  class="size-4 shrink-0 transition-transform group-hover:-translate-x-0.5"
                  aria-hidden="true"
                />
                <span class="truncate">{{ prevCase?.title }}</span>
              </button>
              <span
                class="shrink-0 font-display text-xs font-bold text-zinc-500"
              >
                {{ activeIdx + 1 }} / {{ order.length }}
              </span>
              <button
                type="button"
                class="group flex min-w-0 items-center justify-end gap-1.5 rounded-xl px-3 py-2 text-right text-xs font-semibold text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                @click="stepCase(active.id, 1)"
              >
                <span class="truncate">{{ nextCase?.title }}</span>
                <ChevronRight
                  class="size-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </button>
            </nav>
            <p class="sr-only">
              Переключение кейсов также доступно стрелками ← и →, а на
              сенсорных экранах — свайпом влево и вправо. Ссылку на конкретный
              кейс можно скопировать кнопкой «Ссылка».
            </p>

            <a
              href="#contact"
              class="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-bold text-black transition-all hover:scale-[1.02] active:scale-95"
              @click="closeCase"
            >
              Хочу похожий проект
              <ArrowUpRight class="size-4" aria-hidden="true" />
            </a>
          </div>

          <!-- крестик закрытия (порт DialogContent showCloseButton) -->
          <button
            type="button"
            aria-label="Закрыть"
            class="absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            @click="closeCase"
          >
            <X class="size-4" aria-hidden="true" />
            <span class="sr-only">Закрыть</span>
          </button>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
/* появление/исчезание модалки — порт tw-animate (fade + zoom-in-95, 200ms).
   scale отдельным CSS-свойством, чтобы не конфликтовать с translate Tailwind */
.dlg-overlay-enter-active,
.dlg-overlay-leave-active {
  transition: opacity 0.2s ease-out;
}
.dlg-overlay-enter-from,
.dlg-overlay-leave-to {
  opacity: 0;
}

.dlg-content-enter-active {
  transition:
    opacity 0.2s ease-out,
    scale 0.2s ease-out;
}
.dlg-content-leave-active {
  transition:
    opacity 0.15s ease-in,
    scale 0.15s ease-in;
}
.dlg-content-enter-from,
.dlg-content-leave-to {
  opacity: 0;
  scale: 0.95;
}
</style>
