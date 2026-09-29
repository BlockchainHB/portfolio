"use client";

import { useEffect, useState } from "react";

// Module scope survives client navigations, so only the first paint skips the entrance.
let hasNavigated = false;

/*
 * Wraps page content in (site)/template.tsx, which remounts on every route
 * change. Lens swaps get a 200ms rise-and-fade; the initial page load doesn't.
 */
export function LensEnter({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => hasNavigated);
  useEffect(() => {
    hasNavigated = true;
  }, []);

  return <div className={animate ? "lens-enter" : undefined}>{children}</div>;
}

/*
 * The other half: the home entrance runs on the first page load only.
 * Coming back to All from a lens gets the lens swap instead, not a replay.
 * The server renders data-intro too, so the CSS runs before hydration.
 */
export function IntroGate({ children }: { children: React.ReactNode }) {
  const [intro] = useState(() => !hasNavigated);
  return <div data-intro={intro ? "" : undefined}>{children}</div>;
}
