<script setup lang="ts">
/**
 * Анимированный счётчик: число «накручивается» от 0 до value
 * при попадании в вьюпорт (easing outCubic, rAF без ре-рендеров родителя).
 * При prefers-reduced-motion сразу показывает финальное значение.
 */
const props = withDefaults(
  defineProps<{
    value: number;
    prefix?: string;
    suffix?: string;
    duration?: number;
  }>(),
  { duration: 1600 }
);

const el = ref<HTMLElement | null>(null);
const started = ref(false);
const display = ref(0);

let io: IntersectionObserver | null = null;
let raf = 0;

onMounted(() => {
  const node = el.value;
  if (!node) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const dur = reduced ? 0 : props.duration;

  io = new IntersectionObserver(
    (entries) => {
      if (started.value || !entries.some((e) => e.isIntersecting)) return;
      started.value = true;
      io?.disconnect();

      const t0 = performance.now();
      const tick = (t: number) => {
        const p = dur === 0 ? 1 : Math.min((t - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        display.value = Math.round(eased * props.value);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    },
    { threshold: 0.4 }
  );
  io.observe(node);
});

onBeforeUnmount(() => {
  io?.disconnect();
  cancelAnimationFrame(raf);
});
</script>

<template>
  <span ref="el">{{ prefix }}{{ display }}{{ suffix }}</span>
</template>
