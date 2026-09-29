import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Every crawler is welcome, AI search and training bots included (OAI-SearchBot,
// GPTBot, Claude-SearchBot, ClaudeBot, PerplexityBot, Google-Extended): the
// point of the site is to be found and described correctly.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
