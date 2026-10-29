<script setup lang="ts">
import type { TechItem } from "./data";

/**
 * Порт TechRow из tech.tsx (вынесен в отдельный SFC —
 * один SFC = один компонент). Класс fallthrough: className
 * с родителя ложится на корневой Marquee автоматически.
 */
defineProps<{
  items: TechItem[];
  duration: number;
  reverse?: boolean;
}>();
</script>

<template>
  <Marquee :duration="duration" :reverse="reverse" pause-on-hover>
    <span v-for="item in items" :key="item.label" class="flex items-center">
      <span v-if="item.icon || item.emoji" class="flex items-center gap-3 whitespace-nowrap">
        <TechIcon :icon="item.icon" :emoji="item.emoji" :size="26" class="shrink-0" />
        <span class="text-lg sm:text-2xl font-medium text-(--ink-soft)">
          {{ item.label }}
        </span>
      </span>
      <MarqueeDot />
    </span>
  </Marquee>
</template>
