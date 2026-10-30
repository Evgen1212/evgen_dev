/** Чёрные mono-иконки: .svg — светлая тема, *-dark.svg — тёмная. */
export const TECH_ICON_DARK_VARIANT = new Set([
  'gitlab',
  'storybook',
  'javascript',
  'webpack',
  'vitest',
  'jest',
  'graphql',
]);

/** Белые mono-иконки: .svg — тёмная тема, *-light.svg — светлая. */
export const TECH_ICON_LIGHT_VARIANT = new Set([
  'github',
  'nextdotjs',
  'prisma',
]);

export function techIconAssetSlug(
  icon: string,
  theme: 'light' | 'dark',
): string {
  if (TECH_ICON_DARK_VARIANT.has(icon)) {
    return theme === 'dark' ? `${icon}-dark` : icon;
  }
  if (TECH_ICON_LIGHT_VARIANT.has(icon)) {
    return theme === 'light' ? `${icon}-light` : icon;
  }
  return icon;
}
