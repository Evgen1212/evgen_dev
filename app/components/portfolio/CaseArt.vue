<script setup lang="ts">
import { Layers, Scale, Skull, Zap } from "lucide-vue-next";

/**
 * Порт src/components/portfolio/case-art.tsx — CSS/арт-обложки кейсов
 * и пет-проектов. В React это был словарь caseArt: Record<string, ComponentType>;
 * здесь выбор ветки по пропу id (один SFC = один компонент).
 * Корень каждой ветки — absolute inset-0 (заливает родителя).
 */
withDefaults(
  defineProps<{
    /** ключ кейса из data.ts (modern, craftout, …, hostfeed) */
    id: string;
    /** компактная шапка CraftOut (как compact у CraftOutArt в React) */
    compact?: boolean;
  }>(),
  { compact: false },
);

// насечки «забора» в арте UnderBorn
const underbornTicks = [22, 34, 46, 60, 74, 86, 98];
</script>

<template>
  <!-- Modern Citi Group -->
  <div
    v-if="id === 'modern'"
    class="absolute inset-0 bg-gradient-to-br from-sky-500 via-blue-600 to-blue-800"
  >
    <div
      aria-hidden="true"
      class="absolute inset-0 opacity-[0.12]"
      :style="{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)',
        backgroundSize: '44px 44px',
      }"
    />
    <div class="absolute left-6 top-6 sm:left-8 sm:top-8">
      <Layers class="mb-3 size-10 fill-white/20 text-white" aria-hidden="true" />
      <div
        class="font-display text-2xl font-extrabold leading-none tracking-tight text-white sm:text-3xl"
      >
        MODERN
      </div>
      <div class="mt-1 text-base font-medium tracking-[0.35em] text-white/85 sm:text-lg">
        CITI GROUP
      </div>
    </div>
    <!-- mini site mockup -->
    <div
      class="absolute bottom-[-8%] right-[-4%] w-[62%] rotate-[-4deg] rounded-tl-2xl bg-white p-3 shadow-2xl"
    >
      <div class="mb-2 flex gap-1">
        <span class="size-1.5 rounded-full bg-zinc-300" />
        <span class="size-1.5 rounded-full bg-zinc-300" />
        <span class="size-1.5 rounded-full bg-zinc-300" />
      </div>
      <div class="h-2 w-3/4 rounded bg-blue-200" />
      <div class="mt-1.5 h-2 w-1/2 rounded bg-zinc-200" />
      <div class="mt-3 grid grid-cols-3 gap-1.5">
        <div class="h-10 rounded-md bg-zinc-100" />
        <div class="h-10 rounded-md bg-blue-100" />
        <div class="h-10 rounded-md bg-zinc-100" />
      </div>
    </div>
  </div>

  <!-- CraftOut -->
  <div v-else-if="id === 'craftout'" class="absolute inset-0 bg-black">
    <img
      src="/images/craftout.png"
      alt=""
      class="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/50" />
    <div
      :class="
        compact
          ? 'absolute inset-x-0 top-5 flex justify-center'
          : 'absolute inset-x-0 top-8 flex justify-center'
      "
    >
      <span
        class="inline-flex items-center gap-1 font-display text-2xl font-bold italic tracking-tight text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.85)] sm:text-3xl"
      >
        Craft
        <span
          class="mx-0.5 grid size-8 -skew-x-6 place-items-center rounded-lg border border-white/40 bg-white/10 backdrop-blur-sm sm:size-9"
        >
          <Zap class="size-4 fill-white text-white sm:size-5" />
        </span>
        Out
      </span>
    </div>
  </div>

  <!-- ГранЛайн -->
  <div v-else-if="id === 'granline'" class="absolute inset-0">
    <img
      src="/images/granline.png"
      alt=""
      class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
    <div
      class="absolute bottom-4 left-4 right-4 rounded-xl border border-white/15 bg-black/45 px-3 py-2 backdrop-blur-md"
    >
      <div class="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
        ГранЛайн
      </div>
      <div class="text-xs font-medium text-white/90">
        Декоративная и архитектурная подсветка
      </div>
    </div>
  </div>

  <!-- Адвокат Маркин А.Е. -->
  <div
    v-else-if="id === 'lawyer'"
    class="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black"
  >
    <div
      aria-hidden="true"
      class="absolute inset-0 opacity-[0.05]"
      :style="{
        backgroundImage:
          'repeating-linear-gradient(-45deg, transparent, transparent 12px, rgba(255,255,255,.5) 13px, transparent 14px)',
      }"
    />
    <div class="absolute left-5 top-5 flex items-center gap-3 sm:left-7 sm:top-7">
      <span
        class="grid size-12 place-items-center rounded-xl border border-zinc-600 bg-zinc-800/80 shadow-lg"
      >
        <Scale class="size-6 text-zinc-100" aria-hidden="true" />
      </span>
      <div>
        <div class="text-[10px] uppercase tracking-[0.25em] text-zinc-500">Адвокат</div>
        <div class="font-serif text-lg font-semibold text-zinc-100">Маркин А.Е.</div>
      </div>
    </div>
    <div class="absolute bottom-5 left-7 right-7">
      <div class="h-px w-full bg-gradient-to-r from-zinc-600 to-transparent" />
      <div class="mt-2 text-[11px] text-zinc-500">Юридическая помощь · Челябинск</div>
    </div>
  </div>

  <!-- Shadows Project -->
  <div v-else-if="id === 'shadows'" class="absolute inset-0 overflow-hidden bg-[#0d0a16]">
    <div
      aria-hidden="true"
      class="absolute left-1/2 top-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/35 blur-3xl"
    />
    <!-- floating cubes -->
    <div
      aria-hidden="true"
      class="absolute right-[14%] top-[18%] size-10 rotate-12 rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-800 opacity-80 shadow-lg shadow-purple-900/50"
    />
    <div
      aria-hidden="true"
      class="absolute left-[16%] bottom-[16%] size-7 -rotate-12 rounded-md bg-gradient-to-br from-fuchsia-600 to-purple-900 opacity-70"
    />
    <div class="absolute inset-0 flex flex-col items-center justify-center gap-3">
      <span
        class="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-700 font-display text-3xl font-bold text-white shadow-xl shadow-purple-900/60"
      >
        S
      </span>
      <span
        class="text-center font-display text-xl font-extrabold leading-tight tracking-wide text-white sm:text-2xl"
      >
        SHADOWS
        <br />
        PROJECT
      </span>
    </div>
  </div>

  <!-- Mine Play -->
  <div v-else-if="id === 'mineplay'" class="absolute inset-0 bg-[#f4f6f8]">
    <!-- pixel blocks -->
    <div
      aria-hidden="true"
      class="absolute right-[10%] top-[16%] grid grid-cols-2 gap-1 opacity-90"
    >
      <span class="size-5 rounded-[3px] bg-emerald-500" />
      <span class="size-5 rounded-[3px] bg-emerald-700" />
      <span class="size-5 rounded-[3px] bg-emerald-400" />
      <span class="size-5 rounded-[3px] bg-emerald-600" />
    </div>
    <div
      aria-hidden="true"
      class="absolute left-[12%] bottom-[18%] size-8 rounded-[4px] bg-amber-300/90"
    />
    <div class="absolute inset-0 flex flex-col items-center justify-center gap-4">
      <span class="flex items-center gap-2.5">
        <span
          class="grid h-0 w-0 border-y-[14px] border-l-[22px] border-y-transparent border-l-emerald-500"
          aria-hidden="true"
        />
        <span
          class="font-display text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl"
        >
          MINE <span class="text-emerald-500">PLAY</span>
        </span>
      </span>
      <span
        class="rounded-full bg-zinc-900 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400"
      >
        Minecraft сервер
      </span>
    </div>
  </div>

  <!-- Project Cataclysm -->
  <div v-else-if="id === 'cataclysm'" class="absolute inset-0 overflow-hidden bg-black">
    <div
      aria-hidden="true"
      class="absolute left-[20%] top-[30%] size-72 rounded-full bg-zinc-700/25 blur-3xl"
    />
    <div
      aria-hidden="true"
      class="absolute right-[10%] bottom-[10%] size-56 rounded-full bg-red-900/20 blur-3xl"
    />
    <div class="absolute inset-0 flex flex-col items-center justify-center gap-4">
      <span
        class="grid size-16 place-items-center [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)] border border-white/25 bg-white/5"
      >
        <Skull class="size-8 text-white" aria-hidden="true" />
      </span>
      <span
        class="text-center font-display text-xl font-extrabold leading-tight tracking-wide text-white drop-shadow-lg sm:text-2xl"
      >
        PROJECT
        <br />
        CATACLYSM
      </span>
    </div>
  </div>

  <!-- UnderBorn -->
  <div v-else-if="id === 'underborn'" class="absolute inset-0 overflow-hidden bg-[#0c0a09]">
    <div
      aria-hidden="true"
      class="absolute left-1/2 top-[58%] size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-3xl"
    />
    <div class="absolute inset-0 flex items-center justify-center gap-5 sm:gap-8">
      <svg
        viewBox="0 0 120 90"
        class="h-24 w-32 shrink-0 sm:h-28 sm:w-36"
        aria-hidden="true"
      >
        <path
          d="M 14 84 A 46 46 0 0 1 106 84"
          fill="none"
          stroke="white"
          stroke-width="5"
          stroke-linecap="round"
        />
        <path
          v-for="(x, i) in underbornTicks"
          :key="x"
          :d="`M ${x} 84 l 0 ${6 + (i % 3) * 3}`"
          stroke="white"
          stroke-width="3.5"
          stroke-linecap="round"
        />
        <text x="60" y="52" text-anchor="middle" font-size="30">☁️</text>
      </svg>
      <div
        class="font-display text-3xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-5xl"
      >
        UNDER
        <br />
        BORN
      </div>
    </div>
  </div>

  <!-- HostFeed -->
  <div v-else-if="id === 'hostfeed'" class="absolute inset-0">
    <img
      src="/images/hostfeed.png"
      alt=""
      class="absolute inset-0 h-full w-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-blue-600/25 via-transparent to-blue-900/30" />
    <div class="absolute left-6 top-6 flex items-center gap-3 sm:left-9 sm:top-9">
      <span
        class="font-display text-3xl font-light tracking-tight text-white drop-shadow-md sm:text-5xl"
      >
        Host
      </span>
      <span
        class="rounded-2xl bg-white px-4 py-1.5 font-display text-3xl font-bold tracking-tight text-blue-600 shadow-xl sm:text-5xl"
      >
        Feed
      </span>
    </div>
  </div>
</template>
