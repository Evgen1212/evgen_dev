<script setup lang="ts">
import { Check, Copy, Mail } from "lucide-vue-next";
import { contactEmail } from "./data";

const { toast } = useToast();

const copied = ref(false);

/** Кнопка-пилюля «скопировать e-mail» в блоке контактов */
function copy() {
  navigator.clipboard
    .writeText(contactEmail)
    .then(() => {
      copied.value = true;
      toast({ title: "E-mail скопирован", description: contactEmail });
      window.setTimeout(() => {
        copied.value = false;
      }, 2400);
    })
    .catch(() =>
      toast({
        title: "Не удалось скопировать",
        description: `Напишите вручную: ${contactEmail}`,
        variant: "destructive",
      })
    );
}
</script>

<template>
  <button
    type="button"
    class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-zinc-300 transition-all hover:border-fuchsia-400/40 hover:bg-fuchsia-500/10 hover:text-white active:scale-95"
    :title="`Скопировать ${contactEmail}`"
    @click="copy"
  >
    <Mail class="size-[15px] opacity-80" aria-hidden="true" />
    {{ contactEmail }}
    <Check v-if="copied" class="size-3.5 text-emerald-400" aria-hidden="true" />
    <Copy v-else class="size-3.5 opacity-60" aria-hidden="true" />
    <span class="sr-only">Скопировать e-mail в буфер обмена</span>
  </button>
</template>
