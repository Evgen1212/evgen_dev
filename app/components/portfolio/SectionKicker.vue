<script setup lang="ts">
defineProps<{
  plain?: boolean;
}>();
</script>

<template>
  <span
    class="mb-5 inline-flex items-center gap-2"
    :class="plain ? 'm3-label' : 'm3-assist-chip text-(--ink-soft)'"
  >
    <span
      aria-hidden="true"
      class="size-1.5 rounded-full bg-(--m3-primary)"
    />
    <slot />
  </span>
</template>
