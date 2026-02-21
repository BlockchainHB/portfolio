import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import "./globals.css";
import { MotionProvider } from "@/components/motion-provider";
import { Analytics } from "@vercel/analytics/react";

const SITE_URL = "https://hasaamb.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  title: {
    default: "Hasaam Bhatti — AI Engineer & Founder",
    template: `%s | Hasaam Bhatti`,
  },
  description: "Founder @Launch Fast. I build production AI systems for e-commerce & SaaS — faster than teams can. Toronto-based, decade of FBA + SaaS experience.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/android-icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/favicons/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
      { url: "/favicons/apple-icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/favicons/apple-icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/favicons/apple-icon-120x120.png", sizes: "120x120", type: "image/png" },
      { url: "/favicons/apple-icon-114x114.png", sizes: "114x114", type: "image/png" },
      { url: "/favicons/apple-icon-76x76.png", sizes: "76x76", type: "image/png" },
      { url: "/favicons/apple-icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/favicons/apple-icon-60x60.png", sizes: "60x60", type: "image/png" },
      { url: "/favicons/apple-icon-57x57.png", sizes: "57x57", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/favicons/manifest.json",
  openGraph: {
    title: "Hasaam Bhatti — AI Engineer & Founder",
    description: "Founder @Launch Fast. I build production AI systems for e-commerce & SaaS — faster than teams can.",
    url: SITE_URL,
    siteName: "Hasaam Bhatti",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Hasaam Bhatti - AI Engineer & Founder",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Hasaam Bhatti — AI Engineer & Founder",
    card: "summary_large_image",
    description: "Founder @Launch Fast. I build production AI systems for e-commerce & SaaS — faster than teams can.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet" />
        <link rel="preload" href="/Headshot.png" as="image" />
        <script
          defer
          data-website-id="68e0d3e320ff399f48a39d93"
          data-domain="hasaamb.com"
          data-allow-localhost="true"
          src="https://datafa.st/js/script.js"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Hasaam Bhatti",
              url: "https://hasaamb.com",
              image: "https://hasaamb.com/Headshot.png",
              jobTitle: "AI Engineer & Founder",
              worksFor: [
                {
                  "@type": "Organization",
                  name: "Launch Fast",
                  url: "https://launchfastlegacyx.com",
                },
                {
                  "@type": "Organization",
                  name: "LegacyX",
                  url: "https://legacyxfba.com",
                },
              ],
              sameAs: [
                "https://x.com/automatingwork",
                "https://github.com/BlockchainHB",
                "https://www.linkedin.com/in/hasaam-bhatti-62a1501b9/",
              ],
              description:
                "Full-stack AI builder, automation architect & multi-brand founder. Building AI systems for e-commerce & SaaS.",
            }),
          }}
        />
      </head>
      <body
        className="min-h-screen bg-background font-sans antialiased max-w-[720px] mx-auto py-6 sm:py-10 px-4 sm:px-6"
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider delayDuration={0}>
            <MotionProvider>
              {children}
              <Analytics />
            </MotionProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
