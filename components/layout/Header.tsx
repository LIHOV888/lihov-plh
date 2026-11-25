"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { businessConfig } from "@/config/business";
import { useSite } from "@/components/providers/SiteProviders";

export function Header() {
  const pathname = usePathname();
  const { dict } = useSite();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/", label: dict.nav.home },
    { href: "/about", label: dict.nav.about },
    { href: "/services", label: dict.nav.services },
    { href: "/apps", label: dict.nav.apps },
    { href: "/support", label: dict.nav.support },
    { href: "/contact", label: dict.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-md dark:border-slate-800/80 dark:bg-navy-950/85">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        {dict.meta.skipToContent}
      </a>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          aria-label={businessConfig.brandName}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 shadow-sm transition-transform group-hover:scale-105">
            <svg
              viewBox="0 0 64 64"
              fill="none"
              className="h-7 w-7"
              aria-hidden="true"
            >
              <path d="M18 16H27V39H46V47H18V16Z" fill="#FFFFFF" />
              <circle cx="43" cy="22" r="6" fill="#38BDF8" />
            </svg>
          </span>
          <span className="flex flex-col">
            <span className="font-display text-base font-extrabold tracking-wide text-slate-900 dark:text-white">
              {businessConfig.brandName}
            </span>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              {dict.common.brandTagline}
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          {navLinks.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/70 dark:hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? dict.nav.menuClose : dict.nav.menuOpen}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 md:hidden dark:border-slate-700 dark:bg-navy-900 dark:text-slate-200"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Mobile navigation"
          className="border-t border-slate-200 bg-white px-4 py-4 md:hidden dark:border-slate-800 dark:bg-navy-950"
        >
          <ul className="space-y-1">
            {navLinks.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`block rounded-lg px-3.5 py-2.5 text-sm font-medium ${
                      isActive
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
