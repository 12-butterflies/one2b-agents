# One 2b — Implementation Tracker
**Last updated:** 2026-06-06
**Purpose:** Living list of tools to deploy, trials to run, and migrations to execute. Ordered by ROI. Update status as items complete.

---

## Status key
- `[ ]` Not started
- `[→]` In progress
- `[✓]` Done
- `[~]` Deferred — revisit date noted

---

## TIER 1 — High ROI, low effort (do these first)

### DocuSeal — Replace DocuSign
- **What:** Self-hosted document signing. White-label with One 2b logo, domain, colours.
- **White-label:** Full — own domain (`sign.one2b.io`), own logo on signing pages and email notifications, own brand colours, no DocuSeal branding visible.
- **Deploy:** Single Docker container. `docker run -p 3000:3000 docuseal/docuseal`
- **Time:** 10 min deploy + 15 min to sign a test NDA
- **Cost:** ~$5/month VPS vs $25K+/year DocuSign enterprise
- **Caveats:** No SMS/phone ID verification, no DocuSign legal SLAs. Fine for NDAs/CPAs. Keep a dormant DocuSign account for counterparties who contractually require it.
- **Agent integration:** Document Agent calls DocuSeal REST API to create envelopes, send for signature, check status, download signed PDFs.
- **Status:** `[ ]` — Jason to trial this week

### DocSend — Investor deck tracking (trial)
- **What:** Dropbox-owned document sharing with page-level analytics. Investors open a link, DocSend tracks who viewed it, which pages, how long.
- **Use case:** F&F deck v2 distribution. Know exactly which investor spent 8 minutes on the revenue slide vs skimmed the team slide.
- **NDA wall:** Gate deck behind an NDA click-through before the viewer sees the content.
- **Trial:** Free. docsend.com — no credit card for trial.
- **Time:** 15 min setup, upload deck, share first link.
- **Self-hosted alternative:** None at DocSend's quality. Keep this as cloud SaaS — it's a distribution tool, not a data store.
- **Integration:** DocSend link goes into investor outreach drafted by Studio Direct. Engagement data reviewed by Capital Readiness Curator.
- **Status:** `[ ]` — Jason to set up trial

### Higgsfield MCP — Studio Motion/Design Phase 1
- **What:** First-party MCP from Higgsfield (cinematic AI video). OAuth approval unlocks Studio Motion and Studio Design Phase 1.
- **Time:** ~5 min Jason (OAuth) + ~10 min Claude (install)
- **Status:** `[ ]` — morning reminder 08:00 today

---

## TIER 2 — Medium effort, high payoff (this week / next week)

### GitHub Remote — Repo portability
- **What:** Create private GitHub repo `one2b-agents`, push full commit history. Team members can clone and follow SETUP.md.
- **Time:** 3 min Jason (create repo) + 2 min Claude (set origin, push)
- **Status:** `[ ]` — morning reminder 08:00 today

### 12 Butterflies Brand Assets
- **What:** Drop logos, colour palette, typography into `CEO Intelligence/Architecture/StudioAgent/BRAND_KIT_12butterflies/`
- **Unlocks:** 12B voice guide, brand system, all 12B Studio Social content
- **Time:** ~30 min Jason
- **Status:** `[ ]` — morning reminder 08:00 today

### DocuSeal White-Label Setup
- **What:** After deploying DocuSeal, configure:
  - Custom domain: `sign.one2b.io` (DNS CNAME to your server)
  - Upload One 2b logo (PNG, transparent background)
  - Set brand colour (navy + gold from master deck palette)
  - Set from-name: `One 2b` and from-email: `hello@one2b.io`
  - Create first template: NDA
- **Time:** 30 min after deploy
- **Status:** `[ ]`

### Loom Workspace Setup
- **What:** Create `One 2b Build` Loom workspace with three folders:
  - `CEO Build — Architecture` (architectural decisions, agent build walkthroughs)
  - `Product — Issues & Walkthroughs` (why things break, what needs to change)
  - `Team Updates` (async status updates)
- **First recording:** 5-min `Start Here` overview of what One 2b is building
- **Time:** 15 min setup, 5 min first recording
- **Status:** `[ ]` — Loom/OKR session reminder 09:00 today

### Cal.diy — Replace Calendly
- **What:** MIT-licensed Calendly replacement. Self-hosted. Full parity for investor calls, team scheduling, partner meetings.
- **Deploy:** Docker or Railway (5-click deploy)
- **Domain:** `cal.one2b.io`
- **Time:** 30 min deploy + DNS setup
- **Integration:** Booking webhook → n8n → creates task in Monday (or Plane when migrated)
- **Status:** `[ ]` — this week

### Mattermost — Replace Slack (if/when)
- **What:** Self-hosted Slack replacement. PostgreSQL + Mattermost, 5-min deploy.
- **Note:** Only migrate if Slack costs are meaningful or data sovereignty is the priority. Low urgency.
- **Status:** `[~]` — revisit after Studio fleet Phase 2 activates

---

## TIER 3 — Strategic migrations (next 30–60 days)

### Plane — Potential Monday.com Migration
- **Decision needed:** Stay on Monday (stable automations, familiar) vs migrate to Plane (self-hosted, open-source, API-first).
- **Recommendation:** Stay on Monday now. Revisit in 30 days when Plane's automation layer matures.
- **Review:** plane.so — compare to current Monday workflow. Check: does Plane support the Curator → board filing flow? Does it support the Triage Top 10 view?
- **Pros of staying Monday:** Stable automations, visual builder, Monday MCP already connected and working, non-technical team members comfortable with it.
- **Pros of Plane:** Self-hosted, zero per-seat cost, API-first (better for agent integration), GitHub-style issue tracking.
- **Status:** `[~]` — revisit 2026-07-06. Morning reminder set.

### ComfyUI + FLUX.1 — Self-Hosted Image Generation
- **What:** Local image generation. FLUX.1 Schnell (Apache 2.0) + ComfyUI + comfyui-mcp-server. Studio Design calls it as an MCP tool.
- **Hardware needed:** 16GB+ Mac for FLUX.1 Schnell Q4. 24GB for FLUX.1 Dev.
- **Time:** 1–2 hours (ComfyUI install, model download, comfyui-mcp-server setup)
- **Status:** `[ ]` — after Higgsfield Phase 1 ships 5 assets

### LTX-Video — Local Video Generation
- **What:** Native MLX Mac app for Apple Silicon video generation. Best speed:quality ratio locally.
- **Repo:** github.com/james-see/ltx-video-mac
- **Use:** B-roll, social concepting, iteration. Not production advertising (keep Higgsfield for that).
- **Status:** `[ ]` — after Higgsfield Phase 1 ships 5 assets

### n8n or Windmill — Automation Bus
- **Decision needed:** n8n (feature-rich, can break on complex flows) vs Windmill (more stable, developer-focused, Python/TypeScript scripts).
- **Recommendation:** n8n for simple event-driven flows. Windmill for anything reliability-critical. Can run both.
- **Immediate use:** Cal.diy booking → Monday task creation. DocuSeal signed → notify Jason. Mattermost → Plane task.
- **Status:** `[ ]` — deploy alongside Cal.diy

### Baserow — Replace Airtable (if used)
- **What:** MIT-licensed Airtable replacement. Real-time collaboration, full REST API.
- **Use case:** Structured data — contact lists, content calendars, partner pipeline.
- **Status:** `[~]` — revisit when Airtable usage is confirmed

### AppFlowy — Offline Document Collaboration
- **What:** 60K-star Notion replacement. Offline-capable desktop app. Documents + databases + kanban + AI.
- **Use case:** Internal strategy docs, quarterly reviews, architecture notes that don't need to be in Drive.
- **Status:** `[~]` — low urgency while Drive MCP works well

---

## Specialist Agent Builds (internal — Claude builds, Jason reviews)

### Document Agent (Legal) SKILL.md
- **Status:** `[→]` — building now

### IGI Insurance Agent SKILL.md
- **Status:** `[→]` — building now

### Tesseract Valuation Agent SKILL.md
- **Status:** `[→]` — building now

### Capital Matching / Project Financing Agent SKILL.md
- **Status:** `[→]` — building now

### Outreach Agent v0.1 spec
- **Note:** Externally validated as highest-leverage Studio sub-agent (Tharin May 2, Houck May 3, implicit in Justyn drip series). Build after Studio Direct SKILL.md is locked.
- **Status:** `[ ]` — Phase 3+

---

## Deferred / watching

| Tool | Why deferred | Revisit |
|---|---|---|
| Apollo / Common Room | Q-7 coverage overlap audit pending | When Studio Direct needs enrichment |
| OpenArt / Kling 3 Omni | Phase 2 gate — 5 assets first | After Phase 1 ships |
| CreateUGC.ai | Phase 2 gate | After Phase 1 ships |
| Lightpanda | Only if Chrome posture is bottleneck | When needed |
| Dify | LLM app platform — deploy after local stack is stable | Week 3–4 |
| AnythingLLM | Document RAG — deploy after Dify | Week 4+ |
| DocuSign | Keep dormant for counterparties requiring it | Never primary |
