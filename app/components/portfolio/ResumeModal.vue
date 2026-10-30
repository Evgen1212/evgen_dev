<script setup lang="ts">
const props = defineProps<{ open: boolean }>();
const emit = defineEmits<{ (e: "update:open", v: boolean): void }>();

const HH_RESUME_URL =
  "https://hh.ru/resume/69aab81cff0ca036cf0039ed1f62446e344c4b";

function close() {
  emit("update:open", false);
}

function onKey(e: KeyboardEvent) {
  if (e.key === "Escape" && props.open) close();
}

watch(
  () => props.open,
  (open) => {
    if (import.meta.server) return;
    document.body.style.overflow = open ? "hidden" : "";
  },
  { flush: "sync" },
);

onMounted(() => window.addEventListener("keydown", onKey));
onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKey);
  document.body.style.overflow = "";
});
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="duration-150 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-[90] bg-(--scrim)"
        @click.self="close"
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Резюме Абрамова Евгения"
          class="m3-bottom-sheet-dialog flex flex-col overflow-hidden border border-(--outline-variant) bg-(--m3-surface-container) elevation-3"
        >
          <div class="m3-bottom-sheet-handle md:hidden" aria-hidden="true" />

          <!-- header -->
          <div
            class="flex items-start justify-between gap-4 border-b border-(--outline-variant) p-5 sm:p-6"
          >
            <div class="flex items-center gap-3.5">
              <span
                class="m3-icon-tile size-11 shrink-0 bg-(--m3-primary)/12"
                aria-hidden="true"
              >
                <span
                  class="material-symbols-outlined text-xl text-(--m3-primary)"
                  aria-hidden="true"
                  >description</span
                >
              </span>
              <div>
                <h2
                  class="m3-title-lg leading-tight text-(--ink)"
                >
                  Резюме — Абрамов Евгений
                </h2>
                <p class="mt-0.5 text-xs text-(--ink-mute) sm:text-sm">
                  Senior Frontend-разработчик · Vue 3 / Nuxt / TypeScript · React
                  / Next.js
                </p>
              </div>
            </div>
            <button
              type="button"
              class="m3-icon-btn m3-state-layer shrink-0 text-(--ink-mute) hover:text-(--ink)"
              aria-label="Закрыть"
              @click="close"
            >
              <span class="material-symbols-outlined text-xl" aria-hidden="true"
                >close</span
              >
            </button>
          </div>

          <!-- pdf preview -->
          <div
            class="min-h-0 flex-1 overflow-y-auto bg-(--m3-surface-container-high)"
          >
            <object
              :data="`${useAsset('resume.pdf')}#view=FitH`"
              type="application/pdf"
              class="h-[52vh] w-full md:h-[58vh]"
              aria-label="Превью резюме PDF"
            >
              <iframe
                :src="`${useAsset('resume.pdf')}#view=FitH`"
                class="h-[52vh] w-full md:h-[58vh]"
                title="Резюме PDF"
              ></iframe>
            </object>
          </div>

          <!-- actions -->
          <div
            class="flex flex-col gap-3 border-t border-(--outline-variant) p-5 sm:flex-row sm:p-6"
          >
            <a
              :href="useAsset('resume.pdf')"
              download="Abramov-Evgeniy-resume.pdf"
              class="m3-filled-btn flex-1 px-6 py-3.5 text-sm"
            >
              <span class="material-symbols-outlined text-lg" aria-hidden="true"
                >download</span
              >
              Скачать резюме
            </a>
            <a
              :href="HH_RESUME_URL"
              target="_blank"
              rel="noopener noreferrer"
              class="m3-outlined-btn flex-1 px-6 py-3.5 text-sm"
            >
              <span
                class="material-symbols-outlined text-lg opacity-80"
                aria-hidden="true"
                >open_in_new</span
              >
              Смотреть на hh.ru
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
