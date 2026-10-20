<script setup lang="ts">
import { ChevronDown, ExternalLink, MapPin } from "lucide-vue-next";

/* ─── Мобильный аккордеон: каждая работа — отдельный айтем ─── */
const openJob = ref<number | null>(0);
const toggleJob = (i: number) => {
  if (window.innerWidth < 1024) {
    openJob.value = openJob.value === i ? null : i;
  }
};
/* На мобилке клик по скриншоту раскрывает айтем, на десктопе — ведёт на сайт */
const onJobShotClick = (e: MouseEvent, i: number) => {
  if (window.innerWidth < 1024) {
    e.preventDefault();
    toggleJob(i);
  }
};

/**
 * Опыт работы — блоки мест работы из резюме Абрамова Евгения.
 * Скриншоты сайтов работодателей: /images/opt/work-<key>-*.webp (сняты headless-браузером).
 */
type Job = {
  key: string;
  company: string;
  domain: string;
  href: string;
  city: string;
  period: string;
  duration: string;
  role: string;
  highlights: string[];
  stack: string[];
  note?: string;
};

const jobs: Job[] = [
  {
    key: "autoeuro",
    company: "Авто-Евро",
    domain: "autoeuro.ru",
    href: "https://autoeuro.ru/",
    city: "Москва",
    period: "февраль 2024 — июнь 2026",
    duration: "2 года 5 месяцев",
    role: "Ведущий фронтенд-разработчик / Lead",
    highlights: [
      "Курировал фронтенд-архитектуру: миграция legacy-кода на Vue 3, обновление зависимостей с управлением breaking changes",
      "Установил стандарты качества (код-стайл, типизация, тестирование), проводил code review и наставничество",
      "Оптимизировал скорость загрузки и первый отклик production-приложений по Google PageSpeed",
      "Взаимодействие с backend и DevOps: API-контракты, микросервисная архитектура, деплой фронтенд-проектов",
      "Провёл аудит сторонних проектов: производительность, security, архитектурные anti-patterns",
    ],
    stack: ["Vue 3", "TypeScript", "Nuxt 3", "Vite", "Webpack", "REST API", "WebSocket", "CI/CD", "Docker"],
  },
  {
    key: "yabbi",
    company: "Yabbi",
    domain: "yabbi.me",
    href: "https://yabbi.me/",
    city: "Москва",
    period: "июнь 2023 — январь 2024",
    duration: "8 месяцев",
    role: "Frontend-разработчик (Vue 3 / TypeScript)",
    highlights: [
      "Спроектировал и реализовал SPA-приложение с нуля на стеке Vue 3 + Vite + Pinia + TypeScript (MVP-first)",
      "Выступал единственным фронтенд-разработчиком: ключевые архитектурные решения и весь стек проекта",
      "Разработал модули авторизации, управления состоянием и адаптивного интерфейса",
      "Внедрил TypeScript strict mode, Vitest, ESLint, Git Flow и подход Document-as-Code",
    ],
    stack: ["Vue 3", "TypeScript", "Vite", "Pinia", "REST API", "Vitest"],
  },
  {
    key: "alfabit",
    company: "AlfaBit group",
    domain: "alfabit.org",
    href: "https://alfabit.org/",
    city: "Краснодар",
    period: "июль 2021 — июль 2023",
    duration: "2 года 1 месяц",
    role: "Frontend-разработчик (Nuxt.js / Vue.js)",
    highlights: [
      "Фронтенд финтех-продуктов: крипто-биржа, крипто-обменник, user dashboard, admin panel на Nuxt 2/3 SSR + Vue 2/3",
      "Создал с ментором UI-библиотеку из 50+ компонентов на базе Storybook (полностью свой UI-дизайн)",
      "Покрытие приложения UI-тестами (Jest, Cypress) до уровня 70%+ — баги ловились до продакшена",
      "Оптимизировал SSR-приложение по Google PageSpeed, работал с tree shaking",
      "JWT + refresh token, WebSocket real-time для курсов пар, i18n на 5+ языков",
    ],
    stack: ["Nuxt 2/3", "Vue 2/3", "TypeScript", "SSR/SSG", "Pinia/Vuex", "WebSocket", "Storybook", "Jest/Cypress"],
  },
  {
    key: "titul",
    company: "Титул-2005",
    domain: "group-sdt.ru",
    href: "https://group-sdt.ru/",
    city: "Саратов",
    period: "ноябрь 2020 — июль 2021",
    duration: "9 месяцев",
    role: "Веб-разработчик / Frontend-разработчик (Vue.js)",
    highlights: [
      "Разрабатывал SPA-фронтенд на Vue 2 с UI-библиотекой DevExtreme: переиспользуемые компоненты, утилиты, валидация форм",
      "Реализовал интерактивные таблицы и графики с редактированием, сортировкой и фильтрацией",
      "Внедрил систему ролей: управление доступом на уровне компонентов и отдельных страниц",
      "Интегрировал фронтенд с REST API: error handling, loading states, сложная валидация форм",
    ],
    stack: ["Vue 2", "JavaScript", "DevExtreme", "REST API", "HTML5", "CSS3", "Git"],
    note: "Этот проект был моей школой в коммерческой разработке — научил писать production-код, работать в команде и понимать требования бизнеса.",
  },
];
</script>

<template>
  <section id="experience" class="relative scroll-mt-24 py-24 sm:py-32">
    <!-- soft glow -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] max-w-full -translate-x-1/2 rounded-full bg-purple-800/15 blur-3xl"
    />

    <div class="relative mx-auto max-w-7xl px-5 sm:px-8">
      <div data-reveal class="mb-12 text-center sm:mb-16">
        <SectionKicker>Карьерный путь</SectionKicker>
        <h2 class="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Опыт работы
        </h2>
        <p class="mt-4 text-base text-(--ink-mute) sm:text-lg">
          5+ лет коммерческой разработки — от промышленного сектора до финтеха
        </p>
      </div>

      <div class="mx-auto flex max-w-5xl flex-col gap-10 sm:gap-14">
        <article
          v-for="(job, i) in jobs"
          :key="job.key"
          data-reveal
          :style="{ '--reveal-delay': `${Math.min(i, 2) * 60}ms` }"
          class="group grid overflow-hidden rounded-[28px] border border-(--line-1) bg-(--surface-1) shadow-xl shadow-black/30 transition-all duration-500 hover:border-(--line-2) hover:shadow-2xl lg:grid-cols-2"
        >
          <!-- скриншот сайта работодателя -->
          <a
            :href="job.href"
            target="_blank"
            rel="noopener noreferrer"
            :class="i % 2 === 1 ? 'lg:order-2' : ''"
            :aria-label="`Сайт ${job.company} (${job.domain}) — открыть в новой вкладке`"
            class="relative block aspect-[16/10] overflow-hidden lg:aspect-auto"
            @click="onJobShotClick($event, i)"
          >
            <SmartImage
              :name="`work-${job.key}`"
              :alt="`Скриншот сайта ${job.company} — ${job.domain}`"
              :width="1200"
              :height="750"
              :widths="[480, 720, 960, 1200]"
              sizes="(min-width: 1280px) 512px, (min-width: 1024px) 50vw, 100vw"
              loading="lazy"
              fetchpriority="low"
              class="absolute inset-0"
              img-class="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div
              aria-hidden="true"
              class="absolute inset-0 bg-gradient-to-t from-(--fade-a) via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-(--fade-b)"
              :class="i % 2 === 1 ? 'lg:bg-gradient-to-l' : ''"
            />
            <!-- браузерная рамка -->
            <div
              aria-hidden="true"
              class="absolute inset-x-0 top-0 flex items-center gap-1.5 bg-black/50 px-4 py-2.5 backdrop-blur-md"
            >
              <span class="size-2.5 rounded-full bg-[#ff5f57]" />
              <span class="size-2.5 rounded-full bg-[#febc2e]" />
              <span class="size-2.5 rounded-full bg-[#28c840]" />
              <span class="ml-2 truncate rounded-md bg-white/10 px-2.5 py-0.5 font-mono text-[11px] text-zinc-300">
                {{ job.domain }}
              </span>
            </div>
          </a>

          <!-- контент -->
          <div class="flex flex-col p-6 sm:p-8" :class="i % 2 === 1 ? 'lg:order-1' : ''">
            <button
              type="button"
              class="flex w-full items-start justify-between gap-3 text-left lg:cursor-default"
              :aria-expanded="openJob === i"
              @click="toggleJob(i)"
            >
              <div class="flex-1">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="rounded-full bg-white px-3.5 py-1 text-xs font-bold text-black">
                    {{ job.period }}
                  </span>
                  <span class="rounded-full border border-(--line-1) bg-(--surface-3) px-3 py-1 text-xs text-(--ink-mute)">
                    {{ job.duration }}
                  </span>
                  <span class="inline-flex items-center gap-1 text-xs text-(--ink-faint)">
                    <MapPin class="size-3.5" aria-hidden="true" />
                    {{ job.city }}
                  </span>
                </div>

                <h3 class="mt-4 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  {{ job.company }}
                </h3>
                <p class="mt-1 text-sm font-semibold text-(--accent-soft)">{{ job.role }}</p>
              </div>

              <ChevronDown
                class="mt-1 size-5 shrink-0 text-(--ink-faint) transition-transform duration-300 lg:hidden"
                :class="openJob === i && 'rotate-180'"
                aria-hidden="true"
              />
            </button>

            <div
              class="grid transition-all duration-500 ease-in-out lg:grid-rows-[1fr] lg:opacity-100"
              :class="openJob === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
            >
              <div class="overflow-hidden">
                <ul class="mt-4 flex-1 space-y-2.5 text-sm leading-relaxed text-(--ink-mute)">
                  <li v-for="h in job.highlights" :key="h" class="flex gap-2.5">
                    <span
                      aria-hidden="true"
                      class="mt-[7px] size-1.5 shrink-0 rounded-full bg-gradient-to-br from-fuchsia-400 to-purple-500"
                    />
                    <span>{{ h }}</span>
                  </li>
                </ul>

                <p
                  v-if="job.note"
                  class="mt-4 border-l-2 border-fuchsia-400/40 pl-3 text-xs italic leading-relaxed text-(--ink-faint)"
                >
                  {{ job.note }}
                </p>

                <div class="mt-5 flex flex-wrap gap-1.5">
                  <span
                    v-for="t in job.stack"
                    :key="t"
                    class="rounded-full border border-(--line-1) bg-(--surface-3) px-2.5 py-1 text-[11px] font-medium text-(--ink-soft)"
                  >
                    {{ t }}
                  </span>
                </div>

                <a
                  :href="job.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-(--ink-soft) transition-colors hover:text-(--ink)"
                >
                  Открыть сайт — {{ job.domain }}
                  <ExternalLink
                    class="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
