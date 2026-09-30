"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/*
 * The selected pill behind a row of segments (the lens filter, a preview's
 * views). It is positioned inside its own row, from the active item's
 * offsetLeft and width, so it can only ever slide sideways within the row.
 * A shared-layout animation measures the viewport instead, and when the whole
 * row moves at the same time (the mobile filter glides as the page swaps
 * under it) the pill flew in from wherever it last sat on screen.
 *
 * Changing the active item slides the pill with a CSS transition, so a quick
 * second tap retargets it mid-flight. The first placement and resizes (fonts
 * loading, the viewport changing) move it without a slide.
 */
export function SlidingIndicator({
  containerRef,
  active,
  className,
}: {
  containerRef: React.RefObject<HTMLElement>;
  active: number; // index of the selected [data-segment] item; -1 hides the pill
  className?: string;
}) {
  const [box, setBox] = useState<{ x: number; w: number } | null>(null);
  const [animate, setAnimate] = useState(false);
  const activeRef = useRef(active);
  activeRef.current = active;
  const frame = useRef(0);

  const measure = useCallback(
    (slide: boolean) => {
      const item = containerRef.current?.querySelectorAll<HTMLElement>("[data-segment]")[activeRef.current];
      setBox(item ? { x: item.offsetLeft, w: item.offsetWidth } : null);
      cancelAnimationFrame(frame.current);
      if (slide) {
        setAnimate(true);
      } else {
        // Jump this frame, slide again from the next one.
        setAnimate(false);
        frame.current = requestAnimationFrame(() => setAnimate(true));
      }
    },
    [containerRef],
  );

  const placed = useRef(false);
  useLayoutEffect(() => {
    measure(placed.current);
    placed.current = true;
  }, [active, measure]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let first = true;
    const observer = new ResizeObserver(() => {
      if (first) return void (first = false); // fires once on observe; already placed
      measure(false);
    });
    observer.observe(container);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame.current);
    };
  }, [containerRef, measure]);

  if (!box) return null;
  return (
    <span
      aria-hidden
      className={cn("sliding-indicator pointer-events-none absolute left-0", className)}
      data-animate={animate ? "" : undefined}
      style={{ width: box.w, transform: `translateX(${box.x}px)` }}
    />
  );
}
