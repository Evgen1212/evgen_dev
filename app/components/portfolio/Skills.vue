<script setup lang="ts">
/**
 * «Что я умею — простыми словами» — компетенции из резюме языком заказчика.
 * Самостоятельная секция сразу после «Заказных проектов».
 * Формат — в стиле блока счётчиков: крупное значение + человеческая подпись.
 */
const competencies: {
  value: string | number;
  suffix?: string;
  label: string;
}[] = [
  {
    value: "За секунды",
    label: "открываются страницы — оптимизирую скорость по Google PageSpeed",
  },
  {
    value: "Под ключ",
    label: "веб-приложения: личные кабинеты, дашборды, каталоги, калькуляторы",
  },
  {
    value: 100,
    suffix: "%",
    label: "адаптивность: телефон, планшет, ноутбук, монитор — ничего не уезжает",
  },
  {
    value: "Чистый код",
    label: "понятная архитектура — доработки быстрые и ничего не ломают",
  },
  {
    value: "Автотесты",
    label: "ошибки ловятся до релиза — ваши пользователи их не увидят",
  },
  {
    value: "Интеграции",
    label: "оплаты, карты, чаты, авторизация, данные в реальном времени",
  },
];
</script>

<template>
  <section id="skills" class="m3-section">
    <div class="relative mx-auto max-w-7xl px-5 sm:px-8">
      <div data-reveal class="text-center max-md:text-left">
        <SectionKicker>Компетенции</SectionKicker>
        <h2
          class="m3-headline-lg"
        >
          Что я умею — простыми словами
        </h2>
        <p class="mt-4 text-base text-(--ink-mute) sm:text-lg">
          компетенции из резюме без жаргона — что это даёт вашему проекту
        </p>
      </div>
      <ul class="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <li
          v-for="(c, i) in competencies"
          :key="c.label"
          data-reveal
          :style="{ '--reveal-delay': `${i * 70}ms` }"
          class="m3-list-item p-4 elevation-1"
        >
          <p class="m3-headline-md text-(--m3-primary)">
            <Counter
              v-if="typeof c.value === 'number'"
              :value="c.value"
              :suffix="c.suffix"
              class="text-(--m3-primary)"
            />
            <span
              v-else
              class="text-(--m3-primary)"
              >{{ c.value }}</span
            >
          </p>
          <p class="mt-1.5 text-xs leading-snug text-(--ink-faint)">{{ c.label }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
