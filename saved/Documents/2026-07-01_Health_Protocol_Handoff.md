# Jason Health Protocol Context — Build Handoff (Doc 3 of 4)
**Compiled:** Wednesday, 2026-07-01 (Lisbon)
**Purpose:** Jason's personal health, peptide, training, and longevity context, for the personal Cowork / Claude Code account. Health protocol only, no architecture, capital, or people detail (those are Docs 1, 2, 4).
**Boundary note:** `saved/SAVE_PROTOCOL.md` line 120 says personal health data stays in the JASON OS project only. **Jason reviewed this on 2026-07-01 and waived that rule for this handoff**, so this document is committed to the public GitHub repo alongside Docs 1, 2, and 4, and also mirrored in Google Drive. The waiver covers this document and the health source files it draws from. It does not extend to the phone number and address files, which stay off GitHub (see the index, Doc 4, Section 10).
**Currency:** USD ($) or EUR (€) only. **Punctuation:** commas over hyphens in prose, per standing rule. Compound peptide identifiers (BPC-157, TB-500, CJC-1295, SS-31, 5-Amino-1MQ, GHK-Cu) keep their hyphens.

---

## 0. Where to find this

| What | Where |
|---|---|
| **GitHub (view in browser)** | [github.com/12-butterflies/one2b-agents/blob/main/saved/Documents/2026-07-01_Health_Protocol_Handoff.md](https://github.com/12-butterflies/one2b-agents/blob/main/saved/Documents/2026-07-01_Health_Protocol_Handoff.md) — resolves after this session's push |
| **Raw markdown (agent fetch, no auth)** | [raw.githubusercontent.com/12-butterflies/one2b-agents/main/saved/Documents/2026-07-01_Health_Protocol_Handoff.md](https://raw.githubusercontent.com/12-butterflies/one2b-agents/main/saved/Documents/2026-07-01_Health_Protocol_Handoff.md) — allow up to 5 minutes CDN cache after push |
| **Local file on this Mac** | `/Users/jasonpeterstevens/one2b-agents/saved/Documents/2026-07-01_Health_Protocol_Handoff.md` |
| **Google Drive copy** | [2026-07-01_Health_Protocol_Handoff](https://docs.google.com/document/d/1WqVQFbq_F_Jq8qZkVoRBHKobRKPp0dhvyZ2EonWw_uw/edit), filed in Jason Life OS / 1-Health |

---

## 1. Canonical source files this doc is built from

The live source of truth is the small set of files the Jason Health Curator agent reads on every invocation. This handoff is a snapshot of them as of 2026-07-01, not a replacement.

| File | Role | Last updated |
|---|---|---|
| `saved/Health/STACK_TEMPLATE.md` | The dosing template, filled per day. Read first on any stack question. | 2026-06-18 |
| `saved/Health/DAILY_LOG.md` | Append only daily history. Single source of truth for what was actually taken. | 2026-07-01 (gap marker), 2026-06-18 (last full day) |
| `saved/Health/_state.md` | Current state (maintenance / loading / PRN) and active focus list. | 2026-06-18 |
| `saved/Health/LONGEVITY_CITATIONS_2026-06-11.md` | Research citations backing each locked protocol decision. | 2026-06-11 |
| `saved/Research/Longevity/2026-W25_longevity_sweep.md` | Weekly longevity research sweep (separate agent). | 2026-06-15 |
| `saved/JASON_PEPTIDE_DEEP_DIVE_2026-06-10.md` | Full peptide history timeline and deep dive. | 2026-06-10 |
| `skills/jason-health-curator/SKILL.md` | The agent that reads all of the above and answers dose questions. | v1.1, locked 2026-06-11 |

**Subject:** Jason Peter Stevens, DOB 1974-03-30 (age 52), 74 kg / 175 cm, based in Lisbon. Supply source: Pepguard (international), unaffected by the US FDA change in Section 10.

---

## 2. Current state (as recorded 2026-06-18 — see the staleness flag in Section 11)

- **Peptide state:** maintenance (training resumed, feeling well, confirmed 2026-05-23 PM).
- **State definitions:** *maintenance* = feeling well, normal training and sleep, no acute issue, the default. *Loading / recovery* = post travel, sickness, ceremony, or injury, a defined window of roughly 2 to 4 weeks. *PRN / acute* = hangover, anxiety, respiratory or gut acute, or pre event, triggered rather than routine.
- **State change protocol:** Jason updates the top line of `_state.md` when state changes. Triggers are travel (loading 7 to 14 days), sickness (until recovered plus a 7 day buffer), ceremony (7 to 14 days), injury (until healed plus a 7 day buffer), and heavy training blocks (as long as the block).

---

## 3. The stack — as of the 2026-06-18 template

Two important standing rules frame every stack answer: the evening stack fires **just before bed, never a clock time**, and every answer **minimises needle count and states it**.

### Training day

**Morning, fasted, before training (aim 1 to 2 syringes):**

| Peptide | SKU | Dose |
|---|---|---|
| CJC-1295 no DAC | CND2 | 20 IU |
| Ipamorelin | IP-old | 20 IU |
| MOTS-c | MS10 | 38 IU |
| AOD-9604 | 5AD | 10 IU |
| NAD+ | NJ500 | 100 IU slow push 10 to 15 min, 2 to 3x per week only, not daily |
| SS-31 | 2S10 | 5 IU |
| GHK-Cu | CU | 20 IU (morning dose of a twice daily protocol) |
| Semax | XA10 | 10 IU SubQ, separate syringe (nasal spray is emergency backup only) |

**After training, SubQ (same syringe if compatible):** BPC-157 + TB-500 blend (BB20) 8 IU, plus AOD-9604 (5AD) 10 IU (the second AOD dose of the day, no separate 15:00 shot needed).

**After training, with the meal:** 5-Amino-1MQ (50AM) 50 IU, taken with food not fasted, daily.

**Bedtime, one needle:** CJC-1295 no DAC (CND2) 20 IU + Ipamorelin (IP-old) 20 IU + GHK-Cu (CU) 20 IU + DSIP (DS5) 8 IU.

### Non training day

**Morning, fasted:** SS-31 (2S10) 5 IU + GHK-Cu (CU) 20 IU + NAD+ (NJ500) 100 IU (2 to 3x per week) + Kisspeptin-10 (KS10) **Wed and Sat only, dose pending** (see Section 5). No MOTS-c, AOD, BB20, CJC, or Ipamorelin in the morning on non training days.

**With breakfast:** 5-Amino-1MQ (50AM) 50 IU.

**Bedtime, one needle:** same as the training day bedtime needle above. CJC + Ipamorelin at bedtime every day, morning only on training days.

### Oral stack — Monday and Friday only

5-HTP 50 mg + L-Tryptophan 1000 mg, evening only, plus B6. Not daily. Pill boxes were pre filled for three weeks from 2026-06-11, so no changes were planned until the week of 2026-07-01, which is now.

### PRN — surface proactively, do not wait to be asked

| Peptide | SKU | Dose | Trigger |
|---|---|---|---|
| Oxytocin Acetate | OT2 | 10 IU SubQ | Scheduled Thu and Fri evening, not only PRN. Also surface any time Jason mentions going out or an evening event. |
| Semax | XA10 | 10 IU SubQ injectable | Cognitive demand or focus, any day, last dose by 19:30. Nasal spray is emergency backup only. |
| Glutathione | GTT600 | 50 IU standard, 100 IU heavy night | **SubQ injection only, never oral.** After alcohol, same night or next morning. Jason has the injectable bottle, always use it. |
| Selank | SK10 | pending | Acute anxiety or stress, and the tool for persistent nightmares. |
| NAD+ | NJ500 | 100 IU slow push | **After alcohol, always, next morning fasted.** Alcohol depletes NAD+. Non negotiable. |

---

## 4. Weekly training programme (set 2026-06-15)

Training Monday, Tuesday, Thursday heavy, plus one of Friday or Saturday soft. Rest Wednesday (rest or HIIT) plus one of Friday or Saturday. Modalities across the record include gym strength sessions, HIIT at home, yoga, handstands, Krav Maga, plus cold ocean and sauna work, which Jason flagged on 2026-06-08 as a significant positive factor for sleep and calm.

---

## 5. Open items needing Jason's confirmation (carried from the template's OPEN table)

| Item | Status | Note |
|---|---|---|
| **Kisspeptin-10 dose** | PENDING | Target 200 mcg Wed and Sat. IU conversion still pending the reconstitution math for the KS10 vial. **Do not dose until IU is confirmed.** |
| **Tesamorelin (TSM5)** | URGENT, order status unknown since Jun 18 | $226 Pepguard. Body composition priority. Will replace CJC-1295 at bedtime when it arrives, to cut the water retention. Confirm with Luke and Bex. |
| **Thymosin alpha-1** | URGENT, time critical | Not in the Pepguard catalog, sourced via Luke and Bex separately. Needed before the end of June 2026 quit smoking date. Confirm order status. |
| **ADE+** | PENDING | Unidentified, not in the Pepguard catalog. Needs clarification on what it is. |
| **Testosterone panel** | To be booked | "Later this month" as of mid June. Date still to be confirmed. |
| **Health tracking spreadsheet** | Unclear | Jason referenced one on Jun 18. Confirm it exists and where, or create one. |

---

## 6. Completed courses and permanent exclusions

**Completed:** Thymalin (TY10) 20 IU bedtime and Epitalon (ET50) 10 IU bedtime both ran Jun 8 to 17, 2026 (10 days) and are complete, removed from the bedtime stack. **Next Epitalon is roughly 2026-07-28** (six week cycle, now approaching). Next Thymalin is roughly December 2026 (six month cycle).

**Discontinued, never re surface:** Retatrutide (RT5), decided 2026-06-07, final and permanent. Reason: it conflicts with the build muscle and lose fat goal, since a GLP-1 / GIP / glucagon agonist suppresses appetite and reduces anabolic stimulus.

---

## 7. Locked protocol insights (the reasoning behind the current stack)

These were worked through on 2026-06-14 and are the "why," so a fresh account does not relitigate them.

1. **Repair fatigue is normal on a course.** With Thymalin, Epitalon, SS-31, MOTS-c, BPC-157 + TB-500, and GHK-Cu running at once, the body runs several repair programmes in parallel. Fatigue is energy routed to internal work, resolving as courses complete. Resting on those days accelerates repair.
2. **Water retention masks fat loss on the scale.** CJC-1295 no DAC plus Ipamorelin morning and bedtime on training days raises GH output, which drives renal sodium retention and fluid accumulation. The scale is unreliable on a GH protocol. Track with waist, hip, and arm measurements plus photos. Expected to ease once Tesamorelin replaces the pure GH secretagogue at bedtime.
3. **Appetite signals are unreliable on this stack.** MOTS-c, the CJC plus Ipamorelin combination, AOD-9604, and Semax all blunt hunger. Rule: eat on a clock every 3 to 4 hours, hit protein targets independently of appetite. The 5-Amino-1MQ meal window is a built in forcing function.
4. **Nightmares are a stress processing signal.** DSIP in the bedtime needle addresses sleep architecture. If nightmares persist, Selank (SK10) in the evening is the PRN tool, pairs with the bedtime needle without issue.
5. **Training day double CJC plus Ipamorelin is deliberate.** Morning primes GH for the session and starts the IGF-1 cascade, bedtime drives the overnight pulse for repair. The anabolic upside outweighs the water retention trade off given the muscle building goal.

Each of these is backed by a citation in `LONGEVITY_CITATIONS_2026-06-11.md` (CJC bedtime protocol, GH secretagogue cycling, SS-31 human trial, FOXO4-DRI senolytic status, BPC-157 + TB-500 dosing, Kisspeptin-10, MOTS-c, Tesamorelin vs CJC, Thymosin alpha-1, and the GLP-1 quit smoking background).

---

## 8. The quit smoking window (time critical context)

Quit date is the end of June 2026, so this window is closing or just closed as of this compile date. Thymosin alpha-1 was specifically sourced to support the respiratory and immune side of the quit window and had to arrive before the quit date, which is why its order status in Section 5 is urgent. If the quit has happened, expect a post quit inflammatory window, during which FOXO4-DRI must not be run (Section 9).

---

## 9. Longevity research flags in the queue

- **FOXO4-DRI senolytic (F410):** the strongest peptide based senolytic reviewed, mouse data only. Locked at a maximum of 1 to 2 times per year, 200 mcg per day for 5 days per cycle. **Do not run during Thymalin or Thymosin alpha-1 cycles, active infections, or the post quit inflammatory window.** Flagged for the next protocol review, check Pepguard for a SKU.
- **Innovation hub and regulatory sandbox in Portugal** for longevity and psychedelic research, and the Longevity Med Summit Lisbon (dates, speakers, attend or send a rep) both sit on the business side in ACTIVE.md but touch the personal longevity thread.

---

## 10. FDA regulatory watch (affects five stack peptides, action by 2026-07-24)

The US FDA removed Epitalon (ET50), DSIP (DS5), Semax (XA10), BPC-157 + TB-500 (BB20), and GHK-Cu (CU) from Category 2 bulk substances, effective 2026-04-22. The Pharmacy Compounding Advisory Committee review on 2026-07-23 and 24 will determine whether US compounding becomes legal. **Current Pepguard international supply is unaffected.** Monitor the outcome after 2026-07-24. Sources on file: The Peptide Catalog article and the FDA PCAC meeting notice.

---

## 11. Flags worth surfacing on their own

1. **Public GitHub exposure — acknowledged and accepted.** The health source files (`DAILY_LOG.md`, `STACK_TEMPLATE.md`, `_state.md`, `LONGEVITY_CITATIONS_2026-06-11.md`) and this document are committed to the public `12-butterflies/one2b-agents` repo, so Jason's peptide protocol with doses, DOB, weight, and quit smoking context is publicly visible. This is a deliberate choice: Jason reviewed the exposure on 2026-07-01 and waived the `SAVE_PROTOCOL.md` line 120 health boundary for this content. Recorded here so the decision is on file rather than an accident. The phone number and address files remain off GitHub.
2. **The log is stale on daily detail.** A gap marker entry was added 2026-07-01, but the last full daily entry is 2026-06-18. `_state.md`'s own rule says to refresh after a gap of more than 7 days, so a fresh account should treat the stack state as needing reconfirmation with Jason before answering any dose question, rather than reading Jun 18 as current.
3. **Time sensitive items to chase (parked for later per Jason, 2026-07-01):** the Tesamorelin and Thymosin alpha-1 order status, the end of June quit smoking date outcome, the Kisspeptin-10 IU conversion still blocking dosing, the testosterone panel booking, the oral pill box refill due the week of 2026-07-01, and the next Epitalon course due around 2026-07-28.
4. **Two "pending" identity gaps in the template:** the Kisspeptin-10 IU dose and the unidentified "ADE+" both need Jason's input before they are actionable.

---

## 12. How the Jason Health Curator agent uses all this

The agent (`skills/jason-health-curator/SKILL.md`, v1.1) reads STACK_TEMPLATE, DAILY_LOG, and _state on every invocation, never generates a stack from memory, and fires automatically on any mention of peptides, training, sleep, food, alcohol, mood, sickness, or smoking. Its non negotiable write discipline: any turn that recommends starting, adding, changing, or stopping a peptide must write to `DAILY_LOG.md` (and STACK_TEMPLATE if the template changes) in the same turn, before the response ends. This exists because past sessions recommended courses and failed to log them, so the next session read a stale log and reported the wrong stack. A Stop hook (`health-write-verify.sh`) enforces it mechanically, but the agent enforces it first. Update authority on the template and state files is Jason direct only.

---

*End of Doc 3 of 4. Committed to GitHub per Jason's 2026-07-01 waiver of the health boundary rule. Next: Doc 4 (people and relationships context).*
