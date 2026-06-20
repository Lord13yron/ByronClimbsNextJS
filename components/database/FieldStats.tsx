"use client";

import { useCallback, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import MonoChip from "@/components/ui/MonoChip";
import {
  gsap,
  prefersReducedMotion,
  useIsomorphicLayoutEffect,
} from "@/components/anim/gsap";
import type { GradeCount, CragCount, RegionCount } from "@/lib/database-stats";

type FieldStatsProps = {
  boulder: GradeCount[];
  sport: GradeCount[];
  crags: CragCount[];
  regions: RegionCount[];
  /** Display label of the hardest send, e.g. "V8". */
  topSend: string;
};

export default function FieldStats({
  boulder,
  sport,
  crags,
  regions,
  topSend,
}: FieldStatsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const rootRef = useRef<HTMLDivElement>(null);

  const type = searchParams.get("type") ?? "all";
  const activeGrade = searchParams.get("grade");
  const activeCrag = searchParams.get("crag");

  // type=all defaults grade views to boulder; trad hides them entirely.
  const system = type === "sport" ? "sport" : "boulder";
  const showPyramid = type !== "trad";
  const grades = system === "sport" ? sport : boulder;

  const setParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      const current = params.get(key);
      if (value === null || value === current) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  // scaleX grow-in for every bar (origin-left). Reduced motion → full width.
  useIsomorphicLayoutEffect(() => {
    const el = rootRef.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".fs-bar").forEach((bar) => {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: bar, start: "top 90%", once: true },
          },
        );
      });
    }, el);
    return () => ctx.revert();
  }, [system]);

  const maxGrade = Math.max(1, ...grades.map((g) => g.total));
  const maxCrag = Math.max(1, ...crags.map((c) => c.count));
  const maxRegion = Math.max(1, ...regions.map((r) => r.count));
  const sentTotal = grades.reduce((a, g) => a + g.sent, 0);
  const projTotal = grades.reduce((a, g) => a + (g.total - g.sent), 0);

  return (
    <section className="bg-chalk-2">
      <div
        ref={rootRef}
        className="mx-auto w-full max-w-7xl px-4 py-14 md:px-14 md:py-20"
      >
        <MonoChip className="mb-2 block text-ember">— BY THE NUMBERS</MonoChip>
        <h2
          className="mb-8 font-display font-bold uppercase text-granite-100"
          style={{ fontSize: "clamp(28px,3.6vw,42px)", lineHeight: 1 }}
        >
          The shape of the grind
        </h2>

        <div
          className={cn(
            "grid gap-6",
            showPyramid
              ? "grid-cols-1 lg:grid-cols-[1.25fr_1fr]"
              : "grid-cols-1",
          )}
        >
          {/* Pyramid */}
          {showPyramid && (
            <div className="rounded-sm border border-chalk-3 bg-chalk p-5 md:p-6">
              <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <MonoChip className="block text-slate-500">— THE PYRAMID</MonoChip>
                  <h3 className="mt-1 font-display text-[23px] font-bold uppercase leading-none text-granite-100">
                    Sends by grade
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block h-2.5 w-2.5 rounded-[1px] bg-ember" />
                    <MonoChip className="text-slate-500">Sent</MonoChip>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-[1px] border border-ember"
                      style={{
                        background:
                          "repeating-linear-gradient(45deg, transparent 0 2px, rgba(200,84,30,0.45) 2px 4px)",
                      }}
                    />
                    <MonoChip className="text-slate-500">Project</MonoChip>
                  </span>
                </div>
              </div>

              {grades.length === 0 ? (
                <MonoChip className="block py-6 text-slate-400">
                  No {system} grades logged yet.
                </MonoChip>
              ) : (
                <div className="flex flex-col gap-2">
                  {[...grades].reverse().map((g) => {
                    const isActive = activeGrade === g.grade;
                    const sentShare = g.total ? (g.sent / g.total) * 100 : 0;
                    return (
                      <button
                        key={g.grade}
                        onClick={() => setParam("grade", g.grade)}
                        className="grid cursor-pointer grid-cols-[34px_1fr_42px] items-center gap-2.5 text-left"
                      >
                        <span
                          className={cn(
                            "font-display text-[15px] font-bold uppercase leading-none transition-colors",
                            isActive ? "text-ember" : "text-granite-100",
                          )}
                        >
                          {g.label}
                        </span>
                        <span className="block h-3.5 rounded-sm bg-chalk-2">
                          <span
                            className="fs-bar flex h-full origin-left overflow-hidden rounded-sm"
                            style={{ width: `${(g.total / maxGrade) * 100}%` }}
                          >
                            <span
                              className="h-full bg-ember"
                              style={{ width: `${sentShare}%` }}
                            />
                            <span
                              className="h-full flex-1 border border-ember"
                              style={{
                                background:
                                  "repeating-linear-gradient(45deg, transparent 0 3px, rgba(200,84,30,0.4) 3px 6px)",
                              }}
                            />
                          </span>
                        </span>
                        <span className="text-right font-mono text-[11px] text-slate-500">
                          {g.total}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              <MonoChip className="mt-5 block leading-[1.6] text-slate-500">
                {sentTotal} SENT · {projTotal} STILL ON THE PROJECT LIST · TOP
                SEND {topSend}
              </MonoChip>
            </div>
          )}

          {/* Right column: crags + regions */}
          <div className="flex flex-col gap-6">
            {/* Top crags */}
            <div className="rounded-sm border border-chalk-3 bg-chalk p-5 md:p-6">
              <MonoChip className="block text-slate-500">
                — GROUND COVERED
              </MonoChip>
              <h3 className="mb-4 mt-1 font-display text-[23px] font-bold uppercase leading-none text-granite-100">
                Top crags
              </h3>
              <div className="flex flex-col gap-3.5">
                {crags.map((c) => {
                  const isActive = activeCrag === c.area;
                  return (
                    <button
                      key={c.area}
                      onClick={() => setParam("crag", c.area)}
                      className="block cursor-pointer text-left"
                    >
                      <div className="mb-1 flex items-baseline justify-between gap-2">
                        <span
                          className={cn(
                            "font-display text-[15px] font-bold uppercase leading-none transition-colors",
                            isActive ? "text-ember" : "text-granite-100",
                          )}
                        >
                          {c.area}
                        </span>
                        <MonoChip className="text-slate-500">
                          {c.count} · {c.city}
                        </MonoChip>
                      </div>
                      <span className="block h-2 rounded-sm bg-chalk-2">
                        <span
                          className="fs-bar block h-full origin-left rounded-sm"
                          style={{
                            width: `${(c.count / maxCrag) * 100}%`,
                            background:
                              "linear-gradient(90deg, var(--ember), var(--ember-soft))",
                          }}
                        />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Regions */}
            <div className="rounded-sm border border-chalk-3 bg-chalk p-5 md:p-6">
              <MonoChip className="block text-slate-500">— ON THE MAP</MonoChip>
              <h3 className="mb-3 mt-1 font-display text-[23px] font-bold uppercase leading-none text-granite-100">
                Regions
              </h3>
              <div className="flex flex-col">
                {regions.map((r, i) => (
                  <div
                    key={r.name}
                    className={cn(
                      "flex items-center justify-between gap-3 py-2.5",
                      i > 0 && "border-t border-chalk-2",
                    )}
                  >
                    <span className="font-display text-[15px] font-semibold uppercase leading-none text-granite-100">
                      {r.name}
                    </span>
                    <div className="flex items-center gap-2.5">
                      <span
                        className="block h-1.5 rounded-sm bg-ember"
                        style={{
                          width: `${Math.max(14, (r.count / maxRegion) * 64)}px`,
                          opacity: 0.55,
                        }}
                      />
                      <span className="font-mono text-[11px] text-slate-500">
                        {r.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
