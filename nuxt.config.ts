import tailwindcss from "@tailwindcss/vite";

/**
 * GitHub Pages отдаёт project-сайт из подпапки /<repo>/,
 * поэтому baseURL задаётся через env в CI. Локально — корень.
 */
const baseURL = (process.env.NUXT_APP_BASE_URL || "/").replace(/\/?$/, "/");

/** Публичный адрес сайта — нужен для абсолютных OG/Twitter-картинок */
const siteUrl = (
  process.env.NUXT_PUBLIC_SITE_URL || "https://evgen1212.github.io/myResume"
).replace(/\/+$/, "");

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  telemetry: false,

  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
    server: {
      // Внешние preview-домены (туннели/шлюзы) передают свой Host.
      // Без этого Vite блокирует запросы: «Blocked request… add server.allowedHosts».
      // Только dev-сервер; на prod-сборку не влияет.
      allowedHosts: true,
    },
  },

  // все компоненты из app/components/** доступны глобально без префикса директории
  components: [{ path: "~/components", pathPrefix: false }],

  app: {
    baseURL,
    head: {
      htmlAttrs: { lang: "ru" },
      title:
        "evgen_dev — Senior Frontend-разработчик (Vue.js / Nuxt.js / TypeScript)",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        // тема браузера следует за светлой/тёмной темой сайта
        {
          name: "theme-color",
          media: "(prefers-color-scheme: dark)",
          content: "#0a0a0b",
        },
        {
          name: "theme-color",
          media: "(prefers-color-scheme: light)",
          content: "#f6f6f7",
        },
        {
          name: "description",
          content:
            "Фронтенд-разработчик с 5+ годами коммерческого опыта: Vue 3, Nuxt 3/4, TypeScript. SPA и SSR-приложения, дизайн-системы, финтех и e-commerce. Telegram: @keyboard_brothers",
        },
        {
          name: "keywords",
          content:
            "evgen_dev, Абрамов Евгений, фронтенд-разработчик, Vue.js, Nuxt.js, TypeScript, SPA, SSR, фронтенд, разработчик",
        },
        { name: "author", content: "evgen_dev (Абрамов Евгений)" },
        { name: "robots", content: "index, follow" },
        // OpenGraph
        {
          property: "og:title",
          content: "evgen_dev — Senior Frontend-разработчик",
        },
        {
          property: "og:description",
          content:
            "Vue 3 / Nuxt 3 / TypeScript — SPA и SSR-приложения от идеи до продакшена.",
        },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "ru_RU" },
        { property: "og:siteName", content: "evgen_dev" },
        { property: "og:image", content: `${siteUrl}/images/og.png` },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "evgen_dev — Senior Frontend-разработчик",
        },
        {
          name: "twitter:description",
          content:
            "Vue 3 / Nuxt 3 / TypeScript — SPA и SSR-приложения от идеи до продакшена.",
        },
        { name: "twitter:image", content: `${siteUrl}/images/og.png` },
      ],
      link: [
        {
          rel: "preload",
          as: "font",
          type: "font/woff2",
          href: `${baseURL}fonts/comfortaa-cyrillic.woff2`,
          crossorigin: "anonymous",
        },
        {
          rel: "preload",
          as: "font",
          type: "font/woff2",
          href: `${baseURL}fonts/manrope-cyrillic.woff2`,
          crossorigin: "anonymous",
        },
        { rel: "icon", type: "image/svg+xml", href: `${baseURL}favicon.svg` },
        { rel: "manifest", href: `${baseURL}manifest.webmanifest` },
      ],
      script: [
        {
          // Тема до первой отрисовки: ручной выбор из localStorage. Без выбора
          // тему определяет CSS (prefers-color-scheme) — мигалки (FOUC) нет.
          innerHTML: `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t)}}catch(e){}})();`,
          tagPriority: "critical",
        },
        {
          // Класс .js ставится до первой отрисовки: анимации появления
          // активируются только при доступном JS (иначе контент виден сразу).
          innerHTML: `document.documentElement.classList.add("js");`,
          tagPriority: "critical",
        },
      ],
    },
  },

  nitro: {
    // Статика + .nojekyll + 404.html для GitHub Pages
    preset: "github-pages",
    esbuild: {
      options: {
        target: "esnext",
      },
    },
    // Сайт — статичная визитка без бекенда: `bun run build` (= nuxt generate)
    // prerender-ит «/» в готовые HTML/ассеты для любого статик-хостинга.
    prerender: {
      routes: ["/", "/404.html"],
    },
  },
});
