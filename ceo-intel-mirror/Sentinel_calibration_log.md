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
