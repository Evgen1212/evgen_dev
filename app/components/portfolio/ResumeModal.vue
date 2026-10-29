<script setup lang="ts">
const props = defineProps<{ open: boolean }>();
const emit = defineEmits<{ (e: 'update:open', v: boolean): void }>();

const HH_RESUME_URL =
  'https://hh.ru/resume/69aab81cff0ca036cf0039ed1f62446e344c4b';

const dialog = ref<HTMLElement | null>(null);
let lastFocused: HTMLElement | null = null;

function close() {
  emit('update:open', false);
}

function focusables(): HTMLElement[] {
  if (!dialog.value) return [];
  return Array.from(
    dialog.value.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => el.offsetParent !== null);
}

function onKey(e: KeyboardEvent) {
  if (!props.open) return;

  if (e.key === 'Escape') {
    e.preventDefault();
    close();
    return;
  }

  if (e.key !== 'Tab') return;

  const items = focusables();
  if (!items.length) return;

  const first = items[0]!;
  const last = items[items.length - 1]!;
  const active = document.activeElement as HTMLElement | null;

  if (e.shiftKey && (active === first || !dialog.value?.contains(active))) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && active === last) {
    e.preventDefault();
    first.focus();
  }
}

watch(
  () => props.open,
  (open) => {
    if (import.meta.server) return;

    if (open) {
      lastFocused = document.activeElement as HTMLElement | null;
      document.body.style.overflow = 'hidden';
      nextTick(() => focusables()[0]?.focus());
    } else {
      document.body.style.overflow = '';
      lastFocused?.focus?.();
      lastFocused = null;
    }
  },
  { flush: 'post' }
);

onMounted(() => window.addEventListener('keydown', onKey));
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey);
  document.body.style.overflow = '';
});
</script>

<template>
  <Teleport to="body">
    <div
      class="resume-modal"
      :class="{ 'is-open': open }"
      :aria-hidden="!open"
      :inert="!open"
    >
      <div class="resume-backdrop" aria-hidden="true" @click="close" />
      <div
        ref="dialog"
        class="resume-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-title"
        aria-describedby="resume-description"
      >
        <header class="resume-head">
          <span class="resume-icon" aria-hidden="true">
            <svg class="icon"><use href="#i-file" /></svg>
          </span>
          <div class="resume-heading">
            <h2 id="resume-title" class="resume-title">Резюме — Абрамов Евгений</h2>
            <p id="resume-description" class="resume-description">
              Senior Frontend-разработчик · Vue 3 / Nuxt / TypeScript · React / Next.js
            </p>
          </div>
          <button class="resume-close" type="button" aria-label="Закрыть" @click="close">
            <svg class="icon" aria-hidden="true"><use href="#i-close" /></svg>
          </button>
        </header>

        <div class="resume-preview">
          <object
            :data="`${useAsset('resume.pdf')}#view=FitH`"
            type="application/pdf"
            class="resume-pdf"
            aria-label="Превью резюме PDF"
          >
            <iframe
              :src="`${useAsset('resume.pdf')}#view=FitH`"
              class="resume-pdf"
              title="Резюме PDF"
            />
          </object>
        </div>

        <div class="resume-actions">
          <a
            class="btn btn-primary resume-action"
            :href="useAsset('resume.pdf')"
            download="Abramov-Evgeniy-resume.pdf"
          >
            <svg class="icon" aria-hidden="true"><use href="#i-download" /></svg>
            Скачать резюме
          </a>
          <a
            class="btn btn-ghost resume-action"
            :href="HH_RESUME_URL"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg class="icon" aria-hidden="true"><use href="#i-external" /></svg>
            Смотреть на hh.ru
          </a>
        </div>
      </div>
    </div>
  </Teleport>
</template>
