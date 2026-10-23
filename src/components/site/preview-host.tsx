"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { loadPreviewWindow, usePreviewSlug } from "./preview-store";

const PreviewWindow = dynamic(() => loadPreviewWindow().then((m) => m.PreviewWindow), { ssr: false });

/*
 * Mounts the preview window once it's wanted: the first open, or idle time
 * after the page has settled (so even a first tap finds the code loaded).
 * Until then the page ships none of its code or copy.
 */
export function PreviewHost() {
  const slug = usePreviewSlug();
  const [wanted, setWanted] = useState(false);

  useEffect(() => {
    if (slug) setWanted(true);
  }, [slug]);

  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    let id = 0;
    const later = () => (id = idle(() => setWanted(true), { timeout: 4000 } as IdleRequestOptions) as number);
    if (document.readyState === "complete") later();
    else window.addEventListener("load", later, { once: true });
    return () => {
      window.removeEventListener("load", later);
      cancel(id);
    };
  }, []);

  return wanted ? <PreviewWindow /> : null;
}
