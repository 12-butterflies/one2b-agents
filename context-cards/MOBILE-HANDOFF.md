# Mobile Session Handoff Template
**Purpose:** Capture what happened in a mobile voice session so desktop picks it up.
**Time:** 30 seconds at end of any important mobile session.

---

## Say this at the end of any mobile session that produced a decision:

> "Summarise this session in the handoff format."

Claude will return:

```
SESSION HANDOFF — [date]
Decided: [what was decided]
Why: [one line]
Next action: [specific next step, who does it]
Files to update: [if any]
```

---

## Then:

**Option A (fastest):** Screenshot the handoff. Open Claude Code when at desktop. Say "add this handoff to DECISIONS.md" and paste the screenshot text.

**Option B:** Copy the handoff text. Email it to hello@one2b.io with subject "SESSION HANDOFF [date]". Claude Code picks it up via Gmail MCP in the morning brief.

**Option C (when n8n is live):** Automated. Session transcript → n8n → DECISIONS.md. No manual steps.

---

## What gets captured

- Decisions made
- Actions pending from Jason
- Information that changes the substrate (new partner, new sovereign, terminology update)

## What does NOT need to be captured

- General research conversations
- Questions answered without decisions
- Creative drafts that weren't approved

---

## Why this matters

Claude Code on desktop has zero memory of your mobile session unless you bring the handoff. The file system is the only persistent memory. The handoff is how mobile sessions become part of the permanent record.
