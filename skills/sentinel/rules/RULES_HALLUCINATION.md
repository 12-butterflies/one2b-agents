# Sentinel Job 6 — Hallucination Detection Rules
**Applies to:** A1, A2, A3, Mode B (all tiers — hallucination is never acceptable)
**Purpose:** Identify specific claims in any output that are fabricated, unverifiable, or presented as fact without a traceable source. This is the failure mode the entire system exists to prevent.

---

## Definition of hallucination in this context

A hallucination is any specific claim in an output that:
1. **Cannot be verified** against a source in the CEO Intel substrate or an explicitly cited external source
2. **Presents invented data as fact** — numbers, names, dates, quotes, case studies that don't exist
3. **Extrapolates beyond what the source actually says** — a source says X, the output says X implies Y without establishing the implication
4. **Fabricates precision** — gives a specific number (e.g., "87% of companies") without a named source and date

Vague or hedged claims ("data is increasingly valuable") are not hallucinations. Specific unverifiable claims ("data assets now represent $4.2 trillion in unrecognised balance sheet value — McKinsey 2025") are hallucinations unless the source can be named and found.

---

## Rule H1 — Specific numbers require sources

Any specific numerical claim in an output must trace to a named source or the CEO Intel substrate.

**Flag when:**
- A financial figure is cited without "Source: [name], [date]" or a CEO Intel file reference
- A market size claim is made without attribution (e.g., "the RWA market is projected at $30 trillion")
- A performance metric is cited without a named platform and date (e.g., "the post achieved 40% engagement")

**Exception:** CEO Intel substrate files are treated as ground truth for the facts they contain. A claim like "$12M year 1 revenue target" needs no additional source if it matches `Financials/base_case_projections.md`. Still requires asterisk.

**Finding format:** `Hallucination risk (H1): [claim] cites [number] without named source and date. Either add source or hedge to qualitative statement.`

---

## Rule H2 — Named persons, companies, and quotes require confirmation

Any specific named person, company, publication, or direct quote must be verifiable. Sentinel does not verify — it flags for verification.

**Flag when:**
- A direct quote is attributed to a named person without a source link or date
- A company is described as having done something specific without a source
- A person is described as having said or committed to something without confirmation

**Finding format:** `Hallucination risk (H2): [name] attributed with [claim/quote] — source not cited. Verify before publishing.`

---

## Rule H3 — Sample data must be tagged

Any output that includes sample data, placeholder data, or illustrative examples must be explicitly tagged as such.

**Flag when:**
- A valuation report contains example figures presented without a "SAMPLE DATA" tag
- A CEO Dashboard shows placeholder numbers without a "SAMPLE — NOT PRODUCTION DATA" banner
- A template is sent to a counterparty with unfilled fields (e.g., `{{ENTITY_NAME}}`)

**Finding format:** `Hallucination risk (H3): [content] contains sample/placeholder data without explicit tag. Add 'SAMPLE DATA — NOT FOR DISTRIBUTION' before sending.`

---

## Rule H4 — Capability claims require verification

Any claim about what One 2b's products, agents, or infrastructure can do must be accurate at the time of writing.

**Flag when:**
- An output claims a tool is deployed when it is in spec stage (e.g., "our DocuSeal signing platform" before DocuSeal is deployed)
- An output claims an agent is active when it is in "act as" mode (e.g., "our automated onboarding agent")
- An output claims a regulatory status beyond what is confirmed (e.g., "regulated under [framework]" when only registered as a Lloyd's broker)

**Finding format:** `Hallucination risk (H4): [capability claim] describes [tool/agent/status] as operational but it is [actual status]. Adjust to accurate framing.`

---

## Rule H5 — Sovereign engagement accuracy

Sovereign engagement claims are high-stakes. Any claim about active sovereign engagements must match the locked sovereign status files.

**Flag when:**
- An output names a sovereign engagement that is not in `ceo-intel-mirror/Sovereigns/`
- An output describes a sovereign engagement as "signed" or "contracted" when the status file says "advancing" or "in discussion"
- An output references Mozambique as a pilot engagement (it is not — it has been dropped from active pipeline)

**Finding format:** `Hallucination risk (H5): Sovereign claim '[claim]' does not match status in Sovereigns/[country]/status.md. Check and correct.`

---

## Rule H6 — Extrapolation beyond source

A source saying X does not mean X implies Y. Sources must not be stretched.

**Flag when:**
- "China recognised data as a tangible asset class in 2024" is extended to imply "China is therefore an investor in One 2b"
- "Isle of Man legislated data as an asset class after working with us" is extended to imply "Isle of Man has invested in or endorsed One 2b"
- A market research finding about a trend is extended to a specific prediction about One 2b's market

**Finding format:** `Hallucination risk (H6): [source claim] extended to imply [derived claim] — the implication is not established. Either source the implication or remove it.`

---

## High-risk hallucination surfaces

These are the areas where hallucination has historically occurred (derived from real slop incidents):

| Surface | Common hallucination pattern |
|---|---|
| Instagram scrapes | Spanish-locale login walls accepted as substantive content |
| Valuation figures | Numbers invented to fill a template |
| Competitor comparisons | Fabricated competitor statistics |
| Partner relationships | Overstating the nature of a relationship |
| Regulatory status | Claiming approvals not yet received |
| Sovereign pipeline | Including countries in active pipeline when they are only in early discussion |
| Historical dates | Fabricating when a milestone occurred |
| Quote attribution | Attributing paraphrases as direct quotes |

---

## Confidence levels for hallucination findings

| Confidence | Meaning | Action |
|---|---|---|
| **HIGH** | The claim is demonstrably unverifiable or contradicts a substrate file | Auto-flag, do not approve until resolved |
| **MEDIUM** | The claim appears specific but Sentinel cannot verify from available files — may be correct | Flag with note: "verify before publishing" |
| **LOW** | The claim is plausible but unhedged — style issue, not factual error | Note only, does not block approval |

---

## Calibration log format

```
DATE: [ISO]
OUTPUT REVIEWED: [one-line]
HALLUCINATION FOUND: [rule + specific claim]
CONFIDENCE: [HIGH | MEDIUM | LOW]
JASON VERDICT: [confirmed hallucination / false positive / rule adjustment]
RULE CHANGE: [if applicable]
ACTUAL SOURCE (if false positive): [where the claim was verifiable]
```
