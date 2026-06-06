# Sentinel Rule File — RED Flags (Standing List)
**Applies to:** All outputs. Fleet Router reads this pre-check. Sentinel A2/A3 reads this on every plan review.
**Read fresh on every invocation. Never cache.**

---

## Auto-halt flags (block before routing)

These stop the request entirely. Fleet Router surfaces to Jason before any agent is invoked.

| Flag | Trigger | Why |
|------|---------|-----|
| **Banned term** | Any term in A1-terminology.md | Legal / reputational exposure |
| **Guarantee language** | "guaranteed", "assured return", "risk-free yield" | Regulatory — financial promotions law |
| **Named insurer claim** | "partnered with [AIG / Lloyd's / Allianz / etc.]" | Uncommercial disclosure, legal risk |
| **Named banned individual** | Any name in A1-terminology.md banned list | Reputational / legal |
| **Mozambique sovereign reference** | External-bound only | Incorrect sovereign arc |
| **GBP / £** | Any external currency reference in GBP | Currency policy |
| **Unverified financial projection** | Specific $ figures not from base case | Risk of misrepresentation |

---

## Review-required flags (route, but flag before output ships)

These allow routing to proceed but the output must surface to Jason before publishing or sending.

| Flag | Trigger | Why |
|------|---------|-----|
| **Named investor or fund** | Specific investor name in external output | Relationship sensitivity |
| **Named sovereign counterparty** | Named government or ministry official | Diplomatic sensitivity |
| **New regulatory status claim** | Any new compliance/regulatory assertion | Must be verified before external use |
| **Non-base-case projection** | Financial figures outside $12M / $53M / $156M | Consistency across materials |
| **First-time partner reference** | External mention of a new partner name | Needs relationship clearance |
| **Investor letter / formal capital document** | Any document addressed to a fund or investor | Always Jason approval, no exceptions |
| **Sovereign-facing document** | Any output addressed to a government body | Always Jason approval, no exceptions |

---

## Base case projections (reference values — asterisk all)

| Horizon | Figure |
|---------|--------|
| Year 1 | $12M* |
| Year 2 | $53M* |
| Year 3 | $156M* |

Any projection outside these figures in an external document triggers a review-required flag.

*Indicative only. Not financial advice.

---

## Sentinel A2/A3 additional checks (plan and architecture review)

When reviewing a plan, strategy, or SKILL.md:

- **Scope creep** — agent doing work owned by another agent
- **Identity bleed** — One 2b content with Jason's voice (or vice versa) without explicit trinity tag
- **Context over-read** — agent reading files outside its context manifest
- **Parallel fan-out without confirmation** — any plan that routes to 2+ agents simultaneously without Jason approval gate
- **Substrate dependency on missing file** — plan references a CEO Intel file that hasn't been confirmed as existing

---

## Output format for RED-flag verdict

```
SENTINEL RED-FLAG CHECK: [PASS | AUTO-HALT | REVIEW-REQUIRED]

[If AUTO-HALT:]
HALT REASON: [specific trigger]
DO NOT ROUTE. Surface to Jason before proceeding.

[If REVIEW-REQUIRED:]
REVIEW FLAGS:
- [Flag name] | Trigger: [what was found] | Required: Jason approval before output ships

[If PASS:]
No flags. Proceed.
```
