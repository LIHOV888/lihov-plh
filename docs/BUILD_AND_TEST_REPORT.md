# Build, Test & Runtime Verification Report — LIHOV PLH Website

**Verified Date:** 2026-11-25 (UTC+7)

## 1. Automated Build & Static Verification (`npm run verify:all`)

| Check | Status | Result Summary |
| --- | --- | --- |
| `npm run typecheck` (`tsc --noEmit`) | **PASS** | 0 TypeScript errors |
| `npm run lint` (`next lint`) | **PASS** | 0 ESLint errors or warnings |
| `npm run test` (`node --test tests/*.test.mjs`) | **PASS** | 9 / 9 automated tests passed |
| `npm run test:audit` (`tests/run-quality-checks.mjs`) | **PASS** | 70 files scanned (52 code files), 0 broken internal links, 0 exposed secrets, 0 stale brand/template strings, all accessibility checks verified, 1 expected env-optional placeholder (`[MY VERIFICATION CODE]`) |
| `npm run build` (`next build`) | **PASS** | Next.js `15.5.29` production build succeeded (16 static routes + 2 API routes) |
| `npm audit --json` | **WARNING** | 0 critical; 2 build-time `postcss` advisories bundled inside `next@15.5.29` (fix requires breaking upgrade to Next `16.4.6`) |

## 2. Local Production Server & Headless Browser Checks

Executed against `next start` on `127.0.0.1:3199` plus headless Chrome CDP:

| Check | Status | Observed Result |
| --- | --- | --- |
| All 9 public pages (`/`, `/about`, `/services`, `/apps`, `/contact`, `/privacy`, `/terms`, `/support`, `/data-deletion`) | **PASS** | HTTP `200`, `LIHOV PLH` branding, no `[MY ...]` leakage |
| `/robots.txt`, `/sitemap.xml`, SVG brand assets, unknown route `/nonexistent-audit-route` | **PASS** | Assets/SEO `200`, unknown route `404` |
| HTTP security headers (`CSP`, `HSTS`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, `COOP`, `CORP`, no `X-Powered-By`) | **PASS** | Verified on all 9 routes |
| API security & validation (`/api/contact`, `/api/data-deletion`) | **PASS** | Cross-origin `Origin`/`Referer` -> `403`, invalid JSON/honeypot/validation -> `400`, rate limit -> `429`, unconfigured webhook -> honest `503` |
| Desktop (`1280x800`) & Mobile (`390x844`) headless Chrome layout + English light-only UI verification + console errors | **PASS** | 9 desktop routes & 4 mobile routes with 0 horizontal overflow, `lang="en"`, no language-switcher or dark-view toggle, no `.dark` class, 0 console errors, 0 uncaught page errors |
