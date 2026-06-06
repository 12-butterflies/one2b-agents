# Sentinel Job 2 — Stakeholder Check Rules
**Applies to:** Mode A2, A3, Mode B
**Purpose:** Identify who should have been consulted, informed, or involved in an output but wasn't. Prevents decisions from shipping that surprise or expose counterparties who should have had input.

---

## The stakeholder taxonomy

| Role | Who | When they must be involved |
|---|---|---|
| **Jason** | Founder / CEO | Every external-facing output, every investor touch, every legal document, every sovereign communication, every architectural decision |
| **The broker layer** | Sean Yeo's team | Any IGI proposal, any insurance-adjacent claim, any document that references One 2b as a Lloyd's broker |
| **Legal review** | External solicitor | Any document with binding terms, any sovereign contract, any cross-jurisdictional agreement |
| **Named counterparty** | Stefan Rust, Aaron Astley, and any named partner | Any outreach, document, or content that names or references them in a commitment context |

---

## Rule 1 — Jason gate on external outputs

Any output that will be read by a human outside the One 2b build team requires Jason's review. No agent has standing authority to bypass this gate for:
- Investor letters or proposals
- IGI proposals or insurance-adjacent materials
- Tesseract valuation reports
- Sovereign communications
- Legal documents
- Press or media content

**Flag when:** An output is marked "ready to send" without Jason's approval step in the plan.

**Finding format:** `Missing stakeholder: Jason review not specified for [external output type]. Required before send.`

---

## Rule 2 — Broker layer on insurance content

Any content that references IGI, Insurance Guarantee Instruments, One 2b's Lloyd's broker status, or premium calculations must be reviewed by the broker layer (Sean Yeo's team) before reaching a counterparty.

**Flag when:** An IGI proposal or insurance summary is marked complete without a broker review step.

**Finding format:** `Missing stakeholder: Broker layer review not specified for insurance-adjacent content. Required before counterparty contact.`

---

## Rule 3 — Legal review on binding documents

Any document with binding legal terms requires external legal review before signing. Sentinel does not assess legal merit — it flags the absence of the review step.

**Flag when:**
- A document is marked "ready for signature" without a legal review step
- A term sheet or LOI is described as "non-binding" but contains enforceable commitments
- A cross-jurisdictional document (involving sovereigns or foreign counterparties) goes to signature without jurisdiction-specific legal review

**Finding format:** `Missing stakeholder: Legal review not specified for [document type]. Required before signature.`

---

## Rule 4 — Named partner consent

If an output names Stefan Rust, Aaron Astley, or any named partner in a context that implies commitment, endorsement, or partnership, that person must have given explicit consent for the specific use.

**Flag when:**
- An investor document names a partner as a committed relationship without written confirmation
- A social post implies an endorsement by a named person without their consent
- A proposal references a named counterparty as "in discussion" without confirming they agreed to be named

**Finding format:** `Stakeholder consent needed: [name] referenced in commitment/endorsement context. Confirm explicit consent before publishing.`

---

## Rule 5 — COO / executive function reference

The former COO must not be named. When referring to the COO function, use "the COO function" or "the COO" generically. Any output that requires the COO function's involvement must specify that role generically.

**Flag when:** A plan assigns responsibility to a named former COO, or names any former team member (Susan Bergin, Joshua Armah, Jamie Dixon, Kyle Turner, Carl Turner).

**Finding format:** `Named individual: [name] must not appear. Use 'the COO function' generically, or escalate to Jason.`

---

## Rule 6 — Sovereign counterparty escalation

Any communication that names, involves, or references a sovereign counterparty (government ministry, sovereign development bank, central bank) requires Jason's personal approval, not standing authority.

**Flag when:** A sovereign-facing document or outreach is in a plan without Jason's named approval step.

**Finding format:** `Sovereign escalation required: [output] involves sovereign counterparty. Jason personal approval required before contact.`

---

## Calibration log format

```
DATE: [ISO]
OUTPUT REVIEWED: [one-line]
SENTINEL FINDING: [who was flagged as missing]
JASON CORRECTION: [whether the finding was correct]
RULE ADJUSTMENT: [if threshold was wrong]
```
