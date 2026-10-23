"use client";

import { useSyncExternalStore } from "react";
import type { PreviewImage } from "@/data/previews";

/*
 * Which tile's preview is open. Tiles live in server-rendered sections all
 * over the page and there is one preview window in the layout, so they talk
 * through this tiny store instead of a context provider.
 */
let slug: string | null = null;
let trigger: HTMLElement | null = null;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((l) => l());

// Only tiles with a preview render a trigger, so any slug that arrives here has one.
export function openPreview(next: string, from?: HTMLElement | null) {
  loadPreviewWindow();
  slug = next;
  trigger = from ?? null;
  emit();
}

export function closePreview() {
  slug = null;
  emit();
}

// Once the dialog has closed: back to the tile that opened it, without scrolling the page.
export function refocusTrigger() {
  trigger?.focus({ preventScroll: true });
  trigger = null;
}

export function usePreviewSlug() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => slug,
    () => null,
  );
}

// A view's width on screen: as designed on desktop, the sheet's width on mobile.
export function previewSizes(image: PreviewImage) {
  return `(min-width: 1024px) ${image.width}px, min(342px, 100vw)`;
}

/*
 * The window, the preview copy and the warm-up live in chunks of their own,
 * fetched on the first sign of intent (or in idle time), not with the page.
 */
export const loadPreviewWindow = () => import("./preview-window");

/*
 * Warm the browser cache on intent (hover, focus, touch), so a preview opens
 * on pictures, not blanks. It also fetches the window's code, so the click
 * that follows finds it ready.
 */
const warmed = new Set<string>();
export function warmPreview(key: string) {
  if (warmed.has(key)) return;
  warmed.add(key);
  void loadPreviewWindow();
  void import("./preview-warm").then((m) => m.warmPictures(key));
}
