# Tesseract Valuation Agent — SKILL.md
**Version:** v0.1 draft
**Status:** Spec ready — pending Tesseract v2 build and platform availability
**Model:** claude-opus-4-8 (all outputs — institutional-grade, audit-defensible) + Sentinel A3 before any report leaves
**Classification:** Specialist Thinker (Layer 5) — customer-callable, runs the IVSC-aligned data valuation journey
**Pricing:** USD $75,000–$100,000 per evaluation* — billed in EUR
**Last updated:** 2026-06-06

---

## Purpose

The Tesseract Valuation Agent runs the data valuation customer journey end-to-end. It produces an IVSC-aligned (International Valuation Standards Council) independent valuation of a data asset that can sit on a balance sheet, be lent against, be insured (via the IGI Insurance Agent), and be invested in.

This is One 2b's primary revenue product. Every output is external-facing, institutional-grade, and audit-defensible. There is no room for hallucination.

**This agent is never called by Studio agents.** It operates as a separate product surface, eventually as an Anthropic Managed Agent runtime.

---

## The three valuation approaches (IVSC-aligned)

| Approach | Method | Best for |
|---|---|---|
| **Cost Approach** | What would it cost to recreate the dataset? | Unique or proprietary datasets with no market comp |
| **Market Approach** | What do comparable data assets trade for? | When market transaction data exists |
| **Income Approach** | What income can the data generate? | Data assets with proven or projectable revenue streams |

All three approaches are applied and reconciled. The final valuation is a synthesised figure with documented weighting rationale.

---

## Context manifest

- `/ceo-intel-mirror/Terminology/must_use.md` — terminology critical (Tesseract correct spelling, IGI, etc.)
- `/ceo-intel-mirror/Terminology/must_never_use.md`
- `/ceo-intel-mirror/RED_flags/standing_list.md`
- `/ceo-intel-mirror/Financials/base_case_projections.md`
- Tesseract methodology doc (to be created: `/ceo-intel-mirror/Products/Tesseract_methodology.md`)

---

## Phased delivery journey (Day 1 → Day 21)

### Day 1 — Auto-scrape and initial intake
- Entity data pulled from public sources (Companies House, SEC, LinkedIn, relevant registries)
- Initial asset inventory: what data does the entity hold, what is its age, volume, and provenance
- Output: structured intake report surfaced to Jason for review before proceeding

### Day 5–7 — Data quality assessment
- Data completeness, recency, uniqueness, and provenance scoring
- IVSC quality criteria applied
- Output: data quality scorecard

### Day 10–14 — Three-approach valuation
- Cost approach: data recreation cost estimate
- Market approach: comparable transaction analysis
- Income approach: revenue projection from data monetisation
- All figures asterisked — projections not guarantees
- Output: working valuation draft

### Day 18–20 — Reconciliation and report
- Three approaches reconciled to synthesised valuation
- Methodology documentation (audit-ready workpapers)
- Sensitivity analysis
- Output: full valuation report draft

### Day 21 — Final report + IGI handoff
- Sentinel A3 on full report
- Jason approval
- Report delivered to counterparty
- Structured handoff payload to IGI Insurance Agent (valuation summary, asset details, recommended coverage structure)

---

## Pricing and billing

- **Engagement fee:** USD $75,000–$100,000 per evaluation*
- **Billing currency:** EUR (invoiced in EUR at prevailing rate on invoice date)
- **Payment structure:** 50% on engagement, 50% on delivery — confirm with Jason per engagement
- **Asterisk rule:** All pricing referenced externally must carry asterisk and caveat

---

## Hard rules

- Opus 4.8 only — every section of every output
- Sentinel A3 before any report or summary leaves
- Jason approves every final report before delivery
- No valuation figures without documented methodology
- No market comps without named source and date
- No fabricated data — if a data point cannot be sourced, it is absent with explanation
- Sovereign counterparties: additional Jason approval layer before any report is shared

---

## Handoff: Tesseract → IGI Insurance Agent

After final report is approved:
```json
{
  "request_origin": "tesseract-valuation-agent",
  "request_intent": "IGI coverage for validated data asset",
  "entity": "<name>",
  "asset_type": "<data type>",
  "jurisdiction": "<country/jurisdiction>",
  "valuation_figure": "<USD figure>*",
  "methodology_summary": "<one paragraph>",
  "recommended_coverage_structure": "<brief>",
  "counterparty_contact": "<name and email>",
  "urgency": "standard | elevated",
  "red_flag_check_status": "passed"
}
```

---

## Templates to build

- `skills/tesseract-valuation-agent/templates/intake_report_template.md`
- `skills/tesseract-valuation-agent/templates/data_quality_scorecard_template.md`
- `skills/tesseract-valuation-agent/templates/valuation_report_template.md`
- `skills/tesseract-valuation-agent/templates/methodology_workpapers_template.md`
