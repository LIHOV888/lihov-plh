# LIHOV PLH — Official Business Website

Official bilingual (**English & Khmer**) business website for **LIHOV PLH** (`https://lihov.com`) — Software, Android Applications, Game Development, and AI Technology in Cambodia, engineered for **Vercel** hosting, **Checkdomain** DNS/email coexistence, **Google Search Console** verification, and **Google Play Console** Organization account readiness.

## Key Capabilities

- **Centralized Business Configuration ([`config/business.ts`](config/business.ts))**: Single source of truth for legal organization name (`LIHOV PLH`), registered address, `contact@lihov.com` / `support@lihov.com` / `privacy@lihov.com`, phone, canonical domain (`lihov.com`), enabled services, application portfolio, and privacy disclosure flags.
- **Application Portfolio**:
  - **Trader God Signals** (`com.lihov.plh`) — **Published** on Google Play (`v102`), with live store link, privacy disclosure, and data deletion reference.
  - **Pip's Wonder Garden** — **In Development** (no unreleased store link exposed).
  - **PLH Tunnel VPN** (`com.lihov.vpn`) — **In Development** (package ID reserved; store button gated until public release).
- **English UI & Clean Light Theme**: Built with `Inter` + `Plus Jakarta Sans` in a clean light presentation, with bilingual data support in `content/` and `config/business.ts`.
- **Zero External Image Dependencies**: Original inline SVG logo, brand mark, favicon, hero graphic, and per-app SVG icons & preview screens compatible with strict CSP (`img-src 'self' data: blob:`).
- **All 9 Public Routes**:
  - `/` — Homepage
  - `/about` — About Us & Official Business Identity
  - `/services` — Software, Android, Games & AI Services
  - `/apps` — Application Portfolio
  - `/contact` — Official Contact Details & Validated Inquiry Form
  - `/privacy` — Privacy Policy with Per-App & AdMob Disclosures
  - `/terms` — Terms of Service
  - `/support` — App Support Center & FAQ
  - `/data-deletion` — Account & Personal Data Deletion Instructions & Form
- **Google Search Console & Play Console Support**:
  - Supports DNS TXT (`@`), `GOOGLE_SITE_VERIFICATION` meta tag (omitted when unset/placeholder), and `public/` HTML verification files.
  - Dynamic `/sitemap.xml` and `/robots.txt`
  - Organization JSON-LD (`OrganizationJsonLd`) built strictly from genuine configured fields.
- **Hardened Security Controls**:
  - CSP, HSTS (`max-age=63072000; includeSubDomains; preload`), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, COOP, CORP, `poweredByHeader: false`.
  - CSRF `Origin`/`Referer` verification, Unicode-safe sanitization, honeypot + minimum-interaction timing check, sliding-window per-IP rate limiting (`lib/rate-limit.ts`), and honest HTTP `503` (`DELIVERY_NOT_CONFIGURED`) fallback to `mailto:` when `CONTACT_WEBHOOK_URL` is not connected.

## Local Development & Verification

Requires **Node.js >= 20**.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Validation commands:

```bash
npm run typecheck    # TypeScript strict check (tsc --noEmit)
npm run lint         # ESLint check (next lint)
npm run test         # Node.js test suite (tests/website.test.mjs)
npm run test:audit   # Automated route, secret, brand, a11y & placeholder audit
npm run build        # Production Next.js build
npm run verify:all   # All checks + production build
```

## Documentation

- [`AUDIT_REPORT.md`](AUDIT_REPORT.md) — Complete V2 MAX verification, DNS, email, security, SEO, and Google Play readiness audit report
- [`DEPLOYMENT.md`](DEPLOYMENT.md) — GitHub, Vercel, and Checkdomain DNS/HTTPS deployment steps for `lihov.com`
- [`GOOGLE_VERIFICATION.md`](GOOGLE_VERIFICATION.md) — Google Search Console & Google Play Console Personal-to-Organization verification guide
- [`SECURITY.md`](SECURITY.md) — Security headers, API hardening, secrets hygiene, and dependency vulnerability notes
- [`docs/BUSINESS_CONFIGURATION.md`](docs/BUSINESS_CONFIGURATION.md) — Updating `config/business.ts` and `.env.local`
- [`docs/PRE_PRODUCTION_CHECKLIST.md`](docs/PRE_PRODUCTION_CHECKLIST.md) — Pre-launch & verification checklist
