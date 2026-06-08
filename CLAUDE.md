# One 2b Agent Architecture — Claude Code Bootstrap Brief

**Owner:** Jason Peter Stevens
**Date compiled:** 2026-06-05 (Lisbon)
**Purpose:** Single self-contained handoff you can paste into Claude Code so a fresh session has the full picture of the One 2b agent architecture, knows where every canonical doc lives in Google Drive, and has a concrete to-do list to act on.
**Operating identity for the build:** hello@one2b.io (locked 2026-05-03)
**No-external-engineer rule:** All runtime, MCP, deployment, and infrastructure work stays in the Jason + Claude scope. No Pam, no James routing for build tasks unless explicitly handed off.

---

## 0. How to use this file

Paste this entire file into a new Claude Code session as the first message, then say: *"Read this, mount the Google Drive MCP, fetch the canonical docs listed in Section 8, then propose the first three concrete actions from Section 9. Wait for my approval before writing any code."*

Every Drive file referenced has both a human-readable URL and a `fileId` so Claude Code can fetch it directly via the Google Drive MCP (or you can open and paste the contents manually).

---

## 1. The fleet we are building

There are **two coexisting agent layers** in the system today. Do not collapse them — they own different surfaces.

### Layer A — The Studio fleet (production runner)

Six agents. No duplication. Each owns one well-defined surface. Lives in the **Studio Agent** Cowork project (sibling to CEO Intelligence). Working folder: `/Users/jasonpeterstevens/Documents/Claude/Projects/Studio Agent/`.

| Agent | Surface owned | Primary verb |
|---|---|---|
| Studio Social | Public broadcast on social platforms (1:many) | Post |
| Studio Direct | Private 1:1 messaging — DMs, cold outreach, warm follow-up, intro requests | Send |
| Studio Words | Long-form prose — blog posts, newsletter articles, autobiography, investor letters, whitepapers, press | Write |
| Studio Motion | Video and motion graphics — long-form, short-form, animation, thumbnails | Produce |
| Studio Design | Static visuals — decks, websites, single images, brand systems, stills | Design |
| Document | Templated commercial and legal drafting — NDAs, CPAs, partnership agreements | Draft |

Rules already locked:
- Stills are inside Design. No separate stills agent.
- Captions live with Social, DMs live with Direct. Studio Words is long-form only.
- Document stays prefix-free because it is operationally distinct.

### Layer B — The CEO Intelligence swarm (observability + curation)

Currently runs in the CEO Intelligence Cowork project. Lives in the Context layer only (continual learning research splits Context / Modules / Weights — we are Context-only through 90-day calibration).

Named systems already running (frame these externally as "7 named production systems" per The AI Corner comp — F&F deck v2 differentiator slide):
- **Sentinel** — pre-flight checker. Jobs A1 (banned-term scrub), A2, A3 (SWARM review), and a queued Job 7 (Studio Agent brand-consistency review).
- **Scout** — sweep / intake agent (intel@one2b.io, Bright Data IG scrape queue).
- **Curator** — domain filer. Routes to `Architecture/INBOX/*_QUEUE.md` and personal-pending bundles.
- **Triage** — daily Top 10 surfacing agent.
- **Document Agent** — templated drafting (NDA / CPA / partnership) — separate project, Phase 1 CPA testing pending DocuSign MCP beta access.
- **Capital Readiness Curator** — investor-pipeline curation.
- **ceo-daily-brief** — daily 07:05 Lisbon briefing run.

---

## 2. CEO Intel is the substrate

Every agent reads from CEO Intel. No agent maintains its own copy of any fact that exists in CEO Intel.

**Drive folder:** `CEO Intelligence/` — fileId `1w9nvR1NKJx4z_b3AhAcbV8Pxu7ivBX28`
URL: https://drive.google.com/drive/folders/1w9nvR1NKJx4z_b3AhAcbV8Pxu7ivBX28

Required substrate manifest (gating precondition before any agent goes live):
- `/Trinity/One2b/voice_guide.md`
- `/Trinity/12Butterflies/voice_guide.md`
- `/Trinity/Jason/voice_guide.md`
- `/Trinity/[identity]/brand_system.md` (per identity)
- `/Trinity/[identity]/audience_profile.md` (per identity)
- `/Terminology/must_use.md` and `/Terminology/must_never_use.md` (standing guard rails — see Section 6)
- `/Financials/base_case_projections.md` (locked $12M / $53M / $156M base case)
- `/Partners/[partner]/context.md`
- `/People/[person]/profile.md`
- `/Sovereigns/[country]/status.md` (Mozambique pilot, Colombia expansion)
- `/Quarterly/Q[N]_thesis.md`
- `/RED_flags/standing_list.md`

If a file in this manifest does not exist, the agent that needs it cannot go live. Activation gating treats substrate completeness as a precondition.

What does NOT live in CEO Intel: per-agent operational state (e.g., Studio Social's post-performance ledger), SKILL.md files (those live in the plugin source repo), and per-task working files (those live in the working folder).

---

## 3. Inter-agent contracts (the handoff payload)

Every cross-agent invocation passes this minimum:

```
{
  trinity_identity: "one2b" | "12butterflies" | "jason",
  request_origin: "human" | "<calling-agent-name>",
  request_intent: <plain-english one-line>,
  context_links: [<paths to CEO Intel files>],
  quarterly_thesis_ladder: <current Q-thesis or "none">,
  red_flag_check_status: "passed" | "pending" | "deferred",
  deadline: <ISO timestamp or "none">,
  caller_state_snapshot: <optional>
}
```

Specific handoffs already specified (full table in the v0.1 architecture doc):
- Studio Social → Studio Design / Studio Motion / Studio Words / Studio Direct
- Studio Direct → Studio Words / Document
- Studio Words → Studio Design
- Studio Motion → Studio Design
- Document → Studio Direct

Handoff contract is enforced at the calling agent. Missing fields surface to the caller for resolution. Every called agent returns either a deliverable or a structured error. No silent failures.

---

## 4. Routing layer

For v1.0 of the fleet, build a thin **Fleet Router** agent (could be called "Studio Director"). It does four things on every human-originated request:

1. Classifies as single-agent / sequential multi-agent / parallel multi-agent.
2. Resolves trinity identity (asks Jason once if unspecified, then propagates).
3. Confirms the work ladders to the current quarterly thesis (or flags drift).
4. Runs the upstream RED-flag check (banned terms, guarantee language, named insurers, etc.) before any agent is invoked.

Alternative: inline routing — first agent invoked classifies and either handles or hands off. Lower overhead, less explicit. Recommendation is option (a) for v1.0.

---

## 5. Activation gating — order to bring agents live

**Phase 1 — Foundation (no agents go live, substrate gets built).**
Build out CEO Intel substrate manifest. Build the Fleet Router. Build the shared learning surface directory at `/CEO Intel/Fleet Learning/weekly/` and `/monthly/`.

**Phase 2 — Studio Social activates first.** Highest leverage, most established prior art (Postiz + voice plugins already installed). Downstream agents stubbed: `{status: "stub", message: "...handoff queued for human"}`. Onboarding gate: 10 posts under Jason approval before standing authority kicks in.

**Phase 3 — Studio Direct.** First real cross-agent dependency (Studio Social high-signal DM handoff).

**Phase 4 — Studio Words.** Unblocks autobiography, investor letters, whitepapers, newsletter articles.

**Phase 5 — Studio Design.** Visual assets in real demand from Social, Words, Motion by now.

**Phase 6 — Studio Motion.** Video is high-value, high-effort. Sequenced after Design so brand language is shared.

**Phase 7 — Document.** Lowest dependency on creative comms. Pending DocuSign MCP beta access for Phase 1 CPA testing.

Across all phases: Fleet Router activates with Phase 2.

---

## 6. Terminology guard rails (Sentinel A1 enforces)

These are the must-never-use and must-use rules already locked. Sentinel A1 scrubs every external-bound output.

**Never use:** RGB, "Repayment Guarantee Bond", "Data Valuation Partners", DVP, ICME, "Collateralization platform", "Hendrick", "Simona Anamaria Marinescu", "Susan Bergin", "Joshua Armah", "Jamie Dixon", "Kyle Turner", "Carl Turner", "Stephan Rust", "Susan Pinedo", named insurance houses (no AIG, Liberty Mutual, Lloyd's syndicates, Allianz, Munich Re, etc.), "partnered with" any specific insurer, British Pounds (£), "Tessaract" (misspelling).

**Always use:** IGI / Insurance Guarantee Instruments, Tesseract, One 2b, One 2b Risk Solutions, "registered Lloyd's of London broker" (our status, fine to state), "major global insurance conglomerates" (when referring to others), Stefan Rust, Aaron Astley, asterisks (*) on all yield/return statements.

**Sovereigns:** Mozambique = PILOT, Colombia = EXPANSION. Never reverse.

**Currency:** USD ($) or EUR (€) only. Never GBP. USD for projections, EUR for billing.

**Punctuation:** Never use hyphens. Always use a comma wherever humanly possible. This applies to all written output across every agent, every surface, every format. No exceptions.

---

## 7. Shared learning surface — how the fleet compounds

Each agent writes its weekly synthesis to `/CEO Intel/Fleet Learning/weekly/2026-W[NN]_<agent>.md`. Monthly synthesis at `/monthly/2026-MM_fleet_synthesis.md` — written by Fleet Router (or by Jason + Claude in early days).

Each weekly file is three sections:
- Top performers (with hypothesis why)
- Underperformers (with hypothesis why)
- One thing other agents in the fleet should know

The "one thing other agents should know" field is the cross-pollination mechanism. Every other agent reads the other five before its next planning cycle.

Monthly synthesis answers: (1) what worked across the fleet, (2) where the fleet under-compounded, (3) what gets ingested into next month's plan.

---

## 8. Canonical Drive sources — fetch these into Claude Code first

These are the source-of-truth files. Mount the Google Drive MCP in Claude Code, then fetch by `fileId`.

### Architecture core

| Doc | fileId | URL |
|---|---|---|
| **One2b Agent Fleet Architecture v0.1** (the foundational doc; awaiting your line-by-line v1.0 review) | `1B9QqvspL9POGprVIl46JXdBdxyL7WOyafO6A_2yCIM4` | https://docs.google.com/document/d/1B9QqvspL9POGprVIl46JXdBdxyL7WOyafO6A_2yCIM4/edit |
| **ECOSYSTEM.md** (May 1, 2026 — most recent) | `1Ri-UJ_aAF6HMDEm9KofcJiUb1WQ1r4FxepGV9dmweyU` | https://docs.google.com/document/d/1Ri-UJ_aAF6HMDEm9KofcJiUb1WQ1r4FxepGV9dmweyU/edit |
| **STUDIO_AGENT_CLAUDE.md** (Studio Agent working memory) | `1hAlI9c-HEZyD7pK7iecWB8rbSHE1vEcEYPBlNbsmh74` | https://docs.google.com/document/d/1hAlI9c-HEZyD7pK7iecWB8rbSHE1vEcEYPBlNbsmh74/edit |
| **STUDIO_AGENT_AGENTS_QUEUE.md** (Phase 1 + Phase 2 fleet tooling shortlist) | `1qt9yn8wAZHtG5KWbVNrgIfnA9GLF1F_9bZw-DnUEBb8` | https://docs.google.com/document/d/1qt9yn8wAZHtG5KWbVNrgIfnA9GLF1F_9bZw-DnUEBb8/edit |

### Daily architecture drops (running research input)

| Drop | fileId | URL |
|---|---|---|
| 2026-04-30 — continual learning, SDFT, swarm pattern | `1qiDQd99Z6b1_w2Dpw6BkA9UCsg0Tk2why-13dJeYnoM` | https://docs.google.com/document/d/1qiDQd99Z6b1_w2Dpw6BkA9UCsg0Tk2why-13dJeYnoM/edit |
| 2026-05-04 — 7 named production systems framing, R-17 sweep failure, R-20 self-routed intel | `1uYIwevsAki4_r0_Eq09iH7H4lSAgUNjHuM87_zuIPYQ` | https://docs.google.com/document/d/1uYIwevsAki4_r0_Eq09iH7H4lSAgUNjHuM87_zuIPYQ/edit |

### Working folder root (CEO Intelligence — substrate + queues)

| Folder | folderId | URL |
|---|---|---|
| CEO Intelligence (root) | `1w9nvR1NKJx4z_b3AhAcbV8Pxu7ivBX28` | https://drive.google.com/drive/folders/1w9nvR1NKJx4z_b3AhAcbV8Pxu7ivBX28 |

Inside this folder (paths referenced across the drops — confirm presence on first Claude Code run):
- `Architecture/INBOX/PROMPTS_QUEUE.md`
- `Architecture/INBOX/REPOS_QUEUE.md`
- `Architecture/INBOX/AGENTS_QUEUE.md`
- `Architecture/INBOX/MCPS_QUEUE.md`
- `Architecture/INBOX/INFRASTRUCTURE_QUEUE.md`
- `Architecture/INBOX/OPEN_QUESTIONS.md`
- `Architecture/StudioAgent/BRAND_KIT_one2b/`
- `Architecture/StudioAgent/BRAND_KIT_12butterflies/` (pending population)
- `Architecture/StudioAgent/BRAND_KIT_jason/`
- `IDEAS.md`
- `STRATEGIES.md`
- `CAPITAL_INTEL.md`
- `DECISIONS.md`
- `METHODOLOGY.md`
- `PENDING_DECISIONS_QUEUE.md` (PD-011 = Studio Social activation)
- `STUDIO_AGENT_PHASE_GATES.md`

### Reference

| Doc | fileId | Notes |
|---|---|---|
| `builder-io-claude-code-tips.md` | `15s89raM-FNA19SoFRI7Pfvn2fWL5pSAs` | Steve Sewell's Claude Code best practices — read before tuning the workbench. |

---

## 9. Master to-do list (consolidated from v0.1 architecture doc + drops)

Tracked here as a single working punch list. Sort and assign in Monday.com once the build kicks off.

### A. Architecture v1.0 lock (do this first — every other build inherits from it)

1. Line-by-line review of **One2b Agent Fleet Architecture v0.1** (fileId `1B9QqvspL9POGprVIl46JXdBdxyL7WOyafO6A_2yCIM4`). Issue v1.0 only when complete. Open questions to resolve (Section 10 of that doc):
   - Confirm the lean fleet at six.
   - Confirm Studio prefix on the five creative-comms agents (and Document stays prefix-free).
   - Fleet Router — build or skip? Recommendation: build.
   - Confirm CEO Intel substrate manifest (12 file types).
   - Confirm activation order (Phases 1–7).
   - Confirm shared learning surface lives in `/CEO Intel/Fleet Learning/`.
   - Confirm onboarding gate at 10 tasks per agent.

### B. CEO Intel substrate completion (Phase 1 prerequisite)

2. Populate `/Trinity/One2b/voice_guide.md`.
3. Populate `/Trinity/12Butterflies/voice_guide.md`.
4. Populate `/Trinity/Jason/voice_guide.md`.
5. Populate `/Trinity/[identity]/brand_system.md` for each of the three identities.
6. Populate `/Trinity/[identity]/audience_profile.md` for each of the three identities.
7. Populate `/Terminology/must_use.md` and `/must_never_use.md` (Section 6 of this brief is the seed).
8. Populate `/Financials/base_case_projections.md` ($12M / $53M / $156M base case).
9. Populate `/RED_flags/standing_list.md`.
10. Populate `/Quarterly/Q2_2026_thesis.md` (current quarter — we are in June 2026).
11. Stand up per-partner `/Partners/[partner]/context.md` for Stefan Rust (Truflation), Aaron Astley (Maya/Aurora), plus the major global insurance conglomerate counterparties (anonymised per terminology rules).
12. Stand up per-sovereign `/Sovereigns/Mozambique/status.md` (PILOT) and `/Colombia/status.md` (EXPANSION) and the other 12 (Sri Lanka, Tanzania, Gabon, AfDB, Pakistan, Kazakhstan, Oman, etc.).

### C. Fleet Router build

13. Decide build vs skip (recommended: build).
14. If build: write Fleet Router SKILL.md.
15. Define the four-step entry function (classify, resolve trinity, confirm thesis ladder, run RED-flag pre-check).
16. Wire it as the single entry point for human-originated requests.

### D. Studio Social — Phase 2 first activation

17. Resume line-by-line review of Studio Social SKILL.md Sections 4–17.
18. Update Section 6 (Lifecycle) to use the standard handoff payload from Architecture v1.0 Section 3.
19. Update Section 10 (Tool and agent integrations) to reference the architecture doc plus per-tool specifics.
20. Update Section 7 (Success metrics framework) to write to the shared learning surface.
21. Lock SKILL.md at v1.0.
22. Run 10-post onboarding gate under Jason approval.
23. Move PD-011 (Studio Social activation) out of PENDING_DECISIONS_QUEUE.md.

### E. Studio Direct → Studio Words → Studio Design → Studio Motion → Document

24. For each agent: lock SKILL.md, populate downstream stubs, run 10-task onboarding gate, activate.
25. Document Agent specifically: pending DocuSign MCP beta access for Phase 1 CPA testing — track this externally.

### F. Sentinel calibration (90-day plan)

26. Restructure the 90-day calibration plan around **Self-Distillation Fine-Tuning (SDFT, Shenfeld et al., 2026)**. The 27-case fixture becomes a starting point, not the calibration itself. Real calibration = the running log of Sentinel verdicts + Jason corrections.
27. Decide architectural Q-1: **Context-only or graduate to Modules layer at Day 91?** Recommendation: stay Context-only through full 90 days, re-evaluate with clean dataset in hand.
28. Build **Sentinel Job 7** (Studio Agent brand-consistency review — three checks: brand-kit compliance, trinity-scope tag, pre-shipment RED flag).

### G. Curator / Triage / Scout methodology rules to file

29. **R-19** — creator-cluster routing automation (when URL host is `manychat.com/r` or `stan.store`, auto-file as creator-stack drip without per-item read; ~40% token saving on creator-burst days).
30. **R-20** — self-routed intel surface elevation (when From: intel@one2b.io / To: intel@one2b.io, lift to top of Daily Briefing Section 14 ahead of external-source items).
31. **R-21** — skill-fit scan at session opening (proposal in IDEAS.md; needs decision).
32. Adopt user-psychology rule "**surface insights, not callbacks**" — Curator files silently, Triage Top 10 frames as recommendations not callbacks.
33. Subject-line-as-primary-classifier rule (May 3 lock) — confirm it stays the default.
34. Resolve **R-17** sweep failure: patch to `scrape-helper.js` was applied to Documents path but never sync'd to launchd home path. Three-line shell fix is in the 2026-05-04 drop.

### H. Phase 1 Studio Agent tooling (install order from STUDIO_AGENT_AGENTS_QUEUE.md)

35. Higgsfield MCP (higgsfield.ai/mcp) — first-party MCP, ~5 min OAuth + ~10 min install.
36. Arcads (arcads.ai) — API key generation.
37. ElevenLabs Flows — already authenticated in CEO Intelligence, carry across.
38. Adobe Creative Cloud — already authenticated.
39. Anthropic frontend-design SKILL.md — drop into Studio Agent skills folder.

Phase 2 tooling (held until 5 production assets ship Sentinel-A3 clean): OpenArt / Kling 3 Omni, CreateUGC.ai, Lightpanda, ai-website-cloner-template (JCodes), Vibe Marketing GPT list.

### I. Brand kit ingestion

40. Populate `Architecture/StudioAgent/BRAND_KIT_one2b/` (master deck palette, typography, IGI language rules, currency rules, asterisks-on-yields rule).
41. Populate `BRAND_KIT_12butterflies/` (Jason needs to drop 30 min of brand assets in — logos, palette, typography).
42. Build out `BRAND_KIT_jason/` progressively (handstands / yoga / Krav Maga energy; conservative-warm aesthetic; European Portuguese accents).

### J. External positioning (F&F deck v2 differentiator)

43. Reframe the existing CEO Intelligence swarm as **7 named production systems** per The AI Corner comp ("$200–500/month system that replaces 5 hires"). The fleet exists; only the framing is missing.
44. Decide where the external page lives: `one2b.io` marketing site, `partners.one2b.io` investor site, or both? Default proposal: investor site first (F&F deck v2 audience), marketing later post-Outreach Agent v1.0.

### K. Open questions awaiting decision (carry-forward)

- **Q-7** — Vibe Prospecting MCP install vs wait for Apollo + Common Room consolidation. Coverage-overlap audit pending.
- **Q-9** — When the fleet is reframed externally, which surface owns the page (see #44).
- **Q-10** — Skool Chase AI community login (intel@one2b.io) — watch-only or engage and post? Default: watch-only for 4 weeks, then re-evaluate.
- **B1–B9** — nine carry-over Studio Agent / Sentinel Job 7 / Brand Kit / Cowork transcript convention questions filed in `OPEN_QUESTIONS.md`. Resolve next architectural session.

### L. Monday.com ↔ Claude build (separate workstream)

45. Decide which agents need Monday.com integration. Initial candidates: Curator (file new agent-architecture items into a Monday board automatically), Triage (surface Top 10 against a Monday "this week" view), Fleet Router (write decisions to a "Pending Decisions" Monday board mirroring PENDING_DECISIONS_QUEUE.md).
46. Confirm Monday.com MCP install in Claude Code is current (the deferred tool list includes the full Monday MCP — `manage_agent`, `create_board`, `create_item`, etc.).
47. Build a one-way sync first: Drive queues → Monday boards. Bidirectional only after that proves stable.

---

## 10. Cross-references and locks already in place

- Operating identity: hello@one2b.io (locked 2026-05-03 marketing-tooling identity lock in CLAUDE.md).
- Surgical-update-with-approval-gate methodology: CLAUDE.md May 1, 2026.
- Just-the-two-of-us extension to creative work: CLAUDE.md May 1, 2026.
- Trinity scope rule: CLAUDE.md May 1, 2026.
- Subject-line-as-primary-classifier rule: CLAUDE.md May 3, 2026 lock.
- No-external-engineer routing: re-locked 2026-04-30.
- PENDING_DECISIONS_QUEUE.md PD-011: Studio Social activation (decision pending).

---

## 11. Recommended Claude Code repo structure

```
~/one2b-agents/
├── CLAUDE.md                          # Master rules (paste this brief into context, plus terminology guard rails)
├── .claude/
│   ├── settings.json                  # Hooks: Prettier on edit, type-check on edit
│   ├── commands/                      # Custom slash commands
│   │   ├── brief.md                   # /brief — pull latest CEO Intel briefing
│   │   ├── lock.md                    # /lock — lock a doc to v1.0 after review
│   │   └── route.md                   # /route — test Fleet Router classification
│   └── agents/                        # Subagent definitions (one .md per Studio agent + Sentinel etc.)
│       ├── fleet-router.md
│       ├── studio-social.md
│       ├── studio-direct.md
│       ├── studio-words.md
│       ├── studio-motion.md
│       ├── studio-design.md
│       ├── document.md
│       ├── sentinel.md
│       ├── scout.md
│       ├── curator.md
│       └── triage.md
├── skills/                            # SKILL.md folders — same format as Cowork skills
│   ├── studio-social/
│   ├── studio-direct/
│   └── ... (one per agent)
├── mcp/                               # MCP server configs (Monday, Drive, Gmail, Fireflies, Higgsfield, Arcads, ElevenLabs)
├── ceo-intel-mirror/                  # Local mirror of CEO Intelligence Drive folder (read-only)
└── plugins/                           # Bundles for distribution to Cowork (so anything you build here runs in Cowork too)
```

Single source of truth. Reviewable in PRs. Anything built here installs into both Claude Code and Cowork.

---

## 12. First three actions for the Claude Code session

When you paste this in, ask Claude Code to do these in order:

1. **Verify Drive MCP access.** Fetch the v0.1 architecture doc (fileId `1B9QqvspL9POGprVIl46JXdBdxyL7WOyafO6A_2yCIM4`) and confirm read access.
2. **Spin up the repo scaffold** in Section 11. Do not write any agent SKILL.md content yet — just the empty structure and a stub `CLAUDE.md` that ingests this brief.
3. **Pull the substrate manifest gap list.** For each of items B2–B12, check whether the file exists in CEO Intelligence Drive. Return a punch list of what is present vs missing. That gap list becomes the next sprint.

Do not skip ahead to building Fleet Router or Studio Social until B (substrate) is at least 60% complete. The architecture v0.1 explicitly gates agent activation on substrate completeness.

---

*End of brief. This file is the canonical handoff. Update versions when sections change.*
