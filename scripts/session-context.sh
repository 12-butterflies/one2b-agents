#!/bin/bash
# Session context loader — fires on UserPromptSubmit
# Reads current state and injects into session context

REPO="$HOME/one2b-agents"
ACTIVE="$REPO/saved/Todos/ACTIVE.md"
PROTOCOL="$REPO/saved/SAVE_PROTOCOL.md"
DATE=$(date '+%Y-%m-%d')
DAY=$(date '+%A')

echo "=== ONE 2B SESSION CONTEXT — $DAY $DATE ==="
echo ""

# Urgent todos
if [ -f "$ACTIVE" ]; then
  URGENT=$(grep -A 20 "## Urgent" "$ACTIVE" | grep "^\- \[" | head -5)
  if [ -n "$URGENT" ]; then
    echo "URGENT TODOS:"
    echo "$URGENT"
    echo ""
  fi
fi

# Pending decisions
PENDING="$REPO/saved/Strategy/PENDING_DECISIONS.md"
if [ -f "$PENDING" ]; then
  COUNT=$(grep "^| PD-\|^| Q-" "$PENDING" | wc -l | tr -d ' ')
  if [ "$COUNT" -gt 0 ]; then
    echo "PENDING DECISIONS: $COUNT open — see saved/Strategy/PENDING_DECISIONS.md"
    echo ""
  fi
fi

# Save protocol reminder
echo "SAVE PROTOCOL: dual-save all content → saved/ local + Drive (see SAVE_PROTOCOL.md)"
echo "INTEL FOLDER: https://drive.google.com/drive/folders/17oDmGickBJvKcgLdv85XlCzu28k2nyZs"
echo "STAGING FOLDER: https://drive.google.com/drive/folders/1XyqUtvAHZ66ZT31KsCvRMJ-oGh8FWiC7"
echo ""
echo "=== END CONTEXT ==="
