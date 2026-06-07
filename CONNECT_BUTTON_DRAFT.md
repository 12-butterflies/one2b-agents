# connect.one2b.io — Website Button Draft
**For: one2b.io homepage**
**Drop this into the site source wherever the secondary CTA should live.**

---

## The button HTML

Place this alongside or beneath the existing "Apply for Valuation" button:

```html
<a href="https://connect.one2b.io" class="cta-secondary">
  Join the network
</a>
```

Or as a standalone section in the footer / nav:

```html
<a href="https://connect.one2b.io" target="_blank" rel="noopener">
  Join the One 2b network →
</a>
```

---

## Where it should go on one2b.io

**Option A — Nav bar** (highest visibility):
Add "Join the network" as the rightmost nav item, styled as a ghost button next to "Apply for Valuation".

**Option B — Hero section** (under the primary CTA):
Below "Apply for Valuation / 48-hour initial assessment", add a softer secondary line:
> Not ready for a valuation? [Join the network →](https://connect.one2b.io)

**Option C — Footer**:
Add a "Join the network" link in the footer alongside the other nav links.

**Recommended: Option B** — it catches people who aren't ready to apply but want to stay connected. Investors, advisors, and partners all land here first.

---

## Why this matters

Right now connect.one2b.io gets shared as a bare WhatsApp link. If that link breaks or changes, there's no fallback — people just hit an error with no context.

With a button on the website:
- People discover it through a trusted surface (one2b.io)
- If the URL ever changes, one edit on the website fixes it everywhere
- It looks credible — arriving from the site rather than a cold link
- The website provides context before the form asks for details

---

## Deployed at
- [connect.one2b.io](https://connect.one2b.io) — Cloudflare Pages, hello@one2b.io account
- Project: iap-form
- Deploy: [dash.cloudflare.com](https://dash.cloudflare.com) → Workers & Pages → iap-form
