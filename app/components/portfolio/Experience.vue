<script setup lang="ts">
import { ChevronDown, ExternalLink, MapPin } from "lucide-vue-next";

/* ─── Мобильный аккордеон: каждая работа — отдельный айтем ─── */
const isMobile = useMediaQuery('(max-width: 640px)');
const openJob = ref<number | null>(0);
const toggleJob = (i: number) => {
  if (!isMobile.value) return;
  openJob.value = openJob.value === i ? null : i;
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
  <section id="experience" class="section section--surface" aria-labelledby="experience-title">
    <div class="container">
      <header class="section-head" data-reveal>
        <p class="kicker">Карьерный путь</p>
        <h2 id="experience-title" class="section-title">Опыт работы</h2>
        <p class="section-lede">
          5+ лет коммерческой разработки — от промышленного сектора до финтеха.
        </p>
      </header>

      <div class="jobs">
        <article
          v-for="(job, i) in jobs"
          :key="job.key"
          class="job"
          data-reveal
          :style="{ '--reveal-delay': `${i * 60}ms` }"
        >
          <a
            class="job-media"
            :href="job.href"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`Сайт ${job.company} (${job.domain}) — открыть в новой вкладке`"
          >
            <span class="browser-bar browser-bar--compact" aria-hidden="true">
              <span class="browser-dots"><span /><span /><span /></span>
              <span class="browser-url">{{ job.domain }}</span>
            </span>
            <img
              :src="useAsset(`images/opt/work-${job.key}-1200.webp`)"
              :alt="`Скриншот сайта ${job.company}`"
              width="1200"
              height="750"
              loading="lazy"
              decoding="async"
            />
          </a>
          <div class="job-body">
            <div class="meta-row">
              <span class="chip chip--solid">{{ job.period }}</span>
              <span class="chip">{{ job.duration }}</span>
              <span class="chip chip--plain">{{ job.city }}</span>
            </div>
            <h3 class="job-heading">
              <button
                class="job-toggle"
                type="button"
                :aria-expanded="openJob === i"
                :aria-controls="`job-details-${job.key}`"
                :tabindex="isMobile ? 0 : -1"
                @click="toggleJob(i)"
              >
                <span class="job-toggle-text">
                  <span class="job-company">{{ job.company }}</span>
                  <span class="job-role">{{ job.role }}</span>
                </span>
                <span class="job-chevron" aria-hidden="true">
                  <svg class="icon"><use href="#i-chevron-down" /></svg>
                </span>
              </button>
            </h3>
            <div
              :id="`job-details-${job.key}`"
              class="job-details"
              :class="{ 'is-open': isMobile && openJob === i }"
            >
              <div class="job-details-inner">
                <ul class="bullets">
                  <li v-for="highlight in job.highlights" :key="highlight">{{ highlight }}</li>
                </ul>
                <div class="tag-row">
                  <span v-for="item in job.stack" :key="item">{{ item }}</span>
                </div>
                <a class="text-link" :href="job.href" target="_blank" rel="noopener noreferrer">
                  Открыть сайт — {{ job.domain }}
                  <svg class="icon" aria-hidden="true"><use href="#i-arrow-up-right" /></svg>
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
