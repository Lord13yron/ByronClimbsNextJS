"use client";

import MonoChip from "../ui/MonoChip";
import TopoLine from "../ui/TopoLine";
import Counter from "../anim/Counter";
import DrawOn from "../anim/DrawOn";
import Reveal from "../anim/Reveal";

type StatsBandProps = {
  yearsOnRock: number;
  routes: number;
  sends: number;
  crags: number;
};

const CAPTION_CLASS = "text-[rgba(244,241,236,0.55)]";

export default function StatsBand({
  yearsOnRock,
  routes,
  sends,
  crags,
}: StatsBandProps) {
  const stats: { value: number; caption: string; suffix?: string }[] = [
    { value: yearsOnRock, caption: "On the rock", suffix: "yr" },
    { value: routes, caption: "Routes logged" },
    { value: sends, caption: "Personal sends" },
    { value: crags, caption: "Crags covered" },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-granite-200">
      {/* Faint topo backdrop */}
      <DrawOn
        immediate
        className="pointer-events-none absolute inset-0 z-0 text-chalk opacity-[0.06]"
      >
        <TopoLine rows={12} strokeWidth={1.2} className="h-full w-full" />
      </DrawOn>

      <div
        className="relative z-[1] mx-auto max-w-7xl"
        style={{ padding: "clamp(52px,7vw,80px) clamp(20px,5vw,56px)" }}
      >
        <Reveal y={20}>
          <MonoChip className="mb-8 block text-ember-soft">
            — BY THE NUMBERS
          </MonoChip>
        </Reveal>

        <Reveal
          y={28}
          stagger={0.1}
          className="grid grid-cols-2 gap-6 min-[821px]:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.caption}>
              <div className="font-display font-extrabold leading-[0.9] text-chalk [font-size:clamp(48px,7vw,76px)]">
                <Counter value={s.value} />
                {s.suffix && (
                  <span className="ml-1 text-ember [font-size:0.42em]">
                    {s.suffix}
                  </span>
                )}
              </div>
              <MonoChip className={`mt-2 block ${CAPTION_CLASS}`}>
                {s.caption}
              </MonoChip>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
