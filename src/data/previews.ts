/*
 * Preview windows: what opens when a bento tile is clicked (desktop) or
 * tapped (mobile sheet). Keyed by tile slug in PROJECTS (src/data/site.ts).
 * Copy and images come from the "Preview | …" artboards in the Paper file.
 */

export type PreviewImage = {
  src: string; // light theme, /work/preview/<slug>/<n>.webp, exported at 2x
  dark?: string; // dark theme, when the view has one
  video?: string; // muted loop that plays over the still (product "In use" views)
  width: number; // display size in the desktop visual panel, in px
  height: number;
  // screen: a flat screenshot; the preview draws its corners and shadow.
  // phone: carries its own device frame; the preview only adds a soft drop shadow.
  kind: "screen" | "phone";
};

export type PreviewView = {
  label: string; // tab label; ignored when the preview has one view
  image: PreviewImage;
};

export type PreviewFact = { label: string; value: string; href?: string };

export type Preview = {
  title: string; // fits one line in the 360px column
  body: string[]; // what it is and why it matters, then one first-person line
  facts: PreviewFact[];
  views: PreviewView[];
};

export const PREVIEWS: Record<string, Preview> = {
  // Launch Fast
  "lf-web-app": {
    title: "An Amazon research platform",
    body: [
      "Sellers use it to find a product worth selling, see what its market earns and check the margin before they order stock, then build the listing and track its rank after launch.",
      "400+ sellers have used it to track more than 1,000,000 markets. I built it end to end: the interface, the API and the data pipeline behind every chart.",
    ],
    facts: [
      { label: "Live since", value: "August 2025" },
      { label: "Role", value: "Co-founder and engineer" },
      { label: "Website", value: "launchfastlegacyx.com", href: "https://launchfastlegacyx.com" },
    ],
    views: [
      {
        label: "",
        image: { src: "/work/preview/lf-web-app/1.webp", dark: "/work/preview/lf-web-app/1-dark.webp", width: 608, height: 380, kind: "screen" },
      },
    ],
  },
  "lf-ios-app": {
    title: "An Amazon seller's dashboard",
    body: [
      "Sellers use it to check sales, profit and ad spend for any date range, with a home screen widget for today's numbers.",
      "Launchie, an AI agent in the app, answers questions about the business and proposes ads changes the seller approves on the spot. The app tracks more than $3M in seller revenue. I built it end to end in SwiftUI.",
    ],
    facts: [
      { label: "Status", value: "In TestFlight" },
      { label: "Role", value: "Co-founder and engineer" },
    ],
    views: [{ label: "", image: { src: "/work/preview/lf-ios-app/1.webp", dark: "/work/preview/lf-ios-app/1-dark.webp", width: 600, height: 610, kind: "phone" } }],
  },
  "lf-mcp": {
    title: "Launch Fast, in any AI chat",
    body: [
      "Launch Fast's MCP server brings the whole platform to any AI client that connects over OAuth, like Claude, ChatGPT or Cursor. Sellers research products, check sales and review ads in the chat, and answers come back as interactive Launch Fast interfaces.",
      "200+ connections make more than 100,000 tool calls a month. I built the server, its per-tool OAuth permissions, and the 18 tools with the interfaces they render in the chat.",
    ],
    facts: [
      { label: "Status", value: "Live" },
      { label: "Role", value: "Co-founder and engineer" },
    ],
    views: [
      {
        label: "Desktop",
        image: { src: "/work/preview/lf-mcp/1.webp", dark: "/work/preview/lf-mcp/1-dark.webp", width: 608, height: 570, kind: "screen" },
      },
      { label: "Mobile", image: { src: "/work/preview/lf-mcp/2.webp", dark: "/work/preview/lf-mcp/2-dark.webp", width: 266, height: 569, kind: "phone" } },
    ],
  },
  "lf-launchie": {
    title: "An AI agent for Amazon sellers",
    body: [
      "Launchie reads a seller's own sales and ads data, answers questions about the business and makes changes once the seller approves them. It also runs scheduled briefs, from a weekly profit report to custom checks.",
      "It manages more than $3M in seller revenue. I built it end to end, from the agent runtime on Cloudflare to the approval flow in the iOS app.",
    ],
    facts: [
      { label: "Status", value: "In TestFlight" },
      { label: "Role", value: "Co-founder and engineer" },
    ],
    views: [{ label: "", image: { src: "/work/preview/lf-launchie/1.webp", dark: "/work/preview/lf-launchie/1-dark.webp", width: 600, height: 610, kind: "phone" } }],
  },
  "lf-chrome": {
    title: "Launch Fast, inside Amazon",
    body: [
      "The extension adds a search summary to Amazon's results: revenue, price, ad cost and reviews for the market at a glance. The dashboard brings the web app's product, PPC and supplier research onto the same page.",
      "827 sellers use it, and it's rated 5.0 on the Chrome Web Store. I built it end to end on Manifest V3.",
    ],
    facts: [
      { label: "Status", value: "Live" },
      {
        label: "Install",
        value: "Chrome Web Store",
        href: "https://chromewebstore.google.com/detail/launch-fast-amazon-fba-re/aaanahdkbajinekpffbddfimfcnagbkm",
      },
      { label: "Role", value: "Co-founder and engineer" },
    ],
    views: [
      {
        label: "Search summary",
        image: { src: "/work/preview/lf-chrome/1.webp", dark: "/work/preview/lf-chrome/1-dark.webp", width: 608, height: 448, kind: "screen" },
      },
      {
        label: "Product data",
        image: { src: "/work/preview/lf-chrome/2.webp", dark: "/work/preview/lf-chrome/2-dark.webp", width: 608, height: 380, kind: "screen" },
      },
      {
        label: "Dashboard",
        image: { src: "/work/preview/lf-chrome/3.webp", dark: "/work/preview/lf-chrome/3-dark.webp", width: 608, height: 422, kind: "screen" },
      },
    ],
  },
  "lf-brand": {
    title: "Launch Fast, in one system",
    body: [
      "I designed Launch Fast down to its type scale, its button sizes and its single blue accent. The same system carries from the product into every email and paid social ad.",
    ],
    facts: [
      { label: "Covers", value: "App, email and ads" },
      { label: "Role", value: "Co-founder and engineer" },
    ],
    views: [
      { label: "System", image: { src: "/work/preview/lf-brand/1.webp", width: 608, height: 597, kind: "screen" } },
      { label: "Marketing", image: { src: "/work/preview/lf-brand/2.webp", width: 608, height: 597, kind: "screen" } },
      { label: "Email", image: { src: "/work/preview/lf-brand/3.webp", width: 608, height: 597, kind: "screen" } },
    ],
  },

  // HB Goodies
  "zen-sweat": {
    title: "Zen Sweat, a sauna at home",
    body: [
      "A pop-up steam tent with a 1000 W steamer, a chair and a foot massager, set up in five minutes with no tools. I found the gap, then designed the product, its brand, its manual and its box, and had it made and shipped.",
    ],
    facts: [
      { label: "Shop", value: "Amazon", href: "https://www.amazon.com/Zen-Sweat-Portable-Sauna-Home/dp/B0CZC4NSK3" },
      { label: "Role", value: "Founder and designer" },
    ],
    views: [
      {
        label: "In use",
        image: { src: "/work/preview/zen-sweat/1.webp", video: "/work/preview/zen-sweat/1.mp4", width: 608, height: 456, kind: "screen" },
      },
      { label: "Manual", image: { src: "/work/preview/zen-sweat/2.webp", width: 608, height: 456, kind: "screen" } },
      { label: "Shipped", image: { src: "/work/preview/zen-sweat/3.webp", width: 608, height: 456, kind: "screen" } },
    ],
  },
  "flag-runner": {
    title: "Flag Runner, a truck flag mount",
    body: [
      "A flagpole mount that clamps onto a truck bed with stainless steel screws, so nothing gets drilled, and packs into its own weatherproof case. I designed the mount, its brand, its manual and its box, and had it made and shipped.",
    ],
    facts: [
      { label: "Shop", value: "Amazon", href: "https://www.amazon.com/dp/B0DSGTM325" },
      { label: "Role", value: "Founder and designer" },
    ],
    views: [
      {
        label: "In use",
        image: { src: "/work/preview/flag-runner/1.webp", video: "/work/preview/flag-runner/1.mp4", width: 608, height: 456, kind: "screen" },
      },
      { label: "Manual", image: { src: "/work/preview/flag-runner/2.webp", width: 608, height: 456, kind: "screen" } },
      { label: "Shipped", image: { src: "/work/preview/flag-runner/3.webp", width: 608, height: 456, kind: "screen" } },
    ],
  },

  // GymCreatives
  "gc-chat": {
    title: "An AI design studio for gyms",
    body: [
      "An owner describes a post in plain words and gets back one ready to publish, with the gym's own logo, colours and type, so a gym without a designer can still post like it has one.",
      "I built the chat, the agent behind it and the image pipeline.",
    ],
    facts: [
      { label: "Status", value: "Live" },
      { label: "Website", value: "gymcreatives.com", href: "https://gymcreatives.com" },
      { label: "Role", value: "CTO and lead engineer" },
    ],
    views: [
      { label: "Home", image: { src: "/work/preview/gc-chat/1.webp", dark: "/work/preview/gc-chat/1-dark.webp", width: 608, height: 456, kind: "screen" } },
      { label: "Chat", image: { src: "/work/preview/gc-chat/2.webp", dark: "/work/preview/gc-chat/2-dark.webp", width: 608, height: 456, kind: "screen" } },
      { label: "Mobile", image: { src: "/work/preview/gc-chat/3.webp", dark: "/work/preview/gc-chat/3-dark.webp", width: 266, height: 574, kind: "phone" } },
    ],
  },
  "gc-auto-posts": {
    title: "A week of posts, done for you",
    body: [
      "Every week, Auto Posts makes nine posts on the gym's brand and checks each one before it lands, so the owner opens a finished week instead of a blank page. Their edits teach it what to make next time.",
      "I built the weekly run, the check on every image and the loop that learns from edits.",
    ],
    facts: [
      { label: "Status", value: "Live" },
      { label: "Website", value: "gymcreatives.com", href: "https://gymcreatives.com" },
      { label: "Role", value: "CTO and lead engineer" },
    ],
    views: [
      { label: "Desktop", image: { src: "/work/preview/gc-auto-posts/1.webp", dark: "/work/preview/gc-auto-posts/1-dark.webp", width: 608, height: 456, kind: "screen" } },
      { label: "Mobile", image: { src: "/work/preview/gc-auto-posts/2.webp", dark: "/work/preview/gc-auto-posts/2-dark.webp", width: 266, height: 574, kind: "phone" } },
    ],
  },
  "gc-brand-memory": {
    title: "Learns a gym's brand once",
    body: [
      "Most AI design tools start from zero, so a gym owner explains their colours, fonts and tone again with every request. GymCreatives reads the gym's website once and saves its brand, so every post after that looks and sounds like the gym.",
      "I built the brand profile the agent reads before every post, and the rule that it only changes when the owner says so.",
    ],
    facts: [
      { label: "Status", value: "Live" },
      { label: "Website", value: "gymcreatives.com", href: "https://gymcreatives.com" },
      { label: "Role", value: "CTO and lead engineer" },
    ],
    views: [
      { label: "Website", image: { src: "/work/preview/gc-brand-memory/1.webp", width: 608, height: 307, kind: "screen" } },
      { label: "Brand kit", image: { src: "/work/preview/gc-brand-memory/2.webp", dark: "/work/preview/gc-brand-memory/2-dark.webp", width: 608, height: 456, kind: "screen" } },
      // Two post cards on a transparent ground, each with its own corners, so it renders like a phone
      { label: "Posts", image: { src: "/work/preview/gc-brand-memory/3.webp", width: 608, height: 382, kind: "phone" } },
    ],
  },
  "gc-agent": {
    title: "A thoughtful agent to work with",
    body: [
      "Most AI agents either hide what they're doing or bury the owner in text. Here, each step shows up as it happens, results arrive as something to look at, and when a choice is the owner's, the agent stops and asks with a few clear options instead of guessing.",
      "I designed how it feels to work alongside it: every state a step can be in, when it asks instead of deciding, and a one-tap way to hand the choice back.",
    ],
    facts: [
      { label: "Status", value: "Live" },
      { label: "Website", value: "gymcreatives.com", href: "https://gymcreatives.com" },
      { label: "Role", value: "CTO and lead engineer" },
    ],
    views: [{ label: "", image: { src: "/work/preview/gc-agent/1.webp", dark: "/work/preview/gc-agent/1-dark.webp", width: 608, height: 456, kind: "screen" } }],
  },
  "gc-models": {
    title: "Eight image models, one menu",
    body: [
      "Image models keep leapfrogging each other, and most tools lock you into one. GymCreatives puts eight models from five companies in one menu, with the credit cost beside each, so a gym can pick whichever suits the post, or whichever is best this month.",
      "I built the registry behind it: each model declares what it can do, and the app adapts its formats, sizes and reference images to match.",
    ],
    facts: [
      { label: "Status", value: "Live" },
      { label: "Website", value: "gymcreatives.com", href: "https://gymcreatives.com" },
      { label: "Role", value: "CTO and lead engineer" },
    ],
    views: [{ label: "", image: { src: "/work/preview/gc-models/1.webp", dark: "/work/preview/gc-models/1-dark.webp", width: 608, height: 540, kind: "screen" } }],
  },

  // Native apps
  "daily-hadith": {
    title: "A hadith a day, for my mom",
    body: [
      "My mom listened to hadiths wherever they turned up: forwarded on WhatsApp, buried in YouTube, shared on Facebook. Daily Hadith gathers them in one calm place on her iPhone, with a new hadith each day in Urdu audio, an English translation and a library to come back to.",
      "I designed and built it for her in SwiftUI, from the audio player to the library she browses by theme.",
    ],
    facts: [
      { label: "Status", value: "Live" },
      { label: "App Store", value: "Daily Hadith", href: "https://apps.apple.com/us/app/daily-hadith/id6786129456" },
      { label: "Role", value: "Designer and engineer" },
    ],
    views: [{ label: "", image: { src: "/work/preview/daily-hadith/1.webp", dark: "/work/preview/daily-hadith/1-dark.webp", width: 560, height: 574, kind: "phone" } }],
  },
  beamlet: {
    title: "Remote Control, one click away",
    body: [
      "Claude Code's Remote Control lets you keep working from your phone, but a session only starts from a chat already open on your Mac, and it drops when that window closes. Beamlet starts one from the menu bar in a home folder, so Claude can reach every project and open new chats, and it keeps the session running.",
      "I designed and built it in SwiftUI, from the nine-ray mark to how it recovers when the connection drops.",
    ],
    facts: [
      { label: "Status", value: "Live" },
      { label: "GitHub", value: "BlockchainHB/Beamlet", href: "https://github.com/BlockchainHB/Beamlet" },
      { label: "Role", value: "Designer and engineer" },
    ],
    views: [{ label: "", image: { src: "/work/preview/beamlet/1.webp", dark: "/work/preview/beamlet/1-dark.webp", width: 608, height: 540, kind: "screen" } }],
  },
  "pr-monitor": {
    title: "Know when the reviews are in",
    body: [
      "When you code with an agent, it opens a pull request and review bots start checking it on GitHub, but nothing tells you or the agent when they finish. PR Monitor sits in the menu bar, watches checks and review comments across your repos, and tells you the moment a pull request is ready, so the agent can pick up the feedback in one pass.",
      "I designed and built it in SwiftUI, from the state each pull request lands in to when a notification is worth sending.",
    ],
    facts: [
      { label: "Status", value: "Live" },
      { label: "GitHub", value: "BlockchainHB/PR-Monitor", href: "https://github.com/BlockchainHB/PR-Monitor" },
      { label: "Role", value: "Designer and engineer" },
    ],
    views: [{ label: "", image: { src: "/work/preview/pr-monitor/1.webp", dark: "/work/preview/pr-monitor/1-dark.webp", width: 608, height: 500, kind: "screen" } }],
  },
};
