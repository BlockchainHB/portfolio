## PRD: Apple‑level Micro‑Interactions, Scroll & Load Animations (2025)

### Context
You have a lean portfolio landing page built with Next.js + Tailwind. We will add a cohesive, premium motion system that feels deliberate, quiet, and fast. Motion must communicate hierarchy, reinforce affordances, and never hurt performance or accessibility.

### Objectives
- Deliver a consistent motion language across hero, lists, cards, media, marquee, and dock.
- Orchestrate initial load elegantly; stage reveals without jank.
- Add scroll‑linked animation where supported; gracefully degrade elsewhere.
- Maintain 60fps interactions; honor reduced‑motion preferences.

### Scope (MVP)
- Foundations: motion tokens, depth, easing, reduced‑motion, provider/orchestrator.
- Scroll‑linked reveals: hero, section headers, list rows, education.
- Card micro‑interactions: `HackathonCard`, `ListRow` hover/press.
- Media: `TweetCard` preview affordances, LQIP; `Marquee` velocity polish.
- Navigation dock: magnification curve, ripple press, tooltip timing, theme morph.

### Non‑Goals
- Rewriting layout/content.
- Adding heavy animation libraries by default (Framer optional for springs).
- Complex 3D scenes or WebGL.

### Design Principles (Apple 2025)
- Purposeful motion, not decoration.
- Depth through subtle glass, layered shadows, soft glare.
- Orchestrated load; responsive to scroll velocity.
- GPU‑only transforms/opacity; predictable layout.
- Full reduced‑motion parity.

---

## System

### Motion Tokens (CSS variables)
Define once; used everywhere. Add to `:root` and `.dark` in `src/app/globals.css`.

```css
:root {
  /* time */
  --motion-duration-xs: 120ms;
  --motion-duration-sm: 180ms;
  --motion-duration-md: 240ms;
  --motion-duration-lg: 360ms;
  --motion-duration-xl: 600ms;

  /* stagger */
  --motion-stagger-micro: 40ms;
  --motion-stagger: 80ms;

  /* easing */
  --ease-swift-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-gentle-in: cubic-bezier(0.2, 0, 0, 1);
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);

  /* depth (shadows as composited layers) */
  --elev-1: 0 2px 6px rgba(0,0,0,.08);
  --elev-2: 0 6px 12px rgba(0,0,0,.10);
  --elev-3: 0 14px 24px rgba(0,0,0,.12);

  /* glass */
  --glass-blur: 16px;
  --glass-noise: 0.015; /* 1.5% */
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --motion-duration-xs: 1ms;
    --motion-duration-sm: 1ms;
    --motion-duration-md: 1ms;
    --motion-duration-lg: 1ms;
    --motion-duration-xl: 1ms;
  }
}
```

### Motion Provider / Orchestrator
Add a lightweight provider to centralize reduced‑motion detection, first‑load orchestration, and view‑timeline support checks.

File: `src/components/motion-provider.tsx`
- Expose context: `{ reducedMotion: boolean, supportsViewTimeline: boolean }`.
- On client mount, set `data-mounted` on `body` to trigger staged CSS reveals.

Integrate in `src/app/layout.tsx` wrapping `children` and `Navbar`.

### Scroll‑Linked Animations
- Prefer CSS View Timelines with `@supports (animation-timeline: view())`.
- Fallback to `IntersectionObserver` + CSS classes for reveal.
- Never mutate layout in animation frames; only `transform`/`opacity`.

---

## Implementation Plan (Step‑by‑Step)

### ✅ Phase 1 — Foundations (tokens + provider + load) - COMPLETED
1) ✅ Update `src/app/globals.css`
   - Add Motion Tokens (above). Keep existing variables intact.
   - Add base utility classes:
   ```css
   .reveal { opacity: 0; transform: translateY(8px); }
   .reveal.in { opacity: 1; transform: none; transition: opacity var(--motion-duration-md) var(--ease-swift-out), transform var(--motion-duration-md) var(--ease-swift-out); }
   .elev-1 { box-shadow: var(--elev-1); }
   .elev-2 { box-shadow: var(--elev-2); }
   .elev-3 { box-shadow: var(--elev-3); }
   .glass { backdrop-filter: blur(var(--glass-blur)); }
   [data-mounted="true"] .load-stagger > * { opacity: 0; transform: translateY(6px); }
   [data-mounted="true"] .load-stagger > * { transition: opacity var(--motion-duration-sm) var(--ease-swift-out), transform var(--motion-duration-sm) var(--ease-swift-out); }
   [data-mounted="true"] .load-stagger > *:nth-child(n) { transition-delay: calc((var(--n, 0)) * var(--motion-stagger-micro)); }
   ```

2) ✅ Create `src/components/motion-provider.tsx`
   - Client component; checks `prefers-reduced-motion` and `CSS.supports('animation-timeline: view()')`.
   - On mount, set `document.body.dataset.mounted = 'true'`.

3) ✅ Wire into `src/app/layout.tsx`
   - Import and wrap content with `MotionProvider`.
   - Add `className="load-stagger"` to the main container if appropriate for initial hero elements.

4) ✅ Verify no visual regressions. LCP/CLS remain stable.

### ✅ Phase 2 — Scroll‑Linked Reveals (hero, section headers, lists) - COMPLETED
1) Extend `src/components/magicui/blur-fade.tsx`
   - Props: `staggerIndex?: number`, `as?: 'view' | 'io'` (default auto).
   - If `view`, apply CSS like:
   ```css
   @supports (animation-timeline: view()) {
     .sl-reveal { opacity: 0; transform: translateY(10px); animation: sl-in var(--motion-duration-lg) var(--ease-swift-out) both; animation-timeline: view(); animation-range: entry 20% cover 30%; }
     @keyframes sl-in { to { opacity: 1; transform: none; } }
   }
   ```
   - Else, use IO to toggle `in` on the `.reveal` base class.

2) Apply to `src/app/page.tsx`
   - Hero: avatar, name, summary wrapped with extended BlurFade; set incremental `staggerIndex`.
   - Section headers (`Section`): apply reveal to `h2`.
   - `DATA.work`/`education` rows: use `staggerIndex` to sequence.

3) ✅ Add subtle hero parallax via CSS variables
   - Implemented via view-timeline with reduced-motion fallback.

### ✅ Phase 3 — Lists & Section Surface - COMPLETED
1) `src/components/section.tsx`
   - Add optional sticky header behavior: `sticky top-[-1px]` with backdrop blur + shrink (scale 1→0.92) as list scrolls under.
   - Left progress bar: add a child `div` positioned absolute on left; its height fills from 0→100% using view timeline or IO‑driven inline style.

2) `src/components/list-row.tsx`
   - Entry: y 12px, opacity 0→1 with stagger.
   - Hover: lift y 2px, apply `elev-2`; CTA chevron slides 4px; image slips 10px after text.
   - Respect reduced‑motion: limit to opacity/color.

### Phase 4 — Cards (HackathonCard)
1) `src/components/hackathon-card.tsx`
   - Aperture reveal: radial mask expand on entry (clip‑path circle from 60%→140%).
   - Hover: 3D tilt ≤4° following pointer; dynamic glare sweep (linear‑gradient mask) at 360ms.
   - Press: depress y 1px, slight saturation drop, spring back on release.
   - De‑activate tilt while scroll velocity is high (throttle on wheel/touchmove).

2) Add small utility: `usePointerTilt` hook in `src/lib/use-pointer-tilt.ts`.

### ✅ Phase 5 — Media Surfaces - COMPLETED
1) `src/components/magicui/tweet-card.tsx`
   - Add LQIP blur (12→0) once poster loads.
   - Desktop: hover to inline autoplay muted; horizontal pointer scrubs time.
   - Touch: first tap preview, second tap navigates; add tiny pill hint.

2) `src/components/magicui/marquee.tsx`
   - Velocity‑reactive blur using CSS variable `--speed`; on hover, local slowdown and icon scale 1.0→1.06 with elastic return.
   - Pause when tab hidden; resume with slight fade‑in.

### ✅ Phase 6 — Navigation Dock - COMPLETED
1) `src/components/navbar.tsx`
   - Magnification curve: center icon scale up to 1.22, neighbors 1.12/1.06 based on pointer proximity (compute distance per icon).
   - Ripple press: radial gradient layer 6px spread; fade 180ms.
   - Tooltip timing: show 220ms on dwell, hide 120ms with y 4px slide.
   - Theme toggle: sun↔moon path morph 360ms; background tint cross‑fade.

### ✅ Phase 7 — QA, A11y, Performance - COMPLETED
1) ✅ Reduced motion audit
   - Implemented: BlurFade bypass, TweetCard scrubbing disabled, controls enabled.

2) ✅ Performance passes
   - Core animations use transforms/opacity; components lint‑clean.

3) ✅ Keyboard/accessibility
   - Added visible focus ring to ListRow; motionless focus feedback.

---

## File‑by‑File Changes (Checklist)
- `src/app/globals.css`: motion tokens, utilities, view‑timeline keyframes.
- `src/components/motion-provider.tsx`: new; context + body `data-mounted`.
- `src/app/layout.tsx`: wrap with `MotionProvider`; ensure container `.load-stagger`.
- `src/components/magicui/blur-fade.tsx`: add view‑timeline + IO fallback + `staggerIndex`.
- `src/components/section.tsx`: sticky header, left progress bar (opt‑in prop).
- `src/components/list-row.tsx`: reveal, hover lift, image slip, CTA micro.
- `src/components/hackathon-card.tsx`: aperture reveal, tilt/glare, press spring.
- `src/components/magicui/tweet-card.tsx`: LQIP, preview, scrub/tap behavior.
- `src/components/magicui/marquee.tsx`: velocity blur, pause/resume polish.
- `src/components/navbar.tsx`: magnification, ripple, tooltip timings, theme morph.

---

## Acceptance Criteria
- Consistency: all animations use tokens; no ad‑hoc timings.
- Performance: 58–60fps under interactions; no layout thrash; CPU idle < 20%.
- A11y: full reduced‑motion coverage; keyboard parity for hover cues.
- Polish: no overlapping animations; no abrupt stops; premium “quiet” feel.

---

## Rollout & Risk
- Rollout per phase behind a simple feature flag (env or context value) if desired.
- Risks: cross‑browser view‑timeline variance; mitigate with IO fallback.

---

## Optional Dependencies
- Framer Motion (springs only): `pnpm add framer-motion` then wrap spring interactions (press/release) while keeping CSS for core reveals.

---

## Test Plan (Concise)
- Desktop Chrome/Firefox/Safari: scroll + hover fps, reduced‑motion.
- iOS Safari (recent + 1 older): scroll, hover substitutes, video preview.
- Low‑end Android Chrome: marquee velocity, card hover disabled appropriately.
- Web Vitals: LCP, CLS, INP; confirm no regressions.

---

## Appendix: Example Snippets

### MotionProvider (outline)
```tsx
'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type MotionCtx = { reducedMotion: boolean; supportsViewTimeline: boolean };
const Ctx = createContext<MotionCtx>({ reducedMotion: false, supportsViewTimeline: false });

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [supportsViewTimeline, setSupportsViewTimeline] = useState(false);
  useEffect(() => {
    try {
      setSupportsViewTimeline(CSS.supports('animation-timeline: view()'));
    } catch {}
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(!!mq.matches);
    update();
    mq.addEventListener('change', update);
    document.body.dataset.mounted = 'true';
    return () => mq.removeEventListener('change', update);
  }, []);
  const value = useMemo(() => ({ reducedMotion, supportsViewTimeline }), [reducedMotion, supportsViewTimeline]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export const useMotion = () => useContext(Ctx);
```

### View‑Timeline Reveal (CSS)
```css
@supports (animation-timeline: view()) {
  .sl-reveal { opacity: 0; transform: translateY(10px); animation: sl-in var(--motion-duration-lg) var(--ease-swift-out) both; animation-timeline: view(); animation-range: entry 20% cover 30%; }
  @keyframes sl-in { to { opacity: 1; transform: none; } }
}
```

### Sticky Section Progress (outline)
```tsx
// in Section.tsx, add an optional prop `sticky?: boolean`
// wrapper: relative; left border element absolutely positioned, height bound to progress
```


