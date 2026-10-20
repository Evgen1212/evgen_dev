<script setup lang="ts">
const { toast } = useToast();

const chirpPhrases = [
  'Чирик! 👋',
  'Чирик-чирик! Обсудим проект?',
  'Попугай одобряет этот дизайн 🦜',
  'Чирик! Я тут самый важный',
  'Работаю за семечки 🌻',
  'Чирик! Vue 3 · Nuxt · TypeScript',
];

const CHIRP_MILESTONE = 10;

/** Синтезированное «чирик-чирик» через WebAudio (без аудиофайлов) — две короткие
 *  высокие трели с взлётом и спадом частоты. Мягкий синус, деликатная громкость. */
function playChirpSound() {
  try {
    const Ctx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    if (ctx.state === 'suspended') void ctx.resume();

    const master = ctx.createGain();
    master.gain.value = 0.13;
    master.connect(ctx.destination);

    /** Одна трель: частота взлетает и плавно падает («чи-и-ик») */
    const trill = (start: number, f1: number, f2: number, f3: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f1, start);
      osc.frequency.exponentialRampToValueAtTime(f2, start + 0.045);
      osc.frequency.exponentialRampToValueAtTime(f3, start + 0.11);

      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.9, start + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.13);

      osc.connect(gain).connect(master);
      osc.start(start);
      osc.stop(start + 0.15);
      return osc;
    };

    const t = ctx.currentTime + 0.02;
    const first = trill(t, 2400, 3300, 2600); // «чирик»
    trill(t + 0.17, 2650, 3600, 2850); // «чирик» повыше

    // закрываем контекст после второй трели (по окончании осциллятора)
    first.onended = () => void ctx.close();
  } catch {
    /* звук не критичен — молча пропускаем */
  }
}

/**
 * Попугай-маскот с пасхалкой: по клику чирикает (тост со случайной фразой),
 * подпрыгивает и ведёт счёт чириканья в localStorage.
 * На 10-м чирике — особое достижение.
 */
const bouncing = ref(false);
const timerRef = ref<ReturnType<typeof setTimeout> | null>(null);

function chirp() {
  playChirpSound();
  bouncing.value = true;
  if (timerRef.value) clearTimeout(timerRef.value);
  timerRef.value = setTimeout(() => {
    bouncing.value = false;
  }, 750);

  let count = 0;
  try {
    count = Number(localStorage.getItem('parrot-chirps') ?? '0') + 1;
    localStorage.setItem('parrot-chirps', String(count));
  } catch {
    count = 1;
  }

  if (count === CHIRP_MILESTONE) {
    toast({
      title: '10 чириков! 🏆',
      description: 'Попугай официально признал тебя своим.',
    });
  } else {
    const phrase =
      chirpPhrases[Math.floor(Math.random() * chirpPhrases.length)];
    toast({
      title: phrase,
      description:
        count === 1
          ? 'Ты нашёл попугая! Кликни ещё — ему нравится.'
          : undefined,
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
    :style="{
      transform: 'translate3d(0, calc(var(--scroll-y, 0) * -0.12px), 0)',
    }"
  >
    <button
      type="button"
      aria-label="Попугай-маскот — нажми, и он чирикнет"
      title="Чирик?"
      class="parrot-bob pointer-events-auto absolute bottom-0 right-[0%] cursor-pointer border-0 bg-transparent p-0 md:right-[0%]"
      @click="chirp"
    >
      <span class="parrot-sway block">
        <SmartImage
          name="parrot"
          alt="Жёлтый попугай — маскот сайта"
          :width="830"
          :height="1015"
          :widths="[160, 256, 384, 512, 640]"
          sizes="(min-width: 1536px) 320px, (min-width: 1280px) 256px, (min-width: 768px) 208px, (min-width: 640px) 160px, 112px"
          loading="eager"
          fetchpriority="low"
          skeleton="glow"
          color="#d946ef"
          :class="
            cn(
              'pointer-events-none block w-28 select-none overflow-visible sm:w-40 md:w-52 xl:w-64 2xl:w-80',
              bouncing && 'parrot-bounce',
            )
          "
          img-class="w-full h-auto select-none drop-shadow-[0_24px_40px_rgba(0,0,0,0.55)]"
          :draggable="false"
        />
      </span>
    </button>
  </div>
</template>
