"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { businessConfig, isPlaceholderValue } from "@/config/business";
import { useSite } from "@/components/providers/SiteProviders";

export function Footer() {
  const { dict, locale } = useSite();
  const year = new Date().getFullYear();

  const emailConfigured = !isPlaceholderValue(businessConfig.businessEmail);
  const phoneConfigured = !isPlaceholderValue(businessConfig.businessPhone);

  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-navy-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Summary */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
                <svg viewBox="0 0 64 64" fill="none" className="h-6 w-6" aria-hidden="true">
                  <path d="M18 16H27V39H46V47H18V16Z" fill="#FFFFFF" />
                  <circle cx="43" cy="22" r="6" fill="#38BDF8" />
                </svg>
              </span>
              <span className="font-display text-base font-extrabold text-slate-900 dark:text-white">
                {businessConfig.brandName}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {dict.footer.description}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {businessConfig.country[locale]} &middot; {businessConfig.timezone}
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              {dict.footer.companyHeading}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  {dict.nav.about}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  {dict.nav.services}
                </Link>
              </li>
              <li>
                <Link
                  href="/apps"
                  className="text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  {dict.nav.apps}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  {dict.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance & Legal Links */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              {dict.footer.legalHeading}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  {dict.nav.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  {dict.nav.terms}
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  {dict.nav.support}
                </Link>
              </li>
              <li>
                <Link
                  href="/data-deletion"
                  className="text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  {dict.nav.dataDeletion}
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Contact */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              {dict.footer.contactHeading}
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                {emailConfigured ? (
                  <a
                    href={`mailto:${businessConfig.businessEmail}`}
                    className="break-all hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {businessConfig.businessEmail}
                  </a>
                ) : (
                  <span className="font-mono text-xs text-amber-700 dark:text-amber-400">
                    {businessConfig.businessEmail}
                  </span>
                )}
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                {phoneConfigured ? (
                  <a
                    href={`tel:${businessConfig.businessPhone}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {businessConfig.businessPhone}
                  </a>
                ) : (
                  <span className="font-mono text-xs text-amber-700 dark:text-amber-400">
                    {businessConfig.businessPhone}
                  </span>
                )}
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                <span
                  className={
                    isPlaceholderValue(businessConfig.businessAddress)
                      ? "font-mono text-xs text-amber-700 dark:text-amber-400"
                      : ""
                  }
                >
                  {businessConfig.businessAddress}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row dark:border-slate-800 dark:text-slate-400">
          <p>
            &copy; {year} {businessConfig.brandName} ({businessConfig.legalOrganizationName}).{" "}
            {dict.footer.rightsReserved}
          </p>
          <p>
            {businessConfig.industry[locale]} &middot; {businessConfig.country[locale]}
          </p>
        </div>
      </div>
    </footer>
  );
}
