<script setup lang="ts">
import { Mail, Menu, Moon, Phone, Sun, X } from 'lucide-vue-next';
import SocialComboTrigger from './SocialComboTrigger.vue';
import { socials } from './data';

const navLinks = [
  { label: 'Обо мне', href: '#about' },
  { label: 'Опыт', href: '#experience' },
  { label: 'Проекты', href: '#projects' },
  { label: 'Цены', href: '#prices' },
  { label: 'Контакты', href: '#contact' },
];

const pill =
  'bg-gradient-to-r from-fuchsia-500/10 via-purple-500/5 to-(--chrome) backdrop-blur-xl border border-(--line-1) rounded-2xl shadow-lg shadow-black/20 transition-all duration-300 hover:border-fuchsia-500/40 hover:shadow-fuchsia-900/20';

const open = ref(false);
const scrolled = ref(false);
const activeSection = ref('');

/** Desktop (main): сжатый pill соцсетей → по клику разъезжается */
const socialsRailOpen = ref(false);
const socialRailRef = ref<HTMLElement | null>(null);

function toggleSocialsRail() {
  socialsRailOpen.value = !socialsRailOpen.value;
}

function onSocialLinkClick(e: MouseEvent) {
  if (!socialsRailOpen.value) {
    e.preventDefault();
    socialsRailOpen.value = true;
  }
}

function onDocumentPointerDown(e: PointerEvent) {
  if (!socialsRailOpen.value) return;
  const el = socialRailRef.value;
  if (el && !el.contains(e.target as Node)) {
    socialsRailOpen.value = false;
  }
}

function onDocumentKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') socialsRailOpen.value = false;
}

/** Буквы логотипа: по одной появляются при первом заходе (класс .brand-intro) */
const brandLetters = [...'evgen_dev'];

/* ─── Тема: по умолчанию следим за ОС, клик — ручной выбор (localStorage) ─── */
const resolvedTheme = ref<'light' | 'dark'>('dark');

function resolveTheme(): 'light' | 'dark' {
  const t = document.documentElement.getAttribute('data-theme');
  if (t === 'light' || t === 'dark') return t;
  return window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark';
}

let schemeMq: MediaQueryList | null = null;

function onSchemeChange() {
  // без ручного оверрайда — следуем за темой ОС
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

let io: IntersectionObserver | null = null;

onMounted(() => {
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  resolvedTheme.value = resolveTheme();
  schemeMq = window.matchMedia('(prefers-color-scheme: light)');
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

  document.addEventListener('pointerdown', onDocumentPointerDown);
  document.addEventListener('keydown', onDocumentKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
  schemeMq?.removeEventListener('change', onSchemeChange);
  io?.disconnect();
  document.removeEventListener('pointerdown', onDocumentPointerDown);
  document.removeEventListener('keydown', onDocumentKeydown);
});
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 px-3 sm:px-5 lg:px-8 pt-3 sm:pt-4 lg:pt-6">
    <div class="mx-auto flex w-full max-w-[92rem] items-start justify-between gap-4 xl:gap-8">
      <!-- left cluster: logo + nav -->
      <div class="flex items-center gap-2">
        <a
          href="#top"
          :class="
            cn(
              pill,
              'group relative flex items-center h-14 gap-2.5 pl-2 pr-4 transition-all duration-300 sm:pr-5',
            )
          "
          aria-label="evgen_dev — на главную"
        >
          <span
            :class="
              cn(
                'relative p-[0.5px] rounded-full transition-all duration-300',
                'bg-gradient-to-tr from-fuchsia-500 via-purple-500 to-indigo-500 shadow-sm shadow-fuchsia-500/30',
                scrolled ? 'size-11' : 'size-12',
              )
            "
          >
            <SmartImage
              name="avatar"
              alt="Аватар"
              :width="1080"
              :height="1080"
              :widths="[48, 96, 144]"
              sizes="48px"
              loading="eager"
              fetchpriority="auto"
              class="h-full w-full rounded-full"
              img-class="h-full w-full rounded-full object-cover"
            />
          </span>
          <span
            :class="
              cn(
                'font-display font-bold tracking-tight transition-all duration-300',
                scrolled ? 'text-lg' : 'text-xl',
              )
            "
          >
            <span
              v-for="(letter, i) in brandLetters"
              :key="i"
              class="brand-letter"
              :style="{ '--i': i }"
              >{{ letter }}</span
            >
          </span>
        </a>

        <nav
          :class="
            cn(
              pill,
              'hidden items-center h-14 px-3 transition-all duration-300 lg:flex',
            )
          "
          aria-label="Основная навигация"
        >
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            :aria-current="activeSection === link.href ? 'true' : undefined"
            :class="
              cn(
                'rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300',
                activeSection === link.href
                  ? 'bg-gradient-to-r from-fuchsia-600/90 to-purple-600/90 text-white shadow-md shadow-fuchsia-900/40'
                  : 'text-(--ink-soft) hover:bg-(--surface-hover) hover:text-(--ink)',
              )
            "
          >
            {{ link.label }}
          </a>
        </nav>
      </div>

      <!-- right cluster: socials + theme + design (desktop) + burger -->
      <div class="flex shrink-0 items-center gap-2">
        <div
          ref="socialRailRef"
          :class="
            cn(
              pill,
              'classic-social-rail hidden h-14 md:flex',
              socialsRailOpen && 'classic-social-rail--open',
            )
          "
          :aria-expanded="socialsRailOpen"
        >
          <button
            type="button"
            class="classic-social-rail__trigger grid size-14 shrink-0 place-items-center text-(--ink-soft) transition-colors hover:text-(--ink)"
            :aria-label="
              socialsRailOpen ? 'Свернуть соцсети' : 'Развернуть соцсети'
            "
            :title="socialsRailOpen ? 'Свернуть' : 'Контакты и соцсети'"
            @click="toggleSocialsRail"
          >
            <SocialComboTrigger />
          </button>
          <div
            class="classic-social-rail__track flex min-w-0 items-center"
            aria-label="Социальные сети"
          >
            <a
              v-for="(s, i) in socials"
              :key="s.name"
              :href="s.href"
              :target="s.href.startsWith('http') ? '_blank' : undefined"
              :rel="s.href.startsWith('http') ? 'noopener noreferrer' : undefined"
              :title="s.name"
              :aria-label="s.name"
              :style="{ '--social-i': i }"
              class="classic-social-rail__link grid size-12 shrink-0 place-items-center rounded-lg transition-[transform,opacity,margin] hover:bg-(--surface-hover) hover:scale-110"
              @click="onSocialLinkClick"
            >
              <Phone
                v-if="s.icon === 'phone'"
                class="classic-social-rail__icon size-8 opacity-80 hover:opacity-100"
                aria-hidden="true"
              />
              <Mail
                v-else-if="s.icon === 'mail'"
                class="classic-social-rail__icon size-8 opacity-80 hover:opacity-100"
                aria-hidden="true"
              />
              <img
                v-else
                :src="useAsset(`icons/social/${s.icon}.svg`)"
                alt=""
                width="16"
                height="16"
                class="classic-social-rail__icon social-icon size-8 opacity-80 hover:opacity-100"
                loading="eager"
                decoding="async"
              />
            </a>
          </div>
        </div>

        <button
          type="button"
          :aria-label="
            resolvedTheme === 'dark'
              ? 'Включить светлую тему'
              : 'Включить тёмную тему'
          "
          :title="resolvedTheme === 'dark' ? 'Светлая тема' : 'Тёмная тема'"
          :class="
            cn(
              pill,
              'hidden md:grid size-14 place-items-center text-(--ink) transition-transform hover:scale-105',
            )
          "
          @click="toggleTheme"
        >
          <ClientOnly>
            <Sun
              v-if="resolvedTheme === 'dark'"
              class="size-5"
              aria-hidden="true"
            />
            <Moon v-else class="size-5" aria-hidden="true" />
            <template #fallback>
              <Sun class="size-5" aria-hidden="true" />
            </template>
          </ClientOnly>
        </button>

        <button
          type="button"
          :aria-label="
            resolvedTheme === 'dark'
              ? 'Включить светлую тему'
              : 'Включить тёмную тему'
          "
          :title="resolvedTheme === 'dark' ? 'Светлая тема' : 'Тёмная тема'"
          :class="
            cn(
              pill,
              'grid size-14 place-items-center text-(--ink) transition-transform hover:scale-105 md:hidden',
            )
          "
          @click="toggleTheme"
        >
          <ClientOnly>
            <Sun
              v-if="resolvedTheme === 'dark'"
              class="size-5"
              aria-hidden="true"
            />
            <Moon v-else class="size-5" aria-hidden="true" />
            <template #fallback>
              <Sun class="size-5" aria-hidden="true" />
            </template>
          </ClientOnly>
        </button>

        <DesignVariantSwitcher
          layout="desktop"
          appearance="classic"
          :pill-class="pill"
          class="hidden lg:block"
        />

        <button
          type="button"
          :aria-expanded="open"
          :aria-label="open ? 'Закрыть меню' : 'Открыть меню'"
          :class="
            cn(pill, 'lg:hidden grid size-14 place-items-center text-(--ink)')
          "
          @click="open = !open"
        >
          <X v-if="open" class="size-5" />
          <Menu v-else class="size-5" />
        </button>
      </div>
    </div>

    <!-- mobile dropdown -->
    <div
      :class="
        cn(
          'mx-auto mt-2 w-full max-w-[92rem] overflow-hidden rounded-2xl bg-(--chrome) transition-[max-height] duration-300 ease-out lg:hidden',
          open ? 'max-h-[min(85vh,32rem)] overflow-y-auto' : 'pointer-events-none max-h-0',
        )
      "
    >
      <div :class="cn(pill, 'flex flex-col p-3')">
        <DesignVariantSwitcher layout="mobile" appearance="classic" :pill-class="pill" />
        <nav class="grid gap-1 mt-3" aria-label="Мобильная навигация">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            :aria-current="activeSection === link.href ? 'true' : undefined"
            :class="
              cn(
                'rounded-xl px-4 py-3 text-base font-semibold transition-colors',
                activeSection === link.href
                  ? 'bg-gradient-to-r from-fuchsia-600/90 to-purple-600/90 text-white'
                  : 'text-(--ink) hover:bg-(--surface-hover)',
              )
            "
            @click="open = false"
          >
            {{ link.label }}
          </a>
        </nav>
        <div
          class="mt-4 flex flex-wrap items-center justify-center gap-1 border-t border-(--line-1) pt-4 lg:hidden"
          aria-label="Социальные сети"
        >
          <a
            v-for="s in socials"
            :key="`menu-social-${s.name}`"
            :href="s.href"
            :target="s.href.startsWith('http') ? '_blank' : undefined"
            :rel="s.href.startsWith('http') ? 'noopener noreferrer' : undefined"
            :title="s.name"
            :aria-label="s.name"
            class="grid size-11 place-items-center rounded-xl transition-colors hover:bg-(--surface-hover)"
          >
            <Phone
              v-if="s.icon === 'phone'"
              class="size-7 opacity-90"
              aria-hidden="true"
            />
            <Mail
              v-else-if="s.icon === 'mail'"
              class="size-7 opacity-90"
              aria-hidden="true"
            />
            <img
              v-else
              :src="useAsset(`icons/social/${s.icon}.svg`)"
              alt=""
              width="16"
              height="16"
              class="social-icon size-7 opacity-90"
              loading="lazy"
              decoding="async"
            />
          </a>
        </div>
      </div>
    </div>

    <!-- subtle progress-like shadow once scrolled -->
    <div
      aria-hidden="true"
      :class="
        cn(
          'pointer-events-none fixed inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-(--scrim) to-transparent transition-opacity duration-500',
          scrolled ? 'opacity-100' : 'opacity-0',
        )
      "
    />
  </header>
</template>

<style scoped>
/* main / classic: сжатый rail → разъезд по клику (desktop md+) */
.classic-social-rail {
  align-items: center;
  overflow: hidden;
  max-width: 3.5rem;
  padding-right: 0;
  transition:
    max-width 0.4s cubic-bezier(0.2, 0, 0, 1),
    padding 0.4s cubic-bezier(0.2, 0, 0, 1);
}

.classic-social-rail--open {
  max-width: min(42rem, calc(100vw - 12rem));
  padding-right: 0.5rem;
}

.classic-social-rail__track {
  gap: 0;
  opacity: 0.85;
  transition: gap 0.4s cubic-bezier(0.2, 0, 0, 1);
}

.classic-social-rail--open .classic-social-rail__track {
  gap: 0.125rem;
  opacity: 1;
}

.classic-social-rail__link {
  margin-left: -0.65rem;
  transform: scale(0.52) rotate(10deg);
  transform-origin: center;
  transition:
    transform 0.4s cubic-bezier(0.2, 0, 0, 1),
    margin 0.4s cubic-bezier(0.2, 0, 0, 1),
    opacity 0.3s ease;
}

.classic-social-rail__link:first-child {
  margin-left: 0;
}

.classic-social-rail--open .classic-social-rail__link {
  margin-left: 0;
  transform: scale(1) rotate(-10deg);
  transition-delay: calc(var(--social-i, 0) * 25ms);
}

.classic-social-rail__trigger {
  transition:
    transform 0.4s cubic-bezier(0.2, 0, 0, 1),
    opacity 0.3s ease;
  transform: rotate(10deg);
}

.classic-social-rail--open .classic-social-rail__trigger {
  transform: rotate(-10deg) scale(0.92);
  opacity: 0.65;
}
</style>
