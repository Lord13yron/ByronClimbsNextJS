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
import { useKelownaStatus } from "./useKelownaStatus";

export default function ContactHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const { timeStr, status, dotColor } = useKelownaStatus();

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

      // Split-text H1 lines slide up out of their masks, then chip/subhead rise.
      const tl = gsap.timeline();
      tl.from(".contact-line", {
        yPercent: 120,
        duration: 1.0,
        stagger: 0.12,
        ease: "power3.out",
      }).from(
        ".contact-rise",
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
      className="relative isolate flex min-h-[clamp(520px,80vh,720px)] flex-col justify-end overflow-hidden bg-granite-200"
    >
      {/* Background photo */}
      <div ref={imageRef} className="absolute inset-0 z-0">
        <Image
          src="/squamish-meadow.jpg"
          alt="Squamish meadow below the granite walls"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_42%]"
        />
      </div>

      {/* Legibility scrim */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(14,14,16,0.18) 0%, rgba(14,14,16,0.40) 46%, rgba(14,14,16,0.82) 100%)",
        }}
      />

      {/* Ember radial glow (bottom-right, slow pulse) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute z-[1]"
        style={{
          right: "-6%",
          bottom: "-10%",
          width: "58%",
          height: "70%",
          background:
            "radial-gradient(ellipse at center, rgba(200,84,30,0.34), transparent 62%)",
          animation: "mast-glow 7s ease-in-out infinite alternate",
        }}
      />

      {/* Topo band along the bottom */}
      <DrawOn
        immediate
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] text-chalk opacity-[0.15]"
      >
        <TopoLine height={120} seed={4} strokeWidth={1.2} />
      </DrawOn>

      {/* Content (bottom-anchored) */}
      <div
        className="relative z-[2] mx-auto w-full max-w-7xl"
        style={{ padding: "0 clamp(20px,5vw,56px) clamp(36px,6vw,64px)" }}
      >
        <MonoChip className="contact-rise mb-4 block text-ember-soft">
          — CONTACT · LET&apos;S TIE IN
        </MonoChip>

        <h1
          className="font-display font-extrabold uppercase tracking-[0.01em] text-chalk"
          style={{ fontSize: "clamp(54px,10vw,132px)", lineHeight: 0.88 }}
        >
          <span className="block overflow-hidden pb-[0.04em]">
            <span className="contact-line block">Find me on</span>
          </span>
          <span className="block overflow-hidden pb-[0.04em]">
            <span className="contact-line block text-ember-soft">
              the wall.
            </span>
          </span>
        </h1>

        <p
          className="contact-rise mt-5 max-w-[560px] font-body text-[clamp(14px,1.6vw,17px)] leading-[1.6]"
          style={{
            color: "rgba(244,241,236,0.92)",
            textShadow: "0 1px 8px rgba(0,0,0,0.6)",
            textWrap: "pretty",
          }}
        >
          If you&apos;re in the Kelowna area and want to share beta, meet up for
          a session, or just talk climbing over coffee — I&apos;d love to hear
          from you.
        </p>

        {/* Live "right now in Kelowna" status chip */}
        <div
          id="bc-status-chip"
          className="contact-rise mt-7 inline-flex items-center gap-3 rounded-full border py-[11px] pl-[14px] pr-4"
          style={{
            background: "rgba(14,14,16,0.55)",
            borderColor: "rgba(244,241,236,0.18)",
            backdropFilter: "blur(6px)",
          }}
        >
          <span
            aria-hidden="true"
            className="ember-pulse block h-[9px] w-[9px] shrink-0 rounded-full"
            style={{ background: dotColor }}
          />
          <span className="flex flex-col gap-[3px]">
            <span
              className="font-mono text-[9px] uppercase tracking-[0.18em]"
              style={{ color: "rgba(244,241,236,0.62)" }}
            >
              Right now in Kelowna · {timeStr}
            </span>
            <span className="font-display text-[14px] font-semibold uppercase tracking-[0.04em] text-chalk">
              {status}
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
