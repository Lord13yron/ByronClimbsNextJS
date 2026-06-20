"use client";

import { useRef } from "react";
import Link from "next/link";
import MonoChip from "./ui/MonoChip";
import {
  gsap,
  prefersReducedMotion,
  useIsomorphicLayoutEffect,
} from "./anim/gsap";
import type { CragCount } from "@/lib/database-stats";

type AccountTopCragsProps = {
  crags: CragCount[];
};

export default function AccountTopCrags({ crags }: AccountTopCragsProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const maxCrag = Math.max(1, ...crags.map((c) => c.count));

  // scaleX grow-in for each bar (origin-left). Reduced motion → full width.
  useIsomorphicLayoutEffect(() => {
    const el = rootRef.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".fs-bar").forEach((bar) => {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: bar, start: "top 90%", once: true },
          },
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="rounded-sm border border-chalk-3 bg-chalk p-5 md:p-6"
    >
      <MonoChip className="block text-slate-500">— GROUND COVERED</MonoChip>
      <h3 className="mb-4 mt-1 font-display text-[23px] font-bold uppercase leading-none text-granite-100">
        Top crags
      </h3>

      {crags.length === 0 ? (
        <MonoChip className="block py-6 text-slate-400">
          No crags logged yet.
        </MonoChip>
      ) : (
        <div className="grid grid-cols-1 gap-x-10 gap-y-3.5 md:grid-cols-2">
          {crags.map((c) => (
            <Link
              key={c.area}
              href={`/database?crag=${encodeURIComponent(c.area)}`}
              className="group block"
            >
              <div className="mb-1 flex items-baseline justify-between gap-2">
                <span className="font-display text-[15px] font-bold uppercase leading-none text-granite-100 transition-colors group-hover:text-ember">
                  {c.area}
                </span>
                <MonoChip className="text-slate-500">
                  {c.count} · {c.city}
                </MonoChip>
              </div>
              <span className="block h-2 rounded-sm bg-chalk-2">
                <span
                  className="fs-bar block h-full origin-left rounded-sm"
                  style={{
                    width: `${(c.count / maxCrag) * 100}%`,
                    background:
                      "linear-gradient(90deg, var(--ember), var(--ember-soft))",
                  }}
                />
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
