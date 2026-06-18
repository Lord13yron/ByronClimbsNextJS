"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import MonoChip from "@/components/ui/MonoChip";
import Counter from "@/components/anim/Counter";
import {
  gsap,
  prefersReducedMotion,
  useIsomorphicLayoutEffect,
} from "@/components/anim/gsap";
import type { MastheadStats } from "@/lib/database-stats";

// three.js stays out of SSR / the initial bundle.
const GradeSkyline = dynamic(() => import("./GradeSkyline"), { ssr: false });

type DatabaseMastheadProps = {
  stats: MastheadStats;
  /** Per-grade boulder counts (low → high) that drive the skyline ridge. */
  skylineCounts: number[];
};

type Stat = { value: number; suffix?: string; text?: string; caption: string; ember?: boolean };

export default function DatabaseMasthead({
  stats,
  skylineCounts,
}: DatabaseMastheadProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".mast-line", {
        yPercent: 120,
        duration: 0.95,
        ease: "power3.out",
      }).from(
        ".mast-rise",
        {
          autoAlpha: 0,
          y: 14,
          duration: 0.65,
          stagger: 0.1,
          ease: "power2.out",
        },
        0.45,
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const numericStats: Stat[] = [
    { value: stats.routes, caption: "Routes logged" },
    { value: stats.sends, caption: "Sends" },
    { value: stats.crags, caption: "Crags" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[clamp(520px,80vh,680px)] flex-col justify-end overflow-hidden bg-granite-200"
    >
      {/* 3D skyline */}
      <GradeSkyline counts={skylineCounts} />

      {/* Ember glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at 82% 14%, rgba(200,84,30,0.20), transparent 64%)",
          animation: "mast-glow 9s ease-in-out infinite alternate",
        }}
      />
      {/* Vertical scrim */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(22,22,24,0.88) 0%, rgba(22,22,24,0.30) 30%, rgba(22,22,24,0.12) 52%, rgba(22,22,24,0.82) 100%)",
        }}
      />
      {/* Top fade band to seat the sticky header */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-22"
        style={{
          background: "linear-gradient(180deg, rgba(22,22,24,0.85), transparent)",
        }}
      />

      {/* Content */}
      <div
        className="relative z-[2] mx-auto w-full max-w-7xl"
        style={{
          padding:
            "clamp(36px,7vw,60px) clamp(20px,5vw,56px) clamp(30px,5vw,48px)",
        }}
      >
        {/* Eyebrow */}
        <div className="mast-rise mb-5 flex items-center gap-3">
          <MonoChip className="text-ember-soft">— THE DATABASE</MonoChip>
          <span
            className="h-px w-[min(200px,30vw)]"
            style={{
              background:
                "linear-gradient(90deg, rgba(227,122,63,0.6), transparent)",
            }}
          />
        </div>

        {/* Title */}
        <h1
          className="font-display font-extrabold uppercase text-chalk"
          style={{ fontSize: "clamp(52px,9vw,120px)", lineHeight: 0.86 }}
        >
          <span className="block overflow-hidden">
            <span className="mast-line block">The logbook.</span>
          </span>
        </h1>

        {/* Bottom row: sub-paragraph + stat cluster */}
        <div className="mt-7 flex flex-wrap items-end justify-between gap-x-10 gap-y-8">
          <p
            className="mast-rise max-w-[540px] font-body text-[rgba(244,241,236,0.78)]"
            style={{ fontSize: "clamp(14px,1.5vw,16.5px)", lineHeight: 1.65 }}
          >
            Every problem I&apos;ve touched, on file — sends, projects, and the
            ones still waiting. Filter by grade, crag, or status, and dig through
            the whole grind.
          </p>

          {/* Stat cluster */}
          <div className="mast-rise flex flex-wrap gap-x-[clamp(20px,3vw,34px)] gap-y-5">
            {numericStats.map((s) => (
              <div key={s.caption}>
                <div
                  className="font-display font-extrabold leading-[0.9] text-chalk"
                  style={{ fontSize: "clamp(38px,5vw,54px)" }}
                >
                  <Counter value={s.value} />
                </div>
                <MonoChip className="mt-1.5 block text-[rgba(244,241,236,0.5)]">
                  {s.caption}
                </MonoChip>
              </div>
            ))}
            {/* Top send (text, not counted) */}
            <div>
              <div
                className="font-display font-extrabold leading-[0.9] text-ember-soft"
                style={{ fontSize: "clamp(38px,5vw,54px)" }}
              >
                {stats.topSend}
              </div>
              <MonoChip className="mt-1.5 block text-[rgba(244,241,236,0.5)]">
                Top send
              </MonoChip>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-4 left-1/2 z-[2] flex -translate-x-1/2 flex-col items-center gap-1.5 text-[rgba(244,241,236,0.42)]"
        style={{ animation: "mast-bob 2.4s ease-in-out infinite" }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
          Explore
        </span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M2 4l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
