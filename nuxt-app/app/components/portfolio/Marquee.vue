<script setup lang="ts">
withDefaults(
  defineProps<{
    /** Длительность одного прохода ленты, сек */
    duration?: number;
    reverse?: boolean;
    pauseOnHover?: boolean;
  }>(),
  { duration: 40, reverse: false, pauseOnHover: false }
);
// class на компонент вешается на корневой div через наследование атрибутов
</script>

<template>
  <div :class="cn('overflow-hidden marquee-fade', pauseOnHover && 'marquee-hover-pause')">
    <div
      :class="cn('marquee-track', reverse && 'reverse')"
      :style="{ '--marquee-duration': `${duration}s` }"
    >
      <div class="flex items-center shrink-0"><slot /></div>
      <div class="flex items-center shrink-0" aria-hidden="true"><slot /></div>
    </div>
  </div>
</template>
