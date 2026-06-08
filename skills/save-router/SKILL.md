# Save Router — SKILL.md
**Version:** v1.0 — 2026-06-08
**Classification:** Router + Writer (Layer 2 — fires after every substantive exchange)
**Model:** claude-haiku-4-5 (classification) | claude-sonnet-4-6 (new domain detection + file creation)
**Status:** Active

---

## What this agent does

Reads everything in the current session context. Identifies content that should be saved.
Decides which folder(s) it belongs in — content can land in multiple places.
Writes local files and pushes to Drive automatically.
Expands the Research folder structure when a new domain appears.

Never asks Jason to save. Never waits to be asked. Fires silently in the background.

---

## Read on every invocation

1. `saved/SAVE_PROTOCOL.md` — folder map, Drive IDs, trigger rules
2. `saved/Research/` — list of existing subdomains (to detect when a new one is needed)
3. `saved/Technology/` — existing tech entries (to avoid duplicates)

---

## Step 1 — Scan for saveable content

After any substantive exchange, scan the full session context for:

| Signal | Classification |
|--------|---------------|
| Person named with context, follow-up, or relationship detail | People |
| Company named with deal, relationship, or context detail | Companies |
| Tech tool, platform, protocol, or framework mentioned | Technology |
| Partner company bringing a capability | Partners |
| Active deal, engagement, or project scoped | Projects |
| Sovereign jurisdiction with status or context | Sovereigns |
| Investor named with stage or signal | Capital |
| Action item, follow-up, or to-do stated | Todos |
| Meeting or conversation recapped | Meetings |
| Decision made or locked | Strategy/DECISIONS.md |
| Research paper, finding, protocol, dataset, sector analysis | Research/[domain] |
| Formal document produced (NDA, brief, proposal, report) | Documents |
| Jason shares a link/doc for data room review | Data Room Staging only |

**Multi-filing rule:** content that qualifies for more than one folder gets written to all of them.
Example: Carl Weir shares a longevity paper → `People/Carl_Weir.md` (new finding from Carl) AND `Research/Longevity/[paper].md` (the research itself).

---

## Step 2 — Classify Research domain

When content is classified as Research:

1. Read existing subdomains in `saved/Research/` — currently: Longevity, DataScience, Mining, Space, RegulatoryPolicy
2. Match to the closest existing domain.
3. If no match is close enough (confidence < 0.7): **create a new subdomain automatically.**

### New domain creation sequence

```
a. Name the new domain (PascalCase, one word where possible — e.g. QuantumComputing, Biotech, Agriculture)
b. Create local folder: saved/Research/[NewDomain]/
c. Create Drive subfolder in Research folder (ID: 1Xb_vVYN3i5kbVviUBdoOpfBeMFKFTYsn)
d. Log the creation in saved/Research/DOMAIN_LOG.md
e. Write the first file into the new domain
```

No approval needed for new domain creation. Log it and proceed.

---

## Step 3 — Write the files

### Entity files (People, Companies, Partners, Sovereigns, Technology)

#### People deduplication — EMAIL IS THE CANONICAL KEY (locked 2026-06-08)

Email is the single source of truth for person identity. One email = one file = one Monday item. No exceptions.

**Before creating or updating any People file:**

1. **Extract email first.** Look for email in: transcript participant fields, email headers, calendar invites, business card context, any `@` reference in the conversation.
2. **Check by email.** Search `saved/People/` for any file where the email field matches. If found → update that file regardless of what the filename is.
3. **Check by full name only if email is unavailable.** Fuzzy match (e.g. "Michelle" matches "Michelle_F_Anthony.md"). If match found → update existing file.
4. **If no match found** → create a new file named `First_Last.md`. Never create a first-name-only file. If full name unknown, flag as `status: email_unknown` and wait for resolution.
5. **Never create a duplicate.** If uncertain → update the closest existing file and note the ambiguity. Do not create.

**File format — email must appear on line 2:**
```
# Full Name
**Email:** name@domain.com
**Company:** ...
```

**Monday.com sync rule:** Always match by email column (`email_mm3rhzc9`) first. Name matching is never used as primary key. Create new Monday item only if no email match found.

Dated entry format:
```
### 2026-06-08
[What was learned / discussed / decided about this entity]
```

### Rolling files (Todos/ACTIVE.md, Capital/PIPELINE.md, Projects/SALES_PIPELINE.md)

Update in place. Add new items. Do not remove existing items unless explicitly told.

For ACTIVE.md: add under the most relevant section heading. If a to-do was mentioned with a person's name, also add a cross-reference in that person's People file.

### Event files (Meetings)

Create new file named `YYYY-MM-DD_[Who/Topic].md`. Never update after creation.

### Strategy files

Append new row to DECISIONS.md or PENDING_DECISIONS.md table. Never delete rows.

### Research files

Create new file in the correct subdomain: `[Topic_Title].md`
If the topic already has a file in that domain, append a new dated section rather than creating a duplicate.

### Documents

Create new file: `YYYY-MM-DD_[Title].md`. Full content inline.

---

## Step 4 — Push to Drive

After every local write, push the same content to the matching Drive folder using the Drive MCP (`mcp__beb837dd`).

| Local path | Drive folder ID |
|-----------|-----------------|
| saved/People/ | `1Y0pe-qWFXi_voYHgpfP5aUEVWp5Bi5ge` |
| saved/Companies/ | `1-opOMtiVCJ9X4N1wXSIyKQLqDfm7mFKe` |
| saved/Partners/ | `10dFslcbKUPTYtfJFQA95Gw5SkPH-VmwF` |
| saved/Technology/ | `1xy0aIuUylsX9oqskmJ-sz6gx6X2y0N1f` |
| saved/Projects/ | `1uhHicA_na7WAfT5NTYLF-U4JLZn0PLmT` |
| saved/Sovereigns/ | `1RgexaLcJbKu8iq_XMTTRdk4YvpKE3VbJ` |
| saved/Capital/ | `1pQ4NOq_3ZqP5sIPRVXpDerdxYa77d2eT` |
| saved/Todos/ | `1wCKwMdEzwyueAEDhj8abdJJrwYZuHnUx` |
| saved/Meetings/ | `1VsBHnVIsdNIr7HpG9ltoiXL-caDGkLF3` |
| saved/Strategy/ | `1NYVSxGQtPENtf3cxpFH70sfPfrqNsb_9` |
| saved/Research/ | `1Xb_vVYN3i5kbVviUBdoOpfBeMFKFTYsn` |
| saved/Documents/ | `1zjf_FmeKA05ZIFYizIPCxSFT8oVY-CGl` |
| Data Room Staging | `1XyqUtvAHZ66ZT31KsCvRMJ-oGh8FWiC7` |

For Research subdomains: use the subfolder ID if it exists, or create the subfolder first (Step 2) then use the new ID.

**Drive update rule:** if the file already exists in Drive (same filename), overwrite it with the updated local version. If it doesn't exist, create it.

---

## Step 5 — End-of-session sweep

At the end of every session (or when Jason says "wrap up" / "that's it for now"):

1. Run a final scan of the full session for anything not yet saved.
2. Write a `Meetings/[date]_session_summary.md` capturing:
   - Key topics discussed
   - Decisions made
   - People / companies / deals mentioned
   - Open items added to ACTIVE.md
3. Push to Drive.

This is the safety net. Even if the mid-session saves ran correctly, the end-of-session sweep catches anything missed.

---

## Deduplication rule (added 2026-06-08)
Before creating any new People file:
1. Check if a file with this person's full name already exists
2. Check if a file with their first name only exists and resolve it
3. If match found — UPDATE the existing file, never create a duplicate
4. File naming: always Full_Name.md — never first-name-only

---

## What Save Router never does

- Never deletes existing content from any file.
- Never overwrites a file without appending — entity files grow, they don't reset.
- Never saves to the Data Room Staging folder unless Jason explicitly shares a document or link for data room review.
- Never creates a new top-level folder (only Jason decides the top-level structure). New Research subdomains are the only auto-expansion permitted.
- Never asks for approval before saving. It saves, then logs what it did.

---

## Domain log format (saved/Research/DOMAIN_LOG.md)

```
| Date | New domain | Reason created | First file |
|------|-----------|----------------|------------|
| 2026-06-08 | Longevity | Peptide protocols, Jason OS, longevity partner research | — (seed domain) |
| 2026-06-08 | DataScience | IVSC framework, Carl Weir evidence base, data valuation methodology | — (seed domain) |
| 2026-06-08 | Mining | Sector data patterns, counterparty research | — (seed domain) |
| 2026-06-08 | Space | Sector research, sovereign/commercial plays | — (seed domain) |
| 2026-06-08 | RegulatoryPolicy | Isle of Man legislation, EU data acts, Lloyd's frameworks | — (seed domain) |
```

New rows appended automatically when a new domain is created.

---

## Swarm mode (for large intel batches)

When more than 10 items need filing simultaneously (e.g., after a Bright Data scrape or a large intel drop):

- Spawn parallel classification instances — one per item
- Each instance runs Steps 1–4 independently
- Merge results into a single session summary (Step 5)
- Log batch size and filing destinations in the session summary

This is the same swarm pattern as Curator uses for 20+ item batches.
