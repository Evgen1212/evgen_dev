<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string;
    subtitle?: string;
    kicker?: string;
    align?: "center" | "left";
  }>(),
  { align: "center" },
);
// class на компонент вешается на корневой div через наследование атрибутов
</script>

<template>
  <div
    data-reveal
    :class="
      cn(
        'mb-12 sm:mb-16',
        align === 'center' ? 'text-center max-md:text-left' : 'text-left',
      )
    "
  >
    <SectionKicker v-if="kicker">{{ kicker }}</SectionKicker>
    <h2 class="m3-headline-lg">
      {{ title }}
    </h2>
    <p v-if="subtitle" class="mt-4 text-base sm:text-lg text-(--ink-mute)">{{ subtitle }}</p>
  </div>
</template>
