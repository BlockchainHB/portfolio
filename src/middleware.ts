import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import { trackAICrawlerRequest } from "@datafast/ai-crawl";
import { DATAFAST } from "@/lib/datafast";

/*
 * AI and search crawlers read raw HTML and skip the browser script, so they
 * are counted here, server side (DataFast's Bot traffic card). Not awaited:
 * the report finishes in the background via event.waitUntil.
 */
export function middleware(request: NextRequest, event: NextFetchEvent) {
  trackAICrawlerRequest(request, event, {
    websiteId: DATAFAST.websiteId,
    domain: DATAFAST.domain,
    enabled: DATAFAST.enabled,
  });
  return NextResponse.next();
}

export const config = {
  // Pages plus robots.txt, llms.txt, the sitemap and .md files. Skips API routes, build output,
  // and images, fonts, scripts and video in public/, so those never invoke the middleware.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpe?g|webp|avif|gif|svg|ico|woff2?|ttf|otf|css|js|map|mp4|webm)$).*)"],
};
