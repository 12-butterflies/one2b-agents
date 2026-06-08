# Session Handoff — 2026-06-06
**Paste this entire file into a new Claude Code session as the first message.**
**Repo:** github.com/12-butterflies/one2b-agents (local: ~/one2b-agents)
**Push token:** [GITHUB_PUSH_TOKEN — get from Jason or ~/.claude/settings.local.json]
**Push command:** `git push "https://x-access-token:TOKEN@github.com/12-butterflies/one2b-agents.git" main`

---

## WHO YOU ARE

You are Claude Code working with Jason Peter Stevens (CEO, One 2b) on the One 2b agent architecture and operational systems. You operate as if you were here for the entire previous session — read this file, check the repo, then continue.

**Operating rules:**
- Never ask Jason to do something you can do yourself
- All URLs must be markdown links — never bare URLs
- Short responses, lead with the answer, no preamble
- Architecture only unless Jason says otherwise
- Sovereigns: Portugal = flagship (live). Brazil + Colombia = next. Never Mozambique.
- External product language: "data-linked insurance products" (never "IGI Insurance")

---

## WHAT WAS BUILT TODAY (2026-06-06)

### Voice stack
- **Stop hook** wired: `~/one2b-agents/scripts/speak-response.sh`
- **Voices locked** (Jason approved, Sonia default):
  - Default: `en-GB-SoniaNeural` +30% speed
  - Morning brief: `en-US-EmmaMultilingualNeural` +25%
  - Alerts: `en-US-BrianNeural` +25%
  - Confirmations: `en-US-JennyNeural` +20%
- **Rejected:** Maisie (too young), Natasha (AU accent)

### Architecture build
- **Fleet Router** — 5/5 tests PASSED, cleared for Phase 2
- **Sentinel** — A1, A2, A3 rule files live. All 8 rule files in `skills/sentinel/rules/`
- **Handoff schema** — canonical JSON Schema, all 17+ agents reference it
- **Studio Social** — v1.0 LOCKED, ready for 10-post onboarding gate
- **All 17 core agents** — v1.0 locked
- **31 skills** in GitHub fleet (8 ported from old Cowork today)
- **Deal Screener** — built today, Insurance & Trade Finance Qualifier

### Image generation stack (all keyed to hello@one2b.io)
All keys stored in `~/one2b-agents/.claude/settings.local.json` (gitignored):
- **Parallel:** `yzi_QMPzk89Lh7H5XRRyHrAaFuwPQmtxql7Fta7p` ✅ live (Scout uses it)
- **Recraft:** `KqpLwrd8m1kzdt1jh4Nc5tXkqS12Muvqkofehv3KMyHVGqAV41xF4IFPW7FSEWIp` ✅ live
- **FAL.ai:** `75d6ff1a-44c5-4e3d-a3b2-9f049065b83f:d301391c4418a2120b76cad9b4c4244e` ✅ stored, needs credits at [fal.ai/dashboard/billing](https://fal.ai/dashboard/billing)
- **Ideogram:** `r-tOMWalKtguA0hxZRv3Sy5epQPc1vgBivXumI3-c-54Vo6tifTsu7fcQwIOIbkHt-MTjI9FArRL9TYVPUHv8A` ✅ stored, needs credits at [ideogram.ai](https://ideogram.ai)
- Scripts: `scripts/recraft-generate.sh`, `scripts/fal-generate.sh`, `scripts/ideogram-generate.sh`, `scripts/parallel-search.sh`

### Daily health check
- **`scripts/health-check.sh`** — 12 layers, fires 06:50 AM Lisbon
- Covers: API keys, scripts, scheduled tasks, CEO Intel substrate, agents, Sentinel rules, schema, voice, GitHub, old Cowork fleet, duplicate tasks, **connect.one2b.io form** (added today)
- Scheduled task: `architecture-health-daily`

### connect.one2b.io emergency fix (done today)
- **Problem:** "Book a 20-minute conversation" button had `href="#"` — breaking on click. File upload field was also causing Worker errors.
- **Fix:** Removed both broken elements from all 13 HTML versions
- **Deployed:** Cloudflare Pages, hello@one2b.io account, project `iap-form`
- **Verified:** HTTP 200 across iPhone Safari, Android Chrome, Desktop Chrome, Desktop Firefox. Form submits clean to Monday.
- **Netlify token** (for `glittery-begonia-1956ce` / `flicker.one2b.io`): `[NETLIFY_TOKEN — get from app.netlify.com → User Settings → Applications]`
- **Website button draft:** `CONNECT_BUTTON_DRAFT.md` — "Join the Network →" for one2b.io

### Cowork bootstrap prompt
Full fleet activation prompt at `COWORK_BOOTSTRAP_PROMPT.md` — paste into any Cowork/Claude session to activate all agents.

---

## FLEET GAP ANALYSIS (filed today)
See `FLEET_GAP_ANALYSIS.md` for full detail. Summary:

**Agents ported from old Cowork today (now in GitHub):**
- conversation-curator, intel-to-spec-adapter, longevity-research-curator
- narrative-agent, legal-agent, jason-health-curator
- bio-linkedin-enrichment, repo-reader

**Still only in old Cowork (needs porting):**
- VideoProductionAgent, PlatformAuditAgent, OnboardingAgent, SingaporeTaxTechAgent

**Old Cowork fleet** (34 tasks, `~/Documents/Claude/Scheduled/`):
- `fleet-health-audit-weekly` — Sunday 10pm, 7 spec-consistency checks. Last ran May 31.
- `scout-daily-intel-ingestion-6am-lisbon`, `conversation-curator-6am-lisbon`, `ceo-daily-brief-7am-lisbon`
- launchd plists: `io.one2b.intel-sweep`, `io.one2b.brief-watchman` (loaded and running)

---

## CREDENTIALS & ACCOUNTS
| Service | Account | Notes |
|---------|---------|-------|
| Cloudflare | hello@one2b.io | All One 2b infrastructure (iap-form, one2b.io domain, Workers) |
| Netlify | hello@one2b.io | `glittery-begonia-1956ce` = flicker.one2b.io |
| Parallel API | hello@one2b.io | Key in settings.local.json |
| Recraft | hello@one2b.io | Key in settings.local.json |
| FAL.ai | hello@one2b.io | Key stored, needs credits |
| Ideogram | hello@one2b.io | Key stored, needs credits |
| GitHub | 12-butterflies org (jaybaby007 personal) | one2b-agents repo |
| Monday.com | 12butterflies.monday.com | IAP board: 18415032975 |
| Fireflies | jps@12butterflies.life | Carl call transcript: 01KTBZQ114HA1WF4J5X3AY7PQ2 |

---

## PENDING — NEEDS JASON

| Item | What | Where |
|------|------|-------|
| **FAL.ai credits** | Top up to activate FLUX Pro | [fal.ai/dashboard/billing](https://fal.ai/dashboard/billing) |
| **Ideogram credits** | Top up for text-in-image | [ideogram.ai](https://ideogram.ai) |
| **Studio Social post 1** | Give a topic → starts 10-post onboarding gate | Tell Claude |
| **Team email list** | Confirm: Carl, Sean, Gemma, Aaron, Justin, James emails | Update scheduled tasks |
| **12 Butterflies brand drop** | Logos, palette, typography | Into `ceo-intel-mirror/Trinity/12Butterflies/` |
| **Perplexity SOVEREIGN Space** | Update sovereign terminology | Paste from `PERPLEXITY_SOVEREIGN_SPACE_UPDATE.md` |
| **one2b.io website button** | Add "Join the Network →" → connect.one2b.io | See `CONNECT_BUTTON_DRAFT.md` |

**Wednesday 9am Lisbon — reminder fires:**
- Bright Data token renewal (expired May 7, blocks ~70 unprocessed Instagram intel items)
- Login at [brightdata.com](https://brightdata.com) as `12b@12butterflies.life`

**Friday June 12 — reminder fires:**
- Team call: EU AI Act (Aug 2 deadline), Datavault AI patent, IVSC 2028 consultation

---

## PENDING — ARCHITECTURE NEXT SESSION

1. **Studio Social 10-post onboarding gate** — needs Jason's first post topic
2. **Studio Direct SKILL.md v1.0** — same treatment as Social ✅ (already done)
3. **R-series rules** (R-17 through R-31+) from old Cowork `STANDING_RULES_CORE.md` — not yet in GitHub Sentinel rules
4. **13 Intel domain files** — `*_INTEL.md` from old Cowork `/Intel/` — not yet in `ceo-intel-mirror/Intel/`
5. **25 scheduled tasks** from old Cowork not yet wired to new fleet
6. **VideoProductionAgent, PlatformAuditAgent** — port from old Cowork
7. **Design palette correction** — 30+ Drive candidates rendered in dark sage (wrong). Correct palette: lavender #EAE4F4 → periwinkle #D2DCEC → peach #F1DDD0

---

## CEO INTEL SUBSTRATE STATUS

Located at `~/one2b-agents/ceo-intel-mirror/`

| File | Status |
|------|--------|
| Trinity/Jason/voice_guide.md | ✅ LOCKED v1.0 |
| Trinity/One2b/voice_guide.md | ✅ |
| Trinity/One2b/brand_system.md | ✅ |
| Trinity/12Butterflies/ | ⏳ Empty — pending brand drop |
| Terminology/must_use.md | ✅ |
| Terminology/must_never_use.md | ✅ |
| RED_flags/standing_list.md | ✅ |
| Quarterly/Q2_2026_thesis.md | ✅ |
| Financials/base_case_projections.md | ✅ (updated today) |
| TECH_HORIZON.md | ✅ (updated today: EU AI Act Aug 2, Datavault patent, IVSC 2028) |

---

## Q2 2026 CONTEXT

- F&F close window active
- **Portugal** — flagship sovereign, live
- **Brazil + Colombia** — next
- **Copernicus** — white label demo pending
- **Film Locker + Dyson** — meeting this week, Mike Mather (Ouijo, NASDAQ) as reference
- **Nancy Gal** — Beijing, Tencent/Alibaba conversations active
- **Carl Weir** — 230 examples, 15 countries, IVSC Level 3 mechanism locked
- **Carl Monday brief** — built today (`CARL_MONDAY_BRIEF_2026-06-09.md`), all 15 claims verified
- **Base case:** $12M* / $53M* / $156M*

---

## MEMORY NOTES (locked)
- Portugal = flagship. Never Mozambique externally.
- Cloudflare = hello@one2b.io (jps@12butterflies.life has account but no projects)
- All URLs must be markdown links [label](url)
- Never ask Jason to do something Claude can do
- Jason wellbeing: Jun 7 beach day (Johnny, Honey, kids) = optimal state reference

---

*End of handoff. Read CLAUDE.md and the repo before doing anything else.*
