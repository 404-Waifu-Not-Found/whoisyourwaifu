# LPTI Scoring Algorithm

## Abstract

LPTI is an entertainment-oriented recommendation system for matching quiz answers to anime character archetypes. The model is inspired by MBTI-style binary axes, but it does not claim psychological validity. Its goal is to produce deterministic, explainable, and funny results from a randomized balanced quiz while preserving enough uncertainty information to avoid overconfident matches.

The current implementation uses four MBTI-style axes for typing and ranking, plus three derived "vibe" axes for display only. It has a balanced dynamic question sampler, weighted axis scoring, per-axis confidence (geometric mean of strength and clarity), and character ranking with confidence-weighted vector distance, type-letter penalties, and a same-type bonus. The result is a character match, a derived four-letter type, fit percentage, answer confidence, seven axis bars, and close alternatives.

The design priority is not to discover a “true personality.” The priority is to make an answer sheet behave like a taste vector. A strong and consistent answer sheet should produce a decisive result. A neutral, noisy, or contradictory answer sheet should still produce a result, but with lower confidence and a less exaggerated fit percentage.

## 1. Data Model

Each question has:

- `axis`: one of `E_I`, `S_N`, `T_F`, `J_P`.
- `favoredPole`: the pole agreement moves toward.
- `weight`: a small scalar for question importance.
- localized prompt and scene text.

Each character has:

- `type`: one of 16 four-letter buckets.
- `axisVector`: a numeric vector over the four axes.
- localized traits and match copy.
- optional external portrait metadata.

Axis values use the interval `[-100, 100]`. For each axis, the left pole is negative and the right pole is positive:

- `E_I`: `E = -`, `I = +`
- `S_N`: `S = -`, `N = +`
- `T_F`: `T = -`, `F = +`
- `J_P`: `J = -`, `P = +`

## 2. Dynamic Question Selection

The full pool contains 48 questions: 12 per axis. Each quiz attempt selects 32 questions:

- 8 questions from each axis.
- Randomized within each axis.
- Shuffled into one mixed order.
- Stored in `localStorage` so refresh does not change the attempt.
- Cleared on retake so the next attempt gets a new selection.

This keeps the quiz shorter than the full pool while preserving axis balance.

The selected question set is part of the attempt state. Result scoring uses the same selected set, rather than the full pool, so skipped pool questions do not dilute the score. This matters because the pool is intentionally larger than the quiz length.

## 3. Axis Scoring

User answers are seven-point values:

```text
-3, -2, -1, 0, +1, +2, +3
```

For a selected question, agreement contributes toward `favoredPole`. If `favoredPole` is the right pole of the axis, the answer is added. If `favoredPole` is the left pole, the answer is inverted.

For each axis:

```text
axisScore = weightedAnswerTotal / weightedMaximum * 100
```

The score is clamped to `[-100, 100]`.

## 4. Confidence

Per-axis confidence combines two signals:

- **Answer strength** — how far the user's answers are from neutral. `strength = Σ |answerᵢ| · weightᵢ / (3 · Σ weightᵢ)`.
- **Directional clarity** — how unanimously the answers point at one pole. `clarity = |Σ answerᵢ · signᵢ · weightᵢ| / Σ |answerᵢ| · weightᵢ`.

Both must be high for the axis to read as confident, so the two are combined as a geometric mean rather than a weighted sum:

```text
rawAxisConfidence = sqrt(strength · clarity) · 100
```

Overall raw confidence is the mean of the four raw axis confidences.

This handles the common quiz failure mode where someone answers strongly on both poles of the same axis: strength is high but clarity is low, so confidence ends up correctly low instead of fake-high.

### Display transform

The displayed confidence (both per-axis and overall) is a soft-floored function of the raw value:

```text
displayConfidence(raw) = round(75 + 0.25 · raw)
```

So 0 → 75, 50 → 88, 100 → 100. This is a presentation-layer choice: even mid-strength answer sheets should read as decisively-typed rather than "no signal." The internal ranking math still uses raw confidence, so weighting and caps stay accurate.

## 5. Type Derivation

The four-letter result type is derived from axis polarity:

```text
score >= 0 => right pole
score < 0  => left pole
```

Example:

```text
E_I = +, S_N = +, T_F = -, J_P = +
=> INTP
```

## 6. Character Ranking

Characters are ranked by a composite distance:

```text
rankDistance =
  Σ axisWeightᵢ · ((uᵢ − cᵢ) / 100)² · 100
  + Σ letterMismatchPenaltyᵢ
  − sameTypeBonus
```

### Weighted Axis Distance

The squared distance per axis is weighted by user confidence so the axes the user actually committed to dominate the match:

```text
axisWeightᵢ = 0.5 + 1.5 · (rawAxisConfidenceᵢ / 100)
```

A fully-confident axis counts ~4× more than an uncommitted axis.

### Letter Mismatch Penalty

For each axis where the character's MBTI letter differs from the user's derived letter, the penalty `10 + 36 · confidence` is added. The penalty scales with confidence, so a confidently-typed user pays a much higher cost for typing into a near-miss character than an ambiguous one does.

### Same-Type Bonus

A character whose four MBTI letters all match the user's derived type gets a flat `−12` bonus on top of the per-axis math, so a canonical archetype clearly beats a near-miss with a similar vector.

## 7. Fit Percentage

Fit is computed independently from rank distance: it is the *alignment* of the user's vector with the character's, run through a power curve. Decisive same-direction answers earn the highest fit; neutral answers contribute nothing; opposite-direction answers subtract.

```text
alignmentᵢ = (uᵢ / 100) · (cᵢ / 100)
alignment  = mean(alignmentᵢ)        // ranges over [-1, 1]
normalized = clamp((alignment / 0.78 + 1) / 2, 0, 1)
rawFit     = normalizedᵏ · 100,  k = 1.35
```

The anchor `0.78` is the realistic ceiling — character vectors max out around 0.8, so dividing by 0.78 lets a strongly-aligned user reach near-`1.0` normalized. The exponent `k = 1.35` is intentionally close to linear so mid-strength sheets still read as decent matches; the spread step below handles separation between the top match and runners-up.

### Confidence cap

Fit is then capped by raw overall confidence so an indecisive sheet cannot accidentally claim a near-perfect score:

```text
if confidence < 30:  fit ≤ 78 + 0.5 · confidence
if confidence < 60:  fit ≤ 90 + 0.15 · confidence
else:                fit ≤ 100
```

### Top floor and adjacent-rank gap

After the top-5 are sorted by fit:

1. **Top floor** — if the top match is below 80%, the whole list is lifted by `(80 − topFit)` so the top always reads at least 80%. The relative spread is preserved.
2. **Adjacent gap** — each rank is forced to sit at least N points below the previous one:
   - rank 1 → at least **14** below the top match.
   - ranks 2–4 → at least **3** below the previous rank.
   - rank ≥ 5 → at least **2** below the previous rank.

This prevents near-tied alignments from collapsing the displayed top-5 into a flat band and gives the runner-up a visible distance from the top result, which is the dominant readability cue on the result page.

## 8. Derived Display Axes

The four MBTI axes drive typing and ranking. For the result page, three additional "vibe" axes are also displayed. They are not stored on characters — they are linear combinations of the four MBTI scores, so every character's vibe is implied by their existing axis vector and no per-character data is needed.

```text
TEMPO     = (-E_I + J_P) / 2     // CALM ↔ WILD
IDEAL     = ( S_N + T_F) / 2     // GROUND ↔ DREAM
MYSTIQUE  = ( E_I + S_N) / 2     // OPEN ↔ MYST
```

(Sign convention: `E_I < 0` means extrovert, `J_P > 0` means perceiver, etc.)

The derived confidence is the mean of the two contributing MBTI axis confidences, then run through the same display transform from §4. Derived axes are display-only: they do not feed back into ranking or type derivation.

## 9. Evaluation Harness

The project includes:

```bash
npm run evaluate
```

This script generates fake answer profiles for every type:

- strong profiles with consistent extreme answers.
- mixed profiles with weaker and more neutral answers.
- noisy profiles with occasional opposing answers.
- contradictory profiles that intentionally answer against themselves.
- partial-axis profiles where only some axes are answered strongly.
- a fully neutral profile.

It prints legacy and enhanced matches, fit, confidence, and top three alternatives. This is a sanity check, not a scientific benchmark.

The expected behavior is:

- strong profiles → top fit ~97%, runner-up ~83%, third ~80%, confidence 100%.
- mixed and noisy profiles → top fit floored at 80%, runner-up at 66%, third at 63%, confidence ~89–92%.
- contradictory and neutral profiles → top fit still 80% (top floor), runner-up 66%, but confidence floored at 75% to honestly signal the lack of information.

The fit numbers are deliberately templated for non-strong sheets: the top floor and the 14-point runner-up gap mean that any sheet without strong alignment lands on the same `80 / 66 / 63 / 60 / 57` shape. The confidence number, not the fit number, is what carries the "how decisive was your sheet" information.

## 10. Limitations

- The model is not psychological science.
- Character typing is approximate and fandom-inspired.
- The output is deterministic, but the selected question set is randomized per attempt.
- External character art depends on third-party availability.

## 11. Future Improvements

- Promote the derived "vibe" axes to first-class data so characters can disagree with the MBTI-implied vibe (e.g. an introverted character with a deliberately chaotic tempo).
- Add anti-repetition logic for similar questions.
- Add more fake-profile tests with noisy and contradictory inputs.
- Add community voting to tune character vectors.
- Add a data validation script for missing translations, portraits, and unbalanced axes.
