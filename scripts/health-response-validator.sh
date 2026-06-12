#!/bin/bash
# Health response validator — Stop hook
# Validates every health response for compliance before the session can close.
# Code-level enforcement. Not a suggestion. Not a reminder. A gate.
#
# Exit codes:
#   0 = pass (or no health content in response)
#   2 = validation failure — lists exactly what is missing
#
# Rule: Claude must fix the listed issues before this session ends.

# ── Parse response and prompt from Stop event JSON ────────────────────────────
event_json=$(cat)

response_text=$(python3 -c "
import sys, json
try:
    data = json.loads('''$(echo "$event_json" | python3 -c "import sys; print(sys.stdin.read().replace(\"'\", \"'\\''\"))" 2>/dev/null)''')
    texts = []
    for block in data.get('message', {}).get('content', []):
        if isinstance(block, dict) and block.get('type') == 'text':
            texts.append(block.get('text', ''))
    print(' '.join(texts).lower())
except:
    print('')
" 2>/dev/null)

# Fallback parser using Python with stdin
if [ -z "$response_text" ]; then
  response_text=$(echo "$event_json" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    texts = []
    for block in data.get('message', {}).get('content', []):
        if isinstance(block, dict) and block.get('type') == 'text':
            texts.append(block.get('text', ''))
    print(' '.join(texts).lower())
except:
    print('')
" 2>/dev/null)
fi

# ── Health keyword detection in response ──────────────────────────────────────
HEALTH_PATTERN="thymalin|thymosin|kisspeptin|semax|epitalon|aod-9604|bpc-157|tb-500|mots-c|ss-31|ghk-cu|dsip|cjc-1295|ipamorelin|nad\+|glutathione|gluthomine|oxytocin|5-amino-1mq|50am|cnd2|ip-old|ms10|5ad|nj500|gtt600|ot2|bb20|ds5|ty10|et50|peptide dose|morning stack|bedtime stack|training stack|day of 10"

if ! echo "$response_text" | grep -qiE "$HEALTH_PATTERN"; then
  exit 0  # No health content — pass
fi

# ── Extract the prompt that triggered this response ───────────────────────────
prompt_text=$(echo "$event_json" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    # Try to get the last user message from the session
    msgs = data.get('messages', [])
    for m in reversed(msgs):
        if m.get('role') == 'user':
            content = m.get('content', '')
            if isinstance(content, list):
                for block in content:
                    if isinstance(block, dict) and block.get('type') == 'text':
                        print(block.get('text', '').lower())
                        break
            elif isinstance(content, str):
                print(content.lower())
            break
except:
    print('')
" 2>/dev/null)

# ── VALIDATION CHECKS ─────────────────────────────────────────────────────────
FAILURES=()

# CHECK 1: Peptide names must be followed by IU within 60 characters
# If a peptide is named but has no IU nearby, that's a drift violation
PEPTIDES_TO_CHECK=(
  "cjc-1295" "ipamorelin" "thymalin" "epitalon" "ghk-cu" "dsip"
  "aod-9604" "bpc-157" "tb-500" "mots-c" "ss-31" "5-amino-1mq"
  "nad+" "glutathione" "gluthomine" "oxytocin"
)

for peptide in "${PEPTIDES_TO_CHECK[@]}"; do
  if echo "$response_text" | grep -qi "$peptide"; then
    # Check if IU appears within 200 chars of this peptide mention
    # Use python for proximity check
    has_iu=$(python3 -c "
text = '''$(echo "$response_text" | python3 -c "import sys; print(sys.stdin.read().replace(\"'\", \"'\\''\"))" 2>/dev/null)'''
import re
peptide = '$peptide'
pattern = re.compile(re.escape(peptide), re.IGNORECASE)
for m in pattern.finditer(text):
    window = text[m.start():m.start()+200]
    if re.search(r'\d+\s*iu', window, re.IGNORECASE):
        print('yes')
        break
" 2>/dev/null)
    if [ "$has_iu" != "yes" ]; then
      # Exception: glutathione/gluthomine — check for 'mg' nearby as fallback (still a violation but softer)
      has_mg=$(echo "$response_text" | grep -oi "${peptide}[^.]*mg" | head -1)
      if [ -n "$has_mg" ]; then
        FAILURES+=("UNIT VIOLATION: '$peptide' has mg dose but no IU. IU must come first. mg in brackets only.")
      else
        FAILURES+=("MISSING IU: '$peptide' mentioned but no IU dose found nearby.")
      fi
    fi
  fi
done

# CHECK 2: After alcohol — NAD+ AND Glutathione must appear in response
ALCOHOL_IN_PROMPT=0
if echo "$prompt_text" | grep -qiE "alcohol|drink|drinks|drinking|wine|beer|spirits|housewarming|pub|bar|went out|night out"; then
  ALCOHOL_IN_PROMPT=1
fi
if [ $ALCOHOL_IN_PROMPT -eq 1 ]; then
  if ! echo "$response_text" | grep -qi "nad+\|nj500"; then
    FAILURES+=("MISSING AFTER-ALCOHOL: Alcohol in prompt. NAD+ (NJ500) 100 IU MUST appear in response. Rule 12i.")
  fi
  if ! echo "$response_text" | grep -qiE "glutathione|gluthomine|gtt600"; then
    FAILURES+=("MISSING AFTER-ALCOHOL: Alcohol in prompt. Glutathione (GTT600) 50-100 IU MUST appear in response. Rule 12i.")
  fi
fi

# CHECK 3: Training day — AOD-9604 must appear at least twice (morning + post-training)
TRAINING_IN_PROMPT=0
if echo "$prompt_text" | grep -qiE "training|gym|hiit|krav|workout|trained"; then
  TRAINING_IN_PROMPT=1
fi
if [ $TRAINING_IN_PROMPT -eq 1 ]; then
  aod_count=$(echo "$response_text" | grep -oi "aod-9604\|aod 9604\|5ad" | wc -l | tr -d ' ')
  if [ "$aod_count" -lt 2 ] 2>/dev/null; then
    FAILURES+=("MISSING AOD DOUBLE: Training day detected. AOD-9604 (5AD) must appear TWICE: morning 10 IU + post-training 10 IU. Rule 12g.")
  fi
fi

# CHECK 4: mg-only doses — any line with a naked mg dose (no IU on same line)
mg_only=$(echo "$response_text" | grep -oiE '[0-9]+-?[0-9]* ?mg' | head -5)
if [ -n "$mg_only" ]; then
  # Check if there is a corresponding IU on the same output lines
  bad_lines=$(echo "$response_text" | grep -iE '[0-9]+ ?mg' | grep -viE '[0-9]+ ?iu')
  if [ -n "$bad_lines" ]; then
    FAILURES+=("MG WITHOUT IU: Found mg-only dose. IU must come first. mg in brackets only. Offending: $(echo "$bad_lines" | head -2 | tr '\n' ' ')")
  fi
fi

# ── PASS or FAIL ──────────────────────────────────────────────────────────────
if [ ${#FAILURES[@]} -eq 0 ]; then
  exit 0
fi

# Emit failure block
echo ""
echo "╔══════════════════════════════════════════════════════════════════════════╗"
echo "║  HEALTH RESPONSE VALIDATOR — FAILED                                    ║"
echo "║  The response above does not meet the health output rules.             ║"
echo "║  FIX THESE ISSUES NOW. Do not let the session end without correcting.  ║"
echo "╚══════════════════════════════════════════════════════════════════════════╝"
echo ""
for i in "${!FAILURES[@]}"; do
  echo "  FAIL $((i+1)): ${FAILURES[$i]}"
done
echo ""
echo "  Required format for every peptide line:"
echo "  - Chemical name (SKU) — X IU [timing note]"
echo "  - mg shown in brackets only: '100 IU (1mL = 100mg)'"
echo ""
echo "  Rewrite the failing lines. Then this gate clears on the next response."
echo "══════════════════════════════════════════════════════════════════════════════"
echo ""

exit 2
