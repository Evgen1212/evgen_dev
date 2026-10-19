<script setup lang="ts">
/**
 * Живые часы «по Москве» + статус онлайн/офлайн.
 * Онлайн: 10:00–22:00 МСК — отвечаю быстро; ночью — отвечу утром.
 */
const TZ = "Europe/Moscow";

const timeFmt = new Intl.DateTimeFormat("ru-RU", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: TZ,
});

/** Час в МСК (0–23) для произвольного момента */
function mskHour(d: Date) {
  const h = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: false,
    timeZone: TZ,
  }).format(d);
  return Number(h) % 24;
}

function isWorkingHours(d: Date) {
  const h = mskHour(d);
  return h >= 10 && h < 22;
}

// null → SSR/первый кадр, чтобы не ловить hydration mismatch
const now = ref<Date | null>(null);

const online = computed(() => (now.value ? isWorkingHours(now.value) : false));

let raf = 0;
let timer = 0;

onMounted(() => {
  raf = requestAnimationFrame(() => {
    now.value = new Date();
  });
  timer = window.setInterval(() => {
    now.value = new Date();
  }, 30_000);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(raf);
  clearInterval(timer);
});
</script>

<template>
  <p
    data-reveal
    class="mx-auto flex w-fit items-center gap-2.5 rounded-full border border-(--line-1) bg-(--surface-2) px-4 py-2 text-sm text-(--ink-soft) backdrop-blur-sm"
    title="Моё локальное время — Москва (GMT+3)"
  >
    <span class="relative flex size-2.5" aria-hidden="true">
      <span
        v-if="online"
        class="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none"
      />
      <span
        :class="cn('relative inline-flex size-2.5 rounded-full', online ? 'bg-emerald-400' : 'bg-(--ink-faint)')"
      />
    </span>
    <span>
      Москва ·
      <span class="font-semibold tabular-nums text-(--ink)">
        {{ now ? timeFmt.format(now) : "--:--" }}
      </span>
    </span>
    <span
      :class="cn('hidden text-xs font-semibold sm:inline', online ? 'text-(--accent-emerald)' : 'text-(--ink-faint)')"
    >
      {{ online ? "на связи" : "ночью — отвечу утром" }}
    </span>
  </p>
</template>
