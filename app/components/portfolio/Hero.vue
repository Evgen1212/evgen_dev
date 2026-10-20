<script setup lang="ts">
import {
  ArrowDownRight,
  ArrowRight,
  ChevronDown,
  FileText,
} from 'lucide-vue-next';
import { heroServices } from './data';
// Marquee, MarqueeDot, ParrotMascot, ResumeModal — автоимпорт Nuxt (pathPrefix: false)
/* Общий стейт со StickyCta: резюме можно открыть и из липкой панели */
const hireOpen = useState('resume-open', () => false);
</script>

<template>
  <section
    id="top"
    class="relative flex min-h-[100svh] flex-col overflow-hidden"
  >
    <!-- Aurora background (слои с разной глубиной параллакса) -->
    <div aria-hidden="true" class="absolute inset-0 overflow-hidden">
      <div class="parallax-slow absolute inset-[-6%]">
        <div class="aurora-layer aurora-a" />
      </div>
      <div class="parallax-deep absolute inset-[-6%]">
        <div class="aurora-layer aurora-b" />
      </div>
      <!-- vignette to keep edges clean -->
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--vignette)_100%)]"
      />
    </div>

    <!-- Content -->
    <div
      class="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 px-5 pb-24 pt-32 sm:px-8 lg:grid-cols-[1.25fr_1fr] lg:gap-8 lg:pt-28"
    >
      <!-- Left: title -->
      <div>
        <p
          class="mb-6 inline-flex items-center gap-2.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-1.5 text-sm font-medium text-(--accent-emerald)"
        >
          <span class="relative flex size-2" aria-hidden="true">
            <span
              class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none"
            />
            <span
              class="relative inline-flex size-2 rounded-full bg-emerald-400"
            />
          </span>
          Открыт к новым проектам
        </p>
        <h1
          class="font-display text-[15vw] font-light leading-[1.02] tracking-tight sm:text-[6.5rem] lg:text-[6rem] xl:text-[7.5rem]"
        >
          Евгений Абрамов
        </h1>
        <p
          class="mt-7 max-w-xl text-xl font-light leading-snug text-(--ink-soft) sm:text-2xl"
        >
          Senior Frontend-разработчик —
          <span class="text-shine font-normal"
            >Vue · Nuxt · TypeScript · React(Next.js)</span
          >.
          <br />
          SPA и SSR-приложения от идеи до продакшена
        </p>
        <div
          class="mt-10 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:items-center"
        >
          <a
            href="#contact"
            class="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-(--line-1) bg-white px-8 py-4 text-base font-bold text-black shadow-xl shadow-black/40 transition-all duration-300 hover:scale-[1.04] hover:shadow-fuchsia-500/20 active:scale-95 sm:w-auto"
          >
            Обсудить проект
          </a>
          <span
            class="select-none text-center text-sm font-medium text-(--ink-faint)"
            aria-hidden="true"
            >или</span
          >
          <button
            type="button"
            class="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-(--line-15) bg-(--surface-2) px-6 py-4 text-base font-semibold text-(--ink-soft) backdrop-blur-sm transition-all duration-300 hover:border-fuchsia-400/40 hover:bg-fuchsia-500/10 hover:text-(--ink) active:scale-95 sm:w-auto"
            @click="hireOpen = true"
          >
            <FileText class="size-[18px] opacity-80" aria-hidden="true" />
            Нанять на работу
            <span class="sr-only"
              >— откроет превью резюме с кнопкой скачивания и ссылкой на
              hh.ru</span
            >
          </button>
        </div>
        <ResumeModal v-model:open="hireOpen" />
      </div>

      <!-- Right: latest job teaser -->
      <div class="relative hidden lg:block">
        <p
          class="mb-3 ml-1 flex items-center gap-1.5 text-sm text-(--ink-soft)"
        >
          Последнее место работы
          <ArrowDownRight class="size-4" aria-hidden="true" />
        </p>

        <a
          href="#experience"
          class="card-shine block rounded-[28px] bg-white p-3 shadow-2xl shadow-black/50 transition-transform duration-500 hover:-translate-y-1.5"
          aria-label="Перейти к разделу «Опыт работы»"
        >
          <div
            class="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-black"
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
              class="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/45"
            />
            <div class="absolute inset-x-0 bottom-4 flex justify-center">
              <span
                class="rounded-full border border-white/25 bg-black/40 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm"
              >
                Ведущий фронтенд-разработчик · Lead
              </span>
            </div>
          </div>
          <div class="px-2 pb-1.5 pt-4 text-black">
            <div class="font-display text-lg font-bold">Авто-Евро</div>
            <div class="mt-0.5 text-sm text-black/60">
              2 года 5 месяцев · Vue 3 · Nuxt 3
            </div>
          </div>
        </a>

        <a
          href="#experience"
          class="group mt-4 ml-1 inline-flex items-center gap-2 text-sm font-medium text-(--ink-soft) transition-colors hover:text-(--ink)"
        >
          Весь опыт работы
          <ArrowRight
            class="size-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </a>
      </div>
    </div>

    <!-- Parrot (кликабельный маскот-пасхалка) -->
    <ParrotMascot />

    <!-- Scroll hint (декоративный, слева — попугай справа) -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute bottom-24 left-5 z-10 hidden select-none flex-col items-center gap-1.5 text-(--ink-mute) motion-reduce:animate-none md:flex sm:left-8 animate-bounce"
    >
      <span class="text-[11px] font-bold uppercase tracking-[0.3em]"
        >листай</span
      >
      <ChevronDown class="size-4" />
    </div>

    <!-- Services marquee -->
    <div
      class="relative z-10 border-t border-(--line-1) bg-(--strip) backdrop-blur-md"
    >
      <Marquee :duration="38" pause-on-hover class="py-5">
        <span
          v-for="s in heroServices"
          :key="s.label"
          class="flex items-center"
        >
          <!-- Бейдж сервиса: иконка технологии → emoji → текстовый бейдж -->
          <span class="flex items-center gap-3 whitespace-nowrap">
            <img
              v-if="s.icon"
              :src="useAsset(`icons/tech/${s.icon}.svg`)"
              alt=""
              width="26"
              height="26"
              class="size-6 shrink-0 sm:size-7"
              loading="lazy"
              decoding="async"
            />
            <span
              v-else-if="s.emoji"
              aria-hidden="true"
              class="text-xl sm:text-2xl"
            >
              {{ s.emoji }}
            </span>
            <span
              v-else
              aria-hidden="true"
              class="grid h-7 min-w-7 place-items-center rounded-md bg-(--surface-strong) px-1.5 text-[11px] font-extrabold tracking-tight text-(--ink)"
            >
              {{ s.badge }}
            </span>
            <span class="text-lg sm:text-xl font-medium text-(--ink)">{{
              s.label
            }}</span>
          </span>
          <MarqueeDot />
        </span>
      </Marquee>
    </div>
  </section>
</template>
