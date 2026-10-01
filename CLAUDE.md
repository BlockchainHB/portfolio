# CLAUDE.md

Guidance for Claude Code in this repo: hasaamb.com, Hasaam Bhatti's portfolio. The redesign is live (Oct 2026). Read this first; `docs/redesign/HANDOFF.md` has the design-era decisions and `docs/datafast.md` the analytics reference.

## Commands

- `env -u NODE_ENV pnpm dev` (port 3100 via `.claude/launch.json`). The shell sets `NODE_ENV=production`, which breaks Tailwind in `next dev`.
- `pnpm build`, `pnpm exec tsc --noEmit -p .` for a type check. `pnpm lint` is not configured (it opens the ESLint setup prompt).
- pnpm only. Next.js 14.2.4 App Router, React 18, Tailwind 3.4 (`hoverOnlyWhenSupported` on), deployed on Vercel.

## Where things live

- `src/data/site.ts`: every word and image on the site. Lenses, projects, tiles (`place` = bento grid position), `MOBILE_ORDER`, Also shipped, lens cards, contact.
- `src/data/previews.ts`: the preview window content per tile slug (title, body, facts, views). Image `kind` is `screen` (flat screenshot; the window adds corners and shadow) or `phone` (carries its own device frame; the window adds a drop shadow).
- `src/components/site/`: the whole site UI. `project-section.tsx` (bento + mobile rail), `preview-window.tsx` (the modal / bottom sheet), `theme-image.tsx` (light/dark image pairs, preloads, fade-in), `hero.tsx`, `nav.tsx`, `footer.tsx`, `lens-page.tsx`.
- Routes: `src/app/(site)/page.tsx` (home), `(site)/[lens]` (interface, systems, agents, brand, product), `blog/`, `llms.txt/route.ts`, `sitemap.ts`, `robots.ts`.
- `src/lib/seo.ts`: titles, descriptions, JSON-LD (Person, WebSite, ItemList of work). `src/lib/datafast.ts`: analytics config.
- Legacy from the old template: `src/data/resume.tsx`, `src/components/{magicui,ui}` and the loose components in `src/components/`. Only the blog list still uses `BlurFade`. Don't build new things on them.

## Copy rules

First person. No em dashes, no "!", no "·" as a separator, no revenue or metric bragging. Never name Launch Fast's third-party data providers anywhere (copy, visuals, alt text). Never show the real home address or other personal details in screenshots; use placeholders (e.g. "Toronto, ON"). The Systems lens reads like technical docs, not marketing.

## Images

- Tiles and previews are Paper exports: `public/work/{home,mobile,lens}/<slug>-{light,dark}.webp` and `public/work/preview/<slug>/<n>[-dark].webp`, exported at 3x and converted to WebP q92. Next serves exact widths at quality 90.
- Phone images must be truly transparent around the phones. A Paper export once carried a faint white background (~8% alpha) that showed as a lighter square box in dark mode. Check new exports: `magick f.webp -alpha extract -fx "u>0.03 && u<0.13" -format "%[fx:mean*100]" info:` should be near 0.
- `/work`, `/icons`, `/favicons` are served with a one-day cache. Replacing a file under the same name won't reach returning visitors for a day; rename it to force a refresh.
- Icons are WebP. Above-the-fold images use `ThemeImage preload="<media query>"` (media-scoped `<link rel=preload>`), not `next/image priority`.

## Preview window (`preview-window.tsx` + the "Preview window" block in `globals.css`)

A native `<dialog>`: a centered card on desktop, a bottom sheet below 1024px. Hard-won details, checked in the iOS Simulator's Safari:
- The card itself gets `autofocus` before `showModal()`, and `.preview` uses `overflow: clip`. Otherwise Safari focuses the close button and scrolls the sheet's content while it's still off-screen, so it rises with the copy at the top.
- Mobile opens with `data-entering` held for two frames so the sheet is painted below the screen before it moves; then a 500ms translate on `--ease-drawer`. No backdrop blur and no copy `preview-rise` on mobile, so the sheet moves as one piece.
- The mobile stage height comes from the viewport (`--stage-h`), never from the image, so nothing shifts when pictures load. Downloading pictures fade in (`fade-img`).
- Product loops (Zen Sweat, Flag Runner) are their own footage, not the still: the video stays hidden until `playing`, starts 500ms after open, and cross-fades in.

## Motion and performance

- Follow the better-ui / emil-design-eng values already in `globals.css` (`--ease-out`, `--ease-drawer`, scale 0.96 on press, icon swaps at scale 0.25 / blur 4px).
- Entrance keyframes start at `opacity: 0.01`, not 0: Chrome ignores opacity-0 paints for LCP.
- No Framer Motion outside the blog.

## Analytics and SEO

- DataFast, production only (`VERCEL_ENV === "production"`): cookieless script proxied through `/js/script.cookieless.js` and `/api/events` (rewrites in `next.config.mjs`), AI-crawler tracking in `src/middleware.ts`. Goals use our own `data-goal`, `data-goal-*` and `data-scroll-goal` attributes, handled in `datafast-goals.tsx`; not DataFast's `data-fast-*`. Outbound links open in a new tab so the event isn't cancelled. Details: `docs/datafast.md`.
- AI crawlers don't run JS, so the preview copy is also server-rendered hidden (`PreviewText`) and listed in `llms.txt` and the JSON-LD work list.
- OG image: static `src/app/opengraph-image.jpg` (2400x1260), made in Paper ("OG | 3b Sticker field"). Lens pages generate their own.
- Google Search Console (domain property, DNS TXT on Vercel) and Bing Webmaster are set up; the sitemap is submitted.

## Design source

Paper file "Portfolio": https://app.paper.design/file/01M3MZDE6V4Z5WE7C6XCV0XTSN. The canvas is in six labelled bands, top to bottom: Site, Previews (one column per project, desktop + mobile sheet per row), Social & OG, Sources (light/dark pairs), Explorations, Reference images. Band labels are "§ …" artboards, group labels "— …". Put new artboards in the matching band with the same spacing (80 / 400 / 1200px). Never edit the user's own source files in Paper.

## Testing

- Mobile behaviour: check in the iOS Simulator's Safari (it's WebKit; Chrome hides most sheet and focus bugs). `xcrun simctl io booted recordVideo` plus ffmpeg frame grabs show animation frame by frame.
- The in-app browser pane stalls requestAnimationFrame and CSS transitions while hidden; sample with `setTimeout` or scrub `document.getAnimations()`.
- Check dark mode too: several bugs only showed there.

## Git

Work on `redesign`, PR into `main` with a merge commit. No attribution lines in commits or PRs. The repo is public: `docs/redesign/systems-research/` stays gitignored, and untracked junk (`.superset/`, `antigravity/`, `node_modules 2`, `node_modules.nosync/`) stays uncommitted. Commit or push only when asked.
