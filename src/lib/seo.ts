import type { Metadata } from "next";
import { CONTACT, PROJECTS } from "@/data/site";
import { PREVIEWS } from "@/data/previews";

// The live host: the bare domain redirects here, so canonicals must point at www.
export const SITE_URL = "https://www.hasaamb.com";
export const SITE_NAME = "Hasaam Bhatti";
export const HOME_TITLE = `${SITE_NAME}: Software engineer and founder, Toronto`;

/*
 * One description of who Hasaam is, used for the home page meta description,
 * its social preview and the Person entity. Search engines and AI answers
 * resolve a person from name + role + place + work, so all four are here.
 */
export const DESCRIPTION =
  "Hasaam Bhatti is a software engineer and founder in Toronto. He co-founded Launch Fast, leads engineering at GymCreatives and runs HB Goodies on Amazon.";

// Entity ids, so every page's JSON-LD points at the same person and site.
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const OG_IMAGE = { url: "/opengraph-image.jpg", width: 2400, height: 1260, alt: "Hasaam Bhatti: I build software and sell things" };

/*
 * Page metadata with a self-referencing canonical. Next merges metadata
 * shallowly, so a page that sets `openGraph` replaces the parent's whole
 * object; this builds the full object every time.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = true,
}: {
  title?: string;
  description: string;
  path: string;
  // false when the route has its own opengraph-image file
  image?: boolean;
}): Metadata {
  const ogTitle = title ? `${title} | ${SITE_NAME}` : HOME_TITLE;
  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      ...(image && { images: [OG_IMAGE] }),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      ...(image && { images: [OG_IMAGE.url] }),
    },
  };
}

const org = (id: string, name: string, url?: string) => ({
  "@type": "Organization",
  "@id": `${SITE_URL}/#${id}`,
  name,
  ...(url && { url }),
});

export const PERSON = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Hasaam Bhatti",
  url: SITE_URL,
  image: `${SITE_URL}/Headshot.png`,
  description: DESCRIPTION,
  jobTitle: "Software engineer and founder",
  address: { "@type": "PostalAddress", addressLocality: "Toronto", addressRegion: "ON", addressCountry: "CA" },
  worksFor: [
    { "@id": `${SITE_URL}/#launch-fast` },
    { "@id": `${SITE_URL}/#gymcreatives` },
    { "@id": `${SITE_URL}/#hb-goodies` },
  ],
  knowsAbout: [
    "Software engineering",
    "AI agents",
    "Model Context Protocol",
    "Cloudflare Durable Objects",
    "iOS development",
    "SwiftUI",
    "Amazon FBA",
    "Amazon PPC",
    "Product design",
    "Brand design",
  ],
  sameAs: [CONTACT.x, CONTACT.github, CONTACT.linkedin],
};

const visit = (id: string) => PROJECTS.find((p) => p.id === id)?.visit;

export const ORGANIZATIONS = [
  { ...org("launch-fast", "Launch Fast", visit("launch-fast")), founder: { "@id": PERSON_ID } },
  org("gymcreatives", "GymCreatives", visit("gymcreatives")),
  { ...org("hb-goodies", "HB Goodies"), founder: { "@id": PERSON_ID } },
];

export const WEBSITE = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: SITE_NAME,
  // Lets Google show the name people search for as the site name
  alternateName: ["hasaamb", "hasaamb.com"],
  url: SITE_URL,
  inLanguage: "en",
  publisher: { "@id": PERSON_ID },
};

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/*
 * Every previewable piece of work as a CreativeWork, from the same copy the
 * preview windows show: what it is, who made it and where it lives.
 */
export function workList() {
  return {
    "@type": "ItemList",
    "@id": `${SITE_URL}/#work`,
    name: "Work by Hasaam Bhatti",
    itemListElement: PROJECTS.flatMap((project) =>
      project.tiles
        .filter((tile) => PREVIEWS[tile.slug])
        .map((tile) => {
          const preview = PREVIEWS[tile.slug];
          const link = preview.facts.find((f) => f.href)?.href;
          return {
            "@type": "CreativeWork",
            name: `${project.name}: ${tile.caption}`,
            headline: preview.title,
            description: preview.body.join(" "),
            url: link ?? `${SITE_URL}/#${project.id}`,
            creator: { "@id": PERSON_ID },
          };
        }),
    ).map((item, i) => ({ "@type": "ListItem", position: i + 1, item })),
  };
}
