<script setup lang="ts">
import { ArrowUpRight, FileText } from "lucide-vue-next";

/**
 * Мобильная липкая CTA-панель (конверсия):
 * - появляется, когда hero уехал наверх;
 * - прячется, когда на экране контакты (CTA больше не нужна)
 *   или футер (не перекрывает нижнюю навигацию).
 * На <html> выставляет data-sticky-cta="on" — по этому атрибуту CSS
 * приподнимает кнопку «наверх», чтобы она не конфликтовала с панелью.
 */
const show = ref(false);

/* ─── Общий стейт с Hero: кнопка «Нанять на работу» открывает резюме ─── */
const resumeOpen = useState('resume-open', () => false);

/* ─── Две CTA-плашки, которые переключаются каждые 10 секунд ─── */
const slides = [
  {
    title: 'Есть задача?',
    subtitle: 'Отвечу в течение дня',
    label: 'Обсудить проект',
  },
  {
    title: 'Ищете разработчика?',
    subtitle: 'Резюме, стек и опыт',
    label: 'Нанять на работу',
  },
] as const;

const active = ref(0);
const paused = ref(false);

let slideTimer: ReturnType<typeof setInterval> | null = null;

function stopSlides() {
  if (slideTimer) {
    clearInterval(slideTimer);
    slideTimer = null;
  }
}

function startSlides() {
  stopSlides();
  slideTimer = setInterval(() => {
    if (!paused.value) {
      active.value = (active.value + 1) % slides.length;
    }
  }, 10_000);
}

watch(show, (val) => {
  if (val) {
    startSlides();
  } else {
    stopSlides();
    active.value = 0;
  }
});

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
  stopSlides();
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
    <div
      class="border-t border-(--line-1) bg-(--cta-bar) px-4 pt-3 pb-[calc(0.85rem+env(safe-area-inset-bottom))] backdrop-blur-xl"
      @mouseenter="paused = true"
      @mouseleave="paused = false"
      @focusin="paused = true"
      @focusout="paused = false"
    >
      <div class="mx-auto min-h-11 max-w-2xl">
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 translate-x-6"
          enter-to-class="opacity-100 translate-x-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 translate-x-0"
          leave-to-class="opacity-0 -translate-x-6"
          mode="out-in"
        >
          <div :key="active" class="flex items-center gap-3">
            <div class="min-w-0 flex-1">
              <p class="font-display text-sm font-bold text-(--ink)">
                {{ slides[active].title }}
              </p>
              <p class="truncate text-[11px] leading-tight text-(--ink-mute)">
                {{ slides[active].subtitle }}
              </p>
            </div>

            <a
              v-if="active === 0"
              href="#contact"
              :tabindex="show ? 0 : -1"
              class="inline-flex shrink-0 items-center gap-1.5 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-purple-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-fuchsia-900/40 transition-transform hover:scale-[1.03] active:scale-95"
            >
              {{ slides[active].label }}
              <ArrowUpRight class="size-4" aria-hidden="true" />
            </a>
            <button
              v-else
              type="button"
              :tabindex="show ? 0 : -1"
              class="inline-flex shrink-0 items-center gap-1.5 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-purple-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-fuchsia-900/40 transition-transform hover:scale-[1.03] active:scale-95"
              @click="resumeOpen = true"
            >
              <FileText class="size-4" aria-hidden="true" />
              {{ slides[active].label }}
            </button>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
