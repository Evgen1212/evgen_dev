import { ref } from "vue";

export type ToastVariant = "default" | "destructive";

export interface ToastItem {
  id: number;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration: number;
}

/**
 * Мини-тосты (порт shadcn use-toast на Vue).
 * Состояние — синглтон на модуль, поэтому один список на всё приложение.
 */
const toasts = ref<ToastItem[]>([]);
let seed = 0;
const timers = new Map<number, ReturnType<typeof setTimeout>>();

function dismiss(id: number) {
  const t = timers.get(id);
  if (t) {
    clearTimeout(t);
    timers.delete(id);
  }
  toasts.value = toasts.value.filter((x) => x.id !== id);
}

export function useToast() {
  function toast(opts: {
    title?: string;
    description?: string;
    variant?: ToastVariant;
    duration?: number;
  }) {
    const id = ++seed;
    const item: ToastItem = {
      id,
      title: opts.title,
      description: opts.description,
      variant: opts.variant ?? "default",
      duration: opts.duration ?? 5000,
    };
    // максимум 5 тостов одновременно — старые вытесняются
    toasts.value = [...toasts.value.slice(-4), item];
    timers.set(
      id,
      setTimeout(() => dismiss(id), item.duration)
    );
    return id;
  }

  return { toasts, toast, dismiss };
}
