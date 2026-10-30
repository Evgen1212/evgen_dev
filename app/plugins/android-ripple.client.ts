/** Interactive surfaces that use ::after ripple in main.css */
const RIPPLE_SELECTOR = [
  '.android-ripple',
  '.android-bottom-nav__item',
  '.m3-filled-btn',
  '.m3-outlined-btn',
  '.m3-icon-btn',
  '.m3-fab',
  '.android-drawer-item',
  'a.m3-state-layer',
  'button.m3-state-layer',
  'a.m3-list-item',
].join(', ');

/**
 * Material-style ripple origin: sets --ripple-x / --ripple-y on pointer down
 * (see main.css).
 */
export default defineNuxtPlugin(() => {
  if (typeof document === 'undefined') return;

  document.addEventListener(
    'pointerdown',
    (e) => {
      const target = (e.target as Element | null)?.closest?.(
        RIPPLE_SELECTOR,
      ) as HTMLElement | null;
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      target.style.setProperty('--ripple-x', `${x}%`);
      target.style.setProperty('--ripple-y', `${y}%`);
    },
    { capture: true, passive: true },
  );
});
