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
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/navbar";
import { cn } from "@/lib/utils";

const BLUR_FADE_DELAY = 0.04;

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
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:border focus:rounded-md">
        Skip to content
      </a>
      <div id="main-content" className="mx-auto w-full max-w-2xl px-4 sm:px-6">
        <div>
          {/* Hero */}
          <div className="pt-12 pb-12">
            <BlurFade staggerIndex={0}>
              <Avatar className="size-16 border">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
            <BlurFade staggerIndex={1}>
              <h1 className="mt-4 text-[14px] font-medium text-foreground">
                {`${DATA.name.split("(")[0].trim()} - AI Engineer & Founder`}
              </h1>
              <p className="mt-1 text-[12.8px] text-muted-foreground">
                Builder · Founder
              </p>
            </BlurFade>
            <BlurFade staggerIndex={2}>
              <p className="mt-3 text-[12.8px] text-muted-foreground max-w-lg leading-relaxed">
                I build AI-powered tools for e-commerce and SaaS. Founder of Launch Fast, Head of Product at LegacyX, and running multiple Amazon brands through HB Goodies.
              </p>
            </BlurFade>
            <BlurFade staggerIndex={3}>
              <nav aria-label="Section navigation" className="mt-4 flex flex-wrap gap-2">
                <Link href="#currently-building" className="rounded border border-border px-2 py-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground">
                  Currently Building
                </Link>
                <Link href="#recent-builds" className="rounded border border-border px-2 py-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground">
                  Recent Builds
                </Link>
                <Link href="#insights" className="rounded border border-border px-2 py-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground">
                  Insights
                </Link>
                <Link href="#toolstack" className="rounded border border-border px-2 py-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground">
                  Toolstack
                </Link>
                <Link href="#contact" className="rounded border border-border px-2 py-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground">
                  Contact
                </Link>
              </nav>
            </BlurFade>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            <Section id="currently-building" title="Currently Building">
              <div className="flex flex-col gap-y-4">
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
                        {work.company}
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
            <Section id="recent-builds" title="Recent Builds">
              <div className="space-y-4">
                <BlurFade delay={BLUR_FADE_DELAY * 5}>
                  <p className="text-[12.8px] text-muted-foreground">Production software I've shipped.</p>
                </BlurFade>
                <BlurFade delay={BLUR_FADE_DELAY * 6}>
                  {(() => {
                    const keep = [
                      "launchie",
                      "leo",
                      "pr monitor",
                      "launch fast mcp server",
                      "launch fast chrome extension",
                      "notion changelog agent",
                      "discord ticket tool",
                      "kijiji post automation",
                      "leaderboard kit",
                      "market intelligence",
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
                              links={p.links}
                            />
                          </BlurFade>
                        ))}
                      </ul>
                    );
                  })()}
                </BlurFade>
              </div>
            </Section>
            <Section id="insights" title="Playbooks & Insights">
              <div className="space-y-4">
                <BlurFade delay={BLUR_FADE_DELAY * 5}>
                  <p className="text-[12.8px] text-muted-foreground">Sharing what actually works when building SaaS with AI</p>
                </BlurFade>
                <div className="grid grid-cols-1 gap-4">
                  {DATA.tweets.map((tweet, idx) => (
                    <TweetCard
                      key={tweet.href}
                      href={tweet.href}
                      content={tweet.content}
                      authorName={DATA.name.split("(")[0].trim()}
                      authorHandle="automatingwork"
                      avatar={DATA.avatarUrl}
                      media={tweet.media}
                      video={tweet.video}
                    />
                  ))}
                </div>
              </div>
            </Section>
            <Section id="toolstack" title="Tools I Build With">
              <div className="space-y-4">
                <BlurFade delay={BLUR_FADE_DELAY * 6}>
                  <p className="text-[12.8px] text-muted-foreground">Tools I use to ship AI products fast</p>
                </BlurFade>
                <BlurFade delay={BLUR_FADE_DELAY * 7}>
                  <Marquee pauseOnHover className="[--duration:40s] [--gap:2rem] sm:[--gap:3rem]" repeat={3}>
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
            <Section id="contact" className="pb-24">
              <div className="grid items-center justify-center gap-6 px-0 text-center w-full">
                <BlurFade delay={BLUR_FADE_DELAY * 8}>
                  <div className="space-y-3">
                    <h3 className="text-[14px] font-medium">Let&apos;s Build Together</h3>
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
                    Prefer to message?{" "}
                    <Link href={DATA.contact.social.X.url} className="text-primary hover:underline">
                      Reach out on X
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
      <Navbar onCalendarClick={() => setIsCalOpen(true)} />
    </main>
  );
}
 
