<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { questions } from '@/data/questions'
import { useI18n } from '@/i18n'
import { loadAnswers, loadQuestionOrder, saveAnswers } from '@/storage'
import type { AnswerMap, AnswerValue, Question } from '@/types'

const router = useRouter()
const { labels, text } = useI18n()
const answers = ref<AnswerMap>(loadAnswers())
const index = ref(0)
const questionById = new Map(questions.map((question) => [question.id, question]))
const questionOrder = loadQuestionOrder(questions)
const orderedQuestions = questionOrder.map((id) => questionById.get(id)).filter((question): question is Question => Boolean(question))

const values: AnswerValue[] = [-3, -2, -1, 0, 1, 2, 3]
const current = computed(() => orderedQuestions[index.value])
const currentAnswer = computed(() => answers.value[current.value.id])
const progress = computed(() => Math.round(((index.value + 1) / orderedQuestions.length) * 100))
const answeredCount = computed(() => orderedQuestions.filter((question) => typeof answers.value[question.id] === 'number').length)
const canGoNext = computed(() => typeof currentAnswer.value === 'number')

watch(
  answers,
  (nextAnswers) => {
    saveAnswers(nextAnswers)
  },
  { deep: true },
)

function answer(value: AnswerValue) {
  answers.value = { ...answers.value, [current.value.id]: value }
}

function next() {
  if (!canGoNext.value) return
  if (index.value === orderedQuestions.length - 1) {
    router.push('/result')
    return
  }
  index.value += 1
}

function previous() {
  index.value = Math.max(0, index.value - 1)
}
</script>

<template>
  <section class="quiz-layout">
    <div class="quiz-status">
      <span>{{ labels.progress }} {{ index + 1 }} / {{ orderedQuestions.length }}</span>
      <strong>{{ answeredCount }} {{ labels.answered }}</strong>
    </div>
    <div class="progress-track" aria-hidden="true">
      <span :style="{ width: `${progress}%` }" />
    </div>

    <article class="question-card">
      <p class="scene">{{ text(current.scene) }}</p>
      <h1>{{ text(current.text) }}</h1>
      <div class="scale-labels">
        <span>{{ labels.disagree }}</span>
        <span>{{ labels.neutral }}</span>
        <span>{{ labels.agree }}</span>
      </div>
      <div class="scale-grid" role="group" :aria-label="labels.answerScaleLabel">
        <button
          v-for="value in values"
          :key="value"
          class="scale-button"
          :class="{ selected: currentAnswer === value }"
          type="button"
          @click="answer(value)"
        >
          {{ value > 0 ? `+${value}` : value }}
        </button>
      </div>
    </article>

    <div class="quiz-actions">
      <button class="button ghost" type="button" :disabled="index === 0" @click="previous">
        {{ labels.previous }}
      </button>
      <button class="button primary" type="button" :disabled="!canGoNext" @click="next">
        {{ index === orderedQuestions.length - 1 ? labels.seeResult : labels.next }}
      </button>
    </div>
  </section>
</template>
