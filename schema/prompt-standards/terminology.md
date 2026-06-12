# Terminology Standard
**Version:** v1.0
**Source of truth:** `skills/sentinel/rules/A1-terminology.md`
**Applies to:** Every agent output — internal and external. Sentinel A1 enforces on every output.
**Read fresh on every invocation. Never cache.**

---

## BANNED — auto-halt if found

### Product / legal terms
- `RGB` — remove entirely
- `Repayment Guarantee Bond` → use `Insurance Guarantee Instruments` or `IGI`
- `Data Valuation Partners` — banned entity name
- `DVP` — acronym for above, banned
- `ICME` — banned entity name
- `Collateralization platform` — banned framing
- `Tessaract` — misspelling → always `Tesseract`

### Insurance counterparties — never name specific insurers
Banned: `AIG`, `Liberty Mutual`, `Lloyd's syndicates`, `Allianz`, `Munich Re`, `Swiss Re`, `Zurich`, `Chubb`, `Berkshire Hathaway`, `partnered with [any named insurer]`
Use instead: `major global insurance conglomerates`

Note: "registered Lloyd's of London broker" refers to **our own status** and is permitted.

### Currency
- `£`, `GBP`, `British Pounds`, `Sterling` — banned
- Use `USD ($)` or `EUR (€)` only
- USD for projections. EUR for billing.

### Banned individual names
- `Hendrick`
- `Simona Anamaria Marinescu`
- `Susan Bergin`
- `Joshua Armah`
- `Jamie Dixon`
- `Kyle Turner`
- `Carl Turner` (Carl Weir is a different person — permitted)
- `Stephan Rust` → correct spelling is `Stefan Rust`
- `Susan Pinedo`

### Sovereign misassignment
- `Mozambique` as pilot or in any external context — not in active sovereign arc
- `Colombia` as "expansion" — label it "next" only

### Financial language
- `guaranteed return` / `guaranteed yield` / `guaranteed income` — banned entirely
- Any yield/return figure without `*` — banned

---

## REQUIRED — use these

### Product naming
- External: `data-linked insurance products`
- Technical: `IGI` or `Insurance Guarantee Instruments`
- Company: `One 2b` (space, capital O, lowercase b)
- Our broker status: `registered Lloyd's of London broker`

### People (correct spellings)
- `Stefan Rust` (not Stephan)
- `Aaron Astley`

### Sovereign arc
- `Portugal` — flagship, live
- `Brazil` and `Colombia` — next
- `Isle of Man` — legislated data as asset class

### Financial projections (base case — asterisk all)
Source of truth: `ceo-intel-mirror/Financials/base_case_projections.md`
- Year 1: `$12M*`
- Year 3: `$53M*`
- Year 5: `$156M*`

### Yield / return asterisk rule
Every figure referencing a potential return, yield, or financial outcome must carry `*`.
Formal documents must include: *Indicative only. Not financial advice.*
