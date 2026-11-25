import type { Metadata } from "next";
import { Inter, Noto_Sans_Khmer, Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/globals.css";
import { buildRootMetadata } from "@/lib/seo";
import { SiteProviders } from "@/components/providers/SiteProviders";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const notoKhmer = Noto_Sans_Khmer({
  subsets: ["khmer"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-khmer",
  display: "swap",
});

export const metadata: Metadata = buildRootMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jakarta.variable} ${notoKhmer.variable}`}
    >
      <body className="min-h-screen font-sans antialiased">
        <OrganizationJsonLd />
        <SiteProviders>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </SiteProviders>
        <Analytics />
      </body>
    </html>
  );
}
