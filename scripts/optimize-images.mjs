import sharp from "sharp";
import { mkdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * Генерация оптимизированных WebP-вариантов для страницы.
 *
 * Исходники лежат в app/assets/images/source и НЕ попадают в деплой.
 * Результат — public/images/opt/<name>-<width>.webp + манифест с
 * доминирующими цветами для скелетонов.
 *
 * Запуск: bun run images
 */

const ROOT = process.cwd();
const SOURCE_DIR = path.join(ROOT, "app/assets/images/source");
const OUTPUT_DIR = path.join(ROOT, "public/images/opt");
const MANIFEST_FILE = path.join(
  ROOT,
  "app/components/portfolio/image-manifest.ts",
);

const PHOTO_WIDTHS = [480, 720, 960, 1200];

const IMAGES = [
  {
    name: "parrot",
    file: "parrot-transparent.png",
    widths: [160, 256, 384, 512, 640],
    quality: 82,
    alphaQuality: 92,
    color: "#d946ef",
  },
  {
    name: "avatar",
    file: "avatar.jpg",
    widths: [48, 96, 144],
    quality: 82,
  },
  {
    name: "me",
    file: "me.png",
    widths: [382],
    quality: 80,
  },
  ...["work-alfabit", "work-autoeuro", "work-titul", "work-yabbi"].map(
    (name) => ({
      name,
      file: `${name}.jpg`,
      widths: PHOTO_WIDTHS,
      quality: 78,
    }),
  ),
  ...["proj-brandlab", "proj-skolkovo", "proj-xfit"].map((name) => ({
    name,
    file: `${name}.jpg`,
    widths: PHOTO_WIDTHS,
    quality: 78,
  })),
];

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

async function dominantColor(file) {
  const stats = await sharp(file).stats();
  const { r, g, b } = stats.dominant;
  return `#${[r, g, b]
    .map((value) => Math.round(value).toString(16).padStart(2, "0"))
    .join("")}`;
}

await rm(OUTPUT_DIR, { recursive: true, force: true });
await mkdir(OUTPUT_DIR, { recursive: true });

const manifest = {};
let sourceBytes = 0;
let outputBytes = 0;

for (const image of IMAGES) {
  const input = path.join(SOURCE_DIR, image.file);
  const inputStat = await stat(input);
  sourceBytes += inputStat.size;

  const metadata = await sharp(input).metadata();
  const color = image.color ?? (await dominantColor(input));
  manifest[image.name] = { color };

  let variantBytes = 0;

  for (const width of image.widths) {
    const output = path.join(OUTPUT_DIR, `${image.name}-${width}.webp`);
    await sharp(input)
      .resize({ width, withoutEnlargement: true })
      .webp({
        quality: image.quality,
        alphaQuality: image.alphaQuality ?? 90,
        effort: 6,
        smartSubsample: true,
      })
      .toFile(output);

    const outputStat = await stat(output);
    variantBytes += outputStat.size;
    outputBytes += outputStat.size;
  }

  console.log(
    `${image.name.padEnd(16)} ${String(metadata.width).padStart(4)}x${String(
      metadata.height,
    ).padEnd(4)} → ${image.widths.length} вариантов, ${kb(
      inputStat.size,
    )} → ${kb(variantBytes)}`,
  );
}

const sorted = Object.fromEntries(
  Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)),
);

await writeFile(
  MANIFEST_FILE,
  `/* Автосгенерировано scripts/optimize-images.mjs — не редактировать вручную. */\nexport const imageManifest = ${JSON.stringify(
    sorted,
    null,
    2,
  )} as const;\n`,
  "utf8",
);

console.log(
  `\nИтого: ${kb(sourceBytes)} исходников → ${kb(
    outputBytes,
  )} всех WebP-вариантов. Манифест: ${path.relative(ROOT, MANIFEST_FILE)}`,
);
