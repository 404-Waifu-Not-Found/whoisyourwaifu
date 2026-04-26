import { questions } from '@/data/questions'
import { calculateResult, findCharacter, scoreAnswers } from '@/utils/scoring'
import type { AnswerMap, AnswerValue, Axis, Pole, WaifuType } from '@/types'

const axisIndex: Record<Axis, number> = {
  E_I: 0,
  S_N: 1,
  T_F: 2,
  J_P: 3,
}

const types: WaifuType[] = [
  'INTJ',
  'INTP',
  'ENTJ',
  'ENTP',
  'INFJ',
  'INFP',
  'ENFJ',
  'ENFP',
  'ISTJ',
  'ISFJ',
  'ESTJ',
  'ESFJ',
  'ISTP',
  'ISFP',
  'ESTP',
  'ESFP',
]

function targetPole(type: WaifuType, axis: Axis): Pole {
  return type[axisIndex[axis]] as Pole
}

function answerFor(type: WaifuType, strength: AnswerValue): AnswerMap {
  return Object.fromEntries(
    questions.map((question) => {
      const target = targetPole(type, question.axis)
      const value = question.favoredPole === target ? strength : ((strength * -1) as AnswerValue)
      return [question.id, value]
    }),
  )
}

function mixedAnswerFor(type: WaifuType): AnswerMap {
  return Object.fromEntries(
    questions.map((question, index) => {
      const base = question.favoredPole === targetPole(type, question.axis) ? 2 : -2
      const wobble = index % 5 === 0 ? 0 : index % 3 === 0 ? Math.sign(base) : base
      return [question.id, wobble as AnswerValue]
    }),
  )
}

function neutralAnswerFor(): AnswerMap {
  return Object.fromEntries(questions.map((question) => [question.id, 0 as AnswerValue]))
}

function noisyAnswerFor(type: WaifuType): AnswerMap {
  return Object.fromEntries(
    questions.map((question, index) => {
      const base = question.favoredPole === targetPole(type, question.axis) ? 2 : -2
      const pattern = index % 7
      const value = pattern === 0 ? -base : pattern === 1 ? 0 : pattern === 2 ? Math.sign(base) : base
      return [question.id, value as AnswerValue]
    }),
  )
}

function contradictoryAnswerFor(type: WaifuType): AnswerMap {
  return Object.fromEntries(
    questions.map((question, index) => {
      const base = question.favoredPole === targetPole(type, question.axis) ? 3 : -3
      const value = index % 2 === 0 ? base : -base
      return [question.id, value as AnswerValue]
    }),
  )
}

function partialAxisAnswerFor(type: WaifuType, activeAxes: Axis[]): AnswerMap {
  return Object.fromEntries(
    questions.map((question) => {
      if (!activeAxes.includes(question.axis)) return [question.id, 0 as AnswerValue]
      const target = targetPole(type, question.axis)
      const value = question.favoredPole === target ? 3 : -3
      return [question.id, value as AnswerValue]
    }),
  )
}

function compareProfile(name: string, answers: AnswerMap) {
  const scores = scoreAnswers(answers)
  const legacy = findCharacter(scores)
  const enhanced = calculateResult(answers)

  return {
    profile: name,
    derivedType: enhanced.type,
    legacy: `${legacy.name.en} (${legacy.type})`,
    enhanced: `${enhanced.character.name.en} (${enhanced.character.type})`,
    fit: `${enhanced.fit}%`,
    confidence: `${enhanced.confidence}%`,
    top3: enhanced.topMatches
      .slice(0, 3)
      .map((match) => `${match.character.name.en} ${match.fit}%`)
      .join(' | '),
  }
}

const rows = [
  ...types.map((type) => compareProfile(`${type} strong`, answerFor(type, 3))),
  ...types.map((type) => compareProfile(`${type} mixed`, mixedAnswerFor(type))),
  ...types.map((type) => compareProfile(`${type} noisy`, noisyAnswerFor(type))),
  ...types.slice(0, 8).map((type) => compareProfile(`${type} contradictory`, contradictoryAnswerFor(type))),
  ...types.slice(8).map((type) => compareProfile(`${type} partial EI/SN`, partialAxisAnswerFor(type, ['E_I', 'S_N']))),
  compareProfile('all neutral', neutralAnswerFor()),
]

console.table(rows)
