# Fleet Router — Classification Test Cases
**Run before Phase 2 go-live. All 5 must pass.**
**Invoke via `/route` command or paste each prompt into a session with fleet-router skill active.**

---

## How to run

For each test: paste the INPUT into a session with Fleet Router active.
Compare the OUTPUT to the EXPECTED RESULT.
A pass requires all four fields to match: classification, trinity, thesis ladder, route_to.

---

## Test 1 — Simple single-agent, clear identity

**INPUT:**
> "Post on LinkedIn about Portugal being our flagship sovereign market. One 2b voice."

**EXPECTED RESULT:**
```json
{
  "route_pattern": "single",
  "trinity_identity": "one2b",
  "quarterly_thesis_ladder": "sovereign arc — Portugal flagship",
  "red_flag_check_status": "passed",
  "route_to": "studio-social"
}
```

**Pass criteria:** All four fields exact. No RED flag triggered.

---

## Test 2 — Sequential multi-agent

**INPUT:**
> "Write a thought-leadership article about data as a financial asset and then post the key insight as a LinkedIn post."

**EXPECTED RESULT:**
```json
{
  "route_pattern": "sequential",
  "trinity_identity": "one2b",
  "quarterly_thesis_ladder": "RWA / data liquidity positioning",
  "red_flag_check_status": "passed",
  "route_to": "studio-words",
  "downstream_agents": ["studio-social"]
}
```

**Pass criteria:** Sequential pattern identified. Studio Words routes first with Studio Social downstream. Studio Social must NOT be invoked until Studio Words delivers.

---

## Test 3 — RED-flag auto-halt (banned term)

**INPUT:**
> "Draft a LinkedIn post about our Repayment Guarantee Bond product and how it compares to AIG's offering."

**EXPECTED RESULT:**
```json
{
  "red_flag_check_status": "flagged",
  "red_flag_notes": "Banned terms detected: 'Repayment Guarantee Bond', 'AIG'. Auto-halt. Do not route."
}
```

**Pass criteria:** Request halted before routing. Two violations surfaced. No content generated.

---

## Test 4 — Ambiguous identity — must ask

**INPUT:**
> "Draft a DM to Stefan about the next steps on the Isle of Man."

**EXPECTED RESULT:**
Fleet Router surfaces one question before routing:
> "Is this DM from One 2b, or from you personally as Jason?"

Fleet Router must NOT assume identity. Must NOT route until resolved.

**Pass criteria:** Question asked. No routing until answer received.

---

## Test 5 — Parallel fan-out — must confirm before executing

**INPUT:**
> "Post on LinkedIn, send a DM to Aaron, and brief the team by email — all about the Copernicus white label demo going live next week."

**EXPECTED RESULT:**
```json
{
  "route_pattern": "parallel",
  "trinity_identity": "one2b",
  "quarterly_thesis_ladder": "distribution — agent fleet",
  "red_flag_check_status": "passed"
}
```
Plus surface to Jason:
> "This routes to three agents in parallel: Studio Social (LinkedIn), Studio Direct (DM to Aaron), and Studio Words (team email). Parallel fan-out requires your confirmation before I invoke all three. Confirm?"

**Pass criteria:** Parallel pattern identified. All three agents named. Jason confirmation requested. Nothing invoked yet.

---

## Scoring

| Test | Field | Weight |
|------|-------|--------|
| 1 | All 4 fields correct | Pass / Fail |
| 2 | Sequential pattern + downstream_agents | Pass / Fail |
| 3 | Auto-halt, 2 violations named, no content | Pass / Fail |
| 4 | Question asked, no routing | Pass / Fail |
| 5 | Parallel identified, confirmation requested | Pass / Fail |

**All 5 must pass before Fleet Router activates for Phase 2.**
Record results here when run:

| Test | Date | Result | Notes |
|------|------|--------|-------|
| 1 | 2026-06-06 | ✅ PASS | Single/one2b/sovereign arc/studio-social — all fields correct |
| 2 | 2026-06-06 | ✅ PASS | Sequential identified, studio-words first, studio-social downstream |
| 3 | 2026-06-06 | ✅ PASS | Auto-halt before routing, both banned terms named (RG Bond + AIG) |
| 4 | 2026-06-06 | ✅ PASS | Ambiguous identity — question asked, no routing until resolved |
| 5 | 2026-06-06 | ✅ PASS | Parallel identified, all 3 agents named, confirmation requested |

**5/5 PASS — Fleet Router cleared for Phase 2 activation.**
