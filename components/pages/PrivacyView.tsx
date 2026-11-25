"use client";

import Link from "next/link";
import { Info, ShieldCheck } from "lucide-react";
import { businessConfig } from "@/config/business";
import { useSite } from "@/components/providers/SiteProviders";
import { BusinessValue } from "@/components/ui/BusinessValue";

export function PrivacyView() {
  const { dict, locale } = useSite();
  const { privacyDisclosures } = businessConfig;
  const s = dict.privacy.sections;

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8 animate-fade-up">
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          {dict.privacy.eyebrow}
        </p>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          {dict.privacy.title}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300">
          {dict.privacy.subtitle}
        </p>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {dict.common.lastUpdated}: {businessConfig.lastUpdatedDate}
        </p>
      </div>

      {/* Transparency notice */}
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50/70 p-4 text-sm text-blue-900 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-200">
        <Info className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
        <p>{dict.privacy.disclaimerBanner}</p>
      </div>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        <section className="space-y-2.5">
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            {s.overviewTitle}
          </h2>
          <p>{s.overviewBody}</p>
          <p>
            <strong>{dict.common.legalName}:</strong>{" "}
            <BusinessValue value={businessConfig.legalOrganizationName} /> (
            {businessConfig.brandName}, {businessConfig.country[locale]})
          </p>
        </section>

        <section className="space-y-2.5">
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            {s.personalInfoTitle}
          </h2>
          <p>{s.personalInfoBody}</p>
        </section>

        <section className="space-y-2.5">
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            {s.cookiesTitle}
          </h2>
          <p>
            {privacyDisclosures.usesCookiesOrAnalytics
              ? s.cookiesActiveBody
              : s.cookiesInactiveBody}
          </p>
        </section>

        <section className="space-y-2.5">
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            {s.adsTitle}
          </h2>
          <p>
            {privacyDisclosures.usesGoogleAdMob
              ? s.adsActiveBody
              : s.adsInactiveBody}
          </p>
        </section>

        <section className="space-y-2.5">
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            {s.thirdPartyTitle}
          </h2>
          <p>{s.thirdPartyBody}</p>
        </section>

        <section className="space-y-2.5">
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            {s.retentionTitle}
          </h2>
          <p>{privacyDisclosures.dataRetentionSummary[locale]}</p>
        </section>

        <section className="space-y-2.5">
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            {s.childrenTitle}
          </h2>
          <p>{s.childrenBody}</p>
        </section>

        <section className="space-y-2.5">
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            {s.rightsTitle}
          </h2>
          <ul className="list-disc space-y-1.5 pl-5">
            {s.rightsItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="pt-2">
            <Link
              href="/data-deletion"
              className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
            >
              {dict.common.dataDeletion} &rarr;
            </Link>
          </p>
        </section>

        {/* Per-Application Privacy Disclosures */}
        <section className="space-y-4">
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            {s.appSpecificTitle}
          </h2>
          {businessConfig.apps.map((app) => (
            <div
              key={app.id}
              id={app.slug}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-navy-900"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                  {app.name} ({app.platform} &middot; v{app.version})
                </h3>
              </div>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                {app.fullDescription[locale]}
              </p>
              <ul className="mt-3 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                <li>
                  {s.adMobLabel}:{" "}
                  <strong>{app.usesAdMob ? s.adMobEnabled : s.adMobDisabled}</strong>
                </li>
                <li>
                  {s.userDataLabel}:{" "}
                  <strong>
                    {app.collectsAccountData ? s.userDataCollected : s.userDataNone}
                  </strong>
                </li>
              </ul>
            </div>
          ))}
        </section>

        {/* Contact */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-navy-900">
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
            {s.contactTitle}
          </h2>
          <p className="mt-2">{s.contactBody}</p>
          <div className="mt-4 space-y-1.5 text-sm">
            <p>
              <strong>{dict.common.officialEmail}:</strong>{" "}
              <BusinessValue value={businessConfig.privacyEmail} type="email" />
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
