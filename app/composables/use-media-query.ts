/**
 * Реактивный matchMedia: SSR-safe, обновляется при изменении размера окна.
 */
export function useMediaQuery(query: string) {
  const matches = ref(false);
  let mq: MediaQueryList | null = null;

  const update = (event?: MediaQueryListEvent) => {
    matches.value = event ? event.matches : !!mq?.matches;
  };

  onMounted(() => {
    mq = window.matchMedia(query);
    update();
    mq.addEventListener('change', update);
  });

  onBeforeUnmount(() => {
    mq?.removeEventListener('change', update);
    mq = null;
  });

  return matches;
}
