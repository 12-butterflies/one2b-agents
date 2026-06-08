# Intel → Agent Alignment System — Build Brief
**Project:** One 2b Agent Fleet
**Repo:** github.com/12-butterflies/one2b-agents (local: `~/one2b-agents`)
**Date drafted:** 2026-06-08
**Status:** Architecture approved — ready to build

---

## What this system solves

Jason forwards tools, repos, platforms, and tech advice to intel@one2b.io constantly. The current pipeline (Scout → Curator → queue files) stops at filing. Nothing closes the loop back to the agents. New MCPs, skills, and platforms sit in queue files and never propagate into SKILL.md files. 31 agents, zero systematic alignment.

This system fixes that end-to-end.

---

## Repo context

```
~/one2b-agents/
├── skills/                  # 31 agent SKILL.md files — these are the forms/prompts to keep aligned
│   ├── scout/SKILL.md       # Reads intel@one2b.io, classifies, routes to queues
│   ├── curator/SKILL.md     # Analyzes items, extracts signal, files
│   ├── triage/SKILL.md      # Daily Top 10 surfacing
│   ├── intel-to-spec-adapter/SKILL.md  # Converts intel into spec proposals — UPGRADE TARGET
│   └── ... (27 more agents)
├── schema/
│   ├── handoff-schema.json  # Canonical 17-field inter-agent payload
│   └── [prompt-standards/]  # NEW — build this
├── ceo-intel-mirror/
│   └── Architecture/INBOX/
│       ├── AGENTS_QUEUE.md       # New agent candidates
│       ├── REPOS_QUEUE.md        # New repos to evaluate
│       ├── MCPS_QUEUE.md         # New MCP servers
│       ├── INFRASTRUCTURE_QUEUE.md
│       └── PROMPTS_QUEUE.md
├── scripts/
│   └── health-check.sh      # 12-layer daily health check — add alignment layer here
└── scheduled-tasks/         # Scheduled task definitions
```

### Existing pipeline (what already works)
- **Scout** — reads intel@one2b.io daily at 06:30 Lisbon, classifies by subject line, routes items to INBOX queues
- **Curator** — reads what Scout routed, analyzes substantive items, files by domain
- **Triage** — surfaces Top 10 to Jason daily
- **intel-to-spec-adapter** — exists but passive; needs upgrade to close the loop

### What's missing
- No system to propagate intel queue items → SKILL.md updates
- No shared prompt standards — 31 agents each embed the same rules redundantly
- No capability map — no single view of which agent has which tool
- No drift detection — agents that get manually edited drift from standards silently

---

## Architecture — 4 layers to build

### Layer 1 — Prompt Standards
**Location:** `schema/prompt-standards/`
**What:** 4 canonical instruction files that every SKILL.md references rather than duplicates. Change once → all agents get it.

Files to create (content extracted from existing SKILL.md files — no new writing):

| File | Contents |
|------|----------|
| `handoff.md` | The 17-field handoff payload, enforcement rules |
| `terminology.md` | Must-use / must-never-use word lists |
| `response-format.md` | Link format (always markdown), tone, length, no-preamble rules |
| `red-flag-sequence.md` | A1 → A2 → A3 check order before any external output |

**How agents reference them:** Add a `## Prompt Standards` section to each SKILL.md pointing at these files. The agent reads the canonical file at runtime rather than maintaining a local copy.

---

### Layer 2 — Capability Matrix
**Location:** `schema/capability-matrix.yaml`
**What:** Single YAML mapping every agent to every tool, API, MCP, and platform it has access to.

Structure:
```yaml
agents:
  scout:
    model: claude-haiku-4-5
    tools:
      - parallel-search-api
      - bright-data
      - gmail-intel
    mcps:
      - gmail-intel
    scripts:
      - scripts/parallel-search.sh
      - scripts/scrape-helper.js
  curator:
    model: claude-haiku-4-5 # auto-file | claude-sonnet-4-6 # analysis
    tools:
      - parallel-search-api
    ...
```

**How it's used:**
- When a new tool arrives via intel → diff it against this matrix → see which agents should adopt it
- Alignment checker reads this to verify SKILL.md files match declared capabilities
- intel-to-spec-adapter reads this to know where to route proposals

---

### Layer 3 — Intel → Spec Pipeline (upgrade intel-to-spec-adapter)
**Location:** `skills/intel-to-spec-adapter/SKILL.md` — rewrite to be active, not passive

**Current state:** Passive converter. Items go in, specs come out manually.

**Upgraded behaviour (daily, after Scout + Curator have run):**

1. Read all four INBOX queues: AGENTS_QUEUE, REPOS_QUEUE, MCPS_QUEUE, INFRASTRUCTURE_QUEUE
2. For each unprocessed item:
   - Check capability-matrix.yaml — which agents are adjacent to this tool?
   - Read the relevant SKILL.md files
   - Generate a structured proposal (format below)
3. Append all proposals to `PENDING_SKILL_UPDATES.md`
4. Flag to Triage if >3 proposals in one sweep (surface in daily brief)

**Proposal format:**
```
---
ITEM: [tool/repo/platform name]
SOURCE: [URL or email subject]
DATE: [ISO date]
RECOMMENDED_FOR: [agent-a, agent-b, agent-c]
RATIONALE: [one sentence — why these agents specifically]
PROPOSED_ADDITION:
  agent: studio-social
  section: "## Tool integrations"
  addition: |
    | Higgsfield MCP | Video generation — short-form clips from prompts | higgsfield.ai/mcp |
APPROVAL: [ ] yes  [ ] skip  [ ] hold
---
```

Jason reviews `PENDING_SKILL_UPDATES.md`, marks each item, and the next build pass applies approved changes.

---

### Layer 4 — Alignment Checker
**Location:** Add to `scripts/health-check.sh` + new `scripts/alignment-check.sh`

**Runs:** Weekly, Sunday alongside `fleet-health-audit-weekly`

**What it checks:**
1. Every SKILL.md references all 4 prompt-standards files
2. Every agent in capability-matrix.yaml has a corresponding SKILL.md
3. Every SKILL.md agent has an entry in capability-matrix.yaml
4. No agent SKILL.md duplicates content that now lives in prompt-standards (drift detector)

**Output:** `ALIGNMENT_REPORT_[date].md` in `ceo-intel-mirror/Fleet_Learning/weekly/`

---

## Build order

Do these in sequence — each layer depends on the previous.

### Step 1 — Create `schema/prompt-standards/`
- `handoff.md` — extract from `schema/handoff-schema.json` + SKILL.md references
- `terminology.md` — extract from `skills/sentinel/rules/A1-terminology.md`
- `response-format.md` — extract the common response rules scattered across SKILL.md files
- `red-flag-sequence.md` — extract from `skills/sentinel/rules/`

**Verify:** All 4 files exist and contain no new content — only consolidation of what's already in the repo.

### Step 2 — Build `schema/capability-matrix.yaml`
- Read all 31 SKILL.md files
- For each agent: extract model, tools, MCPs, scripts
- Write the YAML
- **Verify:** Agent count matches `ls skills/ | wc -l`

### Step 3 — Upgrade `skills/intel-to-spec-adapter/SKILL.md`
- Rewrite to active daily runner
- Add queue reader logic
- Add capability-matrix lookup
- Add proposal writer targeting `PENDING_SKILL_UPDATES.md`
- Create `PENDING_SKILL_UPDATES.md` (empty, with format header)

### Step 4 — Add alignment layer to `scripts/health-check.sh`
- New check block: "Layer 13 — Prompt Standards Alignment"
- Calls `scripts/alignment-check.sh` (create this script)
- Fails gracefully — alignment issues are warnings, not hard failures

### Step 5 — Wire intel-to-spec-adapter to the daily schedule
- Add entry to `scheduled-tasks/` so it runs after Curator each day
- Suggested time: 07:30 Lisbon (after Scout 06:30, Curator 07:00, before brief 07:05)

---

## Files to create (net new)

| File | Purpose |
|------|---------|
| `schema/prompt-standards/handoff.md` | Canonical handoff rules |
| `schema/prompt-standards/terminology.md` | Canonical terminology rules |
| `schema/prompt-standards/response-format.md` | Canonical response format rules |
| `schema/prompt-standards/red-flag-sequence.md` | Canonical RED-flag check sequence |
| `schema/capability-matrix.yaml` | Agent → tool capability map |
| `PENDING_SKILL_UPDATES.md` | Proposal inbox for Jason's approval |
| `scripts/alignment-check.sh` | Weekly drift detector |
| `scheduled-tasks/intel-to-spec-daily.md` | Schedule definition |

## Files to modify

| File | Change |
|------|--------|
| `skills/intel-to-spec-adapter/SKILL.md` | Rewrite to active pipeline runner |
| `scripts/health-check.sh` | Add Layer 13 alignment check |

---

## Rules that apply to all code in this repo

- All URLs must be markdown links `[label](url)` — never bare URLs
- Never ask Jason to do something Claude can do — execute autonomously
- Sovereigns: Portugal = flagship (live). Brazil + Colombia = next. Never Mozambique.
- External product language: "data-linked insurance products" (not "IGI Insurance")
- Terminology: must-never-use list in `skills/sentinel/rules/A1-terminology.md`
- Credentials in `.claude/settings.local.json` (gitignored) — never hardcode
- Model defaults: Haiku for classification/routing, Sonnet for analysis/generation

---

## Done when

- [ ] `schema/prompt-standards/` has 4 files
- [ ] `schema/capability-matrix.yaml` covers all 31 agents
- [ ] `PENDING_SKILL_UPDATES.md` exists with correct proposal format
- [ ] `skills/intel-to-spec-adapter/SKILL.md` is rewritten as active pipeline
- [ ] `scripts/alignment-check.sh` runs clean
- [ ] `scripts/health-check.sh` Layer 13 passes
- [ ] Daily schedule wired for intel-to-spec-adapter

*End of build brief.*
