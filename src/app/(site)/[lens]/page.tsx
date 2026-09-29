import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FilterPills } from "@/components/site/filter-pills";
import { JsonLd } from "@/components/site/json-ld";
import { LensPage } from "@/components/site/lens-page";
import { LENS_CARDS, LENSES, type Lens } from "@/data/site";
import { breadcrumbs, pageMetadata, PERSON_ID, SITE_URL, WEBSITE_ID } from "@/lib/seo";

type Props = { params: { lens: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return LENSES.map((l) => ({ lens: l.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const lens = LENSES.find((l) => l.slug === params.lens);
  if (!lens) return {};
  // The social image comes from this route's opengraph-image file.
  return pageMetadata({ title: lens.seoTitle, description: lens.description, path: `/${lens.slug}`, image: false });
}

export default function Page({ params }: Props) {
  const lens = LENSES.find((l) => l.slug === params.lens);
  if (!lens) notFound();

  const url = `${SITE_URL}/${lens.slug}`;
  const graph = [
    {
      "@type": "CollectionPage",
      "@id": `${url}#page`,
      url,
      name: `${lens.seoTitle} | Hasaam Bhatti`,
      description: lens.description,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": PERSON_ID },
      author: { "@id": PERSON_ID },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: LENS_CARDS[lens.slug].map((card, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: { "@type": "CreativeWork", name: card.title, description: card.line, creator: { "@id": PERSON_ID } },
        })),
      },
    },
    breadcrumbs([
      { name: "Hasaam Bhatti", path: "" },
      { name: lens.title, path: `/${lens.slug}` },
    ]),
  ];

  return (
    <>
      <JsonLd graph={graph} />
      <div className="flex justify-center px-4 pt-6 lg:hidden">
        <FilterPills id="mobile" compact />
      </div>
      <LensPage lens={lens.slug as Lens} />
    </>
  );
}
