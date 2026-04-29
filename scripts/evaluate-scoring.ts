import { characters } from '@/data/characters'
import { questions } from '@/data/questions'
import { calculateResult, findCharacter, scoreAnswers } from '@/utils/scoring'
import type {
  AnswerMap,
  AnswerValue,
  Axis,
  Pole,
  Question,
  WaifuType,
} from '@/types'

const axisIndex: Record<Axis, number> = {
  E_I: 0,
  S_N: 1,
  T_F: 2,
  J_P: 3,
}

const AXES: Axis[] = ['E_I', 'S_N', 'T_F', 'J_P']

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

// New generators -----------------------------------------------------------

// All ±1 aligned to type. Strength is low; clarity is perfect. Tests whether
// the fit floor lifts low-confidence sheets to a misleadingly high number.
function lukewarmAnswerFor(type: WaifuType): AnswerMap {
  return Object.fromEntries(
    questions.map((question) => {
      const value = question.favoredPole === targetPole(type, question.axis) ? 1 : -1
      return [question.id, value as AnswerValue]
    }),
  )
}

// Only one axis answered ±3, the other 36 questions are 0. Tests how a single
// strong axis dominates ranking when the rest is silent.
function singleAxisAnswerFor(type: WaifuType, axis: Axis): AnswerMap {
  return partialAxisAnswerFor(type, [axis])
}

// Strong-aligned for `type` except one axis is flipped to opposite-sign ±3.
// Measures ranking stability when one of four axes disagrees.
function flippedOneAxisAnswerFor(type: WaifuType, flipped: Axis): AnswerMap {
  return Object.fromEntries(
    questions.map((question) => {
      const target = targetPole(type, question.axis)
      const aligned = question.favoredPole === target
      const flip = question.axis === flipped
      const sign = aligned !== flip ? 3 : -3
      return [question.id, sign as AnswerValue]
    }),
  )
}

// All +3 (or all -3) regardless of favoredPole — the user who clicks "agree"
// for everything. Should produce low clarity, not a confident match.
function biasAnswerFor(value: AnswerValue): AnswerMap {
  return Object.fromEntries(questions.map((q) => [q.id, value]))
}

// Borderline mix between two types — exercises tie-breaking and the fixed
// gap-enforcement code in rankCharacters (scoring.ts:263-268).
function nearTieAnswerFor(typeA: WaifuType, typeB: WaifuType): AnswerMap {
  return Object.fromEntries(
    questions.map((question, index) => {
      const refType = index % 2 === 0 ? typeA : typeB
      const target = targetPole(refType, question.axis)
      const value = question.favoredPole === target ? 2 : -2
      return [question.id, value as AnswerValue]
    }),
  )
}

// Strong-aligned with `flipCount` randomly chosen answers flipped sign.
// Used to measure top-1 stability under tiny perturbations.
function perturbedAnswerFor(type: WaifuType, seed: number, flipCount = 1): AnswerMap {
  const rng = lcg(seed)
  const flipIndices = new Set<number>()
  while (flipIndices.size < flipCount && flipIndices.size < questions.length) {
    flipIndices.add(Math.floor(rng() * questions.length))
  }
  return Object.fromEntries(
    questions.map((question, index) => {
      const target = targetPole(type, question.axis)
      const aligned = question.favoredPole === target
      const sign = (aligned ? 3 : -3) * (flipIndices.has(index) ? -1 : 1)
      return [question.id, sign as AnswerValue]
    }),
  )
}

// Picks 8 questions per axis (32 total) the way loadQuestionOrder does in
// production, then runs the inner generator against only that subset. Real
// users only ever see this path — the full 48-question generators above test
// algorithm math, this tests what the deployed quiz actually delivers.
function sessionFor(
  seed: number,
  inner: (qs: Question[]) => AnswerMap,
): { answers: AnswerMap; qs: Question[] } {
  const rng = lcg(seed)
  const qs = AXES.flatMap((axis) => {
    const group = questions.filter((q) => q.axis === axis)
    return shuffleSeeded(group, rng).slice(0, 8)
  })
  return { answers: inner(qs), qs }
}

// Strong-aligned generator that operates on a custom question set (used by
// sessionFor). Same logic as answerFor but scoped.
function strongFromSubset(type: WaifuType, qs: Question[]): AnswerMap {
  return Object.fromEntries(
    qs.map((q) => {
      const target = targetPole(type, q.axis)
      const value = q.favoredPole === target ? 3 : -3
      return [q.id, value as AnswerValue]
    }),
  )
}

// Tiny seeded LCG — same pattern used by randomAnswerFor below.
function lcg(seed: number): () => number {
  let state = (seed * 2654435761) >>> 0
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0
    return state / 0xffffffff
  }
}

function shuffleSeeded<T>(values: T[], rng: () => number): T[] {
  const result = [...values]
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

// --------------------------------------------------------------------------

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

function randomAnswerFor(seed: number): AnswerMap {
  const rng = lcg(seed)
  const values: AnswerValue[] = [-3, -2, -1, 0, 1, 2, 3]
  return Object.fromEntries(
    questions.map((question) => [
      question.id,
      values[Math.floor(rng() * values.length)] as AnswerValue,
    ]),
  )
}

const rows = [
  ...types.map((type) => compareProfile(`${type} strong`, answerFor(type, 3))),
  ...types.map((type) => compareProfile(`${type} mixed`, mixedAnswerFor(type))),
  ...types.map((type) => compareProfile(`${type} noisy`, noisyAnswerFor(type))),
  ...types.slice(0, 8).map((type) => compareProfile(`${type} contradictory`, contradictoryAnswerFor(type))),
  ...types.slice(8).map((type) => compareProfile(`${type} partial EI/SN`, partialAxisAnswerFor(type, ['E_I', 'S_N']))),
  compareProfile('all neutral', neutralAnswerFor()),
  ...Array.from({ length: 12 }, (_, i) => compareProfile(`random #${i + 1}`, randomAnswerFor(i + 1))),
]

console.table(rows)

const topFits = rows.map((r) => Number.parseInt(r.fit, 10))
const minTop = Math.min(...topFits)
const below70 = topFits.filter((f) => f < 70).length
console.log(`\nTop-fit floor check — min: ${minTop}%, rows below 70%: ${below70} / ${rows.length}`)

// ===========================================================================
// runAnalysis(): structured metrics for the matching algorithm.
//
// Each section prints a short table and a one-line headline. The findings
// block at the bottom summarizes which expectations the current algorithm
// violates — that's the input to the follow-up algo-improvement plan.
// ===========================================================================

interface MetricFinding {
  section: string
  message: string
}

function pct(n: number, d: number): string {
  if (d === 0) return '0%'
  return `${Math.round((n / d) * 1000) / 10}%`
}

function runAnalysis(): MetricFinding[] {
  const findings: MetricFinding[] = []
  console.log('\n=== Algorithm analysis ===\n')

  // -- 1. Type-recovery rate ------------------------------------------------
  // For each input pattern bucket, how often does enhanced.type match the
  // intended input type? Strong should be 16/16; the others tell us how
  // gracefully confidence degrades.
  const recovery = (label: string, gen: (t: WaifuType) => AnswerMap) => {
    let hits = 0
    const misses: string[] = []
    for (const t of types) {
      const result = calculateResult(gen(t))
      if (result.type === t) hits += 1
      else misses.push(`${t}→${result.type}`)
    }
    return { label, hits, total: types.length, misses }
  }

  const recoveryRows = [
    recovery('strong (±3)', (t) => answerFor(t, 3)),
    recovery('mixed (mostly ±2)', mixedAnswerFor),
    recovery('noisy (random pattern)', noisyAnswerFor),
    recovery('lukewarm (±1)', lukewarmAnswerFor),
    recovery('contradictory', contradictoryAnswerFor),
  ].map((r) => ({
    pattern: r.label,
    'type-recovery': `${r.hits}/${r.total}`,
    rate: pct(r.hits, r.total),
    misses: r.misses.slice(0, 5).join(', ') || '—',
  }))
  console.log('1) Type-recovery rate (derived MBTI matches input type):')
  console.table(recoveryRows)

  for (const r of recoveryRows) {
    if (r.pattern === 'strong (±3)' && r['type-recovery'] !== '16/16') {
      findings.push({ section: '1', message: `Strong-aligned recovery is ${r['type-recovery']} (expected 16/16). Misses: ${r.misses}.` })
    }
    if (r.pattern === 'lukewarm (±1)' && r['type-recovery'] !== '16/16') {
      findings.push({ section: '1', message: `Lukewarm (±1 aligned) recovery is ${r['type-recovery']}; weak-but-consistent answers should still derive the right type.` })
    }
  }

  // -- 2. Top-character type fidelity ---------------------------------------
  // Of the 16 strong-aligned profiles, how many top-1 characters share the
  // input type? Sub-100% reveals uneven class sizes (ENFP=14 vs ISFP=2).
  let strongTypeMatches = 0
  const strongTopByType: Record<WaifuType, string> = {} as Record<WaifuType, string>
  for (const t of types) {
    const result = calculateResult(answerFor(t, 3))
    strongTopByType[t] = `${result.character.name.en} (${result.character.type})`
    if (result.character.type === t) strongTypeMatches += 1
  }
  console.log('\n2) Top-character type fidelity for strong-aligned profiles:')
  console.table(
    types.map((t) => ({
      input: t,
      'top character': strongTopByType[t],
      'type-match': strongTopByType[t].endsWith(`(${t})`) ? 'yes' : 'no',
    })),
  )
  console.log(`Headline: ${strongTypeMatches}/${types.length} strong-aligned profiles return a top character of the same MBTI type.`)
  if (strongTypeMatches < types.length) {
    findings.push({ section: '2', message: `${types.length - strongTypeMatches}/${types.length} strong profiles return a top character of a different MBTI type.` })
  }

  // -- 3. Top-1 stability under perturbation --------------------------------
  // For each type, run 5 perturbed (1-flip) sheets and count how many keep
  // the same top character as the unperturbed strong sheet. Flags ranking
  // thrash — a single accidental click shouldn't change the result.
  const stabilityRows: Array<Record<string, string>> = []
  let stableTypes = 0
  for (const t of types) {
    const baseline = calculateResult(answerFor(t, 3)).character.id
    let stable = 0
    for (let s = 1; s <= 5; s += 1) {
      const result = calculateResult(perturbedAnswerFor(t, s, 1))
      if (result.character.id === baseline) stable += 1
    }
    if (stable === 5) stableTypes += 1
    stabilityRows.push({ type: t, baseline, 'stable / 5': `${stable}` })
  }
  console.log('\n3) Top-1 stability under 1-answer perturbation (5 seeds per type):')
  console.table(stabilityRows)
  console.log(`Headline: ${stableTypes}/${types.length} types keep the same top character under all 5 single-answer perturbations.`)
  if (stableTypes < types.length - 2) {
    findings.push({ section: '3', message: `Only ${stableTypes}/${types.length} types are fully stable under a single answer flip; small clicks change the result.` })
  }

  // -- 4. Fit-floor distribution by pattern ---------------------------------
  // Confirms whether lukewarm/contradictory/neutral profiles still hit the
  // 80% floor. The floor is set in scoring.ts:255-259.
  const fitBuckets = [
    { label: 'strong', samples: types.map((t) => calculateResult(answerFor(t, 3))) },
    { label: 'mixed', samples: types.map((t) => calculateResult(mixedAnswerFor(t))) },
    { label: 'noisy', samples: types.map((t) => calculateResult(noisyAnswerFor(t))) },
    { label: 'lukewarm (±1)', samples: types.map((t) => calculateResult(lukewarmAnswerFor(t))) },
    { label: 'contradictory', samples: types.map((t) => calculateResult(contradictoryAnswerFor(t))) },
    { label: 'all neutral', samples: [calculateResult(neutralAnswerFor())] },
    { label: 'all +3 (yes-bias)', samples: [calculateResult(biasAnswerFor(3))] },
    { label: 'all -3 (no-bias)', samples: [calculateResult(biasAnswerFor(-3))] },
    { label: 'random', samples: Array.from({ length: 12 }, (_, i) => calculateResult(randomAnswerFor(i + 1))) },
  ]
  console.log('\n4) Fit + confidence distribution by input pattern:')
  console.table(
    fitBuckets.map((b) => {
      const fits = b.samples.map((s) => s.fit)
      const confs = b.samples.map((s) => s.confidence)
      const avg = (xs: number[]) => Math.round(xs.reduce((a, x) => a + x, 0) / xs.length)
      return {
        pattern: b.label,
        n: b.samples.length,
        'min fit': Math.min(...fits),
        'avg fit': avg(fits),
        'max fit': Math.max(...fits),
        'avg confidence': avg(confs),
      }
    }),
  )

  for (const b of fitBuckets) {
    const fits = b.samples.map((s) => s.fit)
    const confs = b.samples.map((s) => s.confidence)
    const avgFit = Math.round(fits.reduce((a, x) => a + x, 0) / fits.length)
    const avgConf = Math.round(confs.reduce((a, x) => a + x, 0) / confs.length)
    if ((b.label === 'lukewarm (±1)' || b.label === 'contradictory' || b.label === 'all neutral' || b.label.startsWith('all +3') || b.label.startsWith('all -3')) && avgFit >= 80) {
      findings.push({
        section: '4',
        message: `Pattern "${b.label}" reports avg fit ${avgFit}% at confidence ${avgConf}% — the 80% floor is masking low-quality input.`,
      })
    }
  }

  // -- 5. Class-size bias ---------------------------------------------------
  // For each input type, count what MBTI types appear in the top 5. Reveals
  // whether overrepresented classes (ENFP=14, INTJ=8, INFJ=8) crowd out
  // underrepresented ones (ISFP=2).
  const classCounts = characters.reduce((acc, c) => {
    acc[c.type] = (acc[c.type] ?? 0) + 1
    return acc
  }, {} as Record<WaifuType, number>)
  console.log('\n5a) Character class sizes (top of the iceberg of class-size bias):')
  console.table(
    types.map((t) => ({ type: t, 'character count': classCounts[t] ?? 0 })),
  )

  console.log('\n5b) Top-5 MBTI distribution per strong-aligned input type:')
  const classRows = types.map((t) => {
    const result = calculateResult(answerFor(t, 3))
    const dist = result.topMatches.reduce((acc, m) => {
      acc[m.character.type] = (acc[m.character.type] ?? 0) + 1
      return acc
    }, {} as Record<WaifuType, number>)
    return {
      input: t,
      'top-5 types': Object.entries(dist)
        .map(([k, v]) => `${k}×${v}`)
        .join(', '),
    }
  })
  console.table(classRows)

  // 5c) Random-sheet winners — does ENFP win disproportionately?
  const randomWinners = Array.from({ length: 24 }, (_, i) => calculateResult(randomAnswerFor(i + 1)).character.type)
  const winnerHist = randomWinners.reduce((acc, t) => {
    acc[t] = (acc[t] ?? 0) + 1
    return acc
  }, {} as Record<WaifuType, number>)
  console.log('\n5c) Top-1 winner distribution across 24 random sheets:')
  console.table(
    Object.entries(winnerHist)
      .sort((a, b) => b[1] - a[1])
      .map(([type, n]) => ({ type, wins: n, expected: '~1.5', share: pct(n, randomWinners.length) })),
  )
  const topWinner = Object.entries(winnerHist).sort((a, b) => b[1] - a[1])[0]
  if (topWinner && topWinner[1] >= 5) {
    findings.push({
      section: '5',
      message: `Class-size bias: ${topWinner[0]} wins ${topWinner[1]}/${randomWinners.length} random sheets (uniform would be ~1.5). Likely driven by the ${classCounts[topWinner[0] as WaifuType]} ${topWinner[0]} characters in the dataset.`,
    })
  }

  // -- 6. Session vs full-sheet delta --------------------------------------
  // Real users see 32 of 48 questions. Does the result differ when only the
  // production-shaped subset is scored?
  const sessionRows: Array<Record<string, string>> = []
  let sessionDiffs = 0
  for (const t of types) {
    const fullId = calculateResult(answerFor(t, 3)).character.id
    const { answers, qs } = sessionFor(t.length + types.indexOf(t) * 7, (qs) => strongFromSubset(t, qs))
    const sessionResult = calculateResult(answers, qs)
    const same = sessionResult.character.id === fullId
    if (!same) sessionDiffs += 1
    sessionRows.push({
      type: t,
      'full-sheet top': fullId,
      'session top': sessionResult.character.id,
      same: same ? 'yes' : 'no',
    })
  }
  console.log('\n6) Session (32q) vs full-sheet (48q) top character for strong inputs:')
  console.table(sessionRows)
  console.log(`Headline: ${types.length - sessionDiffs}/${types.length} session results match the full-sheet top character.`)
  if (sessionDiffs > 2) {
    findings.push({
      section: '6',
      message: `${sessionDiffs}/${types.length} strong-aligned session sheets pick a different top character than the full sheet — the random 8-per-axis subset can swing the result.`,
    })
  }

  // -- 7. Near-tie gap behavior --------------------------------------------
  // nearTieAnswerFor mixes two types 50/50. Inspect the top-3 fit gaps —
  // the enforced minGap (scoring.ts:265) makes the runner-up look 14% behind
  // even if the underlying distance gap is tiny.
  const tiePairs: Array<[WaifuType, WaifuType]> = [
    ['INTJ', 'INFJ'],
    ['ENFP', 'ENTP'],
    ['ISTJ', 'ISFJ'],
    ['ESTP', 'ESFP'],
  ]
  console.log('\n7) Near-tie fit gaps (50/50 mix between two types):')
  console.table(
    tiePairs.map(([a, b]) => {
      const result = calculateResult(nearTieAnswerFor(a, b))
      const [t1, t2, t3] = result.topMatches
      const distGap = t2 ? Math.round((t2.distance - t1.distance) * 100) / 100 : 0
      const fitGap = t2 ? t1.fit - t2.fit : 0
      return {
        mix: `${a}/${b}`,
        derived: result.type,
        '1st': `${t1.character.name.en} ${t1.fit}%`,
        '2nd': t2 ? `${t2.character.name.en} ${t2.fit}%` : '—',
        '3rd': t3 ? `${t3.character.name.en} ${t3.fit}%` : '—',
        'fit gap 1→2': `${fitGap}%`,
        'distance gap 1→2': distGap,
      }
    }),
  )
  findings.push({
    section: '7',
    message: 'Near-tie fit gaps are dominated by the enforced 14% top-to-runner-up minGap (scoring.ts:265), not by underlying distance — small mix changes can flip the displayed leader by 14%.',
  })

  // -- 8. Single-axis dominance --------------------------------------------
  // When only one axis is answered, does the algorithm still confidently
  // rank? Lower is better — high fits here mean the floor is overconfident.
  console.log('\n8) Single-axis-only sheets (one axis ±3, others 0):')
  console.table(
    AXES.map((axis) => {
      const result = calculateResult(singleAxisAnswerFor('INTJ', axis))
      return {
        'active axis': axis,
        'derived type': result.type,
        'top character': `${result.character.name.en} (${result.character.type})`,
        fit: `${result.fit}%`,
        confidence: `${result.confidence}%`,
      }
    }),
  )

  // -- 9. Yes/no satisficing -----------------------------------------------
  // All +3 / all -3 — the user clicked the same button for everything.
  // Should produce neutral/confused result, not a confident one.
  console.log('\n9) Satisficing patterns (all +3, all -3):')
  console.table(
    [3, -3].map((v) => {
      const result = calculateResult(biasAnswerFor(v as AnswerValue))
      return {
        pattern: v === 3 ? 'all +3' : 'all -3',
        'derived type': result.type,
        'top character': `${result.character.name.en} (${result.character.type})`,
        fit: `${result.fit}%`,
        confidence: `${result.confidence}%`,
      }
    }),
  )
  for (const v of [3, -3]) {
    const result = calculateResult(biasAnswerFor(v as AnswerValue))
    if (result.fit >= 80 || result.confidence >= 50) {
      findings.push({
        section: '9',
        message: `Satisficing pattern (all ${v > 0 ? '+3' : '-3'}) reports ${result.fit}% fit at ${result.confidence}% confidence — the algorithm should detect a flat-button user.`,
      })
    }
  }

  // -- 10. Per-question impact audit ---------------------------------------
  // For each of the 48 questions, set ONLY that question to +3 (rest 0) and
  // record which axis moved and in which direction. A correctly-tagged
  // question must move its declared axis in the direction of its declared
  // favoredPole. Mislabeled axis or pole shows up as an off-axis swing or
  // a sign reversal.
  const flagsByQuestion: Array<Record<string, string>> = []
  let mislabeled = 0
  let leakedToOtherAxis = 0
  for (const q of questions) {
    const answers: AnswerMap = Object.fromEntries(
      questions.map((other) => [other.id, other.id === q.id ? (3 as AnswerValue) : (0 as AnswerValue)]),
    )
    const scores = scoreAnswers(answers)
    const movedAxis = AXES.reduce((best, a) => (Math.abs(scores[a]) > Math.abs(scores[best]) ? a : best), 'E_I' as Axis)
    const onAxisScore = scores[q.axis]
    const expectedRight = q.favoredPole === axisPolesRight(q.axis)
    const movedTowardRight = onAxisScore > 0
    const polarityOk = expectedRight ? movedTowardRight : !movedTowardRight
    const offAxisLeak = AXES.filter((a) => a !== q.axis && Math.abs(scores[a]) > 0.5).length
    if (movedAxis !== q.axis) leakedToOtherAxis += 1
    if (!polarityOk || onAxisScore === 0) mislabeled += 1
    if (!polarityOk || movedAxis !== q.axis || offAxisLeak > 0) {
      flagsByQuestion.push({
        id: q.id,
        axis: q.axis,
        favoredPole: q.favoredPole,
        weight: String(q.weight),
        'on-axis Δ': String(onAxisScore),
        'top-moved axis': movedAxis,
        'polarity ok': polarityOk ? 'yes' : 'NO',
        'off-axis leak': String(offAxisLeak),
      })
    }
  }
  console.log('\n10) Per-question impact audit (only flagged rows shown):')
  if (flagsByQuestion.length === 0) {
    console.log('All 48 questions move their declared axis in the declared direction with no off-axis leakage.')
  } else {
    console.table(flagsByQuestion)
    findings.push({
      section: '10',
      message: `${flagsByQuestion.length} question(s) show inconsistent labeling or off-axis leakage; ${mislabeled} have wrong polarity, ${leakedToOtherAxis} move a non-declared axis more than their own.`,
    })
  }

  // -- 11. Per-question discriminative power -------------------------------
  // Within each axis, how much does each question move the score when set to
  // +3 alone? Outliers (very weak vs very strong impact) are calibration
  // candidates. We expect impact ∝ weight (since scoring divides by total
  // axis weight, a weight-1.4 question should move the score ~2x a
  // weight-0.7 question).
  const impactRows = questions.map((q) => {
    const answers: AnswerMap = Object.fromEntries(
      questions.map((other) => [other.id, other.id === q.id ? (3 as AnswerValue) : (0 as AnswerValue)]),
    )
    const score = scoreAnswers(answers)[q.axis]
    return {
      id: q.id,
      axis: q.axis,
      pole: q.favoredPole,
      weight: q.weight,
      'on-axis score': score,
      'impact / weight': Math.round((Math.abs(score) / q.weight) * 100) / 100,
    }
  })
  // Group by axis, compute mean/min/max impact per axis.
  console.log('\n11) Per-question impact-per-weight by axis (variance reveals miscalibration):')
  console.table(
    AXES.map((axis) => {
      const rows = impactRows.filter((r) => r.axis === axis)
      const ratios = rows.map((r) => r['impact / weight'])
      const min = Math.min(...ratios)
      const max = Math.max(...ratios)
      const mean = Math.round((ratios.reduce((a, x) => a + x, 0) / ratios.length) * 100) / 100
      return {
        axis,
        n: rows.length,
        'mean impact/weight': mean,
        'min impact/weight': min,
        'max impact/weight': max,
        'spread (max-min)': Math.round((max - min) * 100) / 100,
      }
    }),
  )

  // -- 12. Strength gradient ------------------------------------------------
  // For each type, answer all questions aligned at strength 1, 2, 3. Fit
  // should be monotone increasing with strength; if it plateaus at the
  // floor (80%) for both 1 and 2, the floor is squashing the gradient.
  console.log('\n12) Fit gradient by answer strength (mean across 16 types):')
  console.table(
    [1, 2, 3].map((s) => {
      const samples = types.map((t) => calculateResult(answerFor(t, s as AnswerValue)))
      const avg = (xs: number[]) => Math.round(xs.reduce((a, x) => a + x, 0) / xs.length)
      return {
        'answer strength': `±${s}`,
        'avg fit': avg(samples.map((x) => x.fit)),
        'avg confidence': avg(samples.map((x) => x.confidence)),
        'top1 type-match': `${samples.filter((x) => x.character.type === x.type).length}/${types.length}`,
      }
    }),
  )
  // Flag if ±1 and ±2 both report identical fit (floor is squashing).
  const f1 = calculateResult(answerFor('INTJ', 1)).fit
  const f2 = calculateResult(answerFor('INTJ', 2)).fit
  if (f1 === f2) {
    findings.push({
      section: '12',
      message: `INTJ aligned at ±1 and ±2 both report ${f1}% fit — the 80% floor flattens the strength gradient so users can't tell weak from medium answers apart.`,
    })
  }

  // -- 13. Larger perturbations --------------------------------------------
  // Top-1 stability when 1 / 2 / 4 / 8 / 16 answers are flipped. Reveals the
  // break-even point at which the algorithm changes its mind.
  console.log('\n13) Top-1 stability vs perturbation size (5 seeds × 16 types):')
  const perturbRows = [1, 2, 4, 8, 16].map((flips) => {
    let stable = 0
    let total = 0
    for (const t of types) {
      const baseline = calculateResult(answerFor(t, 3)).character.id
      for (let s = 1; s <= 5; s += 1) {
        total += 1
        if (calculateResult(perturbedAnswerFor(t, s + flips * 100, flips)).character.id === baseline) stable += 1
      }
    }
    return { 'flips applied': flips, 'top1 stable': `${stable}/${total}`, 'stability': pct(stable, total) }
  })
  console.table(perturbRows)

  // -- 14. Character coverage ----------------------------------------------
  // Across all the synthetic profiles fired during this eval, count distinct
  // top-1 characters. Reveals reachability — characters that the algorithm
  // never elects under any pattern are effectively dead weight.
  const reachedTop1 = new Set<string>()
  const everInTop5 = new Set<string>()
  const winsByCharacter: Record<string, number> = {}
  const sample: AnswerMap[] = [
    ...types.map((t) => answerFor(t, 3)),
    ...types.map((t) => answerFor(t, 2)),
    ...types.map((t) => answerFor(t, 1)),
    ...types.map((t) => mixedAnswerFor(t)),
    ...types.map((t) => noisyAnswerFor(t)),
    ...types.map((t) => lukewarmAnswerFor(t)),
    ...types.flatMap((t) => AXES.map((a) => flippedOneAxisAnswerFor(t, a))),
    ...Array.from({ length: 64 }, (_, i) => randomAnswerFor(i + 1)),
  ]
  for (const a of sample) {
    const r = calculateResult(a)
    reachedTop1.add(r.character.id)
    winsByCharacter[r.character.id] = (winsByCharacter[r.character.id] ?? 0) + 1
    for (const m of r.topMatches) everInTop5.add(m.character.id)
  }
  const totalChars = characters.length
  console.log(`\n14) Character coverage across ${sample.length} synthetic profiles:`)
  console.log(`Headline: ${reachedTop1.size}/${totalChars} characters ever appear top-1; ${everInTop5.size}/${totalChars} ever appear in top-5.`)
  const unreachable = characters.filter((c) => !everInTop5.has(c.id))
  if (unreachable.length > 0) {
    console.log(`Unreachable in top-5 (${unreachable.length}):`)
    console.table(unreachable.map((c) => ({ id: c.id, name: c.name.en, type: c.type })).slice(0, 20))
    findings.push({
      section: '14',
      message: `${unreachable.length}/${totalChars} characters never appear in any top-5 across ${sample.length} diverse synthetic profiles. Likely dominated by another same-type character with a similar but slightly stronger axisVector.`,
    })
  }
  // Also show the top-10 most-elected characters — concentration of wins.
  const winList = Object.entries(winsByCharacter).sort((a, b) => b[1] - a[1]).slice(0, 10)
  console.log(`Top-10 most-elected characters across the ${sample.length} profiles:`)
  console.table(
    winList.map(([id, n]) => {
      const c = characters.find((x) => x.id === id)!
      return { id, name: c.name.en, type: c.type, wins: n, share: pct(n, sample.length) }
    }),
  )

  // -- 15. Zero-score collapse magnitude -----------------------------------
  // Among the patterns we fire, how many produce derived type ESTJ via the
  // score-0-falls-left fallback? This measures the magnitude of the bug
  // where contradictory / all-neutral / all-+3 / all--3 all collapse to one
  // character.
  const collapsePatterns: Array<{ name: string; result: ReturnType<typeof calculateResult> }> = [
    { name: 'all neutral', result: calculateResult(neutralAnswerFor()) },
    { name: 'all +3', result: calculateResult(biasAnswerFor(3)) },
    { name: 'all -3', result: calculateResult(biasAnswerFor(-3)) },
    ...types.map((t) => ({ name: `${t} contradictory`, result: calculateResult(contradictoryAnswerFor(t)) })),
  ]
  const collapsedToSame = collapsePatterns.filter((p) => p.result.character.id === collapsePatterns[0].result.character.id).length
  console.log('\n15) Zero-score collapse: patterns producing scores ≈ {0,0,0,0}:')
  console.table(
    collapsePatterns.map((p) => ({
      pattern: p.name,
      'derived type': p.result.type,
      'top character': `${p.result.character.name.en} (${p.result.character.type})`,
      fit: `${p.result.fit}%`,
      confidence: `${p.result.confidence}%`,
      scores: AXES.map((a) => p.result.scores[a]).join(','),
    })),
  )
  // The collapse to a single character is acceptable when the result is
  // honestly labeled as low-confidence/low-fit. Only flag when the
  // collapsed result is still *presented as confident* to the user.
  const collapsedAndConfident = collapsePatterns.filter(
    (p) =>
      p.result.character.id === collapsePatterns[0].result.character.id &&
      (p.result.fit >= 50 || p.result.confidence >= 30),
  ).length
  if (collapsedAndConfident >= collapsePatterns.length - 2) {
    findings.push({
      section: '15',
      message: `${collapsedAndConfident}/${collapsePatterns.length} ambiguous-input patterns collapse to the SAME top character AND still display fit ≥ 50% or confidence ≥ 30% — the user can't tell their input was unreadable.`,
    })
  } else if (collapsedToSame >= collapsePatterns.length - 2) {
    console.log(
      `Note: ${collapsedToSame}/${collapsePatterns.length} ambiguous patterns still pick the same top character, but it now reads as low-confidence so the UI can surface the ambiguity.`,
    )
  }

  // -- 16. Adjacency cost --------------------------------------------------
  // For a strong INTJ profile, what is the fit & rank gap to characters at
  // letter-distance 1, 2, 3, 4 from INTJ? Should grow monotonically with
  // letter distance — if it doesn't, type matching is weakly enforced.
  const refType: WaifuType = 'INTJ'
  const refResult = calculateResult(answerFor(refType, 3))
  function letterDistance(a: WaifuType, b: WaifuType): number {
    let d = 0
    for (let i = 0; i < 4; i += 1) if (a[i] !== b[i]) d += 1
    return d
  }
  const byDistance: Record<number, { count: number; bestFit: number; worstFit: number; bestRank: number }> = {}
  refResult.topMatches.forEach(() => {})
  // Use the full ranking (not just top-5).
  // We can recover it by re-sorting all characters via a fresh calculateResult
  // — calculateResult only returns top-5, so reproduce by walking characters.
  const allRankings = characters.map((c) => {
    const partial = calculateResult(answerFor(refType, 3)).topMatches.find((m) => m.character.id === c.id)
    if (partial) return { id: c.id, type: c.type, fit: partial.fit, inTop5: true }
    // For non-top-5 characters we don't get fit but we get type-distance.
    return { id: c.id, type: c.type, fit: -1, inTop5: false }
  })
  for (const row of allRankings) {
    const d = letterDistance(refType, row.type)
    const slot = (byDistance[d] = byDistance[d] ?? { count: 0, bestFit: -1, worstFit: 101, bestRank: 99 })
    slot.count += 1
    if (row.fit >= 0) {
      if (row.fit > slot.bestFit) slot.bestFit = row.fit
      if (row.fit < slot.worstFit) slot.worstFit = row.fit
    }
  }
  console.log(`\n16) Adjacency cost from INTJ (top-5 fit by letter distance):`)
  console.table(
    [0, 1, 2, 3, 4].map((d) => ({
      'letter distance': d,
      'characters at this distance': byDistance[d]?.count ?? 0,
      'best fit (top-5)': byDistance[d]?.bestFit === -1 ? 'none in top-5' : byDistance[d]?.bestFit,
      'worst fit (top-5)': byDistance[d]?.worstFit === 101 ? 'none in top-5' : byDistance[d]?.worstFit,
    })),
  )

  return findings
}

// Helper: look up the right pole of an axis without re-importing axisPoles.
function axisPolesRight(axis: Axis): Pole {
  return ({ E_I: 'I', S_N: 'N', T_F: 'F', J_P: 'P' } as Record<Axis, Pole>)[axis]
}

const findings = runAnalysis()

console.log('\n=== Findings ===')
if (findings.length === 0) {
  console.log('No regressions detected against the locked-in thresholds.')
} else {
  for (const f of findings) console.log(`- [§${f.section}] ${f.message}`)
}

console.log('\n=== Candidate algorithm improvements (deferred to follow-up) ===')
console.log('- Drop the unconditional 80% fit floor (scoring.ts:255-259) when overallConfidence < 30; let weak sheets read as weak.')
console.log('- Replace the fixed 14%/3%/2% minGap chain (scoring.ts:263-268) with a confidence-derived gap so near-ties stay visually close.')
console.log('- Penalize overrepresented MBTI classes in rankCharacters: divide distance bonus by sqrt(class size) so rare types are not crowded out.')
console.log('- Make fitAlignment confidence-aware so a decisive single-axis sheet beats a lukewarm 4-axis sheet (currently fitAlignment ignores confidence).')
console.log('- Detect satisficing (all answers same sign/value) and surface as low-confidence rather than confident-neutral.')
console.log('- Score-0 fallback: deriveLetter (scoring.ts:160-164) sends every zero-score axis to the LEFT pole, so ambiguous sheets all collapse to ESTJ. Treat low-confidence axes as "unknown" or randomize/jitter the type, then surface the uncertainty.')
console.log('- Strength gradient: ±1 and ±2 aligned sheets currently report identical fit; widen the displayed band so users feel rewarded for decisive answers.')
console.log('- Per-question audit: §10 catches mislabeled axis/pole tags; §11 surfaces miscalibrated weights. Re-balance any flagged questions before further algo work.')
console.log('- Character coverage: §14 lists characters that never appear in any top-5. Inspect their axisVectors — they are likely shadowed by another same-type character.')
