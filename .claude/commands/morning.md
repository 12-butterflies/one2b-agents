# /morning — Jason's Daily Start
**Purpose:** Everything you need to begin the day. Short. Direct. No anxiety.

When you type `/morning`, this is what you get — nothing more:

---

## Output format (always this structure, never longer)

```
GOOD MORNING JASON — [Day], [Date]

YOUR STATE TODAY:
Tell me: training or rest? Hangover? How you feel 0-10? I'll give you your peptide stack.

TOP 3 TODAY:
1. [Most important thing — one line]
2. [Second — one line]
3. [Third — one line]

YOUR SESSIONS — open these when you need them:
→ Architecture/build work: you're already in it (Claude Code)
→ Investor/CEO comms: new Cowork chat + paste context-cards/CEO.md
→ Health/peptides: new Cowork chat + paste context-cards/JASON-OS.md
→ Assets/video/content: new Cowork chat + paste context-cards/STUDIO.md

COWORK STATUS: [Available / Down until Tuesday 9 June — use Claude Code instead]

PENDING FROM YOU (takes under 10 min total):
- [Item 1 — time estimate]
- [Item 2 — time estimate]

ONE THING TO KNOW:
[Single most important update from yesterday — one sentence]
```

---

## Rules for this command

- Never more than 20 lines total
- No paragraphs — bullets and short lines only
- No explanations — just what to do
- If there's nothing urgent in a category, omit that category entirely
- The peptide stack is NOT in this brief — it comes when Jason states his state

## What feeds this command

Reads only:
- Current date (system)
- `IMPLEMENTATIONS.md` — for pending actions
- `ceo-intel-mirror/Quarterly/Q2_2026_thesis.md` — for top 3 context
- Session schedule/reminders for the day

Does not read ECOSYSTEM.md. Does not read Architecture docs. Does not load voice guides.
