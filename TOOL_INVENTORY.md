# One 2b — Complete Tool, MCP, Repo & Platform Inventory
**Last updated:** 2026-06-05
**Purpose:** Single source of truth for every tool, connector, plugin, platform, and repo at our disposal. Placement column shows which layer of the architecture each belongs to. Use `/intake` to classify new items.

---

## Placement categories

| # | Category | What belongs here |
|---|---|---|
| **A** | CEO Intel substrate | Voice guides, terminology, methodology, rules |
| **B** | Studio Agent tool/skill | Creative/comms production (social, video, design, copy, docs) |
| **C** | CEO Intelligence swarm | Sentinel, Scout, Curator, Triage, Fleet Router observability |
| **D** | Standalone / offline | Desktop apps, local models, offline-capable tools |
| **E** | Reference / pattern only | No install — read once, extract pattern |
| **F** | Archive / noise | Duplicate, no fit, already covered |

---

## 1. MCPs — connected and live in this Claude Code session

These are available right now. No auth required.

| MCP | Provider ID | Used by | Capabilities |
|---|---|---|---|
| **Google Drive** | mcp__beb837dd | All agents | Read/write Drive files. The CEO Intel substrate lives here. |
| **Gmail — intel@one2b.io** | mcp__ae3f6d15 | Scout, Curator | Intel inbox read, label, search, draft |
| **Gmail — hello@one2b.io** | mcp__gmail-hello-one2b | Studio Direct, Document | Outbound send, draft, search |
| **Gmail — jps@one2b.io** | mcp__gmail-jps-one2b | Jason personal | Personal email |
| **Gmail — jps74** | mcp__gmail-jps74 | Jason personal | Personal email (secondary) |
| **Gmail — admin@one2b.io** | mcp__gmail-admin-one2b | Admin ops | Admin account |
| **Gmail — partners@one2b.io** | mcp__gmail-partners-one2b | Studio Direct | Partner comms |
| **Monday.com** | mcp__29fc21d5 | Curator, Triage, Fleet Router | Full Monday API — boards, items, columns, automations, agents, workflows, docs |
| **Google Calendar** | mcp__7144f303 | CEO Brain | Events, scheduling, calendar management |
| **Fireflies** | mcp__be5d318a | CEO Brain | Meeting transcripts, summaries, soundbites, analytics |
| **Slack** | mcp__b2c6fd0a | Studio Direct | Send messages, schedule messages, update canvases |
| **Claude in Chrome** | mcp__Claude_in_Chrome | All agents | Browser automation — navigate, click, read, screenshot, JS exec, tab management |
| **Control Chrome** | mcp__Control_Chrome | All agents | Chrome tab control, JS exec, page content |
| **Claude Preview** | mcp__Claude_Preview | Studio Design, Studio Social | Preview/test web artifacts before publishing |
| **Apple Notes** | mcp__Read_and_Write_Apple_Notes | Triage | Read/write Jason's Apple Notes (brain dump source) |
| **MCP Registry** | mcp__mcp-registry | Architecture | Search and discover new MCP connectors |
| **CCD Session** | mcp__ccd_session | Architecture | Session management, spawn tasks, schedule wakeups |
| **Scheduled Tasks** | mcp__scheduled-tasks | All agents | Create and manage recurring scheduled tasks |

**Placement: C (swarm) for observability tools, B (Studio) for production tools**

---

## 2. MCPs — installed, pending auth or config

| MCP | Config file | Needs | Used by | Priority |
|---|---|---|---|---|
| **Higgsfield** | mcp/higgsfield.json | OAuth at higgsfield.ai/mcp (~5 min Jason) | Studio Motion, Studio Design | Phase 1 — install first |
| **Perplexity** | mcp/perplexity.json | API key | Scout (competitive watch) | Phase 1 |
| **Bright Data** | mcp/brightdata.json | Already working via CLI — MCP version optional | Scout | Phase 2 |

---

## 3. Platform accounts — authenticated and available

| Platform | Auth status | Used by | Placement |
|---|---|---|---|
| **Adobe Creative Cloud** | Authenticated | Studio Design, Studio Motion | B |
| **ElevenLabs Flows** | Authenticated in CEO Intelligence | Studio Motion (carry across) | B |
| **Postiz** | Installed in Studio Agent | Studio Social | B |
| **Perplexity** | launchd agent running (io.one2b.perplexity-competitive-watch.plist) | Scout | C |
| **Claude.ai / Cowork** | Active — CEO Intelligence + Studio Agent projects | All agents | B + C |
| **Google Cloud Console** | OAuth credentials in .gmail-mcp-intel/gcp-oauth.keys.json | Scout (Gmail IMAP) | C |

---

## 4. Multi-LLM assets — tokens available, strategic use cases

| LLM | Best use in this architecture | Never use for | Cost profile |
|---|---|---|---|
| **Claude Opus 4.8** | CEO Brain, Sentinel A3, Document drafting, investor letters, autobiography | Bulk classification | High |
| **Claude Sonnet 4.6** | Standard generation across all Studio agents, Curator analysis | Legal/external final drafts | Medium |
| **Claude Haiku 4.5** | Fleet Router classification, Scout routing, Sentinel A1 scrub | Any external-facing content | Low |
| **Perplexity** | Real-time web research with citations — competitive landscape, funding news, tool releases. Replaces Bright Data for public web that doesn't need JS rendering | Voice-sensitive writing | Medium |
| **Gemini 2.0 Pro (1M context)** | Large-document parallel analysis — hold Architecture v0.1 + ECOSYSTEM.md + CLAUDE.md simultaneously for line-by-line review | Any Jason/One2b voice output | Medium |
| **GPT-4o / DALL-E** | Image generation when Higgsfield isn't the right tool; Code Interpreter for data/spreadsheet analysis | Voice-sensitive writing | Medium |
| **OpenRouter (Mistral/Llama)** | High-volume classification at scale — R-19 creator-cluster routing, burst-day subject-line processing | Any external-facing content | Very low |
| **LM Studio (local)** | Offline classification and routing only (Llama 3.3 70B) | External-facing content, voice-sensitive writing | Zero (local) |

---

## 5. Phase 1 Studio Agent toolset — locked install order

Install these in sequence. All others wait until 5 production assets ship Sentinel-A3 clean.

| Order | Tool | What it does | Time needed | Status |
|---|---|---|---|---|
| 1 | **Higgsfield MCP** (higgsfield.ai/mcp) | Cinematic AI video/scene composition | ~5 min OAuth (Jason) + ~10 min install | Pending OAuth |
| 2 | **Arcads** (arcads.ai) | AI ad creative generation — pairs with Higgsfield + ElevenLabs | API key (~2 min Jason, ~10 min setup) | Pending |
| 3 | **ElevenLabs Flows** | Voice flow / audio orchestration | Already authenticated — carry across | Ready |
| 4 | **Adobe Creative Cloud** | Express templates, Quick Cut, social variations, batch edit | Already authenticated | Ready |
| 5 | **Anthropic frontend-design SKILL.md** | Brand-consistent UI design skill | Drop into skills folder (~5 min) | Pending |

---

## 6. Phase 2 Studio Agent toolset — held

Graduate only after 5 Phase 1 production assets ship Sentinel-A3 clean.

| Tool | Why held | Trigger to promote |
|---|---|---|
| **OpenArt / Kling 3 Omni** | Cost; Phase 1 lean tier holds | Higgsfield + Arcads prove insufficient |
| **CreateUGC.ai** | UGC-style video Higgsfield can't do | Campaign needs UGC talking-head format |
| **Lightpanda** | LLM-friendly headless browser | Chrome bottleneck on real research task |
| **ai-website-cloner-template** (JCodes) | Specific use case | When competitive site cloning lands |
| **Vibe Marketing GPT list** (mavgpt.ai) | Reference library | When prompt absorption is needed |

---

## 7. Repos — evaluate and absorb

Items from the accumulated queue. Classified by placement.

| Repo | Source | Placement | Action |
|---|---|---|---|
| **Awesome Claude Skills** (GitHub) | Nick Sadler/ThynkIt, Apr 21 | B/C | Scan catalogue — vendor any that overlap Sentinel sub-checkers or Curator rulesets |
| **Anthropic Skills Repo** (official — includes Skill Creator meta-skill) | Same | B/C | Run Skill Creator on next agent spec — accelerates SKILL.md authoring |
| **Claude Cookbooks** (Anthropic official) | Same | E | Reference before building any specialist agent (Tesseract Valuation, IGI, Capital Matching) |
| **Cookiy AI user-research-skill** (cookiy-ai/user-research-skill) | CEO Cockpit May 3 | C | Lift methodology, skip hosted service (breaks multi-model fallback rule). Download ZIP via browser |
| **claude-video-vision** (jordanrendric) | May 4 drop | B | Direct candidate for Studio Motion visual-understanding lane |
| **gstack** (garrytan) | May 4 drop | E | Scaffolding reference only |
| **ai-website-cloner-template** (JCodes) | Studio Agent queue | B | Phase 2 — hold |
| **Free Code Camp — 12hr Claude Code handbook** | Nick Sadler | E | Reference for any engineering work touching Claude Code |

---

## 8. Prompts — queue and status

| Prompt | Source | Placement | Action |
|---|---|---|---|
| **SKILL.md memory-handoff template** (Nick Sadler) | ThynkIt newsletter Apr 21 | A | Reply "skill" to nick@thynkit.io to receive; re-implement as session-handoff SKILL.md for long Cowork sessions |
| **5-Prompt Newsletter Growth Stack** (Nick Sadler) | Same | B | Studio Words / Studio Social — use for investor-update cadence and sovereign-touchpoint newsletters |
| **Marc Tenfold "Cut Claude Code Token Usage 71x"** | May 4 drop | E | Pattern only — Graphify by Safi Shamsi (MIT). Watch for Cowork-native equivalent |
| **Mariah's Brand Refresh AI guide** | Studio Agent queue | A | Pattern for brand kit ingestion — use for 12 Butterflies brand asset drop |
| **Mariah's Managed Agents guides** | Studio Agent queue | C | Reference for agent orchestration patterns |
| **ManyChat drips / Zorcha / Stan.store drips** | Various intel sweeps | E | Pattern absorption only — R-19 auto-file rule applies to all future forwards from these |
| **takiGPT 60-prompt Vault** | CEO Intel MCPS_QUEUE | F | Mostly generic — two snippets already lifted |

---

## 9. Tools and agents in the evaluation queue

| Tool | What it does | Placement | Decision |
|---|---|---|---|
| **Arcads** (arcads.ai) | AI ad creative — talking head, UGC-style, paired with Higgsfield | B | Phase 1 install #2 |
| **MiniMax Agent** (agent.minimax.io) | AI agent platform | C | Evaluate against existing swarm — likely reference only |
| **LTX Studio** (ltx.io/model/ltx-2-3) | Video generation model | B | Phase 2 candidate — evaluate alongside Kling 3 Omni |
| **Unicorn Studio** (unicorn.studio) | Motion design platform | B | Phase 2 — hold |
| **twin.so** | Browser automation / AI agent | C | Evaluate for Curator web-scraping use case vs Bright Data |
| **Utopia Studios** (utopaistudios.com/pai) | AI production platform | B | Reference only for now |
| **air.inc/skills** | AI-assisted creative workflow | B | Evaluate for Studio Design asset management |
| **Aceternity UI** (ui.aceternity.com) | React component library with animations | B | Studio Design / website work |
| **nicksadler.io** | Content + AI methodology stack | E | Subscribe as ongoing intel source — forward with INTEL: AI: tag |
| **Qwen Chat** (chat.qwen.ai) | Alibaba LLM | D | Evaluate for offline/low-cost classification alongside OpenRouter |
| **Stitch** (Google) | Design-to-code | B | Studio Design reference |
| **motionsites.ai** | Animated UI generation | B | Phase 2 Studio Motion |
| **MakeUGC** (Vibe Coding stack) | UGC ad generation | B | Phase 2 — after CreateUGC.ai evaluation |
| **Megaphone Studio** (Houck) | Distribution network + ghostwriting | E | Architectural comp for Outreach Agent — reference only |
| **Pophatch** ($19/mo) | "Second brain" methodology layer | E | Competitive comp — reverse-engineer architecture, don't subscribe yet |

---

## 10. MCP registry — available to install

From the `mcp__mcp-registry` tool connected in this session. High-priority candidates not yet installed:

| MCP | Why it matters | Placement | Priority |
|---|---|---|---|
| **Perplexity MCP** | Real-time web search with citations — replaces Bright Data for public web | C | High — install now |
| **Apollo / ZoomInfo** | Contact enrichment for Studio Direct outreach | B | Medium — Q-7 open question (wait for consolidation decision) |
| **Common Room** | Community intelligence, warm signal detection | C | Medium — same decision |
| **Playwright MCP** | Headless browser alternative to Bright Data for JS-rendered pages | C | Medium |
| **Firecrawl MCP** | Web crawling and scraping | C | Evaluate vs Bright Data |
| **Glif MCP** | AI creative workflow automation | B | Evaluate |
| **DocuSign MCP** | Document signing — Document Agent dependency | B | When beta access confirmed |

---

## 11. Scheduled automation — currently running

| Agent | Schedule | What it does | Status |
|---|---|---|---|
| **io.one2b.intel-sweep** | 06:30 daily (Lisbon) | Runs sweep-and-scrape.sh against pending URL queue | Running — pipeline syntax fixed 2026-06-05 |
| **io.one2b.brief-watchman** | On schedule | Brief watchman automation | Running |
| **io.one2b.drafts-send-watchman** | On trigger | Watches for approved drafts to send | Running |
| **io.one2b.perplexity-competitive-watch** | On schedule | Competitive landscape monitoring via Perplexity | Running |
| **io.one2b.apple-mail-sweep** | On schedule | Apple Mail sweep for intel@one2b.io | Running |
| **io.one2b.gmail-mcp** | Always on | Gmail MCP bridge service | Running |

---

## 12. What we do NOT have yet — gaps to fill

| Gap | Blocks | How to fill |
|---|---|---|
| **Higgsfield MCP** | Studio Motion, Studio Design Phase 1 | Jason OAuth (~5 min) |
| **12 Butterflies brand assets** | 12Butterflies voice guide, Studio Social 12B posts | Jason drops logos/palette (~30 min) |
| **DocuSign MCP** | Document Agent Phase 1 CPA testing | Wait for beta access confirmation |
| **GitHub remote** | Team repo access, PRs, version history | Set up remote origin (Jason creates repo) |
| **Apollo/Common Room decision** | Studio Direct contact enrichment | Q-7 decision needed |
| **Outreach Agent spec** | Distribution bottleneck (externally validated 3×) | After Studio Direct SKILL.md is locked |
| **Jason brand kit** | Studio Design for Jason personal content | Build progressively from voice guide anchors |
| **Tesseract Valuation Agent spec** | Commercial product delivery | Phase 3+ build |

---

*Use `/intake` to classify any new tool, repo, prompt, or platform against this inventory. Update this file when items move from queue to installed, or from installed to active.*
