<script setup lang="ts">
const isOpen = ref(false);
const toggleSection = () => {
  isOpen.value = !isOpen.value;
};

const steps = [
  {
    num: '01',
    symbol: 'forum',
    title: 'Знакомство и ТЗ',
    text: 'Обсуждаем задачу в мессенджере или созвоне. Собираю требования, предлагаю решения, фиксирую смету и сроки.',
  },
  {
    num: '02',
    symbol: 'design_services',
    title: 'Дизайн-концепт',
    text: 'Рисую макет ключевых экранов. Стиль согласуем до полного «да» — вносим правки, пока не понравится.',
  },
  {
    num: '03',
    symbol: 'code',
    title: 'Разработка',
    text: 'Верстаю и программирую, показываю промежуточные версии, тестирую на всех устройствах и браузерах.',
  },
  {
    num: '04',
    symbol: 'rocket_launch',
    title: 'Запуск и поддержка',
    text: 'Деплой, SEO-база, аналитика и обучение по админке. Две недели бесплатных правок после релиза.',
  },
];
</script>

<template>
  <section id="process" class="m3-section max-md:pb-0 md:pb-2">
    <div class="relative mx-auto max-w-7xl px-5 sm:px-8">
      <div>
        <button
          @click="toggleSection"
          class="group block w-full text-left"
          :aria-expanded="isOpen"
        >
          <div
            data-reveal
            :class="
              cn(
                'relative overflow-hidden border p-6 transition-all duration-300 max-md:duration-500',
                isOpen
                  ? cn(
                      'm3-accordion-merge-head is-open rounded-t-[var(--m3-shape-md)] rounded-b-none border-(--outline-variant) border-b-transparent pb-0',
                      'max-md:shadow-none md:bg-(--m3-surface-container-high)',
                    )
                  : 'rounded-[var(--m3-shape-md)] border-(--outline-variant) bg-(--m3-surface-container)',
              )
            "
          >
            <div class="flex items-center justify-between gap-4">
              <div class="flex flex-col">
                <SectionKicker plain>Этапы работы</SectionKicker>
                <h2 class="m3-headline-lg mt-2">
                  Как я работаю
                </h2>
              </div>

              <div
                class="m3-icon-btn m3-state-layer flex size-10 shrink-0 border border-(--outline-variant) bg-(--m3-surface-container-high) transition-transform duration-300"
                :class="{ 'rotate-180 border-(--m3-primary)/40': isOpen }"
              >
                <span
                  class="material-symbols-outlined text-xl text-(--m3-primary)"
                  aria-hidden="true"
                  >expand_more</span
                >
              </div>
            </div>

            <p
              class="mt-4 hidden text-base text-(--ink-mute) md:block sm:text-lg"
            >
              прозрачный процесс — вы видите результат на каждом шаге
            </p>
          </div>
        </button>
      </div>

      <div
        class="grid transition-all duration-500 ease-in-out"
        :class="
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        "
        :inert="!isOpen"
      >
        <div class="overflow-hidden">
          <div
            class="m3-accordion-merge-body mt-0 rounded-b-[var(--m3-shape-md)] rounded-t-none border border-t-0 border-(--outline-variant) bg-(--m3-surface-container) px-4 pb-4 pt-2 max-md:pt-3 md:px-6 md:pb-6 md:pt-6 md:bg-(--m3-surface-container)"
          >
            <p class="mb-8 px-2 text-base text-(--ink-mute) md:hidden">
              прозрачный процесс — вы видите результат на каждом шаге
            </p>

            <div class="relative pb-4">
              <ol
                class="relative grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-4"
              >
                <li
                  v-for="(step, i) in steps"
                  :key="step.num"
                  data-reveal
                  :style="{ '--reveal-delay': `${i * 110}ms` }"
                >
                  <article
                    class="m3-card-hover-lift group relative h-full overflow-hidden rounded-[var(--m3-shape-md)] border border-(--outline-variant) bg-(--m3-surface-container) p-6 transition-all duration-300 hover:bg-(--m3-surface-container-high) sm:p-7 elevation-1"
                  >
                    <span
                      aria-hidden="true"
                      class="absolute right-4 top-4 grid size-8 place-items-center rounded-full bg-(--m3-primary-container) text-xs font-medium tabular-nums text-(--m3-on-primary-container)"
                    >
                      {{ step.num }}
                    </span>

                    <span
                      class="m3-icon-tile relative size-12 bg-(--m3-primary)/12"
                    >
                      <span
                        class="material-symbols-outlined text-xl text-(--m3-primary) transition-transform duration-500 group-hover:scale-110"
                        aria-hidden="true"
                        >{{ step.symbol }}</span
                      >
                    </span>

                    <p
                      class="m3-label relative mt-5"
                    >
                      Шаг {{ step.num }}
                    </p>
                    <h3 class="relative mt-2 m3-title-lg text-(--ink)">
                      {{ step.title }}
                    </h3>
                    <p
                      class="relative mt-3 text-sm leading-relaxed text-(--ink-mute)"
                    >
                      {{ step.text }}
                    </p>
                  </article>
                </li>
              </ol>
            </div>

            <div
              aria-hidden="true"
              class="max-md:mt-2 max-md:h-px max-md:bg-(--outline-variant) max-md:opacity-85"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
