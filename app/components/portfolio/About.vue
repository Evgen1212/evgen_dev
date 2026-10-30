<script setup lang="ts">
/** Статистика из реального резюме (замена React-версии) */
const stats = [
  { value: 5, suffix: "+", label: "лет в коммерческой разработке" },
  { value: 6, suffix: "", label: "отраслей — от финтеха до промышленности" },
  { value: 3, suffix: "", label: "федеральных бренда в заказных проектах" },
  { value: 4, suffix: "", label: "финтех-продукта в продакшене" },
  { value: 2, suffix: " нед.", label: "бесплатной поддержки после запуска" },
];

</script>

<template>
  <section id="about" class="m3-section">
    <div
      class="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10"
    >
      <!-- Text -->
      <div data-reveal>
        <SectionKicker>Кто я</SectionKicker>
        <h2
          class="m3-headline-lg"
        >
          Обо мне
        </h2>
        <div
          class="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-(--ink-soft) sm:text-lg"
        >
          <p>
            Меня зовут Евгений, я frontend-разработчик с 5+ годами коммерческого
            опыта. Специализируюсь на Vue 3 / Nuxt 3 / TypeScript, также
            работаю с React / Next.js. Разрабатываю SPA и SSR/SSG-приложения —
            от лендингов до финтех-сервисов с realtime-данными.
          </p>
          <p>
            Проектирую архитектуру по FSD, собираю масштабируемые UI-киты и
            дизайн-системы, довожу проекты по Web Vitals и тестам. Последние
            годы — лид-роль: миграция legacy на Vue 3, код-ревью и
            наставничество.
          </p>
        </div>

        <!-- Counters -->
        <dl class="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div
            v-for="s in stats"
            :key="s.label"
            class="m3-list-item p-4"
          >
            <dd class="m3-headline-md text-(--m3-primary)">
              <Counter
                :value="s.value"
                :suffix="s.suffix"
              />
            </dd>
            <dt class="mt-1.5 text-xs leading-snug text-(--ink-faint)">
              {{ s.label }}
            </dt>
          </div>
        </dl>
      </div>

      <!-- Profile card (M3) — на mobile фото в Hero -->
      <div
        class="relative mx-auto hidden w-full max-w-sm lg:block"
        data-reveal
        :style="{ '--reveal-delay': '150ms' }"
      >
        <p class="mb-3 flex items-center justify-end gap-1.5 pr-1 text-sm text-(--ink-soft)">
          Это я
          <span class="material-symbols-outlined text-base" aria-hidden="true"
            >south_east</span
          >
        </p>
        <figure class="m3-card overflow-hidden p-0">
          <div class="overflow-hidden bg-(--m3-surface-container-high)">
            <SmartImage
              name="me"
              alt="Евгений Абрамов — фотография"
              :width="382"
              :height="500"
              :widths="[382]"
              sizes="(min-width: 1024px) 380px, 80vw"
              loading="lazy"
              fetchpriority="low"
              class="w-full"
              img-class="aspect-[4/5] w-full object-cover"
            />
          </div>
          <figcaption class="border-t border-(--outline-variant) px-5 py-4">
            <p class="m3-title-md text-(--ink)">
              Евгений Абрамов
            </p>
            <p class="mt-0.5 text-sm text-(--ink-mute)">
              Senior Frontend · Vue / Nuxt / TypeScript
            </p>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
