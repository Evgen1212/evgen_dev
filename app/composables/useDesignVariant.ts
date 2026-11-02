export type DesignVariant = 'main' | 'ios' | 'android';

/** Корень репозитория на GitHub Pages (`/evgen_dev/`) или `/` локально */
export function resolveRepoRoot(pathname: string): string {
  const marker = '/evgen_dev';
  const idx = pathname.indexOf(marker);
  if (idx === -1) return '/';
  return `${pathname.slice(0, idx + marker.length)}/`;
}

export function detectDesignVariant(pathname: string): DesignVariant {
  const root = resolveRepoRoot(pathname);
  const rest = pathname.slice(root.length).replace(/^\//, '');
  if (rest === 'ios' || rest.startsWith('ios/')) return 'ios';
  if (rest === 'android' || rest.startsWith('android/')) return 'android';
  return 'main';
}

export function designVariantPath(
  root: string,
  variant: DesignVariant,
): string {
  if (variant === 'main') return root;
  return `${root}${variant}/`;
}

export function useDesignVariant() {
  const currentVariant = ref<DesignVariant>('main');

  onMounted(() => {
    currentVariant.value = detectDesignVariant(window.location.pathname);
  });

  function navigateToVariant(variant: DesignVariant) {
    if (!import.meta.client) return;
    if (variant === detectDesignVariant(window.location.pathname)) return;

    const root = resolveRepoRoot(window.location.pathname);
    const path = designVariantPath(root, variant);
    const hash = window.location.hash || '';
    window.location.assign(`${window.location.origin}${path}${hash}`);
  }

  const variants: {
    id: DesignVariant;
    label: string;
  }[] = [
    { id: 'main', label: 'Классический (Custom)' },
    { id: 'android', label: 'Android (Material)' },
    { id: 'ios', label: 'iOS (HIG)' },
  ];

  return { currentVariant, navigateToVariant, variants };
}
