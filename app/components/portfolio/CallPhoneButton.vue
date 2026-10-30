<script setup lang="ts">
import { contactPhone } from "./data";
</script>

<template>
  <a
    :href="contactPhone.href"
    class="m3-assist-chip m3-state-layer android-ripple px-4 py-2 text-sm font-medium text-(--m3-primary) transition-colors hover:bg-(--m3-surface-container-high)"
    :title="`Позвонить ${contactPhone.handle}`"
  >
    <span class="material-symbols-outlined text-base opacity-80" aria-hidden="true"
      >call</span
    >
    Позвонить
  </a>
</template>
