import React from "react";
import BlurFade from "@/components/magicui/blur-fade";

export function Section({
  title,
  children,
  className,
  sticky = false,
  showProgress = false,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
  sticky?: boolean;
  showProgress?: boolean;
}) {
  return (
    <section className={"relative " + (className ?? "")}>{
      showProgress && (
        <div aria-hidden className="pointer-events-none absolute inset-y-0 -left-3 w-[2px] overflow-hidden">
          <div className="h-full w-full origin-top bg-border opacity-70" />
        </div>
      )
    }
      {title && (
        <div className={sticky ? "sticky top-0 z-10 -mx-1 px-1 py-2 bg-background/70 backdrop-blur-sm" : undefined}>
          <BlurFade>
            <h2 className="type-h2">{title}</h2>
          </BlurFade>
        </div>
      )}
      <div className="mt-3">{children}</div>
    </section>
  );
}


