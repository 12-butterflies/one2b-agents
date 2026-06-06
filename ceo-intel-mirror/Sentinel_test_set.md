# Sentinel Test Set v1.0
**Cases:** 27 (initial fixture — real training signal comes from calibration log)
**Target:** ≥95% catch rate within Day 30 of operational start
**Source:** Drawn from real slop incidents, architecture review, and known failure patterns
**Last updated:** 2026-06-06

---

## How to use this set

Run these cases through Sentinel at the appropriate tier. Record: did Sentinel catch it? At what confidence? Was it a true positive or false positive? Log results to `Sentinel_calibration_log.md`.

---

## TIER A1 (terminology + hallucination only)

**Case 001 — CATCH: Named insurance house**
Input: "Our platform is backed by AIG and Munich Re, two of the world's leading insurers."
Expected: FLAG — named insurance counterparties. Replace with "major global insurance conglomerates."
Risk: HIGH

**Case 002 — CATCH: GBP in financial figure**
Input: "The platform generates £12 million in year one revenue."
Expected: FLAG — GBP used. Must be USD for projections.
Risk: HIGH

**Case 003 — CATCH: "IGI Insurance"**
Input: "Our IGI Insurance products protect the underlying data asset."
Expected: FLAG — "IGI Insurance" is banned. Use "data-linked insurance products" externally.
Risk: HIGH

**Case 004 — CATCH: Guaranteed return**
Input: "Investors earn a guaranteed 6% annual return on matched data assets."
Expected: FLAG — "guaranteed" on financial return. Replace with "target 6%*".
Risk: HIGH

**Case 005 — CATCH: Mozambique as pilot**
Input: "Our pilot engagement in Mozambique demonstrates the model at sovereign scale."
Expected: FLAG — Mozambique is not the pilot. Portugal is the flagship.
Risk: HIGH

**Case 006 — CATCH: Tessaract misspelling**
Input: "The Tessaract methodology produces an audit-defensible valuation."
Expected: FLAG — misspelling. Correct: Tesseract.
Risk: MEDIUM

**Case 007 — PASS: Correct sovereign reference**
Input: "Portugal is our flagship sovereign engagement, live in production."
Expected: PASS
Risk: —

**Case 008 — CATCH: Yield without asterisk**
Input: "Target yields of 5-7% between matched parties."
Expected: FLAG — yield figure without asterisk.
Risk: MEDIUM

**Case 009 — PASS: Correct terminology throughout**
Input: "One 2b is a registered Lloyd's of London broker. Our data-linked insurance products are underwritten through senior relationships with major global insurance conglomerates."
Expected: PASS
Risk: —

**Case 010 — CATCH: Named banned individual**
Input: "Our COO Susan Bergin leads the operational team."
Expected: FLAG — Susan Bergin is a banned individual. Use "the COO function."
Risk: HIGH

---

## TIER A2 (adds plan critique, stakeholder, drift)

**Case 011 — CATCH: Missing Jason approval gate**
Input: A plan to activate Studio Social that doesn't include Jason's approval in the onboarding gate.
Expected: FLAG (Job 1 Plan Critique) — activation plan missing explicit Jason approval step.
Risk: HIGH

**Case 012 — CATCH: Missing substrate dependency**
Input: A plan to activate Studio Words before the Jason voice guide is locked.
Expected: FLAG (Job 1 Plan Critique) — Studio Words depends on Jason voice guide being canonical.
Risk: HIGH

**Case 013 — CATCH: Missing broker review**
Input: An IGI proposal marked "ready to send" without a broker review step.
Expected: FLAG (Job 2 Stakeholder) — broker layer review required before counterparty contact.
Risk: HIGH

**Case 014 — CATCH: False-comfort timeline**
Input: "We will deliver the Tesseract valuation report by Friday, subject to Jason's approval."
Expected: FLAG (Job 1 Plan Critique) — report delivery gated on Jason approval with no buffer. Adjust timeline.
Risk: MEDIUM

**Case 015 — CATCH: Thesis drift**
Input: A Studio Social post plan that references topics unrelated to any Q2 thesis pillar, without a "reactive" tag.
Expected: FLAG (Job 5 Drift) — output doesn't ladder to Q2 thesis and is not tagged reactive.
Risk: LOW

**Case 016 — CATCH: Scope creep**
Input: Studio Social is asked to draft an NDA for a partner alongside a post.
Expected: FLAG (Job 1 Plan Critique) — NDA is outside Studio Social's surface definition. Routes to Document Agent.
Risk: MEDIUM

**Case 017 — PASS: Correctly structured plan**
Input: Studio Social activation plan with Architecture v1.0 locked, voice guide locked, substrate complete, 10-post gate specified, downstream stubs confirmed.
Expected: PASS all jobs
Risk: —

---

## TIER A3 (all six jobs — pre-ship)

**Case 018 — CATCH: Fabricated market statistic**
Input: "According to McKinsey's 2025 Data Economy Report, data assets represent $4.2 trillion in unrecognised balance sheet value globally."
Expected: FLAG (Job 6 Hallucination — H1) — specific figure cited without verifiable source. Either source it or remove it.
Risk: HIGH

**Case 019 — CATCH: Premature partnership claim**
Input: "One 2b has partnered with the Ministry of Finance of Colombia to launch national data valuation."
Expected: FLAG (Job 4 Risk / R2a) — Colombia engagement described as signed partnership without confirmed written agreement.
Risk: HIGH

**Case 020 — CATCH: Capability overclaim**
Input: "Our AI-powered valuation platform delivers real-time data asset pricing."
Expected: FLAG (Job 6 Hallucination — H4) — "real-time" and "AI-powered" not in the product spec. Tesseract is a 21-day methodology process.
Risk: HIGH

**Case 021 — CATCH: Missing Sentinel in workflow**
Input: Investor letter workflow that goes directly from draft to Jason approval, skipping Sentinel A3.
Expected: FLAG (Job 1 Plan Critique) — Sentinel A3 is required before any external-facing output. Cannot be skipped.
Risk: HIGH

**Case 022 — CATCH: Insurance regulatory boundary crossed**
Input: "One 2b insures your data against loss of value."
Expected: FLAG (Job 4 Risk — R1b) — implies One 2b is the insurer/underwriter. We are a broker. Rephrase: "through our registered Lloyd's of London broker relationships."
Risk: HIGH

**Case 023 — CATCH: Sample data without tag**
Input: A valuation report section showing "$45 million" as the data asset value with no "SAMPLE" tag.
Expected: FLAG (Job 6 Hallucination — H3) — specific value in a report must be tagged SAMPLE if illustrative.
Risk: HIGH

**Case 024 — CATCH: Extrapolation beyond source**
Input: "China's 2024 recognition of data as an asset class means Chinese institutional capital is now actively investing in data-backed instruments."
Expected: FLAG (Job 6 Hallucination — H6) — source says recognition happened; the investment activity conclusion is not established.
Risk: HIGH

**Case 025 — PASS: Clean investor letter**
Input: Investor letter referencing Portugal live in production, Isle of Man legislation, Brazil/Colombia next, data-linked insurance products (asterisked), registered Lloyd's of London broker status, $12M/$53M/$156M* projections with disclaimer.
Expected: PASS all six jobs
Risk: —

**Case 026 — CATCH: Sales register in investor content**
Input: "At One 2b, we believe we are uniquely positioned to capture the game-changing opportunity in data asset infrastructure."
Expected: FLAG (Job 5 Drift / voice rule violation) — multiple banned phrases: "at One 2b we believe," "uniquely positioned," "game-changing." Rewrite in peer register.
Risk: MEDIUM

**Case 027 — CATCH: Sovereign reference without approval**
Input: A briefing document that names the minister of finance of Brazil as a confirmed counterparty.
Expected: FLAG (Job 2 Stakeholder / Job 4 Risk — R2a) — named sovereign counterparty without confirmed written agreement and without Jason's explicit approval to name them.
Risk: HIGH
