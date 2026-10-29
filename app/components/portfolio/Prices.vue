<script setup lang="ts">
import { BadgeCheck, Check, Flame, ChevronDown } from "lucide-vue-next";
import { prices } from "./data";

const isMobile = useMediaQuery('(max-width: 640px)');
const openTier = ref<number | null>(null);
const toggleTier = (i: number) => {
  if (!isMobile.value) return;
  openTier.value = openTier.value === i ? null : i;
};
</script>
<template>
  <section id="prices" class="section" aria-labelledby="prices-title">
    <div class="container">
      <header class="section-head" data-reveal>
        <p class="kicker">Тарифы</p>
        <h2 id="prices-title" class="section-title">Цены</h2>
        <p class="section-lede">
          прозрачные условия — вы платите за результат, без скрытых платежей
        </p>
      </header>

      <div class="price-grid stagger">
        <article
          v-for="(tier, i) in prices"
          :key="tier.name"
          class="price-card"
          :class="{ 'is-featured': tier.featured, 'is-open': isMobile && openTier === i }"
          data-reveal
          :style="{ '--reveal-delay': `${i * 60}ms` }"
        >
          <span v-if="tier.featured" class="price-badge">Популярный выбор</span>
          <h3 class="price-heading">
            <button
              class="price-toggle"
              type="button"
              :aria-expanded="openTier === i"
              :aria-controls="`price-details-${i}`"
              :tabindex="isMobile ? 0 : -1"
              @click="toggleTier(i)"
            >
              <span class="price-name">{{ tier.name }}</span>
              <span class="price-value"><span class="nowrap">{{ tier.price }}</span></span>
              <span class="price-chevron" aria-hidden="true">
                <svg class="icon"><use href="#i-chevron-down" /></svg>
              </span>
            </button>
          </h3>
          <div :id="`price-details-${i}`" class="price-details">
            <div class="price-details-inner">
              <p class="price-desc">{{ tier.description }}</p>
              <ul class="feature-list">
                <li v-for="feature in tier.features" :key="feature">
                  <svg class="icon" aria-hidden="true"><use href="#i-check" /></svg>
                  {{ feature }}
                </li>
              </ul>
              <div class="price-foot">
                <span>Срок {{ tier.term }}</span>
                <a
                  class="btn btn-sm"
                  :class="tier.featured ? 'btn-primary' : 'btn-ghost'"
                  href="#contact"
                >Обсудить</a>
              </div>
            </div>
          </div>
        </article>
      </div>

      <p class="price-note" data-reveal>
        Работаю официально как самозанятый (самозанятые.рф) — чек из «Мой налог» и договор по запросу.
        Требуется что-то уникальное? Напишите — рассчитаю индивидуально и бесплатно.
      </p>

      <PriceCalculator />
    </div>
  </section>
</template>
