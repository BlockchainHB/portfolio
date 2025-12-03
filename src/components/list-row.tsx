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
      <div className="group relative flex items-start justify-between gap-4 rounded-lg border border-border bg-card p-3 transition-all duration-200 hover:border-ring/50 will-change-transform hover:translate-y-[-2px] shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <div className="flex items-start gap-3">
          {image && (
            <div className={bareImage ? "relative h-8 w-8" : "relative h-8 w-8 overflow-hidden rounded-md border border-border bg-card"}>
              <Image src={image} alt="" fill sizes="32px" className="object-contain transition-transform duration-150 [transition-timing-function:var(--ease-standard)] group-hover:translate-x-[10px]" />
            </div>
          )}
          <div>
            <div className="text-[12.8px] font-medium text-foreground">{title}</div>
            {subtitle && <div className="text-[12.8px] text-muted-foreground mt-1">{subtitle}</div>}
            {description && <div className="text-[11px] text-muted-foreground mt-1 line-clamp-2">{description}</div>}
            {meta && <div className="text-[11px] text-muted-foreground mt-1">{meta}</div>}
          </div>
        </div>
        <div className="type-micro flex-none shrink-0">
          {right ?? (
            href && (
              <span className="inline-flex items-center gap-1 rounded-md border border-border bg-muted px-2 py-1 text-[11px] leading-none text-muted-foreground hover:bg-accent whitespace-nowrap transition-all duration-150 [transition-timing-function:var(--ease-standard)] group-hover:translate-x-[4px]">
                {ctaLabel ?? "Learn more"}
              </span>
            )
          )}
        </div>
      </div>
    </Wrapper>
  );
}


