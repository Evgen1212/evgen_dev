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
  <section id="faq" class="relative scroll-mt-24 py-24 sm:py-32">
    <div class="relative mx-auto max-w-3xl px-5 sm:px-8">
      <div data-reveal class="mb-10 text-center sm:mb-14">
        <SectionKicker>Частые вопросы</SectionKicker>
        <h2 class="font-display text-4xl font-bold tracking-tight sm:text-5xl">
          FAQ
        </h2>
        <p class="mt-4 text-base text-(--ink-mute) sm:text-lg">
          собираю ответы на то, что спрашивают чаще всего
        </p>
      </div>

      <div class="space-y-3">
        <div
          v-for="(item, i) in faqs"
          :key="item.q"
          data-reveal
          :style="{ '--reveal-delay': `${i * 70}ms` }"
          :class="
            cn(
              'overflow-hidden rounded-2xl border bg-(--surface-1) px-5 transition-colors hover:border-(--line-2)',
              openKey === `faq-${i}`
                ? 'border-fuchsia-400/30 bg-(--surface-3)'
                : 'border-(--line-1)',
            )
          "
        >
          <h3 class="flex">
            <button
              :id="`faq-trigger-${i}`"
              type="button"
              :aria-expanded="openKey === `faq-${i}`"
              :aria-controls="`faq-content-${i}`"
              class="focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-5 text-left font-display text-base font-bold text-(--ink) outline-none transition-all hover:no-underline focus-visible:ring-[3px] sm:text-lg"
              @click="toggle(`faq-${i}`)"
            >
              {{ item.q }}
              <ChevronDown
                class="pointer-events-none size-4 shrink-0 translate-y-0.5 text-(--ink-mute) transition-transform duration-200"
                :class="openKey === `faq-${i}` && 'rotate-180'"
                aria-hidden="true"
              />
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
                class="pb-5 text-sm leading-relaxed text-(--ink-mute) sm:text-base"
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
        <MessageCircleQuestion
          class="size-4 text-(--accent-soft)"
          aria-hidden="true"
        />
        Остался вопрос?
        <a
          href="#contact"
          class="font-semibold text-(--ink-soft) underline decoration-fuchsia-400/50 decoration-2 underline-offset-4 transition-colors hover:text-(--ink)"
        >
          Напишите мне
        </a>
        — отвечаю быстро.
      </p>
    </div>
  </section>
</template>

<style scoped>
.faq-acc-enter-active,
.faq-acc-leave-active {
  transition: height 0.2s ease;
}
</style>
