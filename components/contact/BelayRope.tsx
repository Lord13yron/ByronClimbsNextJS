"use client";

import { useRef, useState } from "react";
import { Copy } from "lucide-react";
import MonoChip from "../ui/MonoChip";
import { useMagnetic } from "../anim/useMagnetic";
import {
  gsap,
  ScrollTrigger,
  prefersReducedMotion,
  useIsomorphicLayoutEffect,
} from "../anim/gsap";

const EMAIL = "byron.climbs.rocks@gmail.com";
const IG_URL = "https://www.instagram.com/byron.hayes.77";
const GREEN = "#3FB873";
const SPOTS = ["The Boulderfields", "Cougar Canyon", "Skaha Bluffs"];

export default function BelayRope() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const climberRef = useRef<HTMLDivElement>(null);
  const emailBtnRef = useRef<HTMLButtonElement>(null);
  const igArrowRef = useRef<HTMLSpanElement>(null);

  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<number | null>(null);

  useMagnetic(igArrowRef, 0.5);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const railHeight = () =>
      trackRef.current?.getBoundingClientRect().height ?? 0;

    if (prefersReducedMotion()) {
      // Resting state: rope filled, climber at the bottom, everything visible.
      gsap.set(fillRef.current, { scaleY: 1 });
      gsap.set(climberRef.current, { y: railHeight() });
      return;
    }

    const ctx = gsap.context(() => {
      let railH = railHeight();

      // Scrubbed rope fill + climber, driven by a single ScrollTrigger.
      ScrollTrigger.create({
        trigger: section,
        start: "top 72%",
        end: "bottom 80%",
        scrub: 0.6,
        onRefresh: () => {
          railH = railHeight();
        },
        onUpdate: (self) => {
          gsap.set(fillRef.current, { scaleY: self.progress });
          gsap.set(climberRef.current, { y: railH * self.progress });
        },
      });

      // Bolt cores pop in as each anchor arrives.
      gsap.utils.toArray<HTMLElement>(".contact-bolt-core").forEach((core) => {
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

      // Anchor cards slide in from the right.
      gsap.utils.toArray<HTMLElement>(".contact-acard").forEach((card) => {
        gsap.from(card, {
          x: 26,
          autoAlpha: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 84%", once: true },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  function handleCopy() {
    const done = () => {
      setCopied(true);
      if (emailBtnRef.current && !prefersReducedMotion()) {
        gsap.fromTo(
          emailBtnRef.current,
          { scale: 1 },
          {
            scale: 1.04,
            duration: 0.18,
            transformOrigin: "left center",
            yoyo: true,
            repeat: 1,
            ease: "power2.out",
          },
        );
      }
      if (copyTimer.current) window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 2000);
    };

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(EMAIL).then(done).catch(fallbackCopy);
    } else {
      fallbackCopy();
    }

    function fallbackCopy() {
      try {
        const ta = document.createElement("textarea");
        ta.value = EMAIL;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        done();
      } catch {
        // Give up silently — the mailto link is still available.
      }
    }
  }

  return (
    <div
      ref={sectionRef}
      className="relative"
      style={{ ["--rope" as string]: "clamp(14px,3vw,26px)" }}
    >
      {/* The rope (track) */}
      <div
        ref={trackRef}
        aria-hidden="true"
        className="absolute z-0 w-0.5 bg-chalk-3"
        style={{ left: "var(--rope)", top: "10px", bottom: "18px", marginLeft: "-1px" }}
      />
      {/* Rope fill (scrubbed) */}
      <div
        ref={fillRef}
        aria-hidden="true"
        className="absolute z-[1] w-0.5"
        style={{
          left: "var(--rope)",
          top: "10px",
          bottom: "18px",
          marginLeft: "-1px",
          transform: "scaleY(0)",
          transformOrigin: "top center",
          background: "linear-gradient(180deg, var(--ember-soft), var(--ember))",
        }}
      />
      {/* Climber marker */}
      <div
        ref={climberRef}
        aria-hidden="true"
        className="about-climber-pulse absolute z-[3] h-[18px] w-[18px] rounded-full border-[3px] border-chalk bg-ember"
        style={{
          left: "var(--rope)",
          top: "10px",
          marginLeft: "-9px",
          marginTop: "-9px",
          boxShadow: "0 2px 10px rgba(200,84,30,0.5)",
        }}
      />

      <ol className="m-0 list-none p-0">
        {/* Anchor 1 — Email */}
        <Anchor>
          <MonoChip className="mb-2 block text-slate-500">
            — EMAIL · PRIMARY ANCHOR
          </MonoChip>
          <button
            ref={emailBtnRef}
            type="button"
            onClick={handleCopy}
            className="block cursor-pointer border-0 bg-transparent p-0 text-left font-display font-bold normal-case leading-none text-granite-100 transition-colors duration-200"
            style={{
              fontSize: "clamp(24px,3.6vw,38px)",
              color: copied ? "var(--ember)" : undefined,
            }}
          >
            {EMAIL}
          </button>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span
              className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em]"
              style={{ color: copied ? GREEN : "var(--slate-500, #6E6E74)" }}
            >
              <Copy className="h-3 w-3" strokeWidth={1.6} aria-hidden="true" />
              {copied ? "Copied!" : "Click to copy"}
            </span>
            <a
              href={`mailto:${EMAIL}`}
              className="font-display text-[12px] font-semibold uppercase tracking-[0.06em] text-ember transition-colors hover:text-ember-deep"
            >
              Open mail →
            </a>
          </div>
        </Anchor>

        {/* Anchor 2 — Instagram */}
        <Anchor>
          <MonoChip className="mb-2 block text-slate-500">
            — INSTAGRAM · CONDITIONS &amp; SENDS
          </MonoChip>
          <div className="flex items-center gap-3">
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display font-bold normal-case leading-none text-granite-100 transition-colors hover:text-ember"
              style={{ fontSize: "clamp(24px,3.6vw,38px)" }}
            >
              @byron.hayes.77
            </a>
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Instagram profile"
              className="shrink-0"
            >
              <span
                ref={igArrowRef}
                className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-granite-100 text-chalk"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 12L12 4M12 4H5.5M12 4V10.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </div>
          <p
            className="mt-3 max-w-[460px] font-body text-[14px] leading-[1.6] text-slate-700"
            style={{ textWrap: "pretty" }}
          >
            Casual updates — trip photos, conditions reports, and the occasional
            send.
          </p>
        </Anchor>

        {/* Anchor 3 — In person */}
        <Anchor last>
          <MonoChip className="mb-2 block text-slate-500">
            — IN PERSON · WEEKENDS
          </MonoChip>
          <h3
            className="font-display font-bold uppercase leading-none text-granite-100"
            style={{ fontSize: "clamp(24px,3.6vw,38px)" }}
          >
            At the crag
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {SPOTS.map((spot) => (
              <span
                key={spot}
                className="rounded-full border border-chalk-3 px-3 py-[7px] font-display text-[12px] font-semibold uppercase tracking-[0.04em] text-granite-100 transition-colors hover:border-ember hover:text-ember"
              >
                {spot}
              </span>
            ))}
          </div>
        </Anchor>
      </ol>
    </div>
  );
}

/** One anchor row: bolt marker on the rope + sliding card content. */
function Anchor({
  children,
  last = false,
}: {
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <li
      className={last ? "relative" : "relative pb-[clamp(34px,5vw,52px)]"}
      style={{ paddingLeft: "clamp(44px,7vw,76px)" }}
    >
      {/* Bolt */}
      <span
        aria-hidden="true"
        className="absolute top-1 z-[2] flex h-[14px] w-[14px] items-center justify-center rounded-full border-2 border-ember bg-chalk"
        style={{ left: "var(--rope)", marginLeft: "-7px" }}
      >
        <span className="contact-bolt-core block h-1.5 w-1.5 rounded-full bg-ember" />
      </span>

      <div className="contact-acard">{children}</div>
    </li>
  );
}
