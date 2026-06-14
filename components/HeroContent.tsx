"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Climb } from "@/app/types/types";
import GradeChip from "./ui/GradeChip";
import MonoChip from "./ui/MonoChip";
import TopoLine from "./ui/TopoLine";
import {
  gsap,
  prefersReducedMotion,
  useIsomorphicLayoutEffect,
} from "./anim/gsap";

type HeroContentProps = {
  climb: Climb | null;
  sendDate: string | null;
};

export default function HeroContent({ climb, sendDate }: HeroContentProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const mobile = window.matchMedia("(max-width: 760px)").matches;

    const ctx = gsap.context(() => {
      // Entrance timeline (on load).
      const tl = gsap.timeline();
      tl.from(".hero-img", { scale: 1.16, duration: 1.7, ease: "power2.out" }, 0)
        .from(
          ".hero-line > span",
          { yPercent: 120, duration: 1, stagger: 0.1, ease: "power3.out" },
          0.2,
        )
        .from(
          ".hero-rise",
          {
            autoAlpha: 0,
            y: 18,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
          },
          0.6,
        );

      // Glow pulse (slow, infinite).
      gsap.to(".hero-glow", {
        opacity: 0.55,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Parallax on scroll.
      gsap.to(".hero-imgwrap", {
        yPercent: mobile ? 5 : 8,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      if (!mobile) {
        gsap.to(".hero-content", {
          yPercent: -7,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(520px, 44vw, 640px)" }}
    >
      {/* Background photo (overscan wrapper for parallax) */}
      <div
        className="hero-imgwrap absolute left-0 right-0"
        style={{ top: "-8%", height: "116%" }}
      >
        <Image
          src="/hero-boulder-bw.jpg"
          alt="Boulder problem"
          fill
          className="hero-img object-cover object-[center_35%]"
          priority
          sizes="100vw"
        />
      </div>

      {/* Vertical scrim */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.68) 100%)",
        }}
      />
      {/* Ember glow (pulses) */}
      <div
        className="hero-glow absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 78% 18%, rgba(200,84,30,0.32), transparent 58%)",
        }}
      />
      {/* Topo line along the bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ color: "rgba(244,241,236,0.16)" }}
      >
        <TopoLine height={56} seed={5} />
      </div>

      {/* Wordmark — bottom left */}
      <div className="hero-content absolute bottom-50 md:bottom-30.5 left-4 md:left-14 max-w-[90%] md:max-w-180 text-chalk">
        <h1
          className="font-display uppercase font-extrabold leading-[0.92] tracking-[0.01em] text-chalk"
          style={{ fontSize: "clamp(56px, 8vw, 108px)", textWrap: "balance" }}
        >
          <span className="hero-line block overflow-hidden">
            <span className="block">Notes from</span>
          </span>
          <span className="hero-line block overflow-hidden">
            <span className="block">the gneiss.</span>
          </span>
        </h1>
        <p
          className="hero-rise mt-4 max-w-130 text-[13px] md:text-[16px] leading-[1.55] text-chalk font-body [text-shadow:0_1px_6px_rgba(0,0,0,0.55)]"
          style={{ textWrap: "pretty" }}
        >
          Hey there! I&apos;m Byron, a Kelowna-based climber who started climbing
          at 38 years old and has been hooked for the last 7 years. I share
          insights on bouldering, my transition into sport climbing, and local
          beta from the Okanagan&apos;s best climbing spots.
        </p>
        <div className="hero-rise flex gap-2.5 mt-5 flex-wrap">
          <Link
            href="/blog"
            className="inline-flex items-center font-display uppercase font-semibold text-[13px] tracking-[0.06em] px-5 py-2.5 bg-ember text-chalk border border-ember hover:bg-ember-deep hover:border-ember-deep transition-colors duration-150 rounded-sm"
          >
            Read latest entry →
          </Link>
          <Link
            href="/database"
            className="inline-flex items-center font-display uppercase font-semibold text-[13px] tracking-[0.06em] px-5 py-2.5 bg-transparent text-chalk border border-[rgba(244,241,236,0.5)] hover:bg-[rgba(244,241,236,0.1)] transition-colors duration-150 rounded-sm"
          >
            Browse the database
          </Link>
        </div>
      </div>

      {/* Recent send card — bottom right */}
      {climb && (
        <div
          className="hero-rise absolute bottom-4 md:bottom-8 right-4 md:right-8 w-[calc(100%-32px)] max-w-95 md:w-[320px] bg-chalk border border-chalk-3 p-4.5 rounded-sm"
          style={{ boxShadow: "0 14px 50px rgba(0,0,0,0.35)" }}
        >
          <div className="flex justify-between items-center mb-3">
            <MonoChip className="text-ember">● LATEST SEND</MonoChip>
            <MonoChip>{sendDate}</MonoChip>
          </div>
          <div className="flex items-start gap-3.5">
            <GradeChip grade={climb.grade} variant="ember" />
            <div className="flex-1 min-w-0">
              <h3 className="font-display uppercase font-semibold text-[22px] leading-[1.05] text-granite-100 truncate">
                {climb.name}
              </h3>
              <MonoChip className="mt-1 text-slate-500 block truncate">
                {climb.city} · {climb.area}
              </MonoChip>
            </div>
          </div>
          <div className="mt-3.5 pt-3 border-t border-dashed border-chalk-3 flex justify-between">
            <div>
              <MonoChip className="text-[9px] text-slate-500">AREA</MonoChip>
              <div className="font-display text-[15px] leading-none mt-1 text-granite-100 uppercase">
                {climb.subArea || climb.area}
              </div>
            </div>
            <div>
              <MonoChip className="text-[9px] text-slate-500">TYPE</MonoChip>
              <div className="font-display uppercase text-[13px] leading-none mt-1.5 text-granite-100">
                {climb.type}
              </div>
            </div>
            <div>
              <MonoChip className="text-[9px] text-slate-500">GRADE</MonoChip>
              <div className="font-display text-[15px] leading-none mt-1 text-granite-100">
                {climb.type === "boulder" ? `V${climb.grade}` : climb.grade}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
