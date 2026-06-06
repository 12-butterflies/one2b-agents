# Fleet Gap Analysis
**Date:** 2026-06-06
**Source:** Cowork CEO Intelligence fleet vs GitHub one2b-agents fleet

---

## Status summary

| Category | Old Cowork Fleet | GitHub Fleet | Gap |
|----------|-----------------|--------------|-----|
| Core agents | 21 | 17 (pre-today) | 8 missing |
| Specialty agents | ~13 | 6 (skills) | 7 missing |
| Scheduled tasks | 34 | 9 | 25 not wired |
| SKILL.md specs ported | — | 31 (after today) | — |

---

## Agents ported today (from old Cowork SKILL_Catalog)

| Agent | GitHub path | Notes |
|-------|-------------|-------|
| BioLinkedInEnrichmentAgent v1.0 | `skills/bio-linkedin-enrichment/` | Bio enrichment for counterparties |
| ConversationCuratorAgent | `skills/conversation-curator/` | 6am daily call/meeting curation |
| IntelToSpecAdapterAgent | `skills/intel-to-spec-adapter/` | Twice-weekly intel→spec bridge |
| JasonHealthCurator v1.0 | `skills/jason-health-curator/` | Personal health/peptide methodology |
| LegalAgent v1.0 | `skills/legal-agent/` | Legal methodology + Mili engagement rules |
| LongevityResearchCurator v1.0 | `skills/longevity-research-curator/` | Sunday 6pm longevity sweep |
| NarrativeAgent v1.0 | `skills/narrative-agent/` | Investor narrative, deck copy, positioning |
| RepoReaderAgent v1.0 | `skills/repo-reader/` | Wed+Sun repo analysis |
| InsuranceAgent v1.1 (archived) | `skills/igi-insurance-agent/SKILL_v1.1_from_cowork.md` | More detailed than current v1.0 |

---

## Still missing from GitHub (needs building or porting)

### Operational agents — build next
| Agent | Old Cowork Status | Priority | Notes |
|-------|------------------|---------|-------|
| **VideoProductionAgent** | Active spec | P1 | HeyGen/Suno/Adobe Motion wiring needed |
| **PlatformAuditAgent** | Active | P1 | Monday platform synthesis; has SKILL.md in old fleet |
| **OnboardingAgent** | Active, C-sweep triggered | P1 | IAP onboarding flow |
| **SingaporeTaxTechAgent** | Active spec | P2 | Singapore vertical positioning |
| **FleetHealthAuditAgent** | Active weekly | — | Subsumed into architecture-health-daily |
| **DesigningAgent** | Active | — | Split into studio-design + studio-motion + studio-direct |

### Scheduled tasks not wired to new fleet
Of the 34 old Cowork tasks, these have no equivalent in ~/.claude/scheduled-tasks/:
- `scout-daily-intel-ingestion-6am-lisbon` — runs in old Cowork only
- `conversation-curator-6am-lisbon` — runs in old Cowork only
- `fleet-health-audit-weekly` — Sunday 10pm, spec-consistency audit
- `repo-reader-wed-sun` — Wednesday + Sunday 21:30
- `intel-to-spec-adapter-wed-sun` — Wednesday + Sunday
- `longevity-research-weekly-sweep` — Sunday 6pm
- `weekly-intelligence-sweep` — weekly
- `weekly-notebooklm-bundle-regen` — Sundays 8pm
- `perplexity-spaces-monday-audit` — Monday AM
- `jason-os-state-refresh` — periodic
- `jason-os-weekly-memory-consolidation` — weekly
- `verbatim-transcript-vault-builder` — periodic

### Substrate / reference docs not ported
- `AGENT_SWARM_OPERATING_SYSTEM_v1.0.md` — master swarm operating system (reference)
- `SHARED_STANDING_RULES_HEADER.md` — canonical rules header all agents inherit
- `STANDING_RULES_CORE.md` — canonical standing rules (R-17, R-19, R-20, R-26, R-27, R-28, R-31)
- `SENTINEL_BEHAVIOR_RULES.yaml` — Sentinel behavioral rules
- 13 domain `*_INTEL.md` files from `/Intel/` folder
- `PENDING_DECISIONS_QUEUE.md` — open decisions (14 items, most dormant)
- `AGENT_REGISTRY_cowork_v1.3.md` — ported today, needs reconciliation with new fleet

---

## Critical architectural difference

The old fleet uses:
- `SHARED_STANDING_RULES_HEADER.md` — every agent inherits this header
- `STANDING_RULES_CORE.md` — R-series rules (R-17 through R-31+)
- R-31: every agent has a "staples check" before output

The new GitHub fleet uses:
- `CLAUDE.md` — master rules
- `skills/sentinel/rules/` — rule files
- Handoff schema

**These need reconciling.** The old fleet's R-series rules (especially R-17, R-19, R-20, R-26, R-27, R-28, R-31) are more battle-hardened than what's in the new fleet. They should be reviewed and merged into `CLAUDE.md` or Sentinel rules.

---

## Repos in the old REPOS_QUEUE (never read by RepoReader — it wasn't running)

Check `/CEO Intelligence/Architecture/REPOS_QUEUE.md` — these were filed but never evaluated since the RepoReader task was running in old Cowork only and the new fleet never had it.

---

## Recommended next actions

1. **Wire LongevityResearchCurator** as a weekly scheduled task (Sunday 6pm) — spec is now in GitHub
2. **Wire ConversationCurator** as a daily task (6am) — spec is now in GitHub
3. **Wire RepoReader** as Wed+Sun task — spec is now in GitHub
4. **Port STANDING_RULES_CORE.md R-series** into Sentinel rule files or CLAUDE.md
5. **Port the 13 Intel domain files** from old fleet into ceo-intel-mirror/Intel/
6. **Build VideoProductionAgent and PlatformAuditAgent** — specs exist in old Cowork, need porting
7. **Reconcile AGENT_REGISTRY** — old v1.3 vs new fleet (31 skills)
8. **Review REPOS_QUEUE** — queued repos never evaluated
