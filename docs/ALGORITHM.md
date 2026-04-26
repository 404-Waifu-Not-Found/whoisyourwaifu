# LPTI Scoring Algorithm

## Abstract

LPTI is an entertainment-oriented recommendation system for matching quiz answers to anime character archetypes. The model is inspired by MBTI-style binary axes, but it does not claim psychological validity. Its goal is to produce deterministic, explainable, and funny results from a randomized balanced quiz while preserving enough uncertainty information to avoid overconfident matches.

The current implementation uses four preference axes, a balanced dynamic question sampler, weighted axis scoring, per-axis confidence, per-question response distance, and character ranking with type-consistency penalties. The result is a character match, a derived four-letter type, fit percentage, answer confidence, axis bars, and close alternatives.

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

The model computes confidence per axis from three signals:

- Answer strength: how far answers are from neutral.
- Directional clarity: how consistently answers point toward one pole.
- Internal consistency: whether non-neutral answers on the same axis agree with each other.

```text
axisConfidence =
  30% answerStrength
  + 45% directionalClarity
  + 25% internalConsistency
```

Overall confidence is the average of the four axis confidence values.

Confidence is not the same as fit. A user can fit a type directionally while still having low confidence if many answers are neutral or mixed.

This prevents a common failure mode in simple quizzes: someone answers very strongly in both directions on the same axis, the raw score cancels out near zero, but the system still treats the answer sheet as meaningful. LPTI records that contradiction and lowers confidence.

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
totalDistance =
  weightedAxisDistance
  + perQuestionDistance
  + typeMismatchPenalty
  + sameTypeBonus
```

### Weighted Axis Distance

The model compares the user axis vector to each character axis vector. Axes with stronger confidence and answer evidence receive higher weight.

### Per-Question Distance

The model also estimates how each character would answer the selected questions based on its axis vector. This prevents two characters in the same type bucket from feeling completely identical and helps rank close alternatives.

This term is useful because the same final four-letter type can arise from different answer patterns. For example, two users may both derive `INFP`, but one may be strongly driven by quiet/private preferences while another is mostly driven by emotional warmth. Per-question distance gives the ranking system more texture than the final type alone.

### Type Mismatch Penalty

If a character’s type letter differs from the user’s derived type, the model adds a penalty. The penalty is stronger when the user’s axis confidence is high.

### Same-Type Bonus

Characters with exactly the same derived type receive a small confidence-based bonus.

## 7. Fit Percentage

Raw distance is converted to a fit percentage and then blended with answer confidence:

```text
displayedFit = 72% rawFit + 28% overallConfidence
```

For very low-confidence answer sheets, the displayed fit is also capped. This prevents a fully neutral sheet from receiving a surprisingly high-looking match just because one character happens to be mathematically closest to the origin.

```text
if confidence < 20:
  displayedFit <= 58 + confidence
if confidence < 45:
  displayedFit <= 70 + confidence / 3
```

This prevents ambiguous answer sheets from showing unrealistic 99% matches and keeps all-neutral output visibly tentative.

## 8. Evaluation Harness

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

- strong profiles should have high confidence and high fit.
- mixed profiles should remain directionally correct but show lower confidence.
- noisy profiles should usually preserve the intended type while reducing certainty.
- contradictory profiles should not pretend to be precise.
- neutral profiles should produce low confidence even though a deterministic fallback result still exists.

## 9. Limitations

- The model is not psychological science.
- Character typing is approximate and fandom-inspired.
- The output is deterministic, but the selected question set is randomized per attempt.
- External character art depends on third-party availability.

## 10. Future Improvements

- Add explicit character trait vectors independent of MBTI axes.
- Add anti-repetition logic for similar questions.
- Add more fake-profile tests with noisy and contradictory inputs.
- Add community voting to tune character vectors.
- Add a data validation script for missing translations, portraits, and unbalanced axes.
