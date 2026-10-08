<script setup lang="ts">
import { socials, prices, calcProjects } from "~/components/portfolio/data";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Абрамов Евгений — Frontend-разработка",
  description:
    "Фронтенд-разработка любой сложности: SPA и SSR-приложения на Vue 3 / Nuxt 3 / TypeScript, дизайн-системы, оптимизация Web Vitals. Полный цикл — от идеи до продакшена.",
  areaServed: "RU",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Москва",
    addressCountry: "RU",
  },
  founder: {
    "@type": "Person",
    name: "Абрамов Евгений Павлович",
    jobTitle: "Senior Frontend-разработчик",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Саратовский государственный технический университет им. Ю.А. Гагарина",
    },
    knowsAbout: [
      "Vue.js",
      "Nuxt.js",
      "TypeScript",
      "SPA",
      "SSR",
      "Фронтенд-архитектура",
    ],
  },
  sameAs: socials.filter((s) => s.href.startsWith("http")).map((s) => s.href),
  makesOffer: prices.map((tier) => ({
    "@type": "Offer",
    name: tier.name,
    description: tier.description,
    price: calcProjects.find((c) => c.key === tier.calcKey)?.base ?? 0,
    priceCurrency: "RUB",
  })),
};

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify(jsonLd),
    },
  ],
});
</script>

<template>
  <div class="flex min-h-screen flex-col bg-[#0a0a0b] text-zinc-50">
    <IntroLoader />
    <!-- плёночное зерно поверх всего интерфейса -->
    <div aria-hidden="true" class="noise-overlay" />
    <SiteHeader />
    <main class="flex-1">
      <Hero />
      <Cases />
      <Hairline />
      <OwnProjects />
      <Hairline />
      <About />
      <Tech />
      <Process />
      <Hairline />
      <Prices />
      <Hairline />
      <Faq />
      <Testimonials />
      <Hairline />
      <Contact />
    </main>
    <SiteFooter />
    <!-- мобильная липкая CTA-панель -->
    <StickyCta />
    <ToastHost />
  </div>
</template>
