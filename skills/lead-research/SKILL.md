---
name: lead-research
description: Identifies and qualifies high-quality leads with outreach strategies. Use when Capital Matching Agent or Scout needs to research an investor, partner, or sovereign counterparty — or when Studio Direct is preparing cold outreach and needs context on a recipient.
---

# Lead Research Assistant

From ComposioHQ/awesome-claude-skills.

## What it does
Identifies leads, qualifies them against criteria, and prepares outreach context packages.

## In One 2b context
- **Capital Matching Agent:** profiles investors against One 2b mandate fit
- **Scout:** enriches partner/investor context cards in CEO Intel
- **Studio Direct:** feeds context before cold outreach (recipient profile, prior engagements, mutual connections)

## Tool stack
Parallel Search API (already wired) → profile enrichment → context card output

## Output format
```
LEAD: [name + org]
RELEVANCE: [why relevant to One 2b]
KEY FACTS: [3-5 bullets — sourced]
OUTREACH ANGLE: [one specific hook]
RED FLAGS: [any Sentinel A1 concerns]
```
