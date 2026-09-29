# Portfolio redesign handoff

Last updated: 2026-09-28. The whole redesign lives in Paper. Nothing in `src/` has changed yet.

- **Paper file:** [Porfolio](https://app.paper.design/file/01M3MZDE6V4Z5WE7C6XCV0XTSN) (one page, 11 artboards)
- **Copy guide:** [Portfolio copy guide](https://claude.ai/code/artifact/67443965-476b-413b-84ab-8375b8d1667a) (Claude Doc: voice, banned words, length budgets, formulas, checklist)
- **Design tokens:** [`tokens.json`](./tokens.json), exported from the Paper file

## Where things stand

| Area | Status |
| --- | --- |
| Design system (v0.2) | Done. Lucide icons, hover +, Mobile and Components sections added |
| Home, desktop light and dark | Done. Copy rewritten and verified |
| Home, mobile | Done. Copy rewritten and verified |
| Expanded card, desktop and mobile | Done. Its background page still shows old tag labels ("Interface \| Systems") on tiles; remove them |
| Filter lens pages (Interface, Systems, Agents, Brand, Product) | Done. Copy rewritten and verified |
| Screenshots | PR Monitor, Daily Hadith and Beamlet use fresh light and dark captures; the product photos are real. Launch Fast and GymCreatives are placeholders |
| Native apps tiles | Real screenshots on all three, light and dark. Daily Hadith is two phone frames (home and translation) on sage. Beamlet's panel sits on peach and PR Monitor's on blue, both running off the tile edge. In dark mode the tints are deep green, warm brown and navy. App icons are in the filter-page labels |
| PR Monitor tiles | The panel sits on a soft blue tile (`linear-gradient(160deg, #E9F0F9, #D2DFF0)`; dark `#1A2536 → #0E141D`), bleeding off the edge the way Beamlet's does. The Native apps row reads sage, peach, blue. The app icon is in the filter-page labels |
| Code | Not started |

## Next steps

1. **Swap in screenshots** (Hasaam is bringing these). Placeholders still in Paper:
   - Launch Fast: dashboard (web app), iOS app, MCP UI, Chrome extension, email
   - GymCreatives: chat workspace, auto post image
   - Nice to have: dark-mode screenshots and transparent product cutouts for the dark artboard, and the real Zen Sweat and Flag Runner logo files
2. Remove the leftover tag labels behind the expanded cards.
3. Set each project's media tile color from its real screenshots.
4. Build it in code (Next.js app in this repo), with the Paper file and `tokens.json` as the source.

## Decisions

**Positioning.** The site's one job is to show work: products built end to end, software and physical. The one-liner is "I build software and sell things". Audience: builders on X, collaborators, recruiters. No CTAs, no metrics, no hackathon history.

**Layout.** Apple-style bento. The hero is a centered statement with icon stacks. Then one cluster per project: Launch Fast, Physical products (Zen Sweat and Flag Runner), GymCreatives, Native apps (Daily Hadith, Beamlet, PR Monitor). Then an Also shipped index, then the footer.

**Tags are hidden metadata.** Angle tags (Interface, Systems, Agents, Brand, Product) are never shown on cards. They only drive the filter.

**Arrows.** ↗ only means "leaves the site": Visit in desktop project headers, the product link in the expanded card, and Also shipped rows. Tiles never have arrows. On desktop, a 40px + appears on tile hover (bottom-right, 8px inset), for mouse users only.

**Filter = lens page.** Picking a filter swaps the homepage for a lens page: the nav with that filter selected, a 56 Light title, one line, a grid of 576px cards (560×320 visual, project label, 24 Light title, 16 line), matching Also shipped items, then the footer. An odd card count leads with one wide featured card.

**Expanded card.** Clicking a tile opens a large card over the page, with tabs for the angles that apply. On mobile it becomes a bottom sheet.

**Mobile.** Never stack desktop rows. Each project gets an App Store-style header (56 icon, 24 Light title, meta line, description), then one swipe rail of 300×360 tiles. The next tile peeks, and the name sits under each tile. The filter pills fit one centered 358 track.

**Hero icon stacks.**
- Desktop: a zig-zag. "I build software" ends with a stack of Launch Fast, GymCreatives and Beamlet. "and sell things" starts with a stack of Flag Runner, Zen Sweat and HB Goodies. The icon nearest the text sits on top.
- Stack spec: 52px tiles on a 44px step, tilts of −4, 2 and 6 degrees, a 2px ring in the page color, and a soft shadow.
- Mobile: a fan of five 56px tiles above a 40/44 headline, tilted −20, −10, 0, 10 and 20 degrees, with Launch Fast in the center.

**Footer.** Say hello, the email, and social links (a 28px floating icon tile plus a label; brand glyphs, not Lucide). Then the copyright line and an Auto / Light / Dark theme toggle.

## Design system summary

- **Type:** SF Pro only. Light 300 at 18px and up, Regular 400 below, never bold. Scale: 56/62, 32/38, 24/30, 18/26, 16/24, 14/20, 13/18, 12/16. The mobile hero is 40/44.
- **Color:**
  - Light: page #F7F7F7, tile #FFFFFF, text #292929 / #5D5D5D / #767676. No accent color; the work brings the color.
  - Dark: page #111111, tile #1B1B1B, text #EDEDED / #A1A1A1 / #888888. Tiles use a 1px white 8% ring instead of shadows.
- **Grid:** four 280px cells with a 16px gap, in a 1168px container.
- **Corners:** tile radius 28. Media is inset 8 with radius 20 (concentric).
- **Shadow:** `#0000000F 0 0 0 1px, #0000000F 0 1px 2px -1px, #0000000A 0 2px 4px`.
- **Image outlines:** every image gets a 1px outline, black 10% in light mode and white 10% in dark.
- **Icons:** Lucide (`lucide-react` is already a dependency, but it's pinned at the old 0.395; upgrade it). Outline only, with a 1.5px stroke at every size (`absoluteStrokeWidth`).
- **Motion:**
  - Easing: ease-out `cubic-bezier(0.23, 1, 0.32, 1)`; sheets use `cubic-bezier(0.32, 0.72, 0, 1)`.
  - Durations: press is 150ms at scale 0.96, hover and color changes are 150ms, the lens swap is a 200ms crossfade with cards rising 8px.
  - Hover effects only apply on `(hover: hover) and (pointer: fine)`. Under reduced motion, only fade.
- **Separators:** use a pipe ( | ) for meta lines, never a middle dot. No em dashes in copy.

## Copy rules (full guide in the Claude Doc)

- **Voice:** casual, serious, matter-of-fact. First person singular. Be confident through specifics, never adjectives.
- **Length:** the homepage stays under about 400 words, and the first screen under 60. Each slot has a budget (see the guide's Length table). Lens card lines fit on one line (about 68 characters).
- **Numbers:** counts of things built are fine ("Eleven plugins"). Result metrics (users, revenue, growth) are not.
- **Never say "V2"** for Launch Fast. It is just Launch Fast.

## Verified facts

- **Launch Fast:** research, ads and sourcing for Amazon sellers, built as a seller. Founder and engineer, 2024 to now. Every surface (web app, iOS app in TestFlight, Chrome extension, MCP) shares one Next.js backend on Supabase and Prisma, with Upstash Redis, Stripe and the AI SDK.
- **Launchie:** the agent in the Launch Fast iOS app and Discord, running on Cloudflare Durable Objects. It answers questions about ads, products and suppliers from the seller's Launch Fast data, and can change and manage PPC campaigns.
- **GymCreatives:** built end to end with MediaLaunch. Each chat thread's agent runs on the Cloudflare Agents SDK and Durable Objects. Convex stores posts, credits, approvals and brands. A brand holds logo, colors, fonts and voice, discovered from the gym's site or Instagram. The app also uses Clerk, Gemini through the AI SDK, and Vercel Blob.
- **Physical products (HB Goodies, 2023 to now):**
  - Zen Sweat is a portable steam sauna with no assembly, and a foot massager comes in the box.
  - Flag Runner is a no-drill truck bed flag mount that clamps on and ships in its own case. Its product photo has a typo: "CASE IICLUDED".
- **Native apps:**
  - Daily Hadith (iPhone, SwiftUI) turns daily Urdu audio into English text.
  - Beamlet is a Mac menu bar app for Claude Remote Control.
  - PR Monitor is a Mac menu bar app that tracks CI checks and review agents per PR.
- **Also shipped:**
  - Claude Plugins: 11 Claude Code plugins
  - Leo: a terminal agent for SEO content
  - ComponentRat: lifts React components off any site
  - Launch Fast MCP
  - Launch Fast for Chrome
  - GitHub to Notion: turns merged PRs into a changelog
  - KijijiBot: keeps Kijiji listings fresh
  - Njoyn Navigator: faster navigation of Njoyn's legacy job portal

## Assets in this folder

| Path | What |
| --- | --- |
| `assets/products/zen-sweat.png`, `flag-runner.png` | Amazon main product images |
| `assets/hero-icons/*` | Zen Sweat and Flag Runner logo tiles cropped from the product photos. The logo is shifted left or right so overlapping icons in the hero stack don't cover it |
| `assets/screenshots/pr-monitor/*` | Portfolio-specific PR Monitor renders: light and dark panels (720×846 @2x, transparent, no shadow), a full-length light panel, and the 1024 app icon. Source: `~/Documents/PR-Monitor/docs/screenshots/portfolio/`. The fictional repos are lumen-labs/* |
| `assets/screenshots/daily-hadith/*` | Raw iPhone 17 Pro screens, 1206×2622, light and dark: home, listen and translation (Hadith 026). The app icon is square, so round it in the layout. Source: `~/Documents/Daily Hadith App/docs/screenshots/portfolio/` |
| `assets/screenshots/beamlet/*` | Beamlet panel in the Online state, light and dark (680×973 @2x, transparent, no shadow), plus the 1024 coral icon. Source: `~/dev/claude remote control/docs/images/portfolio/` |
| `assets/social/*.svg` | X and GitHub (simple-icons), LinkedIn (bootstrap-icons) |

`public/zensweat.png` is the HB Goodies bag icon. It has transparent padding, so it's cropped with `background-size: 124%`.

## Agent notes (Paper node map)

The IDs are stable, so find things fast with `find_nodes` or these:

- **Artboards:**
  - Design System `9Y-0`
  - Home — Desktop `PO-0`
  - Home — Desktop | Dark `1HS-0`
  - Home — Mobile `1SV-0`
  - Expanded card | Web app | Interface `X3-0`
  - Expanded card | Mobile | Web app `17H-0`
  - Filter | Interface `348-0`
  - Filter | Systems `3BU-0`
  - Filter | Agents `2HY-0`
  - Filter | Brand `3K1-0`
  - Filter | Product `3MM-0`
- **Desktop hero:**
  - Line 1 stack `3O0-0`: Beamlet `3O4-0`, GC `3O2-0`, LF wrapper `3PX-0` on top
  - Line 2 stack `3O6-0`: Flag `3Q8-0`, Zen `3Q6-0`, HB `3O9-0` on top
  - Dark hero stacks: `3P3-0` and `3P9-0`
- **Mobile fan** `3PV-0`. Rotation happens around the top-left corner, so each tile's position is corrected to keep the fan centered.
- **Mobile rails:**
  - Launch Fast `1UB-0`
  - Physical `1WD-0`
  - GymCreatives `1WW-0`
  - Native `206-0`
- **Paper quirks:**
  - Tiles clipped inside a rail screenshot as black. Temporarily set the rail to `flexWrap: wrap` to check them, then set it back.
  - An image rect ignores `backgroundColor`, so wrap transparent PNGs in a colored frame.
  - `write_html` can drop absolute positioning; re-apply it with `update_styles`.
