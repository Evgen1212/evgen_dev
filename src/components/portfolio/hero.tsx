import { ArrowDownRight, ArrowRight, Zap } from "lucide-react";
import { heroServices } from "./data";
import { Marquee, MarqueeDot } from "./marquee";
import { cn } from "@/lib/utils";

function ServiceBadge({ emoji, badge, label }: { emoji?: string; badge?: string; label: string }) {
  return (
    <span className="flex items-center gap-3 whitespace-nowrap">
      {emoji ? (
        <span aria-hidden="true" className="text-xl sm:text-2xl">
          {emoji}
        </span>
      ) : (
        <span
          aria-hidden="true"
          className="grid h-7 min-w-7 place-items-center rounded-md bg-white/15 px-1.5 text-[11px] font-extrabold tracking-tight text-white/90"
        >
          {badge}
        </span>
      )}
      <span className="text-lg sm:text-xl font-medium text-white/90">{label}</span>
    </span>
  );
}

function CraftOutLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-display text-3xl sm:text-4xl font-bold italic tracking-tight text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      Craft
      <span className="grid size-9 sm:size-10 -skew-x-6 place-items-center rounded-xl border border-white/40 bg-white/10 backdrop-blur-sm">
        <Zap className="size-5 sm:size-6 fill-white text-white" />
      </span>
      Out
    </span>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* Aurora background (слои с разной глубиной параллакса) */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="parallax-slow absolute inset-[-6%]">
          <div className="aurora-layer aurora-a" />
        </div>
        <div className="parallax-deep absolute inset-[-6%]">
          <div className="aurora-layer aurora-b" />
        </div>
        {/* vignette to keep edges dark */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,10,11,0.7)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 px-5 pb-24 pt-32 sm:px-8 lg:grid-cols-[1.25fr_1fr] lg:gap-8 lg:pt-28">
        {/* Left: title */}
        <div data-reveal>
          <h1 className="font-display text-[21vw] font-light leading-[0.95] tracking-tight sm:text-[9rem] lg:text-[8.5rem] xl:text-[10rem]">
            Erriour
          </h1>
          <p className="mt-7 max-w-xl text-xl font-light leading-snug text-zinc-100/90 sm:text-2xl">
            От логотипа до логики — один специалист!
            <br />
            Веб-разработка любой сложности
          </p>
          <a
            href="#contact"
            className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-bold text-black shadow-xl shadow-black/40 transition-all duration-300 hover:scale-[1.04] hover:shadow-fuchsia-500/20 active:scale-95"
          >
            Хочу заказать
          </a>
        </div>

        {/* Right: latest work card */}
        <div className="relative hidden lg:block" data-reveal style={{ "--reveal-delay": "150ms" } as React.CSSProperties}>
          <p className="mb-3 ml-1 flex items-center gap-1.5 text-sm text-zinc-300">
            Одна из последних работ
            <ArrowDownRight className="size-4" aria-hidden="true" />
          </p>

          <a
            href="#cases"
            className="card-shine block rounded-[28px] bg-white p-3 shadow-2xl shadow-black/50 transition-transform duration-500 hover:-translate-y-1.5"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-black">
              
              <img
                src="/images/craftout.png"
                alt="CraftOut — игровая платформа"
                className="absolute inset-0 h-full w-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/40" />
              <div className="absolute inset-x-0 top-6 flex justify-center">
                <CraftOutLogo />
              </div>
              <div className="absolute inset-x-0 bottom-4 flex justify-center">
                <span className="rounded-full border border-white/25 bg-black/40 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm">
                  Игровая платформа · Full-stack
                </span>
              </div>
            </div>
            <div className="px-2 pb-1.5 pt-4 text-black">
              <div className="font-display text-lg font-bold">CraftOut</div>
              <div className="mt-0.5 text-sm text-black/60">Полный цикл разработки</div>
            </div>
          </a>

          <a
            href="#cases"
            className="group mt-4 ml-1 inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
          >
            Больше работ
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Duck */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-2 z-20"
        style={{ transform: "translate3d(0, calc(var(--scroll-y, 0) * -0.12px), 0)" }}
      >
        <img
          src="/images/duck-transparent.png"
          alt="Резиновая утка — маскот Erriour"
          className="animate-float pointer-events-none absolute bottom-0 right-[-16%] w-40 select-none drop-shadow-[0_30px_50px_rgba(0,0,0,0.55)] sm:w-64 md:right-[-6%] md:w-80 xl:w-[26rem] 2xl:w-[30rem]"
          draggable={false}
        />
      </div>

      {/* Services marquee */}
      <div className="relative z-10 border-t border-white/10 bg-black/25 backdrop-blur-md">
        <Marquee duration={38} pauseOnHover className="py-5">
          {heroServices.map((s) => (
            <span key={s.label} className="flex items-center">
              <ServiceBadge {...s} />
              <MarqueeDot />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
