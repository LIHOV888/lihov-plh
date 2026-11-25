"use client";

import { isPlaceholderValue } from "@/config/business";

interface BusinessValueProps {
  value: string;
  type?: "text" | "email" | "phone";
  className?: string;
}

export function BusinessValue({
  value,
  type = "text",
  className = "",
}: BusinessValueProps) {
  const placeholder = isPlaceholderValue(value);

  if (placeholder) {
    return (
      <span
        className={`inline-flex items-center rounded-md border border-amber-300 bg-amber-50 px-2 py-0.5 font-mono text-xs font-medium text-amber-800 dark:border-amber-700/60 dark:bg-amber-950/50 dark:text-amber-300 ${className}`}
      >
        {value}
      </span>
    );
  }

  if (type === "email") {
    return (
      <a
        href={`mailto:${value}`}
        className={`text-blue-600 underline-offset-4 hover:underline dark:text-blue-400 ${className}`}
      >
        {value}
      </a>
    );
  }

  if (type === "phone") {
    return (
      <a
        href={`tel:${value}`}
        className={`text-blue-600 underline-offset-4 hover:underline dark:text-blue-400 ${className}`}
      >
        {value}
      </a>
    );
  }

  return <span className={className}>{value}</span>;
}
