import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
// import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Marquee } from "@/components/magicui/marquee";
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
        <div className="space-y-10">
          <div>
            <div className="flex items-center gap-3">
              <Avatar className="size-12 border">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="type-h1 text-balance">{DATA.name.split("(")[0].trim()}</h1>
              </div>
            </div>
            <div className="mt-2">
              <Markdown className="prose-sm max-w-[64ch] text-slate-600 text-pretty font-sans dark:prose-invert">
                {DATA.summary}
              </Markdown>
            </div>
          </div>
          <div>
            <div className="mt-6 sm:mt-8 mb-4 border-t border-slate-200" />
            <Section title="Building">
              <div className="flex min-h-0 flex-col gap-y-3">
                {[...DATA.work].filter((w) => w.company !== "Hire Flow").map((work, id) => (
                  <BlurFade key={work.company} delay={BLUR_FADE_DELAY * 2 + id * 0.05}>
                    <ListRow
                      title={work.company}
                      description={work.description}
                      href={work.href}
                      image={work.logoUrl}
                      bareImage={work.company === "HB Goodies" || work.company === "Second Brain"}
                      ctaLabel={work.company === "Launch Fast" ? "Sign up" : "Learn more"}
                    />
                  </BlurFade>
                ))}
              </div>
            </Section>
            
            {DATA.education && DATA.education.length > 0 && (
              <Section title="Education" className="mt-10 sm:mt-12">
                <div className="flex min-h-0 flex-col gap-y-3">
                  {DATA.education.map((education, id) => (
                    <BlurFade key={education.school} delay={BLUR_FADE_DELAY * 3 + id * 0.05}>
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
            <Section title="I Build & Ship Fast" className="mt-10 sm:mt-12">
              <div className="space-y-6">
                <BlurFade delay={BLUR_FADE_DELAY * 5}>
                  <p className="text-sm text-zinc-600">A compact set of recent projects.</p>
                </BlurFade>
                <BlurFade delay={BLUR_FADE_DELAY * 6}>
                  {(() => {
                    const keep = [
                      "launch fast chrome extension",
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
                      <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
                        {selected.map((p, id) => (
                          <BlurFade key={`proj-${p.title}-${p.dates}`} delay={BLUR_FADE_DELAY * 7 + id * 0.05}>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TweetCard
                  href="https://x.com/automatingwork/status/1931189077732192523"
                  content="Transform your vibe marketing research by retaining deep insights across multiple chat sessions and LLMs using Pinecone vector indexes 🧠"
                  authorName="Hasaam Bhatti"
                  authorHandle="automatingwork"
                  avatar="/me.jpeg"
                  media="/vid 1.png"
                  video="https://video.twimg.com/amplify_video/1931188967434579968/vid/avc1/1880x1080/uiUsUQREhO_lQKFi.mp4?tag=21"
                />
                <TweetCard
                  href="https://x.com/automatingwork/status/1941521710374670658"
                  content="Most founders waste weeks building products nobody wants. So I made this video showing my exact method to validate SaaS ideas in hours"
                  authorName="Hasaam Bhatti"
                  authorHandle="automatingwork"
                  avatar="/me.jpeg"
                  media="/vid 2.png"
                  video="https://video.twimg.com/amplify_video/1941521534700474368/vid/avc1/3538x2160/FQ0Fea1Kjt4uvBJD.mp4?tag=21"
                />
                </div>
              </div>
            </Section>
            <Section title="My Stack" className="mt-10 sm:mt-12">
              <div className="space-y-6">
                <BlurFade delay={BLUR_FADE_DELAY * 6}>
                  <p className="text-sm text-zinc-600">Tools I use to ship AI products fast</p>
                </BlurFade>
                <BlurFade delay={BLUR_FADE_DELAY * 7}>
                  <Marquee pauseOnHover className="[--duration:40s]">
                    <Badge variant="secondary">Cursor</Badge>
                    <Badge variant="secondary">Claude Code</Badge>
                    <Badge variant="secondary">v0</Badge>
                    <Badge variant="secondary">n8n</Badge>
                    <Badge variant="secondary">Make</Badge>
                    <Badge variant="secondary">Zapier</Badge>
                    <Badge variant="secondary">OpenAI</Badge>
                    <Badge variant="secondary">Anthropic</Badge>
                    <Badge variant="secondary">Perplexity API</Badge>
                    <Badge variant="secondary">Pinecone</Badge>
                    <Badge variant="secondary">Supabase</Badge>
                    <Badge variant="secondary">Weaviate</Badge>
                    <Badge variant="secondary">Vercel</Badge>
                    <Badge variant="secondary">Railway</Badge>
                    <Badge variant="secondary">Posthog</Badge>
                    <Badge variant="secondary">Notion</Badge>
                    <Badge variant="secondary">ClickUp</Badge>
                    <Badge variant="secondary">Linear</Badge>
                  </Marquee>
                </BlurFade>
              </div>
            </Section>
            <Section title="Contact" className="mt-10 sm:mt-12">
              <div className="grid items-center justify-center gap-4 px-0 text-center w-full">
                <BlurFade delay={BLUR_FADE_DELAY * 8}>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">Get in Touch</h3>
                    <p className="mx-auto max-w-[600px] text-muted-foreground md:text-base/relaxed">
                      Want to chat? Just shoot me a dm{" "}
                      <Link href={DATA.contact.social.X.url} className="text-blue-500 hover:underline">with a direct question on twitter</Link>{" "}
                      and I&apos;ll respond whenever I can. I will ignore all soliciting.
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
 
