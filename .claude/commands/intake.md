# /intake — Architecture Intake Prompt
**Purpose:** Classify forwarded emails, repos, prompts, skills, plugins, and tool links into the correct placement in the One 2b architecture. Use this instead of loading ECOSYSTEM.md or CLAUDE.md. It is self-contained.

---

## How to use

Paste this command, then paste the forwarded email(s) or item list below it. The agent returns a placement decision table. No other context needed.

---

## The six placement categories

For each item, assign exactly one:

| # | Category | What belongs here |
|---|---|---|
| 1 | **CEO Intel substrate** | Enriches voice guide, terminology rule, brand system, RED flag list, methodology, or quarterly thesis. Goes into `/ceo-intel-mirror/`. |
| 2 | **Studio Agent tool/skill** | Platform, plugin, MCP, or prompt that serves creative or comms production (social posts, video, design, copy, DMs, documents). Goes into `skills/` or `mcp/`. |
| 3 | **CEO Intelligence swarm tool** | Enhances Sentinel, Scout, Curator, Triage, ceo-daily-brief, or Fleet Router. Observability, classification, intel intake, or pre-flight checking. |
| 4 | **Standalone / offline platform** | Desktop app, local model runner, or offline-capable tool (LM Studio, Jan.ai, Ollama). Note the offline use case it enables. |
| 5 | **Reference / pattern only** | No install required. Read once, extract the pattern, file the insight. Queue for next architectural session. |
| 6 | **Archive / noise** | Duplicate, vendor-specific lock-in with no fit, or already covered by Phase 1 toolset. Discard. |

---

## Phase 1 toolset — already locked (do not re-add these)

Studio Agent: Higgsfield MCP, Arcads, ElevenLabs Flows, Adobe Creative Cloud, Anthropic frontend-design SKILL.md, Claude in Chrome.

CEO Intelligence: Gmail MCP (intel@one2b.io), Google Drive MCP, Perplexity competitive watch, Bright Data scraper, Fireflies MCP, Monday.com MCP.

Multi-LLM: Perplexity (real-time research), Gemini (large-doc analysis), GPT-4o (DALL-E, Code Interpreter), OpenRouter (high-volume classification).

---

## Terminology guard rails

Flag any tool that: requires naming a specific insurer, uses GBP, produces "guaranteed return" language without scrubbing capability, or routes output to a named banned individual.

---

## Output format

Return a table:

| Item | Source | Category # | Category name | Specific placement | Next action |
|---|---|---|---|---|---|

Then: top 1–2 items worth acting on immediately, and why. Nothing else.

---

## What this prompt does NOT need

ECOSYSTEM.md, CLAUDE.md, Architecture v0.1, or any session history. Self-contained by design.
