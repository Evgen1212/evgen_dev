/**
 * Генерирует public/images/og.png (1200×630) для Open Graph / Twitter.
 * Стиль ближе к Apple: нейтральный фон, мягкие блики, крупная типографика.
 * Запуск: bun scripts/generate-og.mjs  |  npm run og
 */
import sharp from "sharp";
import { fileURLToPath } from "url";
import path from "path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const W = 1200;
const H = 630;

/** Apple-like palette (neutral + один акцент) */
const bg = "#0a0a0b";
const title = "#f5f5f7";
const subtitle = "#e8e8ed";
const muted = "#86868b";
const accent = "#bf5af2";

const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgFade" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0%" stop-color="#141416"/>
      <stop offset="100%" stop-color="${bg}"/>
    </linearGradient>
    <radialGradient id="glowViolet" cx="88%" cy="72%" r="42%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.35"/>
      <stop offset="55%" stop-color="#5e5ce6" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="${bg}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowSoft" cx="12%" cy="8%" r="55%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="${bg}" stop-opacity="0"/>
    </radialGradient>
    <filter id="blurOrb" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="48"/>
    </filter>
    <linearGradient id="hairline" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="${bg}"/>
  <rect width="${W}" height="${H}" fill="url(#bgFade)"/>
  <rect width="${W}" height="${H}" fill="url(#glowSoft)"/>
  <rect width="${W}" height="${H}" fill="url(#glowViolet)"/>

  <ellipse cx="980" cy="420" rx="220" ry="180" fill="${accent}" opacity="0.18" filter="url(#blurOrb)"/>
  <ellipse cx="140" cy="80" rx="160" ry="120" fill="#ffffff" opacity="0.04" filter="url(#blurOrb)"/>

  <line x1="72" y1="88" x2="420" y2="88" stroke="url(#hairline)" stroke-width="1"/>

  <text x="72" y="228" font-family="DejaVu Sans, sans-serif" font-size="96" font-weight="bold" fill="${title}" letter-spacing="-3">evgen_dev</text>

  <text x="72" y="298" font-family="DejaVu Sans, sans-serif" font-size="34" font-weight="normal" fill="${subtitle}" letter-spacing="-0.5">Senior Frontend-разработчик</text>

  <text x="72" y="368" font-family="DejaVu Sans, sans-serif" font-size="26" fill="${muted}">Vue 3 · Nuxt · TypeScript · React · Next.js</text>
  <text x="72" y="412" font-family="DejaVu Sans, sans-serif" font-size="24" fill="${muted}">От идеи до продакшена</text>

  <text x="72" y="548" font-family="DejaVu Sans, sans-serif" font-size="22" fill="${accent}">t.me/keyboard_brothers</text>
</svg>`;

const parrotSize = 300;
/** Монохром: яркость из исходника, один оттенок под Apple-like палитру карточки */
const parrotMonoRgb = { r: 232, g: 232, b: 237 }; // #e8e8ed
const parrot = await sharp(path.join(root, "app/assets/images/source/parrot-transparent.png"))
  .resize(parrotSize, null)
  .greyscale()
  .tint(parrotMonoRgb)
  .png()
  .toBuffer();

const parrotMeta = await sharp(parrot).metadata();
const parrotLeft = W - parrotMeta.width - 40;
/** Смещение вниз: за нижним краем карточки остаётся тело, видна только «голова» */
const headPeekPx = 118;
const parrotTop = H - headPeekPx;

await sharp(Buffer.from(svg))
  .composite([
    {
      input: parrot,
      left: parrotLeft,
      top: parrotTop,
    },
  ])
  .png({ quality: 92 })
  .toFile(path.join(root, "public/images/og.png"));

console.log("OG image generated: public/images/og.png");
