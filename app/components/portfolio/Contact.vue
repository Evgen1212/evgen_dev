<script setup lang="ts">
import { ArrowUpRight, Mail, Phone } from "lucide-vue-next";
import { socials } from "./data";

const descriptions: Record<string, string> = {
  Telegram: "Отвечаю в течение часа",
  Телефон: "Предпочитаю звонки",
  WhatsApp: "Тот же номер",
  "E-mail": "Резюме и офферы",
  "Хабр Карьера": "Резюме и офферы",
  Instagram: "Отвечаю в течение дня",
  VK: "Отвечаю в течение дня",
};

const primaryNames = new Set(["Telegram", "Телефон"]);
const primary = socials.filter((s) => primaryNames.has(s.name));
const secondary = socials.filter((s) => !primaryNames.has(s.name) && s.name !== "E-mail");

function primaryFrameClass(name: string) {
  if (name === "Telegram") {
    return "bg-gradient-to-br from-[#26A5E4]/55 via-[#26A5E4]/20 to-transparent shadow-[0_0_40px_-12px_rgba(38,165,228,0.45)]";
  }
  return "bg-gradient-to-br from-emerald-400/55 via-emerald-500/20 to-transparent shadow-[0_0_40px_-12px_rgba(52,211,153,0.4)]";
}
</script>

<template>
  <section id="contact" class="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
    <!-- aurora glow at bottom -->
    <div aria-hidden="true" class="absolute inset-0 overflow-hidden">
      <div class="aurora-layer aurora-b opacity-70" />
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--vignette-strong)_100%)]"
      />
    </div>

    <div class="relative mx-auto max-w-7xl px-5 sm:px-8">
      <div data-reveal class="mb-12 text-center sm:mb-16">
        <SectionKicker>Связь</SectionKicker>
        <h2 class="font-display text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Контакты
        </h2>
        <p class="mt-4 text-base text-(--ink-mute) sm:text-lg">
          выберите удобный способ — отвечаю быстро
        </p>
        <LocalTime class="mt-6" />
      </div>

      <p
        data-reveal
        class="mx-auto mb-4 max-w-3xl text-center text-xs font-semibold uppercase tracking-[0.2em] text-(--ink-faint)"
      >
        основной способ связи
      </p>

      <div class="mx-auto grid max-w-2xl gap-3 sm:grid-cols-2">
        <div
          v-for="(s, i) in primary"
          :key="s.name"
          data-reveal
          :style="{ '--reveal-delay': `${i * 90}ms` }"
          class="rounded-2xl p-px transition-transform duration-300 hover:-translate-y-0.5"
          :class="primaryFrameClass(s.name)"
        >
          <a
            :href="s.href"
            :target="s.href.startsWith('http') ? '_blank' : undefined"
            :rel="s.href.startsWith('http') ? 'noopener noreferrer' : undefined"
            class="card-shine group relative flex h-full items-center gap-3 rounded-[calc(1rem-1px)] border border-(--line-1)/80 bg-(--surface-2) p-4 backdrop-blur-sm transition-all duration-300 hover:bg-(--surface-4) sm:p-4"
          >
            <span
              class="grid size-12 shrink-0 place-items-center rounded-xl shadow-md ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-105"
              :style="{
                backgroundColor: `#${s.color}30`,
                border: `1px solid #${s.color}77`,
                boxShadow: `0 6px 18px -8px #${s.color}66`,
              }"
            >
              <Phone
                v-if="s.icon === 'phone'"
                class="size-5"
                :style="{ color: `#${s.color}` }"
                aria-hidden="true"
              />
              <img
                v-else
                :src="useAsset(`icons/social/${s.icon}.svg`)"
                alt=""
                width="22"
                height="22"
                class="social-icon size-5"
                loading="lazy"
                decoding="async"
              />
            </span>
            <span class="min-w-0 flex-1">
              <span class="block font-display text-lg font-bold text-(--ink)">{{
                s.name
              }}</span>
              <span class="mt-0.5 block text-xs font-medium text-(--ink-soft)">{{
                descriptions[s.name] ?? s.handle
              }}</span>
              <span class="mt-0.5 block truncate font-mono text-xs text-(--ink-mute)">{{
                s.handle
              }}</span>
            </span>
            <ArrowUpRight
              class="size-4 shrink-0 text-(--ink-faint) transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-(--ink)"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>

      <div data-reveal class="mt-8 flex flex-wrap items-center justify-center gap-2">
        <span class="mb-1 w-full text-center text-xs text-(--ink-faint) sm:mb-0 sm:w-auto sm:pr-1">
          также:
        </span>
        <a
          v-for="s in secondary"
          :key="s.name"
          :href="s.href"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 rounded-full border border-(--line-1) bg-(--surface-2) px-4 py-2 text-sm font-medium text-(--ink-soft) transition-all hover:border-(--line-25) hover:bg-(--surface-hover) hover:text-(--ink)"
        >
          <Phone v-if="s.icon === 'phone'" class="size-[15px] opacity-80" aria-hidden="true" />
          <Mail v-else-if="s.icon === 'mail'" class="size-[15px] opacity-80" aria-hidden="true" />
          <img
            v-else
            :src="useAsset(`icons/social/${s.icon}.svg`)"
            alt=""
            width="15"
            height="15"
            class="social-icon size-[15px] opacity-80"
            loading="lazy"
            decoding="async"
          />
          {{ s.name }}
        </a>
        <ContactEmail />
      </div>
    </div>
  </section>
</template>
