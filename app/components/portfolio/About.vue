<script setup lang="ts">
const stats = [
  { value: 5, suffix: '+', label: 'лет в коммерческой разработке' },
  { value: 6, suffix: '', label: 'отраслей — от финтеха до промышленности' },
  { value: 3, suffix: '', label: 'федеральных бренда в заказных проектах' },
  { value: 4, suffix: '', label: 'финтех-продукта в продакшене' },
  { value: 2, suffix: ' нед.', label: 'бесплатной поддержки после запуска' },
];
</script>

<template>
  <section id="about" class="section" aria-labelledby="about-title">
    <div class="container about-grid">
      <div data-reveal>
        <p class="kicker">Кто я</p>
        <h2 id="about-title" class="section-title">Обо мне</h2>
        <div class="prose">
          <p>
            Меня зовут Евгений, я frontend-разработчик с 5+ годами коммерческого
            опыта. Специализируюсь на Vue 3 / Nuxt 3 / TypeScript, также работаю
            с React / Next.js. Разрабатываю SPA и SSR/SSG-приложения — от лендингов
            до финтех-сервисов с realtime-данными.
          </p>
          <p>
            Проектирую архитектуру по FSD, собираю масштабируемые UI-киты и
            дизайн-системы, довожу проекты по Web Vitals и тестам. Последние годы —
            лид-роль: миграция legacy на Vue 3, код-ревью и наставничество.
          </p>
        </div>

        <dl class="stats stagger" data-reveal>
          <div v-for="stat in stats" :key="stat.label" class="stat">
            <dt>{{ stat.label }}</dt>
            <dd>{{ stat.value }}{{ stat.suffix }}</dd>
          </div>
        </dl>
      </div>

      <figure class="portrait" data-reveal style="--reveal-delay: 120ms">
        <img
          :src="useAsset('images/opt/me-382.webp')"
          alt="Евгений Абрамов, frontend-разработчик"
          width="382"
          height="500"
          loading="lazy"
          decoding="async"
        />
        <figcaption>Евгений · frontend-разработчик</figcaption>
      </figure>
    </div>
  </section>
</template>
