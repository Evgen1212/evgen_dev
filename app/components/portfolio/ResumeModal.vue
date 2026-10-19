<script setup lang="ts">
import { Download, ExternalLink, FileText, X } from "lucide-vue-next";

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
        class="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
        @click.self="close"
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Резюме Абрамова Евгения"
          class="fixed left-1/2 top-1/2 flex max-h-[92vh] w-[calc(100vw-1.5rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#141416] shadow-2xl shadow-black/60"
        >
          <!-- header -->
          <div class="flex items-start justify-between gap-4 border-b border-white/10 p-5 sm:p-6">
            <div class="flex items-center gap-3.5">
              <span
                class="grid size-11 shrink-0 place-items-center rounded-2xl border border-fuchsia-400/30 bg-fuchsia-500/15"
                aria-hidden="true"
              >
                <FileText class="size-5 text-fuchsia-300" />
              </span>
              <div>
                <h2 class="font-display text-lg font-bold leading-tight sm:text-xl">
                  Резюме — Абрамов Евгений
                </h2>
                <p class="mt-0.5 text-xs text-zinc-400 sm:text-sm">
                  Senior Frontend-разработчик · Vue 3 / Nuxt / TypeScript
                </p>
              </div>
            </div>
            <button
              type="button"
              class="grid size-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Закрыть"
              @click="close"
            >
              <X class="size-4.5" aria-hidden="true" />
            </button>
          </div>

          <!-- pdf preview -->
          <div class="min-h-0 flex-1 overflow-y-auto bg-zinc-200">
            <object
              data="/resume.pdf#view=FitH"
              type="application/pdf"
              class="h-[58vh] w-full"
              aria-label="Превью резюме PDF"
            >
              <!-- фолбэк для браузеров без встроенного PDF-просмотрщика -->
              <iframe
                src="/resume.pdf#view=FitH"
                class="h-[58vh] w-full"
                title="Резюме PDF"
              ></iframe>
            </object>
          </div>

          <!-- actions -->
          <div class="flex flex-col gap-3 border-t border-white/10 p-5 sm:flex-row sm:p-6">
            <a
              href="/resume.pdf"
              download="Abramov-Evgeniy-resume.pdf"
              class="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-black transition-all hover:scale-[1.02] active:scale-95"
            >
              <Download class="size-4" aria-hidden="true" />
              Скачать резюме
            </a>
            <a
              :href="HH_RESUME_URL"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-zinc-200 transition-all hover:border-fuchsia-400/40 hover:bg-fuchsia-500/10 hover:text-white active:scale-95"
            >
              <ExternalLink class="size-4 opacity-80" aria-hidden="true" />
              Смотреть на hh.ru
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
