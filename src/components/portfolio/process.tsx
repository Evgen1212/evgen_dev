import {
  MessagesSquare,
  PenTool,
  Code2,
  Rocket,
} from "lucide-react";
import { SectionKicker } from "./section-heading";

const steps = [
  {
    num: "01",
    icon: MessagesSquare,
    title: "Знакомство и ТЗ",
    text: "Обсуждаем задачу в мессенджере или созвоне. Собираю требования, предлагаю решения, фиксирую смету и сроки.",
  },
  {
    num: "02",
    icon: PenTool,
    title: "Дизайн-концепт",
    text: "Рисую макет ключевых экранов. Стиль согласуем до полного «да» — вносим правки, пока не понравится.",
  },
  {
    num: "03",
    icon: Code2,
    title: "Разработка",
    text: "Верстаю и программирую, показываю промежуточные версии, тестирую на всех устройствах и браузерах.",
  },
  {
    num: "04",
    icon: Rocket,
    title: "Запуск и поддержка",
    text: "Деплой, SEO-база, аналитика и обучение по админке. Две недели бесплатных правок после релиза.",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative scroll-mt-24 py-24 sm:py-32">
      {/* точечная сетка + мягкое свечение */}
      <div
        aria-hidden="true"
        className="dot-grid pointer-events-none absolute inset-x-0 top-0 h-[28rem]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/4 size-96 rounded-full bg-purple-900/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div data-reveal className="mb-12 text-center sm:mb-16">
          <SectionKicker>Этапы работы</SectionKicker>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Как я работаю
          </h2>
          <p className="mt-4 text-base text-zinc-400 sm:text-lg">
            прозрачный процесс — вы видите результат на каждом шаге
          </p>
        </div>

        <ol className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, i) => (
            <li
              key={step.num}
              data-reveal
              style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
            >
              <article className="card-shine group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-white/25 hover:bg-white/[0.05] sm:p-7">
                {/* большая номерная подложка */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-3 -top-7 select-none font-display text-[7rem] font-bold leading-none text-white/[0.045] transition-colors duration-500 group-hover:text-white/[0.08]"
                >
                  {step.num}
                </span>

                <span className="relative grid size-12 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-fuchsia-500/20 via-purple-500/15 to-transparent">
                  <step.icon
                    className="size-5 text-fuchsia-300 transition-transform duration-500 group-hover:scale-110"
                    aria-hidden="true"
                  />
                </span>

                <p className="relative mt-5 text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-300/80">
                  Шаг {step.num}
                </p>
                <h3 className="relative mt-2 font-display text-xl font-bold">
                  {step.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-zinc-400">
                  {step.text}
                </p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
