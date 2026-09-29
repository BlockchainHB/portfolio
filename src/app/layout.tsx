import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const SITE_URL = "https://hasaamb.com";
const DESCRIPTION =
  "I'm Hasaam, in Toronto. I take products from idea to shelf, from the backend to the box.";

// SF Pro comes from the system on Apple devices; Inter stands in everywhere else.
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: SITE_URL },
  title: {
    default: "Hasaam Bhatti",
    template: "%s | Hasaam Bhatti",
  },
  description: DESCRIPTION,
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/android-icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/favicons/apple-icon-180x180.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/favicons/manifest.json",
  openGraph: {
    title: "Hasaam Bhatti",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Hasaam Bhatti",
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Hasaam Bhatti" }],
  },
  twitter: {
    title: "Hasaam Bhatti",
    card: "summary_large_image",
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f7" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
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
              url: SITE_URL,
              image: `${SITE_URL}/Headshot.png`,
              jobTitle: "Founder and engineer",
              worksFor: [{ "@type": "Organization", name: "Launch Fast", url: "https://launchfastlegacyx.com" }],
              sameAs: [
                "https://x.com/hasaamb",
                "https://github.com/BlockchainHB",
                "https://www.linkedin.com/in/hasaam-bhatti-62a1501b9/",
              ],
              description: DESCRIPTION,
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-page font-sans text-ink">
        {/* disableTransitionOnChange: a theme flip snaps instead of smearing every transition at once */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
