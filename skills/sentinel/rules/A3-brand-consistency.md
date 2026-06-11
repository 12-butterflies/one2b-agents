# Sentinel Job 7 — A3 Brand Consistency Review

**Version:** v0.1
**Status:** active
**Scope:** Fires before any Studio Agent asset leaves the system. Applies to all three trinity identities.
**Model:** claude-opus-4-8 (A3 standard) | claude-fable-5 (sovereign/investor assets)

---

## Three checks — all must pass before shipment

### Check 1 — Brand kit compliance

| Identity | Palette | Typography | Logo usage |
|---|---|---|---|
| one2b | Periwinkle/lavender/peach. Never dark sage. | Per brand kit. | one2b wordmark only — never combined with IGI or insurer logos. |
| 12butterflies | Per BRAND_KIT_12butterflies/ once populated. Flag if kit is empty. | Per brand kit. | 12butterflies mark only. |
| jason | Conservative-warm. European Portuguese aesthetic. Handstands/yoga/Krav Maga energy where applicable. | Per brand kit. | Personal identity — no corporate logos. |

**Fail condition:** Any asset using dark sage palette, wrong typography, or logo combination that violates kit rules.

### Check 2 — Trinity scope tag

Every asset must carry an explicit trinity identity. Verify:
- The asset was originated under the correct trinity identity.
- No cross-contamination (one2b content does not carry jason personal voice, etc.).
- The handoff payload `trinity_identity` field matches the visible brand identity in the asset.

**Fail condition:** Missing trinity tag, or asset voice/brand does not match the declared identity.

### Check 3 — Pre-shipment RED flag pass

Run the full A1 terminology scrub on the asset before it leaves:
- No banned terms (see `skills/sentinel/rules/A1-terminology.md`).
- No named insurers, no GBP, no Mozambique externally, no "IGI Insurance", no "Tessaract" misspelling.
- All projections carry asterisk (*).
- Currency is USD ($) or EUR (€) only.

**Fail condition:** Any RED flag term present in the output asset.

---

## Pass / Fail output format

```
JOB 7 RESULT: PASS | FAIL
Check 1 (brand kit): PASS | FAIL — [note if fail]
Check 2 (trinity scope): PASS | FAIL — [note if fail]
Check 3 (RED flag): PASS | FAIL — [note if fail]
Action required: [none | block shipment | flag to Jason]
```

If any check fails, asset is blocked from shipment and returned to the originating Studio agent with the specific failure noted.

---

*Created 2026-06-11. Sentinel Job 7 as specified in Architecture v0.1 Section 9F.*
