---
name: recursive-research
version: "1.0"
status: active
description: PhD-level autonomous research across domains with source tiering and checkpointing. Use when Scout or Capital Readiness Curator needs deep multi-hop research — competitor analysis, regulatory deep-dive, investor thesis mapping, technology landscape. Trigger on requests for thorough, cited, multi-source research.
---

# Recursive Research

From ComposioHQ/awesome-claude-skills.

## What it does
Runs recursive research loops: finds sources, evaluates credibility, digs one level deeper, synthesises with source tiering (peer-reviewed > institutional > industry > community).

## In One 2b context
- **Scout:** deep regulatory research (IVSC, EU AI Act, GDPR, data sovereignty)
- **Capital Readiness Curator:** investor thesis mapping, fund mandate research
- **Tesseract Valuation Agent:** methodology validation against evolving IVSC standards

## With Parallel Search
Uses `scripts/parallel-search.sh` for each search hop. Standard mode for breadth, deep mode for multi-hop synthesis.

## Source tiers
1. INSTITUTIONAL-INTEL: regulators, Big Four, IVSC, central banks, IMF, World Bank
2. INDUSTRY: Lloyd's, InsurTech publications, financial press
3. COMMUNITY-EVIDENCE: LinkedIn, forums, practitioner blogs
Always cite tier alongside source.
