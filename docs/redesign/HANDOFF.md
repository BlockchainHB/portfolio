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
| Screenshots | Real everywhere. Chat workspace is rebuilt from a real capture as "GymCreatives UI · Light/Dark" (1440×1080) plus a narrower "· Card crop" version (806×909, 200px sidebar) that fills the home cards at 0.66 scale; the mobile rail uses the full-width version at 0.4 without the sidebar. Admin nav is hidden and the recents are sample gym prompts, not real QA chats. Auto posts is the mobile Auto Posts screen ("GymCreatives Auto Posts · Mobile · Light/Dark", 344×754, same size as the LF iOS sources) in the iOS card's phone frame, using two real generated posts ("Pull under the bar", "Secure the midline"); testimonial posts are left out because they name members. Brand memory is direction C from "Brand memory directions · GymCreatives": two tilted real posts ("Secure the midline" tagged Auto post, and "Handstand Push-up Tripod Base" tagged Chat, so it doesn't repeat the Auto posts phone) behind a CrossFit Livermore brand kit, pill "On brand, every post" (home light/dark, mobile rail caption; the Brand filter card uses a landscape version). Every brand kit (incl. the Systems and Agents filter cards) now shows CrossFit Livermore's saved profile: crossfitlivermore.com, #0D76BD / #181818 / white / #D8262E, bold, direct; type is shown as "Italic display" (Barlow Condensed Black Italic) to match the posts, not the profile's Open Sans. Agent interactions is direction A from "Agent interactions directions · GymCreatives": a chat window (user asks for the Saturday partner WOD post, agent says it has one quick question) with the question tool docked at the bottom in place of the composer, sitting ~8px above the card edge. Plain one-line lettered options (no subtext, no check), A in the gold picked state; pill stays "Agent interactions". Rolled out to home light/dark, the mobile rail (with an earlier exchange above) and the Agents and Interface filter cards. Model choice (pill "Thirteen models": 5 chat + 8 image models from `lib/ai/model-registry.ts`) follows "Model choice directions · GymCreatives": desktop cards (home light/dark and the Interface filter card) show A, the composer's settings menu open (Text model GPT-5.6 Terra; Image model Gemini 3.1 Flash, 3:4, 1K) with the image-model list beside it; the mobile rail shows B, the "Image model" bottom sheet over the dimmed home screen. The Systems filter cards keep their AI Gateway diagram. Exports in `assets/screenshots/gymcreatives/` |
| Launch Fast imagery | iOS Home, rebuilt full-screen in light and dark (Sales, TACOS and Units charts plus the floating tab dock; source artboards "Source · LF iOS Home · Light/Dark" in the Porfolio file, exported to `ios-home.png` and `ios-home-dark.png`), the Launchie chat screen, rebuilt in light and dark without the keyboard (source artboards "Source · LF iOS Launchie · Light/Dark", exported to `ios-launchie.png` and `ios-launchie-dark.png`; the Launchie tile is now a media tile with a pill and phone, like the iOS app tile). The MCP tiles show a mini Claude chat: user prompt, `research_products` tool call, then the widget as the reply card, the MCP Research Products widget (real widget bundle rendered with repo fixture data, light and dark), and the "Run Launch Fast from inside Claude" onboarding email render. The Brand card is now a mini brand system built from Launch Fast's v2-main design system (`components/market-intelligence/v2-design-system.ts`): the vector mark on zinc-900 #18181b, a proportional colour tile (#18181b, #0066cc with its segment ramp, zinc-100 #f4f4f5, white) and an Inter specimen (400/500/600, v2 never goes above 600). Dark uses v2's dark tokens (#171717 base, #1d1d1d elevated, #3395ff accent with the dark ramp, #f3f0ea ink). Live on home light/dark, mobile, the Brand filter page and the expanded-card backdrop; the Design System artboard copies are unchanged; the comparison board "Brand card directions · Launch Fast" is still on the canvas |
| Native apps tiles | Real screenshots on all three, light and dark. Daily Hadith is two phone frames (home and translation) on sage. Beamlet's panel sits on peach and PR Monitor's on blue, both running off the tile edge. In dark mode the tints are deep green, warm brown and navy. App icons are in the filter-page labels |
| PR Monitor tiles | The panel sits on a soft blue tile (`linear-gradient(160deg, #E9F0F9, #D2DFF0)`; dark `#1A2536 → #0E141D`), bleeding off the edge the way Beamlet's does. The Native apps row reads sage, peach, blue. The app icon is in the filter-page labels |
| Systems diagrams | Rebuilt with the diagram-design skill (hasaam-portfolio skin): nine cards, each a different form. The featured card is the Launchie approval swimlane; the rest are Launchie on Cloudflare (deployment), Inngest fan-out, tool layer stack, GymCreatives agent sequence, image-quality flowchart, model registry matrix, Daily Hadith Urdu comparison and PR Monitor fan-in. Source SVGs and generator: `systems-diagrams/`; facts: `systems-research/`. Live on "Filter \| Systems" and "Filter \| Systems \| Dark". The Agents page featured Launchie card uses the same system (a loop with a seller-memory hub). The older "Beams" style survives only on the "Diagram directions" board |
| Brand kit (GymCreatives brand memory) | One component used on home, mobile, Agents, Brand and Systems: the Ironside CrossFit logo tile, 4 swatches, Oswald "Aa" and voice chips. The dark variant is on the dark home and the dark Systems artboard |
| Dark artboards | Every page now has a dark twin in Paper, placed under its light artboard: Home — Mobile \| Dark, Filter \| Interface / Agents / Brand / Product \| Dark (Systems already had one). Expanded cards are still light only |
| Code | Built on branch `redesign`. Routes: `/` plus one lens route each (`/interface`, `/systems`, `/agents`, `/brand`, `/product`). All copy lives in `src/data/site.ts`; components in `src/components/site/`. Tile and card visuals are Paper exports (`public/work/{home,mobile,lens}/<slug>-{light,dark}.webp`, 3x); Systems diagrams are the SVGs from `systems-diagrams/`. Theme images swap with the `.dark` class, so there's no flash. Not built yet: expanded cards (preview windows) and the tile hover + |

## Next steps

1. **Swap in screenshots** (Hasaam is bringing these). Placeholders still in Paper:
   - Launch Fast Chrome extension: both states are rebuilt. The Deep Dive modal (sidebar, KPI strip, chart with the Sep 14 tooltip, product table without the Dimensions/Weight columns) sits over a dimmed Amazon page in "Source · LF Extension · Deep Dive · Light/Dark", exported to `chrome-extension-deep-dive-light.png` / `-dark.png` (4x); it isn't placed in a card yet. The inline panel on an Amazon "hand warmers" search page, rebuilt as vector layers at 1440×1060 in "Source · LF Extension · Amazon · Light/Dark" (the Amazon page stays light; only the panel changes theme, as in the real extension). Exported at 4x to `chrome-extension-amazon-light.png` / `-dark.png`; cards use per-card crops at ~5x (home 2x1 at 0.62 scale, Interface card at 0.68, mobile rail at 0.5). The delivery address is a placeholder ("Toronto, ON"), never the real one. Web dashboard done: the Product Research → Hand Warmer overview, rebuilt as vector layers at 1440×900 in "Source · LF Web · Product Research · Light/Dark", exported at 4x to `web-product-research-light.png` / `-dark.png`; the Admin sidebar group is left out.
   - GymCreatives (branch `hasaam/v2-qa-youtube-tool`, dark-only app): chat thread with a returned post, Auto Posts results, Account → Brand, an agent question with choices, and the model picker. Use a non-admin demo account. Existing QA shots are in `~/dev/GymCreatives_App/.context/v2-sprint-qa/` but show dev badges, admin links and real gym data
   - Nice to have: dark-mode screenshots and transparent product cutouts for the dark artboard, and the real Zen Sweat and Flag Runner logo files
2. Remove the leftover tag labels behind the expanded cards.
3. Set each project's media tile color from its real screenshots.
4. Build the expanded cards (preview windows) in code, then add the tile hover + and click.
5. Re-exporting a visual: hide the tile's Pill (and Hover +) with `display: none`, export the tile or card Visual at 3x PNG (it lands in ~/Downloads under the node name), convert it to WebP at quality 92 into `public/work/...` (Next serves exact 1x/2x/3x widths at quality 90 from it), then set the pill back to `display: flex`. Mobile rails need `flexWrap: wrap` while exporting, or clipped tiles come out black.
6. Local dev: the shell sets `NODE_ENV=production`, which breaks Tailwind in `next dev`. Run `env -u NODE_ENV pnpm dev`.

## Decisions

**Positioning.** The site's one job is to show work: products built end to end, software and physical. The one-liner is "I build software and sell things". Audience: builders on X, collaborators, recruiters. No CTAs, no metrics, no hackathon history.

**Layout.** Apple-style bento. The hero is a centered statement with icon stacks. Then one cluster per project: Launch Fast, Physical products (Zen Sweat and Flag Runner), GymCreatives, Native apps (Daily Hadith, Beamlet, PR Monitor). Then an Also shipped index, then the footer.

**Tags are hidden metadata.** Angle tags (Interface, Systems, Agents, Brand, Product) are never shown on cards. They only drive the filter.

**Arrows.** ↗ only means "leaves the site": Visit in desktop project headers, the product link in the expanded card, and Also shipped rows. Also shipped cards and rows show only the year and the arrow ("2026 ↗"), with no type tag. Tiles never have arrows. On desktop, a 40px + appears on tile hover (bottom-right, 8px inset), for mouse users only.

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
  - **Every visual follows the site theme.** Nothing is dark in light mode just because the product is (GymCreatives and Cloudflare cards included). In light mode, placeholders are white windows on #EEEEEE with a #292929 chat bubble. The one exception is a real screenshot of a dark-only app (GymCreatives); frame it on a light tile.
  - Diagrams, light: canvas #F3F5F9, circles #FFFFFF with shadow `#0000000F 0 0 0 1px, #0000001A 0 6px 16px`, beam base #0000001A, async dashes #00000033, icons #1D1D1F.
  - Diagrams, dark: canvas #141414 (Daily Hadith #131714 → #0F1A14), circles #262626 with `#FFFFFF1A 0 0 0 1px, #00000080 0 6px 16px`, hero tiles #1F1F1F with a stronger accent ring, beam base #FFFFFF1A, async dashes #FFFFFF40, mono icons white. Accents brighten: blue #5B8CFF → violet #A78BFA, Daily Hadith green #2FA376.
- **Grid:** four 280px cells with a 16px gap, in a 1168px container.
- **Corners:** tile radius 28. Media is inset 8 with radius 20 (concentric).
- **Shadow:** `#0000000F 0 0 0 1px, #0000000F 0 1px 2px -1px, #0000000A 0 2px 4px`.
- **Image outlines:** every image gets a 1px outline, black 10% in light mode and white 10% in dark.
- **Icons:** Lucide (`lucide-react` is already a dependency, but it's pinned at the old 0.395; upgrade it). Outline only, with a 1.5px stroke at every size (`absoluteStrokeWidth`).
- **Project icons (app and logo tiles).** These are every project and product mark in the hero stacks, section headers, index cards and filter-card labels. Diagram circles and icons inside rebuilt app UI follow their own rules.
  - **Frame:** a square tile with a radius of 23% of its size (48 → 11, 32 → 7, 24 → 5.5). Sizes are 56 for the mobile header and fan, 52 for the hero, 48 for the desktop header, 32 for index cards and 24 for labels.
  - **Light:** tile #FFFFFF with a `#00000014 0 0 0 1px` ring. **Dark:** tile #222222 with a `#FFFFFF1A 0 0 0 1px` ring. The hero stacks keep their own lift shadow.
  - **The mark is always centered, at a fixed share of the tile:**
    - Launch Fast 62%, GymCreatives 54%, Launch Fast MCP 56%, GitHub 60%, Leo 66%, Njoyn 72%.
    - Zen Sweat 62–74% and Flag Runner 68–76%. In the hero stacks, these two wordmarks are nudged into the part of the tile that isn't covered by the next tile.
    - Outline glyphs (ComponentRat, the Native apps and Also shipped headers) are 50–56% at 1.25px.
  - **One-color marks invert with the theme:** ink #1D1D1F on white in light, #EDEDED on #222 in dark. This covers Launch Fast, GymCreatives, MCP, GitHub, Zen Sweat and Flag Runner; Flag Runner's red "Runner" stays red. In code, use one SVG with `currentColor`.
  - **Colored marks** (Claude for Claude Plugins, Chrome for Launch Fast for Chrome, Leo, Njoyn) keep their color on the themed tile, at 60–66%.
  - **Full app icons** (Beamlet, HB Goodies bag, Kijiji, Daily Hadith, PR Monitor) fill the tile edge to edge and look the same in both themes.
  - **Source files** are in `assets/icons/` (`*-ink`, `*-white`, `*-color`, `*-app`). They're trimmed and square, so the percentage sizes line up.
- **Motion:**
  - Easing: ease-out `cubic-bezier(0.23, 1, 0.32, 1)`; sheets use `cubic-bezier(0.32, 0.72, 0, 1)`.
  - Durations: press is 150ms at scale 0.96, hover and color changes are 150ms, the lens swap is a 200ms crossfade with cards rising 8px.
  - Hover effects only apply on `(hover: hover) and (pointer: fine)`. Under reduced motion, only fade.
- **Separators:** use a pipe ( | ) for meta lines, never a middle dot. No em dashes in copy.

## Copy rules (full guide in the Claude Doc)

**Systems page voice.** Unlike every other view, Systems copy reads like technical documentation (Google developer documentation style): sentence-case titles that name the system ("Research pipeline on Inngest", not a benefit), present tense, active voice, concrete limits and numbers from the code, numerals for 10 and up and words below 10, and no marketing adjectives. Descriptions are two lines. The site rules still apply: no em dashes, no serial comma, and never name Launch Fast's data providers.

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
| `assets/products/*-dark.png` | Dark-mode product images (made by Hasaam). Both fill the dark Home cards edge to edge. `zen-sweat-dark-square.png` is the portrait shot widened to a square by blending its dark side edges, so nothing gets cropped |
| `assets/hero-icons/*` | Zen Sweat and Flag Runner logo tiles cropped from the product photos. The logo is shifted left or right so overlapping icons in the hero stack don't cover it |
| `assets/screenshots/pr-monitor/*` | Portfolio-specific PR Monitor renders: light and dark panels (720×846 @2x, transparent, no shadow), a full-length light panel, and the 1024 app icon. Source: `~/Documents/PR-Monitor/docs/screenshots/portfolio/`. The fictional repos are lumen-labs/* |
| `assets/screenshots/daily-hadith/*` | Raw iPhone 17 Pro screens, 1206×2622, light and dark: home, listen and translation (Hadith 026). The app icon is square, so round it in the layout. Source: `~/Documents/Daily Hadith App/docs/screenshots/portfolio/` |
| `assets/screenshots/beamlet/*` | Beamlet panel in the Online state, light and dark (680×973 @2x, transparent, no shadow), plus the 1024 coral icon. Source: `~/dev/claude remote control/docs/images/portfolio/` |
| `assets/social/*.svg` | X and GitHub (simple-icons), LinkedIn (bootstrap-icons) |
| `assets/icons/*.png` | Project marks, trimmed and square: `-ink` and `-white` for one-color marks, `-color` for colored marks on a themed tile, `-app` for full app icons. Launch Fast and GymCreatives come from their repos (`logo`, `centerlogo-light.png`); the rest are re-cut from the earlier tiles |

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
  - Filter | Systems | Dark `4P1-0` (mono icons use `filter: invert(1)` in Paper; in code, use `currentColor`)
  - Diagram directions `43Y-0` (A vs B comparison, reference only)
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
