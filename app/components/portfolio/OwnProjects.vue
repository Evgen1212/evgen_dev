<script setup lang="ts">
import { ArrowUpRight, ChevronDown } from "lucide-vue-next";

/* ─── Мобильный аккордеон: каждый проект — отдельный айтем ─── */
const openProject = ref<number | null>(0);
const toggleProject = (i: number) => {
  if (window.innerWidth < 768) {
    openProject.value = openProject.value === i ? null : i;
  }
};

/**
 * Коммерческие проекты, в которых участвовал как фронтенд-разработчик.
 * Скриншоты: /images/opt/proj-<key>-*.webp (сняты headless-браузером).
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
          Заказные проекты
        </h2>
        <p class="mt-4 text-base text-(--ink-mute) sm:text-lg">
          коммерческие проекты, в разработке которых я участвовал как фронтенд-разработчик
        </p>
      </div>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        <article
          v-for="(p, i) in projects"
          :key="p.key"
          data-reveal
          :style="{ '--reveal-delay': `${i * 90}ms` }"
          class="group relative flex flex-col overflow-hidden rounded-3xl border border-(--line-1) bg-(--surface-1) shadow-xl shadow-black/30 transition-all duration-500 hover:-translate-y-1.5 hover:border-(--line-25) hover:shadow-2xl"
        >
          <!-- ссылка на весь проект (только десктоп) -->
          <a
            :href="p.href"
            target="_blank"
            rel="noopener noreferrer"
            class="absolute inset-0 z-10 hidden md:block"
            :aria-label="`${p.title} (${p.domain}) — открыть в новой вкладке`"
          />

          <!-- скриншот -->
          <div
            class="relative aspect-[16/10] cursor-pointer overflow-hidden md:cursor-default"
            @click="toggleProject(i)"
          >
            <SmartImage
              :name="`proj-${p.key}`"
              :alt="`Скриншот сайта ${p.title} — ${p.domain}`"
              :width="1200"
              :height="750"
              :widths="[480, 720, 960, 1200]"
              sizes="(min-width: 1280px) 400px, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              loading="lazy"
              fetchpriority="low"
              class="absolute inset-0"
              img-class="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
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
            <button
              type="button"
              class="flex w-full items-start justify-between gap-3 text-left md:cursor-default"
              :aria-expanded="openProject === i"
              @click="toggleProject(i)"
            >
              <h3 class="font-display text-xl font-bold tracking-tight">{{ p.title }}</h3>

              <ChevronDown
                class="mt-1 size-5 shrink-0 text-(--ink-faint) transition-transform duration-300 md:hidden"
                :class="openProject === i && 'rotate-180'"
                aria-hidden="true"
              />
              <ArrowUpRight
                class="mt-1 hidden size-5 shrink-0 text-(--ink-faint) transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-(--ink) md:block"
                aria-hidden="true"
              />
            </button>

            <div
              class="grid transition-all duration-500 ease-in-out md:grid-rows-[1fr] md:opacity-100"
              :class="openProject === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
            >
              <div class="overflow-hidden">
                <p class="mt-2 text-sm leading-relaxed text-(--ink-mute)">{{ p.desc }}</p>
                <a
                  :href="p.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="relative z-20 mt-4 inline-flex items-center gap-1.5 self-start text-xs font-semibold text-(--accent-soft) transition-colors hover:text-(--ink)"
                >
                  {{ p.domain }}
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div data-reveal class="mt-14 text-center">
        <a
          href="#contact"
          class="group inline-flex items-center gap-2 text-sm font-medium text-(--ink-soft) transition-colors hover:text-(--ink)"
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
