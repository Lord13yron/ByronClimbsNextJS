// Curated "Firsts & Favourites" strip for the Database page.
//
// HAND-MAINTAINED: edit this list as the logbook grows. Each entry pins a climb
// by its database id and a short tag. Find an id from a route URL
// (/database/{id}-{slug}) or the climbs table. Entries whose climbId no longer
// exists are skipped, and the strip hides entirely when nothing resolves.

import { Climb, Send } from "@/app/types/types";

export type MilestoneDef = { tag: string; climbId: number };

export const MILESTONES: MilestoneDef[] = [
  { tag: "FIRST V6", climbId: 99 },
  { tag: "FIRST V7", climbId: 86 },
  { tag: "FIRST V8", climbId: 14 },
  { tag: "FAVOURITE", climbId: 37 },
  { tag: "CURRENT PROJECT", climbId: 23 },
];

export type ResolvedMilestone = {
  tag: string;
  name: string;
  slug: string;
  id: number;
  gradeLabel: string;
  area: string;
  city: string;
  sent: boolean;
};

export function resolveMilestones(
  climbs: Climb[],
  ownerSends: Send[],
): ResolvedMilestone[] {
  const sent = new Set(ownerSends.map((s) => s.climb_id));
  return MILESTONES.flatMap((m) => {
    const c = climbs.find((x) => x.id === m.climbId);
    if (!c) return [];
    return [
      {
        tag: m.tag,
        name: c.name,
        slug: c.slug,
        id: c.id,
        gradeLabel: c.type === "boulder" ? `V${c.grade}` : c.grade,
        area: c.area,
        city: c.city,
        sent: sent.has(c.id),
      },
    ];
  });
}
