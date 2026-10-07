<script setup lang="ts">
const { toast } = useToast();

const quackPhrases = [
  "Кря! 👋",
  "Кря-кря! Обсудим проект?",
  "Утка одобряет этот дизайн 🦆",
  "Кря! Я тут самая важная",
  "Работаю за хлебушек 🍞",
  "Кря! Vue 3 · Nuxt · TypeScript",
];

const QUACK_MILESTONE = 10;

/** Синтезированный «кряк» через WebAudio (без аудиофайлов) — короткий пилообразный
 *  сигнал с падающей частотой и lowpass-фильтром. Громкость деликатная. */
function playQuackSound() {
  try {
    const Ctx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    if (ctx.state === "suspended") void ctx.resume();

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(520, t);
    osc.frequency.exponentialRampToValueAtTime(180, t + 0.14);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1400, t);
    filter.Q.value = 4;

    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.12, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);

    osc.connect(filter).connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.18);
    osc.onended = () => void ctx.close();
  } catch {
    /* звук не критичен — молча пропускаем */
  }
}

/**
 * Утка-маскот с пасхалкой: по клику крякает (тост со случайной фразой),
 * подпрыгивает и ведёт счёт кряканья в localStorage.
 * На 10-й крик — особое достижение.
 */
const bouncing = ref(false);
const timerRef = ref<ReturnType<typeof setTimeout> | null>(null);

function quack() {
  playQuackSound();
  bouncing.value = true;
  if (timerRef.value) clearTimeout(timerRef.value);
  timerRef.value = setTimeout(() => {
    bouncing.value = false;
  }, 750);

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

onBeforeUnmount(() => {
  if (timerRef.value) clearTimeout(timerRef.value);
});
</script>

<template>
  <div
    class="pointer-events-none absolute inset-x-0 bottom-2 z-20"
    :style="{ transform: 'translate3d(0, calc(var(--scroll-y, 0) * -0.12px), 0)' }"
  >
    <button
      type="button"
      aria-label="Утка-маскот — нажми, и она крякнет"
      title="Кря?"
      class="pointer-events-auto absolute bottom-0 right-[-16%] cursor-pointer border-0 bg-transparent p-0 md:right-[-6%]"
      @click="quack"
    >
      <img
        src="/images/duck-transparent.png"
        alt="Резиновая утка — маскот сайта"
        :class="cn(
          'animate-float pointer-events-none w-40 select-none drop-shadow-[0_30px_50px_rgba(0,0,0,0.55)] sm:w-64 md:w-80 xl:w-[26rem] 2xl:w-[30rem]',
          bouncing && 'duck-bounce'
        )"
        draggable="false"
      />
    </button>
  </div>
</template>
