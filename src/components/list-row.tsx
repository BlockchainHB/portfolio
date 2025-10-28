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
      <div className="group relative flex items-start justify-between gap-4 rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#1a1a1a] p-3 transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700 dark:hover:bg-[#1f1f1f] will-change-transform hover:translate-y-[-2px] shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-500">
        <div className="flex items-start gap-3">
          {image && (
            <div className={bareImage ? "relative h-7 w-7" : "relative h-7 w-7 overflow-hidden rounded-md border border-slate-200 bg-white dark:border-slate-700 dark:bg-[#252525]"}>
              <Image src={image} alt="" fill sizes="32px" className="object-contain transition-transform duration-150 [transition-timing-function:var(--ease-standard)] group-hover:translate-x-[10px]" />
            </div>
          )}
          <div>
            <div className="font-semibold text-slate-900 dark:text-slate-50">{title}</div>
            {subtitle && <div className="type-meta mt-1">{subtitle}</div>}
            {description && <div className="type-micro mt-1 text-slate-600 dark:text-slate-400 line-clamp-2">{description}</div>}
            {meta && <div className="type-micro mt-1 text-slate-500 dark:text-slate-500">{meta}</div>}
          </div>
        </div>
        <div className="type-micro flex-none shrink-0">
          {right ?? (
            href && (
              <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-[#252525] px-2 py-0.5 text-[11px] leading-none text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#2a2a2a] dark:hover:border-slate-600 whitespace-nowrap transition-all duration-150 [transition-timing-function:var(--ease-standard)] group-hover:translate-x-[4px]">
                {ctaLabel ?? "Learn more"}
              </span>
            )
          )}
        </div>
      </div>
    </Wrapper>
  );
}


