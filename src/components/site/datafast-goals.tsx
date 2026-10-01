"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { track } from "@/lib/datafast";

/*
 * Goals wired by hand instead of DataFast's data-fast-* attributes: those
 * count a keyboard press twice (key and click) and re-fire a scroll goal every
 * time its element comes back on screen.
 *
 *   data-goal="name" data-goal-<param>="value"  one goal per click; Enter and Space arrive as a click
 *   data-scroll-goal="name"                     once per page view, when half the element (or half the screen) is in view
 */
export function DataFastGoals() {
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-goal]");
      if (el?.dataset.goal) track(el.dataset.goal, params(el));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // A new page view (path change) starts every scroll goal over.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const seen = entry.intersectionRatio >= 0.5 || entry.intersectionRect.height >= window.innerHeight / 2;
          if (!entry.isIntersecting || !seen) continue;
          const el = entry.target as HTMLElement;
          observer.unobserve(el);
          if (el.dataset.scrollGoal) track(el.dataset.scrollGoal, { scroll_percentage: String(scrolled()) });
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    document.querySelectorAll("[data-scroll-goal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

// data-goal-plan-type="pro" → { plan_type: "pro" }, the way DataFast names params
function params(el: HTMLElement) {
  const out: Record<string, string> = {};
  for (const { name, value } of Array.from(el.attributes)) {
    if (name.startsWith("data-goal-")) out[name.slice(10).replace(/-/g, "_")] = value;
  }
  return out;
}

// How far down the page, 0–100, as DataFast's own scroll goals report it
function scrolled() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max <= 0 ? 100 : Math.min(100, Math.round((window.scrollY / max) * 100));
}
