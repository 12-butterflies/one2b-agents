#!/bin/bash
# FAL.ai image generation — Studio Design + Scout
# Account: hello@one2b.io
# Usage: ./fal-generate.sh "prompt" [model] [aspect_ratio]
# Models: flux-pro (best quality), flux-dev (fast), flux-schnell (fastest)
# Aspect ratios: 16:9 (web hero), 1:1 (social), 4:5 (Instagram), 9:16 (stories)

PROMPT="${1:-One 2b data infrastructure, white background, lavender to periwinkle gradient, deep navy headline, premium institutional, Inter light typography}"
MODEL="${2:-fal-ai/flux-pro}"
RATIO="${3:-16:9}"
OUTPUT_DIR="${4:-/tmp/one2b-generated}"

API_KEY="${FAL_API_KEY}"
if [ -z "$API_KEY" ]; then
  API_KEY=$(python3 -c "import json; d=json.load(open('$(dirname "$0")/../.claude/settings.local.json')); print(d.get('env',{}).get('FAL_API_KEY',''))" 2>/dev/null)
fi

[ -z "$API_KEY" ] && echo '{"error": "FAL_API_KEY not set"}' && exit 1
mkdir -p "$OUTPUT_DIR"

TIMESTAMP=$(python3 -c "import time; print(int(time.time()))")
OUTFILE="$OUTPUT_DIR/fal-${TIMESTAMP}.png"

echo "Generating: $PROMPT"
echo "Model: $MODEL | Ratio: $RATIO"

RESULT=$(curl -s -X POST "https://fal.run/${MODEL}" \
  -H "Authorization: Key $API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"prompt\": \"$PROMPT\",
    \"image_size\": \"$RATIO\",
    \"num_images\": 1,
    \"enable_safety_checker\": false
  }")

IMAGE_URL=$(echo "$RESULT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('images',[{}])[0].get('url',''))" 2>/dev/null)

if [ -n "$IMAGE_URL" ]; then
  curl -s "$IMAGE_URL" -o "$OUTFILE"
  echo "Saved: $OUTFILE"
  echo "URL: $IMAGE_URL"
else
  echo "Error: $RESULT"
  exit 1
fi
