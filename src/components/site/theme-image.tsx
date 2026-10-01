"use client";

import Image, { getImageProps } from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  light: string;
  dark: string;
  alt: string;
  sizes: string;
  className?: string;
  // Above the fold at this media query: preload it and skip the fade.
  preload?: string;
  // Load both variants straight away instead of on layout (the mobile LCP tile).
  eager?: boolean;
};

/*
 * An image still downloading when it mounts starts transparent and fades in
 * on load. Anything already decoded (cache, or loaded before hydration) is
 * left alone, so there is never a fade on content that was already visible.
 */
function fadeIn(img: HTMLImageElement | null) {
  if (!img || img.complete) return;
  img.dataset.pending = "";
  const done = () => delete img.dataset.pending;
  img.addEventListener("load", done, { once: true });
  img.addEventListener("error", done, { once: true });
}

/*
 * Both variants stay in the DOM and CSS picks one with the `.dark` class,
 * so the right image paints on first load with no theme flash. Both stay
 * lazy, so the hidden one (and a layout's hidden copy) is never fetched.
 *
 * An above-the-fold image is preloaded rather than marked priority, which
 * would fetch both themes at every viewport. Each variant's preload carries
 * its own media query: the layout's breakpoint and the system color scheme
 * (the theme's default), so a phone in dark mode fetches one file.
 */
export function ThemeImage({ light, dark, alt, sizes, className, preload, eager }: Props) {
  // Above-the-fold images paint as soon as they can; a fade would only delay them.
  const ref = preload ? undefined : fadeIn;
  const fade = !preload && "fade-img";

  return (
    <>
      {preload && <Preload src={light} sizes={sizes} media={`${preload} and (prefers-color-scheme: light)`} />}
      {preload && <Preload src={dark} sizes={sizes} media={`${preload} and (prefers-color-scheme: dark)`} />}
      <Image
        ref={ref}
        src={light}
        alt={alt}
        fill
        sizes={sizes}
        quality={90}
        loading={eager ? "eager" : "lazy"}
        className={cn("object-cover dark:hidden", fade, className)}
      />
      <Image
        ref={ref}
        src={dark}
        alt={alt}
        fill
        sizes={sizes}
        quality={90}
        loading={eager ? "eager" : "lazy"}
        className={cn("hidden object-cover dark:block", fade, className)}
      />
    </>
  );
}

// The same srcset and sizes the <Image> renders, so the preloaded file is the one it uses.
function Preload({ src, sizes, media }: { src: string; sizes: string; media: string }) {
  const { props } = getImageProps({ src, alt: "", fill: true, sizes, quality: 90 });
  return <link rel="preload" as="image" imageSrcSet={props.srcSet} imageSizes={props.sizes} media={media} fetchPriority="high" />;
}
