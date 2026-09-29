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
 * Both variants stay in the DOM and CSS picks one with the `.dark` class,
 * so the right image paints on first load with no theme flash.
 */
export function ThemeImage({ light, dark, alt, sizes, className, priority }: Props) {
  return (
    <>
      <Image
        src={light}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={90}
        className={cn("object-cover dark:hidden", className)}
      />
      <Image
        src={dark}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={90}
        className={cn("hidden object-cover dark:block", className)}
      />
    </>
  );
}
