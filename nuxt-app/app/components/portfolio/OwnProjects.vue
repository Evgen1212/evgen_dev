<script setup lang="ts">
import { ArrowUpRight } from "lucide-vue-next";

/**
 * Порт src/components/portfolio/own-projects.tsx.
 * ProjectCard из React — инлайн через v-for (один SFC = один компонент),
 * арты — CaseArt :id (underborn / hostfeed).
 */
const projects = [
  {
    title: "UnderBorn",
    artId: "underborn",
    status: "В разработке",
    href: "https://underborn.ru",
  },
  {
    title: "HostFeed",
    artId: "hostfeed",
    status: "В разработке",
    href: "https://hostfeed.ru",
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
        <SectionKicker>Pet-проекты</SectionKicker>
        <h2
          class="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
        >
          Собственные проекты
        </h2>
        <p class="mt-4 text-base text-zinc-400 sm:text-lg">
          проекты, которые я разрабатываю в свободное время
        </p>
      </div>

      <div class="grid gap-8 md:grid-cols-2 md:gap-6">
        <div v-for="p in projects" :key="p.title" data-reveal>
          <a
            :href="p.href"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`${p.title} — перейти на сайт`"
            class="card-shine group relative block aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 shadow-xl shadow-black/40 transition-all duration-500 hover:-translate-y-1.5 hover:border-white/25 hover:shadow-2xl"
          >
            <CaseArt :id="p.artId" />
          </a>
          <div class="mt-4 flex items-center justify-between px-1">
            <span
              class="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-black"
            >
              <span
                class="animate-pulse-dot size-1.5 rounded-full bg-black/70"
                aria-hidden="true"
              />
              {{ p.status }}
            </span>
            <a
              :href="p.href"
              target="_blank"
              rel="noopener noreferrer"
              class="group inline-flex items-center gap-1.5 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
            >
              Перейти на сайт
              <ArrowUpRight
                class="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>

      <div data-reveal class="mt-14 text-center">
        <a
          href="#cases"
          class="inline-flex items-center gap-2 rounded-2xl bg-white px-9 py-4 text-base font-bold text-black shadow-xl shadow-black/40 transition-all duration-300 hover:scale-[1.04] active:scale-95"
        >
          Посмотреть портфолио
        </a>
      </div>
    </div>
  </section>
</template>
