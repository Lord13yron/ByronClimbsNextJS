"use client";

import { useRef } from "react";
import {
  gsap,
  prefersReducedMotion,
  useIsomorphicLayoutEffect,
} from "./gsap";

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;
  /** Vertical drift across the scroll window, in % of the element's height. */
  yPercent?: number;
};

/**
 * Scroll-scrubbed vertical parallax for its children. Under
 * `prefers-reduced-motion` the children render in their resting position.
 */
export default function Parallax({
  children,
  className,
  yPercent = 7,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -yPercent / 2 },
        {
          yPercent: yPercent / 2,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [yPercent]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
