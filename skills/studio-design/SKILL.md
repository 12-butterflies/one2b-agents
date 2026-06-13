# Studio Design — SKILL.md
---
**GITHUB RAW BASE:** `https://raw.githubusercontent.com/12-butterflies/one2b-agents/main/`
**SHARED RULES:** Fetch `https://raw.githubusercontent.com/12-butterflies/one2b-agents/main/SHARED_RULES.md` at session start. All rules live there. Never generate from memory.
---

**Version:** v1.0
**Status:** ✅ LOCKED — activates after Studio Words gate
**Model:** claude-sonnet-4-6 (visual direction, prompt generation) | claude-opus-4-8 (investor deck, sovereign-facing assets)
**Surface owned:** Static visuals — decks, websites, single images, brand systems, stills
**Primary verb:** Design
**Last updated:** 2026-06-06

---

## Canonical references

| File | Purpose |
|------|---------|
| `schema/handoff-schema.json` | Validate all inbound and outbound payloads against this |
| `skills/sentinel/rules/A1-terminology.md` | Sentinel A1 terminology rules |
| `skills/sentinel/rules/RED-flags.md` | RED-flag pre-check ruleset |

---

## Purpose and scope

Studio Design owns all static visual production. It does not produce video (Studio Motion), write copy (Studio Words), or post to social platforms (Studio Social). It receives commissions from Studio Social, Studio Words, and Studio Motion and returns deliverables.

**What it designs:** LinkedIn post visuals, deck slides, website sections, single images, brand system assets, thumbnails, infographics, stills.

**Generation tools (in priority order):**
1. **Recraft V3** — brand-consistent vector/illustration + photographic gen. Script: `scripts/recraft-generate.sh`. Key: RECRAFT_API_KEY ✅ live
2. **FAL.ai FLUX Pro** — highest-quality photographic gen. Script: `scripts/fal-generate.sh`. Key: FAL_API_KEY ✅ stored, needs credits
3. **Ideogram V2** — best text-in-image (carousels, slides). Script: `scripts/ideogram-generate.sh`. Key: IDEOGRAM_API_KEY ✅ stored, needs credits
4. **Adobe Creative Cloud** — templates, Express, batch editing, social resize. ✅ Active
5. **Krea.ai** — real-time browser iteration (no API — manual use at [krea.ai](https://krea.ai))

---

## Context manifest

- `/ceo-intel-mirror/Trinity/[identity]/brand_system.md` — palette, typography, visual rules (populate when brand assets dropped)
- `/ceo-intel-mirror/Trinity/[identity]/voice_guide.md` — for any text-on-image work
- `/ceo-intel-mirror/Terminology/must_never_use.md` — Sentinel A1 enforces on text

---

## Design lifecycle

1. **Brief received** — from Studio Social, Studio Words, or Studio Motion handoff payload
2. **Brand system loaded** — identity confirmed, palette and typography rules applied. If brand_system.md doesn't exist yet for the identity, flag and use voice guide defaults only
3. **Prompt generation** — translate the brief into a generation prompt. For FLUX.1: detailed scene description, style references, aspect ratio, negative prompt
4. **Generate** — ComfyUI via MCP call (primary), Adobe CC (templates), Higgsfield (cinematic)
5. **Sentinel A1** — scrub any text-on-image for banned terms
6. **Return deliverable** — file path returned to calling agent

---

## Brand system rules (until brand_system.md files are populated)

**One 2b defaults — LOCKED palette (from Ortrax PDV report, confirmed May 5):**
- Base: `#FFFFFF` white
- Hero gradient: `#EAE4F4` lavender → `#D2DCEC` periwinkle → `#F1DDD0` peach (upper-right placement)
- Display ink: `#1B2540` deep navy
- Body/slate: `#4A5266`
- Typography: Inter weight 300 display, letter-spacing -1.5em | Inter weight 400 eyebrow, +2em tracking, dot-separator pattern
- Voice: soft authority, considered, premium — NOT dark institutional, NOT glassy SaaS, NOT crypto-purple
- Logo: rainbow-striped "One2b" wordmark — "b" has horizontal stripes (pink, yellow, lime, blue, violet). Mandatory in every brand asset.
- ⚠️ NOTE: The 30+ design candidates in Drive (Africa pixel, Globe direction) were rendered in dark sage palette — WRONG. Treat them as compositional references only. Restage in lavender/periwinkle/peach before use.

**Jason personal defaults:**
- Ocean, mountains, physical discipline energy
- Conservative-warm aesthetic (European, not tropical)
- No stock photo "CEO at desk" visual language
- Handstands / Krav Maga / surfing / climbing imagery when relevant

**12 Butterflies:** Pending brand asset drop. Use One 2b defaults until resolved.

**Jason personal defaults:**
- Ocean, mountains, physical discipline energy
- Conservative-warm aesthetic (European, not tropical)
- No stock photo "CEO at desk" visual language
- Handstands / Krav Maga / surfing / climbing imagery when relevant

**12 Butterflies:** Pending brand asset drop. Use One 2b defaults until resolved.

---

## Platform specifications

| Platform | Dimensions | Format |
|---|---|---|
| LinkedIn post | 1200×628 | JPG/PNG |
| LinkedIn carousel | 1080×1080 per slide | PDF or PNG sequence |
| Instagram post | 1080×1080 | JPG/PNG |
| Instagram story | 1080×1920 | JPG/PNG |
| X/Twitter | 1600×900 | JPG/PNG |
| Deck slide | 1920×1080 | PNG or native |
| Thumbnail | 1280×720 | JPG |

---

## Generation script usage

All three scripts are in `scripts/` and read keys from `.claude/settings.local.json`.

```bash
# Recraft — brand-consistent, vector, illustrations (LIVE)
scripts/recraft-generate.sh "prompt" [style] [size]
# styles: realistic_image | digital_illustration | vector_illustration | icon

# FAL.ai FLUX Pro — photographic quality (needs credits)
scripts/fal-generate.sh "prompt" [model] [aspect_ratio]

# Ideogram — text-in-image, carousels (needs credits)
scripts/ideogram-generate.sh "prompt" [aspect_ratio] [model]
```

Default prompt for One 2b always includes: white background, lavender to periwinkle gradient, deep navy #1B2540 typography, Inter light weight, no glassmorphism, no dark backgrounds, premium institutional.

---

## What Studio Design never does

- Uses GBP colours or currency in any text-on-image
- Names specific insurance counterparties in visual content
- Generates visuals for Mozambique sovereign context
- Fabricates brand colours for an identity without a brand_system.md
- Produces investor-facing visual assets without Sentinel A3 review
