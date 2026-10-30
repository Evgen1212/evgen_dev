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
  <footer
    class="relative mt-auto border-t border-(--outline-variant) bg-(--m3-surface-container-low) py-6 max-md:border-t-0 max-md:bg-(--m3-surface-container) max-md:py-4"
  >
    <div class="mx-auto max-w-7xl px-5 sm:px-8">
      <div
        class="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:gap-4 sm:text-left"
      >
        <a
          href="#top"
          class="font-brand text-base transition-opacity hover:opacity-80 max-md:hidden"
        >
          evgen_dev
        </a>

        <p class="text-sm text-(--m3-on-surface-variant) max-md:text-xs">
          © {{ year }} Абрамов Евгений · Senior Frontend
        </p>

        <div class="flex items-center gap-3 max-md:hidden">
          <p
            class="inline-flex items-center gap-1.5 text-sm text-(--ink-faint)"
          >
            <span class="inline-flex items-center gap-1">
              Nuxt
              <TechIcon
                icon="nuxt"
                size-class="size-4"
                :width="16"
                :height="16"
              />
            </span>
          </p>
        </div>
      </div>

      <nav
        aria-label="Навигация в футере"
        class="mt-6 hidden flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-(--line-faint) pt-5 text-sm md:flex"
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
