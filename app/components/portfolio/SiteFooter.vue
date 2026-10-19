<script setup lang="ts">
const year = new Date().getFullYear();

const footerNav = [
  { label: "Проекты", href: "#projects" },
  { label: "Обо мне", href: "#about" },
  { label: "Опыт", href: "#experience" },
  { label: "Технологии", href: "#tech" },
  { label: "Этапы", href: "#process" },
  { label: "Цены", href: "#prices" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contact" },
];
</script>

<template>
  <footer class="relative mt-auto border-t border-white/10 py-8">
    <div class="mx-auto max-w-7xl px-5 sm:px-8">
      <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <a
          href="#top"
          class="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <span class="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-fuchsia-500 via-purple-600 to-indigo-700 text-sm">
            <span aria-hidden="true">🦆</span>
          </span>
          <span class="font-display text-base font-bold">Абрамов</span>
        </a>

        <p class="text-sm text-zinc-500">
          © {{ year }} Абрамов Евгений. Senior Frontend-разработчик.
        </p>

        <div class="flex items-center gap-3">
          <p class="text-sm text-zinc-500">
            Сделано с
            <span class="text-fuchsia-400" aria-hidden="true">♥</span>
            на Nuxt
          </p>
          <!-- Компонент админки (автоимпорт Nuxt, появится отдельно) -->
          <AdminDialog />
        </div>
      </div>

      <nav
        aria-label="Навигация в футере"
        class="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-white/5 pt-5 text-sm"
      >
        <a
          v-for="l in footerNav"
          :key="l.href"
          :href="l.href"
          class="link-underline text-zinc-500 transition-colors hover:text-white"
        >
          {{ l.label }}
        </a>
      </nav>
    </div>
  </footer>
</template>
