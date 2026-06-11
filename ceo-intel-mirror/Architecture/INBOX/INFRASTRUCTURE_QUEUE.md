# Infrastructure Queue
**Owner:** Scout files failures here. Jason or Prajjawal action items for infrastructure issues.
**Purpose:** Deploy issues, launchd failures, API outages, broken scripts, credential expirations.

---

## Format

```
### [Date] — [Component]
**Issue:** [what broke or is at risk]
**Impact:** [which agents affected]
**Status:** OPEN | IN PROGRESS | RESOLVED
**Filed by:** [agent]
**Action needed from:** Jason | Prajjawal | Claude
```

---

## Queue

### 2026-06-05 — Bright Data token
**Issue:** Bright Data token expired 2026-05-07 under 12b@12butterflies.life. Instagram scrape queue has ~70 items backlogged.
**Impact:** Scout (Instagram scrape), Curator (content filing), CEO Daily Brief (content intel)
**Status:** OPEN
**Filed by:** Scout
**Action needed from:** Jason — renew token on Wednesday (account: 12b@12butterflies.life)

### 2026-06-05 — R-17 scrape-helper.js fix
**Issue:** scrape-helper.js at launchd home path not in sync with updated version at repo path.
**Impact:** Scout (daily Instagram scrape via launchd)
**Status:** OPEN — three-line shell fix available in 2026-05-04 architecture drop
**Filed by:** Scout
**Action needed from:** Claude — apply the patch

<!-- New items appended below this line -->
