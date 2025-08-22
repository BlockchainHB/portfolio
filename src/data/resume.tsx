import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon, MailIcon } from "lucide-react";

export const DATA = {
  name: "Hasaam Bhatti (HB)",
  initials: "HB",
  url: "https://launchfastlegacyx.com",
  location: "Toronto, ON Canada",
  locationLink: "https://www.google.com/maps/place/Toronto,+ON,+Canada",
  description:
    "Full-stack AI builder, automation architect & multi-brand founder. I build products fast — from SaaS to Amazon FBA — blending code, commerce.",
  summary:
    "Internet-Raised Entrepreneur. I’ve spent the last decade solo-founding and scaling ventures across crypto, NFTs, clothing, and Amazon FBA — building brands with real traction.\n\nToday I’m a self-taught full-stack founder. I built Launch Fast, an Amazon intelligence SaaS, end-to-end, and now lead product development at LegacyX, combining technical execution with business growth.",
  avatarUrl: "/me.jpg",
  skills: {
    aiTools: [
      "Cursor",
      "Claude Code",
      "OpenAI",
      "LangChain",
      "n8n",
      "Apify",
      "Image Gen",
      "Voice Gen",
      "Video Gen",
      "RAG",
    ],
    programming: [
      "Next.js / React 18",
      "TypeScript / JavaScript (ES6+)",
      "Node.js & Express",
      "API Design (REST, GraphQL, Webhooks)",
      "Supabase (Postgres, Auth, Edge Functions)",
      "Convex (realtime & backend logic)",
      "Chrome Extensions (Manifest v3)",
      "Authentication & Security (JWT, OAuth)",
      "Database Design & Query Optimization",
    ],
    design: [
      "Branding",
      "Website",
      "Figma",
      "Framer",
      "React UI",
      "Tailwind CSS",
      "ShadCN UI",
      "Image Gen",
    ],
    ops: [
      "Automation (n8n, Zapier)",
      "Programmatic SEO & Web Scraping",
      "Cloud (Vercel, Netlify, Render)",
      "Git / GitHub (CI/CD)",
      "System Architecture & Scalability",
      "Meta Pixel & Conversions API",
      "SaaS Product Development",
    ],
  },
  navbar: [
    { href: "mailto:hb@hbgoodies.com", icon: MailIcon, label: "Email" },
  ],
  contact: {
    email: "",
    tel: "",
    social: {
      X: {
        name: "X",
        url: "https://x.com/automatingwork",
        icon: Icons.x,

        navbar: true,
      },
      GitHub: {
        name: "GitHub",
        url: "https://github.com/BlockchainHB",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/hasaam-bhatti-62a1501b9/",
        icon: Icons.linkedin,

        navbar: true,
      },
      Youtube: {
        name: "Youtube",
        url: "",
        icon: Icons.youtube,
        navbar: false,
      },
      LaunchFast: {
        name: "Launch Fast",
        url: "https://launchfastlegacyx.com/",
        icon: Icons.globe,
        navbar: false,
      },
      LegacyX: {
        name: "LegacyX",
        url: "https://legacyxfba.com/",
        icon: Icons.globe,
        navbar: false,
      },
      ZenSweat: {
        name: "Zen Sweat",
        url: "https://www.amazon.com/Zen-Sweat-Portable-Sauna-Home/dp/B0CZC4NSK3?sr=8-1",
        icon: Icons.globe,
        navbar: false,
      },
      email: {
        name: "Send Email",
        url: "mailto:hb@hbgoodies.com",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Launch Fast",
      href: "https://launchfastlegacyx.com/",
      badges: [],
      location: "Toronto, Canada",
      title: "Founder & Lead Developer",
      logoUrl: "/launchfast-logo.jpg",
      start: "2024",
      end: "Present",
      description:
        "Find FBA winners fast. Research, validate, and source — in minutes.",
    },
    
    {
      company: "Second Brain",
      href: "#",
      badges: [],
      location: "Toronto, Canada",
      title: "Founder",
      logoUrl: "/secondbrain.png",
      start: "2025",
      end: undefined,
      description:
        "Answers that scale. AI assistant for courses — powering 4,000+ students.",
    },
    {
      company: "LegacyX",
      href: "https://legacyxfba.com/",
      badges: [],
      location: "Remote",
      title: "Head of Product Development",
      logoUrl: "/legacyx.png",
      start: "2024",
      end: "Present",
      description:
        "Learn it, ship it, scale it. Coaching for 1,000+ sellers with in‑house services.",
    },
    {
      company: "HB Goodies",
      href: "https://hbgoodies.com/",
      badges: [],
      location: "Toronto, Canada",
      title: "Founder",
      logoUrl: "/zensweat.PNG",
      start: "2023",
      end: "Present",
      description:
        "A multi‑brand studio turning insights into defensible Amazon brands.",
    },
    {
      company: "Hire Flow",
      href: "https://www.hire-flow.co/",
      badges: ["Early Access"],
      location: "Remote",
      title: "Founder",
      logoUrl: "/hireflow.png",
      start: "2025",
      end: undefined,
      description:
        "Land quality opportunities. AI finds and applies while you focus.",
    },
  ],
  education: [] as Array<{
    school: string;
    degree?: string;
    start?: string;
    end?: string;
    href?: string;
    logoUrl?: string;
  }>,
  projects: [
    {
      title: "Discord Ticket Tool",
      href: "#",
      dates: "Aug 2025 – Present",
      active: true,
      description:
        "Discord ticket system for coaches: auto-creates private support threads for new members, adds admins, syncs status, and logs to Google Sheets. Includes buttons for solve/reopen and real-time updates.",
      technologies: ["Node.js", "Discord.js", "Google Sheets API"],
      links: [],
      image: "/Discord.png",
      video: "",
    },
    {
      title: "Launch Fast Chrome Extension",
      href: "https://chromewebstore.google.com/detail/launchfast-product-intell/aaanahdkbajinekpffbddfimfcnagbkm",
      dates: "Aug 2025 – Present",
      active: true,
      description:
        "Companion to Launch Fast: overlays product intelligence on Amazon (search/listing pages) with analytics, keyword insights, supplier sourcing, and real‑time data. Built with Manifest v3 and a speed‑first UX.",
      technologies: ["Manifest v3", "React", "Supabase", "Tailwind"],
      links: [
        {
          type: "Web Store",
          href: "https://chromewebstore.google.com/detail/launchfast-product-intell/aaanahdkbajinekpffbddfimfcnagbkm",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/chrome.png",
      video: "",
    },
    {
      title: "Leaderboard Kit",
      href: "https://github.com/BlockchainHB/fba-ranker",
      dates: "July 2025",
      active: true,
      description:
        "General‑purpose leaderboard: auth, proof‑backed submissions, admin review, and monthly/all‑time rankings. Drop‑in Next.js/React app with Supabase.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Supabase (Postgres, Auth, Storage, RLS)",
        "TailwindCSS",
        "shadcn/ui",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/BlockchainHB/fba-ranker",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/leaderboard.png",
      video: "",
    },
    // Research projects consolidated under Market Intelligence below
    {
      title: "Kijiji Post Automation",
      href: "https://github.com/BlockchainHB/KijijiBot",
      dates: "May 2025",
      active: true,
      description:
        "Open‑source Python + Playwright script that auto‑posts two Kijiji ads daily, refreshes to hold #1 in category, and handles media/logs — cron‑ready.",
      technologies: ["Python", "Playwright", "Cron"],
      links: [
        {
          type: "Source",
          href: "https://github.com/BlockchainHB/KijijiBot",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/Kijiji.png",
      video: "",
    },
    {
      title: "Remote MCP Server (Serverless)",
      href: "https://github.com/BlockchainHB/serverless-mcp-platform",
      dates: "May 2025",
      active: true,
      description:
        "Serverless Model Context Protocol server on Cloudflare Workers with job market intelligence tools (LinkedIn/Indeed scrapers), Apify integration, streaming SSE, Zod-typed tools, and edge-scaled performance.",
      technologies: [
        "TypeScript",
        "Cloudflare Workers",
        "MCP SDK",
        "Apify",
        "Zod",
      ],
      links: [
        { type: "Source", href: "https://github.com/BlockchainHB/serverless-mcp-platform", icon: <Icons.github className="size-3" /> },
      ],
      image: "",
      video: "",
    },
    {
      title: "Twitter Solana Monitor Bot",
      href: "https://github.com/BlockchainHB/twitter-solana-monitor",
      dates: "Feb 2025",
      active: true,
      description:
        "Discord bot that monitors Twitter accounts for Solana token mentions and tracks wallet transactions in real-time with Helius webhooks, VIP alerts, and token analytics.",
      technologies: [
        "Node.js",
        "Discord.js",
        "Twitter API v2",
        "Helius API",
        "Birdeye API",
        "Twilio (SMS)",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/BlockchainHB/twitter-solana-monitor",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Njoyn Navigator",
      href: "https://github.com/BlockchainHB/atsnavigation",
      dates: "Mar 2025",
      active: true,
      description:
        "Reverse‑engineered ATS APIs to ship a Tampermonkey helper: quick nav, smart search, and one‑click file downloads — all inline.",
      technologies: ["JavaScript", "Tampermonkey", "Userscript"],
      links: [
        { type: "Source", href: "https://github.com/BlockchainHB/atsnavigation", icon: <Icons.github className="size-3" /> },
      ],
      image: "/njoyn-logo.png",
      video: "",
    },
    {
      title: "Market Intelligence — AI/MCP Research",
      href: "https://github.com/BlockchainHB/amazon-fba-ai-saas-research",
      dates: "2025",
      active: true,
      description:
        "Two research sprints proving end‑to‑end AI/MCP scraping at scale — thousands of social posts → NLP synthesis → actionable go‑to‑market insights. Includes code, datasets, and reports.",
      technologies: ["Python", "Scrapy", "LangChain", "Supabase", "NLP"],
      links: [
        { type: "FBA Case Study", href: "https://github.com/BlockchainHB/amazon-fba-ai-saas-research", icon: <Icons.github className="size-3" /> },
        { type: "Recruiting Study", href: "https://github.com/BlockchainHB/hireflow", icon: <Icons.github className="size-3" /> },
      ],
      image: "/market intelligence.png",
      video: "",
    },
    {
      title: "Labs & Experiments",
      href: "#",
      dates: "2024–2025",
      active: true,
      description:
        "Unfinished but exploratory builds: a Twitter influencer scraping + auto-post engine, and LyricAI — generating lyric videos from songs with captions. Prototypes showcasing rapid AI tool application.",
      technologies: ["Python", "Next.js", "OpenAI", "FFmpeg"],
      links: [],
      image: "",
      video: "",
    },
  ],
  hackathons: [
    {
      title: "Hack Western 5",
      dates: "November 23rd - 25th, 2018",
      location: "London, Ontario",
      description:
        "Developed a mobile application which delivered bedtime stories to children using augmented reality.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-western.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
    {
      title: "Hack The North",
      dates: "September 14th - 16th, 2018",
      location: "Waterloo, Ontario",
      description:
        "Developed a mobile application which delivers university campus wide events in real time to all students.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-the-north.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
    {
      title: "FirstNet Public Safety Hackathon",
      dates: "March 23rd - 24th, 2018",
      location: "San Francisco, California",
      description:
        "Developed a mobile application which communcicates a victims medical data from inside an ambulance to doctors at hospital.",
      icon: "public",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/firstnet.png",
      links: [],
    },
    {
      title: "DeveloperWeek Hackathon",
      dates: "February 3rd - 4th, 2018",
      location: "San Francisco, California",
      description:
        "Developed a web application which aggregates social media data regarding cryptocurrencies and predicts future prices.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/developer-week.jpg",
      links: [
        {
          title: "Github",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/cryptotrends/cryptotrends",
        },
      ],
    },
    {
      title: "HackDavis",
      dates: "January 20th - 21st, 2018",
      location: "Davis, California",
      description:
        "Developed a mobile application which allocates a daily carbon emission allowance to users to move towards a sustainable environment.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-davis.png",
      win: "Best Data Hack",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2018/white.svg",
      links: [
        {
          title: "Devpost",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://devpost.com/software/my6footprint",
        },
        {
          title: "ML",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/Wallet6/my6footprint-machine-learning",
        },
        {
          title: "iOS",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/Wallet6/CarbonWallet",
        },
        {
          title: "Server",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/Wallet6/wallet6-server",
        },
      ],
    },
    {
      title: "ETH Waterloo",
      dates: "October 13th - 15th, 2017",
      location: "Waterloo, Ontario",
      description:
        "Developed a blockchain application for doctors and pharmacists to perform trustless transactions and prevent overdosage in patients.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/eth-waterloo.png",
      links: [
        {
          title: "Organization",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/ethdocnet",
        },
      ],
    },
    {
      title: "Hack The North",
      dates: "September 15th - 17th, 2017",
      location: "Waterloo, Ontario",
      description:
        "Developed a virtual reality application allowing users to see themselves in third person.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-the-north.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
      links: [
        {
          title: "Streamer Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/justinmichaud/htn2017",
        },
        {
          title: "Client Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/dillionverma/RTSPClient",
        },
      ],
    },
    {
      title: "Hack The 6ix",
      dates: "August 26th - 27th, 2017",
      location: "Toronto, Ontario",
      description:
        "Developed an open platform for people shipping items to same place to combine shipping costs and save money.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-the-6ix.jpg",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/ShareShip/ShareShip",
        },
        {
          title: "Site",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://share-ship.herokuapp.com/",
        },
      ],
    },
    {
      title: "Stupid Hack Toronto",
      dates: "July 23rd, 2017",
      location: "Toronto, Ontario",
      description:
        "Developed a chrome extension which tracks which facebook profiles you have visited and immediately texts your girlfriend if you visited another girls page.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/stupid-hackathon.png",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/nsagirlfriend/nsagirlfriend",
        },
      ],
    },
    {
      title: "Global AI Hackathon - Toronto",
      dates: "June 23rd - 25th, 2017",
      location: "Toronto, Ontario",
      description:
        "Developed a python library which can be imported to any python game and change difficulty of the game based on real time emotion of player. Uses OpenCV and webcam for facial recognition, and a custom Machine Learning Model trained on a [Kaggle Emotion Dataset](https://www.kaggle.com/c/challenges-in-representation-learning-facial-expression-recognition-challenge/leaderboard) using [Tensorflow](https://www.tensorflow.org/Tensorflow) and [Keras](https://keras.io/). This project recieved 1st place prize at the Global AI Hackathon - Toronto and was also invited to demo at [NextAI Canada](https://www.nextcanada.com/next-ai).",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/global-ai-hackathon.jpg",
      win: "1st Place Winner",
      links: [
        {
          title: "Article",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://syncedreview.com/2017/06/26/global-ai-hackathon-in-toronto/",
        },
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/TinySamosas/",
        },
      ],
    },
    {
      title: "McGill AI for Social Innovation Hackathon",
      dates: "June 17th - 18th, 2017",
      location: "Montreal, Quebec",
      description:
        "Developed realtime facial microexpression analyzer using AI",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/ai-for-social-good.jpg",
      links: [],
    },
    {
      title: "Open Source Circular Economy Days Hackathon",
      dates: "June 10th, 2017",
      location: "Toronto, Ontario",
      description:
        "Developed a custom admin interface for food waste startup <a href='http://genecis.co/'>Genecis</a> to manage their data and provide analytics.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/open-source-circular-economy-days.jpg",
      win: "1st Place Winner",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/dillionverma/genecis",
        },
      ],
    },
    {
      title: "Make School's Student App Competition 2017",
      dates: "May 19th - 21st, 2017",
      location: "International",
      description: "Improved PocketDoc and submitted to online competition",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/make-school-hackathon.png",
      win: "Top 10 Finalist | Honourable Mention",
      links: [
        {
          title: "Medium Article",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://medium.com/make-school/the-winners-of-make-schools-student-app-competition-2017-a6b0e72f190a",
        },
        {
          title: "Devpost",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://devpost.com/software/pocketdoc-react-native",
        },
        {
          title: "YouTube",
          icon: <Icons.youtube className="h-4 w-4" />,
          href: "https://www.youtube.com/watch?v=XwFdn5Rmx68",
        },
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/dillionverma/pocketdoc-react-native",
        },
      ],
    },
    {
      title: "HackMining",
      dates: "May 12th - 14th, 2017",
      location: "Toronto, Ontario",
      description: "Developed neural network to optimize a mining process",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-mining.png",
      links: [],
    },
    {
      title: "Waterloo Equithon",
      dates: "May 5th - 7th, 2017",
      location: "Waterloo, Ontario",
      description:
        "Developed Pocketdoc, an app in which you take a picture of a physical wound, and the app returns common solutions or cures to the injuries or diseases.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/waterloo-equithon.png",
      links: [
        {
          title: "Devpost",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://devpost.com/software/pocketdoc-react-native",
        },
        {
          title: "YouTube",
          icon: <Icons.youtube className="h-4 w-4" />,
          href: "https://www.youtube.com/watch?v=XwFdn5Rmx68",
        },
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/dillionverma/pocketdoc-react-native",
        },
      ],
    },
    {
      title: "SpaceApps Waterloo",
      dates: "April 28th - 30th, 2017",
      location: "Waterloo, Ontario",
      description:
        "Developed Earthwatch, a web application which allows users in a plane to virtually see important points of interest about the world below them. They can even choose to fly away from their route and then fly back if they choose. Special thanks to CesiumJS for providing open source world and plane models.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/space-apps.png",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/dillionverma/earthwatch",
        },
      ],
    },
    {
      title: "MHacks 9",
      dates: "March 24th - 26th, 2017",
      location: "Ann Arbor, Michigan",
      description:
        "Developed Super Graphic Air Traffic, a VR website made to introduce people to the world of air traffic controlling. This project was built completely using THREE.js as well as a node backend server.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/mhacks-9.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/dillionverma/threejs-planes",
        },
      ],
    },
    {
      title: "StartHacks I",
      dates: "March 4th - 5th, 2017",
      location: "Waterloo, Ontario",
      description:
        "Developed at StartHacks 2017, Recipic is a mobile app which allows you to take pictures of ingredients around your house, and it will recognize those ingredients using ClarifAI image recognition API and return possible recipes to make. Recipic recieved 1st place at the hackathon for best pitch and hack.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/starthacks.png",
      win: "1st Place Winner",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
      links: [
        {
          title: "Source (Mobile)",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/mattBlackDesign/recipic-ionic",
        },
        {
          title: "Source (Server)",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/mattBlackDesign/recipic-rails",
        },
      ],
    },
    {
      title: "QHacks II",
      dates: "February 3rd - 5th, 2017",
      location: "Kingston, Ontario",
      description:
        "Developed a mobile game which enables city-wide manhunt with random lobbies",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/qhacks.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
      links: [
        {
          title: "Source (Mobile)",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/dillionverma/human-huntr-react-native",
        },
        {
          title: "Source (API)",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/mattBlackDesign/human-huntr-rails",
        },
      ],
    },
    {
      title: "Terrible Hacks V",
      dates: "November 26th, 2016",
      location: "Waterloo, Ontario",
      description:
        "Developed a mock of Windows 11 with interesting notifications and functionality",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/terrible-hacks-v.png",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/justinmichaud/TerribleHacks2016-Windows11",
        },
      ],
    },
    {
      title: "Portal Hackathon",
      dates: "October 29, 2016",
      location: "Kingston, Ontario",
      description:
        "Developed an internal widget for uploading assignments using Waterloo's portal app",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/portal-hackathon.png",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/UWPortalSDK/crowmark",
        },
      ],
    },
  ],
} as const;
