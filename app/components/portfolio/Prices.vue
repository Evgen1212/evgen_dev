<script setup lang="ts">
import { BadgeCheck, Check, Flame, ChevronDown } from "lucide-vue-next";
import { prices } from "./data";

const isOpen = ref(false);
const toggleSection = () => {
  if (window.innerWidth < 768) {
    isOpen.value = !isOpen.value;
  }
};
</script>

<template>
  <section id="prices" class="relative scroll-mt-24 py-24 pt-2 sm:py-32">
    <div
      aria-hidden="true"
      class="pointer-events-none absolute right-0 top-24 size-96 rounded-full bg-purple-900/10 blur-3xl"
    />
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
                'relative overflow-hidden border p-6 transition-all duration-300 md:border-0 md:bg-transparent md:p-0',
                isOpen
                  ? 'max-md:rounded-t-3xl max-md:rounded-b-none max-md:border-b-transparent max-md:pb-0 border-(--accent-soft)/30 bg-(--surface-2)'
                  : 'rounded-3xl border-(--line-1) bg-(--surface-1)',
              )
            "
          >
            <div class="flex items-center justify-between gap-4 md:block">
              <div class="flex flex-col md:items-center">
                <SectionKicker plain>Тарифы</SectionKicker>
                <h2
                  class="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl md:mt-4 md:text-5xl lg:text-6xl"
                >
                  Цены
                </h2>
              </div>
              
              <div class="flex size-10 shrink-0 items-center justify-center rounded-full border border-(--line-1) bg-(--surface-2) transition-transform duration-300 md:hidden"
                :class="{ 'rotate-180 border-(--accent-soft)/40': isOpen }"
              >
                <ChevronDown class="size-5 text-(--accent-soft)" />
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
            class="max-md:mt-0 max-md:rounded-b-3xl max-md:rounded-t-none max-md:bg-(--surface-2) max-md:px-4 max-md:pb-4 max-md:pt-4"
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
                class="absolute -top-3.5 left-6 z-20 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-fuchsia-600 to-purple-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-lg"
              >
                <Flame class="size-3.5" aria-hidden="true" />
                Популярный выбор
              </span>
              <div
                :class="
                  cn(
                    'card-shine group relative flex h-full flex-col rounded-3xl border p-6 transition-all duration-500 hover:-translate-y-1.5 sm:p-7',
                    tier.featured
                      ? 'glow-featured border-white bg-white text-black'
                      : 'border-(--line-1) bg-(--surface-1) hover:border-(--line-25) hover:bg-(--surface-3)',
                  )
                "
              >
                <h3
                  :class="
                    cn(
                      'font-display text-xl font-bold',
                      tier.featured ? 'text-black' : 'text-(--ink)',
                    )
                  "
                >
                  {{ tier.name }}
                </h3>
                <div
                  :class="
                    cn(
                      'mt-3 font-display text-3xl font-bold tracking-tight',
                      tier.featured
                        ? 'text-black'
                        : 'bg-gradient-to-r from-fuchsia-400 to-purple-400 bg-clip-text text-transparent',
                    )
                  "
                >
                  {{ tier.price }}
                </div>
                <p
                  :class="
                    cn(
                      'mt-2 text-sm',
                      tier.featured ? 'text-black/60' : 'text-(--ink-mute)',
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
                    <Check
                      :class="
                        cn(
                          'mt-0.5 size-4 shrink-0',
                          tier.featured ? 'text-black' : 'text-fuchsia-400',
                        )
                      "
                      aria-hidden="true"
                    />
                    <span :class="tier.featured ? 'text-black/80' : 'text-(--ink-soft)'">{{
                      f
                    }}</span>
                  </li>
                </ul>

                <div
                  :class="
                    cn(
                      'mt-6 flex items-center justify-between border-t pt-4',
                      tier.featured ? 'border-black/10' : 'border-(--line-1)',
                    )
                  "
                >
                  <span
                    :class="
                      cn(
                        'text-xs font-semibold uppercase tracking-wider',
                        tier.featured ? 'text-black/50' : 'text-(--ink-faint)',
                      )
                    "
                  >
                    Срок {{ tier.term }}
                  </span>
                  <a
                    href="#contact"
                    :class="
                      cn(
                        'rounded-xl px-4 py-2 text-sm font-bold transition-all hover:scale-105 active:scale-95',
                        tier.featured
                          ? 'bg-black text-white hover:bg-zinc-800'
                          : 'bg-(--surface-hover) text-(--ink) hover:bg-(--ink) hover:text-(--page)',
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
            <BadgeCheck
              class="size-4 shrink-0 text-(--accent-emerald)"
              aria-hidden="true"
            />
            Работаю официально как самозанятый (самозанятые.рф) — чек из «Мой
            налог» и договор по запросу.
          </p>

          <p data-reveal class="mt-3 text-center text-sm text-(--ink-faint)">
            Требуется что-то уникальное? Напишите — рассчитаю индивидуально и
            бесплатно.
          </p>

            <div
              aria-hidden="true"
              class="max-md:mt-4 max-md:h-px max-md:bg-gradient-to-r max-md:from-transparent max-md:via-[var(--line-15)] max-md:to-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
