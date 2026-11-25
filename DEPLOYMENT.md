# Deployment Guide — GitHub, Vercel & Checkdomain (`lihov.com`)

Follow this guide to deploy the audited **LIHOV PLH** Next.js website to **Vercel** and serve it on `https://lihov.com`.

> **Critical DNS Warning:** Never delete or overwrite existing Checkdomain `MX` (`mx03.secure-mailgate.com`, `mx04.secure-mailgate.com`) or `SPF` (`v=spf1 include:secure-mailgate.com ?all`) records. They power `contact@lihov.com`, `support@lihov.com`, and `privacy@lihov.com`.

---

## 1. Pre-Deployment Verification

Run all local checks before pushing:

```bash
npm ci
npm run verify:all
```

Ensure `.env.local` is never committed (`.gitignore` excludes `.env*`).

---

## 2. Deploy the Audited Repository on Vercel

1. Push this repository (`lihov-studio-website`) to a private GitHub repository.
2. In **Vercel**, either link this repository to the Vercel project that currently owns `lihov.com` / `www.lihov.com`, **or** remove `lihov.com` / `www.lihov.com` from the legacy `PLH TUNNEL VPN` static project and attach them to this Next.js project.
3. **Select an appropriate Vercel plan:**
   - Review Vercel's Fair Use Policy and Terms of Service. Commercial company websites require **Vercel Pro** (Hobby is restricted to non-commercial personal use).
4. Keep Next.js build settings:
   - **Framework Preset:** Next.js
   - **Build Command:** `next build`
   - **Output Directory:** `.next`
5. Configure **Environment Variables** in **Vercel -> Project Settings -> Environment Variables**:
   - `NEXT_PUBLIC_SITE_URL` = `https://lihov.com` *(no trailing slash; must match your primary domain in Vercel)*
   - `GOOGLE_SITE_VERIFICATION` = *(only the genuine content token if using HTML meta tag verification; leave empty if using DNS TXT)*
   - `CONTACT_WEBHOOK_URL` = *(optional HTTPS webhook endpoint for `/api/contact` and `/api/data-deletion`; until set, forms fall back cleanly to `mailto:`)*
   - `CONTACT_WEBHOOK_SECRET` = *(optional Bearer token for your webhook)*

---

## 3. Canonical Domain & Checkdomain DNS Alignment

Current observed live DNS records at Checkdomain (`ns.checkdomain.de`, `ns2.checkdomain.de`):

| Host / Name | Type | Current Observed Value | Action |
| --- | --- | --- | --- |
| `@` (`lihov.com`) | `A` | `216.198.79.1` | Keep aligned with exact IP shown in **Vercel -> Settings -> Domains** |
| `www` (`www.lihov.com`) | `CNAME` | `c9eedb61b508e180.vercel-dns-017.com.` | Keep aligned with exact CNAME target shown in **Vercel -> Settings -> Domains** |
| `@` (`lihov.com`) | `MX` | `10 mx03.secure-mailgate.com.`, `20 mx04.secure-mailgate.com.` | **DO NOT TOUCH** (required for `contact@lihov.com`) |
| `@` (`lihov.com`) | `TXT` | `v=spf1 include:secure-mailgate.com ?all` | Preserve `include:secure-mailgate.com`; optionally tighten `?all` -> `~all` after testing mail |

### Canonical Redirect Setting in Vercel

- **Current live behavior:** `https://lihov.com/` returns `308` -> `https://www.lihov.com/`.
- **Recommended alignment:** In **Vercel -> Project Settings -> Domains**, set **`lihov.com`** as the **Primary Domain** so `https://www.lihov.com/*` redirects `308` -> `https://lihov.com/*`, matching `officialDomain: "lihov.com"`, `NEXT_PUBLIC_SITE_URL=https://lihov.com`, `robots.txt`, `sitemap.xml`, and Google Play Console.
- *(Alternative if you prefer `www.lihov.com` as Primary: set `NEXT_PUBLIC_SITE_URL=https://www.lihov.com` in Vercel Environment Variables and redeploy.)*

---

## 4. Optional Email Deliverability Hardening (Checkdomain)

1. **DMARC (`_dmarc.lihov.com`):** Currently missing (`NXDOMAIN`). Add a monitoring-mode `TXT` record at `_dmarc`:
   - `v=DMARC1; p=none; rua=mailto:contact@lihov.com; fo=1`
2. **DKIM:** Enable DKIM signing in Checkdomain's mail portal and publish the provider-supplied `TXT` record under `<selector>._domainkey.lihov.com`.
3. **SPF:** After confirming outbound mail sends through `secure-mailgate.com`, consider changing `?all` (neutral) to `~all` (softfail).

---

## 5. Post-Deployment Live Verification

After deploying this Next.js project to `lihov.com`, verify:

```bash
curl -I https://lihov.com/
curl -I https://lihov.com/privacy
curl -I https://lihov.com/robots.txt
curl -I https://lihov.com/sitemap.xml
```

Confirm:
- `https://lihov.com/` returns `HTTP/2 200` (and `www.lihov.com` returns `308` -> `https://lihov.com/`).
- All 9 routes (`/`, `/about`, `/services`, `/apps`, `/contact`, `/privacy`, `/terms`, `/support`, `/data-deletion`), `/robots.txt`, and `/sitemap.xml` return `200 OK`.
- Security headers (`Content-Security-Policy`, `Strict-Transport-Security`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`) are present and `X-Powered-By` is absent.
- **Vercel Deployment Protection** (Password / Vercel Authentication) is **disabled** on Production so Googlebot, Google Search Console, and Google Play reviewers can access `https://lihov.com` without login.
