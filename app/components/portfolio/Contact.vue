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

// primaryNames больше не нужен: все соцсети — primary, вторичный ряд чипов пуст
// (внизу остаётся только CopyEmailButton).
const primary = socials;
const secondary: typeof socials = [];

const email = 'evg3nyaevgen@yandex.ru';
const contactCards = socials.filter((item) => item.name !== 'E-mail');

const copied = ref(false);
let copyTimer: ReturnType<typeof setTimeout> | undefined;

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(email);
    copied.value = true;
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => (copied.value = false), 2000);
  } catch {
    window.location.href = `mailto:${email}`;
  }
}

onBeforeUnmount(() => clearTimeout(copyTimer));

const moscowTime = ref('--:--');
let clock: ReturnType<typeof setInterval> | undefined;

onMounted(() => {
  const formatter = new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Moscow',
  });
  const tick = () => (moscowTime.value = formatter.format(new Date()));
  tick();
  clock = setInterval(tick, 30_000);
});

onBeforeUnmount(() => clearInterval(clock));
</script>
<template>
  <section id="contact" class="section" aria-labelledby="contact-title">
    <div class="container">
      <header class="section-head" data-reveal>
        <p class="kicker">Связь</p>
        <h2 id="contact-title" class="section-title">Контакты</h2>
        <p class="section-lede">выберите удобный способ — отвечаю быстро</p>
        <p class="local-time">
          <span class="status-dot" aria-hidden="true" />
          Москва · <span class="time-value">{{ moscowTime }}</span>
          <span class="time-status">на связи</span>
        </p>
      </header>

      <div class="contact-panel" data-reveal>
        <div class="contact-primary">
          <p class="contact-eyebrow">Почта</p>
          <a class="contact-email" :href="`mailto:${email}`">{{ email }}</a>
          <p class="contact-primary-note">Резюме и офферы — отвечаю в течение дня.</p>
        </div>
        <div class="contact-primary-actions">
          <button class="btn btn-ghost" type="button" @click="copyEmail">
            <svg class="icon" aria-hidden="true"><use href="#i-copy" /></svg>
            {{ copied ? 'E-mail скопирован' : 'Скопировать e-mail' }}
          </button>
          <a class="btn btn-primary" href="https://t.me/keyboard_brothers" target="_blank" rel="noopener noreferrer">
            Написать в Telegram
            <svg class="icon" aria-hidden="true"><use href="#i-arrow-up-right" /></svg>
          </a>
        </div>
      </div>

      <div class="contact-grid stagger">
        <a
          v-for="(item, i) in contactCards"
          :key="item.name"
          class="contact-card"
          data-reveal
          :style="{ '--reveal-delay': `${i * 50}ms` }"
          :href="item.href"
          :target="item.href.startsWith('http') ? '_blank' : undefined"
          :rel="item.href.startsWith('http') ? 'noopener noreferrer' : undefined"
        >
          <span class="contact-icon">
            <svg v-if="item.icon === 'phone'" class="icon" aria-hidden="true"><use href="#i-phone" /></svg>
            <img
              v-else
              :src="useAsset(`icons/social/${item.icon}.svg`)"
              alt=""
              width="20"
              height="20"
              loading="lazy"
            />
          </span>
          <span class="contact-copy">
            <span class="contact-name">{{ item.name }}</span>
            <span class="contact-sub">{{ descriptions[item.name] ?? item.handle }}</span>
          </span>
          <svg class="icon contact-arrow" aria-hidden="true"><use href="#i-arrow-up-right" /></svg>
        </a>
      </div>
    </div>
  </section>
</template>
