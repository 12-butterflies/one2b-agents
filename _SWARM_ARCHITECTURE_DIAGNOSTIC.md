# One 2b — Full Architecture Swarm Diagnostic
# Paste this as your first message in a new Claude Code session.
# This is a self-executing directive. Do not ask what Jason needs. Begin immediately.

---

You are Claude Code. The moment you read this, begin the full architecture diagnostic below. Do not greet. Do not ask questions. Execute all steps, report findings.

Working directory: /Users/jasonpeterstevens/one2b-agents

---

## WHAT YOU ARE DOING

You are running a full swarm diagnostic across the entire One 2b agent architecture. You will check every agent, every SKILL.md, every MCP, every platform connection, every rule file, every hook, and every script. You will return a structured report: what is working, what is broken, what is drifting, and a ranked fix list.

This is a READ-ONLY diagnostic pass. Do not change any files. Report only.

---

## DIAGNOSTIC SEQUENCE — execute every step

### STEP 1 — Repo health
- Run: `git status` and `git log --oneline -10`
- Confirm working tree is clean and latest commit is present
- Flag any uncommitted changes

### STEP 2 — Hook health
- Read /Users/jasonpeterstevens/one2b-agents/scripts/session-context.sh
- Read /Users/jasonpeterstevens/one2b-agents/scripts/speak-response.sh
- Read /Users/jasonpeterstevens/one2b-agents/.claude/settings.json
- Confirm hooks are wired: UserPromptSubmit → session-context.sh, Stop → speak-response.sh
- Flag any hook that references a script that does not exist

### STEP 3 — Skills audit
For every directory in /Users/jasonpeterstevens/one2b-agents/skills/:
- Confirm SKILL.md exists
- Extract: version field, status field, locked date
- Check for: missing version, missing status, "pending" or "stub" status, any file referenced inside SKILL.md that does not exist on disk
- Flag every agent where SKILL.md is absent or incomplete

### STEP 4 — MCP audit
- List all directories in /Users/jasonpeterstevens/one2b-agents/mcp/
- For each: confirm package.json exists, confirm index.js exists, confirm the MCP is registered in .claude/settings.json
- Cross-reference against capability-matrix.yaml mcp_registry section
- Flag any MCP present in skills but not in settings.json, and any in settings.json but missing files

### STEP 5 — Sentinel rule files audit
- List all files in /Users/jasonpeterstevens/one2b-agents/skills/sentinel/rules/
- Confirm these exist: A1-terminology.md, RED-flags.md, A2-plan-review.md, A3-full-audit.md
- Flag any missing. Note: A3-brand-consistency.md (Sentinel Job 7) is a known gap.

### STEP 6 — Capability matrix vs skills directory — gap check
- Read /Users/jasonpeterstevens/one2b-agents/schema/capability-matrix.yaml
- For every agent listed in the matrix, confirm its skill directory and SKILL.md exist
- For every skill directory that exists, confirm it is listed in the matrix
- Flag orphaned skills (directory exists, not in matrix) and ghost agents (in matrix, no directory)

### STEP 7 — Scripts audit
- List all files in /Users/jasonpeterstevens/one2b-agents/scripts/
- For each script referenced in capability-matrix.yaml tool_registry or any SKILL.md, confirm the file exists
- Flag every broken script reference

### STEP 8 — Handoff schema integrity
- Read /Users/jasonpeterstevens/one2b-agents/schema/handoff-schema.json
- Check the request_origin enum and route_to enum against the full agent list in capability-matrix.yaml
- Flag any agent that appears in the matrix but is absent from the handoff schema enums

### STEP 9 — CLAUDE.md rule consistency
- Read /Users/jasonpeterstevens/.claude/CLAUDE.md
- Read /Users/jasonpeterstevens/one2b-agents/CLAUDE.md
- Check for: duplicate rule numbers (multiple "12." entries), contradictory sovereign terminology, contradictory product language, any reference to "IGI Insurance" or "Mozambique as pilot" or "Tessaract"
- Flag every inconsistency

### STEP 10 — Memory files audit
- List all files in /Users/jasonpeterstevens/.claude/projects/-Users-jasonpeterstevens-one2b-agents/memory/
- Confirm every file listed in MEMORY.md exists on disk
- Flag any MEMORY.md entry pointing to a file that does not exist

### STEP 11 — Platform connectivity check (what can be confirmed without live auth)
- Check: does /Users/jasonpeterstevens/one2b-agents/mcp/fireflies-multi/package.json exist and is the MCP listed in available deferred tools
- Check: does /Users/jasonpeterstevens/one2b-agents/mcp/google-workspace/package.json exist
- Check: does /Users/jasonpeterstevens/one2b-agents/scripts/parallel-search.sh exist
- Check: does /Users/jasonpeterstevens/one2b-agents/scripts/scrape-helper.js exist
- Check: is the Bright Data token status noted anywhere in the repo (known expired per ACTIVE.md)
- Report status of each — present/absent/known-issue

---

## REPORT FORMAT

Return a structured report with these sections:

### A — Repo and hook health
One line per finding. GREEN (working) / RED (broken) / AMBER (partial).

### B — Skills status table
| Agent | Version | Status | SKILL.md | Gap |
One row per agent. Flag every RED or AMBER.

### C — MCP status table
| MCP | package.json | index.js | In settings.json | In matrix |
One row per MCP.

### D — Sentinel rule files
List present / missing.

### E — Schema gaps
Orphaned skills and ghost agents.

### F — Broken script references
Every script referenced but not found on disk.

### G — CLAUDE.md conflicts
Every rule inconsistency found, with file and line context.

### H — Memory index integrity
Every MEMORY.md entry where the target file does not exist.

### I — Platform connectivity
One line per platform: status and any known issue.

### J — Ranked fix list
P0 (broken, blocks operation) → P1 (gap, degrades operation) → P2 (improvement)
One line per fix. File and line number where applicable.

---

Do not make any changes. Return the report only. Begin now.
