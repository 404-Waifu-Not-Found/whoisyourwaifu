<script setup lang="ts">
import { computed } from 'vue'
import { characters } from '@/data/characters'
import { useI18n } from '@/i18n'

const { labels, locale, text } = useI18n()
const roster = computed(() => characters.map((character) => ({ character, traits: character.traits[locale.value] })))
const rosterEyebrow = computed(() => labels.value.rosterEyebrow.replace('{characters}', String(characters.length)))
</script>

<template>
  <section class="roster-layout">
    <div class="section-heading">
      <p class="eyebrow">{{ rosterEyebrow }}</p>
      <h1>{{ labels.rosterTitle }}</h1>
      <p>{{ labels.disclaimer }}</p>
    </div>
    <div class="roster-grid">
      <article
        v-for="{ character, traits } in roster"
        :key="character.id"
        class="roster-card"
        :class="`palette-${character.palette}`"
      >
        <img
          v-if="character.portrait"
          class="roster-portrait"
          :src="character.portrait.url"
          :alt="text(character.name)"
          loading="lazy"
        />
        <div v-else class="roster-portrait roster-portrait-fallback" aria-hidden="true">
          {{ text(character.name).slice(0, 1).toUpperCase() }}
        </div>
        <div class="roster-type">{{ character.type }}</div>
        <h2>{{ text(character.name) }}</h2>
        <p>{{ text(character.source) }}</p>
        <div class="trait-row">
          <span v-for="trait in traits" :key="trait">{{ trait }}</span>
        </div>
      </article>
    </div>
  </section>
</template>
