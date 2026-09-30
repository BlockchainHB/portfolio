"use client";

import { useSyncExternalStore } from "react";
import { PREVIEWS } from "@/data/previews";

/*
 * Which tile's preview is open. Tiles live in server-rendered sections all
 * over the page and there is one preview window in the layout, so they talk
 * through this tiny store instead of a context provider.
 */
let slug: string | null = null;
let trigger: HTMLElement | null = null;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((l) => l());

export function openPreview(next: string, from?: HTMLElement | null) {
  if (!PREVIEWS[next]) return;
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

// Warm the browser cache on intent (hover, focus, touch), so a preview opens on pictures, not blanks.
const warmed = new Set<string>();
export function warmPreview(key: string) {
  if (warmed.has(key)) return;
  warmed.add(key);
  const dark = document.documentElement.classList.contains("dark");
  for (const { image } of PREVIEWS[key]?.views ?? []) {
    const img = new Image();
    img.decoding = "async";
    img.src = dark && image.dark ? image.dark : image.src;
  }
}
