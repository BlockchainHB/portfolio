# Systems diagrams

Source for the eight diagram-style Systems cards and the Agents page featured card (the ninth, Daily Hadith, is an HTML text comparison built in Paper because it needs right-to-left Urdu).

- Built with the `diagram-design` skill (cathrynlavery/diagram-design, installed as a Claude Code plugin) using the `hasaam-portfolio` skin profile at `~/.diagram-design/profiles/hasaam-portfolio.md`. The repo's `.diagram-design` marker selects it.
- Rules applied: no shadows, at most two accent elements per diagram (the project accent), orthogonal connectors with masked uppercase labels, 4px grid, SF Pro for names, Geist Mono only for technical values.
- `python3 diagrams.py` regenerates every `<slug>-light.svg` and `<slug>-dark.svg` (560x320, the card visual size). Each SVG embeds Geist Mono (`geist-mono-latin.woff2`, SIL OFL) so it renders the same as an image anywhere. In code, prefer inlining the SVG and loading Geist Mono from the site instead.
- Content comes from `../systems-research/*.md`. Never name Launch Fast's third-party data providers.

| File | Card | Type |
|---|---|---|
| `gc-image-quality` | Keeping generated images shippable | Flowchart with retry and redo loops |
| `gc-agent-thread` | One agent per chat thread | Sequence |
| `gc-model-registry` | Thirteen models, one registry | Capability matrix |
| `lf-inngest-fanout` | One event, twenty functions | Fan-out |
| `lf-launchie-cloudflare` | Launchie on Cloudflare | Deployment (Vercel and Cloudflare zones) |
| `lf-tool-layer` | One tool layer, three surfaces | Layer stack |
| `lf-launchie-approval` | Agent proposes, seller approves | Swimlane |
| `pr-one-status` | Every review agent, one status | Fan-in to a precedence status |
| `lf-launchie-loop` | Agents page featured: Launchie, the agent inside the iOS app (736x424) | Loop with a shared-memory hub |
