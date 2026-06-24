"use client";

import Link from "next/link";
import MonoChip from "../ui/MonoChip";
import Reveal from "../anim/Reveal";
import MagneticButton from "./MagneticButton";

export default function ConnectCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-granite-300">
      {/* Ember radial glow (top-right, slow pulse) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute z-0"
        style={{
          top: "-12%",
          right: "-6%",
          width: "56%",
          height: "78%",
          background:
            "radial-gradient(ellipse at center, rgba(200,84,30,0.26), transparent 64%)",
          animation: "mast-glow 8s ease-in-out infinite alternate",
        }}
      />

      <div
        className="relative z-[1] mx-auto max-w-[980px]"
        style={{ padding: "clamp(64px,9vw,120px) clamp(20px,5vw,56px)" }}
      >
        <Reveal y={30} stagger={0.1}>
          <MonoChip className="mb-4 block text-ember-soft">
            — WHY THIS BLOG
          </MonoChip>
          <h2
            className="font-display font-extrabold uppercase leading-[0.92] tracking-[0.01em] text-chalk"
            style={{ fontSize: "clamp(40px,7vw,84px)" }}
          >
            My climbing
            <br />
            journal.
          </h2>
          <p
            className="mt-5 max-w-[620px] font-body text-[15px] leading-[1.6]"
            style={{ color: "rgba(244,241,236,0.72)", textWrap: "pretty" }}
          >
            I built this to track my progress and keep a record of everything I
            climb — every project, every send, and the ones still kicking my
            ass. This is the logbook I wished I&apos;d kept from day one.
          </p>

          <div className="mt-8 flex flex-wrap gap-3.5">
            <MagneticButton
              href="/database"
              className="inline-flex items-center rounded-sm border border-ember bg-ember px-5 py-3 font-display text-[13px] font-semibold uppercase tracking-[0.06em] text-chalk transition-colors duration-150 hover:border-ember-deep hover:bg-ember-deep"
            >
              Browse the database →
            </MagneticButton>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-sm border px-5 py-3 font-display text-[13px] font-semibold uppercase tracking-[0.06em] text-chalk transition-colors duration-150 hover:bg-[rgba(244,241,236,0.1)]"
              style={{ borderColor: "rgba(244,241,236,0.4)" }}
            >
              Get in touch
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
