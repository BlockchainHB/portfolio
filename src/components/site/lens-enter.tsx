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
