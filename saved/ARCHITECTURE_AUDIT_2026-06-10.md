# One 2b Architecture Rule Audit
**Date:** 2026-06-10
**Author:** Claude Code (audit agent)
**Status:** P0 — health rules are in conflict. Read Section 2 first.

---

## SECTION 1 — Rule inventory

Every rule found, and which file(s) it lives in.

### 1.1 Peptide dosing rules

| Rule | Source files |
|------|-------------|
| All peptide doses in IU, never mcg alone | `~/.claude/CLAUDE.md` (rule 12), `CEO Intel/CLAUDE.md` (R-31 item 3 + May 22 PM lock), `_thread_operating_note.md` (R-31 IU rule), `jason-health-curator/SKILL.md` (R-31 staples), `feedback_health_peptide_lookup.md` (memory) |
| CJC-1295 no DAC = 20 IU, uses CND2 vial | `~/.claude/CLAUDE.md` (rule 12 vials), `feedback_health_peptide_lookup.md` (memory) |
| Ipamorelin = 20 IU, OLD Bali vials (IP-old) — NOT Luke & Bex new vials (8 IU) | `~/.claude/CLAUDE.md` (rule 12 vials), `feedback_health_peptide_lookup.md` (memory) |
| Ipamorelin = IP5 SKU | `CEO Intel/CLAUDE.md` (SKU table), `Operational_Peptide_Card_v1.0.md` (table row — uses IP5, 20 IU) |
| 5-Amino-1MQ injectable dose = 50 IU (0.5ml), 3ml bac water reconstitution | `~/.claude/CLAUDE.md` (rule 13), `feedback_5amino1mq_dose.md` (memory), `CEO Intel/CLAUDE.md` (SKU table — lists 5AM/50AM) |
| Chemical name leads, SKU in parentheses | `CEO Intel/CLAUDE.md` (R-31 item 4, May 23 Rule 2), `_thread_operating_note.md`, `jason-health-curator/SKILL.md`, `feedback_health_peptide_lookup.md` |
| Search Drive before answering any peptide question. Canonical card fileId: 1Db1Ed8wXyxVyAkJhGfDKGwL7yqbAGvmPwJvffd5EX7g | `~/.claude/CLAUDE.md` (rule 12 Drive search), `feedback_health_peptide_lookup.md` (memory) |
| Four-pass verification before any peptide answer | `_PASTE_INTO_NEW_THREAD.md`, `_thread_operating_note.md`, `jason-health-curator/SKILL.md`, `CEO Intel/CLAUDE.md` (May 23 section) |
| Retatrutide DISCONTINUED 2026-06-07 — never surface | `_state.md`, `Operational_Peptide_Card_v1.0.md` |
| Semax: any day, not training-dependent. Last dose by 19:30. Corrected 2026-06-08. | `Operational_Peptide_Card_v1.0.md` only |
| Thymosin alpha-1 NOT in Pepguard catalog; Thymalin (TY10) is a different peptide | `Operational_Peptide_Card_v1.0.md`, `CEO Intel/CLAUDE.md` (SKU table) |
| Compounds NOT in Pepguard: Thymosin alpha-1, 5-MeO-DMT, psilocybin, ketamine, MDMA, ibogaine | `CEO Intel/CLAUDE.md` (May 23 protocol section) |

### 1.2 Evening stack timing rules

| Rule | Source files |
|------|-------------|
| Evening stack = just before bedtime, NEVER a fixed clock time | `~/.claude/CLAUDE.md` (rule 12 evening rules, item a), `_thread_operating_note.md` (RULE 0a), `feedback_peptide_timing_needles.md` (memory) |
| Always show IU next to every peptide — no exceptions | `~/.claude/CLAUDE.md` (rule 12 evening rules, item b) |
| Fewest needles possible — combine into minimum syringes. Always state total needle count. | `~/.claude/CLAUDE.md` (rule 12 evening rules, item c), `_thread_operating_note.md` (RULE 0b), `feedback_peptide_timing_needles.md` (memory) |
| Needle format: "Needle 1 (same syringe): A + B = X IU total" | `CEO Intel/CLAUDE.md` (May 23 Rule 5) |

### 1.3 State and date-check rules

| Rule | Source files |
|------|-------------|
| State date check before any stack answer | `_thread_operating_note.md` (RULE 0), `_PASTE_INTO_NEW_THREAD.md` (Pass 3) |
| Read `_state.md` first on every dose question | `_thread_operating_note.md`, `_PASTE_INTO_NEW_THREAD.md`, `jason-health-curator/SKILL.md` |
| Training is the default — full stack fires automatically on training language | `CEO Intel/CLAUDE.md` (May 23 Rule 1), `_thread_operating_note.md`, `jason-health-curator/SKILL.md` |

### 1.4 Memory / burn-in rules

| Rule | Source files |
|------|-------------|
| "Lock / burn / never forget" = must: (a) update CLAUDE.md immediately, (b) commit and push to GitHub, (c) write a memory file. All three. | `~/.claude/CLAUDE.md` (rule 12 burn-in), `CEO Intel/CLAUDE.md` (same-turn-execution-lock section) |
| Same-turn application — rule must be applied in the turn it is locked, not deferred | `CEO Intel/CLAUDE.md` (June 4 same-turn-execution-lock) |
| Verify before stating — never assert from memory alone | `~/.claude/CLAUDE.md` (rule 15), `feedback_verify_before_stating.md` (memory) |

### 1.5 Response format rules

| Rule | Source files |
|------|-------------|
| Brief bullets only. No preamble. Facts and next steps. | `~/.claude/CLAUDE.md` (rule 8a), `feedback_response_style.md` (memory) |
| One action per numbered step. Copy-paste ready text inline. | `~/.claude/CLAUDE.md` (rule 8), `feedback_copy_paste.md` (memory) |
| Next steps for you FIRST in every reply | `CEO Intel/CLAUDE.md` (May 7 lock, repeated at Communication Preferences section), compacted-response format (May 23) |
| Compacted format: Next steps / Recommendations / What I locked / Long detail at bottom | `CEO Intel/CLAUDE.md` (May 23 compacted-response), `_thread_operating_note.md` |
| Never ask Jason to drag-and-drop, upload, or manually move files | `~/.claude/CLAUDE.md` (rule 8a), `feedback_response_style.md` |
| Always link documents as markdown `[label](url)` | `~/.claude/CLAUDE.md` (rule 2), `feedback_clickable_links.md` (memory), `CEO Intel/CLAUDE.md` (R-31 item 8) |
| No fabricated data in any output | `CEO Intel/CLAUDE.md` (May 22 PM no-fabricated-data, R-31 item 7), `_thread_operating_note.md` |
| AM/PM time format, never 24-hour | `CEO Intel/CLAUDE.md` (May 14 lock, R-31 item 2), `_thread_operating_note.md` |

### 1.6 Execution and autonomy rules

| Rule | Source files |
|------|-------------|
| Execute immediately in hours. Never weeks, never "phase 2." | `~/.claude/CLAUDE.md` (rule 1a), `feedback_execution_speed.md` (memory), `CEO Intel/CLAUDE.md` (May 29 autonomous-execution-maximisation) |
| Never ask Jason to do something Claude can do | `~/.claude/CLAUDE.md` (rule 1), `feedback_do_it_yourself.md` (memory) |
| API-first before click-by-click instructions | `CEO Intel/CLAUDE.md` (May 29 autonomous-execution-maximisation item 1) |

### 1.7 Sovereign terminology

| Rule | Source files |
|------|-------------|
| Portugal = flagship (live). Brazil + Colombia = next. Mozambique = dropped. | `~/.claude/CLAUDE.md` (rule 4), `feedback_sovereign_terminology.md` (memory) |
| CLAUDE.md says: "Portugal = flagship (live). Brazil + Colombia = next. Never Mozambique externally." | `~/.claude/CLAUDE.md` |
| One2b/CLAUDE.md says: "Mozambique = PILOT, Colombia = EXPANSION. Never reverse." | `one2b-agents/CLAUDE.md` (Section 6 terminology) |

### 1.8 Terminology and language rules

| Rule | Source files |
|------|-------------|
| External product language: "data-linked insurance products" — never "IGI Insurance" | `~/.claude/CLAUDE.md` (rule 5), `CEO Intel/CLAUDE.md` (R-31 item 5, May 28 IGI retirement) |
| Never use hyphens in prose. Zero. Use commas, semicolons, periods, or parentheses instead. | `CEO Intel/CLAUDE.md` (R-31 item 16, June 2 lock), `one2b-agents/CLAUDE.md` (Section 6 punctuation) |
| No em dashes in prose | `CEO Intel/CLAUDE.md` (R-31 item 16), `feedback_punctuation_style.md` (memory) |
| Currency: USD ($) or EUR (€) only. Never GBP. | `~/.claude/CLAUDE.md` (rule 6), `CEO Intel/CLAUDE.md` (R-31 item 5), `one2b-agents/CLAUDE.md` |
| Asterisk all projections | `~/.claude/CLAUDE.md` (rule 7) |
| Stefan Rust (never "Stephan Rust") | `CEO Intel/CLAUDE.md` (Section 6 banned), `~/.claude/CLAUDE.md` (key relationships) |
| Tesseract (never "Tessaract") | `CEO Intel/CLAUDE.md` (Section 6 banned) |

### 1.9 Save, GitHub, and dual-save rules

| Rule | Source files |
|------|-------------|
| Save Router fires mid-session always | `~/.claude/CLAUDE.md` (rule 11) |
| Dual-save: local saved/ AND Drive | `~/.claude/CLAUDE.md` (rule 3), `feedback_do_it_yourself.md` (memory) |
| GitHub commit at end of every session with saves | `~/.claude/CLAUDE.md` (rule 11) |
| GitHub push failures are P0 — fix immediately | `~/.claude/CLAUDE.md` (rule 14) |

---

## SECTION 2 — Conflicts

Direct contradiction between two sources on the same rule.

### CONFLICT 1 — Evening stack timing (P0 — health risk)

**The problem:** The `Operational_Peptide_Card_v1.0.md` Section heading for "Injection window 4" reads **"Evening sleep stack (21:30)"** — it hardcodes a clock time in the section heading.

Every other source says the OPPOSITE:
- `~/.claude/CLAUDE.md` rule 12 (item a): "Timing = just before bedtime, whenever that is. Never prescribe a clock time."
- `_thread_operating_note.md` RULE 0a: "Never prescribe a clock time for the evening injection. It fires when he goes to bed."
- `feedback_peptide_timing_needles.md` memory: "Never prescribe 21:30 or any fixed clock time."

**Status:** The Peptide Card heading is stale and contradicts three locked sources.
**Which is correct:** "Just before bedtime" — all three locked sources agree.
**Fix:** Edit the Peptide Card heading from "Evening sleep stack (21:30)" to "Evening sleep stack (just before bedtime)."

---

### CONFLICT 2 — Ipamorelin vial SKU (P0 — health risk, wrong dose if wrong vial)

**The problem:** Two sources disagree on which vial Jason is using for Ipamorelin.

- `~/.claude/CLAUDE.md` rule 12 (vials): "Ipamorelin = 20 IU (OLD Bali vials, IP-old). Never default to Luke & Bex new vials (8 IU)."
- `feedback_health_peptide_lookup.md` memory: "Ipamorelin → always 20 IU. Jason is on OLD Bali vials (IP-old), NOT the Luke & Bex new vials (IP5)."
- `Operational_Peptide_Card_v1.0.md` table row: `| Ipamorelin | (IP5) | 20 IU per validated sleep formula |`

**The Peptide Card uses the SKU IP5 (the Luke & Bex new vials) but carries the 20 IU dose (which belongs to the OLD Bali vials).** This is a mixed-source entry. If anyone reads the SKU and looks up the IP5 vial concentration, the dose calculation will be wrong.

**Status:** Peptide Card has the correct IU dose but the wrong vial SKU.
**Which is correct:** OLD Bali vials (IP-old), 20 IU. The SKU in the Peptide Card should be (IP-old), not (IP5), until Jason explicitly confirms a vial switch.
**Fix:** Update Peptide Card row to `(IP-old)` with a note that switch to IP5 requires Jason confirmation.

---

### CONFLICT 3 — Sovereign terminology (P1)

**The problem:** Two CLAUDE.md files give different sovereign labels.

- `~/.claude/CLAUDE.md` (global rules): "Portugal = flagship (live). Brazil + Colombia = next. Never Mozambique externally."
- `one2b-agents/CLAUDE.md` (project rules, Section 6): "Mozambique = PILOT, Colombia = EXPANSION. Never reverse."
- `feedback_sovereign_terminology.md` memory: "Mozambique: dropped from active pipeline. Do not reference externally."

**Status:** The project CLAUDE.md (`one2b-agents/CLAUDE.md`) still carries the old Mozambique = PILOT labeling. The global CLAUDE.md has the correct version. The memory file confirms the correct version.
**Which is correct:** Global CLAUDE.md and memory file. Mozambique is dropped. Portugal is flagship.
**Fix:** Update `one2b-agents/CLAUDE.md` Section 6 sovereign terminology to match global CLAUDE.md. Remove "Mozambique = PILOT, Colombia = EXPANSION" line. Replace with: "Portugal = flagship (live). Brazil + Colombia = next. Never Mozambique externally."

---

### CONFLICT 4 — Response format: brief bullets vs next-steps-first (P2)

**The problem:** Two different response format models are locked in different files.

- `~/.claude/CLAUDE.md` (rule 8a): "Brief bullets only. Facts and next steps. No long-winded explanations."
- `CEO Intel/CLAUDE.md` (May 7 + May 23 locks): "Next steps for you FIRST (numbered), then Recommendations, then What I locked, then Long detail at bottom (optional)." — explicitly ALLOWS long detail at the bottom.
- `_thread_operating_note.md` (health context): Uses the compacted four-section format.

**Status:** These are not fully contradictory but the global CLAUDE.md says "brief bullets only" with no provision for long detail, while the Cowork CLAUDE.md explicitly provides for long detail at the bottom. The Cowork version is more detailed and was refined later (May 23, 2026 vs no date on global rule 8a).
**Which is correct:** The Cowork compacted-response format (brief up top, long detail optional at bottom) is more nuanced and appropriate. The global rule 8a is an oversimplification that can be read as prohibiting the optional long-detail section.
**Fix:** Update `~/.claude/CLAUDE.md` rule 8a to match: "Brief bullets up top: Next steps, Recommendations, What I locked. Long detail at bottom if needed (optional read). No preamble."

---

### CONFLICT 5 — Punctuation: no hyphens (P2)

**The problem:** The scope of the no-hyphens rule differs between sources.

- `CEO Intel/CLAUDE.md` R-31 item 16 (June 2, locked twice): "Zero. Not minimal. Not where useful. Zero. Banned characters in body prose: `-` `—` `–`." With carve-outs for compound technical identifiers (BPC-157, TB-500, etc.), URLs, file paths, code, ISO dates.
- `one2b-agents/CLAUDE.md` Section 6: "Never use hyphens. Always use a comma wherever humanly possible. No exceptions." — no carve-out listed for technical identifiers like BPC-157.

**Status:** The `one2b-agents/CLAUDE.md` version is more absolute but practically means BPC-157 would be written without a hyphen, which conflicts with established peptide naming. The CEO Intel version has the more workable carve-out.
**Which is correct:** CEO Intel version with explicit technical-identifier carve-out.
**Fix:** Update `one2b-agents/CLAUDE.md` punctuation rule to include the carve-out: "Never use hyphens in prose. Compound technical identifiers (BPC-157, TB-500, MOTS-c, etc.), URLs, file paths, code, and ISO dates retain their hyphens."

---

### CONFLICT 6 — GHK-Cu vial default (P1)

**The problem:** The global CLAUDE.md mentions GHK-Cu but the Peptide Card does not have a confirmed dose.

- `~/.claude/CLAUDE.md` rule 12 (vials): "GHK-Cu = 20 IU (old Bali stock)."
- `Operational_Peptide_Card_v1.0.md` Morning daily section: `| GHK-Cu (copper peptide) | (CU) | [pending] |`

**Status:** Not a direct conflict (card says pending, CLAUDE.md says 20 IU). But CLAUDE.md has a locked default that the card does not reflect.
**Fix:** Update Peptide Card GHK-Cu row from `[pending]` to `20 IU (old Bali stock — CU vial)` with a note to verify against canonical.

---

## SECTION 3 — Gaps

Rules that exist in one place but are absent from others.

### GAP 1 — Date-check-before-stack-answer missing from global CLAUDE.md (P0 — health risk)

`_thread_operating_note.md` RULE 0 mandates: "State the current date and day of week explicitly before answering any stack question." This is a non-negotiable health safety rule.

It is NOT present in `~/.claude/CLAUDE.md`. If a Claude Code session (not Cowork) handles a peptide question, this rule will not fire.

**Fix:** Add to `~/.claude/CLAUDE.md` rule 12 or as a new sub-rule: "Before any peptide stack answer, state today's date and day of week explicitly (drawn from currentDate memory). Do not skip for brevity."

---

### GAP 2 — Four-pass verification rule missing from global CLAUDE.md (P0 — health risk)

The four-pass rule is locked in: `_PASTE_INTO_NEW_THREAD.md`, `_thread_operating_note.md`, `jason-health-curator/SKILL.md`, and `CEO Intel/CLAUDE.md`.

It is NOT in `~/.claude/CLAUDE.md`.

Claude Code sessions handling peptide questions have no instruction to run four passes. This is the root cause of past dose errors.

**Fix:** Add to `~/.claude/CLAUDE.md` rule 12 or as rule 12b: "Four-pass verification gate before any peptide dose answer: (1) pull from canonical Drive reference, (2) cross-check sleep/training formula, (3) sanity check against current state and rules, (4) verify scheduling constraints trace to canonical source. Do not answer if any pass incomplete."

---

### GAP 3 — Explicit needle combining rule missing from global CLAUDE.md (P1)

Needle combining format ("Needle 1 (same syringe): A + B = X IU total") is in `CEO Intel/CLAUDE.md` (May 23 Rule 5) and `_thread_operating_note.md` RULE 0b.

Only `~/.claude/CLAUDE.md` rule 12 item (c) mentions "combine into minimum syringes, state total needle count" but does NOT give the explicit format.

**Fix:** Add the format rule to `~/.claude/CLAUDE.md` rule 12.

---

### GAP 4 — Semax correction (any day, not training-day-only) not in global CLAUDE.md (P1)

`Operational_Peptide_Card_v1.0.md` has a 2026-06-08 correction: "Semax: any day, not training-dependent. Last dose by 19:30 to protect sleep." This was a direct Jason correction.

This correction is NOT in `~/.claude/CLAUDE.md`, `CEO Intel/CLAUDE.md`, or any memory file.

**Fix:** Add Semax correction to `~/.claude/CLAUDE.md` rule 12 and create a memory file.

---

### GAP 5 — R-31 pre-emit checklist not in global CLAUDE.md (P1)

The 16-item R-31 checklist is locked in `CEO Intel/CLAUDE.md` and referenced in `jason-health-curator/SKILL.md`. It is NOT present in `~/.claude/CLAUDE.md`.

This means Claude Code sessions have no pre-emit gate. All the sub-rules (banned terms, AM/PM, IU, etc.) are present individually in `~/.claude/CLAUDE.md` but there is no enforced checklist structure.

**Fix:** Add a compact R-31 summary to `~/.claude/CLAUDE.md`: "R-31 pre-emit check fires before every reply: (1) AM/PM time format, (2) IU for peptides, (3) chemical name leads, (4) no banned terms, (5) no fabricated data, (6) all links clickable, (7) compacted format, (8) no hyphens in prose."

---

### GAP 6 — Despatch + JASON OS check-in protocol not in global CLAUDE.md (P2)

`CEO Intel/CLAUDE.md` (May 25) mandates checking Despatch and JASON OS state file at every morning/evening check-in. Not present in `~/.claude/CLAUDE.md`.

---

### GAP 7 — Operational Peptide Card does not have the Semax schedule correction filed into canonical columns (P1)

The Card has the correction noted in the PRN dose cell but the Trigger column still says "Cognitive demand / focus / heavy call blocks / any day needing clarity" without explicitly removing the old "training day only" constraint.

---

### GAP 8 — Memory file missing for the "burn it in" procedural rule itself (P2)

The rule "lock/burn/never forget = (a) update CLAUDE.md, (b) commit to GitHub, (c) write a memory file" exists in `~/.claude/CLAUDE.md` but there is no dedicated memory file for it. If a session loads only memory files and not CLAUDE.md, the procedural rule will not be present.

---

### GAP 9 — Ipamorelin vial correction not in Cowork `CEO Intel/CLAUDE.md` (P0)

The locked default "OLD Bali vials (IP-old) = 20 IU" is in `~/.claude/CLAUDE.md` and memory but NOT explicitly in `CEO Intel/CLAUDE.md`. The CEO Intel CLAUDE.md SKU table only lists IP5 as the SKU with no vial distinction or correction note.

**Fix:** Add to the CEO Intel CLAUDE.md SKU table a note under IP5: "Jason currently uses OLD Bali stock (IP-old). Default is 20 IU. Do NOT switch to IP5 column (8 IU) without explicit Jason confirmation in session."

---

## SECTION 4 — Stale/contradicted rules still present

### STALE 1 — Operational Peptide Card heading "Evening sleep stack (21:30)"

File: `Operational_Peptide_Card_v1.0.md`, line 60.
Stale clock time "21:30" in the section heading contradicts three locked sources. The heading has never been updated since the card was created (2026-05-23).

---

### STALE 2 — Operational Peptide Card Ipamorelin SKU shows IP5, not IP-old

File: `Operational_Peptide_Card_v1.0.md`, line 65.
The SKU "(IP5)" contradicts the locked default in `~/.claude/CLAUDE.md` and the memory file. IP5 is the Luke & Bex new vials (8 IU per the memory); Jason is on OLD Bali vials (20 IU).

---

### STALE 3 — one2b-agents/CLAUDE.md Section 6: "Mozambique = PILOT, Colombia = EXPANSION"

File: `one2b-agents/CLAUDE.md`, line 153.
Contradicts the global CLAUDE.md, memory file, and the corrected sovereign arc. Mozambique is dropped. Portugal is the only external pilot reference.

---

### STALE 4 — one2b-agents/CLAUDE.md Section 2 substrate manifest: "/Sovereigns/[country]/status.md (Mozambique pilot, Colombia expansion)"

File: `one2b-agents/CLAUDE.md`, line 73.
Same stale Mozambique labeling embedded in the substrate manifest. Any agent built from this manifest will inherit the wrong sovereign framing.

---

### STALE 5 — CEO Intel CLAUDE.md response format section duplicated

`CEO Intel/CLAUDE.md` contains the "Response format — Next steps for you, first, every time" section twice (locked May 7, appearing at line ~346 and again at the "Communication preferences" section ~946). Both sections are identical. One is redundant and increases the risk of them drifting apart in future edits.

---

### STALE 6 — CEO Intel CLAUDE.md note at line 77: "IGI is retired — use data-linked insurance product"

The note at line 77 of `CEO Intel/CLAUDE.md` correctly states IGI is retired (locked May 28, 2026). However, earlier in that same file (Section on terminology guard rails), the text "IGI / Insurance Guarantee Instruments" still appears in the "Always use" list in `one2b-agents/CLAUDE.md` Section 6. These are not the same file but they should be consistent.

File: `one2b-agents/CLAUDE.md`, line 151: "Always use: IGI / Insurance Guarantee Instruments..."
Contradicts: `~/.claude/CLAUDE.md` rule 5 and `CEO Intel/CLAUDE.md` May 28 lock ("IGI retired").

**Fix:** Update `one2b-agents/CLAUDE.md` "Always use" list to replace "IGI / Insurance Guarantee Instruments" with "data-linked insurance products".

---

## SECTION 5 — Enforcement gap analysis

### Why rules keep getting skipped

**The structural problem:** Rules are stored as static text in CLAUDE.md files. Claude reads those files at session start (if the session opening protocol is followed) but there is no mechanical enforcement of whether each rule actually fires on each turn. "Locked in memory" means stored in a file that may or may not be loaded, not hardwired into any execution path.

**Five specific enforcement failures observed:**

1. **Multi-file drift.** The same rule lives in 4-6 files. When Jason corrects a rule, it gets updated in the file currently open in that session. The correction does not propagate to the other 3-5 files. The next session that loads a different file loads the stale version. This audit found at least 6 stale rules that were corrected in one file but not others.

2. **Session opening protocol not enforced.** `~/.claude/CLAUDE.md` says "read SAVE_PROTOCOL.md and ACTIVE.md at session start." There is no hook or mechanism that ensures this actually happens. A Claude Code session can start responding to Jason's first prompt without reading any of these files if the model does not proactively do it.

3. **Cowork vs Claude Code split.** Rules locked in `CEO Intel/CLAUDE.md` (Cowork project) are not automatically available in Claude Code sessions, and vice versa. There is no single authoritative ruleset that both surfaces read. The global `~/.claude/CLAUDE.md` is supposed to bridge this but it is significantly thinner than the Cowork CLAUDE.md, missing key rules like the four-pass gate, R-31, and the date-check rule.

4. **Memory files are advisory.** Memory files in `/memory/*.md` are surfaced as context but there is no guarantee that every session reads every memory file before answering. A session that does not load the memory will not have the vial correction, the 5AM dose correction, or the timing rules.

5. **Health rules exist only in Cowork substrate.** The most safety-critical rules (four-pass gate, date check, needle format, Ipamorelin vial distinction) live primarily in the Cowork/JASON HEALTH caps task substrate (`_thread_operating_note.md`, `_PASTE_INTO_NEW_THREAD.md`). These files are only loaded when Jason explicitly uses the JASON HEALTH thread. If a peptide question comes to Claude Code or the CEO Intel thread without those files loaded, none of the four-pass, date-check, or needle rules fire.

### What a real enforcement layer would look like

1. **Single canonical ruleset.** All health-critical rules (peptide doses, vials, four-pass, date-check, timing, needle format) must live in `~/.claude/CLAUDE.md` — the one file that loads in every session. The Cowork CLAUDE.md, memory files, and health substrate files supplement but do not substitute.

2. **Propagation gate.** When Jason corrects a rule, the correction must be applied to ALL source files in the same turn. The current "write a memory file" step is necessary but not sufficient — the correction also needs to go into `~/.claude/CLAUDE.md` and any other file that carries the stale version.

3. **Pre-emit hook.** The R-31 checklist (16 items in Cowork CLAUDE.md) should be compressed into a short checklist in `~/.claude/CLAUDE.md` that fires before every substantive reply. Currently R-31 is only in the Cowork context.

4. **Peptide question trigger.** Any message containing peptide-related keywords (peptide, IU, dose, stack, CJC, Ipamorelin, BPC, MOTS, Semax, etc.) should force a Drive lookup before any answer is given. This is locked in `~/.claude/CLAUDE.md` rule 12 but there is no mechanical hook to enforce it.

---

## SECTION 6 — Prioritised fix list

### P1 — Fix today (health risk)

**FIX 1a:** Edit `Operational_Peptide_Card_v1.0.md` line 60: change "Evening sleep stack (21:30)" to "Evening sleep stack (just before bedtime — never a fixed clock time)."

**FIX 1b:** Edit `Operational_Peptide_Card_v1.0.md` Ipamorelin row: change SKU from "(IP5)" to "(IP-old — OLD Bali vials; 20 IU. Switch to IP5 only on Jason explicit confirmation in session)."

**FIX 1c:** Add four-pass verification gate to `~/.claude/CLAUDE.md` as rule 12b:
"Four-pass before any peptide dose answer: (1) pull dose from canonical Drive reference (fileId: 1Db1Ed8wXyxVyAkJhGfDKGwL7yqbAGvmPwJvffd5EX7g), (2) cross-check sleep/training formula, (3) sanity check against current state and rules, (4) verify scheduling constraints trace to canonical source. If any pass incomplete, say 'I need to verify X — give me 60 seconds.'"

**FIX 1d:** Add date-check rule to `~/.claude/CLAUDE.md` rule 12: "Before any peptide stack answer, state today's date and day of week from currentDate before the stack. Do not skip. Wrong-day stack is a health risk."

**FIX 1e:** Add Semax correction to `~/.claude/CLAUDE.md` rule 12 and to `CEO Intel/CLAUDE.md` SKU table: "Semax (XA10): any day, not training-dependent. Last dose by 19:30 to protect sleep. Corrected 2026-06-08 — Jason direct."

**FIX 1f:** Add to `CEO Intel/CLAUDE.md` SKU table a vial-distinction note for Ipamorelin: "Jason currently on IP-old (OLD Bali stock), 20 IU. IP5 column (8 IU per new vials) must NOT be used without explicit Jason confirmation in session."

---

### P2 — Fix this week (terminology and structural)

**FIX 2a:** Update `one2b-agents/CLAUDE.md` Section 6 sovereign terminology: replace "Mozambique = PILOT, Colombia = EXPANSION" with "Portugal = flagship (live). Brazil + Colombia = next. Mozambique: dropped from active pipeline, do not reference externally." Also update line 73 (substrate manifest) to remove Mozambique.

**FIX 2b:** Update `one2b-agents/CLAUDE.md` Section 6 "Always use" list: replace "IGI / Insurance Guarantee Instruments" with "data-linked insurance products" to match the May 28 lock in CEO Intel CLAUDE.md.

**FIX 2c:** Update `one2b-agents/CLAUDE.md` Section 6 punctuation rule to include technical-identifier carve-out: "Never use hyphens in prose. Exception: compound technical identifiers (BPC-157, TB-500, etc.), URLs, file paths, code identifiers, and ISO dates retain their hyphens."

**FIX 2d:** Update `~/.claude/CLAUDE.md` rule 8a response format to match the Cowork compacted-response model: "Brief bullets up top: Next steps first (numbered), then Recommendations, then What I locked. Long detail at bottom optional. No preamble, no narration."

**FIX 2e:** Add compact R-31 summary to `~/.claude/CLAUDE.md`: "R-31 pre-emit: (1) AM/PM time format, (2) IU for peptides (never mcg alone), (3) chemical name leads (SKU in parentheses), (4) no banned terms (IGI Insurance, Tessaract, GBP, named insurers, Mozambique as pilot), (5) no fabricated data, (6) all URLs as markdown links, (7) compacted format, (8) no hyphens in prose."

**FIX 2f:** Add Semax correction memory file: `feedback_semax_any_day_correction.md`.

**FIX 2g:** Remove duplicate "Response format" section from `CEO Intel/CLAUDE.md` (one appears at ~line 346, one at ~line 948 — keep the more recent May 23 compacted version, remove or archive the May 7 version).

---

### P3 — Structural (this sprint)

**FIX 3a:** Build a propagation checklist. When any rule is corrected, a list of all files to update fires automatically. Files to check on every new correction: `~/.claude/CLAUDE.md`, `one2b-agents/CLAUDE.md`, `CEO Intel/CLAUDE.md`, relevant memory file, relevant SKILL.md, relevant Operational Peptide Card section (for health rules).

**FIX 3b:** Add a session-opening hook to `one2b-agents/.claude/settings.json` or equivalent that forces the reading of `SAVE_PROTOCOL.md` and `ACTIVE.md` at session start. Currently the session opening protocol is advisory text in CLAUDE.md, not a hook.

**FIX 3c:** Add health-rule completeness check to Fleet Health Audit weekly run: scan `~/.claude/CLAUDE.md` for four-pass gate, date-check, vial-distinction rules, and Semax correction. Flag any that are absent as P0.

**FIX 3d:** Resolve the Cowork vs Claude Code rule split structurally. The authoritative rule set for health should live in `~/.claude/CLAUDE.md` (loads in every session) and the Cowork substrate files should REFERENCE it rather than be the primary source. Currently the Cowork substrate IS the primary source for many health rules, which means they are invisible to Claude Code.

---

## Commit checklist

After applying the above fixes:

1. Apply FIX 1a and 1b to `Operational_Peptide_Card_v1.0.md`.
2. Apply FIX 1c, 1d, 1e to `~/.claude/CLAUDE.md`.
3. Apply FIX 1f to `CEO Intel/CLAUDE.md` SKU table.
4. Apply FIX 2a, 2b, 2c to `one2b-agents/CLAUDE.md`.
5. Apply FIX 2d, 2e to `~/.claude/CLAUDE.md`.
6. Create FIX 2f memory file.
7. Commit and push to GitHub (per rule 11 and rule 14).

---

*End of audit. 6 rule conflicts found (2 are P0 health risks). 9 gaps found (3 are P0 health risks). 6 stale rules found. All P1 fixes can be applied in one session.*
