"use client";

import { useIsomorphicLayoutEffect, gsap, prefersReducedMotion } from "./gsap";
import type { RefObject } from "react";

/**
 * Eases an element toward the cursor on desktop and springs it back on leave.
 * No-op below 760px and under reduced motion. Shared by MagneticButton (CTA
 * links) and the contact page's Instagram arrow.
 */
export function useMagnetic(
  ref: RefObject<HTMLElement | null>,
  strength = 0.3,
) {
  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const mql = window.matchMedia("(min-width: 760px)");
    if (!mql.matches) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: "power3.out",
      });
    };
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, [ref, strength]);
}
