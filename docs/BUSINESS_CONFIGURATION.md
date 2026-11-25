# Business Configuration Guide (`config/business.ts`)

All **LIHOV PLH** business identity fields, enabled services, application portfolio entries, and privacy disclosure flags live in a single centralized file:

**`config/business.ts`**

## Step 1: Verify Registered Legal Identity Fields

Keep these values in `config/business.ts` synchronized **character-for-character** with your official business registration, Dun & Bradstreet (D-U-N-S Case `DFC-747650`), and Google Play Console Payments Profile:

- `legalOrganizationName`: `"LIHOV PLH"`
- `businessAddress`: `"House No. 45, National Road 6, Phum Kampong Svay, Sangkat Kampong Svay, Krong Stueng Saen, Kampong Thom Province 060303, Cambodia"`
- `businessEmail`: `"contact@lihov.com"`
- `supportEmail`: `"support@lihov.com"`
- `privacyEmail`: `"privacy@lihov.com"`
- `businessPhone`: `"+855717227986"`
- `officialDomain`: `"lihov.com"`

## Step 2: Configure Vercel Environment Variables

Copy `.env.example` to `.env.local` for local testing and set the same variables in **Vercel -> Project Settings -> Environment Variables**:

- `NEXT_PUBLIC_SITE_URL=https://lihov.com`
- `GOOGLE_SITE_VERIFICATION=` *(leave empty if using Checkdomain DNS TXT verification)*
- `CONTACT_WEBHOOK_URL=` *(optional HTTPS endpoint to receive `/api/contact` and `/api/data-deletion` JSON submissions)*
- `CONTACT_WEBHOOK_SECRET=` *(optional Bearer token sent to your webhook)*

## Step 3: Manage Applications (`businessConfig.apps`)

Current portfolio entries:
- **Trader God Signals** (`com.lihov.plh`): `status: "published"`, `version: "102"`, `usesAdMob: true`, `collectsAccountData: true`
- **Pip's Wonder Garden**: `status: "in_development"`, `playStoreUrl: null`
- **PLH Tunnel VPN** (`com.lihov.vpn`): `status: "in_development"`, `playStoreUrl: "https://play.google.com/store/apps/details?id=com.lihov.vpn"` (Play Store link automatically gated in UI until status changes to `"beta"` or `"published"`).

## Step 4: Run Automated Checks

```bash
npm run verify:all
```
