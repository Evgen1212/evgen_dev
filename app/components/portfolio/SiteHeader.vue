<script setup lang="ts">
import { Mail, Menu, Moon, Phone, Sun, X } from 'lucide-vue-next';
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
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
  schemeMq?.removeEventListener('change', onSchemeChange);
  io?.disconnect();
});
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 px-3 sm:px-5 lg:px-8 pt-3 sm:pt-4 lg:pt-6">
    <div class="mx-auto flex max-w-7xl items-start justify-between gap-2">
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
            <img
              src="/images/avatar.jpg"
              alt="Аватар"
              class="w-full h-full rounded-full object-cover"
              loading="lazy"
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
            evgen_dev
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

      <!-- right cluster: theme toggle + socials + burger -->
      <div class="flex items-center gap-2">
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
              'grid size-14 place-items-center text-(--ink) transition-transform hover:scale-105',
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

        <div
          :class="
            cn(
              'bg-(--chrome) backdrop-blur-xl rounded-2xl shadow-lg shadow-black/30',
              'hidden md:flex items-center h-14 gap-0.5 px-3',
            )
          "
          aria-label="Социальные сети"
        >
          <a
            v-for="s in socials"
            :key="s.name"
            :href="s.href"
            :target="s.href.startsWith('http') ? '_blank' : undefined"
            :rel="s.href.startsWith('http') ? 'noopener noreferrer' : undefined"
            :title="s.name"
            :aria-label="s.name"
            class="grid size-12 place-items-center rounded-lg transition-all hover:bg-(--surface-hover) hover:scale-110"
          >
            <Phone
              v-if="s.icon === 'phone'"
              class="size-8 opacity-80 hover:opacity-100"
              aria-hidden="true"
            />
            <Mail
              v-else-if="s.icon === 'mail'"
              class="size-8 opacity-80 hover:opacity-100"
              aria-hidden="true"
            />
            <img
              v-else
              :src="`/icons/social/${s.icon}.svg`"
              alt=""
              width="16"
              height="16"
              class="social-icon size-8 opacity-80 hover:opacity-100"
              loading="lazy"
            />
          </a>
        </div>

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
          'mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl bg-(--chrome) transition-[max-height] duration-300 ease-out lg:hidden',
          open ? 'max-h-96' : 'pointer-events-none max-h-0',
        )
      "
    >
      <div :class="cn(pill, 'p-3')">
        <nav class="grid gap-1" aria-label="Мобильная навигация">
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
        <div class="mt-2 flex flex-wrap gap-1 border-t border-(--line-1) pt-3">
          <a
            v-for="s in socials"
            :key="s.name"
            :href="s.href"
            :target="s.href.startsWith('http') ? '_blank' : undefined"
            :rel="s.href.startsWith('http') ? 'noopener noreferrer' : undefined"
            :title="s.name"
            :aria-label="s.name"
            class="grid size-10 place-items-center rounded-xl transition-colors hover:bg-(--surface-hover)"
          >
            <Phone
              v-if="s.icon === 'phone'"
              class="size-8 opacity-80"
              aria-hidden="true"
            />
            <Mail
              v-else-if="s.icon === 'mail'"
              class="size-8 opacity-80"
              aria-hidden="true"
            />
            <img
              v-else
              :src="`/icons/social/${s.icon}.svg`"
              alt=""
              class="social-icon size-8 opacity-80"
              loading="lazy"
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
