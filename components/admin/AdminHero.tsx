"use client";

import { useRef } from "react";
import MonoChip from "@/components/ui/MonoChip";
import TopoLine from "@/components/ui/TopoLine";
import Counter from "@/components/anim/Counter";
import DrawOn from "@/components/anim/DrawOn";
import KelownaClock from "./KelownaClock";
import {
  gsap,
  prefersReducedMotion,
  useIsomorphicLayoutEffect,
} from "@/components/anim/gsap";

type AdminHeroProps = {
  stats: {
    totalClimbs: number;
    totalSends: number;
    totalUsers: number;
    totalPosts: number;
  };
};

export default function AdminHero({ stats }: AdminHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".ad-line", {
        yPercent: 110,
        duration: 0.95,
        ease: "power3.out",
      }).from(
        ".ad-rise",
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

    // Failsafe: if anything is somehow left hidden, force it to its final state.
    const failsafe = window.setTimeout(() => {
      section.querySelectorAll<HTMLElement>(".ad-rise").forEach((el) => {
        if (getComputedStyle(el).opacity === "0") {
          gsap.set(el, { autoAlpha: 1, y: 0 });
        }
      });
    }, 1800);

    return () => {
      window.clearTimeout(failsafe);
      ctx.revert();
    };
  }, []);

  const numberStats: { value: number; caption: string; color: string }[] = [
    { value: stats.totalClimbs, caption: "ROUTES IN DATABASE", color: "text-chalk" },
    { value: stats.totalSends, caption: "SENDS LOGGED", color: "text-chalk" },
    { value: stats.totalUsers, caption: "REGISTERED USERS", color: "text-ember-soft" },
    { value: stats.totalPosts, caption: "BLOG POSTS", color: "text-chalk" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[clamp(420px,58vh,540px)] flex-col justify-end overflow-hidden bg-granite-200"
    >
      {/* Ember glow (drifts top-right) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute z-[1]"
        style={{
          top: "-10%",
          right: "2%",
          width: "54%",
          height: "70%",
          background:
            "radial-gradient(ellipse at center, rgba(200,84,30,0.18), transparent 62%)",
          animation: "mast-glow 9s ease-in-out infinite alternate",
        }}
      />

      {/* Topo contour backdrop */}
      <DrawOn
        immediate
        className="pointer-events-none absolute inset-0 z-[1] text-chalk opacity-10"
      >
        <TopoLine rows={14} strokeWidth={1.2} className="h-full w-full" />
      </DrawOn>

      {/* Bottom scrim */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(22,22,24,0.35) 0%, transparent 42%, rgba(22,22,24,0.72) 100%)",
        }}
      />

      {/* Content */}
      <div
        className="relative z-[2] mx-auto w-full max-w-7xl"
        style={{
          padding: "clamp(28px,5vw,46px) clamp(20px,5vw,56px) clamp(28px,4vw,44px)",
        }}
      >
        {/* Status / dateline row */}
        <div className="ad-rise mb-5 flex flex-wrap items-center gap-3.5">
          <MonoChip className="text-ember-soft">— ADMIN DASHBOARD</MonoChip>
          <span
            className="h-px max-w-[180px] flex-1"
            style={{
              background:
                "linear-gradient(90deg, rgba(227,122,63,0.4), transparent)",
            }}
          />
          <span
            className="inline-flex items-center gap-2 rounded-sm px-2.5 py-1.5"
            style={{
              background: "rgba(244,241,236,0.06)",
              border: "1px solid rgba(95,184,122,0.35)",
            }}
          >
            <span
              className="ember-pulse inline-block h-1.5 w-1.5 rounded-full"
              style={{
                background: "#5FB87A",
                boxShadow: "0 0 0 3px rgba(95,184,122,0.18)",
              }}
            />
            <MonoChip className="text-[rgba(244,241,236,0.72)]">
              SYSTEMS NOMINAL
            </MonoChip>
          </span>
          <KelownaClock />
        </div>

        {/* Headline */}
        <h1
          className="font-display font-extrabold uppercase tracking-[0.01em] text-chalk"
          style={{ fontSize: "clamp(52px,10vw,140px)", lineHeight: 0.84 }}
        >
          <span className="block overflow-hidden pb-[0.05em]">
            <span className="ad-line block">
              Command deck<span style={{ color: "#C8541E" }}>.</span>
            </span>
          </span>
        </h1>

        {/* Subhead */}
        <p
          className="ad-rise mt-[18px] max-w-[520px] font-body text-[15px] leading-[1.6] text-[rgba(244,241,236,0.62)]"
        >
          Everything you&rsquo;ve logged, written, and uploaded — at a glance.
          Add routes, publish field notes, and watch the season build.
        </p>

        {/* Stat strip */}
        <div
          className="mt-[clamp(30px,4.5vw,46px)] flex flex-nowrap items-end gap-[clamp(20px,3.4vw,52px)] border-t border-[rgba(244,241,236,0.14)] pt-[clamp(24px,3vw,32px)] max-[620px]:gap-3 max-[420px]:gap-2"
        >
          {numberStats.map((s) => (
            <div key={s.caption} className="ad-rise">
              <div
                className={`font-display font-extrabold leading-[0.86] text-[clamp(40px,5.6vw,64px)] max-[620px]:text-[32px] max-[420px]:text-[26px] ${s.color}`}
              >
                <Counter value={s.value} />
              </div>
              <MonoChip className="mt-2 block whitespace-nowrap text-[rgba(244,241,236,0.5)] max-[620px]:text-[8.5px] max-[620px]:tracking-[0.05em] max-[420px]:text-[8px]">
                {s.caption}
              </MonoChip>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
