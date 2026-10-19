/**
 * Генерирует public/images/og.png (1200×630) для Open Graph / Twitter.
 * Запуск: bun scripts/generate-og.mjs
 */
import sharp from "sharp";
import { fileURLToPath } from "url";
import path from "path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const W = 1200;
const H = 630;

const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g1" cx="30%" cy="18%" r="70%">
      <stop offset="0%" stop-color="#5b21b6"/>
      <stop offset="55%" stop-color="#3b0f66"/>
      <stop offset="100%" stop-color="#0a0a0b"/>
    </radialGradient>
    <linearGradient id="pill" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#d946ef"/>
      <stop offset="100%" stop-color="#a855f7"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="#0a0a0b"/>
  <rect width="${W}" height="${H}" fill="url(#g1)"/>

  <text x="86" y="210" font-family="DejaVu Sans, sans-serif" font-size="104" font-weight="bold" fill="#fafafa" letter-spacing="-2">Абрамов</text>
  <text x="86" y="330" font-family="DejaVu Sans, sans-serif" font-size="104" font-weight="bold" fill="#fafafa" letter-spacing="-2">Евгений</text>

  <rect x="86" y="372" width="556" height="58" rx="29" fill="url(#pill)"/>
  <text x="112" y="411" font-family="DejaVu Sans, sans-serif" font-size="28" font-weight="bold" fill="#ffffff">Senior Frontend-разработчик</text>

  <text x="86" y="490" font-family="DejaVu Sans, sans-serif" font-size="30" fill="#d8b4fe">Vue 3 · Nuxt · TypeScript · SPA / SSR</text>
  <text x="86" y="534" font-family="DejaVu Sans, sans-serif" font-size="26" fill="#a1a1aa">От идеи до продакшена</text>

  <text x="86" y="590" font-family="DejaVu Sans, sans-serif" font-size="26" font-weight="bold" fill="#a1a1aa">t.me/keyboard_brothers</text>
</svg>`;

const parrot = await sharp(path.join(root, "public/images/parrot-transparent.png"))
  .resize(390, null) // альфа уже чистая — только масштабируем
  .png()
  .toBuffer();

const parrotMeta = await sharp(parrot).metadata();

await sharp(Buffer.from(svg))
  .composite([
    {
      input: parrot,
      left: W - parrotMeta.width - 6,
      top: H - parrotMeta.height + 30, // попугай слегка «сидит» на нижнем крае
    },
  ])
  .png({ quality: 92 })
  .toFile(path.join(root, "public/images/og.png"));

console.log("OG image generated: public/images/og.png");
