#!/bin/bash
# Health write verification — fires on every Stop event
# Rule 12k enforcement: if the response contained a health recommendation,
# _daily_log.md MUST have been written in the same turn.
# If not: this script emits a blocking warning injected back into the session.
#
# Exit codes: 0 = pass (or no health content), 2 = gate breach warning

DAILY_LOG="/Users/jasonpeterstevens/one2b-agents/saved/Health/DAILY_LOG.md"
STACK_TEMPLATE="/Users/jasonpeterstevens/Documents/Claude/Projects/CEO Intelligence/Jason Life OS/1-Health/STACK_TEMPLATE.md"

# Parse response text from Stop event JSON on stdin
response_text=$(python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    texts = []
    for block in data.get('message', {}).get('content', []):
        if isinstance(block, dict) and block.get('type') == 'text':
            texts.append(block.get('text', ''))
    print(' '.join(texts).lower())
except Exception as e:
    print('')
" 2>/dev/null)

# Health recommendation keywords — any of these in the response = health turn
KEYWORDS=(
  "thymalin" "thymosin" "kisspeptin" "semax" "epitalon" "epithalon"
  "aod-9604" "bpc-157" "tb-500" "mots-c" "ss-31" "ghk-cu" "dsip"
  "cjc-1295" "ipamorelin" "nad+" "glutathione" "oxytocin" "5-amino-1mq"
  "foxo4" "retatrutide" "tesamorelin" "peptide" "vial" "syringe"
  "inject" "dose" "stack today" "bedtime stack" "morning stack"
  "training stack" "day of 10" "day of course"
)

health_hit=0
for kw in "${KEYWORDS[@]}"; do
  if echo "$response_text" | grep -qi "$kw"; then
    health_hit=1
    break
  fi
done

# No health content in this turn — pass
[ $health_hit -eq 0 ] && exit 0

# Check recommendation keywords — distinguishes read-only from action turns
RECOMMENDATION_KEYWORDS=(
  "start" "begin" "take tonight" "take this morning" "add to" "adding"
  "course" "recommend" "should take" "include" "now includes"
  "logged" "updated" "written to" "added to log" "diary"
)

rec_hit=0
for kw in "${RECOMMENDATION_KEYWORDS[@]}"; do
  if echo "$response_text" | grep -qi "$kw"; then
    rec_hit=1
    break
  fi
done

# Health content but no recommendation keywords — probably a Q&A read, not an action turn
# Still check if log was written, but do not block
if [ $rec_hit -eq 0 ]; then
  exit 0
fi

# Recommendation turn confirmed — verify _daily_log.md was written within 120 seconds
now=$(date +%s)
log_ok=0

if [ -f "$DAILY_LOG" ]; then
  mod_time=$(stat -f %m "$DAILY_LOG" 2>/dev/null || stat -c %Y "$DAILY_LOG" 2>/dev/null)
  age=$((now - mod_time))
  if [ "$age" -lt 120 ]; then
    log_ok=1
  fi
fi

if [ $log_ok -eq 1 ]; then
  # Log written this turn — gate passed
  exit 0
fi

# GATE BREACH — health recommendation was made without a log write
cat <<'WARN'

=== RULE 12k GATE BREACH — ACTION REQUIRED ===

A health recommendation was made in this turn.
_daily_log.md was NOT written in this turn.

This violates rule 12k: "Every turn where Claude recommends starting a peptide
course, adding a peptide, changing a dose, or stopping a peptide — the write to
_daily_log.md AND STACK_TEMPLATE.md MUST happen in the same turn."

REQUIRED NOW (before this session ends):
1. Write the log entry to:
   /Users/jasonpeterstevens/one2b-agents/saved/Health/DAILY_LOG.md
2. If STACK_TEMPLATE.md needs updating: write it now.
3. Commit to GitHub.

Do NOT defer. Do NOT wait for Jason to ask.
The recommendation is incomplete until the log is written.

=== END GATE BREACH WARNING ===

WARN

exit 2
