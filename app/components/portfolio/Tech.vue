<script setup lang="ts">
import { techRows } from "./data";

const techLabels = ["Инфраструктура", "Frontend", "Backend и данные"];
</script>
<template>
  <section id="tech" class="section" aria-labelledby="tech-title">
    <div class="container">
      <header class="section-head" data-reveal>
        <p class="kicker">Стек</p>
        <h2 id="tech-title" class="section-title">Технологии</h2>
        <p class="section-lede">которые я знаю и использую в проектах</p>
      </header>

      <div class="tech-groups" data-reveal>
        <div v-for="(row, rowIndex) in techRows" :key="rowIndex" class="tech-group">
          <h3 class="tech-label">{{ techLabels[rowIndex] }}</h3>
          <ul class="tech-list">
            <li v-for="item in row" :key="item.label" class="tech-chip">
              <TechIcon :icon="item.icon" :emoji="item.emoji" />
              <span>{{ item.label }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
