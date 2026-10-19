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
      <span class="flex items-center gap-3 whitespace-nowrap">
        <img
          v-if="item.icon"
          :src="`/icons/tech/${item.icon}.svg`"
          alt=""
          width="26"
          height="26"
          class="size-6 sm:size-7 shrink-0"
          loading="lazy"
        />
        <span v-else aria-hidden="true" class="text-xl sm:text-2xl leading-none">
          {{ item.emoji }}
        </span>
        <span class="text-lg sm:text-2xl font-medium text-(--ink-soft)">
          {{ item.label }}
        </span>
      </span>
      <MarqueeDot />
    </span>
  </Marquee>
</template>
