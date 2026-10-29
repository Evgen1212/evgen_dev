<script setup lang="ts">
import { Phone } from "lucide-vue-next";
import { contactPhone } from "./data";
</script>

<template>
  <a
    :href="contactPhone.href"
    class="inline-flex items-center gap-2 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-[0_0_20px_-8px_rgba(52,211,153,0.35)] transition-all hover:border-emerald-500/55 hover:bg-emerald-500/20 hover:text-emerald-900 active:scale-95 dark:border-emerald-400/35 dark:bg-emerald-500/15 dark:text-emerald-200 dark:hover:text-white"
    :title="`Позвонить ${contactPhone.handle}`"
  >
    <Phone class="size-[15px] opacity-80" aria-hidden="true" />
    Позвонить
  </a>
</template>
