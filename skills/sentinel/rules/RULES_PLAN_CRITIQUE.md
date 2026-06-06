# Sentinel Job 1 — Plan Critique Rules
**Applies to:** Mode A2, A3, Mode B
**Purpose:** Identify structural gaps, missing dependencies, sequencing errors, and false-comfort timelines in any plan, proposal, or architectural decision before it executes.

---

## What counts as a plan

Any output that specifies: what will happen, in what order, with what dependencies, by when. Includes: SKILL.md lifecycle sections, architectural decisions, activation sequences, project plans, sprint plans, outreach sequences, deployment plans, business cases.

---

## Rule 1 — Dependency completeness

Every stated action must have its dependencies identified. If action B requires action A to complete first, A must be listed as a prerequisite.

**Flag when:**
- An action is listed without its prerequisites named
- A dependency is assumed but not verified (e.g., "DocuSeal will be deployed" without confirming the server exists)
- An agent is activated before its CEO Intel substrate files exist

**Finding format:** `Missing dependency: [action B] requires [action A] which is not confirmed complete.`

---

## Rule 2 — Sequencing validity

Dependencies must be in the correct order. Work that depends on another piece cannot be scheduled to start before that piece completes.

**Flag when:**
- Studio Social SKILL.md is called "ready" before Architecture v0.1 is locked at v1.0
- An agent handoff is specced before the receiving agent's SKILL.md exists
- A template is referenced before it has been built

**Finding format:** `Sequencing error: [item] is scheduled before [prerequisite] which is not yet complete.`

---

## Rule 3 — False-comfort timelines

A timeline is false-comfort if it requires an unrealistic rate of completion, assumes no friction, or ignores known blockers.

**Flag when:**
- A timeline assumes Jason's approval on the same day as a draft is produced (unless explicitly agreed)
- A timeline assumes a third-party dependency (DocuSign MCP beta access, OAuth from Higgsfield) will resolve by a specific date without confirmation
- A sprint is planned at 100% capacity with no buffer for review cycles
- A task is marked "complete" when it is "in progress"

**Finding format:** `False-comfort timeline: [item] scheduled for [date] but [dependency] is unconfirmed. Recommend: mark as tentative.`

---

## Rule 4 — Gap identification

Plans often specify what to do and omit what not to do, or what happens on failure.

**Flag when:**
- A plan has no failure path (what happens if the DocuSeal deploy fails? What if the counterparty rejects the NDA?)
- A plan activates an agent without specifying the onboarding gate (10-task requirement)
- A plan references a file that doesn't exist in the substrate
- A multi-agent flow has no error return path (calling agent must handle structured errors from called agents)

**Finding format:** `Gap: [plan item] has no [failure path | fallback | error return]. Recommend: specify or flag as assumption.`

---

## Rule 5 — Scope creep detection

Plans that expand beyond their stated scope without explicit authorization create architectural drift.

**Flag when:**
- A Studio agent is proposed to do something outside its surface definition (e.g., Studio Social generating legal language)
- A plan adds a new tool or MCP without going through the /intake classification
- A plan modifies the substrate (METHODOLOGY.md, DECISIONS.md, RED flags) without Jason's explicit instruction

**Finding format:** `Scope creep: [item] extends beyond [agent/surface] definition. Requires explicit authorization.`

---

## Calibration log format

When Jason corrects a Job 1 verdict, record:
```
DATE: [ISO]
OUTPUT REVIEWED: [one-line]
SENTINEL FINDING: [what Sentinel flagged]
JASON CORRECTION: [what was actually correct]
RULE ADJUSTMENT: [which rule was too strict / too loose / missing]
```
