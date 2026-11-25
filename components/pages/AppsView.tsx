"use client";

import Link from "next/link";
import { CheckCircle2, ExternalLink, Info, LifeBuoy, Shield } from "lucide-react";
import { businessConfig } from "@/config/business";
import { useSite } from "@/components/providers/SiteProviders";
import { AppIcon, AppScreenshot } from "@/components/illustrations/AppArtwork";
import { AppStatusBadge, getAppStatusLabel } from "@/components/ui/AppStatusBadge";

export function AppsView() {
  const { dict, locale } = useSite();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 animate-fade-up">
      <div className="max-w-3xl space-y-4">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          {dict.apps.eyebrow}
        </p>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          {dict.apps.title}
        </h1>
        <p className="text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
          {dict.apps.subtitle}
        </p>
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50/70 p-4 text-sm text-blue-900 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-200">
        <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <p>{dict.apps.transparencyNote}</p>
      </div>

      <div className="mt-10 space-y-10">
        {businessConfig.apps.map((app) => {
          const statusLabel = getAppStatusLabel(app.status, dict.common);

          return (
            <article
              key={app.id}
              id={app.slug}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-navy-900"
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <AppIcon appId={app.id} className="h-20 w-20 shrink-0" />
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                      {app.name}
                    </h2>
                    <AppStatusBadge status={app.status} label={statusLabel} />
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {app.category[locale]}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                    {app.fullDescription[locale]}
                  </p>

                  <dl className="flex flex-wrap gap-6 pt-2 text-xs text-slate-500 dark:text-slate-400">
                    <div>
                      <dt className="font-semibold uppercase tracking-wider">
                        {dict.apps.platformLabel}
                      </dt>
                      <dd className="mt-0.5 text-sm font-medium text-slate-900 dark:text-white">
                        {app.platform}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold uppercase tracking-wider">
                        {dict.apps.versionLabel}
                      </dt>
                      <dd className="mt-0.5 text-sm font-medium text-slate-900 dark:text-white">
                        {app.version}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold uppercase tracking-wider">
                        {dict.apps.statusLabel}
                      </dt>
                      <dd className="mt-0.5 text-sm font-medium text-slate-900 dark:text-white">
                        {statusLabel}
                      </dd>
                    </div>
                    {app.packageName && (
                      <div>
                        <dt className="font-semibold uppercase tracking-wider">
                          {dict.apps.packageLabel}
                        </dt>
                        <dd className="mt-0.5 font-mono text-xs font-medium text-slate-800 dark:text-slate-200">
                          {app.packageName}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>

              {/* Highlights */}
              <div className="mt-8 border-t border-slate-100 pt-6 dark:border-slate-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {dict.apps.highlightsHeading}
                </h3>
                <ul className="mt-3 grid gap-2.5 sm:grid-cols-3">
                  {app.highlights[locale].map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2 rounded-xl bg-slate-50 p-3 text-sm text-slate-700 dark:bg-navy-950 dark:text-slate-300"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400"
                        aria-hidden="true"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Custom SVG Preview Screens */}
              <div className="mt-8 border-t border-slate-100 pt-6 dark:border-slate-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {dict.apps.screenshotsHeading}
                </h3>
                <div className="mt-4 grid gap-6 md:grid-cols-2">
                  {app.screenshots.map((shot) => (
                    <figure key={shot.id} className="space-y-2">
                      <AppScreenshot
                        appId={app.id}
                        variant={shot.id}
                        title={shot.title[locale]}
                      />
                      <figcaption className="text-xs text-slate-500 dark:text-slate-400">
                        <strong className="font-semibold text-slate-700 dark:text-slate-200">
                          {shot.title[locale]}:
                        </strong>{" "}
                        {shot.caption[locale]}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>

              {/* Actions & Policy Links */}
              <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-6 dark:border-slate-800">
                {app.playStoreUrl && app.status !== "in_development" ? (
                  <a
                    href={app.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    <span>{dict.common.viewOnPlayStore}</span>
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : (
                  <span className="inline-flex items-center rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {dict.common.comingSoonPlayStore}
                  </span>
                )}

                <Link
                  href={app.privacyPolicyPath}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:border-blue-400 hover:text-blue-700 dark:border-slate-700 dark:bg-navy-950 dark:text-slate-200"
                >
                  <Shield className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                  <span>{dict.common.privacyPolicy}</span>
                </Link>

                <Link
                  href={app.supportPath}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:border-blue-400 hover:text-blue-700 dark:border-slate-700 dark:bg-navy-950 dark:text-slate-200"
                >
                  <LifeBuoy className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                  <span>{dict.common.appSupport}</span>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
