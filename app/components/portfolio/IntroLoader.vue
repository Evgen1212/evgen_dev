<script setup lang="ts">
type Phase = "hidden" | "show" | "fade";

/**
 * Брендированный прелоадер: лёгкий inline-SVG попугай + фамилия
 * с бегущим градиентом. Показывается один раз за сессию, ~0.7с.
 * На медленной сети и при prefers-reduced-motion не показывается.
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

  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;

  if (
    connection?.saveData ||
    ["slow-2g", "2g", "3g"].includes(connection?.effectiveType ?? "")
  ) {
    return;
  }

  // показываем через rAF — детерминированный первый кадр и SSR-безопасность
  raf = requestAnimationFrame(() => {
    phase.value = "show";
  });
  document.body.style.overflow = "hidden";

  t1 = window.setTimeout(() => {
    phase.value = "fade";
  }, 350);
  t2 = window.setTimeout(() => {
    phase.value = "hidden";
    document.body.style.overflow = "";
    try {
      sessionStorage.setItem("evg-intro", "1");
    } catch {
      /* приватный режим */
    }
  }, 700);
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
    <svg
      class="intro-parrot"
      viewBox="0 0 120 140"
      focusable="false"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="intro-parrot-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#f0abfc" />
          <stop offset=".55" stop-color="#d946ef" />
          <stop offset="1" stop-color="#7c3aed" />
        </linearGradient>
      </defs>
      <!-- хвост -->
      <path
        d="M38 112c-7 9-13 16-16 22 10-2 20-7 28-15z"
        fill="url(#intro-parrot-g)"
        opacity=".85"
      />
      <!-- тело -->
      <path
        d="M62 8c25 0 42 18 42 43 0 30-21 57-50 66-9 3-16-1-16-10 0-8 6-13 15-15-13-6-21-19-21-35C32 30 44 8 62 8z"
        fill="url(#intro-parrot-g)"
      />
      <!-- крыло -->
      <path
        d="M63 54c15 4 23 17 21 33-9-5-16-14-21-26z"
        fill="#0a0a0b"
        opacity=".18"
      />
      <!-- хохолок -->
      <path d="M58 12c-5-9-2-15 7-18-2 6 0 11 5 13z" fill="#22c55e" />
      <!-- клюв -->
      <path d="M100 44c12 2 17 11 10 21-3-7-8-12-15-14z" fill="#fbbf24" />
      <!-- глаз -->
      <circle cx="86" cy="44" r="5.5" fill="#0a0a0b" />
      <circle cx="87.5" cy="42.5" r="1.8" fill="#fff" />
    </svg>
    <p class="intro-word">evgen_dev</p>
    <span class="intro-bar">
      <span />
    </span>
  </div>
</template>
