import { getBlogPosts } from "@/data/blog";
import Link from "next/link";

export const metadata = {
  title: "Blog",
  description: "Notes by Hasaam Bhatti on building software and selling physical products.",
  alternates: { canonical: "/blog" },
};

// The site's CSS entrance, 40ms apart: it paints on first load, before any JavaScript.
const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section data-intro>
      <h1 className="intro-fade mb-8 text-2xl font-medium tracking-tighter" style={delay(40)}>
        blog
      </h1>
      {posts
        .sort((a, b) => (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt) ? -1 : 1))
        .map((post, id) => (
          <Link
            key={post.slug}
            className="intro-fade mb-4 flex flex-col space-y-1"
            style={delay(80 + id * 50)}
            href={`/blog/${post.slug}`}
          >
            <div className="flex w-full flex-col">
              <p className="tracking-tight">{post.metadata.title}</p>
              <p className="h-6 text-xs text-muted-foreground">{post.metadata.publishedAt}</p>
            </div>
          </Link>
        ))}
    </section>
  );
}
