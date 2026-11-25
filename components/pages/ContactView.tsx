"use client";

import React, { useState } from "react";
import { AlertTriangle, CheckCircle2, Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { businessConfig, isPlaceholderValue } from "@/config/business";
import { useSite } from "@/components/providers/SiteProviders";
import { BusinessValue } from "@/components/ui/BusinessValue";

type SubmissionState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "not_configured"; message: string }
  | { status: "error"; message: string; fieldErrors?: Record<string, string> };

export function ContactView() {
  const { dict } = useSite();
  const [loadedAt] = useState<number>(() => Date.now());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("general");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // Honeypot
  const [state, setState] = useState<SubmissionState>({ status: "idle" });

  const emailConfigured = !isPlaceholderValue(businessConfig.businessEmail);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState({ status: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          category,
          subject,
          message,
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
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        return;
      }

      if (data.code === "DELIVERY_NOT_CONFIGURED") {
        setState({
          status: "not_configured",
          message: data.message || dict.contact.deliveryNotConfiguredBody,
        });
        return;
      }

      setState({
        status: "error",
        message: data.message || dict.contact.errorTitle,
        fieldErrors: data.errors,
      });
    } catch {
      setState({
        status: "error",
        message: dict.contact.networkError,
      });
    }
  };

  const mailtoHref = emailConfigured
    ? `mailto:${businessConfig.businessEmail}?subject=${encodeURIComponent(
        subject || `${businessConfig.brandName} Inquiry`
      )}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nCategory: ${category}\n\n${message}`
      )}`
    : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 animate-fade-up">
      <div className="max-w-3xl space-y-4">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          {dict.contact.eyebrow}
        </p>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          {dict.contact.title}
        </h1>
        <p className="text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
          {dict.contact.subtitle}
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-5">
        {/* Direct Official Channels */}
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-navy-900">
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              {dict.contact.directChannelsTitle}
            </h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {dict.common.officialEmail}
                  </dt>
                  <dd className="mt-1">
                    <BusinessValue value={businessConfig.businessEmail} type="email" />
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {dict.common.officialPhone}
                  </dt>
                  <dd className="mt-1">
                    <BusinessValue value={businessConfig.businessPhone} type="phone" />
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {dict.common.businessAddress}
                  </dt>
                  <dd className="mt-1 text-slate-700 dark:text-slate-300">
                    <BusinessValue value={businessConfig.businessAddress} />
                  </dd>
                </div>
              </div>
            </dl>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-navy-900">
            <div className="flex items-center gap-2.5">
              <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" aria-hidden="true" />
              <h2 className="font-display text-base font-bold text-slate-900 dark:text-white">
                {dict.contact.supportHoursTitle}
              </h2>
            </div>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {dict.contact.supportHoursBody}
            </p>
          </section>
        </div>

        {/* Contact Form */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-3 dark:border-slate-800 dark:bg-navy-900">
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            {dict.contact.formTitle}
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {dict.contact.formSubtitle}
          </p>

          {state.status === "success" && (
            <div
              role="status"
              className="mt-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <div>
                <p className="font-semibold">{dict.contact.successTitle}</p>
                <p className="mt-1">{dict.contact.successBody}</p>
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
                  <p className="font-semibold">{dict.contact.deliveryNotConfiguredTitle}</p>
                  <p className="mt-1">{dict.contact.deliveryNotConfiguredBody}</p>
                </div>
              </div>
              {mailtoHref && (
                <a
                  href={mailtoHref}
                  className="inline-flex items-center gap-2 rounded-lg bg-amber-900 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-500"
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
              <p className="font-semibold">{dict.contact.errorTitle}</p>
              <p className="mt-1">{state.message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            {/* Honeypot field hidden from human users */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="contact-website">Website</label>
              <input
                id="contact-website"
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
                  htmlFor="contact-name"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  {dict.contact.fields.name} *
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                />
                {state.status === "error" && state.fieldErrors?.name && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {state.fieldErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  {dict.contact.fields.email} *
                </label>
                <input
                  id="contact-email"
                  name="email"
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
                  htmlFor="contact-category"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  {dict.contact.fields.category}
                </label>
                <select
                  id="contact-category"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                >
                  <option value="general">{dict.contact.categories.general}</option>
                  <option value="app_support">{dict.contact.categories.app_support}</option>
                  <option value="business">{dict.contact.categories.business}</option>
                  <option value="privacy">{dict.contact.categories.privacy}</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  {dict.contact.fields.subject} *
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                />
                {state.status === "error" && state.fieldErrors?.subject && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {state.fieldErrors.subject}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                {dict.contact.fields.message} *
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-navy-950 dark:text-white"
              />
              {state.status === "error" && state.fieldErrors?.message && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {state.fieldErrors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={state.status === "submitting"}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:brightness-110 disabled:opacity-60"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              <span>
                {state.status === "submitting"
                  ? dict.contact.fields.submitting
                  : dict.contact.fields.submit}
              </span>
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
