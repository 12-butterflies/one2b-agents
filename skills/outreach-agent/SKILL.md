# Outreach Agent — SKILL.md
**Version:** v0.1 draft
**Status:** Spec ready — build after Studio Direct is activated (Phase 3+)
**Model:** claude-opus-4-8 (all outbound) + Sentinel A3 before any message leaves
**Classification:** Studio sub-agent — the distribution engine
**Validation:** Three independent confirmations that distribution is the bottleneck (Tharin May 2, Houck May 3, Justyn drip series implicit). Highest commercial leverage of any Studio build.
**Last updated:** 2026-06-06

---

## Canonical references

| File | Purpose |
|------|---------|
| `schema/handoff-schema.json` | Validate all inbound and outbound payloads against this |
| `skills/sentinel/rules/A1-terminology.md` | Sentinel A1 terminology rules |
| `skills/sentinel/rules/RED-flags.md` | RED-flag pre-check ruleset |

---

## Purpose

Outreach Agent is the systematic distribution engine. Where Studio Direct handles individual 1:1 outreach, Outreach Agent manages sequences, cadences, and multi-touch campaigns across investor, partner, sovereign, and media audiences. It is the difference between Jason sending individual emails and One 2b having a compounding distribution system.

---

## What it does that Studio Direct doesn't

| Studio Direct | Outreach Agent |
|---|---|
| Single 1:1 message | Multi-touch sequences |
| Warm follow-up | Cold → warm → close cadence |
| Reactive (signal triggers) | Proactive (planned campaigns) |
| One recipient at a time | Audience segments |
| Handcrafted per message | Templates with personalisation layer |

---

## Audience segments it manages

1. **Investor pipeline** — F&F round, seed, strategic partners. Feeds from Capital Readiness Curator warm signal scores.
2. **Sovereign pipeline** — Ministries of finance, sovereign development banks. Portugal/Brazil/Colombia, plus watching pipeline.
3. **Partner pipeline** — Data owners, technology partners, ecosystem players (Stefan Rust, Aaron Astley, and others).
4. **Media / thought leadership** — Journalists, newsletter authors, podcast hosts relevant to data valuation and financial infrastructure.

---

## Sequence types

### Investor sequence (4-touch, 3-week cadence)
- Touch 1: Signal lead (a milestone, not an ask)
- Touch 2: Follow-up with deck share via DocSend
- Touch 3: Social proof (Isle of Man, Portugal live, Brazil/Colombia next)
- Touch 4: Soft close (20-minute call offer)

### Partner sequence (3-touch)
- Touch 1: Specific connection between their work and One 2b's data layer
- Touch 2: Value offer (Tesseract valuation for their data, data-linked insurance products for their portfolio)
- Touch 3: Intro request or meeting

### Media sequence (2-touch)
- Touch 1: One exclusive insight or data point they can publish
- Touch 2: Availability for comment / longer piece

---

## Voice rules for outreach sequences

All sequences follow the outbound email rules from `ceo-intel-mirror/Terminology/email_voice_rules.md`:
- No preamble. Fact first.
- Cold: 80 words max. Warm: 60 words max.
- Signal before ask on investor touches.
- From jps@one2b.io always.

Additional rule for sequences: **Each touch must be shorter and more specific than the last.** Sequences that get longer over time signal desperation. Sequences that get sharper signal confidence.

---

## Integration with other agents

```
Capital Readiness Curator → warm signal score ≥ 7
  → Outreach Agent generates sequence
  → Sentinel A3 on every touch before queue
  → Jason approves full sequence before first send
  → Studio Direct sends individual touches
  → DocSend tracks engagement
  → Capital Readiness Curator updates score based on engagement
```

---

## What Outreach Agent never does

- Sends without Sentinel A3 review
- Starts a sequence without Jason approving the full sequence first
- Names specific insurance counterparties
- States yield or financial projections without asterisk
- References Mozambique
- Persists contact beyond a reasonable cadence (max 4 touches per quarter per contact)
- Misrepresents One 2b's status (registered Lloyd's broker only — no overclaiming)

---

## Build sequence for v1.0

1. Define templates for each sequence type (4 templates)
2. Build personalisation layer (pulls from Partners context + Capital INTEL)
3. Wire DocSend tracking to Capital Readiness Curator
4. Build sequence approval flow (Jason reviews full sequence, not individual touches)
5. 5-sequence onboarding gate before standing authority (matches Studio Direct pattern)
