"use client";

import { useRef } from "react";
import {
  gsap,
  prefersReducedMotion,
  useIsomorphicLayoutEffect,
} from "./gsap";

type DrawOnProps = {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  stagger?: number;
  start?: string;
  /** Animate on mount instead of on scroll (used by the hero). */
  immediate?: boolean;
};

/**
 * Draws every <path> inside via stroke-dashoffset, once, when scrolled in (or
 * immediately for the hero). Under reduced motion the paths render fully drawn.
 */
export default function DrawOn({
  children,
  className,
  duration = 2,
  stagger = 0.15,
  start = "top 90%",
  immediate = false,
}: DrawOnProps) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const paths = el.querySelectorAll("path");
      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.to(paths, {
        strokeDashoffset: 0,
        duration,
        ease: "power1.inOut",
        stagger,
        ...(immediate
          ? { delay: 0.2 }
          : { scrollTrigger: { trigger: el, start, once: true } }),
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
