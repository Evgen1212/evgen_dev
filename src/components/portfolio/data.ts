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
};

export const caseDetails: Record<string, CaseDetail> = {
  modern: {
    id: "modern",
    title: "Modern Citi Group",
    tag: "Корпоративный сайт",
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
    stack: ["Next.js", "TypeScript", "TailwindCSS", "PostgreSQL", "Docker"],
  },
  craftout: {
    id: "craftout",
    title: "CraftOut",
    tag: "Игровая платформа · Full-stack",
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
    stack: ["Next.js", "Nest.js", "Redis", "MongoDB", "WebSocket", "Docker"],
  },
  granline: {
    id: "granline",
    title: "ГранЛайн",
    tag: "Сайт + каталог продукции",
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
    stack: ["Next.js", "TailwindCSS", "SQLite"],
  },
  shadows: {
    id: "shadows",
    title: "Shadows Project",
    tag: "Брендинг + сайт",
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
    stack: ["PHP", "Laravel", "MySQL", "Redis"],
  },
  cataclysm: {
    id: "cataclysm",
    title: "Project Cataclysm",
    tag: "Промо-сайт игры",
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
    stack: ["Next.js", "Framer Motion", "PostgreSQL"],
  },
  underborn: {
    id: "underborn",
    title: "UnderBorn",
    tag: "Собственный проект",
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
    stack: ["Next.js", "TypeScript", "Prisma"],
  },
  hostfeed: {
    id: "hostfeed",
    title: "HostFeed",
    tag: "Собственный проект",
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
    stack: ["Node.js", "Adonis.js", "MariaDB", "Docker"],
  },
};

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
      "Владимир сделал сайт с калькулятором и админкой за три недели. Заявки пошли в первый же день после запуска, конверсия — почти 5%. Всё чётко по срокам.",
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
