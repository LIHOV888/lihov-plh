"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Bug, ChevronDown, HelpCircle, LifeBuoy, UserCheck } from "lucide-react";
import { businessConfig } from "@/config/business";
import { useSite } from "@/components/providers/SiteProviders";
import { BusinessValue } from "@/components/ui/BusinessValue";

export function SupportView() {
  const { dict, locale } = useSite();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 animate-fade-up">
      <div className="max-w-3xl space-y-4">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          {dict.support.eyebrow}
        </p>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          {dict.support.title}
        </h1>
        <p className="text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
          {dict.support.subtitle}
        </p>
      </div>

      {/* Support Entry Cards */}
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {dict.support.cards.map((card, index) => {
          const Icon = index === 0 ? LifeBuoy : index === 1 ? Bug : UserCheck;
          return (
            <div
              key={card.title}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-navy-900"
            >
              <div>
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/70 dark:text-blue-400">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  {card.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {card.description}
                </p>
              </div>
              <Link
                href={card.href}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                <span>{card.actionLabel}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          );
        })}
      </div>

      {/* App-Specific Support */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
          {dict.support.appSupportTitle}
        </h2>
        <div className="mt-5 grid gap-5">
          {businessConfig.apps.map((app) => (
            <div
              key={app.id}
              id={app.slug}
              className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-navy-900"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                    {app.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {app.platform} &middot; v{app.version}
                  </p>
                </div>
                <div className="flex gap-3 text-xs font-semibold">
                  <Link
                    href={app.privacyPolicyPath}
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    {dict.common.privacyPolicy}
                  </Link>
                  <Link
                    href={app.dataDeletionPath}
                    className="text-purple-600 hover:underline dark:text-purple-400"
                  >
                    {dict.common.dataDeletion}
                  </Link>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {app.shortDescription[locale]}
              </p>
              <p className="mt-3 text-xs text-slate-600 dark:text-slate-400">
                {dict.common.officialEmail}:{" "}
                <BusinessValue value={businessConfig.supportEmail} type="email" />
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bug Reporting & Account Assistance */}
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-navy-900">
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
            {dict.support.bugReportTitle}
          </h2>
          <ol className="mt-4 list-decimal space-y-2.5 pl-5 text-sm text-slate-700 dark:text-slate-300">
            {dict.support.bugReportSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-navy-900">
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
            {dict.support.accountHelpTitle}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {dict.support.accountHelpBody}
          </p>
          <div className="mt-5">
            <Link
              href="/data-deletion"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
            >
              <span>{dict.common.dataDeletion}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>

      {/* FAQ Accordion */}
      <section className="mt-12">
        <div className="flex items-center gap-2.5">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            {dict.support.faqTitle}
          </h2>
        </div>

        <div className="mt-5 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-navy-900">
          {dict.support.faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={faq.question} className="p-5">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 text-left text-sm font-semibold text-slate-900 dark:text-white"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-500 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && (
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
