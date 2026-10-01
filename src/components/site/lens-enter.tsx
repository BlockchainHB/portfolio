"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FilterPills } from "./filter-pills";

// Module scope survives client navigations, so only the first paint skips the entrance.
let hasNavigated = false;

/*
 * Wraps page content in (site)/template.tsx, which remounts on every route
 * change. On a lens swap the page's .masthead and .lens-body animate in (see
 * globals.css); the initial page load doesn't. `contents` keeps the wrapper
 * out of layout, so the page's pieces sit in the layout's column around the
 * mobile filter.
 */
export function LensEnter({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => hasNavigated);
  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <div className="contents" data-lens-enter={animate ? "" : undefined}>
      {children}
    </div>
  );
}

/*
 * The mobile filter lives in the layout, between each page's masthead
 * (order-1) and its body (order-3), so it never remounts. Lens mastheads share
 * one height, so switching lenses leaves it in place; All's hero is 72px
 * taller, and that one step glides instead of jumping.
 * On the home page's first load it arrives with the work.
 */
export function MobileFilter() {
  const pathname = usePathname();
  const [intro] = useState(() => !hasNavigated && pathname === "/");
  const ref = useRef<HTMLDivElement>(null);
  const lastTop = useRef<number | null>(null);

  // A resize moves the row without a glide; start the next one from there.
  useEffect(() => {
    const record = () => ref.current && (lastTop.current = ref.current.offsetTop);
    window.addEventListener("resize", record);
    return () => window.removeEventListener("resize", record);
  }, []);

  /*
   * FLIP with the Web Animations API, so the glide runs on the compositor
   * while the new page mounts (a main-thread layout animation drops frames
   * then). Runs after the new page is in the DOM, before paint: put the row
   * back where it was on screen, then animate the offset away.
   */
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prev = lastTop.current;
    const top = el.offsetTop; // layout position, unaffected by the glide's transform
    lastTop.current = top;
    if (prev === null || prev === top) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Tapped mid-glide: continue from where the row is now, not where it was headed.
    const transform = getComputedStyle(el).transform;
    const running = transform === "none" ? 0 : new DOMMatrix(transform).m42;
    el.getAnimations().forEach((a) => a.cancel());

    el.animate([{ transform: `translateY(${prev + running - top}px)` }, { transform: "none" }], {
      duration: 200,
      easing: "cubic-bezier(0.23, 1, 0.32, 1)", // --ease-out: the tap gets an immediate response
    });
  }, [pathname]);

  return (
    <div
      ref={ref}
      data-intro={intro ? "" : undefined}
      className="order-2 flex justify-center px-4 pb-8 lg:hidden"
    >
      <div className="intro-fade" style={{ "--delay": "300ms" } as React.CSSProperties}>
        <FilterPills compact />
      </div>
    </div>
  );
}

/*
 * The other half: the home entrance runs on the first page load only.
 * Coming back to All from a lens gets the lens swap instead, not a replay.
 * The server renders data-intro too, so the CSS runs before hydration.
 */
export function IntroGate({ children }: { children: React.ReactNode }) {
  const [intro] = useState(() => !hasNavigated);
  return (
    <div className="contents" data-intro={intro ? "" : undefined}>
      {children}
    </div>
  );
}
