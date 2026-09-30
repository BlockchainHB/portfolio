"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
 * (order-1) and its body (order-3), so it never remounts and never moves: every
 * masthead is the same height on mobile. On the home page's first load it
 * arrives with the work, as it did when it was part of the page.
 */
export function MobileFilter() {
  const pathname = usePathname();
  const [intro] = useState(() => !hasNavigated && pathname === "/");

  return (
    <div data-intro={intro ? "" : undefined} className="order-2 flex justify-center px-4 pb-8 lg:hidden">
      <div className="intro-fade" style={{ "--delay": "300ms" } as React.CSSProperties}>
        <FilterPills id="mobile" compact />
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
