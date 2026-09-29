import Image from "next/image";
import Link from "next/link";
import { CONTACT } from "@/data/site";
import { FilterPills } from "./filter-pills";

export function Nav() {
  return (
    <header className="mx-auto flex h-12 w-full max-w-content items-center justify-between">
      <Link href="/" className="flex items-center gap-2.5 text-base text-ink lg:w-60">
        <span className="image-outline relative size-7 shrink-0 overflow-hidden rounded-full">
          <Image src="/Headshot.png" alt="" fill sizes="28px" className="object-cover" priority />
        </span>
        Hasaam Bhatti
      </Link>

      <div className="hidden lg:block">
        <FilterPills id="desktop" />
      </div>

      <div className="flex items-center justify-end gap-5 text-md text-body lg:w-60">
        <a href={`mailto:${CONTACT.email}`} className="transition-colors duration-150 ease-out hover:text-ink">
          Email
        </a>
        <a href={CONTACT.x} className="transition-colors duration-150 ease-out hover:text-ink">
          X
        </a>
      </div>
    </header>
  );
}
