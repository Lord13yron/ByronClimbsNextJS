"use client";

import Link from "next/link";
import MonoChip from "../ui/MonoChip";
import Reveal from "../anim/Reveal";
import MagneticButton from "../about/MagneticButton";

const MAILTO =
  "mailto:byron.climbs.rocks@gmail.com?subject=Climbing — let's connect";

export default function ContactCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-granite-300">
      {/* Ember radial glow (top-left, slow pulse) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute z-0"
        style={{
          top: "-12%",
          left: "-6%",
          width: "56%",
          height: "78%",
          background:
            "radial-gradient(ellipse at center, rgba(200,84,30,0.26), transparent 64%)",
          animation: "mast-glow 8s ease-in-out infinite alternate",
        }}
      />

      <div
        className="relative z-[1] mx-auto max-w-[980px]"
        style={{ padding: "clamp(64px,9vw,116px) clamp(20px,5vw,56px)" }}
      >
        <Reveal y={32} stagger={0.1}>
          <MonoChip className="mb-4 block text-ember-soft">
            — SEE YOU OUT THERE
          </MonoChip>
          <h2
            className="font-display font-extrabold uppercase leading-[0.92] tracking-[0.01em] text-chalk"
            style={{ fontSize: "clamp(40px,7vw,84px)" }}
          >
            Bring chalk.
            <br />
            I&apos;ll bring the beta.
          </h2>

          <div className="mt-8 flex flex-wrap gap-2.5">
            <MagneticButton
              href={MAILTO}
              className="inline-flex items-center rounded-sm border border-ember bg-ember px-6 py-[13px] font-display text-[13px] font-semibold uppercase tracking-[0.06em] text-chalk transition-colors duration-150 hover:border-ember-deep hover:bg-ember-deep"
            >
              Send me a note →
            </MagneticButton>
            <Link
              href="/database"
              className="inline-flex items-center rounded-sm border px-6 py-[13px] font-display text-[13px] font-semibold uppercase tracking-[0.06em] text-chalk transition-colors duration-150 hover:bg-[rgba(244,241,236,0.1)]"
              style={{ borderColor: "rgba(244,241,236,0.4)" }}
            >
              Browse the database
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
