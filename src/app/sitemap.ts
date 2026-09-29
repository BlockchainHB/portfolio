import { getBlogPosts } from "@/data/blog";
import { MetadataRoute } from "next";

const SITE_URL = "https://hasaamb.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getBlogPosts();

  const blogs = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt as string),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const lenses = ["interface", "systems", "agents", "brand", "product"].map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...lenses,
    ...blogs,
  ];
}
