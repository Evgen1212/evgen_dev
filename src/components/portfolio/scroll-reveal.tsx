"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            io.unobserve(entry.target);
          }
        });
      },
      // threshold 0 — высокие секции раскрываются сразу при появлении,
      // rootMargin даёт небольшое упреждение (элемент виден на 40px раньше).
      { threshold: 0, rootMargin: "0px 0px -40px 0px" }
    );

    const observeAll = (root: ParentNode) => {
      const els = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
      if (reduced) {
        els.forEach((el) => el.classList.add("revealed"));
      } else {
        els.forEach((el) => {
          if (!el.classList.contains("revealed")) io.observe(el);
        });
      }
    };

    observeAll(document);

    // Динамически смонтированные [data-reveal] (например, карточка «Заявка
    // отправлена» после сабмита) тоже должны раскрываться — следим за DOM.
    let mutationRaf = 0;
    const mo = new MutationObserver((mutations) => {
      let hasNew = false;
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (
            node instanceof HTMLElement &&
            (node.hasAttribute("data-reveal") ||
              node.querySelector("[data-reveal]"))
          ) {
            hasNew = true;
            break;
          }
        }
        if (hasNew) break;
      }
      if (!hasNew || mutationRaf) return;
      mutationRaf = requestAnimationFrame(() => {
        mutationRaf = 0;
        observeAll(document);
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      if (mutationRaf) cancelAnimationFrame(mutationRaf);
    };
  }, []);

  return null;
}
