<script setup lang="ts">
import { heroServices } from './data';

const hireOpen = useState('resume-open', () => false);

const heroFigure = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!heroFigure.value) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches) return;

  let raf = 0;
  const update = () => {
    raf = 0;
    const rect = heroFigure.value!.getBoundingClientRect();
    if (rect.bottom < -80 || rect.top > window.innerHeight + 80) return;
    const offset = Math.min(18, Math.max(0, window.scrollY) * 0.03);
    heroFigure.value!.style.setProperty('--parallax-y', `${-offset}px`);
  };
  const onScroll = () => {
    if (!raf) raf = window.requestAnimationFrame(update);
  };

  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  onBeforeUnmount(() => window.removeEventListener('scroll', onScroll));
});
</script>

<template>
  <section class="hero" id="top" aria-labelledby="hero-title">
    <div class="container hero-copy">
      <p class="eyebrow hero-eyebrow">
        <span class="status-dot" aria-hidden="true" />
        Открыт к новым проектам
      </p>
      <h1 id="hero-title" class="hero-title">Евгений <br class="hero-break" />Абрамов</h1>
      <p class="hero-lede">
        Senior Frontend-разработчик. Проектирую и собираю SPA и SSR-приложения
        на Vue 3, Nuxt и TypeScript — от первого экрана до продакшена.
      </p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="#contact">
          Обсудить проект
          <svg class="icon" aria-hidden="true"><use href="#i-arrow-right" /></svg>
        </a>
        <span class="hero-or" aria-hidden="true">или</span>
        <button class="btn btn-ghost" type="button" @click="hireOpen = true">
          <svg class="icon" aria-hidden="true"><use href="#i-file" /></svg>
          Нанять на работу
          <span class="sr-only">— откроет превью резюме с кнопкой скачивания и ссылкой на hh.ru</span>
        </button>
      </div>
      <p class="hero-meta">
        <span>Москва</span>
        <span aria-hidden="true">·</span>
        <span>5+ лет опыта</span>
        <span aria-hidden="true">·</span>
        <span>Vue 3 / Nuxt / React</span>
      </p>
    </div>

    <div class="container">
      <div class="hero-visual" data-reveal>
        <a
          ref="heroFigure"
          class="hero-figure"
          href="#experience"
          aria-label="Авто-Евро — последнее место работы. Перейти к разделу «Опыт»"
        >
          <span class="browser-bar" aria-hidden="true">
            <span class="browser-dots"><span /><span /><span /></span>
            <span class="browser-url">autoeuro.ru</span>
          </span>
          <img
            :src="useAsset('images/opt/work-autoeuro-1200.webp')"
            alt="Скриншот сайта Авто-Евро"
            width="1200"
            height="750"
            fetchpriority="high"
            decoding="async"
          />
        </a>
        <div class="hero-caption">
          <p>
            <span class="hero-caption-label">Последнее место работы</span>
            Авто-Евро — ведущий фронтенд-разработчик, 2 года 5 месяцев
          </p>
          <a class="text-link" href="#experience">
            Весь опыт
            <svg class="icon" aria-hidden="true"><use href="#i-arrow-up-right" /></svg>
          </a>
        </div>
      </div>
    </div>
  </section>

  <div class="services-strip" role="group" aria-label="Специализации">
    <div class="marquee">
      <div class="marquee-track">
        <div v-for="n in 2" :key="n" class="marquee-group" :aria-hidden="n === 2 ? 'true' : undefined">
          <span v-for="service in heroServices" :key="service.label" class="marquee-item">
            <span class="marquee-icon" aria-hidden="true">
              <TechIcon
                v-if="service.icon || service.emoji"
                :icon="service.icon"
                :emoji="service.emoji"
                :size="19"
              />
              <span v-else class="marquee-badge">{{ service.badge }}</span>
            </span>
            <span class="marquee-label">{{ service.label }}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
