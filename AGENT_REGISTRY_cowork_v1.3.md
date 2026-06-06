# Agent Registry — Single Source of Truth

**Version:** 1.3
**Date:** May 28, 2026 (v1.0 was April 30, 2026; v1.1 added Capital Readiness Curator, Designing Agent, Outreach Agent, Video Production Agent, and updated Tesseract Valuation Agent with the Skill Creator-pattern draft; v1.2 added Studio Social Agent and the three audit-layer agents — Platform Audit Agent, Fleet Health Audit Agent, Intel-to-Spec Adapter Agent; v1.3 adds Conversation Curator Agent as the canonical gate for all recorded conversation substrate)
**Maintainer:** AGENT ARCHITECTURE thread (CEO Brain logs every agent change here)
**Purpose:** One file lists every agent in the One 2b ecosystem, its status, dependencies, owner, eval criteria, and where its operational spec lives.

**Locked rules applied across this registry (per CLAUDE.md):**

- **Trinity scope (May 1, 2026)** — every agent declares whether it serves One 2b, 12 Butterflies, Jason personally, or all three. Single-tenant agents (e.g., Capital Readiness Curator, Tesseract Valuation Agent, Platform Audit Agent) are explicitly noted.
- **5-question judgment frame (May 1, 2026)** — Curator outputs use ADOPT / IMPROVE / WATCH / DROP verdicts. Schema in `SCOUT_CURATOR_ORCHESTRATION_v1.0.md` Section 5.
- **Surgical-update-with-approval-gate pattern (May 1, 2026)** — for any agent maintaining long-lived documents, line-level proposals + per-line Jason approval, never whole-document rewrites. Capital Readiness Curator is the first agent built on this pattern; Intel-to-Spec Adapter generalizes it across the fleet.
- **Just-the-two-of-us extension to creative work (May 1, 2026)** — Designing Agent / Outreach Agent / Video Production Agent / Studio Social Agent are agent-fleet-native rather than routed to Pam or other team members.
- **Skill Creator pattern as standard for new specialist agents (May 4, 2026)** — all v1.1+ agent specs use SKILL.md per the `Architecture/[AgentName]/` folder convention.
- **R-28 SWARM-default rule (May 6, 2026)** — every Sentinel and Fleet Health audit runs SWARM-mode by default with engineered token discipline; single-pass synthesis is the exception, logged explicitly.
- **Deep-analysis frame for external platforms (May 7, 2026)** — when Jason drops an external platform or repo, the four-part deep-analysis review applies (what it does / what it can do for us / where we should use it and why / how we will work together with Claude picking up maximum slack). Operationalized at twice-weekly cadence by the Intel-to-Spec Adapter Agent.

---

## How to read this registry

Every agent in the One 2b ecosystem is listed below with the following fields:

- **Name** — the agent's name
- **Type** — Thinker (singleton, persistent context) or Reviewer (ephemeral, swarm-capable) or Specialist (narrow domain executor)
- **Status** — `active`, `spec`, `planned`, `dormant`, `retired`
- **Spec location** — file path to operational spec
- **System prompt location** — file path to deployable system prompt
- **Owner** — person responsible for the agent's quality and evolution
- **Dependencies** — what must exist for the agent to function
- **Eval criteria** — how we know it works
- **Last updated** — when the agent's spec was last revised

---

## ORCHESTRATION LAYER

### CEO Brain
- **Type:** Thinker (singleton)
- **Status:** active (in "act as" mode; Jason + Claude runtime pending)
- **Spec location:** `/CEO Intelligence/Architecture/AGENT_SWARM_OPERATING_SYSTEM_v1.0.md` Part 5
- **System prompt:** `/CEO Intelligence/Architecture/CEO_BRAIN_SYSTEM_PROMPT.md`
- **Owner:** Jason (sponsor); the agent runs as the model in any CEO Intel thread
- **Dependencies:** Methodology layer (CLAUDE.md as canonical source — May 17, 2026 Option B repoint; INTEL_SCOPE.md for domain taxonomy; METHODOLOGY.md + DECISIONS.md + TECH_HORIZON.md DEPRECATED in place), Sentinel for review
- **Eval criteria:** routing accuracy 90%+, Sentinel pass rate 85%+, decision capture 95%+, zero hallucinations per week
- **Last updated:** 2026-04-30

---

## REVIEWER LAYER

### Sentinel
- **Type:** Reviewer (swarm of six sub-checkers, ephemeral)
- **Status:** active (in "act as" mode; full runtime pending)
- **Spec location:** `/CEO Intelligence/Architecture/AGENT_SWARM_OPERATING_SYSTEM_v1.0.md` Part 1
- **System prompt:** embedded in spec, Section 1.2
- **Sub-checker rulesets:**
  - Plan critique → `/CEO Intelligence/Architecture/Rules/RULES_PLAN_CRITIQUE.md`
  - Stakeholder check → `/CEO Intelligence/Architecture/Rules/RULES_STAKEHOLDER.md`
  - Terminology audit → `/CEO Intelligence/CLAUDE.md` (canonical methodology source — May 17, 2026 Option B repoint)
  - Risk flag detection → `/CEO Intelligence/Architecture/Rules/RULES_RISK_FLAGS.md`
  - Drift diagnostic → reads `/CEO Intelligence/CLAUDE.md` (canonical — May 17, 2026 Option B repoint; METHODOLOGY.md + DECISIONS.md + TECH_HORIZON.md DEPRECATED in place)
  - Hallucination detection → `/CEO Intelligence/Architecture/Rules/RULES_HALLUCINATION.md`
- **Owner:** Jason (final calibration); CEO Brain (operational dispatching)
- **Dependencies:** the four ruleset files above plus the methodology layer
- **Eval criteria:** catch rate 95%+, false positive rate under 5%, latency targets per tier (A1 < 200ms, A2 < 1s, A3 < 3s), Mode B daily completes in 10 min
- **Last updated:** 2026-04-30

### Curator (per-domain swarm)
- **Type:** Reviewer (one ephemeral instance per intel item, parameterized by domain)
- **Status:** spec (operational once Scout is wired)
- **Spec location:** `/CEO Intelligence/Architecture/AGENT_SWARM_OPERATING_SYSTEM_v1.0.md` Part 3
- **System prompt:** embedded in spec, Section 3.2 (template; substitute domain at invocation)
- **Per-domain rulesets:** in the header of each `/CEO Intelligence/Intel/[DOMAIN]_INTEL.md` file (all 13 domains have rulesets as of 2026-04-30)
- **Owner:** Per-domain ownership maps to subject matter experts (Sean for INSURANCE, Carl for DATA_VALUATION, Aaron for SOVEREIGN, etc.)
- **Dependencies:** Scout (triggers Curator per item); domain ruleset in each Intel file
- **Eval criteria:** signal/noise 70%+, cross-vertical accuracy 60%+, methodology candidate quality 25%+
- **Last updated:** 2026-04-30

---

## SPECIALIST AGENTS (THINKERS)

### Triage
- **Type:** Thinker (singleton, invoked on demand)
- **Status:** active (in "act as" mode; ready for use today)
- **Spec location:** `/CEO Intelligence/Architecture/AGENT_SWARM_OPERATING_SYSTEM_v1.0.md` Part 4 + `/CEO Intelligence/Architecture/TRIAGE_QUICKSTART_v1.0.md`
- **System prompt:** embedded in spec, Section 4.1
- **Owner:** Jason (the only person dumping into it); CEO Brain dispatches
- **Dependencies:** TASKS.md, IDEAS.md, STRATEGIES.md, Intel/* files, INTEL_SCOPE.md taxonomy
- **Eval criteria:** Top 10 quality (Jason actions 60%+ within 7 days), filing accuracy (under 10% re-files), 100% lossless
- **Last updated:** 2026-04-30

### Scout
- **Type:** Thinker (singleton, cron-driven; backlog mode for bulk)
- **Status:** spec (operational once Jason + Claude provision intel@one2b.io IMAP / OAuth)
- **Spec location:** `/CEO Intelligence/Architecture/AGENT_SWARM_OPERATING_SYSTEM_v1.0.md` Part 2
- **System prompt:** embedded in spec, Section 2.1
- **Owner:** Jason + Claude
- **Dependencies:** intel@one2b.io IMAP read credential, cron infrastructure, ability to spawn parallel Curator instances
- **Eval criteria:** inbox processing completeness 100%, classification accuracy under 10% re-routes, tag respect 100%
- **Last updated:** 2026-04-30

### Document Agent
- **Type:** Specialist Thinker (commercial and legal document generation, signature routing, filing)
- **Status:** active (in build phase from prior sessions)
- **Spec location:** `/CEO Intelligence/Document Agent/` folder (multiple files: schemas, skills, architecture)
- **System prompt:** `/CEO Intelligence/outputs/One2b_DocEngine_Skill_Prompt_2026-04-28_v1.0.md` (existing)
- **Owner:** Jason + Claude
- **Dependencies:** DocuSign MCP (active), DocSend (via Claude in Chrome), Gmail (active), Drive (active)
- **Eval criteria:** template fidelity (pixel-true clones), correct signature routing, audit log completeness, Sentinel A3 pass rate
- **Last updated:** 2026-04-28 (prior session)

### Tesseract Valuation Agent
- **Type:** Specialist Thinker (data valuation customer journey)
- **Trinity scope:** single-tenant One 2b
- **Status:** spec (Skill Creator-pattern draft landed 2026-05-04; activation pending Jason's line-level review and Tesseract v2 platform readiness)
- **Spec location:** `/CEO Intelligence/Architecture/TesseractValuationAgent/SKILL.md` (v1.1 via Skill Creator pattern, 2026-05-04). Earlier spec at `/CEO Intelligence/Architecture/TESSERACT_V2_SIMPLIFICATION_SPEC_v1.0.md` (V2 customer journey reference)
- **System prompt:** embedded in `TesseractValuationAgent/SKILL.md` YAML frontmatter and body
- **Owner:** Carl Weir (data leadership lead); Mark Acosta + Mark Jennings-Bates (Co-CDO methodology QA, required reviewers on final reports); Aswad Martin (Income approach DCF); Sean Yeo (CRO required for Data Linked Insurance Products handoff); Maria Santamaria (legal triggers); Aaron Astley (sovereign counterparty); Jason + Claude (platform integration)
- **Dependencies:** Tesseract v2 platform back-end, Truflation feed integration, Aswad's algorithmic derivation engine, Insurance Agent v1.0 (for Day 21 handoff if customer opts in), Cookiy (optional Phase 1 customer-discovery sub-tool — pending PD-010 activation)
- **Eval criteria:** Phase 1 acceptance ≤ 1 day; Phase 5 reconciliation ≤ 21 days; Sentinel A3 GREEN on first pass on final report; 100% IVSC compliance; per-stakeholder sign-off documented in audit log
- **Last updated:** 2026-05-04 (v1.1 via Skill Creator pattern)

### Insurance and Project Financing Agent v1.1
- **Type:** Specialist Thinker (data linked insurance product methodology layer, premium pricing, captive phasing, regulatory framing, PLUS project financing structure methodology — v1.1 scope expansion 2026-06-03 PM Jason direct)
- **Status:** SPEC LANDED 2026-06-03 PM Lisbon. Operational from first invocation. Phase 2 team sharing target September 1, 2026 (Sean Yeo direct access).
- **Spec location:** [/Architecture/InsuranceAgent/SKILL.md](computer:///Users/jasonpeterstevens/Documents/Claude/Projects/CEO%20Intelligence/Architecture/InsuranceAgent/SKILL.md)
- **Trinity scope:** Single tenant One 2b
- **Methodology counterparty:** Sean Yeo (Chief Risk Officer) — required round trip on every STRUCTURE / PRICING / UNDERWRITING / REGULATORY / CAPTIVE-PHASING proposal
- **Pattern:** Surgical update with dual approval gate (Jason then Sean for methodology). Mirrors Capital Readiness Curator pattern with added specialist round trip.
- **Dependencies:** Daloopa + Bigdata + Finance plugins (four engine layering on insurance facing material), Sentinel A1 banned terms scan, Capital Readiness Curator integration for LP brief insurance sections
- **R-31 enforcement:** Hard fails on IGI, RGB, named insurers, GBP, "guaranteed" without asterisks, "Tessaract" misspelling. Required terms: "data linked insurance product," "registered Lloyd's of London broker," "major global insurance conglomerates," locked captive phasing language.
- **Eval criteria:** Trigger accuracy 60%+; proposal precision (Jason gate) 70%+; Sean round trip latency under 48 hours (under 24 hours sovereign DD); banned term catch rate 100%; methodology drift catch rate 100%; stale content debt trending down
- **Supersedes:** prior "IGI Insurance Agent" stub (April 30, 2026), retired alongside the May 28 IGI lockout
- **Last updated:** 2026-06-03 PM Lisbon

### Capital Matching Agent
- **Type:** Specialist Thinker (investor ↔ data owner matching, fee disclosure)
- **Status:** spec (operational Q4 2026+ when Capital Matching Platform launches)
- **Spec location:** `/CEO Intelligence/Architecture/SPECIALIST_AGENT_PROMPTS.md`
- **System prompt:** in same file
- **Owner:** Jason (sponsor); Johnny Slattery (sales engine when on-board); Sean Yeo (insurance gating)
- **Dependencies:** Capital Matching Platform back-end, Insurance Agent v1.0 (for insured-asset matching), investor and data-owner profiles in Tessera
- **Eval criteria:** match relevance, fee disclosure compliance, no commitment of capital (One 2b does NOT provide capital)
- **Last updated:** 2026-04-30

### Capital Readiness Curator
- **Type:** Specialist Thinker (long-lived data-room maintenance via surgical-update pattern)
- **Trinity scope:** single-tenant One 2b (the data room itself is deal-specific)
- **Status:** spec (drafted 2026-05-04; activation pending Jason's line-level review of the spec plus four first-time-setup config answers)
- **Spec location:** `/CEO Intelligence/Architecture/CapitalReadinessAgent/SKILL.md` plus `QUICKSTART.md` in the same folder
- **System prompt:** embedded in SKILL.md YAML frontmatter and body
- **Owner:** Jason (sole approver per the hard rule); Claude (drafts and surgical-update production); Maria for any document with legal triggers (term sheets, RED counterparties, deal value over USD 1M)
- **Dependencies:** the live Capital Readiness two-layer setup (relock May 4, 2026) — MD source-of-truth at `/CEO Intelligence/Capital Readiness/LIVE_DATA_ROOM.md` (where the Curator operates) plus the Google Drive Capital Readiness Framework folder (id: `1uulNW_Qjs6Q_igSp5AVNsffwnFgHikuy`) for binary publish surfaces; methodology layer (DECISIONS.md, METHODOLOGY.md, CAPITAL_INTEL.md, FOUNDER_INTEL.md) for change-event detection; Sentinel A3 SWARM for per-proposal review; optional Cookiy integration for post-pitch investor follow-up surveys (pending PD-010 activation)
- **Eval criteria:** trigger accuracy 60%+; proposal precision (approved without revision) 70%+; revised proposal precision 90%+; Sentinel A3 catch rate 90%+; time-to-application under 12 hours for HIGH-priority change events; stale-content debt trending down month over month
- **Hard rule:** no live-folder modification without Jason's per-line confirmation. Surgical line-level only. Pattern is reusable for F&F deck, master deck, Data Linked Insurance Products methodology doc, sovereign briefing packs, autobiography draft.
- **Last updated:** 2026-05-04

### Designing Agent
- **Type:** Specialist Thinker (creative production across three brand identities)
- **Trinity scope:** all three (One 2b brand + 12 Butterflies brand + Jason personal — autobiography visuals, Life OS visuals, public-positioning imagery)
- **Status:** spec (drafted 2026-05-04 as the first of three creative-fleet agents per CLAUDE.md just-the-two-of-us extension to creative work; activation pending Jason's line-level review and five first-time-setup config answers)
- **Spec location:** `/CEO Intelligence/Architecture/DesigningAgent/SKILL.md`
- **System prompt:** embedded in SKILL.md YAML frontmatter and body
- **Owner:** Jason (final approval on every external publish); Claude (production work per the just-the-two-of-us rule); Pam Bristow on brand-level commercial calls only; Susan Pinheiro on narratively-sensitive external materials; Maria on any external-facing material with legal claims
- **Dependencies:** brand guidelines per identity (locations TBD per first-time-setup), Sentinel A3 review on every draft, optional Cookiy integration for pre-publish user testing (pending PD-010 activation)
- **Eval criteria:** brief clarity rate (trinity scope explicit on first pass) 90%+; first-pass approval rate 60%+; surgical-update precision 70%+; cross-trinity bleed events 0; Sentinel A3 catch rate 90%+
- **Hard rule:** no external publish without per-asset Jason confirmation. Trinity scope mandatory on every brief.
- **Last updated:** 2026-05-04

### Outreach Agent
- **Type:** Specialist Thinker (cross-channel outbound communication across three identities)
- **Trinity scope:** all three (One 2b GTM + 12 Butterflies brand + Jason personal positioning — LinkedIn, social, cold reachout, podcast pitches, sovereign engagement letters, partner intros)
- **Status:** spec (Skill Creator-pattern draft 2026-05-04; activation pending Jason's line-level review and seven first-time-setup config answers)
- **Spec location:** `/CEO Intelligence/Architecture/OutreachAgent/SKILL.md`
- **System prompt:** embedded in SKILL.md YAML frontmatter and body
- **Owner:** Jason (final approval on every external send); Claude (production per just-the-two-of-us rule); Pam Bristow on brand-level commercial calls only; Susan Pinheiro on narratively-sensitive messaging; Maria for legal-trigger outreach; Sean Yeo for IGI-related; Aaron for sovereign-counterparty
- **Dependencies:** brand guidelines per identity (shared with Designing Agent), Sentinel A3 review on every draft, channel integrations (LinkedIn via Claude in Chrome, email via Document Agent for high-stakes, Gmail direct for low-stakes, DMs via Claude in Chrome, podcast pitches via email)
- **Eval criteria:** brief clarity rate 90%+; first-pass approval rate 60%+; surgical-update precision 70%+; cross-trinity bleed events 0; Sentinel A3 catch rate 90%+; reply rate per channel tracked but not target-set; sequence completion rate 80%+
- **Hard rule:** no external send without per-message Jason confirmation. Trinity scope mandatory.
- **Last updated:** 2026-05-04 (Skill Creator-pattern draft)

### Video Production Agent
- **Type:** Specialist Thinker (video creation and editing across three identities)
- **Trinity scope:** all three (One 2b explainer / pitch / sovereign briefing video, 12 Butterflies vision content, Jason personal — autobiography visuals, podcast appearances, thought-leadership clips)
- **Status:** spec (Skill Creator-pattern draft 2026-05-04; activation pending Jason's line-level review and seven first-time-setup config answers)
- **Spec location:** `/CEO Intelligence/Architecture/VideoProductionAgent/SKILL.md`
- **System prompt:** embedded in SKILL.md YAML frontmatter and body
- **Owner:** Jason (final approval on every external publish); Claude (production per just-the-two-of-us rule); Pam Bristow on brand-level commercial calls only; Susan Pinheiro on narratively-sensitive video; Maria for legal-trigger video; Sean Yeo for IGI-related; Aaron for sovereign-counterparty
- **Dependencies:** video-tool integrations (Luma Labs, Higgsfield, Mirofish, kling-3, openart.ai — vendoring sequence per PD-T-01); Sentinel A3 review on every draft; brand guidelines per identity (shared with Designing Agent and Outreach Agent for the three-agent creative fleet)
- **Eval criteria:** brief clarity rate 90%+; first-pass approval rate 50%+ (lower than other agents because video production is more variable); surgical-update precision 70%+; cross-trinity bleed events 0; Sentinel A3 catch rate 90%+; production-to-publish under 48 hours for Mode A; render cost per asset tracked per tool to inform vendoring
- **Hard rule:** no external publish without per-asset Jason confirmation. Trinity scope mandatory. Pacing carries voice as much as words do — pacing-voice mismatch is a Sentinel A3 catch.
- **Last updated:** 2026-05-04 (Skill Creator-pattern draft)

### Studio Social Agent
- **Type:** Specialist Thinker (public social presence across all three trinity identities)
- **Trinity scope:** all three (One 2b GTM social, 12 Butterflies brand social, Jason personal positioning across LinkedIn, X, Instagram, TikTok, YouTube, Threads, Bluesky, Mastodon, and 20+ other surfaces via Postiz)
- **Status:** spec (drafted 2026-05-07; activation pending Jason's line-level review and seven first-time-setup config answers)
- **Spec location:** `/CEO Intelligence/Architecture/StudioSocialAgent/SKILL.md`
- **System prompt:** embedded in SKILL.md YAML frontmatter and body
- **Owner:** Jason (final approval on personal-trinity content + standing publication authority gate); Claude (production per just-the-two-of-us rule — calendar, copy, distribution, metrics ingestion, weekly synthesis); Pam Bristow on brand-level commercial calls only; Susan Pinheiro on complex narrative or crisis communications; Sean Yeo for IGI-touching posts; Maria for forward-looking financial language; Aaron for sovereign-engagement references; Stefan Rust for Truflation partnership amplification
- **Dependencies:** Postiz plugin (already installed — primary distribution layer for 28+ channels), Brand Voice plugin (already installed — voice calibration per identity), Bright Data plugin (metrics fallback when platform APIs are rate-limited), Designing Agent (visual asset commissioning), Video Production Agent (video commissioning), Outreach Agent (1:1 hand-off on hot DMs from public posts), Common Room (account research on inbound social signals), Sentinel A2/A3 review on every external publish
- **Eval criteria:** trinity-identity correctness rate 100%; RED-flag catch rate 95%+; cadence adherence 90%+; quarterly-thesis ladder rate 80%+; hand-off cleanliness to Outreach Agent 100%; stakeholder false-positive rate inside the 60-90% band (signal that standing-authority is calibrated correctly)
- **Hard rule:** no external publish without trinity-identity confirmation at conception step. RED-flag list (insurance regulation claims, named insurers, sanctioned geographies, personal vulnerability content, yield language without asterisk, GBP, Praj reference, etc.) is non-negotiable.
- **Last updated:** 2026-05-07 (v0.1 draft)

### Tessera (with Kaleidoscope matching engine)
- **Type:** Specialist Thinker (people platform onboarding) + Reviewer swarm (Kaleidoscope per-vertical Curators)
- **Status:** spec (Phase 0 — spec confirmation; Phase 1 build pending Drive access for 12 Butterflies materials)
- **Spec location:** `/CEO Intelligence/Architecture/TESSERA_KALEIDOSCOPE_SPEC_v1.0.md`
- **System prompt:** embedded in spec
- **Owner:** Jason (sponsor); Christian Casazza (product strategy); Ahmer Inam (UX/adoption); Aswad Martin (matching algorithm)
- **Dependencies:** `jps@12butterflies.life` Drive access for 12 Butterflies materials, Jason + Claude for runtime, eventually voice concierge infrastructure (Phase 4)
- **Eval criteria:** member experience reaction ("most interesting dinner of my year" frame), match value (intros producing real outcomes), cross-vertical bleed accuracy
- **Last updated:** 2026-04-30

### Legal Agent v1.0
- **Type:** Specialist Thinker (legal review methodology layer, NDA triage classification, contract playbook deviation flagging, regulated counterparty classification, sovereign legal framing, compliance posture)
- **Status:** SHIPPED 2026-06-03 PM Lisbon. Phase 2 team sharing target November 1, 2026 (later than Insurance and Tesseract Valuation because light touch posture means lower Phase 1 calibration volume per the May 13 restraint rule).
- **Spec location:** [Legal Agent v1.0 SKILL.md at /Architecture/LegalAgent/SKILL.md](computer:///Users/jasonpeterstevens/Documents/Claude/Projects/CEO%20Intelligence/Architecture/LegalAgent/SKILL.md)
- **Labeled copy:** [LegalAgent_v1.0_SKILL.md in SKILL Catalog](computer:///Users/jasonpeterstevens/Documents/Claude/Projects/CEO%20Intelligence/Architecture/SKILL_Catalog/LegalAgent_v1.0_SKILL.md)
- **Trinity scope:** Single tenant One 2b
- **Runtime profile:** STRICT under light touch posture per May 13 restraint rule
- **Methodology counterparty:** Maria Santamaria (Mili) — reengages ONLY on the four locked criteria (Jason asks, counterparty escalates, document requires legal review per existing policy, Jason senses counterparty cares only about money)
- **Pattern:** Surgical update with conditional dual approval gate (Jason primary; Mili added only when criteria fire). Mirrors Insurance Agent pattern but with narrow gating subset.
- **Dependencies:** Document Agent (Legal Agent classifies; Document Agent generates), Capital Readiness Curator (LP positioning integration), Insurance and Project Financing Agent (sibling specialist), Tesseract Valuation Agent (sibling specialist), Sales Funnel Agent (auto routes legal review on Stage Won transitions over USD 1M), Onboarding Agent v2.0 (auto routes legal review for regulated counterparties).
- **R-31 enforcement:** Hard fails on "Maria" alone, "Milli" double l, named insurers, IGI, GBP, guaranteed yields. Required: "Maria Santamaria (Mili)" first reference then "Mili", light touch posture framing, standard delegation language.
- **Eval criteria:** Trigger accuracy 60%+; proposal precision (Jason gate) 70%+; Mili engagement ratio under 20% (light touch compliance); Mili round trip latency under 48 hours non urgent / under 24 hours sovereign DD; triage accuracy 90%+ on GREEN, 80%+ on YELLOW, 95%+ on RED; banned term catch rate 100%
- **Last updated:** 2026-06-03 PM Lisbon

### Narrative Agent v1.0
- **Type:** Specialist Production Agent (investor narrative, deck copy, sovereign briefing pack narrative, capital pitch language, 12 Butterflies brand storytelling, Jason personal positioning copy)
- **Status:** SHIPPED 2026-06-04 AM Lisbon.
- **Spec location:** [Narrative Agent v1.0 SKILL.md at /Architecture/NarrativeAgent/SKILL.md](computer:///Users/jasonpeterstevens/Documents/Claude/Projects/CEO%20Intelligence/Architecture/NarrativeAgent/SKILL.md)
- **Labeled copy:** [NarrativeAgent_v1.0_SKILL.md in SKILL Catalog](computer:///Users/jasonpeterstevens/Documents/Claude/Projects/CEO%20Intelligence/Architecture/SKILL_Catalog/NarrativeAgent_v1.0_SKILL.md)
- **Trinity scope:** Trinity scoped (One 2b commercial + 12 Butterflies brand + Jason personal positioning)
- **Runtime profile:** STANDARD
- **Methodology counterparty:** Jason direct primary; Capital Readiness Curator integration partner; product trinity specialists upstream
- **Pattern:** Surgical update with Jason direct approval gate. Three operating modes (refresh, net new, repurpose).
- **Dependencies:** Tesseract Valuation Agent, Insurance and Project Financing Agent, Capital Matching Agent, Legal Agent (upstream methodology sources); Capital Readiness Curator (integration partner); Designing Agent, Video Production Agent, Outreach Agent, Document Agent (siblings).
- **R-31 enforcement:** Hard fails on IGI, RGB, named insurers, guaranteed yields, Pam routing references, Uma references, cross trinity bleed, hyphens in prose per June 2 lock. Required: yield asterisks, "Maria Santamaria (Mili)" first reference then "Mili", trinity identity declared per piece.
- **Eval criteria:** Brief clarity rate 90%+ (trinity identity explicit); first pass approval rate 60%+; surgical update precision 70%+; cross trinity bleed events 0; upstream methodology fidelity 100%; R-31 catch rate 100%
- **Replaces:** Prior external default routing for investor narrative work per May 22 PM Pam routing lockout
- **Last updated:** 2026-06-04 AM Lisbon

### Jason Health Curator v1.0
- **Type:** Specialist Thinker (health, peptide protocol, training, longevity, biometric methodology layer)
- **Status:** SHIPPED 2026-06-04 PM Lisbon. Closes trinity scope coverage on the personal leg.
- **Spec location:** [Jason Health Curator v1.0 SKILL.md at /Architecture/JasonHealthCurator/SKILL.md](computer:///Users/jasonpeterstevens/Documents/Claude/Projects/CEO%20Intelligence/Architecture/JasonHealthCurator/SKILL.md)
- **Labeled copy:** [JasonHealthCurator_v1.0_SKILL.md in SKILL Catalog](computer:///Users/jasonpeterstevens/Documents/Claude/Projects/CEO%20Intelligence/Architecture/SKILL_Catalog/JasonHealthCurator_v1.0_SKILL.md)
- **Trinity scope:** Single tenant Jason personally only
- **Runtime profile:** STANDARD
- **Methodology counterparty:** Jason direct (no external specialist; clinicians enter as advisors via specific Jason direct invocation)
- **Pattern:** Surgical update with Jason direct approval gate plus four pass rule on every dose answer per May 23 lock.
- **Dependencies:** Canonical Peptide Protocol Reference, Pepguard catalog, Operational Peptide Card v1.0, Peptide Diary, JASON OS state file. Sibling integration partner: Longevity Research Curator. Daily integration: jason-daily-morning-briefing scheduled task at 6:34 AM Lisbon.
- **R-31 enforcement:** Hard fails on mcg only doses, SKU first naming, fabricated etymology / dose / supply, Luke & Bex used as catalog source (should be Pepguard), Pepguard used as contact relationship reference (should be Luke & Bex). Required: IU first, chemical name leads, source trace per dose, heavy training default.
- **Eval criteria:** Trigger accuracy 60%+; four pass rule compliance 100%; daily briefing methodology supply latency under 60 seconds; IU compliance 100%; chemical name leads compliance 100%; fabricated value catch rate 100%; source trace compliance 100%
- **Last updated:** 2026-06-04 PM Lisbon

### Longevity Research Curator v1.0
- **Type:** Specialist Research Agent (weekly longevity research sweep across five canonical streams)
- **Status:** SHIPPED 2026-06-04 PM Lisbon. Existing scheduled task `longevity-research-weekly-sweep` (Sunday 6:00 PM Lisbon) canonicalised by this spec.
- **Spec location:** [Longevity Research Curator v1.0 SKILL.md at /Architecture/LongevityResearchCurator/SKILL.md](computer:///Users/jasonpeterstevens/Documents/Claude/Projects/CEO%20Intelligence/Architecture/LongevityResearchCurator/SKILL.md)
- **Labeled copy:** [LongevityResearchCurator_v1.0_SKILL.md in SKILL Catalog](computer:///Users/jasonpeterstevens/Documents/Claude/Projects/CEO%20Intelligence/Architecture/SKILL_Catalog/LongevityResearchCurator_v1.0_SKILL.md)
- **Trinity scope:** Trinity scoped (Jason primary; 12 Butterflies and One 2b secondary when research is commercially relevant)
- **Runtime profile:** STANDARD
- **Methodology counterparty:** Jason direct (advisors enter via specific Jason direct invocation — Dr. Alex Layendecker on space biology and longevity, Dr. Franklin Roye sector expertise)
- **Pattern:** Weekly sweep across five canonical streams with mandatory confidence flag taxonomy (PEER REVIEWED / CLINICAL TRIAL / COMMUNITY EVIDENCE / INSTITUTIONAL INTEL). Surfaces signals; Jason decides adoption.
- **Dependencies:** PubMed / bioRxiv / Consensus / ClinicalTrials.gov MCPs (bio-research plugin), Apple Mail sweep at intel@one2b.io, News & Intel Watchlist Monday board, Jason Health Curator (sibling — methodology refinement integration).
- **R-31 enforcement:** Hard fails on claims without confidence flag, fabricated citation, AI generated source URL that does not resolve.
- **Eval criteria:** Confidence flag compliance 100%; source URL compliance 100%; fabrication catch rate 100%; methodology refinement adoption rate 30 to 50%
- **Last updated:** 2026-06-04 PM Lisbon

### Bio / LinkedIn Enrichment Agent v1.0
- **Type:** Specialist Production Agent (counterparty bio refresh, Contact Card maintenance, enrichment ladder execution)
- **Status:** SHIPPED 2026-06-04 PM Lisbon.
- **Spec location:** [Bio LinkedIn Enrichment Agent v1.0 SKILL.md at /Architecture/BioLinkedInEnrichmentAgent/SKILL.md](computer:///Users/jasonpeterstevens/Documents/Claude/Projects/CEO%20Intelligence/Architecture/BioLinkedInEnrichmentAgent/SKILL.md)
- **Labeled copy:** [BioLinkedInEnrichmentAgent_v1.0_SKILL.md in SKILL Catalog](computer:///Users/jasonpeterstevens/Documents/Claude/Projects/CEO%20Intelligence/Architecture/SKILL_Catalog/BioLinkedInEnrichmentAgent_v1.0_SKILL.md)
- **Trinity scope:** Trinity scoped (all three identities — One 2b counterparties, 12 Butterflies community, Jason personal network)
- **Runtime profile:** STANDARD
- **Methodology counterparty:** Jason direct (advisors enter via specific Jason direct invocation)
- **Pattern:** Enrichment ladder (Apollo → ZoomInfo → Common Room → Nimble → Bright Data LinkedIn → verified public sources). Sibling to Document Agent (Document Agent generates; Bio Enrichment supplies verified bio data inside the document plus Contact Card substrate).
- **Dependencies:** Apollo, ZoomInfo, Common Room, Nimble (bio MCPs), Bright Data Scraping Browser (LinkedIn fallback), Contact Cards substrate at /CEO Intelligence/Contacts/Active/. Triggered by Sales Funnel Agent INTAKE, Onboarding Agent v2.0 Trigger A/B/C/D, Document Agent template fill, Capital Readiness Curator capital allocator surgical updates, weekly Monday 11:30 Lisbon Contact Card staleness audit.
- **R-31 enforcement:** Hard fails on fabricated bio claim, missing source attribution, banned recipient enrichment, GBP, named insurance houses. Required: source URL or platform attribution inline, banned recipient check before every enrichment, "Maria Santamaria (Mili)" first reference then "Mili".
- **Eval criteria:** Source attribution compliance 100%; fabrication catch rate 100%; enrichment ladder success rate 80%+; pre meeting refresh latency under 60 minutes
- **Last updated:** 2026-06-04 PM Lisbon

---

## AUDIT LAYER (drafted 2026-05-07 per Jason's "build it like a beautiful thing" framing)

The audit layer is the meta-tier that keeps the production fleet honest. It does not produce external-bound content. It inspects the things that do — code, agent specs, intel arrivals — and surfaces drift before it compounds. Three agents, three non-overlapping surfaces.

### Platform Audit Agent
- **Type:** Specialist Reviewer (read-only weekly audit of code and agent runtime substrate)
- **Trinity scope:** single-tenant One 2b (12 Butterflies and Jason personally do not have material code surfaces; the agent runtime that supports the trinity is in scope)
- **Status:** spec (drafted 2026-05-07; activation pending Jason's line-level review + GitHub MCP authentication via `/mcp` in Cowork)
- **Spec location:** `/CEO Intelligence/Architecture/PlatformAuditAgent/SKILL.md`
- **System prompt:** embedded in SKILL.md YAML frontmatter and body
- **Owner:** Jason (final read on every report, RED-tier escalation gate); Claude (audit production); James Farrell (CTO) on RED-tier escalation only; Maria for legal-trigger code findings; Sean Yeo for insurance-integration code; Sanjeev Verma for regulated-jurisdiction code paths
- **Dependencies:** GitHub MCP authentication (Jason runs `/mcp` in Cowork — auto-flow not supported), local-machine read access to `.gmail-mcp-intel/`, launchd job definitions, scheduled-task SKILL.md files; engineering plugin's code-review and tech-debt skills
- **Eval criteria:** true-positive rate on RED findings 90%+; false-positive rate on RED findings under 10%; catch rate on landed bugs 70%+; audit coverage 100% of in-scope codebases per 30-day window; time-to-RED-escalation under 24 hours; pre-landing scrub clean rate 100%
- **Hard rule:** read-only by default. No PRs. No commits. No file modifications to in-scope codebases. Findings are observations; remediation is a separate Jason-approved flow. Pre-landing scrub for forbidden names applies to every audit report (no Praj, no banned terms, no GBP, no named insurers).
- **Cadence:** Mode A weekly read-only audit Sunday 22:00 Lisbon (default); Mode B triggered on major change events; Mode C quarterly deep-pass first Sunday of each quarter
- **Last updated:** 2026-05-07 (v0.1 draft)

### Fleet Health Audit Agent
- **Type:** Specialist Reviewer (SWARM-mode weekly audit of agent specs, master spec, registry, calibration logs)
- **Trinity scope:** N/A — the agent inspects the fleet that serves the trinity, not the trinity directly
- **Status:** spec (drafted 2026-05-07; activation pending Jason's line-level review and seven first-time-setup config answers)
- **Spec location:** `/CEO Intelligence/Architecture/FleetHealthAuditAgent/SKILL.md`
- **System prompt:** embedded in SKILL.md YAML frontmatter and body
- **Owner:** Jason (reads the synthesis paragraph in Monday's CEO brief; drills into the full report when flagged); Claude (audit production); no external escalation — findings surface fleet-internal gaps that the relevant individual agent's stakeholder routing then handles
- **Dependencies:** read access to every `/Architecture/*Agent/SKILL.md` file, the master spec at `/Architecture/AGENT_SWARM_OPERATING_SYSTEM_v1.0.md`, the agent registry at `/Architecture/AGENT_REGISTRY.md`, calibration logs (`SENTINEL_CALIBRATION_LOG.md`, `SCOUT_CALIBRATION_LOG.md`), the pending decisions queue
- **Eval criteria:** inconsistency catch rate 90%+; false-positive rate on configuration-freshness flags under 10%; brief-section length averaging 3-5 sentences; time-to-resolution after a flag under 14 days; token cost per run tracked
- **Hard rule:** read-only. No writes to agent SKILL.md files. No edits to methodology, master spec, or registry. Findings are observations; remediation is a separate Jason-approved surgical-update flow. Pre-landing scrub on every report. Coaching voice in the brief synthesis per CLAUDE.md May 5 voice rule.
- **Cadence:** weekly Sunday 22:00 Lisbon (default), triggered on major fleet changes (new agent, methodology lock, master spec evolution)
- **Last updated:** 2026-05-07 (v0.1 draft)

### Intel-to-Spec Adapter Agent
- **Type:** Specialist Reviewer (twice-weekly translator from intel arrivals to surgical-update proposals)
- **Trinity scope:** N/A — the agent translates intel that serves the trinity into proposals against agents that serve the trinity
- **Status:** spec (drafted 2026-05-07; activation pending Jason's line-level review and seven first-time-setup config answers)
- **Spec location:** `/CEO Intelligence/Architecture/IntelToSpecAdapterAgent/SKILL.md`
- **System prompt:** embedded in SKILL.md YAML frontmatter and body
- **Owner:** Jason (approves every proposal per line per the surgical-update flow); Claude (proposal production); Sentinel A2 runs on every batch of proposals before they land in `_drafts/`
- **Dependencies:** read access to all nine source queues (`PROMPTS_QUEUE.md`, `REPOS_QUEUE.md`, `AGENTS_QUEUE.md`, `MCPS_QUEUE.md`, `INFRASTRUCTURE_QUEUE.md`, `OPEN_QUESTIONS.md`, `IDEAS.md`, `STRATEGIES.md`, `Intel/[DOMAIN]_INTEL.md` files), read access to all target files (every agent SKILL.md, methodology files, master spec, registry, runbooks, `LIVE_DATA_ROOM.md`); operationalizes the May 7 deep-analysis frame for items tagged as external-platform drops
- **Eval criteria:** approval rate on proposals 70%+ in steady state; modification rate on approved proposals 30-50%; source-attribution accuracy 95%+; time-to-proposal under 5 days; coverage rate 80%+ of ADOPT/IMPROVE items receiving a proposal within 14 days; token cost tracked
- **Hard rule:** read-only on intel queues. No application without per-line Jason approval. Pre-landing scrub on every draft. One proposal per item per target file (no bundling). Conservative threshold — 80%+ confidence or no proposal.
- **Cadence:** twice-weekly Wednesday 21:00 Lisbon and Sunday 21:00 Lisbon (default); triggered mode on Jason's chat directive ("look at the last week's intel and generate spec proposals")
- **Last updated:** 2026-05-07 (v0.1 draft)

### Conversation Curator Agent
- **Type:** Specialist Reviewer (daily 06:00 Lisbon sweep + dispositional gate for recorded conversation substrate)
- **Trinity scope:** all three (One 2b + 12 Butterflies + Jason personally)
- **Status:** active v1.0 (specced 2026-05-28; first calibration run pending Jason's disposition reply on the 12:09 PM 2026-05-28 session)
- **Spec location:** `/CEO Intelligence/Architecture/ConversationCuratorAgent/SKILL.md`
- **Workflow guide:** `/CEO Intelligence/Architecture/ConversationCuratorAgent/MOBILE_DESKTOP_WORKFLOW_GUIDE.md`
- **Destruction log:** `/CEO Intelligence/Architecture/CONVERSATION_DESTRUCTION_LOG.md`
- **System prompt:** embedded in SKILL.md
- **Owner:** Jason (approves every disposition verdict per row); Claude (Curator generates morning brief verify section, executes verdicts, runs destruction); Sentinel A1 Job 7 spot-checks classifications weekly; Fleet Health Audit Check 7 scans output for R-31 staples drift weekly
- **Dependencies:** Zoom MCP (hosted meetings + in-person captures), Fireflies MCP (attended meetings), Apple Mail sweep ingestion folder (Voice Memos + iOS Native Call Recording transcripts forwarded to intel@one2b.io), JASON OS direct-drop folder, Contact Cards substrate at `/CEO Intelligence/Contacts/Active/`
- **Eval criteria:** classification accuracy 90%+ on commercial-vs-personal-vs-12B trinity routing; counterparty match accuracy 85%+ once first 30 recordings processed; destruction log zero content-leakage; disposition reply latency <24h average; auto-default rate <30% (most verdicts come from explicit Jason replies, not auto-default)
- **Hard rules:** default-DESTROY posture is universal; destruction log carries NO transcript content (only counterparty + timestamp + UUID + reason); KEEP-EXTRACT preserves verbatim in `/Inbox/_conversations-pending/_30day_recoverable/` for 30-day recovery window then auto-deletes; tool-agnostic ingestion (any new capture tool integrates via four canonical paths); inherits R-31 Pre-emit Staples Check (14 items including item 14 vendor capability verification)
- **Cadence:** daily 06:00 Lisbon sweep paired with Scout; morning brief assembly 06:30 Lisbon with "§ Conversations to verify" section between News and Decisions; verdict execution within 5 minutes of Jason's disposition reply
- **Calibration:** first-three-runs synchronous review per the May 27 PM onboarding discipline pattern; autonomous from Day 4 if accuracy spot-check >90%
- **Last updated:** 2026-05-28 (v1.0 ACTIVE pending first calibration run)

---

## INFRASTRUCTURE AGENTS (NOT YET DESIGNED)

### Methodology Update Promotor
- **Type:** Reviewer (ephemeral)
- **Status:** planned
- **Purpose:** When 90-day calibration ends, this agent will be the gate that promotes individual Curators or Sentinel sub-checkers from "queue for judgment" to "auto-merge with audit trail" based on signal-to-noise data.
- **Dependencies:** 90-day calibration data from Sentinel Mode B
- **Owner:** Jason
- **Last updated:** 2026-04-30

### Eval Runner
- **Type:** Reviewer (ephemeral, scheduled)
- **Status:** planned
- **Purpose:** Run the eval criteria for each agent on a regular cadence and report drift.
- **Dependencies:** Sentinel test set, per-agent eval criteria
- **Owner:** Jason + Claude
- **Last updated:** 2026-04-30

---

## DEPENDENCY GRAPH

```
                            Jason
                              ↑
                              │
                          CEO Brain
                              │
            ┌─────────────────┼─────────────────┐
            ↓                 ↓                 ↓
        Sentinel        Specialist Agents    Triage
       (reviewer)      (thinkers)            (thinker)
            │
   ┌────────┴────────┐
   ↓                 ↓
  Six              Curator
  sub-             (per-domain
  checkers         swarm)
                       ↑
                       │
                     Scout
                  (cron-driven)
                       ↑
                       │
              intel@one2b.io
```

---

## STATUS DASHBOARD (snapshot)

| Agent | Trinity scope | Status | Activation gate |
|---|---|---|---|
| CEO Brain | All three | Active ("act as" mode) | None — running now |
| Sentinel | All three | Active (SWARM topology operational per `SENTINEL_ORCHESTRATION_v1.0.md`) | None — invokable now via SWARM activation phrase |
| Triage | All three | Active ("act as" mode) | None — invokable now |
| Curator | All three | Active (5-question schema per `SCOUT_CURATOR_ORCHESTRATION_v1.0.md` Section 5) | Daily 06:04 Lisbon Scout cron operational |
| Scout | All three | Active (daily 06:04 Lisbon cron wired and tested via inaugural manual run) | Cowork Run-now click recommended for tool-permission pre-approval |
| Document Agent | One 2b | Active (build phase, pre-existing) | Continued template population |
| Tesseract Valuation Agent | One 2b | Spec (Skill Creator-pattern draft 2026-05-04) | Jason line-level review + Tesseract v2 platform |
| Capital Readiness Curator | One 2b | Spec (Skill Creator-pattern draft 2026-05-04) | Jason line-level review + four first-time-setup config answers |
| Designing Agent | All three | Spec (Skill Creator-pattern draft 2026-05-04) | Jason line-level review + five first-time-setup config answers |
| Outreach Agent | All three | Spec (Skill Creator-pattern draft 2026-05-04) | Jason line-level review + seven first-time-setup config answers |
| Video Production Agent | All three | Spec (Skill Creator-pattern draft 2026-05-04) | Jason line-level review + seven first-time-setup config answers + tool vendoring sequence |
| Studio Social Agent | All three | Spec (v0.1 draft 2026-05-07) | Jason line-level review + seven first-time-setup config answers + Postiz / Brand Voice / Higgsfield wiring |
| Platform Audit Agent | One 2b (single-tenant) | Spec (v0.1 draft 2026-05-07) | Jason line-level review + six first-time-setup config answers + GitHub MCP authentication via `/mcp` |
| Fleet Health Audit Agent | N/A (audits the fleet) | Spec (v0.1 draft 2026-05-07) | Jason line-level review + seven first-time-setup config answers |
| Intel-to-Spec Adapter Agent | N/A (translates intel into proposals) | Spec (v0.1 draft 2026-05-07) | Jason line-level review + seven first-time-setup config answers |
| IGI Insurance Agent | One 2b | Spec | Q4 2025 / Q1 2026 IGI catalog launch |
| Capital Matching Agent | One 2b | Spec | Q4 2026+ Platform launch |
| Tessera + Kaleidoscope | All three | Spec | Drive access + Phase 1 question validation |
| Methodology Update Promotor | All three | Planned | 90-day calibration data |
| Eval Runner | All three | Planned | Sentinel test set + Jason + Claude runtime |

---

## IDENTITY MAP — email addresses by purpose

Captured April 30, 2026 from CEO INTEL - BRAIN STORM thread. Use the right address per context:

| Address | Purpose | Status |
|---|---|---|
| `jps@12butterflies.life` | Jason's primary work email — daily correspondence | Live |
| `jps@one2b.io` | Historical platform-level architecture and calendar invite anchor (context only — forward platform work is in AGENT ARCHITECTURE thread, just Jason and Claude) | Live |
| `hello@one2b.io` | DocuSign primary, company-level signing identity (account ID `543d4762-71cd-491d-834f-6acada552263`) | Live |
| `partners@one2b.io` | DocSend tracking, investor and pitch deck shares | Live |
| `intel@one2b.io` | Scout intel ingestion — currently bound to Cowork Gmail MCP, all Curator/Triage/Intel/Architecture labels in place | Live |
| `12b@12butterflies.life` | Bright Data dashboard login | Live |

Never reference the former COO by name in any output (per METHODOLOGY.md rule). When using identities in deliverables, choose the address that matches the workstream's natural anchor, not the one closest to Jason's chair.

---

## CHANGE PROTOCOL

When you add, modify, or retire an agent:

1. Open the AGENT ARCHITECTURE thread
2. Make the change in the agent's spec file
3. Update this registry
4. Log the change to DECISIONS.md
5. If the change affects methodology rules, queue a candidate to TECH_HORIZON.md
6. Sentinel re-reads on next Mode B daily diagnostic and updates its checks

This file is the single source of truth. If two specs disagree, this registry wins; reconcile the discrepancy.
