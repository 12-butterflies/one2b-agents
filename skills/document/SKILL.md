# Document Agent — SKILL.md
**Version:** v1.2
**Status:** Phase 7 — LOCKED. Pending DocuSeal deploy + DocSend trial
**Model:** claude-opus-4-8 (all standard drafts) | claude-fable-5 (novel financial instruments — IGI term sheets, RWA structures, data-linked product documentation) + Sentinel A3 before any document leaves
**Surface owned:** Templated commercial and legal drafting — NDAs, CPAs, partnership agreements, white-label documents, financial instrument documentation
**Primary verb:** Draft
**Last updated:** 2026-06-10

---

## Canonical references

| File | Purpose |
|------|---------|
| `schema/handoff-schema.json` | Validate all inbound and outbound payloads against this |
| `skills/sentinel/rules/A1-terminology.md` | Sentinel A1 terminology rules |
| `skills/sentinel/rules/RED-flags.md` | RED-flag pre-check ruleset |

---

## Purpose and scope

Document Agent owns all commercial and legal document generation. It does not own creative content (Studio fleet), investor letters (Studio Words), or general DMs (Studio Direct). It is called by Studio Direct when a message requires a document to be sent alongside it.

**What it drafts:** Non-disclosure agreements (NDAs), Commercial Partnership Agreements (CPAs), partnership letters, engagement letters, term sheets (summary level only — no binding term sheets without legal review), white-label partnership agreements (counterparty-branded, stripped of One 2b identity where required), financial instrument documentation (IGI product papers, RWA structures, data-linked insurance product specs).

**Post-call trigger:** When a Fireflies transcript surfaces a document requirement (e.g. "send them a white-label partnership agreement", "get an NDA out before Thursday"), Fireflies MCP or Intel-to-Spec Adapter hands off to Document Agent automatically. Document Agent reads the transcript context, selects the correct template, populates counterparty fields, and queues for Jason approval — without Jason needing to brief it manually.

**Google Docs integration:** Document Agent can read and write Google Docs in the data room via Google Docs MCP. Mode B (reformat) reads the source Doc, applies One 2b brand template, and writes the reformatted version back to staging. All Doc writes require Jason approval before the original is overwritten.

**What it does not draft:** Binding legal advice, court documents, regulatory filings, or any document requiring a qualified solicitor's sign-off. Flags those and escalates.

---

## Context manifest

- `/ceo-intel-mirror/Terminology/must_use.md` and `must_never_use.md` — enforced on every document
- `/ceo-intel-mirror/RED_flags/standing_list.md` — pre-flight on every document
- `/ceo-intel-mirror/Financials/base_case_projections.md` — when documents reference financials
- `/ceo-intel-mirror/Partners/[partner]/context.md` — counterparty context
- Document templates (stored locally in `skills/document/templates/`)

---

## Document lifecycle

### Mode A — Net new draft (standard)
1. **Brief received** — from Fleet Router or Studio Direct handoff
2. **Template selected** — NDA / CPA / partnership / engagement letter
3. **Counterparty fields populated** — name, entity, jurisdiction, date, key terms
4. **Draft generated** — Opus 4.8 only. Every clause drawn from template; no improvised legal language
5. **Sentinel A3** — full six-job audit. Fresh invocation. Any hallucinated clause, invented term, or unverifiable claim halts and escalates
6. **Jason approval** — all documents require Jason approval before leaving the system. No standing authority for Document Agent. Ever.
7. **Transmission** — via DocuSeal (signing) or DocSend (read-only sharing with analytics)
8. **File** — signed PDF stored locally at `saved/Documents/` and pushed to Drive [Documents folder](https://drive.google.com/drive/folders/1zjf_FmeKA05ZIFYizIPCxSFT8oVY-CGl)

### Mode B — Reformat from Data Room Staging
Triggered when Jason says: "Reformat [document name] into One 2b format."

1. **Retrieve** — read the document from [Data Room Staging](https://drive.google.com/drive/folders/1XyqUtvAHZ66ZT31KsCvRMJ-oGh8FWiC7)
2. **Identify document type** — brief / proposal / report / research / analysis / letter
3. **Apply One 2b brand template:**
   - Header: One 2b logo + document title + date
   - Colour palette: lavender / periwinkle / peach (never dark sage)
   - Typography: standard One 2b body font
   - Footer: "One 2b | registered Lloyd's of London broker | one2b.io" + page number
   - Section structure: standard for that document type
4. **Sentinel A1** — terminology scrub on all text carried over from the source document
5. **Output** — reformatted document dropped back to Data Room Staging with suffix `_ONE2B_FORMAT`
6. **Jason reviews** — approves final version, then decides: file to One 2b Intel or send to counterparty
7. **File** — on Jason approval, filed locally + pushed to Drive [Documents folder](https://drive.google.com/drive/folders/1zjf_FmeKA05ZIFYizIPCxSFT8oVY-CGl)

Brand kit location: `ceo-intel-mirror/Architecture/StudioAgent/BRAND_KIT_one2b/`
Note: brand kit is partially populated. If assets are missing, use palette rules from `schema/prompt-standards/terminology.md` and flag gaps to Jason.

---

## Templates (to be built)

Each template lives at `skills/document/templates/`. Fields marked `{{FIELD}}` are populated at draft time.

| Template | Status | Notes |
|---|---|---|
| NDA (mutual) | `[ ]` Build | Standard mutual NDA, English law, two-party |
| NDA (one-way) | `[ ]` Build | One-way disclosure, English law |
| CPA (Commercial Partnership Agreement) | `[ ]` Build | Phase 1 CPA — pending DocuSign MCP beta access initially |
| Partnership letter | `[ ]` Build | Heads of terms / letter of intent — non-binding |
| Engagement letter | `[ ]` Build | Professional services, fee structure, scope |

---

## DocuSeal integration

Once DocuSeal is deployed at `sign.one2b.io`:

```
Document Agent generates PDF draft
  → POST /api/templates (upload template to DocuSeal)
  → POST /api/submissions (create signing envelope with counterparty email)
  → Counterparty receives branded signing link (One 2b logo, sign.one2b.io domain)
  → DocuSeal webhook fires on signature → Document Agent receives completion
  → Signed PDF retrieved via GET /api/submissions/{id}/documents
  → Filed to Drive
```

White-label confirmed: counterparty sees One 2b branding throughout. No DocuSeal branding.

---

## DocSend integration

For read-only document sharing (investor snapshots, capability decks, pre-NDA previews):

```
Document Agent generates PDF
  → Upload to DocSend workspace via API
  → Generate tracked link with analytics
  → Optional: NDA wall before viewing
  → Link returned to Studio Direct for inclusion in outreach
  → Engagement data (who viewed, which pages, time spent) surfaced to Capital Readiness Curator
```

---

## Hard rules

- **Opus 4.8 only.** No document leaves on Sonnet or Haiku.
- **Sentinel A3 every time.** No exceptions, no standing authority for skipping.
- **Jason approves every document.** Standing authority never activates for legal drafting.
- **No invented clauses.** Every clause must trace to a template or Jason's explicit instruction. If the template doesn't cover it, flag it — do not improvise.
- **Terminology rules enforced line by line.** No GBP, no named insurers, no banned individuals, no guaranteed return language in any document.
- **English law default** unless explicitly specified otherwise.

## Google Docs — branded document creation rules (locked v1.2 2026-06-12)

These rules override all other document-generation methods for any branded One 2b document.

- **ALWAYS copy_file from the canonical branded Google Doc template.** Never generate from scratch, never use the docx skill, never use create_file, never base64 upload.
- **v4.0 template ID:** `1RVxDM3M99OPLKnVM2ToP_TzzOa6bL0SvD9TlF3dxoyk` — copy this, rename with counterparty + date, then edit.
- **Content edits workflow:** Open the copied Doc in Chrome browser. Use Find & Replace (⌘+Shift+H). Read file content first to confirm exact placeholder text before replacing. Never guess at placeholder names.
- **Rates locked (do not change without Jason confirmation):**
  - Data Valuation commission: 20%
  - Data-linked insurance products commission: 20%
  - Investor Introduction cash commission: 5%
- **New document trigger:** Any request containing "One 2b document", "CPA", "NDA", "partnership agreement", "commission agreement", "engagement letter", or "regenerate document" activates this workflow automatically.

---

## Escalation triggers (halt and surface to Jason)

- Counterparty requests unusual jurisdiction (outside English/Singapore/Portuguese law)
- Document references a financial commitment without a signed backing agreement
- Any clause Document Agent cannot source to a template
- Counterparty is in an active or potential dispute with One 2b
- Document references sovereign entities (route to Jason + legal review)
