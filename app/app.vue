<script setup lang="ts">
import { socials, prices, calcProjects } from '~/components/portfolio/data';

const resumeOpen = useState('resume-open', () => false);

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
  htmlAttrs: { lang: 'ru' },
  meta: [{ name: 'theme-color', content: '#ffffff' }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(jsonLd),
    },
    {
      innerHTML: `(function(){try{var s=localStorage.getItem('theme');var t=(s==='light'||s==='dark')?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',t==='dark'?'#000000':'#ffffff');}catch(e){}})();`,
    },
  ],
});
</script>

<template>
  <div>
    <a class="skip-link" href="#main">Перейти к содержанию</a>
    <SvgSprite />
    <SiteHeader />
    <main id="main" tabindex="-1">
      <Hero />
      <About />
      <Experience />
      <OwnProjects />
      <Skills />
      <Tech />
      <Process />
      <Prices />
      <Faq />
      <Contact />
    </main>
    <SiteFooter />
    <StickyCta />
    <ResumeModal v-model:open="resumeOpen" />
    <ToastHost />
  </div>
</template>
