"use client";

import { useRef } from "react";
import Link from "next/link";
import MonoChip from "@/components/ui/MonoChip";
import { splitHeadline } from "@/lib/utils";
import {
  gsap,
  prefersReducedMotion,
  useIsomorphicLayoutEffect,
} from "@/components/anim/gsap";

type ArticleHeroProps = {
  title: string;
  /** Pre-formatted as YYYY.MM.DD. */
  date: string;
  readTime: number;
  /** e.g. "JUN 2026". */
  monthYear: string;
};

const PAD_X = "px-[clamp(16px,4vw,56px)]";

/**
 * Editorial newspaper-style header for a single Field Journal article. Mirrors
 * the /blog masthead (FieldJournalMasthead) so an article reads as the same
 * template: a type-only header on chalk — meta strip, oversized line-masked
 * title, rule strip. Entrance animations are progressive enhancement; under
 * `prefers-reduced-motion` (and with no JS) the final layout renders untouched.
 */
export default function ArticleHero({
  title,
  date,
  readTime,
  monthYear,
}: ArticleHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const lines = splitHeadline(title);

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

  return (
    <section ref={ref} className="flex flex-col overflow-hidden bg-chalk">
      {/* 1 — Top meta strip */}
      <div className="flex items-center justify-between px-4 md:px-14 py-3 border-b border-chalk-3">
        <Link href="/blog">
          <MonoChip className="text-[10px] tracking-[0.13em] transition-colors hover:text-ember">
            The Field Journal
          </MonoChip>
        </Link>
        <MonoChip className="text-[10px] hidden tracking-[0.13em] md:block">
          {monthYear}
        </MonoChip>
        <MonoChip className="text-[10px] tracking-[0.13em] whitespace-nowrap">
          {readTime} Min Read
        </MonoChip>
      </div>

      {/* 2 — Title block */}
      <div className={`pt-[clamp(20px,4.5vh,48px)] ${PAD_X}`}>
        <h1 className="font-display font-extrabold uppercase leading-[0.88] tracking-[0.005em] text-balance text-center text-granite-100">
          {lines.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <span
                data-hero-line
                className="block text-[clamp(58px,min(14.6vw,19vh),210px)]"
              >
                {i === lines.length - 1 ? (
                  <>
                    {line}
                    <span className="text-ember">.</span>
                  </>
                ) : (
                  line
                )}
              </span>
            </span>
          ))}
        </h1>
      </div>

      {/* 3 — Rule strip */}
      <div
        data-hero-fade
        className={`mt-[clamp(14px,3vh,30px)] flex items-center justify-between gap-4 border-y border-granite-100 py-3 ${PAD_X}`}
      >
        <MonoChip className="tracking-[0.12em] text-granite-100">
          {date}
        </MonoChip>
        <MonoChip className="flex items-center gap-1.5 tracking-[0.12em] whitespace-nowrap text-ember">
          <span data-hero-dot aria-hidden="true">
            ●
          </span>
          Filed — Kelowna, BC
        </MonoChip>
      </div>

      {/* 4 — Trailing spacer */}
      <div className="h-[clamp(28px,6vh,64px)]" />
    </section>
  );
}
