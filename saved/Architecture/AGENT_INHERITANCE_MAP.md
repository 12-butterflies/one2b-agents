# AGENT INHERITANCE MAP

**Version:** v1.0 | **Date:** 2026-07-01
The consolidation is at the CHAT layer only. Every agent and skill you built stays live. Merging chats does not delete a single capability. Each of the 8 chats inherits the specific agents and skills of the chats it absorbed. This file proves nothing is lost.

---

## 1. CEO INTEL
Inherits: Fleet Router, Triage, the intel pipeline (ADOPT / IMPROVE / WATCH / DROP), INBOX queues (REPOS, PROMPTS, AGENTS, MCPS, INFRASTRUCTURE).
Skills: routing, curator, scout logic (interactive side).

## 2. JASON OS
Inherits: Jason Health Curator, Longevity Research Curator, the peptide protocol and four pass health gate.
Skills: `jason-daily-morning-briefing`, `consolidate-memory` (health), longevity sweep logic.

## 3. CORPORATE STRATEGY
Inherits: Business Strategy, Corporate Strategy, 12 Verticals, Portugal Innovation Hub, Singapore Tax and Tech, sovereign arc.
Skills: `internal-comms`, thesis and decisions logic.

## 4. CAPITAL
Inherits: Capital Readiness Curator, data-linked insurance product agent, Deal Screener, Capital Matching Agent, Investors, Advisors and Partners.
Skills: investor pipeline, Sentinel A3 on investor output.

## 5. REVENUE
Inherits: Sales cycle SOP, Data Sales Desk, Onboarding.
Skills: `data-sales-agent`, `onboarding-agent`.

## 6. STUDIO
Inherits: Studio Social, Studio Direct, Studio Words, Studio Design, Studio Motion.
Skills: `studio-social-agent`, `brand-guidelines`, `canvas-design`, `algorithmic-art`, `theme-factory`, `web-artifacts-builder`, `slack-gif-creator`.

## 7. DOCUMENT CREATOR
Inherits: Document Agent (NDAs, CPAs, commercial docs), brand and terminology check.
Skills: `generate-document`, `docx`, `pptx`, `pdf`, `xlsx`, `doc-coauthoring`.

## 8. BUILD (Claude Code)
Inherits: Agent Architecture, Platform Audit Agent, Fleet Health Audit Agent, Intel to Spec Adapter, Repo Reader, AI CDO / PDV platform build, Website Redesign.
Skills: `mcp-builder`, `skill-creator`, `platform-audit-agent`, `fleet-health-audit-agent`, `intel-to-spec-adapter-agent`, `repo-reader-agent`, `schedule`, `consolidate-memory` (infra).

---

## Managed Agents (run headless on cron, not chats)

CEO Daily Brief (7am), Scout intel sweep (6:30), Conversation Curator, Repo Reader (Wed and Sun), Intel to Spec Adapter (Wed and Sun), Fleet Health Audit (weekly), Jason morning briefings, Hourly banned recipient audit, Longevity weekly sweep, Verbatim transcript vault, NotebookLM regen, Perplexity Monday audit.

---

*Rule: consolidation merges the interface, never the capability. If a task needs a specific agent, its owning chat above already carries it. Nothing built is retired except the 4 duplicate CEO INTEL chats.*
