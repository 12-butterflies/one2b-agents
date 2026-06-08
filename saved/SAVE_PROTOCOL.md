# Save Protocol — One 2b
**Version:** v1.2 — 2026-06-08
**Read this before saving anything.**

---

## Two systems. Never mix them.

### System 1 — One 2b Intel (operational intelligence)
**Drive:** [One 2b Intel](https://drive.google.com/drive/folders/17oDmGickBJvKcgLdv85XlCzu28k2nyZs)
`folderId: 17oDmGickBJvKcgLdv85XlCzu28k2nyZs`

Everything discussed in sessions — notes, follow-ups, to-dos, meeting notes, decisions, deal context, research, technology tracking. Saved automatically by Save Router. Jason does not need to trigger this.

### System 2 — Data Room Staging (review queue)
**Drive:** [Data Room Staging](https://drive.google.com/drive/folders/1XyqUtvAHZ66ZT31KsCvRMJ-oGh8FWiC7)
`folderId: 1XyqUtvAHZ66ZT31KsCvRMJ-oGh8FWiC7`

Documents Claude produces that require Jason's review before permanent filing or sending. Jason reviews weekly and either: (A) files to One 2b Intel, (B) sends to Document agent for One 2b branded reformatting, or (C) sends to counterparty via Studio Direct / DocSend.

---

## One 2b Intel — folder map

| Category | Local path | Drive folder ID |
|----------|-----------|-----------------|
| **People** | `saved/People/[Name].md` | `1Y0pe-qWFXi_voYHgpfP5aUEVWp5Bi5ge` |
| **Companies** | `saved/Companies/[Name].md` | `1-opOMtiVCJ9X4N1wXSIyKQLqDfm7mFKe` |
| **Partners** | `saved/Partners/[Name].md` | `10dFslcbKUPTYtfJFQA95Gw5SkPH-VmwF` |
| **Technology** | `saved/Technology/[Tool].md` | `1xy0aIuUylsX9oqskmJ-sz6gx6X2y0N1f` |
| **Projects** | `saved/Projects/[Company_Project].md` | `1uhHicA_na7WAfT5NTYLF-U4JLZn0PLmT` |
| **Sovereigns** | `saved/Sovereigns/[Country].md` | `1RgexaLcJbKu8iq_XMTTRdk4YvpKE3VbJ` |
| **Capital** | `saved/Capital/[Investor].md` | `1pQ4NOq_3ZqP5sIPRVXpDerdxYa77d2eT` |
| **Todos** | `saved/Todos/ACTIVE.md` | `1wCKwMdEzwyueAEDhj8abdJJrwYZuHnUx` |
| **Meetings** | `saved/Meetings/[YYYY-MM-DD_Who].md` | `1VsBHnVIsdNIr7HpG9ltoiXL-caDGkLF3` |
| **Strategy** | `saved/Strategy/[file].md` | `1NYVSxGQtPENtf3cxpFH70sfPfrqNsb_9` |
| **Research** | `saved/Research/[domain]/[topic].md` | `1Xb_vVYN3i5kbVviUBdoOpfBeMFKFTYsn` |
| **Documents** | `saved/Documents/[YYYY-MM-DD_Title].md` | `1zjf_FmeKA05ZIFYizIPCxSFT8oVY-CGl` |

---

## Data Room Staging — what goes there

Claude drops a document to staging when:
- Jason shares a link or document in session flagged for data room review
- A substantive draft (brief, proposal, report) needs Jason's eyes before filing or sending
- A research finding is significant enough to warrant approval before filing

Claude does NOT drop there:
- Session notes, to-dos, people notes, meeting notes → One 2b Intel automatically
- Anything that doesn't require Jason's review

---

## Data Room Staging — Jason's weekly review

For each document in staging, one of three actions:

**A — File as-is** → move to correct One 2b Intel folder
**B — Reformat** → "Reformat [doc] into One 2b format" → Document agent applies brand template → file
**C — Send** → "Send [doc] to [person]" → Sentinel A3 → Jason approves → Studio Direct / DocSend

---

## Auto-save triggers (Save Router fires these without being asked)

| Signal in session | Action |
|-------------------|--------|
| Person named with context or follow-up | People/[Name].md + Todos/ACTIVE.md |
| Company named with deal or relationship detail | Companies/[Name].md |
| Tech tool or platform mentioned | Technology/[Tool].md |
| Partner with capability | Partners/[Name].md |
| Active deal or project scoped | Projects/[file].md |
| Sovereign with status | Sovereigns/[Country].md |
| Investor named with stage | Capital/PIPELINE.md |
| Any to-do list | Todos/ACTIVE.md |
| Meeting or conversation recapped | Meetings/[date_who].md |
| Decision made | Strategy/DECISIONS.md |
| Research paper, finding, protocol | Research/[domain]/[topic].md |
| Formal document produced needing review | Data Room Staging |
| Jason shares a doc/link for data room | Data Room Staging |

All saves: local first, then Drive. Both, always.
