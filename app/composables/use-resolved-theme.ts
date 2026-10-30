export type PortfolioTheme = 'light' | 'dark';

export function resolvePortfolioTheme(): PortfolioTheme {
  if (import.meta.server) return 'dark';
  const t = document.documentElement.getAttribute('data-theme');
  if (t === 'light' || t === 'dark') return t;
  return window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark';
}

/** Синхронизация с data-theme и prefers-color-scheme (как в SiteHeader). */
export function useResolvedTheme() {
  const theme = ref<PortfolioTheme>('dark');

  function sync() {
    theme.value = resolvePortfolioTheme();
  }

  onMounted(() => {
    sync();
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    mq.addEventListener('change', sync);
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    onUnmounted(() => {
      mq.removeEventListener('change', sync);
      obs.disconnect();
    });
  });

  return { theme, sync };
}
