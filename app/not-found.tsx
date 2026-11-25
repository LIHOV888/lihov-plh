import Link from "next/link";
import { businessConfig } from "@/config/business";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
        404
      </p>
      <h1 className="mt-2 font-display text-3xl font-extrabold text-slate-900 dark:text-white">
        Page Not Found
      </h1>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
        The page you requested could not be found on {businessConfig.brandName}.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
      >
        Return to Homepage
      </Link>
    </div>
  );
}
