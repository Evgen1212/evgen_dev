<script setup lang="ts">
import { Phone } from 'lucide-vue-next';

/** Коллаж 2×2 для сжатого rail (main desktop): TG, Instagram, VK, phone */
</script>

<template>
  <span class="social-combo-trigger" aria-hidden="true">
    <img
      :src="useAsset('icons/social/telegram.svg')"
      alt=""
      width="11"
      height="11"
      class="social-combo-trigger__icon social-icon opacity-90"
      decoding="async"
    />
    <img
      :src="useAsset('icons/social/instagram.svg')"
      alt=""
      width="11"
      height="11"
      class="social-combo-trigger__icon social-icon opacity-90"
      decoding="async"
    />
    <img
      :src="useAsset('icons/social/vk.svg')"
      alt=""
      width="11"
      height="11"
      class="social-combo-trigger__icon social-icon opacity-90"
      decoding="async"
    />
    <Phone
      class="social-combo-trigger__icon size-[11px] text-(--ink-soft)"
      aria-hidden="true"
    />
  </span>
</template>

<style scoped>
.social-combo-trigger {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  width: 1.75rem;
  height: 1.75rem;
  place-items: center;
  gap: 0;
}

.social-combo-trigger__icon {
  width: 0.6875rem;
  height: 0.6875rem;
}
</style>
