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
  fromPrice,
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
  isOpen.value = !isOpen.value;
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
  <div class="calc" data-reveal>
    <div class="calc-controls">
      <div class="calc-head">
        <div class="calc-heading">
          <span class="calc-icon" aria-hidden="true">
            <svg class="icon"><use href="#i-calculator" /></svg>
          </span>
          <div>
            <h3>Калькулятор проекта</h3>
            <p>предварительная оценка за 30 секунд</p>
          </div>
        </div>
        <button class="calc-reset" type="button" @click="reset">
          <svg class="icon" aria-hidden="true"><use href="#i-reset" /></svg>
          Сбросить
        </button>
      </div>

      <fieldset class="calc-fieldset">
        <legend>Тип проекта</legend>
        <div class="calc-projects" role="group" aria-label="Тип проекта">
          <button
            v-for="item in calcProjects"
            :key="item.key"
            class="calc-option"
            type="button"
            :aria-pressed="project === item.key"
            @click="chooseProject(item.key)"
          >
            <span class="calc-option-top">
              <span class="calc-option-label">{{ item.label }}</span>
              <span class="calc-check" aria-hidden="true">
                <svg class="icon"><use href="#i-check" /></svg>
              </span>
            </span>
            <span class="calc-option-hint">{{ item.hint }}</span>
            <span class="calc-option-price">{{ fromPrice(item.base) }}</span>
          </button>
        </div>
      </fieldset>

      <fieldset class="calc-fieldset">
        <legend>Дополнительно</legend>
        <div class="calc-extras">
          <button
            v-for="item in calcExtras"
            :key="item.key"
            class="calc-extra"
            type="button"
            :aria-pressed="extras.has(item.key)"
            @click="toggleExtra(item.key)"
          >
            <span class="calc-box" aria-hidden="true">
              <svg class="icon"><use href="#i-check" /></svg>
            </span>
            {{ item.label }}
            <span class="calc-extra-price">+ {{ fmt.format(item.price) }} ₽</span>
          </button>
        </div>
      </fieldset>

      <label class="switch">
        <input type="checkbox" :checked="rush" @change="toggleRush" />
        <span class="switch-track" aria-hidden="true"><span class="switch-knob" /></span>
        <span class="switch-copy">
          <span class="switch-title">Срочно ×1,3 — срок короче</span>
          <span class="switch-hint">приоритетная работа над проектом</span>
        </span>
      </label>
    </div>

    <div class="calc-summary">
      <p class="calc-summary-label">Предварительно</p>
      <p class="calc-amount nowrap">{{ fmt.format(result.price) }} ₽</p>
      <p class="calc-days">
        <svg class="icon" aria-hidden="true"><use href="#i-calendar" /></svg>
        срок ≈ <span>{{ pluralDays(result.days) }}</span>
      </p>
      <p v-if="rush" class="calc-rush">применён коэффициент срочности ×1,3</p>

      <a
        class="btn btn-primary calc-cta"
        href="https://t.me/keyboard_brothers"
        target="_blank"
        rel="noopener noreferrer"
      >
        Обсудить в Telegram
        <svg class="icon" aria-hidden="true"><use href="#i-arrow-right" /></svg>
      </a>
      <button class="calc-copy" type="button" @click="copyCalcLink">
        <svg class="icon" aria-hidden="true"><use href="#i-link" /></svg>
        Скопировать ссылку на расчёт
      </button>
      <p class="calc-disclaimer">
        Расчёт ни к чему не обязывает — точную смету зафиксируем после обсуждения задачи.
      </p>
    </div>
  </div>
</template>
