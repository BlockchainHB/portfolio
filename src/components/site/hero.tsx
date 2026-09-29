import { preload } from "react-dom";
import { cn } from "@/lib/utils";

/*
 * Hero icon stacks. Each tile keeps the rotation and offset from the Paper
 * file (rotation happens around the top-left corner, as there).
 *
 * The last tile in each list is the anchor: it sits on top, nearest the text.
 * On first load the others start gathered under it and fan out (intro-fan).
 * On desktop, pointing at a stack spreads it a little further from the
 * anchor, and the tile under the pointer lifts and shows its name.
 */

type StackTile = {
  left: number;
  top: number;
  rotate: number;
  // app: full-bleed app icon; mark: one-color mark on a themed tile
  kind: "app" | "mark";
  name: string;
  size?: number; // mark share of the tile, in %
  label: string;
  href: string; // the project's section on the page
};

const tileShadow = "shadow-[inset_0_0_0_1px_var(--image-outline),0_0_0_2px_var(--page),0_2px_8px_#00000014]";
const fanShadow = "shadow-[inset_0_0_0_1px_var(--image-outline),0_0_0_2px_var(--page),0_4px_12px_#0000001a]";

// How far a tile moves on hover, as a share of its distance from the anchor.
const SPREAD = 0.1;

function Tile({
  t,
  anchor,
  px,
  radius,
  shadow,
  labelAt,
}: {
  t: StackTile;
  anchor: StackTile;
  px: number;
  radius: number;
  shadow: string;
  labelAt?: "above" | "below";
}) {
  const style = {
    left: t.left,
    top: t.top,
    width: px,
    height: px,
    "--r": `${t.rotate}deg`,
    "--fan-x": `${anchor.left - t.left}px`,
    "--fan-y": `${anchor.top - t.top}px`,
    "--spread-x": `${Math.round((t.left - anchor.left) * SPREAD)}px`,
  } as React.CSSProperties;

  const face = cn("hero-tile intro-fan absolute inset-0", shadow);
  const layer = "absolute inset-0 bg-no-repeat";
  const bg = { backgroundSize: `${t.size}%`, backgroundPosition: "50%" };

  const tile =
    t.kind === "app" ? (
      <span
        className={cn(face, "bg-cover bg-center")}
        style={{ borderRadius: radius, backgroundImage: `url(/icons/${t.name}-app.png)` }}
      />
    ) : (
      <span className={cn(face, "overflow-hidden bg-mark-tile")} style={{ borderRadius: radius }}>
        <span className={cn(layer, "dark:hidden")} style={{ ...bg, backgroundImage: `url(/icons/${t.name}-ink.png)` }} />
        <span
          className={cn(layer, "hidden dark:block")}
          style={{ ...bg, backgroundImage: `url(/icons/${t.name}-white.png)` }}
        />
      </span>
    );

  // Mobile fan: decoration only, nothing to point at on touch.
  if (!labelAt) {
    return (
      <span aria-hidden className="absolute" style={style}>
        {tile}
      </span>
    );
  }

  // Desktop: a pointer shortcut to the project. Hidden from the heading's
  // accessible name and the tab order; every section is reachable anyway.
  return (
    <a href={t.href} aria-hidden tabIndex={-1} className="hero-item absolute" style={style}>
      {tile}
      <span className="hero-label" data-at={labelAt}>
        {t.label}
      </span>
    </a>
  );
}

const SOFTWARE: StackTile[] = [
  { kind: "app", name: "beamlet", label: "Beamlet", href: "#native", left: 88, top: 4, rotate: 6 },
  { kind: "mark", name: "gc", size: 54, label: "GymCreatives", href: "#gymcreatives", left: 44, top: 4, rotate: 2 },
  { kind: "mark", name: "lf", size: 62, label: "Launch Fast", href: "#launch-fast", left: 2, top: 4, rotate: -4 },
];

const THINGS: StackTile[] = [
  { kind: "mark", name: "flagrunner", size: 68, label: "Flag Runner", href: "#physical", left: 2, top: 4, rotate: -6 },
  { kind: "mark", name: "zensweat", size: 62, label: "Zen Sweat", href: "#physical", left: 44, top: 4, rotate: -2 },
  { kind: "app", name: "hbbag", label: "HB Goodies", href: "#physical", left: 88, top: 4, rotate: 4 },
];

const FAN: StackTile[] = [
  { kind: "app", name: "beamlet", label: "Beamlet", href: "#native", left: 15, top: 33, rotate: -20 },
  { kind: "mark", name: "zensweat", size: 60, label: "Zen Sweat", href: "#physical", left: 192, top: 14, rotate: 20 },
  { kind: "mark", name: "gc", size: 54, label: "GymCreatives", href: "#gymcreatives", left: 58, top: 17, rotate: -10 },
  { kind: "app", name: "hbbag", label: "HB Goodies", href: "#physical", left: 147, top: 7, rotate: 10 },
  { kind: "mark", name: "lf", size: 62, label: "Launch Fast", href: "#launch-fast", left: 102, top: 8, rotate: 0 },
];

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

// Line one's labels go above its stack, line two's below, so neither covers the other line.
function Stack({ tiles, enterAt, labelAt }: { tiles: StackTile[]; enterAt: number; labelAt: "above" | "below" }) {
  const anchor = tiles[tiles.length - 1];
  return (
    <span className="hero-stack intro-rise relative block h-[60px] w-[142px] shrink-0" style={delay(enterAt)}>
      {tiles.map((t) => (
        <Tile key={t.name} t={t} anchor={anchor} px={52} radius={12} shadow={tileShadow} labelAt={labelAt} />
      ))}
    </span>
  );
}

const INTRO = "I'm Hasaam, in Toronto. I take products from idea to shelf, from the backend to the box.";

// Fetch the stack icons with the HTML, so the fan never opens on blank tiles.
const ICONS = ["beamlet-app", "hbbag-app", ...["gc", "lf", "flagrunner", "zensweat"].flatMap((n) => [`${n}-ink`, `${n}-white`])];

export function Hero() {
  for (const icon of ICONS) preload(`/icons/${icon}.png`, { as: "image" });

  return (
    <section className="mx-auto w-full max-w-content">
      {/* Desktop: a zig-zag, each line ends or starts with its stack */}
      <div className="hidden flex-col items-center gap-7 pb-24 pt-28 lg:flex">
        {/* Each stack sits like a word: 10px gap plus sidebearing and tile inset ≈ one word space (0.26em) */}
        <h1 className="flex flex-col items-center gap-1 text-3xl font-light">
          <span className="flex items-center gap-2.5">
            <span className="intro-rise" style={delay(0)}>
              I build software
            </span>
            <Stack tiles={SOFTWARE} enterAt={60} labelAt="above" />
          </span>
          <span className="flex items-center gap-2.5">
            <Stack tiles={THINGS} enterAt={160} labelAt="below" />
            <span className="intro-rise" style={delay(100)}>
              and sell things
            </span>
          </span>
        </h1>
        <p className="intro-rise text-balance max-w-[600px] text-center text-lg font-light text-body" style={delay(200)}>
          {INTRO}
        </p>
      </div>

      {/* Mobile: a hand of five tiles that fans out above the statement */}
      <div className="flex flex-col items-center gap-5 pb-12 pt-16 lg:hidden">
        <span className="intro-rise relative block h-24 w-[260px]" style={delay(0)}>
          {FAN.map((t) => (
            <Tile key={t.name} t={t} anchor={FAN[FAN.length - 1]} px={56} radius={13} shadow={fanShadow} />
          ))}
        </span>
        <h1 className="intro-rise text-center text-hero font-light" style={delay(100)}>
          I build software
          <br />
          and sell things
        </h1>
        <p className="intro-rise text-balance max-w-[320px] text-center text-base text-body" style={delay(200)}>
          {INTRO}
        </p>
      </div>
    </section>
  );
}
