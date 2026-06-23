"use client";

import { useRef } from "react";
import Image from "next/image";
import MonoChip from "../ui/MonoChip";
import TopoLine from "../ui/TopoLine";
import DrawOn from "../anim/DrawOn";
import {
  gsap,
  prefersReducedMotion,
  useIsomorphicLayoutEffect,
} from "../anim/gsap";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Image: scale settle on entrance + gentle scroll parallax (desktop only).
      gsap.fromTo(
        imageRef.current,
        { scale: 1.16 },
        { scale: 1, duration: 1.8, ease: "power2.out" },
      );

      const mql = window.matchMedia("(min-width: 760px)");
      if (mql.matches && imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Split-text H1 lines slide up out of their masks.
      const tl = gsap.timeline();
      tl.from(".about-line", {
        yPercent: 120,
        duration: 1.0,
        stagger: 0.12,
        ease: "power3.out",
      }).from(
        ".about-rise",
        {
          autoAlpha: 0,
          y: 16,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
        },
        0.55,
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[clamp(560px,86vh,760px)] flex-col justify-end overflow-hidden bg-granite-200"
    >
      {/* Background photo */}
      <div ref={imageRef} className="absolute inset-0 z-0">
        <Image
          src={`${SUPABASE_URL}/storage/v1/object/public/ui-images/Background-2.JPEG`}
          alt="Byron climbing"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%] grayscale"
        />
      </div>

      {/* Legibility scrim */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.34) 52%, rgba(0,0,0,0.78) 100%)",
        }}
      />

      {/* Ember radial glow (top-left, slow pulse) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute z-[1]"
        style={{
          top: "-8%",
          left: "-4%",
          width: "60%",
          height: "70%",
          background:
            "radial-gradient(ellipse at center, rgba(200,84,30,0.30), transparent 62%)",
          animation: "mast-glow 7s ease-in-out infinite alternate",
        }}
      />

      {/* Topo band along the bottom */}
      <DrawOn
        immediate
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] text-chalk opacity-[0.16]"
      >
        <TopoLine height={120} seed={6} strokeWidth={1.2} />
      </DrawOn>

      {/* Content (bottom-anchored) */}
      <div
        className="relative z-[2] mx-auto w-full max-w-7xl"
        style={{ padding: "0 clamp(20px,5vw,56px) clamp(36px,6vw,64px)" }}
      >
        <MonoChip className="about-rise mb-4 block text-ember-soft">
          — ABOUT BYRON · CLIMBER NO.001
        </MonoChip>

        <h1
          className="font-display font-extrabold uppercase tracking-[0.01em] text-chalk"
          style={{ fontSize: "clamp(54px,9.5vw,128px)", lineHeight: 0.88 }}
        >
          <span className="block overflow-hidden pb-[0.04em]">
            <span className="about-line block">Started late.</span>
          </span>
          <span className="block overflow-hidden pb-[0.04em]">
            <span className="about-line block text-ember-soft">
              Stayed forever.
            </span>
          </span>
        </h1>

        <p
          className="about-rise mt-5 max-w-[560px] font-body text-[clamp(14px,1.6vw,17px)] leading-[1.6]"
          style={{
            color: "rgba(244,241,236,0.92)",
            textShadow: "0 1px 14px rgba(0,0,0,0.55)",
            textWrap: "pretty",
          }}
        >
          I&apos;m Byron — a Kelowna-based climber who picked up the sport at 38
          and has been hooked for the past seven years. This is where I log the
          sends, share the beta, and document the journey.
        </p>

        {/* Scroll cue */}
        <div className="about-rise mt-8 flex items-center gap-3">
          <MonoChip className="text-[rgba(244,241,236,0.6)]">
            SCROLL THE PITCH
          </MonoChip>
          <svg
            aria-hidden="true"
            width="18"
            height="28"
            viewBox="0 0 18 28"
            fill="none"
            className="shrink-0"
          >
            <rect
              x="1"
              y="1"
              width="16"
              height="26"
              rx="8"
              stroke="rgba(244,241,236,0.5)"
              strokeWidth="1.4"
            />
            <circle
              cx="9"
              cy="8"
              r="2.4"
              fill="var(--ember)"
              className="about-cue-bob"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
