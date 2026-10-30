<script setup lang="ts">
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

</script>

<template>
  <section id="contact" class="m3-section">
    <div class="relative mx-auto max-w-7xl px-5 sm:px-8">
      <div data-reveal class="mb-12 text-center max-md:text-left sm:mb-16">
        <SectionKicker>Связь</SectionKicker>
        <h2 class="m3-headline-lg">
          Контакты
        </h2>
        <p class="mt-4 text-base text-(--ink-mute) sm:text-lg">
          выберите удобный способ — отвечаю быстро
        </p>
        <LocalTime class="mt-6 max-md:mx-0" />
      </div>

      <p
        data-reveal
        class="m3-label mx-auto mb-4 block max-w-3xl text-center max-md:text-left"
      >
        основной способ связи
      </p>

      <div class="mx-auto max-w-2xl">
        <div
          class="m3-card divide-y divide-(--outline-variant) overflow-hidden p-0 elevation-1"
        >
        <template v-for="(s, i) in primary" :key="s.name">
          <a
            data-reveal
            :style="{ '--reveal-delay': `${i * 90}ms` }"
            :href="s.href"
            :target="s.href.startsWith('http') ? '_blank' : undefined"
            :rel="s.href.startsWith('http') ? 'noopener noreferrer' : undefined"
            class="m3-state-layer android-ripple group relative flex min-h-14 items-center gap-3 p-4"
          >
            <span
              class="m3-icon-tile size-12 shrink-0"
              :style="{ color: `#${s.color}` }"
            >
              <span
                v-if="s.icon === 'phone'"
                class="material-symbols-outlined text-xl"
                :style="{ color: `#${s.color}` }"
                aria-hidden="true"
                >call</span
              >
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
              <span class="block m3-title-md text-(--ink)">{{ s.name }}</span>
              <span class="mt-0.5 block text-xs font-medium text-(--ink-soft)">{{
                descriptions[s.name] ?? s.handle
              }}</span>
              <span
                class="mt-0.5 block truncate text-xs tabular-nums text-(--ink-mute)"
                >{{ s.handle }}</span
              >
            </span>
            <span
              class="material-symbols-outlined shrink-0 text-2xl text-(--m3-on-surface-variant)"
              aria-hidden="true"
              >chevron_right</span
            >
          </a>
        </template>
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
          class="m3-filter-chip m3-state-layer android-ripple inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-(--ink-soft) transition-colors hover:bg-(--m3-surface-container-high) hover:text-(--ink)"
        >
          <span
            v-if="s.icon === 'phone'"
            class="material-symbols-outlined text-base opacity-80"
            aria-hidden="true"
            >call</span
          >
          <span
            v-else-if="s.icon === 'mail'"
            class="material-symbols-outlined text-base opacity-80"
            aria-hidden="true"
            >mail</span
          >
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
