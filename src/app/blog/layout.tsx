import type { Metadata } from "next";

// Kept out of search until there are real posts: a lone placeholder post
// reads as thin content and counts against the whole site.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-[720px] px-4 py-6 sm:px-6 sm:py-10">{children}</div>;
}
