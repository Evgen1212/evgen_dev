import { Quote, Star } from "lucide-react";
import { testimonials } from "./data";
import { SectionKicker } from "./section-heading";

export default function Testimonials() {
  return (
    <section id="reviews" className="relative scroll-mt-24 py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-1/4 top-16 size-96 rounded-full bg-fuchsia-900/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div data-reveal className="mb-12 text-center sm:mb-16">
          <SectionKicker>Отзывы</SectionKicker>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Что говорят клиенты
          </h2>
          <p className="mt-4 text-base text-zinc-400 sm:text-lg">
            несколько слов от тех, с кем я уже работал
          </p>
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              data-reveal
              style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
              className="card-shine group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-white/25 hover:bg-white/[0.05]"
            >
              <Quote
                aria-hidden="true"
                className="absolute right-5 top-5 size-8 text-white/[0.06] transition-colors duration-500 group-hover:text-fuchsia-400/25"
              />

              {/* звёзды */}
              <div
                className="flex gap-0.5"
                role="img"
                aria-label="Оценка 5 из 5"
              >
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    aria-hidden="true"
                    className="size-3.5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-zinc-300">
                {t.quote}
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3 border-t border-white/5 pt-4">
                {/* градиентное кольцо вокруг аватара */}
                <span
                  aria-hidden="true"
                  className="grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500/60 via-purple-500/30 to-white/10 p-[2px] transition-all duration-500 group-hover:from-fuchsia-400/90 group-hover:via-purple-400/60"
                >
                  <span className="grid size-full place-items-center rounded-full bg-[#141416] p-[3px]">
                    <span
                      className={`grid size-full place-items-center rounded-full bg-gradient-to-br ${t.gradient} font-display text-xs font-bold text-white shadow-lg`}
                    >
                      {t.initials}
                    </span>
                  </span>
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-display text-sm font-bold text-white">
                    {t.name}
                  </span>
                  <span className="block truncate text-xs text-zinc-500">
                    {t.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
