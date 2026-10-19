<script setup lang="ts">
type Phase = "hidden" | "show" | "fade";

/**
 * Брендированный прелоадер: попугай покачивается + фамилия с бегущим градиентом.
 * Показывается один раз за сессию (sessionStorage), ~1.4с суммарно.
 * При prefers-reduced-motion — не показывается вовсе.
 */
const phase = ref<Phase>("hidden");

let raf = 0;
let t1 = 0;
let t2 = 0;

onMounted(() => {
  let seen = false;
  try {
    seen = sessionStorage.getItem("evg-intro") === "1";
  } catch {
    seen = false;
  }
  if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  // показываем через rAF — детерминированный первый кадр и SSR-безопасность
  raf = requestAnimationFrame(() => {
    phase.value = "show";
  });
  document.body.style.overflow = "hidden";

  t1 = window.setTimeout(() => {
    phase.value = "fade";
  }, 950);
  t2 = window.setTimeout(() => {
    phase.value = "hidden";
    document.body.style.overflow = "";
    try {
      sessionStorage.setItem("evg-intro", "1");
    } catch {
      /* приватный режим */
    }
  }, 1500);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(raf);
  clearTimeout(t1);
  clearTimeout(t2);
  document.body.style.overflow = "";
});
</script>

<template>
  <div
    v-if="phase !== 'hidden'"
    aria-hidden="true"
    :class="`intro-overlay ${phase === 'fade' ? 'intro-fade' : ''}`"
  >
    <img
      src="/images/parrot-transparent.png"
      alt=""
      draggable="false"
      class="intro-parrot"
    />
    <p class="intro-word">evgen_dev</p>
    <span class="intro-bar">
      <span />
    </span>
  </div>
</template>
