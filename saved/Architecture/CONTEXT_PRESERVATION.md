# CONTEXT PRESERVATION

**Version:** v1.0 | **Date:** 2026-07-01
The hard rule for the consolidation: no pinned chat is unpinned or archived until its durable context is harvested into a file. Collapsing chats must never lose memory. This file is the safeguard and the checklist.

---

## The rule

**Harvest before unpin.** For every old chat being absorbed, read its transcript, extract the durable context (decisions made, current state, open threads, commitments, named people and numbers), and append it to the target chat's context file below. Only then unpin the old chat. A chat with unharvested context stays pinned.

---

## Durable context file per chat

Each of the 8 chats boots from a standing context file. This is the memory that survives independent of any chat's scroll length.

| Chat | Durable context file | Status |
|---|---|---|
| CEO INTEL | `saved/Strategy/Q2_2026_THESIS.md` + `saved/Todos/ACTIVE.md` | exists |
| JASON OS | `saved/Health/` + Drive Peptide Card | exists |
| CORPORATE STRATEGY | `saved/Strategy/Q2_2026_THESIS.md` + `saved/Strategy/DECISIONS.md` | exists |
| CAPITAL | `saved/Capital/PIPELINE.md` | exists |
| REVENUE | `saved/Projects/SALES_PIPELINE.md` | exists |
| STUDIO | `saved/Strategy/STUDIO_CONTEXT.md` | to create on first harvest |
| DOCUMENT CREATOR | `saved/Documents/` templates + log | exists |
| BUILD | `saved/Architecture/` + `~/one2b-agents/schema/` | exists |

Where a target file does not exist yet, the first harvest creates it.

---

## Harvest order (safe sequence)

**Phase 1, zero risk, delete first.** The 4 duplicate CEO INTEL chats plus "One 2b operating context". These are dupes of the same router, so harvest is a quick scan for any unique decision, then unpin.

- CEO INTEL boot, CEO Intel, CEO INTEL - 4.8, CEO INTEL - 4.7, One 2b operating context  → into CEO INTEL context, then unpin.

**Phase 2, merged chats.** Harvest each absorbed chat into its target file, then unpin.

- JASON HEALTH & LONGEVITY RESEARCH, Health & longevity research agent  → JASON OS
- BUSINESS STRATEGY, 12 VERTICALS, PORTUGAL INNOVATION HUB, SINGAPORE TAX & TECH  → CORPORATE STRATEGY
- INVESTORS, ADVISORS & PARTNERS  → CAPITAL
- SALES FUNNEL, DATA SALES DESK, ONBOARDING  → REVENUE
- STUDIO - WRITER, DESIGN, MOTION, SOCIAL, STRATEGY, DIRECT  → STUDIO (creates STUDIO_CONTEXT.md)
- AGENT ARCHITECTURE, WEBSITE REDESIGN, AI - CDO  → BUILD

**Phase 3, parked.** KALEIDOSCOPE. Do not unpin until Jason defines it and it is harvested.

---

## Who runs the harvest

Claude, using the session transcript reader, one absorbed chat at a time, just before Jason unpins it. Not all at once, to keep token burn low. Each harvest ends with a commit and push so the memory is on GitHub before the source chat is removed.

---

*Nothing built and nothing decided is lost. The interface shrinks, the memory is preserved in files, and the files are the single source the 8 chats boot from.*
