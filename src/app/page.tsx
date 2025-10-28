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
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 sm:space-y-6">
          <div className="hero-parallax pb-6 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <BlurFade staggerIndex={0}>
                <Avatar className="size-14 border hero-avatar">
                  <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                  <AvatarFallback>{DATA.initials}</AvatarFallback>
                </Avatar>
              </BlurFade>
              <div>
                <BlurFade staggerIndex={1}>
                  <h1 className="type-h1 text-balance hero-name">{DATA.name.split("(")[0].trim()}</h1>
                </BlurFade>
              </div>
            </div>
            <div className="mt-2">
              <BlurFade staggerIndex={2}>
                <Markdown className="prose-sm max-w-[64ch] text-slate-600 dark:text-slate-400 text-pretty font-sans dark:prose-invert hero-summary [&>p]:mb-3 [&>p:last-child]:mb-0">
                  {DATA.summary}
                </Markdown>
              </BlurFade>
            </div>
          </div>
          <div>
            <Section title="Currently Building">
              <div className="flex min-h-0 flex-col gap-y-3">
                {(() => {
                  const priority = ["Launch Fast", "Second Brain", "LegacyX", "HB Goodies"];
                  const ordered = [...DATA.work]
                    .filter((w) => w.company !== "Hire Flow")
                    .sort((a, b) => priority.indexOf(a.company) - priority.indexOf(b.company));
                  return ordered;
                })().map((work, id) => (
                  <BlurFade key={work.company} delay={BLUR_FADE_DELAY * 2 + id * 0.05} staggerIndex={id}>
                    <ListRow
                      title={work.company}
                      description={work.description}
                      href={work.href}
                      image={work.logoUrl}
                      bareImage={true}
                      ctaLabel={
                        work.company === "Launch Fast"
                          ? "Sign up"
                          : work.company === "Second Brain"
                          ? "Book Demo"
                          : "Learn more"
                      }
                    />
                  </BlurFade>
                ))}
              </div>
              <BlurFade delay={BLUR_FADE_DELAY * 2.5}>
                <p className="mt-6 text-sm text-slate-600 dark:text-slate-400">
                  Follow my builds on X → <Link href="https://x.com/automatingwork" className="text-blue-500 hover:underline">@automatingwork</Link>
                </p>
              </BlurFade>
            </Section>
            
            {DATA.education && DATA.education.length > 0 && (
              <Section title="Education" className="mt-8">
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
            <Section title="Recent Builds" className="mt-8">
              <div className="space-y-8">
                <BlurFade delay={BLUR_FADE_DELAY * 5}>
                  <p className="text-sm text-zinc-600">Production software I've shipped.</p>
                </BlurFade>
                <BlurFade delay={BLUR_FADE_DELAY * 6}>
                  {(() => {
                    const keep = [
                      "launch fast mcp server",
                      "launch fast chrome extension",
                      "notion changelog agent",
                      "discord ticket tool",
                      "kijiji post automation",
                      "njoyn navigator",
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
            <Section title="Playbooks & Insights" className="mt-8">
              <div className="space-y-6">
                <BlurFade delay={BLUR_FADE_DELAY * 5}>
                  <p className="text-sm text-zinc-600">Sharing what actually works when building SaaS with AI</p>
                </BlurFade>
                <div className="grid grid-cols-1 gap-4">
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
                  href="https://x.com/automatingwork/status/1941521710374670658"
                  content="Most founders waste weeks building products nobody wants. So I made this video showing my exact method to validate SaaS ideas in hours"
                  authorName="Hasaam Bhatti"
                  authorHandle="automatingwork"
                  avatar="/Headshot.png"
                  media="/vid 2.png"
                  video="https://video.twimg.com/amplify_video/1941521534700474368/vid/avc1/3538x2160/FQ0Fea1Kjt4uvBJD.mp4?tag=21"
                />
                </div>
              </div>
            </Section>
            <Section title="Tools I Build With" className="mt-8">
              <div className="space-y-6">
                <BlurFade delay={BLUR_FADE_DELAY * 6}>
                  <p className="text-sm text-zinc-600">Tools I use to ship AI products fast</p>
                </BlurFade>
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
            <Section className="mt-8 pb-24">
              <div className="grid items-center justify-center gap-6 px-0 text-center w-full">
                <BlurFade delay={BLUR_FADE_DELAY * 8}>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">Let&apos;s Build Together</h3>
                    <button
                      onClick={() => setIsCalOpen(true)}
                      disabled={!isCalLoaded}
                      className={cn(
                        "inline-flex h-9 items-center justify-center rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-6 text-sm font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors",
                        !isCalLoaded && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      Book a call
                    </button>
                  </div>
                </BlurFade>
                <BlurFade delay={BLUR_FADE_DELAY * 9}>
                  <p className="text-sm text-muted-foreground">
                    Prefer to message?{" "}
                    <Link href={DATA.contact.social.X.url} className="text-blue-500 hover:underline">
                      Reach out on X
                    </Link>
                  </p>
                </BlurFade>
              </div>
            </Section>

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
                    <div className="relative w-full max-w-[900px] h-[85vh] sm:h-[600px] bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden">
                      <h2 id="cal-modal-title" className="sr-only">Schedule a call</h2>

                      {/* Close button */}
                      <button
                        onClick={() => setIsCalOpen(false)}
                        className="absolute top-2 right-2 z-10 p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        aria-label="Close"
                      >
                        <svg className="w-4 h-4 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          </div>
        </div>
      </div>
      <Navbar onCalendarClick={() => setIsCalOpen(true)} />
    </main>
  );
}
 
