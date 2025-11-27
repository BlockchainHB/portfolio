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
    // flat, quiet row with sharp corners
    <Wrapper {...wrapperProps} className={href ? "block" : undefined}>
      <div className="group relative flex items-start justify-between gap-4 border border-border bg-card p-3 transition-all duration-200 hover:border-accent will-change-transform hover:translate-y-[-2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <div className="flex items-start gap-3">
          {image && (
            <div className={bareImage ? "relative h-7 w-7" : "relative h-7 w-7 overflow-hidden border border-border bg-card"}>
              <Image src={image} alt="" fill sizes="32px" className="object-contain transition-transform duration-150 [transition-timing-function:var(--ease-standard)] group-hover:translate-x-[10px]" />
            </div>
          )}
          <div>
            <div className="font-medium text-foreground">{title}</div>
            {subtitle && <div className="type-meta mt-1">{subtitle}</div>}
            {description && <div className="type-micro mt-1 text-muted-foreground line-clamp-2">{description}</div>}
            {meta && <div className="type-micro mt-1 text-muted-foreground">{meta}</div>}
          </div>
        </div>
        <div className="type-micro flex-none shrink-0">
          {right ?? (
            href && (
              <span className="inline-flex items-center gap-1 border border-border bg-secondary px-2 py-0.5 text-[11px] leading-none text-muted-foreground hover:bg-accent hover:text-accent-foreground whitespace-nowrap transition-all duration-150 [transition-timing-function:var(--ease-standard)] group-hover:translate-x-[4px]">
                {ctaLabel ?? "Learn more"}
              </span>
            )
          )}
        </div>
      </div>
    </Wrapper>
  );
}


