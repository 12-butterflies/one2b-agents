---
---
**GITHUB RAW BASE:** `https://raw.githubusercontent.com/12-butterflies/one2b-agents/main/`
**SHARED RULES:** Fetch `https://raw.githubusercontent.com/12-butterflies/one2b-agents/main/SHARED_RULES.md` at session start. All rules live there. Never generate from memory.
---

name: linkedin-automation
version: "1.0"
status: active
description: Automate LinkedIn posts, profiles, company updates, image uploads, and comments. Use when Studio Social needs to publish directly to LinkedIn, schedule posts, or manage engagement. Trigger on any request to post, publish, or schedule LinkedIn content.
---

# LinkedIn Automation

From ComposioHQ/awesome-claude-skills.

## What it does
Posts, profiles, companies, images, and comments — all automatable via Composio LinkedIn integration.

## In One 2b context
Studio Social uses this to publish posts directly to Jason's LinkedIn or One 2b company page after Fleet Router clearance and Sentinel A1 scrub.

**Never posts without:**
1. Sentinel A1 PASS
2. Jason approval gate (during onboarding; standing authority after 10 posts)
3. trinity_identity confirmed in handoff payload

## Composio setup
Requires Composio API key + LinkedIn OAuth connection.
Install: `pip install composio-core && composio add linkedin`
