<script setup lang="ts">
import {
  calcProjects,
  calcExtras,
  RUSH_MULT,
  pluralDays,
  type CalcProjectKey,
  type CalcExtraKey,
} from './data';

const fmt = new Intl.NumberFormat('ru-RU');

/** Deep-link расчёта: ?calc=<project>[.<extra>…][.r] — компактно и читаемо */
function encodeCalc(project: string, extras: Set<string>, rush: boolean) {
  return [project, ...[...extras], ...(rush ? ['r'] : [])].join('.');
}

function syncCalcUrl(project: string, extras: Set<string>, rush: boolean) {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  url.searchParams.set('calc', encodeCalc(project, extras, rush));
  const qs = url.searchParams.toString();
  window.history.replaceState(null, '', url.pathname + `?${qs}` + url.hash);
}

function clearCalcUrl() {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  url.searchParams.delete('calc');
  const qs = url.searchParams.toString();
  window.history.replaceState(
    null,
    '',
    url.pathname + (qs ? `?${qs}` : '') + url.hash,
  );
}

const { toast } = useToast();

const project = ref<CalcProjectKey>('multipage');
const extras = ref<Set<CalcExtraKey>>(new Set<CalcExtraKey>(['admin']));
const rush = ref(false);
let suppressSync = false;

/* ─── Аккордеон шапки калькулятора (mobile + desktop) ─── */
const isOpen = ref(false);

const toggleCollapse = () => {
  isOpen.value = !isOpen.value;
};

onMounted(() => {
  const raw = new URLSearchParams(window.location.search).get('calc');
  if (!raw) return;
  const parts = raw.split('.');
  const p = calcProjects.find((x) => x.key === parts[0]);
  if (!p) return;
  suppressSync = true;
  project.value = p.key;
  const nextExtras = new Set<CalcExtraKey>();
  for (const part of parts.slice(1)) {
    if (part === 'r') rush.value = true;
    else {
      const e = calcExtras.find((x) => x.key === part);
      if (e) nextExtras.add(e.key);
    }
  }
  extras.value = nextExtras;
  isOpen.value = true;
  toast({
    title: 'Расчёт восстановлен из ссылки',
    description: `${p.label}${nextExtras.size ? ` + ${nextExtras.size} доп. опции` : ''}`,
  });
  nextTick(() => {
    suppressSync = false;
  });
});

/**
 * Синхронизация URL через watcher (flush: "post") — апдейтеры состояния
 * чистые, никаких replaceState внутри них (в React-версии это был баг:
 * setState с сайд-эффектом внутри updater'а).
 */
watch(
  [project, extras, rush],
  () => {
    if (suppressSync) return;
    syncCalcUrl(project.value, extras.value, rush.value);
  },
  { flush: 'post' },
);

const result = computed(() => {
  const p =
    calcProjects.find((x) => x.key === project.value) ?? calcProjects[1]!;
  let sum = p.base;
  let d = p.days;
  calcExtras.forEach((e) => {
    if (extras.value.has(e.key)) {
      sum += e.price;
      d += e.days;
    }
  });
  if (rush.value) {
    sum = Math.round((sum * RUSH_MULT) / 1000) * 1000;
    d = Math.max(3, Math.ceil(d * 0.7));
  }
  return { price: sum, days: d, projectLabel: p.label };
});

function toggleExtra(key: CalcExtraKey) {
  const next = new Set(extras.value);
  if (next.has(key)) next.delete(key);
  else next.add(key);
  extras.value = next;
}

function chooseProject(key: CalcProjectKey) {
  project.value = key;
}

function toggleRush() {
  rush.value = !rush.value;
}

function reset() {
  // сброс без записи ?calc= обратно в URL: глушим watcher на один батч
  suppressSync = true;
  project.value = 'multipage';
  extras.value = new Set<CalcExtraKey>(['admin']);
  rush.value = false;
  clearCalcUrl();
  nextTick(() => {
    suppressSync = false;
  });
}

const chosenExtras = computed(() =>
  calcExtras.filter((e) => extras.value.has(e.key)),
);

/** Скопировать ссылку на расчёт (?calc=…) */
function copyCalcLink() {
  const url = new URL(window.location.href);
  url.searchParams.set(
    'calc',
    encodeCalc(project.value, extras.value, rush.value),
  );
  const link = url.toString();
  navigator.clipboard
    .writeText(link)
    .then(() =>
      toast({
        title: 'Ссылка на расчёт скопирована',
        description: 'Открыв её, получатель увидит эту же конфигурацию',
      }),
    )
    .catch(() =>
      toast({ title: 'Скопируйте ссылку вручную', description: link }),
    );
}
</script>

<template>
  <div
    data-reveal
    class="relative mt-10 overflow-hidden rounded-[var(--m3-shape-md)] border border-(--outline-variant) bg-(--m3-surface-container) elevation-2 sm:mt-12"
  >
    <div class="relative overflow-hidden">
      <!-- шапка калькулятора -->
      <div
        role="button"
        tabindex="0"
        :aria-expanded="isOpen"
        class="flex w-full cursor-pointer items-center justify-between gap-3 p-5 text-left sm:px-7"
        :class="
          cn(
            isOpen
              ? cn(
                  'm3-accordion-merge-head is-open border-b-0 bg-gradient-to-b from-(--m3-surface-container) to-[color-mix(in_srgb,var(--m3-surface-container)_92%,var(--m3-surface-container-high))]',
                  'md:bg-(--m3-surface-container-high)',
                )
              : 'border-b border-(--line-1)',
          )
        "
        @click="toggleCollapse"
        @keydown.enter="toggleCollapse"
        @keydown.space.prevent="toggleCollapse"
      >
        <div class="flex items-center gap-3">
          <span
            class="m3-icon-tile size-10 shrink-0 bg-(--m3-primary)/12"
          >
            <span
              class="material-symbols-outlined text-xl text-(--m3-primary)"
              aria-hidden="true"
              >calculate</span
            >
          </span>
          <div>
            <h3 class="m3-title-lg text-(--ink)">
              Калькулятор проекта
            </h3>
            <p class="text-xs text-(--ink-faint) sm:text-sm">
              предварительная оценка за 30 секунд
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button
            type="button"
            title="Сбросить настройки"
            aria-label="Сбросить настройки калькулятора"
            class="m3-icon-btn m3-state-layer size-9 shrink-0 border border-(--line-1) text-(--ink-faint) hover:text-(--ink)"
            @click.stop="reset"
            @keydown.enter.stop
            @keydown.space.stop
          >
            <span class="material-symbols-outlined text-lg" aria-hidden="true"
              >restart_alt</span
            >
          </button>
          
          <span
            class="m3-icon-btn m3-state-layer flex size-10 shrink-0 border border-(--outline-variant) bg-(--m3-surface-container-high) transition-transform duration-300"
            :class="{ 'rotate-180 border-(--m3-primary)/40': isOpen }"
          >
            <span
              class="material-symbols-outlined text-xl text-(--m3-primary)"
              aria-hidden="true"
              >expand_more</span
            >
          </span>
        </div>
      </div>

      <div
        class="grid transition-all duration-500 ease-in-out"
        :class="isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
        :inert="!isOpen"
      >
        <div class="overflow-hidden">
          <div
            class="m3-accordion-merge-body border-t-0 bg-(--m3-surface-container) md:bg-(--m3-surface-container)"
          >
          <div class="grid lg:grid-cols-[1.45fr_1fr]">
            <!-- настройки -->
            <div class="space-y-6 p-5 sm:p-7">
              <fieldset>
                <legend class="m3-label mb-3 normal-case tracking-normal">
                  Тип проекта
                </legend>
                <div class="grid gap-2.5 sm:grid-cols-2">
                  <button
                    v-for="p in calcProjects"
                    :key="p.key"
                    type="button"
                    :aria-pressed="project === p.key"
                    :class="
                      cn(
                        'm3-card-hover-lift m3-state-layer android-ripple rounded-[var(--m3-shape-md)] border p-4 text-left transition-all duration-300',
                        project === p.key
                          ? 'border-(--m3-primary) bg-(--m3-primary)/10 elevation-1'
                          : 'border-(--outline-variant) bg-(--surface-1) hover:bg-(--surface-hover)',
                      )
                    "
                    @click="chooseProject(p.key)"
                  >
                    <span class="flex items-center justify-between gap-2">
                      <span class="m3-title-md text-(--ink)">
                        {{ p.label }}
                      </span>
                      <span
                        :class="
                          cn(
                            'm3-selection-mark m3-selection-mark--round',
                            project === p.key && 'is-checked',
                          )
                        "
                        aria-hidden="true"
                      >
                        <span
                          v-if="project === p.key"
                          class="m3-selection-mark__icon"
                          >check</span
                        >
                      </span>
                    </span>
                    <span class="mt-0.5 block text-xs text-(--ink-faint)">
                      {{ p.hint }}
                    </span>
                    <span
                      class="mt-2 block text-xs font-semibold text-(--m3-primary)"
                    >
                      от {{ fmt.format(p.base) }} ₽
                    </span>
                  </button>
                </div>
              </fieldset>

              <fieldset>
                <legend class="m3-label mb-3 normal-case tracking-normal">
                  Дополнительно
                </legend>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="e in calcExtras"
                    :key="e.key"
                    type="button"
                    :aria-pressed="extras.has(e.key)"
                    :class="
                      cn(
                        'm3-filter-chip m3-state-layer android-ripple inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium transition-colors',
                        extras.has(e.key)
                          ? 'border-(--m3-primary) bg-(--m3-primary)/10 text-(--ink)'
                          : 'text-(--ink-mute) hover:bg-(--m3-surface-container-high) hover:text-(--ink-soft)',
                      )
                    "
                    @click="toggleExtra(e.key)"
                  >
                    <span
                      :class="
                        cn(
                          'm3-selection-mark m3-selection-mark--square',
                          extras.has(e.key) && 'is-checked',
                        )
                      "
                      aria-hidden="true"
                    >
                      <span
                        v-if="extras.has(e.key)"
                        class="m3-selection-mark__icon"
                        >check</span
                      >
                    </span>
                    {{ e.label }}
                    <span class="text-xs text-(--ink-faint)">
                      +{{ fmt.format(e.price) }} ₽
                    </span>
                  </button>
                </div>
              </fieldset>

              <div class="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  :aria-pressed="rush"
                  :class="
                    cn(
                      'm3-filter-chip m3-state-layer inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium transition-colors',
                      rush
                        ? 'border-(--m3-primary) bg-(--m3-primary)/10 text-(--ink)'
                        : 'text-(--ink-mute) hover:bg-(--m3-surface-container-high) hover:text-(--ink-soft)',
                    )
                  "
                  @click="toggleRush"
                >
                  <span
                    class="material-symbols-outlined text-lg text-(--m3-primary)"
                    aria-hidden="true"
                    >bolt</span
                  >
                  Срочно ×1,3 — срок короче
                </button>
              </div>
            </div>

            <!-- итог -->
            <div
              class="relative flex flex-col border-t border-(--line-1) p-6 sm:p-7 lg:border-l lg:border-t-0"
            >
              <p class="m3-label normal-case tracking-normal">
                Предварительно
              </p>
              <p class="mt-2 m3-headline-lg text-(--m3-primary) sm:text-[2.5rem]">
                <span
                  class="text-(--m3-primary)"
                >
                  {{ fmt.format(result.price) }} ₽
                </span>
              </p>
              <p class="mt-3 flex items-center gap-2 text-sm text-(--ink-mute)">
                <span
                  class="material-symbols-outlined shrink-0 text-lg text-(--m3-primary)"
                  aria-hidden="true"
                  >schedule</span
                >
                срок ≈ {{ pluralDays(result.days) }}
              </p>
              <p v-if="rush" class="mt-1.5 text-xs text-(--m3-primary)">
                применён коэффициент срочности ×1,3
              </p>

              <a
                href="https://t.me/keyboard_brothers"
                target="_blank"
                rel="noopener noreferrer"
                class="m3-filled-btn mt-6 w-full lg:mt-auto"
              >
                Обсудить в Telegram
                <span class="material-symbols-outlined text-lg" aria-hidden="true"
                  >chevron_right</span
                >
              </a>
              <button
                type="button"
                class="m3-text-btn group/calc mt-3 flex w-full items-center justify-center gap-1.5 text-sm"
                @click="copyCalcLink"
              >
                <span
                  class="material-symbols-outlined text-base transition-transform group-hover/calc:-rotate-45"
                  aria-hidden="true"
                  >link</span
                >
                Скопировать ссылку на расчёт
              </button>
              <p class="mt-3 text-[11px] leading-relaxed text-(--ink-faint)">
                Расчёт ни к чему не обязывает — точную смету зафиксируем после
                обсуждения задачи.
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
