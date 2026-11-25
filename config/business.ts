/**
 * CENTRALIZED BUSINESS CONFIGURATION — LIHOV PLH
 *
 * Update all bracketed placeholder values ([MY ...]) with your genuine,
 * verified business details BEFORE deploying to production or submitting
 * your website to Google Play Console or Google Search Console.
 *
 * NEVER enter fabricated registration details, fake addresses, D-U-N-S numbers,
 * or unverified legal claims.
 */

export type SupportedLocale = "en" | "km";

export type AppReleaseStatus = "in_development" | "beta" | "published";

export interface ServiceConfig {
  id:
    | "android"
    | "mobile_games"
    | "web"
    | "ai"
    | "automation"
    | "api"
    | "support";
  enabled: boolean;
  icon: "Smartphone" | "Gamepad2" | "Globe" | "Sparkles" | "Workflow" | "Plug" | "LifeBuoy";
}

export interface AppPortfolioItem {
  id: string;
  slug: string;
  name: string;
  packageName?: string;
  category: {
    en: string;
    km: string;
  };
  platform: string;
  status: AppReleaseStatus;
  version: string;
  playStoreUrl: string | null;
  privacyPolicyPath: string;
  supportPath: string;
  dataDeletionPath: string;
  usesAdMob: boolean;
  collectsAccountData: boolean;
  shortDescription: {
    en: string;
    km: string;
  };
  fullDescription: {
    en: string;
    km: string;
  };
  highlights: {
    en: string[];
    km: string[];
  };
  screenshots: Array<{
    id: string;
    title: {
      en: string;
      km: string;
    };
    caption: {
      en: string;
      km: string;
    };
  }>;
}

export interface BusinessConfig {
  brandName: string;
  industry: {
    en: string;
    km: string;
  };
  country: {
    en: string;
    km: string;
    isoCode: string;
  };
  cambodiaOperationsConfirmed: boolean;
  timezone: string;
  defaultLocale: SupportedLocale;
  supportedLocales: SupportedLocale[];
  legalOrganizationName: string;
  businessAddress: string;
  businessEmail: string;
  supportEmail: string;
  privacyEmail: string;
  businessPhone: string;
  officialDomain: string;
  googleSiteVerificationFallback: string;
  lastUpdatedDate: string;
  contactFormEnabled: boolean;
  privacyDisclosures: {
    usesCookiesOrAnalytics: boolean;
    usesGoogleAdMob: boolean;
    usesThirdPartyServices: boolean;
    supportsUserAccounts: boolean;
    childrenDirectedApps: boolean;
    dataRetentionSummary: {
      en: string;
      km: string;
    };
  };
  services: ServiceConfig[];
  apps: AppPortfolioItem[];
}

export const businessConfig: BusinessConfig = {
  brandName: "LIHOV PLH",
  industry: {
    en: "Software, Android Applications, Game Development and AI Technology",
    km: "កម្មវិធីកុំព្យូទ័រ កម្មវិធី Android ការអភិវឌ្ឍហ្គេម និងបច្ចេកវិទ្យា AI",
  },
  country: {
    en: "Cambodia",
    km: "កម្ពុជា",
    isoCode: "KH",
  },
  cambodiaOperationsConfirmed: true,
  timezone: "Asia/Phnom_Penh",
  defaultLocale: "en",
  supportedLocales: ["en", "km"],

  // =========================================================================
  // REQUIRED PRE-PRODUCTION PLACEHOLDERS — REPLACE WITH REAL BUSINESS DATA
  // =========================================================================
  legalOrganizationName: "LIHOV PLH",
  businessAddress:
    "House No. 45, National Road 6, Phum Kampong Svay, Sangkat Kampong Svay, Krong Stueng Saen, Kampong Thom Province 060303, Cambodia",
  businessEmail: "contact@lihov.com",
  supportEmail: "support@lihov.com",
  privacyEmail: "privacy@lihov.com",
  businessPhone: "+855717227986",
  officialDomain: "lihov.com",

  // Prefer setting GOOGLE_SITE_VERIFICATION in Vercel environment variables.
  // Leave this placeholder untouched if using environment variables or DNS TXT.
  googleSiteVerificationFallback: "[MY VERIFICATION CODE]",

  lastUpdatedDate: "2026-11-25",
  contactFormEnabled: true,

  // Configure these flags so /privacy accurately reflects real app & site behavior.
  privacyDisclosures: {
    usesCookiesOrAnalytics: false,
    usesGoogleAdMob: true,
    usesThirdPartyServices: true,
    supportsUserAccounts: false,
    childrenDirectedApps: false,
    dataRetentionSummary: {
      en: "Direct support and inquiry emails are retained only as long as reasonably necessary to respond to your request, maintain technical support continuity, or fulfill applicable legal and accounting obligations.",
      km: "អ៊ីមែលសាកសួរ និងសំណើជំនួយបច្ចេកទេសត្រូវបានរក្សាទុកត្រឹមរយៈពេលសមស្របដែលចាំបាច់ដើម្បីឆ្លើយតបសំណើរបស់អ្នក រក្សាការគាំទ្របច្ចេកទេស ឬបំពេញកាតព្វកិច្ចផ្លូវច្បាប់ដែលពាក់ព័ន្ធ។",
    },
  },

  // Set enabled: false for any service your business does not currently offer.
  services: [
    { id: "android", enabled: true, icon: "Smartphone" },
    { id: "mobile_games", enabled: true, icon: "Gamepad2" },
    { id: "web", enabled: true, icon: "Globe" },
    { id: "ai", enabled: true, icon: "Sparkles" },
    { id: "automation", enabled: true, icon: "Workflow" },
    { id: "api", enabled: true, icon: "Plug" },
    { id: "support", enabled: true, icon: "LifeBuoy" },
  ],

  // Application portfolio — only include genuine projects.
  // Never fabricate downloads, ratings, reviews, or unreleased Play Store links.
  apps: [
    {
      id: "trader-god-signals",
      slug: "trader-god-signals",
      name: "Trader God Signals",
      packageName: "com.lihov.plh",
      category: {
        en: "Tools / Trading Signals",
        km: "ឧបករណ៍ / សញ្ញាជួញដូរ",
      },
      platform: "Android",
      status: "published",
      version: "102",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.lihov.plh",
      privacyPolicyPath: "/privacy#trader-god-signals",
      supportPath: "/support#trader-god-signals",
      dataDeletionPath: "/data-deletion",
      usesAdMob: true,
      collectsAccountData: true,
      shortDescription: {
        en: "A Gold (XAUUSD) trading assistant and signal app on Google Play by LIHOV PLH, delivering Buy/Sell signals with Entry, Stop Loss (SL), and Take Profit (TP) levels, real-time alerts, and price action insights.",
        km: "កម្មវិធីជំនួយការជួញដូរមាស (XAUUSD) លើ Google Play ដោយ LIHOV PLH ដែលផ្តល់សញ្ញាទិញ/លក់ជាមួយកម្រិតចូល Stop Loss (SL) និង Take Profit (TP) ការជូនដំណឹងភ្លាមៗ និងការវិភាគសកម្មភាពតម្លៃ។",
      },
      fullDescription: {
        en: "Trader God Signals is a published Android trading assistant (com.lihov.plh) developed by LIHOV PLH for XAUUSD (Gold) traders. It provides structured Buy/Sell signal setups with Entry, Stop Loss (SL), and Take Profit (TP) guidance, instant push notifications, market trend outlooks, and compatibility across MT4, MT5, Binance, Exness, Octa, and other trading platforms. Free to install on Google Play with ads and optional in-app purchases; data is encrypted in transit and users can request data deletion.",
        km: "Trader God Signals គឺជាកម្មវិធីជំនួយការជួញដូរមាស Android ដែលបានចេញផ្សាយជាផ្លូវការ (com.lihov.plh) ដោយ LIHOV PLH សម្រាប់ទីផ្សារ XAUUSD។ កម្មវិធីផ្តល់សញ្ញាទិញ/លក់ជាមួយកម្រិតចូល Stop Loss (SL) និង Take Profit (TP) ការជូនដំណឹងភ្លាមៗ ការវិភាគនិន្នាការទីផ្សារ និងអាចប្រើប្រាស់បានជាមួយ MT4, MT5, Binance, Exness, Octa និងឈ្មួញកណ្តាលផ្សេងៗ។ ដំឡើងឥតគិតថ្លៃលើ Google Play ដោយមានការផ្សាយពាណិជ្ជកម្ម និងជម្រើសទិញក្នុងកម្មវិធី ព្រមទាំងការអ៊ិនគ្រីបទិន្នន័យ និងសិទ្ធិស្នើសុំលុបទិន្នន័យ។",
      },
      highlights: {
        en: [
          "XAUUSD (Gold) Buy/Sell signals with Entry, SL & TP",
          "Instant real-time push alerts & trend analysis",
          "Compatible with MT4, MT5, Binance, Exness & Octa",
        ],
        km: [
          "សញ្ញាទិញ/លក់មាស (XAUUSD) ជាមួយកម្រិតចូល SL និង TP",
          "ការជូនដំណឹងភ្លាមៗ និងការវិភាគនិន្នាការទីផ្សារ",
          "ប្រើប្រាស់បានជាមួយ MT4, MT5, Binance, Exness និង Octa",
        ],
      },
      screenshots: [
        {
          id: "signals-feed",
          title: {
            en: "Live XAUUSD Signals",
            km: "សញ្ញាមាស XAUUSD ផ្ទាល់",
          },
          caption: {
            en: "Buy/Sell signal feed showing entry price, Stop Loss (SL), and Take Profit (TP) targets.",
            km: "ផ្ទាំងសញ្ញាទិញ/លក់ដែលបង្ហាញតម្លៃចូល Stop Loss (SL) និងគោលដៅ Take Profit (TP)។",
          },
        },
        {
          id: "market-analysis",
          title: {
            en: "Market Trend & Alerts",
            km: "ការវិភាគទីផ្សារ និងការជូនដំណឹង",
          },
          caption: {
            en: "Price action outlook, risk-managed setups, and real-time push alert indicators.",
            km: "ទិដ្ឋភាពសកម្មភាពតម្លៃ ការគ្រប់គ្រងហានិភ័យ និងការជូនដំណឹងតាមពេលវេលាជាក់ស្តែង។",
          },
        },
      ],
    },
    {
      id: "pips-wonder-garden",
      slug: "pips-wonder-garden",
      name: "Pip's Wonder Garden",
      category: {
        en: "Mobile Game",
        km: "ហ្គេមទូរស័ព្ទ",
      },
      platform: "Android",
      status: "in_development",
      version: "0.1.0-dev",
      playStoreUrl: null,
      privacyPolicyPath: "/privacy#pips-wonder-garden",
      supportPath: "/support#pips-wonder-garden",
      dataDeletionPath: "/data-deletion",
      usesAdMob: false,
      collectsAccountData: false,
      shortDescription: {
        en: "An original Android mobile game currently in active development at LIHOV PLH, designed around calm garden exploration, interactive crafting, and accessible mobile controls.",
        km: "ហ្គេមទូរស័ព្ទ Android ដើមដែលកំពុងស្ថិតក្នុងដំណាក់កាលអភិវឌ្ឍនៅ LIHOV PLH ដោយផ្តោតលើការរុករកសួនច្បារដ៏ស្ងប់ស្ងាត់ ការច្នៃប្រឌិតអន្តរកម្ម និងការគ្រប់គ្រងងាយស្រួលលើទូរស័ព្ទ។",
      },
      fullDescription: {
        en: "Pip's Wonder Garden is an upcoming Android title being engineered by LIHOV PLH. This portfolio entry will be updated with an official Google Play Store listing link, release notes, and final data safety disclosures once the game is publicly released.",
        km: "Pip's Wonder Garden គឺជាហ្គេម Android ដែលកំពុងត្រូវបានអភិវឌ្ឍដោយ LIHOV PLH។ ទំព័រនេះនឹងត្រូវបានធ្វើបច្ចុប្បន្នភាពជាមួយតំណភ្ជាប់ Google Play Store ផ្លូវការ កំណត់ត្រាកំណែ និងព័ត៌មានសុវត្ថិភាពទិន្នន័យចុងក្រោយនៅពេលហ្គេមត្រូវបានចេញផ្សាយជាសាធារណៈ។",
      },
      highlights: {
        en: [
          "Native Android performance target",
          "Offline-friendly core gameplay design",
          "Dedicated privacy policy and support documentation",
        ],
        km: [
          "ផ្តោតលើដំណើរការរលូនលើប្រព័ន្ធ Android",
          "ការរចនាការលេងដែលងាយស្រួលប្រើប្រាស់",
          "មានគោលការណ៍ឯកជនភាព និងទំព័រជំនួយជាក់លាក់",
        ],
      },
      screenshots: [
        {
          id: "garden-overview",
          title: {
            en: "Garden Hub Concept",
            km: "គំរូទិដ្ឋភាពសួនច្បារ",
          },
          caption: {
            en: "In-development UI preview — final visuals subject to change prior to launch.",
            km: "គំរូផ្ទាំងបង្ហាញក្នុងដំណាក់កាលអភិវឌ្ឍ — រូបភាពចុងក្រោយអាចផ្លាស់ប្តូរមុនពេលចេញផ្សាយ។",
          },
        },
        {
          id: "crafting-bench",
          title: {
            en: "Plant & Crafting System",
            km: "ប្រព័ន្ធដាំដុះ និងច្នៃប្រឌិត",
          },
          caption: {
            en: "In-development gameplay layout concept.",
            km: "គំរូប្លង់ប្រព័ន្ធលេងក្នុងដំណាក់កាលអភិវឌ្ឍ។",
          },
        },
      ],
    },
    {
      id: "plh-tunnel-vpn",
      slug: "plh-tunnel-vpn",
      name: "PLH Tunnel VPN",
      packageName: "com.lihov.vpn",
      category: {
        en: "VPN / Utility",
        km: "VPN / ឧបករណ៍ប្រើប្រាស់",
      },
      platform: "Android",
      status: "in_development",
      version: "0.1.0-dev",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.lihov.vpn",
      privacyPolicyPath: "/privacy#plh-tunnel-vpn",
      supportPath: "/support#plh-tunnel-vpn",
      dataDeletionPath: "/data-deletion",
      usesAdMob: true,
      collectsAccountData: false,
      shortDescription: {
        en: "A free Android VPN and tunneling utility developed by LIHOV PLH, designed to help users securely access the internet and protect their connection with encrypted tunneling protocols.",
        km: "កម្មវិធី VPN និងផ្លូវចង្អុលឥតគិតថ្លៃសម្រាប់ Android ដែលអភិវឌ្ឍដោយ LIHOV PLH ជួយអ្នកប្រើប្រាស់ភ្ជាប់អ៊ីនធឺណិតដោយសុវត្ថិភាព ជាមួយការអ៊ិនគ្រីបសញ្ញាណ។",
      },
      fullDescription: {
        en: "PLH Tunnel VPN is a free Android utility app by LIHOV PLH that provides encrypted tunneling to help users browse securely and privately. The app is currently in active development. A full Google Play Store listing, data safety disclosure, and release notes will be published once the app reaches its public release milestone.",
        km: "PLH Tunnel VPN គឺជាកម្មវិធី Android ឥតគិតថ្លៃដោយ LIHOV PLH ដែលផ្តល់ការអ៊ិនគ្រីបសញ្ញាណ ដើម្បីជួយអ្នកប្រើប្រាស់រុករកអ៊ីនធឺណិតដោយសុវត្ថិភាព។ កម្មវិធីនេះកំពុងស្ថិតក្នុងដំណាក់កាលអភិវឌ្ឍ ហើយព័ត៌មានពេញលេញនឹងត្រូវបានចេញផ្សាយនៅពេលចេញផ្សាយជាផ្លូវការ។",
      },
      highlights: {
        en: [
          "Encrypted VPN tunneling for secure browsing",
          "No account or login required",
          "Lightweight Android-native design",
        ],
        km: [
          "ការអ៊ិនគ្រីប VPN សម្រាប់ការរុករកដោយសុវត្ថិភាព",
          "មិនតម្រូវឱ្យបង្កើតគណនី",
          "ការរចនាស្រាលសម្រាប់ Android",
        ],
      },
      screenshots: [
        {
          id: "vpn-home",
          title: {
            en: "Connection Screen",
            km: "ទំព័រភ្ជាប់",
          },
          caption: {
            en: "In-development UI preview — tap to connect to a secure tunnel server.",
            km: "គំរូផ្ទាំងបង្ហាញក្នុងដំណាក់កាលអភិវឌ្ឍ — ចុចដើម្បីភ្ជាប់ទៅម៉ាស៊ីន VPN ដោយសុវត្ថិភាព។",
          },
        },
        {
          id: "vpn-connected",
          title: {
            en: "Connected State",
            km: "ស្ថានភាពដែលបានភ្ជាប់",
          },
          caption: {
            en: "Live tunnel active — real-time traffic speed indicators shown.",
            km: "ការភ្ជាប់ VPN សកម្ម — បង្ហាញសូចនាករល្បឿន Upload/Download ជាពេលវេលាជាក់ស្តែង។",
          },
        },
      ],
    },
  ],
};

/**
 * Detects whether a configuration value is still an unreplaced placeholder.
 */
export function isPlaceholderValue(value: string | undefined | null): boolean {
  if (!value) return true;
  const trimmed = value.trim();
  if (!trimmed) return true;
  return /^\[MY\s+.+\]$/i.test(trimmed);
}

/**
 * Returns a clean canonical base URL if configured via environment variable or
 * businessConfig.officialDomain. Falls back to localhost for local dev only.
 */
export function getCanonicalBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (envUrl && !isPlaceholderValue(envUrl)) {
    return envUrl.replace(/\/+$/, "");
  }

  const configuredDomain = businessConfig.officialDomain.trim();
  if (!isPlaceholderValue(configuredDomain)) {
    const withProtocol = /^https?:\/\//i.test(configuredDomain)
      ? configuredDomain
      : `https://${configuredDomain}`;
    return withProtocol.replace(/\/+$/, "");
  }

  return "http://localhost:3000";
}

/**
 * Returns the Google Search Console verification code ONLY when a genuine,
 * non-placeholder code is supplied via GOOGLE_SITE_VERIFICATION (preferred)
 * or businessConfig.googleSiteVerificationFallback.
 */
export function getGoogleSiteVerificationCode(): string | null {
  const envCode = process.env.GOOGLE_SITE_VERIFICATION?.trim();
  if (envCode && !isPlaceholderValue(envCode)) {
    return envCode;
  }

  const fallback = businessConfig.googleSiteVerificationFallback.trim();
  if (fallback && !isPlaceholderValue(fallback)) {
    return fallback;
  }

  return null;
}

/**
 * Lists all business configuration fields that still contain placeholders.
 */
export function getOutstandingPlaceholders(): Array<{
  field: string;
  currentValue: string;
}> {
  const checks: Array<{ field: string; value: string }> = [
    { field: "legalOrganizationName", value: businessConfig.legalOrganizationName },
    { field: "businessAddress", value: businessConfig.businessAddress },
    { field: "businessEmail", value: businessConfig.businessEmail },
    { field: "supportEmail", value: businessConfig.supportEmail },
    { field: "privacyEmail", value: businessConfig.privacyEmail },
    { field: "businessPhone", value: businessConfig.businessPhone },
    { field: "officialDomain", value: businessConfig.officialDomain },
  ];

  return checks
    .filter((item) => isPlaceholderValue(item.value))
    .map((item) => ({ field: item.field, currentValue: item.value }));
}
