import { ArrowUpRight } from "lucide-react";
import { socials } from "./data";
import { SectionKicker } from "./section-heading";
import ContactForm from "./contact-form";
import CopyEmailButton from "./copy-email-button";
import LocalTime from "./local-time";

const primaryNames = ["Telegram", "Discord", "VK", "GitHub"];

const descriptions: Record<string, string> = {
  Telegram: "Отвечаю в течение часа",
  Discord: "Для быстрых вопросов",
  VK: "Пишите в личные сообщения",
  GitHub: "Мой код и open-source",
};

export default function Contact() {
  const primary = primaryNames
    .map((n) => socials.find((s) => s.name === n))
    .filter(Boolean) as typeof socials;
  const secondary = socials.filter((s) => !primaryNames.includes(s.name));

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      {/* aurora glow at bottom */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="aurora-layer aurora-b opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,10,11,0.82)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div data-reveal className="mb-12 text-center sm:mb-16">
          <SectionKicker>Контакты</SectionKicker>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Обсудить задачу
          </h2>
          <p className="mt-4 text-base text-zinc-400 sm:text-lg">
            напишите мне в мессенджерах или соц.сетях
          </p>
          <LocalTime className="mt-6" />
        </div>

        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
          {primary.map((s, i) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              className="card-shine group flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07] sm:p-6"
            >
              <span
                className="grid size-14 shrink-0 place-items-center rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `#${s.color}22`, border: `1px solid #${s.color}55` }}
              >
                
                <img
                  src={`/icons/social/${s.icon}.svg`}
                  alt=""
                  width={26}
                  height={26}
                  className="size-[26px]"
                  loading="lazy"
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-lg font-bold text-white">{s.name}</span>
                <span className="block truncate text-sm text-zinc-400">{descriptions[s.name] ?? s.handle}</span>
              </span>
              <ArrowUpRight
                className="size-5 shrink-0 text-zinc-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                aria-hidden="true"
              />
            </a>
          ))}
        </div>

        <div data-reveal className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {secondary.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-zinc-300 transition-all hover:border-white/25 hover:bg-white/10 hover:text-white"
            >
              
              <img
                src={`/icons/social/${s.icon}.svg`}
                alt=""
                width={15}
                height={15}
                className="size-[15px] opacity-80"
                loading="lazy"
              />
              {s.name}
            </a>
          ))}
          <CopyEmailButton />
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
