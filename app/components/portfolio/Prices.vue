<script setup lang="ts">
import { prices } from "./data";

const isMobile = useMediaQuery("(max-width: 640px)");
const pricesOpen = ref(false);

const isPricesPanelOpen = computed(() => !isMobile.value || pricesOpen.value);

function togglePricesPanel() {
  if (!isMobile.value) return;
  pricesOpen.value = !pricesOpen.value;
}

const pricesPreview = computed(() => {
  const tier = prices.find((t) => t.featured) ?? prices[0];
  return tier ? `от ${tier.price}` : "";
});
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

      <div
        class="prices-accordion"
        :class="{ 'is-open': isPricesPanelOpen }"
        data-reveal
      >
        <div class="prices-accordion-head">
          <h3 class="prices-accordion-title">
            <button
              id="prices-trigger"
              class="prices-trigger"
              type="button"
              :aria-expanded="isPricesPanelOpen"
              aria-controls="prices-panel"
              @click="togglePricesPanel"
            >
              <span class="prices-heading">
                <span class="prices-heading-name">Тарифы и условия</span>
                <span class="prices-heading-sub">4 пакета — прозрачные цены</span>
              </span>
              <span
                v-if="isMobile && !pricesOpen"
                class="prices-trigger-preview nowrap"
                aria-hidden="true"
              >
                {{ pricesPreview }}
              </span>
              <span class="prices-chevron" aria-hidden="true">
                <svg class="icon"><use href="#i-chevron-down" /></svg>
              </span>
            </button>
          </h3>
        </div>

        <div
          id="prices-panel"
          class="prices-panel"
          role="region"
          aria-labelledby="prices-trigger"
          :inert="isMobile && !pricesOpen"
        >
          <div class="prices-panel-inner">
            <div class="price-grid stagger">
              <article
                v-for="(tier, i) in prices"
                :key="tier.name"
                class="price-card"
                :class="{ 'is-featured': tier.featured }"
                data-reveal
                :style="{ '--reveal-delay': `${i * 60}ms` }"
              >
                <span v-if="tier.featured" class="price-badge">Популярный выбор</span>
                <h3 class="price-name">{{ tier.name }}</h3>
                <p class="price-value">
                  <span class="nowrap">{{ tier.price }}</span>
                </p>
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
              </article>
            </div>

            <p class="price-note">
              Работаю официально как самозанятый (самозанятые.рф) — чек из «Мой налог» и договор по запросу.
              Требуется что-то уникальное? Напишите — рассчитаю индивидуально и бесплатно.
            </p>
          </div>
        </div>
      </div>

      <PriceCalculator />
    </div>
  </section>
</template>
