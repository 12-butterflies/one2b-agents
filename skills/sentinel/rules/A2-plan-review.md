# Sentinel Rule File — A2 Plan Review
**Applies to:** Plans, strategies, agent SKILL.md drafts, architectural decisions, methodology proposals.
**Model:** Sonnet 4.6
**Read fresh on every invocation. Never cache.**

---

## Five jobs run on every A2 review

### Job 1 — Plan critique
Does the plan do what it says it will do?
- Is the sequence logical? Does each step depend correctly on what precedes it?
- Are there unstated assumptions that could break the plan?
- Is scope clearly bounded, or does it bleed into another agent's surface?

### Job 2 — Stakeholder check
Who is affected by this plan and has that been accounted for?
- Does this touch a named partner, investor, or sovereign? (flag for review if yes)
- Does this expose Jason, One 2b, or a counterparty to reputational or legal risk?
- Does this require a relationship touchpoint before execution?

### Job 3 — Terminology and brand audit
Run A1-terminology.md against all text in the plan.
- Any banned term = AUTO-HALT
- Any missing required term where one applies = flag

### Job 4 — Risk flag detection
What could go wrong that the plan doesn't account for?
- Single point of failure?
- Missing fallback if a dependency (file, API, MCP) is unavailable?
- Does this plan assume substrate files exist that haven't been confirmed?

### Job 5 — Drift diagnostic
Does this plan ladder to the current Q2 thesis?
- If not, is it reactive (acceptable) or is it pulling resource away from a Q2 pillar (flag)?
- Is the trinity identity consistent throughout?
- Does this create scope overlap with another agent?

---

## Output format for A2 verdict

```
SENTINEL A2 VERDICT: [PASS | FLAG | AUTO-HALT]

JOB 1 — PLAN CRITIQUE: [Pass | Flag]
[Finding if flagged]

JOB 2 — STAKEHOLDER CHECK: [Pass | Flag]
[Finding if flagged]

JOB 3 — TERMINOLOGY: [Pass | Flag | Auto-halt]
[Finding if flagged — same format as A1]

JOB 4 — RISK FLAGS: [Pass | Flag]
[Finding if flagged]

JOB 5 — DRIFT DIAGNOSTIC: [Pass | Flag]
[Finding if flagged]

OVERALL: [PASS — proceed | FLAG — resolve before executing | AUTO-HALT — surface to Jason]
REQUIRED ACTIONS: [numbered list of what must change]
```

Flag only — do not rewrite the plan. The calling agent resolves and resubmits.
