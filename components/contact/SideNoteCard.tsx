"use client";

import Image from "next/image";
import Reveal from "../anim/Reveal";
import Parallax from "../anim/Parallax";

export default function SideNoteCard() {
  return (
    <Reveal y={30} duration={0.9}>
      <div className="overflow-hidden rounded-sm border border-chalk-3 bg-[#FBFAF6]">
        {/* Image header with subtle scroll parallax */}
        <div
          className="relative overflow-hidden"
          style={{ height: "clamp(180px,26vw,240px)" }}
        >
          <Parallax yPercent={10} className="absolute inset-0">
            <Image
              src="/cliff-over-water.jpg"
              alt="Cliff over the water at the Boulderfields"
              fill
              sizes="(max-width: 880px) 100vw, 45vw"
              className="object-cover object-[center_38%]"
            />
          </Parallax>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 40%, rgba(15,15,16,0.55) 100%)",
            }}
          />
          <span
            className="absolute bottom-3 left-3 rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-chalk"
            style={{ background: "rgba(15,15,16,0.7)" }}
          >
            THE CHIEF · SQUAMISH, BC
          </span>
        </div>

        {/* Body */}
        <div style={{ padding: "clamp(22px,3vw,32px)" }}>
          <h3
            className="font-display font-bold uppercase leading-tight text-granite-100"
            style={{ fontSize: "clamp(22px,3vw,30px)" }}
          >
            Always down for a session.
          </h3>
          <p
            className="mt-3 font-body text-[15px] leading-[1.62] text-slate-700"
            style={{ textWrap: "pretty" }}
          >
            You&apos;ll usually find me at the Boulderfields or Cougar Canyon on
            weekends. Email&apos;s the best way to reach me before then — I
            check it regularly and I&apos;m always happy to talk climbing, share
            local beta, or point someone toward a good project.
          </p>
          <p
            className="mt-3 font-body text-[15px] leading-[1.62] text-slate-700"
            style={{ textWrap: "pretty" }}
          >
            Coming to climbing later in life? Even better. That&apos;s exactly
            who I built this for.
          </p>
        </div>
      </div>
    </Reveal>
  );
}
