// Server-side aggregations for the Database / Logbook page. Pure functions over
// already-fetched climbs + the owner's sends, so the masthead, the 3D skyline,
// the field-stats pyramid/crags/regions, and the milestones strip all share one
// source of truth and render identically for signed-out and signed-in viewers.
//
// "Sent" everywhere on this page means the site owner's sends (see
// getOwnerSends in data-service) — these visualizations represent Byron's
// logbook, not the current viewer's. Per-row tick/favorite state in the table
// still uses the viewer's own sends/favorites.

import { Climb, Send } from "@/app/types/types";
import { VGRADES, SPORTGRADES, hardestGrade } from "./grades";

export type GradeSystem = "boulder" | "sport";

export type MastheadStats = {
  routes: number;
  sends: number;
  crags: number;
  /** Hardest sent grade — boulder preferred (e.g. "V8"), else sport, else "—". */
  topSend: string;
};

export type GradeCount = {
  /** Raw stored grade (e.g. "8" or "5.12a"). */
  grade: string;
  /** Display label (e.g. "V8" or "5.12a"). */
  label: string;
  total: number;
  sent: number;
};

export type CragCount = {
  area: string;
  city: string;
  count: number;
  sent: number;
};

export type RegionCount = { name: string; count: number };

const sentIdSet = (sends: Send[]) => new Set(sends.map((s) => s.climb_id));

const gradeLabel = (grade: string, system: GradeSystem) =>
  system === "boulder" ? `V${grade}` : grade;

export function getMastheadStats(climbs: Climb[], sends: Send[]): MastheadStats {
  const sent = sentIdSet(sends);
  const sentClimbs = climbs.filter((c) => sent.has(c.id));

  const crags = new Set(
    climbs.map((c) => c.area).filter((a): a is string => Boolean(a)),
  ).size;

  const boulderGrades = sentClimbs
    .filter((c) => c.type === "boulder")
    .map((c) => c.grade);
  const sportGrades = sentClimbs
    .filter((c) => c.type !== "boulder")
    .map((c) => c.grade);

  const topBoulder = hardestGrade(boulderGrades, VGRADES);
  const topSport = hardestGrade(sportGrades, SPORTGRADES);
  const topSend = topBoulder ? `V${topBoulder}` : (topSport ?? "—");

  return { routes: climbs.length, sends: sends.length, crags, topSend };
}

/**
 * Ordered grade counts (low → high) for the given discipline, trimmed to the
 * hardest grade actually present so empty top grades (e.g. V11–V17) are dropped.
 * Feeds both the field-stats pyramid (reversed to high → low) and the skyline.
 */
export function getGradeCounts(
  climbs: Climb[],
  sends: Send[],
  system: GradeSystem,
): GradeCount[] {
  const sent = sentIdSet(sends);
  const scale = system === "boulder" ? VGRADES : SPORTGRADES;
  const relevant = climbs.filter((c) =>
    system === "boulder" ? c.type === "boulder" : c.type === "sport",
  );

  const totals = new Map<string, { total: number; sent: number }>();
  for (const c of relevant) {
    const e = totals.get(c.grade) ?? { total: 0, sent: 0 };
    e.total++;
    if (sent.has(c.id)) e.sent++;
    totals.set(c.grade, e);
  }

  let maxIdx = -1;
  scale.forEach((g, i) => {
    if (totals.has(g)) maxIdx = Math.max(maxIdx, i);
  });
  if (maxIdx === -1) return [];

  const out: GradeCount[] = [];
  for (let i = 0; i <= maxIdx; i++) {
    const g = scale[i];
    const e = totals.get(g) ?? { total: 0, sent: 0 };
    out.push({ grade: g, label: gradeLabel(g, system), total: e.total, sent: e.sent });
  }
  return out;
}

export function getTopCrags(
  climbs: Climb[],
  sends: Send[],
  n = 6,
): CragCount[] {
  const sent = sentIdSet(sends);
  const map = new Map<string, CragCount>();
  for (const c of climbs) {
    if (!c.area) continue;
    const e = map.get(c.area) ?? { area: c.area, city: c.city, count: 0, sent: 0 };
    e.count++;
    if (sent.has(c.id)) e.sent++;
    map.set(c.area, e);
  }
  return [...map.values()].sort((a, b) => b.count - a.count).slice(0, n);
}

/** Mirrors the prototype's regionOf; case-insensitive, falls back to the city. */
export function regionOf(city: string): string {
  const c = (city ?? "").trim().toLowerCase();
  if (c === "kelowna" || c === "vernon" || c === "penticton") return "Okanagan, BC";
  if (c === "squamish") return "Sea-to-Sky, BC";
  if (c === "fontainebleau") return "Fontainebleau, FR";
  if (c === "bangor") return "North Wales, UK";
  if (!c) return "Unknown";
  return c.charAt(0).toUpperCase() + c.slice(1);
}

export function getRegions(climbs: Climb[]): RegionCount[] {
  const map = new Map<string, number>();
  for (const c of climbs) {
    const r = regionOf(c.city);
    map.set(r, (map.get(r) ?? 0) + 1);
  }
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
