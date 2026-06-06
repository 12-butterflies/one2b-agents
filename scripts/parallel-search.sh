#!/bin/bash
# Parallel.ai web search — wired into Scout
# Account: hello@one2b.io
# Usage: ./parallel-search.sh "query here" [deep|standard]
# Returns: JSON array of {url, title, excerpts}

QUERY="${1:-One 2b data-linked insurance products}"
MODE="${2:-standard}"  # standard = /v1/search, deep = /v1/research

API_KEY="${PARALLEL_API_KEY}"

if [ -z "$API_KEY" ]; then
  # Try reading from settings.local.json
  API_KEY=$(python3 -c "import json; d=json.load(open('$(dirname "$0")/../.claude/settings.local.json')); print(d.get('env',{}).get('PARALLEL_API_KEY',''))" 2>/dev/null)
fi

if [ -z "$API_KEY" ]; then
  echo '{"error": "PARALLEL_API_KEY not set"}' && exit 1
fi

if [ "$MODE" = "deep" ]; then
  # Deep Research API — multi-hop synthesis, takes longer
  curl -s -X POST "https://api.parallel.ai/v1/research" \
    -H "Authorization: Bearer $API_KEY" \
    -H "Content-Type: application/json" \
    -d "{\"research_queries\": [\"$QUERY\"]}"
else
  # Standard Search API — fast, cited results
  curl -s -X POST "https://api.parallel.ai/v1/search" \
    -H "Authorization: Bearer $API_KEY" \
    -H "Content-Type: application/json" \
    -d "{\"search_queries\": [\"$QUERY\"]}"
fi
