<script setup lang="ts">
import { contactEmail } from "./data";

const { toast } = useToast();
const copied = ref(false);
let copiedTimer: ReturnType<typeof setTimeout> | undefined;

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(contactEmail);
    copied.value = true;
    toast({
      title: "E-mail скопирован",
      description: "Вставьте адрес в письмо или форму",
    });
    if (copiedTimer) clearTimeout(copiedTimer);
    copiedTimer = setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch {
    toast({ title: "Скопируйте вручную", description: contactEmail });
  }
}

onUnmounted(() => {
  if (copiedTimer) clearTimeout(copiedTimer);
});
</script>

<template>
  <span
    class="contact-email-chip m3-filter-chip m3-state-layer inline-flex min-h-8 items-center gap-0.5 py-2 pl-4 pr-1 text-sm font-medium text-(--ink-soft) hover:bg-(--m3-surface-container-high) hover:text-(--ink)"
  >
    <a
      :href="`mailto:${contactEmail}`"
      class="inline-flex items-center gap-2 transition-colors"
      :title="contactEmail"
    >
      <span class="material-symbols-outlined text-base opacity-80" aria-hidden="true"
        >mail</span
      >
      E-mail
    </a>
    <button
      type="button"
      class="contact-email-copy m3-state-layer android-ripple grid size-6 shrink-0 place-items-center rounded-full text-(--ink-mute) hover:text-(--ink)"
      :title="`Скопировать ${contactEmail}`"
      @click="copyEmail"
    >
      <span
        v-if="copied"
        class="material-symbols-outlined contact-email-copy__icon"
        aria-hidden="true"
        >check</span
      >
      <span
        v-else
        class="material-symbols-outlined contact-email-copy__icon opacity-80"
        aria-hidden="true"
        >content_copy</span
      >
      <span class="sr-only">{{ copied ? "Скопировано" : "Скопировать" }}</span>
    </button>
  </span>
</template>
