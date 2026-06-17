"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Parallax from "@/components/anim/Parallax";
import {
  gsap,
  prefersReducedMotion,
  useIsomorphicLayoutEffect,
} from "@/components/anim/gsap";

type FeaturedEntryProps = {
  title: string;
  /** Pre-formatted as YYYY.MM.DD. */
  date: string;
  excerpt: string;
  imageUrl: string;
  href: string;
};

/**
 * Splits a title into two roughly balanced display lines (by char length).
 * A single-word title stays on one line.
 */
function splitHeadline(title: string): string[] {
  const words = title.trim().split(/\s+/);
  if (words.length < 2) return [title.trim()];

  const total = title.length;
  let line1 = "";
  let i = 0;
  while (i < words.length - 1 && line1.length + words[i].length < total / 2) {
    line1 += (line1 ? " " : "") + words[i];
    i++;
  }
  const line2 = words.slice(i).join(" ");
  return [line1, line2];
}

/**
 * Full-bleed, image-led featured panel bound to the newest post. Entrance and
 * parallax are progressive enhancement — under `prefers-reduced-motion` (and
 * with no JS) the final layout renders untouched.
 */
export default function FeaturedEntry({
  title,
  date,
  excerpt,
  imageUrl,
  href,
}: FeaturedEntryProps) {
  const ref = useRef<HTMLElement>(null);
  const lines = splitHeadline(title);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-feat-line]", {
        yPercent: 110,
        duration: 1.05,
        ease: "power4.out",
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });

      gsap.from("[data-reveal]", {
        y: 32,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="featured"
      ref={ref}
      className="relative flex min-h-[96vh] items-end overflow-hidden bg-granite-200"
    >
      {/* Background image (parallax) */}
      <Parallax
        yPercent={14}
        className="absolute left-0 top-[-10%] h-[120%] w-full"
      >
        <Image
          src={imageUrl}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_40%]"
        />
      </Parallax>

      {/* Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_20%,rgba(200,84,30,0.20),transparent_55%),linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.74)_100%)]" />

      {/* Content */}
      <div className="relative z-[2] w-full px-[clamp(16px,4vw,56px)] pb-7 pt-24 md:pb-10 md:pt-[140px]">
        <p
          data-reveal
          className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ember-soft"
        >
          — Featured Entry · {date}
        </p>

        <h2 className="mt-4 font-display font-extrabold uppercase leading-[0.92] text-chalk">
          {lines.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <span
                data-feat-line
                className="block text-[clamp(40px,7.6vw,110px)]"
              >
                {line}
              </span>
            </span>
          ))}
        </h2>

        <div
          data-reveal
          className="mt-[26px] flex flex-wrap items-end justify-between gap-8 border-t border-[rgba(244,241,236,0.28)] pt-[18px]"
        >
          <p className="max-w-[58ch] font-body text-[15.5px] font-light leading-[1.7] text-[rgba(244,241,236,0.85)]">
            {excerpt}
          </p>
          <Link
            href={href}
            className="whitespace-nowrap rounded-[2px] bg-ember px-[26px] py-3 font-display text-[14px] font-bold uppercase tracking-[0.08em] text-chalk transition-colors hover:bg-ember-deep"
          >
            Read Entry →
          </Link>
        </div>
      </div>
    </section>
  );
}
