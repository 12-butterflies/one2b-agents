# Tech Horizon — Critical Flags
**Last updated:** 2026-06-06
**Source:** Week 18 + Week 19 Weekly Intelligence Sweeps

---

## 🔴 URGENT — EU AI Act, August 2, 2026 (< 60 days)

EU AI Act enforcement powers activate August 2, 2026 for high-risk Annex III systems.

**If Tesseract is Annex III:**
- Conformity assessment required (takes 6-12 months — we are past the runway)
- Technical documentation, CE marking, EU database registration
- Penalties: up to EUR 35M or 7% global annual turnover
- Programme cost: EUR 180K–420K per system

**Action required immediately:** Sanjeev Verma to confirm Tesseract Annex III status. If Annex III, escalate to Jason regardless of spend.

**Source:** [EU AI Act timeline](https://artificialintelligenceact.eu/implementation-timeline/) | Week 18 sweep

---

## 🔴 URGENT — Datavault AI Patent Threat

Datavault AI (NASDAQ: DVLT) issued U.S. Patent 12,596,819 "Method and System for Data Valuation and Secure Commercial Monetization Platform" — April 2026. Two further Notices of Allowance.

**Scope:** AI-driven data valuation, blockchain-tokenized data exchange, digital asset tax automation.

**Risk level:** MEDIUM-HIGH on positioning narrative. LOW on insurance defensibility (no insurance wrapper, no IVSC alignment).

**Differentiator:** Our moat is the insurance wrapper + IVSC alignment. Datavault has neither. Frame Tesseract around these two differentiators in all external content.

**Action:** Mark Acosta / Mark Jennings-Bates defensive IP audit of Tesseract methodology against these claims.

**Source:** [Datavault AI PR](https://ir.datavaultsite.com/news-events/press-releases/detail/449/datavault-ai-further-expands-ip-portfolio-with-new-patent) | Week 18 sweep

---

## 🔴 URGENT — IVSC 2028 Exposure Draft (Consultation open now)

IVSC Exposure Draft effective 31 January 2028 introduces explicit AI/technology requirements:
- IVS 104 Data and Inputs
- IVS 105 Valuation Models
- IVS 106 Documentation and Reporting

**Consultation closes during 2026.** Tesseract must demonstrate compliance with IVS 104/105/106 AI requirements to maintain "IVSC-aligned" claim into 2027-2028.

**Action:** Carl Weir / Mark Acosta to map Tesseract methodology against IVS 104/105/106 draft requirements. Submit response to IVSC consultation.

**Source:** [IVSC 2028 Exposure Draft](https://ivsc.org/wp-content/uploads/2026/02/IVS_effective_31_January-2028_Exposure-Draft-Summary-and-Consultation-Questions-Final_.pdf) | Week 19 sweep

---

## 🔴 SECURITY — Supabase vulnerabilities (if One 2b uses Supabase)

- **CVE-2026-31813:** Auth bypass via crafted OIDC ID tokens (Apple/Azure providers). Fixed in Supabase 2.185.0+
- **RLS bypass pattern:** Agents with service_role key can bypass all Row-Level Security. Direct risk if any Cowork/Gmail-MCP/Tesseract agent has service_role access
- **Lovable breach:** 170+ apps exposed via missing RLS policies

**Action:** James Farrell to audit Supabase usage across all agents. Confirm RLS on every table containing client/valuation/insurance data. Upgrade to 2.185.0+.

**Source:** Week 18 + 19 sweeps

---

## 🟡 CAPITAL POSITIONING — Insurance wrapper is the moat, not tokenization rail

Morgan Stanley, BlackRock, DTCC, NYSE-Securitize, Centrifuge-Monad, Ondo Global Markets all moving on tokenized issuance in 2026. The RWA tokenization narrative is now crowded.

**One 2b's defensible position:** the insurance wrapper, not the tokenization rail. All Capital Matching Platform pitches should lead with the IGI wrapper as the moat.

**Capital comparables to use in pitches:**
- ServiceNow: $80B re-rating from AI attach
- Cursor: $2B ARR in 24 months (AI-native growth rate)
- J.P. Morgan FO Report: family offices now 45-55% alternatives; private credit 10-15%
- Tokenized vehicles delivering 6-9%* yield — One 2b targets 5-7%* via IGI layer

**Source:** Week 18 + 19 sweeps

---

## 🟡 COMPETITIVE INTEL — Prediction Markets (a16z thesis)

Goldman, Tradeweb, Citadel/Millennium-class institutions beginning to adopt prediction markets. a16z published dedicated analysis. The pattern (new asset class from non-traditional information, institutional adoption following retail) is the same shape as IGI / data-as-collateral.

**Use in capital pitches:** "We are creating the same institutional adoption curve for data assets that prediction markets are creating for event-based instruments."

**Source:** [a16z prediction markets](https://a16z.com/prediction-markets-they-grow-up-so-fast/) | First Sweep Apr 30

---

## 🟢 TECH STACK — Agent Skills now industry standard

Anthropic donated MCP to Linux Foundation (Dec 2025). Agent Skills open standard adopted by OpenAI. Atlassian, Figma, Canva, Stripe, Notion, Zapier building partner skills.

**Implication:** One 2b's existing Skills + MCP architecture is now industry-standard infrastructure, not custom. Use this in the "7 named production systems" differentiator framing.

**Source:** [Anthropic Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) | Week 19 sweep

---

## 🟡 EU Data Act — September 12, 2026

Article 3(1) connected products obligation effective September 12, 2026.
Cloud switching and interoperability obligations effective same date.
Penalties: up to 4-5% global annual turnover.

Relevant to any EU-resident sovereign data flows (Portugal pilot).

**Source:** [EU Data Act timeline](https://www.fiskil.com/eu-data-act/timeline) | April 20 scratch notes

---

## 🟢 Thesis Validation — CoreWeave + Gallagher (April 2026)

CoreWeave secured $8.5B+ in GPU-backed asset loans — treating high-performance chips as collateral. Gallagher writing bespoke insurance policies for AI data centres with predetermined valuation methods.

**Why this matters:** This is the exact One 2b pattern applied to a different asset class (GPUs vs data). Insurers are already comfortable writing policies on novel assets when the valuation method is agreed upfront. Use this as a proof-of-concept comparator when explaining IGI to new counterparties.

**"No one doing this for data yet"** — competitive positioning intact as of April 2026.

**Source:** [CNBC April 2026](https://www.cnbc.com/2026/04/06/ai-data-centers-financing-insurance-deals-gpu-debt.html) | April 20 scratch notes

---

## 🟢 Agent Memory Architecture — Letta vs mem0 (evaluate for Sentinel/Curator)

Two leading agent memory architectures:
- **mem0** — pluggable memory layer, simple `add()`/`search()` API. Best for: external memory store for any agent. Context layer.
- **Letta (formerly MemGPT)** — full agent harness with persistent state, memory management built-in. Context-to-Modules layer.

**Relevance:** When graduating Sentinel/Curator from Context-only to Module-layer at Day 91, mem0 is the lowest-friction add. Letta requires more architectural work but gives full persistent state.

**Decision deferred:** Context-only through 90-day calibration period. Revisit at Day 91.

**Source:** [mem0 vs Letta 2026](https://vectorize.io/articles/mem0-vs-letta) | First Sweep Apr 30
