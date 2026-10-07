"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { socials } from "./data";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Все работы", href: "#cases" },
  { label: "Обо мне", href: "#about" },
  { label: "Цены", href: "#prices" },
  { label: "Обсудить задачу", href: "#contact" },
];

const pill =
  "bg-[#131315]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg shadow-black/30";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-5 pt-3 sm:pt-4">
      <div className="mx-auto flex max-w-7xl items-start justify-between gap-2">
        {/* left cluster: logo + nav */}
        <div className="flex items-center gap-2">
          <a
            href="#top"
            className={cn(pill, "flex items-center gap-2.5 py-2 pl-2 pr-4 sm:pr-5")}
            aria-label="Erriour — на главную"
          >
            <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-500 via-purple-600 to-indigo-700 text-lg shadow-inner">
              <span aria-hidden="true">🦆</span>
            </span>
            <span className="font-display text-lg font-bold tracking-tight">
              Erriour
            </span>
          </a>

          <nav
            className={cn(pill, "hidden lg:flex items-center px-2 py-1.5")}
            aria-label="Основная навигация"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-xl px-4 py-2 text-sm font-semibold text-zinc-200 transition-colors hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* right cluster: socials + burger */}
        <div className="flex items-center gap-2">
          <div
            className={cn(
              pill,
              "hidden md:flex items-center gap-0.5 px-2 py-2"
            )}
            aria-label="Социальные сети"
          >
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.name}
                aria-label={s.name}
                className="grid size-8 place-items-center rounded-lg transition-all hover:bg-white/10 hover:scale-110"
              >
                
                <img
                  src={`/icons/social/${s.icon}.svg`}
                  alt=""
                  width={16}
                  height={16}
                  className="size-4 opacity-80 hover:opacity-100"
                  loading="lazy"
                />
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            className={cn(pill, "lg:hidden grid size-11 place-items-center text-zinc-100")}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* mobile dropdown */}
      <div
        className={cn(
          "mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl transition-all duration-300 lg:hidden",
          open ? "max-h-96 opacity-100" : "pointer-events-none max-h-0 opacity-0"
        )}
      >
        <div className={cn(pill, "p-3")}>
          <nav className="grid gap-1" aria-label="Мобильная навигация">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-semibold text-zinc-100 transition-colors hover:bg-white/10"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-2 flex flex-wrap gap-1 border-t border-white/10 pt-3">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.name}
                aria-label={s.name}
                className="grid size-10 place-items-center rounded-xl transition-colors hover:bg-white/10"
              >
                
                <img
                  src={`/icons/social/${s.icon}.svg`}
                  alt=""
                  width={18}
                  height={18}
                  className="size-[18px] opacity-80"
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* subtle progress-like shadow once scrolled */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none fixed inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-black/50 to-transparent transition-opacity duration-500",
          scrolled ? "opacity-100" : "opacity-0"
        )}
      />
    </header>
  );
}
