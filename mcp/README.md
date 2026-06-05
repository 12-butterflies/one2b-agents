# MCP Configurations
**One MCP per file. Authenticate once. Works across Claude Code and Cowork.**

Each file in this folder is the connection config for one MCP server. When setting up on a new machine, authenticate each in order. See SETUP.md for the full install sequence.

## Status

| MCP | File | Used by | Status |
|---|---|---|---|
| Google Drive | `google-drive.json` | All agents (substrate reads) | Configure OAuth |
| Gmail — intel@one2b.io | `gmail-intel.json` | Scout | Configure OAuth |
| Gmail — hello@one2b.io | `gmail-hello.json` | Studio Direct, Document | Configure OAuth |
| Monday.com | `monday.json` | Curator, Triage, Fleet Router | Add API key |
| Fireflies | `fireflies.json` | CEO Brain (meeting context) | Add API key |
| Higgsfield | `higgsfield.json` | Studio Motion, Studio Design | OAuth at higgsfield.ai/mcp |
| Perplexity | `perplexity.json` | Scout (competitive watch) | Add API key |
| Bright Data | `brightdata.json` | Scout (scraper) | Add API key — currently failing auth |

## Never commit API keys or OAuth tokens to this repo.

Config files contain structure and field names only. Credentials go in environment variables or a local `.env` file that is git-ignored.
