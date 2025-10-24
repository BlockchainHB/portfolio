"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export function ListRow({
  title,
  subtitle,
  description,
  meta,
  href,
  image,
  right,
  ctaLabel,
  bareImage,
}: {
  title: string;
  subtitle?: string;
  description?: string;
  meta?: string;
  href?: string;
  image?: string;
  right?: React.ReactNode;
  ctaLabel?: string;
  bareImage?: boolean;
}) {
  const Wrapper = href ? Link : (React.Fragment as any);
  const wrapperProps = href ? { href } : {};

  return (
    // flat, quiet row
    <Wrapper {...wrapperProps} className={href ? "block" : undefined}>
      <div
        className="group relative flex items-start justify-between gap-3 sm:gap-4 rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900 p-3 sm:p-4 transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-600 will-change-transform hover:translate-y-[-2px] hover:scale-[1.01] elev-1 hover:elev-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-600 cursor-pointer overflow-hidden after:absolute after:inset-0 after:rounded-lg after:opacity-0 after:content-[''] after:bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(0,0,0,0.03),transparent_50%)] dark:after:bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(255,255,255,0.03),transparent_50%)] hover:after:opacity-100 after:transition-opacity after:duration-300 after:pointer-events-none"
        onMouseMove={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          const rect = el.getBoundingClientRect();
          el.style.setProperty("--x", `${e.clientX - rect.left}px`);
          el.style.setProperty("--y", `${e.clientY - rect.top}px`);
        }}
      >
        <div className="flex items-start gap-3 sm:gap-4 relative z-10">
          {image && (
            <div className={bareImage ? "relative h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0" : "relative h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 overflow-hidden rounded-md border border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-800"}>
              <Image src={image} alt="" fill sizes="40px" className="object-contain transition-transform duration-200 [transition-timing-function:var(--ease-standard)] group-hover:scale-110" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="font-semibold text-base sm:text-lg text-slate-900 dark:text-slate-100 mb-1">{title}</div>
            {subtitle && <div className="type-meta mt-1">{subtitle}</div>}
            {description && <div className="text-sm sm:text-base mt-1.5 text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">{description}</div>}
            {meta && <div className="type-micro mt-1 text-slate-500 dark:text-slate-400">{meta}</div>}
          </div>
        </div>
        <div className="flex-none shrink-0 relative z-10 hidden sm:block">
          {right ?? (
            href && (
              <span className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-800 px-3 py-1.5 text-xs font-medium leading-none text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 whitespace-nowrap transition-all duration-200 [transition-timing-function:var(--ease-standard)] group-hover:translate-x-[6px] group-hover:shadow-sm">
                {ctaLabel ?? "Learn more"}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            )
          )}
        </div>
      </div>
    </Wrapper>
  );
}


