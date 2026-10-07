import { ArrowDownRight } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        {/* Text */}
        <div data-reveal>
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
        </div>

        {/* Polaroid photo */}
        <div className="relative mx-auto w-full max-w-sm" data-reveal style={{ "--reveal-delay": "150ms" } as React.CSSProperties}>
          <p className="mb-3 flex items-center justify-end gap-1.5 pr-4 text-sm text-zinc-300">
            Это я
            <ArrowDownRight className="size-4" aria-hidden="true" />
          </p>
          <div className="group rotate-[4deg] rounded-2xl bg-white p-3 pb-16 shadow-2xl shadow-black/60 transition-transform duration-500 hover:rotate-1">
            <div className="overflow-hidden rounded-xl bg-zinc-800">

              <img
                src="/images/me.png"
                alt="Владимир (Erriour) — фотография"
                className="aspect-[4/5] w-full scale-[1.04] object-cover blur-[2px] transition-all duration-700 group-hover:blur-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
