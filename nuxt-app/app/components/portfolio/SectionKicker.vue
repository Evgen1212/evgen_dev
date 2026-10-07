<script setup lang="ts">
// Маленькая пилюля-надзаголовок секции (✦ Кейсы) — слотовый компонент
</script>

<template>
  <span class="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-400 sm:text-xs">
    <span
      aria-hidden="true"
      class="size-1.5 rounded-full bg-gradient-to-r from-fuchsia-400 to-purple-400 shadow-[0_0_8px_rgba(217,70,239,0.8)]"
    />
    <slot />
  </span>
</template>
