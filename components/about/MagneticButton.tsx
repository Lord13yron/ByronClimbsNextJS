"use client";

import { useRef } from "react";
import Link from "next/link";
import { useMagnetic } from "../anim/useMagnetic";

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** How strongly the button tracks the cursor (0–1). */
  strength?: number;
};

/**
 * A link that eases toward the cursor on desktop and springs back on leave.
 * Disabled below 760px and under reduced motion (renders as a plain link).
 */
export default function MagneticButton({
  href,
  children,
  className,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  useMagnetic(ref, strength);

  return (
    <Link ref={ref} href={href} className={className}>
      {children}
    </Link>
  );
}
