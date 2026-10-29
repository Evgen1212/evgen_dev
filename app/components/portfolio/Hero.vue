<script setup lang="ts">
import { heroServices } from './data';

const hireOpen = useState('resume-open', () => false);
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
      <div class="hero-visual hero-visual--text-only" data-reveal>
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
