import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { AboutView } from "@/components/pages/AboutView";

export const metadata: Metadata = buildPageMetadata({
  title: "About Us",
  description:
    "Learn about LIHOV PLH's mission, vision, software engineering, Android applications, game development, AI technology, and official business identity in Cambodia.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutView />;
}
