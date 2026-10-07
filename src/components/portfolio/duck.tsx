"use client";

import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const quackPhrases = [
  "Кря! 👋",
  "Кря-кря! Заказать сайт?",
  "Утка одобряет этот дизайн 🦆",
  "Кря! Я тут самая важная",
  "Работаю за хлебушек 🍞",
  "Кря! Веб-разработка любой сложности",
];

const QUACK_MILESTONE = 10;

/**
 * Утка-маскот с пасхалкой: по клику крякает (тост со случайной фразой),
 * подпрыгивает и ведёт счёт кряканья в localStorage.
 * На 10-й крик — особое достижение.
 */
export default function DuckMascot() {
  const { toast } = useToast();
  const [bouncing, setBouncing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function quack() {
    setBouncing(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setBouncing(false), 750);

    let count = 0;
    try {
      count = Number(localStorage.getItem("duck-quacks") ?? "0") + 1;
      localStorage.setItem("duck-quacks", String(count));
    } catch {
      count = 1;
    }

    if (count === QUACK_MILESTONE) {
      toast({
        title: "10 кря! 🏆",
        description: "Утка официально признала тебя своим.",
      });
    } else {
      const phrase = quackPhrases[Math.floor(Math.random() * quackPhrases.length)];
      toast({
        title: phrase,
        description:
          count === 1 ? "Ты нашёл утку! Кликни ещё — ей нравится." : undefined,
      });
    }
  }

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-2 z-20"
      style={{ transform: "translate3d(0, calc(var(--scroll-y, 0) * -0.12px), 0)" }}
    >
      <button
        type="button"
        onClick={quack}
        aria-label="Утка-маскот Erriour — нажми, и она крякнет"
        title="Кря?"
        className="pointer-events-auto absolute bottom-0 right-[-16%] cursor-pointer border-0 bg-transparent p-0 md:right-[-6%]"
      >
        <img
          src="/images/duck-transparent.png"
          alt="Резиновая утка — маскот Erriour"
          className={`animate-float pointer-events-none w-40 select-none drop-shadow-[0_30px_50px_rgba(0,0,0,0.55)] sm:w-64 md:w-80 xl:w-[26rem] 2xl:w-[30rem] ${
            bouncing ? "duck-bounce" : ""
          }`}
          draggable={false}
        />
      </button>
    </div>
  );
}
