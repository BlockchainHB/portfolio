"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { LENSES } from "@/data/site";
import { cn } from "@/lib/utils";
import { SlidingIndicator } from "./sliding-indicator";

const ITEMS = [{ href: "/", label: "All" }, ...LENSES.map((l) => ({ href: `/${l.slug}`, label: l.label }))];

/*
 * The lens filter. The selected pill slides between items inside the row;
 * the label color is the static cue, so the state never depends on motion.
 */
export function FilterPills({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname() ?? "/";
  const list = useRef<HTMLUListElement>(null);
  const active = ITEMS.findIndex((item) => (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)));

  return (
    <nav aria-label="Filter work" className="flex rounded-full bg-fill p-1">
      <ul ref={list} className={cn("relative flex", compact ? "gap-0" : "gap-0.5")}>
        <SlidingIndicator containerRef={list} active={active} className="inset-y-0 rounded-full bg-selected shadow-tile" />
        {ITEMS.map((item, i) => (
          <li key={item.href} data-segment className="relative">
            {/* scroll={false}: the page keeps its scroll, so the filter stays under
                the finger (every mobile masthead is the same height) */}
            <Link
              href={item.href}
              scroll={false}
              aria-current={i === active ? "page" : undefined}
              className={cn(
                "relative flex h-9 items-center rounded-full text-sm transition-[color,transform] duration-150 ease-out active:scale-[0.96]",
                compact ? "px-[9px]" : "px-4",
                i === active ? "text-ink" : "text-body hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
