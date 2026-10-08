import { techRows } from "./data";
import { Marquee, MarqueeDot } from "./marquee";
import { SectionKicker } from "./section-heading";
import { cn } from "@/lib/utils";

function TechRow({
  items,
  duration,
  reverse = false,
  className,
}: {
  items: { label: string; icon?: string; emoji?: string }[];
  duration: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <Marquee duration={duration} reverse={reverse} pauseOnHover className={className}>
      {items.map((item) => (
        <span key={item.label} className="flex items-center">
          <span className="flex items-center gap-3 whitespace-nowrap">
            {item.icon ? (
               
              <img
                src={`/icons/tech/${item.icon}.svg`}
                alt=""
                width={26}
                height={26}
                className="size-6 sm:size-7 shrink-0"
                loading="lazy"
              />
            ) : (
              <span aria-hidden="true" className="text-xl sm:text-2xl leading-none">
                {item.emoji}
              </span>
            )}
            <span className="text-lg sm:text-2xl font-medium text-white/85">
              {item.label}
            </span>
          </span>
          <MarqueeDot />
        </span>
      ))}
    </Marquee>
  );
}

export default function Tech() {
  return (
    <section id="tech" className="relative scroll-mt-24 py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-80 w-[50rem] max-w-full -translate-x-1/2 rounded-full bg-fuchsia-900/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div data-reveal className="mb-12 text-center sm:mb-16">
          <SectionKicker>Стек</SectionKicker>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Технологии
          </h2>
          <p className="mt-4 text-base text-zinc-400 sm:text-lg">
            которые я знаю и использую в проектах
          </p>
        </div>
      </div>

      <div data-reveal className="relative space-y-7 sm:space-y-9">
        <TechRow items={techRows[0]} duration={52} />
        <TechRow items={techRows[1]} duration={58} reverse />
        <TechRow items={techRows[2]} duration={55} />
      </div>
    </section>
  );
}
