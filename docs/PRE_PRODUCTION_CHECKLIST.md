# Pre-Production & Verification Readiness Checklist (`LIHOV PLH`)

Complete every remaining pending item below before submitting `https://lihov.com` for Google Play Console Organization verification.

## 1. Business Identity & Repository Configuration

- [x] Set `brandName` and `legalOrganizationName` to `"LIHOV PLH"` in `config/business.ts`
- [x] Set `businessAddress`, `businessEmail` (`contact@lihov.com`), `supportEmail` (`support@lihov.com`), `privacyEmail` (`privacy@lihov.com`), `businessPhone` (`+855717227986`), and `officialDomain` (`lihov.com`)
- [x] Align `industry`, bilingual dictionaries (`content/en.ts`, `content/km.ts`), SVG brand logo, SEO metadata, and JSON-LD to `LIHOV PLH`
- [x] Add published Google Play app **Trader God Signals** (`com.lihov.plh`, v`102`) and update **PLH Tunnel VPN** (`com.lihov.vpn`, gated while `in_development`)
- [ ] Confirm `legalOrganizationName` and `businessAddress` match Dun & Bradstreet (D-U-N-S Case `DFC-747650`) and Cambodian legal documents identically

## 2. Vercel Deployment & Domain Alignment (BLOCKING LIVE SITE)

- [ ] Deploy this Next.js repository to Vercel and connect `lihov.com` / `www.lihov.com` to **this project** (replacing the legacy static `PLH TUNNEL VPN` HTML site currently live on `www.lihov.com`)
- [ ] Set `lihov.com` as the Primary Domain in Vercel so `www.lihov.com` redirects `308` -> `https://lihov.com/` (or set `NEXT_PUBLIC_SITE_URL=https://www.lihov.com` if keeping `www` primary)
- [ ] Confirm Vercel Deployment Protection is **disabled** on Production
- [ ] Configure `CONTACT_WEBHOOK_URL` (and optional `CONTACT_WEBHOOK_SECRET`) in Vercel if automated form forwarding is desired; otherwise verify `mailto:contact@lihov.com` / `mailto:privacy@lihov.com` fallback

## 3. Business Email (`contact@lihov.com`) & DNS Safety

- [x] Confirmed existing Checkdomain `MX` (`mx03/mx04.secure-mailgate.com`) and `SPF` (`v=spf1 include:secure-mailgate.com ?all`)
- [ ] Perform a real outbound & inbound email test on `contact@lihov.com`, `support@lihov.com`, and `privacy@lihov.com`
- [ ] Add `_dmarc.lihov.com` TXT record (`v=DMARC1; p=none; rua=mailto:contact@lihov.com; fo=1`) and enable DKIM in Checkdomain

## 4. Google Search Console & Play Console Account Conversion

- [ ] Verify `lihov.com` in Google Search Console (DNS TXT in Checkdomain, or `GOOGLE_SITE_VERIFICATION` in Vercel, or `public/` HTML file)
- [ ] Submit `https://lihov.com/sitemap.xml` in Search Console
- [ ] Update `com.lihov.plh` Google Play Store listing & Play Console developer profile (replace `https://web-lihov-v5.vercel.app/` and `plhowner@gmail.com` and align street address)
- [ ] Wait for D-U-N-S application **`DFC-747650`** issuance, then complete Website Verification -> Organization Account Conversion -> Payments Profile + Documents -> Email OTP -> Phone OTP (`+855717227986`)
