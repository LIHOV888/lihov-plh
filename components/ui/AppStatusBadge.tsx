import type { AppReleaseStatus } from "@/config/business";
import type { SiteDictionary } from "@/content/types";

const STATUS_BADGE_STYLES: Record<AppReleaseStatus, string> = {
  published:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",
  beta:
    "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/60 dark:text-blue-300",
  in_development:
    "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950/60 dark:text-purple-300",
};

/**
 * Maps an application release status to its localized label.
 */
export function getAppStatusLabel(
  status: AppReleaseStatus,
  common: SiteDictionary["common"]
): string {
  if (status === "published") return common.published;
  if (status === "beta") return common.beta;
  return common.inDevelopment;
}

/**
 * Consistent status badge shared across home and portfolio views.
 */
export function AppStatusBadge({
  status,
  label,
  size = "md",
}: {
  status: AppReleaseStatus;
  label: string;
  size?: "sm" | "md";
}) {
  const padding = size === "sm" ? "px-2.5 py-0.5" : "px-3 py-1";
  return (
    <span
      className={`inline-flex items-center rounded-full border text-xs font-semibold ${padding} ${STATUS_BADGE_STYLES[status]}`}
    >
      {label}
    </span>
  );
}
