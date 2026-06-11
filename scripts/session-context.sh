#!/bin/bash
# Session context loader — fires on UserPromptSubmit
# Reads current state and injects into session context

REPO="$HOME/one2b-agents"
ACTIVE="$REPO/saved/Todos/ACTIVE.md"
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

# Non-negotiable rules — injected inline every turn so they cannot be missed
echo "=== NON-NEGOTIABLE RULES (active this turn) ==="
echo "LINKS: Every local file path must be an absolute path (/Users/jasonpeterstevens/...), verified to exist, formatted as markdown [label](path). Never send unverified paths."
echo "LINKS: Every URL must be a markdown link [label](url). Never bare URLs."
echo "VERIFY: Never assert a fact from memory alone. Verify via tool, file read, or API in the same turn."
echo "EXECUTE: Never ask Jason to do something Claude can do. Execute first, report the result."
echo "HEALTH: Any peptide question — state today's date ($DAY $DATE) first, then run four-pass gate before answering."
echo "STYLE: Brief bullets. Next steps first. No preamble. No narration."
echo "SAVE: Save Router fires mid-session always. Dual-save: local saved/ AND Drive. Commit to GitHub at session end."
echo "=== END CONTEXT ==="
