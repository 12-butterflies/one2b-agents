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

---

## UNREVIEWED TOOLS, REPOS & PLATFORMS
**This section is the deep reconnaissance queue. Every item here needs a verdict before adoption or rejection.**

---

### REPOS — Old Cowork REPOS_QUEUE (RepoReader never ran — all unreviewed)

| Repo | Verdict so far | Action needed |
|------|---------------|---------------|
| [github.com/coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) | IMPROVE (43 skills, MIT) | Cherry-pick 5–6 into Studio Social/Outreach library |
| [github.com/cookiy-ai/user-research-skill](https://github.com/cookiy-ai/user-research-skill) | IMPROVE | Lift planner + synthesis method, skip Cookiy backend tether |
| [github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md](https://github.com/anthropics/claude-code/tree/main/plugins/frontend-design) | READ NOW | Direct fit for Studio Design website/UI lane |
| [github.com/beshuaxian/higgsfield-seedance2-jineng](https://github.com/beshuaxian/higgsfield-seedance2-jineng) | READ NOW | Production stack template for Studio Motion (Higgsfield + Seedance 2) |
| [github.com/Soojin-Lee0819/resource](https://github.com/Soojin-Lee0819/resource) | 5-min read | CLAUDE.md template — lift any patterns we don't have |
| [github.com/Anil-matcha/Open-Generative-AI](https://github.com/Anil-matcha/Open-Generative-AI) | Reference | Curated AI tools — quarterly sweep |
| Anthropic Claude Managed Agents data agent cookbook | READ | First-party reference for Tesseract data-pipeline agents. Search Anthropic docs |
| Open-source 8-subagent code cleanup Claude plugin | FIND URL | Instagram comment thread — specific URL not extracted. Find via Bright Data when live |
| [github.com/elder-plinius/G0DM0D3](https://github.com/elder-plinius/G0DM0D3) | AWARENESS ONLY | Security/jailbreak research — relevant to Sentinel Job 6 red-team patterns |
| [github.com/ScrapeGraphAI/Scrapegraph-ai](https://github.com/ScrapeGraphAI/Scrapegraph-ai) | ADOPT when needed | Already referenced in Scout SKILL.md — `pip install scrapegraphai` when needed |
| Anthropic's LLM Architecture Gallery (sebastianraschka.com) | Reference | Vocabulary reference for advisor-facing materials |

---

### NICK SADLER VAULT — 93 entries, partially reviewed
Source: [Airtable vault scraped 2026-05-22](https://drive.google.com/file/d/1yGYi_Z5ya_WarCFjc1nn93C82ae8sdO-/view) (Drive)

Items evaluated today: awesome-claude-skills, Anthropic Skills repo, Skill Creator ✅

**Still unreviewed from the vault:**

| Entry | Name | Action |
|-------|------|--------|
| #60 | Everything Claude Code | [github.com/affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) — read |
| #62 | Ultimate Claude Code Skills Guide | Google Doc — read and extract patterns |
| #72 | Claude Cowork Discovery Prompt | Evaluate for fleet onboarding |
| #73 | Claude Code Book Keeper Creator | Evaluate for financial tracking |
| #79 | Set up Claude Design | [Drive doc](https://docs.google.com/document/d/13-I8NO-N5KAwoX8qrRzHHOkq1imuUJOg3gmxBqaTFww/edit) — Studio Design wiring |
| #80 | Claude Code Setup Guide | Reference |
| #82 | Boris Cherny Claude.MD Workflow | [Dropbox](https://www.dropbox.com/scl/fi/0ld0ck5oufiiqtxa92mj0/Workflow-Orchestration.md) — read for CLAUDE.md patterns |
| #87 | Claude Creative Studio Skills Guide | [Drive doc](https://docs.google.com/document/d/1rRYff5GXWo5i7gv_my18lXXUa3EmJP-vkmEJlQM48ps/edit) — Studio agent wiring |
| #88 | LMM Claude Council | [github.com/aiwithremy/claude-skills-llm-council](https://github.com/aiwithremy/claude-skills-llm-council) — fleet architecture |
| #23 | Ultimate AI Apps and Platform List | [Dropbox PDF](https://www.dropbox.com/scl/fi/9ja7z7w8di66kurenspv7/AI-Apps-and-Platforms-Descriptions-and-Official-Websites.pdf) — sweep for missing tools |
| #56 | OpenClaw Setup | [Drive doc](https://docs.google.com/document/d/1h4sMe2iaXQJ1zTXqbjl-AsJAX4l-Si6lBYlj7USnTZQ/edit) — evaluate |

---

### TOOLS — Confirmed access, not yet wired

| Tool | Access | What's needed |
|------|--------|---------------|
| **Higgsfield MCP** | Not yet installed | [higgsfield.ai/mcp](https://higgsfield.ai/mcp) — ~5 min OAuth + install. Studio Motion's primary video gen tool. |
| **Arcads** | Not yet | API key at [arcads.ai](https://arcads.ai) — AI ad creative, pairs with Higgsfield |
| **Superwhisper** | Not yet | [superwhisper.app](https://superwhisper.app) — desktop STT, replaces Wispr Flow. Complements TTS stack. |
| **MidJourney** | Subscription unconfirmed | Photorealistic gen for Studio Design — confirm if subscribed |
| **SeedDance Pro** | Subscription unconfirmed | ByteDance video gen — confirm if subscribed |
| **ElevenLabs** | Authenticated in Cowork only | API key needed for local/GitHub fleet use. Not yet extracted from Cowork. |

---

### TOOLS — Never evaluated, quick verdicts via Parallel search available

| Tool | Why it matters | Verdict |
|------|---------------|---------|
| [Pophatch](https://pophatch.com) ($19/mo) | "Second brain that compounds" — competitive intel + potential client tool | Evaluate: signup or research |
| [Letta](https://letta.com) | Agent harness with persistent state | Deferred — adopt at Day 91 of Sentinel calibration |
| [mem0.ai](https://mem0.ai) | Pluggable memory API | Deferred — adopt at Day 91, preferred over Letta |
| [Krea.ai](https://krea.ai) | Real-time image gen, free | Signed up today, browser-only, no API |
| [needstoexist.com](https://needstoexist.com/partner/foundingjourney) | 500+ AI startup ideas | 20-min scan, drop unless 3+ match our verticals |

---

### CAPITAL INTEL — VC Corner links (researched, not all evaluated)
From [thevccorner.com](https://www.thevccorner.com) — Jason forwarded June 1 with "research all links and adopt":

| Item | Status |
|------|--------|
| 144 Family Offices cutting pre-seed checks | Filed to CAPITAL_INTEL.md |
| US VC Database (pre-seed/seed) | Filed |
| Ultimate Guide to Finding Investors | Filed |
| Free AI GTM Kit (Sequoia/a16z playbooks) | Not fully read — evaluate for Studio Social GTM |
| McKinsey Pyramid Principle wired into Claude | Not evaluated — evaluate for Fleet Router prompt engineering |
| Board Management Guide | Filed to STRATEGIES.md |

---

### ~70 INSTAGRAM INTEL ITEMS — blocked until Wednesday
The April 30 sweep flagged ~70 Instagram items that need Bright Data scraping. Themes:
- CDO prompts, senior engineer prompts, AI sales funnel patterns
- Video creation tools, brand design guides
- Self-healing agent patterns, token + agent architecture
- 12 Butterflies ecosystem AI items, AI data source companies
- NVIDIA Inception free path

**Unblocks Wednesday** when Bright Data token is renewed. RepoReader + Scout will process on next sweep.

---

### AWESOME-CLAUDE-SKILLS — not fully scanned
[github.com/ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) — 1000+ skills.

Installed today: LinkedIn automation, Instagram automation, Lead Research, Recursive Research.

Not yet reviewed:
- anydesign (Studio Design)
- lean-ctx (context compression — useful for long sessions)
- tapestry (document knowledge network)
- mercury-mcp (coordinated agent messaging)
- great_cto (7 SDLC subagents — fleet architecture reference)
- Twitter Algorithm Optimizer (Studio Social)
- Competitive Ads Extractor (Sentinel competitive watch)

