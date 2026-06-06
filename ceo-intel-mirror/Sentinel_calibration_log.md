# Sentinel Calibration Log
**Purpose:** Record of every Jason correction to a Sentinel verdict during the 90-day calibration period.
**This file is the real training signal.** The 27-case test set is the starting fixture. This log is the calibration itself.
**Rule:** Only Jason or CEO Brain (after Jason's explicit instruction) writes to this file.
**90-day period:** From first Sentinel Mode A invocation → Day 90. No auto-merge during this period.

---

## Log format (one entry per correction)

```
DATE: [ISO date]
MODE: [A1 / A2 / A3 / Mode B]
OUTPUT REVIEWED: [one-line description]
SENTINEL FINDING: [what Sentinel flagged]
CONFIDENCE: [HIGH / MEDIUM / LOW]
JASON VERDICT: [correct / false positive / partially correct]
ACTUAL SITUATION: [what was actually true]
RULE ADJUSTMENT NEEDED: [which rule was too strict / too loose / missing / correct]
QUEUED TO TECH_HORIZON: [yes / no]
```

---

## Corrections log

[Empty — entries begin when Sentinel Mode A is first invoked in production]

---

## Pattern summary (update monthly)

After each month of calibration, add a one-paragraph summary:
- What types of findings does Sentinel over-flag? (false positives clustering around X)
- What types does it miss? (false negatives — things Jason caught that Sentinel didn't)
- Which rule files need tightening?

Month 1 summary: [pending]
Month 2 summary: [pending]
Month 3 summary: [pending]

---

## Calibration targets

| Metric | Target | Current |
|---|---|---|
| Catch rate (true positives / all real violations) | ≥95% by Day 30 | — |
| False positive rate | ≤10% | — |
| Jason corrections per week | Declining trend | — |

When catch rate ≥95% and false positive rate ≤10% for two consecutive weeks: Sentinel earns auto-merge authority for the rule classes it has mastered. Jason confirms each class explicitly.

---

## Architectural decision — Context-only through Day 91 (filed 2026-06-06)

Source: a16z continual learning paper (Aubakirova + Bornstein, Apr 22 2026) + SDFT (Shenfeld et al. 2026)

### The spectrum
- **Context layer** — RAG, prompt orchestration, agent harness. Where we are today.
- **Modules layer** — attachable knowledge modules, compressed KV caches, adapter layers, external memory stores (Letta, mem0).
- **Weights layer** — updating model parameters post-deployment (sparse memory layers, RL feedback, test-time training).

### Decision locked
Sentinel stays Context-only through the full 90-day calibration period.

**Why:** The calibration dataset must be mature before any module-layer update. Graduating to modules before the dataset is clean risks baking in bad signal. 

**Review trigger:** Day 91. Dataset criteria: 50+ Sentinel verdicts with Jason corrections logged. Only then does mem0 or Letta become a viable upgrade path.

### SDFT calibration pattern
Sentinel calibrates on its own expert-conditioned outputs, not on external test sets. The loop:
1. Sentinel audits → Jason corrects → correction = next training signal
2. No external benchmarks needed — the running log IS the calibration
3. This sidesteps catastrophic forgetting (SDFT pattern from Shenfeld 2026)

**Source:** a16z April 2026 + First Sweep Apr 30
