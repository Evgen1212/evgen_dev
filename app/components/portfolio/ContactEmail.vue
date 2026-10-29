<script setup lang="ts">
import { Check, Copy, Mail } from "lucide-vue-next";
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
    class="inline-flex items-center gap-1 rounded-full border border-(--line-1) bg-(--surface-2) py-2 pl-4 pr-2 text-sm font-medium text-(--ink-soft) transition-all hover:border-(--line-25) hover:bg-(--surface-hover) hover:text-(--ink)"
  >
    <a
      :href="`mailto:${contactEmail}`"
      class="inline-flex items-center gap-2 transition-colors"
      :title="contactEmail"
    >
      <Mail class="size-[15px] opacity-80" aria-hidden="true" />
      E-mail
    </a>
    <button
      type="button"
      class="inline-flex size-7 shrink-0 items-center justify-center rounded-full text-(--ink-mute) transition-all hover:bg-(--surface-3) hover:text-(--ink) active:scale-[0.98]"
      :title="`Скопировать ${contactEmail}`"
      @click="copyEmail"
    >
      <Check v-if="copied" class="size-[15px]" aria-hidden="true" />
      <Copy v-else class="size-[15px] opacity-80" aria-hidden="true" />
      <span class="sr-only">{{ copied ? "Скопировано" : "Скопировать" }}</span>
    </button>
  </span>
</template>
