#!/usr/bin/env node
/**
 * Automated Quality Control, Security, Link & Placeholder Audit
 * Runs with zero external dependencies on Node.js 18+.
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const VALID_ROUTES = new Set([
  "/",
  "/about",
  "/services",
  "/apps",
  "/contact",
  "/privacy",
  "/terms",
  "/support",
  "/data-deletion",
]);

function walk(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (
      entry.name === "node_modules" ||
      entry.name === ".next" ||
      entry.name === ".git"
    ) {
      continue;
    }
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, results);
    } else {
      results.push(full);
    }
  }
  return results;
}

const allFiles = walk(ROOT);
const codeFiles = allFiles.filter((f) => /\.(ts|tsx|js|mjs)$/.test(f));

// 1. Check internal navigation links across components & pages
const brokenLinks = [];
const linkRegex = /href=["'](\/[a-z0-9\-\/#]*)["']/g;

for (const file of codeFiles) {
  const rel = path.relative(ROOT, file);
  if (rel.startsWith("tests/")) continue;
  const content = fs.readFileSync(file, "utf8");
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const rawHref = match[1];
    const cleanPath = rawHref.split("#")[0] || "/";
    if (
      cleanPath.startsWith("/api/") ||
      cleanPath.startsWith("/brand/") ||
      cleanPath === "/favicon.svg" ||
      cleanPath === "/sitemap.xml"
    ) {
      continue;
    }
    if (!VALID_ROUTES.has(cleanPath)) {
      brokenLinks.push({ file: rel, href: rawHref });
    }
  }
}

// 2. Scan for accidentally hardcoded secrets or private keys
const secretPatterns = [
  { name: "Private Key Block", regex: /-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/ },
  { name: "AWS Access Key", regex: /AKIA[0-9A-Z]{16}/ },
  { name: "Generic API Token", regex: /(api_key|secret_key|password)\s*[:=]\s*["'][A-Za-z0-9_\-]{16,}["']/i },
  { name: "GitHub PAT", regex: /ghp_[A-Za-z0-9]{36}/ },
];

const secretFindings = [];
for (const file of allFiles) {
  const rel = path.relative(ROOT, file);
  if (rel.startsWith("tests/")) continue;
  const content = fs.readFileSync(file, "utf8");
  for (const pattern of secretPatterns) {
    if (pattern.regex.test(content)) {
      secretFindings.push({ file: rel, type: pattern.name });
    }
  }
}

// 3. Detect outstanding [MY ...] business placeholders in config/business.ts
const businessConfigSrc = fs.readFileSync(
  path.join(ROOT, "config/business.ts"),
  "utf8"
);
const placeholderMatches = [...businessConfigSrc.matchAll(/\[MY\s+[A-Z ]+\]/g)].map(
  (m) => m[0]
);
const uniquePlaceholders = [...new Set(placeholderMatches)];

// 4. Verify accessibility landmarks & skip link
const headerSrc = fs.readFileSync(
  path.join(ROOT, "components/layout/Header.tsx"),
  "utf8"
);
const layoutSrc = fs.readFileSync(path.join(ROOT, "app/layout.tsx"), "utf8");
const a11yChecks = {
  skipToContentLink: headerSrc.includes('href="#main-content"'),
  mainLandmark: layoutSrc.includes('<main id="main-content"'),
  ariaCurrentPage: headerSrc.includes('aria-current={isActive ? "page" : undefined}'),
  reducedMotionSupport: fs
    .readFileSync(path.join(ROOT, "styles/globals.css"), "utf8")
    .includes("prefers-reduced-motion"),
};

// 5. Ensure no stale brand or template phrasing remains in runtime source files
const stalePhrases = [
  "LIHOV Studio",
  "Editable Legal Template",
  "configurable template",
];
const staleFindings = [];
for (const file of codeFiles) {
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  if (rel.startsWith("tests/")) continue;
  const content = fs.readFileSync(file, "utf8");
  for (const phrase of stalePhrases) {
    if (content.includes(phrase)) {
      staleFindings.push({ file: rel, phrase });
    }
  }
}

// Print structured report
console.log("=== LIHOV PLH Automated Quality Audit ===");
console.log(`Scanned files: ${allFiles.length} total (${codeFiles.length} code files)`);
console.log(`Broken internal links: ${brokenLinks.length}`);
if (brokenLinks.length > 0) {
  console.error("  Broken links:", brokenLinks);
}
console.log(`Exposed secret findings: ${secretFindings.length}`);
if (secretFindings.length > 0) {
  console.error("  Secret findings:", secretFindings);
}
console.log(`Stale template/brand findings: ${staleFindings.length}`);
if (staleFindings.length > 0) {
  console.error("  Stale findings:", staleFindings);
}
console.log("Accessibility checks:", JSON.stringify(a11yChecks));
console.log(
  `Outstanding config placeholders flagged for pre-launch replacement (${uniquePlaceholders.length}):`
);
for (const ph of uniquePlaceholders) {
  console.log(`  - ${ph}`);
}

const a11yOk = Object.values(a11yChecks).every(Boolean);
if (brokenLinks.length > 0 || secretFindings.length > 0 || staleFindings.length > 0 || !a11yOk) {
  console.error("AUDIT FAILED: Blocking issues detected.");
  process.exit(1);
}

console.log("AUDIT PASSED (no broken links, no exposed secrets, no stale branding, accessibility verified).");
