import type { Mark } from "@/data/site";
import { cn } from "@/lib/utils";

type Props = {
  mark: Mark;
  size: number;
  className?: string;
  style?: React.CSSProperties;
};

/*
 * Project icon tile. Radius is 23% of the size at every size; the mark sits
 * centered at a fixed share of the tile. One-color marks swap ink/white with
 * the theme unless they carry a tone, colored marks keep their color, app
 * icons fill the tile.
 */

// A toned mark keeps one tile in every theme: ink on white, or white on near-black.
export const TONE_TILE = { light: "bg-white", dark: "bg-[#161616]" } as const;
export const toneIcon = (name: string, tone: "light" | "dark") => `/icons/${name}-${tone === "light" ? "ink" : "white"}.webp`;

export function ProjectMark({ mark, size, className, style }: Props) {
  const frame = cn("relative shrink-0 overflow-hidden rounded-[23%]", className);
  const box = { width: size, height: size, ...style };

  if (mark.kind === "app") {
    return (
      <span
        aria-hidden
        className={cn(frame, "ring-mark bg-cover bg-center")}
        style={{ ...box, backgroundImage: `url(/icons/${mark.name}-app.webp)` }}
      />
    );
  }

  if (mark.kind === "glyph") {
    return (
      <span aria-hidden className={cn(frame, "ring-mark flex items-center justify-center bg-mark-tile text-ink")} style={box}>
        <Glyph glyph={mark.glyph} size={Math.round(size * 0.5)} />
      </span>
    );
  }

  const layer = "absolute inset-0 bg-center bg-no-repeat";
  const backgroundSize = `${mark.size}%`;

  if (mark.kind === "mono" && mark.tone) {
    return (
      <span aria-hidden className={cn(frame, "ring-mark", TONE_TILE[mark.tone])} style={box}>
        <span className={layer} style={{ backgroundImage: `url(${toneIcon(mark.name, mark.tone)})`, backgroundSize }} />
      </span>
    );
  }

  return (
    <span aria-hidden className={cn(frame, "ring-mark bg-mark-tile")} style={box}>
      {mark.kind === "mono" ? (
        <>
          <span
            className={cn(layer, "dark:hidden")}
            style={{ backgroundImage: `url(/icons/${mark.name}-ink.webp)`, backgroundSize }}
          />
          <span
            className={cn(layer, "hidden dark:block")}
            style={{ backgroundImage: `url(/icons/${mark.name}-white.webp)`, backgroundSize }}
          />
        </>
      ) : (
        <span className={layer} style={{ backgroundImage: `url(/icons/${mark.name}-color.webp)`, backgroundSize }} />
      )}
    </span>
  );
}

function Glyph({ glyph, size }: { glyph: "native" | "index" | "component"; size: number }) {
  const common = {
    width: size,
    height: size,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.25,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (glyph === "native") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <rect x="2.5" y="5" width="14" height="10" rx="1.5" />
        <path d="M1.5 18h16" />
        <rect x="15.5" y="9" width="6" height="11" rx="1.5" fill="var(--mark-tile)" />
      </svg>
    );
  }

  if (glyph === "index") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <rect x="3" y="3" width="8" height="8" rx="1.5" />
        <rect x="13" y="3" width="8" height="8" rx="1.5" />
        <rect x="3" y="13" width="8" height="8" rx="1.5" />
        <rect x="13" y="13" width="8" height="8" rx="1.5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 16 16" {...common} strokeWidth={1}>
      <rect x="2" y="2" width="9" height="9" rx="1.5" strokeDasharray="2 1.5" />
      <path d="M9 9l4.5 1.8-1.9.8-.8 1.9L9 9Z" />
    </svg>
  );
}
