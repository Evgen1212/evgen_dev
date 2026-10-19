<script setup lang="ts">
import { ArrowDownRight } from "lucide-vue-next";

/** Статистика из реального резюме (замена React-версии) */
const stats = [
  { value: 5, suffix: "+", label: "лет в коммерческой разработке" },
  { value: 50, suffix: "+", label: "UI-компонентов в собственном ките (Storybook)" },
  { value: 70, suffix: "%+", label: "покрытие UI-тестами в финтех-проекте" },
  { value: 5, suffix: "+", label: "языков интерфейса в i18n" },
];
</script>

<template>
  <section id="about" class="relative scroll-mt-24 py-24 sm:py-32">
    <div
      aria-hidden="true"
      class="pointer-events-none absolute right-0 top-1/3 size-96 rounded-full bg-indigo-900/10 blur-3xl"
    />
    <div
      class="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10"
    >
      <!-- Text -->
      <div data-reveal>
        <SectionKicker>Кто я</SectionKicker>
        <h2
          class="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
        >
          Обо мне
        </h2>
        <div
          class="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-(--ink-soft) sm:text-lg"
        >
          <p>
            Меня зовут Евгений, я frontend-разработчик с 5+ годами коммерческого
            опыта. Специализируюсь на Vue 3 / Nuxt 3 / TypeScript, есть
            практический опыт с React. Разрабатываю SPA и SSR/SSG-приложения —
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
        <dl class="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div
            v-for="s in stats"
            :key="s.label"
            class="rounded-2xl border border-(--line-1) bg-(--surface-1) p-4 transition-colors hover:border-(--line-2)"
          >
            <dd class="font-display text-3xl font-bold tracking-tight">
              <Counter
                :value="s.value"
                :suffix="s.suffix"
                class="bg-gradient-to-r from-fuchsia-300 to-purple-300 bg-clip-text text-transparent"
              />
            </dd>
            <dt class="mt-1.5 text-xs leading-snug text-(--ink-faint)">
              {{ s.label }}
            </dt>
          </div>
        </dl>
      </div>

      <!-- Polaroid photo -->
      <div
        class="relative mx-auto w-full max-w-sm"
        data-reveal
        :style="{ '--reveal-delay': '150ms' }"
      >
        <p class="mb-3 flex items-center justify-end gap-1.5 pr-4 text-sm text-(--ink-soft)">
          Это я
          <ArrowDownRight class="size-4" aria-hidden="true" />
        </p>
        <div
          class="group relative rotate-[4deg] rounded-2xl bg-white p-3 pb-16 shadow-2xl shadow-black/60 transition-transform duration-500 hover:rotate-1"
        >
          <!-- скотч-полоски -->
          <span
            aria-hidden="true"
            class="absolute -top-3 left-7 z-10 h-7 w-24 -rotate-6 rounded-[2px] bg-white/30 shadow-[0_2px_6px_rgba(0,0,0,0.25)] backdrop-blur-[1px]"
          />
          <span
            aria-hidden="true"
            class="absolute -top-2 right-9 z-10 h-7 w-20 rotate-[5deg] rounded-[2px] bg-white/25 shadow-[0_2px_6px_rgba(0,0,0,0.25)] backdrop-blur-[1px]"
          />
          <div class="overflow-hidden rounded-xl bg-zinc-800">
            <img
              src="/images/me.png"
              alt="Евгений Абрамов — фотография"
              class="aspect-[4/5] w-full scale-[1.04] object-cover blur-[2px] transition-all duration-700 group-hover:blur-0"
              loading="lazy"
            />
          </div>
          <p
            class="absolute inset-x-0 bottom-4 text-center font-display text-base font-medium text-zinc-500"
          >
            Евгений · frontend-разработчик
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
