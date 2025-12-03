import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import "./globals.css";
import { MotionProvider } from "@/components/motion-provider";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
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
    url: DATA.url,
    siteName: "Hasaam Bhatti",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Hasaam Bhatti — AI Engineer & Founder',
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
  },
  verification: {
    google: "",
    yandex: "",
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
        <script
          defer
          data-website-id="68e0d3e320ff399f48a39d93"
          data-domain="Hasaamb.com"
          data-allow-localhost="true"
          src="https://datafa.st/js/script.js"
        />
      </head>
      <body
        className="min-h-screen bg-background font-sans antialiased max-w-[720px] mx-auto py-6 sm:py-10 px-5 sm:px-6"
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
