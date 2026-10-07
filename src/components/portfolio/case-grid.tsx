"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, CalendarDays, ChevronLeft, ChevronRight, Clock, SlidersHorizontal, Sparkles, UserRound } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  caseCategories,
  caseDetails,
  type CaseCategory,
  type CaseDetail,
} from "./data";
import { caseArt } from "./case-art";
import { cn } from "@/lib/utils";

type GridItem = {
  id: keyof typeof caseDetails;
  className: string;
};

const rowOne: GridItem[] = [
  { id: "modern", className: "block h-64 md:h-72 lg:h-80" },
  { id: "craftout", className: "hidden h-64 md:block lg:h-80" },
  { id: "granline", className: "block h-64 md:h-72 lg:h-80" },
];

const rowTwo: GridItem[] = [
  { id: "lawyer", className: "block aspect-square" },
  { id: "shadows", className: "block aspect-square" },
  { id: "mineplay", className: "block aspect-square" },
  { id: "cataclysm", className: "block aspect-square" },
];

const allItems: GridItem[] = [...rowOne, ...rowTwo];

function CaseCell({
  id,
  className,
  eager = false,
  delay = 0,
  onOpen,
}: {
  id: GridItem["id"];
  className: string;
  /** true — без data-reveal (для отфильтрованных карточек, анимация filter-in) */
  eager?: boolean;
  delay?: number;
  onOpen: (d: CaseDetail) => void;
}) {
  const detail = caseDetails[id];
  const Art = caseArt[id];
  if (!detail || !Art) return null;

  return (
    <button
      type="button"
      onClick={() => onOpen(detail)}
      data-reveal={eager ? undefined : true}
      style={eager ? { animationDelay: `${delay}ms` } : undefined}
      aria-label={`${detail.title} — открыть детали кейса`}
      className={cn("cursor-pointer text-left", className, eager && "filter-in")}
    >
      <span className="card-shine group relative block h-full w-full overflow-hidden rounded-3xl border border-white/10 shadow-lg shadow-black/40 transition-all duration-500 hover:-translate-y-1.5 hover:border-white/25 hover:shadow-2xl hover:shadow-black/60">
        <Art />
        {/* hover overlay */}
        <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/20 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <span className="translate-y-3 transition-transform duration-500 group-hover:translate-y-0">
            <span className="block text-[11px] font-bold uppercase tracking-[0.22em] text-fuchsia-300">
              {detail.tag}
            </span>
            <span className="flex items-center gap-1.5 font-display text-xl font-bold text-white">
              {detail.title}
              <ArrowUpRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
            </span>
          </span>
        </span>
      </span>
    </button>
  );
}

export default function CaseGrid() {
  const [active, setActive] = useState<CaseDetail | null>(null);
  const [filter, setFilter] = useState<CaseCategory | "all">("all");
  const ActiveArt = active ? caseArt[active.id] : null;
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  // Порядок кейсов для навигации «предыдущий / следующий»
  const order = allItems.map((i) => i.id);

  // Счётчики чипсов фильтра
  const counts = useMemo(() => {
    const map: Record<string, number> = { all: allItems.length };
    for (const item of allItems) {
      const c = caseDetails[item.id]?.category;
      if (c) map[c] = (map[c] ?? 0) + 1;
    }
    return map;
  }, []);

  const filtered = useMemo(
    () =>
      filter === "all"
        ? allItems
        : allItems.filter((i) => caseDetails[i.id]?.category === filter),
    [filter]
  );

  function stepCase(id: string, dir: 1 | -1) {
    const idx = order.indexOf(id as (typeof order)[number]);
    if (idx === -1) return;
    const nextId = order[(idx + dir + order.length) % order.length];
    setActive(caseDetails[nextId]);
  }

  // Стрелки клавиатуры в открытой модалке
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") stepCase(active.id, 1);
      else if (e.key === "ArrowLeft") stepCase(active.id, -1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active?.id]);

  // Свайп на сенсорных экранах: горизонтальный жест > 64px листает кейс
  function onTouchStart(e: React.TouchEvent) {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (!touchStart.current || !active) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) > 64 && Math.abs(dx) > Math.abs(dy) * 1.6) {
      stepCase(active.id, dx < 0 ? 1 : -1);
    }
  }

  const activeIdx = active ? order.indexOf(active.id) : -1;
  const prevCase = active ? caseDetails[order[(activeIdx - 1 + order.length) % order.length]] : null;
  const nextCase = active ? caseDetails[order[(activeIdx + 1) % order.length]] : null;

  return (
    <>
      {/* фильтр портфолио */}
      <div
        data-reveal
        role="group"
        aria-label="Фильтр кейсов по типу"
        className="mb-8 flex flex-wrap items-center gap-2 sm:mb-10"
      >
        <SlidersHorizontal
          className="mr-1 size-4 text-zinc-600"
          aria-hidden="true"
        />
        {caseCategories.map((cat) => {
          const isActive = filter === cat.key;
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => setFilter(cat.key)}
              aria-pressed={isActive}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 active:scale-95",
                isActive
                  ? "border-transparent bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg shadow-fuchsia-900/30"
                  : "border-white/10 bg-white/[0.04] text-zinc-400 hover:border-white/25 hover:text-zinc-200"
              )}
            >
              {cat.label}
              <span
                className={cn(
                  "rounded-full px-1.5 text-[10px] font-bold leading-4",
                  isActive ? "bg-black/25 text-white" : "bg-white/10 text-zinc-500"
                )}
              >
                {counts[cat.key] ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      {filter === "all" ? (
        <>
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-[1fr_1.95fr_1fr]">
            {rowOne.map((item) => (
              <CaseCell key={item.id} id={item.id} className={item.className} onOpen={setActive} />
            ))}
          </div>

          <div className="mt-4 grid gap-4 sm:mt-5 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {rowTwo.map((item) => (
              <CaseCell key={item.id} id={item.id} className={item.className} onOpen={setActive} />
            ))}
          </div>
        </>
      ) : (
        <div
          key={filter}
          className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((item, i) => (
            <CaseCell
              key={`${filter}-${item.id}`}
              id={item.id}
              className="block h-64 md:h-72 lg:h-80"
              eager
              delay={i * 70}
              onOpen={setActive}
            />
          ))}
        </div>
      )}

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="max-h-[90vh] gap-0 overflow-hidden overflow-y-auto rounded-3xl border-white/10 bg-[#141416] p-0 text-white sm:max-w-2xl"
        >
          {active && (
            <>
              <DialogTitle className="sr-only">{active.title}</DialogTitle>
              <DialogDescription className="sr-only">
                {active.tag} — {active.year}
              </DialogDescription>

              <div className="group relative aspect-[16/9] w-full overflow-hidden">
                {ActiveArt && <ActiveArt />}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#141416] to-transparent p-5 pt-14">
                  <span className="rounded-full border border-fuchsia-400/30 bg-fuchsia-500/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-fuchsia-300">
                    {active.tag}
                  </span>
                  <p className="mt-2 font-display text-xl font-bold text-white drop-shadow-lg sm:text-2xl">
                    {active.title}
                  </p>
                </div>
              </div>

              <div className="space-y-6 p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="font-display text-2xl font-bold sm:text-3xl">
                    {active.title}
                  </h3>
                  <div className="flex gap-4 text-xs text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="size-3.5" aria-hidden="true" />
                      {active.year}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-3.5" aria-hidden="true" />
                      {active.timeline}
                    </span>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">
                  {active.description}
                </p>

                <div>
                  <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                    Результаты
                  </div>
                  <ul className="grid gap-2.5 sm:grid-cols-2">
                    {active.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-zinc-200">
                        <Sparkles className="mt-0.5 size-4 shrink-0 text-fuchsia-400" aria-hidden="true" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                    Стек
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {active.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-1.5 text-xs font-semibold text-zinc-200"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-zinc-300">
                  <UserRound className="size-4 shrink-0 text-zinc-500" aria-hidden="true" />
                  {active.role}
                </div>

                {/* навигация между кейсами */}
                <nav
                  aria-label="Навигация по кейсам"
                  className="flex items-center justify-between gap-2"
                >
                  <button
                    type="button"
                    onClick={() => stepCase(active.id, -1)}
                    className="group flex min-w-0 items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <ChevronLeft className="size-4 shrink-0 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
                    <span className="truncate">{prevCase?.title}</span>
                  </button>
                  <span className="shrink-0 font-display text-xs font-bold text-zinc-500">
                    {activeIdx + 1} / {order.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => stepCase(active.id, 1)}
                    className="group flex min-w-0 items-center justify-end gap-1.5 rounded-xl px-3 py-2 text-right text-xs font-semibold text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <span className="truncate">{nextCase?.title}</span>
                    <ChevronRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </button>
                </nav>
                <p className="sr-only">
                  Переключение кейсов также доступно стрелками ← и →, а на
                  сенсорных экранах — свайпом влево и вправо
                </p>

                <a
                  href="#contact"
                  onClick={() => setActive(null)}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-bold text-black transition-all hover:scale-[1.02] active:scale-95"
                >
                  Хочу похожий проект
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
