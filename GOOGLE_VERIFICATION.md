# Google Search Console & Google Play Console Verification Guide (`LIHOV PLH`)

This guide covers genuine ownership verification of **`https://lihov.com`** in **Google Search Console** and **Personal-to-Organization account conversion** in **Google Play Console** (including D-U-N-S application case **`DFC-747650`**).

> **Compliance Notice:** Passing website and technical checks does **not** guarantee Google Play Console approval. Google independently reviews your D-U-N-S record, government/organization documents, payments profile, phone/email OTP verification, and Play Console account standing. Never submit fabricated documents or inconsistent entity details.

---

## Part 1: Prerequisites Before Clicking Verify

1. **Deploy the Next.js LIHOV PLH Website to `lihov.com`:**
   - Do **not** submit website verification while `lihov.com` is still serving the legacy `PLH TUNNEL VPN` static HTML site (`404` on `/about`, `/privacy`, `/support`, `/robots.txt`, `/sitemap.xml`).
   - Confirm `https://lihov.com/` and all public pages (`/about`, `/services`, `/apps`, `/contact`, `/privacy`, `/terms`, `/support`, `/data-deletion`, `/robots.txt`, `/sitemap.xml`) return `HTTP 200` publicly with no Vercel Authentication wall.
2. **Confirm Entity Alignment Across All Systems:**
   - Legal Organization Name, Address, Phone (`+855717227986`), and Email (`contact@lihov.com`) in [`config/business.ts`](config/business.ts) must match your Dun & Bradstreet record (Case `DFC-747650`), Cambodian registration documents, and Google Payments Profile **character-for-character**.
   - **Store Listing Alignment Notice:** The published app `com.lihov.plh` (*Trader God Signals*) currently displays `https://web-lihov-v5.vercel.app/` (`henglihov.online`), `plhowner@gmail.com`, and an older street address on Google Play. Update the app's Store Settings and Developer Account details in Play Console once `lihov.com` is live and your organization conversion is ready.

---

## Part 2: Verify `lihov.com` in Google Search Console

Sign in to [Google Search Console](https://search.google.com/search-console/) using the **exact Google Account** that is the Account Owner of your Google Play Console developer account (required for automatic or seamless Play Console website verification).

### Method A (Recommended): DNS `TXT` Record (Domain Property)

1. In Google Search Console, select **Domain** property and enter `lihov.com`.
2. Copy the `google-site-verification=...` `TXT` token provided by Google.
3. In **Checkdomain -> DNS Settings** for `lihov.com`, add a **new** `TXT` record:
   - **Host / Name:** `@`
   - **Value:** `google-site-verification=<YOUR_TOKEN>`
   - **TTL:** `300` or `3600`
   - *Keep your existing `v=spf1 include:secure-mailgate.com ?all` TXT record intact — add a second TXT record.*
4. Wait 5–30 minutes for DNS propagation, then click **Verify**.

### Method B: HTML Meta Tag (`GOOGLE_SITE_VERIFICATION`)

This codebase renders `<meta name="google-site-verification" content="..." />` in server-rendered `<head>` when a genuine non-placeholder token is set in `GOOGLE_SITE_VERIFICATION` (and omits any placeholder like `[MY VERIFICATION CODE]`).

1. In Google Search Console, choose **URL prefix** -> `https://lihov.com` -> **HTML tag**.
2. Copy only the token string from `content="..."`.
3. In **Vercel -> Project Settings -> Environment Variables**, add `GOOGLE_SITE_VERIFICATION=<YOUR_TOKEN>` and redeploy.
4. Confirm `<meta name="google-site-verification"` is present in `curl -s https://lihov.com/` before clicking **Verify**.

### Method C: Google HTML Verification File

1. In Search Console, choose **HTML file** and download the genuine `google<id>.html` file.
2. Place it inside `public/` in this repository, commit, and deploy to Vercel.
3. Confirm `https://lihov.com/google<id>.html` returns `200 OK`, then click **Verify**.

### Submit Sitemap

After ownership verification succeeds in Search Console:
1. Open **Indexing -> Sitemaps**.
2. Submit `https://lihov.com/sitemap.xml`.

---

## Part 3: Google Play Console Personal-to-Organization Conversion

Per Google Play Console Help ([Answer 16260648](https://support.google.com/googleplay/android-developer/answer/16260648) and [Answer 10841920](https://support.google.com/googleplay/android-developer/answer/10841920)):

1. **Precondition:** Ensure your personal developer account has no pending personal verification warnings on the Play Console **Home** page.
2. **Verify Website First:**
   - Go to **Manage account -> Account details -> About you**.
   - Enter `https://lihov.com` and click **Send verification request**.
   - Approve the website verification request in Google Search Console (or wait for automatic confirmation if using the same Google Account).
3. **Change Account Type:**
   - Once website verification passes, **Change account type** becomes available -> select **Organization**.
4. **Link / Create Organization Payments Profile & Enter D-U-N-S:**
   - Once Dun & Bradstreet completes D-U-N-S application **`DFC-747650`** and issues your 9-digit D-U-N-S number, create or link your organization Google Payments profile using the exact registered legal name and address matching D&B.
   - Upload any official organization registration and owner government ID documents requested in Play Console.
5. **Verify Contact Email & Organization Phone:**
   - Verify your developer email (recommended: `contact@lihov.com` or verified developer mailbox) via 6-digit email OTP.
   - After identity and website verifications complete, verify your organization phone number in international format (`+855717227986`) via SMS or voice call OTP.
