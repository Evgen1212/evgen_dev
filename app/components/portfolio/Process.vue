<script setup lang="ts">
import {
  ChevronDown,
  MessagesSquare,
  PenTool,
  Code2,
  Rocket,
} from 'lucide-vue-next';

const isMobile = useMediaQuery('(max-width: 640px)');
const openStep = ref<number | null>(0);
const toggleStep = (i: number) => {
  if (!isMobile.value) return;
  openStep.value = openStep.value === i ? null : i;
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
  <section id="process" class="section section--surface" aria-labelledby="process-title">
    <div class="container">
      <header class="section-head" data-reveal>
        <p class="kicker">Этапы работы</p>
        <h2 id="process-title" class="section-title">Как я работаю</h2>
        <p class="section-lede">прозрачный процесс — вы видите результат на каждом шаге</p>
      </header>

      <ol class="process-grid stagger">
        <li
          v-for="(step, i) in steps"
          :key="step.num"
          class="process-step"
          :class="{ 'is-open': isMobile && openStep === i }"
          data-reveal
          :style="{ '--reveal-delay': `${i * 60}ms` }"
        >
          <h3 class="process-heading">
            <button
              class="process-toggle"
              type="button"
              :aria-expanded="openStep === i"
              :aria-controls="`process-details-${i}`"
              :tabindex="isMobile ? 0 : -1"
              @click="toggleStep(i)"
            >
              <span class="process-num">{{ step.num }}</span>
              <span class="process-title">{{ step.title }}</span>
              <span class="process-chevron" aria-hidden="true">
                <svg class="icon"><use href="#i-chevron-down" /></svg>
              </span>
            </button>
          </h3>
          <div :id="`process-details-${i}`" class="process-details">
            <div class="process-details-inner">
              <p>{{ step.text }}</p>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
