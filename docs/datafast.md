# DataFast implementation reference

## Summary

DataFast (datafa.st, by Marc Lou) is a lightweight web analytics product focused on "which channels bring customers". A single `<script>` records pageviews, referrers, UTM and `ref` parameters, devices and countries. It also records custom goals (clicks, scroll milestones, server events). Optional add-ons cover revenue attribution (Stripe, LemonSqueezy, Polar, Paddle and others), funnels, visitor journeys, a real-time globe, a REST API, a CLI and an MCP server.

- Researched: 2026-09-30, against the live docs, the markdown copies (`<docs url>.md`) and the live `https://datafa.st/js/script.js` (last-modified 30 Sep 2026).
- Main sources:
  - https://datafa.st/docs (index), https://datafa.st/llms.txt
  - https://datafa.st/docs/nextjs-app-router
  - https://datafa.st/docs/script-configuration
  - https://datafa.st/docs/nextjs-proxy, https://datafa.st/docs/managed-proxy
  - https://datafa.st/docs/custom-goals, https://datafa.st/docs/scroll-tracking
  - https://datafa.st/docs/excluding-analytics, https://datafa.st/docs/gdpr-cookieless-tracking
  - https://datafa.st/docs/api, https://datafa.st/docs/api/authentication
  - https://datafa.st/changelog

Code blocks below are copied from the docs. The only edit is that the docs' `// 👈 ✅` pointer comments are removed. All IDs are placeholders.

### Current state of this repo (as of commit a2f129f)

- DataFast is already installed. `src/app/layout.tsx` has a raw `<script defer ...>` in `<head>` with the website ID and `data-domain` hard-coded. The ID is visible in every page's HTML anyway, so it is not a secret. The repo is public, though, so the plan below moves it to an env var.
- That tag also sets `data-allow-localhost="true"`, so every `pnpm dev` session is recorded in production stats. Remove it.
- `@vercel/analytics` (`<Analytics />`) also runs in the same layout.
- There are no custom goals, no proxy, no CSP headers and no `vercel.json`. There is also no `src/app/api/` folder, so the proxy path `/api/events` is free.

## Recommended simple setup

Four steps. Each can ship on its own.

### 1. Env var

- Name: `NEXT_PUBLIC_DATAFAST_WEBSITE_ID`. This matches the name used in the docs' npm example.
- In Vercel, set it for **Production only**. Leave it out of `.env.local`.
- Render the script only when the variable is set. Local dev and Vercel preview deployments then load no tracker at all. That is simpler than excluding hostnames later. This gating is a suggestion, not something the docs describe.

### 2. `src/app/layout.tsx`

Replace the current raw `<script>` with the docs' `next/script` form. It adds the recommended queue stub so a goal fired before the script loads is not lost. The code is from https://datafa.st/docs/nextjs-app-router and https://datafa.st/docs/gdpr-cookieless-tracking (which shows the queue as a `beforeInteractive` Script):

```tsx
import Script from "next/script";

const DATAFAST_ID = process.env.NEXT_PUBLIC_DATAFAST_WEBSITE_ID;

// inside <html> ... <head>
{DATAFAST_ID && (
  <>
    <Script id="datafast-queue" strategy="beforeInteractive">
      {`window.datafast = window.datafast || function () {
        window.datafast.q = window.datafast.q || [];
        window.datafast.q.push(arguments);
      };`}
    </Script>
    <Script
      data-website-id={DATAFAST_ID}
      data-domain="your_domain.com"
      data-disable-console="true"
      src="/js/script.js"
      strategy="afterInteractive"
    />
  </>
)}
```

Notes:
- `data-domain` is the **root** domain (no `www`). `SITE_URL` in `src/lib/seo.ts` is the `www` host, so do not reuse it here as is.
- `src="/js/script.js"` assumes step 3. Without the proxy, use `src="https://datafa.st/js/script.js"`.
- `data-disable-console` is optional. It only hides DataFast's console logs.
- Optionally add `data-disable-payments="true"`. The site takes no payments, and this stops the script from reading `session_id` / `order_id` / `checkout_id` URL params. It is harmless either way.

### 3. Proxy through your own domain (recommended)

A portfolio audience (developers, founders) often runs ad blockers, and a first-party path gets past most of them. Add this to `next.config.mjs`. The docs show `module.exports`; here it is in this repo's ESM shape, same content (https://datafa.st/docs/nextjs-proxy):

```js
async rewrites() {
  return [
    {
      source: "/js/script.js",
      destination: "https://datafa.st/js/script.js",
    },
    {
      source: "/api/events",
      destination: "https://datafa.st/api/events",
    },
  ];
},
```

No `data-api-url` is needed. The docs say: "DataFast auto-detects proxied setup. No `data-api-url` needed if you proxy both `/js/script.js` and `/api/events`."

Verify after deploy: in the Network tab, `script.js` and `events` should go to your own domain. The dashboard should show varied visitor locations. If every visitor shows one location, IPs are not being forwarded; the docs' fix is the managed proxy.

The alternative is the managed proxy (no code, one DNS CNAME, `a.yourdomain.com` pointing to `proxy.datafast.io`). The docs recommend it "for most sites". On Vercel the rewrite above is less work, because it needs no DNS change. See the Capability reference.

### 4. Exclude your own visits and localhost

- Localhost: excluded by default once `data-allow-localhost="true"` is removed. With step 1's gating, the script is not even loaded locally.
- Your own browsers on the live site: run this once in the console on the live host (only `www`, because the bare domain redirects). Repeat per browser and device.

  ```javascript
  localStorage.datafast_ignore=true
  ```
  To undo: `delete localStorage.datafast_ignore`
- Phone, or anywhere a console is awkward: add your home IP under **Website settings > Exclusions**.
- Preview deployments: handled by step 1. As a belt-and-braces option, add the `*.vercel.app` hostnames under Exclusions (exact hostnames only; the docs do not mention wildcard support).

## Goals plan

Every goal below uses the HTML attribute method unless noted. The script listens for clicks at the document level (`document.addEventListener("click", ... closest("[data-fast-goal]"))`), so React-rendered buttons and links work without extra code. Parameter attributes (`data-fast-goal-foo-bar`) arrive as `foo_bar`.

| Goal name | Trigger | File / component | Method |
|---|---|---|---|
| `preview_open` | Click on a bento tile that opens a preview (desktop card or mobile sheet) | `src/components/site/preview-trigger.tsx`, the `<button>` in `PreviewTrigger` | `data-fast-goal="preview_open"` + `data-fast-goal-slug={slug}` |
| `project_visit` | "Visit ↗" link in a project header | `src/components/site/project-section.tsx`, `ProjectHeader` `<a href={project.visit}>` | `data-fast-goal="project_visit"` + `data-fast-goal-project={project.id}` |
| `preview_link` | Outbound link inside an open preview (Website, App Store, Amazon, GitHub rows) | `src/components/site/preview-window.tsx`, `Fact` `<a target="_blank">` | `data-fast-goal="preview_link"` + `data-fast-goal-label={label}` + `data-fast-goal-value={value}` |
| `shipped_click` | Click on an "Also shipped" card (desktop grid and mobile list) | `src/components/site/also-shipped.tsx`, both `<a href={item.href}>` | `data-fast-goal="shipped_click"` + `data-fast-goal-item={item.id}` |
| `email_click` | `mailto:` link | `src/components/site/footer.tsx` (Say hello) and `src/components/site/nav.tsx` | `data-fast-goal="email_click"` + `data-fast-goal-location="footer"` or `"nav"` |
| `email_copy` | Copy-email button succeeds | `src/components/site/footer.tsx`, `CopyEmail.copy()` after `setCopied(true)` | JS: `window?.datafast("email_copy")` |
| `social_click` | X / GitHub / LinkedIn links | `footer.tsx` `SOCIAL` map, and the X link in `nav.tsx` | `data-fast-goal="social_click"` + `data-fast-goal-network={s.label.toLowerCase()}` + `data-fast-goal-location` |
| `scroll_to_contact` (optional) | Footer is 50% visible | `src/components/site/footer.tsx`, the `<footer>` element | `data-fast-scroll="scroll_to_contact"` |
| `scroll_to_also_shipped` (optional) | Also shipped section is 50% visible | `src/components/site/also-shipped.tsx`, the `<section>` | `data-fast-scroll="scroll_to_also_shipped"` |

Not needed as goals:
- Lens pages (`/[lens]`) and the blog are real paths, so client-side navigation to them is already a pageview.
- Hero tiles link to `#section` anchors. The default script ignores hash changes, so these produce no event. Add `data-fast-goal="hero_tile"` only if you care.

Suggested #1 KPI (dashboard setting): `email_click`, the closest thing to a conversion on a portfolio.

Résumé: there is no résumé or CV link in `src/components/site/` or `src/data/site.ts` today. If one is added, use `data-fast-goal="resume_click"`.

Optional TypeScript helper for the JS-method goals (my suggestion, not from the docs). It could live at `src/lib/datafast.ts`:

```ts
declare global {
  interface Window {
    datafast?: (goal: string, params?: Record<string, string>) => void;
  }
}
export const track = (goal: string, params?: Record<string, string>) => window.datafast?.(goal, params);
```

## Capability reference

### Script tag and `data-*` attributes
Source: https://datafa.st/docs/script-configuration

Base tag (https://datafa.st/docs/getting-started):
```html
<script
  defer
  data-website-id="dfid_******"
  data-domain="your_domain.com"
  src="https://datafa.st/js/script.js"
></script>
```

| Attribute | Required | Values / default | Purpose |
|---|---|---|---|
| `data-website-id` | yes | `dfid_...` | Website ID |
| `data-domain` | yes | root domain | "Used for cookie management across subdomains." Subdomains are tracked automatically. |
| `data-allowed-hostnames` | no | comma list, default empty | Cross-domain tracking (other root domains) |
| `data-api-url` | no | full URL or relative path | Custom events endpoint. A relative path resolves against the **page** host. Invalid URLs fall back to the default. |
| `data-allow-localhost` | no | `"true"`/`"false"`, default `false` | Track on localhost |
| `data-allow-file-protocol` | no | default `false` | Track `file://` pages |
| `data-debug` | no | default `false` | "Enable debug mode to allow tracking inside iframes." (It does not turn on verbose logging.) |
| `data-disable-console` | no | default `false` | Silence DataFast console logs |
| `data-disable-payments` | no | default `false` | Turn off automatic payment detection from URL params. Manual `window.datafast("payment", { email })` still works. |

Script variants:
- `https://datafa.st/js/script.js`: default, uses cookies.
- `https://datafa.st/js/script.hash.js`: also tracks `#hash` route changes (https://datafa.st/docs/hashed-page-paths-tracking).
- `https://datafa.st/js/script.cookieless.js`: no visitor cookies. Must match the "Cookieless" toggle in Website settings > General (https://datafa.st/docs/gdpr-cookieless-tracking).

Next.js App Router, official snippet (https://datafa.st/docs/nextjs-app-router):
```jsx
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          data-website-id="dfid_******"
          data-domain="your_domain.com"
          src="https://datafa.st/js/script.js"
          strategy="afterInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```
The docs say "DataFast is disabled on localhost to avoid tracking your own traffic."

### npm SDK (alternative to the script)
Source: https://datafa.st/docs/npm

`npm install datafast`, then `initDataFast({ websiteId, domain, autoCapturePageviews: true, allowLocalhost, allowedHostnames, ... })`. Methods: `track(name, data)`, `trackPageview(path?)`, `identify(id, props)`, `flush()`, `reset()`, `getTrackingParams()`, `buildCrossDomainUrl(url)`. `autoCapturePageviews` hooks the History API. It "detects bots and headless browsers automatically". Not needed here; the script tag is simpler. Use one or the other, not both (see Gotchas).

### Proxy
- Next.js rewrites: https://datafa.st/docs/nextjs-proxy (snippet in step 3). Proxied script tag from the docs:
  ```html
  <Script
    strategy="afterInteractive"
    data-website-id="dfid_******"
    data-domain="your_domain.com"
    src="/js/script.js"
  ></Script>
  ```
  If `/api/events` is already taken, set e.g. `data-api-url="/datafast-events"` and rewrite that path instead.
- Managed proxy: https://datafa.st/docs/managed-proxy (added 4 Jun 2026 per changelog). Enable it in Website settings > General > Managed Proxy with a neutral subdomain (e.g. `a.yourdomain.com`, not `analytics.`), then add a CNAME `a` pointing to `proxy.datafast.io`. The tag must use full URLs:
  ```html
  <script
    defer
    data-website-id="dfid_******"
    data-domain="yourdomain.com"
    data-api-url="https://a.yourdomain.com/api/events"
    src="https://a.yourdomain.com/js/script.js"
  ></script>
  ```

### Custom goals (JS API)
Source: https://datafa.st/docs/custom-goals

```javascript
window?.datafast("signup");
```
```javascript
window?.datafast("initiate_checkout", {
  name: "Elon Musk",
  email: "elon@x.com",
  product_id: "prod_123",
});
```
Queue stub, recommended so early calls are not dropped:
```html
<script id="datafast-queue">
  window.datafast = window.datafast || function() {
    window.datafast.q = window.datafast.q || [];
    window.datafast.q.push(arguments);
  };
</script>
```
Rules:
- Goal name: lowercase letters, numbers, `_`, `-`, `:`; max 64 chars.
- Params: max 10 per event. Names are lowercase/numbers/`_`/`-`, max 64 chars. Values are any string, max 255 chars.
- Reserved names: `payment`, `free_trial`, `trial_started`, `trial_converted`, `subscription_started`, `subscription_upgraded`, `subscription_downgraded`, `subscription_renewed`, `subscription_cancel_scheduled`, `subscription_reactivated`, `subscription_ended`. `identify` is reserved in the API.
- Billing: "Custom goals count towards your DataFast monthly usage."

### Custom goals (HTML attributes)
Source: https://datafa.st/docs/custom-goals, https://datafa.st/docs/script-configuration

```html
<button data-fast-goal="initiate_checkout">Buy Now</button>
```
```html
<button
  data-fast-goal="initiate_checkout"
  data-fast-goal-price="49"
  data-fast-goal-currency="USD"
  data-fast-goal-plan-type="pro">
    Subscribe to Pro Plan
</button>
```
`data-fast-goal-plan-type` becomes the `plan_type` param. Same limits as the JS API. Values are "automatically sanitized".

### Scroll goals
Source: https://datafa.st/docs/scroll-tracking

```html
<section data-fast-scroll="scroll_to_pricing">
```
- `data-fast-scroll-threshold`: 0 to 1, default `0.5`.
- `data-fast-scroll-delay`: ms, default `0`.
- `data-fast-scroll-*`: params.
- Fires once per element per page visit. Uses IntersectionObserver. The live script also uses a MutationObserver, so elements added later are picked up.

### Funnels
Source: https://datafa.st/docs/conversion-funnels

Built in the dashboard ("+ Funnel"). Steps are page visits (URL equals, wildcard supported per changelog) or completed goals. They show conversion, revenue per step, and top sources and countries. For example: `/` visit, then `preview_open`, then `email_click`. Also available via the CLI, API and MCP.

### UTM and ref parameters
Source: https://datafa.st/docs/utm-tracking

Picked up automatically: `ref`, `source`, `via`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`. For example, share the site on X as `https://your_domain.com?ref=x`. They show in the Campaign and UTM tabs.

### Outbound link clicks
**Unverified (not in the docs).** The live `script.js` (fetched 2026-09-30) sends an event of type `external_link` with `{ url, text }` on every click or Enter key on an `<a>` whose host is http(s) and not the same root domain (and not a cross-domain allowed host). So outbound clicks are probably recorded with no setup. `mailto:` links are skipped (non-http protocol). How these appear in the dashboard, and whether they count toward usage, is not documented.

### 404 tracking
Not a built-in feature in the docs. If wanted, add a `not-found.tsx` with a small client component that calls `window?.datafast("not_found", { path: location.pathname })`. (Suggestion; there is no `not-found.tsx` in `src/app` today.)

### User identification
Source: https://datafa.st/docs/user-identification

`window?.datafast("identify", { user_id: "...", name, image, ... })`. Not relevant for a portfolio with no logins.

### Revenue attribution
Source: https://datafa.st/docs/revenue-attribution-guide, https://datafa.st/docs/stripe-checkout-api

You connect a provider in settings, then pass the `datafast_visitor_id` and `datafast_session_id` cookies as checkout metadata. The Stripe example uses `metadata: { datafast_visitor_id: cookieStore.get('datafast_visitor_id')?.value, datafast_session_id: cookieStore.get('datafast_session_id')?.value }`. Payment links are detected from URL params on the success page. There is also a generic Payments API (`POST /api/v1/payments`). **For this portfolio: not relevant.** There are no payments. The linked products (Launch Fast, GymCreatives) would need DataFast on their own domains to attribute their revenue.

### REST API
Sources: https://datafa.st/docs/api, https://datafa.st/docs/api/authentication

- Base URL: `https://datafa.st/api/v1/`. Header: `Authorization: Bearer YOUR_TOKEN`.
- `df_` website API key: one website. Used for analytics reads, visitors, goals, payments and identify. `dft_` account token: account-wide with scoped permissions (`analytics:read`, `goals:write`, ...). A `dft_` token needs `?websiteId=` on website routes.
- Keys are "secret. Do not expose them in frontend code or public repositories."
- Examples:
  - `GET /api/v1/analytics/overview` (`fields`, `startAt`, `endAt`, `timezone`, `filter_*` such as `filter_goal`, `filter_page`)
  - `GET /api/v1/analytics/realtime` (visitors active in the last 10 minutes)
  - `POST /api/v1/goals` with body `{"datafast_visitor_id":"...","name":"newsletter_signup","metadata":{"plan":"pro"}}` (server-side goal; the visitor must already have a pageview)
  - `DELETE /api/v1/goals` (clean up test goals by `name` and `startAt`/`endAt`; the `start`/`end` aliases are **deprecated**)
  - Also: timeseries, pages, referrers, campaigns, countries, goals breakdowns, visitors, funnels, and the Account API (websites, keys, alerts, funnels, team).
- Errors use `{ "status": "error", "error": { code, message } }`. Rate limit headers are `X-RateLimit-*` (example limit 60).
- CLI: `npm install -g @datafast/cli`, `datafast login`, `datafast analytics overview --website <websiteId>` (https://datafa.st/docs/cli-introduction).
- MCP: `https://datafa.st/api/mcp`, OAuth or bearer token (https://datafa.st/docs/mcp-introduction). This is useful for asking Claude Code about stats without opening the dashboard.

### Privacy, cookies, consent
Sources: https://datafa.st/docs/gdpr-cookieless-tracking, https://datafa.st/docs/excluding-analytics

- Default script: "uses cookies for visitor identification". The docs say "you may need a cookie banner for the script, depending on law and setup."
- Cookieless script: no visitor cookies. It uses a server-side hash of IP, user agent, domain and a salt that rotates about every 24 hours, plus session-only browser storage. The docs say it is "designed so you usually do not need a cookie banner for DataFast". The trade-off: no returning-visitor tracking across days, and the new vs returning, visit count and User/Journey views are unavailable or less reliable.
- Cookies set by the default script, read from the live source (**Unverified in the docs**):
  - `datafast_visitor_id`: 365 days
  - `datafast_session_id`: 30 minutes, refreshed on each event
  - `datafast_visitor_session_count`: 365 days
  - It also uses sessionStorage `datafast_pageview_state` and reads localStorage `datafast_ignore`.
- Exclusions (Website settings > Exclusions): URL paths (exact or `/path/*`), IPs, countries, exact hostnames. Excluded visits do not count toward usage.
- Own-browser exclusion: `localStorage.datafast_ignore=true`.
- Bot filtering, browser side: the script and SDK skip automation (`navigator.webdriver`, Phantom, Selenium, Puppeteer and Playwright markers, per the live source). There is no documented bot-filter setting. Country exclusion is suggested for bot-heavy regions.
- Bot traffic, server side (separate feature): the `@datafast/ai-crawl` package tracks AI, search and training crawlers from middleware (https://datafa.st/docs/bot-traffic-tracking). The docs show `proxy.ts` (Next 16 naming); on this repo's Next 14.2.4 it would be `middleware.ts` with `export function middleware`. Per the changelog, from 15 Sep 2026 every account includes 100K accepted bot requests per billing cycle.
- DataFast is the processor; see its DPA at https://datafa.st/dpa. Not legal advice.

### SPA and App Router navigation
Not stated in the script docs. The npm docs say the SDK "hooks into the History API".

**Verified in the live script source:** the script wraps `history.pushState` and listens to `popstate`. It sends a pageview (debounced 100 ms) only when `location.pathname` changes. So App Router `<Link>` navigation (for example the lens filter pills) is tracked automatically with no `usePathname` code. Query-string-only or hash-only changes are not tracked by `script.js`.

### Other features
- Real-time globe and map with filters, 2D/3D styles, 8-hour replay, and a "Now" period (last 30 min). Sources: https://datafa.st/docs/datafast-filters, changelog.
- Journeys: per-visitor timeline of pageviews and goals (https://datafa.st/changelog/goal-tracking).
- Filters and saved segments; "Visit count" filter; new vs returning (https://datafa.st/docs/datafast-filters).
- #1 KPI: pick a goal as the headline metric (https://datafa.st/docs/set-number-one-kpi).
- Google Search Console integration with keywords per page (https://datafa.st/docs/google-search-console).
- GitHub integration: commits drawn on the chart (https://datafa.st/docs/github-integration). This fits a portfolio repo nicely.
- X link attribution and X/Reddit mentions (**Growth plan**) (https://datafa.st/docs/twitter-link-attribution, https://datafa.st/docs/twitter-mentions).
- Cross-domain (`data-allowed-hostnames`, `_df_vid`/`_df_sid` params) and automatic subdomain tracking (https://datafa.st/docs/cross-domain-tracking, https://datafa.st/docs/subdomain-tracking).
- Alerts, previous-period comparison, Meta ads attribution, mobile app, and import from Plausible (docs nav, changelog).
- Usage controls: "Pause tracking at limit" in Billing (https://datafa.st/docs/reduce-usage).

## Gotchas

- **Ad blockers.** Without the proxy, `datafa.st` is on common blocklists, and goals called through the queue stub simply never send. Proxy via rewrites, or a managed proxy on a neutral subdomain.
- **CSP.** The site has no CSP today. If one is added: with the rewrite proxy everything is `'self'`. Without the proxy, allow `https://datafa.st` in `script-src` and `connect-src` (https://datafa.st/docs/fix-csp-content-security-policy-blocking-script). The inline queue stub also needs `'unsafe-inline'` or a nonce.
- **Preview deployments.** Behavior on `*.vercel.app` hosts that do not match `data-domain` is **Unverified**. Gating the script on a Production-only env var avoids the question.
- **Localhost.** The current layout has `data-allow-localhost="true"`, so dev sessions pollute prod data. Remove it.
- **Double counting:**
  - Do not load both the script tag and the `datafast` npm SDK.
  - Do not put `data-fast-goal` on an element and also call `window.datafast` for the same click.
  - Outbound links already produce `external_link` events (Unverified, from the source), so `project_visit` / `social_click` add a second, named event for the same click. That is fine for clarity, but both likely count toward usage.
  - The script dedupes repeat pageviews through `sessionStorage` state.
  - `@vercel/analytics` is a separate product and does not double count inside DataFast.
- **Route changes.** Handled automatically for path changes (see above). Hash anchors (hero tiles to `#launch-fast`) are not pageviews unless you switch to `script.hash.js`, which would turn every anchor jump into a "page". Not recommended.
- **Preview window.** Opening a preview does not change the URL, so it is invisible to analytics unless you add the `preview_open` goal.
- **Goal names.** Uppercase or spaces fail validation on the client. Keep names static and put the varying part (slug, network) in params.
- **Proxy IPs.** If every visitor shows one city, the rewrite is not forwarding the client IP. Switch to the managed proxy.
- **Docs quirks.** The getting-started page links `/docs/install-datafast`, which returns "Documentation page not found"; the working index is `/docs/installation-tutorials`. The bot-traffic docs use Next 16's `proxy.ts` name.

## Open questions for the user

1. Proxy or not? The Next.js rewrite is the simplest option (no DNS). The managed proxy needs a CNAME on your domain.
2. Default (cookie) script or cookieless? The cookieless script usually needs no banner but loses returning-visitor and journey data. You are in Canada and have EU visitors.
3. Keep `@vercel/analytics` alongside DataFast, or remove it?
4. Which goals from the table do you want? Is `email_click` the right #1 KPI?
5. Add a résumé/CV link (and a `resume_click` goal)? None exists today.
6. Want scroll goals (`scroll_to_contact`, `scroll_to_also_shipped`) and a `not_found` goal?
7. Should the linked products (Launch Fast, GymCreatives) share this DataFast site via `data-allowed-hostnames`, or stay separate? Separate is simpler.
8. Connect the GitHub integration and Google Search Console?
