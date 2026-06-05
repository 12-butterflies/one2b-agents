#!/bin/bash
# Daily sweep: pulls Instagram URLs queued in the staging file, scrapes each via Bright Data,
# stages content for next Cowork session to process into briefing.
#
# Usage:
#   bash ~/.gmail-mcp-intel/sweep-and-scrape.sh
#
# Or, scheduled via launchd at the briefing-prep time.

set -e

INSTALL_DIR="$HOME/.gmail-mcp-intel"
PROJECT_DIR="$HOME/Documents/Claude/Projects/CEO Intelligence"
TODAY=$(date +%Y-%m-%d)
SWEEP_DIR="$PROJECT_DIR/Briefings/_sweep-staging/$TODAY"
URLS_FILE="$SWEEP_DIR/instagram-urls.txt"
SCRAPED_DIR="$SWEEP_DIR/scraped"

mkdir -p "$SWEEP_DIR" "$SCRAPED_DIR"

# Ensure node and bdata are on PATH (launchd has minimal default PATH)
export PATH="$HOME/.npm-global/bin:/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:$PATH"

cd "$INSTALL_DIR"

echo "=========================================="
echo "  Daily Bright Data Sweep — $TODAY"
echo "=========================================="
echo ""

# Step 1: confirm bdata is reachable
if ! command -v bdata >/dev/null 2>&1; then
  echo "ERROR: bdata CLI not found on PATH"
  echo "Expected at one of: ~/.npm-global/bin, /usr/local/bin, /opt/homebrew/bin"
  exit 1
fi

# Step 2: confirm we have a URL queue file
if [ ! -f "$URLS_FILE" ]; then
  echo "No URL queue at $URLS_FILE."
  echo "When Cowork processes intel@one2b.io, it will write Instagram URLs here for the next sweep."
  echo "Skipping sweep."
  exit 0
fi

# Count actual URL lines (strip blank lines and comment lines starting with '#').
# Previous logic used `grep -c -v '^$'` which silently returned 0 on every run May 1-3
# despite files having 13+ non-empty lines. Replaced with a regex that explicitly
# matches URL-shaped lines (starting with http or https). The set -e guard is also
# bypassed via "|| true" because grep -c exits 1 when count is 0.
URL_COUNT=$(grep -cE '^[[:space:]]*https?://' "$URLS_FILE" 2>/dev/null || true)
URL_COUNT=${URL_COUNT:-0}

# Debug: list what we see in the file (first 5 lines + total non-empty count)
echo "[debug] URLS_FILE=$URLS_FILE"
echo "[debug] file size: $(wc -c < "$URLS_FILE" 2>/dev/null || echo 0) bytes, total lines: $(wc -l < "$URLS_FILE" 2>/dev/null || echo 0)"
echo "[debug] first 5 lines:"
head -5 "$URLS_FILE" 2>/dev/null | sed 's/^/[debug]   /' || true
echo "[debug] URL_COUNT (lines starting with http://): $URL_COUNT"

if [ "$URL_COUNT" -eq 0 ]; then
  echo "URL queue contains no http(s):// lines. Nothing to scrape."
  exit 0
fi

echo "Found $URL_COUNT URLs to scrape."
echo ""

# Step 3: run scrape-helper
node "$INSTALL_DIR/scrape-helper.js" "$URLS_FILE" "$SCRAPED_DIR"

# Step 4: archive the URL queue so we don't re-scrape on the next run
mv "$URLS_FILE" "$SCRAPED_DIR/_processed-urls.txt"

# Step 5: write a flag file so Cowork's next sweep knows there's new scraped content
touch "$SWEEP_DIR/_ready-for-cowork"

echo ""
echo "Sweep complete. Cowork will pick up scraped content at: $SWEEP_DIR"
echo "Open Cowork in CEO Intelligence and say 'process today's sweep' to generate the briefing."
