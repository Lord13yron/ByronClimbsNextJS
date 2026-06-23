"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  gsap,
  prefersReducedMotion,
  useIsomorphicLayoutEffect,
} from "../anim/gsap";

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * A link that eases toward the cursor on desktop and springs back on leave.
 * Disabled below 760px and under reduced motion (renders as a plain link).
 */
export default function MagneticButton({
  href,
  children,
  className,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

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
        x: x * 0.3,
        y: y * 0.3,
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
  }, []);

  return (
    <Link ref={ref} href={href} className={className}>
      {children}
    </Link>
  );
}
