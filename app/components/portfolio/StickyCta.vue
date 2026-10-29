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
  <div class="sticky-cta" :class="{ 'is-visible': show }" :aria-hidden="!show" :inert="!show">
    <div class="sticky-cta-inner">
      <div class="sticky-cta-copy" aria-live="polite">
        <p class="sticky-cta-title">{{ slides[active].title }}</p>
        <p class="sticky-cta-sub">{{ slides[active].subtitle }}</p>
      </div>
      <a
        v-show="active === 0"
        class="btn btn-primary btn-sm"
        href="#contact"
      >Обсудить</a>
      <button
        v-show="active === 1"
        class="btn btn-primary btn-sm"
        type="button"
        @click="resumeOpen = true"
      >
        <svg class="icon" aria-hidden="true"><use href="#i-file" /></svg>
        Нанять на работу
      </button>
    </div>
  </div>
</template>
