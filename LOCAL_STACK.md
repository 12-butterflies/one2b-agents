# One 2b — Local & Self-Hosted Stack
**Last updated:** 2026-06-05
**Purpose:** Everything needed to run the agent fleet fully offline, fully off SaaS, with no vendor lock-in.
**Design principle:** Claude Code + cloud when online. Local stack when offline. LiteLLM handles the transition transparently.

---

## The core architecture

```
[Mac Hardware: 64GB+ M-series Max/Ultra recommended]
              |
         [Ollama]
    local inference engine
              |
      [LiteLLM Proxy]
  unified gateway — routes cloud/local,
  handles MCP bridge, fallback rules
              |
    ┌─────────┴────────────┐
    |                      |
[Open WebUI]           [Dify]
 chat, pipelines,      LLM apps, agents,
 RAG, MCP tools         RAG, workflows
    |                      |
    └──────────┬───────────┘
               |
             [n8n]
   automation bus — 400+ integrations,
   MCP server + client, webhooks
               |
    ┌──────────┼──────────────────┐
    |          |                  |
 [Plane]   [Cal.diy]      [Mattermost]
 [Baserow] [DocuSeal]     [Mixpost]
           [AppFlowy]
```

**Offline flip:** With LiteLLM configured for local fallback, the entire fleet operates with zero internet. Claude Code routes through LiteLLM — online calls go to Anthropic, offline calls go to Ollama. No code changes required.

---

## 1. Local LLM Models

### Model selection by task

| Task | Best Local Model | Size (Q4) | Why |
|---|---|---|---|
| **Classification / routing** | Qwen3 8B | ~5GB | Fast, lightweight, always-on background |
| **General reasoning** | Qwen3 72B | ~40GB | Closest to Claude Sonnet quality locally |
| **Code generation** | Qwen3-Coder-30B-A3B | ~18GB | 92.7% HumanEval, 130 tok/s on M4 Pro |
| **Long-form writing** | Llama 4 Maverick | ~40GB | Best prose quality in the local tier |
| **Document analysis** | Llama 4 Scout (109B MoE / 17B active) | ~10GB | Largest context window in class |
| **Reasoning / math** | DeepSeek V4 Flash (284B MoE / ~13B active) | ~9GB | MoE efficiency, MIT license |
| **Vision / multimodal** | Qwen3-VL-30B-A3B | ~18GB | Best local vision model |
| **Ultra-fast triage** | Llama 3.2 3B | ~2GB | Intent detection, always running |

### Hardware requirements

| Mac Config | What runs | Notes |
|---|---|---|
| 16GB M-series | Qwen3 8B, Gemma 3 12B, Llama 3.2 3B | Classification and routing only |
| 32GB M-series Pro | Qwen3-Coder-30B-A3B, DeepSeek V4 Flash | Code + reasoning production-ready |
| 64GB M-series Max | Qwen3 72B, Llama 4 Scout, Llama 4 Maverick | Full capability — Sonnet-equivalent |
| 96–192GB M-series Ultra | All models, Kimi K2.6, Llama 4 Maverick full | Cloud-competitive quality |

**Disk budget:** 200–400GB SSD for a capable model library. GGUF Q4 ranges from 2GB (3B) to 80GB+ (large MoE).

### Quality comparison to Claude

- **Qwen3 72B Q4** on 64GB Mac ≈ Claude 3.5 Sonnet for general reasoning and instruction following
- **Qwen3-Coder-30B** ≈ Claude 3.5 Sonnet for code (92.7% HumanEval vs Sonnet's ~95%)
- **Gap vs Opus 4.8:** Real but closing. Local models are not yet at Opus quality for complex multi-step reasoning or nuanced voice matching. Offline = Sonnet-class, not Opus-class.
- **Rule:** Use local for classification, drafting, and analysis. Reserve cloud Opus for investor-facing, legal, and high-stakes external content.

---

## 2. Runtime Platforms

### Install order

**1. Ollama** — inference backbone
```bash
curl -fsSL https://ollama.ai/install.sh | sh
ollama pull qwen3:8b          # classification
ollama pull qwen3:14b         # general use
ollama pull llama4-scout:17b  # long context
```
API: `localhost:11434` (OpenAI-compatible)

**2. LiteLLM Proxy** — the gateway (install this immediately after Ollama)
```bash
pip install litellm
litellm --model ollama/qwen3:14b --port 4000
```
Or via Docker:
```bash
docker run -p 4000:4000 ghcr.io/berriai/litellm:main \
  --model ollama/qwen3:14b --model anthropic/claude-sonnet-4-6
```
Then in Claude Code: set `ANTHROPIC_BASE_URL=http://localhost:4000` to route through LiteLLM.
Fallback rule: cloud when `ANTHROPIC_API_KEY` is set and network reachable, Ollama otherwise.

**3. Open WebUI** — primary human interface
```bash
docker run -d -p 3000:8080 \
  --add-host=host.docker.internal:host-gateway \
  -v open-webui:/app/backend/data \
  ghcr.io/open-webui/open-webui:main
```
Access at `localhost:3000`. Point at Ollama or LiteLLM. Add MCP servers under Settings → Tools.

**4. Dify** — LLM app platform (for agent flows, RAG pipelines, customer-facing bots)
```bash
git clone https://github.com/langgenius/dify.git
cd dify/docker && docker compose up -d
```
Access at `localhost:3001`. Native bidirectional MCP support (v1.6.0+). 50+ built-in tools.

**5. n8n** — automation bus
```bash
docker run -it --rm -p 5678:5678 docker.n8n.io/n8nio/n8n
```
Access at `localhost:5678`. Install MCP community nodes. Wire webhooks from Cal.diy, Plane, Mattermost, DocuSeal.

---

## 3. Self-Hosted SaaS Replacements

### Priority order — highest ROI first

| Replaces | Tool | License | Stars | Deploy | Time |
|---|---|---|---|---|---|
| **DocuSign** | **DocuSeal** | AGPL-3.0 | ~10K | `docker run docuseal/docuseal` | 10 min |
| **Calendly** | **Cal.diy (Cal.com)** | MIT | 41K+ | Docker / Railway | 30 min |
| **Monday.com** | **Plane** | AGPL-3.0 | 50K+ | Docker Compose | 45 min |
| **Slack** | **Mattermost** | MIT (core) | 32K | 2 containers | 15 min |
| **Airtable** | **Baserow** | MIT (core) | 4K | Docker | 20 min |
| **Zapier/Make** | **n8n** | Fair-code | 191K | Docker | 5 min |
| **Notion** | **AppFlowy** | AGPL-3.0 | 60K+ | Docker / binary | 20 min |
| **Postiz (SaaS)** | **Postiz (self-hosted)** | AGPL-3.0 | 8K | Docker | 20 min |

### Detail notes

**DocuSeal** — Single Docker container. 13 field types, multi-signer, audit trail, REST API. ~$5/month self-hosted vs $24K–$39K/year DocuSign enterprise. Deploy first.

**Cal.diy** — MIT license (relaunched April 2026). Near-complete Calendly parity. Google/Outlook/CalDAV sync, round-robin, payment collection, white-label embed. Wire webhook → n8n for booking-to-task automation.

**Plane** — Most-starred open-source Monday/Linear/Jira alternative. Kanban, sprints, cycles, gantt, pages (docs), analytics. Full REST API for n8n integration. Import from Monday via CSV.

**Mattermost** — Direct Slack replacement UI. PostgreSQL + Mattermost, 5-minute deploy. Built-in n8n integration. Use for: team comms, Studio agent notifications, approval flows.

**Baserow** — Real-time collab, MIT core, full API. Closest Airtable experience without NocoDB's licensing shift. Use for: structured data, contact lists, content calendars.

**n8n** — 191K GitHub stars. 400+ integrations. MCP bidirectional: expose workflows as MCP servers, consume MCP servers as tools. The automation backbone. Install week 1.

**AppFlowy** — 60K stars. Offline-capable desktop app. Documents + databases + kanban + AI assistant. Use for: internal docs, strategy files, quarterly reviews. Replaces Notion workspaces.

**Mixpost** (alternative to Postiz) — MIT license (core), Laravel + Docker. Multi-workspace, approval workflows, all major platforms. Use if clean license matters more than features.

---

## 4. Image Generation — Self-Hosted

### The stack

**Runtime: ComfyUI** — REST API + websocket, extensible via custom nodes, MCP connector available (`comfyui-mcp-server`). Production-grade for agent integration.

**Fastest on Apple Silicon: Draw Things** — native Metal, 20% faster than ComfyUI on Mac. No agent API. Use for manual image work.

**Model: FLUX.1**

| Variant | License | VRAM | Use |
|---|---|---|---|
| **FLUX.1 Schnell** | **Apache 2.0** | 8GB Q4 | 1–4 steps, fast, **commercial use, offline** |
| **FLUX.1 Dev** | Dev license | 16–24GB | Highest quality, non-commercial |
| FLUX.2 | Commercial | 54GB+ | November 2025, requires substantial hardware |

**Start with FLUX.1 Schnell (Apache 2.0) for commercial offline use.**

**Quality vs cloud:** FLUX.1 Dev at full precision is competitive with Midjourney v6 for photorealism. DALL-E 3 is now clearly below FLUX.1. The "in-house" feel is achievable.

**Agent integration:** Install `comfyui-mcp-server` → Studio Design can call ComfyUI directly as an MCP tool. Image generation becomes a first-class handoff from the Studio agent, not a separate manual step.

### ComfyUI on Apple Silicon

```bash
git clone https://github.com/comfyanonymous/ComfyUI.git
cd ComfyUI && pip install -r requirements.txt
python main.py --force-fp16  # Apple Silicon flag
```

Use ComfyUI Manager to install FLUX nodes. REST API at `localhost:8188`.

**Performance:** M3 Max (64GB) — 1024×1024 FLUX.1 Schnell in ~45 seconds. Slower than cloud (Midjourney: 15–30s) but zero ongoing cost and fully offline.

---

## 5. Video Generation — Self-Hosted

### Best Apple Silicon options

| Model | License | Mac Support | Quality | Speed (M3 Max) |
|---|---|---|---|---|
| **LTX-Video 0.9.5** | — | Native MLX app | Tier 2 | ~90s/clip, best on Mac |
| **Wan 2.2** | — | ComfyUI (partial MPS) | Tier 1 | 5–15 min/clip |
| **CogVideoX-5B** | Apache 2.0 | ComfyUI | Tier 2 | Moderate |
| **Mochi 1** | **Apache 2.0** | ComfyUI | Tier 2 | Moderate |

**Start with LTX-Video native Mac app** (github.com/james-see/ltx-video-mac) — uses MLX for Apple Silicon acceleration, best speed:quality ratio currently available offline.

**Honest assessment:** Local video generation in mid-2026 is functional for B-roll, social content, concepting, and mockups. Not yet at Runway Gen-3/Kling 1.5 quality for production advertising. Gap is closing fast. Use Higgsfield for production-quality, local for iteration and concepting.

**ComfyUI video nodes** (via ComfyUI Manager):
- `LTXVideoWrapper` — LTX-Video
- `WanVideoWrapper` — Wan 2.1/2.2
- `HunyuanVideoWrapper` — HunyuanVideo

---

## 6. Multi-LLM Bridge: LiteLLM

**Why LiteLLM is the core piece:**

- Single OpenAI-compatible API endpoint for 100+ providers (Anthropic, OpenAI, Bedrock, Ollama, vLLM, etc.)
- **Fallback routing:** Claude Sonnet → Qwen3 72B (Ollama) when offline. Transparent to all callers.
- **MCP bridge:** Routes non-MCP providers through MCP tools. `server_url="litellm_proxy"` mode.
- **Cost tracking:** PostgreSQL backend, per-team API keys, budget limits per model.
- **4ms overhead** — effectively zero latency cost.
- **Drop-in for Claude Code:** Set `ANTHROPIC_BASE_URL=http://localhost:4000`. Claude Code routes through LiteLLM which dispatches based on connectivity rules.

**Routing rules to configure:**
```yaml
model_list:
  - model_name: claude-sonnet-4-6
    litellm_params:
      model: anthropic/claude-sonnet-4-6
      fallback: ollama/qwen3:72b  # offline fallback
  - model_name: claude-haiku-4-5
    litellm_params:
      model: anthropic/claude-haiku-4-5
      fallback: ollama/qwen3:8b
  - model_name: claude-opus-4-8
    litellm_params:
      model: anthropic/claude-opus-4-8
      # No fallback — Opus-class decisions stay cloud-only
```

---

## 7. Installation Roadmap

### Week 1 — Foundation
1. **Ollama** — 2 min. Pull `qwen3:8b`, `qwen3:14b`, `llama4-scout:17b`
2. **LiteLLM Proxy** — 10 min Docker. Configure cloud/local routing rules.
3. **Open WebUI** — 10 min Docker. Connect to Ollama + LiteLLM.
4. **n8n** — 5 min Docker. Install MCP community nodes.
5. **DocuSeal** — 10 min. Single container. Immediate ROI.

### Week 2 — SaaS Migration
6. **Cal.diy** — Replace Calendly. Wire webhook → n8n.
7. **Plane** — Replace Monday.com. CSV import from existing boards.
8. **Mattermost** — Replace Slack. Wire n8n integration.
9. **Baserow** — Replace Airtable structured data.

### Week 3 — AI Creative
10. **ComfyUI + FLUX.1 Schnell** — Self-hosted image generation.
11. **comfyui-mcp-server** — Wire ComfyUI to Studio Design agent via MCP.
12. **LTX-Video native Mac app** — Local video generation.

### Week 4 — Advanced
13. **Dify** — LLM app platform for customer-facing agents.
14. **AnythingLLM** — Document RAG workspaces (contracts, knowledge base).
15. **AppFlowy** — Offline-capable document collaboration.
16. **Mixpost / Postiz self-hosted** — Social scheduling off SaaS.

---

## 8. What stays cloud-only

Even with a full local stack, some things remain cloud-dependent by policy (not by capability):

- **Sentinel A3 reviews before external shipment** — Opus 4.8 only. No local fallback. External-facing content does not ship on a local model.
- **Investor letters, legal drafting, sovereignty-facing content** — Opus 4.8 only.
- **Bright Data scraping** — API-based, requires connectivity.
- **Gmail MCP, Google Drive MCP** — Cloud services by nature.

Everything else can degrade gracefully to local models when offline.
