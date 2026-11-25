"use client";

import { Building2, Compass, Globe2, Target } from "lucide-react";
import { businessConfig } from "@/config/business";
import { useSite } from "@/components/providers/SiteProviders";
import { BusinessValue } from "@/components/ui/BusinessValue";

export function AboutView() {
  const { dict, locale } = useSite();

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 animate-fade-up">
      <div className="space-y-4">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          {dict.about.eyebrow}
        </p>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          {dict.about.title}
        </h1>
        <p className="max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
          {dict.about.intro}
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-navy-900">
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/70 dark:text-blue-400">
            <Target className="h-5 w-5" aria-hidden="true" />
          </div>
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            {dict.about.missionTitle}
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {dict.about.missionBody}
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-navy-900">
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/70 dark:text-purple-400">
            <Compass className="h-5 w-5" aria-hidden="true" />
          </div>
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            {dict.about.visionTitle}
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {dict.about.visionBody}
          </p>
        </section>
      </div>

      {/* Software Development Activities */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
          {dict.about.activitiesTitle}
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {dict.about.activities.map((activity) => (
            <div
              key={activity.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-navy-900"
            >
              <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                {activity.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Official Business Identity */}
      <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 dark:border-slate-800 dark:bg-navy-900">
        <div className="flex items-start gap-3">
          <Building2 className="mt-1 h-6 w-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
              {dict.about.identityTitle}
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {dict.about.identitySubtitle}
            </p>
          </div>
        </div>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-navy-950">
            <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {dict.common.legalName}
            </dt>
            <dd className="mt-1.5 text-sm font-medium text-slate-900 dark:text-white">
              <BusinessValue value={businessConfig.legalOrganizationName} />
            </dd>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-navy-950">
            <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {dict.common.countryLabel} &middot; {dict.common.timezoneLabel}
            </dt>
            <dd className="mt-1.5 text-sm font-medium text-slate-900 dark:text-white">
              {businessConfig.country[locale]} ({businessConfig.timezone})
            </dd>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-navy-950">
            <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {dict.common.officialEmail}
            </dt>
            <dd className="mt-1.5 text-sm font-medium">
              <BusinessValue value={businessConfig.businessEmail} type="email" />
            </dd>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-navy-950">
            <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {dict.common.officialPhone}
            </dt>
            <dd className="mt-1.5 text-sm font-medium">
              <BusinessValue value={businessConfig.businessPhone} type="phone" />
            </dd>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 sm:col-span-2 dark:border-slate-800 dark:bg-navy-950">
            <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {dict.common.businessAddress}
            </dt>
            <dd className="mt-1.5 text-sm font-medium text-slate-900 dark:text-white">
              <BusinessValue value={businessConfig.businessAddress} />
            </dd>
          </div>
        </dl>

        {businessConfig.cambodiaOperationsConfirmed && (
          <div className="mt-6 flex items-center gap-2.5 rounded-xl border border-blue-200 bg-blue-50/70 px-4 py-3 text-sm text-blue-900 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-200">
            <Globe2 className="h-4 w-4 shrink-0" aria-hidden="true" />
            <p>{dict.about.cambodiaNote}</p>
          </div>
        )}
      </section>
    </div>
  );
}
