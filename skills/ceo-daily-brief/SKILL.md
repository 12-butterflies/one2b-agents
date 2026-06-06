# ceo-daily-brief — SKILL.md
**Version:** v0.1
**Status:** Active — runs daily at 07:05 Lisbon
**Model:** claude-sonnet-4-6 (orchestration and synthesis) | Haiku for section generation | Opus for Recommended For Today when high-stakes decisions surface
**Classification:** Orchestrator — pulls from every swarm agent and surfaces to Jason
**Last updated:** 2026-06-06

---

## Purpose

The ceo-daily-brief is the intelligence layer that sits above the morning brief. Where the morning brief (06:00) tells Jason what to DO today, the daily brief (07:05) tells him what the SYSTEM learned overnight — what was filed, what surfaced, what changed, and what he needs to decide.

The morning brief is a sprint list. The daily brief is the intelligence digest.

---

## What it reads before generating

In this order:

1. `_sweep-staging/[today]/_ready-for-cowork` — confirms Bright Data sweep status (GREEN/RED)
2. `Architecture/INBOX/AGENTS_QUEUE.md` — new tools/agents filed since last brief
3. `Architecture/INBOX/REPOS_QUEUE.md` — new repos filed
4. `Architecture/INBOX/PROMPTS_QUEUE.md` — new prompts filed
5. `Architecture/INBOX/MCPS_QUEUE.md` — new MCPs filed
6. `Architecture/INBOX/INFRASTRUCTURE_QUEUE.md` — R-numbers, rule proposals, infra decisions
7. `Architecture/INBOX/OPEN_QUESTIONS.md` — carry-forward questions
8. `IDEAS.md` — new ideas filed by Curator
9. `STRATEGIES.md` — new strategies filed
10. `Intel/CAPITAL_INTEL.md` — new capital/investor signals (last 24h entries only)
11. `Intel/SOVEREIGN_INTEL.md` — sovereign pipeline signals
12. `Intel/AI_INTEL.md` — architecture-relevant AI research
13. Gmail MCP (`intel@one2b.io`) — R-20 self-routed items elevated first
14. `PENDING_DECISIONS_QUEUE.md` — decisions still awaiting Jason

---

## Output — fourteen sections (omit any section with nothing to report)

```
CEO DAILY BRIEF — [Day], [Date] — [Time] Lisbon

BRIGHT DATA SWEEP: [GREEN — N URLs processed / RED — reason / SKIPPED — no queue]

1. AGENT ARCHITECTURE — paste-ready decisions
   [Items that need to go into the AGENT ARCHITECTURE thread. Each self-contained.]

2. PROMPTS — new items for PROMPTS_QUEUE
   [Prompt | Source | Why now | Action]

3. REPOS — new items for REPOS_QUEUE
   [Repo | Source | Why now | Action]

4. AGENTS / TOOLS — new items for AGENTS_QUEUE
   [Tool | Source | Why now for One 2b | Action]

5. MCPs — new items for MCPS_QUEUE
   [MCP | Status | Why now | Action]

6. IDEAS surfaced
   [Item — domain tag — why it might matter]

7. STRATEGIES surfaced
   [Item — frame — owner]

8. CAPITAL INTEL
   [New signals relevant to capital raise, investors, comparable companies]

9. SOVEREIGN INTEL
   [New signals relevant to Portugal, Brazil, Colombia, Isle of Man, or pipeline]

10. INFRASTRUCTURE QUEUE
    [R-numbers, rule proposals, system decisions needing resolution]

11. PROCESSED — filing summary
    Items into AI_INTEL.md: [n]
    Items into CAPITAL_INTEL.md: [n]
    Items into AGENTS_QUEUE.md: [n]
    Items archived: [n]
    Items in Bright Data queue: [n]

12. FLAGS — items needing Jason's decision
    [Max 3. Each: item — decision needed — time required from Jason]

13. BRIGHT DATA QUEUE — pending scrape
    [URLs awaiting next sweep]

14. RECOMMENDED FOR TODAY
    [3 sequenced actions. Each: action — why now — counterparty time if applicable]
    [R-20 self-routed items (From: intel@one2b.io) appear first in this section]
```

---

## The R-20 rule (self-routed intel)

When From: `intel@one2b.io` / To: `intel@one2b.io` — Jason sent himself a consolidated action list or note. This content goes to the TOP of Section 14 (Recommended For Today) ahead of all external-source items. It is the highest-priority signal in any brief.

---

## Section 14 — the only section that goes to Jason first

All other sections file silently and appear in the brief. Section 14 is what Jason actually acts on today. It must be:
- 3 items maximum
- Each item starts with a verb
- Each item includes counterparty time if another person is involved
- Framed as recommendations, not callbacks ("Based on the Truflation signal, reach out to Stefan" — not "Stefan's email from Tuesday is still unanswered")

---

## Tone rules for the brief

- No "I found" or "I noticed" — just the item and the action
- No section headers for empty sections — omit entirely
- Numbers not prose in the filing summary
- No lead-in sentences ("Today's brief covers...") — start with the content
- The brief is read on a phone. Every line must be scannable at a glance.

---

## Calibration — what good looks like

A good daily brief in early days: 8–10 active sections, 15–25 items total, Section 14 has 3 clear actions with specific counterparty times.

A sign the brief is degrading: Section 14 has vague items ("review strategy"), the filing summary shows 0 items in most categories, or the brief exceeds 2 pages.

If brief quality degrades, Sentinel Mode B surfaces it as a fleet re-engineering item.

---

## Relationship to morning brief

| | Morning Brief (06:00) | ceo-daily-brief (07:05) |
|---|---|---|
| **Length** | 20 lines | Full digest |
| **Focus** | Jason's actions today | System intelligence overnight |
| **Delivery** | Email to jps@one2b.io | Display in session + optionally email |
| **Reads from** | Gmail + Q2 thesis + pending items | All intel files + queues + Scout output |
| **Model** | Sonnet | Sonnet + Haiku per section |

They feed each other: the daily brief's Section 14 informs tomorrow's morning brief Top 3.

---

## What ceo-daily-brief never does

- Auto-merges anything into METHODOLOGY.md or DECISIONS.md
- Makes decisions for Jason
- Skips Section 14 — it is always present
- Runs Sentinel on its own output (Curator ran Sentinel before filing — brief trusts that)
- Includes items that haven't passed Curator's read-only filter
