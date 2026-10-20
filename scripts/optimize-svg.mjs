import { optimize } from "svgo";
import { readFile, writeFile } from "node:fs/promises";
import { readdir } from "node:fs/promises";
import path from "node:path";
import config from "../svgo.config.mjs";

/**
 * Минификация SVG-иконок в public/icons.
 * Запуск: bun run svg
 */

const ICONS_DIR = path.resolve("public/icons");
const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (entry.isFile() && entry.name.endsWith(".svg")) yield full;
  }
}

let before = 0;
let after = 0;
let count = 0;
let saved = 0;

for await (const file of walk(ICONS_DIR)) {
  const source = await readFile(file, "utf8");
  const relative = path.relative(ICONS_DIR, file);
  const sourceBytes = Buffer.byteLength(source);
  before += sourceBytes;

  try {
    const result = optimize(source, { ...config, path: file });
    const resultBytes = Buffer.byteLength(result.data);
    after += resultBytes;
    count += 1;

    if (resultBytes < sourceBytes) {
      await writeFile(file, result.data, "utf8");
      saved += 1;
      console.log(
        `${relative.padEnd(34)} ${kb(sourceBytes).padStart(8)} → ${kb(
          resultBytes,
        ).padStart(8)}`,
      );
    }
  } catch (error) {
    after += sourceBytes;
    console.warn(`! ${relative}: ${error.message}`);
  }
}

console.log(
  `\nSVG: ${count} файлов, ${kb(before)} → ${kb(
    after,
  )}, обновлено ${saved}. Экономия ${(100 - (after / before) * 100).toFixed(
    1,
  )}%.`,
);
