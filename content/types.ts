import type { ServiceConfig } from "@/config/business";

export interface SiteDictionary {
  meta: {
    languageName: string;
    switchToLabel: string;
    skipToContent: string;
  };
  nav: {
    home: string;
    about: string;
    services: string;
    apps: string;
    support: string;
    contact: string;
    privacy: string;
    terms: string;
    dataDeletion: string;
    menuOpen: string;
    menuClose: string;
  };
  common: {
    brandTagline: string;
    inDevelopment: string;
    beta: string;
    published: string;
    comingSoonPlayStore: string;
    viewOnPlayStore: string;
    privacyPolicy: string;
    appSupport: string;
    dataDeletion: string;
    contactUs: string;
    exploreServices: string;
    exploreApps: string;
    officialEmail: string;
    officialPhone: string;
    businessAddress: string;
    legalName: string;
    countryLabel: string;
    timezoneLabel: string;
    lastUpdated: string;
    notConfiguredNotice: string;
  };
  home: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    missionEyebrow: string;
    missionTitle: string;
    missionBody: string;
    pillars: Array<{
      title: string;
      description: string;
    }>;
    servicesEyebrow: string;
    servicesTitle: string;
    servicesSubtitle: string;
    featuredEyebrow: string;
    featuredTitle: string;
    featuredSubtitle: string;
    ctaBannerTitle: string;
    ctaBannerBody: string;
    ctaContact: string;
    ctaSupport: string;
  };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    missionTitle: string;
    missionBody: string;
    visionTitle: string;
    visionBody: string;
    activitiesTitle: string;
    activities: Array<{
      title: string;
      description: string;
    }>;
    identityTitle: string;
    identitySubtitle: string;
    cambodiaNote: string;
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Record<
      ServiceConfig["id"],
      {
        title: string;
        summary: string;
        deliverables: string[];
      }
    >;
    ctaTitle: string;
    ctaBody: string;
  };
  apps: {
    eyebrow: string;
    title: string;
    subtitle: string;
    transparencyNote: string;
    versionLabel: string;
    platformLabel: string;
    statusLabel: string;
    packageLabel: string;
    screenshotsHeading: string;
    highlightsHeading: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    directChannelsTitle: string;
    supportHoursTitle: string;
    supportHoursBody: string;
    formTitle: string;
    formSubtitle: string;
    fields: {
      name: string;
      email: string;
      category: string;
      subject: string;
      message: string;
      submit: string;
      submitting: string;
    };
    categories: {
      general: string;
      app_support: string;
      business: string;
      privacy: string;
    };
    deliveryNotConfiguredTitle: string;
    deliveryNotConfiguredBody: string;
    mailtoFallback: string;
    successTitle: string;
    successBody: string;
    errorTitle: string;
    networkError: string;
  };
  privacy: {
    eyebrow: string;
    title: string;
    subtitle: string;
    disclaimerBanner: string;
    sections: {
      overviewTitle: string;
      overviewBody: string;
      personalInfoTitle: string;
      personalInfoBody: string;
      cookiesTitle: string;
      cookiesActiveBody: string;
      cookiesInactiveBody: string;
      adsTitle: string;
      adsActiveBody: string;
      adsInactiveBody: string;
      thirdPartyTitle: string;
      thirdPartyBody: string;
      retentionTitle: string;
      childrenTitle: string;
      childrenBody: string;
      rightsTitle: string;
      rightsItems: string[];
      appSpecificTitle: string;
      adMobLabel: string;
      adMobEnabled: string;
      adMobDisabled: string;
      userDataLabel: string;
      userDataCollected: string;
      userDataNone: string;
      contactTitle: string;
      contactBody: string;
    };
  };
  terms: {
    eyebrow: string;
    title: string;
    subtitle: string;
    disclaimerBanner: string;
    sections: Array<{
      title: string;
      body: string;
    }>;
  };
  support: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cards: Array<{
      title: string;
      description: string;
      actionLabel: string;
      href: string;
    }>;
    appSupportTitle: string;
    bugReportTitle: string;
    bugReportSteps: string[];
    accountHelpTitle: string;
    accountHelpBody: string;
    faqTitle: string;
    faqs: Array<{
      question: string;
      answer: string;
    }>;
  };
  dataDeletion: {
    eyebrow: string;
    title: string;
    subtitle: string;
    howItWorksTitle: string;
    steps: string[];
    retentionTitle: string;
    retentionBody: string;
    formTitle: string;
    formSubtitle: string;
    fields: {
      fullName: string;
      email: string;
      appName: string;
      accountIdentifier: string;
      details: string;
      submit: string;
      submitting: string;
    };
    notConfiguredTitle: string;
    notConfiguredBody: string;
    successTitle: string;
    successBody: string;
    networkError: string;
  };
  footer: {
    description: string;
    companyHeading: string;
    legalHeading: string;
    contactHeading: string;
    rightsReserved: string;
  };
}
