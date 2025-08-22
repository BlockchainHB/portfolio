"use client";

import { AnimatePresence, motion, useInView, Variants } from "framer-motion";
import { CSSProperties, useMemo, useRef } from "react";
import { useMotion } from "@/components/motion-provider";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  inViewMargin?: string;
  blur?: string;
  /** optional index for staggered timing */
  staggerIndex?: number;
  /** 'auto' selects view timeline if supported, else IO (framer). */
  mode?: "auto" | "view" | "io";
}
const BlurFade = ({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  yOffset = 6,
  inView = false,
  inViewMargin = "-50px",
  blur = "6px",
  staggerIndex,
  mode = "io",
}: BlurFadeProps) => {
  const { reducedMotion, supportsViewTimeline } = useMotion();
  const ref = useRef(null);
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
  const isInView = !inView || inViewResult;
  const defaultVariants: Variants = {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
    visible: { y: -yOffset, opacity: 1, filter: `blur(0px)` },
  };
  const combinedVariants = variant || defaultVariants;

  // compute delay values (seconds) from props and stagger index (40ms per step)
  const computedDelaySeconds = useMemo(() => {
    const baseMs = (delay || 0) * 1000;
    const staggerMs = (staggerIndex ?? 0) * 40;
    return (baseMs + staggerMs) / 1000;
  }, [delay, staggerIndex]);

  const effectiveMode: "view" | "io" = useMemo(() => {
    if (mode === "view" || mode === "io") return mode;
    return supportsViewTimeline && !reducedMotion ? "view" : "io";
  }, [mode, supportsViewTimeline, reducedMotion]);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  if (effectiveMode === "view") {
    const style: CSSProperties & { animationDelay?: string } = {};
    if (computedDelaySeconds > 0) style.animationDelay = `${computedDelaySeconds}s`;
    const classes = ["sl-reveal", className].filter(Boolean).join(" ");
    return (
      <div className={classes} style={style}>
        {children}
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        exit="hidden"
        variants={combinedVariants}
        transition={{
          delay: 0.04 + computedDelaySeconds,
          duration,
          ease: "easeOut",
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default BlurFade;
