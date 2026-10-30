<script setup lang="ts">
import { heroServices } from './data';
const hireOpen = useState('resume-open', () => false);
</script>

<template>
  <section
    id="top"
    class="relative flex min-h-[100svh] max-md:min-h-[calc(100svh-var(--m3-bottom-nav-h)-env(safe-area-inset-bottom,0px))] flex-col m3-surface-gradient"
  >
    <div
      class="m3-hero-pad-top relative z-10 mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-4 pb-28 max-md:pb-32 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-8 lg:pb-24"
    >
      <div
        class="p-4 sm:p-8 max-md:p-0 max-md:bg-transparent lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none md:m3-card md:elevation-2 md:p-6"
      >
        <p class="m3-assist-chip mb-5 text-(--hero-open-status)">
          <span
            class="size-2 shrink-0 rounded-full bg-(--hero-open-status-dot) animate-pulse-dot motion-reduce:animate-none"
            aria-hidden="true"
          />
          Открыт к новым проектам
        </p>
        <h1 class="m3-display">
          Евгений Абрамов
        </h1>
        <p
          class="mt-5 max-w-xl text-base leading-relaxed text-(--ink-soft) sm:text-lg"
        >
          Senior Frontend-разработчик —
          <span class="font-medium text-(--m3-primary)"
            >Vue · Nuxt · TypeScript · React(Next.js)</span
          >.
          SPA и SSR-приложения от идеи до продакшена
        </p>
        <div
          class="mt-8 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:items-center"
        >
          <a href="#contact" class="m3-filled-btn w-full sm:w-auto">
            Обсудить проект
          </a>
          <button
            type="button"
            class="m3-outlined-btn w-full sm:w-auto"
            @click="hireOpen = true"
          >
            <span
              class="material-symbols-outlined text-[20px] opacity-90"
              aria-hidden="true"
              >description</span
            >
            Нанять на работу
            <span class="sr-only"
              >— откроет превью резюме с кнопкой скачивания и ссылкой на
              hh.ru</span
            >
          </button>
        </div>
        <ResumeModal v-model:open="hireOpen" />

        <!-- Фото на главной (mobile / tablet; desktop — блок «Обо мне») -->
        <figure
          class="relative mx-auto mt-8 w-full max-w-sm overflow-hidden m3-card elevation-2 lg:hidden"
        >
          <div class="overflow-hidden bg-(--m3-surface-container-high)">
            <SmartImage
              name="me"
              alt="Евгений Абрамов — фотография"
              :width="382"
              :height="500"
              :widths="[382]"
              sizes="80vw"
              loading="eager"
              fetchpriority="high"
              class="w-full"
              img-class="aspect-[4/5] w-full object-cover"
            />
          </div>
        </figure>
      </div>

      <div class="relative hidden lg:block">
        <p
          class="mb-3 ml-1 flex items-center gap-1.5 text-sm text-(--ink-soft)"
        >
          Последнее место работы
          <span class="material-symbols-outlined text-base" aria-hidden="true"
            >south_east</span
          >
        </p>

        <a
          href="#experience"
          class="m3-card m3-card-hover-lift block overflow-hidden p-3"
          aria-label="Перейти к разделу «Опыт работы»"
        >
          <div
            class="relative aspect-[16/10] overflow-hidden rounded-[var(--m3-shape-md)] bg-(--surface-3)"
          >
            <SmartImage
              name="work-autoeuro"
              alt="Скриншот сайта Авто-Евро"
              :width="1200"
              :height="750"
              :widths="[480, 720, 960, 1200]"
              sizes="(min-width: 1024px) 45vw, 1px"
              loading="lazy"
              fetchpriority="low"
              class="absolute inset-0"
              img-class="h-full w-full object-cover object-top"
            />
            <div
              class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-(--scrim) to-transparent"
            />
            <div class="absolute inset-x-0 bottom-3 flex justify-center px-3">
              <span
                class="m3-assist-chip max-w-full truncate border-0 bg-(--m3-surface-container-high)/92 text-xs text-(--ink)"
              >
                Ведущий фронтенд-разработчик · Lead
              </span>
            </div>
          </div>
          <div class="px-1 pb-1 pt-4">
            <div class="m3-title-lg text-(--ink)">
              Авто-Евро
            </div>
            <div class="mt-0.5 text-sm text-(--ink-mute)">
              2 года 5 месяцев · Vue 3 · Nuxt 3
            </div>
          </div>
        </a>

        <a
          href="#experience"
          class="group mt-4 ml-1 inline-flex items-center gap-2 text-sm font-medium text-(--m3-primary) transition-opacity hover:opacity-80"
        >
          Весь опыт работы
          <span
            class="material-symbols-outlined text-base transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
            >arrow_forward</span
          >
        </a>
      </div>
    </div>

    <div
      aria-hidden="true"
      class="pointer-events-none absolute bottom-24 left-4 z-10 hidden select-none flex-col items-center gap-1 text-(--ink-mute) md:flex sm:left-6"
    >
      <span class="m3-label normal-case tracking-normal">листай</span>
      <span class="material-symbols-outlined text-base" aria-hidden="true"
        >expand_more</span
      >
    </div>

    <div
      class="relative z-10 bg-(--m3-surface-container) py-3 sm:py-4"
      role="region"
      aria-label="Направления работы"
    >
      <Marquee :duration="42" class="py-1">
        <span
          v-for="(s, i) in heroServices"
          :key="s.label"
          class="inline-flex items-center"
        >
          <span class="m3-assist-chip mx-2 shrink-0 gap-2 border-0 py-2 pl-2 pr-3">
            <span
              class="m3-app-icon size-8 hero-tech-sway"
              :style="{ '--hero-sway-delay': `${i * 0.35}s` }"
            >
              <TechIcon v-if="s.icon" :icon="s.icon" />
              <span
                v-else-if="s.emoji"
                aria-hidden="true"
                class="text-lg leading-none"
              >
                {{ s.emoji }}
              </span>
              <span
                v-else
                aria-hidden="true"
                class="text-[11px] font-medium text-(--ink)"
              >
                {{ s.badge }}
              </span>
            </span>
            <span class="text-sm font-medium text-(--ink)">{{ s.label }}</span>
          </span>
        </span>
      </Marquee>
    </div>
  </section>
</template>
