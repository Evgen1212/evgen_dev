<script setup lang="ts">
import { socials, prices, calcProjects } from '~/components/portfolio/data';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'evgen_dev — Frontend-разработка',
  alternateName: 'Абрамов Евгений — Frontend-разработка',
  description:
    'Фронтенд-разработка любой сложности: SPA и SSR-приложения на Vue 3 / Nuxt 3 / TypeScript, дизайн-системы, оптимизация Web Vitals. Полный цикл — от идеи до продакшена.',
  areaServed: 'RU',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Москва',
    addressCountry: 'RU',
  },
  founder: {
    '@type': 'Person',
    name: 'evgen_dev',
    alternateName: 'Абрамов Евгений Павлович',
    jobTitle: 'Senior Frontend-разработчик',
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Саратовский государственный технический университет им. Ю.А. Гагарина',
    },
    knowsAbout: [
      'Vue.js',
      'Nuxt.js',
      'TypeScript',
      'SPA',
      'SSR',
      'Фронтенд-архитектура',
    ],
  },
  sameAs: socials.filter((s) => s.href.startsWith('http')).map((s) => s.href),
  makesOffer: prices.map((tier) => ({
    '@type': 'Offer',
    name: tier.name,
    description: tier.description,
    price: calcProjects.find((c) => c.key === tier.calcKey)?.base ?? 0,
    priceCurrency: 'RUB',
  })),
};

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(jsonLd),
    },
  ],
});
</script>

<template>
  <a
    href="#top"
    class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-[var(--m3-shape-sm)] focus:bg-(--m3-primary) focus:px-4 focus:py-2 focus:text-(--m3-on-primary) focus:outline-none"
  >
    Перейти к содержимому
  </a>
  <div
    class="android-shell flex min-h-screen flex-col bg-(--m3-surface) text-(--m3-on-surface)"
  >
    <AndroidSystemChrome />
    <SiteHeader />
    <main class="android-main-inset flex-1">
      <Hero />
      <Hairline />
      <About />
      <Experience />
      <OwnProjects />
      <Skills />
      <Hairline />
      <Tech />
      <Process />
      <Prices />
      <Hairline />
      <Faq />
      <Hairline />
      <Contact />
    </main>
    <SiteFooter />
    <AndroidBottomNav />
    <!-- мобильная липкая CTA-панель -->
    <StickyCta />
    <ToastHost />
  </div>
</template>
