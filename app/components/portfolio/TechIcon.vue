<script setup lang="ts">
import { TECH_MULTICOLOR_ICONS, techIconPaint } from "./tech-icon-colors";

const props = defineProps<{
  icon?: string;
  emoji?: string;
  size?: number;
}>();

const sizePx = computed(() => props.size ?? 18);

function iconSrc(slug: string) {
  return useAsset(`icons/tech/${slug}.svg`);
}

const useNativeImg = computed(
  () => props.icon && TECH_MULTICOLOR_ICONS.has(props.icon),
);

const maskStyle = computed(() => {
  if (!props.icon || useNativeImg.value) return undefined;
  const src = iconSrc(props.icon);
  return {
    width: `${sizePx.value}px`,
    height: `${sizePx.value}px`,
    backgroundColor: techIconPaint(props.icon),
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  };
});
</script>

<template>
  <span
    v-if="icon || emoji"
    class="tech-chip-icon"
    :style="{ width: `${sizePx}px`, height: `${sizePx}px` }"
    aria-hidden="true"
  >
    <span v-if="icon && !useNativeImg" class="tech-chip-icon-mark" :style="maskStyle" />
    <img
      v-else-if="icon"
      class="tech-chip-icon-img tech-chip-icon-img--native"
      :src="iconSrc(icon)"
      alt=""
      :width="sizePx"
      :height="sizePx"
      loading="lazy"
      decoding="async"
    />
    <span v-else class="tech-chip-emoji">{{ emoji }}</span>
  </span>
</template>
