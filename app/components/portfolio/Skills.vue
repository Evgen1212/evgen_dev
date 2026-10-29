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
  <section id="skills" class="section section--surface" aria-labelledby="skills-title">
    <div class="container">
      <header class="section-head" data-reveal>
        <p class="kicker">Компетенции</p>
        <h2 id="skills-title" class="section-title">Что я умею — простыми словами</h2>
        <p class="section-lede">компетенции из резюме без жаргона — что это даёт вашему проекту</p>
      </header>

      <div class="skill-grid stagger">
        <div
          v-for="(item, i) in competencies"
          :key="item.label"
          class="skill"
          data-reveal
          :style="{ '--reveal-delay': `${i * 55}ms` }"
        >
          <p class="skill-value">{{ item.value }}{{ item.suffix ?? '' }}</p>
          <p class="skill-label">{{ item.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
