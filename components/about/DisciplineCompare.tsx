"use client";

import MonoChip from "../ui/MonoChip";
import Reveal from "../anim/Reveal";

export default function DisciplineCompare() {
  return (
    <section className="bg-chalk">
      <div
        className="mx-auto max-w-7xl border-t border-dashed border-chalk-3"
        style={{ padding: "clamp(56px,8vw,96px) clamp(20px,5vw,56px)" }}
      >
        <Reveal y={20}>
          <MonoChip className="mb-8 block text-ember">
            — THE DISCIPLINE
          </MonoChip>
        </Reveal>

        <Reveal
          y={30}
          stagger={0.12}
          className="grid items-start gap-[clamp(20px,3vw,32px)] min-[821px]:grid-cols-2"
        >
          {/* PAST — Bouldering */}
          <article
            className="rounded-sm border border-chalk-3 p-[clamp(24px,3vw,40px)]"
            style={{ background: "#FBFAF6" }}
          >
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="rounded-sm bg-granite-100 px-2.5 py-1 font-display text-[11px] font-bold uppercase tracking-[0.04em] text-chalk">
                Past
              </span>
              <MonoChip className="text-slate-500">Where I started</MonoChip>
            </div>
            <h3 className="font-display text-[clamp(24px,3.2vw,34px)] font-bold uppercase leading-none text-granite-100">
              Bouldering
            </h3>
            <p
              className="mt-4 font-body text-[15px] leading-[1.6] text-slate-700"
              style={{ textWrap: "pretty" }}
            >
              Bouldering was my primary focus since the day I started. There&apos;s
              something pure about it — just you, the rock, and a crash pad. No
              ropes, no partners needed, just problem-solving in its rawest form.
            </p>
          </article>

          {/* NOW — Sport climbing */}
          <article
            className="rounded-sm border border-ember p-[clamp(24px,3vw,40px)]"
            style={{
              background: "linear-gradient(160deg, #FBEFE7, #F8E6DA)",
            }}
          >
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="rounded-sm bg-ember px-2.5 py-1 font-display text-[11px] font-bold uppercase tracking-[0.04em] text-chalk">
                Now
              </span>
              <MonoChip className="text-ember-deep">The new frontier</MonoChip>
            </div>
            <h3 className="font-display text-[clamp(24px,3.2vw,34px)] font-bold uppercase leading-none text-ember-deep">
              Sport climbing
            </h3>
            <p
              className="mt-4 font-body text-[15px] leading-[1.6]"
              style={{ color: "#5A3B2C", textWrap: "pretty" }}
            >
              Lately I&apos;ve felt the pull toward sport climbing. The endurance,
              the exposure, and the technical rope work represent a new frontier
              I&apos;m eager to explore — and the kind of journey I want to share
              through this blog.
            </p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
