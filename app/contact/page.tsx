import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { ContactView } from "@/components/pages/ContactView";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Contact LIHOV PLH via official business email (contact@lihov.com), phone, address, or our validated inquiry form.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactView />;
}
