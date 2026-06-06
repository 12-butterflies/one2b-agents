# DECISIONS.md — Architecture Decision Log
**Format:** Each entry: decision | why | date | status
**Rule:** Every important architectural decision gets logged here. Agents read this to understand what was decided and why. Updates require Jason's explicit instruction.

---

## 2026-06-05 / 2026-06-06 — Bootstrap session decisions

**D-001: Lean fleet confirmed at six Studio agents**
Decision: Studio Social, Studio Direct, Studio Words, Studio Motion, Studio Design, Document. No additions.
Why: Each owns one surface, no overlap. Document stays prefix-free (operationally distinct).
Status: Locked

**D-002: Fleet Router — build it**
Decision: Build a thin Fleet Router agent as single entry point for all human-originated requests.
Why: Makes routing explicit, debuggable, observable. Worth the overhead in v1.0.
Status: Locked — SKILL.md v0.1 complete

**D-003: CEO Intel as the substrate, not per-agent copies**
Decision: Every agent reads from CEO Intel. No agent maintains its own copy of any fact that exists there.
Why: Single source of truth. Prevents drift, reduces hallucination surface.
Status: Locked

**D-004: Activation order confirmed (Phases 1–7)**
Decision: Social → Direct → Words → Design → Motion → Document. Fleet Router activates with Phase 2.
Why: Dependency graph. Each phase's cross-agent handoffs are served by the prior phase.
Status: Locked

**D-005: Shared learning surface in CEO Intel**
Decision: Fleet Learning lives at `/CEO Intel/Fleet Learning/weekly/` and `/monthly/`. Weekly files 300-word cap.
Why: Cross-pollination mechanism. Agents read each other's weekly files before planning cycles.
Status: Locked

**D-006: 10-task onboarding gate per agent**
Decision: Each agent runs 10 tasks under Jason's explicit approval before standing authority activates.
Why: Calibration before autonomy. Investor-facing and sovereign content always require approval regardless.
Status: Locked

**D-007: Context-only through 90-day calibration (no Modules layer)**
Decision: Sentinel stays in the Context layer through Day 90. No module-level updates until calibration data matures.
Why: Premature module updates lock in early-stage biases. Context layer has untapped headroom.
Status: Locked — re-evaluate at Day 91 with clean dataset

**D-008: SDFT calibration pattern for Sentinel**
Decision: Sentinel calibrates on its own past expert-conditioned audits (Jason corrections), not external test sets.
Why: Sidesteps catastrophic forgetting. Running log of verdicts + corrections is the real training signal.
Status: Locked

**D-009: Sovereign arc — Portugal → Brazil → Colombia**
Decision: Portugal = flagship pilot (live in production). Brazil + Colombia = next this year. Isle of Man = legislated. Mozambique = dropped from active pipeline.
Why: Corrected from prior incorrect labelling (Mozambique as pilot). Portugal is the external reference.
Status: Locked

**D-010: jps@one2b.io as canonical outbound sending identity**
Decision: All system-drafted outbound emails send from jps@one2b.io. No other account sends on Jason's behalf without explicit instruction.
Status: Locked

**D-011: External insurance term — data-linked insurance products**
Decision: External-facing content uses "data-linked insurance products" not "IGI" or "Insurance Guarantee Instruments." IGI acceptable as internal shorthand in SKILL.md files and handoff payloads only.
Why: Plain English, no regulatory baggage, no misrepresentation risk.
Status: Locked

**D-012: Fresh session daily (no running threads)**
Decision: Each session type starts fresh daily with a context card. Never continue yesterday's thread.
Why: Long context = degraded accuracy. Substrate files are the memory, not thread length.
Status: Locked

**D-013: Separate context for Sentinel (always)**
Decision: Sentinel never runs inside the generating agent's context window. Always a fresh invocation receiving only the output.
Why: Contaminated context produces contaminated verdicts. The three laws must hold.
Status: Locked

**D-014: Sliced context manifests per agent**
Decision: Each agent reads only the CEO Intel files it needs. ECOSYSTEM.md is never loaded as a session bootstrap.
Why: Token cost, hallucination reduction. Agents reasoning over irrelevant context confabulate connections.
Status: Locked

**D-015: Monday.com stays — Plane migration deferred**
Decision: Stay on Monday.com. Plane migration deferred to 2026-07-06 review.
Why: Monday's automation stability. Plane's automation layer not yet mature enough.
Status: Locked — revisit 2026-07-06

**D-016: Anti-sales register locked in voice guide**
Decision: Banned phrases list (game-changing, revolutionary, excited to share, imagine a world where, etc.) locked into Jason voice guide and CEO context card. Test: would Jason cringe saying it to a friend?
Status: Locked
