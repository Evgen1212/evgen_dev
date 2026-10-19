<script setup lang="ts">
import { ArrowUpRight } from "lucide-vue-next";

/**
 * Коммерческие проекты, в которых участвовал как фронтенд-разработчик.
 * Скриншоты: /images/proj-<key>.jpg (сняты headless-браузером).
 */
const projects = [
  {
    key: "brandlab",
    title: "Brandlab",
    domain: "brandlab.ru",
    href: "https://brandlab.ru/rating/",
    desc: "Поддержка и доработка адаптивности фронтенд-страниц проекта, включая раздел «Рейтинг»: кроссбраузерная вёрстка и адаптив под мобильные устройства.",
  },
  {
    key: "skolkovo",
    title: "Сколково",
    domain: "skolkovo.ru",
    href: "https://www.skolkovo.ru/",
    desc: "Помощь во фронтенд-разработке страниц «Навигатора мероприятий», доработка страниц и адаптива разделов «Программы» и «Медиа».",
  },
  {
    key: "xfit",
    title: "X-Fit",
    domain: "xfit.ru",
    href: "https://www.xfit.ru/",
    desc: "Участие в развитии веб-проекта федеральной сети фитнес-клубов: адаптивная вёрстка посадочных страниц, доработка форм записи и интеграция с backend.",
  },
];
</script>

<template>
  <section id="projects" class="relative scroll-mt-24 py-24 sm:py-32">
    <!-- soft glow -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] max-w-full -translate-x-1/2 rounded-full bg-purple-800/15 blur-3xl"
    />
    <div class="relative mx-auto max-w-7xl px-5 sm:px-8">
      <div data-reveal class="mb-12 text-center sm:mb-16">
        <SectionKicker>Участие в проектах</SectionKicker>
        <h2 class="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Проекты
        </h2>
        <p class="mt-4 text-base text-zinc-400 sm:text-lg">
          коммерческие проекты, в разработке которых я участвовал как фронтенд-разработчик
        </p>
      </div>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        <a
          v-for="(p, i) in projects"
          :key="p.key"
          :href="p.href"
          target="_blank"
          rel="noopener noreferrer"
          data-reveal
          :style="{ '--reveal-delay': `${i * 90}ms` }"
          class="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-xl shadow-black/30 transition-all duration-500 hover:-translate-y-1.5 hover:border-white/25 hover:shadow-2xl"
          :aria-label="`${p.title} (${p.domain}) — открыть в новой вкладке`"
        >
          <!-- скриншот -->
          <div class="relative aspect-[16/10] overflow-hidden">
            <img
              :src="`/images/proj-${p.key}.jpg`"
              :alt="`Скриншот сайта ${p.title} — ${p.domain}`"
              loading="lazy"
              class="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
            />
            <div
              aria-hidden="true"
              class="absolute inset-x-0 top-0 flex items-center gap-1.5 bg-black/50 px-4 py-2.5 backdrop-blur-md"
            >
              <span class="size-2.5 rounded-full bg-[#ff5f57]" />
              <span class="size-2.5 rounded-full bg-[#febc2e]" />
              <span class="size-2.5 rounded-full bg-[#28c840]" />
              <span class="ml-2 truncate rounded-md bg-white/10 px-2.5 py-0.5 font-mono text-[11px] text-zinc-300">
                {{ p.domain }}
              </span>
            </div>
          </div>

          <!-- контент -->
          <div class="flex flex-1 flex-col p-5 sm:p-6">
            <div class="flex items-start justify-between gap-3">
              <h3 class="font-display text-xl font-bold tracking-tight">{{ p.title }}</h3>
              <ArrowUpRight
                class="mt-1 size-5 shrink-0 text-zinc-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                aria-hidden="true"
              />
            </div>
            <p class="mt-2 text-sm leading-relaxed text-zinc-400">{{ p.desc }}</p>
            <span
              class="mt-4 inline-flex items-center gap-1.5 self-start text-xs font-semibold text-fuchsia-300/90 transition-colors group-hover:text-fuchsia-300"
            >
              {{ p.domain }}
            </span>
          </div>
        </a>
      </div>

      <div data-reveal class="mt-14 text-center">
        <a
          href="#contact"
          class="group inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
        >
          Есть похожий проект? Напишите мне
          <ArrowUpRight
            class="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </a>
      </div>
    </div>
  </section>
</template>
