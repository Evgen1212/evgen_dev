#!/usr/bin/env node
/**
 * Пишет robots.txt и sitemap.xml в артефакт сборки по NUXT_PUBLIC_SITE_URL.
 * Вызывается после `nuxt generate` (локально и в CI).
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const siteUrl = (
  process.env.NUXT_PUBLIC_SITE_URL || "https://evgen1212.github.io/evgen_dev"
).replace(/\/+$/, "");

const outDir = process.env.SEO_OUT_DIR || ".output/public";

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

await mkdir(outDir, { recursive: true });
await writeFile(join(outDir, "robots.txt"), robots, "utf8");
await writeFile(join(outDir, "sitemap.xml"), sitemap, "utf8");

console.log(`SEO files → ${outDir} (site: ${siteUrl})`);
