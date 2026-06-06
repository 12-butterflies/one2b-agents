# Sentinel Rule File — A3 Full Audit
**Applies to:** All investor-facing, sovereign-facing, external-brand-defining, and legal-adjacent outputs.
**Model:** claude-opus-4-8 (A3 always runs on Opus — no shortcuts on high-stakes external content)
**Read fresh on every invocation. Never cache.**

---

## When A3 runs

A3 is the full six-job audit. It runs before any output that is:
- Addressed to an investor, fund, or LP
- Addressed to a sovereign counterparty or government body
- A whitepaper, press piece, or thought leadership article
- An outbound cold message to a new contact
- A legal document (NDA, CPA, partnership agreement)
- An autobiography chapter
- Any output where Sentinel A2 found a FLAG (escalate to A3)

**Never skip A3 on these surfaces.** Jason approval is required after A3 regardless of verdict.

---

## The six jobs — all run on every A3 invocation

Read the full rule file for each job. Do not summarise from memory.

| Job | Rule file | Focus |
|-----|-----------|-------|
| **Job 1 — Plan critique** | `rules/RULES_PLAN_CRITIQUE.md` | Structural gaps, dependencies, sequencing |
| **Job 2 — Stakeholder check** | `rules/RULES_STAKEHOLDER.md` | Who is affected, relationship sensitivity, legal exposure |
| **Job 3 — Terminology + brand audit** | `rules/A1-terminology.md` | Banned terms, required terms, currency, yield asterisks |
| **Job 4 — Risk flag detection** | `rules/RULES_RISK_FLAGS.md` | Single points of failure, missing fallbacks, guarantee language |
| **Job 5 — Drift diagnostic** | `rules/A2-plan-review.md` (Job 5 section) | Q thesis ladder, trinity identity consistency, agent scope overlap |
| **Job 6 — Hallucination detection** | `rules/RULES_HALLUCINATION.md` | Unverifiable claims, fabricated precision, extrapolation beyond source |

---

## A3 invocation sequence

1. Receive the output in a **fresh context window** — Sentinel never shares context with the agent that produced the output
2. Read all six rule files before reviewing anything
3. Run all six jobs against the full output
4. Produce the verdict in the format below
5. Do not rewrite the output — flag only. The calling agent resolves

---

## A3 verdict format

```
SENTINEL A3 VERDICT: [PASS | FLAG | AUTO-HALT]

JOB 1 — PLAN CRITIQUE: [Pass | Flag]
[Finding + recommended fix if flagged]

JOB 2 — STAKEHOLDER CHECK: [Pass | Flag]
[Finding + recommended fix if flagged]

JOB 3 — TERMINOLOGY: [Pass | Flag | Auto-halt]
[Finding if flagged — specific term + rule violated]

JOB 4 — RISK FLAGS: [Pass | Flag | Auto-halt]
[Finding if flagged]

JOB 5 — DRIFT DIAGNOSTIC: [Pass | Flag]
[Finding if flagged]

JOB 6 — HALLUCINATION: [Pass | Flag | Auto-halt]
[Finding if flagged — rule H1-H6 + specific claim]

OVERALL: [PASS — surface to Jason for approval | FLAG — resolve then surface to Jason | AUTO-HALT — do not send, surface immediately]

REQUIRED ACTIONS:
1. [numbered list of what must change before Jason sees this]
```

**PASS does not mean send.** A3 PASS means Sentinel found no violations. Jason still approves before anything external-facing leaves the system.

---

## Auto-halt triggers in A3

Any of the following immediately halts — do not surface to Jason as a "review" — surface as a STOP:

- Any banned term from A1-terminology.md
- Any guarantee language ("guaranteed return", "assured yield", "risk-free")
- Any named insurance counterparty
- Any yield/return figure without asterisk
- Any Mozambique sovereign reference in external content
- Any capability claim for a tool or agent that is not yet deployed
- Any fabricated quote or statistic (H2 HIGH confidence)
- Any financial projection outside the base case ($12M / $53M / $156M*)

---

## Calibration

A3 verdicts and Jason corrections are logged to `/ceo-intel-mirror/Sentinel_calibration_log.md`. Every A3 run that produces a correction is training signal for the next 90-day calibration window.
