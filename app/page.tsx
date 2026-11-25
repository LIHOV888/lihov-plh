import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { HomeView } from "@/components/pages/HomeView";

export const metadata: Metadata = buildPageMetadata({
  title: "Software, Android, Games & AI Technology",
  description:
    "LIHOV PLH is a Cambodia-based technology organization specializing in software engineering, Android applications, mobile games, and AI technology.",
  path: "/",
});

export default function HomePage() {
  return <HomeView />;
}
