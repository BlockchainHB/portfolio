import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FilterPills } from "@/components/site/filter-pills";
import { LensPage } from "@/components/site/lens-page";
import { LENSES, type Lens } from "@/data/site";

type Props = { params: { lens: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return LENSES.map((l) => ({ lens: l.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const lens = LENSES.find((l) => l.slug === params.lens);
  return lens ? { title: lens.title, description: lens.line } : {};
}

export default function Page({ params }: Props) {
  const lens = LENSES.find((l) => l.slug === params.lens);
  if (!lens) notFound();

  return (
    <>
      <div className="flex justify-center px-4 pt-6 lg:hidden">
        <FilterPills id="mobile" compact />
      </div>
      <LensPage lens={lens.slug as Lens} />
    </>
  );
}
