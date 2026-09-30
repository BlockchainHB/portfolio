"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { MARKS, PROJECTS, type Mark } from "@/data/site";
import { PREVIEWS, type Preview, type PreviewImage, type PreviewView } from "@/data/previews";
import { cn } from "@/lib/utils";
import { ProjectMark } from "./project-mark";
import { closePreview, refocusTrigger, usePreviewSlug } from "./preview-store";
import { SlidingIndicator } from "./sliding-indicator";

// Each native app and product shows its own icon; the rest show their project's mark.
const TILE_MARKS: Record<string, Mark> = {
  "zen-sweat": MARKS.zenSweat,
  "flag-runner": MARKS.flagRunner,
  "daily-hadith": MARKS.dailyHadith,
  beamlet: MARKS.beamlet,
  "pr-monitor": MARKS.prMonitor,
};

// How long each exit plays before the dialog actually closes (matches globals.css).
const EXIT_MS = { desktop: 150, mobile: 280 };
const DESKTOP = "(min-width: 1024px)";

function findTile(slug: string) {
  for (const project of PROJECTS) {
    const tile = project.tiles.find((t) => t.slug === slug);
    if (tile) return { project, tile };
  }
  return null;
}

/*
 * The one preview window on the page, mounted in the site layout. A tile
 * sets the open slug (preview-store); this opens a native modal dialog for
 * it. The content stays mounted while the exit plays.
 */
export function PreviewWindow() {
  const slug = usePreviewSlug();
  const dialog = useRef<HTMLDialogElement>(null);
  const [shown, setShown] = useState<string | null>(null);

  // Open: mount the content, then show the dialog as a modal.
  useEffect(() => {
    if (slug) setShown(slug);
  }, [slug]);

  useLayoutEffect(() => {
    const el = dialog.current;
    if (!el || !shown || el.open) return;
    delete el.dataset.closing;
    el.showModal();
    el.querySelector<HTMLElement>(".preview-card")?.focus({ preventScroll: true });
    document.documentElement.dataset.previewOpen = "";
  }, [shown]);

  // Close: play the exit, then close the dialog and drop the content.
  useEffect(() => {
    const el = dialog.current;
    if (slug || !el?.open) return;
    el.dataset.closing = "";
    const desktop = window.matchMedia(DESKTOP).matches;
    const timer = window.setTimeout(
      () => {
        el.close();
        delete el.dataset.closing;
        delete el.dataset.dragging;
        delete document.documentElement.dataset.previewOpen;
        setShown(null);
        refocusTrigger();
      },
      desktop ? EXIT_MS.desktop : EXIT_MS.mobile,
    );
    return () => window.clearTimeout(timer);
  }, [slug]);

  const found = shown ? findTile(shown) : null;
  const preview = shown ? PREVIEWS[shown] : null;

  return (
    <dialog
      ref={dialog}
      className="preview"
      aria-labelledby="preview-title"
      // Escape: animate out instead of the browser's instant close.
      onCancel={(e) => {
        e.preventDefault();
        closePreview();
      }}
      // A click that lands on the dialog itself, not the card, is the scrim.
      onClick={(e) => e.target === e.currentTarget && closePreview()}
    >
      {found && preview && shown && (
        <PreviewCard
          key={shown}
          slug={shown}
          preview={preview}
          heading={`${found.project.name} | ${found.tile.caption}`}
          mark={TILE_MARKS[shown] ?? found.project.mark}
          dialog={dialog}
        />
      )}
    </dialog>
  );
}

function PreviewCard({
  slug,
  preview,
  heading,
  mark,
  dialog,
}: {
  slug: string;
  preview: Preview;
  heading: string;
  mark: Mark;
  dialog: React.RefObject<HTMLDialogElement>;
}) {
  const [view, setView] = useState(0);
  const count = preview.views.length;
  const card = useSheetDrag(dialog);

  const step = useCallback((by: number) => setView((v) => Math.min(count - 1, Math.max(0, v + by))), [count]);

  return (
    <div
      ref={card}
      // Focused on open (see PreviewWindow), so no control shows a focus ring until Tab is pressed.
      tabIndex={-1}
      className={cn(
        "preview-card absolute flex flex-col overflow-y-auto overscroll-contain bg-tile outline-none",
        // Mobile: a bottom sheet
        "inset-x-0 bottom-0 max-h-[calc(100dvh-40px)] rounded-t-tile px-2 pb-10 pt-2",
        // Desktop: a centered card, visual left and copy right
        "lg:inset-auto lg:left-1/2 lg:top-1/2 lg:h-[min(788px,calc(100dvh-48px))] lg:max-h-none lg:w-[min(1120px,calc(100vw-48px))] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:flex-row lg:overflow-hidden lg:rounded-tile lg:p-2",
      )}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
    >
      <DesktopStage slug={slug} views={preview.views} view={view} onView={setView} />
      <MobileStage views={preview.views} />
      <PreviewCopy preview={preview} heading={heading} mark={mark} />
    </div>
  );
}

/* ---------- Visual: desktop ---------- */

function DesktopStage({
  slug,
  views,
  view,
  onView,
}: {
  slug: string;
  views: PreviewView[];
  view: number;
  onView: (i: number) => void;
}) {
  const tabs = useRef<HTMLDivElement>(null);
  const many = views.length > 1;

  // Arrow keys change the view; if a tab had focus, focus follows the selection.
  useEffect(() => {
    const list = tabs.current;
    if (list?.contains(document.activeElement)) list.querySelectorAll<HTMLElement>('[role="tab"]')[view]?.focus();
  }, [view]);

  return (
    <div className="relative hidden w-[60%] shrink-0 flex-col items-center rounded-[20px] bg-[var(--stage)] lg:flex">
      {many && (
        <div
          ref={tabs}
          role="tablist"
          aria-label="Views"
          className="relative mt-[26px] flex shrink-0 gap-0.5 rounded-full bg-[var(--stage-pill)] p-1"
        >
          <SlidingIndicator containerRef={tabs} active={view} className="inset-y-1 rounded-full bg-selected shadow-tile" />
          {views.map((v, i) => (
            <button
              key={v.label}
              type="button"
              role="tab"
              data-segment
              id={`${slug}-tab-${i}`}
              aria-selected={i === view}
              aria-controls={`${slug}-view-${i}`}
              tabIndex={i === view ? 0 : -1}
              onClick={() => onView(i)}
              className={cn(
                "relative rounded-full px-3.5 py-[7px] text-sm transition-[color,transform] duration-150 ease-out active:scale-[0.96]",
                i === view ? "text-ink" : "text-body hover:text-ink",
              )}
            >
              {v.label}
            </button>
          ))}
        </div>
      )}
      {/* The image area is a size container, so every view scales to fit it at its own aspect ratio. */}
      <div className={cn("relative w-full flex-1 [container-type:size]", many ? "mt-6" : "mt-8")}>
        {views.map((v, i) => (
          <div
            key={v.label || i}
            id={`${slug}-view-${i}`}
            role={many ? "tabpanel" : undefined}
            aria-labelledby={many ? `${slug}-tab-${i}` : undefined}
            aria-hidden={i !== view}
            data-pos={i === view ? "current" : i < view ? "prev" : "next"}
            className="preview-view absolute inset-x-8 bottom-8 top-0 flex items-center justify-center"
          >
            <ViewImage image={v.image} alt={v.label} active={i === view} fit="desktop" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Visual: mobile ---------- */

function MobileStage({ views }: { views: PreviewView[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  // As tall as the tallest view needs at full width, but no taller than a
  // near-square: a phone then shrinks to fit instead of leaving screenshots
  // floating in a tall, empty stage.
  // The dots follow the swipe.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const follow = () => setIndex(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", follow, { passive: true });
    return () => el.removeEventListener("scroll", follow);
  }, []);

  const tallest = Math.min(0.95, Math.max(...views.map((v) => v.image.height / v.image.width)));

  return (
    // pan-x: the stage only scrolls sideways itself, so a vertical drag here moves the sheet
    <div className="relative flex shrink-0 touch-pan-x flex-col gap-3.5 overflow-hidden rounded-[20px] bg-[var(--stage)] p-4 lg:hidden">
      <span aria-hidden className="absolute left-1/2 top-[5.5px] h-[5px] w-9 -translate-x-1/2 rounded-full bg-black/20 dark:bg-white/20" />
      <div
        ref={track}
        className="preview-track scrollbar-none -mx-4 flex overflow-x-auto"
      >
        {views.map((v, i) => (
          <div
            key={v.label || i}
            className="flex w-full shrink-0 items-center justify-center px-4 [container-type:size]"
            style={{ aspectRatio: `1 / ${tallest}`, maxHeight: "56dvh" }}
          >
            <ViewImage image={v.image} alt={v.label} active={i === index} fit="mobile" />
          </div>
        ))}
      </div>
      {views.length > 1 && (
        <div className="flex justify-center gap-[5px] pt-0.5">
          {views.map((v, i) => (
            <button
              key={v.label}
              type="button"
              aria-label={`Show ${v.label}`}
              aria-current={i === index}
              onClick={() => track.current?.scrollTo({ left: i * track.current.clientWidth, behavior: "smooth" })}
              // 6px dot, 24px target
              className="-m-[9px] p-[9px]"
            >
              <span
                className={cn(
                  "preview-dot block size-1.5 rounded-full",
                  i === index ? "bg-ink" : "bg-[color-mix(in_oklab,var(--ink)_25%,transparent)]",
                )}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- One view's picture ---------- */

function ViewImage({
  image,
  alt,
  active,
  fit,
}: {
  image: PreviewImage;
  alt: string;
  active: boolean;
  fit: "desktop" | "mobile";
}) {
  const video = useRef<HTMLVideoElement>(null);
  // Reduced motion keeps the still; otherwise the loop plays only while its view is showing.
  const [still, setStill] = useState(true);
  useEffect(() => setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    if (active) void el.play().catch(() => {});
    else el.pause();
  }, [active, still]);

  const { width: w, height: h } = image;
  // Fit inside the view's box (a size container) at the image's own aspect
  // ratio; on desktop, never larger than designed.
  const cap = fit === "desktop" ? `${w}px, ` : "";
  const size = { width: `min(${cap}100cqw, calc(100cqh * ${w / h}))`, aspectRatio: `${w} / ${h}` };
  const screen = image.kind === "screen";

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        screen && (fit === "desktop" ? "rounded-xl" : "rounded"),
        screen && "shadow-[0_0_0_1px_#0000000f,0_12px_32px_#00000014]",
        !screen && "drop-shadow-[0_16px_24px_#0000002e]",
      )}
      style={size}
    >
      <Image
        src={image.src}
        alt={alt}
        fill
        unoptimized
        draggable={false}
        className={cn("object-contain", image.dark && "dark:hidden")}
      />
      {image.dark && <Image src={image.dark} alt={alt} fill unoptimized draggable={false} className="hidden object-contain dark:block" />}
      {image.video && !still && (
        <video
          ref={video}
          src={image.video}
          // The loop's own first frame, so it starts without a jump.
          poster={image.video.replace(/\.mp4$/, "-poster.webp")}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          className="absolute inset-0 size-full object-cover"
        />
      )}
    </div>
  );
}

/* ---------- Copy ---------- */

function PreviewCopy({ preview, heading, mark }: { preview: Preview; heading: string; mark: Mark }) {
  // Header, title, paragraphs and facts arrive in reading order, 40ms apart.
  const rise = (delay: number) => ({ "--delay": `${delay}ms` }) as React.CSSProperties;

  return (
    <div className="flex flex-col px-4 pt-6 lg:min-h-0 lg:flex-1 lg:justify-between lg:gap-8 lg:overflow-y-auto lg:pb-[26px] lg:pl-10 lg:pr-8 lg:pt-8">
      <div className="flex flex-col gap-5">
        <div style={rise(40)} className="preview-rise flex items-center justify-between gap-4">
          <p className="flex items-center gap-2.5 text-base leading-7 text-ink">
            <ProjectMark mark={mark} size={28} />
            {heading}
          </p>
          <button
            type="button"
            aria-label="Close"
            onClick={closePreview}
            className="-mr-2 flex size-9 shrink-0 items-center justify-center rounded-full text-ink transition-[background-color,transform] duration-150 ease-out hover:bg-fill active:scale-[0.96]"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
              <path d="M3.5 3.5l7 7m0-7l-7 7" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-3 lg:gap-4">
          <h2
            id="preview-title"
            style={rise(80)}
            className="preview-rise text-xl font-light lg:text-[28px] lg:leading-[34px] lg:tracking-[-0.02em]"
          >
            {preview.title}
          </h2>
          {preview.body.map((p, i) => (
            <p key={i} style={rise(120 + i * 40)} className="preview-rise text-pretty text-base leading-[26px] text-body">
              {p}
            </p>
          ))}
        </div>
      </div>
      <dl style={rise(200)} className="preview-rise flex flex-col pt-8 lg:pt-0">
        {preview.facts.map((fact) => (
          <Fact key={fact.label} {...fact} />
        ))}
      </dl>
    </div>
  );
}

function Fact({ label, value, href }: { label: string; value: string; href?: string }) {
  const row = "flex justify-between gap-4 py-1.5 text-md";
  if (!href) {
    return (
      <div className={row}>
        <dt className="shrink-0 text-subtle">{label}</dt>
        <dd className="text-right text-ink">{value}</dd>
      </div>
    );
  }
  return (
    <div className={row}>
      <dt className="shrink-0 text-subtle">
        {label}&nbsp;<span aria-hidden>↗</span>
      </dt>
      <dd className="text-right">
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex text-ink underline-offset-4 transition-opacity duration-150 ease-out hover:underline"
        >
          {value}
        </a>
      </dd>
    </div>
  );
}

/* ---------- Mobile: drag the sheet down to close ---------- */

/*
 * Drag from the visual (which only pans sideways itself) or from the top of
 * the copy. The sheet follows the finger 1:1 downward and resists upward;
 * letting go past 100px, or with a quick flick, closes it. Otherwise it
 * springs back on the drawer curve.
 */
function useSheetDrag(dialog: React.RefObject<HTMLDialogElement>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = ref.current;
    const el = dialog.current;
    if (!card || !el) return;
    let start: { x: number; y: number; t: number; id: number } | null = null;
    let axis: "x" | "y" | null = null;
    let dy = 0;

    const down = (e: PointerEvent) => {
      if (window.matchMedia(DESKTOP).matches || e.pointerType === "mouse" || start) return;
      if (card.scrollTop > 0) return; // scrolled copy scrolls, it doesn't drag
      start = { x: e.clientX, y: e.clientY, t: performance.now(), id: e.pointerId };
      axis = null;
      dy = 0;
    };
    const move = (e: PointerEvent) => {
      if (!start || e.pointerId !== start.id) return;
      const mx = e.clientX - start.x;
      const my = e.clientY - start.y;
      if (!axis) {
        if (Math.hypot(mx, my) < 8) return;
        axis = Math.abs(my) > Math.abs(mx) ? "y" : "x";
        if (axis === "y" && my < 0) axis = "x"; // pulling up is a scroll, not a drag
        if (axis === "y") {
          el.dataset.dragging = "";
          card.setPointerCapture(e.pointerId);
        }
      }
      if (axis !== "y") return;
      e.preventDefault();
      dy = my > 0 ? my : my * 0.2;
      card.style.translate = `0 ${dy}px`;
    };
    const up = (e: PointerEvent) => {
      if (!start || e.pointerId !== start.id) return;
      const velocity = dy / (performance.now() - start.t);
      const dragged = axis === "y";
      start = null;
      if (!dragged) return;
      delete el.dataset.dragging;
      card.style.translate = "";
      if (dy > 100 || velocity > 0.11) closePreview();
    };

    card.addEventListener("pointerdown", down);
    card.addEventListener("pointermove", move);
    card.addEventListener("pointerup", up);
    card.addEventListener("pointercancel", up);
    return () => {
      card.removeEventListener("pointerdown", down);
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerup", up);
      card.removeEventListener("pointercancel", up);
    };
  }, [dialog]);

  return ref;
}
