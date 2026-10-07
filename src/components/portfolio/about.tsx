import { ArrowDownRight } from "lucide-react";
import Counter from "./counter";
import { SectionKicker } from "./section-heading";

const stats = [
  { value: 6, suffix: "+", label: "лет в веб-разработке" },
  { value: 40, suffix: "+", label: "проектов сдано в срок" },
  { value: 30, suffix: "+", label: "довольных клиентов" },
  { value: 98, suffix: "%", label: "клиентов возвращаются" },
];

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/3 size-96 rounded-full bg-indigo-900/10 blur-3xl"
      />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        {/* Text */}
        <div data-reveal>
          <SectionKicker>Кто я</SectionKicker>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Обо мне
          </h2>
          <div className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-zinc-300 sm:text-lg">
            <p>
              Меня зовут Владимир, я веб-разработчик с большим опытом работы в
              создании современных и удобных сайтов. Окончил магистратуру
              Университета ИТМО по специальности «Веб-разработка». Работал как
              самостоятельно, так и в команде — у меня есть опыт разработки от
              простых лендингов до действительно сложных проектов!
            </p>
            <p>
              Беру на себя как разработку с нуля, так и доработку существующих
              проектов — от лендингов до сложных многостраничных сайтов. Если
              вам нужен сайт, который будет не просто «чтобы был», а
              действительно поможет вашему делу — вы по адресу.
            </p>
          </div>

          {/* Counters */}
          <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-white/20"
              >
                <dd className="font-display text-3xl font-bold tracking-tight">
                  <Counter
                    value={s.value}
                    suffix={s.suffix}
                    className="bg-gradient-to-r from-fuchsia-300 to-purple-300 bg-clip-text text-transparent"
                  />
                </dd>
                <dt className="mt-1.5 text-xs leading-snug text-zinc-500">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        {/* Polaroid photo */}
        <div
          className="relative mx-auto w-full max-w-sm"
          data-reveal
          style={{ "--reveal-delay": "150ms" } as React.CSSProperties}
        >
          <p className="mb-3 flex items-center justify-end gap-1.5 pr-4 text-sm text-zinc-300">
            Это я
            <ArrowDownRight className="size-4" aria-hidden="true" />
          </p>
          <div className="group relative rotate-[4deg] rounded-2xl bg-white p-3 pb-16 shadow-2xl shadow-black/60 transition-transform duration-500 hover:rotate-1">
            {/* скотч-полоски */}
            <span
              aria-hidden="true"
              className="absolute -top-3 left-7 z-10 h-7 w-24 -rotate-6 rounded-[2px] bg-white/30 shadow-[0_2px_6px_rgba(0,0,0,0.25)] backdrop-blur-[1px]"
            />
            <span
              aria-hidden="true"
              className="absolute -top-2 right-9 z-10 h-7 w-20 rotate-[5deg] rounded-[2px] bg-white/25 shadow-[0_2px_6px_rgba(0,0,0,0.25)] backdrop-blur-[1px]"
            />
            <div className="overflow-hidden rounded-xl bg-zinc-800">
              <img
                src="/images/me.png"
                alt="Владимир (Erriour) — фотография"
                className="aspect-[4/5] w-full scale-[1.04] object-cover blur-[2px] transition-all duration-700 group-hover:blur-0"
                loading="lazy"
              />
            </div>
            <p className="absolute inset-x-0 bottom-4 text-center font-display text-base font-medium text-zinc-500">
              Владимир · веб-разработчик
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
