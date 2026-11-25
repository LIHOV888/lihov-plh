import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { PrivacyView } from "@/components/pages/PrivacyView";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "LIHOV PLH Privacy Policy covering website practices, application disclosures, cookies, Google AdMob configuration, data retention, and user rights.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return <PrivacyView />;
}
