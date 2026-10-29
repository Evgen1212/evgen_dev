<script setup lang="ts">
const year = new Date().getFullYear();

const footerNav = [
  { label: "Обо мне", href: "#about" },
  { label: "Опыт", href: "#experience" },
  { label: "Проекты", href: "#projects" },
  { label: "Технологии", href: "#tech" },
  { label: "Этапы", href: "#process" },
  { label: "Цены", href: "#prices" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contact" },
];
</script>
<template>
  <footer class="site-footer">
    <div class="container footer-inner">
      <div class="footer-top">
        <a class="brand" href="#top" aria-label="evgen_dev — на главную">
          <img
            class="brand-avatar"
            :src="useAsset('images/opt/avatar-96.webp')"
            alt=""
            width="96"
            height="96"
          />
          <span class="brand-name">evgen_dev</span>
        </a>
        <p class="footer-copy">© {{ year }} Абрамов Евгений. Senior Frontend-разработчик.</p>
        <p class="footer-note">Москва · GMT+3</p>
      </div>
      <nav class="footer-nav" aria-label="Навигация в футере">
        <a v-for="link in footerNav" :key="link.href" :href="link.href">{{ link.label }}</a>
      </nav>
    </div>
  </footer>
</template>
