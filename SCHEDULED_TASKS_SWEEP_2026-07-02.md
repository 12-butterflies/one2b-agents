# Scheduled Tasks Sweep — Diagnostic & Cleanup Plan
**Date:** 2026-07-02 (Lisbon)
**Owner:** Jason Peter Stevens
**Prepared by:** STUDIO (Cowork) — for execution in Claude Code
**Why Claude Code:** the Cowork scheduler tool can disable/enable and edit tasks, but cannot delete them. Deletion of task SKILL.md folders and the launchd .plist files must happen on the local machine.

---

## Headline numbers

- Total scheduler entries: **37**
- Enabled recurring (the real fleet): **19**
- Retired but still listed: **1**
- Dead one-time reminders (already fired, never cleared): **16**
- launchd jobs on the Mac (separate system): **4** — several overlap Cowork tasks

Target end state: ~11 clean recurring Cowork tasks, one scheduler owner per job, launchd reduced to only what Cowork cannot do.

---

## 1. KEEP — core, distinct, working (9)

| Task | Schedule | Owns |
|---|---|---|
| scout-daily-intel-ingestion-6am-lisbon | daily 06:04 | intel intake |
| conversation-curator-6am-lisbon | daily 06:01 | transcript processing |
| ceo-daily-brief-7am-lisbon | daily 07:09 | business brief → jps@ |
| jason-os-state-refresh | daily 06:07 | state file refresh (cheap) |
| hourly-banned-recipient-audit | hourly | compliance guard |
| week-that-was-friday | Fri 08:08 | team retrospective |
| weekly-intelligence-sweep | Mon 06:38 | world / week ahead |
| fleet-health-audit-weekly | Sun 22:08 | fleet self-audit |
| onboarding-agent-trigger-c-sweep | 06:30/12:30/18:30 | onboarding intake |

## 2. MERGE — kill the duplicate, fold into survivor (1 removed)

| Kill | Fold into | Rationale |
|---|---|---|
| jason-morning-health-checkin (daily 07:03) | jason-daily-morning-briefing (daily 06:34) | Morning briefing already covers health protocol, training, fuel, yesterday check-in. The check-in repeats sleep/mood/state 29 min later. One personal AM touch, not two. Preserve the Peptide Diary log step by adding it to the briefing prompt. |

Survivor after merge: **jason-daily-morning-briefing** = the single personal morning brief (health + training + fuel + sleep/mood + Peptide Diary log + calendar + next 48h).

## 3. REVIEW — likely done or superseded, confirm then disable (3)

| Task | Schedule | Question |
|---|---|---|
| verbatim-transcript-vault-builder | daily 23:08 | Designed to idle once all 479 meetings are catalogued. If backfill complete → disable. |
| weekly-notebooklm-bundle-regen | Sun 20:01 | Still using NotebookLM? If not → kill. |
| perplexity-spaces-monday-audit | Mon 09:01 | Still using Perplexity Spaces? Overlaps launchd perplexity-competitive-watch — pick one owner or kill both. |

## 4. Sunday-evening density (6 jobs, not duplicative but heavy)

longevity-research-weekly-sweep (18:07), weekly-notebooklm-bundle-regen (20:01), intel-to-spec-adapter-wed-sun (21:02), jason-os-weekly-memory-consolidation (21:10), repo-reader-wed-sun (21:31), fleet-health-audit-weekly (22:08). Not duplicates. Keep the ones that still earn their place after §3 decisions.

## 5. DELETE — dead one-time reminders + retired (17, sidebar clutter, all already fired)

daily-intel-briefing (RETIRED), luke-bex-small-order-reminder, voice-dna-reminder, studio-social-config-resume-2026-05-27, hall-chadwick-reminder, hall-chadwick-reminder-v2, studio-social-spec-walk-backup-2026-05-28, news-intel-team-sharing-reminder, icp-scoring-v1-redline-reminder, peptide-mix-reminder-tonight, surface-spenn-gabriel-review-fri-am, weekend-priorities-reminder-2026-05-30, jiten-followup-reminder-2026-06-03, fireflies-setup-reminder, verify-fireflies-bcc-rule-friday, jason-morning-reminder-2026-07-02.

Action: right-click each in Cowork sidebar → Delete. Or delete the SKILL.md folders under /Users/jasonpeterstevens/Documents/Claude/Scheduled/ in Claude Code.

## 6. launchd jobs on the Mac — pick one owner per job (4)

| launchd job | Overlaps Cowork task | Recommendation |
|---|---|---|
| io.one2b.intel-sweep | scout-daily-intel-ingestion | Pick one owner. If Cowork Scout is the live one → unload + delete plist. |
| io.one2b.perplexity-competitive-watch | perplexity-spaces-monday-audit | Tied to §3 decision. If Perplexity retired → unload + delete plist. |
| io.one2b.brief-watchman | ceo-daily-brief + jason-daily-morning-briefing | Watchdog that re-fires briefs. Keep ONLY if briefs actually fail to send; otherwise redundant. |
| io.one2b.apple-mail-sweep | feeds scout + conversation-curator | Keep if Cowork cannot reach Apple Mail staging directly. This is the one launchd job Cowork likely cannot replace. |

To unload a launchd job in Claude Code:
`launchctl bootout gui/$(id -u)/io.one2b.<label>` then remove the .plist from ~/Library/LaunchAgents/.

---

## Net effect

- 37 → ~20 entries after deleting the 17 dead ones
- ~20 → ~11 recurring after the merge + §3 review decisions
- Morning window: 7 daily tasks → 6 (health check-in folded)
- Two schedulers → one owner per job
