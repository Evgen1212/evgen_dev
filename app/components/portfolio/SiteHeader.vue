<script setup lang="ts">
import { socials } from './data';

const navLinks = [
  { label: 'Обо мне', href: '#about' },
  { label: 'Опыт', href: '#experience' },
  { label: 'Проекты', href: '#projects' },
  { label: 'Цены', href: '#prices' },
  { label: 'Контакты', href: '#contact' },
];

const headerSocials = socials.filter(
  (item) => item.name !== 'E-mail' && item.name !== 'Телефон',
);

const open = ref(false);
const scrolled = ref(false);
const activeSection = ref('');

const resolvedTheme = ref<'light' | 'dark'>('light');

function resolveTheme(): 'light' | 'dark' {
  const t = document.documentElement.getAttribute('data-theme');
  if (t === 'light' || t === 'dark') return t;
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

let schemeMq: MediaQueryList | null = null;

function onSchemeChange() {
  if (!document.documentElement.hasAttribute('data-theme')) {
    resolvedTheme.value = resolveTheme();
  }
}

function toggleTheme() {
  const next = resolvedTheme.value === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  try {
    localStorage.setItem('theme', next);
  } catch {
    /* приватный режим */
  }
  resolvedTheme.value = next;
}

function onScroll() {
  scrolled.value = window.scrollY > 24;
}

function setMenu(value: boolean) {
  open.value = value;
}

function closeMenu() {
  open.value = false;
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) {
    closeMenu();
  }
}

function onResize() {
  if (window.innerWidth > 980 && open.value) closeMenu();
}

let io: IntersectionObserver | null = null;

onMounted(() => {
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('keydown', onKeydown);
  window.addEventListener('resize', onResize);

  resolvedTheme.value = resolveTheme();
  schemeMq = window.matchMedia('(prefers-color-scheme: dark)');
  schemeMq.addEventListener('change', onSchemeChange);

  const ids = navLinks.map((l) => l.href.slice(1));
  const sections = ids
    .map((id) => document.getElementById(id))
    .filter(Boolean) as HTMLElement[];
  if (!sections.length) return;

  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = `#${entry.target.id}`;
        }
      });
    },
    { rootMargin: '-35% 0px -55% 0px' },
  );
  sections.forEach((s) => io!.observe(s));
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('keydown', onKeydown);
  window.removeEventListener('resize', onResize);
  schemeMq?.removeEventListener('change', onSchemeChange);
  io?.disconnect();
});
</script>

<template>
  <header class="site-header" :class="{ 'is-scrolled': scrolled, 'menu-open': open }">
    <div class="header-inner container">
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

      <nav class="nav" aria-label="Основная навигация">
        <a
          v-for="link in navLinks"
          :key="link.href"
          class="nav-link"
          :class="{ 'is-active': activeSection === link.href }"
          :href="link.href"
          :aria-current="activeSection === link.href ? 'true' : undefined"
        >{{ link.label }}</a>
      </nav>

      <div class="header-actions">
        <button
          class="icon-btn theme-toggle"
          type="button"
          aria-label="Переключить тему"
          title="Переключить тему"
          @click="toggleTheme"
        >
          <svg class="icon icon-sun" aria-hidden="true"><use href="#i-sun" /></svg>
          <svg class="icon icon-moon" aria-hidden="true"><use href="#i-moon" /></svg>
        </button>
        <nav class="header-socials" aria-label="Соцсети">
          <a
            v-for="item in headerSocials"
            :key="item.name"
            :href="item.href"
            :aria-label="item.name"
            :title="item.name"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              :src="useAsset(`icons/social/${item.icon}.svg`)"
              alt=""
              width="18"
              height="18"
              loading="lazy"
              decoding="async"
            />
          </a>
        </nav>
        <button
          class="icon-btn menu-btn"
          type="button"
          :aria-expanded="open"
          aria-controls="mobile-menu"
          :aria-label="open ? 'Закрыть меню' : 'Открыть меню'"
          @click="setMenu(!open)"
        >
          <svg class="icon icon-menu" aria-hidden="true"><use href="#i-menu" /></svg>
          <svg class="icon icon-close" aria-hidden="true"><use href="#i-close" /></svg>
        </button>
      </div>
    </div>

    <div id="mobile-menu" class="mobile-menu" :class="{ 'is-open': open }" :inert="!open">
      <nav class="mobile-nav" aria-label="Мобильная навигация">
        <a
          v-for="link in navLinks"
          :key="link.href"
          class="mobile-link"
          :href="link.href"
          @click="closeMenu"
        >{{ link.label }}</a>
      </nav>
      <div class="mobile-socials">
        <a
          v-for="item in headerSocials"
          :key="item.name"
          :href="item.href"
          :aria-label="item.name"
          :title="item.name"
          target="_blank"
          rel="noopener noreferrer"
          @click="closeMenu"
        >
          <img
            :src="useAsset(`icons/social/${item.icon}.svg`)"
            alt=""
            width="18"
            height="18"
            loading="lazy"
            decoding="async"
          />
          <span>{{ item.name }}</span>
        </a>
      </div>
    </div>
    <div class="menu-scrim" aria-hidden="true" @click="closeMenu" />
  </header>
</template>
