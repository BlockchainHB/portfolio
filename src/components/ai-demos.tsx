"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

type Demo = {
  title: string;
  href: string;
  thumb: string; // local image or remote thumb
  views?: string;
};

export function AIDemos({ demos }: { demos: Demo[] }) {
  return (
    <div className="relative overflow-x-auto">
      <ul className="flex gap-3 min-w-full">
        {demos.map((d) => (
          <li key={d.href} className="w-[220px] flex-shrink-0">
            <Link href={d.href} target="_blank" className="block group">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md border border-slate-200 bg-white">
                <Image src={d.thumb} alt={d.title} fill className="object-cover" />
              </div>
              <div className="mt-2 text-xs text-slate-600 line-clamp-2">{d.title}</div>
              {d.views && (
                <div className="text-[11px] text-slate-500 mt-1">{d.views} views</div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


