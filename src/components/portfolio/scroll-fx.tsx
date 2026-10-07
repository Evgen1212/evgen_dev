"use client";

import { useEffect } from "react";

/**
 * Пишет позицию скролла в CSS-переменную --scroll-y (на <html>).
 * Используется для параллакса утки и других микро-эффектов без ре-рендеров.
 */
export default function ScrollFx() {
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;

    const update = () => {
      raf = 0;
      root.style.setProperty("--scroll-y", String(Math.round(window.scrollY)));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
