import tailwindcss from "@tailwindcss/vite";

/**
 * GitHub Pages отдаёт project-сайт из подпапки /<repo>/,
 * поэтому baseURL задаётся через env в CI. Локально — корень.
 */
const baseURL = (process.env.NUXT_APP_BASE_URL || "/").replace(/\/?$/, "/");

/** Публичный адрес сайта — нужен для абсолютных OG/Twitter-картинок */
const siteUrl = (
  process.env.NUXT_PUBLIC_SITE_URL || "https://evgen1212.github.io/evgen_dev"
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
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1, viewport-fit=cover",
        },
        { name: "theme-color", content: "#1C1B1F", id: "theme-color" },
        { name: "mobile-web-app-capable", content: "yes" },
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
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap",
        },
        { rel: "icon", type: "image/svg+xml", href: `${baseURL}favicon.svg` },
        { rel: "manifest", href: `${baseURL}manifest.webmanifest` },
      ],
      script: [
        {
          // Тема до первой отрисовки: ручной выбор из localStorage. Без выбора
          // тему определяет CSS (prefers-color-scheme) — мигалки (FOUC) нет.
          innerHTML: `(function(){var D="#1C1B1F",L="#FEF7FF";function isLight(){var t=document.documentElement.getAttribute("data-theme");if(t==="light")return true;if(t==="dark")return false;return window.matchMedia("(prefers-color-scheme: light)").matches}function syncBar(){var m=document.getElementById("theme-color");if(m)m.content=isLight()?L:D}try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t)}}catch(e){}syncBar();try{new MutationObserver(syncBar).observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});window.matchMedia("(prefers-color-scheme: light)").addEventListener("change",syncBar)}catch(e){}})();`,
          tagPriority: "critical",
        },
        {
          // Класс .js ставится до первой отрисовки: анимации появления
          // активируются только при доступном JS (иначе контент виден сразу).
          innerHTML: `document.documentElement.classList.add("js");`,
          tagPriority: "critical",
        },
        {
          // Одноразовая анимация «evgen_dev» в шапке (раз за сессию).
          // Класс добавляется до первой отрисовки, поэтому буквы появляются
          // вместе с контентом — без оверлея и без задержки страницы.
          innerHTML: `(function(){try{if(sessionStorage.getItem("evg-brand-intro")==="1")return;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;document.documentElement.classList.add("brand-intro");sessionStorage.setItem("evg-brand-intro","1")}catch(e){}})();`,
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
