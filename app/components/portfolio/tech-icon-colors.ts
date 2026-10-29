/** Simple Icons brand colors + theme-safe ink for dark logos. */

const TECH_BRAND_COLORS: Record<string, string> = {
  docker: "#2496ED",
  dockercompose: "#2496ED",
  git: "#F05032",
  gitlab: "#FC6D26",
  github: "#181717",
  figma: "#F24E1E",
  nginx: "#009639",
  typescript: "#3178C6",
  javascript: "#CA8A04",
  vuedotjs: "#41B883",
  nuxt: "#00DC82",
  react: "#149ECA",
  nextdotjs: "#000000",
  vite: "#646CFF",
  webpack: "#175C9C",
  tailwindcss: "#06B6D4",
  sass: "#CC6699",
  storybook: "#FF4785",
  nodedotjs: "#339933",
  graphql: "#E10098",
  prisma: "#2D3748",
  postgresql: "#4169E1",
  mysql: "#4479A1",
  sqlite: "#003B57",
  redis: "#DC382D",
  vitest: "#6E9F18",
  jest: "#C21325",
};

/** Logos that are mostly black — use theme ink for contrast on chips. */
const THEME_INK_SLUGS = new Set(["github", "nextdotjs", "prisma"]);

/** Multi-color SVGs — render as native <img>, not CSS mask. */
export const TECH_MULTICOLOR_ICONS = new Set(["pinia"]);

export function techIconPaint(slug: string): string {
  if (THEME_INK_SLUGS.has(slug)) return "var(--tech-icon-fg)";
  return TECH_BRAND_COLORS[slug] ?? "var(--tech-icon-fg)";
}
