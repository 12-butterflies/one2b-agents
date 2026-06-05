# RED Flags — Standing List
**Enforced by:** Sentinel A1 (pre-flight), Sentinel A3 (pre-ship)
**Last updated:** 2026-06-05
**Status:** Locked — add to this list, never remove without Jason's explicit instruction

---

## Automatic halt — escalate to Jason immediately

Any output containing the following must be halted before delivery. Do not rephrase and retry. Surface the violation and the offending passage.

### Banned terms (see Terminology/must_never_use.md for full list)
- RGB, Repayment Guarantee Bond, DVP, ICME, Tessaract (misspelling)
- Named insurance houses (AIG, Allianz, Munich Re, Lloyd's syndicates, etc.)
- Banned personal names (Susan Bergin, Joshua Armah, Jamie Dixon, Kyle Turner, Carl Turner, Hendrick, Simona Anamaria Marinescu)
- GBP / British Pounds / £ in any financial figure

### Guarantee language on financial returns
Any variant of "guaranteed return," "guaranteed yield," "guaranteed income," or similar. Use "target" or "projected" with an asterisk.

### Sovereign status reversal
- Mozambique described as "expansion" (it is PILOT)
- Colombia described as "pilot" (it is EXPANSION)

### Unverifiable financial claims
Specific numbers (AUM, fund size, deal size, valuation) without a named source or "as of [date]" qualifier. If we can't cite it, we don't publish it.

### Named counterparty without written agreement
Any output that names a specific corporate counterparty (insurer, sovereign body, fund) as a partner, client, or investor without confirmed written agreement on file. "We are in discussions with X" requires Jason's explicit approval before use externally.

### Fabricated names, dates, or quotes
Any person, date, publication, or direct quote that is not verifiable from a source in CEO Intel or cited in the output. Sentinel flags, does not self-correct.

---

## Review-required — surface to Jason before sending

These do not auto-halt but require Jason's sign-off before the output leaves the system.

- Any output referencing Mozambique or Colombia in a sovereign-partnership context
- Any output that goes to a named investor, fund, or family office
- Any new claim about One 2b's regulatory status beyond "registered Lloyd's of London broker"
- Any output referencing Stefan Rust, Aaron Astley, or other named partners in a commitment context
- Cross-trinity outputs: a piece that carries One 2b branding but speaks in 12 Butterflies voice, or vice versa

---

## Pattern flags — log for Sentinel calibration

These are patterns that have produced slop or errors in past sessions. Log the instance, do not halt.

- Long context drift: agent begins generating content inconsistent with the current trinity identity (e.g., One 2b post that sounds like personal Jason voice)
- Model confabulation of tool capabilities: agent claims a tool can do something not in the tool's documented spec
- Metric without source: post-performance numbers cited without a named platform and date
- Callback framing: output uses "I remember when you said X" or similar recall markers instead of surface-insight framing

---

*This list is the Sentinel A1 and A3 trigger table. Sentinel reads this file on every pre-flight and pre-ship check. Updates go through Jason's explicit promotion — no agent auto-merges into this file.*
