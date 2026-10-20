/**
 * Путь к файлу из /public с учётом app.baseURL.
 *
 * На GitHub Pages project-сайт живёт в подпапке /<repo>/, поэтому
 * абсолютные ссылки вида /images/... нужно префиксовать. Локально
 * baseURL = "/", и путь остаётся прежним.
 */
export function useAsset(path: string) {
  const base = useRuntimeConfig().app.baseURL || "/";
  return `${base}${path.replace(/^\/+/, "")}`;
}
