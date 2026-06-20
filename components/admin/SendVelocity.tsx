"use client";

import { useRef } from "react";
import MonoChip from "@/components/ui/MonoChip";
import {
  gsap,
  prefersReducedMotion,
  useIsomorphicLayoutEffect,
} from "@/components/anim/gsap";
import type { AdminAnalytics } from "@/lib/data-service";

type SendVelocityProps = {
  velocity: AdminAnalytics["velocity"];
};

/**
 * Site-wide sends, last 12 rolling months. The busiest month is highlighted in
 * ember. Bars grow up from the baseline on scroll-in; under reduced motion they
 * render at full height immediately.
 */
export default function SendVelocity({ velocity }: SendVelocityProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { bars, maxIndex, total, busiestLabel, rangeLabel } = velocity;
  const max = Math.max(...bars.map((b) => b.count), 1);

  useIsomorphicLayoutEffect(() => {
    const el = rootRef.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ad-vbar",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.04,
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="bg-chalk border border-chalk-3 rounded-sm"
      style={{ padding: "clamp(18px,2.4vw,26px)" }}
    >
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <MonoChip className="text-ember mb-1.5 block">— SEND VELOCITY</MonoChip>
          <h3 className="m-0 font-display text-[23px] uppercase leading-none text-granite-100">
            Sends logged · 12 months
          </h3>
        </div>
        <MonoChip className="text-slate-500">{rangeLabel}</MonoChip>
      </div>

      {/* Bar chart */}
      <div
        className="relative flex items-end border-b border-chalk-3"
        style={{ height: 210, paddingBottom: 28, gap: "clamp(4px,1.2vw,12px)" }}
      >
        {bars.map((b, i) => {
          const heightPct = (b.count / max) * 100;
          const isMax = i === maxIndex;
          return (
            <div
              key={i}
              className="relative flex h-full flex-1 flex-col items-center"
            >
              <div className="relative flex w-full flex-1 items-end justify-center">
                <div
                  className="ad-vbar w-full"
                  style={{
                    height: `${heightPct}%`,
                    maxWidth: 42,
                    borderRadius: "2px 2px 0 0",
                    transformOrigin: "bottom",
                    background: isMax ? "var(--ember)" : "var(--granite-100)",
                  }}
                />
                {b.count > 0 && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2"
                    style={{ bottom: `calc(${heightPct}% + 6px)` }}
                  >
                    <MonoChip className="whitespace-nowrap text-[10px] text-granite-100">
                      {b.count}
                    </MonoChip>
                  </div>
                )}
              </div>
              <MonoChip className="absolute -bottom-5.5 text-[9px] text-slate-400">
                {b.label}
              </MonoChip>
            </div>
          );
        })}
      </div>

      <MonoChip className="mt-9 block text-slate-500">
        {total} SENDS LOGGED · BUSIEST MONTH {busiestLabel}
      </MonoChip>
    </div>
  );
}
