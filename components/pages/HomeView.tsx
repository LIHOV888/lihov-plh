"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Terminal } from "lucide-react";
import { businessConfig } from "@/config/business";
import { useSite } from "@/components/providers/SiteProviders";
import { HeroIllustration } from "@/components/illustrations/HeroIllustration";
import { AppIcon } from "@/components/illustrations/AppArtwork";
import { AppStatusBadge, getAppStatusLabel } from "@/components/ui/AppStatusBadge";
import { ServiceIcon } from "@/components/ui/ServiceIcon";

export function HomeView() {
  const { dict, locale } = useSite();
  const enabledServices = businessConfig.services.filter((s) => s.enabled);

  return (
    <div className="animate-fade-up">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-grid-pattern border-b border-slate-200/80 dark:border-slate-800/80">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-blue-50/70 via-purple-50/30 to-transparent dark:from-blue-950/30 dark:via-purple-950/15"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:px-8">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1.5 text-xs font-semibold text-blue-700 dark:border-blue-800/70 dark:bg-blue-950/60 dark:text-blue-300">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{dict.home.eyebrow}</span>
            </div>

            <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
              {dict.home.headline}
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
              {dict.home.subheadline}
            </p>

            <div className="flex flex-wrap gap-3.5 pt-2">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:brightness-110"
              >
                <span>{dict.home.primaryCta}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/apps"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-blue-400 hover:text-blue-700 dark:border-slate-700 dark:bg-navy-900 dark:text-slate-100 dark:hover:border-blue-500"
              >
                <span>{dict.home.secondaryCta}</span>
              </Link>
            </div>
          </div>

          <HeroIllustration />
        </div>
      </section>

      {/* Mission & Pillars */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            {dict.home.missionEyebrow}
          </p>
          <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
            {dict.home.missionTitle}
          </h2>
          <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
            {dict.home.missionBody}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {dict.home.pillars.map((pillar, idx) => {
            const Icon = idx === 0 ? Terminal : idx === 1 ? ShieldCheck : Sparkles;
            return (
              <div
                key={pillar.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-navy-900"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/70 dark:text-blue-400">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Services Overview */}
      <section className="border-y border-slate-200/80 bg-slate-50/70 py-16 dark:border-slate-800/80 dark:bg-navy-900/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">
                {dict.home.servicesEyebrow}
              </p>
              <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
                {dict.home.servicesTitle}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {dict.home.servicesSubtitle}
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              <span>{dict.common.exploreServices}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {enabledServices.slice(0, 6).map((service) => {
              const content = dict.services.items[service.id];
              return (
                <div
                  key={service.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-blue-300 dark:border-slate-800 dark:bg-navy-950 dark:hover:border-blue-700"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 text-blue-600 dark:text-blue-400">
                    <ServiceIcon name={service.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                    {content.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {content.summary}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Applications */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              {dict.home.featuredEyebrow}
            </p>
            <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
              {dict.home.featuredTitle}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {dict.home.featuredSubtitle}
            </p>
          </div>
          <Link
            href="/apps"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            <span>{dict.common.exploreApps}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 grid gap-6">
          {businessConfig.apps.map((app) => {
            const statusText = getAppStatusLabel(app.status, dict.common);

            return (
              <div
                key={app.id}
                className="flex flex-col justify-between gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center dark:border-slate-800 dark:bg-navy-900"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  <AppIcon appId={app.id} className="h-16 w-16 shrink-0" />
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                        {app.name}
                      </h3>
                      <AppStatusBadge status={app.status} label={statusText} size="sm" />
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        {app.platform} &middot; v{app.version}
                      </span>
                    </div>
                    <p className="max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {app.shortDescription[locale]}
                    </p>
                    <ul className="flex flex-wrap gap-x-5 gap-y-1.5 pt-1 text-xs text-slate-600 dark:text-slate-400">
                      {app.highlights[locale].map((item) => (
                        <li key={item} className="inline-flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5 md:flex-col md:items-end">
                  <Link
                    href={`/apps#${app.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
                  >
                    <span>{dict.common.exploreApps}</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                  <div className="flex gap-3 text-xs font-medium text-slate-600 dark:text-slate-400">
                    <Link href={app.privacyPolicyPath} className="hover:text-blue-600 dark:hover:text-blue-400">
                      {dict.common.privacyPolicy}
                    </Link>
                    <span>&middot;</span>
                    <Link href={app.supportPath} className="hover:text-blue-600 dark:hover:text-blue-400">
                      {dict.common.appSupport}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact & Support CTA Banner */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-navy-900 via-blue-950 to-indigo-950 px-6 py-12 text-white shadow-xl sm:px-12">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl space-y-2.5">
              <h2 className="font-display text-2xl font-bold sm:text-3xl">
                {dict.home.ctaBannerTitle}
              </h2>
              <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
                {dict.home.ctaBannerBody}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-blue-50"
              >
                <span>{dict.home.ctaContact}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/support"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
              >
                <span>{dict.home.ctaSupport}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
