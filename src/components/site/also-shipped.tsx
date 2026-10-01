import type { Shipped } from "@/data/site";
import { MARKS } from "@/data/site";
import { ProjectMark } from "./project-mark";
import { cn } from "@/lib/utils";

/* Desktop: a grid of index cards. Mobile: one list card. The ↗ means the link leaves the site. */
export function AlsoShipped({ items, variant }: { items: Shipped[]; variant: "home" | "lens" }) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="also-shipped" data-scroll-goal="scroll:also-shipped" className="mx-auto w-full max-w-content pt-24">
      {variant === "home" ? (
        <>
          <header className="hidden items-center gap-4 lg:flex">
            <ProjectMark mark={MARKS.index} size={48} />
            <div className="flex flex-col gap-0.5">
              <h2 id="also-shipped" className="text-xl font-light">
                Also shipped
              </h2>
              <p className="text-base text-body">Smaller tools, agents and automations, built along the way.</p>
            </div>
          </header>
          <header className="flex flex-col gap-4 px-4 lg:hidden">
            <div className="flex items-center gap-3.5">
              <ProjectMark mark={MARKS.index} size={56} />
              <div className="flex flex-col gap-0.5">
                <p className="text-xl font-light">Also shipped</p>
                <p className="text-md text-body">2025 to 2026</p>
              </div>
            </div>
            <p className="text-base text-body">Smaller tools, agents and automations, built along the way.</p>
          </header>
        </>
      ) : (
        <h2 id="also-shipped" className="px-4 text-xl font-light lg:px-0">
          Also shipped
        </h2>
      )}

      {/* Home's six fill two rows of three; a lens shows two or three in the page's four-column rhythm */}
      <ul className={cn("hidden gap-4 lg:grid", variant === "home" ? "mt-12 grid-cols-3" : "mt-6 grid-cols-4")}>
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener"
              className="shadow-tile group flex h-[132px] flex-col justify-between rounded-tile bg-tile px-5 pb-[18px] pt-4 transition-transform duration-150 ease-out active:scale-[0.96]"
            >
              <span className="flex items-center justify-between">
                <ProjectMark mark={item.mark} size={32} />
                <span className="text-xs text-subtle">
                  {item.year} <span className="arrow-out">↗</span>
                </span>
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-base text-ink">{item.name}</span>
                <span className="text-md text-body">{item.line}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <ul className="shadow-tile mx-4 mt-6 flex flex-col rounded-tile bg-tile px-4 py-1 lg:hidden">
        {items.map((item, i) => (
          <li key={item.id} className={cn(i > 0 && "border-t border-border")}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener"
              className="-mx-2 flex items-center gap-3 rounded-[20px] px-2 py-3 transition-colors duration-150 ease-out active:bg-fill"
            >
              <ProjectMark mark={item.mark} size={32} />
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-base text-ink">{item.name}</span>
                <span className="truncate text-md text-body">{item.line}</span>
              </span>
              <span className="shrink-0 text-xs text-subtle">{item.year} ↗</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
