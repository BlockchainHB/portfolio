"use client";

import { getImageProps } from "next/image";
import { useSyncExternalStore } from "react";
import { PREVIEWS, type PreviewImage } from "@/data/previews";

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

// A view's width on screen: as designed on desktop, the sheet's width on mobile.
export function previewSizes(image: PreviewImage) {
  return `(min-width: 1024px) ${image.width}px, min(342px, 100vw)`;
}

/*
 * Warm the browser cache on intent (hover, focus, touch), so a preview opens
 * on pictures, not blanks. It asks for the same srcset and sizes the window
 * renders, so the browser picks, and caches, the very file it will show.
 */
const warmed = new Set<string>();
export function warmPreview(key: string) {
  if (warmed.has(key)) return;
  warmed.add(key);
  const dark = document.documentElement.classList.contains("dark");
  for (const { image } of PREVIEWS[key]?.views ?? []) {
    const { props } = getImageProps({
      src: dark && image.dark ? image.dark : image.src,
      alt: "",
      fill: true,
      sizes: previewSizes(image),
      quality: 90,
    });
    const img = new Image();
    img.decoding = "async";
    if (props.sizes) img.sizes = props.sizes;
    if (props.srcSet) img.srcset = props.srcSet;
    img.src = props.src;
  }
}
