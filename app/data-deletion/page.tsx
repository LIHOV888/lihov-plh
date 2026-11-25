import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { DataDeletionView } from "@/components/pages/DataDeletionView";

export const metadata: Metadata = buildPageMetadata({
  title: "Data Deletion",
  description:
    "Instructions and request process for deleting account and personal data associated with LIHOV PLH applications and website.",
  path: "/data-deletion",
});

export default function DataDeletionPage() {
  return <DataDeletionView />;
}
