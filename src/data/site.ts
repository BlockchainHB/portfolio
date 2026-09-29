/*
 * Every word and image on the site. Copy follows the Portfolio copy guide
 * (Claude Doc); the Systems lens follows the technical-docs voice instead.
 * Tags are hidden metadata: they only decide which lens a card appears on.
 */

export type Lens = "interface" | "systems" | "agents" | "brand" | "product";

// seoTitle and description are for search results and link previews: they
// name the projects, since the page's own heading and line don't.
export const LENSES: { slug: Lens; label: string; title: string; line: string; seoTitle: string; description: string }[] = [
  {
    slug: "interface",
    label: "Interface",
    title: "Interface",
    line: "Interfaces I've designed and built, from a menu bar to a dashboard.",
    seoTitle: "Interface design and front-end work",
    description:
      "Interfaces Hasaam Bhatti designed and built: the Launch Fast web app, iOS app and Chrome extension, the GymCreatives studio, and native iPhone and Mac apps.",
  },
  {
    slug: "systems",
    label: "Systems",
    title: "Systems",
    line: "How each system works, with the limits and numbers from its code.",
    seoTitle: "System design and architecture",
    description:
      "How the systems behind Launch Fast, GymCreatives and Hasaam Bhatti's native apps work: Durable Objects, Inngest fan-out, a shared MCP tool layer and vision QA.",
  },
  {
    slug: "agents",
    label: "Agents",
    title: "Agents",
    line: "Agents I've built, from the terminal to the iPhone.",
    seoTitle: "AI agents for Amazon sellers and gyms",
    description:
      "AI agents Hasaam Bhatti built: Launchie, which runs the Amazon ads loop for Launch Fast sellers, and the GymCreatives agent that turns a chat into an on-brand post.",
  },
  {
    slug: "brand",
    label: "Brand",
    title: "Brand",
    line: "Brands I've built, from the design language to the box.",
    seoTitle: "Brand identity and packaging",
    description:
      "Brands Hasaam Bhatti built from the design language to the box: Launch Fast, GymCreatives, and the Zen Sweat and Flag Runner products on Amazon.",
  },
  {
    slug: "product",
    label: "Product",
    title: "Product",
    line: "Products I've launched on Amazon, from the gap to the box.",
    seoTitle: "Physical products launched on Amazon",
    description:
      "Products Hasaam Bhatti found, designed and launched on Amazon: Zen Sweat, a portable steam sauna, and Flag Runner, a no-drill truck bed flag mount.",
  },
];

/* ---------- Project marks ---------- */

export type Mark =
  | { kind: "mono"; name: string; size: number } // one-color mark, swaps ink/white with the theme
  | { kind: "color"; name: string; size: number } // colored mark on a themed tile
  | { kind: "app"; name: string; zoom?: number } // full app icon, edge to edge
  | { kind: "glyph"; glyph: "native" | "index" | "component" };

export const MARKS = {
  launchFast: { kind: "mono", name: "lf", size: 62 },
  gymCreatives: { kind: "mono", name: "gc", size: 54 },
  mcp: { kind: "mono", name: "mcp", size: 56 },
  github: { kind: "mono", name: "github", size: 60 },
  zenSweat: { kind: "mono", name: "zensweat", size: 70 },
  flagRunner: { kind: "mono", name: "flagrunner", size: 72 },
  claude: { kind: "color", name: "claude", size: 60 },
  chrome: { kind: "color", name: "chrome", size: 62 },
  leo: { kind: "color", name: "leo", size: 66 },
  njoyn: { kind: "color", name: "njoyn", size: 72 },
  hbGoodies: { kind: "app", name: "hbbag", zoom: 124 },
  beamlet: { kind: "app", name: "beamlet" },
  dailyHadith: { kind: "app", name: "dailyhadith" },
  prMonitor: { kind: "app", name: "prmonitor" },
  kijiji: { kind: "app", name: "kijiji" },
  native: { kind: "glyph", glyph: "native" },
  index: { kind: "glyph", glyph: "index" },
  componentRat: { kind: "glyph", glyph: "component" },
} satisfies Record<string, Mark>;

/* ---------- Home: projects and bento tiles ---------- */

// Grid placement on the four-column desktop bento (1-based lines).
export type Place = { col: number; row: number; w: 1 | 2; h: 1 | 2 };

export type Tile = {
  slug: string; // image base name in /public/work/home and /public/work/mobile
  label: string; // pill on desktop
  caption: string; // name under the tile on mobile
  place: Place;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  meta: string;
  mobileMeta?: string;
  visit?: string;
  mark: Mark;
  tiles: Tile[];
};

export const PROJECTS: Project[] = [
  {
    id: "launch-fast",
    name: "Launch Fast",
    description: "Research, ads and sourcing for Amazon sellers. Built because I needed it as one.",
    meta: "Co-founder and engineer",
    visit: "https://launchfastlegacyx.com",
    mark: MARKS.launchFast,
    tiles: [
      { slug: "lf-web-app", label: "Web app", caption: "Web app", place: { col: 1, row: 1, w: 2, h: 2 } },
      { slug: "lf-ios-app", label: "iOS app", caption: "iOS app", place: { col: 3, row: 1, w: 1, h: 2 } },
      { slug: "lf-mcp", label: "MCP", caption: "MCP", place: { col: 4, row: 1, w: 1, h: 1 } },
      { slug: "lf-launchie", label: "Launchie", caption: "Launchie", place: { col: 4, row: 2, w: 1, h: 1 } },
      { slug: "lf-brand", label: "Brand", caption: "Brand", place: { col: 1, row: 3, w: 2, h: 1 } },
      {
        slug: "lf-chrome",
        label: "Chrome extension",
        caption: "Chrome extension",
        place: { col: 3, row: 3, w: 2, h: 1 },
      },
    ],
  },
  {
    id: "physical",
    name: "HB Goodies",
    description: "My Amazon brand. I found each gap, designed the product and its brand, and launched it.",
    meta: "Operator",
    mark: MARKS.hbGoodies,
    tiles: [
      { slug: "zen-sweat", label: "Zen Sweat", caption: "Zen Sweat", place: { col: 1, row: 1, w: 2, h: 2 } },
      { slug: "flag-runner", label: "Flag Runner", caption: "Flag Runner", place: { col: 3, row: 1, w: 2, h: 2 } },
    ],
  },
  {
    id: "gymcreatives",
    name: "GymCreatives",
    description: "An AI studio that makes on-brand posts for CrossFit gyms, built with MediaLaunch.",
    meta: "CTO and lead engineer",
    visit: "https://gymcreatives.com",
    mark: MARKS.gymCreatives,
    tiles: [
      {
        slug: "gc-chat",
        label: "Chat workspace",
        caption: "Chat workspace",
        place: { col: 1, row: 1, w: 2, h: 2 },
      },
      { slug: "gc-auto-posts", label: "Auto posts", caption: "Auto posts", place: { col: 3, row: 1, w: 1, h: 2 } },
      {
        slug: "gc-brand-memory",
        label: "On brand, every post",
        caption: "Brand memory",
        place: { col: 4, row: 1, w: 1, h: 2 },
      },
      {
        slug: "gc-agent",
        label: "Agent interactions",
        caption: "Agent interactions",
        place: { col: 1, row: 3, w: 2, h: 1 },
      },
      { slug: "gc-models", label: "Thirteen models", caption: "Model choice", place: { col: 3, row: 3, w: 2, h: 1 } },
    ],
  },
  {
    id: "native",
    name: "Native apps",
    description: "A daily hadith on the iPhone, and two menu bar tools on the Mac. All Swift.",
    meta: "",
    mobileMeta: "iPhone | Mac",
    mark: MARKS.native,
    tiles: [
      { slug: "daily-hadith", label: "Daily Hadith", caption: "Daily Hadith", place: { col: 1, row: 1, w: 2, h: 1 } },
      { slug: "beamlet", label: "Beamlet", caption: "Beamlet", place: { col: 3, row: 1, w: 1, h: 1 } },
      { slug: "pr-monitor", label: "PR Monitor", caption: "PR Monitor", place: { col: 4, row: 1, w: 1, h: 1 } },
    ],
  },
];

// Mobile rails keep their own order (the strongest tile first).
export const MOBILE_ORDER: Record<string, string[]> = {
  "launch-fast": ["lf-web-app", "lf-ios-app", "lf-launchie", "lf-brand", "lf-mcp", "lf-chrome"],
  physical: ["zen-sweat", "flag-runner"],
  gymcreatives: ["gc-chat", "gc-agent", "gc-auto-posts", "gc-brand-memory", "gc-models"],
  native: ["daily-hadith", "beamlet", "pr-monitor"],
};

/* ---------- Also shipped ---------- */

export type Shipped = {
  id: string;
  name: string;
  line: string;
  year: number;
  href: string;
  mark: Mark;
  lenses: Lens[];
};

export const ALSO_SHIPPED: Shipped[] = [
  {
    id: "claude-plugins",
    name: "Claude Plugins",
    line: "Eleven plugins for Claude Code",
    year: 2026,
    href: "https://github.com/BlockchainHB",
    mark: MARKS.claude,
    lenses: ["agents"],
  },
  {
    id: "leo",
    name: "Leo",
    line: "A terminal agent for SEO content",
    year: 2026,
    href: "https://github.com/BlockchainHB/leo",
    mark: MARKS.leo,
    lenses: ["agents"],
  },
  {
    id: "componentrat",
    name: "ComponentRat",
    line: "Lift React components off any site",
    year: 2026,
    href: "https://github.com/BlockchainHB",
    mark: MARKS.componentRat,
    lenses: ["interface"],
  },
  {
    id: "launch-fast-mcp",
    name: "Launch Fast MCP",
    line: "Amazon research inside Claude",
    year: 2025,
    href: "https://www.npmjs.com/package/launchfast-mcp",
    mark: MARKS.mcp,
    lenses: ["agents", "systems"],
  },
  {
    id: "launch-fast-chrome",
    name: "Launch Fast for Chrome",
    line: "Research on any Amazon page",
    year: 2025,
    href: "https://chromewebstore.google.com/detail/launch-fast-amazon-fba-re/aaanahdkbajinekpffbddfimfcnagbkm",
    mark: MARKS.chrome,
    lenses: ["interface"],
  },
  {
    id: "github-notion",
    name: "GitHub to Notion",
    line: "Merged PRs become a changelog",
    year: 2025,
    href: "https://github.com/BlockchainHB/github-merge-notion-agent",
    mark: MARKS.github,
    lenses: ["systems"],
  },
  {
    id: "kijijibot",
    name: "KijijiBot",
    line: "Keeps Kijiji listings fresh",
    year: 2025,
    href: "https://github.com/BlockchainHB/KijijiBot",
    mark: MARKS.kijiji,
    lenses: ["systems"],
  },
  {
    id: "njoyn",
    name: "Njoyn Navigator",
    line: "Shortcuts for the Njoyn job portal",
    year: 2025,
    href: "https://github.com/BlockchainHB/atsnavigation",
    mark: MARKS.njoyn,
    lenses: ["interface"],
  },
];

/* ---------- Lens cards ---------- */

export type Visual =
  | { type: "image"; slug: string; square?: boolean } // /public/work/lens/<slug>-<theme>.webp
  | { type: "svg"; slug: string }; // /public/work/systems/<slug>-<theme>.svg

export type LensCard = {
  id: string;
  project: string;
  mark: Mark;
  title: string;
  line: string;
  visual: Visual;
};

const LF = { project: "Launch Fast", mark: MARKS.launchFast };
const GC = { project: "GymCreatives", mark: MARKS.gymCreatives };
const HB = { project: "HB Goodies", mark: MARKS.hbGoodies };

export const LENS_CARDS: Record<Lens, LensCard[]> = {
  interface: [
    {
      id: "web-app",
      ...LF,
      title: "Every seller tool in one workspace",
      line: "Research, keywords, suppliers, ads and sales in one web app.",
      visual: { type: "image", slug: "interface-web-app" },
    },
    {
      id: "ios-app",
      ...LF,
      title: "Launch Fast on iPhone",
      line: "A native app built around Launchie, in TestFlight now.",
      visual: { type: "image", slug: "interface-ios-app" },
    },
    {
      id: "mcp",
      ...LF,
      title: "Launch Fast inside Claude",
      line: "Amazon research in the chat, with its own interface.",
      visual: { type: "image", slug: "interface-mcp" },
    },
    {
      id: "chrome",
      ...LF,
      title: "Launch Fast on every listing",
      line: "The Chrome extension adds research to any Amazon product page.",
      visual: { type: "image", slug: "interface-chrome" },
    },
    {
      id: "launchie",
      ...LF,
      title: "Talking to your Amazon business",
      line: "Launchie answers seller questions and proposes PPC changes, in chat.",
      visual: { type: "image", slug: "interface-launchie" },
    },
    {
      id: "chat-workspace",
      ...GC,
      title: "A chat workspace for making posts",
      line: "Gyms ask for a post and get the image back in the same thread.",
      visual: { type: "image", slug: "interface-chat-workspace" },
    },
    {
      id: "auto-posts",
      ...GC,
      title: "A week of posts, made for you",
      line: "Nine on-brand image posts every week, each checked before it lands.",
      visual: { type: "image", slug: "interface-auto-posts" },
    },
    {
      id: "agent-interactions",
      ...GC,
      title: "Questions you answer with a tap",
      line: "The agent asks and suggests with choices, so nobody writes a prompt.",
      visual: { type: "image", slug: "interface-agent-interactions" },
    },
    {
      id: "model-choice",
      ...GC,
      title: "Pick the model for the job",
      line: "Image and chat models behind one switcher.",
      visual: { type: "image", slug: "interface-model-choice" },
    },
    {
      id: "daily-hadith",
      project: "Daily Hadith",
      mark: MARKS.dailyHadith,
      title: "A hadith a day, in Urdu and English",
      line: "Native SwiftUI, with Urdu audio transcribed into English.",
      visual: { type: "image", slug: "interface-daily-hadith" },
    },
    {
      id: "beamlet",
      project: "Beamlet",
      mark: MARKS.beamlet,
      title: "Claude Remote Control, in the menu bar",
      line: "Start it, watch its status and hand the session to your phone.",
      visual: { type: "image", slug: "interface-beamlet" },
    },
    {
      id: "pr-monitor",
      project: "PR Monitor",
      mark: MARKS.prMonitor,
      title: "Review status in the menu bar",
      line: "Every tracked PR and its status, one click from the menu bar.",
      visual: { type: "image", slug: "interface-pr-monitor" },
    },
  ],
  systems: [
    {
      id: "approval",
      ...LF,
      title: "Approval flow for ads changes",
      line: "Launchie proposes ads changes as a set, checked against a policy. You approve it in the iOS app under MFA, and the apply engine re-reads live values, skips stale items and applies the rest in small batches.",
      visual: { type: "svg", slug: "lf-launchie-approval" },
    },
    {
      id: "durable-objects",
      ...LF,
      title: "Launchie on Durable Objects",
      line: "Each seller thread runs in its own Durable Object with a SQLite store. An account object stores memory and triggers briefs with alarms.",
      visual: { type: "svg", slug: "lf-launchie-cloudflare" },
    },
    {
      id: "inngest",
      ...LF,
      title: "Research pipeline on Inngest",
      line: "One capture event fans out to 20 Inngest functions, each with its own concurrency limit. Vendor calls go through Redis-backed rate limits.",
      visual: { type: "svg", slug: "lf-inngest-fanout" },
    },
    {
      id: "mcp-layer",
      ...LF,
      title: "Shared MCP tool layer",
      line: "Claude, ChatGPT and Launchie call the same 18 tools. Each Amazon tool needs its own OAuth scope, and a test fails if the schemas drift.",
      visual: { type: "svg", slug: "lf-tool-layer" },
    },
    {
      id: "gc-thread",
      ...GC,
      title: "Chat agent per thread",
      line: "Each chat thread runs in its own Durable Object. It sends image jobs to Convex as signed requests and gets each result back as a hidden turn.",
      visual: { type: "svg", slug: "gc-agent-thread" },
    },
    {
      id: "gc-quality",
      ...GC,
      title: "Image retries and vision QA",
      line: "A render gets up to four attempts, two per model, with Gemini as the fallback. A vision judge returns pass or fail and allows one regeneration.",
      visual: { type: "svg", slug: "gc-image-quality" },
    },
    {
      id: "gc-registry",
      ...GC,
      title: "Image model registry",
      line: "The registry records each model's route, output sizes and reference-image support. It lists five chat models and eight image models.",
      visual: { type: "svg", slug: "gc-model-registry" },
    },
    {
      id: "hadith-transcripts",
      project: "Daily Hadith",
      mark: MARKS.dailyHadith,
      title: "Urdu transcription cross-check",
      line: "Two speech-to-text models transcribe each clip. GPT-4o compares both transcripts and marks the clip as passed, corrected or needing review.",
      visual: { type: "image", slug: "systems-daily-hadith" },
    },
    {
      id: "pr-status",
      project: "PR Monitor",
      mark: MARKS.prMonitor,
      title: "Status rollup for review agents",
      line: "PR Monitor reduces checks, reviews and threads to one state per agent. The PR takes the worst state and sends one notification per push.",
      visual: { type: "svg", slug: "pr-one-status" },
    },
  ],
  agents: [
    {
      id: "launchie-loop",
      ...LF,
      title: "Launchie runs the whole ads loop",
      line: "It reads your Launch Fast data, proposes PPC changes you approve in the iOS app, applies them and measures the result. It runs on Cloudflare Durable Objects.",
      visual: { type: "svg", slug: "lf-launchie-loop" },
    },
    {
      id: "agent-asks",
      ...GC,
      title: "The agent asks before it guesses",
      line: "It asks, suggests and follows up, so gyms steer instead of prompting.",
      visual: { type: "image", slug: "agents-agent-interactions" },
    },
    {
      id: "one-chat",
      ...GC,
      title: "One chat from request to post",
      line: "Each thread gets its own agent on the Cloudflare Agents SDK.",
      visual: { type: "image", slug: "agents-chat-workspace" },
    },
    {
      id: "brand-once",
      ...GC,
      title: "Learns a gym's brand once",
      line: "It takes colors, fonts and voice from the gym's site for every post.",
      visual: { type: "image", slug: "agents-brand-kit" },
    },
    {
      id: "launchie-chat",
      ...LF,
      title: "Talking to your Amazon business",
      line: "Ask about ads, products or suppliers. Answers come from your own data.",
      visual: { type: "image", slug: "agents-launchie" },
    },
  ],
  brand: [
    {
      id: "lf-design",
      ...LF,
      title: "The Launch Fast design language",
      line: "One type scale, palette and set of components, carried into every email.",
      visual: { type: "image", slug: "brand-launch-fast" },
    },
    {
      id: "gc-on-brand",
      ...GC,
      title: "Every post on brand",
      line: "Brand memory keeps each gym's colors, fonts and voice in every post.",
      visual: { type: "image", slug: "brand-gymcreatives" },
    },
    {
      id: "zen-sweat",
      ...HB,
      title: "Zen Sweat, a calm brand for a sweaty product",
      line: "The name, logo and packaging for a portable steam sauna.",
      visual: { type: "image", slug: "brand-zen-sweat" },
    },
    {
      id: "flag-runner",
      ...HB,
      title: "Flag Runner, built for truck owners",
      line: "Heavy red and black type for a no-drill truck bed flag mount.",
      visual: { type: "image", slug: "brand-flag-runner" },
    },
  ],
  product: [
    {
      id: "zen-sweat",
      ...HB,
      title: "A steam sauna with no assembly",
      line: "Portable, with a foot massager in the box.",
      visual: { type: "image", slug: "product-zen-sweat", square: true },
    },
    {
      id: "flag-runner",
      ...HB,
      title: "A flag mount that doesn't need a drill",
      line: "It clamps onto a truck bed and ships in its own case.",
      visual: { type: "image", slug: "product-flag-runner", square: true },
    },
  ],
};

export const CONTACT = {
  email: "hb@hbgoodies.com",
  x: "https://x.com/hasaamb",
  github: "https://github.com/BlockchainHB",
  linkedin: "https://www.linkedin.com/in/hasaam-bhatti-62a1501b9/",
};
