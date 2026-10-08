<script setup lang="ts">
import { techRows } from "./data";
</script>

<template>
  <section id="tech" class="relative scroll-mt-24 py-24 sm:py-32">
    <div
      aria-hidden="true"
      class="pointer-events-none absolute left-1/2 top-1/3 h-80 w-[50rem] max-w-full -translate-x-1/2 rounded-full bg-fuchsia-900/10 blur-3xl"
    />
    <div class="relative mx-auto max-w-7xl px-5 sm:px-8">
      <div data-reveal class="mb-12 text-center sm:mb-16">
        <SectionKicker>Стек</SectionKicker>
        <h2
          class="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
        >
          Технологии
        </h2>
        <p class="mt-4 text-base text-zinc-400 sm:text-lg">
          которые я знаю и использую в проектах
        </p>
      </div>
    </div>

    <div data-reveal class="relative space-y-7 sm:space-y-9">
      <TechRow :items="techRows[0]" :duration="52" />
      <TechRow :items="techRows[1]" :duration="58" reverse />
      <TechRow :items="techRows[2]" :duration="55" />
    </div>
  </section>
</template>
