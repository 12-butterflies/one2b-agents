#!/bin/bash
# TTS hook for Claude Code Stop events
# Tier 1: Microsoft Azure Neural TTS via edge-tts (no API key, genuinely high quality)
# Tier 2: Google gTTS fallback
# Tier 3: macOS say -v Daniel last resort
#
# LOCKED VOICES (Jason, 2026-06-06):
#   CONTEXT          VOICE                          RATE
#   default/responses  en-GB-SoniaNeural            +30%
#   morning brief      en-US-EmmaMultilingualNeural  +25%
#   alerts/urgent      en-US-BrianNeural             +25%
#   confirmations      en-US-JennyNeural             +20%
# REJECTED: en-GB-MaisieNeural (too young), en-AU-NatashaNeural (AU accent)

VOICE="en-GB-SoniaNeural"
RATE="+30%"

text=$(jq -r '[.message.content[]? | select(.type=="text") | .text] | join(" ")' 2>/dev/null | \
  sed 's/[#*`_~\|]//g' | \
  tr '\n' ' ' | \
  cut -c1-500)

[ -z "$text" ] && exit 0

(
  tmpfile=$(mktemp /tmp/claude-tts-XXXXXX.mp3)

  # Tier 1: edge-tts (Microsoft Azure Neural)
  if python3 -c "
import asyncio, edge_tts, sys, warnings
warnings.filterwarnings('ignore')
async def main():
    c = edge_tts.Communicate(sys.argv[1], sys.argv[2], rate=sys.argv[4])
    await c.save(sys.argv[3])
asyncio.run(main())
" "$text" "$VOICE" "$tmpfile" "$RATE" 2>/dev/null; then
    afplay "$tmpfile" 2>/dev/null
    rm -f "$tmpfile"
    exit 0
  fi

  # Tier 2: gTTS (Google)
  if python3 -c "
import sys, warnings
warnings.filterwarnings('ignore')
from gtts import gTTS
tts = gTTS(sys.argv[1], lang='en', tld='co.uk', slow=False)
tts.save(sys.argv[2])
" "$text" "$tmpfile" 2>/dev/null; then
    afplay "$tmpfile" 2>/dev/null
    rm -f "$tmpfile"
    exit 0
  fi

  # Tier 3: macOS built-in
  rm -f "$tmpfile"
  say -v Daniel "$text" 2>/dev/null
) &
