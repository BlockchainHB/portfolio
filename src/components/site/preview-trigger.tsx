"use client";

import { openPreview, warmPreview } from "./preview-store";

/*
 * Covers a bento tile and opens its preview. It is a sibling laid over the
 * tile's picture rather than a wrapper, so the figure markup stays valid;
 * the tile's hover and press styles key off it (.bento-tile, .bento-trigger).
 * Hover, focus and the first touch warm the preview's pictures.
 */
export function PreviewTrigger({ slug, label }: { slug: string; label: string }) {
  const warm = () => warmPreview(slug);
  return (
    <button
      type="button"
      aria-label={label}
      aria-haspopup="dialog"
      data-goal="preview_open"
      data-goal-slug={slug}
      onClick={(e) => openPreview(slug, e.currentTarget)}
      onPointerEnter={warm}
      onFocus={warm}
      onTouchStart={warm}
      className="bento-trigger absolute inset-0 z-10 rounded-[inherit] outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-page"
    />
  );
}
