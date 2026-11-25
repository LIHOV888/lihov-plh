# Security Policy & Architecture — LIHOV PLH Website

This document outlines the security controls implemented in the **LIHOV PLH** (`https://lihov.com`) Next.js codebase and operational hardening requirements.

## 1. HTTP Security Headers (`next.config.ts`)

Every Next.js response configures hardened HTTP headers and removes `X-Powered-By` (`poweredByHeader: false`):

| Header | Configured Value | Purpose |
| --- | --- | --- |
| `Content-Security-Policy` | `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests` | Restricts script, style, image, font, and connection origins; blocks framing |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Enforces HTTPS across browsers |
| `X-Frame-Options` | `DENY` | Prevents clickjacking |
| `X-Content-Type-Options` | `nosniff` | Prevents MIME-type sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limits referrer leakage |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), interest-cohort=()` | Disables unused browser hardware APIs |
| `Cross-Origin-Opener-Policy` | `same-origin` | Isolates browsing context |
| `Cross-Origin-Resource-Policy` | `same-origin` | Prevents unauthorized cross-origin resource embedding |

> **Live Deployment Note:** These headers are configured inside this Next.js repository (`next.config.ts`). They will take effect on `https://lihov.com` only after this Next.js project replaces the legacy static HTML site currently served at `www.lihov.com`.

## 2. Public Form Endpoint Protections (`/api/contact` & `/api/data-deletion`)

- **Input Validation & Sanitization (`lib/security.ts`)**: Strict field-length bounds, email regex validation, and ASCII control-character stripping while preserving Khmer Unicode text.
- **XSS Protection**: React JSX auto-escaping everywhere; `dangerouslySetInnerHTML` is used only in `OrganizationJsonLd.tsx` with `JSON.stringify` of trusted static `config/business.ts` fields.
- **CSRF Protection**: `verifySameOrigin()` verifies `Origin` (and `Referer` when `Origin` is omitted) against the request `Host` and canonical URL.
- **Bot & Spam Protection**: Hidden honeypot field (`website`) and minimum interaction timer (`formLoadedAt < 1500ms`) reject automated spam submissions.
- **Rate Limiting (`lib/rate-limit.ts`)**: Sliding-window per-IP rate limiting (5 req / 10 min on `/api/contact`; 3 req / 15 min on `/api/data-deletion`), returning HTTP `429` with `Retry-After`. For distributed edge protection on Vercel, pair with Vercel Firewall / WAF rules.
- **Webhook Delivery & SSRF Safety (`lib/webhook.ts`)**: Requires `https:` for `CONTACT_WEBHOOK_URL` in production, enforces a 10-second timeout (`AbortSignal.timeout`), and returns HTTP `503` (`DELIVERY_NOT_CONFIGURED`) if unset so forms never fake success.

## 3. Secrets & Sensitive Document Hygiene

- Never commit `.env`, `.env.local`, email passwords, API keys, or webhook tokens.
- Never place business registration certificates, D-U-N-S letters, or identity documents inside `public/` or Git.
- Store `GOOGLE_SITE_VERIFICATION`, `CONTACT_WEBHOOK_URL`, and `CONTACT_WEBHOOK_SECRET` in **Vercel -> Project Settings -> Environment Variables**.

## 4. Dependency Vulnerability Status (`npm audit`)

`npm audit --json` against this lockfile reports 0 critical vulnerabilities and 2 build-time findings in `postcss` bundled inside `next@15.5.29` (fix requires major upgrade to Next.js `16.4.6`). See [`AUDIT_REPORT.md`](AUDIT_REPORT.md) for advisory details.

## 5. Security Contact

Report security vulnerabilities privately to `contact@lihov.com` or `privacy@lihov.com`.
