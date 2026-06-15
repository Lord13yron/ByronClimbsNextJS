"use client";

import { useEffect, useRef, useState } from "react";
import MonoChip from "@/components/ui/MonoChip";

type ReadingRailProps = {
  date: string;
  readTime: number;
  /** id of the article body element whose scroll progress this rail tracks. */
  targetId?: string;
};

/**
 * Sticky desktop rail beside the reading column: a vertical fill track + live
 * percent that follow reading progress through the article body, the entry's
 * date / read-time, and a back-to-top link. The percent is information (not
 * decoration), so it updates regardless of `prefers-reduced-motion`.
 */
export default function ReadingRail({
  date,
  readTime,
  targetId = "article-body",
}: ReadingRailProps) {
  const fillRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const body = document.getElementById(targetId);
    if (!body) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const elTop = body.getBoundingClientRect().top + window.scrollY;
      const elBottom = elTop + body.offsetHeight;
      const scrollStart = elTop - vh * 0.7;
      const scrollEnd = elBottom - vh * 0.8;
      const range = scrollEnd - scrollStart;
      const raw = range > 0 ? (window.scrollY - scrollStart) / range : 0;
      const p = Math.min(1, Math.max(0, raw));
      const pct = Math.round(p * 100);
      setPercent(pct);
      if (fillRef.current) fillRef.current.style.height = `${pct}%`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetId]);

  return (
    <aside className="sticky top-[104px] self-start">
      <MonoChip className="text-ember">— READING</MonoChip>

      <div className="mt-5 flex items-start gap-4">
        <div className="mt-1 h-[200px] w-0.5 overflow-hidden rounded bg-chalk-3">
          <div ref={fillRef} className="w-full bg-ember" style={{ height: 0 }} />
        </div>
        <div>
          <div className="font-display text-[34px] leading-none text-granite-100">
            {percent}
          </div>
          <MonoChip className="mt-1.5 block text-slate-500">PERCENT</MonoChip>
        </div>
      </div>

      <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
        {date} · {readTime} MIN
      </p>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="mt-4 font-display text-[12px] uppercase tracking-[0.02em] text-slate-500 transition-colors hover:text-ember"
      >
        ↑ Back to top
      </button>
    </aside>
  );
}
