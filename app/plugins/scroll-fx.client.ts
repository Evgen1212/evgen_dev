/**
 * Пишет позицию скролла в CSS-переменные --scroll-y (px) и
 * --scroll-progress (0..1) на <html>. Используется для параллакса утки,
 * авроры и полосы прогресса без ре-рендеров.
 */
export default defineNuxtPlugin(() => {
  const root = document.documentElement;
  let raf = 0;

  const update = () => {
    raf = 0;
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    root.style.setProperty("--scroll-y", String(Math.round(y)));
    root.style.setProperty(
      "--scroll-progress",
      max > 0 ? String(Math.min(1, y / max)) : "0"
    );
  };

  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(update);
  };

  update();
  window.addEventListener("scroll", onScroll, { passive: true });
});
