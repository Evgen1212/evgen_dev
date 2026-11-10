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
bun install
bun run dev
```

## Design constraints (when changing UI)

- Keep professional, readable marketing layout; Russian copy where the site already uses RU.
- Prefer existing tokens in `assets/css` / Tailwind theme; avoid one-off inline styles.
- Lucide icons via `lucide-vue-next`; use `clsx` + `tailwind-merge` for class lists.
- Do not break GitHub Pages static export (`nuxt generate`) paths under `public/`.

## Open Design (опционально)

Репозиторий — обычный Nuxt-проект; связка с Open Design / Cursor / другим агентом **не зашита в git**.

- **Контракт визуала** — этот файл; при импорте папки в OD укажи путь к репо и ветку **`ios`**.
- **MCP / IDE:** настрой на своей машине (например **Open Design → Settings → MCP** и скопируй блок для Cursor в `.cursor/mcp.json`, шаблон — [`.cursor/mcp.json.example`](.cursor/mcp.json.example)). Файл `.cursor/mcp.json` в gitignore.
- **Превью кода:** `bun run dev` (порт — из вывода терминала).
