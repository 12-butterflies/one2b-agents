#!/bin/bash
# Recraft image generation — Studio Design (vector, brand-consistent, illustrations)
# Account: hello@one2b.io | Model: recraftv3
# Usage: ./recraft-generate.sh "prompt" [style] [size]
#
# Best styles for One 2b:
#   realistic_image     — photographic quality
#   digital_illustration — clean editorial illustration
#   vector_illustration — scalable vector art (great for icons/brand)
#   icon                — brand icons
#
# Sizes: 1024x1024 | 1365x1024 | 1024x1365 | 1536x1024 | 1024x1536 | 1820x1024 | 1024x1820

PROMPT="${1:-One 2b brand identity, white background, lavender to periwinkle gradient, deep navy typography, Inter light weight, premium institutional, data infrastructure}"
STYLE="${2:-realistic_image}"
SIZE="${3:-1820x1024}"
OUTPUT_DIR="${4:-/tmp/one2b-generated}"

API_KEY="${RECRAFT_API_KEY}"
if [ -z "$API_KEY" ]; then
  API_KEY=$(python3 -c "import json; d=json.load(open('$(dirname "$0")/../.claude/settings.local.json')); print(d.get('env',{}).get('RECRAFT_API_KEY',''))" 2>/dev/null)
fi

[ -z "$API_KEY" ] && echo '{"error": "RECRAFT_API_KEY not set"}' && exit 1
mkdir -p "$OUTPUT_DIR"

TIMESTAMP=$(python3 -c "import time; print(int(time.time()))")
OUTFILE="$OUTPUT_DIR/recraft-${TIMESTAMP}.png"

echo "Generating with Recraft V3..."
echo "Style: $STYLE | Size: $SIZE"

RESULT=$(curl -s -X POST "https://external.api.recraft.ai/v1/images/generations" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"model\": \"recraftv3\",
    \"prompt\": \"$PROMPT\",
    \"style\": \"$STYLE\",
    \"size\": \"$SIZE\"
  }")

IMAGE_URL=$(echo "$RESULT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('data',[{}])[0].get('url',''))" 2>/dev/null)

if [ -n "$IMAGE_URL" ]; then
  curl -s "$IMAGE_URL" -o "$OUTFILE" -L
  echo "Saved: $OUTFILE"
  echo "URL: $IMAGE_URL"
  # Open it
  open "$OUTFILE" 2>/dev/null &
else
  echo "Error: $RESULT"
  exit 1
fi
