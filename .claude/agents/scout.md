# Scout — Agent Definition
**Role:** Daily intel ingester — reads intel@one2b.io, routes to Curator
**Model:** Haiku 4.5 (classification only — never generates content)
**Full spec:** `skills/scout/SKILL.md`
**Runs:** Daily via launchd io.one2b.intel-sweep.plist at 06:30 Lisbon

## Invoke (on-demand)
"Scout: process intel@one2b.io for the last [24h / 3 days]."

## Key rules
R-19: ManyChat/Stan.store URLs → auto-file, no per-item read (40% token saving)
R-20: From intel@one2b.io / To intel@one2b.io → elevate to top of Section 14
Subject line is the primary classifier. Body content is secondary refinement.
