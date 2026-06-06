#!/bin/bash
# Ideogram image generation — best-in-class text-in-image
# Account: hello@one2b.io
# Usage: ./ideogram-generate.sh "prompt" [aspect_ratio] [model]
#
# Aspect ratios: ASPECT_16_9 | ASPECT_1_1 | ASPECT_4_5 | ASPECT_9_16 | ASPECT_4_3
# Models: V_2 (best quality) | V_2_TURBO (faster) | V_1 | V_1_TURBO
#
# Best for: social graphics with text, LinkedIn carousels, pitch slides with copy

PROMPT="${1:-One 2b · Data-linked insurance products · Portugal flagship · Premium institutional fintech · White background lavender gradient deep navy typography}"
RATIO="${2:-ASPECT_16_9}"
MODEL="${3:-V_2}"
OUTPUT_DIR="${4:-/tmp/one2b-generated}"

API_KEY="${IDEOGRAM_API_KEY}"
if [ -z "$API_KEY" ]; then
  API_KEY=$(python3 -c "import json; d=json.load(open('$(dirname "$0")/../.claude/settings.local.json')); print(d.get('env',{}).get('IDEOGRAM_API_KEY',''))" 2>/dev/null)
fi

[ -z "$API_KEY" ] && echo '{"error": "IDEOGRAM_API_KEY not set"}' && exit 1
mkdir -p "$OUTPUT_DIR"

TIMESTAMP=$(python3 -c "import time; print(int(time.time()))")
OUTFILE="$OUTPUT_DIR/ideogram-${TIMESTAMP}.png"

echo "Generating with Ideogram $MODEL..."
echo "Ratio: $RATIO"

RESULT=$(curl -s -X POST "https://api.ideogram.ai/generate" \
  -H "Api-Key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"image_request\": {
      \"prompt\": \"$PROMPT\",
      \"aspect_ratio\": \"$RATIO\",
      \"model\": \"$MODEL\",
      \"magic_prompt_option\": \"OFF\"
    }
  }")

IMAGE_URL=$(echo "$RESULT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('data',[{}])[0].get('url',''))" 2>/dev/null)

if [ -n "$IMAGE_URL" ]; then
  curl -s "$IMAGE_URL" -o "$OUTFILE" -L
  echo "Saved: $OUTFILE"
  echo "URL: $IMAGE_URL"
  open "$OUTFILE" 2>/dev/null &
else
  echo "Error: $RESULT"
  exit 1
fi
