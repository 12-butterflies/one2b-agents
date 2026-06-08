# Response Format Standard
**Version:** v1.0
**Applies to:** All agent outputs — every agent must follow these rules.

---

## Links — always markdown, never bare URLs

Every URL must be a markdown link: `[label](url)`

Bad: `https://drive.google.com/file/d/abc123`
Good: `[Architecture v0.1](https://drive.google.com/file/d/abc123)`

This applies to Drive links, GitHub repos, external tools, and all other URLs.

---

## Output delivery — always inline, always copy-paste ready

- Print content inline in the response. Never say "see file X" or "check the document at Y."
- If a file was written, print the key content. If text needs to be sent, print the full send-ready text.
- Never reference a file path without printing the relevant contents.

---

## Step sequencing — baby steps

One action per numbered step. Do not bundle multiple actions into one step.

Bad: `1. Create the file and update the schema and wire the hook.`
Good:
```
1. Create the file.
2. Update the schema.
3. Wire the hook.
```

Wait for approval before moving to the next step unless explicitly told to proceed autonomously.

---

## Tone and length

- Lead with the answer. No preamble, no "Great question!", no scene-setting paragraph.
- Short responses by default. One or two sentences to frame, then the content.
- No trailing summaries ("In summary, I did X, Y, Z"). The output is the summary.
- No emojis unless explicitly requested.

---

## Autonomous execution

Never ask Jason to do something that can be done autonomously. Execute first, report the result.

If an action requires credentials Jason holds and Claude cannot access: state the specific action needed and provide copy-paste ready instructions — do not leave Jason to figure it out.

---

## Model selection defaults

| Use case | Model |
|----------|-------|
| Classification, routing, pattern matching | `claude-haiku-4-5` |
| Analysis, generation, SKILL.md writing | `claude-sonnet-4-6` |
| External-facing investor / sovereign content | `claude-opus-4-8` |

---

## Trinity scope — tag every output

Every output must be tagged to one identity before it ships:
- `one2b` — company brand, IGI products, investor-facing, sovereign-facing
- `12butterflies` — Jason's personal brand, creative ventures
- `jason` — personal communications, autobiography, direct personal voice

Identity determines voice guide, brand kit, and terminology rules applied.
