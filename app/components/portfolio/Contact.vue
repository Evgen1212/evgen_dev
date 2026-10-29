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
const telegram = socials.find((item) => item.name === "Telegram")!;
const phone = socials.find((item) => item.name === "Телефон")!;

const contactCards = socials.filter(
  (item) => item.name !== "E-mail" && !primaryNames.has(item.name),
);

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
          <p class="contact-eyebrow">Быстрая связь</p>
          <div class="contact-primary-links">
            <a
              class="contact-primary-link"
              :href="telegram.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="contact-primary-link-icon" aria-hidden="true">
                <img
                  :src="useAsset('icons/social/telegram.svg')"
                  alt=""
                  width="22"
                  height="22"
                  loading="lazy"
                />
              </span>
              <span class="contact-primary-link-copy">
                <span class="contact-primary-link-label">Telegram</span>
                <span class="contact-primary-link-value">{{ telegram.handle }}</span>
              </span>
            </a>
            <a class="contact-primary-link" :href="phone.href">
              <span class="contact-primary-link-icon" aria-hidden="true">
                <svg class="icon"><use href="#i-phone" /></svg>
              </span>
              <span class="contact-primary-link-copy">
                <span class="contact-primary-link-label">Телефон</span>
                <span class="contact-primary-link-value">{{ phone.handle }}</span>
              </span>
            </a>
          </div>
          <p class="contact-primary-note">
            Отвечаю в течение часа · резюме и офферы — на e-mail ниже
          </p>
        </div>
        <div class="contact-primary-actions">
          <a class="btn btn-ghost" :href="phone.href">
            <svg class="icon" aria-hidden="true"><use href="#i-phone" /></svg>
            Позвонить
          </a>
          <a
            class="btn btn-primary"
            :href="telegram.href"
            target="_blank"
            rel="noopener noreferrer"
          >
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
