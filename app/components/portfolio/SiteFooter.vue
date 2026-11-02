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
  <footer class="relative mt-auto border-t border-(--line-1) py-8">
    <div class="mx-auto max-w-7xl px-5 sm:px-8">
      <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <a
          href="#top"
          class="font-display text-base font-bold transition-opacity hover:opacity-80"
        >
          evgen_dev
        </a>

        <p class="text-sm text-(--ink-faint)">
          © {{ year }} Абрамов Евгений. Senior Frontend-разработчик.
        </p>

        <p
          class="flex items-center gap-1.5 text-sm text-(--ink-faint) max-md:hidden"
        >
          <span>Сделано на Nuxt</span>
          <img
            :src="useAsset('icons/tech/nuxt.svg')"
            alt=""
            width="16"
            height="16"
            class="size-4 shrink-0 opacity-90"
            loading="lazy"
            decoding="async"
          />
          <span class="sr-only">Nuxt</span>
        </p>
      </div>

      <nav
        aria-label="Навигация в футере"
        class="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-(--line-faint) pt-5 text-sm"
      >
        <a
          v-for="l in footerNav"
          :key="l.href"
          :href="l.href"
          class="link-underline text-(--ink-faint) transition-colors hover:text-(--ink)"
        >
          {{ l.label }}
        </a>
      </nav>
    </div>
  </footer>
</template>
