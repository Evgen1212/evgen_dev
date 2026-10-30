<script setup lang="ts">
export type DrawerNavLink = {
  label: string;
  href: string;
};

const props = defineProps<{
  open: boolean;
  links: DrawerNavLink[];
  activeSection: string;
  theme: 'light' | 'dark';
}>();

const emit = defineEmits<{
  close: [];
  toggleTheme: [];
}>();

const iconFor = (href: string) => {
  switch (href) {
    case '#about':
      return 'person';
    case '#experience':
      return 'work';
    case '#projects':
      return 'folder';
    case '#prices':
      return 'sell';
    case '#contact':
      return 'mail';
    default:
      return 'person';
  }
};

function onScrimClick() {
  emit('close');
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close');
}

watch(
  () => props.open,
  (val) => {
    if (!import.meta.client) return;
    document.documentElement.dataset.navDrawer = val ? 'open' : 'closed';
    if (val) {
      document.addEventListener('keydown', onKeydown);
    } else {
      document.removeEventListener('keydown', onKeydown);
    }
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  if (import.meta.client) {
    delete document.documentElement.dataset.navDrawer;
    document.removeEventListener('keydown', onKeydown);
  }
});
</script>

<template>
  <Teleport to="body">
    <div
      class="android-drawer-root lg:hidden"
      :class="open ? 'android-drawer-root--open' : ''"
      :aria-hidden="!open"
    >
      <button
        type="button"
        class="android-drawer-scrim"
        aria-label="Закрыть меню"
        tabindex="-1"
        @click="onScrimClick"
      />
      <aside
        class="android-drawer-panel elevation-3"
        role="dialog"
        aria-modal="true"
        aria-label="Меню приложения"
        :inert="!open"
      >
        <div
          class="flex items-center justify-between gap-3 border-b border-(--outline-variant) px-4 py-4"
        >
          <div class="flex min-w-0 items-center gap-3">
            <SmartImage
              name="avatar"
              alt=""
              :width="1080"
              :height="1080"
              :widths="[48, 96]"
              sizes="48px"
              loading="lazy"
              class="size-12 shrink-0 rounded-full"
              img-class="h-full w-full rounded-full object-cover"
            />
            <div class="min-w-0">
              <p class="m3-title-lg truncate text-(--ink)">
                evgen_dev
              </p>
              <p class="truncate text-sm text-(--ink-mute)">
                Frontend · Vue / Nuxt
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Закрыть меню"
            class="m3-icon-btn m3-state-layer shrink-0"
            @click="emit('close')"
          >
            <span class="material-symbols-outlined text-[22px]" aria-hidden="true"
              >close</span
            >
          </button>
        </div>

        <p class="m3-label px-7 pt-4 pb-1">
          Разделы
        </p>
        <nav
          class="flex flex-1 flex-col gap-1 overflow-y-auto px-3 pb-2"
          aria-label="Мобильная навигация"
        >
          <a
            v-for="link in links"
            :key="link.href"
            :href="link.href"
            :aria-current="activeSection === link.href ? 'page' : undefined"
            :class="
              cn(
                'android-drawer-item m3-state-layer flex min-h-14 items-center gap-4 px-4 pl-5 text-base font-medium',
                activeSection === link.href
                  ? 'text-(--m3-primary)'
                  : 'text-(--ink) hover:bg-(--surface-hover)',
              )
            "
            @click="emit('close')"
          >
            <span
              class="material-symbols-outlined shrink-0 text-2xl opacity-90"
              aria-hidden="true"
              :class="
                activeSection === link.href &&
                'android-bottom-nav__symbol--filled'
              "
            >
              {{ iconFor(link.href) }}
            </span>
            {{ link.label }}
          </a>
        </nav>

        <div
          class="mt-auto shrink-0 border-t border-(--outline-variant) px-3 py-3"
        >
          <p class="m3-label px-4 pb-2">
            Настройки
          </p>
          <button
            type="button"
            class="android-drawer-item m3-state-layer flex min-h-14 w-full items-center gap-4 px-4 pl-5 text-base font-medium text-(--ink)"
            :aria-label="
              theme === 'dark'
                ? 'Включить светлую тему'
                : 'Включить тёмную тему'
            "
            @click="emit('toggleTheme')"
          >
            <span
              class="material-symbols-outlined shrink-0 text-2xl opacity-90"
              aria-hidden="true"
            >
              {{ theme === 'dark' ? 'light_mode' : 'dark_mode' }}
            </span>
            {{ theme === 'dark' ? 'Светлая тема' : 'Тёмная тема' }}
          </button>
        </div>
      </aside>
    </div>
  </Teleport>
</template>
