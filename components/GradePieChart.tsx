"use client";

import { useRef, useState } from "react";
import TypeGlyph from "./ui/TypeGlyph";
import MonoChip from "./ui/MonoChip";
import {
  gsap,
  prefersReducedMotion,
  useIsomorphicLayoutEffect,
} from "./anim/gsap";

type GradeData = { grade: string; count: number };
type Props = {
  data: GradeData[];
  type: "boulder" | "sport";
  /** Optional mono footnote rendered under the card with a top border. */
  footnote?: string;
};

const SEGMENT_COLORS = [
  "#C8541E", // ember
  "#2A4D7A", // deep blue
  "#3D6644", // forest
  "#9B7A2A", // amber
  "#6B3258", // plum
  "#4A7272", // teal
  "#923040", // crimson
  "#5A5570", // slate purple
];
const MONO_FONT = "'JetBrains Mono', ui-monospace, monospace";

function buildArcPath(
  cx: number,
  cy: number,
  r: number,
  sa: number,
  ea: number,
): string {
  // Clamp to just under 2π so a single full segment still renders
  const safeEa = ea - sa >= Math.PI * 2 - 0.001 ? sa + Math.PI * 2 - 0.001 : ea;
  const large = safeEa - sa > Math.PI ? 1 : 0;
  const x1 = cx + r * Math.cos(sa);
  const y1 = cy + r * Math.sin(sa);
  const x2 = cx + r * Math.cos(safeEa);
  const y2 = cy + r * Math.sin(safeEa);
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
}

export default function GradePieChart({ data, type, footnote }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Donut rotates + scales + fades into place when scrolled into view. Runs
  // before any hover, so it composes cleanly with the per-path hover opacity.
  useIsomorphicLayoutEffect(() => {
    const el = cardRef.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".donut-rotate", {
        rotation: -28,
        scale: 0.9,
        autoAlpha: 0,
        transformOrigin: "center center",
        duration: 1.0,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 84%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const total = data.reduce((sum, d) => sum + d.count, 0);
  const kicker = type === "boulder" ? "— BOULDER" : "— SPORT";
  const title = type === "boulder" ? "By Grade · Boulder" : "By Grade · Sport";

  if (total === 0) {
    return (
      <div className="bg-chalk border border-chalk-3 rounded-md p-5.5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <MonoChip className="text-ember mb-1.5 block">{kicker}</MonoChip>
            <h3 className="font-display uppercase text-[22px] m-0 leading-none text-granite-100">
              {title}
            </h3>
          </div>
          <TypeGlyph type={type} size={20} className="text-slate-500 mt-1" />
        </div>
        <MonoChip className="text-slate-500 block py-6 text-center">
          No {type} sends yet.
        </MonoChip>
        {footnote && (
          <MonoChip className="mt-4 block border-t border-chalk-3 pt-3 text-slate-500">
            {footnote}
          </MonoChip>
        )}
      </div>
    );
  }

  const cx = 100;
  const cy = 100;
  const r = 80;
  const innerR = 42;
  let cumulative = 0;

  const segments = data.map((d, i) => {
    const sa = (cumulative / total) * Math.PI * 2 - Math.PI / 2;
    cumulative += d.count;
    const ea = (cumulative / total) * Math.PI * 2 - Math.PI / 2;
    const mid = (sa + ea) / 2;
    const isRight = Math.cos(mid) >= 0;

    // Callout line: start just inside the outer edge → elbow → horizontal tick
    const elbowX = cx + (r + 20) * Math.cos(mid);
    const elbowY = cy + (r + 20) * Math.sin(mid);
    const tickX = elbowX + (isRight ? 16 : -16);

    const displayGrade = type === "boulder" ? `V${d.grade}` : d.grade;

    return {
      path: buildArcPath(cx, cy, r, sa, ea),
      color: SEGMENT_COLORS[i % SEGMENT_COLORS.length],
      displayGrade,
      count: d.count,
      pct: Math.round((d.count / total) * 100),
      // polyline points
      lineStartX: cx + (r - 6) * Math.cos(mid),
      lineStartY: cy + (r - 6) * Math.sin(mid),
      elbowX,
      elbowY,
      tickX,
      textX: tickX + (isRight ? 4 : -4),
      textAnchor: (isRight ? "start" : "end") as "start" | "end",
    };
  });

  const MIN_LABEL_GAP = 13;
  const adjustedLabelY = (() => {
    const ys = segments.map((s) => s.elbowY);
    for (const isRight of [true, false]) {
      const side = segments
        .map((s, i) => ({ i, y: s.elbowY }))
        .filter((_, i) => (segments[i].textAnchor === "start") === isRight)
        .sort((a, b) => a.y - b.y);
      for (let k = 1; k < side.length; k++) {
        const minY = ys[side[k - 1].i] + MIN_LABEL_GAP;
        if (ys[side[k].i] < minY) ys[side[k].i] = minY;
      }
    }
    return ys;
  })();

  const hovSeg = hovered !== null ? segments[hovered] : null;

  return (
    <div
      ref={cardRef}
      className="bg-chalk border border-chalk-3 rounded-md p-5.5"
    >
      {/* Card header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <MonoChip className="text-ember mb-1.5 block">{kicker}</MonoChip>
          <h3 className="font-display uppercase text-[22px] m-0 leading-none text-granite-100">
            {title}
          </h3>
        </div>
        <TypeGlyph type={type} size={20} className="text-slate-500 mt-1" />
      </div>

      {/* Chart area — SVG + HTML overlay share the same block */}
      <div className="relative">
        <svg
          width="100%"
          viewBox="-70 -15 340 230"
          style={{ overflow: "visible" }}
          className="donut-rotate"
        >
          {/* Segments */}
          {segments.map((s, i) => (
            <path
              key={i}
              d={s.path}
              fill={s.color}
              stroke="var(--chalk)"
              strokeWidth="1.5"
              style={{
                cursor: "pointer",
                opacity: hovered !== null && hovered !== i ? 0.4 : 1,
                transition: "opacity 0.12s ease",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            />
          ))}

          {/* Donut hole */}
          <circle cx={cx} cy={cy} r={innerR} fill="var(--chalk)" />

          {/* Callout lines — rendered before labels so text is always on top */}
          {segments.map((s, i) => (
            <polyline
              key={i}
              points={`${s.lineStartX},${s.lineStartY} ${s.elbowX},${s.elbowY} ${s.tickX},${adjustedLabelY[i]}`}
              fill="none"
              stroke="var(--chalk-3)"
              strokeWidth="1"
              style={{
                pointerEvents: "none",
                opacity: hovered !== null && hovered !== i ? 0.25 : 0.85,
                transition: "opacity 0.12s ease",
              }}
            />
          ))}

          {/* Labels — rendered last so they always sit above lines */}
          {segments.map((s, i) => (
            <text
              key={i}
              x={s.textX}
              y={adjustedLabelY[i] + 4}
              textAnchor={s.textAnchor}
              fontFamily={MONO_FONT}
              fontSize={9}
              style={{
                pointerEvents: "none",
                fill: hovered === i ? "var(--ember)" : "var(--slate-700)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                transition: "fill 0.12s ease",
                paintOrder: "stroke fill",
                stroke: "var(--chalk)",
                strokeWidth: 5,
                strokeLinejoin: "round",
              }}
            >
              {s.displayGrade} · {s.pct}%
            </text>
          ))}
        </svg>

        {/* Center label — HTML so Saira/Mono fonts render correctly.
            The div is inset-0 and the content is centered at 50%/50%,
            which maps exactly to cx/cy in the viewBox above. */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {hovSeg ? (
            <>
              <span className="font-display text-[32px] leading-none text-granite-100">
                {hovSeg.count}
              </span>
              <MonoChip className="mt-1 text-[9px] text-slate-500">
                {hovSeg.displayGrade}
              </MonoChip>
            </>
          ) : (
            <>
              <span className="font-display text-[32px] leading-none text-granite-100">
                {total}
              </span>
              <MonoChip className="mt-1 text-[9px]">SENDS</MonoChip>
            </>
          )}
        </div>
      </div>

      {footnote && (
        <MonoChip className="mt-4 block border-t border-chalk-3 pt-3 text-slate-500">
          {footnote}
        </MonoChip>
      )}
    </div>
  );
}
