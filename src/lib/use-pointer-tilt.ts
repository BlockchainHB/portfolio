'use client';

import { RefObject, useCallback, useEffect, useRef } from "react";
import { useMotion } from "@/components/motion-provider";

export type PointerTiltOptions = {
  maxTiltDeg?: number; // default 4
  perspectivePx?: number; // default 800
  glare?: boolean; // apply CSS var for glare position
  damping?: number; // 0..1 lerp per frame, default ~0.14
};

export function usePointerTilt<T extends HTMLElement>(ref: RefObject<T>, options?: PointerTiltOptions) {
  const { reducedMotion } = useMotion();
  const maxTiltDeg = options?.maxTiltDeg ?? 3.5;
  const perspectivePx = options?.perspectivePx ?? 800;
  const enableGlare = options?.glare ?? true;
  const damping = Math.min(0.35, Math.max(0.06, options?.damping ?? 0.14));

  const targetRotateX = useRef(0);
  const targetRotateY = useRef(0);
  const currentRotateX = useRef(0);
  const currentRotateY = useRef(0);
  const rafId = useRef<number | null>(null);
  const hovering = useRef(false);

  const reset = useCallback(() => {
    if (!ref.current) return;
    targetRotateX.current = 0;
    targetRotateY.current = 0;
    currentRotateX.current = 0;
    currentRotateY.current = 0;
    ref.current.style.transform = "perspective(" + perspectivePx + "px) rotateX(0deg) rotateY(0deg)";
    if (enableGlare) ref.current.style.setProperty("--glare-x", "50%");
  }, [ref, perspectivePx, enableGlare]);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;

    const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

    const tick = () => {
      currentRotateX.current = lerp(currentRotateX.current, targetRotateX.current, damping);
      currentRotateY.current = lerp(currentRotateY.current, targetRotateY.current, damping);
      el.style.transform = `perspective(${perspectivePx}px) rotateX(${currentRotateX.current}deg) rotateY(${currentRotateY.current}deg)`;
      if (hovering.current || Math.abs(currentRotateX.current) > 0.01 || Math.abs(currentRotateY.current) > 0.01) {
        rafId.current = requestAnimationFrame(tick);
      } else {
        rafId.current = null;
      }
    };

    const startRaf = () => {
      if (rafId.current == null) rafId.current = requestAnimationFrame(tick);
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const clampedX = Math.max(-1, Math.min(1, dx));
      const clampedY = Math.max(-1, Math.min(1, dy));
      const rotateY = clampedX * maxTiltDeg; // left-right
      const rotateX = -clampedY * maxTiltDeg; // top-bottom
      targetRotateX.current = rotateX;
      targetRotateY.current = rotateY;
      if (enableGlare) el.style.setProperty("--glare-x", `${((clampedX + 1) / 2) * 100}%`);
      startRaf();
    };

    const handleEnter = () => {
      hovering.current = true;
      startRaf();
    };

    const handleLeave = () => {
      hovering.current = false;
      targetRotateX.current = 0;
      targetRotateY.current = 0;
      startRaf();
    };

    el.style.transformStyle = "preserve-3d";
    el.addEventListener("pointerenter", handleEnter, { passive: true } as any);
    el.addEventListener("pointermove", handlePointerMove, { passive: true } as any);
    el.addEventListener("pointerleave", handleLeave, { passive: true } as any);

    return () => {
      el.removeEventListener("pointerenter", handleEnter as any);
      el.removeEventListener("pointermove", handlePointerMove as any);
      el.removeEventListener("pointerleave", handleLeave as any);
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
    };
  }, [ref, maxTiltDeg, perspectivePx, enableGlare, reducedMotion, reset, damping]);

  return { reset };
}


