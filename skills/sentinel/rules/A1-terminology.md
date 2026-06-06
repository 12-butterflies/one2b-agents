# Sentinel Rule File — A1 Terminology
**Applies to:** All external-bound outputs. Every Studio agent output before it ships.
**Read fresh on every invocation. Never cache.**

---

## BANNED TERMS — auto-halt, do not route

Any of the following in output triggers an immediate HALT. Surface to Jason with the specific term and line.

### Product / legal terms
- `RGB` — use nothing (remove entirely if referring to colour; never as a product name)
- `Repayment Guarantee Bond` — use `Insurance Guarantee Instruments` or `IGI`
- `Data Valuation Partners` — banned entity name
- `DVP` — acronym for above, also banned
- `ICME` — banned entity name
- `Collateralization platform` — banned framing
- `Tessaract` — misspelling, always `Tesseract`

### Insurance counterparties (never name specific insurers)
- `AIG`
- `Liberty Mutual`
- `Lloyd's syndicates` (note: "Lloyd's of London" as our *own* broker status is fine — see REQUIRED below)
- `Allianz`
- `Munich Re`
- `Swiss Re`
- `Zurich`
- `Chubb`
- `Berkshire Hathaway`
- `partnered with [any named insurer]`
- Use instead: `major global insurance conglomerates`

### Currency
- `£` or `GBP` or `British Pounds` or `Sterling` — use `USD ($)` or `EUR (€)` only
- `$` is always USD. `€` is always EUR. No ambiguity.

### Banned individual names (never appear in any output)
- `Hendrick`
- `Simona Anamaria Marinescu`
- `Susan Bergin`
- `Joshua Armah`
- `Jamie Dixon`
- `Kyle Turner`
- `Carl Turner` (note: Carl Weir is permitted — different person)
- `Stephan Rust` (correct spelling is `Stefan Rust`)
- `Susan Pinedo`

### Sovereign misassignment
- `Mozambique` as pilot — Mozambique is not in the active sovereign arc. Do not reference externally.
- `Colombia` as expansion — Colombia is "next" not "expansion" (avoid the specific label)

### Financial language
- Any guarantee of yield or return without an asterisk (*)
- `guaranteed return` / `guaranteed yield` / `guaranteed income` — banned entirely
- All yield/return figures must carry `*` and a corresponding disclaimer if in a formal document

---

## REQUIRED TERMS — flag if absent where applicable

### Product naming
- Our product: `data-linked insurance products` (external) or `IGI` / `Insurance Guarantee Instruments` (technical)
- Our company: `One 2b` (with space, capital O, lowercase b)
- Our broker status: `registered Lloyd's of London broker` — this is our status, factual, permitted to state

### People (correct spellings)
- `Stefan Rust` (not Stephan)
- `Aaron Astley`

### Sovereign arc (correct labels)
- `Portugal` — flagship, live
- `Brazil` and `Colombia` — next
- `Isle of Man` — legislated data as asset class

---

## Yield / return asterisk rule

Every figure that references a potential return, yield, or financial outcome must carry `*`.

The asterisk must resolve to a disclaimer in the same document or message:
> *Indicative only. Not financial advice. Subject to data quality, methodology, and market conditions.

If the output contains a yield/return figure without `*`, flag it — do not auto-correct.

---

## Output format for A1 verdict

```
SENTINEL A1 VERDICT: [PASS | FLAG]

[If FLAG:]
VIOLATION(S):
- [Term/phrase found] | Rule: [rule name] | Line/context: [quote or description]
- [repeat for each violation]

REQUIRED ACTION: [what must change before this output ships]
```

Do not provide editorial rewrites. Flag only. The calling agent resolves the flag before resubmitting.
