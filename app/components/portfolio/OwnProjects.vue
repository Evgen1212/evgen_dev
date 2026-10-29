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
  <section id="projects" class="section" aria-labelledby="projects-title">
    <div class="container">
      <header class="section-head" data-reveal>
        <p class="kicker">Участие в проектах</p>
        <h2 id="projects-title" class="section-title">Заказные проекты</h2>
        <p class="section-lede">
          коммерческие проекты, в разработке которых я участвовал как фронтенд-разработчик
        </p>
      </header>

      <div class="project-grid stagger">
        <a
          v-for="(project, i) in projects"
          :key="project.key"
          class="project-card"
          data-reveal
          :style="{ '--reveal-delay': `${i * 70}ms` }"
          :href="project.href"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="project-media">
            <span class="browser-bar browser-bar--compact" aria-hidden="true">
              <span class="browser-dots"><span /><span /><span /></span>
              <span class="browser-url">{{ project.domain }}</span>
            </span>
            <img
              :src="useAsset(`images/opt/proj-${project.key}-1200.webp`)"
              :alt="`Скриншот сайта ${project.title}`"
              width="1200"
              height="750"
              loading="lazy"
              decoding="async"
            />
          </span>
          <span class="project-body">
            <span class="project-top">
              <span class="project-name">{{ project.title }}</span>
              <svg class="icon" aria-hidden="true"><use href="#i-arrow-up-right" /></svg>
            </span>
            <span class="project-desc">{{ project.desc }}</span>
            <span class="project-domain">{{ project.domain }}</span>
          </span>
        </a>
      </div>
    </div>
  </section>
</template>
