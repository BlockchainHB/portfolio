'use client';

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type MotionContextValue = {
  reducedMotion: boolean;
  supportsViewTimeline: boolean;
};

const MotionContext = createContext<MotionContextValue>({
  reducedMotion: false,
  supportsViewTimeline: false,
});

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [supportsViewTimeline, setSupportsViewTimeline] = useState(false);

  useEffect(() => {
    try {
      // @ts-ignore - CSS.supports types may not include this yet
      setSupportsViewTimeline(CSS.supports && CSS.supports("animation-timeline: view()"));
    } catch {}

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateReduced = () => setReducedMotion(!!mediaQuery.matches);
    updateReduced();
    mediaQuery.addEventListener("change", updateReduced);

    document.body.dataset.mounted = "true";

    return () => {
      mediaQuery.removeEventListener("change", updateReduced);
    };
  }, []);

  const value = useMemo(() => ({ reducedMotion, supportsViewTimeline }), [reducedMotion, supportsViewTimeline]);

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

export function useMotion() {
  return useContext(MotionContext);
}


