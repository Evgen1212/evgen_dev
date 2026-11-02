<script setup lang="ts">
import type { DesignVariant } from '~/composables/useDesignVariant';

const props = withDefaults(
  defineProps<{
    variant: DesignVariant;
    size?: number;
  }>(),
  { size: 22 },
);

const appleSrc = useAsset('icons/design-variant/apple.svg');
const androidSrc = useAsset('icons/design-variant/android.svg');
</script>

<template>
  <span
    v-if="variant === 'main'"
    class="inline-grid place-items-center leading-none"
    :style="{ width: `${size}px`, height: `${size}px`, fontSize: `${Math.round(size * 0.85)}px` }"
    aria-hidden="true"
  >
    🦜
  </span>
  <img
    v-else-if="variant === 'android'"
    :src="androidSrc"
    alt=""
    :width="size"
    :height="size"
    class="design-variant-icon design-variant-icon--android shrink-0 object-contain"
    decoding="async"
  />
  <img
    v-else
    :src="appleSrc"
    alt=""
    :width="size"
    :height="size"
    class="design-variant-icon design-variant-icon--apple shrink-0 object-contain"
    decoding="async"
  />
</template>
