import Image from "next/image";
import { ALSO_SHIPPED, LENS_CARDS, LENSES, type Lens, type LensCard } from "@/data/site";
import { AlsoShipped } from "./also-shipped";
import { ProjectMark } from "./project-mark";
import { ThemeImage } from "./theme-image";
import { cn } from "@/lib/utils";

export function LensPage({ lens }: { lens: Lens }) {
  const meta = LENSES.find((l) => l.slug === lens)!;
  const cards = LENS_CARDS[lens];
  // An odd count leads with one wide featured card.
  const featured = cards.length % 2 === 1 ? cards[0] : null;
  const rest = featured ? cards.slice(1) : cards;
  const shipped = ALSO_SHIPPED.filter((s) => s.lenses.includes(lens));

  return (
    <>
      {/* Mobile: every lens masthead is the same height (one-line title,
          two-line subtitle), so switching between lenses never moves the filter
          below. Only All <-> a lens moves it, and the filter glides that step. */}
      <header className="masthead order-1 mx-auto flex w-full max-w-content flex-col items-center gap-4 px-4 pb-12 pt-12 text-center lg:px-0 lg:pb-16 lg:pt-24">
        <h1 className="text-hero font-light lg:text-3xl">{meta.title}</h1>
        <p className="text-balance min-h-12 text-base font-light text-body lg:min-h-0 lg:text-lg">{meta.line}</p>
      </header>

      <div className="lens-body order-3">
        <div className="mx-auto flex max-w-content flex-col gap-4 px-4 lg:px-0">
          {featured && <FeaturedCard card={featured} />}
          <ul className="grid gap-4 md:grid-cols-2">
            {rest.map((card) => (
              <li key={card.id} className="flex">
                <Card card={card} />
              </li>
            ))}
          </ul>
        </div>

        <AlsoShipped items={shipped} variant="lens" />
      </div>
    </>
  );
}

function CardVisual({ card, featured }: { card: LensCard; featured?: boolean }) {
  const v = card.visual;
  const sizes = featured ? "(min-width: 1200px) 736px, 100vw" : "(min-width: 1200px) 560px, (min-width: 768px) 50vw, 100vw";

  return (
    <div
      className={cn(
        "relative w-full shrink-0 overflow-hidden rounded-media",
        featured ? "aspect-[736/424] lg:w-[736px]" : v.type === "image" && v.square ? "aspect-square" : "aspect-[7/4]",
        v.type === "svg" ? "bg-[#F3F5F9] dark:bg-[#141414]" : "bg-fill",
      )}
    >
      {v.type === "svg" ? (
        <>
          <Image
            src={`/work/systems/${v.slug}-light.svg`}
            alt={card.title}
            fill
            unoptimized
            className="object-contain dark:hidden"
          />
          <Image
            src={`/work/systems/${v.slug}-dark.svg`}
            alt={card.title}
            fill
            unoptimized
            className="hidden object-contain dark:block"
          />
        </>
      ) : (
        <ThemeImage
          light={`/work/lens/${v.slug}-light.webp`}
          dark={`/work/lens/${v.slug}-dark.webp`}
          alt={card.title}
          sizes={sizes}
        />
      )}
    </div>
  );
}

function Label({ card }: { card: LensCard }) {
  return (
    <p className="flex items-center gap-2 text-md text-body">
      <ProjectMark mark={card.mark} size={24} />
      {card.project}
    </p>
  );
}

function Card({ card }: { card: LensCard }) {
  return (
    <article className="shadow-tile flex w-full flex-col rounded-tile bg-tile p-2">
      <CardVisual card={card} />
      <div className="flex flex-col gap-4 px-4 pb-4 pt-5">
        <Label card={card} />
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-light">{card.title}</h2>
          <p className="text-pretty text-base text-body">{card.line}</p>
        </div>
      </div>
    </article>
  );
}

function FeaturedCard({ card }: { card: LensCard }) {
  return (
    <article className="shadow-tile flex flex-col rounded-tile bg-tile p-2 lg:flex-row">
      <CardVisual card={card} featured />
      {/* Reads from the top, level with the visual. 8px card padding + 24px here
          puts the text 32px from the card's top and left edges alike. */}
      <div className="flex flex-1 flex-col gap-4 px-4 pb-4 pt-5 lg:p-6">
        <Label card={card} />
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-light">{card.title}</h2>
          <p className="text-pretty text-base text-body">{card.line}</p>
        </div>
      </div>
    </article>
  );
}
