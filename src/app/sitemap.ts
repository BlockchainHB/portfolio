import type { MetadataRoute } from "next";
import { LENSES } from "@/data/site";
import { SITE_URL } from "@/lib/seo";

// Only canonical, indexable pages. No lastModified: a date stamped on every
// build is always "today", and search engines learn to ignore a lastmod that
// never tells the truth. The blog stays out while it is noindexed.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE_URL }, ...LENSES.map((l) => ({ url: `${SITE_URL}/${l.slug}` }))];
}
