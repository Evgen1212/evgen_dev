<script setup lang="ts">
import { ArrowUpRight } from "lucide-vue-next";

/**
 * Мобильная липкая CTA-панель (конверсия):
 * - появляется, когда hero уехал наверх;
 * - прячется, когда на экране контакты (CTA больше не нужна)
 *   или футер (не перекрывает нижнюю навигацию).
 * На <html> выставляет data-sticky-cta="on" — по этому атрибуту CSS
 * приподнимает кнопку «наверх», чтобы она не конфликтовала с панелью.
 */
const show = ref(false);

let observer: IntersectionObserver | null = null;

onMounted(() => {
  const targets = [
    document.getElementById("top"), // hero
    document.getElementById("contact"),
    document.querySelector("footer"),
  ];
  if (targets.some((t) => !t)) return;

  let pastHero = false;
  let contactVisible = false;
  let footerVisible = false;

  const update = () => {
    show.value = pastHero && !contactVisible && !footerVisible;
  };

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const id =
          entry.target instanceof HTMLElement ? entry.target.id : "";
        if (id === "top") pastHero = !entry.isIntersecting;
        else if (id === "contact") contactVisible = entry.isIntersecting;
        else footerVisible = entry.isIntersecting;
      }
      update();
    },
    // панель появляется чуть раньше, чем hero полностью уйдёт
    { rootMargin: "-96px 0px 0px 0px" }
  );

  targets.forEach((t) => t && observer!.observe(t));
});

// Синхронизация data-атрибута на <html> (порт второго useEffect):
// только на клиенте (на сервере document недоступен), сброс при unmount.
watch(
  show,
  (val) => {
    if (!import.meta.client) return;
    document.documentElement.dataset.stickyCta = val ? "on" : "off";
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  observer?.disconnect();
  if (import.meta.client) {
    delete document.documentElement.dataset.stickyCta;
  }
});
</script>

<template>
  <div
    :aria-hidden="!show"
    :inert="!show"
    :class="cn(
      'fixed inset-x-0 bottom-0 z-40 transition-transform duration-500 ease-out md:hidden',
      show ? 'translate-y-0' : 'translate-y-full'
    )"
  >
    <div class="border-t border-white/10 bg-black/85 px-4 pt-3 pb-[calc(0.85rem+env(safe-area-inset-bottom))] backdrop-blur-xl">
      <div class="mx-auto flex max-w-2xl items-center gap-3">
        <div class="min-w-0 flex-1">
          <p class="font-display text-sm font-bold text-white">
            Есть задача?
          </p>
          <p class="truncate text-[11px] leading-tight text-zinc-400">
            Отвечу в течение дня
          </p>
        </div>
        <a
          href="#contact"
          :tabindex="show ? 0 : -1"
          class="inline-flex shrink-0 items-center gap-1.5 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-purple-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-fuchsia-900/40 transition-transform hover:scale-[1.03] active:scale-95"
        >
          Обсудить проект
          <ArrowUpRight class="size-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  </div>
</template>
