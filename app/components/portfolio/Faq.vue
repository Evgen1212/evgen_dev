<script setup lang="ts">
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
  <section id="faq" class="m3-section">
    <div class="relative mx-auto max-w-3xl px-5 sm:px-8">
      <div data-reveal class="mb-10 text-center max-md:text-left sm:mb-14">
        <SectionKicker>Частые вопросы</SectionKicker>
        <h2 class="m3-headline-lg">
          FAQ
        </h2>
        <p class="mt-4 text-base text-(--ink-mute) sm:text-lg">
          собираю ответы на то, что спрашивают чаще всего
        </p>
      </div>

      <div class="m3-card divide-y divide-(--outline-variant) overflow-hidden p-0 elevation-1">
        <div
          v-for="(item, i) in faqs"
          :key="item.q"
          data-reveal
          :style="{ '--reveal-delay': `${i * 70}ms` }"
          :class="
            cn(
              'faq-item',
              openKey === `faq-${i}` && 'faq-item--open',
            )
          "
        >
          <h3 class="m-0 flex">
            <button
              :id="`faq-trigger-${i}`"
              type="button"
              :aria-expanded="openKey === `faq-${i}`"
              :aria-controls="`faq-content-${i}`"
              class="faq-item__trigger flex min-h-14 w-full flex-1 items-start justify-between gap-4 px-5 py-5 text-left text-base font-medium text-(--ink) sm:text-lg"
              @click="toggle(`faq-${i}`)"
            >
              {{ item.q }}
              <span
                class="material-symbols-outlined pointer-events-none shrink-0 text-2xl text-(--ink-mute) transition-transform duration-200"
                :class="openKey === `faq-${i}` && 'rotate-180'"
                aria-hidden="true"
                >expand_more</span
              >
            </button>
          </h3>
          <Transition
            name="faq-acc"
            @enter="onAccEnter"
            @after-enter="onAccAfterEnter"
            @leave="onAccLeave"
            @after-leave="onAccAfterLeave"
          >
            <div
              v-if="openKey === `faq-${i}`"
              :id="`faq-content-${i}`"
              role="region"
              :aria-labelledby="`faq-trigger-${i}`"
              class="overflow-hidden"
            >
              <div
                class="faq-item__answer px-5 pb-5 text-sm leading-relaxed text-(--ink-mute) sm:text-base"
              >
                {{ item.a }}
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <p
        data-reveal
        class="mt-8 flex flex-wrap items-center justify-center gap-2 text-center text-sm text-(--ink-faint)"
      >
        <span
          class="material-symbols-outlined text-lg text-(--m3-primary)"
          aria-hidden="true"
          >help</span
        >
        Остался вопрос?
        <a
          href="#contact"
          class="font-semibold text-(--m3-primary) underline decoration-(--m3-primary)/40 decoration-2 underline-offset-4 transition-colors hover:opacity-80"
        >
          Напишите мне
        </a>
        — отвечаю быстро.
      </p>
    </div>
  </section>
</template>

<style scoped>
/* M3 expansion list: hover на всю строку, без «пятна» на скруглённой кнопке */
.faq-item {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  -webkit-tap-highlight-color: transparent;
}

.faq-item::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--m3-on-surface);
  opacity: 0;
  transition: opacity 0.15s cubic-bezier(0.2, 0, 0, 1);
  pointer-events: none;
  z-index: 0;
}

.faq-item:hover::before {
  opacity: 0.08;
}

.faq-item:active::before {
  opacity: 0.12;
}

.faq-item--open {
  background: var(--m3-surface-container-high);
}

.faq-item__trigger {
  position: relative;
  z-index: 1;
  background: transparent;
  border: 0;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.faq-item__answer {
  position: relative;
  z-index: 1;
}

.faq-acc-enter-active,
.faq-acc-leave-active {
  transition: height 0.2s ease;
}
</style>
