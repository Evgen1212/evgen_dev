import { Layers, Scale, Skull, Zap } from "lucide-react";
import type { ReactNode } from "react";

/* ---------- CSS-art covers for cases ---------- */

function ModernCitiArt() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-sky-500 via-blue-600 to-blue-800">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="absolute left-6 top-6 sm:left-8 sm:top-8">
        <Layers className="mb-3 size-10 fill-white/20 text-white" aria-hidden="true" />
        <div className="font-display text-2xl sm:text-3xl font-extrabold leading-none tracking-tight text-white">
          MODERN
        </div>
        <div className="mt-1 text-base sm:text-lg font-medium tracking-[0.35em] text-white/85">
          CITI GROUP
        </div>
      </div>
      {/* mini site mockup */}
      <div className="absolute bottom-[-8%] right-[-4%] w-[62%] rotate-[-4deg] rounded-tl-2xl bg-white p-3 shadow-2xl">
        <div className="mb-2 flex gap-1">
          <span className="size-1.5 rounded-full bg-zinc-300" />
          <span className="size-1.5 rounded-full bg-zinc-300" />
          <span className="size-1.5 rounded-full bg-zinc-300" />
        </div>
        <div className="h-2 w-3/4 rounded bg-blue-200" />
        <div className="mt-1.5 h-2 w-1/2 rounded bg-zinc-200" />
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          <div className="h-10 rounded-md bg-zinc-100" />
          <div className="h-10 rounded-md bg-blue-100" />
          <div className="h-10 rounded-md bg-zinc-100" />
        </div>
      </div>
    </div>
  );
}

function CraftOutArt({ compact = false }: { compact?: boolean }) {
  return (
    <div className="absolute inset-0 bg-black">
      
      <img
        src="/images/craftout.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/50" />
      <div
        className={compact ? "absolute inset-x-0 top-5 flex justify-center" : "absolute inset-x-0 top-8 flex justify-center"}
      >
        <span className="inline-flex items-center gap-1 font-display text-2xl sm:text-3xl font-bold italic tracking-tight text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.85)]">
          Craft
          <span className="mx-0.5 grid size-8 sm:size-9 -skew-x-6 place-items-center rounded-lg border border-white/40 bg-white/10 backdrop-blur-sm">
            <Zap className="size-4 sm:size-5 fill-white text-white" />
          </span>
          Out
        </span>
      </div>
    </div>
  );
}

function GranlineArt() {
  return (
    <div className="absolute inset-0">
      
      <img
        src="/images/granline.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
      <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/15 bg-black/45 px-3 py-2 backdrop-blur-md">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">ГранЛайн</div>
        <div className="text-xs font-medium text-white/90">Декоративная и архитектурная подсветка</div>
      </div>
    </div>
  );
}

function LawyerArt() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, transparent, transparent 12px, rgba(255,255,255,.5) 13px, transparent 14px)",
        }}
      />
      <div className="absolute left-5 top-5 flex items-center gap-3 sm:left-7 sm:top-7">
        <span className="grid size-12 place-items-center rounded-xl border border-zinc-600 bg-zinc-800/80 shadow-lg">
          <Scale className="size-6 text-zinc-100" aria-hidden="true" />
        </span>
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">Адвокат</div>
          <div className="font-serif text-lg font-semibold text-zinc-100">Маркин А.Е.</div>
        </div>
      </div>
      <div className="absolute bottom-5 left-7 right-7">
        <div className="h-px w-full bg-gradient-to-r from-zinc-600 to-transparent" />
        <div className="mt-2 text-[11px] text-zinc-500">Юридическая помощь · Челябинск</div>
      </div>
    </div>
  );
}

function ShadowsArt() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0d0a16]">
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/35 blur-3xl" />
      {/* floating cubes */}
      <div aria-hidden="true" className="absolute right-[14%] top-[18%] size-10 rotate-12 rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-800 opacity-80 shadow-lg shadow-purple-900/50" />
      <div aria-hidden="true" className="absolute left-[16%] bottom-[16%] size-7 -rotate-12 rounded-md bg-gradient-to-br from-fuchsia-600 to-purple-900 opacity-70" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-700 font-display text-3xl font-bold text-white shadow-xl shadow-purple-900/60">
          S
        </span>
        <span className="text-center font-display text-xl sm:text-2xl font-extrabold leading-tight tracking-wide text-white">
          SHADOWS
          <br />
          PROJECT
        </span>
      </div>
    </div>
  );
}

function MinePlayArt() {
  return (
    <div className="absolute inset-0 bg-[#f4f6f8]">
      {/* pixel blocks */}
      <div aria-hidden="true" className="absolute right-[10%] top-[16%] grid grid-cols-2 gap-1 opacity-90">
        <span className="size-5 rounded-[3px] bg-emerald-500" />
        <span className="size-5 rounded-[3px] bg-emerald-700" />
        <span className="size-5 rounded-[3px] bg-emerald-400" />
        <span className="size-5 rounded-[3px] bg-emerald-600" />
      </div>
      <div aria-hidden="true" className="absolute left-[12%] bottom-[18%] size-8 rounded-[4px] bg-amber-300/90" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <span className="flex items-center gap-2.5">
          <span className="grid h-0 w-0 border-y-[14px] border-l-[22px] border-y-transparent border-l-emerald-500" aria-hidden="true" />
          <span className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
            MINE <span className="text-emerald-500">PLAY</span>
          </span>
        </span>
        <span className="rounded-full bg-zinc-900 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400">
          Minecraft сервер
        </span>
      </div>
    </div>
  );
}

function CataclysmArt() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <div aria-hidden="true" className="absolute left-[20%] top-[30%] size-72 rounded-full bg-zinc-700/25 blur-3xl" />
      <div aria-hidden="true" className="absolute right-[10%] bottom-[10%] size-56 rounded-full bg-red-900/20 blur-3xl" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <span className="grid size-16 place-items-center [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)] border border-white/25 bg-white/5">
          <Skull className="size-8 text-white" aria-hidden="true" />
        </span>
        <span className="text-center font-display text-xl sm:text-2xl font-extrabold leading-tight tracking-wide text-white drop-shadow-lg">
          PROJECT
          <br />
          CATACLYSM
        </span>
      </div>
    </div>
  );
}

function UnderBornArt() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0c0a09]">
      <div aria-hidden="true" className="absolute left-1/2 top-[58%] size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="absolute inset-0 flex items-center justify-center gap-5 sm:gap-8">
        <svg viewBox="0 0 120 90" className="h-24 w-32 shrink-0 sm:h-28 sm:w-36" aria-hidden="true">
          <path
            d="M 14 84 A 46 46 0 0 1 106 84"
            fill="none"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {[22, 34, 46, 60, 74, 86, 98].map((x, i) => (
            <path
              key={x}
              d={`M ${x} 84 l 0 ${6 + (i % 3) * 3}`}
              stroke="white"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          ))}
          <text x="60" y="52" textAnchor="middle" fontSize="30">
            ☁️
          </text>
        </svg>
        <div className="font-display text-3xl sm:text-5xl font-extrabold leading-[0.95] tracking-tight text-white">
          UNDER
          <br />
          BORN
        </div>
      </div>
    </div>
  );
}

function HostFeedArt() {
  return (
    <div className="absolute inset-0">
      
      <img
        src="/images/hostfeed.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/25 via-transparent to-blue-900/30" />
      <div className="absolute left-6 top-6 flex items-center gap-3 sm:left-9 sm:top-9">
        <span className="font-display text-3xl sm:text-5xl font-light tracking-tight text-white drop-shadow-md">
          Host
        </span>
        <span className="rounded-2xl bg-white px-4 py-1.5 font-display text-3xl sm:text-5xl font-bold tracking-tight text-blue-600 shadow-xl">
          Feed
        </span>
      </div>
    </div>
  );
}

/* ---------- Card wrapper ---------- */

type CaseCardProps = {
  title: string;
  tag: string;
  children: ReactNode;
  className?: string;
  href?: string;
};

function CaseCard({ title, tag, children, className, href = "#contact" }: CaseCardProps) {
  return (
    <a
      href={href}
      data-reveal
      className={className}
      aria-label={`${title} — подробнее`}
    >
      <div className="card-shine group relative h-full w-full overflow-hidden rounded-3xl border border-white/10 shadow-lg shadow-black/40 transition-all duration-500 hover:-translate-y-1.5 hover:border-white/25 hover:shadow-2xl hover:shadow-black/60">
        {children}
        {/* hover overlay */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/20 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="translate-y-3 transition-transform duration-500 group-hover:translate-y-0">
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-fuchsia-300">{tag}</div>
            <div className="font-display text-xl font-bold text-white">{title}</div>
          </div>
        </div>
      </div>
    </a>
  );
}

/* ---------- Section ---------- */

export default function Cases() {
  return (
    <section id="cases" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div data-reveal className="mb-12 text-center sm:mb-16">
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Кейсы
          </h2>
          <p className="mt-4 text-base text-zinc-400 sm:text-lg">
            одни из лучших работ за разное время
          </p>
        </div>

        {/* Row 1: 3 cards, middle wider */}
        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-[1fr_1.95fr_1fr]">
          <CaseCard title="Modern Citi Group" tag="Корпоративный сайт" className="block h-64 md:h-72 lg:h-80">
            <ModernCitiArt />
          </CaseCard>
          <CaseCard title="CraftOut" tag="Игровая платформа · Full-stack" className="hidden h-64 md:block lg:h-80">
            <CraftOutArt />
          </CaseCard>
          <CaseCard title="ГранЛайн" tag="Сайт + каталог" className="block h-64 md:h-72 lg:h-80">
            <GranlineArt />
          </CaseCard>
        </div>

        {/* Row 2: 4 cards */}
        <div className="mt-4 grid gap-4 sm:mt-5 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <CaseCard title="Адвокат Маркин А.Е." tag="Сайт юриста" className="block aspect-square">
            <LawyerArt />
          </CaseCard>
          <CaseCard title="Shadows Project" tag="Брендинг + сайт" className="block aspect-square">
            <ShadowsArt />
          </CaseCard>
          <CaseCard title="Mine Play" tag="Игровой портал" className="block aspect-square">
            <MinePlayArt />
          </CaseCard>
          <CaseCard title="Project Cataclysm" tag="Промо-сайт игры" className="block aspect-square">
            <CataclysmArt />
          </CaseCard>
        </div>
      </div>
    </section>
  );
}

export { CraftOutArt, UnderBornArt, HostFeedArt };
