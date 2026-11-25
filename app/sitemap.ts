import type { MetadataRoute } from "next";
import { businessConfig, getCanonicalBaseUrl } from "@/config/business";

const PUBLIC_ROUTES = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/apps", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/support", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/privacy", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/terms", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/data-deletion", priority: 0.7, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getCanonicalBaseUrl();
  const lastModified = new Date(businessConfig.lastUpdatedDate);

  return PUBLIC_ROUTES.map((route) => ({
    url: `${baseUrl}${route.path || "/"}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
