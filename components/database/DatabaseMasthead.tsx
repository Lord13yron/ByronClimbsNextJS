"use client";

import { useRef } from "react";
import MonoChip from "@/components/ui/MonoChip";
import TopoLine from "@/components/ui/TopoLine";
import Counter from "@/components/anim/Counter";
import DrawOn from "@/components/anim/DrawOn";
import {
  gsap,
  prefersReducedMotion,
  useIsomorphicLayoutEffect,
} from "@/components/anim/gsap";
import type { MastheadStats } from "@/lib/database-stats";

type DatabaseMastheadProps = {
  stats: MastheadStats;
};

type Stat = { value: number; caption: string };

export default function DatabaseMasthead({ stats }: DatabaseMastheadProps) {
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
      className="relative isolate flex min-h-[clamp(420px,58vh,540px)] flex-col justify-between overflow-hidden bg-granite-200"
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
            "radial-gradient(ellipse at center, rgba(200,84,30,0.18), transparent 66%)",
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
            "linear-gradient(180deg, rgba(22,22,24,0.25) 0%, transparent 42%, rgba(22,22,24,0.5) 100%)",
        }}
      />

      {/* Top block — newspaper dateline */}
      <div
        className="relative z-[2] mx-auto w-full max-w-7xl"
        style={{ padding: "clamp(20px,4vw,32px) clamp(20px,5vw,56px) 0" }}
      >
        <div
          className="mast-rise flex flex-wrap items-center justify-between gap-4 border-y py-[11px]"
          style={{ borderColor: "rgba(244,241,236,0.3)" }}
        >
          <MonoChip className="text-[rgba(244,241,236,0.72)]">
            VOL. VII · NO. {stats.routes}
          </MonoChip>
          <MonoChip className="hidden text-[rgba(244,241,236,0.72)] md:block">
            THE OKANAGAN RECORD
          </MonoChip>
          <MonoChip className="hidden text-[rgba(244,241,236,0.72)] md:block">
            KELOWNA · BC
          </MonoChip>
          <MonoChip className="text-[rgba(244,241,236,0.72)]">EST. 2019</MonoChip>
        </div>
      </div>

      {/* Bottom block — headline cluster */}
      <div
        className="relative z-[2] mx-auto w-full max-w-7xl"
        style={{ padding: "0 clamp(20px,5vw,56px) clamp(30px,5vw,48px)" }}
      >
        {/* Eyebrow */}
        <div className="mast-rise mb-5 flex items-center gap-3.5">
          <MonoChip className="text-ember-soft">— THE DATABASE</MonoChip>
          <span
            className="h-px max-w-[200px] flex-1"
            style={{
              background:
                "linear-gradient(90deg, rgba(227,122,63,0.55), transparent)",
            }}
          />
        </div>

        {/* Title */}
        <h1
          className="font-display font-extrabold uppercase tracking-[0.01em] text-chalk"
          style={{ fontSize: "clamp(52px,9vw,120px)", lineHeight: 0.86 }}
        >
          <span className="block overflow-hidden pb-[0.03em]">
            <span className="mast-line block">The logbook.</span>
          </span>
        </h1>

        {/* Sub-row: subtitle + stat cluster */}
        <div className="mt-[22px] flex flex-wrap items-end justify-between gap-7">
          <p
            className="mast-rise max-w-[540px] font-body text-[rgba(244,241,236,0.82)]"
            style={{
              fontSize: "clamp(14px,1.5vw,16.5px)",
              lineHeight: 1.65,
              textShadow: "0 1px 8px rgba(0,0,0,0.5)",
              textWrap: "pretty",
            }}
          >
            Every problem I&rsquo;ve touched, logged honestly — Okanagan granite
            and gneiss, a few Sea-to-Sky classics, and the odd block from Font
            and North Wales. Sends, projects, and the pyramid underneath it all.
          </p>

          {/* Stat cluster */}
          <div className="flex flex-wrap items-end gap-[clamp(20px,3vw,34px)]">
            {numericStats.map((s) => (
              <div key={s.caption} className="mast-rise">
                <div
                  className="font-display font-extrabold leading-[0.9] text-chalk"
                  style={{ fontSize: "clamp(38px,5vw,54px)" }}
                >
                  <Counter value={s.value} />
                </div>
                <MonoChip className="mt-2 block text-[rgba(244,241,236,0.5)]">
                  {s.caption}
                </MonoChip>
              </div>
            ))}
            {/* Top send (text, not counted) */}
            <div className="mast-rise">
              <div
                className="font-display font-extrabold leading-[0.9] text-ember-soft"
                style={{ fontSize: "clamp(38px,5vw,54px)" }}
              >
                {stats.topSend}
              </div>
              <MonoChip className="mt-2 block text-[rgba(244,241,236,0.5)]">
                Top send
              </MonoChip>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
