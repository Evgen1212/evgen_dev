<script setup lang="ts">
import { ArrowDownRight, ArrowRight, ChevronDown, Download, Zap } from "lucide-vue-next";
import { heroServices } from "./data";
// Marquee, MarqueeDot, DuckMascot — автоимпорт Nuxt (pathPrefix: false)
</script>

<template>
  <section id="top" class="relative flex min-h-[100svh] flex-col overflow-hidden">
    <!-- Aurora background (слои с разной глубиной параллакса) -->
    <div aria-hidden="true" class="absolute inset-0 overflow-hidden">
      <div class="parallax-slow absolute inset-[-6%]">
        <div class="aurora-layer aurora-a" />
      </div>
      <div class="parallax-deep absolute inset-[-6%]">
        <div class="aurora-layer aurora-b" />
      </div>
      <!-- vignette to keep edges dark -->
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,10,11,0.7)_100%)]" />
    </div>

    <!-- Content -->
    <div class="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 px-5 pb-24 pt-32 sm:px-8 lg:grid-cols-[1.25fr_1fr] lg:gap-8 lg:pt-28">
      <!-- Left: title -->
      <div data-reveal>
        <p class="mb-6 inline-flex items-center gap-2.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-1.5 text-sm font-medium text-emerald-300">
          <span class="relative flex size-2" aria-hidden="true">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
            <span class="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          Открыт к новым проектам
        </p>
        <h1 class="font-display text-[16vw] font-light leading-[0.98] tracking-tight sm:text-[7rem] lg:text-[6.5rem] xl:text-[8rem]">
          Абрамов<br />Евгений
        </h1>
        <p class="mt-7 max-w-xl text-xl font-light leading-snug text-zinc-100/90 sm:text-2xl">
          Senior Frontend-разработчик —
          <span class="text-shine font-normal">Vue 3 · Nuxt · TypeScript</span>.
          <br />
          SPA и SSR-приложения от идеи до продакшена
        </p>
        <div class="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#contact"
            class="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-bold text-black shadow-xl shadow-black/40 transition-all duration-300 hover:scale-[1.04] hover:shadow-fuchsia-500/20 active:scale-95"
          >
            Обсудить проект
          </a>
          <a
            href="/resume.pdf"
            download="Abramov-Evgeniy-resume.pdf"
            class="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.04] px-6 py-4 text-base font-semibold text-zinc-200 backdrop-blur-sm transition-all duration-300 hover:border-fuchsia-400/40 hover:bg-fuchsia-500/10 hover:text-white active:scale-95"
          >
            <Download class="size-[18px] opacity-80" aria-hidden="true" />
            Резюме PDF
            <span class="sr-only">— открыть в новой вкладке и скачать</span>
          </a>
        </div>
      </div>

      <!-- Right: latest work card -->
      <div class="relative hidden lg:block" data-reveal :style="{ '--reveal-delay': '150ms' }">
        <p class="mb-3 ml-1 flex items-center gap-1.5 text-sm text-zinc-300">
          Одна из последних работ
          <ArrowDownRight class="size-4" aria-hidden="true" />
        </p>

        <a
          href="#cases"
          class="card-shine block rounded-[28px] bg-white p-3 shadow-2xl shadow-black/50 transition-transform duration-500 hover:-translate-y-1.5"
        >
          <div class="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-black">
            <img
              src="/images/craftout.png"
              alt="CraftOut — игровая платформа"
              class="absolute inset-0 h-full w-full object-cover opacity-90"
            />
            <div class="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/40" />
            <div class="absolute inset-x-0 top-6 flex justify-center">
              <span class="inline-flex items-center gap-1.5 font-display text-3xl sm:text-4xl font-bold italic tracking-tight text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.8)]">
                Craft
                <span class="grid size-9 sm:size-10 -skew-x-6 place-items-center rounded-xl border border-white/40 bg-white/10 backdrop-blur-sm">
                  <Zap class="size-5 sm:size-6 fill-white text-white" />
                </span>
                Out
              </span>
            </div>
            <div class="absolute inset-x-0 bottom-4 flex justify-center">
              <span class="rounded-full border border-white/25 bg-black/40 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm">
                Игровая платформа · Full-stack
              </span>
            </div>
          </div>
          <div class="px-2 pb-1.5 pt-4 text-black">
            <div class="font-display text-lg font-bold">CraftOut</div>
            <div class="mt-0.5 text-sm text-black/60">Полный цикл разработки</div>
          </div>
        </a>

        <a
          href="#cases"
          class="group mt-4 ml-1 inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
        >
          Больше работ
          <ArrowRight class="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </a>
      </div>
    </div>

    <!-- Duck (кликабельный маскот-пасхалка) -->
    <DuckMascot />

    <!-- Scroll hint (декоративный, слева — утка справа) -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute bottom-24 left-5 z-10 hidden select-none flex-col items-center gap-1.5 text-zinc-400 motion-reduce:animate-none md:flex sm:left-8 animate-bounce"
    >
      <span class="text-[11px] font-bold uppercase tracking-[0.3em]">листай</span>
      <ChevronDown class="size-4" />
    </div>

    <!-- Services marquee -->
    <div class="relative z-10 border-t border-white/10 bg-black/25 backdrop-blur-md">
      <Marquee :duration="38" pause-on-hover class="py-5">
        <span v-for="s in heroServices" :key="s.label" class="flex items-center">
          <!-- ServiceBadge (инлайн: локальный под-компонент React) -->
          <span class="flex items-center gap-3 whitespace-nowrap">
            <span v-if="s.emoji" aria-hidden="true" class="text-xl sm:text-2xl">
              {{ s.emoji }}
            </span>
            <span
              v-else
              aria-hidden="true"
              class="grid h-7 min-w-7 place-items-center rounded-md bg-white/15 px-1.5 text-[11px] font-extrabold tracking-tight text-white/90"
            >
              {{ s.badge }}
            </span>
            <span class="text-lg sm:text-xl font-medium text-white/90">{{ s.label }}</span>
          </span>
          <MarqueeDot />
        </span>
      </Marquee>
    </div>
  </section>
</template>
