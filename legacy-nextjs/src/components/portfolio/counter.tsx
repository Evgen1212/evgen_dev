"use client";

import { useEffect, useRef, useState } from "react";

type CounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

/**
 * Анимированный счётчик: число «накручивается» от 0 до value
 * при попадании в вьюпорт (easing outCubic, rAF без ре-рендеров родителя).
 * При prefers-reduced-motion сразу показывает финальное значение.
 */
export default function Counter({
  value,
  prefix,
  suffix,
  duration = 1600,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const dur = reduced ? 0 : duration;

    const io = new IntersectionObserver(
      (entries) => {
        if (started.current || !entries.some((e) => e.isIntersecting)) return;
        started.current = true;
        io.disconnect();

        const t0 = performance.now();
        const tick = (t: number) => {
          const p = dur === 0 ? 1 : Math.min((t - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(Math.round(eased * value));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
