<script setup lang="ts">
import { X } from "lucide-vue-next";
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
    class="pointer-events-none fixed top-0 z-[120] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]"
  >
    <TransitionGroup name="toast">
      <div
        v-for="t in toasts"
        :key="t.id"
        role="status"
        :class="
          cn(
            'pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-2xl border p-4 pr-10 shadow-2xl backdrop-blur-md',
            t.variant === 'destructive'
              ? 'border-red-500/40 bg-[#1c1013]/95 text-red-50'
              : 'border-white/10 bg-[#18181b]/95 text-zinc-50'
          )
        "
      >
        <div class="min-w-0 flex-1">
          <p v-if="t.title" class="text-sm font-semibold leading-tight">
            {{ t.title }}
          </p>
          <p
            v-if="t.description"
            class="mt-1 break-words text-sm text-zinc-400"
          >
            {{ t.description }}
          </p>
        </div>
        <button
          type="button"
          aria-label="Закрыть уведомление"
          class="absolute right-3 top-3 rounded-md p-1 text-zinc-500 transition-colors hover:bg-white/10 hover:text-white"
          @click="dismiss(t.id)"
        >
          <X class="size-4" aria-hidden="true" />
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
