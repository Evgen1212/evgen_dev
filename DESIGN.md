# evgen_dev — portfolio / landing (Nuxt 4)

> **Контракт для OpenDesign, OpenCode (MCP) и ручных правок.**  
> Перед изменением UI прочитай этот файл. Целевой визуальный язык: **Android / Material Design 3** (оболочка системы, не «космический» лендинг).

## Product

- **Кто:** Evgeny Abramov — Senior Frontend (Vue / Nuxt / TypeScript).
- **Зачем:** визитка + привлечение заказчиков на разработку.
- **Публично:** https://evgen1212.github.io/evgen_dev/
- **Язык интерфейса:** русский (RU), профессиональный тон, без канцелярита.

## Stack

| Слой | Технология |
|------|------------|
| Framework | **Nuxt 4**, Vue 3, TypeScript |
| Стили | **Tailwind CSS 4** (`@tailwindcss/vite`), токены в `app/assets/css/main.css` |
| Иконки | **lucide-vue-next** (stroke 1.5–2, размеры как у Material Symbols) |
| Классы | `clsx` + `tailwind-merge` где уже принято в компонентах |
| Пакеты | **Bun** — `bun install`, `bun run dev` |
| Деплой | GitHub Pages — `nuxt generate`, `NUXT_APP_BASE_URL` в CI |

## Local dev

```bash
cd ~/Desktop/frontend-dev/apps/evgen_dev
bun run dev
# http://127.0.0.1:3000
```

## Information architecture (страница)

Порядок секций в `app/app.vue` (якоря сохранять):

| # | Компонент | Якорь | Роль в «Android-оболочке» |
|---|-----------|-------|---------------------------|
| — | `SiteHeader` | — | **Top app bar** (compact / medium при scroll) |
| 1 | `Hero` | `#top` | **Hero / onboarding card** — один primary CTA |
| — | `Hairline` | — | **Divider** или убрать (M3: `outline-variant`) |
| 2 | `About` | `#about` | **About** — текст + chips |
| 3 | `Experience` | `#experience` | **Timeline / list** |
| 4 | `OwnProjects` | `#projects` | **Cards grid** (2 col tablet+) |
| 5 | `Skills` | `#skills` | **Filter chips** + список |
| — | `Hairline` | — | divider |
| 6 | `Tech` | `#tech` | **Icon row** (как app tray) |
| 7 | `Process` | `#process` | **Stepper** (horizontal на desktop) |
| 8 | `Prices` | `#prices` | **Pricing cards** (1 featured) |
| — | `Hairline` | — | divider |
| 9 | `Faq` | `#faq` | **Expansion panels** |
| — | `Hairline` | — | divider |
| 10 | `Contact` | `#contact` | **Contact sheet** — форма + actions |
| — | `SiteFooter` | — | **Footer bar** (links, legal) |
| — | `StickyCta` | — | **Bottom bar** (mobile only, FAB optional) |

## Design direction: Material 3 / Android shell

### Принципы (must)

1. **Плоские поверхности + elevation**, не неон и не «aurora». Тени — мягкие, уровни 1–3 (см. ниже).
2. **Системная тема:** `prefers-color-scheme` + ручной toggle (`data-theme` на `<html>`, `localStorage` key `theme`) — как сейчас, но палитра M3.
3. **Формы:** скругления **12px** (cards, sheets), **28px** (FAB / large buttons), **full** для chips — не `rounded-2xl` «iOS pill» без причины.
4. **Типографика:** шкала M3 (Roboto / system-ui). Пока в CSS — Manrope (body) + Comfortaa (display logo). **Новые блоки** — Manrope; логотип `evgen_dev` можно оставить display-шрифтом, но **заголовки секций** — `text-2xl`/`text-3xl`, **не** гигантский viewport hero.
5. **Motion:** короткие easing **emphasized decelerate** (~300ms), `prefers-reduced-motion` — отключать декор (уже есть в CSS).
6. **Доступность:** контраст текста ≥ **4.5:1** на surface; focus — **2px outline** primary (заменить fuchsia focus на primary).

### Убрать / не добавлять при редизайне

- Aurora-слои, `text-shine`, film grain (`noise-overlay`), fuchsia/purple **scroll progress**, «card shine sweep».
- Glassmorphism «chrome pill» в шапке → **solid / surface container** top bar.
- Декоративные **Hairline** с ромбом → `border-b border-outline-variant` или M3 divider.

### Цветовые роли (target tokens)

Добавлять в `main.css` постепенно; **не ломать** существующие `--page` / `--ink` до миграции — маппинг:

| M3 role | Dark (target) | Light (target) | Назначение |
|---------|---------------|----------------|------------|
| **primary** | `#A8C7FA` on `#062E6F` | `#0B57D0` on `#FFFFFF` | CTA, links, focus |
| **on-primary** | `#062E6F` | `#FFFFFF` | текст на кнопке |
| **surface** | `#121212` | `#FEF7FF` | фон страницы ≈ `--page` |
| **surface-container** | `#1E1E1E` | `#F3EDF7` | карточки ≈ `--panel` |
| **surface-container-high** | `#2B2B2B` | `#ECE6F0` | hover |
| **on-surface** | `#E3E3E3` | `#1D1B20` | основной текст ≈ `--ink` |
| **on-surface-variant** | `#C4C7C5` | `#49454F` | вторичный ≈ `--ink-soft` |
| **outline** | `#8E918F` | `#79747E` | borders ≈ `--line-1` |
| **outline-variant** | `#444746` | `#CAC4D0` | dividers |
| **secondary** | `#CCC2DC` | `#625B71` | chips, badges |
| **tertiary** | `#EFB8C8` | `#7D5260` | акцент «открыт к проектам» (вместо emerald ping) |
| **error** | `#F2B8B5` | `#B3261E` | ошибки форм |

Seed для бренда: **синий Google-style primary** (доверие, «системное» приложение). Фиолетовые акценты текущего сайта — **deprecated** в новых правках.

### Elevation (box-shadow target)

```css
/* reference — внедрять через utility-классы .elevation-1 … 3 */
--elevation-1: 0 1px 2px rgb(0 0 0 / 0.3), 0 1px 3px 1px rgb(0 0 0 / 0.15);
--elevation-2: 0 1px 2px rgb(0 0 0 / 0.3), 0 2px 6px 2px rgb(0 0 0 / 0.15);
--elevation-3: 0 4px 8px 3px rgb(0 0 0 / 0.15), 0 1px 3px rgb(0 0 0 / 0.3);
```

Light theme — тени с меньшей opacity (`0.08–0.12`).

### Компоненты (patterns)

| Pattern | Spec |
|---------|------|
| **Filled button** | `bg-primary`, `text-on-primary`, h-10–12, px-6, rounded-full (M3) |
| **Outlined button** | border `outline`, прозрачный фон |
| **Text button** | только текст primary |
| **Card** | `surface-container`, rounded-xl (12px), elevation-1, padding 16–24 |
| **Chip** | filter / status — height 32, rounded-sm (8px) |
| **Top app bar** | height 64, title medium, actions icon 24px, scroll → `surface-container` + elevation-1 |
| **Bottom bar (mobile)** | `StickyCta` → bar height 80 + safe-area, 1–2 actions |
| **FAB** | optional на mobile: primary, 56px, icon only «Написать» |
| **List item** | min-height 56, leading icon optional, trailing chevron |
| **Expansion (FAQ)** | M3 accordion — один open, divider между items |

### Типографическая шкала (reference)

| Role | Size / weight |
|------|----------------|
| Display (hero name) | 36–45px / 400 (не 15vw) |
| Headline (section) | 28px / 400 |
| Title | 22px / 500 |
| Body large | 16px / 400 |
| Body | 14px / 400 |
| Label | 12px / 500 |

### Иконки

- Lucide: **24px** в app bar, **20px** в list, stroke **2**.
- Tech stack — SVG в `public/icons/tech/` без перекраски в неон.

### Breakpoints

- Mobile first: **< 768** bottom bar + drawer nav.
- **≥ 768** — top nav links inline, no drawer.
- **≥ 1024** — двухколоночный hero (text + illustration), max-width контента **1200px** (≈ `max-w-6xl`).

## Migration checklist (agents)

При задаче «привести к Android» делай **по секциям**, не big-bang:

1. Обновить CSS variables (M3 table) + `theme-color` в `nuxt.config.ts`.
2. `SiteHeader` → top app bar.
3. `Hero` — убрать aurora/parallax; card + primary CTA.
4. Заменить `Hairline` на divider token.
5. Cards (`Prices`, `OwnProjects`) — elevation + surface-container.
6. `Faq` — expansion panels styling.
7. `StickyCta` — bottom app bar.
8. Удалить или выключить `.noise-overlay`, `.text-shine`, fuchsia focus/scroll.

После каждого шага: `bun run dev`, проверка light/dark, mobile 375px.

## Constraints (always)

- Не ломать **SEO** (`useHead`, JSON-LD в `app.vue`), якоря, `sitemap`, `robots.txt`.
- Не ломать **static export** (`nuxt generate`) и пути `public/`.
- Сохранять **RU copy** в `data.ts` и компонентах; правки текста — только по запросу.
- Новые стили — через **tokens** в `main.css` или Tailwind `@theme`, не inline hex в Vue (кроме одноразовых прототипов).
- **Web Vitals:** без тяжёлых blur/filter; анимации GPU-friendly (`transform`, `opacity`).

## OpenDesign

- Репозиторий на диске: `~/Desktop/frontend-dev/apps/evgen_dev`
- **Git branch для работы:** `main` (актуальный контракт — этот файл).
- Если проект в OpenDesign привязан к другой ветке/имени — **re-import folder** или обнови brief в UI, указав путь к репо.
- MCP: `open-design` в OpenCode; правки кода на живом **http://127.0.0.1:3000** (dev поднимает пользователь).

## Files map (UI)

```
app/
  app.vue              # layout секций
  assets/css/main.css  # tokens + global
  components/portfolio/
    SiteHeader.vue
    Hero.vue
    About.vue
    Experience.vue
    OwnProjects.vue
    Skills.vue
    Tech.vue
    Process.vue
    Prices.vue
    Faq.vue
    Contact.vue
    SiteFooter.vue
    StickyCta.vue
    data.ts            # copy, prices, socials
```

---

**Version:** 2026-03-29 · branch **main** · visual target **Material 3 / Android shell**
