# One 2b Agent Architecture — Build Handoff (Doc 1 of 4)
**Compiled:** Wednesday, 2026-07-01
**Purpose:** Everything built in the `one2b-agents` repo to date, for Jason's personal Cowork / Claude Code account. Architecture and build only, no capital, health, or people detail (those are Docs 2 to 4).
**Repo:** `~/one2b-agents` on GitHub org `12-butterflies`

---

## 1. The two fleet layers

**Layer A — Studio fleet (production runner).** Six agents, one surface each: Studio Social (post), Studio Direct (send), Studio Words (write), Studio Design (design), Studio Motion (produce), Document (draft). No duplication across surfaces.

**Layer B — CEO Intelligence swarm (observability and curation).** Sentinel (pre-flight checker, jobs A1 to A3), Scout (intake sweep), Curator (domain filer), Triage (daily Top 10), Fleet Router (classification and routing).

Framed externally as "7 named production systems" (F&F deck v2 differentiator).

---

## 2. What is actually built (verified 2026-07-01)

### 2.1 Skills — 33 folders under `skills/`

| Skill | Notes |
|---|---|
| studio-social, studio-direct, studio-words, studio-design, studio-motion | Layer A creative comms |
| document | Templated NDA / CPA / partnership drafting |
| sentinel | Has a `rules/` subfolder — A1 to A3 job logic |
| scout, curator, triage, fleet-router | Layer B core swarm; fleet-router has a `route-tests.md` fixture |
| ceo-daily-brief | 07:05 Lisbon daily synthesis |
| save-router | Has a `people-dedup-protocol.md` — the mid-session auto-save logic |
| capital-readiness-curator, capital-matching-agent, tesseract-valuation-agent, insurance-product-agent, deal-screener | Capital and data valuation tooling |
| legal-agent, outreach-agent, narrative-agent, repo-reader, intel-to-spec-adapter, conversation-curator | Supporting agents |
| bio-linkedin-enrichment, linkedin-automation, instagram-automation, lead-research, recursive-research | Sourcing and enrichment |
| jason-health-curator, longevity-research-curator | Health domain curators (kept separate from business saves, see Section 6) |
| skill-creator, graphify | Meta tooling |

### 2.2 Subagents — `.claude/agents/` (11 defined)

fleet-router, sentinel, scout, curator, triage, studio-social, studio-direct, studio-words, studio-design, studio-motion, document. This matches the SKILL.md set 1:1 for the core fleet.

### 2.3 Slash commands — `.claude/commands/` (5)

`/brief`, `/lock`, `/morning`, `/intake`, `/route`.

### 2.4 Schema layer — `schema/`

`capability-matrix.yaml` (full fleet capability matrix), `handoff-schema.json` (the inter-agent contract), `prompt-standards/` with four locked standards: terminology, writing-style, response-format, red-flag-sequence, handoff.

### 2.5 Infra — MCP, scripts, launchd

- **MCP servers wired:** Xero (5 read-only accounting tools, OAuth live), Fireflies (multi-account), Bright Data, DocuSeal, Google Workspace.
- **Scripts (`scripts/`):** health-check.sh, health-write-verify.sh, health-response-validator.sh, health-git-sync.sh (mechanical enforcement layer for the health rule set), sweep-and-scrape.sh, scrape-helper.js, parallel-search.sh, session-context.sh, plus generation helpers (fal, recraft, ideogram) and two voice scripts (say-response, speak-response).
- **Launchd jobs (4):** `io.one2b.brief-watchman`, `io.one2b.intel-sweep`, `io.one2b.apple-mail-sweep`, `io.one2b.perplexity-competitive-watch`.

---

## 3. Activation status (verified against `STUDIO_AGENT_PHASE_GATES.md`)

| Phase | Agent | Gate | Status |
|---|---|---|---|
| 2 | Studio Social | 10 approved outputs → standing authority | **0/10 — not yet active** |
| 3 | Studio Direct | Pending Social gate | Blocked |
| 4 | Studio Words | — | Blocked |
| 5 | Studio Design | — | Blocked |
| 6 | Studio Motion | — | Blocked |
| 7 | Document | Pending DocuSign MCP beta | Blocked |

Investor-facing and sovereign-facing outputs require Jason approval regardless of gate status, always.

---

## 4. Decisions locked (`saved/Strategy/DECISIONS.md`)

| Date | Decision |
|---|---|
| 2026-05-03 | Operating identity locked as hello@one2b.io for all marketing tooling |
| 2026-06-06 | Fleet locked at 17 agents v1.0; architecture complete, activation sequenced |

---

## 5. Known architecture issues (from `saved/ARCHITECTURE_AUDIT_2026-06-10.md`)

This audit is the most important thing to carry into a fresh account, so the same mistakes are not repeated there.

**Root cause identified:** the same rule lives in 4 to 6 different files (`~/.claude/CLAUDE.md`, `one2b-agents/CLAUDE.md`, the Cowork project CLAUDE.md, memory files, SKILL.md files). When a rule gets corrected in one file, it does not automatically propagate to the others. A session that loads a different file than the one that got the correction will run on stale rules.

**Six rule conflicts found, two rated P0 (health risk):** evening stack timing (a peptide card hardcoded a clock time against three locked "no clock time" sources), Ipamorelin vial SKU (card had the wrong vial code paired with the right dose). Both were fixed in that session.

**Nine gaps found, three rated P0:** the four-pass verification gate, the date-check-before-stack-answer gate, and the R-31 pre-emit checklist were all missing from the global `~/.claude/CLAUDE.md` at the time, meaning a plain Claude Code session had no mechanical trigger for them. These have since been folded into the global file (see current `~/.claude/CLAUDE.md` rules 12b to 12m).

**Structural fix proposed and partly applied:** move every health-critical rule into the one file every session actually loads (`~/.claude/CLAUDE.md`), and treat Cowork substrate files and memory files as supplements, not sources of truth. Scripts `health-write-verify.sh` and `health-response-validator.sh` were built afterward as a mechanical enforcement layer on top of the text rules.

**Takeaway for a fresh personal account:** don't recreate the multi-file drift problem. If rules are ported over, port them into one canonical file and treat everything else as a mirror.

---

## 6. One rule that matters for how you split these documents

From `saved/SAVE_PROTOCOL.md`, line 120: **"Personal health data stays in JASON OS project only, never committed [to GitHub]."** This repo's own save protocol already draws the line you're drawing now. Doc 3 (health) will not be committed to this repo's GitHub history; it will be handed to you as a standalone file and Drive copy only.

---

## 7. Recent build commits (last 20, for continuity)

```
0a791d3 Add Co-Work health session boot prompt v1.0
75d7b53 Update inbox boot prompt — replace DocSend/DocuSeal with Drive Google Doc copy
0952a3e Auto-sync health files — 2026-06-19
85d9265 Add Co-Work inbox review boot prompt v1.0
96fa00f Auto-sync health files — 2026-06-15
3232e13 Add F&F pitch assets, Flicker v4 project, and launch config
13f4b46 Add COWORK_PASTE.md — self-contained rules embed for Co-Work project CLAUDE.md
4c937da SHARED_RULES.md v2.0 — complete rules, all agents fixed
7a2c4b5 Add GitHub raw URLs to all 33 skills + SHARED_RULES.md — fix Co-Work blindness across entire fleet
314d2f5 Fix health curator: GitHub raw URLs as primary source, local as fallback
7db1244 Fix health sync gap — add auto-commit hook, sync correct STACK_TEMPLATE to repo
77b2b44 Session 2026-06-12 — Xero MCP server live, both orgs authenticated
368771d Fix Xero OAuth scopes — new granular scope format for apps post March 2026
288f772 Add Xero MCP server — 5 read-only accounting tools, OAuth 2.0 flow
49a71fe Burn in Monday CRM routing rules — IAP vs Cold Leads, mailbox search mandatory
8599cdd Session 2026-06-12 — Monday sync live, automations wired, doc skill updated
d37f149 Session 2026-06-12 — add urgent items, remove stale contacts
0adaf8d Architecture rebuild: fix 8 critical bugs, create Intel directory, harden anti-drift gates
f75fb23 Fix health drift: inject full STACK_TEMPLATE into context on health keyword detection
e4c4fd6 Wire health-write-verify.sh Stop hook — mechanical enforcement of rule 12k
```

---

## 8. Open architecture next steps (not capital, not health)

- Studio Social onboarding gate: 0/10 posts approved. First real activation blocker.
- Fleet Router: built, not yet the enforced single entry point for every human-originated request.
- Document agent Phase 7: blocked on DocuSign MCP beta access.
- Sentinel Job 7 (Studio Agent brand-consistency review): queued, not yet built.
- Propagation gate for rule corrections (Section 5 above): proposed, not yet mechanically enforced beyond the health-specific scripts.

---

*End of Doc 1 of 4. Next: Doc 2, capital and deal pipeline.*
