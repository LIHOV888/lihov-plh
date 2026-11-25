import type { MetadataRoute } from "next";
import { getCanonicalBaseUrl } from "@/config/business";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getCanonicalBaseUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
