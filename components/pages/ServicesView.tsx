"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { businessConfig } from "@/config/business";
import { useSite } from "@/components/providers/SiteProviders";
import { ServiceIcon } from "@/components/ui/ServiceIcon";

export function ServicesView() {
  const { dict } = useSite();
  const enabledServices = businessConfig.services.filter((s) => s.enabled);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 animate-fade-up">
      <div className="max-w-3xl space-y-4">
        <p className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">
          {dict.services.eyebrow}
        </p>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          {dict.services.title}
        </h1>
        <p className="text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
          {dict.services.subtitle}
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {enabledServices.map((service) => {
          const item = dict.services.items[service.id];
          return (
            <article
              key={service.id}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md dark:border-slate-800 dark:bg-navy-900 dark:hover:border-blue-700"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/15 to-purple-600/15 text-blue-600 dark:text-blue-400">
                <ServiceIcon name={service.icon} className="h-6 w-6" />
              </div>
              <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                {item.title}
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {item.summary}
              </p>
              <ul className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-400">
                {item.deliverables.map((deliverable) => (
                  <li key={deliverable} className="flex items-start gap-2">
                    <CheckCircle2
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-600 dark:text-blue-400"
                      aria-hidden="true"
                    />
                    <span>{deliverable}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      <div className="mt-14 rounded-2xl border border-slate-200 bg-slate-50 p-8 sm:flex sm:items-center sm:justify-between dark:border-slate-800 dark:bg-navy-900">
        <div className="max-w-xl space-y-1.5">
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            {dict.services.ctaTitle}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {dict.services.ctaBody}
          </p>
        </div>
        <Link
          href="/contact"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 sm:mt-0"
        >
          <span>{dict.common.contactUs}</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
