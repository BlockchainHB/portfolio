"use client";

import React from "react";
import { TweetCard, TweetCardProps } from "@/components/magicui/tweet-card";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export function TweetCarousel({ items }: { items: TweetCardProps[] }) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const scrollByAmount = 332; // card width (320) + gap (12)

  const scrollLeft = () => {
    ref.current?.scrollBy({ left: -scrollByAmount, behavior: "smooth" });
  };
  const scrollRight = () => {
    ref.current?.scrollBy({ left: scrollByAmount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white/90 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white/90 to-transparent pointer-events-none" />
      <div
        ref={ref}
        className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] snap-x snap-mandatory"
      >
        <div className="flex gap-3 px-1">
          {items.map((t) => (
            <div key={t.href} className="w-[320px] shrink-0 snap-start">
              <TweetCard {...t} />
            </div>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1">
        <button
          type="button"
          aria-label="Previous"
          onClick={scrollLeft}
          className="pointer-events-auto inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1">
        <button
          type="button"
          aria-label="Next"
          onClick={scrollRight}
          className="pointer-events-auto inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}


