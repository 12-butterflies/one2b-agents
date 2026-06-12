#!/bin/bash
# Session context loader — fires on UserPromptSubmit
# Reads current state and injects into session context
# v2 — 2026-06-12: health keywords now trigger FULL STACK_TEMPLATE injection
# so Claude cannot generate from memory — the correct IU doses are in context.

REPO="$HOME/one2b-agents"
ACTIVE="$REPO/saved/Todos/ACTIVE.md"
DATE=$(date '+%Y-%m-%d')
DAY=$(date '+%A')

STACK_TEMPLATE="$HOME/Documents/Claude/Projects/CEO Intelligence/Jason Life OS/1-Health/STACK_TEMPLATE.md"
DAILY_LOG="$HOME/Documents/Claude/Projects/CEO Intelligence/Jason Life OS/1-Health/_daily_log.md"
STATE="$HOME/Documents/Claude/Projects/CEO Intelligence/Jason Life OS/1-Health/_state.md"

# Read the incoming prompt from stdin to detect health vs alcohol keywords
incoming=$(python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    # Handle both direct prompt string and message array formats
    prompt = data.get('prompt', '')
    if not prompt:
        msgs = data.get('messages', [])
        for m in reversed(msgs):
            if m.get('role') == 'user':
                content = m.get('content', '')
                if isinstance(content, list):
                    for block in content:
                        if isinstance(block, dict) and block.get('type') == 'text':
                            prompt = block.get('text', '')
                            break
                elif isinstance(content, str):
                    prompt = content
                break
    print(prompt.lower())
except Exception:
    print('')
" 2>/dev/null)

# Health keyword detection
HEALTH_KEYWORDS="peptide|stack|dose|inject|vial|syringe|thymalin|thymosin|kisspeptin|semax|epitalon|aod|bpc|mots|ghk|dsip|cjc|ipamorelin|nad\+|glutathione|oxytocin|5-amino|foxo4|tesamorelin|training|gym|hiit|krav|yoga|sleep|tired|fatigue|nap|fasted|alcohol|drink|drinking|housewarming|party|going out|social|evening|mood|energy|sinus|sick|recovery|smoking|quit|health|stack today|bedtime|morning stack"

ALCOHOL_KEYWORDS="alcohol|drink|drinks|drinking|wine|beer|spirits|housewarming|pub|bar|went out|night out"

health_hit=0
alcohol_hit=0

if echo "$incoming" | grep -qiE "$HEALTH_KEYWORDS"; then
  health_hit=1
fi

if echo "$incoming" | grep -qiE "$ALCOHOL_KEYWORDS"; then
  alcohol_hit=1
fi

# ── Standard context (always) ─────────────────────────────────────────────────
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

# Non-negotiable rules
echo "=== NON-NEGOTIABLE RULES (active this turn) ==="
echo "RULES: ALL rules in ~/.claude/CLAUDE.md apply to every response. You do not choose which rules apply. You do not skip rules. They are all active all of the time."
echo "LINKS: Every local file path must be an absolute path (/Users/jasonpeterstevens/...), verified to exist, formatted as markdown [label](path). Never send unverified paths."
echo "LINKS: Every URL must be a markdown link [label](url). Never bare URLs."
echo "VERIFY: Never assert a fact from memory alone. Verify via tool, file read, or API in the same turn."
echo "EXECUTE: Never ask Jason to do something Claude can do. Execute first, report the result."
echo "HEALTH: Any health, food, drink, alcohol, sleep, mood, energy, fatigue, training, or lifestyle mention — read ALL THREE files before writing a single word:"
echo "  (1) /Users/jasonpeterstevens/Documents/Claude/Projects/CEO Intelligence/Jason Life OS/1-Health/STACK_TEMPLATE.md"
echo "  (2) /Users/jasonpeterstevens/Documents/Claude/Projects/CEO Intelligence/Jason Life OS/1-Health/_daily_log.md"
echo "  (3) /Users/jasonpeterstevens/Documents/Claude/Projects/CEO Intelligence/Jason Life OS/1-Health/_state.md"
echo "HEALTH: State today's date ($DAY $DATE) before any peptide answer. Run four-pass gate. Memory is NOT a substitute for reading the files."
echo "KICKOFF: If starting a new task (health / research / build / asset / outreach) — surface ~/one2b-agents/KICKOFF_PROMPT.md to Jason before proceeding."
echo "STYLE: Brief bullets. Next steps first. No preamble. No narration."
echo "SAVE: Save Router fires mid-session always. Dual-save: local saved/ AND Drive. Commit to GitHub at session end."
echo "R-31 PRE-EMIT CHECKLIST (fires before every substantive reply):"
echo "  (1) AM/PM time format, never 24-hour."
echo "  (2) IU for every peptide dose, never mcg alone."
echo "  (3) Chemical name leads, SKU in parentheses."
echo "  (4) No banned terms: IGI Insurance, GBP, named insurers, Mozambique as pilot."
echo "  (5) No fabricated data."
echo "  (6) All URLs and file paths as verified markdown links."
echo "  (7) Brief bullets: next steps first, no preamble."
echo "  (8) No hyphens in prose — but keep hyphens in: data-linked insurance products, peptide compound names, model IDs, ISO dates, file paths."
echo "DRIFT: If you have skipped any rule, say 'I skipped [rule]. Correcting now.' Then produce the correct response. Do not apologise. Correct and continue."
echo "=== END CONTEXT ==="

# ── HEALTH GATE — inject full canonical files when health keywords detected ───
if [ $health_hit -eq 1 ]; then
  echo ""
  echo "╔══════════════════════════════════════════════════════════════════════╗"
  echo "║  HEALTH HARD GATE TRIGGERED — CANONICAL FILES LOADED INTO CONTEXT  ║"
  echo "║  DO NOT GENERATE FROM MEMORY. READ THE TABLES BELOW. USE IU ONLY. ║"
  echo "║  OUTPUT FORMAT: bullet per peptide, Chemical name (SKU) — X IU     ║"
  echo "╚══════════════════════════════════════════════════════════════════════╝"
  echo ""

  echo "=== STACK_TEMPLATE.md (SOURCE OF TRUTH — USE THIS, NOT MEMORY) ==="
  if [ -f "$STACK_TEMPLATE" ]; then
    cat "$STACK_TEMPLATE"
  else
    echo "ERROR: STACK_TEMPLATE.md not found at expected path. Do not answer until located."
  fi
  echo ""

  echo "=== _daily_log.md (LAST 50 LINES — CURRENT STATE) ==="
  if [ -f "$DAILY_LOG" ]; then
    tail -50 "$DAILY_LOG"
  else
    echo "ERROR: _daily_log.md not found."
  fi
  echo ""

  echo "=== _state.md ==="
  if [ -f "$STATE" ]; then
    cat "$STATE"
  else
    echo "ERROR: _state.md not found."
  fi
  echo ""

  echo "=== MANDATORY HEALTH OUTPUT RULES (cannot be skipped) ==="
  echo "1. Every peptide line: Chemical name (SKU) — X IU [timing]"
  echo "2. NAD+ dose = 100 IU (1mL = 100mg) — always in IU, not mg alone"
  echo "3. Glutathione dose = 50 IU (0.5mL = 60mg) standard / 100 IU (1mL = 120mg) heavy night — IU first"
  echo "4. AOD-9604 on training days = TWO doses: morning 10 IU fasted + post-training 10 IU. Both. Always."
  echo "5. Bedtime stack = 1 needle. State the count."
  echo "6. Thymalin day number = fill it in. Check _daily_log.md above."
  echo "7. CJC-1295 no DAC + Ipamorelin = MORNING on training days + BEDTIME every day"
  echo "8. SS-31 = morning only. GHK-Cu = bedtime only."
  echo "9. No mg-only dose outputs. IU is the unit. mg shown in brackets only."
  echo "=== END HEALTH GATE ==="
fi

# ── ALCOHOL PRN BLOCK — inject explicitly when alcohol detected ───────────────
if [ $alcohol_hit -eq 1 ]; then
  echo ""
  echo "╔══════════════════════════════════════════════════════════════════════╗"
  echo "║  ALCOHOL DETECTED — MANDATORY PRN ADDITIONS (rule 12i, non-neg.)  ║"
  echo "╚══════════════════════════════════════════════════════════════════════╝"
  echo ""
  echo "NEXT MORNING STACK — ADD THESE (non-negotiable, do not wait to be asked):"
  echo "  - NAD+ (NJ500) — 100 IU (1mL = 100mg) SubQ fasted. Slow push 10-15 min."
  echo "    Reason: alcohol depletes NAD+. Non-negotiable."
  echo "  - Glutathione (GTT600) — 50 IU (0.5mL = 60mg) standard / 100 IU heavy night. SubQ injection."
  echo "    Reason: antioxidant recovery. Injectable only, not oral."
  echo "  - Remind Jason to hydrate before bed."
  echo "  Note: 'Gluthomine' = Jason's shorthand for Glutathione."
  echo "  Surface these proactively in your response. Do not wait to be asked."
  echo "=== END ALCOHOL PRN BLOCK ==="
fi
