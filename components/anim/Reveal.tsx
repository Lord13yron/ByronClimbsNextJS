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
  /**
   * Accepted for backward compatibility with the previous ScrollTrigger-based
   * API; ignored now that entry is driven by IntersectionObserver.
   */
  start?: string;
};

/**
 * Scroll-triggered entrance for its children. Fires once when the wrapper
 * enters the viewport. Driven by IntersectionObserver (not ScrollTrigger) so it
 * can't get stuck hidden when the element is already in view at load or when
 * late font reflow invalidates cached scroll positions. Under
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
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const targets = el.querySelectorAll(selector);
    if (!targets.length) return;

    // Hidden start state (visibility:hidden + opacity:0 via autoAlpha).
    gsap.set(targets, {
      autoAlpha: 0,
      y,
      x,
      ...(scale !== undefined ? { scale } : {}),
    });

    let revealed = false;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      gsap.to(targets, {
        autoAlpha: 1,
        y: 0,
        x: 0,
        ...(scale !== undefined ? { scale: 1 } : {}),
        duration,
        ease,
        stagger,
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          reveal();
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
    );
    io.observe(el);

    // Hard fallback: never leave content hidden if IO somehow never fires.
    const failsafe = window.setTimeout(reveal, 1800);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
      gsap.killTweensOf(targets);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
