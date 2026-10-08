"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Мобильная липкая CTA-панель (конверсия):
 * - появляется, когда hero уехал наверх;
 * - прячется, когда на экране контакты (CTA больше не нужна)
 *   или футер (не перекрывает нижнюю навигацию).
 * На <html> выставляет data-sticky-cta="on" — по этому атрибуту CSS
 * приподнимает кнопку «наверх», чтобы она не конфликтовала с панелью.
 */
export default function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const targets = [
      document.getElementById("top"), // hero
      document.getElementById("contact"),
      document.querySelector("footer"),
    ];
    if (targets.some((t) => !t)) return;

    let pastHero = false;
    let contactVisible = false;
    let footerVisible = false;

    const update = () =>
      setShow(pastHero && !contactVisible && !footerVisible);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id =
            entry.target instanceof HTMLElement ? entry.target.id : "";
          if (id === "top") pastHero = !entry.isIntersecting;
          else if (id === "contact") contactVisible = entry.isIntersecting;
          else footerVisible = entry.isIntersecting;
        }
        update();
      },
      // панель появляется чуть раньше, чем hero полностью уйдёт
      { rootMargin: "-96px 0px 0px 0px" }
    );

    targets.forEach((t) => t && observer.observe(t));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.dataset.stickyCta = show ? "on" : "off";
    return () => {
      delete document.documentElement.dataset.stickyCta;
    };
  }, [show]);

  return (
    <div
      aria-hidden={!show}
      inert={!show}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 transition-transform duration-500 ease-out md:hidden",
        show ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="border-t border-white/10 bg-black/85 px-4 pt-3 pb-[calc(0.85rem+env(safe-area-inset-bottom))] backdrop-blur-xl">
        <div className="mx-auto flex max-w-2xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-bold text-white">
              Есть задача?
            </p>
            <p className="truncate text-[11px] leading-tight text-zinc-400">
              Отвечу в течение дня
            </p>
          </div>
          <a
            href="#contact"
            tabIndex={show ? 0 : -1}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-purple-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-fuchsia-900/40 transition-transform hover:scale-[1.03] active:scale-95"
          >
            Обсудить задачу
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
