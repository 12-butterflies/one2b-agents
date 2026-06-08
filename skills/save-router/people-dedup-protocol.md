# People Deduplication Protocol
**Version:** v1.0 — 2026-06-08
**Locked by:** Jason Peter Stevens
**Reason:** Name-based matching creates duplicates. Email never varies.

---

## The rule

**Email is the canonical key for every person.**

One email = one People file = one Monday IAP item.

---

## For any agent writing to People/

### Step 1 — Extract email
Look in this order:
1. Fireflies participant `email` field
2. Zoom meeting participant email
3. Gmail From/To header
4. Calendar invite attendee
5. Explicit mention in conversation (`"reach him at john@..."`)

If no email found → flag as `email: unknown` and use full name as fallback key.

### Step 2 — Check existing files by email
```bash
grep -rl "email@domain.com" ~/one2b-agents/saved/People/
```
If match found → update THAT file. Ignore the filename.

### Step 3 — Check by full name only if email unavailable
Fuzzy match: "Michelle Antony" matches `Michelle_F_Anthony.md`.
If confident match → update existing.
If uncertain → do NOT create. Flag for Jason review.

### Step 4 — Create only if confirmed new person
Filename: `First_Last.md` (never first-name-only)
Line 2 must be: `**Email:** email@domain.com`

---

## For Monday.com sync

Always use this sequence:
```
1. get_board_items_page with email filter → if match, update item ID
2. If no email match → search by exact full name → if match, update
3. Only create_item if steps 1 and 2 both return nothing
```

Never use fuzzy name matching to create items. Fuzzy = update only.

---

## File naming convention

| Situation | Filename |
|---|---|
| Full name + email known | `First_Last.md` |
| Full name known, no email | `First_Last.md` with `email: unknown` |
| First name only, no email | `_UNRESOLVED_First_[date].md` — never a clean file |
| Company contact, no personal name | `Company_Contact.md` |

---

## Resolving existing first-name-only files

Files like `Alan.md`, `Ali.md`, `JB.md` must be resolved:
1. Read the file — is full name identifiable from context?
2. If yes → rename to full name, update email field
3. If no → leave as `_UNRESOLVED_[Name].md` and flag in ACTIVE.md

---

## Enforcement

This rule is enforced by:
- Save Router SKILL.md (Step 3 — Write the files)
- Fireflies scrape workflow (person consolidation phase)
- Monday sync workflow (match logic)
- Sentinel A1 (checks People files for missing email field)

*Last updated: 2026-06-08*
