import CaseGrid from "./case-grid";
import { SectionKicker } from "./section-heading";

export default function Cases() {
  return (
    <section id="cases" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div data-reveal className="mb-12 text-center sm:mb-16">
          <SectionKicker>Портфолио</SectionKicker>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Кейсы
          </h2>
          <p className="mt-4 text-base text-zinc-400 sm:text-lg">
            одни из лучших работ за разное время
          </p>
        </div>

        <CaseGrid />
      </div>
    </section>
  );
}
