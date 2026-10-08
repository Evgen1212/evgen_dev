# PORTING.md — конвенции переноса Erriour Portfolio (Next.js → Nuxt 4)

## Контекст
Сайт-портфолио переписывается с Next.js на **Nuxt 4** (Vue 3.5 + TS + Tailwind v4).
Дизайн и все Tailwind-классы должны остаться **1:1** как в React-исходниках.
Персона заменена на реальные данные из резюме: **Абрамов Евгений Павлович**,
Senior Frontend-разработчик (Vue.js / Nuxt.js / TypeScript), Москва.

## Источники
- React-исходники: `/home/z/my-project/src/components/portfolio/*.tsx`
- Vue-цель: `/home/z/my-project/nuxt-app/app/components/portfolio/*.vue`
- Данные уже портированы: `app/components/portfolio/data.ts` (НЕ редактировать)

## Уже сделано координатором (НЕ дублировать)
- `nuxt.config.ts`, `app/app.vue`, `app/assets/css/main.css` (все кастомные классы: aurora, marquee, reveal, card-shine, section-hairline, intro, dot-grid, ken-burns, back-top-ring, text-shine, link-underline и т.д.)
- Тосты: `app/composables/use-toast.ts` + `app/components/ui/ToastHost.vue`
- Плагины reveal/scroll-fx: `app/plugins/reveal.client.ts`, `app/plugins/scroll-fx.client.ts`
- `cn()`: `app/utils/cn.ts` (clsx + tailwind-merge)
- Server API: `/api/contact`, `/api/admin/*` ( Nitro, Prisma )
- Шрифты Manrope/Comfortaa самохостятся через `@font-face` в main.css
- Ассеты скопированы в `public/` (images, icons, favicon, manifest)

## Правила написания компонентов
1. **SFC**: `<script setup lang="ts">` вверху, затем `<template>`, затем `<style scoped>` (если нужен).
2. **Автоимпорты Nuxt**: `ref, computed, watch, onMounted, onBeforeUnmount, nextTick, useHead` и все компоненты доступны без import. `cn` и `useToast` тоже автоимпортируются (лежат в app/utils и app/composables).
3. **Явные импорты**: иконки — `import { Menu, X } from "lucide-vue-next"` (те же имена, что в lucide-react); данные — `import { socials, caseDetails } from "./data"` (относительный, файл рядом).
4. **Тосты**: `const { toast } = useToast(); toast({ title: "...", description: "...", variant: "destructive" })` — сигнатура как в shadcn.
5. **React → Vue соответствия**:
   - `className` → `class`; условные классы → `:class="cn('base', cond && 'extra')"`.
   - `style={{ "--reveal-delay": "150ms" }}` → `:style="{ '--reveal-delay': '150ms' }"`.
   - `onClick` → `@click`; `onSubmit={...e.preventDefault()}` → `@submit.prevent`.
   - `{cond && <div/>}` → `<div v-if="cond">`; `{arr.map(x => <X key={} />)}` → `<X v-for="x in arr" :key="...">`.
   - `useState` → `ref`; `useRef<HTMLElement>(null)` → `const el = ref<HTMLElement | null>(null)` + атрибут `ref="el"`.
   - `useEffect(fn, [])` → `onMounted(fn)` + очистка в `onBeforeUnmount`.
   - `dangerouslySetInnerHTML` → не встречается в компонентах, не использовать.
   - `aria-*`, `data-*`, `role` — те же атрибуты.
6. **SSR-безопасность**: никакого `window`/`localStorage`/`sessionStorage`/`matchMedia` при рендере — только внутри `onMounted` (или `import.meta.client`). Начальные значения ref должны быть детерминированными (иначе hydration mismatch). `Date.now()`/`new Date().getFullYear()` в шаблоне — ок (footer год), но лучше вычислять в `const year = new Date().getFullYear()` вне функции рендера (script setup выполняется и на сервере).
7. **data-reveal** и `--reveal-delay` сохранять как в исходнике — их читает плагин reveal.
8. **Изображения**: обычные `<img src="/images/...">` (next/image не существует).
9. **Сеть**: использовать `$fetch` (ofetch, встроен в Nuxt). Ошибки API приходят как `e.data.data.error` (см. ниже).
10. **Запрещено**: менять data.ts, создавать API-роуты, трогать файлы других агентов, запускать dev-сервер.

### Сниппет обработки ошибок API (Nitro → клиент)
```ts
try {
  await $fetch("/api/contact", { method: "POST", body: payload });
} catch (e) {
  const msg =
    (e as any)?.data?.data?.error ??
    (e as any)?.data?.message ??
    "Не удалось отправить заявку. Напишите в Telegram.";
}
```

## Замена персоны (сквозная)
- Слоган/бренд: «Erriour» → «Абрамов» (лого, intro, footer). Упоминания «Erriour» в текстах/aria-label убрать.
- Имя «Владимир» → «Евгений».
- «на Next.js» → «на Nuxt».
- Ключи хранилища: `erriour-intro` → `evg-intro`, `erriour-draft` → `portfolio-draft` (localStorage/sessionStorage).

## Контактные данные (если нужны в компоненте)
- Telegram: @keyboard_brothers → https://t.me/keyboard_brothers
- Телефон: +7 909 335-29-33 → tel:+79093352933 (предпочитаемый способ связи)
- E-mail: evg3nyaevgen@yandex.ru (кнопка «скопировать» использует contactEmail из data.ts)
