<script setup lang="ts">
import type { TechItem } from './data';

withDefaults(
  defineProps<{
    items: TechItem[];
    duration?: number;
    reverse?: boolean;
  }>(),
  { duration: 52, reverse: false }
);
</script>

<template>
  <Marquee
    :duration="duration"
    :reverse="reverse"
    class="px-4 sm:px-8"
    role="list"
    aria-label="Технологии"
  >
    <span
      v-for="item in items"
      :key="item.label"
      role="listitem"
      class="mx-2 inline-flex shrink-0 items-center gap-3 whitespace-nowrap rounded-[var(--m3-shape-lg)] bg-(--m3-surface-container-high) py-2 pl-2 pr-4 elevation-1"
    >
      <span class="m3-app-icon">
        <TechIcon v-if="item.icon" :icon="item.icon" />
        <span v-else aria-hidden="true" class="text-xl leading-none">
          {{ item.emoji }}
        </span>
      </span>
      <span class="text-base font-medium text-(--ink) sm:text-lg">
        {{ item.label }}
      </span>
    </span>
  </Marquee>
</template>
