import { characters } from '@/data/characters'
import { questions } from '@/data/questions'
import type { AnswerMap, Axis, AxisScore, Character, CharacterMatch, Pole, Question, QuizResult, WaifuType } from '@/types'

export const axisPoles: Record<Axis, [Pole, Pole]> = {
  E_I: ['E', 'I'],
  S_N: ['S', 'N'],
  T_F: ['T', 'F'],
  J_P: ['J', 'P'],
}

const axes = Object.keys(axisPoles) as Axis[]
const maxAxisDistance = axes.length * 200 * 200 * 2.1

export function emptyAnswers(): AnswerMap {
  return {}
}

export function isComplete(answers: AnswerMap): boolean {
  return questions.every((question) => typeof answers[question.id] === 'number')
}

export function isQuestionSetComplete(answers: AnswerMap, selectedQuestions: Question[]): boolean {
  return selectedQuestions.every((question) => typeof answers[question.id] === 'number')
}

interface ScoringProfile {
  answers: AnswerMap
  scores: Record<Axis, number>
  confidenceByAxis: Record<Axis, number>
  importanceByAxis: Record<Axis, number>
  confidence: number
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

function axisLetter(type: WaifuType, axis: Axis): Pole {
  const index = axes.indexOf(axis)
  return type[index] as Pole
}

export function analyzeAnswers(answers: AnswerMap, selectedQuestions: Question[] = questions): ScoringProfile {
  const totals = Object.fromEntries(axes.map((axis) => [axis, 0])) as Record<Axis, number>
  const maximums = Object.fromEntries(axes.map((axis) => [axis, 0])) as Record<Axis, number>
  const evidence = Object.fromEntries(axes.map((axis) => [axis, 0])) as Record<Axis, number>

  for (const question of selectedQuestions) {
    const answer = answers[question.id] ?? 0
    const [, rightPole] = axisPoles[question.axis]
    const sign = question.favoredPole === rightPole ? 1 : -1
    totals[question.axis] += answer * question.weight * sign
    maximums[question.axis] += 3 * question.weight
    evidence[question.axis] += Math.abs(answer) * question.weight
  }

  const scores = Object.fromEntries(
    axes.map((axis) => {
      const max = maximums[axis] || 1
      return [axis, Math.round(clamp((totals[axis] / max) * 100, -100, 100))]
    }),
  ) as Record<Axis, number>

  const confidenceByAxis = Object.fromEntries(
    axes.map((axis) => {
      const max = maximums[axis] || 1
      const answerStrength = evidence[axis] / max
      const directionalClarity = Math.abs(totals[axis]) / max
      return [axis, Math.round(clamp(answerStrength * 0.45 + directionalClarity * 0.55, 0, 1) * 100)]
    }),
  ) as Record<Axis, number>

  const importanceByAxis = Object.fromEntries(
    axes.map((axis) => {
      const max = maximums[axis] || 1
      const answerStrength = evidence[axis] / max
      const directionalClarity = Math.abs(totals[axis]) / max
      return [axis, 0.75 + answerStrength * 0.45 + directionalClarity * 0.8]
    }),
  ) as Record<Axis, number>

  const confidence = Math.round(axes.reduce((sum, axis) => sum + confidenceByAxis[axis], 0) / axes.length)

  return { answers, scores, confidenceByAxis, importanceByAxis, confidence }
}

export function scoreAnswers(answers: AnswerMap): Record<Axis, number> {
  return analyzeAnswers(answers).scores
}

export function typeFromScores(scores: Record<Axis, number>): WaifuType {
  return axes.map((axis) => {
    const [left, right] = axisPoles[axis]
    return scores[axis] >= 0 ? right : left
  }).join('') as WaifuType
}

function distance(profile: ScoringProfile, character: Character, derivedType: WaifuType, selectedQuestions: Question[]): number {
  const axisDistance = axes.reduce((sum, axis) => {
    const delta = profile.scores[axis] - character.axisVector[axis]
    const weight = profile.importanceByAxis[axis]
    return sum + delta * delta * weight
  }, 0)

  const questionDistance = selectedQuestions.reduce((sum, question) => {
    const answer = profile.answers[question.id]
    if (typeof answer !== 'number') return sum

    const [, rightPole] = axisPoles[question.axis]
    const favoredDirection = question.favoredPole === rightPole ? 1 : -1
    const expected = clamp((character.axisVector[question.axis] / 100) * 3 * favoredDirection, -3, 3)
    const delta = answer - expected

    return sum + delta * delta * question.weight * 48
  }, 0)

  const typePenalty = axes.reduce((sum, axis) => {
    const expected = axisLetter(derivedType, axis)
    const actual = axisLetter(character.type, axis)
    return actual === expected ? sum : sum + profile.confidenceByAxis[axis] * 54
  }, 0)

  const sameTypeBonus = character.type === derivedType ? -profile.confidence * 12 : 0

  return axisDistance + questionDistance + typePenalty + sameTypeBonus
}

function legacyDistance(scores: Record<Axis, number>, character: Character): number {
  return axes.reduce((sum, axis) => {
    const delta = scores[axis] - character.axisVector[axis]
    return sum + delta * delta
  }, 0)
}

export function findCharacter(scores: Record<Axis, number>): Character {
  return [...characters].sort((a, b) => legacyDistance(scores, a) - legacyDistance(scores, b))[0]
}

function fitFromDistance(value: number): number {
  const normalized = 1 - value / maxAxisDistance
  return Math.round(clamp(normalized, 0, 1) * 100)
}

function typeMatchFrom(character: Character, derivedType: WaifuType): number {
  const matches = axes.filter((axis) => axisLetter(character.type, axis) === axisLetter(derivedType, axis)).length
  return Math.round((matches / axes.length) * 100)
}

export function rankCharacters(profile: ScoringProfile, selectedQuestions: Question[] = questions): CharacterMatch[] {
  const derivedType = typeFromScores(profile.scores)

  return characters
    .map((character) => {
      const matchDistance = distance(profile, character, derivedType, selectedQuestions)
      const rawFit = fitFromDistance(matchDistance)
      return {
        character,
        distance: Math.round(matchDistance),
        fit: Math.round(rawFit * 0.72 + profile.confidence * 0.28),
        typeMatch: typeMatchFrom(character, derivedType),
      }
    })
    .sort((a, b) => {
      if (b.fit !== a.fit) return b.fit - a.fit
      if (b.typeMatch !== a.typeMatch) return b.typeMatch - a.typeMatch
      if (a.distance !== b.distance) return a.distance - b.distance
      return characters.indexOf(a.character) - characters.indexOf(b.character)
    })
}

export function axisScoresFrom(scores: Record<Axis, number>, confidenceByAxis?: Record<Axis, number>): AxisScore[] {
  return axes.map((axis) => {
    const [left, right] = axisPoles[axis]
    return { axis, score: scores[axis], confidence: confidenceByAxis?.[axis] ?? Math.abs(scores[axis]), left, right }
  })
}

export function calculateResult(answers: AnswerMap, selectedQuestions: Question[] = questions): QuizResult {
  const profile = analyzeAnswers(answers, selectedQuestions)
  const topMatches = rankCharacters(profile, selectedQuestions).slice(0, 5)
  const bestMatch = topMatches[0]

  return {
    type: typeFromScores(profile.scores),
    scores: profile.scores,
    axisScores: axisScoresFrom(profile.scores, profile.confidenceByAxis),
    character: bestMatch.character,
    fit: bestMatch.fit,
    confidence: profile.confidence,
    topMatches,
  }
}
