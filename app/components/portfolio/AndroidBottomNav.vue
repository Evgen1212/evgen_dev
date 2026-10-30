<script setup lang="ts">
const items = [
  { label: 'Главная', href: '#top', icon: 'home' },
  { label: 'Опыт', href: '#experience', icon: 'work' },
  { label: 'Проекты', href: '#projects', icon: 'folder' },
  { label: 'Цены', href: '#prices', icon: 'sell' },
  { label: 'Контакт', href: '#contact', icon: 'chat' },
] as const;

const active = ref('#top');

let io: IntersectionObserver | null = null;

onMounted(() => {
  const ids = items.map((i) => i.href.slice(1));
  const sections = ids
    .map((id) => document.getElementById(id))
    .filter(Boolean) as HTMLElement[];
  if (!sections.length) return;

  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          active.value = `#${entry.target.id}`;
        }
      });
    },
    { rootMargin: '-40% 0px -45% 0px' },
  );
  sections.forEach((s) => io!.observe(s));
});

onBeforeUnmount(() => {
  io?.disconnect();
});
</script>

<template>
  <nav
    class="android-bottom-nav md:hidden"
    aria-label="Нижняя навигация"
  >
    <a
      v-for="item in items"
      :key="item.href"
      :href="item.href"
      :aria-current="active === item.href ? 'page' : undefined"
      :class="
        cn(
          'android-bottom-nav__item m3-state-layer android-ripple',
          active === item.href && 'android-bottom-nav__item--active',
        )
      "
    >
      <span class="android-bottom-nav__icon-wrap" aria-hidden="true">
        <span
          class="material-symbols-outlined android-bottom-nav__symbol"
          :class="active === item.href && 'android-bottom-nav__symbol--filled'"
        >
          {{ item.icon }}
        </span>
      </span>
      <span class="android-bottom-nav__label">{{ item.label }}</span>
    </a>
  </nav>
</template>
