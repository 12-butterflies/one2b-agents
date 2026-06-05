# /lock — Lock a document to v1.0
**Purpose:** Mark a draft document as locked at v1.0 after Jason's line-by-line review. Updates the status line and version number, adds a lock timestamp, and commits the change.

## How to use
`/lock <file-path>`

Example: `/lock ceo-intel-mirror/Trinity/Jason/voice_guide.md`

## What it does

1. Updates the **Status** line from `DRAFT` to `LOCKED — v1.0`
2. Sets **Version:** v1.0
3. Sets **Locked:** [current date]
4. Adds a one-line lock note: `Locked by Jason [date]. This file is canonical. Changes require explicit Jason instruction and a new version number.`
5. Commits to git with message: `Lock [filename] at v1.0`

## Lock criteria

A document is ready to lock when:
- Jason has reviewed it section by section
- No open markup or pending changes
- It will be read by agents as ground truth

## After locking

- The file becomes a substrate dependency. Agents that read it treat it as ground truth.
- Changes require explicit Jason instruction and bump to v1.1 or v2.0
- The lock is recorded in git history — always reversible

## Documents awaiting lock (as of 2026-06-05)

- `ceo-intel-mirror/Trinity/Jason/voice_guide.md` — draft v2, awaiting "lock it"
- `ceo-intel-mirror/Trinity/One2b/voice_guide.md` — draft, awaiting Jason review
- Architecture v0.1 → v1.0 — pending Jason confirmation in Drive doc
