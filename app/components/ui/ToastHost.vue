<script setup lang="ts">
import { cn } from "~/utils/cn";
import { useToast } from "~/composables/use-toast";

const { toasts, dismiss } = useToast();
</script>

<template>
  <!-- Порт shadcn Toaster: мобайл — сверху, десктоп — справа снизу -->
  <div
    aria-live="polite"
    aria-relevant="additions text"
    role="region"
    aria-label="Уведомления"
    class="toast-host pointer-events-none fixed z-[120] flex max-h-screen w-full flex-col gap-2 p-4 max-md:bottom-[calc(var(--m3-bottom-nav-h)+0.75rem+env(safe-area-inset-bottom))] max-md:top-auto max-md:px-3 md:bottom-0 md:right-0 md:top-auto md:max-w-[420px] max-md:transition-[bottom] max-md:duration-400"
  >
    <TransitionGroup name="toast">
      <div
        v-for="t in toasts"
        :key="t.id"
        role="status"
        :class="
          cn(
            'm3-snackbar pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-[var(--m3-shape-sm)] p-4 pr-10 md:border md:elevation-3',
            t.variant === 'destructive'
              ? 'md:border-red-400/50 bg-(--m3-inverse-surface) text-(--m3-inverse-on-surface) md:bg-(--m3-surface-container-high) md:text-red-100'
              : 'md:border-(--outline-variant) bg-(--m3-inverse-surface) text-(--m3-inverse-on-surface) md:bg-(--m3-surface-container-high) md:text-(--ink)'
          )
        "
      >
        <div class="min-w-0 flex-1">
          <p v-if="t.title" class="text-sm font-semibold leading-tight">
            {{ t.title }}
          </p>
          <p
            v-if="t.description"
            class="mt-1 break-words text-sm text-(--m3-inverse-on-surface)/75 md:text-(--ink-mute)"
          >
            {{ t.description }}
          </p>
        </div>
        <button
          type="button"
          aria-label="Закрыть уведомление"
          class="m3-icon-btn m3-state-layer absolute right-2 top-2 text-(--ink-faint) hover:text-(--ink)"
          @click="dismiss(t.id)"
        >
          <span class="material-symbols-outlined text-xl" aria-hidden="true">close</span>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(16px) scale(0.97);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.97);
}
.toast-move {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
