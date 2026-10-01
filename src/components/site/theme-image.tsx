"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  light: string;
  dark: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
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
 * so the right image paints on first load with no theme flash.
 */
export function ThemeImage({ light, dark, alt, sizes, className, priority }: Props) {
  // Above-the-fold images paint as soon as they can; a fade would only delay them.
  const ref = priority ? undefined : fadeIn;
  const fade = !priority && "fade-img";

  return (
    <>
      <Image
        ref={ref}
        src={light}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={90}
        className={cn("object-cover dark:hidden", fade, className)}
      />
      <Image
        ref={ref}
        src={dark}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={90}
        className={cn("hidden object-cover dark:block", fade, className)}
      />
    </>
  );
}
