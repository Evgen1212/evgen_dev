<script setup lang="ts">
import {
  ChevronDown,
  MessagesSquare,
  PenTool,
  Code2,
  Rocket,
} from 'lucide-vue-next';

const isOpen = ref(false);
const toggleSection = () => {
  if (window.innerWidth < 768) {
    isOpen.value = !isOpen.value;
  }
};

const steps = [
  {
    num: '01',
    icon: MessagesSquare,
    title: 'Знакомство и ТЗ',
    text: 'Обсуждаем задачу в мессенджере или созвоне. Собираю требования, предлагаю решения, фиксирую смету и сроки.',
  },
  {
    num: '02',
    icon: PenTool,
    title: 'Дизайн-концепт',
    text: 'Рисую макет ключевых экранов. Стиль согласуем до полного «да» — вносим правки, пока не понравится.',
  },
  {
    num: '03',
    icon: Code2,
    title: 'Разработка',
    text: 'Верстаю и программирую, показываю промежуточные версии, тестирую на всех устройствах и браузерах.',
  },
  {
    num: '04',
    icon: Rocket,
    title: 'Запуск и поддержка',
    text: 'Деплой, SEO-база, аналитика и обучение по админке. Две недели бесплатных правок после релиза.',
  },
];
</script>

<template>
  <section id="process" class="relative scroll-mt-24 py-24 pb-2 sm:py-32">
    <!-- точечная сетка + мягкое свечение -->
    <div
      aria-hidden="true"
      class="dot-grid pointer-events-none absolute inset-x-0 top-0 h-[28rem]"
    />
    <div
      aria-hidden="true"
      class="pointer-events-none absolute left-0 top-1/4 size-96 rounded-full bg-purple-900/10 blur-3xl"
    />
    <div class="relative mx-auto max-w-7xl px-5 sm:px-8">
      <div class="mb-8 md:mb-16" :class="isOpen ? 'max-md:mb-0' : ''">
        <button
          @click="toggleSection"
          class="group w-full text-left md:cursor-default md:text-center"
          :aria-expanded="isOpen"
        >
          <div 
            data-reveal
            :class="
              cn(
                'relative overflow-hidden border p-6 transition-all duration-300 md:border-0 md:bg-transparent md:p-0',
                isOpen
                  ? 'max-md:rounded-t-3xl max-md:rounded-b-none max-md:border-b-transparent border-(--accent-soft)/30 bg-(--surface-2)'
                  : 'rounded-3xl border-(--line-1) bg-(--surface-1)',
              )
            "
          >
            <div class="flex items-center justify-between gap-4 md:block">
              <div class="flex flex-col md:items-center">
                <SectionKicker plain>Этапы работы</SectionKicker>
                <h2
                  class="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl md:mt-4 md:text-5xl lg:text-6xl"
                >
                  Как я работаю
                </h2>
              </div>
              
              <div class="flex size-10 shrink-0 items-center justify-center rounded-full border border-(--line-1) bg-(--surface-2) transition-transform duration-300 md:hidden"
                :class="{ 'rotate-180 border-(--accent-soft)/40': isOpen }"
              >
                <ChevronDown class="size-5 text-(--accent-soft)" />
              </div>
            </div>

            <p class="mt-4 hidden text-base text-(--ink-mute) md:block sm:text-lg">
              прозрачный процесс — вы видите результат на каждом шаге
            </p>
          </div>
        </button>
      </div>

      <div
        class="grid transition-all duration-500 ease-in-out md:grid-rows-[1fr] md:opacity-100"
        :class="isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
      >
        <div class="overflow-hidden">
          <div
            class="max-md:mt-0 max-md:rounded-b-3xl max-md:rounded-t-none max-md:bg-(--surface-2) max-md:px-4 max-md:pb-4 max-md:pt-4"
          >
            <p class="mb-8 px-2 text-base text-(--ink-mute) md:hidden">
              прозрачный процесс — вы видите результат на каждом шаге
            </p>

            <div class="relative pb-4">
              <ol class="relative grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
              <li
                v-for="(step, i) in steps"
                :key="step.num"
                data-reveal
                :style="{ '--reveal-delay': `${i * 110}ms` }"
              >
                <article
                  class="card-shine group relative h-full overflow-hidden rounded-3xl border border-(--line-1) bg-(--surface-1) p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-(--line-25) hover:bg-(--surface-3) sm:p-7"
                >
                  <!-- большая номерная подложка -->
                  <span
                    aria-hidden="true"
                    class="pointer-events-none absolute -right-3 -top-7 select-none font-display text-[7rem] font-bold leading-none text-(--ghost) transition-colors duration-500 group-hover:text-(--ghost-hover)"
                  >
                    {{ step.num }}
                  </span>

                  <span
                    class="relative grid size-12 place-items-center rounded-2xl border border-(--line-1) bg-gradient-to-br from-fuchsia-500/20 via-purple-500/15 to-transparent"
                  >
                    <component
                      :is="step.icon"
                      class="size-5 text-(--accent-soft) transition-transform duration-500 group-hover:scale-110"
                      aria-hidden="true"
                    />
                  </span>

                  <p
                    class="relative mt-5 text-xs font-bold uppercase tracking-[0.2em] text-(--accent-soft)"
                  >
                    Шаг {{ step.num }}
                  </p>
                  <h3 class="relative mt-2 font-display text-xl font-bold">
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
              class="max-md:mt-2 max-md:h-px max-md:bg-gradient-to-r max-md:from-transparent max-md:via-[var(--line-15)] max-md:to-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
