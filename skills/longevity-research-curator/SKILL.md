# Longevity Research Curator — SKILL.md
---
**GITHUB RAW BASE:** `https://raw.githubusercontent.com/12-butterflies/one2b-agents/main/`
**SHARED RULES:** Fetch `https://raw.githubusercontent.com/12-butterflies/one2b-agents/main/SHARED_RULES.md` at session start. All rules live there. Never generate from memory.
---

**Version:** 1.1 | **Updated:** 2026-06-11 | **Owner:** Jason Peter Stevens
**Runs:** Sunday 18:00 Lisbon time (17:00 UTC in June)
**Output:** /saved/Research/Longevity/YYYY-WNN_longevity_sweep.md + Drive dual-save

---

## PURPOSE

Weekly autonomous sweep of longevity, peptide, and biohacking research. Surfaces protocol-relevant updates to Jason. Files to saved/Research/Longevity/. Never fabricates — only reports verified sources.

---

## RESEARCHERS AND SOURCES TO MONITOR

### Named researchers
- Peter Attia — podcast, newsletter, peterattiamd.com
- David Sinclair — Harvard, lifespan.io, publications
- Rhonda Patrick — foundmyfitness.com, podcast
- Bryan Johnson — blueprint.bryanjohnson.com
- Andrew Steele — sciencefocus, publications
- Valter Longo — USC Longevity Institute, publications
- Andrew Huberman — hubermanlab.com, podcast
- Vladimir Khavinson — Khavinson Institute, Thymalin, Epitalon, peptide bioregulator research
- ASRI — Aging Science Research Institute
- Vera Gorbunova + Andrei Seluanov (Rochester) — DNA repair, hyaluronic acid
- Vadim Gladyshev (Harvard) — biological aging clocks, redox biology
- Pinchas Cohen (USC) — MOTS-c originator, mitokines

### PubMed search terms (weekly, last 7 days)
- "peptide longevity"
- "GH secretagogue aging"
- "SS-31 elamipretide"
- "MOTS-c exercise"
- "Thymosin alpha-1"
- "FOXO4-DRI senolytic"
- "Tesamorelin visceral fat"
- BPC-157, CJC-1295, ipamorelin, semax, GHK-Cu, epitalon, thymalin, 5-Amino-1MQ, AOD-9604, NAD+ aging, kisspeptin

### Community sources
- Reddit: r/PeptideGuide, r/longevity, r/Nootropics — new posts flagged
- longevity.technology, lifespan.io, fightaging.org
- hubermanlab.com, foundmyfitness.com, peterattiamd.com
- rethinkpeptides.com, thepeptidecatalog.com, proxivalabs.com

### Vendor monitoring
- Pepguard catalog — any new SKUs or price changes

---

## SWEEP OUTPUT FORMAT

One entry per finding:

| Field | Content |
|---|---|
| Date | YYYY-MM-DD |
| Source | [Name](URL) as markdown link |
| Finding | One sentence, verified |
| Protocol relevance | Which peptide or decision it affects |
| Action required | YES or NO |

If Action required = YES: append item to https://raw.githubusercontent.com/12-butterflies/one2b-agents/main/saved/Todos/ACTIVE.md (local fallback: /Users/jasonpeterstevens/one2b-agents/saved/Todos/ACTIVE.md)

---

## OUTPUT FILE

Path: `https://raw.githubusercontent.com/12-butterflies/one2b-agents/main/saved/Research/Longevity/ (local fallback: /Users/jasonpeterstevens/one2b-agents/saved/Research/Longevity/)YYYY-WNN_longevity_sweep.md`
One file per week, ISO week number in filename.

---

## FILING RULES

1. Save locally at the path above.
2. Upload to Drive Intel folder (folderId: 17oDmGickBJvKcgLdv85XlCzu28k2nyYs) under Research/Longevity/.
3. If any finding carries Action required: YES — append to https://raw.githubusercontent.com/12-butterflies/one2b-agents/main/saved/Todos/ACTIVE.md (local fallback: /Users/jasonpeterstevens/one2b-agents/saved/Todos/ACTIVE.md).
4. Commit to GitHub at end of every sweep (org: 12-butterflies, repo: one2b-agents, branch: main).

---

## HARD RULES

1. Never fabricate citations. Only report verified sources.
2. Preprints always flagged UNREVIEWED.
3. Action required = YES only when finding directly changes dose, timing, or safety of Jason's current stack.
4. Dual-save always. Never skip Drive upload.
5. GitHub commit every run.
6. Four-pass verification for any peptide dose claim: (1) Pull from canonical Drive reference. (2) Cross-check validated formula. (3) Check _state.md. (4) Confirm vial SKU. If any pass fails, say so.

---

## EXECUTION STEPS

1. Web search sweep across all watchlist sources.
2. PubMed query — all search terms, last 7 days.
3. Extract: source, finding, protocol relevance, action flag.
4. Deduplicate against prior week's file.
5. Write sweep file in standard format.
6. Check for Action required = YES entries — append to ACTIVE.md if any.
7. Dual-save local + Drive.
8. GitHub commit.

---

## MANUAL TRIGGER

"run longevity sweep" or "what's new in longevity this week"

---

## WEEKLY DIGEST (supplementary)

A longer-form digest (authority updates, emerging signals, events radar) is also written to:
`/saved/Research/Longevity/weekly/YYYY-W[NN]_longevity_digest.md`

This is in addition to the primary sweep file, not instead of it.
