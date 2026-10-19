<script setup lang="ts">
import {
  AppWindow,
  ArrowDownRight,
  Blocks,
  Cable,
  Gauge,
  MonitorSmartphone,
  ShieldCheck,
} from "lucide-vue-next";

/** Статистика из реального резюме (замена React-версии) */
const stats = [
  { value: 5, suffix: "+", label: "лет в коммерческой разработке" },
  { value: 50, suffix: "+", label: "UI-компонентов в собственном ките (Storybook)" },
  { value: 70, suffix: "%+", label: "покрытие UI-тестами в финтех-проекте" },
  { value: 5, suffix: "+", label: "языков интерфейса в i18n" },
  { value: 6, suffix: "", label: "отраслей — от финтеха до промышленности" },
  { value: 3, suffix: "", label: "федеральных бренда в заказных проектах" },
  { value: 4, suffix: "", label: "финтех-продукта в продакшене" },
  { value: 2, suffix: " нед.", label: "бесплатной поддержки после запуска" },
];

/**
 * Компетенции из резюме, переведённые на язык заказчика:
 * без жаргона — что именно это даёт проекту клиента.
 */
const competencies = [
  {
    icon: Gauge,
    title: "Сайты, которые летают",
    text: "Оптимизирую скорость по Google PageSpeed: страницы открываются за секунды даже на слабом интернете — посетители не уходят, пока «грузится».",
  },
  {
    icon: AppWindow,
    title: "Сложные веб-приложения",
    text: "Личные кабинеты, дашборды с данными в реальном времени, каталоги, калькуляторы — не просто страницы, а рабочие инструменты для бизнеса.",
  },
  {
    icon: MonitorSmartphone,
    title: "Работает на любом экране",
    text: "Телефон, планшет, ноутбук, большой монитор — интерфейс подстраивается сам: ничего не уезжает, не ломается и остаётся удобным.",
  },
  {
    icon: Blocks,
    title: "Порядок в коде",
    text: "Проектирую архитектуру по FSD: код структурирован и документирован, поэтому доработки делаются быстро и не ломают то, что уже работает.",
  },
  {
    icon: ShieldCheck,
    title: "Меньше багов — меньше нервов",
    text: "Пишу автотесты — в проектах покрывал до 70% интерфейса. Ошибки ловятся до того, как их увидят ваши пользователи.",
  },
  {
    icon: Cable,
    title: "Подключу любой backend",
    text: "Авторизация, оплаты, карты, чаты и графики в реальном времени: REST API, GraphQL, WebSocket — свяжу фронтенд с любой серверной частью.",
  },
];
</script>

<template>
  <section id="about" class="relative scroll-mt-24 py-24 sm:py-32">
    <div
      aria-hidden="true"
      class="pointer-events-none absolute right-0 top-1/3 size-96 rounded-full bg-indigo-900/10 blur-3xl"
    />
    <div
      class="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10"
    >
      <!-- Text -->
      <div data-reveal>
        <SectionKicker>Кто я</SectionKicker>
        <h2
          class="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
        >
          Обо мне
        </h2>
        <div
          class="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-(--ink-soft) sm:text-lg"
        >
          <p>
            Меня зовут Евгений, я frontend-разработчик с 5+ годами коммерческого
            опыта. Специализируюсь на Vue 3 / Nuxt 3 / TypeScript, есть
            практический опыт с React. Разрабатываю SPA и SSR/SSG-приложения —
            от лендингов до финтех-сервисов с realtime-данными.
          </p>
          <p>
            Проектирую архитектуру по FSD, собираю масштабируемые UI-киты и
            дизайн-системы, довожу проекты по Web Vitals и тестам. Последние
            годы — лид-роль: миграция legacy на Vue 3, код-ревью и
            наставничество.
          </p>
        </div>

        <!-- Counters -->
        <dl class="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div
            v-for="s in stats"
            :key="s.label"
            class="rounded-2xl border border-(--line-1) bg-(--surface-1) p-4 transition-colors hover:border-(--line-2)"
          >
            <dd class="font-display text-3xl font-bold tracking-tight">
              <Counter
                :value="s.value"
                :suffix="s.suffix"
                class="bg-gradient-to-r from-fuchsia-300 to-purple-300 bg-clip-text text-transparent"
              />
            </dd>
            <dt class="mt-1.5 text-xs leading-snug text-(--ink-faint)">
              {{ s.label }}
            </dt>
          </div>
        </dl>
      </div>

      <!-- Polaroid photo -->
      <div
        class="relative mx-auto w-full max-w-sm"
        data-reveal
        :style="{ '--reveal-delay': '150ms' }"
      >
        <p class="mb-3 flex items-center justify-end gap-1.5 pr-4 text-sm text-(--ink-soft)">
          Это я
          <ArrowDownRight class="size-4" aria-hidden="true" />
        </p>
        <div
          class="group relative rotate-[4deg] rounded-2xl bg-white p-3 pb-16 shadow-2xl shadow-black/60 transition-transform duration-500 hover:rotate-1"
        >
          <!-- скотч-полоски -->
          <span
            aria-hidden="true"
            class="absolute -top-3 left-7 z-10 h-7 w-24 -rotate-6 rounded-[2px] bg-white/30 shadow-[0_2px_6px_rgba(0,0,0,0.25)] backdrop-blur-[1px]"
          />
          <span
            aria-hidden="true"
            class="absolute -top-2 right-9 z-10 h-7 w-20 rotate-[5deg] rounded-[2px] bg-white/25 shadow-[0_2px_6px_rgba(0,0,0,0.25)] backdrop-blur-[1px]"
          />
          <div class="overflow-hidden rounded-xl bg-zinc-800">
            <img
              src="/images/me.png"
              alt="Евгений Абрамов — фотография"
              class="aspect-[4/5] w-full scale-[1.04] object-cover blur-[2px] transition-all duration-700 group-hover:blur-0"
              loading="lazy"
            />
          </div>
          <p
            class="absolute inset-x-0 bottom-4 text-center font-display text-base font-medium text-zinc-500"
          >
            Евгений · frontend-разработчик
          </p>
        </div>
      </div>
    </div>

    <!-- Компетенции из резюме — языком заказчика -->
    <div class="relative mx-auto mt-16 max-w-7xl px-5 sm:mt-20 sm:px-8">
      <div data-reveal class="text-center">
        <h3 class="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          Что я умею — простыми словами
        </h3>
        <p class="mt-3 text-base text-(--ink-mute)">
          компетенции из резюме без жаргона — что это даёт вашему проекту
        </p>
      </div>
      <ul class="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <li
          v-for="(c, i) in competencies"
          :key="c.title"
          data-reveal
          :style="{ '--reveal-delay': `${i * 70}ms` }"
          class="group rounded-2xl border border-(--line-1) bg-(--surface-1) p-5 transition-all duration-300 hover:-translate-y-1 hover:border-(--line-25) hover:bg-(--surface-3)"
        >
          <span
            class="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-500/20 via-purple-500/10 to-transparent text-(--accent-soft) transition-transform duration-300 group-hover:scale-110"
          >
            <component :is="c.icon" class="size-5" aria-hidden="true" />
          </span>
          <h4 class="mt-4 font-display text-base font-bold">{{ c.title }}</h4>
          <p class="mt-2 text-sm leading-relaxed text-(--ink-mute)">{{ c.text }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
