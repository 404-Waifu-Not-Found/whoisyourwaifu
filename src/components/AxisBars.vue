<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '@/i18n'
import type { AxisScore } from '@/types'

const props = defineProps<{
  scores: AxisScore[]
}>()

const { labels } = useI18n()

const rows = computed(() =>
  props.scores.map((score) => ({
    ...score,
    percent: Math.abs(score.score),
    marker: 50 + score.score / 2,
  })),
)
</script>

<template>
  <div class="axis-bars">
    <div v-for="row in rows" :key="row.axis" class="axis-row">
      <div class="axis-head">
        <span>{{ labels.axes[row.axis] }}</span>
        <strong>{{ row.score >= 0 ? labels.poles[row.right] : labels.poles[row.left] }} {{ row.percent }}%</strong>
      </div>
      <div class="axis-track" :aria-label="labels.axes[row.axis]">
        <span class="axis-label left">{{ labels.poles[row.left] }}</span>
        <span class="axis-label right">{{ labels.poles[row.right] }}</span>
        <span class="axis-marker" :style="{ left: `${row.marker}%` }" />
      </div>
      <div class="axis-confidence">
        <span>{{ labels.confidence }}</span>
        <strong>{{ row.confidence }}%</strong>
      </div>
    </div>
  </div>
</template>
