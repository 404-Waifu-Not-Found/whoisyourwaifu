<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { questions } from '@/data/questions'
import { characters } from '@/data/characters'
import { useI18n } from '@/i18n'

const { labels } = useI18n()
</script>

<template>
  <section class="home-layout">
    <div class="home-copy">
      <p class="eyebrow">{{ labels.homeEyebrow }}</p>
      <h1>{{ labels.brand }}</h1>
      <p class="subtitle">{{ labels.subtitle }}</p>
      <p class="lede">
        {{ labels.homeLede.replace('{questions}', String(questions.length)).replace('{characters}', String(characters.length)) }}
      </p>
      <div class="hero-actions">
        <RouterLink class="button primary" to="/quiz">{{ labels.start }}</RouterLink>
        <RouterLink class="button ghost" to="/roster">{{ labels.navRoster }}</RouterLink>
      </div>
      <p class="disclaimer">{{ labels.disclaimer }}</p>
    </div>
    <div class="poster-panel" :aria-label="labels.quizPreview">
      <div class="poster-grid">
        <span>INTJ</span>
        <span>ENFP</span>
        <span>ISFJ</span>
        <span>ESTP</span>
      </div>
      <div class="poster-title">{{ labels.posterTitle }}</div>
      <div class="poster-meter">
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  </section>
</template>
