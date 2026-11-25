import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { TermsView } from "@/components/pages/TermsView";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Service",
  description:
    "Terms of Service for using the LIHOV PLH website, Android applications, and software development services.",
  path: "/terms",
});

export default function TermsPage() {
  return <TermsView />;
}
