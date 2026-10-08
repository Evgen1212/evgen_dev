"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Полоса прогресса чтения (сверху) и кнопка «наверх» (справа снизу).
 * Прогресс рисуется на CSS-переменной --scroll-progress (без ре-рендеров),
 * кнопка переключает видимость только при переходе порога.
 */
export default function ScrollWidgets() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setShowTop(window.scrollY > 640);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div aria-hidden="true" className="scroll-progress" />

      <button
        type="button"
        aria-label="Наверх"
        title="Наверх"
        data-hidden={!showTop}
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "auto"
              : "smooth",
          })
        }
        className="back-top fixed bottom-5 right-5 z-50 grid size-11 place-items-center rounded-full border border-white/15 bg-white/10 text-white shadow-xl shadow-black/40 backdrop-blur-md transition-colors hover:bg-white hover:text-black sm:bottom-7 sm:right-7"
      >
        {/* кольцо прогресса чтения вокруг кнопки (чистый CSS, без ре-рендеров) */}
        <svg
          className="back-top-ring"
          viewBox="0 0 44 44"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <linearGradient id="backtop-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d946ef" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <circle cx="22" cy="22" r="18" />
        </svg>
        <ArrowUp className="relative size-5" aria-hidden="true" />
      </button>
    </>
  );
}
