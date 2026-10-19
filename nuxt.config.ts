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
        "Абрамов Евгений — Senior Frontend-разработчик (Vue.js / Nuxt.js / TypeScript)",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#0a0a0b" },
        {
          name: "description",
          content:
            "Фронтенд-разработчик с 5+ годами коммерческого опыта: Vue 3, Nuxt 3/4, TypeScript. SPA и SSR-приложения, дизайн-системы, финтех и e-commerce. Telegram: @keyboard_brothers",
        },
        {
          name: "keywords",
          content:
            "Абрамов Евгений, фронтенд-разработчик, Vue.js, Nuxt.js, TypeScript, SPA, SSR, фронтенд, разработчик",
        },
        { name: "author", content: "Абрамов Евгений" },
        { name: "robots", content: "index, follow" },
        // OpenGraph
        {
          property: "og:title",
          content: "Абрамов Евгений — Senior Frontend-разработчик",
        },
        {
          property: "og:description",
          content:
            "Vue 3 / Nuxt 3 / TypeScript — SPA и SSR-приложения от идеи до продакшена.",
        },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "ru_RU" },
        { property: "og:siteName", content: "Абрамов Евгений" },
        { property: "og:image", content: "/images/og.png" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Абрамов Евгений — Senior Frontend-разработчик",
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
