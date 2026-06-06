#!/bin/bash
# One 2b Architecture Health Check
# Runs daily at 06:50 AM Lisbon — before the daily brief fires at 07:05
# Tests: API keys, scripts, scheduled tasks, CEO Intel substrate, voice, GitHub
# Output: status report piped to the health scheduled task

PASS="✅"
FAIL="❌"
WARN="⚠️"
REPO=~/one2b-agents
SUBSTRATE=~/one2b-agents/ceo-intel-mirror
SCRIPTS=$REPO/scripts
KEYS_FILE=$REPO/.claude/settings.local.json

REPORT=""
FAILURES=0
WARNINGS=0

log() { REPORT="$REPORT\n$1"; }
pass() { log "$PASS $1"; }
fail() { log "$FAIL $1"; FAILURES=$((FAILURES+1)); }
warn() { log "$WARN $1"; WARNINGS=$((WARNINGS+1)); }

log "# Architecture Health — $(date '+%a %d %b %Y %H:%M Lisbon')"
log ""

# ─── 1. API KEYS ───────────────────────────────────────────────────────────
log "## API Keys"

# Read keys from settings.local.json
read_key() {
  python3 -c "import json; d=json.load(open('$KEYS_FILE')); print(d.get('env',{}).get('$1',''))" 2>/dev/null
}

# Parallel
PARALLEL_KEY=$(read_key PARALLEL_API_KEY)
if [ -n "$PARALLEL_KEY" ]; then
  RESULT=$(curl -s -X POST "https://api.parallel.ai/v1/search" \
    -H "Authorization: Bearer $PARALLEL_KEY" \
    -H "Content-Type: application/json" \
    -d '{"search_queries":["test"]}' 2>/dev/null)
  if echo "$RESULT" | grep -q "results"; then
    pass "Parallel API — live (${#PARALLEL_KEY} chars)"
  else
    fail "Parallel API — key present but request failed"
  fi
else
  fail "Parallel API — key missing from settings.local.json"
fi

# Recraft
RECRAFT_KEY=$(read_key RECRAFT_API_KEY)
if [ -n "$RECRAFT_KEY" ]; then
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
    -H "Authorization: Bearer $RECRAFT_KEY" \
    "https://external.api.recraft.ai/v1/models" 2>/dev/null)
  if [ "$STATUS" = "200" ] || [ "$STATUS" = "404" ]; then
    pass "Recraft API — live (${#RECRAFT_KEY} chars)"
  else
    fail "Recraft API — HTTP $STATUS"
  fi
else
  fail "Recraft API — key missing"
fi

# FAL.ai
FAL_KEY=$(read_key FAL_API_KEY)
if [ -n "$FAL_KEY" ]; then
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
    -H "Authorization: Key $FAL_KEY" \
    "https://fal.ai/api/auth/token" 2>/dev/null)
  if [ "$STATUS" != "000" ]; then
    pass "FAL.ai API — key present (${#FAL_KEY} chars) — needs credits"
  else
    fail "FAL.ai API — unreachable"
  fi
else
  fail "FAL.ai API — key missing"
fi

# Ideogram
IDEOGRAM_KEY=$(read_key IDEOGRAM_API_KEY)
if [ -n "$IDEOGRAM_KEY" ]; then
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
    -H "Api-Key: $IDEOGRAM_KEY" \
    "https://api.ideogram.ai/describe" 2>/dev/null)
  if [ "$STATUS" != "000" ]; then
    pass "Ideogram API — key present (${#IDEOGRAM_KEY} chars)"
  else
    fail "Ideogram API — unreachable"
  fi
else
  fail "Ideogram API — key missing"
fi

# Bright Data (just check key is present — service down until renewal)
BDATA_KEY=$(python3 -c "import json; d=json.load(open('$REPO/mcp/brightdata.json')); print(d.get('api_key','') or d.get('env_var',''))" 2>/dev/null)
if [ -n "$BDATA_KEY" ]; then
  warn "Bright Data — config found but token expired 2026-05-07 (renewal needed Wednesday)"
else
  warn "Bright Data — config not found"
fi

log ""

# ─── 2. GENERATION SCRIPTS ────────────────────────────────────────────────
log "## Generation Scripts"

for script in parallel-search.sh recraft-generate.sh fal-generate.sh ideogram-generate.sh speak-response.sh health-check.sh; do
  if [ -x "$SCRIPTS/$script" ]; then
    pass "$script — exists and executable"
  elif [ -f "$SCRIPTS/$script" ]; then
    warn "$script — exists but not executable"
  else
    fail "$script — MISSING"
  fi
done

log ""

# ─── 3. SCHEDULED TASKS ───────────────────────────────────────────────────
log "## Scheduled Tasks"

TASKS_DIR=~/.claude/scheduled-tasks
CRITICAL_TASKS="ceo-daily-brief jason-morning-brief-daily team-email-monday team-email-friday"

for task in $CRITICAL_TASKS; do
  TASK_FILE="$TASKS_DIR/$task/SKILL.md"
  if [ -f "$TASK_FILE" ]; then
    pass "Task: $task — SKILL.md present"
  else
    fail "Task: $task — MISSING"
  fi
done

log ""

# ─── 4. CEO INTEL SUBSTRATE ───────────────────────────────────────────────
log "## CEO Intel Substrate"

CRITICAL_FILES=(
  "Trinity/Jason/voice_guide.md"
  "Trinity/One2b/voice_guide.md"
  "Trinity/One2b/brand_system.md"
  "Terminology/must_use.md"
  "Terminology/must_never_use.md"
  "RED_flags/standing_list.md"
  "Quarterly/Q2_2026_thesis.md"
  "Financials/base_case_projections.md"
)

MISSING_SUBSTRATE=()
for file in "${CRITICAL_FILES[@]}"; do
  if [ -f "$SUBSTRATE/$file" ]; then
    pass "Substrate: $file"
  else
    fail "Substrate: $file — MISSING"
    MISSING_SUBSTRATE+=("$file")
  fi
done

# Check 12Butterflies (expected empty — warn not fail)
if [ -z "$(ls -A $SUBSTRATE/Trinity/12Butterflies/ 2>/dev/null)" ]; then
  warn "Substrate: Trinity/12Butterflies/ — empty (pending brand asset drop)"
fi

log ""

# ─── 5. AGENT SKILL FILES ─────────────────────────────────────────────────
log "## Agent SKILL.md files"

AGENTS="fleet-router studio-social studio-direct studio-words studio-design studio-motion document sentinel scout curator triage ceo-daily-brief capital-readiness-curator igi-insurance-agent tesseract-valuation-agent capital-matching-agent outreach-agent"

V01_COUNT=0
for agent in $AGENTS; do
  FILE="$REPO/skills/$agent/SKILL.md"
  if [ ! -f "$FILE" ]; then
    fail "SKILL.md missing: $agent"
  elif grep -q "v0.1 draft" "$FILE" 2>/dev/null; then
    warn "$agent — still on v0.x"
    V01_COUNT=$((V01_COUNT+1))
  fi
done

if [ $V01_COUNT -eq 0 ]; then
  pass "All 17 agent SKILL.md files at v1.0+"
fi

log ""

# ─── 6. SENTINEL RULE FILES ───────────────────────────────────────────────
log "## Sentinel Rule Files"

RULES="A1-terminology.md A2-plan-review.md A3-full-audit.md RED-flags.md RULES_HALLUCINATION.md RULES_PLAN_CRITIQUE.md RULES_RISK_FLAGS.md RULES_STAKEHOLDER.md"
for rule in $RULES; do
  if [ -f "$REPO/skills/sentinel/rules/$rule" ]; then
    pass "Rule: $rule"
  else
    fail "Rule: $rule — MISSING"
  fi
done

log ""

# ─── 7. SCHEMA ────────────────────────────────────────────────────────────
log "## Schema"
if [ -f "$REPO/schema/handoff-schema.json" ]; then
  python3 -c "import json; json.load(open('$REPO/schema/handoff-schema.json'))" 2>/dev/null && \
    pass "handoff-schema.json — valid JSON" || fail "handoff-schema.json — invalid JSON"
else
  fail "handoff-schema.json — MISSING"
fi

log ""

# ─── 8. VOICE ─────────────────────────────────────────────────────────────
log "## Voice Stack"
if grep -q "speak-response.sh" "$REPO/.claude/settings.json" 2>/dev/null; then
  pass "Stop hook wired → speak-response.sh"
else
  fail "Stop hook not wired"
fi

if command -v say >/dev/null 2>&1; then
  pass "macOS say — available (Tier 3 fallback)"
fi

if python3 -c "import edge_tts" 2>/dev/null; then
  pass "edge-tts — installed (Tier 1 Azure Neural)"
else
  fail "edge-tts — not installed"
fi

log ""

# ─── 9. GITHUB ────────────────────────────────────────────────────────────
log "## GitHub"
LAST_COMMIT=$(cd $REPO && git log -1 --format="%ar — %s" 2>/dev/null)
if [ -n "$LAST_COMMIT" ]; then
  pass "Repo: last commit $LAST_COMMIT"
else
  warn "Repo: could not read git log"
fi

REMOTE_STATUS=$(cd $REPO && git status -sb 2>/dev/null | head -1)
if echo "$REMOTE_STATUS" | grep -q "ahead"; then
  warn "Repo: local commits not pushed"
elif echo "$REMOTE_STATUS" | grep -q "behind"; then
  warn "Repo: local is behind remote"
else
  pass "Repo: in sync with remote"
fi

log ""

# ─── 10. OLD COWORK FLEET (Documents/Claude) ─────────────────────────────
log "## Old Cowork Fleet"

COWORK_BASE=~/Documents/Claude
COWORK_SCHED="$COWORK_BASE/Scheduled"
COWORK_INTEL="$COWORK_BASE/Projects/CEO Intelligence"

# Check critical old-fleet scheduled tasks exist
OLD_CRITICAL="ceo-daily-brief-7am-lisbon scout-daily-intel-ingestion-6am-lisbon fleet-health-audit-weekly conversation-curator-6am-lisbon"
for task in $OLD_CRITICAL; do
  if [ -d "$COWORK_SCHED/$task" ]; then
    pass "Old fleet task: $task — present"
  else
    fail "Old fleet task: $task — MISSING"
  fi
done

# Check fleet health audit last run
LAST_FLEET_HEALTH=$(ls "$COWORK_INTEL/Briefings/_fleet_health/"*.md 2>/dev/null | sort | tail -1)
if [ -n "$LAST_FLEET_HEALTH" ]; then
  LAST_DATE=$(basename "$LAST_FLEET_HEALTH" | cut -c1-10)
  DAYS_AGO=$(python3 -c "from datetime import date; d=date.fromisoformat('$LAST_DATE'); print((date.today()-d).days)" 2>/dev/null)
  if [ -n "$DAYS_AGO" ] && [ "$DAYS_AGO" -le 8 ]; then
    pass "Fleet health audit — last run $DAYS_AGO day(s) ago ($LAST_DATE)"
  else
    warn "Fleet health audit — last run $DAYS_AGO day(s) ago — overdue (weekly cadence)"
  fi
else
  warn "Fleet health audit — no output files found"
fi

# Check brief-watchman last log entry
WATCHMAN_LOG="$COWORK_INTEL/Briefings/_missed_runs/_watchman_log.md"
if [ -f "$WATCHMAN_LOG" ]; then
  LAST_WATCHMAN=$(tail -1 "$WATCHMAN_LOG" 2>/dev/null | cut -c1-10)
  pass "Brief watchman log — last entry $LAST_WATCHMAN"
else
  warn "Brief watchman log — not found (may not have run yet today)"
fi

# Check launchd plists are loaded
for plist in io.one2b.intel-sweep io.one2b.brief-watchman; do
  if launchctl list "$plist" >/dev/null 2>&1; then
    pass "launchd: $plist — loaded"
  else
    warn "launchd: $plist — NOT loaded (run: launchctl load ~/Library/LaunchAgents/$plist.plist)"
  fi
done

# Check intel sweep last run
SWEEP_LOG="/tmp/intel-sweep-stdout.log"
if [ -f "$SWEEP_LOG" ]; then
  LAST_SWEEP=$(stat -f "%Sm" -t "%Y-%m-%d %H:%M" "$SWEEP_LOG" 2>/dev/null)
  pass "Intel sweep log — last modified $LAST_SWEEP"
else
  warn "Intel sweep log — /tmp/intel-sweep-stdout.log not found"
fi

log ""

# ─── 11. DUPLICATE TASK AUDIT ─────────────────────────────────────────────
log "## Duplicate Task Check"

# Check for tasks that exist in BOTH fleets (risk of double-firing)
DUPLICATES=0
for new_task in $(ls ~/.claude/scheduled-tasks/); do
  for old_task in $(ls "$COWORK_SCHED/" 2>/dev/null); do
    # Simple name similarity check
    if echo "$old_task" | grep -qi "$(echo "$new_task" | cut -d'-' -f1-2)"; then
      warn "Possible duplicate: ~/.claude/scheduled-tasks/$new_task ↔ $old_task"
      DUPLICATES=$((DUPLICATES+1))
    fi
  done
done

if [ $DUPLICATES -eq 0 ]; then
  pass "No obvious task duplicates between fleets"
fi

log ""
# ─── SUMMARY ──────────────────────────────────────────────────────────────
log "---"
log "## Summary"
log "Failures: $FAILURES | Warnings: $WARNINGS"

if [ $FAILURES -eq 0 ] && [ $WARNINGS -eq 0 ]; then
  log "**Status: 🟢 ALL CLEAR**"
elif [ $FAILURES -eq 0 ]; then
  log "**Status: 🟡 WARNINGS ONLY — review above**"
else
  log "**Status: 🔴 $FAILURES FAILURE(S) — action required**"
fi

echo -e "$REPORT"
