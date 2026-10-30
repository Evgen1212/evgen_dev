<script setup lang="ts">

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
  <section id="projects" class="m3-section">
    <div class="relative mx-auto max-w-7xl px-5 sm:px-8">
      <div data-reveal class="mb-12 text-center max-md:text-left sm:mb-16">
        <SectionKicker>Участие в проектах</SectionKicker>
        <h2 class="m3-headline-lg">
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
          class="m3-list-item m3-no-zoom-hover group relative flex flex-col overflow-hidden transition-shadow duration-300 elevation-1 hover:elevation-2"
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
              class="absolute inset-x-0 top-0 flex h-8 items-center gap-2 border-b border-(--outline-variant) bg-(--m3-surface-container-high)/95 px-3"
            >
              <span
                class="grid size-5 shrink-0 place-items-center rounded-[var(--m3-shape-sm)] bg-(--m3-primary)/15 text-[9px] font-bold uppercase text-(--m3-primary)"
              >
                {{ p.title.slice(0, 1) }}
              </span>
              <span class="truncate text-[11px] tabular-nums text-(--ink-mute)">
                {{ p.domain }}
              </span>
            </div>
          </div>

          <!-- контент -->
          <div class="flex flex-1 flex-col p-5 sm:p-6">
            <button
              type="button"
              class="flex w-full items-start justify-between gap-2 text-left md:pointer-events-none md:cursor-default"
              :aria-expanded="openProject === i"
              @click="toggleProject(i)"
            >
              <h3 class="m3-title-lg">{{ p.title }}</h3>
              <span
                class="own-projects-expand material-symbols-outlined mt-0.5 shrink-0 text-xl text-(--ink-faint) transition-transform duration-300"
                :class="openProject === i && 'rotate-180'"
                aria-hidden="true"
                >expand_more</span
              >
              <span
                class="own-projects-link-arrow material-symbols-outlined mt-0.5 shrink-0 text-xl text-(--ink-faint)"
                aria-hidden="true"
                >arrow_outward</span
              >
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
                  class="relative z-20 mt-4 inline-flex items-center gap-1.5 self-start text-xs font-semibold text-(--m3-primary) transition-colors hover:text-(--ink)"
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
          <span
            class="material-symbols-outlined text-base transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
            >arrow_outward</span
          >
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.own-projects-expand {
  display: inline-flex;
}

.own-projects-link-arrow {
  display: none;
}

@media (min-width: 768px) {
  .own-projects-expand {
    display: none !important;
  }

  .own-projects-link-arrow {
    display: inline-flex;
  }
}
</style>
