import { getImageProps } from "next/image";
import { PREVIEWS } from "@/data/previews";
import { previewSizes } from "./preview-store";

/*
 * Fetch the picture a preview opens on, ahead of the click. It asks for the
 * same srcset and sizes the window renders, so the browser picks, and caches,
 * the very file it will show. Other views load when their tab is chosen.
 */
export function warmPictures(key: string) {
  const dark = document.documentElement.classList.contains("dark");
  for (const { image } of PREVIEWS[key]?.views.slice(0, 1) ?? []) {
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
