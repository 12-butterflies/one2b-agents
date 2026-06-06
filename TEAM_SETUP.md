# Team Setup — One 2b Agent Access
**For:** Staff members who need access to Document Creator and other One 2b agents
**Time to set up:** ~30 minutes
**Contact for access:** hello@one2b.io (Jason)

---

## What you get access to

Once set up, you can use:
- **Document Creator** — generate NDAs, CPAs, partnership agreements with One 2b's terminology rules pre-loaded
- **Studio agents** (when activated) — content creation tools with One 2b's voice and brand rules
- **Context cards** — pre-loaded session starters so you never need to explain One 2b's rules to Claude

---

## Step 1 — Get a Claude subscription

You need either:
- **Claude Pro** (claude.ai) — for Cowork/browser use. $20/month.
- **Claude Code CLI** — for technical users who want the full build environment. Requires Anthropic account.

Ask Jason which one is right for your role.

---

## Step 2 — Clone the repo

You need Git and Node 20+. Check: `git --version` and `node --version` in terminal.

```bash
git clone [repo URL — ask Jason]
cd one2b-agents
```

This gives you:
- All context cards (ready to paste into any Claude session)
- SETUP.md for the full technical environment
- SESSIONS.md for which session to use for what
- TEAM_SETUP.md (this file)

---

## Step 3 — Document Creator access

The Document Creator uses a context card. No technical setup needed beyond Step 2.

**To use it:**
1. Open a new Cowork (claude.ai) chat
2. Open `context-cards/DOCUMENT.md` from the repo
3. Cmd+A, Cmd+C — copy the whole file
4. Paste it as your first message in the new chat
5. Tell Claude what document you need: "Draft an NDA between One 2b and [counterparty name]"

The context card pre-loads:
- One 2b's terminology rules (what to say and what never to say)
- Document templates and standards
- Sentinel A3 instructions (the review gate before anything ships)
- Jason's approval requirement (all documents go to Jason before being sent)

---

## Step 4 — Approval flow

**Every document produced by the Document Creator goes to Jason for approval before it leaves the building.**

No exceptions. The context card instructs Claude to include a "PENDING JASON APPROVAL" flag on every draft.

When Claude produces a draft:
1. Copy the draft
2. Email to hello@one2b.io with subject: `[DRAFT NDA/CPA] — [Counterparty name]`
3. Wait for Jason's sign-off before sending to the counterparty

---

## What you do NOT have access to

- CEO Intelligence substrate (voice guides, financial projections, strategic documents) — Jason only
- Jason OS (personal health) — Jason only
- Capital Matching and IGI agent outputs — restricted to Jason + broker review
- Sovereign communications — Jason only, always

If you need something from these areas, surface to Jason directly.

---

## Keeping your context current

The repo updates regularly. Pull the latest before any important session:

```bash
cd one2b-agents
git pull
```

This ensures your context cards have the latest terminology rules, brand guides, and templates.

---

## If something looks wrong in a document

If Claude produces something that feels off — wrong terminology, incorrect financial figures, a claim that seems unverifiable — **stop and flag it**. Do not send. Email hello@one2b.io.

The Sentinel rules are built into the context card, but human judgment is always the final gate.
