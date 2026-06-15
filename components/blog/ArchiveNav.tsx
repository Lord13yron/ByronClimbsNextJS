"use client";

import { useState } from "react";
import MonoChip from "@/components/ui/MonoChip";
import {
  ScrollTrigger,
  useIsomorphicLayoutEffect,
} from "@/components/anim/gsap";

type Month = { key: string; label: string; count: number };

type ArchiveNavProps = {
  months: Month[];
};

/**
 * Sticky month navigator for the archive. A scroll-spy (one ScrollTrigger per
 * `#month-{key}` block currently in the DOM) highlights the month in view.
 * Position-based, so it runs even under reduced motion.
 */
export default function ArchiveNav({ months }: ArchiveNavProps) {
  const [active, setActive] = useState<string | null>(null);

  useIsomorphicLayoutEffect(() => {
    const present = months.filter((m) =>
      document.getElementById(`month-${m.key}`),
    );
    if (!present.length) return;

    setActive(present[0].key);

    const triggers = present.map((m) =>
      ScrollTrigger.create({
        trigger: `#month-${m.key}`,
        start: "top 40%",
        end: "bottom 40%",
        onToggle: (self) => {
          if (self.isActive) setActive(m.key);
        },
      }),
    );

    return () => triggers.forEach((t) => t.kill());
  }, [months]);

  return (
    <aside className="self-start min-[861px]:sticky min-[861px]:top-[88px]">
      <MonoChip as="p" className="mb-3.5 text-ember">
        — THE ARCHIVE
      </MonoChip>
      <h2 className="font-display text-[30px] font-bold uppercase leading-[0.96] text-granite-100">
        Every entry,
        <br />
        by month.
      </h2>
      <nav className="mt-6 flex flex-col">
        {months.map((m) => {
          const isActive = m.key === active;
          return (
            <a
              key={m.key}
              href={`#month-${m.key}`}
              className={`flex items-center justify-between border-b border-chalk-2 py-2 font-display text-[13.5px] font-semibold uppercase transition-all duration-200 ${
                isActive
                  ? "pl-2.5 text-ember"
                  : "text-granite-100 hover:text-ember"
              }`}
            >
              <span>{m.label}</span>
              <span
                className={`font-mono text-[10px] tracking-[0.18em] ${
                  isActive ? "text-ember" : "text-slate-500"
                }`}
              >
                {m.count}
              </span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
