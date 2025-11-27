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
    // Clean, minimal row
    <Wrapper {...wrapperProps} className={href ? "block" : undefined}>
      <div className="group relative flex items-start gap-3 py-2 transition-all duration-150 hover:translate-x-0.5 focus:outline-none">
        {image && (
          <div className={bareImage ? "relative h-5 w-5 flex-shrink-0 mt-0.5" : "relative h-5 w-5 flex-shrink-0 mt-0.5 overflow-hidden border border-border"}>
            <Image src={image} alt="" fill sizes="20px" className="object-contain" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-medium text-foreground leading-tight">{title}</div>
          {subtitle && <div className="text-[12px] text-muted-foreground mt-0.5">{subtitle}</div>}
          {description && <div className="text-[12px] text-muted-foreground mt-0.5 line-clamp-1">{description}</div>}
          {meta && <div className="text-[11px] text-muted-foreground mt-0.5">{meta}</div>}
        </div>
        {right}
      </div>
    </Wrapper>
  );
}


