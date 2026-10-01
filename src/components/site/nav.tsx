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
        className="group flex items-center gap-2 text-base text-ink transition-transform duration-150 ease-out active:scale-[0.96] lg:w-60"
      >
        {/* A die-cut sticker: the white edge keeps dark hair off a dark page, the shadow lifts it off a light one.
            Hover peels it a few degrees. */}
        <Image
          src="/me-sticker.png"
          alt=""
          width={21}
          height={26}
          quality={90}
          priority
          className="sticker h-[26px] w-auto shrink-0 transition-transform duration-200 ease-out motion-safe:group-hover:-rotate-6 motion-safe:group-hover:scale-[1.06]"
        />
        <span className="transition-opacity duration-150 ease-out group-hover:opacity-70">Hasaam Bhatti</span>
      </Link>

      <div className="hidden lg:block">
        <FilterPills />
      </div>

      <div className="flex items-center justify-end gap-5 text-md text-body lg:w-60">
        <a href={`mailto:${CONTACT.email}`} data-goal="email_click" data-goal-location="nav" className="transition-[color,transform] duration-150 ease-out hover:text-ink active:scale-[0.96]">
          Email
        </a>
        <a
          href={CONTACT.x}
          target="_blank"
          rel="noopener"
          data-goal="social_click"
          data-goal-network="x"
          data-goal-location="nav" className="transition-[color,transform] duration-150 ease-out hover:text-ink active:scale-[0.96]">
          X
        </a>
      </div>
    </header>
  );
}
