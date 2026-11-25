import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { SupportView } from "@/components/pages/SupportView";

export const metadata: Metadata = buildPageMetadata({
  title: "App Support",
  description:
    "Application support center for LIHOV PLH software, Android applications, and mobile games: FAQs, technical support, bug reporting, and account assistance.",
  path: "/support",
});

export default function SupportPage() {
  return <SupportView />;
}
