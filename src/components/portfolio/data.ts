export type SocialLink = {
  name: string;
  handle: string;
  href: string;
  icon: string; // simpleicons slug
  color: string; // brand color hex
};

export const socials: SocialLink[] = [
  {
    name: "Telegram",
    handle: "@erriour",
    href: "https://t.me/erriour",
    icon: "telegram",
    color: "26A5E4",
  },
  {
    name: "Discord",
    handle: "@erriour",
    href: "https://discord.com/users/erriour",
    icon: "discord",
    color: "5865F2",
  },
  {
    name: "GitHub",
    handle: "github.com/erriour",
    href: "https://github.com/erriour",
    icon: "github",
    color: "ffffff",
  },
  {
    name: "Codewars",
    handle: "codewars.com/erriour",
    href: "https://www.codewars.com/users/erriour",
    icon: "codewars",
    color: "B1361E",
  },
  {
    name: "LinkedIn",
    handle: "in/erriour",
    href: "https://www.linkedin.com/in/erriour",
    icon: "linkedin",
    color: "0A66C2",
  },
  {
    name: "VK",
    handle: "vk.com/erriour",
    href: "https://vk.com/erriour",
    icon: "vk",
    color: "0077FF",
  },
  {
    name: "Behance",
    handle: "behance.net/erriour",
    href: "https://www.behance.net/erriour",
    icon: "behance",
    color: "1769FF",
  },
];

export type Service = {
  badge?: string;
  emoji?: string;
  label: string;
};

export const heroServices: Service[] = [
  { emoji: "🗄️", label: "Бэкенд" },
  { emoji: "🎨", label: "Дизайн сайтов" },
  { badge: "Aa", label: "Логотипы" },
  { emoji: "🐧", label: "Системное администрирование" },
  { emoji: "🤖", label: "Боты" },
  { badge: "TS", label: "Фронтенд" },
  { badge: "API", label: "API" },
  { emoji: "⚡", label: "Веб-приложения" },
  { emoji: "🛒", label: "Интернет-магазины" },
];

export type TechItem = {
  label: string;
  icon?: string; // simpleicons slug
  emoji?: string;
};

export const techRows: TechItem[][] = [
  // Инфраструктура и DevOps
  [
    { label: "Docker", icon: "docker" },
    { label: "Docker Compose", emoji: "🐳" },
    { label: "Git", icon: "git" },
    { label: "Conventional Commits", emoji: "📝" },
    { label: "Nginx", icon: "nginx" },
    { label: "Debian", icon: "debian" },
    { label: "Ubuntu", icon: "ubuntu" },
    { label: "Linux", icon: "linux" },
    { label: "GitHub", icon: "github" },
    { label: "Cloudflare", icon: "cloudflare" },
  ],
  // Frontend
  [
    { label: "TypeScript", icon: "typescript" },
    { label: "React", icon: "react" },
    { label: "Next.js", icon: "nextdotjs" },
    { label: "Vue", icon: "vuedotjs" },
    { label: "Nuxt", icon: "nuxt" },
    { label: "Pinia", icon: "pinia" },
    { label: "Sass (SCSS)", icon: "sass" },
    { label: "БЭМ", emoji: "🧩" },
    { label: "TailwindCSS", icon: "tailwindcss" },
    { label: "UnoCSS", icon: "unocss" },
    { label: "Radix/RekaUI", icon: "radixui" },
    { label: "TipTap", emoji: "🖋️" },
    { label: "Figma", icon: "figma" },
    { label: "Vite", icon: "vite" },
  ],
  // Backend и Базы данных
  [
    { label: "Node.js", icon: "nodedotjs" },
    { label: "Nest.js", icon: "nestjs" },
    { label: "Adonis.js", icon: "adonisjs" },
    { label: "Laravel", icon: "laravel" },
    { label: "PHP", icon: "php" },
    { label: "MySQL", icon: "mysql" },
    { label: "MariaDB", icon: "mariadb" },
    { label: "PostgreSQL", icon: "postgresql" },
    { label: "SQLite", icon: "sqlite" },
    { label: "Redis", icon: "redis" },
    { label: "MongoDB", icon: "mongodb" },
    { label: "Prisma", icon: "prisma" },
    { label: "WebSocket", emoji: "🔌" },
  ],
];

export type PriceTier = {
  name: string;
  price: string;
  description: string;
  features: string[];
  term: string;
  featured?: boolean;
};

export const prices: PriceTier[] = [
  {
    name: "Лендинг",
    price: "от 30 000 ₽",
    description: "Одностраничный сайт под ключ для быстрого запуска",
    features: [
      "Уникальный дизайн + вёрстка",
      "Адаптив под все экраны",
      "SEO-подготовка и аналитика",
      "Формы заявки и интеграции",
    ],
    term: "от 7 дней",
  },
  {
    name: "Многостраничный сайт",
    price: "от 60 000 ₽",
    description: "Корпоративный сайт, каталог или портфолио",
    features: [
      "Дизайн-система проекта",
      "Админ-панель для контента",
      "Анимации и интерактив",
      "Оптимизация скорости 90+",
    ],
    term: "от 14 дней",
    featured: true,
  },
  {
    name: "Веб-сервис",
    price: "от 120 000 ₽",
    description: "SPA, личные кабинеты и сложные приложения",
    features: [
      "Проектирование архитектуры",
      "API, базы данных, роли",
      "Авторизация и оплаты",
      "Деплой и поддержка",
    ],
    term: "от 30 дней",
  },
  {
    name: "Боты и автоматизация",
    price: "от 25 000 ₽",
    description: "Telegram-боты, парсеры и интеграции",
    features: [
      "Telegram / VK боты",
      "Парсеры и скрипты",
      "Интеграции с любыми API",
      "Уведомления и отчёты",
    ],
    term: "от 5 дней",
  },
];
