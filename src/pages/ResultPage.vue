<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import ResultCard from '@/components/ResultCard.vue'
import { questions } from '@/data/questions'
import { useI18n } from '@/i18n'
import { clearAnswers, loadAnswers, loadQuestionOrder } from '@/storage'
import { calculateResult, isQuestionSetComplete } from '@/utils/scoring'
import type { Question } from '@/types'

const router = useRouter()
const { labels, text } = useI18n()
const answers = loadAnswers()
const questionById = new Map(questions.map((question) => [question.id, question]))
const selectedQuestionIds = loadQuestionOrder(questions)
const selectedQuestions = selectedQuestionIds
  .map((id) => questionById.get(id))
  .filter((question): question is Question => Boolean(question))
const copied = ref(false)
const result = computed(() => (isQuestionSetComplete(answers, selectedQuestions) ? calculateResult(answers, selectedQuestions) : null))

async function copyShare() {
  if (!result.value) return
  const character = text(result.value.character.name)
  const shareText = `${labels.value.brand}: ${character} (${result.value.type}, ${result.value.fit}%) ${window.location.href}`
  await navigator.clipboard.writeText(shareText)
  copied.value = true
  window.setTimeout(() => {
    copied.value = false
  }, 1400)
}

function retake() {
  clearAnswers()
  router.push('/quiz')
}
</script>

<template>
  <section v-if="result" class="result-layout">
    <ResultCard :result="result" />
    <section class="close-matches" aria-labelledby="close-matches-title">
      <h2 id="close-matches-title">{{ labels.closeMatches }}</h2>
      <div class="close-match-grid">
        <article v-for="match in result.topMatches.slice(1)" :key="match.character.id" class="close-match">
          <img
            v-if="match.character.portrait"
            :src="match.character.portrait.url"
            :alt="text(match.character.name)"
            loading="lazy"
          />
          <div>
            <strong>{{ text(match.character.name) }}</strong>
            <span>{{ text(match.character.source) }} · {{ match.character.type }} · {{ match.fit }}%</span>
          </div>
        </article>
      </div>
    </section>
    <div class="result-actions">
      <button class="button primary" type="button" @click="copyShare">
        {{ copied ? labels.copied : labels.share }}
      </button>
      <button class="button ghost" type="button" @click="retake">{{ labels.retake }}</button>
    </div>
    <p class="disclaimer">{{ labels.disclaimer }}</p>
  </section>
  <section v-else class="empty-state">
    <h1>{{ labels.missingTitle }}</h1>
    <p>{{ labels.missingCopy }}</p>
    <RouterLink class="button primary" to="/quiz">{{ labels.start }}</RouterLink>
  </section>
</template>
