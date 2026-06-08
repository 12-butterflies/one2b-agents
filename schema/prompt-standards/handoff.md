# Handoff Payload Standard
**Version:** v1.0
**Source of truth:** `schema/handoff-schema.json`
**Applies to:** Every cross-agent invocation — no exceptions.

---

## Required fields (every handoff must include all of these)

| Field | Type | Rules |
|-------|------|-------|
| `trinity_identity` | enum | `one2b` / `12butterflies` / `jason` — must be explicit, never inferred |
| `request_origin` | enum | Calling agent name, or `human` |
| `request_intent` | string | Plain-English one-liner, 5–200 chars |
| `quarterly_thesis_ladder` | string | Which Q2 2026 pillar this ladders to, or `none — reactive` |
| `red_flag_check_status` | enum | `passed` / `pending` / `deferred` / `flagged` |
| `route_to` | enum | Receiving agent name |
| `route_pattern` | enum | `single` / `sequential` / `parallel` |

## Optional fields

| Field | Type | When required |
|-------|------|---------------|
| `context_links` | array | Paths to CEO Intel files. Empty array if none. |
| `red_flag_notes` | string | Required when `red_flag_check_status` is `flagged` |
| `downstream_agents` | array | Required for `sequential` / `parallel` patterns |
| `deadline` | string | ISO 8601 or `none` |
| `surface_specs` | object | Required when `route_to` is `studio-design` or `studio-motion` |
| `caller_state_snapshot` | any | Optional state from calling agent |

## Receiving agent behaviour

- Validate all required fields before proceeding.
- If `red_flag_check_status` is `flagged`: halt immediately, surface `red_flag_notes` to Jason.
- If `route_pattern` is `parallel`: do not fan out without explicit Jason confirmation.
- Missing required field → return structured error to caller. No silent failures.

## Q2 2026 thesis pillars (valid values for `quarterly_thesis_ladder`)

- `distribution — agent fleet`
- `RWA / data liquidity positioning`
- `7 named production systems differentiator`
- `sovereign arc — Portugal flagship`
- `IGI as the insurance layer`
- `none — reactive`

## Return contract

Every agent returns either:
- A deliverable (the requested output)
- A structured error: `{error: "<type>", field: "<field>", message: "<detail>"}`

Never return null. Never fail silently.
