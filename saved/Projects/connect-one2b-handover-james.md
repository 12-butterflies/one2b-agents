# connect.one2b.io — Technical Handover for James Farrell (CTO)
**Prepared by:** Jason Peter Stevens
**Date:** 2026-06-10
**Purpose:** Full picture of how connect.one2b.io was built so you can take ownership, embed it into the website, and move hosting as needed.

---

## What it is

**connect.one2b.io** is One 2b's counterparty onboarding form. Every partner, investor, advisor, and client who enters our orbit goes through this link first. It captures 12 data dimensions at first touch (role, investor type, insurance line, sector focus, geography, etc.) and writes the submission directly into our Monday.com IAP (Investors, Advisors & Partners) board. A notification fires to intel@one2b.io on every new signup.

---

## How it was built

### Frontend
- **Pure HTML, CSS, JavaScript** — no framework, no build step required
- Tile-picker UI: multi-select role cards that conditionally reveal follow-up sections based on what the user selects (e.g. selecting "Investor" reveals the Investor Type grid, selecting "Insurance" reveals the Insurance Line grid)
- Completable in under 3 minutes
- Mobile responsive
- The source code lives in a zip file: **iap-form-fixed.zip** (Drive fileId: `17rRkxs9u4qKaC8dqG6ev-U8GZVW7F2KB`)

### Backend
- **Cloudflare Worker** — a serverless JavaScript function that receives the form POST, formats the data, and calls the Monday.com API to create a new board item
- Worker URL: `workerjs.falling-mode-2088.workers.dev`
- Authenticated via Monday.com API token stored as a Cloudflare Worker environment secret

### Hosting (current)
- **Cloudflare Pages** — project name: `iap-form`
- Default domain: `iap-form.pages.dev`
- Custom domain: `connect.one2b.io` mapped via CNAME in Cloudflare DNS
- Account: `hello@one2b.io` on [dash.cloudflare.com](https://dash.cloudflare.com)
- Deploy path: Cloudflare Dashboard → Workers & Pages → iap-form → upload zip

### DNS
- CNAME record: `connect` → `iap-form.pages.dev`
- Managed under the `one2b.io` domain in the same Cloudflare account (`hello@one2b.io`)

### Monday.com integration
- Board: **Investors, Advisors & Partners (IAP)** — board ID `18415032975` on `12butterflies.monday.com`
- On form submission: Worker creates a new Monday item with all 12 capture columns populated
- Automation set up in Monday to send a notification email to `intel@one2b.io` on item creation

---

## Why partners are getting errors

Most likely causes (in order of probability):

1. **Cloudflare Worker error** — the Worker may be hitting a Monday.com API rate limit or the API token may have expired. Check Worker logs in Cloudflare Dashboard → Workers & Pages → `workerjs.falling-mode-2088.workers.dev` → Logs.
2. **CORS issue** — if the form is being embedded in an iframe or external site without correct CORS headers on the Worker.
3. **Monday.com API change** — the Monday API occasionally deprecates column value formats. Check if the Worker's column value JSON still matches the current Monday column schema.

---

## What James needs to do to take ownership

1. **Get access to Cloudflare** — ask Jason to add `james@one2b.io` as a member on the `hello@one2b.io` Cloudflare account. All assets live there.
2. **Download the source** — [iap-form-fixed.zip](https://drive.google.com/file/d/17rRkxs9u4qKaC8dqG6ev-U8GZVW7F2KB/view) from Drive. This is the deployable frontend.
3. **Check Worker logs** — Cloudflare Dashboard → Workers & Pages → find `workerjs.falling-mode-2088.workers.dev` → Logs tab. This will show exactly what errors are firing.
4. **To embed in the website** — the form can be dropped into any page as a standalone HTML file, or the Worker endpoint can be called from a custom form built in the website's native stack. The Worker URL is the integration point.
5. **To move hosting** — the frontend is plain HTML/CSS/JS so it can be hosted anywhere (Netlify, Vercel, the main one2b.io site). The Worker can stay on Cloudflare or be rewritten as any serverless function. The only dependency is the Monday.com API token (currently stored as a Cloudflare secret — James will need that value from Jason).

---

## Key credentials James will need from Jason

- Monday.com API token (currently stored as Cloudflare Worker secret)
- Cloudflare account access (`hello@one2b.io`)
- Monday.com board ID: `18415032975`

---

## Capture structure reference

The form captures 12 data dimensions. Full specification (v1.7) is here:
[One2b IAP Capture Structure v1.7](https://docs.google.com/document/d/1PxTCnIEZPp2ETheGkNxgawhFH7LXTblOHRneBX81k-Y/edit)

---

*End of handover document.*
