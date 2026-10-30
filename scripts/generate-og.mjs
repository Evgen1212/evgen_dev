/**
 * Генерирует public/images/og.png (1200×630) — Material 3 / Android shell.
 * Запуск: bun scripts/generate-og.mjs
 */
import sharp from "sharp";
import { fileURLToPath } from "url";
import path from "path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const W = 1200;
const H = 630;

// M3 light scheme (seed blue) — см. DESIGN.md / main.css
const SURFACE = "#FEF7FF";
const ON_SURFACE = "#1D1B20";
const ON_SURFACE_VARIANT = "#49454F";
const PRIMARY = "#0B57D0";
const ON_PRIMARY = "#FFFFFF";
const PRIMARY_CONTAINER = "#D3E3FD";
const ON_PRIMARY_CONTAINER = "#041E49";
const OUTLINE_VARIANT = "#CAC4D0";
const SURFACE_CONTAINER = "#F3EDF7";

const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${SURFACE}"/>

  <!-- Top app bar (64dp) -->
  <rect width="${W}" height="96" fill="${SURFACE_CONTAINER}"/>
  <rect y="95" width="${W}" height="1" fill="${OUTLINE_VARIANT}"/>

  <text x="72" y="62" font-family="Roboto, DejaVu Sans, sans-serif" font-size="22" font-weight="500" fill="${ON_SURFACE}">evgen_dev</text>

  <!-- App icon mark (favicon motif) -->
  <rect x="1020" y="24" width="96" height="96" rx="27" fill="${PRIMARY}"/>
  <text x="1068" y="82" font-family="Roboto, DejaVu Sans, sans-serif" font-size="30" font-weight="500" fill="${ON_PRIMARY}" text-anchor="middle">&lt;/&gt;</text>

  <!-- Hero card -->
  <rect x="72" y="140" width="1056" height="420" rx="28" fill="${SURFACE_CONTAINER}" stroke="${OUTLINE_VARIANT}" stroke-width="1"/>

  <text x="120" y="240" font-family="Roboto, DejaVu Sans, sans-serif" font-size="72" font-weight="400" fill="${ON_SURFACE}" letter-spacing="-1">Senior Frontend</text>
  <text x="120" y="310" font-family="Roboto, DejaVu Sans, sans-serif" font-size="36" font-weight="400" fill="${ON_SURFACE_VARIANT}">Vue · Nuxt · TypeScript · React · Next.js</text>

  <!-- Filled button (M3) -->
  <rect x="120" y="360" width="420" height="56" rx="28" fill="${PRIMARY}"/>
  <text x="152" y="396" font-family="Roboto, DejaVu Sans, sans-serif" font-size="24" font-weight="500" fill="${ON_PRIMARY}">От идеи до продакшена</text>

  <!-- Assist chip -->
  <rect x="120" y="440" width="280" height="40" rx="8" fill="${PRIMARY_CONTAINER}"/>
  <text x="144" y="466" font-family="Roboto, DejaVu Sans, sans-serif" font-size="20" font-weight="500" fill="${ON_PRIMARY_CONTAINER}">t.me/keyboard_brothers</text>

  <text x="120" y="580" font-family="Roboto, DejaVu Sans, sans-serif" font-size="20" fill="${ON_SURFACE_VARIANT}">Material 3 · Android shell · Nuxt 4</text>
</svg>`;

await sharp(Buffer.from(svg))
  .png({ quality: 92, compressionLevel: 9 })
  .toFile(path.join(root, "public/images/og.png"));

console.log("OG image generated: public/images/og.png");
