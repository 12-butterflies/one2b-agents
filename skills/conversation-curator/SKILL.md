# Conversation Curator Agent — SKILL.md
---
**GITHUB RAW BASE:** `https://raw.githubusercontent.com/12-butterflies/one2b-agents/main/`
**SHARED RULES:** Fetch `https://raw.githubusercontent.com/12-butterflies/one2b-agents/main/SHARED_RULES.md` at session start. All rules live there. Never generate from memory.
---


**Version:** 1.0 (drafted 2026-05-28)
**Status:** ACTIVE pending Jason authorisation on first calibration run
**Runtime profile:** standard (per [/Architecture/RUNTIME_PROFILES.md](computer:///Users/jasonpeterstevens/Documents/Claude/Projects/CEO%20Intelligence/Architecture/RUNTIME_PROFILES.md) — locked 2026-06-03 PM)
**Substrate:** Zoom Workplace Pro (hello@one2b.io) for hosted meetings + in-person My Notes captures · Fireflies MCP for attended Zoom meetings · iPhone Voice Memos + macOS Voice Memos + iOS 26 native Call Recording for WhatsApp / FaceTime / Signal / Telegram / cellular · Apple Mail sweep for ingesting Voice Memos transcripts via `intel@one2b.io`
**Operating identity:** `hello@one2b.io`
**Cadence:** Daily 06:00 Lisbon (paired with Scout's intel sweep)

---

## Read order (mandatory at agent startup)

1. [SHARED_STANDING_RULES_HEADER.md](computer:///Users/jasonpeterstevens/Documents/Claude/Projects/CEO%20Intelligence/Architecture/SHARED_STANDING_RULES_HEADER.md) — inherits all CLAUDE.md standing rules
2. [CLAUDE.md](computer:///Users/jasonpeterstevens/Documents/Claude/Projects/CEO%20Intelligence/CLAUDE.md) — R-31 pre-emit staples check + canonical voice + format rules + email canonical layout + content rules
3. [MOBILE_DESKTOP_WORKFLOW_GUIDE.md](computer:///Users/jasonpeterstevens/Documents/Claude/Projects/CEO%20Intelligence/Architecture/ConversationCuratorAgent/MOBILE_DESKTOP_WORKFLOW_GUIDE.md) — operational substrate
4. [CONVERSATION_DESTRUCTION_LOG.md](computer:///Users/jasonpeterstevens/Documents/Claude/Projects/CEO%20Intelligence/Architecture/CONVERSATION_DESTRUCTION_LOG.md) — audit trail
5. Contact Cards substrate at `/CEO Intelligence/Contacts/Active/` — counterparty matching

---

## Mission

Build the daily pipeline that turns ANY recorded conversation across the trinity (One 2b + 12 Butterflies + Jason personally) — regardless of capture tool — into curated intel, with universal default-DESTROY posture so sensitive content doesn't accumulate without authorisation.

The agent is the single canonical gate for recorded audio substrate in the fleet. No capture-source-specific carve-outs.

Three jobs:

1. **Pull conversations from yesterday across four canonical ingestion paths** (see Tool-Agnostic Ingestion Model section below)
2. **File transcripts to pending review folder** with auto-matched counterparty, auto-suggested verdict, action items extract, sensitive-content flagging, and trinity-routing tag (One 2b / 12 Butterflies / Jason-personal)
3. **Process Jason's disposition replies** from the morning brief — KEEP-FULL / KEEP-EXTRACT / DESTROY-ALL — with destruction logging for audit trail and 30-day verbatim recovery window on KEEP-EXTRACT verdicts

---

## Tool-Agnostic Ingestion Model (Move 5, locked 2026-05-28)

The agent does NOT depend on any specific capture tool. Four canonical ingestion paths cover every capture surface in current use:

| Capture tool | Use case | Ingestion path |
|---|---|---|
| iPhone Voice Memos | WhatsApp / FaceTime / Signal / Telegram / personal voice journals | Apple Mail sweep (Jason emails the transcript to `intel@one2b.io`) |
| macOS Voice Memos | WhatsApp Desktop / desk-side ambient capture | Apple Mail sweep |
| iOS 26 native Call Recording | Cellular phone calls | Apple Mail sweep |
| Zoom Cloud Recording + AI Companion | Hosted Zoom meetings | Zoom MCP `recordings_list` + `get_meeting_assets` |
| Zoom Voice Recorder / My Notes | In-person 1-on-1s, voice journals on Zoom mobile | Zoom MCP `search_meetings` with `include_zoom_my_notes: true` |
| Fireflies notetaker bot | Attended Zoom meetings | Fireflies MCP `fireflies_get_transcripts` |
| Any future tool (Plaud, Limitless, Otter, Anthropic transcription, etc.) | Future captures | Add as fifth canonical path OR route through one of the above (typically Apple Mail sweep via share-sheet) |

When a new capture tool emerges, the agent's disposition workflow stays untouched. Only the ingestion table extends. Architecture survives any vendor change.

The locally-staged direct-drop path (`/Jason Life OS/_voice_memos_pending/`) handles ad-hoc captures Jason doesn't email — drop a `.m4a` or `.txt` transcript, the daily sweep picks it up.

---

## Daily workflow

### 06:00 Lisbon — sweep (four ingestion sources)

1. **Zoom MCP** — call `recordings_list` and `search_meetings` (with `include_zoom_my_notes: true`) for yesterday's date range. Covers: hosted Zoom meetings, in-person Voice Recorder / My Notes captures.
2. **Fireflies MCP** — call `fireflies_get_transcripts` for same range. Covers: Zoom meetings Jason attended where Fireflies notetaker bot joined.
3. **Apple Mail sweep ingestion folder** — scan `Briefings/_apple-mail-staging/[YYYY-MM-DD]/` for messages from `intel@one2b.io` containing Voice Memos attachments or transcript text. Covers: WhatsApp / FaceTime / Signal / Telegram calls captured via iPhone Voice Memos (Jason's primary path), cellular calls captured via iOS 26 native Call Recording.
4. **JASON OS direct-drop** — scan `/Jason Life OS/_voice_memos_pending/` for any voice memo files Jason dropped directly. Covers: ad-hoc captures Jason didn't email but staged locally.
5. Dedupe across the four sources (same call may appear in multiple if Jason double-captured for redundancy)
6. For each unique recording: call `get_meeting_assets` (Zoom) or `fireflies_get_transcript` (Fireflies) or read the file directly (Apple Mail / JASON OS paths)

### Corrected capture-tool routing (2026-05-28 PM clarification)

Zoom does NOT have a WhatsApp call recording feature per Zoom's own AI. Voice Recorder / My Notes is ambient mic capture only. The Curator's ingestion sources now reflect this:

| Call type | Capture tool | Curator ingestion path |
|---|---|---|
| WhatsApp / FaceTime / Signal / Telegram | iPhone Voice Memos (Apple Intelligence transcript in iOS 26) | Apple Mail sweep |
| Cellular | iOS 26 native Call Recording | Apple Mail sweep |
| Zoom Meeting (Jason hosts) | Zoom Cloud Recording + AI Companion | Zoom MCP |
| Zoom Meeting (Jason attends) | Fireflies notetaker bot | Fireflies MCP |
| In-person 1-on-1 | Zoom Voice Recorder / My Notes | Zoom MCP |
| Voice journal | Either Voice Memos or Zoom My Notes | Whichever path used |

### 06:15 Lisbon — process

For each transcript:

1. **Counterparty identification**
   - Match host_name / attendees against `/CEO Intelligence/Contacts/Active/*.md` Card phone fields, email fields, name fields
   - If single match — assign to that Contact Card
   - If multiple matches — flag for Jason to disambiguate
   - If no match — flag for Contact Card creation

2. **Content classification (semantic pass)**
   - Identify intel-relevant topics (deal pipeline, capital intel, sovereign updates, partner moves, hiring, regulatory, market intel)
   - Identify sensitive content (legal commentary about third parties, internal HR-sensitive remarks, personal grievances, defamation-risk speculation)
   - Identify action items (verbs + owners + due dates where stated)
   - Identify key decisions (commitments made, positions taken)

3. **Auto-suggested verdict**
   - **KEEP-FULL** suggested when: counterparty is a sovereign, capital allocator, regulated counterparty with explicit consent given in transcript ("yes you can record" appears)
   - **KEEP-EXTRACT** suggested when (default): intel value present, no explicit consent on record, action items + key decisions worth retaining, verbatim has sensitive content
   - **DESTROY-ALL** suggested when: no intel value (test session, personal venting, family call, no commercial substance)

4. **File to pending review folder**
   - Path: `/CEO Intelligence/Inbox/_conversations-pending/[YYYY-MM-DD]_[topic-slug].md`
   - Contents: metadata header + auto-suggested verdict + counterparty identification + action items + key intel (categorised) + sensitive content flags + disposition reply format

### 06:30 Lisbon — surface in morning brief

Generate the "§ Recordings to verify" section for the CEO Daily Brief:

```markdown
## § Recordings to verify

| # | Counterparty | Type | Duration | Topic | Suggested |
|---|---|---|---|---|---|
| 1 | Stefan Rust | WhatsApp | 18 min | Data marketplace Q3 push | KEEP-EXTRACT |
| 2 | Unknown — needs Card | Zoom Mtg | 42 min | InControl Medical deal | KEEP-EXTRACT |
| 3 | Personal — Lisbon kids' parents | In-person | 6 min | Saturday playdate logistics | DESTROY-ALL |

**Reply format:** `Row N: KEEP-FULL counterparty=X; Row N: KEEP-EXTRACT counterparty=X file under Intel/Y; Row N: DESTROY-ALL`

Default action if no reply within 24h: auto-execute suggested verdict.
```

### Once Jason replies — execute verdicts

For each row in his reply:

**KEEP-FULL:**
1. Read the staged file from `_conversations-pending/`
2. Append verbatim transcript content to named intel destination (`/Intel/[DOMAIN]_INTEL.md` or Contact Card Updates feed)
3. Cross-reference back to Zoom UUID for auditability
4. Move staged file to `/Inbox/_conversations-pending/_processed/` (kept for 30 days then auto-deleted)

**KEEP-EXTRACT (with 30-day recovery window per Move 6 locked 2026-05-28):**
1. Read the staged file from `_conversations-pending/`
2. Append ONLY the action-items + key-decisions extract to named intel destination
3. Cross-reference back to source UUID (Zoom or capture-tool source-id)
4. **Move verbatim transcript to `/Inbox/_conversations-pending/_30day_recoverable/[YYYY-MM-DD]_[uuid].md`** — retained for 30 days, then auto-deleted by Curator's daily housekeeping pass
5. Delete verbatim from upstream source (Zoom Cloud via MCP if Zoom-captured; original Apple Mail message stays in inbox per Apple Mail default retention; Voice Memos source stays on device per iCloud default retention)
6. Log the verbatim deletion to `/Architecture/CONVERSATION_DESTRUCTION_LOG.md` per the schema (note: 30-day recoverable window flagged in log entry)
7. Move staged file (extract only, no verbatim) to `/_processed/` (kept for 30 days then auto-deleted)
8. After 30 days from KEEP-EXTRACT verdict, Curator's daily housekeeping pass auto-deletes the `_30day_recoverable/` file and logs the final destruction to the destruction log (no content retained, just timestamp + UUID + "30-day window expired")

**DESTROY-ALL:**
1. Delete verbatim transcript from upstream source (Zoom Cloud via MCP, Apple Mail copy, Voice Memos device file if reachable via JASON OS direct-drop path)
2. Delete staged file (including any extract) from `_conversations-pending/`
3. Log destruction to `CONVERSATION_DESTRUCTION_LOG.md` with counterparty unnamed (default-destroy = privacy by design)
4. NO 30-day recovery window — DESTROY-ALL is explicit destroy verdict

---

## Auto-default safety

If Jason doesn't reply within 24 hours of the morning brief landing:

- **Items with suggested verdict KEEP-FULL** → wait 48 more hours, then send a reminder; if still no reply, default to KEEP-EXTRACT to balance retention with caution
- **Items with suggested verdict KEEP-EXTRACT** → auto-execute KEEP-EXTRACT after 24h
- **Items with suggested verdict DESTROY-ALL** → auto-execute DESTROY-ALL after 24h

This means inaction defaults to the safer side. Sensitive content does not accumulate just because Jason missed a morning brief.

---

## R-31 pre-emit staples check (every agent output)

Before any morning-brief section, any destruction log entry, any intel filing the Curator generates — runs the 13-item R-31 check:

1. Time check (always check Lisbon time before time-of-day phrasing)
2. AM/PM format (never 24-hour)
3. Peptide dosing in IU not mcg (n/a for this agent)
4. Chemical name leads SKU in parens (n/a)
5. Banned terms scan (RGB, named insurers, Hendrick, Susan Bergin, Joshua Armah, Jamie Dixon, Kyle Turner, Stephan Rust, Susan Pinedo, Tessaract, Collateralization platform, GBP/£, Uma, Pam routing)
6. Vendor / contact names correct (Pepguard / Luke & Bex, Mili spelling, Mark Acosta + Mark Jennings-Bates)
7. No fabricated data
8. Universal clickable links
9. Compacted-response format
10. Copy-paste deliverables in fenced code blocks
11. Honesty about who caught what
12. Trinity scope check
13. Bulk-replace dry-run check

If a transcript contains banned terms in the SOURCE content (e.g., counterparty said "RGB" in a recorded call), the Curator preserves the source verbatim BUT flags it in the staged file so Jason knows to coach the counterparty if relevant. Source-fidelity vs. Curator-output cleanliness are different concerns.

---

## Privacy & destruction protocol

### What we destroy

- Verbatim transcripts of calls without explicit recording consent (default)
- Extract content of calls Jason marks DESTROY-ALL
- Any recording flagged with sensitive content where Jason confirms destruction

### What we keep

- Action-items + key-decisions extracts of intel-relevant calls (when Jason marks KEEP-EXTRACT)
- Verbatim transcripts of calls where consent is explicitly on record (when Jason marks KEEP-FULL)
- Destruction logs (counterparty + timestamp + reason + Zoom UUID; NO content)

### What never gets logged

- The content of destroyed transcripts (the whole point of destruction)
- Personal/family/health content unless Jason specifically marks it for retention to Jason OS or JASON HEALTH agent

### Counterparty disclosure

When a counterparty asks "did you record our call on date X?" — Curator surfaces an honest answer from the destruction log:
- "Recording captured via Zoom AI Companion at [time] Lisbon. Verbatim transcript destroyed at [time] per default destruction policy. Action-items extract retained" (or "no content retained")
- The destruction log gives Jason a defensible audit trail with no content exposure

---

## Calibration first-run discipline

Per the May 27 PM onboarding-first-three-runs pattern:

- **Run 1 (first morning):** Jason synchronous review of every row, including auto-suggested verdicts. Curator confirms classification logic was correct.
- **Run 2 (second morning):** Synchronous review of auto-suggested verdicts only. Jason confirms or corrects.
- **Run 3 (third morning):** Spot-check 30% of rows. If accuracy >90%, move to autonomous on day 4.
- **Run 4+ (autonomous):** Curator runs the full sweep, files to staged review, surfaces in morning brief, executes Jason's disposition replies. Sentinel A1 weekly audit spot-checks for drift.

Calibration log at `/Architecture/CALL_RECORDING_CURATOR_CALIBRATION_LOG.md` (created on first run).

---

## Cross-agent integration (Move 3 trinity routing locked 2026-05-28)

Classification pass tags each transcript with one or more trinity dimensions: `one2b` / `12butterflies` / `jason-personal`. Routing downstream is per-tag, not per-recording-as-a-whole (a recording can serve multiple).

### Audit + governance layer (every recording)
- **Scout** — Curator's daily sweep runs paired with Scout's 06:00 Lisbon intel sweep so morning brief assembly has both feeds
- **Fleet Health Audit** — Check 7 extended to scan Curator output for R-31 staples drift weekly (Sunday 22:00 Lisbon)
- **Sentinel A1** — Job 7 extended to spot-check Curator classifications and destruction logs for accuracy weekly

### One 2b commercial routing (when tag = `one2b`)
- **Sales Funnel Agent v1.2** — counterparty match updates when Cards created from previously-unidentified counterparties; meeting Updates-feed post per the May 26 PM Contact Cards architecture
- **Capital Readiness Curator** — receives KEEP-EXTRACT filings tagged `capital-allocator` or `sovereign` for surgical-update proposals against the F&F deck, investor snapshot, sovereign briefing pack
- **Document Agent** — receives KEEP-EXTRACT filings tagged `contract-mentioned` for cross-checking verbal commitments against drafted documents
- **Hiring caps task** — receives KEEP-EXTRACT filings tagged `hiring-mentioned` for candidate pipeline routing
- **Intel/[DOMAIN]_INTEL.md filing** — KEEP-FULL or KEEP-EXTRACT content lands in matching domain file (SALES_INTEL, SOVEREIGN_INTEL, PARTNER_INTEL, CAPITAL_INTEL, etc.)

### 12 Butterflies brand routing (when tag = `12butterflies`)
- **Studio Social Agent** — receives KEEP-EXTRACT filings tagged `community-mentioned` for content ideation and social distribution planning
- **12B community substrate** — community member touchpoints filed to the appropriate Contact Card Updates feed
- **Brand Storyboard caps task** — receives KEEP-EXTRACT filings tagged `narrative-mentioned` for brand storytelling continuity

### Jason-personal routing (when tag = `jason-personal`)
- **JASON OS** — receives journal-style captures, family conversations, general life substrate for the appropriate state-file or substrate folder
- **JASON HEALTH** — receives peptide consult captures, longevity-related conversations, clinical data for the protocol reference + research feed
- **Longevity Research** — receives ceremony integration captures, plant medicine session captures, alternative medicinal exploration for Stream E substrate
- **Autobiography material** — captures Jason flags `autobiography-relevant` route to the autobiography substrate folder

### Multi-tag routing (when content spans)

When a single recording serves multiple trinity dimensions (e.g., capital allocator call that also touched Jason's longevity research because the counterparty asked about Pepguard), the extract files to ALL named destinations with cross-references in each. Curator's classification pass surfaces the multi-tag possibility in the morning brief verify section so Jason can confirm routing.

---

## Operational gates (Jason confirms before autonomous)

1. ✅ Zoom MCP connected — verified 2026-05-28
2. ✅ Account = hello@one2b.io — verified via Zoom MCP response
3. ✅ Pro tier active — verified via billing page
4. ⏳ AI Companion + Voice Recorder + Smart Recording toggled on (admin + user) — Jason in progress
5. ⏳ Zoom Workplace v7.0.3+ on iPhone + Mac — Jason in progress
6. ⏳ First synchronous calibration run — pending Jason's first WhatsApp recording captured
7. ⏳ Sentinel A1 Job 7 extended to scan Curator output — drafting

---

**End of SKILL.md v1.0. Next iteration when calibration runs identify drift patterns or when Zoom changes their API surface.**
