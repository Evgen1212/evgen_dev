<script setup lang="ts">
import { imageManifest } from "~/components/portfolio/image-manifest";

/**
 * Картинка с адаптивным srcset, WebP, скелетоном и плавным появлением.
 *
 * root — <span>, чтобы компонент можно было ставить и внутрь <span>
 * (аватар в шапке), и внутрь <div> (карточки, фото).
 */
type SkeletonKind = "shimmer" | "glow";

const props = withDefaults(
  defineProps<{
    /** Имя в public/images/opt/<name>-<width>.webp */
    name: string;
    alt: string;
    width: number;
    height: number;
    widths?: number[];
    sizes?: string;
    loading?: "lazy" | "eager";
    fetchpriority?: "high" | "low" | "auto";
    imgClass?: string;
    skeleton?: SkeletonKind;
    /** Переопределить цвет скелетона (по умолчанию — из манифеста) */
    color?: string;
    draggable?: boolean;
  }>(),
  {
    widths: () => [],
    sizes: "100vw",
    loading: "lazy",
    fetchpriority: "auto",
    imgClass: "",
    skeleton: "shimmer",
    color: "",
    draggable: false,
  },
);

const manifest = imageManifest as Record<string, { color: string }>;

const baseURL = useRuntimeConfig().app.baseURL || "/";
const asset = (file: string) => `${baseURL}${file.replace(/^\/+/, "")}`;

const loaded = ref(false);
const errored = ref(false);
const imgEl = ref<HTMLImageElement | null>(null);

const availableWidths = computed(() =>
  props.widths.length ? props.widths : [props.width],
);

const src = computed(() => {
  const widest = availableWidths.value[availableWidths.value.length - 1];
  return asset(`images/opt/${props.name}-${widest}.webp`);
});

const srcset = computed(() => {
  if (availableWidths.value.length < 2) return undefined;
  return availableWidths.value
    .map(
      (width) =>
        `${asset(`images/opt/${props.name}-${width}.webp`)} ${width}w`,
    )
    .join(", ");
});

const skeletonColor = computed(
  () => props.color || manifest[props.name]?.color || "",
);

function onLoad() {
  loaded.value = true;
  errored.value = false;
}

function onError() {
  errored.value = true;
  loaded.value = true;
}

onMounted(() => {
  const image = imgEl.value;
  // Картинка могла уже загрузиться из кеша до навешивания @load.
  if (image?.complete && image.naturalWidth > 0) loaded.value = true;
});
</script>

<template>
  <span
    :class="[
      'smart-img',
      `smart-img--${skeleton}`,
      { 'is-loaded': loaded, 'is-error': errored },
    ]"
    :style="skeletonColor ? { '--skeleton-color': skeletonColor } : undefined"
  >
    <img
      ref="imgEl"
      :src="src"
      :srcset="srcset"
      :sizes="sizes"
      :width="width"
      :height="height"
      :alt="alt"
      :loading="loading"
      :fetchpriority="fetchpriority"
      :draggable="draggable"
      decoding="async"
      :class="imgClass"
      @load="onLoad"
      @error="onError"
    />
    <span v-if="errored" class="smart-img__fallback" aria-hidden="true">
      {{ alt }}
    </span>
  </span>
</template>
