"use client";

import { useRef } from "react";
import {
  gsap,
  prefersReducedMotion,
  useIsomorphicLayoutEffect,
} from "./gsap";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Vertical entrance offset in px. */
  y?: number;
  /** Horizontal entrance offset in px. */
  x?: number;
  /** Initial scale (e.g. 0.3 for the heatmap pop-in). */
  scale?: number;
  stagger?: number;
  duration?: number;
  ease?: string;
  /** Which descendants to animate. Defaults to the direct children. */
  selector?: string;
  start?: string;
};

/**
 * Scroll-triggered entrance for its children. Fires once. Under
 * `prefers-reduced-motion` the children render in their final state untouched.
 */
export default function Reveal({
  children,
  className,
  y = 0,
  x = 0,
  scale,
  stagger = 0,
  duration = 0.9,
  ease = "power3.out",
  selector = ":scope > *",
  start = "top 85%",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll(selector);
      if (!targets.length) return;
      gsap.from(targets, {
        y,
        x,
        ...(scale !== undefined ? { scale } : {}),
        autoAlpha: 0,
        duration,
        ease,
        stagger,
        scrollTrigger: { trigger: el, start, once: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
