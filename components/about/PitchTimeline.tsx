"use client";

import { useRef } from "react";
import MonoChip from "../ui/MonoChip";
import {
  gsap,
  ScrollTrigger,
  prefersReducedMotion,
  useIsomorphicLayoutEffect,
} from "../anim/gsap";

type PitchTimelineProps = {
  /** Real routes-logged count, shown on the "NOW" milestone. */
  routes: number;
};

type Milestone = {
  year: string;
  tag: string;
  title: string;
  body: string;
};

function buildMilestones(routes: number): Milestone[] {
  return [
    {
      year: "2019",
      tag: "AGE 38 · THE FIRST TIE-IN",
      title: "I clipped in for the first time",
      body: "At 38 I tied in for the first time in a Kelowna gym — a late start in a sport built around younger athletes. By the end of that year I'd moved to the Okanagan, and the obsession had already set in.",
    },
    {
      year: "2020",
      tag: "ONTO REAL ROCK",
      title: "Just me, the rock, a crash pad",
      body: "The summer of 2020 took me outside for the first time. There's something pure about bouldering — just me, the rock, and a crash pad. No ropes, no partners needed, problem-solving in its rawest form.",
    },
    {
      year: "2023",
      tag: "LEARNING THE ROPES",
      title: "Top-rope, then lead courses",
      body: "Top-rope and lead courses taught me the systems — knots, belaying, falling on purpose. The mental side of the sport opened up the moment a rope entered the picture.",
    },
    {
      year: "2025",
      tag: "THE CONVERSION",
      title: "The slow pull toward rope",
      body: "The endurance, the exposure, the technical rope work — sport climbing became the new frontier. In 2025 I started leading for real, and the whole journey shifted again.",
    },
    {
      year: "NOW",
      tag: `${routes} ROUTES & COUNTING`,
      title: "Logging it honestly, beta and all",
      body: "Every route logged honestly — sends, projects, and the beta in between. This is the record of a late start that stuck, and the proof that age is just a number.",
    },
  ];
}

export default function PitchTimeline({ routes }: PitchTimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const climberRef = useRef<HTMLDivElement>(null);

  const milestones = buildMilestones(routes);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const list = listRef.current;
    if (!section || !list) return;

    const railHeight = () =>
      trackRef.current?.getBoundingClientRect().height ?? 0;

    if (prefersReducedMotion()) {
      // Resting state: rail filled, climber at the bottom, everything visible.
      gsap.set(fillRef.current, { scaleY: 1 });
      gsap.set(climberRef.current, { y: railHeight() });
      return;
    }

    const ctx = gsap.context(() => {
      let railH = railHeight();

      // Scrubbed rope fill + climber, driven by a single ScrollTrigger.
      ScrollTrigger.create({
        trigger: list,
        start: "top 70%",
        end: "bottom 75%",
        scrub: 0.6,
        onRefresh: () => {
          railH = railHeight();
        },
        onUpdate: (self) => {
          gsap.set(fillRef.current, { scaleY: self.progress });
          gsap.set(climberRef.current, { y: railH * self.progress });
        },
      });

      // Bolt cores pop in as each milestone arrives.
      gsap.utils.toArray<HTMLElement>(".about-bolt-core").forEach((core) => {
        gsap.fromTo(
          core,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.4,
            ease: "back.out(2.2)",
            scrollTrigger: { trigger: core, start: "top 80%", once: true },
          },
        );
      });

      // Cards slide in from the right.
      gsap.utils.toArray<HTMLElement>(".about-mcard").forEach((card) => {
        gsap.from(card, {
          x: 30,
          autoAlpha: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 82%", once: true },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-chalk">
      <div
        className="mx-auto max-w-[1040px]"
        style={{
          padding:
            "clamp(56px,8vw,96px) clamp(20px,5vw,56px) clamp(40px,6vw,64px)",
        }}
      >
        {/* Heading */}
        <div className="mb-[clamp(36px,5vw,56px)]">
          <MonoChip className="mb-3 block text-ember">
            — THE ASCENT · 2019 → NOW
          </MonoChip>
          <h2
            className="font-display font-bold uppercase leading-[1.0] tracking-[0.01em] text-granite-100"
            style={{ fontSize: "clamp(32px,5vw,52px)" }}
          >
            Seven years, one long pitch.
          </h2>
          <p
            className="mt-4 max-w-[560px] font-body text-[15px] leading-[1.6] text-slate-700"
            style={{ textWrap: "pretty" }}
          >
            Every climber has a line they&apos;ve been pulling on for years.
            Here&apos;s mine — from a first nervous tie-in to leading routes
            outdoors.
          </p>
        </div>

        {/* The rail + milestones */}
        <div
          ref={listRef}
          className="relative"
          style={{ ["--rail" as string]: "clamp(22px,3.5vw,42px)" }}
        >
          {/* Track */}
          <div
            ref={trackRef}
            aria-hidden="true"
            className="absolute top-2 bottom-2 z-0 w-0.5 bg-chalk-3"
            style={{ left: "var(--rail)", marginLeft: "-1px" }}
          />
          {/* Rope fill (scrubbed) */}
          <div
            ref={fillRef}
            aria-hidden="true"
            className="absolute top-2 bottom-2 z-[1] w-0.5"
            style={{
              left: "var(--rail)",
              marginLeft: "-1px",
              transform: "scaleY(0)",
              transformOrigin: "top",
              background:
                "linear-gradient(180deg, var(--ember-soft), var(--ember))",
            }}
          />
          {/* Climber marker */}
          <div
            ref={climberRef}
            aria-hidden="true"
            className="about-climber-pulse absolute top-2 z-[2] h-[18px] w-[18px] rounded-full border-[3px] border-chalk bg-ember"
            style={{
              left: "var(--rail)",
              marginLeft: "-9px",
              marginTop: "-9px",
            }}
          />

          {/* Milestones */}
          <ol className="m-0 list-none p-0">
            {milestones.map((m) => (
              <li
                key={m.year}
                className="relative pb-[clamp(36px,5vw,56px)] last:pb-0"
                style={{ paddingLeft: "clamp(60px,8vw,96px)" }}
              >
                {/* Bolt */}
                <span
                  aria-hidden="true"
                  className="absolute top-1 z-[2] flex h-[14px] w-[14px] items-center justify-center rounded-full border-2 border-ember bg-chalk"
                  style={{ left: "var(--rail)", marginLeft: "-7px" }}
                >
                  <span className="about-bolt-core block h-1.5 w-1.5 rounded-full bg-ember" />
                </span>

                {/* Card */}
                <div className="about-mcard">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span
                      className="font-display font-bold leading-none text-ember"
                      style={{ fontSize: "clamp(26px,3.4vw,38px)" }}
                    >
                      {m.year}
                    </span>
                    <MonoChip className="text-slate-500">{m.tag}</MonoChip>
                  </div>
                  <h3 className="mt-2 font-display text-[clamp(20px,2.6vw,27px)] font-semibold uppercase leading-tight text-granite-100">
                    {m.title}
                  </h3>
                  <p
                    className="mt-2 max-w-[560px] font-body text-[15px] leading-[1.6] text-slate-700"
                    style={{ textWrap: "pretty" }}
                  >
                    {m.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
