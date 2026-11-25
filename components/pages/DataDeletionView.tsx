"use client";

import React, { useState } from "react";
import { AlertTriangle, CheckCircle2, Mail, Trash2 } from "lucide-react";
import { businessConfig, isPlaceholderValue } from "@/config/business";
import { useSite } from "@/components/providers/SiteProviders";
import { BusinessValue } from "@/components/ui/BusinessValue";

type DeletionState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "not_configured"; message: string }
  | { status: "error"; message: string; fieldErrors?: Record<string, string> };

export function DataDeletionView() {
  const { dict } = useSite();
  const [loadedAt] = useState<number>(() => Date.now());
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [appName, setAppName] = useState(
    businessConfig.apps[0]?.name ?? `${businessConfig.brandName} Website`
  );
  const [accountIdentifier, setAccountIdentifier] = useState("");
  const [details, setDetails] = useState("");
  const [website, setWebsite] = useState(""); // Honeypot
  const [state, setState] = useState<DeletionState>({ status: "idle" });

  const emailConfigured = !isPlaceholderValue(businessConfig.privacyEmail);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState({ status: "submitting" });

    try {
      const response = await fetch("/api/data-deletion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          appName,
          accountIdentifier,
          details,
          website,
          formLoadedAt: loadedAt,
        }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        code?: string;
        message?: string;
        errors?: Record<string, string>;
      };

      if (response.ok && data.ok) {
        setState({ status: "success" });
        setFullName("");
        setEmail("");
        setAccountIdentifier("");
        setDetails("");
        return;
      }

      if (data.code === "DELIVERY_NOT_CONFIGURED") {
        setState({
          status: "not_configured",
          message: data.message || dict.dataDeletion.notConfiguredBody,
        });
        return;
      }

      setState({
        status: "error",
        message: data.message || "Could not submit deletion request.",
        fieldErrors: data.errors,
      });
    } catch {
      setState({
        status: "error",
        message: dict.dataDeletion.networkError,
      });
    }
  };

  const mailtoHref = emailConfigured
    ? `mailto:${businessConfig.privacyEmail}?subject=${encodeURIComponent(
        `Data Deletion Request — ${appName}`
      )}&body=${encodeURIComponent(
        `Full Name: ${fullName}\nEmail: ${email}\nApplication/Service: ${appName}\nAccount ID: ${accountIdentifier}\n\nDetails:\n${details}`
      )}`
    : null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 animate-fade-up">
      <div className="max-w-3xl space-y-4">
        <p className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">
          {dict.dataDeletion.eyebrow}
        </p>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          {dict.dataDeletion.title}
        </h1>
        <p className="text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
          {dict.dataDeletion.subtitle}
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-5">
        {/* Instructions & Retention */}
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-navy-900">
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              {dict.dataDeletion.howItWorksTitle}
            </h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {dict.dataDeletion.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="mt-5 border-t border-slate-100 pt-4 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-400">
              <strong>{dict.common.officialEmail}:</strong>{" "}
              <BusinessValue value={businessConfig.privacyEmail} type="email" />
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-navy-900">
            <h2 className="font-display text-base font-bold text-slate-900 dark:text-white">
              {dict.dataDeletion.retentionTitle}
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {dict.dataDeletion.retentionBody}
            </p>
          </section>
        </div>

        {/* Request Form */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-3 dark:border-slate-800 dark:bg-navy-900">
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            {dict.dataDeletion.formTitle}
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {dict.dataDeletion.formSubtitle}
          </p>

          {state.status === "success" && (
            <div
              role="status"
              className="mt-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <div>
                <p className="font-semibold">{dict.dataDeletion.successTitle}</p>
                <p className="mt-1">{dict.dataDeletion.successBody}</p>
              </div>
            </div>
          )}

          {state.status === "not_configured" && (
            <div
              role="alert"
              className="mt-5 space-y-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950 dark:border-amber-700/70 dark:bg-amber-950/50 dark:text-amber-200"
            >
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-semibold">{dict.dataDeletion.notConfiguredTitle}</p>
                  <p className="mt-1">{dict.dataDeletion.notConfiguredBody}</p>
                </div>
              </div>
              {mailtoHref && (
                <a
                  href={mailtoHref}
                  className="inline-flex items-center gap-2 rounded-lg bg-amber-900 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-800 dark:bg-amber-600"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span>{dict.contact.mailtoFallback}</span>
                </a>
              )}
            </div>
          )}

          {state.status === "error" && (
            <div
              role="alert"
              className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900 dark:border-red-900/70 dark:bg-red-950/50 dark:text-red-200"
            >
              <p>{state.message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            <div className="hidden" aria-hidden="true">
              <label htmlFor="del-website">Website</label>
              <input
                id="del-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="del-name"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  {dict.dataDeletion.fields.fullName} *
                </label>
                <input
                  id="del-name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                />
                {state.status === "error" && state.fieldErrors?.fullName && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {state.fieldErrors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="del-email"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  {dict.dataDeletion.fields.email} *
                </label>
                <input
                  id="del-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                />
                {state.status === "error" && state.fieldErrors?.email && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {state.fieldErrors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="del-app"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  {dict.dataDeletion.fields.appName} *
                </label>
                <input
                  id="del-app"
                  type="text"
                  list="portfolio-apps"
                  required
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                />
                <datalist id="portfolio-apps">
                  {businessConfig.apps.map((app) => (
                    <option key={app.id} value={app.name} />
                  ))}
                  <option value={`${businessConfig.brandName} Website`} />
                </datalist>
                {state.status === "error" && state.fieldErrors?.appName && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {state.fieldErrors.appName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="del-id"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  {dict.dataDeletion.fields.accountIdentifier}
                </label>
                <input
                  id="del-id"
                  type="text"
                  value={accountIdentifier}
                  onChange={(e) => setAccountIdentifier(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="del-details"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                {dict.dataDeletion.fields.details} *
              </label>
              <textarea
                id="del-details"
                rows={4}
                required
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-navy-950 dark:text-white"
              />
              {state.status === "error" && state.fieldErrors?.details && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {state.fieldErrors.details}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={state.status === "submitting"}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-60 dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              <span>
                {state.status === "submitting"
                  ? dict.dataDeletion.fields.submitting
                  : dict.dataDeletion.fields.submit}
              </span>
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
