# RED Flag Check Sequence Standard
**Version:** v1.0
**Source of truth:** `skills/sentinel/rules/RED-flags.md`
**Applies to:** Fleet Router pre-check on every human-originated request. Sentinel A2/A3 on every plan and external output.
**Read fresh on every invocation. Never cache.**

---

## The sequence — A1 → A2 → A3

Run checks in order. Do not skip tiers.

### A1 — Terminology scrub (Haiku 4.5)
Run before routing any request. Checks:
- Banned terms (`skills/sentinel/rules/A1-terminology.md`)
- Currency violations (GBP/£)
- Banned individual names
- Sovereign misassignment (Mozambique externally)
- Missing asterisks on yield/return figures

**Result:** `passed` (continue) or `flagged` (halt, surface to Jason with specific term + line)

### A2 — Plan / architecture review (Sonnet 4.6)
Run on any plan, strategy, SKILL.md draft, or architectural decision. Checks:
- Scope creep (agent doing work owned by another)
- Identity bleed (wrong trinity tag for content)
- Stakeholder risk (named investors, named officials in external content)
- Projection consistency ($12M* / $53M* / $156M* base case)
- Thesis ladder alignment (ladders to Q2 2026 pillar, or tagged `none — reactive`)

**Result:** Structured verdict per job — Pass / Flag per check. Flags include: finding + source rule + recommended fix.

### A3 — Pre-ship external review (Opus 4.8)
Run on every external-facing output before it reaches a human outside the build team. Checks:
- All A1 and A2 checks
- Guarantee language audit
- Named insurer claim detection
- Unverified financial projection detection
- Hallucination detection against known facts

**Result:** Full six-job verdict. Confidence level per finding. Recommended action: `approve` / `revise` / `escalate to Jason`.

---

## Auto-halt flags (block before routing)

| Flag | Trigger |
|------|---------|
| Banned term | Any term in `A1-terminology.md` |
| Guarantee language | "guaranteed", "assured return", "risk-free yield" |
| Named insurer claim | "partnered with [AIG / Lloyd's / Allianz / etc.]" |
| Banned individual name | Any name in banned list |
| Mozambique sovereign reference | External-bound only |
| GBP / £ | Any external currency reference |
| Unverified financial projection | Specific figures not from base case |

**Action:** Halt. Set `red_flag_check_status: flagged`. Surface `red_flag_notes` to Jason. Do not route.

---

## Review-required flags (route, but require Jason approval before output ships)

| Flag | Trigger |
|------|---------|
| Named investor or fund | Specific name in external output |
| Named sovereign counterparty | Named government official |
| New regulatory status claim | Any new compliance assertion |
| Non-base-case projection | Figures outside $12M / $53M / $156M |
| First-time partner reference | New partner name in external output |
| Investor letter / formal capital document | Any document to a fund or investor |
| Sovereign-facing document | Any output to a government body |

**Action:** Set `red_flag_check_status: pending`. Route to agent. Flag output before it ships. Jason approval required before delivery.

---

## Invocation syntax

```
# A1
Sentinel A1: [paste output]

# A2
Sentinel A2: [paste plan or document]

# A3
Sentinel A3: [paste output] — Run all six jobs. Return verdict in standard format.
```

---

## What Sentinel never does

1. **Never acts, routes, edits, or decides.** Sentinel flags only.
2. **Never runs in the same context window as the agent it is reviewing.**
3. **Never accumulates context across invocations.** Each audit starts from rule files alone.
