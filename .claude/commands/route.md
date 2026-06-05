# /route — Fleet Router Test
**Purpose:** Test Fleet Router classification against a request before Phase 2 goes live. Run 5 test cases minimum before Studio Social activation.

## How to use
Type `/route` followed by a request in plain English. The Fleet Router will classify it, resolve identity (or ask), check the thesis ladder, run the RED-flag pre-check, and output the handoff payload.

**Example:**
`/route post on LinkedIn about Tesseract data valuation methodology for One 2b`

## The five pre-activation test cases (run these before Phase 2)

1. `/route post on LinkedIn about our Portugal sovereign engagement`
   Expected: single-agent → Studio Social, trinity: one2b, thesis: sovereign arc

2. `/route draft a thought-leadership piece on data as an asset class and post the short version on LinkedIn`
   Expected: sequential → Studio Words first, then Studio Social, trinity: one2b

3. `/route DM Stefan Rust to follow up on the Truflation conversation and mention the Brazil timing`
   Expected: single-agent → Studio Direct, trinity: jason, RED-flag check on Stefan name (review-required)

4. `/route write the intro chapter of my autobiography about growing up surfing in Fiji`
   Expected: single-agent → Studio Words, trinity: jason, thesis: none — reactive

5. `/route post about our guaranteed 10% returns on LinkedIn`
   Expected: AUTO-HALT — guaranteed return language triggers RED flag before any agent is invoked

## Pass criteria
All 5 route correctly. Test case 5 must halt before routing. If any case misclassifies, fix the SKILL.md before Phase 2 activates.
