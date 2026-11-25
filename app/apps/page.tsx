import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { AppsView } from "@/components/pages/AppsView";

export const metadata: Metadata = buildPageMetadata({
  title: "Applications",
  description:
    "Official portfolio of Android applications and mobile games developed by LIHOV PLH, including Trader God Signals on Google Play, Pip's Wonder Garden, and PLH Tunnel VPN.",
  path: "/apps",
});

export default function AppsPage() {
  return <AppsView />;
}
