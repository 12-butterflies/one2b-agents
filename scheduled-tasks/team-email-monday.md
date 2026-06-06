---
name: team-email-monday
description: Monday 07:00 — generate and draft week-ahead team email from jps@one2b.io
---

Generate the Monday week-ahead team email for Jason Peter Stevens, CEO of One 2b. Then create a Gmail draft.

RULES:
- Write in Jason's voice: warm, direct, solution-focused, human
- Under 200 words total
- No corporate language, no preamble
- Do not mention AI, automation, or any system
- Sentinel check before drafting: no banned terms, no GBP, no named insurers, no Mozambique as sovereign pilot, no guaranteed yield language

GENERATE THIS EMAIL:

Subject: One 2b — Week of [current Monday date]

Hey team,

This week: [2–3 sentences on the most important focus area for the week. Pull from the build context below. Be specific.]

Your priorities:
· [role/name] — [one-line focus]
· [role/name] — [one-line focus]
· [role/name] — [one-line focus if relevant]

What I'm on: [One line on Jason's primary focus this week]

[If there's a decision the team needs from Jason or a time-sensitive item — add one line. Otherwise omit.]

Have a good week.

Jason

---

AFTER GENERATING: Use Gmail MCP (jps@one2b.io) to create a DRAFT email:
- To: [TEAM_EMAILS — placeholder until Jason confirms: jps@one2b.io for now, which sends to Jason as a preview]
- From: jps@one2b.io
- Subject: One 2b — Week of [date]
- Body: the generated email text

Then send a brief notification email to jps@one2b.io:
Subject: ✓ Monday team email drafted — review in Gmail drafts
Body: Your Monday team update is ready. Open Gmail drafts, review, and hit send when happy.

---

CONTEXT (do not include in output):
Jason Peter Stevens, CEO One 2b. The company builds financial infrastructure for data as an investable asset class — Tesseract valuation + IGI insurance. Registered Lloyd's of London broker. Based in Lisbon.

Current phase: Agent fleet architecture build. Studio Social activates next (Phase 2). Substrate files nearly complete. GitHub remote and Higgsfield OAuth are the two pending quick wins.

Q2 thesis: distribution unlocked by the agent fleet · upstream RWA/data liquidity positioning · 7 named production systems · sovereign arc Portugal→Brazil→Colombia · IGI as the insurance layer

Team email recipients: [TEAM_EMAILS — Jason to confirm. Until confirmed, create draft to jps@one2b.io only.]

Voice: warm, direct, no emojis, lead with the substance, end on a lift. Jason's personal voice, not corporate One 2b voice.
