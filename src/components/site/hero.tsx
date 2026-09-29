import { cn } from "@/lib/utils";

/*
 * Hero icon stacks. Each tile keeps the rotation and offset from the Paper
 * file (rotation happens around the top-left corner, as there).
 */

type StackTile = {
  left: number;
  top: number;
  rotate: number;
  // app: full-bleed app icon; mark: one-color mark on a themed tile
  kind: "app" | "mark";
  name: string;
  size?: number; // mark share of the tile, in %
};

const tileShadow = "shadow-[inset_0_0_0_1px_var(--image-outline),0_0_0_2px_var(--page),0_2px_8px_#00000014]";
const fanShadow = "shadow-[inset_0_0_0_1px_var(--image-outline),0_0_0_2px_var(--page),0_4px_12px_#0000001a]";

function Tile({ t, px, radius, shadow }: { t: StackTile; px: number; radius: number; shadow: string }) {
  const style: React.CSSProperties = {
    left: t.left,
    top: t.top,
    width: px,
    height: px,
    borderRadius: radius,
    rotate: `${t.rotate}deg`,
    transformOrigin: "0 0",
  };

  if (t.kind === "app") {
    return (
      <span
        aria-hidden
        className={cn("absolute bg-cover bg-center", shadow)}
        style={{ ...style, backgroundImage: `url(/icons/${t.name}-app.png)` }}
      />
    );
  }

  const layer = "absolute inset-0 bg-no-repeat";
  const bg = { backgroundSize: `${t.size}%`, backgroundPosition: "50%" };
  return (
    <span aria-hidden className={cn("absolute overflow-hidden bg-mark-tile", shadow)} style={style}>
      <span className={cn(layer, "dark:hidden")} style={{ ...bg, backgroundImage: `url(/icons/${t.name}-ink.png)` }} />
      <span
        className={cn(layer, "hidden dark:block")}
        style={{ ...bg, backgroundImage: `url(/icons/${t.name}-white.png)` }}
      />
    </span>
  );
}

// The icon nearest the text sits on top (last in the list).
const SOFTWARE: StackTile[] = [
  { kind: "app", name: "beamlet", left: 88, top: 4, rotate: 6 },
  { kind: "mark", name: "gc", size: 54, left: 44, top: 4, rotate: 2 },
  { kind: "mark", name: "lf", size: 62, left: 2, top: 4, rotate: -4 },
];

const THINGS: StackTile[] = [
  { kind: "mark", name: "flagrunner", size: 68, left: 2, top: 4, rotate: -6 },
  { kind: "mark", name: "zensweat", size: 62, left: 44, top: 4, rotate: -2 },
  { kind: "app", name: "hbbag", left: 88, top: 4, rotate: 4 },
];

const FAN: StackTile[] = [
  { kind: "app", name: "beamlet", left: 15, top: 33, rotate: -20 },
  { kind: "mark", name: "zensweat", size: 60, left: 192, top: 14, rotate: 20 },
  { kind: "mark", name: "gc", size: 54, left: 58, top: 17, rotate: -10 },
  { kind: "app", name: "hbbag", left: 147, top: 7, rotate: 10 },
  { kind: "mark", name: "lf", size: 62, left: 102, top: 8, rotate: 0 },
];

function Stack({ tiles }: { tiles: StackTile[] }) {
  return (
    <span className="relative block h-[60px] w-[142px] shrink-0">
      {tiles.map((t) => (
        <Tile key={t.name} t={t} px={52} radius={12} shadow={tileShadow} />
      ))}
    </span>
  );
}

const INTRO = "I'm Hasaam, in Toronto. I take products from idea to shelf, from the backend to the box.";

export function Hero() {
  return (
    <section className="mx-auto w-full max-w-content">
      {/* Desktop: a zig-zag, each line ends or starts with its stack */}
      <div className="hidden flex-col items-center gap-7 pb-24 pt-28 lg:flex">
        {/* Both lines share one width, so the zig-zag's outer edges line up */}
        <h1 className="flex w-[484px] flex-col gap-1 text-3xl font-light">
          <span className="flex items-center justify-between gap-5">
            I build software
            <Stack tiles={SOFTWARE} />
          </span>
          <span className="flex items-center justify-between gap-5">
            <Stack tiles={THINGS} />
            and sell things
          </span>
        </h1>
        <p className="text-balance max-w-[600px] text-center text-lg font-light text-body">{INTRO}</p>
      </div>

      {/* Mobile: a fan of five tiles above the statement */}
      <div className="flex flex-col items-center gap-5 pb-12 pt-16 lg:hidden">
        <span className="relative block h-24 w-[260px]">
          {FAN.map((t) => (
            <Tile key={t.name} t={t} px={56} radius={13} shadow={fanShadow} />
          ))}
        </span>
        <h1 className="text-center text-hero font-light">
          I build software
          <br />
          and sell things
        </h1>
        <p className="text-balance max-w-[320px] text-center text-base text-body">{INTRO}</p>
      </div>
    </section>
  );
}
