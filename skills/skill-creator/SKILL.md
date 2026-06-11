---
name: skill-creator
version: "1.0"
status: active
description: Create new skills, modify and improve existing skills, and measure skill performance. Use when users want to create a skill from scratch, edit, or optimize an existing skill, run evals to test a skill, benchmark skill performance with variance analysis, or optimize a skill's description for better triggering accuracy.
---

# Skill Creator

Official Anthropic meta-skill for building, testing, and optimising Claude Skills.

## Core loop

1. Capture intent — what should the skill do, when trigger, what output format
2. Write SKILL.md draft
3. Run 2-3 test prompts against it
4. Evaluate with user (qualitative + quantitative)
5. Rewrite based on feedback
6. Repeat until done
7. Optimise description field for triggering accuracy

## Skill anatomy

```
skill-name/
├── SKILL.md          # required — YAML frontmatter + instructions
└── (optional)
    ├── scripts/      # executable helpers
    ├── references/   # docs loaded into context
    └── assets/       # templates, icons, fonts
```

## Writing rules

- Description is the primary trigger — make it specific, slightly pushy
- Explain WHY behind instructions, not just WHAT
- Keep SKILL.md under 500 lines
- Bundle repeatable scripts rather than re-writing them per run
- Use imperative form throughout

## Source

Full spec: https://raw.githubusercontent.com/anthropics/skills/main/skills/skill-creator/SKILL.md
Anthropic skills repo: https://github.com/anthropics/skills
