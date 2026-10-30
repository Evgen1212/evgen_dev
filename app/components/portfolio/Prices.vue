<script setup lang="ts">
import { prices } from "./data";

const isOpen = ref(false);
const toggleSection = () => {
  if (window.innerWidth < 768) {
    isOpen.value = !isOpen.value;
  }
};
</script>

<template>
  <section id="prices" class="m3-section max-md:pt-0 md:pt-2">
    <div class="relative mx-auto max-w-7xl px-5 sm:px-8">
      <div class="mb-8 md:mb-16" :class="isOpen ? 'max-md:mb-0' : ''">
        <button
          @click="toggleSection"
          class="group block w-full text-left md:cursor-default md:text-center"
          :aria-expanded="isOpen"
        >
          <div 
            data-reveal
            :class="
              cn(
                'relative overflow-hidden border p-6 transition-all duration-300 max-md:duration-500 md:border-0 md:bg-transparent md:p-0',
                isOpen
                  ? cn(
                      'm3-accordion-merge-head is-open max-md:rounded-t-[var(--m3-shape-md)] max-md:rounded-b-none max-md:border-(--outline-variant) max-md:border-b-transparent max-md:pb-0 max-md:shadow-none',
                    )
                  : 'rounded-[var(--m3-shape-md)] border-(--outline-variant) bg-(--m3-surface-container)',
              )
            "
          >
            <div class="flex items-center justify-between gap-4 md:block">
              <div class="flex flex-col md:items-center">
                <SectionKicker plain>Тарифы</SectionKicker>
                <h2 class="m3-headline-lg mt-2 md:mt-4">
                  Цены
                </h2>
              </div>
              
              <div
                class="prices-section-expand m3-icon-btn m3-state-layer flex size-10 shrink-0 border border-(--outline-variant) bg-(--m3-surface-container-high) transition-transform duration-300"
                :class="{ 'rotate-180 border-(--m3-primary)/40': isOpen }"
              >
                <span
                  class="material-symbols-outlined text-xl text-(--m3-primary)"
                  aria-hidden="true"
                  >expand_more</span
                >
              </div>
            </div>

            <p class="mt-4 hidden text-base text-(--ink-mute) md:block sm:text-lg">
              прозрачные условия — вы платите за результат, без скрытых платежей
            </p>
          </div>
        </button>
      </div>

      <div
        class="grid transition-all duration-500 ease-in-out md:grid-rows-[1fr] md:opacity-100"
        :class="isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
      >
        <div class="overflow-hidden md:overflow-visible">
          <div
            class="m3-accordion-merge-body max-md:mt-0 max-md:rounded-b-[var(--m3-shape-md)] max-md:rounded-t-none max-md:border-x max-md:border-b max-md:border-(--outline-variant) max-md:px-4 max-md:pb-4 max-md:pt-2"
          >
            <p class="mb-8 px-2 text-base text-(--ink-mute) md:hidden">
              прозрачные условия — вы платите за результат, без скрытых платежей
            </p>

            <div class="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div
              v-for="(tier, i) in prices"
              :key="tier.name"
              data-reveal
              :style="{ '--reveal-delay': `${i * 90}ms` }"
              class="relative"
            >
              <span
                v-if="tier.featured"
                class="absolute -top-3.5 left-6 z-20 inline-flex items-center gap-1.5 rounded-[var(--m3-shape-sm)] bg-(--m3-primary) px-3.5 py-1.5 text-xs font-medium text-(--m3-on-primary) elevation-1"
              >
                <span
                  class="material-symbols-outlined text-sm"
                  aria-hidden="true"
                  >local_fire_department</span
                >
                Популярный выбор
              </span>
              <div
                :class="
                  cn(
                    'm3-card group relative flex h-full flex-col p-6 transition-shadow duration-300 hover:elevation-2 sm:p-7',
                    tier.featured && 'm3-card-featured border-(--m3-primary)',
                  )
                "
              >
                <h3 class="m3-title-lg text-(--ink)">
                  {{ tier.name }}
                </h3>
                <div class="mt-3 m3-headline-md text-(--m3-primary)">
                  {{ tier.price }}
                </div>
                <p
                  :class="
                    cn(
                      'mt-2 text-sm',
                      'text-(--ink-mute)',
                    )
                  "
                >
                  {{ tier.description }}
                </p>

                <ul class="mt-6 flex-1 space-y-3">
                  <li
                    v-for="f in tier.features"
                    :key="f"
                    class="flex items-start gap-2.5 text-sm"
                  >
                    <span
                      :class="
                        cn(
                          'material-symbols-outlined mt-0.5 shrink-0 text-lg',
                          'text-(--m3-primary)',
                        )
                      "
                      aria-hidden="true"
                      >check</span
                    >
                    <span class="text-(--ink-soft)">{{
                      f
                    }}</span>
                  </li>
                </ul>

                <div
                  :class="
                    cn(
                      'mt-6 flex items-center justify-between border-t pt-4',
                      'border-(--outline-variant)',
                    )
                  "
                >
                  <span class="m3-label normal-case tracking-normal text-(--ink-faint)">
                    Срок {{ tier.term }}
                  </span>
                  <a
                    href="#contact"
                    :class="
                      cn(
                        'm3-state-layer px-4 py-2 text-sm',
                        tier.featured
                          ? 'm3-filled-btn min-h-9 py-2'
                          : 'm3-outlined-btn min-h-9 py-2',
                      )
                    "
                  >
                    Обсудить
                  </a>
                </div>
              </div>
            </div>
          </div>

          <PriceCalculator />

          <p
            data-reveal
            class="mt-8 flex flex-wrap items-center justify-center gap-2 text-center text-sm text-(--ink-mute)"
          >
            <span
              class="material-symbols-outlined shrink-0 text-lg text-(--m3-primary)"
              aria-hidden="true"
              >verified</span
            >
            Работаю официально как самозанятый (самозанятые.рф) — чек из «Мой
            налог» и договор по запросу.
          </p>

          <p data-reveal class="mt-3 text-center text-sm text-(--ink-faint)">
            Требуется что-то уникальное? Напишите — рассчитаю индивидуально и
            бесплатно.
          </p>

            <div
              aria-hidden="true"
              class="max-md:mt-4 max-md:h-px max-md:bg-(--outline-variant) max-md:opacity-85"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@media (min-width: 768px) {
  .prices-section-expand {
    display: none !important;
  }
}
</style>
