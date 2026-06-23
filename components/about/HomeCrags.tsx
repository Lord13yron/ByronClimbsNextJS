"use client";

import Image from "next/image";
import MonoChip from "../ui/MonoChip";
import Parallax from "../anim/Parallax";
import Reveal from "../anim/Reveal";
import type { CragCount } from "@/lib/database-stats";

type HomeCragsProps = {
  crags: CragCount[];
};

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

export default function HomeCrags({ crags }: HomeCragsProps) {
  const top = crags[0];
  const caption = top
    ? `${top.area}${top.city ? ` · ${top.city}` : ""}`
    : "THE OKANAGAN · BC";

  return (
    <section className="bg-chalk">
      <div
        className="mx-auto grid max-w-7xl items-center gap-[clamp(28px,4vw,52px)] min-[821px]:grid-cols-[1.25fr_1fr]"
        style={{ padding: "clamp(56px,8vw,96px) clamp(20px,5vw,56px)" }}
      >
        {/* Photo */}
        <Reveal scale={0.96} className="order-1">
          <div className="relative h-[clamp(320px,46vw,520px)] overflow-hidden rounded-sm">
            <Parallax yPercent={6} className="absolute inset-[-6%]">
              <Image
                src={`${SUPABASE_URL}/storage/v1/object/public/ui-images/Background-1.JPG`}
                alt="A crag in the Okanagan"
                fill
                sizes="(max-width: 820px) 100vw, 720px"
                className="object-cover object-center"
              />
            </Parallax>
            {/* Location caption */}
            <span
              className="absolute bottom-3 left-3 z-[1] rounded-sm px-3 py-1.5"
              style={{ background: "rgba(14,14,16,0.62)" }}
            >
              <MonoChip className="text-chalk">{caption}</MonoChip>
            </span>
          </div>
        </Reveal>

        {/* Copy */}
        <Reveal y={28} stagger={0.1} className="order-2">
          <MonoChip className="mb-3 block text-ember">
            — THE HOME CRAGS
          </MonoChip>
          <h2
            className="font-display font-bold uppercase leading-[1.0] tracking-[0.01em] text-granite-100"
            style={{ fontSize: "clamp(30px,4.4vw,46px)" }}
          >
            My outdoor classroom.
          </h2>
          <p
            className="mt-4 font-body text-[15px] leading-[1.6] text-slate-700"
            style={{ textWrap: "pretty" }}
          >
            I&apos;m based in Kelowna, BC, and I couldn&apos;t ask for a better
            climbing playground. The Okanagan has become my outdoor classroom —
            these areas have taught me everything from basic technique to
            reading rock and pushing my limits on hard problems.
          </p>

          {crags.length > 0 && (
            <ul className="mt-6 flex list-none flex-wrap gap-2.5 p-0">
              {crags.map((c) => (
                <li key={c.area}>
                  <span className="inline-block rounded-full border border-chalk-3 px-3.5 py-1.5 font-display text-[12px] font-semibold uppercase tracking-[0.02em] text-granite-100 transition-colors duration-200 hover:border-ember hover:text-ember">
                    {c.area}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      </div>
    </section>
  );
}
