# LIHOV PLH — Business Website Verification Audit Report (V2 MAX)

**Audit Date:** 2026-11-25 (UTC+7 / `Asia/Phnom_Penh`)  
**Target Brand:** LIHOV PLH  
**Target Domain:** `https://lihov.com`  
**Business Email:** `contact@lihov.com`  
**Objective:** Google Play Console Personal-to-Organization Account Conversion & Official Website Readiness  
**D-U-N-S Application Case Number:** `DFC-747650`  

---

## Final Decision

### **NOT READY — TECHNICAL ISSUES FOUND**

> **Important Distinction:** The **local Next.js repository** in this workspace has been audited, repaired, built, and verified across TypeScript, ESLint, unit tests, static quality audit, live local HTTP/API probes, and headless Chrome desktop/mobile runtime checks. However, the **live domain (`https://lihov.com` / `https://www.lihov.com`) is NOT READY** for Google Search Console or Google Play Console website verification because live production traffic is still routed to a legacy static HTML site (`PLH TUNNEL VPN`) where all required Next.js routes (`/about`, `/services`, `/apps`, `/contact`, `/privacy`, `/terms`, `/support`, `/data-deletion`, `/robots.txt`, `/sitemap.xml`) currently return **HTTP 404**.

---

## 1. Master Verification Matrix

Statuses strictly follow the V2 MAX verification taxonomy: `PASS`, `FAIL`, `WARNING`, `PENDING`, `NOT TESTED`, `NOT APPLICABLE`.

| Audit Area | Check Item | Status | Observed Evidence / Notes |
| --- | --- | --- | --- |
| **Source Code Quality** | TypeScript strict typecheck (`npm run typecheck`) | **PASS** | `tsc --noEmit` completed with 0 errors after final code repairs. |
| **Source Code Quality** | ESLint (`npm run lint`) | **PASS** | `next lint` passed with 0 errors and 0 warnings. |
| **Source Code Quality** | Automated unit/config suite (`npm run test`) | **PASS** | 9 / 9 Node.js tests passed after all edits. |
| **Source Code Quality** | Quality, link, secret, brand & a11y audit (`npm run test:audit`) | **PASS** | 70 files scanned (52 code files), 0 broken internal links, 0 exposed secrets, 0 stale `"LIHOV Studio"` or template warnings, all 5 accessibility checks true. |
| **Production Build** | Next.js production build (`npm run build`) | **PASS** | Next.js `15.5.29` built cleanly in 5.8s; 16 static pages generated, 2 API routes (`/api/contact`, `/api/data-deletion`). |
| **Runtime Verification** | Local production HTTP, API & headless Chrome CDP checks | **PASS** | All 9 routes `200 OK`, unknown route `404`, `/robots.txt` & `/sitemap.xml` `200 OK`, all 8 security headers verified, API CSRF (`403`), validation (`400`), honeypot (`400`), rate-limit (`429`), honest unconfigured relay (`503`), desktop (`1280x800`) + mobile (`390x844`) 0 horizontal overflow, English light-only UI verified (both language & dark-view header toggles removed), 0 console/page errors. |
| **Live Vercel Deployment** | Live domain serving audited LIHOV PLH Next.js site | **FAIL** | `https://lihov.com/` redirects `308` -> `https://www.lihov.com/`, which serves a legacy static HTML page (`PLH TUNNEL VPN - index.html`) instead of this Next.js project. |
| **Live Public Routes** | Live `/about`, `/services`, `/apps`, `/contact`, `/privacy`, `/terms`, `/support`, `/data-deletion`, `/robots.txt`, `/sitemap.xml` | **FAIL** | All 10 tested URLs on `https://lihov.com` redirect to `https://www.lihov.com/...` and return **HTTP 404** (`NOT_FOUND`). |
| **Domain & DNS** | Authoritative DNS (`ns.checkdomain.de`, `ns2.checkdomain.de`) & resolution | **PASS** | Apex `A` = `216.198.79.1` (TTL 300); `www` `CNAME` = `c9eedb61b508e180.vercel-dns-017.com.` -> `216.198.79.65`, `64.29.17.65`. |
| **Domain & DNS** | Canonical domain redirect alignment | **WARNING** | Live Vercel redirects apex `https://lihov.com/` `308` -> `https://www.lihov.com/`, whereas `config/business.ts` configures `officialDomain: "lihov.com"`. Set `lihov.com` primary in Vercel or set `NEXT_PUBLIC_SITE_URL=https://www.lihov.com`. |
| **Domain & DNS** | IPv6 (`AAAA`) records | **NOT APPLICABLE** | No `AAAA` record on `lihov.com` or `vercel-dns-017.com`; IPv4 Anycast works cleanly. |
| **SSL & HTTPS** | TLS certificate & HTTP-to-HTTPS redirect | **PASS** | Valid Let's Encrypt TLSv1.3 certs on both `lihov.com` and `www.lihov.com` (`Nov 25 2026` – `Feb 23 2027 GMT`); `http://` redirects `308` to `https://`. |
| **Security (Codebase)** | Security headers, CSP, CSRF, rate-limit, honeypot, SSRF checks | **PASS** | Configured in `next.config.ts`, `lib/security.ts`, `lib/rate-limit.ts`, `lib/webhook.ts`; verified at runtime on local `next start`. |
| **Security (Live Site)** | Live HTTP security headers on `https://www.lihov.com/` | **FAIL** | Live legacy site currently emits only `Strict-Transport-Security: max-age=63072000`; missing `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`. |
| **Security (Dependencies)** | `npm audit --json` vulnerability scan | **WARNING** | 0 critical vulnerabilities; 2 advisories in `postcss` (`<=8.5.22`, 1 high / 1 moderate build-time path-traversal & CSS stringify issues) bundled inside `next@15.5.29` (fix listed by npm is breaking major upgrade `next@16.4.6`). |
| **Business Email** | Checkdomain MX & SPF DNS records | **PASS** | `MX 10 mx03.secure-mailgate.com.`, `MX 20 mx04.secure-mailgate.com.`; `TXT "v=spf1 include:secure-mailgate.com ?all"`. |
| **Business Email** | DMARC (`_dmarc.lihov.com`), DKIM, SPF strictness (`?all`) | **WARNING** | `_dmarc.lihov.com` returned `NXDOMAIN`; no DKIM `TXT` record found on standard selectors; SPF uses neutral `?all` rather than `~all`. |
| **Business Email** | Live inbox send/receive test (`contact@lihov.com`) & form webhook | **NOT TESTED** / **PENDING** | Mailbox access is unavailable to agent; `CONTACT_WEBHOOK_URL` is unset (forms safely return HTTP `503` and expose `mailto:contact@lihov.com` fallback). |
| **Google Search Console** | Verification readiness in codebase (`GOOGLE_SITE_VERIFICATION`, HTML file, JSON-LD) | **PASS** | Cleanly supported in `config/business.ts` & `lib/seo.ts`; placeholder `[MY VERIFICATION CODE]` safely suppressed from HTML. |
| **Google Search Console** | Live ownership token / verification status | **FAIL** / **PENDING** | No `google-site-verification` `TXT` record in `lihov.com` DNS; no `google*.html` or meta verification token live; Search Console access unavailable -> **NOT VERIFIED**. |
| **Google Play Console** | Store listing & developer profile consistency (`com.lihov.plh`) | **WARNING** / **PENDING** | Play Store currently lists `https://web-lihov-v5.vercel.app/` (`henglihov.online`), `plhowner@gmail.com`, and `Thanalbek Village...` instead of `https://lihov.com`, `contact@lihov.com`, and `House No. 45, National Road 6...`. |
| **Google Play Console** | D-U-N-S (`DFC-747650`), organization docs, payments profile, email & phone OTP | **PENDING** | Requires D-U-N-S issuance and manual Play Console owner action (`Manage account > Account details > About you`). |
| **Privacy & App Support** | Bilingual Privacy Policy, Terms, Support, Data Deletion & real app portfolio | **PASS** (Local Code) | `Trader God Signals` (`com.lihov.plh`, v102, published), `Pip's Wonder Garden` (in development), `PLH Tunnel VPN` (`com.lihov.vpn`, in development, store link gated); template disclaimers removed; localized per-app disclosures added. |

### Documented Technical Readiness Summary

- **Local Codebase Automated Checks:** `14 / 14` documented local repository checks passed (`typecheck`, `lint`, `test`, `test:audit`, `build`, runtime HTTP routes/assets/404, runtime API security/fallback, desktop/mobile headless Chrome checks).
- **Live Domain & External Readiness Checks:** Live production checks show **3 critical `FAIL` items** (legacy static site deployed on `www.lihov.com`, 404 across all Next.js routes/SEO endpoints, missing live security headers & verification token), plus **WARNING** and **PENDING** items for DNS/email hardening (`_dmarc`/DKIM), dependency advisories, Play Store listing alignment, and D-U-N-S (`DFC-747650`) + Google account verification.
- *Note:* Technical readiness measurements reflect documented infrastructure and code checks only and do **not** represent a probability of Google Play Console approval.

---

## 2. Official Google Requirements Breakdown

Grounded in retrieved official Google documentation ([Answer 16260648](https://support.google.com/googleplay/android-developer/answer/16260648), [Answer 10841920](https://support.google.com/googleplay/android-developer/answer/10841920), [Answer 9008080](https://support.google.com/webmasters/answer/9008080), [Answer 15633622](https://support.google.com/googleplay/android-developer/answer/15633622)):

1. **Mandatory Google Play Organization & Conversion Requirements:**
   - Existing personal developer account must be fully verified with zero pending verification warnings on Play Console **Home**.
   - **Website Ownership Verification:** Enter official website URL (`https://lihov.com`) under **Manage account -> Account details -> About you**, send verification request, and verify/approve ownership in **Google Search Console** using the same Google Account (or an owner account that accepts the Search Console association request). Only after website verification completes does **Change account type** become available.
   - **Organization Payments Profile & D-U-N-S Number:** Create/link an organization Google Payments profile with a valid 9-digit **D-U-N-S number** (unless an official government organization exception applies; `DFC-747650` is currently in progress).
   - **Exact Legal Name & Address Matching:** Registered organization name and address on Cambodian official documents, D-U-N-S profile, Google Payments profile, and public website (`LIHOV PLH`) must match precisely.
   - **Identity & Organization Documents:** Upload requested official government photo ID and organization registration documents.
   - **Developer Email & Organization Phone OTP Verification:** Verify developer email via 6-digit code and organization phone number in international format (`+855717227986`) via SMS/voice OTP (phone verification is unlocked only after identity + website verifications complete).
2. **Recommended Website Improvements:**
   - Canonical domain consistency (`https://lihov.com` primary without cross-redirect ambiguity), strict HTTP security headers, live `/privacy`, `/support`, `/contact`, `/apps`, `/data-deletion` accessible without login walls or template banners, DMARC + DKIM email authentication for `contact@lihov.com`, and matching Play Store listing metadata (`com.lihov.plh`).
3. **Optional SEO Features (Not Mandatory for Play Verification):**
   - `Organization` JSON-LD structured data, `/sitemap.xml` submission in Search Console, Open Graph / Twitter cards, and Khmer/English dual-language UX.
4. **Application-Specific Google Play Policies:**
   - `Trader God Signals` (`com.lihov.plh`): Must keep `/privacy#trader-god-signals` and `/data-deletion` aligned with Play Console Data Safety (`Location, Personal info and 8 others`, encrypted in transit, no third-party sharing declared, deletion request supported) and AdMob / In-App Purchases disclosures.
   - `Pip's Wonder Garden` and `PLH Tunnel VPN` (`com.lihov.vpn`): Must remain accurately marked *In Development* with no active links to 404 store pages until actually published.
5. **Requirements Requiring Manual Account-Owner Action:**
   - Deploying this repository to Vercel and pointing `lihov.com` / `www.lihov.com` to it, adding Checkdomain DNS records (`TXT` verification, `_dmarc`, DKIM), running a real email test on `contact@lihov.com`, confirming Search Console verification, updating `com.lihov.plh` listing details in Play Console, waiting for D-U-N-S `DFC-747650`, uploading legal documents, and completing email/phone OTP verification.

---

## 3. Complete Change Log (Codebase & Documentation Repairs)

- **Portfolio & App Integrity ([`config/business.ts`](config/business.ts)):**
  - Added **Trader God Signals** (`id: "trader-god-signals"`, `packageName: "com.lihov.plh"`, `status: "published"`, `version: "102"`, `usesAdMob: true`, `collectsAccountData: true`, bilingual EN/KM descriptions, highlights, and screens grounded in the live Google Play Store listing).
  - Changed **PLH Tunnel VPN** package URL from `com.lihov.plh` to `https://play.google.com/store/apps/details?id=com.lihov.vpn` (`packageName: "com.lihov.vpn"`, preserving `status: "in_development"`).
  - Updated `industry` to `"Software, Android Applications, Game Development and AI Technology"` (EN & KM).
- **Broken Link Prevention & Shared UI (`AppsView.tsx`, `HomeView.tsx`, `AppArtwork.tsx`, `AppStatusBadge.tsx`, `TraderGodSignalsArt.tsx`):**
  - Created custom SVG artwork (`TraderGodSignalsIcon`, `TraderGodSignalsScreenshot`) and centralized `AppIcon` / `AppScreenshot` mapping so `HomeView` no longer hardcoded `PipWonderGardenIcon` for every app.
  - Gated clickable Play Store buttons in `AppsView.tsx` on `app.status !== "in_development"` so `PLH Tunnel VPN` (`com.lihov.vpn`, currently 404 on Play Store) displays its package ID (`com.lihov.vpn`) and honest *"will be added upon release"* notice instead of a broken 404 link.
- **UI Streamlining ([`components/layout/Header.tsx`](components/layout/Header.tsx), [`components/providers/SiteProviders.tsx`](components/providers/SiteProviders.tsx)):**
  - Removed the dark-view option and header language switcher toggle per owner request, defaulting the web UI to English light mode and clearing any prior `lihov_locale` / `lihov_theme` / `.dark` state.
- **Brand & Compliance Cleanup (`content/en.ts`, `content/km.ts`, `lib/seo.ts`, `app/*/page.tsx`, `app/not-found.tsx`, `public/brand/*`, `PrivacyView.tsx`, `TermsView.tsx`, `DataDeletionView.tsx`, `ContactView.tsx`):**
  - Eliminated all stale `"LIHOV Studio"` brand mismatches in favor of `"LIHOV PLH"`.
  - Removed `"Editable Legal Template"` and `"configurable template"` alert banners from `/privacy` and `/terms`.
  - Localized per-app AdMob / user-data strings in `PrivacyView.tsx` and network error messages in `ContactView.tsx` / `DataDeletionView.tsx`; added `<datalist>` app selector and `appName` field error rendering in `DataDeletionView.tsx`.
- **Security Hardening ([`lib/security.ts`](lib/security.ts), [`lib/webhook.ts`](lib/webhook.ts), `app/api/contact/route.ts`, `app/api/data-deletion/route.ts`):**
  - Extended `verifySameOrigin()` to check `Referer` when `Origin` is omitted.
  - Extracted shared `deliverWebhookSubmission()` with HTTPS scheme enforcement in production and `AbortSignal.timeout(10_000)` while retaining honest HTTP `503` (`DELIVERY_NOT_CONFIGURED`).
- **Tests & Documentation:**
  - Expanded [`tests/website.test.mjs`](tests/website.test.mjs) (9 tests) and [`tests/run-quality-checks.mjs`](tests/run-quality-checks.mjs) to enforce `LIHOV PLH` brand consistency, absence of template strings, light/English-only header verification, and `in_development` store-link gating.
  - Updated [`README.md`](README.md), [`DEPLOYMENT.md`](DEPLOYMENT.md), [`GOOGLE_VERIFICATION.md`](GOOGLE_VERIFICATION.md), [`SECURITY.md`](SECURITY.md), [`docs/BUSINESS_CONFIGURATION.md`](docs/BUSINESS_CONFIGURATION.md), [`docs/PRE_PRODUCTION_CHECKLIST.md`](docs/PRE_PRODUCTION_CHECKLIST.md), and [`.env.example`](.env.example).

---

## 4. Remaining Blockers & Exact Remediation Steps

### Blocker 1 (CRITICAL — Live Deployment): `lihov.com` serves legacy static HTML site & returns 404 on required routes
- **What is wrong:** `https://lihov.com/` redirects `308` -> `https://www.lihov.com/`, which serves an older static HTML `PLH TUNNEL VPN` site. `/about`, `/services`, `/apps`, `/contact`, `/privacy`, `/terms`, `/support`, `/data-deletion`, `/robots.txt`, and `/sitemap.xml` all return HTTP `404`, and live security headers (CSP, X-Frame-Options, etc.) are missing.
- **Why it matters:** Google Play Console and Google Search Console inspect the live public domain. Submitting `https://lihov.com` before deploying this Next.js codebase will fail policy, privacy, and brand checks.
- **Exact correction required:** Push this audited repository to GitHub, deploy it to Vercel with `NEXT_PUBLIC_SITE_URL=https://lihov.com`, attach `lihov.com` and `www.lihov.com` to **this** Vercel project (removing them from the legacy static project), set `lihov.com` as Primary Domain, and ensure Production Deployment Protection is off.
- **Ownership:** Cannot be executed by AI agent (no Vercel/GitHub credentials); **Business owner must complete manually**.

### Blocker 2 (CRITICAL — Google Ownership Verification): Domain/Site not verified in Google Search Console
- **What is wrong:** No `google-site-verification` `TXT` record exists on `lihov.com`, no verification HTML file is deployed, and `GOOGLE_SITE_VERIFICATION` is still `[MY VERIFICATION CODE]`.
- **Why it matters:** Play Console requires Search Console ownership verification before enabling **Change account type** to Organization (`Answer 16260648`).
- **Exact correction required:** After deploying Blocker 1, add `lihov.com` as a Domain property in Google Search Console using your Play Console Owner Google account and add the supplied `TXT` record (`@`) in Checkdomain DNS (preserving existing SPF/MX records), or set `GOOGLE_SITE_VERIFICATION` in Vercel.
- **Ownership:** Code support is implemented; **Business owner must execute DNS/Search Console verification manually**.

### Blocker 3 (HIGH — Play Console & D-U-N-S Identity Alignment): `com.lihov.plh` public listing and address mismatch + pending D-U-N-S `DFC-747650`
- **What is wrong:** On Google Play, `com.lihov.plh` still lists `https://web-lihov-v5.vercel.app/` (`henglihov.online`), `plhowner@gmail.com`, and `Thanalbek Village Trapeang Russey commune...`, whereas `config/business.ts` uses `https://lihov.com`, `contact@lihov.com` / `support@lihov.com`, and `House No. 45, National Road 6, Phum Kampong Svay, Sangkat Kampong Svay, Krong Stueng Saen, Kampong Thom Province 060303, Cambodia`. D-U-N-S case `DFC-747650` is not yet issued/linked.
- **Why it matters:** Discrepancies between D&B records, Google Payments profile, Play Console store listing, and website identity trigger verification delays or rejections.
- **Exact correction required:** Confirm exact registered legal name and street address on your Cambodian registration & D-U-N-S application `DFC-747650` (updating `config/business.ts` if needed so all match character-for-character), update Play Store contact details (`https://lihov.com`, `support@lihov.com`/`contact@lihov.com`), and complete Play Console Organization conversion + email/phone OTP once D-U-N-S number arrives.
- **Ownership:** **Business owner must complete manually**.

### Blocker 4 (MEDIUM — Business Email Authentication & Delivery Test): Missing DMARC/DKIM & unverified `contact@lihov.com` mailbox flow
- **What is wrong:** `MX` (`mx03/mx04.secure-mailgate.com`) and `SPF` (`?all`) exist, but `_dmarc.lihov.com` is `NXDOMAIN`, no DKIM selector was found, `CONTACT_WEBHOOK_URL` is unset, and real mailbox send/receive delivery could not be tested without mailbox credentials.
- **Why it matters:** Google Play verification emails and customer support inquiries rely on reliable delivery to `contact@lihov.com`.
- **Exact correction required:** Send a real test email from an external Gmail address to `contact@lihov.com`, `support@lihov.com`, and `privacy@lihov.com` and reply back; enable DKIM and add `_dmarc` TXT (`v=DMARC1; p=none; rua=mailto:contact@lihov.com; fo=1`) in Checkdomain; optionally configure `CONTACT_WEBHOOK_URL` in Vercel.
- **Ownership:** **Business owner must complete manually**.

### Blocker 5 (LOW / ADVISORY — Dependencies): `npm audit` reports 2 build-time `postcss` vulnerabilities inside `next@15.5.29`
- **What is wrong:** `postcss` (`<=8.5.22`) inside `node_modules/next/node_modules/postcss` has 1 high (`GHSA-6g55-p6wh-862q`, `GHSA-r28c-9q8g-f849`) and 1 moderate (`GHSA-qx2v-qp2m-jg93`, `GHSA-fxqj-rqcc-2cmp`) build-time advisories; `npm audit` notes fix requires breaking major upgrade to `next@16.4.6`.
- **Why it matters:** Although these affect CSS/source-map processing during build rather than static runtime pages, keeping dependencies updated reduces supply-chain risk.
- **Exact correction required:** Plan a dedicated major Next.js 16 + ESLint CLI migration in a separate branch when ready, and monitor Dependabot alerts.
- **Ownership:** AI agent can perform on request as a dedicated major upgrade; deferred intentionally to preserve Next 15 stability.
