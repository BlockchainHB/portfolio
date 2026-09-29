"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LENSES } from "@/data/site";
import { cn } from "@/lib/utils";

const ITEMS = [{ href: "/", label: "All" }, ...LENSES.map((l) => ({ href: `/${l.slug}`, label: l.label }))];

/*
 * The lens filter. The selected pill slides between items (spring, no bounce);
 * the label color is the static cue, so the state never depends on motion.
 */
export function FilterPills({ id, compact = false }: { id: string; compact?: boolean }) {
  const pathname = usePathname() ?? "/";

  return (
    <nav aria-label="Filter work" className="flex rounded-full bg-fill p-1">
      <ul className={cn("flex", compact ? "gap-0" : "gap-0.5")}>
        {ITEMS.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <li key={item.href} className="relative">
              {active && (
                <motion.span
                  layoutId={`filter-${id}`}
                  transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                  className="shadow-tile absolute inset-0 rounded-full bg-selected"
                />
              )}
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex h-9 items-center rounded-full text-sm transition-[color,transform] duration-150 ease-out active:scale-[0.96]",
                  compact ? "px-[9px]" : "px-4",
                  active ? "text-ink" : "text-body hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
