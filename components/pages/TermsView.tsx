"use client";

import { Info } from "lucide-react";
import { businessConfig } from "@/config/business";
import { useSite } from "@/components/providers/SiteProviders";
import { BusinessValue } from "@/components/ui/BusinessValue";

export function TermsView() {
  const { dict } = useSite();

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8 animate-fade-up">
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">
          {dict.terms.eyebrow}
        </p>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          {dict.terms.title}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300">
          {dict.terms.subtitle}
        </p>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {dict.common.lastUpdated}: {businessConfig.lastUpdatedDate}
        </p>
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50/70 p-4 text-sm text-blue-900 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-200">
        <Info className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
        <p>{dict.terms.disclaimerBanner}</p>
      </div>

      <div className="mt-10 space-y-7 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        {dict.terms.sections.map((section) => (
          <section key={section.title} className="space-y-2">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
              {section.title}
            </h2>
            <p>{section.body}</p>
          </section>
        ))}

        <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-navy-900">
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
            {dict.common.officialEmail} &amp; {dict.common.legalName}
          </h2>
          <div className="mt-3 space-y-1.5">
            <p>
              <strong>{dict.common.legalName}:</strong>{" "}
              <BusinessValue value={businessConfig.legalOrganizationName} />
            </p>
            <p>
              <strong>{dict.common.officialEmail}:</strong>{" "}
              <BusinessValue value={businessConfig.businessEmail} type="email" />
            </p>
            <p>
              <strong>{dict.common.businessAddress}:</strong>{" "}
              <BusinessValue value={businessConfig.businessAddress} />
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
