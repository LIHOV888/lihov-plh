import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

function readFile(relPath) {
  return fs.readFileSync(path.join(ROOT, relPath), "utf8");
}

test("All 9 required App Router pages exist", () => {
  const requiredPages = [
    "app/page.tsx",
    "app/about/page.tsx",
    "app/services/page.tsx",
    "app/apps/page.tsx",
    "app/contact/page.tsx",
    "app/privacy/page.tsx",
    "app/terms/page.tsx",
    "app/support/page.tsx",
    "app/data-deletion/page.tsx",
  ];

  for (const pagePath of requiredPages) {
    assert.equal(
      fs.existsSync(path.join(ROOT, pagePath)),
      true,
      `Missing required page: ${pagePath}`
    );
  }
});

test("SEO files (sitemap.ts, robots.ts, OrganizationJsonLd) exist and reference all public routes", () => {
  const sitemap = readFile("app/sitemap.ts");
  const robots = readFile("app/robots.ts");
  const seo = readFile("lib/seo.ts");

  for (const route of [
    "/about",
    "/services",
    "/apps",
    "/contact",
    "/support",
    "/privacy",
    "/terms",
    "/data-deletion",
  ]) {
    assert.ok(sitemap.includes(route), `sitemap.ts missing route ${route}`);
  }

  assert.ok(robots.includes("sitemap.xml"), "robots.ts must reference sitemap.xml");
  assert.ok(
    seo.includes('"@type": "Organization"'),
    "lib/seo.ts must define Organization JSON-LD"
  );
  assert.ok(
    seo.includes("getGoogleSiteVerificationCode"),
    "lib/seo.ts must conditionally apply Google verification code"
  );
});

test("Centralized business config defines Pip's Wonder Garden as in_development with no fake Play Store URL", () => {
  const config = readFile("config/business.ts");
  assert.ok(config.includes('brandName: "LIHOV PLH"'));
  assert.ok(config.includes("Pip's Wonder Garden"));
  assert.ok(config.includes('status: "in_development"'));
  assert.ok(config.includes("playStoreUrl: null"));
  assert.ok(config.includes("GOOGLE_SITE_VERIFICATION"));
});

test("Portfolio includes Trader God Signals (com.lihov.plh) and PLH Tunnel VPN (com.lihov.vpn)", () => {
  const config = readFile("config/business.ts");
  assert.ok(config.includes('id: "trader-god-signals"'));
  assert.ok(config.includes('name: "Trader God Signals"'));
  assert.ok(config.includes('status: "published"'));
  assert.ok(
    config.includes('playStoreUrl: "https://play.google.com/store/apps/details?id=com.lihov.plh"')
  );
  assert.ok(config.includes('id: "plh-tunnel-vpn"'));
  assert.ok(
    config.includes('playStoreUrl: "https://play.google.com/store/apps/details?id=com.lihov.vpn"')
  );

  const homeView = readFile("components/pages/HomeView.tsx");
  const appsView = readFile("components/pages/AppsView.tsx");
  const header = readFile("components/layout/Header.tsx");
  const providers = readFile("components/providers/SiteProviders.tsx");
  const artwork = readFile("components/illustrations/AppArtwork.tsx");
  assert.ok(homeView.includes("<AppIcon"), "HomeView must render AppIcon dynamically per app");
  assert.ok(appsView.includes("<AppIcon"), "AppsView must render AppIcon dynamically per app");
  assert.ok(
    appsView.includes('app.status !== "in_development"'),
    "AppsView must not emit clickable Play Store links for in_development apps"
  );
  assert.equal(header.includes("toggleLocale"), false, "Language switcher button must be removed from Header");
  assert.equal(header.includes("toggleTheme"), false, "Dark theme toggle must be removed from Header");
  assert.equal(providers.includes("toggleTheme"), false, "Dark theme toggle must be removed from SiteProviders");
  assert.ok(artwork.includes('"trader-god-signals"'));
  assert.ok(artwork.includes('"plh-tunnel-vpn"'));
  assert.ok(artwork.includes('"pips-wonder-garden"'));
});

test("Security headers and CSP are configured in next.config.ts", () => {
  const nextConfig = readFile("next.config.ts");
  const requiredHeaders = [
    "Content-Security-Policy",
    "Strict-Transport-Security",
    "X-Frame-Options",
    "X-Content-Type-Options",
    "Referrer-Policy",
    "Permissions-Policy",
    "poweredByHeader: false",
  ];

  for (const header of requiredHeaders) {
    assert.ok(
      nextConfig.includes(header),
      `next.config.ts missing required security setting: ${header}`
    );
  }
});

test("API routes enforce rate limiting, same-origin CSRF, validation, and honest 503 when unconfigured", () => {
  const webhookSrc = readFile("lib/webhook.ts");
  const securitySrc = readFile("lib/security.ts");
  assert.ok(
    securitySrc.includes("refererHeader"),
    "lib/security.ts must also inspect Referer when Origin is absent"
  );
  assert.ok(
    webhookSrc.includes("DELIVERY_NOT_CONFIGURED"),
    "lib/webhook.ts must return honest DELIVERY_NOT_CONFIGURED instead of fake success"
  );
  assert.ok(
    webhookSrc.includes("status: 503"),
    "lib/webhook.ts must return HTTP 503 when relay unconfigured"
  );

  for (const apiPath of [
    "app/api/contact/route.ts",
    "app/api/data-deletion/route.ts",
  ]) {
    const src = readFile(apiPath);
    assert.ok(src.includes("verifySameOrigin"), `${apiPath} missing CSRF origin check`);
    assert.ok(src.includes("checkRateLimit"), `${apiPath} missing rate limiting`);
    assert.ok(
      src.includes("deliverWebhookSubmission"),
      `${apiPath} must use shared deliverWebhookSubmission helper`
    );
  }
});

test("English and Khmer dictionaries both exist, use consistent LIHOV PLH branding, and contain Khmer Unicode script", () => {
  const en = readFile("content/en.ts");
  const km = readFile("content/km.ts");

  assert.ok(en.includes("LIHOV PLH"));
  assert.ok(km.includes("LIHOV PLH"));
  assert.equal(en.includes("LIHOV Studio"), false, "content/en.ts must not contain stale LIHOV Studio brand");
  assert.equal(km.includes("LIHOV Studio"), false, "content/km.ts must not contain stale LIHOV Studio brand");
  // Khmer Unicode block U+1780..U+17FF
  assert.match(km, /[\u1780-\u17FF]{10,}/, "content/km.ts must contain genuine Khmer text");
});

test("Original SVG brand assets and favicon exist", () => {
  const assets = [
    "public/favicon.svg",
    "public/brand/lihov-logo.svg",
    "public/brand/lihov-mark.svg",
  ];
  for (const asset of assets) {
    const content = readFile(asset);
    assert.ok(content.includes("<svg"), `${asset} must be valid SVG`);
  }
});

test("Required documentation and compliance guides exist", () => {
  const docs = [
    "README.md",
    "SECURITY.md",
    "DEPLOYMENT.md",
    "GOOGLE_VERIFICATION.md",
    "docs/BUSINESS_CONFIGURATION.md",
    "docs/PRE_PRODUCTION_CHECKLIST.md",
    ".env.example",
    ".gitignore",
  ];
  for (const doc of docs) {
    assert.equal(
      fs.existsSync(path.join(ROOT, doc)),
      true,
      `Missing required file: ${doc}`
    );
  }
});
