<script setup lang="ts">
import { socials } from './data';

const navLinks = [
  { label: 'Обо мне', href: '#about' },
  { label: 'Опыт', href: '#experience' },
  { label: 'Проекты', href: '#projects' },
  { label: 'Цены', href: '#prices' },
  { label: 'Контакты', href: '#contact' },
];

const open = ref(false);
const scrolled = ref(false);
const activeSection = ref('');

const brandLetters = [...'evgen_dev'];

const sectionTitles: Record<string, string> = Object.fromEntries(
  navLinks.map((l) => [l.href, l.label]),
);
sectionTitles['#top'] = 'evgen_dev';

const atPageTop = ref(true);

const mobileBarTitle = computed(() => {
  if (atPageTop.value) return 'evgen_dev';
  if (activeSection.value && sectionTitles[activeSection.value]) {
    return sectionTitles[activeSection.value];
  }
  return 'evgen_dev';
});

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
  scrolled.value = window.scrollY > 8;
  atPageTop.value = window.scrollY < 56;
}

let io: IntersectionObserver | null = null;

onMounted(() => {
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  resolvedTheme.value = resolveTheme();
  schemeMq = window.matchMedia('(prefers-color-scheme: light)');
  schemeMq.addEventListener('change', onSchemeChange);

  const ids = ['top', ...navLinks.map((l) => l.href.slice(1))];
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

const barClass =
  'bg-(--m3-surface-container) transition-[box-shadow,border-color] duration-300 max-md:border-b-0 md:border-b md:border-(--outline-variant)';
</script>

<template>
  <header
    class="android-app-bar fixed inset-x-0 top-0 z-50"
  >
    <div
      :class="
        cn(
          barClass,
          scrolled ? 'elevation-1' : 'md:border-transparent',
        )
      "
    >
      <div
        class="m3-top-app-bar mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 sm:px-6"
      >
        <!-- M3 small top app bar (mobile) -->
        <div class="flex min-w-0 flex-1 items-center gap-1 lg:hidden">
          <button
            type="button"
            :aria-expanded="open"
            :aria-label="open ? 'Закрыть меню' : 'Открыть меню'"
            class="m3-icon-btn m3-state-layer shrink-0 text-(--ink)"
            @click="open = !open"
          >
            <span class="material-symbols-outlined text-[22px]" aria-hidden="true"
              >menu</span
            >
          </button>
          <h1
            class="min-w-0 flex-1 truncate text-center text-lg font-normal tracking-normal text-(--ink)"
          >
            {{ mobileBarTitle }}
          </h1>
          <button
            type="button"
            :aria-label="
              resolvedTheme === 'dark'
                ? 'Включить светлую тему'
                : 'Включить тёмную тему'
            "
            class="m3-icon-btn m3-state-layer shrink-0 text-(--ink-soft) hover:text-(--ink)"
            @click="toggleTheme"
          >
            <ClientOnly>
              <span
                class="material-symbols-outlined text-[22px]"
                aria-hidden="true"
              >
                {{ resolvedTheme === 'dark' ? 'light_mode' : 'dark_mode' }}
              </span>
              <template #fallback>
                <span class="material-symbols-outlined text-[22px]" aria-hidden="true"
                  >light_mode</span
                >
              </template>
            </ClientOnly>
          </button>
        </div>

        <!-- Desktop top app bar -->
        <div class="hidden min-w-0 flex-1 items-center gap-2 sm:gap-4 lg:flex">
          <a
            href="#top"
            class="group flex min-w-0 items-center gap-2.5 rounded-full py-1 pr-2 transition-colors hover:bg-(--surface-hover)"
            aria-label="evgen_dev — на главную"
          >
            <SmartImage
              name="avatar"
              alt="Аватар"
              :width="1080"
              :height="1080"
              :widths="[48, 96, 144]"
              sizes="40px"
              loading="eager"
              fetchpriority="auto"
              class="size-10 shrink-0 rounded-full ring-2 ring-(--outline-variant)"
              img-class="h-full w-full rounded-full object-cover"
            />
            <span class="font-brand truncate text-base sm:text-lg">
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
            class="flex items-center gap-0.5"
            aria-label="Основная навигация"
          >
            <a
              v-for="link in navLinks"
              :key="link.href"
              :href="link.href"
              :aria-current="activeSection === link.href ? 'true' : undefined"
              :class="
                cn(
                  'm3-nav-chip px-4 py-2 text-sm font-medium text-(--m3-on-surface-variant) hover:bg-(--surface-hover) hover:text-(--ink)',
                  activeSection === link.href && 'text-(--m3-primary)',
                )
              "
            >
              {{ link.label }}
            </a>
          </nav>
        </div>

        <div class="hidden shrink-0 items-center gap-1 lg:flex">
          <button
            type="button"
            :aria-label="
              resolvedTheme === 'dark'
                ? 'Включить светлую тему'
                : 'Включить тёмную тему'
            "
            :title="resolvedTheme === 'dark' ? 'Светлая тема' : 'Тёмная тема'"
            class="m3-icon-btn m3-state-layer text-(--ink-soft) hover:text-(--ink)"
            @click="toggleTheme"
          >
            <ClientOnly>
              <span
                class="material-symbols-outlined text-[22px]"
                aria-hidden="true"
              >
                {{ resolvedTheme === 'dark' ? 'light_mode' : 'dark_mode' }}
              </span>
              <template #fallback>
                <span class="material-symbols-outlined text-[22px]" aria-hidden="true"
                  >light_mode</span
                >
              </template>
            </ClientOnly>
          </button>

          <div class="flex items-center" aria-label="Социальные сети">
            <a
              v-for="s in socials"
              :key="s.name"
              :href="s.href"
              :target="s.href.startsWith('http') ? '_blank' : undefined"
              :rel="
                s.href.startsWith('http') ? 'noopener noreferrer' : undefined
              "
              :title="s.name"
              :aria-label="s.name"
              class="m3-icon-btn m3-state-layer text-(--ink-soft) hover:text-(--ink)"
            >
              <span
                v-if="s.icon === 'phone'"
                class="material-symbols-outlined text-[20px] opacity-90"
                aria-hidden="true"
                >call</span
              >
              <span
                v-else-if="s.icon === 'mail'"
                class="material-symbols-outlined text-[20px] opacity-90"
                aria-hidden="true"
                >mail</span
              >
              <img
                v-else
                :src="useAsset(`icons/social/${s.icon}.svg`)"
                alt=""
                width="20"
                height="20"
                class="social-icon size-5 opacity-90"
                loading="eager"
                decoding="async"
              />
            </a>
          </div>
        </div>
      </div>
    </div>

    <AndroidNavDrawer
      :open="open"
      :links="navLinks"
      :active-section="activeSection"
      :theme="resolvedTheme"
      @close="open = false"
      @toggle-theme="toggleTheme"
    />
  </header>
</template>
