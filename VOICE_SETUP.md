# Voice Setup — Jason's AI Voice Stack
**Last updated:** 2026-06-06
**Goal:** Speak in, hear back. No typing. Works on desktop and mobile. Memory captured.

---

## Replace Wispr Flow now — Superwhisper

Wispr Flow is desktop-only and patchy. Replace it with **Superwhisper**.

- Local Whisper model — no cloud, no internet needed, no patchy connection
- Works system-wide on Mac (any app, any field, including Claude Code)
- Faster and more accurate than Wispr Flow
- Download: superwhisper.app
- Setup: 10 min. Download, install, pick your Whisper model size (Medium = best speed/accuracy balance on Mac)
- Hotkey: hold a key, speak, release, it types. Works in Claude Code, browser, email, everywhere.

**Install this today. It solves the desktop voice input problem permanently.**

---

## Voice responses (TTS readback)

| Where | How | Quality |
|---|---|---|
| **Claude.ai mobile app** | Tap mic → speak → Claude responds in voice | Best — use this on phone |
| **Claude.ai web** | Voice mode in browser | Good |
| **Open WebUI** (when installed) | Full voice I/O, works offline with local models | Good, fully offline |
| **ElevenLabs TTS** (already authenticated) | Pipe any text through ElevenLabs Flows for high-quality readback | Excellent — for content creation |

**For your morning stack and daily decisions:** Claude.ai mobile. Speak your state, hear your protocol. Done in 3 minutes without touching a keyboard.

---

## The voice flow — how it works day to day

### On phone (mobile):
1. Open Claude.ai app
2. New chat
3. Tap the text field — paste your context card (CEO, Jason OS, or Studio)
4. Switch to voice input — tap mic
5. Speak your question
6. Claude responds in voice

### On desktop:
1. Superwhisper active (system-wide)
2. Click into Claude Code or Cowork
3. Hold hotkey, speak, release — it types for you
4. Claude responds in text (read it, or paste into a TTS tool if you want it spoken)

### Fully offline (when local stack is installed):
1. Open WebUI running locally
2. Full voice I/O — speak in, hear back
3. Uses Ollama models — zero internet, zero token cost

---

## The memory problem — mobile to desktop to file system

This is the most important thing to solve. Here is how it works now and what's coming.

### How it works now:

Mobile session → you speak → Claude responds → **session ends, nothing is saved automatically**

That's the gap. The model has no persistent memory between sessions. The file system (GitHub repo + Google Drive) is the memory — but it only updates when something writes to it.

### The bridge (what you do now, 30 seconds):

At the end of any mobile session that produced a decision, say:

> "Summarise this session in 3 bullets formatted for DECISIONS.md. Include: what was decided, why, and what the next action is."

Claude gives you 3 lines. Copy them. When you're at desktop, paste into `ceo-intel-mirror/` or the relevant file. Claude Code picks it up in the next session.

### The bridge (what gets automated — building now):

The `/morning` command checks for any new entries in DECISIONS.md since yesterday and surfaces them. So the loop is:
- Mobile session produces a decision
- You capture the 3-bullet summary (30 seconds)
- Next morning the brief references it automatically

### Coming when local stack is live:

Open WebUI + n8n wired together: voice session → transcript → n8n processes it → important items filed to Drive automatically. Zero manual steps. This is the full automation. Weeks 3–4 per IMPLEMENTATIONS.md.

---

## Wispr Flow vs Superwhisper vs Claude app voice

| Tool | STT quality | Works offline | System-wide | TTS back | Verdict |
|---|---|---|---|---|---|
| Wispr Flow | Good | No | Yes | No | Replace — patchy cloud |
| Superwhisper | Excellent | Yes | Yes | No | **Install now** |
| Claude.ai mobile | Excellent | No | No (app only) | **Yes** | Use for voice responses |
| Open WebUI + Whisper | Very good | **Yes** | No (browser) | **Yes** | Install with local stack |

The combination that works: **Superwhisper for desktop input + Claude.ai mobile for voice response sessions.**
