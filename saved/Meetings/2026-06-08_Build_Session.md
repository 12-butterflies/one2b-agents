# 2026-06-08 — Build Session
**Format:** Claude Code
**Topic:** Intel alignment system, folder architecture, Co-Work project setup

---

## What was built

### Schema / prompt standards
- `schema/prompt-standards/handoff.md`
- `schema/prompt-standards/terminology.md`
- `schema/prompt-standards/response-format.md`
- `schema/prompt-standards/red-flag-sequence.md`

### Capability matrix
- `schema/capability-matrix.yaml` — all 31 agents + Save Router

### Save system (local + Drive)
- 12-folder structure in `saved/` — People, Companies, Partners, Technology, Projects, Sovereigns, Capital, Todos, Meetings, Strategy, Research, Documents
- Research subdomains: Longevity, DataScience, Mining, Space, RegulatoryPolicy (auto-expands)
- `saved/SAVE_PROTOCOL.md` — routing map with all Drive folder IDs
- `saved/Research/DOMAIN_LOG.md`
- `saved/Technology/_INDEX.md`
- All folders live in Drive: https://drive.google.com/drive/folders/17oDmGickBJvKcgLdv85XlCzu28k2nyZs

### Two Drive systems — never mix
- One 2b Intel (operational): `17oDmGickBJvKcgLdv85XlCzu28k2nyZs`
- Data Room Staging (review queue): `1XyqUtvAHZ66ZT31KsCvRMJ-oGh8FWiC7`

### Save Router agent
- `skills/save-router/SKILL.md` — classifies and dual-saves everything automatically, auto-expands Research subdomains

### Auto-context loading
- `~/.claude/CLAUDE.md` — global, loads in every Claude Code session
- `scripts/session-context.sh` — UserPromptSubmit hook, fires on every prompt
- `COWORK_PROJECT_INSTRUCTIONS.md` — all four Co-Work project setups

### Document agent — Mode B added
- Reformat from Data Room Staging workflow wired into `skills/document/SKILL.md`

## Decisions made
- Operational intel → One 2b Intel Drive folder (separate from data room staging)
- 12 folders (not 10) — added Technology and Research
- Intelligence folder dropped (covered by Research + CEO Daily Brief)
- Projects separate from Companies — one file per engagement
- Partners separate from Companies — capability providers
- Sovereigns separate — distinct arc with long-lived context
- Co-Work: 4 projects total — CEO Intelligence, Studio Agent, One 2b Build (company) + JASON OS (personal)
- One thread per task, archive when done

## Pending from Jason
- Set up 4 Co-Work projects (company account + personal Max plan)
- Delete old SAVE_PROTOCOL.md from Data Room Staging folder
