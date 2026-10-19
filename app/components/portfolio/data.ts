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

export type CaseDetail = {
  id: string;
  title: string;
  tag: string;
  year: string;
  role: string;
  timeline: string;
  description: string;
  highlights: string[];
  stack: string[];
  /** Группа для фильтра портфолио */
  category: CaseCategory;
};

export type CaseCategory = "sites" | "games" | "brand";

/** Фильтр портфолио: чипсы над сеткой кейсов */
export const caseCategories: {
  key: CaseCategory | "all";
  label: string;
}[] = [
  { key: "all", label: "Все" },
  { key: "sites", label: "Сайты" },
  { key: "games", label: "Игровые" },
  { key: "brand", label: "Брендинг" },
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
  { key: "landing", label: "Лендинг", hint: "одностраничный сайт", base: 30000, days: 7 },
  { key: "multipage", label: "Многостраничный сайт", hint: "корпоративный, каталог", base: 60000, days: 14 },
  { key: "webapp", label: "Веб-сервис", hint: "SPA, личные кабинеты", base: 120000, days: 30 },
  { key: "bot", label: "Бот / автоматизация", hint: "Telegram, парсеры", base: 25000, days: 5 },
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
  { key: "design", label: "Уникальный дизайн", price: 15000, days: 3 },
  { key: "admin", label: "Админ-панель", price: 20000, days: 4 },
  { key: "payments", label: "Приём оплат", price: 15000, days: 3 },
  { key: "seo", label: "SEO-настройка", price: 10000, days: 2 },
  { key: "content", label: "Контент-наполнение", price: 8000, days: 2 },
  { key: "support", label: "Поддержка — 1 мес.", price: 10000, days: 0 },
];

/** Коэффициент срочности: цена ×1,3, срок короче */
export const RUSH_MULT = 1.3;

const rubFmt = new Intl.NumberFormat("ru-RU");

/** «от 30 000 ₽» для карточек тарифов */
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

export const caseDetails: Record<string, CaseDetail> = {
  modern: {
    id: "modern",
    title: "Modern Citi Group",
    tag: "Корпоративный сайт",
    category: "sites",
    year: "2024",
    role: "Дизайн + Full-stack разработка",
    timeline: "3 недели",
    description:
      "Корпоративный сайт для компании, занимающейся капитальным ремонтом и отделкой зданий. Современный визуал с акцентом на реализованные проекты, калькулятор стоимости и удобная админ-панель для менеджеров.",
    highlights: [
      "Конверсия лендинга — 4,8%",
      "Калькулятор услуг с мгновенным расчётом",
      "Портфолио из 40+ реализованных объектов",
      "PageSpeed 96/100 на мобильных",
    ],
    stack: ["Vue 3", "Nuxt", "TypeScript", "PostgreSQL", "Docker"],
  },
  craftout: {
    id: "craftout",
    title: "CraftOut",
    tag: "Игровая платформа · Full-stack",
    category: "games",
    year: "2025",
    role: "Полный цикл разработки",
    timeline: "2 месяца",
    description:
      "Игровая веб-платформа с личными кабинетами, рейтингами, внутриигровым магазином и системой турниров. Realtime-обновления через WebSocket, кастомный античит-лог и админка с живой статистикой.",
    highlights: [
      "12 000+ активных игроков в первый месяц",
      "Realtime-матчи и лидерборды на WebSocket",
      "Интеграция платежей и магазин скинов",
      "Автоматическая модерация контента",
    ],
    stack: ["Vue 3", "Pinia", "Node.js", "Redis", "MongoDB", "WebSocket"],
  },
  granline: {
    id: "granline",
    title: "ГранЛайн",
    tag: "Сайт + каталог продукции",
    category: "sites",
    year: "2023",
    role: "Дизайн, вёрстка, backend",
    timeline: "4 недели",
    description:
      "Сайт компании по декоративной и архитектурной подсветке: каталог из 120+ товаров, фильтры, расчёт освещения и квиз для подбора решения. Новый год в изголовье проекта — сезонная кампания дала x2 к заявкам.",
    highlights: [
      "Каталог 120+ товаров с фильтрами",
      "Сезонная кампания — x2 к заявкам",
      "Квиз-подбор освещения за 4 шага",
      "Интеграция с 1С для менеджеров",
    ],
    stack: ["Nuxt", "Node.js", "MySQL", "Nginx"],
  },
  lawyer: {
    id: "lawyer",
    title: "Адвокат Маркин А.Е.",
    tag: "Сайт юриста",
    category: "sites",
    year: "2023",
    role: "Дизайн + разработка",
    timeline: "10 дней",
    description:
      "Строгий и доверительный одностраничный сайт адвоката: практика, кейсы, отзывы и онлайн-запись на консультацию. Сдержанная типографика и защищённая форма связи с шифрованием передаваемых данных.",
    highlights: [
      "Запись на консультацию без звонка",
      "Раздел практики с реальными кейсами",
      "Защищённая форма с шифрованием",
      "Первое место в выдаче по локальному запросу",
    ],
    stack: ["Vue 3", "TailwindCSS", "SQLite"],
  },
  shadows: {
    id: "shadows",
    title: "Shadows Project",
    tag: "Брендинг + сайт",
    category: "brand",
    year: "2024",
    role: "Логотип, айдентика, сайт",
    timeline: "3 недели",
    description:
      "Полный брендинг и промо-сайт для киберспортивного проекта: логотип, фирменные градиенты, 3D-элементы и анимированные секции. Сайт собран с акцентом на атмосферу и скорость загрузки тяжёлой графики.",
    highlights: [
      "Логотип и айдентика с нуля",
      "Анимированные 3D-сцены на WebGL",
      "Ленивая загрузка тяжёлых ассетов",
      "Мерч-витрина с предзаказом",
    ],
    stack: ["Vue", "Vite", "Three.js", "Sass"],
  },
  mineplay: {
    id: "mineplay",
    title: "Mine Play",
    tag: "Игровой портал",
    category: "games",
    year: "2022",
    role: "Full-stack разработка",
    timeline: "6 недель",
    description:
      "Портал Minecraft-сервера: личный кабинет игрока, магазин привилегий, статистика и голосования. Пиксель-арт стиль, интеграция с игровым API и автоматическая выдача покупок в игре.",
    highlights: [
      "Автоматическая выдача привилегий",
      "Статистика 50 000+ игроков",
      "Голосования с наградами в игре",
      "Пиксель-дизайн в стиле игры",
    ],
    stack: ["Node.js", "Express", "MySQL", "Redis"],
  },
  cataclysm: {
    id: "cataclysm",
    title: "Project Cataclysm",
    tag: "Промо-сайт игры",
    category: "games",
    year: "2024",
    role: "Дизайн + разработка",
    timeline: "2 недели",
    description:
      "Мрачный промо-сайт постапокалиптической игры: кинематографичные анимации, интерактивная карта мира, предзаказ с ранним доступом и раздел новостей разработки.",
    highlights: [
      "Кинематографичный скролл-нарратив",
      "Интерактивная карта мира",
      "500+ предзаказов за первый месяц",
      "Devlog с авто-публикацией из GitHub",
    ],
    stack: ["Nuxt", "Vue 3", "PostgreSQL"],
  },
  underborn: {
    id: "underborn",
    title: "UnderBorn",
    tag: "Собственный проект",
    category: "brand",
    year: "в работе",
    role: "Идея, дизайн, разработка",
    timeline: "MVP в разработке",
    description:
      "Атмосферный веб-проект о подземной культуре: интерактивные лоры, коллекции и комьюнити-механики. Разрабатываю в свободное время как полигон для экспериментов с анимациями и генеративной графикой.",
    highlights: [
      "Генеративная графика на Canvas",
      "Комьюнити-механики и коллекции",
      "Эксперименты с view-transitions",
    ],
    stack: ["Nuxt", "TypeScript", "Prisma"],
  },
  hostfeed: {
    id: "hostfeed",
    title: "HostFeed",
    tag: "Собственный проект",
    category: "sites",
    year: "в работе",
    role: "Идея, дизайн, разработка",
    timeline: "MVP в разработке",
    description:
      "Дружелюбный сервис мониторинга серверов и сайтов: статус-страницы, аптайм-проверки и уведомления в мессенджеры. Маскот — кот в коробке с проводами, потому что инфраструктура должна быть уютной.",
    highlights: [
      "Аптайм-проверки каждые 30 секунд",
      "Уведомления в Telegram и Discord",
      "Публичные статус-страницы",
    ],
    stack: ["Node.js", "Nest.js", "MariaDB", "Docker"],
  },
};

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

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  initials: string;
  gradient: string; // tailwind gradient classes for avatar
};

export const testimonials: Testimonial[] = [
  {
    name: "Дмитрий Соколов",
    role: "Директор, Modern Citi Group",
    quote:
      "Евгений сделал сайт с калькулятором и админкой за три недели. Заявки пошли в первый же день после запуска, конверсия — почти 5%. Всё чётко по срокам.",
    initials: "ДС",
    gradient: "from-fuchsia-500 to-purple-600",
  },
  {
    name: "Анна Ковалёва",
    role: "Владелица студии маникюра",
    quote:
      "Я в этом ничего не понимаю, но мне всё сделали «под ключ»: придумали структуру, написали тексты, научили менять прайс. Онлайн-запись теперь приходит сама.",
    initials: "АК",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    name: "Игорь Мельник",
    role: "Основатель CraftOut",
    quote:
      "12 000 игроков в первый месяц и ни одного падения сервера. Realtime-матчи, магазин, античит-логи — всё работает как часы. Рекомендую как фуллстека.",
    initials: "ИМ",
    gradient: "from-purple-500 to-indigo-600",
  },
  {
    name: "Ольга Пришвина",
    role: "Маркетолог, ГранЛайн",
    quote:
      "Сезонная кампания с новым сайтом дала x2 к заявкам. Отдельное спасибо за квиз подбора освещения — клиенты приходят уже с готовым решением.",
    initials: "ОП",
    gradient: "from-amber-500 to-orange-600",
  },
];
