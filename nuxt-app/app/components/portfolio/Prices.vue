<script setup lang="ts">
import { Check, Flame } from "lucide-vue-next";
import { prices } from "./data";
</script>

<template>
  <section id="prices" class="relative scroll-mt-24 py-24 sm:py-32">
    <div
      aria-hidden="true"
      class="pointer-events-none absolute right-0 top-24 size-96 rounded-full bg-blue-900/10 blur-3xl"
    />
    <div class="relative mx-auto max-w-7xl px-5 sm:px-8">
      <div data-reveal class="mb-12 text-center sm:mb-16">
        <SectionKicker>Тарифы</SectionKicker>
        <h2
          class="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
        >
          Цены
        </h2>
        <p class="mt-4 text-base text-zinc-400 sm:text-lg">
          прозрачные условия — вы платите за результат, без скрытых платежей
        </p>
      </div>

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
            class="absolute -top-3.5 left-6 z-10 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-fuchsia-600 to-purple-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-lg"
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
                  : 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.05]',
              )
            "
          >
            <h3
              :class="
                cn(
                  'font-display text-xl font-bold',
                  tier.featured ? 'text-black' : 'text-white',
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
                  tier.featured ? 'text-black/60' : 'text-zinc-400',
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
                <span :class="tier.featured ? 'text-black/80' : 'text-zinc-300'">{{
                  f
                }}</span>
              </li>
            </ul>

            <div
              :class="
                cn(
                  'mt-6 flex items-center justify-between border-t pt-4',
                  tier.featured ? 'border-black/10' : 'border-white/10',
                )
              "
            >
              <span
                :class="
                  cn(
                    'text-xs font-semibold uppercase tracking-wider',
                    tier.featured ? 'text-black/50' : 'text-zinc-500',
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
                      : 'bg-white/10 text-white hover:bg-white hover:text-black',
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

      <p data-reveal class="mt-8 text-center text-sm text-zinc-500">
        Требуется что-то уникальное? Напишите — рассчитаю индивидуально и
        бесплатно.
      </p>
    </div>
  </section>
</template>
