import { buildOrganizationJsonLd } from "@/lib/seo";

export function OrganizationJsonLd() {
  const data = buildOrganizationJsonLd();

  return (
    <script
      type="application/ld+json"
      // Safe serialization of internal trusted config object only
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
