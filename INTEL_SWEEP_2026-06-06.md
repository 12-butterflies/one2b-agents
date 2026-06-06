# Intel Sweep — 2026-06-06
Classified from intel@one2b.io forwards (90-day lookback) + VC Corner research.

---

## 🔴 URGENT ACTION REQUIRED

### Bright Data API Token — EXPIRED
- **Account:** 12b@12butterflies.life
- **Expired:** 2026-05-07 (30 days ago)
- **Impact:** Scout agent IG scrape pipeline has been broken for a month
- **Fix:** Log into brightdata.com → User settings → renew/generate new token
- **Category:** 3 — CEO Intelligence swarm tool
- **Assign:** Jason (5 min task, needs 12b@12butterflies.life login)

---

## ADOPT NOW — Category 2: Studio Agent Tool/Skill

### Awesome Claude Skills (GitHub)
- Community repo of hundreds of ready-to-use SKILL.md files
- Search: `gh search repos "awesome claude skills"` or find via Anthropic Skills repo
- **Action:** Scan for skills overlapping our agent specs (social, design, motion, words)
- Referenced in Nick Sadler's 2026-04-21 newsletter

### Anthropic Skills Repo + Skill Creator Meta-Skill
- Official Anthropic skills collection
- **Skill Creator** — a meta-skill that builds SKILL.md files from a description
- Nick Sadler link: `email.lc.thynkit.io` (obfuscated) — original source is Anthropic's own repo
- **Action:** Install Skill Creator into `~/one2b-agents/skills/` (drops as a `.md` file, no binary install)
- Category: 2 — Studio Agent tool/skill

### Nick Sadler's Claude Upgrades (from 2026-04-21 newsletter via thynkit.io)
Useful resources listed, for reference:
- FreeCodeCamp 12-hour Claude Code handbook
- Claude Log (curated tutorials)
- Claude Cookbooks (Anthropic official)
- Sabrina Ramonov YouTube — real business applications
- ChatGPT-to-Claude migration workflow (via Cowork)
- **Nick's Airtable** — Jason asked to "download whatever's current"
  - No public Airtable URL in the email. The email has signup/reply prompts only.
  - To get the Airtable: reply to nick@thynkit.io with "skill" to get SKILL.md template, or "export" for ChatGPT migration prompts
  - **Action needed from Jason:** Reply to Nick Sadler to get current Airtable link

---

## FILE + REMIND — Category 5: Reference/Pattern

### Audience Building: "Know What You Own" (Kate Parker, Topline, Apr 28)
- **File for:** Instagram campaign planning
- **Core thesis:** Owned audience (email, community, SMS opt-in) is the only marketing asset that appreciates. Social followers = rented. Three forces converging: AI-mediated discovery, signal loss repricing rented identity, AI collapsing product differentiation windows.
- **One2b relevance:** Our data-linked insurance products are built on consented first-party data — this is directly our competitive moat framing. Kate Parker's "consent and permission layer" language maps cleanly onto our IGI value proposition.
- **Remind:** When Instagram campaign brief is being prepared (Studio Social activation gate)
- **Action:** File excerpt in CEO Intel under `/IDEAS.md` or `/Trinity/One2b/instagram_campaign_brief.md`

---

## RESEARCH + ADOPT — Category 1: CEO Intel Substrate

### The VC Corner (thevccorner.com)
Capital-readiness intel for One 2b. Jason's instruction: "research all links and adopt."
Key items found:

| Item | Relevance | Action |
|------|-----------|--------|
| 144 Family Offices that cut pre-seed checks | Capital pipeline — direct investor list | File in `/CAPITAL_INTEL.md` |
| US VC Database (pre-seed/seed) | Capital pipeline | File in `/CAPITAL_INTEL.md` |
| Ultimate Guide to Finding Investors | Reference | File in `/CAPITAL_INTEL.md` |
| Free AI GTM Kit (Sequoia/a16z playbooks) | Studio Social + go-to-market | File in `IDEAS.md` |
| McKinsey Pyramid Principle wired into Claude | CEO comms + pitch structure | Evaluate for Fleet Router prompt engineering |
| SaaS Metrics Dashboard + Excel | Reference | Archive/noise for One 2b (we are not SaaS) |
| Board Management Guide | Governance | File in `/STRATEGIES.md` |

**Full URL list to fetch and file:** Requires individual page fetches. Recommend spawning Scout sweep against thevccorner.com during next intel run.

---

## ARCHIVE/NOISE — Category 6

- Inner circle SPENN/CRM update (May 28) — internal team comms, not architecture intel
- Pre-Friday Monday reminders — automated, no action
- CEO Daily Briefs (multiple) — consumed in their run dates, no new filings needed

---

## VOICE STACK STATUS

| Component | Status | Notes |
|-----------|--------|-------|
| `say` macOS hook | ✅ WIRED | Fires on Stop event, Samantha voice, 500-char limit, runs async |
| Superwhisper | ⏳ INSTALL | Download superwhisper.app — replaces Wispr Flow for desktop STT |
| ElevenLabs TTS | ⏳ AVAILABLE | Already authenticated, use for content creation readback |
| Open WebUI + Ollama | 📋 WEEK 1 | Full offline voice I/O, local stack |

Hook script: `~/one2b-agents/scripts/say-response.sh`
Settings: `~/one2b-agents/.claude/settings.json` → Stop hook

---

## PENDING JASON ACTIONS (from this sweep)

1. **Renew Bright Data token** — brightdata.com, login as 12b@12butterflies.life — 5 min
2. **Reply to Nick Sadler** — nick@thynkit.io, reply "skill" to get current Airtable
3. **Install Superwhisper** — superwhisper.app — 10 min, replaces Wispr Flow
