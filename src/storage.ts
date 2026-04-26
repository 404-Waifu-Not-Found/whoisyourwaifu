import type { AnswerMap, Axis, Question } from '@/types'

const ANSWERS_KEY = 'whoisyourwaifu:answers'
const QUESTION_ORDER_KEY = 'whoisyourwaifu:question-order'

export function loadAnswers(): AnswerMap {
  try {
    const raw = localStorage.getItem(ANSWERS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function saveAnswers(answers: AnswerMap) {
  localStorage.setItem(ANSWERS_KEY, JSON.stringify(answers))
}

export function clearAnswers() {
  localStorage.removeItem(ANSWERS_KEY)
  localStorage.removeItem(QUESTION_ORDER_KEY)
}

function shuffledCopy<T>(values: T[]): T[] {
  const result = [...values]

  for (let index = result.length - 1; index > 0; index -= 1) {
    const random = crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32
    const swapIndex = Math.floor(random * (index + 1))
    ;[result[index], result[swapIndex]] = [result[swapIndex], result[index]]
  }

  return result
}

function isValidOrder(order: unknown, questions: Question[], perAxis: number): order is string[] {
  if (!Array.isArray(order)) return false
  const questionIds = questions.map((question) => question.id)
  const expected = new Set(questionIds)
  if (!order.every((id) => typeof id === 'string' && expected.has(id))) return false
  if (new Set(order).size !== order.length) return false

  const selectedQuestions = order.map((id) => questions.find((question) => question.id === id)).filter(Boolean) as Question[]
  const axisCounts = selectedQuestions.reduce(
    (counts, question) => ({ ...counts, [question.axis]: counts[question.axis] + 1 }),
    { E_I: 0, S_N: 0, T_F: 0, J_P: 0 } as Record<Axis, number>,
  )

  return Object.values(axisCounts).every((count) => count === perAxis)
}

function createBalancedQuestionOrder(questions: Question[], perAxis: number): string[] {
  const axes: Axis[] = ['E_I', 'S_N', 'T_F', 'J_P']
  const selected = axes.flatMap((axis) => {
    const group = questions.filter((question) => question.axis === axis)
    return shuffledCopy(group).slice(0, perAxis)
  })

  return shuffledCopy(selected).map((question) => question.id)
}

export function loadQuestionOrder(questions: Question[], perAxis = 8): string[] {
  try {
    const raw = localStorage.getItem(QUESTION_ORDER_KEY)
    const parsed = raw ? JSON.parse(raw) : null
    if (isValidOrder(parsed, questions, perAxis)) return parsed
  } catch {
    // Fall through and create a new randomized order.
  }

  const order = createBalancedQuestionOrder(questions, perAxis)
  localStorage.setItem(QUESTION_ORDER_KEY, JSON.stringify(order))
  return order
}
