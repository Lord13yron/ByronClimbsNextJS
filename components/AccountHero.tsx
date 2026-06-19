"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import MonoChip from "./ui/MonoChip";
import TopoLine from "./ui/TopoLine";
import Counter from "./anim/Counter";
import DrawOn from "./anim/DrawOn";
import UsernameEditor from "./UsernameEditor";
import {
  gsap,
  prefersReducedMotion,
  useIsomorphicLayoutEffect,
} from "./anim/gsap";

const DIM_CLASS = "text-[rgba(244,241,236,0.5)]";

type AccountHeroProps = {
  username: string;
  avatarUrl: string | null;
  role: "user" | "admin";
  memberSince: number;
  sendsCount: number;
  favoritesCount: number;
  cragsVisited: number;
  topSend: string;
};

export default function AccountHero({
  username,
  avatarUrl,
  role,
  memberSince,
  sendsCount,
  favoritesCount,
  cragsVisited,
  topSend,
}: AccountHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".mast-line", {
        yPercent: 115,
        duration: 0.95,
        stagger: 0.08,
        ease: "power3.out",
      }).from(
        ".mast-rise",
        {
          autoAlpha: 0,
          y: 14,
          duration: 0.65,
          stagger: 0.1,
          ease: "power2.out",
        },
        0.45,
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[clamp(420px,58vh,540px)] flex-col justify-end overflow-hidden bg-granite-200"
    >
      {/* Ember glow (drifts top-right) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute z-[1]"
        style={{
          top: "-10%",
          right: "2%",
          width: "54%",
          height: "70%",
          background:
            "radial-gradient(ellipse at center, rgba(200,84,30,0.18), transparent 66%)",
          animation: "mast-glow 9s ease-in-out infinite alternate",
        }}
      />

      {/* Topo contour backdrop */}
      <DrawOn
        immediate
        className="pointer-events-none absolute inset-0 z-[1] text-chalk opacity-10"
      >
        <TopoLine rows={14} strokeWidth={1.2} className="h-full w-full" />
      </DrawOn>

      {/* Bottom scrim */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(22,22,24,0.25) 0%, transparent 42%, rgba(22,22,24,0.5) 100%)",
        }}
      />

      {/* Content cluster (bottom-anchored) */}
      <div
        className="relative z-[2] mx-auto w-full max-w-7xl"
        style={{ padding: "0 clamp(20px,5vw,56px) clamp(30px,5vw,48px)" }}
      >
        {/* Eyebrow */}
        <div className="mast-rise mb-5 flex items-center gap-3.5">
          <MonoChip className="text-ember-soft">— ACCOUNT</MonoChip>
          <span
            className="h-px max-w-[200px] flex-1"
            style={{
              background:
                "linear-gradient(90deg, rgba(227,122,63,0.4), transparent)",
            }}
          />
        </div>

        {/* Headline */}
        <h1
          className="font-display font-extrabold uppercase tracking-[0.01em] text-chalk"
          style={{ fontSize: "clamp(48px,9vw,118px)", lineHeight: 0.86 }}
        >
          <span className="block overflow-hidden pb-[0.04em]">
            <span
              className="mast-line flex items-center gap-3"
              style={{
                fontSize: "0.42em",
                color: "rgba(244,241,236,0.62)",
              }}
            >
              <AvatarCircle url={avatarUrl} initials={getInitials(username)} />
              Welcome back,
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.03em]">
            <span className="mast-line block">
              <UsernameEditor username={username} />
            </span>
          </span>
        </h1>

        {/* Meta row */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {/* Signed in pill */}
          <span
            className="mast-rise inline-flex items-center gap-2 rounded-sm px-3 py-1.5"
            style={{ background: "rgba(244,241,236,0.06)" }}
          >
            <span
              aria-hidden="true"
              className="inline-block h-[7px] w-[7px] rounded-full"
              style={{
                background: "#5FB87A",
                boxShadow: "0 0 0 3px rgba(95,184,122,0.18)",
              }}
            />
            <MonoChip className="text-chalk">SIGNED IN</MonoChip>
          </span>

          {/* Member since */}
          <span
            className="mast-rise inline-flex items-center rounded-sm px-3 py-1.5"
            style={{ background: "rgba(244,241,236,0.06)" }}
          >
            <MonoChip className={DIM_CLASS}>MEMBER SINCE {memberSince}</MonoChip>
          </span>

          {/* Admin only */}
          {role === "admin" && (
            <>
              <span
                className="mast-rise inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5"
                style={{ border: "1px solid rgba(227,122,63,0.5)" }}
              >
                <span aria-hidden="true" className="text-ember-soft">
                  ★
                </span>
                <MonoChip className="text-ember-soft">ADMIN PRIVILEGES</MonoChip>
              </span>
              <Link
                href="/admin"
                className="mast-rise font-display text-[13px] uppercase tracking-[0.01em] text-ember-soft underline-offset-4 hover:underline"
              >
                Admin dashboard →
              </Link>
            </>
          )}

        </div>

        {/* Stat strip */}
        <div
          className="mt-[clamp(34px,5vw,52px)] flex flex-wrap items-end gap-[clamp(20px,3vw,40px)] pt-[clamp(26px,3vw,34px)] max-[620px]:flex-nowrap max-[620px]:gap-3 max-[420px]:gap-2"
          style={{ borderTop: "1px solid rgba(244,241,236,0.14)" }}
        >
          <StatColumn caption="Sends logged">
            <Counter value={sendsCount} className="stat-num" />
          </StatColumn>
          <StatColumn caption="Favorites">
            <Counter value={favoritesCount} className="stat-num" />
          </StatColumn>
          <StatColumn caption="Top send" ember>
            <span className="stat-num">{topSend}</span>
          </StatColumn>
          <StatColumn caption="Crags visited">
            <Counter value={cragsVisited} className="stat-num" />
          </StatColumn>
        </div>
      </div>
    </section>
  );
}

function getInitials(username: string): string {
  const parts = username.split(/[\s_-]/);
  if (parts.length >= 2 && parts[0] && parts[1])
    return (parts[0][0] + parts[1][0]).toUpperCase();
  return username.slice(0, 2).toUpperCase();
}

function AvatarCircle({ url, initials }: { url: string | null; initials: string }) {
  const [imgFailed, setImgFailed] = useState(false);
  const circleClass =
    "w-11 h-11 shrink-0 rounded-full border-[1.5px] border-ember object-cover";
  const fallbackClass =
    "w-11 h-11 shrink-0 rounded-full border-[1.5px] border-ember bg-granite-200 flex items-center justify-center font-display font-bold text-[13px] text-chalk";

  if (url && !imgFailed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url}
        alt=""
        aria-hidden="true"
        className={circleClass}
        onError={() => setImgFailed(true)}
      />
    );
  }

  return <span className={fallbackClass}>{initials}</span>;
}

function StatColumn({
  caption,
  ember = false,
  children,
}: {
  caption: string;
  ember?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mast-rise">
      <div
        className={`font-display font-extrabold leading-[0.9] text-[clamp(40px,5.4vw,60px)] max-[620px]:[&_.stat-num]:text-[30px] max-[420px]:[&_.stat-num]:text-[25px] ${
          ember ? "text-ember-soft" : "text-chalk"
        }`}
      >
        {children}
      </div>
      <MonoChip
        className={`stat-cap mt-2 block max-[420px]:text-[8.5px] ${DIM_CLASS}`}
      >
        {caption}
      </MonoChip>
    </div>
  );
}
