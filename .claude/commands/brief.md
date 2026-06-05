# /brief — CEO Intel Daily Brief
**Purpose:** Pull the current state of the CEO Intelligence substrate and surface what's most actionable right now. Self-contained — loads only what it needs.

## How to use
Type `/brief` to get the morning brief. No arguments needed.

## What it returns

1. **Substrate status** — which of the 12 required CEO Intel files are populated vs missing. Any gap is a hallucination surface.

2. **Q2 thesis ladder check** — is the current week's work laddering to the thesis pillars? Any drift flagged.

3. **Pending decisions** — items in PENDING_DECISIONS_QUEUE.md that need Jason's call. Format: decision, default proposal, time required from Jason.

4. **RED flags standing list** — confirm no new items need to be added based on recent session context.

5. **Fleet activation status** — which Studio agents are live vs stubbed vs pending.

6. **Top 3 actions** — what to do today, in order of leverage.

## Context it reads (only these files)

- `/ceo-intel-mirror/Quarterly/Q2_2026_thesis.md`
- `/ceo-intel-mirror/RED_flags/standing_list.md`
- All files in `/ceo-intel-mirror/` — checks existence only for substrate manifest
- `/ceo-intel-mirror/Fleet_Learning/weekly/` — most recent file per agent if it exists

## What this replaces

The daily copy-paste of ECOSYSTEM.md into a new thread. The brief is a 300-word output, not a 5,000-word context load.
