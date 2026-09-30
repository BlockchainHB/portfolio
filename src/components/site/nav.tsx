import Image from "next/image";
import Link from "next/link";
import { CONTACT } from "@/data/site";
import { FilterPills } from "./filter-pills";

export function Nav() {
  return (
    <header className="mx-auto flex h-12 w-full max-w-content items-center justify-between">
      {/* Hover follows the site's two rules: ink links fade to 70%, muted links brighten to ink.
          On the name only the text fades; a photo dimmed on hover just looks washed out. */}
      <Link
        href="/"
        className="group flex items-center gap-2.5 text-base text-ink transition-transform duration-150 ease-out active:scale-[0.96] lg:w-60"
      >
        <span className="image-outline relative size-7 shrink-0 overflow-hidden rounded-full">
          <Image src="/Headshot.png" alt="" fill sizes="28px" className="object-cover" priority />
        </span>
        <span className="transition-opacity duration-150 ease-out group-hover:opacity-70">Hasaam Bhatti</span>
      </Link>

      <div className="hidden lg:block">
        <FilterPills />
      </div>

      <div className="flex items-center justify-end gap-5 text-md text-body lg:w-60">
        <a href={`mailto:${CONTACT.email}`} className="transition-[color,transform] duration-150 ease-out hover:text-ink active:scale-[0.96]">
          Email
        </a>
        <a href={CONTACT.x} className="transition-[color,transform] duration-150 ease-out hover:text-ink active:scale-[0.96]">
          X
        </a>
      </div>
    </header>
  );
}
