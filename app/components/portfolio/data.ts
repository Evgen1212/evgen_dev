export type SocialLink = {
  name: string;
  handle: string;
  href: string;
  /** simpleicons slug (рисуется из /icons/social/<icon>.svg) или "phone" | "mail" (lucide) */
  icon: string;
  color: string; // brand color hex
};

/** ─── Контактные данные из резюме ─── */
export const siteOwner = {
  fullName: "Абрамов Евгений Павлович",
  shortName: "evgen_dev",
  firstName: "Евгений",
  role: "Senior Frontend-разработчик",
  stackLine: "Vue 3 · Nuxt · TypeScript",
  city: "Москва",
  experienceYears: 5,
};

/** Публичный e-mail для связи (кнопка «скопировать» в контактах) */
export const contactEmail = "evg3nyaevgen@yandex.ru";

export const socials: SocialLink[] = [
  {
    name: "Telegram",
    handle: "@keyboard_brothers",
    href: "https://t.me/keyboard_brothers",
    icon: "telegram",
    color: "26A5E4",
  },
  {
    name: "Телефон",
    handle: "+7 909 335-29-33",
    href: "tel:+79093352933",
    icon: "phone",
    color: "34D399",
  },
  {
    name: "WhatsApp",
    handle: "+7 909 335-29-33",
    href: "https://wa.me/79093352933",
    icon: "whatsapp",
    color: "25D366",
  },
  {
    name: "E-mail",
    handle: "evg3nyaevgen@yandex.ru",
    href: "mailto:evg3nyaevgen@yandex.ru",
    icon: "mail",
    color: "E879F9",
  },
  {
    name: "Хабр Карьера",
    handle: "career.habr.com/zhenek-abramov",
    href: "https://career.habr.com/zhenek-abramov",
    icon: "habr",
    color: "65A3BE",
  },
  {
    name: "Instagram",
    handle: "@jeka_lavandos",
    href: "https://www.instagram.com/jeka_lavandos/",
    icon: "instagram",
    color: "E4405F",
  },
  {
    name: "VK",
    handle: "vk.ru/my_wellcom_friends",
    href: "https://vk.ru/my_wellcom_friends",
    icon: "vk",
    color: "0077FF",
  },
];

export type Service = {
  badge?: string;
  emoji?: string;
  label: string;
};

export const heroServices: Service[] = [
  { badge: "TS", label: "TypeScript" },
  { badge: "V3", label: "Vue 3" },
  { badge: "N3", label: "Nuxt 3/4" },
  { badge: "SPA", label: "SPA и SSR" },
  { emoji: "🎨", label: "UI-киты и дизайн-системы" },
  { emoji: "⚡", label: "Веб-сервисы" },
  { emoji: "🛒", label: "Интернет-магазины" },
  { badge: "API", label: "REST / GraphQL" },
  { emoji: "🚀", label: "Оптимизация Web Vitals" },
  { emoji: "🤖", label: "Боты и автоматизация" },
];

export type TechItem = {
  label: string;
  icon?: string; // simpleicons slug
  emoji?: string;
};

export const techRows: TechItem[][] = [
  // Инфраструктура и инструменты
  [
    { label: "Docker", icon: "docker" },
    { label: "Docker Compose", emoji: "🐳" },
    { label: "Git", icon: "git" },
    { label: "GitLab", icon: "gitlab" },
    { label: "GitHub", icon: "github" },
    { label: "CI/CD", emoji: "🔁" },
    { label: "SSH", emoji: "🔐" },
    { label: "Figma", icon: "figma" },
    { label: "Nginx", icon: "nginx" },
  ],
  // Frontend
  [
    { label: "TypeScript", icon: "typescript" },
    { label: "JavaScript", icon: "javascript" },
    { label: "Vue 3", icon: "vuedotjs" },
    { label: "Nuxt 3/4", icon: "nuxt" },
    { label: "Pinia", icon: "pinia" },
    { label: "Vuex", emoji: "🏪" },
    { label: "Vite", icon: "vite" },
    { label: "Webpack", icon: "webpack" },
    { label: "TailwindCSS", icon: "tailwindcss" },
    { label: "Sass (SCSS)", icon: "sass" },
    { label: "Storybook", icon: "storybook" },
    { label: "FSD (Feature-Sliced Design)", emoji: "🧩" },
    { label: "SSR / SSG", emoji: "🖥️" },
  ],
  // Backend, данные и тестирование
  [
    { label: "Node.js", icon: "nodedotjs" },
    { label: "REST API", emoji: "🔌" },
    { label: "GraphQL", icon: "graphql" },
    { label: "WebSocket", emoji: "📡" },
    { label: "Prisma", icon: "prisma" },
    { label: "PostgreSQL", icon: "postgresql" },
    { label: "MySQL", icon: "mysql" },
    { label: "SQLite", icon: "sqlite" },
    { label: "Redis", icon: "redis" },
    { label: "Vitest", icon: "vitest" },
    { label: "Jest", icon: "jest" },
  ],
];

/** ─── Калькулятор проекта: единый источник цен и сроков ─── */

export type CalcProjectKey = "landing" | "multipage" | "webapp" | "bot";

export type CalcProject = {
  key: CalcProjectKey;
  label: string;
  hint: string;
  base: number; // базовая цена, ₽
  days: number; // базовый срок, дней
};

export const calcProjects: CalcProject[] = [
  { key: "landing", label: "Лендинг", hint: "одностраничный сайт", base: 25000, days: 7 },
  { key: "multipage", label: "Многостраничный сайт", hint: "корпоративный, каталог", base: 50000, days: 14 },
  { key: "webapp", label: "Веб-сервис", hint: "SPA, личные кабинеты", base: 100000, days: 30 },
  { key: "bot", label: "Бот / автоматизация", hint: "Telegram, парсеры", base: 20000, days: 5 },
];

export type CalcExtraKey =
  | "design"
  | "admin"
  | "payments"
  | "seo"
  | "content"
  | "support";

export type CalcExtra = {
  key: CalcExtraKey;
  label: string;
  price: number;
  days: number;
};

export const calcExtras: CalcExtra[] = [
  { key: "design", label: "Уникальный дизайн", price: 12000, days: 3 },
  { key: "admin", label: "Админ-панель", price: 15000, days: 4 },
  { key: "payments", label: "Приём оплат", price: 12000, days: 3 },
  { key: "seo", label: "SEO-настройка", price: 8000, days: 2 },
  { key: "content", label: "Контент-наполнение", price: 6000, days: 2 },
  { key: "support", label: "Поддержка — 1 мес.", price: 8000, days: 0 },
];

/** Коэффициент срочности: цена ×1,3, срок короче */
export const RUSH_MULT = 1.3;

const rubFmt = new Intl.NumberFormat("ru-RU");

/** «от 25 000 ₽» для карточек тарифов */
export function fromPrice(base: number) {
  return `от ${rubFmt.format(base)} ₽`;
}

/** Русская плюрализация: 21 день / 22 дня / 25 дней */
export function pluralDays(n: number) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} день`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${n} дня`;
  return `${n} дней`;
}

export type PriceTier = {
  name: string;
  price: string;
  description: string;
  features: string[];
  term: string;
  featured?: boolean;
  /** Связь с калькулятором: цена и срок выводятся из calcProjects */
  calcKey?: CalcProjectKey;
};

const tierDefs: Omit<PriceTier, "price" | "term">[] = [
  {
    name: "Лендинг",
    calcKey: "landing",
    description: "Одностраничный сайт под ключ для быстрого запуска",
    features: [
      "Уникальный дизайн + вёрстка",
      "Адаптив под все экраны",
      "SEO-подготовка и аналитика",
      "Формы заявки и интеграции",
    ],
  },
  {
    name: "Многостраничный сайт",
    calcKey: "multipage",
    description: "Корпоративный сайт, каталог или портфолио",
    features: [
      "Дизайн-система проекта",
      "Админ-панель для контента",
      "Анимации и интерактив",
      "Оптимизация скорости 90+",
    ],
    featured: true,
  },
  {
    name: "Веб-сервис",
    calcKey: "webapp",
    description: "SPA, личные кабинеты и сложные приложения",
    features: [
      "Проектирование архитектуры",
      "API, базы данных, роли",
      "Авторизация и оплаты",
      "Деплой и поддержка",
    ],
  },
  {
    name: "Боты и автоматизация",
    calcKey: "bot",
    description: "Telegram-боты, парсеры и интеграции",
    features: [
      "Telegram / VK боты",
      "Парсеры и скрипты",
      "Интеграции с любыми API",
      "Уведомления и отчёты",
    ],
  },
];

/** Цена и срок тарифа выводятся из калькулятора — единый источник правды */
export const prices: PriceTier[] = tierDefs.map((t) => {
  const calc = calcProjects.find((p) => p.key === t.calcKey);
  return {
    ...t,
    price: fromPrice(calc?.base ?? 0),
    term: `от ${pluralDays(calc?.days ?? 0)}`,
  };
});
