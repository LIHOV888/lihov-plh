import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { ServicesView } from "@/components/pages/ServicesView";

export const metadata: Metadata = buildPageMetadata({
  title: "Services",
  description:
    "Explore LIHOV PLH's software engineering, Android application development, mobile game development, web engineering, AI technology, automation, API integration, and technical support services.",
  path: "/services",
});

export default function ServicesPage() {
  return <ServicesView />;
}
