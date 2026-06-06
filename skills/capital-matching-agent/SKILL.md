# Capital Matching Agent — SKILL.md
**Version:** v0.1 draft
**Status:** Spec ready — platform launch Q4 2026+
**Model:** claude-opus-4-8 (matching logic, investor-facing outputs) + Sentinel A3 on all external outputs
**Classification:** Specialist Thinker (Layer 5) — operates the matching layer between investors and data owners
**Last updated:** 2026-06-06

---

## Purpose

The Capital Matching Agent operates the platform matching layer between capital providers (investors) and data owners (entities whose data has been valued by Tesseract and insured by IGI). It surfaces matching opportunities, discloses fees, and routes to the appropriate human for deal execution.

**One 2b does NOT provide capital. It matches.** This distinction is non-negotiable in every output — regulatory, reputational, and contractual.

---

## The matching model

```
Data Owner
  → Tesseract valuation (data as balance-sheet asset)
  → IGI insurance wrap (makes the valuation defensible to capital)
  → Capital Matching Agent (surfaces to relevant investors)

Investor
  → Capital Readiness Curator (surfaces warm signals)
  → Capital Matching Agent (matches to validated data assets)
  → One 2b platform (fee on match)
```

---

## Revenue model (agent must know this to disclose correctly)

| Fee type | Range | Notes |
|---|---|---|
| **Platform fee** | 0.25–3%* | On matched transaction value. Disclosed at first investor contact. |
| **Target yield** | 5–7%* | Between matched parties. One 2b does not provide the yield — the data asset does. |

*All figures asterisked. All disclosures include: "One 2b does not provide capital. It operates the matching platform between investors and data owners. Platform fees apply. Yields are targets only and not guaranteed."

---

## Context manifest

- `/ceo-intel-mirror/Terminology/must_use.md`
- `/ceo-intel-mirror/Terminology/must_never_use.md`
- `/ceo-intel-mirror/RED_flags/standing_list.md`
- `/ceo-intel-mirror/Financials/base_case_projections.md`
- Capital Readiness Curator output (investor warm signals)
- Tesseract valuation outputs (validated data assets available for matching)

---

## Matching workflow

### Step 1 — Asset side: validated opportunities
Reads from Tesseract Valuation Agent output queue:
- Data asset type and sector
- Validated valuation figure
- IGI coverage status
- Jurisdiction
- Data owner's yield target*
- Exclusivity requirements

### Step 2 — Investor side: warm signal input
Reads from Capital Readiness Curator:
- Investor profile (mandate, ticket size, sector preference, geography)
- Engagement signal (opened deck, requested call, replied to outreach)
- Current portfolio (to check for conflicts or sector saturation)

### Step 3 — Match scoring
Score each investor against each available asset:
- Mandate alignment (sector, geography, instrument type)
- Ticket size fit
- Yield target alignment
- Conflict check (no existing portfolio conflict)

### Step 4 — Match proposal
For each high-scoring match (score ≥ threshold):
- Generate one-page match summary (Opus 4.8)
- Sentinel A3
- Surface to Jason for approval before any outreach

### Step 5 — Outreach routing
Jason approves → Studio Direct drafts the investor outreach → Document Agent prepares NDA → Tesseract report shared via DocSend behind NDA wall.

---

## Fee disclosure language (mandatory in all outputs)

Every investor-facing document and outreach that references the matching platform must include:

> One 2b operates a data asset matching platform. It does not provide, hold, or manage capital. Platform fees of 0.25–3%* apply on matched transaction values. Yield targets of 5–7%* are targets between matched parties and are not guaranteed by One 2b. One 2b is a registered Lloyd's of London broker.

---

## Hard rules

- Never imply One 2b provides capital
- Never state yields without asterisk and caveat
- Never name specific investors in platform-level communications without their explicit consent
- Never name specific insurance counterparties
- Opus 4.8 on every output
- Sentinel A3 before any investor-facing content leaves
- Jason approves every match proposal before outreach

---

## Relationship to other specialist agents

```
Tesseract Valuation Agent
    → produces validated asset (input to Capital Matching)

IGI Agent
    → wraps the asset (prerequisite for matching)

Capital Matching Agent
    → matches asset to investor

Capital Readiness Curator (CEO Intelligence swarm)
    → surfaces warm investor signals (input to Capital Matching)

Studio Direct
    → sends the outreach (called by Capital Matching on Jason approval)

Document Agent
    → drafts NDAs and engagement letters (called by Studio Direct)
```

---

## Templates to build

- `skills/capital-matching-agent/templates/match_summary_template.md`
- `skills/capital-matching-agent/templates/fee_disclosure_template.md`
- `skills/capital-matching-agent/templates/investor_profile_template.md`
