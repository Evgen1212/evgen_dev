<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string;
    subtitle?: string;
    kicker?: string;
    align?: "center" | "left";
  }>(),
  { align: "center" }
);
// class на компонент вешается на корневой div через наследование атрибутов
</script>

<template>
  <div data-reveal :class="cn('mb-12 sm:mb-16', align === 'center' ? 'text-center' : 'text-left')">
    <SectionKicker v-if="kicker">{{ kicker }}</SectionKicker>
    <h2 class="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight">
      {{ title }}
    </h2>
    <p v-if="subtitle" class="mt-4 text-base sm:text-lg text-(--ink-mute)">{{ subtitle }}</p>
  </div>
</template>
