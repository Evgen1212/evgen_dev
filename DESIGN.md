# evgen_dev — portfolio / landing (Nuxt 4)

## Product

Personal portfolio and client landing for Evgeny Abramov (frontend, Vue/Nuxt). Public demo: https://evgen1212.github.io/evgen_dev/

## Stack

- **Nuxt 4**, Vue 3, TypeScript
- **Tailwind CSS 4** (`@tailwindcss/vite`)
- **Bun** for install/dev (`bun install`, `bun run dev`)
- Branch for OpenDesign experiments: **`od_test`**

## Local dev

```bash
cd ~/Desktop/frontend-dev/apps/evgen_dev
bun run dev
# http://127.0.0.1:3000
```

## Design constraints (when changing UI)

- Keep professional, readable marketing layout; Russian copy where the site already uses RU.
- Prefer existing tokens in `assets/css` / Tailwind theme; avoid one-off inline styles.
- Lucide icons via `lucide-vue-next`; use `clsx` + `tailwind-merge` for class lists.
- Do not break GitHub Pages static export (`nuxt generate`) paths under `public/`.

## OpenDesign

Linked folder project in OpenDesign: **evgen_dev · od_test** (`import-folder` → same directory as this repo).
