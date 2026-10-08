"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Calculator,
  CalendarClock,
  Check,
  ChevronRight,
  Link2,
  RotateCcw,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  calcProjects,
  calcExtras,
  RUSH_MULT,
  pluralDays,
  type CalcProjectKey,
  type CalcExtraKey,
} from "./data";

const fmt = new Intl.NumberFormat("ru-RU");

/** Deep-link расчёта: ?calc=<project>[.<extra>…][.r] — компактно и читаемо */
function encodeCalc(project: string, extras: Set<string>, rush: boolean) {
  return [project, ...[...extras], ...(rush ? ["r"] : [])].join(".");
}

function syncCalcUrl(project: string, extras: Set<string>, rush: boolean) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  url.searchParams.set("calc", encodeCalc(project, extras, rush));
  const qs = url.searchParams.toString();
  window.history.replaceState(null, "", url.pathname + `?${qs}` + url.hash);
}

function clearCalcUrl() {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  url.searchParams.delete("calc");
  const qs = url.searchParams.toString();
  window.history.replaceState(
    null,
    "",
    url.pathname + (qs ? `?${qs}` : "") + url.hash
  );
}

export default function PriceCalculator() {
  const { toast } = useToast();
  const [project, setProject] = useState<CalcProjectKey>("multipage");
  const [extras, setExtras] = useState<Set<CalcExtraKey>>(() => new Set(["admin"]));
  const [rush, setRush] = useState(false);

  const { price, days, projectLabel } = useMemo(() => {
    const p = calcProjects.find((x) => x.key === project) ?? calcProjects[1];
    let sum = p.base;
    let d = p.days;
    calcExtras.forEach((e) => {
      if (extras.has(e.key)) {
        sum += e.price;
        d += e.days;
      }
    });
    if (rush) {
      sum = Math.round((sum * RUSH_MULT) / 1000) * 1000;
      d = Math.max(3, Math.ceil(d * 0.7));
    }
    return { price: sum, days: d, projectLabel: p.label };
  }, [project, extras, rush]);

  function toggleExtra(key: CalcExtraKey) {
    const next = new Set(extras);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setExtras(next);
    syncCalcUrl(project, next, rush);
  }

  function chooseProject(key: CalcProjectKey) {
    setProject(key);
    syncCalcUrl(key, extras, rush);
  }

  function toggleRush() {
    const next = !rush;
    setRush(next);
    syncCalcUrl(project, extras, next);
  }

  function reset() {
    setProject("multipage");
    setExtras(new Set(["admin"]));
    setRush(false);
    clearCalcUrl();
  }

  /** Восстановление расчёта из ?calc=… (rAF — без set-state-in-effect) */
  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get("calc");
    if (!raw) return;
    const parts = raw.split(".");
    const p = calcProjects.find((x) => x.key === parts[0]);
    if (!p) return;
    const raf = requestAnimationFrame(() => {
      setProject(p.key);
      const nextExtras = new Set<CalcExtraKey>();
      for (const part of parts.slice(1)) {
        if (part === "r") setRush(true);
        else {
          const e = calcExtras.find((x) => x.key === part);
          if (e) nextExtras.add(e.key);
        }
      }
      setExtras(nextExtras);
      toast({
        title: "Расчёт восстановлен из ссылки",
        description: `${p.label}${nextExtras.size ? ` + ${nextExtras.size} доп. опции` : ""}`,
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [toast]);

  const chosenExtras = calcExtras.filter((e) => extras.has(e.key));

  const message = [
    "Здравствуйте! Прикинул бюджет на калькуляторе сайта:",
    `«${projectLabel}»`,
    chosenExtras.length > 0
      ? `+ ${chosenExtras.map((e) => e.label.toLowerCase()).join(", ")}`
      : null,
    rush ? "срочность ×1,3" : null,
    `— ориентировочно ${fmt.format(price)} ₽ и ~${pluralDays(days)}.`,
    "Хочу обсудить детали!",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      data-reveal
      className="relative mt-10 rounded-3xl bg-gradient-to-br from-fuchsia-500/40 via-purple-500/15 to-transparent p-px sm:mt-12"
    >
      <div className="relative overflow-hidden rounded-[calc(1.5rem-1px)] bg-[#121214]">
        {/* шапка калькулятора */}
        <div className="flex items-center justify-between gap-3 border-b border-white/10 p-5 sm:px-7">
          <div className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-fuchsia-500/25 via-purple-500/15 to-transparent">
              <Calculator className="size-5 text-fuchsia-300" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-display text-lg font-bold sm:text-xl">
                Калькулятор проекта
              </h3>
              <p className="text-xs text-zinc-500 sm:text-sm">
                предварительная оценка за 30 секунд
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={reset}
            title="Сбросить настройки"
            aria-label="Сбросить настройки калькулятора"
            className="grid size-9 shrink-0 place-items-center rounded-xl border border-white/10 text-zinc-500 transition-colors hover:border-white/25 hover:text-white"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid lg:grid-cols-[1.45fr_1fr]">
          {/* настройки */}
          <div className="space-y-6 p-5 sm:p-7">
            <fieldset>
              <legend className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                Тип проекта
              </legend>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {calcProjects.map((p) => {
                  const isActive = project === p.key;
                  return (
                    <button
                      key={p.key}
                      type="button"
                      onClick={() => chooseProject(p.key)}
                      aria-pressed={isActive}
                      className={cn(
                        "rounded-2xl border p-4 text-left transition-all duration-300 hover:-translate-y-0.5",
                        isActive
                          ? "border-fuchsia-400/50 bg-fuchsia-500/10 shadow-lg shadow-fuchsia-900/20"
                          : "border-white/10 bg-white/[0.03] hover:border-white/25"
                      )}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span className="font-display text-sm font-bold text-white">
                          {p.label}
                        </span>
                        <span
                          className={cn(
                            "grid size-4 shrink-0 place-items-center rounded-full border transition-colors",
                            isActive
                              ? "border-fuchsia-400 bg-fuchsia-500 text-white"
                              : "border-white/25"
                          )}
                        >
                          {isActive && (
                            <Check className="size-2.5" aria-hidden="true" />
                          )}
                        </span>
                      </span>
                      <span className="mt-0.5 block text-xs text-zinc-500">
                        {p.hint}
                      </span>
                      <span className="mt-2 block text-xs font-semibold text-fuchsia-300/90">
                        от {fmt.format(p.base)} ₽
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                Дополнительно
              </legend>
              <div className="flex flex-wrap gap-2">
                {calcExtras.map((e) => {
                  const on = extras.has(e.key);
                  return (
                    <button
                      key={e.key}
                      type="button"
                      onClick={() => toggleExtra(e.key)}
                      aria-pressed={on}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-300 active:scale-95",
                        on
                          ? "border-fuchsia-400/40 bg-fuchsia-500/10 text-white"
                          : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/25 hover:text-zinc-200"
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-4 place-items-center rounded-[5px] border transition-colors",
                          on
                            ? "border-fuchsia-400 bg-fuchsia-500 text-white"
                            : "border-white/25"
                        )}
                      >
                        {on && <Check className="size-3" aria-hidden="true" />}
                      </span>
                      {e.label}
                      <span className="text-xs text-zinc-500">
                        +{fmt.format(e.price)} ₽
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={toggleRush}
                aria-pressed={rush}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 active:scale-95",
                  rush
                    ? "border-amber-400/50 bg-amber-500/10 text-amber-200"
                    : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/25 hover:text-zinc-200"
                )}
              >
                <Zap
                  className={cn("size-4", rush && "fill-amber-300 text-amber-300")}
                  aria-hidden="true"
                />
                Срочно ×1,3 — срок короче
              </button>
            </div>
          </div>

          {/* итог */}
          <div className="dot-grid relative flex flex-col border-t border-white/10 p-6 sm:p-7 lg:border-l lg:border-t-0">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
              Предварительно
            </p>
            <p className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              <span className="bg-gradient-to-r from-fuchsia-300 to-purple-300 bg-clip-text text-transparent">
                {fmt.format(price)} ₽
              </span>
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm text-zinc-400">
              <CalendarClock className="size-4 shrink-0 text-fuchsia-300" aria-hidden="true" />
              срок ≈ {pluralDays(days)}
            </p>
            {rush && (
              <p className="mt-1.5 text-xs text-amber-300/90">
                применён коэффициент срочности ×1,3
              </p>
            )}

            <a
              href="#contact"
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent("erriour:prefill", {
                    detail: { taskType: project, message },
                  })
                );
              }}
              className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-black transition-all hover:scale-[1.02] hover:bg-white active:scale-95 lg:mt-auto"
            >
              Перенести в заявку
              <ChevronRight className="size-4" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => {
                const url = new URL(window.location.href);
                url.searchParams.set("calc", encodeCalc(project, extras, rush));
                const link = url.toString();
                navigator.clipboard
                  .writeText(link)
                  .then(() =>
                    toast({
                      title: "Ссылка на расчёт скопирована",
                      description: "Открыв её, получатель увидит эту же конфигурацию",
                    })
                  )
                  .catch(() =>
                    toast({ title: "Скопируйте ссылку вручную", description: link })
                  );
              }}
              className="group/calc mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-zinc-500 transition-colors hover:text-fuchsia-300"
            >
              <Link2 className="size-3.5 transition-transform group-hover/calc:-rotate-45" aria-hidden="true" />
              Скопировать ссылку на расчёт
            </button>
            <p className="mt-3 text-[11px] leading-relaxed text-zinc-600">
              Расчёт ни к чему не обязывает — точную смету зафиксируем после
              обсуждения задачи.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
