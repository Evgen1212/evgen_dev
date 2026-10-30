<script setup lang="ts">
import { techIconAssetSlug } from './tech-icon-theme';

const props = withDefaults(
  defineProps<{
    icon: string;
    sizeClass?: string;
    width?: number;
    height?: number;
  }>(),
  {
    sizeClass: 'size-7',
    width: 26,
    height: 26,
  },
);

const { theme } = useResolvedTheme();

const src = computed(() =>
  useAsset(`icons/tech/${techIconAssetSlug(props.icon, theme.value)}.svg`),
);
</script>

<template>
  <img
    :src="src"
    alt=""
    :width="width"
    :height="height"
    :class="sizeClass"
    class="tech-icon-img shrink-0"
    loading="lazy"
    decoding="async"
  />
</template>
