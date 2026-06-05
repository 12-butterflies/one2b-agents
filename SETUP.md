# One 2b Agent Fleet — Setup Guide
**For:** Any team member setting up this environment from scratch
**Time to working:** ~45 minutes
**Owner:** Jason Peter Stevens (hello@one2b.io)
**Last updated:** 2026-06-05

This guide gets you from a clean Mac to a fully operational One 2b agent environment. Follow the steps in order. Do not skip sections.

---

## Prerequisites

- macOS (Apple Silicon or Intel)
- Node.js 20+ (`node --version` to check; install via https://nodejs.org if missing)
- Git (`git --version` — comes with Xcode Command Line Tools)
- Access to the One 2b Google Drive folder (request from hello@one2b.io)
- A Claude Pro or Team subscription (claude.ai)
- Claude Code CLI

---

## Step 1 — Install Claude Code

```bash
npm install -g @anthropic-ai/claude-code
claude --version   # confirm install
```

Sign in with your Anthropic account:
```bash
claude login
```

---

## Step 2 — Clone this repo

```bash
git clone <repo-url> ~/one2b-agents
cd ~/one2b-agents
```

If you are Jason setting up on a new machine, the repo is at: `[repo URL to be added when remote is set up]`

Configure git identity for this repo:
```bash
git config user.email "hello@one2b.io"
git config user.name "Jason Peter Stevens"
```

---

## Step 3 — Install Node dependencies for the intel pipeline

```bash
cd ~/.gmail-mcp-intel        # the Bright Data scrape pipeline lives here
npm install                  # installs from existing package.json
```

Verify the Bright Data CLI is reachable:
```bash
bdata --version
```

If `bdata` is not found: install via `npm install -g @brightdata/cli` then authenticate with your Bright Data API key.

---

## Step 4 — Connect the MCP servers

MCPs (Model Context Protocol servers) give Claude Code access to external tools. Each one needs to be authenticated once. Config files live in `~/one2b-agents/mcp/`.

### Google Drive MCP
Gives agents read/write access to the CEO Intelligence Drive folder.
```bash
# Config file: ~/one2b-agents/mcp/google-drive.json
# Follow the OAuth flow Claude Code prompts on first use
```
Required Drive folder access: `CEO Intelligence/` (folderId: `1w9nvR1NKJx4z_b3AhAcbV8Pxu7ivBX28`)

### Gmail MCP (intel@one2b.io)
Gives Scout read access to the intel inbox.
```bash
# Config file: ~/one2b-agents/mcp/gmail-intel.json
# Authenticate via OAuth — use intel@one2b.io credentials
```

### Monday.com MCP
Used by Curator, Triage, and Fleet Router.
```bash
# Config file: ~/one2b-agents/mcp/monday.json
# Add your Monday API key to the config file
```

### Fireflies MCP
Meeting transcripts for CEO Brain context.
```bash
# Config file: ~/one2b-agents/mcp/fireflies.json
```

### Higgsfield MCP (Studio Agent only)
Video and motion production. ~5 minutes OAuth.
```bash
# Config file: ~/one2b-agents/mcp/higgsfield.json
# OAuth at: higgsfield.ai/mcp
```

---

## Step 5 — Install the launchd agents (scheduled automation)

These run the daily intel sweep, briefing watchman, and Perplexity competitive watch automatically.

```bash
# Copy the plist files to LaunchAgents
cp ~/one2b-agents/launchd/*.plist ~/Library/LaunchAgents/

# Load each one
launchctl load ~/Library/LaunchAgents/io.one2b.intel-sweep.plist
launchctl load ~/Library/LaunchAgents/io.one2b.brief-watchman.plist
launchctl load ~/Library/LaunchAgents/io.one2b.perplexity-competitive-watch.plist

# Verify they loaded
launchctl list | grep one2b
```

The intel sweep runs daily at 06:30 Lisbon time (adjust `StartCalendarInterval` in the plist if your timezone differs).

---

## Step 6 — Verify the CEO Intel substrate

Open Claude Code in this folder:
```bash
cd ~/one2b-agents
claude
```

The following substrate files must exist before any agent goes live. Check each:

```
ceo-intel-mirror/Terminology/must_never_use.md     ✓ (populated)
ceo-intel-mirror/Terminology/must_use.md           ✓ (populated)
ceo-intel-mirror/RED_flags/standing_list.md        ✓ (populated)
ceo-intel-mirror/Trinity/Jason/voice_guide.md      ✓ (populated when locked)
ceo-intel-mirror/Trinity/One2b/voice_guide.md      ☐ (pending)
ceo-intel-mirror/Trinity/12Butterflies/voice_guide.md  ☐ (pending)
ceo-intel-mirror/Financials/base_case_projections.md   ☐ (pending)
ceo-intel-mirror/Quarterly/Q2_2026_thesis.md           ☐ (pending)
ceo-intel-mirror/Sovereigns/Mozambique/status.md       ☐ (pending)
ceo-intel-mirror/Sovereigns/Colombia/status.md         ☐ (pending)
```

Agents that depend on a missing file will return a stub response until the file is populated.

---

## Step 7 — Model access

Confirm you have API access to:

| Model | Used for |
|---|---|
| claude-haiku-4-5 | Classification, routing, Sentinel A1 |
| claude-sonnet-4-6 | Standard generation, most agents |
| claude-opus-4-8 | CEO Brain, Sentinel A3, Document, high-stakes Studio outputs |

Check your Claude Code settings:
```bash
cat ~/one2b-agents/.claude/settings.json
```

---

## Step 8 — Offline / local model setup (optional but recommended)

For working without internet connectivity:

1. Download LM Studio: https://lmstudio.ai
2. Download model: Llama-3.3-70B-Instruct (or Mistral-7B for lighter machines)
3. Start the local server in LM Studio (default port 1234)

Local models handle: Scout subject-line routing, R-19 creator-cluster auto-file, basic Triage sorting.
Local models must NOT be used for: external-facing copy, voice-sensitive writing, legal documents.

---

## What the folders contain

```
~/one2b-agents/
├── CLAUDE.md                    ← master rules — read before every session
├── SETUP.md                     ← this file
├── .claude/
│   ├── settings.json            ← model defaults and hooks
│   ├── commands/                ← slash commands
│   │   ├── brief.md             ← /brief — pull CEO Intel daily briefing
│   │   ├── intake.md            ← /intake — classify email queue (self-contained)
│   │   ├── lock.md              ← /lock — lock a doc to v1.0
│   │   └── route.md             ← /route — test Fleet Router classification
│   └── agents/                  ← subagent definitions (one per agent)
├── skills/                      ← SKILL.md per agent (full specs go here)
├── mcp/                         ← MCP config files (one JSON per service)
├── ceo-intel-mirror/            ← local mirror of CEO Intelligence substrate
│   ├── Terminology/             ← must_use.md, must_never_use.md
│   ├── RED_flags/               ← standing_list.md
│   ├── Trinity/                 ← voice guides per identity
│   ├── Financials/              ← base case projections
│   ├── Sovereigns/              ← per-country status
│   ├── Quarterly/               ← current Q thesis
│   └── Fleet_Learning/          ← weekly + monthly agent synthesis files
├── plugins/                     ← distributable Cowork plugin bundles
└── launchd/                     ← plist templates for scheduled automation
```

---

## Who to contact

- **Architecture questions:** hello@one2b.io (Jason)
- **Drive access:** hello@one2b.io
- **Bright Data credentials:** hello@one2b.io
- **Monday.com workspace:** hello@one2b.io

Do not create new Cowork projects or agent definitions without confirming with Jason first. The architecture is the source of truth.
