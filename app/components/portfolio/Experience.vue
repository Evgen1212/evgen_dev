<script setup lang="ts">
import { ExternalLink, MapPin } from "lucide-vue-next";

/**
 * Опыт работы — блоки мест работы из резюме Абрамова Евгения.
 * Скриншоты сайтов работодателей: /images/work-<key>.jpg (сняты headless-браузером).
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
        <p class="mt-4 text-base text-zinc-400 sm:text-lg">
          5+ лет коммерческой разработки — от промышленного сектора до финтеха
        </p>
      </div>

      <div class="mx-auto flex max-w-5xl flex-col gap-10 sm:gap-14">
        <article
          v-for="(job, i) in jobs"
          :key="job.key"
          data-reveal
          :style="{ '--reveal-delay': `${Math.min(i, 2) * 60}ms` }"
          class="group grid overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] shadow-xl shadow-black/30 transition-all duration-500 hover:border-white/20 hover:shadow-2xl lg:grid-cols-2"
        >
          <!-- скриншот сайта работодателя -->
          <a
            :href="job.href"
            target="_blank"
            rel="noopener noreferrer"
            :class="i % 2 === 1 ? 'lg:order-2' : ''"
            :aria-label="`Сайт ${job.company} (${job.domain}) — открыть в новой вкладке`"
            class="relative block aspect-[16/10] overflow-hidden lg:aspect-auto"
          >
            <img
              :src="`/images/work-${job.key}.jpg`"
              :alt="`Скриншот сайта ${job.company} — ${job.domain}`"
              loading="lazy"
              class="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div
              aria-hidden="true"
              class="absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0a0a0b]/40"
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
            <div class="flex flex-wrap items-center gap-2">
              <span class="rounded-full bg-white px-3.5 py-1 text-xs font-bold text-black">
                {{ job.period }}
              </span>
              <span class="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-zinc-400">
                {{ job.duration }}
              </span>
              <span class="inline-flex items-center gap-1 text-xs text-zinc-500">
                <MapPin class="size-3.5" aria-hidden="true" />
                {{ job.city }}
              </span>
            </div>

            <h3 class="mt-4 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {{ job.company }}
            </h3>
            <p class="mt-1 text-sm font-semibold text-fuchsia-300">{{ job.role }}</p>

            <ul class="mt-4 flex-1 space-y-2.5 text-sm leading-relaxed text-zinc-400">
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
              class="mt-4 border-l-2 border-fuchsia-400/40 pl-3 text-xs italic leading-relaxed text-zinc-500"
            >
              {{ job.note }}
            </p>

            <div class="mt-5 flex flex-wrap gap-1.5">
              <span
                v-for="t in job.stack"
                :key="t"
                class="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] font-medium text-zinc-300"
              >
                {{ t }}
              </span>
            </div>

            <a
              :href="job.href"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-zinc-300 transition-colors hover:text-white"
            >
              Открыть сайт — {{ job.domain }}
              <ExternalLink
                class="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
