"use client";

import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
// import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Marquee } from "@/components/magicui/marquee";
import Image from "next/image";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import { Section } from "@/components/section";
import { ListRow } from "@/components/list-row";
import { TweetCard } from "@/components/magicui/tweet-card";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

const BLUR_FADE_DELAY = 0.04;

// Inline company link with hover animation - industry-level optimizations
function CompanyLink({ name, href, logo }: { name: string; href: string; logo: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    // Cancel any pending leave timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    // Cancel any pending RAF
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    // Use RAF for smoother state update aligned with browser paint
    rafRef.current = requestAnimationFrame(() => {
      setIsHovered(true);
    });
  };

  const handleMouseLeave = () => {
    // Debounce leave with 150ms delay to prevent flicker
    timeoutRef.current = setTimeout(() => {
      rafRef.current = requestAnimationFrame(() => {
        setIsHovered(false);
      });
    }, 150);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <Link
      href={href}
      className="inline items-baseline"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Logo container - GPU-accelerated with will-change and transform */}
      <span
        className="inline-flex items-center justify-center overflow-hidden align-middle"
        style={{
          height: '1em',
          verticalAlign: '-0.15em',
          width: isHovered ? '18px' : '0px',
          marginRight: isHovered ? '2px' : '0px',
          transition: 'width 250ms cubic-bezier(0.4, 0, 0.2, 1), margin 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'width, margin',
          contain: 'layout style',
        }}
      >
        <Image
          src={logo}
          alt={name}
          width={14}
          height={14}
          className="rounded-[3px] shrink-0"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'scale(1)' : 'scale(0.8)',
            transition: 'opacity 200ms ease-out, transform 200ms ease-out',
            willChange: 'opacity, transform',
          }}
        />
      </span>
      {/* Text with background pill - GPU composited */}
      <span
        className="relative font-medium"
        style={{
          color: isHovered ? 'hsl(var(--primary))' : 'hsl(var(--foreground))',
          transition: 'color 200ms ease-out',
        }}
      >
        {/* Background pill - GPU-accelerated opacity */}
        <span
          className="absolute -inset-x-1.5 -inset-y-0.5 rounded-md -z-10"
          style={{
            backgroundColor: 'hsl(var(--primary) / 0.1)',
            opacity: isHovered ? 1 : 0,
            transform: 'translateZ(0)', // Force GPU layer
            transition: 'opacity 200ms ease-out',
            willChange: 'opacity',
            pointerEvents: 'none',
          }}
        />
        {name}
      </span>
    </Link>
  );
}

export default function Page() {
  const [isCalOpen, setIsCalOpen] = useState(false);
  const [isCalLoaded, setIsCalLoaded] = useState(false);

  useEffect(() => {
    // Preload Cal.com immediately on mount
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        styles: { branding: { brandColor: "#3b82f6" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
      setIsCalLoaded(true);
    })();
  }, []);

  // ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCalOpen(false);
    };
    if (isCalOpen) {
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [isCalOpen]);

  return (
    <main className="min-h-[100dvh]">
      <div className="mx-auto w-full max-w-2xl px-5 sm:px-6">
        <div>
          {/* Hero - Apple-style tight grouping */}
          <div className="pt-8 sm:pt-12 pb-6 sm:pb-8">
            {/* Header row with avatar, name and theme toggle */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <BlurFade staggerIndex={0}>
                  <Avatar className="size-14 sm:size-16 border">
                    <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                    <AvatarFallback>{DATA.initials}</AvatarFallback>
                  </Avatar>
                </BlurFade>
                <BlurFade staggerIndex={1}>
                  <div>
                    <h1 className="text-[14px] font-medium text-foreground">
                      {DATA.name.split("(")[0].trim()}
                    </h1>
                    <p className="mt-0.5 text-[12.8px] text-muted-foreground italic">
                      Builder | Internet Raised
                    </p>
                  </div>
                </BlurFade>
              </div>
              <BlurFade staggerIndex={1}>
                <ModeToggle />
              </BlurFade>
            </div>

            <BlurFade staggerIndex={2}>
              <div className="mt-4 text-[12.8px] text-muted-foreground max-w-[65ch] leading-relaxed space-y-3">
                <p>I write code and sell things on the internet. Right now I'm building <CompanyLink name="Launch Fast" href="https://launchfastlegacyx.com/" logo="/launchfast-logo.jpg" /> — product research for Amazon sellers who'd rather not guess.</p>
                <p>I've been starting things online for about a decade. Crypto, e-commerce, now physical products on Amazon. At <CompanyLink name="LegacyX" href="https://legacyxfba.com/" logo="/legacyx.png" />, I build the AI tools behind their FBA coaching program. <CompanyLink name="HB Goodies" href="https://hbgoodies.com/" logo="/zensweat.png" /> is my own portfolio of Amazon brands.</p>
                <p>Lately I write more code with AI than without it. Agents, MCP servers, CLI tools. Most of what's on this page was built that way.</p>
              </div>
            </BlurFade>

            {/* Social icons row */}
            <BlurFade staggerIndex={3}>
              <div className="flex items-center gap-2 mt-4">
                <Link
                  href={DATA.contact.social.X.url}
                  className="inline-flex items-center justify-center h-8 px-3 rounded-full border border-border/40 text-[12px] font-medium text-foreground hover:bg-accent/50 transition-colors gap-1.5"
                >
                  <Icons.x className="size-3" />
                  <span>Twitter</span>
                </Link>
                <Link
                  href={DATA.contact.social.LinkedIn.url}
                  className="inline-flex items-center justify-center h-8 px-3 rounded-full border border-border/40 text-[12px] font-medium text-foreground hover:bg-accent/50 transition-colors gap-1.5"
                >
                  <Icons.linkedin className="size-3" />
                  <span>LinkedIn</span>
                </Link>
                <Link
                  href={DATA.contact.social.GitHub.url}
                  className="inline-flex items-center justify-center h-8 px-3 rounded-full border border-border/40 text-[12px] font-medium text-foreground hover:bg-accent/50 transition-colors gap-1.5"
                >
                  <Icons.github className="size-3" />
                  <span>GitHub</span>
                </Link>
                <Link
                  href={DATA.contact.social.Email.url}
                  className="inline-flex items-center justify-center h-8 px-3 rounded-full border border-border/40 text-[12px] font-medium text-foreground hover:bg-accent/50 transition-colors gap-1.5"
                >
                  <Icons.email className="size-3" />
                  <span>Mail</span>
                </Link>
              </div>
            </BlurFade>
          </div>

          {/* Sections - Apple-style: big gaps between, tight inside */}
          <div className="space-y-10 sm:space-y-12">
            <Section title="Currently Building">
              <div className="flex flex-col gap-y-3">
                {(() => {
                  const priority = ["Launch Fast", "LegacyX", "HB Goodies"];
                  const ordered = [...DATA.work]
                    .filter((w) => w.company !== "Hire Flow" && w.company !== "Second Brain")
                    .sort((a, b) => priority.indexOf(a.company) - priority.indexOf(b.company));
                  return ordered;
                })().map((work, id) => (
                  <BlurFade key={work.company} delay={BLUR_FADE_DELAY * 2 + id * 0.05} staggerIndex={id}>
                    <Link href={work.href} className="group block">
                      <div className="text-[12.8px] font-medium text-foreground group-hover:text-primary transition-colors">
                        {work.company} <span className="text-muted-foreground font-normal">| {work.title.replace("Head of Product Development", "Head of Product")}</span>
                      </div>
                      <div className="text-[12.8px] text-muted-foreground mt-1">
                        {work.description}
                      </div>
                    </Link>
                  </BlurFade>
                ))}
              </div>
            </Section>
            
            {DATA.education && DATA.education.length > 0 && (
              <Section title="Education">
                <div className="flex min-h-0 flex-col gap-y-3">
                  {DATA.education.map((education, id) => (
                    <BlurFade key={education.school} delay={BLUR_FADE_DELAY * 3 + id * 0.05} staggerIndex={id}>
                      <ListRow
                        title={education.school}
                        subtitle={education.degree}
                        meta={`${education.start} - ${education.end}`}
                        href={education.href}
                        image={education.logoUrl}
                      />
                    </BlurFade>
                  ))}
                </div>
              </Section>
            )}
            <Section title="Recent Builds">
              <div className="space-y-3">
                <BlurFade delay={BLUR_FADE_DELAY * 5}>
                  <p className="text-[12.8px] text-muted-foreground">Software I built and people actually use.</p>
                </BlurFade>
                <BlurFade delay={BLUR_FADE_DELAY * 6}>
                  {(() => {
                    const keep = [
                      "launch fast chrome extension",
                      "launch fast mcp server",
                      "leo",
                      "launchie",
                      "pr monitor",
                      "notion changelog agent",
                      "kijiji post automation",
                    ];
                    const selected = DATA.projects
                      .filter((p) => keep.some((k) => p.title.toLowerCase().includes(k)))
                      .sort(
                        (a, b) =>
                          keep.findIndex((k) => a.title.toLowerCase().includes(k)) -
                          keep.findIndex((k) => b.title.toLowerCase().includes(k))
                      );
                    return (
                      <ul className="mb-4 ml-4 divide-y divide-dashed">
                        {selected.map((p, id) => (
                          <BlurFade key={`proj-${p.title}-${p.dates}`} delay={BLUR_FADE_DELAY * 7 + id * 0.05} staggerIndex={id}>
                            <HackathonCard
                              title={p.title}
                              description={p.description}
                              dates={""}
                              location=""
                              image={p.image}
                              href={p.href}
                              links={p.links as any}
                            />
                          </BlurFade>
                        ))}
                      </ul>
                    );
                  })()}
                </BlurFade>
              </div>
            </Section>
            <Section title="Playbooks & Insights">
              <div className="space-y-3">
                <BlurFade delay={BLUR_FADE_DELAY * 5}>
                  <p className="text-[12.8px] text-muted-foreground">Notes from building SaaS with AI tools</p>
                </BlurFade>
                <div className="grid grid-cols-1 gap-3">
                <TweetCard
                  href="https://x.com/automatingwork/status/1931189077732192523"
                  content="Transform your vibe marketing research by retaining deep insights across multiple chat sessions and LLMs using Pinecone vector indexes 🧠"
                  authorName="Hasaam Bhatti"
                  authorHandle="automatingwork"
                  avatar="/Headshot.png"
                  media="/vid 1.png"
                  video="https://video.twimg.com/amplify_video/1931188967434579968/vid/avc1/1880x1080/uiUsUQREhO_lQKFi.mp4?tag=21"
                />
                <TweetCard
                  href="https://x.com/i/status/1986870530406850648"
                  content="Custom commands in Cursor are a game-changer. After 12 months building Launch Fast, I created workflows like /commit-feature and /setup-feature that handle entire processes—from simple automation to agent mode delegation."
                  authorName="Hasaam Bhatti"
                  authorHandle="automatingwork"
                  avatar="/Headshot.png"
                  media="/vid 2.png"
                  video="https://video.twimg.com/amplify_video/1986870141225668608/vid/avc1/3840x2160/OofRMeKkEd5IM0cT.mp4?tag=21"
                />
                </div>
              </div>
            </Section>
            <Section title="Tools I Build With">
              <div className="space-y-3">
                <BlurFade delay={BLUR_FADE_DELAY * 7}>
                  <Marquee pauseOnHover className="[--duration:40s] [--gap:2rem] sm:[--gap:3rem]" repeat={6}>
                    <Image src="/Marquee/Cursor.png" alt="Cursor" width={32} height={32} className="hover:scale-110 transition-all sm:w-10 sm:h-10" />
                    <Image src="/Marquee/Claude.png" alt="Claude" width={32} height={32} className="hover:scale-110 transition-all sm:w-10 sm:h-10" />
                    <Image src="/Marquee/v0.png" alt="v0" width={32} height={32} className="hover:scale-110 transition-all sm:w-10 sm:h-10" />
                    <Image src="/Marquee/n8n.png" alt="n8n" width={32} height={32} className="hover:scale-110 transition-all sm:w-10 sm:h-10" />
                    <Image src="/Marquee/ChatGPT.png" alt="ChatGPT" width={32} height={32} className="hover:scale-110 transition-all sm:w-10 sm:h-10" />
                    <Image src="/Marquee/next.png" alt="Next.js" width={32} height={32} className="hover:scale-110 transition-all sm:w-10 sm:h-10" />
                    <Image src="/Marquee/python.png" alt="Python" width={32} height={32} className="hover:scale-110 transition-all sm:w-10 sm:h-10" />
                    <Image src="/Marquee/javascript.png" alt="JavaScript" width={32} height={32} className="hover:scale-110 transition-all sm:w-10 sm:h-10" />
                    <Image src="/Marquee/railways.png" alt="Railway" width={32} height={32} className="hover:scale-110 transition-all sm:w-10 sm:h-10" />
                    <Image src="/Marquee/Notion.png" alt="Notion" width={32} height={32} className="hover:scale-110 transition-all sm:w-10 sm:h-10" />
                    <Image src="/Marquee/clickup.png" alt="ClickUp" width={32} height={32} className="hover:scale-110 transition-all sm:w-10 sm:h-10" />
                  </Marquee>
                </BlurFade>
              </div>
            </Section>
            <Section className="pb-12">
              <div className="grid items-center justify-center gap-4 px-0 text-center w-full">
                <BlurFade delay={BLUR_FADE_DELAY * 8}>
                  <div className="space-y-2">
                    <h3 className="text-[14px] font-medium">Got something to build?</h3>
                    <button
                      onClick={() => setIsCalOpen(true)}
                      disabled={!isCalLoaded}
                      className={cn(
                        "inline-flex h-8 items-center justify-center rounded-md border border-border bg-card px-4 text-[12.8px] font-medium text-foreground hover:bg-accent transition-colors",
                        !isCalLoaded && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      Book a call
                    </button>
                  </div>
                </BlurFade>
                <BlurFade delay={BLUR_FADE_DELAY * 9}>
                  <p className="text-[12.8px] text-muted-foreground">
                    Or just{" "}
                    <Link href={DATA.contact.social.X.url} className="text-primary hover:underline">
                      DM me on X
                    </Link>
                  </p>
                </BlurFade>
              </div>
            </Section>
          </div>
        </div>
      </div>

      {/* Cal.com Modal */}
      <AnimatePresence>
        {isCalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCalOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.25 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={(e) => {
                if (e.target === e.currentTarget) setIsCalOpen(false);
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="cal-modal-title"
            >
              <div className="relative w-full max-w-[900px] h-[85vh] sm:h-[600px] bg-card rounded-xl shadow-2xl overflow-hidden">
                <h2 id="cal-modal-title" className="sr-only">Schedule a call</h2>

                {/* Close button */}
                <button
                  onClick={() => setIsCalOpen(false)}
                  className="absolute top-2 right-2 z-10 p-2 rounded-md hover:bg-accent transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Cal embed */}
                <Cal
                  calLink="hasaam/30min"
                  style={{ width: "100%", height: "100%" }}
                  config={{
                    layout: "month_view",
                    theme: "auto"
                  }}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
 
