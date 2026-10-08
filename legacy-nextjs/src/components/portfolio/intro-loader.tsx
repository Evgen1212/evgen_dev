"use client";

import { useEffect, useState } from "react";

type Phase = "hidden" | "show" | "fade";

/**
 * Брендированный прелоадер: утка покачивается + имя с бегущим градиентом.
 * Показывается один раз за сессию (sessionStorage), ~1.4с суммарно.
 * При prefers-reduced-motion — не показывается вовсе.
 */
export default function IntroLoader() {
  const [phase, setPhase] = useState<Phase>("hidden");

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("erriour-intro") === "1";
    } catch {
      seen = false;
    }
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // показываем через rAF — setState синхронно в эффекте запрещён lint-правилом
    const raf = requestAnimationFrame(() => setPhase("show"));
    document.body.style.overflow = "hidden";

    const t1 = setTimeout(() => setPhase("fade"), 950);
    const t2 = setTimeout(() => {
      setPhase("hidden");
      document.body.style.overflow = "";
      try {
        sessionStorage.setItem("erriour-intro", "1");
      } catch {
        /* приватный режим */
      }
    }, 1500);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      aria-hidden="true"
      className={`intro-overlay ${phase === "fade" ? "intro-fade" : ""}`}
    >
      <img
        src="/images/duck-transparent.png"
        alt=""
        draggable={false}
        className="intro-duck"
      />
      <p className="intro-word">Erriour</p>
      <span className="intro-bar">
        <span />
      </span>
    </div>
  );
}
