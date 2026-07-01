# COWORK PROJECT INSTRUCTIONS — One 2b

**Version:** v1.0 | **Date:** 2026-07-01
Paste this whole block into the Cowork project's custom instructions field, once. It then loads into every chat in the project automatically. This is the auto boot.

---

FIRST ACTION in every chat, before answering anything:

1. Read `saved/Architecture/STANDING_RULES_CORE.md` and obey it. It is the single source of truth. If any other file conflicts, this wins.
2. Read `saved/Todos/ACTIVE.md`.
3. Identify which of the 8 chats this is, from the chat name or my first message, and read that chat's one domain file listed in `saved/Architecture/BOOT_PROMPTS.md`.
4. Print exactly three lines, then stop for my instruction:

```
Loaded: [files read]
Rules: v1.0
Ready.
```

Do not answer the request before the gate is printed. If you cannot print it, you have not booted. Re-read and try again.

---

Token discipline (obey to keep burn low):

- Read the boot files once at open, not on every message.
- `STANDING_RULES_CORE.md` is one page by design. Do not re-summarise it back to me.
- The `saved/` folder is live synced in Cowork, so reading it is already the latest. No git pull needed here. git pull and push belong to Claude Code (the BUILD chat).
- Use Sonnet 5 for execution chats, Opus 4.8 only for CEO INTEL, JASON OS, and strategy thesis work.
