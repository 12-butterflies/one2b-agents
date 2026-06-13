#!/bin/bash
# health-git-sync.sh — fires on Stop after any health session
# Syncs health files from Documents into repo, commits, pushes to GitHub
set -euo pipefail

REPO="/Users/jasonpeterstevens/one2b-agents"
SRC="/Users/jasonpeterstevens/Documents/Claude/Projects/CEO Intelligence/Jason Life OS/1-Health"

# Sync latest health files into repo
cp "$SRC/STACK_TEMPLATE.md" "$REPO/saved/Health/STACK_TEMPLATE.md" 2>/dev/null || true
cp "$SRC/_daily_log.md"     "$REPO/saved/Health/DAILY_LOG.md"       2>/dev/null || true
cp "$SRC/_state.md"         "$REPO/saved/Health/_state.md"           2>/dev/null || true

# Check if anything changed
cd "$REPO"
if git diff --quiet saved/Health/ && git diff --cached --quiet saved/Health/; then
  exit 0
fi

# Commit and push
git add saved/Health/
git commit -m "Auto-sync health files — $(date '+%Y-%m-%d %H:%M')"
git push

printf '{"continue": true}\n'
