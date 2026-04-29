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

  return findings
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
