"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Climb } from "@/app/types/types";
import { OwnerSendStats } from "@/lib/data-service";
import { cn } from "@/lib/utils";
import GradeChip from "./ui/GradeChip";
import MonoChip from "./ui/MonoChip";
import {
  gsap,
  prefersReducedMotion,
  useIsomorphicLayoutEffect,
} from "./anim/gsap";

type HeroContentProps = {
  climb: Climb | null;
  sendDate: string | null;
  stats: OwnerSendStats;
};

// Editorial flavor copy — pure masthead decoration. Edit these freely.
const DATELINE = {
  left: "Vol. 07 — The Okanagan Issue",
  center: "A Climbing Journal & Send Database",
  right: "Kelowna BC — Free",
};
const BIO_STAT = "Started at 38 · Hooked Since";

const INTRO =
  "Hey there! I'm Byron, a Kelowna-based climber who started climbing at 38 years old and has been hooked for the last 7 years. I share insights on bouldering, my transition into sport climbing, and local beta from the Okanagan's best climbing spots.";

function LatestSendCard({
  climb,
  sendDate,
  className,
  style,
}: {
  climb: Climb;
  sendDate: string | null;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn(
        "bg-chalk border border-chalk-3 p-4.5 rounded-sm",
        className,
      )}
      style={style}
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
  );
}

// Intro copy + CTAs. Renders light-on-photo (desktop overlay) or dark-on-paper
// (mobile article below the image).
function IntroBlock({ variant }: { variant: "photo" | "paper" }) {
  const onPaper = variant === "paper";
  return (
    <div className={onPaper ? "text-granite-100" : "md:max-w-[560px] text-chalk"}>
      <p
        className={cn(
          "hero-rise font-body text-[14px] md:text-[16px] leading-[1.55]",
          onPaper
            ? "overflow-hidden text-granite-100"
            : "text-chalk [text-shadow:0_1px_6px_rgba(0,0,0,0.55)]",
        )}
        style={{ textWrap: "pretty" }}
      >
        {onPaper ? (
          <>
            <span className="float-left pr-3 pt-1 font-display text-[64px] font-extrabold leading-[0.74] text-ember">
              {INTRO.charAt(0)}
            </span>
            {INTRO.slice(1)}
          </>
        ) : (
          INTRO
        )}
      </p>
      <div className="hero-rise flex gap-2.5 mt-4 flex-wrap">
        <Link
          href="/blog"
          className="inline-flex items-center font-display uppercase font-semibold text-[13px] tracking-[0.06em] px-4.5 py-2.5 bg-ember text-chalk border border-ember hover:bg-ember-deep hover:border-ember-deep transition-colors duration-150 rounded-sm"
        >
          Read latest entry →
        </Link>
        <Link
          href="/database"
          className={cn(
            "inline-flex items-center font-display uppercase font-semibold text-[13px] tracking-[0.06em] px-4.5 py-2.5 bg-transparent border transition-colors duration-150 rounded-sm",
            onPaper
              ? "text-granite-100 border-chalk-3 hover:bg-chalk-2"
              : "text-chalk border-[rgba(244,241,236,0.5)] hover:bg-[rgba(244,241,236,0.1)]",
          )}
        >
          Browse the database
        </Link>
      </div>
    </div>
  );
}

export default function HeroContent({ climb, sendDate, stats }: HeroContentProps) {
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

  // "Hardest Send" — show both disciplines, omitting either if absent.
  const hardestParts = [
    stats.hardestBoulder ? `V${stats.hardestBoulder}` : null,
    stats.hardestRoute,
  ].filter(Boolean);
  const hardestLabel = hardestParts.length
    ? `Hardest ${hardestParts.join(" · ")}`
    : null;

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-chalk">
      {/* Dateline rule */}
      <div className="flex items-center justify-between px-4 md:px-14 py-3 border-b border-chalk-3">
        <MonoChip className="text-[10px] tracking-[0.13em]">{DATELINE.left}</MonoChip>
        <MonoChip className="hidden md:block text-[10px] tracking-[0.13em]">
          {DATELINE.center}
        </MonoChip>
        <MonoChip className="text-[10px] tracking-[0.13em]">{DATELINE.right}</MonoChip>
      </div>

      {/* Wordmark */}
      <div className="overflow-hidden px-3 md:px-11 pt-3.5">
        <h1 className="hero-line block overflow-hidden font-display font-extrabold uppercase text-center text-granite-100 whitespace-normal leading-[0.9] text-[clamp(56px,17vw,150px)] md:whitespace-nowrap md:leading-[0.88] md:text-[clamp(54px,12.4vw,200px)]">
          <span className="block">Byron Climbs</span>
        </h1>
      </div>

      {/* Stat strip */}
      <div className="flex items-center justify-between gap-3 px-4 md:px-14 py-3 border-y border-granite-100 mt-[18px]">
        <MonoChip className="text-granite-100">{stats.totalSends} Sends</MonoChip>
        {hardestLabel && (
          <MonoChip className="hidden md:block text-granite-100">{hardestLabel}</MonoChip>
        )}
        <MonoChip className="hidden md:block text-granite-100">{BIO_STAT}</MonoChip>
        <MonoChip className="flex items-center text-ember">
          <span className="ember-pulse mr-1.5">●</span>Now Sending
        </MonoChip>
      </div>

      {/* Photo band — clean headline image on mobile; text overlay on desktop */}
      <div className="photo relative flex flex-col overflow-hidden min-h-90 md:min-h-135">
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

        {/* Vertical scrim — desktop only (legibility for the overlaid copy) */}
        <div
          className="hidden md:block absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.68) 100%)",
          }}
        />
        {/* Ember glow (pulses) — kept subtle on both breakpoints */}
        <div
          className="hero-glow absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 78% 18%, rgba(200,84,30,0.30), transparent 58%)",
          }}
        />

        {/* Content row — desktop overlay only (copy bottom-left, card bottom-right) */}
        <div className="hero-content relative z-10 mt-auto hidden md:flex md:flex-row md:items-end md:justify-between md:gap-5 md:p-8">
          <IntroBlock variant="photo" />
          {climb && (
            <LatestSendCard
              climb={climb}
              sendDate={sendDate}
              className="hero-rise w-[320px] shrink-0"
              style={{ boxShadow: "0 14px 50px rgba(0,0,0,0.35)" }}
            />
          )}
        </div>
      </div>

      {/* Article below the image (mobile only) — copy + CTAs on chalk paper */}
      <div className="md:hidden bg-chalk border-y border-chalk-3 px-4.5 py-5">
        <IntroBlock variant="paper" />
      </div>
    </section>
  );
}
