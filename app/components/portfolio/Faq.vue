<script setup lang="ts">
import { ChevronDown, MessageCircleQuestion } from "lucide-vue-next";

const faqs = [
  {
    q: "Что понадобится от меня на старте?",
    a: "Понимание задачи и пара примеров «как нравится». Тексты, фото и логотип — если есть; если нет — помогу собрать и подготовлю ТЗ.",
  },
  {
    q: "Какие сроки разработки?",
    a: "Лендинг — от 5 дней, многостраничный сайт — от 10 дней, веб-сервис — от 3 недель. Срок фиксирую до старта и соблюдаю: опоздаю по своей вине — скидка 10%.",
  },
  {
    q: "Как проходит оплата?",
    a: "Предоплата 50%, остаток — после приёмки; крупные проекты разбиваю на этапы. Официально: я самозанятый (самозанятые.рф, ИНН 643403180040) — чек из «Мой налог», договор по запросу.",
  },
  {
    q: "Как устроена поддержка после запуска?",
    a: "Две недели после релиза правки и багфиксы — бесплатно. Дальше — поддержка от 3 000 ₽/мес: обновления, мелкие доработки, мониторинг.",
  },
  {
    q: "Берёте ли проекты на доработку?",
    a: "Да, частый формат. Сначала бесплатно ревьюю код и говорю прямо: что оставить, что переписать — и есть ли вообще смысл в доработке.",
  },
  {
    q: "Работаете один или с командой?",
    a: "Один: дизайн, код и деплой — без потерь при передаче между исполнителями. На крупных проектах подключаю проверенных подрядчиков, за результат отвечаю лично.",
  },
];

/**
 * Аккордеон: порт radix Accordion (type="single" collapsible) на refs.
 * aria: button + aria-expanded + region/aria-labelledby — как в radix.
 */
const openKey = ref<string | null>(null);

function toggle(key: string) {
  openKey.value = openKey.value === key ? null : key;
}

/* Плавное раскрытие по высоте (порт animate-accordion-down/up, 200ms) */
function onAccEnter(el: Element) {
  const h = el as HTMLElement;
  h.style.overflow = "hidden";
  h.style.height = "0px";
  void h.offsetHeight; // force reflow
  h.style.height = `${h.scrollHeight}px`;
}
function onAccAfterEnter(el: Element) {
  (el as HTMLElement).style.height = "";
}
function onAccLeave(el: Element) {
  const h = el as HTMLElement;
  h.style.overflow = "hidden";
  h.style.height = `${h.scrollHeight}px`;
  void h.offsetHeight;
  h.style.height = "0px";
}
function onAccAfterLeave(el: Element) {
  (el as HTMLElement).style.height = "";
}
</script>
<template>
  <section id="faq" class="section section--surface" aria-labelledby="faq-title">
    <div class="container container--narrow">
      <header class="section-head" data-reveal>
        <p class="kicker">Частые вопросы</p>
        <h2 id="faq-title" class="section-title">FAQ</h2>
        <p class="section-lede">собираю ответы на то, что спрашивают чаще всего</p>
      </header>

      <div class="faq-list" data-reveal>
        <div
          v-for="(item, i) in faqs"
          :key="item.q"
          class="faq-item"
          :class="{ 'is-open': openKey === item.q }"
        >
          <h3>
            <button
              :id="`faq-trigger-${i + 1}`"
              class="faq-trigger"
              type="button"
              :aria-expanded="openKey === item.q"
              :aria-controls="`faq-panel-${i + 1}`"
              @click="toggle(item.q)"
            >
              {{ item.q }}
              <span class="faq-icon" aria-hidden="true">
                <svg class="icon"><use href="#i-plus" /></svg>
              </span>
            </button>
          </h3>
          <div
            :id="`faq-panel-${i + 1}`"
            class="faq-panel"
            role="region"
            :aria-labelledby="`faq-trigger-${i + 1}`"
            :inert="openKey !== item.q"
          >
            <div class="faq-panel-inner">
              <p>{{ item.a }}</p>
            </div>
          </div>
        </div>
      </div>

      <p class="faq-foot" data-reveal>
        Остался вопрос?
        <a class="text-link" href="#contact">Напишите мне</a> — отвечаю быстро.
      </p>
    </div>
  </section>
</template>
