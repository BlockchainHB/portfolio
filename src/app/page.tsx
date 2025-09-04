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

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="min-h-[100dvh]">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 sm:space-y-6">
          <div className="hero-parallax">
            <div className="flex items-center gap-3">
              <BlurFade staggerIndex={0}>
                <Avatar className="size-12 border hero-avatar">
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
            <div className="mt-2 sm:mt-3 mb-4 border-t border-slate-200 dark:border-slate-700" />
            <Section title="Building">
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
                      bareImage={work.company === "HB Goodies" || work.company === "Second Brain"}
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
            <Section title="I Build & Ship Fast" className="mt-8">
              <div className="space-y-6">
                <BlurFade delay={BLUR_FADE_DELAY * 5}>
                  <p className="text-sm text-zinc-600">A compact set of recent projects.</p>
                </BlurFade>
                <BlurFade delay={BLUR_FADE_DELAY * 6}>
                  {(() => {
                    const keep = [
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
            <Section title="Startup Tools & Tactics" className="mt-8">
              <div className="space-y-6">
                <BlurFade delay={BLUR_FADE_DELAY * 5}>
                  <p className="text-sm text-zinc-600">Sharing what works for building profitable SaaS products</p>
                </BlurFade>
                <div className="grid grid-cols-1 gap-4">
                <TweetCard
                  href="https://x.com/automatingwork/status/1931189077732192523"
                  content="Transform your vibe marketing research by retaining deep insights across multiple chat sessions and LLMs using Pinecone vector indexes 🧠"
                  authorName="Hasaam Bhatti"
                  authorHandle="automatingwork"
                  avatar="/me.jpg"
                  media="/vid 1.png"
                  video="https://video.twimg.com/amplify_video/1931188967434579968/vid/avc1/1880x1080/uiUsUQREhO_lQKFi.mp4?tag=21"
                />
                <TweetCard
                  href="https://x.com/automatingwork/status/1941521710374670658"
                  content="Most founders waste weeks building products nobody wants. So I made this video showing my exact method to validate SaaS ideas in hours"
                  authorName="Hasaam Bhatti"
                  authorHandle="automatingwork"
                  avatar="/me.jpg"
                  media="/vid 2.png"
                  video="https://video.twimg.com/amplify_video/1941521534700474368/vid/avc1/3538x2160/FQ0Fea1Kjt4uvBJD.mp4?tag=21"
                />
                </div>
              </div>
            </Section>
            <Section title="My Stack" className="mt-8">
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
              <div className="grid items-center justify-center gap-4 px-0 text-center w-full">
                <BlurFade delay={BLUR_FADE_DELAY * 8}>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">Get in Touch</h3>
                    <p className="mx-auto max-w-[600px] text-muted-foreground md:text-base/relaxed">
                      Ready to build something amazing? Let&apos;s discuss your next AI project.{" "}
                      <Link href={DATA.contact.social.X.url} className="text-blue-500 hover:underline">Drop me a message on X</Link>{" "}
                      and let&apos;s make it happen.
                    </p>
                  </div>
                </BlurFade>
              </div>
            </Section>
          </div>
        </div>
      </div>
    </main>
  );
}
 
