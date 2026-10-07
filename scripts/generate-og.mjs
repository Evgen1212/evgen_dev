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
    <radialGradient id="g1" cx="26%" cy="30%" r="55%">
      <stop offset="0%" stop-color="rgba(192,38,211,0.55)"/>
      <stop offset="100%" stop-color="rgba(192,38,211,0)"/>
    </radialGradient>
    <radialGradient id="g2" cx="18%" cy="85%" r="45%">
      <stop offset="0%" stop-color="rgba(37,99,235,0.45)"/>
      <stop offset="100%" stop-color="rgba(37,99,235,0)"/>
    </radialGradient>
    <radialGradient id="g3" cx="60%" cy="70%" r="45%">
      <stop offset="0%" stop-color="rgba(124,58,237,0.35)"/>
      <stop offset="100%" stop-color="rgba(124,58,237,0)"/>
    </radialGradient>
    <linearGradient id="pill" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#d946ef"/>
      <stop offset="100%" stop-color="#a855f7"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="#0a0a0b"/>
  <rect width="${W}" height="${H}" fill="url(#g1)"/>
  <rect width="${W}" height="${H}" fill="url(#g2)"/>
  <rect width="${W}" height="${H}" fill="url(#g3)"/>

  <text x="72" y="250" font-family="DejaVu Sans, sans-serif" font-size="150" font-weight="bold" fill="#fafafa" letter-spacing="-4">Erriour</text>

  <rect x="74" y="300" width="560" height="58" rx="29" fill="url(#pill)" opacity="0.92"/>
  <text x="100" y="338" font-family="DejaVu Sans, sans-serif" font-size="26" font-weight="bold" fill="#ffffff">веб-разработка любой сложности</text>

  <text x="74" y="424" font-family="DejaVu Sans, sans-serif" font-size="28" fill="#e4e4e7">От логотипа до логики — один специалист!</text>
  <text x="74" y="470" font-family="DejaVu Sans, sans-serif" font-size="24" fill="#a1a1aa">Сайты · Боты · Дизайн · Администрирование</text>

  <text x="74" y="565" font-family="DejaVu Sans, sans-serif" font-size="24" font-weight="bold" fill="#71717a">erriour.ru</text>
</svg>`;

const duckRaw = await sharp(path.join(root, "public/images/duck-transparent.png"))
  .png()
  .toBuffer();

// срезаем ~6% снизу — там остаётся тёмный след от фона исходника
const rawMeta = await sharp(duckRaw).metadata();
const duck = await sharp(duckRaw)
  .extract({
    left: 0,
    top: 0,
    width: rawMeta.width,
    height: Math.round(rawMeta.height * 0.94),
  })
  .resize(430, null)
  .png()
  .toBuffer();

const duckMeta = await sharp(duck).metadata();

await sharp(Buffer.from(svg))
  .composite([
    {
      input: duck,
      left: W - 430 - 20,
      top: H - duckMeta.height + 26, // утка слегка «сидит» на нижнем крае
    },
  ])
  .png({ quality: 92 })
  .toFile(path.join(root, "public/images/og.png"));

console.log("OG image generated: public/images/og.png");
