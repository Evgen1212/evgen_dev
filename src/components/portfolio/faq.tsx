import { MessageCircleQuestion } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionKicker } from "./section-heading";

const faqs = [
  {
    q: "Сколько времени занимает разработка?",
    a: "Лендинг — от 5–10 дней, многостраничный сайт — 2–4 недели, веб-сервис — от месяца. Точные сроки фиксирую до старта работ и придерживаюсь их: за срыв по моей вине дисконт 10%.",
  },
  {
    q: "Как устроена оплата?",
    a: "Стандартно: 50% предоплата, остаток — после приёмки. Крупные проекты разбиваю на этапы с оплатой по частям. Работаю по договору, закрывающие документы — по запросу.",
  },
  {
    q: "Что нужно от меня на старте?",
    a: "Достаточно понимания задачи и примеров сайтов, которые нравятся. Тексты, фото и логотип — если есть. Если материалов нет — помогу собрать и оформлю ТЗ за вас.",
  },
  {
    q: "Берёте ли доработку чужого проекта?",
    a: "Да, это частый формат. Сначала бесплатно посмотрю код и дам оценку: что можно оставить, что стоит переписать. Честно скажу, если доработка экономически бессмысленна.",
  },
  {
    q: "Что с поддержкой после запуска?",
    a: "Две недели после релиза правки и багфиксы — бесплатно. Дальше — поддержка по договору от 3 000 ₽/мес: обновления, мелкие доработки, мониторинг доступности.",
  },
  {
    q: "Работаешь один или в команде?",
    a: "Один — дизайн, код и деплой, поэтому нет потерь при передаче между исполнителями. На крупных проектах подключаю проверенных подрядчиков, но за результат отвечаю лично.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
        <div data-reveal className="mb-10 text-center sm:mb-14">
          <SectionKicker>Частые вопросы</SectionKicker>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            FAQ
          </h2>
          <p className="mt-4 text-base text-zinc-400 sm:text-lg">
            собираю ответы на то, что спрашивают чаще всего
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((item, i) => (
            <AccordionItem
              key={item.q}
              value={`faq-${i}`}
              data-reveal
              style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] px-5 transition-colors hover:border-white/20 data-[state=open]:border-fuchsia-400/30 data-[state=open]:bg-white/[0.05]"
            >
              <AccordionTrigger className="py-5 font-display text-base font-bold text-white hover:no-underline sm:text-lg">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-zinc-400 sm:text-base">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <p
          data-reveal
          className="mt-8 flex flex-wrap items-center justify-center gap-2 text-center text-sm text-zinc-500"
        >
          <MessageCircleQuestion className="size-4 text-fuchsia-300/80" aria-hidden="true" />
          Остался вопрос?
          <a
            href="#contact"
            className="font-semibold text-zinc-300 underline decoration-fuchsia-400/50 decoration-2 underline-offset-4 transition-colors hover:text-white"
          >
            Напишите мне
          </a>
          — отвечаю быстро.
        </p>
      </div>
    </section>
  );
}
