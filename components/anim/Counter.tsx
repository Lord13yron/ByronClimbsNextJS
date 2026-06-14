"use client";

import { useRef } from "react";
import {
  gsap,
  prefersReducedMotion,
  useIsomorphicLayoutEffect,
} from "./gsap";

type CounterProps = {
  value: number;
  className?: string;
  duration?: number;
};

/**
 * Counts up from 0 to `value` once when scrolled into view. SSR renders the
 * final value; under reduced motion it stays at the final value.
 */
export default function Counter({
  value,
  className,
  duration = 1.7,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.textContent = String(value);
      return;
    }

    // Reset to 0 so we never flash the final value before the count-up runs.
    el.textContent = "0";
    const obj = { n: 0 };

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        n: value,
        duration,
        ease: "power2.out",
        snap: { n: 1 },
        onUpdate: () => {
          el.textContent = String(Math.round(obj.n));
        },
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
