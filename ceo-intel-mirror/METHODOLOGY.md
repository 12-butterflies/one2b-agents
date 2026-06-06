# METHODOLOGY.md — Current Rules of Practice
**Last updated:** 2026-06-06
**Rule:** Every agent reads this. Only Jason writes to this (or CEO Brain after Sentinel A3 review). Updates require explicit Jason instruction.
**Relationship to TECH_HORIZON.md:** Candidates queue in TECH_HORIZON.md. Jason promotes them here. During 90-day calibration, nothing auto-merges.

---

## Section 1 — Operating principles (architectural constants)

**M-001: Surgical-update-with-approval-gate methodology**
Never write more than one substantive thing without showing the draft and waiting for line-by-line approval. Small steps, frequent checkpoints. No multi-file commits without prior review. Locked May 1, 2026.

**M-002: Just-the-two-of-us**
All runtime, MCP, deployment, and infrastructure work stays in the Jason + Claude scope. No delegating build tasks to external engineers without explicit instruction. Locked Apr 30, 2026.

**M-003: Trinity scope rule**
Every output serves one of three identities: One 2b, 12 Butterflies, or Jason personally. Every output is tagged. Cross-trinity outputs require explicit Jason approval. Locked May 1, 2026.

**M-004: Strategic implications first**
Lead with the answer. No preamble. No trailing summaries. Supporting detail follows the conclusion. Always.

**M-005: Stateless between invocations**
Agents accumulate no context across calls. The methodology layer is the only persistent memory. Per-session context comes from substrate files, not thread history.

**M-006: Swarm the checkers, never the thinkers**
Reviewers (Sentinel, Curator) run as parallel narrow swarms. Orchestrators (CEO Brain, Fleet Router) stay singleton with persistent context.

**M-007: Read-only reviewers**
Sentinel and Curator flag. They never act, route, or decide. Locked in Sentinel SKILL.md three laws.

---

## Section 2 — Terminology rules

**M-008: External insurance term**
External-facing content uses "data-linked insurance products." Internal shorthand: IGI acceptable in SKILL.md files and handoff payloads only. "IGI Insurance" is banned — redundant and potentially misrepresentative. Locked Jun 6, 2026.

**M-009: Sovereign arc**
Portugal = flagship pilot (live in production). Brazil + Colombia = next this year. Isle of Man = legislated after 3 years. Mozambique = not part of active pipeline. Never reversed. Locked Jun 6, 2026.

**M-010: Currency rules**
USD ($) for all projections and capital figures. EUR (€) for billing. Never GBP. No exceptions.

**M-011: Yield and financial projections**
Every yield, return, and forward-looking financial figure carries an asterisk (*). Standard disclaimer on any document carrying yield claims. Never "guaranteed" — always "target."

**M-012: Named individuals — banned**
Hendrick (any variant), Simona Anamaria Marinescu, Susan Bergin, Joshua Armah, Jamie Dixon, Kyle Turner, Carl Turner. "Stephan Rust" (misspelling). "Susan Pinedo" (misspelling). Former COO: reference generically as "the COO function."

**M-013: Correct spellings — locked**
Tesseract (capital T, not Tessaract). Stefan Rust (not Stephan). Aaron Astley. Susan Pinheiro (not Pinedo). One 2b (space, no hyphen).

---

## Section 3 — Communication rules

**M-014: Counterparty time framing**
Every commitment involving another person carries a specific time estimate. "From Stefan: ~15 min when you ping him" — not "pending Stefan's response." Vague timelines are planning failures.

**M-015: Subject-line-as-primary-classifier**
For intel routing: the email subject line is the primary classifier. Body content is secondary refinement. Locked May 3, 2026.

**M-016: Surface insights, not callbacks**
Curator files silently. Triage Top 10 frames items as recommendations, not "I remember when you forwarded X." Users want competence, not recall. Locked Apr 30, 2026.

**M-017: Anti-sales register**
Banned phrases: game-changing, revolutionary, disruptive, cutting-edge, uniquely positioned, best-in-class, excited to share, imagine a world where, here's the thing, in today's rapidly evolving landscape, at One 2b we believe. Test: would Jason cringe saying it to a friend? If yes, rewrite. Locked Jun 6, 2026.

**M-018: Brevity as hard rule**
Default response length: 2–4 sentences. Length is earned, not a default. No headers in conversational replies. No trailing summaries.

---

## Section 4 — Session and calibration rules

**M-019: Fresh session daily**
Start each session fresh with a context card. Never continue yesterday's thread. Substrate files are the memory, not thread length. Locked Jun 6, 2026.

**M-020: No ECOSYSTEM.md as session bootstrap**
Load sliced context only (context cards, per-agent manifests). ECOSYSTEM.md is never loaded as a session starter — it is a reference document, not a context loader.

**M-021: 90-day calibration — Context-only**
Sentinel stays in the Context layer through Day 90. No module-level updates. Methodology candidates queue in TECH_HORIZON.md. Nothing auto-merges. Locked Jun 5, 2026.

**M-022: Five-pass verification gate (peptides)**
Before any peptide dose answer: (1) date check, (2) read operational card, (3) confirm state matches protocol, (4) verify IU + mcg math, (5) check for off-protocol fabrication. No fabricated IU values, scheduling constraints, or etymologies. Locked May 25, 2026.
