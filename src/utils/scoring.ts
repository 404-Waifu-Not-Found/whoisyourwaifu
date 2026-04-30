import { characters } from '@/data/characters'
import { questions } from '@/data/questions'
import type {
  AnswerMap,
  Axis,
  AxisScore,
  Character,
  CharacterMatch,
  DerivedAxis,
  DerivedPole,
  Pole,
  Question,
  QuizResult,
  WaifuType,
} from '@/types'

export const axisPoles: Record<Axis, [Pole, Pole]> = {
  E_I: ['E', 'I'],
  S_N: ['S', 'N'],
  T_F: ['T', 'F'],
  J_P: ['J', 'P'],
}

// Derived "vibe" axes are linear combinations of the four MBTI axes. They
// give the result page more dimensions to read without requiring per-character
// data: every character's vibe is implied by their MBTI vector.
export const derivedAxisPoles: Record<DerivedAxis, [DerivedPole, DerivedPole]> = {
  TEMPO: ['CALM', 'WILD'],
  IDEAL: ['GROUND', 'DREAM'],
  MYSTIQUE: ['OPEN', 'MYST'],
}

const DERIVED_AXES = Object.keys(derivedAxisPoles) as DerivedAxis[]

const AXES = Object.keys(axisPoles) as Axis[]

function deriveScore(axis: DerivedAxis, mbti: Record<Axis, number>): number {
  // Tempo: extrovert (E_I < 0) + perceiver (J_P > 0) = chaotic energy.
  // Idealism: intuitive (S_N > 0) + feeler (T_F > 0) = dreamer.
  // Mystique: introvert (E_I > 0) + intuitive (S_N > 0) = mysterious.
  switch (axis) {
    case 'TEMPO':
      return clamp((-mbti.E_I + mbti.J_P) / 2, -100, 100)
    case 'IDEAL':
      return clamp((mbti.S_N + mbti.T_F) / 2, -100, 100)
    case 'MYSTIQUE':
      return clamp((mbti.E_I + mbti.S_N) / 2, -100, 100)
  }
}

function deriveConfidence(axis: DerivedAxis, conf: Record<Axis, number>): number {
  // Average confidence of the two contributing axes — a derived bar should
  // only feel as certain as the inputs it was built from.
  switch (axis) {
    case 'TEMPO':
      return (conf.E_I + conf.J_P) / 2
    case 'IDEAL':
      return (conf.S_N + conf.T_F) / 2
    case 'MYSTIQUE':
      return (conf.E_I + conf.S_N) / 2
  }
}

// Display-only confidence transform. Ranking math still uses the raw value
// so weighting stays accurate, but the user-visible number gets a floor so
// even a mid-strength sheet reads as decisively-typed. Two early exits keep
// the floor from lying:
//   - lowVariance sheets (flat-button user) get a sharply attenuated number
//   - raw confidence below 30 ramps linearly from 0 instead of jumping to
//     the 75 baseline; this catches contradictory-answer sheets where every
//     per-axis confidence cancels to 0 even though the answer values vary.
// The 30-point handoff is continuous: both branches yield ~83 at raw=30.
function displayConfidence(raw: number, lowVariance = false): number {
  if (lowVariance) return Math.round(raw * 0.3)
  if (raw < 30) return Math.round(raw * 2.75)
  return Math.round(75 + 0.25 * raw)
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v))
}

function axisLetter(type: WaifuType, axis: Axis): Pole {
  return type[AXES.indexOf(axis)] as Pole
}

// +1 if agreeing with this question pushes the user toward the right pole
// (I/N/F/P), -1 if it pushes toward the left (E/S/T/J).
function signTowardRight(question: Question): number {
  const [, right] = axisPoles[question.axis]
  return question.favoredPole === right ? 1 : -1
}

interface AxisStats {
  score: number
  confidence: number
}

function statsFor(axis: Axis, answers: AnswerMap, qs: Question[]): AxisStats {
  let signedTotal = 0
  let absTotal = 0
  let weightTotal = 0

  for (const q of qs) {
    if (q.axis !== axis) continue
    const a = answers[q.id]
    if (typeof a !== 'number') continue
    const w = q.weight
    signedTotal += a * signTowardRight(q) * w
    absTotal += Math.abs(a) * w
    weightTotal += w
  }

  if (weightTotal === 0) return { score: 0, confidence: 0 }

  const maxMagnitude = 3 * weightTotal
  const score = clamp((signedTotal / maxMagnitude) * 100, -100, 100)

  // Confidence is the geometric mean of two factors:
  //   strength = how committed the answers were (avg |answer| / 3)
  //   clarity  = how directionally consistent they were (|net| / sum |answer|)
  // sqrt smooths the product so a strong-but-mixed reading still earns some signal.
  const strength = absTotal / maxMagnitude
  const clarity = absTotal === 0 ? 0 : Math.abs(signedTotal) / absTotal
  const confidence = Math.sqrt(strength * clarity) * 100

  return { score: Math.round(score), confidence: Math.round(confidence) }
}

interface Profile {
  scores: Record<Axis, number>
  confidenceByAxis: Record<Axis, number>
  overallConfidence: number
  type: WaifuType
  // True when the user gave essentially the same answer to every question
  // (range ≤ 1 across all answered questions). The signal is unreadable, so
  // ranking and display logic skip the floor that would otherwise hide it.
  lowVariance: boolean
}

// An axis with very low confidence carries no usable signal; ranking treats
// the user's letter on that axis as "unknown" instead of forcing the
// score=0 → left-pole fallback to influence character ordering.
const AXIS_AMBIGUITY_THRESHOLD = 20

function isAxisAmbiguous(confidence: number): boolean {
  return confidence < AXIS_AMBIGUITY_THRESHOLD
}

// A sheet where every answer is the same value (or the spread is ≤ 1) is
// almost certainly a satisficing user — we can't infer preference from a
// flat button. Used to short-circuit the 80% fit floor.
function detectLowVariance(answers: AnswerMap, qs: Question[]): boolean {
  const values: number[] = []
  for (const q of qs) {
    const a = answers[q.id]
    if (typeof a === 'number') values.push(a)
  }
  if (values.length < 8) return false
  let min = values[0]
  let max = values[0]
  for (const v of values) {
    if (v < min) min = v
    if (v > max) max = v
  }
  return max - min <= 1
}

export function emptyAnswers(): AnswerMap {
  return {}
}

export function isComplete(answers: AnswerMap): boolean {
  return questions.every((q) => typeof answers[q.id] === 'number')
}

export function isQuestionSetComplete(answers: AnswerMap, qs: Question[]): boolean {
  return qs.every((q) => typeof answers[q.id] === 'number')
}

export function buildProfile(answers: AnswerMap, qs: Question[] = questions): Profile {
  const scores = {} as Record<Axis, number>
  const confidenceByAxis = {} as Record<Axis, number>
  for (const axis of AXES) {
    const s = statsFor(axis, answers, qs)
    scores[axis] = s.score
    confidenceByAxis[axis] = s.confidence
  }

  const type = AXES.map((axis) => deriveLetter(axis, scores[axis])).join('') as WaifuType
  const overallConfidence = Math.round(
    AXES.reduce((sum, axis) => sum + confidenceByAxis[axis], 0) / AXES.length,
  )
  const lowVariance = detectLowVariance(answers, qs)

  return { scores, confidenceByAxis, overallConfidence, type, lowVariance }
}

// A score of exactly 0 means no signal on that axis; deterministically pick
// the left pole as a fallback so the quiz never silently defaults to INFP.
function deriveLetter(axis: Axis, score: number): Pole {
  const [left, right] = axisPoles[axis]
  if (score === 0) return left
  return score > 0 ? right : left
}

export function scoreAnswers(answers: AnswerMap): Record<Axis, number> {
  return buildProfile(answers).scores
}

export function typeFromScores(scores: Record<Axis, number>): WaifuType {
  return AXES.map((axis) => deriveLetter(axis, scores[axis])).join('') as WaifuType
}

// Two distance metrics serve two different jobs:
//   rankDistance   — confidence-weighted, used to *order* characters so axes
//                    the user cared about dominate the match.
//   fitDistance    — confidence-independent, used to *display* a fit score so
//                    being decisive is rewarded, not penalized.
function rankDistance(profile: Profile, c: Character): number {
  let dist = 0
  let mismatchedAxes = 0
  let confidentAxes = 0
  for (const axis of AXES) {
    const axisConf = profile.confidenceByAxis[axis]
    // Ambiguous axis: the user gave us no usable signal here. Skip both the
    // distance contribution and the letter-mismatch penalty so unread axes
    // don't bias the ranking toward whichever pole deriveLetter happened to
    // pick (it always falls left on score=0).
    if (isAxisAmbiguous(axisConf)) continue
    confidentAxes += 1
    const conf01 = axisConf / 100
    const axisWeight = 0.5 + 1.5 * conf01
    const delta = (profile.scores[axis] - c.axisVector[axis]) / 100
    dist += delta * delta * axisWeight * 100
    if (axisLetter(c.type, axis) !== axisLetter(profile.type, axis)) {
      dist += 10 + 36 * conf01
      mismatchedAxes += 1
    }
  }
  // Reward an exact MBTI match — characters that hit all four letters of the
  // user's derived type should clearly beat near-miss types when the rest of
  // the vector is similar. Require at least two confident axes so a sheet
  // where almost everything is unread doesn't hand a free bonus to every
  // character that happens to share the score=0 fallback letters.
  if (mismatchedAxes === 0 && confidentAxes >= 2) dist -= 12
  return dist
}

// Fit alignment in [-1, 1]: per axis, the dot of user and character (each
// scaled to [-1, 1]). Decisive same-direction answers earn the highest fit;
// neutral answers contribute nothing; opposite-direction answers subtract.
function fitAlignment(profile: Profile, c: Character): number {
  let dot = 0
  for (const axis of AXES) {
    const u = profile.scores[axis] / 100
    const v = c.axisVector[axis] / 100
    dot += u * v
  }
  return dot / AXES.length
}

// Map alignment to [0, 100]. Anchor at 0.78 (the realistic ceiling, since
// character axis vectors max out around 0.8) and apply a power curve so small
// alignment differences between near-tied candidates translate into visible
// fit gaps. The exponent is intentionally close to linear so mid-strength
// sheets still read as decent matches; the ranking gap below handles spread.
function fitFromAlignment(alignment: number, overallConfidence: number): number {
  const normalized = clamp((alignment / 0.78 + 1) / 2, 0, 1)
  const raw = Math.pow(normalized, 1.35) * 100
  const cap =
    overallConfidence < 30
      ? 78 + overallConfidence * 0.5
      : overallConfidence < 60
      ? 90 + overallConfidence * 0.15
      : 100
  return Math.round(clamp(Math.min(raw, cap), 0, 100))
}

export function rankCharacters(profile: Profile): CharacterMatch[] {
  const enriched = characters.map((c, idx) => {
    const rd = rankDistance(profile, c)
    const align = fitAlignment(profile, c)
    const matches = AXES.filter(
      (a) => axisLetter(c.type, a) === axisLetter(profile.type, a),
    ).length
    return {
      character: c,
      distance: Math.round(rd * 100) / 100,
      fit: fitFromAlignment(align, profile.overallConfidence),
      typeMatch: Math.round((matches / AXES.length) * 100),
      _idx: idx,
    }
  })

  enriched.sort((a, b) => {
    if (b.fit !== a.fit) return b.fit - a.fit
    if (a.distance !== b.distance) return a.distance - b.distance
    if (b.typeMatch !== a.typeMatch) return b.typeMatch - a.typeMatch
    return a._idx - b._idx
  })

  // Lift the entire ranking so the top match always reads at least the
  // confidence-graduated floor. A satisficing sheet (everything ±0/±1) or
  // a sheet with confidence below 30 reads as unread; a mid-confidence
  // sheet reads as mid; only a fully-confident sheet earns the original
  // 80% floor. Lifting the whole list keeps the relative spread intact.
  const liftAllowed = !profile.lowVariance && profile.overallConfidence >= 30
  if (liftAllowed && enriched.length > 0) {
    const TOP_FLOOR_CEILING = 80
    const TOP_FLOOR_BASE = 50
    const floor = Math.round(
      TOP_FLOOR_BASE + (TOP_FLOOR_CEILING - TOP_FLOOR_BASE) * (profile.overallConfidence / 100),
    )
    if (enriched[0].fit < floor) {
      const lift = floor - enriched[0].fit
      for (const m of enriched) m.fit = clamp(m.fit + lift, 0, 100)
    }
  }

  // Enforce a visible gap between adjacent ranks. Two factors shrink the
  // gap from its base value:
  //   confFactor — low-confidence sheets show a tight cluster (we don't
  //                want a 14% drop on a sheet we can barely read).
  //   tightness  — when the underlying raw-fit gap is already smaller than
  //                the base gap, two genuinely-near matches stay close so
  //                small input perturbations don't flip a 14% display gap.
  const confFactor = 0.3 + 0.7 * (profile.overallConfidence / 100)
  for (let i = 1; i < enriched.length; i++) {
    const baseGap = i === 1 ? 14 : i < 5 ? 3 : 2
    const scaledGap = baseGap * confFactor
    const rawGap = enriched[i - 1].fit - enriched[i].fit
    const tightness = clamp(1 - rawGap / Math.max(scaledGap, 0.1), 0, 1)
    const minGap = scaledGap * (1 - tightness * 0.7)
    const ceiling = enriched[i - 1].fit - minGap
    if (enriched[i].fit > ceiling) enriched[i].fit = Math.round(clamp(ceiling, 0, 100))
  }

  return enriched.map(({ _idx, ...rest }) => rest)
}

export function axisScoresFrom(
  scores: Record<Axis, number>,
  conf?: Record<Axis, number>,
  lowVariance = false,
): AxisScore[] {
  const mbtiRows: AxisScore[] = AXES.map((axis) => {
    const [left, right] = axisPoles[axis]
    const rawConf = conf?.[axis] ?? Math.abs(scores[axis])
    return {
      axis,
      score: scores[axis],
      confidence: displayConfidence(rawConf, lowVariance),
      left,
      right,
    }
  })

  const confRecord =
    conf ??
    AXES.reduce((acc, axis) => {
      acc[axis] = Math.abs(scores[axis])
      return acc
    }, {} as Record<Axis, number>)

  const derivedRows: AxisScore[] = DERIVED_AXES.map((axis) => {
    const [left, right] = derivedAxisPoles[axis]
    return {
      axis,
      score: Math.round(deriveScore(axis, scores)),
      confidence: displayConfidence(deriveConfidence(axis, confRecord), lowVariance),
      left,
      right,
      derived: true,
    }
  })

  return [...mbtiRows, ...derivedRows]
}

export function calculateResult(answers: AnswerMap, qs: Question[] = questions): QuizResult {
  const profile = buildProfile(answers, qs)
  const ranked = rankCharacters(profile)
  const top = ranked.slice(0, 5)
  const best = top[0]
  return {
    type: profile.type,
    scores: profile.scores,
    axisScores: axisScoresFrom(profile.scores, profile.confidenceByAxis, profile.lowVariance),
    character: best.character,
    fit: best.fit,
    confidence: displayConfidence(profile.overallConfidence, profile.lowVariance),
    topMatches: top,
  }
}

// Used by the eval harness; mirrors the production ranking path.
export function findCharacter(scores: Record<Axis, number>): Character {
  const profile: Profile = {
    scores,
    confidenceByAxis: { E_I: 50, S_N: 50, T_F: 50, J_P: 50 },
    overallConfidence: 50,
    type: typeFromScores(scores),
    lowVariance: false,
  }
  return rankCharacters(profile)[0].character
}

export function analyzeAnswers(answers: AnswerMap, qs: Question[] = questions) {
  const p = buildProfile(answers, qs)
  const importanceByAxis = AXES.reduce((acc, axis) => {
    acc[axis] = 0.4 + 1.4 * (p.confidenceByAxis[axis] / 100)
    return acc
  }, {} as Record<Axis, number>)
  return {
    answers,
    scores: p.scores,
    confidenceByAxis: p.confidenceByAxis,
    importanceByAxis,
    confidence: p.overallConfidence,
  }
}
