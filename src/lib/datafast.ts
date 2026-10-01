/*
 * DataFast analytics (cookieless). The website ID is public: it ships in every
 * page's HTML. Tracking runs on the production deployment only, so local dev
 * and Vercel preview deploys never count.
 *
 * Goals are HTML attributes (data-goal, data-scroll-goal) handled by
 * DataFastGoals, which calls track(); a few goals call track() directly.
 */
export const DATAFAST = {
  websiteId: "dfid_Ovc3jnl8uPstjvgs0Sclr",
  domain: "hasaamb.com",
  enabled: process.env.VERCEL_ENV === "production",
};

declare global {
  interface Window {
    datafast?: (goal: string, params?: Record<string, string>) => void;
  }
}

export const track = (goal: string, params?: Record<string, string>) => window.datafast?.(goal, params);
