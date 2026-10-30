<script setup lang="ts">
import { techRows } from './data';
</script>

<template>
  <section id="tech" class="m3-section">
    <div class="relative mx-auto max-w-7xl px-5 sm:px-8">
      <div data-reveal class="mb-12 text-center max-md:text-left sm:mb-16">
        <SectionKicker>Стек</SectionKicker>
        <h2
          class="m3-headline-lg"
        >
          Технологии
        </h2>
        <p class="mt-4 text-base text-(--ink-mute) sm:text-lg">
          которые я знаю и использую в проектах
        </p>
      </div>
    </div>

    <div data-reveal class="relative space-y-3 sm:space-y-4">
      <TechRow :items="techRows[0]!" :duration="52" />
      <TechRow :items="techRows[1]!" :duration="58" reverse />
      <TechRow :items="techRows[2]!" :duration="55" />
    </div>
  </section>
</template>
