<script setup lang="ts">
import {
  Calculator,
  CalendarClock,
  Check,
  ChevronRight,
  ChevronDown,
  Link2,
  RotateCcw,
  Zap,
} from 'lucide-vue-next';
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

/* ─── Мобильный аккордеон: шапка калькулятора ─── */
const isOpen = ref(false);
const toggleCollapse = () => {
  if (window.innerWidth < 768) {
    isOpen.value = !isOpen.value;
  }
};

const project = ref<CalcProjectKey>('multipage');
const extras = ref<Set<CalcExtraKey>>(new Set<CalcExtraKey>(['admin']));
const rush = ref(false);

/**
 * Синхронизация URL через watcher (flush: "post") — апдейтеры состояния
 * чистые, никаких replaceState внутри них (в React-версии это был баг:
 * setState с сайд-эффектом внутри updater'а).
 */
let suppressSync = false;
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

/** Восстановление расчёта из ?calc=… (только клиент — hydration-safe) */
onMounted(() => {
  const raw = new URLSearchParams(window.location.search).get('calc');
  if (!raw) return;
  const parts = raw.split('.');
  const p = calcProjects.find((x) => x.key === parts[0]);
  if (!p) return;
  // URL уже содержит актуальную конфигурацию — синхронизацию глушим
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
  toast({
    title: 'Расчёт восстановлен из ссылки',
    description: `${p.label}${nextExtras.size ? ` + ${nextExtras.size} доп. опции` : ''}`,
  });
  nextTick(() => {
    suppressSync = false;
  });
});

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
    class="relative mt-10 rounded-3xl bg-gradient-to-br from-fuchsia-500/40 via-purple-500/15 to-transparent p-px sm:mt-12"
  >
    <div
      class="relative overflow-hidden rounded-[calc(1.5rem-1px)] bg-(--panel)"
    >
      <!-- шапка калькулятора -->
      <div
        role="button"
        tabindex="0"
        :aria-expanded="isOpen"
        class="flex w-full cursor-pointer items-center justify-between gap-3 border-b border-(--line-1) p-5 text-left md:cursor-default sm:px-7"
        @click="toggleCollapse"
        @keydown.enter="toggleCollapse"
        @keydown.space.prevent="toggleCollapse"
      >
        <div class="flex items-center gap-3">
          <span
            class="grid size-10 shrink-0 place-items-center rounded-2xl border border-(--line-1) bg-gradient-to-br from-fuchsia-500/25 via-purple-500/15 to-transparent"
          >
            <Calculator
              class="size-5 text-(--accent-soft)"
              aria-hidden="true"
            />
          </span>
          <div>
            <h3 class="font-display text-lg font-bold sm:text-xl">
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
            class="grid size-9 shrink-0 place-items-center rounded-xl border border-(--line-1) text-(--ink-faint) transition-colors hover:border-(--line-25) hover:text-(--ink)"
            @click.stop="reset"
          >
            <RotateCcw class="size-4" aria-hidden="true" />
          </button>
          
          <ChevronDown 
            class="size-5 text-(--ink-faint) transition-transform duration-300 md:hidden"
            :class="{ 'rotate-180': isOpen }"
          />
        </div>
      </div>

      <div
        class="grid transition-all duration-500 ease-in-out md:grid-rows-[1fr] md:opacity-100"
        :class="isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
      >
        <div class="overflow-hidden">
          <div class="grid lg:grid-cols-[1.45fr_1fr]">
            <!-- настройки -->
            <div class="space-y-6 p-5 sm:p-7">
              <fieldset>
                <legend
                  class="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-(--ink-faint)"
                >
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
                        'rounded-2xl border p-4 text-left transition-all duration-300 hover:-translate-y-0.5',
                        project === p.key
                          ? 'border-fuchsia-400/50 bg-fuchsia-500/10 shadow-lg shadow-fuchsia-900/20'
                          : 'border-(--line-1) bg-(--surface-1) hover:border-(--line-25)',
                      )
                    "
                    @click="chooseProject(p.key)"
                  >
                    <span class="flex items-center justify-between gap-2">
                      <span class="font-display text-sm font-bold text-(--ink)">
                        {{ p.label }}
                      </span>
                      <span
                        :class="
                          cn(
                            'grid size-4 shrink-0 place-items-center rounded-full border transition-colors',
                            project === p.key
                              ? 'border-fuchsia-400 bg-fuchsia-500 text-white'
                              : 'border-(--line-25)',
                          )
                        "
                      >
                        <Check
                          v-if="project === p.key"
                          class="size-2.5"
                          aria-hidden="true"
                        />
                      </span>
                    </span>
                    <span class="mt-0.5 block text-xs text-(--ink-faint)">
                      {{ p.hint }}
                    </span>
                    <span
                      class="mt-2 block text-xs font-semibold text-(--accent-soft)"
                    >
                      от {{ fmt.format(p.base) }} ₽
                    </span>
                  </button>
                </div>
              </fieldset>

              <fieldset>
                <legend
                  class="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-(--ink-faint)"
                >
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
                        'inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-300 active:scale-95',
                        extras.has(e.key)
                          ? 'border-fuchsia-400/40 bg-fuchsia-500/10 text-(--ink)'
                          : 'border-(--line-1) bg-(--surface-1) text-(--ink-mute) hover:border-(--line-25) hover:text-(--ink-soft)',
                      )
                    "
                    @click="toggleExtra(e.key)"
                  >
                    <span
                      :class="
                        cn(
                          'grid size-4 place-items-center rounded-[5px] border transition-colors',
                          extras.has(e.key)
                            ? 'border-fuchsia-400 bg-fuchsia-500 text-white'
                            : 'border-(--line-25)',
                        )
                      "
                    >
                      <Check
                        v-if="extras.has(e.key)"
                        class="size-3"
                        aria-hidden="true"
                      />
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
                      'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 active:scale-95',
                      rush
                        ? 'border-amber-400/50 bg-amber-500/10 text-(--accent-amber)'
                        : 'border-(--line-1) bg-(--surface-1) text-(--ink-mute) hover:border-(--line-25) hover:text-(--ink-soft)',
                    )
                  "
                  @click="toggleRush"
                >
                  <Zap
                    :class="
                      cn(
                        'size-4',
                        rush && 'fill-(--accent-amber) text-(--accent-amber)',
                      )
                    "
                    aria-hidden="true"
                  />
                  Срочно ×1,3 — срок короче
                </button>
              </div>
            </div>

            <!-- итог -->
            <div
              class="relative flex flex-col border-t border-(--line-1) p-6 sm:p-7 lg:border-l lg:border-t-0"
            >
              <p
                class="text-xs font-bold uppercase tracking-[0.2em] text-(--ink-faint)"
              >
                Предварительно
              </p>
              <p
                class="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl"
              >
                <span
                  class="bg-gradient-to-r from-fuchsia-300 to-purple-300 bg-clip-text text-transparent"
                >
                  {{ fmt.format(result.price) }} ₽
                </span>
              </p>
              <p class="mt-3 flex items-center gap-2 text-sm text-(--ink-mute)">
                <CalendarClock
                  class="size-4 shrink-0 text-(--accent-soft)"
                  aria-hidden="true"
                />
                срок ≈ {{ pluralDays(result.days) }}
              </p>
              <p v-if="rush" class="mt-1.5 text-xs text-(--accent-amber)">
                применён коэффициент срочности ×1,3
              </p>

              <a
                href="https://t.me/keyboard_brothers"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-6 flex items-center justify-center gap-2 rounded-2xl border border-(--line-1) bg-white px-6 py-3.5 text-sm font-bold text-black transition-all hover:scale-[1.02] hover:bg-white active:scale-95 lg:mt-auto"
              >
                Обсудить в Telegram
                <ChevronRight class="size-4" aria-hidden="true" />
              </a>
              <button
                type="button"
                class="group/calc mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-(--ink-faint) transition-colors hover:text-(--accent-soft)"
                @click="copyCalcLink"
              >
                <Link2
                  class="size-3.5 transition-transform group-hover/calc:-rotate-45"
                  aria-hidden="true"
                />
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
</template>
