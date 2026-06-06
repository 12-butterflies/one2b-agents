# Sentinel Job 4 — Risk Flag Detection Rules
**Applies to:** Mode A2, A3, Mode B
**Purpose:** Identify items in any output that trigger elevated risk — regulatory, reputational, legal, counterparty, or architectural. Different from terminology violations (Job 3) which are execution errors. Risk flags are existential or strategic risks.

---

## Risk flag categories

### Category 1 — Regulatory risk

**R1a — Securities / financial promotion:**
Any communication to an investor that could be construed as a financial promotion or unregistered securities offering must carry appropriate disclaimers and must not make unqualified forward-looking statements.

Flag when:
- An investor letter contains yield claims without asterisk and caveat
- An IGI proposal implies guaranteed returns
- A social post targets investors with financial projections without the standard disclaimer

Finding: `Regulatory risk (R1a): [specific claim] may constitute a financial promotion without disclaimer. Add asterisk and: "Target returns are projections only and not guaranteed."`

**R1b — Insurance regulatory boundary:**
One 2b is a registered Lloyd's of London broker. It does not underwrite or bind coverage. Any output that implies One 2b itself is the insurer or underwriter crosses the regulatory boundary.

Flag when:
- An output says "One 2b insures your data" (we do not — we broker the insurance)
- A proposal implies One 2b provides coverage directly rather than through Lloyd's relationships
- Any claim of regulatory status beyond "registered Lloyd's of London broker"

Finding: `Regulatory risk (R1b): [claim] implies underwriting authority One 2b does not hold. Rephrase: 'through our registered Lloyd's of London broker relationships with major global insurance conglomerates.'`

**R1c — Data protection:**
Any output that names or implies specific data about an individual or entity without their consent, or that implies One 2b processes personal data in a way that may violate GDPR or applicable data protection law.

Flag when:
- An outreach message references specific financial or personal details about the recipient sourced from third parties without consent
- A valuation report includes personally identifiable information without confirming consent

Finding: `Regulatory risk (R1c): [content] may include personal data without confirmed consent basis. Review before sending.`

---

### Category 2 — Reputational risk

**R2a — Named counterparty without agreement:**
Any output that names a specific corporate counterparty (insurer, sovereign body, fund, bank) as a partner, client, or investor without a confirmed written agreement to name them.

Flag when:
- A deck names "working with [insurer]" without written permission
- A social post implies a signed deal that has not been confirmed in writing
- A press piece names a sovereign counterparty who has not confirmed they can be named

Finding: `Reputational risk (R2a): [name] referenced as partner/client/investor without confirmed written agreement. Do not publish until confirmed.`

**R2b — Premature success claims:**
Claiming milestones that are in progress, not complete. "Portugal is live" when it is in pilot but not fully operational, for example.

Flag when:
- An output describes a pending engagement as complete
- A metric is cited that is projected rather than measured
- A "case study" describes a relationship that is not yet in a deliverable phase

Finding: `Reputational risk (R2b): [claim] describes [status] as complete but it is [actual status]. Adjust to accurate framing.`

**R2c — Voice drift / brand inconsistency:**
Output from a Studio agent that sounds like the wrong trinity identity, or that uses generic AI-writing patterns rather than the locked voice guide.

Flag when:
- A "Jason personal" post uses One 2b corporate register
- A "One 2b" post uses Jason's personal physical-discipline references inappropriately
- An output contains phrases that are in the "never lands" list of the relevant voice guide

Finding: `Brand risk (R2c): [specific phrase or register] inconsistent with [identity] voice guide. [Section] of voice guide applies.`

---

### Category 3 — Legal risk

**R3a — Binding language in non-binding documents:**
Term sheets and letters of intent marked "non-binding" that contain clauses that create enforceable obligations.

Flag when:
- An LOI contains exclusivity provisions (these are typically binding even in non-binding documents)
- A "heads of terms" document contains representations that create liability
- A partnership letter implies a joint venture structure without explicit non-binding language

Finding: `Legal risk (R3a): [clause] in [document type] may be enforceable despite non-binding framing. Legal review required before signature.`

**R3b — Jurisdiction ambiguity:**
Documents that do not specify governing law and jurisdiction, or that specify a jurisdiction without confirming appropriate legal review.

Flag when:
- A contract is silent on governing law
- A cross-border agreement (e.g., involving a sovereign) defaults to English law without confirming that is appropriate for the counterparty's jurisdiction

Finding: `Legal risk (R3b): [document] does not specify governing law or jurisdiction. Confirm with legal review before signature.`

---

### Category 4 — Architectural / operational risk

**R4a — Single point of failure:**
Any plan or architecture that creates a single point of failure with no fallback.

Flag when:
- Praj is the only person who can restart the intel sweep launchd agent
- A production workflow has no error return path
- An agent activation plan has no stub fallback for unactivated downstream agents

Finding: `Operational risk (R4a): [system/process] is a single point of failure with no identified fallback. Recommend: [specific mitigation].`

**R4b — Data sovereignty exposure:**
Any plan that routes One 2b or counterparty data through a third-party service without confirming that service's data residency and sovereignty compliance — particularly relevant for sovereign counterparties.

Flag when:
- A sovereign counterparty's data is processed through a US-domiciled cloud service without data residency confirmation
- A Tesseract report is generated using data that the sovereign has not consented to process externally

Finding: `Data sovereignty risk (R4b): [data/process] routed through [service] without confirmed data residency compliance for [sovereign]. Pause and confirm.`

---

## Auto-halt triggers (these halt the output immediately — no analysis required)

| Trigger | Action |
|---|---|
| GBP / British Pounds in financial figures | HALT — surface to Jason |
| Named insurance counterparty (AIG, Allianz, Munich Re, etc.) | HALT — surface to Jason |
| "Guaranteed" yield or return | HALT — surface to Jason |
| Named banned individual | HALT — surface to Jason |
| Mozambique as sovereign pilot or flagship | HALT — surface to Jason |
| API key or credential appearing in output | HALT IMMEDIATELY — surface to Jason, do not log the credential |

---

## Calibration log format

```
DATE: [ISO]
OUTPUT REVIEWED: [one-line]
RISK FLAG FOUND: [category + specific finding]
JASON VERDICT: [confirmed risk / false positive / rule adjustment needed]
RULE CHANGE: [if applicable]
```
