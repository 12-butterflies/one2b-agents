#!/usr/bin/env node
// Bright Data scrape helper for Triage daily sweep.
// Reads a list of URLs (one per line) and scrapes each via the bdata CLI.
// Output: one .txt file per URL in the output directory, plus a _summary.json.
//
// Usage:
//   node scrape-helper.js <urls-file> <output-dir>
//
// Example:
//   node scrape-helper.js /tmp/instagram-urls.txt /tmp/scraped-2026-04-30/

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const urlsFile = process.argv[2];
const outputDir = process.argv[3] || './scraped';

if (!urlsFile) {
  console.error('Usage: node scrape-helper.js <urls-file> [output-dir]');
  process.exit(1);
}

if (!fs.existsSync(urlsFile)) {
  console.error(`URLs file not found: ${urlsFile}`);
  process.exit(1);
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const urls = fs
  .readFileSync(urlsFile, 'utf-8')
  .trim()
  .split('\n')
  .map(u => u.trim())
  .filter(u => u && !u.startsWith('#'));

if (urls.length === 0) {
  console.log('No URLs to scrape.');
  process.exit(0);
}

console.log(`Scraping ${urls.length} URLs via Bright Data (host-aware routing: cli_unlocker / cli_browser / pipelines)...`);
console.log(`Output dir: ${outputDir}`);

const results = [];
const startedAt = new Date().toISOString();

// URL routing rules — picks the right Bright Data primitive per host.
// Instagram → instagram pipeline → cli_unlocker fallback → cli_browser fallback (with --country us for geo retry)
// YouTube → youtube_videos pipeline → cli_browser fallback (JS rendering required)
// TikTok / X / Twitter → cli_browser zone (JS-heavy SPAs)
// Everything else → cli_unlocker zone (static HTML, fastest, cheapest)
function routeUrl(url) {
  const host = new URL(url).hostname.toLowerCase();
  if (host.includes('instagram.com')) return 'instagram';
  if (host.includes('youtube.com') || host.includes('youtu.be')) return 'youtube';
  if (host.includes('tiktok.com')) return 'js_spa';
  if (host.includes('x.com') || host.includes('twitter.com')) return 'js_spa';
  return 'static';
}

// Redirect-tail resolver — added 2026-05-23 (PD-008).
// Many of the intel@one2b URLs are tracking redirect chains (ManyChat, Boosend, ThynkIt,
// LinkedIn email-clicks, Gumroad-MCP-token redirects) that need to be followed to their
// final destination BEFORE the scrape stack can process the actual content.
//
// Without this resolver, ~50% of an intel batch can land as "scraped" but the captured
// content is the redirect intermediary's HTML (a loading shell or affiliate tracking page),
// not the real content the user wants to harvest.
//
// Pattern: detect known redirect-chain hosts up front, use `curl -L` to follow the chain,
// capture the final URL, then run the normal route + scrape on the final URL.
//
// Returns: { resolved: true, finalUrl: string, hops: number } if URL was a redirect chain
//          { resolved: false, finalUrl: original } if URL doesn't match a known redirect host or curl failed
const REDIRECT_HOSTS = [
  /^my\.manychat\.com\/r\?/i,          // ManyChat Instagram DM redirects
  /^lc\.thynkit\.io\/c\//i,            // ThynkIt newsletter clicks
  /^email\.lc\.thynkit\.io\/c\//i,     // ThynkIt email tracking
  /^app\.boosend\.ai\/api\/click/i,    // Boosend campaign clicks
  /^link\.mail\.beehiiv\.com\//i,      // beehiiv newsletter redirects
  /^substack\.com\/redirect/i,         // Substack newsletter redirects
  /\.gumroad\.com\/l\/.*mcp_token/i,   // Gumroad MCP-token-gated redirects
];
function shouldResolveRedirect(url) {
  return REDIRECT_HOSTS.some(re => re.test(url.replace(/^https?:\/\//, '')));
}
function resolveRedirect(url) {
  try {
    // curl -L follows redirects; -o /dev/null discards body; -w prints final URL
    // -s silent, -I head-only, --max-time 15 caps the time, --connect-timeout 8 connects faster
    const cmd = `curl -L -s -I -o /dev/null -w '%{url_effective}|%{num_redirects}' --max-time 15 --connect-timeout 8 -A 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' ${JSON.stringify(url)} 2>&1`;
    const out = execSync(cmd, { encoding: 'utf-8', timeout: 20000 }).trim();
    const [finalUrl, hopsStr] = out.split('|');
    const hops = parseInt(hopsStr, 10) || 0;
    if (finalUrl && finalUrl !== url && hops > 0) {
      return { resolved: true, finalUrl, hops };
    }
    return { resolved: false, finalUrl: url };
  } catch (err) {
    return { resolved: false, finalUrl: url, error: err.message.slice(0, 120) };
  }
}

function execScrape(cmd) {
  return execSync(cmd, {
    encoding: 'utf-8',
    maxBuffer: 1024 * 1024 * 20, // 20MB
    timeout: 90000, // 90s per URL — browser zone is slower than unlocker
  });
}

// Content quality validation — added 2026-05-04 (PD-007).
// The 2026-04-30 sweep accepted 5 Spanish-locale Instagram login walls as "successful" scrapes
// because they returned 15KB+ and didn't throw. The walled content was useless — just IG's
// language-picker UI plus a "Regístrate / Iniciar sesión" wall. This function detects walled
// or empty-shell responses and forces fallback to the next attempt rather than declaring success.
//
// Returns {ok: true} when content looks substantive enough to be useful.
// Returns {ok: false, reason: <string>} when content should be rejected and the next fallback tried.
function validateContent(content, route) {
  if (!content || content.length < 200) {
    return { ok: false, reason: 'response too thin (<200 bytes)' };
  }
  // Generic login-wall markers (Instagram + similar gated platforms)
  const loginWallMarkers = [
    { re: /Reg[ií]strate.{0,30}Iniciar sesi[óo]n/i, label: 'IG-Spanish-wall' },
    { re: /Inicia sesi[óo]n para ver/i, label: 'IG-Spanish-wall-v2' },
    { re: /Sign up to see more (photos|videos|content)/i, label: 'IG-English-wall' },
    { re: /Log in to (continue|see this content)/i, label: 'generic-login-wall' },
    { re: /This (content|page) isn'?t available right now/i, label: 'IG-blocked-page' },
    { re: /Page Not Found.*Instagram/i, label: 'IG-not-found' },
  ];
  for (const marker of loginWallMarkers) {
    if (marker.re.test(content)) {
      return { ok: false, reason: `login wall detected (${marker.label})` };
    }
  }
  // Instagram-specific: walled responses are dominated by the language-picker boilerplate.
  // A clean IG post returns ~25-35KB with caption substance; a walled response is ~15KB
  // and contains the language picker plus a few footer lines and nothing else.
  if (route === 'instagram') {
    const languagePickerMatches = (content.match(/(Espa[ñn]ol \(Espa[ñn]a\)|Fran[çc]ais|Deutsch|Portugu[êe]s \(Brasil\)|Italiano|Nederlands)/g) || []).length;
    if (languagePickerMatches >= 4 && content.length < 22000) {
      return { ok: false, reason: 'IG response dominated by language-picker boilerplate (likely walled, not signed-in view)' };
    }
  }
  return { ok: true };
}

urls.forEach((originalUrl, i) => {
  let url = originalUrl;
  let redirectInfo = null;

  // Redirect-tail resolution (PD-008, 2026-05-23). If the URL matches a known
  // tracking-redirect host, resolve to the final destination before scraping.
  if (shouldResolveRedirect(originalUrl)) {
    const resolved = resolveRedirect(originalUrl);
    if (resolved.resolved) {
      url = resolved.finalUrl;
      redirectInfo = { from: originalUrl, hops: resolved.hops };
      process.stdout.write(`[redirect ${resolved.hops} hops → ${url.slice(0, 60)}] `);
    } else if (resolved.error) {
      process.stdout.write(`[redirect-resolve-failed: ${resolved.error.slice(0, 50)}] `);
    }
  }

  // Sanitize filename — keep first 80 chars of URL, replace non-word chars.
  // Use the final URL (post-redirect) for the filename so the artifact is greppable by destination.
  const safeName = url.replace(/^https?:\/\//, '').replace(/[^\w]/g, '_').slice(0, 80);
  const outputFile = path.join(outputDir, `${String(i).padStart(3, '0')}_${safeName}.txt`);

  process.stdout.write(`[${i + 1}/${urls.length}] ${url.slice(0, 80)}... `);

  const route = routeUrl(url);
  const attempts = [];

  if (route === 'instagram') {
    // 2026-06-05 fix: correct pipeline names and CLI syntax.
    // bdata pipelines uses positional args: `bdata pipelines <pipeline_name> <url>`
    // NOT `bdata pipelines run --pipeline NAME --inputs JSON` (that syntax does not exist).
    // Pipeline names confirmed via `bdata pipelines list`: instagram_reels, instagram_posts, instagram_profiles.
    const isReel = url.includes('/reel/');
    const primaryPipeline = isReel ? 'instagram_reels' : 'instagram_posts';
    attempts.push({ label: primaryPipeline, cmd: `bdata pipelines ${primaryPipeline} ${JSON.stringify(url)} 2>&1` });
    attempts.push({ label: 'instagram_posts-fallback', cmd: `bdata pipelines instagram_posts ${JSON.stringify(url)} 2>&1` });
    attempts.push({ label: 'instagram_reels-fallback', cmd: `bdata pipelines instagram_reels ${JSON.stringify(url)} 2>&1` });
  } else if (route === 'youtube') {
    // 2026-06-05 fix: correct pipeline name and CLI syntax for YouTube.
    // youtube_transcripts does NOT exist in the account. youtube_videos does.
    // Rewrite mobile URLs to desktop before pipeline call.
    const desktopUrl = url.replace('m.youtube.com', 'www.youtube.com');
    attempts.push({ label: 'youtube_videos-pipeline', cmd: `bdata pipelines youtube_videos ${JSON.stringify(desktopUrl)} 2>&1` });
    attempts.push({ label: 'youtube_comments-pipeline', cmd: `bdata pipelines youtube_comments ${JSON.stringify(desktopUrl)} 2>&1` });
    attempts.push({ label: 'cli_browser-desktop', cmd: `bdata scrape --zone cli_browser ${JSON.stringify(desktopUrl)} 2>&1` });
  } else if (route === 'js_spa') {
    attempts.push({ label: 'cli_browser', cmd: `bdata scrape --zone cli_browser ${JSON.stringify(url)} 2>&1` });
    attempts.push({ label: 'cli_unlocker', cmd: `bdata scrape --zone cli_unlocker ${JSON.stringify(url)} 2>&1` });
  } else {
    attempts.push({ label: 'cli_unlocker', cmd: `bdata scrape --zone cli_unlocker ${JSON.stringify(url)} 2>&1` });
    attempts.push({ label: 'cli_browser', cmd: `bdata scrape --zone cli_browser ${JSON.stringify(url)} 2>&1` });
  }

  let succeeded = false;
  let lastError = null;

  for (const attempt of attempts) {
    try {
      const result = execScrape(attempt.cmd);
      // Content quality validation (PD-007 fix, 2026-05-04). Reject walled / empty-shell
      // responses and continue to next fallback rather than declare a false success.
      const qualityCheck = validateContent(result, route);
      if (!qualityCheck.ok) {
        lastError = new Error(`content-quality reject (${attempt.label}): ${qualityCheck.reason}`);
        continue;
      }
      fs.writeFileSync(outputFile, result);
      results.push({
        url,
        originalUrl: redirectInfo ? redirectInfo.from : undefined,
        redirectHops: redirectInfo ? redirectInfo.hops : undefined,
        success: true,
        file: path.basename(outputFile),
        bytes: result.length,
        route,
        method: attempt.label,
      });
      console.log(`OK via ${attempt.label} (${result.length} bytes)`);
      succeeded = true;
      break;
    } catch (err) {
      lastError = err;
      // continue to next attempt
    }
  }

  if (!succeeded) {
    results.push({
      url,
      success: false,
      route,
      attemptsExhausted: attempts.map(a => a.label),
      error: lastError ? lastError.message.slice(0, 200) : 'unknown',
    });
    console.log(`FAILED after ${attempts.length} attempts: ${lastError ? lastError.message.slice(0, 80) : 'unknown'}`);
  }
});

const finishedAt = new Date().toISOString();
const summary = {
  startedAt,
  finishedAt,
  total: urls.length,
  successful: results.filter(r => r.success).length,
  failed: results.filter(r => !r.success).length,
  results,
};

const summaryFile = path.join(outputDir, '_summary.json');
fs.writeFileSync(summaryFile, JSON.stringify(summary, null, 2));

console.log(`\n=== Sweep complete ===`);
console.log(`Successful: ${summary.successful}/${summary.total}`);
console.log(`Failed:     ${summary.failed}/${summary.total}`);
console.log(`Summary:    ${summaryFile}`);
