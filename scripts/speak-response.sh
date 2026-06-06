#!/bin/bash
# TTS hook for Claude Code Stop events
# Tier 1: Microsoft Azure Neural TTS via edge-tts (no API key, genuinely high quality)
# Tier 2: Google gTTS fallback
# Tier 3: macOS say -v Daniel last resort
#
# Change VOICE to swap: en-GB-SoniaNeural, en-US-AvaMultilingualNeural, en-US-AndrewNeural, en-GB-RyanNeural

VOICE="en-GB-SoniaNeural"

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
    c = edge_tts.Communicate(sys.argv[1], sys.argv[2])
    await c.save(sys.argv[3])
asyncio.run(main())
" "$text" "$VOICE" "$tmpfile" 2>/dev/null; then
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
