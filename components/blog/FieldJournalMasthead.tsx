"use client";

import { useRef } from "react";
import MonoChip from "@/components/ui/MonoChip";
import {
  gsap,
  prefersReducedMotion,
  useIsomorphicLayoutEffect,
} from "@/components/anim/gsap";

type FieldJournalMastheadProps = {
  entriesCount: number;
  /** Newest post date, pre-formatted as YYYY.MM.DD. */
  latestDate: string;
};

const PAD_X = "px-[clamp(16px,4vw,56px)]";

/**
 * Editorial newspaper-style masthead for the Field Journal (/blog). Type-only,
 * no WebGL. All copy except the live entry count + latest date is static page
 * chrome. Entrance animations are progressive enhancement — under
 * `prefers-reduced-motion` (and with no JS) the final layout renders untouched.
 */
export default function FieldJournalMasthead({
  entriesCount,
  latestDate,
}: FieldJournalMastheadProps) {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from("[data-hero-line]", {
        yPercent: 110,
        duration: 1.15,
        ease: "power4.out",
        stagger: 0.09,
        delay: 0.1,
      });

      tl.from(
        "[data-hero-fade]",
        {
          y: 22,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
        },
        0.55,
      );

      gsap.to("[data-hero-dot]", {
        opacity: 0.25,
        duration: 0.9,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const handleStartReading = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("featured")?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  return (
    <section ref={ref} className="flex flex-col overflow-hidden bg-chalk">
      {/* 1 — Top meta strip */}
      <div className="flex items-center justify-between px-4 md:px-14 py-3 border-b border-chalk-3">
        {/* <div
        className={`flex items-center justify-between gap-4 border-b border-chalk-3 py-3 ${PAD_X}`}
      > */}
        <MonoChip className="text-[10px] tracking-[0.13em]">
          The Field Journal — Vol. 07
        </MonoChip>
        <MonoChip className="text-[10px] hidden tracking-[0.13em] lg:block">
          Trip Reports · Training Notes · The Occasional Rant About Footwork
        </MonoChip>
        <MonoChip className="text-[10px] tracking-[0.13em] whitespace-nowrap">
          {String(entriesCount).padStart(2, "0")} Entries
        </MonoChip>
      </div>

      {/* 2 — Title block */}
      <div className={`pt-[clamp(20px,4.5vh,48px)] ${PAD_X}`}>
        <h1 className="font-display font-extrabold uppercase leading-[0.88] tracking-[0.005em] text-center text-granite-100">
          <span className="block overflow-hidden">
            <span
              data-hero-line
              className="block whitespace-nowrap text-[clamp(58px,min(14.6vw,19vh),210px)]"
            >
              Notes From
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              data-hero-line
              className="block whitespace-nowrap text-[clamp(58px,min(14.6vw,19vh),210px)]"
            >
              The Gneiss<span className="text-ember">.</span>
            </span>
          </span>
        </h1>
      </div>

      {/* 3 — Rule strip */}
      <div
        data-hero-fade
        className={`mt-[clamp(14px,3vh,30px)] flex items-center justify-between gap-4 border-y border-granite-100 py-3 ${PAD_X}`}
      >
        <MonoChip className="tracking-[0.12em] text-granite-100">
          2024 — Ongoing
        </MonoChip>
        <MonoChip className="hidden tracking-[0.12em] text-granite-100 md:block">
          Written From The Crag, Mostly
        </MonoChip>
        <MonoChip className="flex items-center gap-1.5 tracking-[0.12em] whitespace-nowrap text-ember">
          <span data-hero-dot aria-hidden="true">
            ●
          </span>
          Latest — {latestDate}
        </MonoChip>
      </div>

      {/* 4 — Intro row */}
      <div
        data-hero-fade
        className={`flex flex-col justify-between gap-8 pt-[clamp(18px,3.5vh,34px)] md:flex-row ${PAD_X}`}
      >
        <p className="max-w-[52ch] text-pretty font-body text-[16px] font-light leading-[1.7] text-slate-700">
          Trip reports, training notes, information about all the different
          places I climb and all my favorite routes and boulders.
        </p>
        <div className="flex flex-col items-start gap-1.5 md:items-end">
          <MonoChip className="hidden tracking-[0.12em] md:block">
            49.8880° N · 119.4960° W
          </MonoChip>
          <MonoChip className="hidden tracking-[0.12em] md:block">
            Elev. 344 M · Okanagan
          </MonoChip>
          <a
            href="#featured"
            onClick={handleStartReading}
            className="mt-1 inline-block border-b-[1.5px] border-ember pb-0.5 font-display text-[14px] font-bold uppercase tracking-[0.08em] text-granite-100 transition-colors hover:text-ember"
          >
            Start Reading ↓
          </a>
        </div>
      </div>

      {/* 5 — Trailing spacer */}
      <div className="h-[clamp(28px,6vh,64px)]" />
    </section>
  );
}
