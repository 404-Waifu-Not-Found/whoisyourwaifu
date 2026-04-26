<script setup lang="ts">
import { computed } from 'vue'
import AxisBars from '@/components/AxisBars.vue'
import { useI18n } from '@/i18n'
import type { QuizResult } from '@/types'

const props = defineProps<{
  result: QuizResult
}>()

const { labels, locale, text } = useI18n()
const traits = computed(() => props.result.character.traits[locale.value])
</script>

<template>
  <article class="result-card" :class="`palette-${result.character.palette}`">
    <div class="result-topline">
      <span>{{ labels.resultTitle }}</span>
      <strong>{{ result.type }}</strong>
    </div>
    <div class="result-identity">
      <div class="character-sigil" aria-hidden="true">
        <img
          v-if="result.character.portrait"
          :src="result.character.portrait.url"
          :alt="text(result.character.name)"
          loading="lazy"
        />
        <span v-else>{{ text(result.character.name).slice(0, 1).toUpperCase() }}</span>
      </div>
      <div>
        <h1>{{ text(result.character.name) }}</h1>
        <p>{{ text(result.character.source) }}</p>
        <a
          v-if="result.character.portrait"
          class="source-link"
          :href="result.character.portrait.sourceUrl"
          target="_blank"
          rel="noreferrer"
        >
          {{ labels.artSource }}: {{ result.character.portrait.sourceName }}
        </a>
      </div>
    </div>
    <p class="match-copy">{{ text(result.character.matchCopy) }}</p>
    <div class="score-strip">
      <div>
        <span>{{ labels.fit }}</span>
        <strong>{{ result.fit }}%</strong>
      </div>
      <div>
        <span>{{ labels.confidence }}</span>
        <strong>{{ result.confidence }}%</strong>
      </div>
    </div>
    <div class="trait-row">
      <span v-for="trait in traits" :key="trait">{{ trait }}</span>
    </div>
    <AxisBars :scores="result.axisScores" />
    <p class="confidence-hint">{{ labels.confidenceHint }}</p>
  </article>
</template>
