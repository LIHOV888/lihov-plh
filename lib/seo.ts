import type { Metadata } from "next";
import {
  businessConfig,
  getCanonicalBaseUrl,
  getGoogleSiteVerificationCode,
  isPlaceholderValue,
} from "@/config/business";

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
}

export function buildPageMetadata({
  title,
  description,
  path,
}: PageMetadataOptions): Metadata {
  const baseUrl = getCanonicalBaseUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${baseUrl}${normalizedPath === "/" ? "" : normalizedPath}`;
  const fullTitle =
    normalizedPath === "/"
      ? `${businessConfig.brandName} — ${title}`
      : `${title} | ${businessConfig.brandName}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: businessConfig.brandName,
      type: "website",
      locale: "en_US",
      alternateLocale: ["km_KH"],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export function buildRootMetadata(): Metadata {
  const baseUrl = getCanonicalBaseUrl();
  const verificationCode = getGoogleSiteVerificationCode();

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: `${businessConfig.brandName} — ${businessConfig.industry.en}`,
      template: `%s | ${businessConfig.brandName}`,
    },
    description: `${businessConfig.brandName} is a Cambodia-based technology company specializing in ${businessConfig.industry.en}.`,
    applicationName: businessConfig.brandName,
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    ...(verificationCode
      ? {
          verification: {
            google: verificationCode,
          },
        }
      : {}),
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * Generates clean Organization JSON-LD structured data for Google Search and
 * Google Play Console organization verification.
 * Automatically omits any unreplaced placeholder fields so no placeholder text
 * is published into structured search metadata.
 */
export function buildOrganizationJsonLd(): Record<string, unknown> {
  const baseUrl = getCanonicalBaseUrl();
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: businessConfig.brandName,
    url: baseUrl,
    logo: `${baseUrl}/brand/lihov-mark.svg`,
    description: `${businessConfig.brandName} — ${businessConfig.industry.en} in ${businessConfig.country.en}.`,
  };

  if (!isPlaceholderValue(businessConfig.legalOrganizationName)) {
    jsonLd.legalName = businessConfig.legalOrganizationName;
  }

  if (!isPlaceholderValue(businessConfig.businessEmail)) {
    jsonLd.email = businessConfig.businessEmail;
  }

  if (!isPlaceholderValue(businessConfig.businessPhone)) {
    jsonLd.telephone = businessConfig.businessPhone;
  }

  const address: Record<string, string> = {
    "@type": "PostalAddress",
    addressCountry: businessConfig.country.isoCode,
  };

  if (!isPlaceholderValue(businessConfig.businessAddress)) {
    address.streetAddress = businessConfig.businessAddress;
  }
  jsonLd.address = address;

  if (
    !isPlaceholderValue(businessConfig.supportEmail) ||
    !isPlaceholderValue(businessConfig.businessPhone)
  ) {
    const contactPoint: Record<string, unknown> = {
      "@type": "ContactPoint",
      contactType: "customer support",
      availableLanguage: ["English", "Khmer"],
      url: `${baseUrl}/support`,
    };
    if (!isPlaceholderValue(businessConfig.supportEmail)) {
      contactPoint.email = businessConfig.supportEmail;
    }
    if (!isPlaceholderValue(businessConfig.businessPhone)) {
      contactPoint.telephone = businessConfig.businessPhone;
    }
    jsonLd.contactPoint = [contactPoint];
  }

  return jsonLd;
}
