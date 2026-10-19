<script setup lang="ts">
import { ArrowUpRight, Mail, Phone } from "lucide-vue-next";
import { socials } from "./data";

const descriptions: Record<string, string> = {
  Telegram: "Отвечаю в течение часа",
  Телефон: "Предпочитаю звонки",
  WhatsApp: "Тот же номер",
  "E-mail": "Резюме и офферы",
  "Хабр Карьера": "Резюме и вакансии",
  GitHub: "Код и пет-проекты",
  GitLab: "Эксперименты и CI/CD",
  Instagram: "Живая лента и сторис",
  VK: "Посты и сообщения",
};

// primaryNames больше не нужен: все соцсети — primary, вторичный ряд чипов пуст
// (внизу остаётся только CopyEmailButton).
const primary = socials;
const secondary: typeof socials = [];
</script>

<template>
  <section id="contact" class="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
    <!-- aurora glow at bottom -->
    <div aria-hidden="true" class="absolute inset-0 overflow-hidden">
      <div class="aurora-layer aurora-b opacity-70" />
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,10,11,0.82)_100%)]"
      />
    </div>

    <div class="relative mx-auto max-w-7xl px-5 sm:px-8">
      <div data-reveal class="mb-12 text-center sm:mb-16">
        <SectionKicker>Связь</SectionKicker>
        <h2 class="font-display text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Контакты
        </h2>
        <p class="mt-4 text-base text-zinc-400 sm:text-lg">
          выберите удобный способ — отвечаю быстро
        </p>
        <LocalTime class="mt-6" />
      </div>

      <!-- карточки соцсетей: 6 штук, 2–3 в ряд -->
      <div class="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <a
          v-for="(s, i) in primary"
          :key="s.name"
          :href="s.href"
          :target="s.href.startsWith('http') ? '_blank' : undefined"
          :rel="s.href.startsWith('http') ? 'noopener noreferrer' : undefined"
          data-reveal
          :style="{ '--reveal-delay': `${i * 90}ms` }"
          class="card-shine group flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07] sm:p-6"
        >
          <span
            class="grid size-14 shrink-0 place-items-center rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-110"
            :style="{
              backgroundColor: `#${s.color}22`,
              border: `1px solid #${s.color}55`,
            }"
          >
            <!-- telegram рисуется из /icons/social, phone/mail — lucide -->
            <Phone v-if="s.icon === 'phone'" class="size-[26px]" aria-hidden="true" />
            <Mail v-else-if="s.icon === 'mail'" class="size-[26px]" aria-hidden="true" />
            <img
              v-else
              :src="`/icons/social/${s.icon}.svg`"
              alt=""
              width="26"
              height="26"
              class="size-[26px]"
              loading="lazy"
            />
          </span>
          <span class="min-w-0 flex-1">
            <span class="block font-display text-lg font-bold text-white">{{ s.name }}</span>
            <span class="block truncate text-sm text-zinc-400">{{
              descriptions[s.name] ?? s.handle
            }}</span>
          </span>
          <ArrowUpRight
            class="size-5 shrink-0 text-zinc-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
            aria-hidden="true"
          />
        </a>
      </div>

      <!-- нижний ряд чипов: только кнопка копирования e-mail -->
      <div data-reveal class="mt-8 flex flex-wrap items-center justify-center gap-2">
        <a
          v-for="s in secondary"
          :key="s.name"
          :href="s.href"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-zinc-300 transition-all hover:border-white/25 hover:bg-white/10 hover:text-white"
        >
          <img
            :src="`/icons/social/${s.icon}.svg`"
            alt=""
            width="15"
            height="15"
            class="size-[15px] opacity-80"
            loading="lazy"
          />
          {{ s.name }}
        </a>
        <CopyEmailButton />
      </div>
    </div>
  </section>
</template>
