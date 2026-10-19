import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  telemetry: false,

  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
    server: {
      // Превью открывается через динамический домен-шлюз (Caddy
      // пробрасывает оригинальный Host). Без этого Vite блокирует
      // запросы с чужим Host: «Blocked request… add server.allowedHosts».
      // Только dev-сервер; на prod-сборку не влияет.
      allowedHosts: true,
    },
  },

  // все компоненты из app/components/** доступны глобально без префикса директории
  components: [{ path: "~/components", pathPrefix: false }],

  app: {
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
        { property: "og:image", content: "/images/og.png" },
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
        { name: "twitter:image", content: "/images/og.png" },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "manifest", href: "/manifest.webmanifest" },
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
    esbuild: {
      options: {
        target: "esnext",
      },
    },
    // Сайт — статичная визитка без бекенда: `bun run build` (= nuxt generate)
    // prerender-ит «/» в готовые HTML/ассеты для любого статик-хостинга.
    prerender: {
      routes: ["/"],
    },
  },
});
