// Shared logbook filtering so the table (which renders the rows) and the
// controls' result-count label agree on the filtered set. Composes status,
// type, grade, crag, and text-search filters — all AND-ed together.

import { Climb, Favorite, Send, SearchParams } from "@/app/types/types";

type FilterOpts = {
  sends?: Send[];
  favorites?: Favorite[];
  /** Signed-out viewers can't filter by status (no sends/favorites). */
  signedIn: boolean;
};

const SEARCH_FIELDS = ["name", "grade", "city", "area", "subArea"] as const;

export function filterClimbs(
  climbs: Climb[],
  params: SearchParams,
  { sends = [], favorites = [], signedIn }: FilterOpts,
): Climb[] {
  let data = climbs;

  if (signedIn) {
    if (params.filter === "sends") {
      data = data.filter((c) => sends.some((s) => s.climb_id === c.id));
    } else if (params.filter === "favorites") {
      data = data.filter((c) => favorites.some((f) => f.climb_id === c.id));
    }
  }

  if (params.type && params.type !== "all") {
    data = data.filter(
      (c) => c.type?.toLowerCase() === params.type?.toLowerCase(),
    );
  }

  if (params.grade) {
    data = data.filter((c) => c.grade === params.grade);
  }

  if (params.crag) {
    data = data.filter((c) => c.area === params.crag);
  }

  if (params.q) {
    const q = params.q.toLowerCase();
    data = data.filter((c) =>
      SEARCH_FIELDS.some((field) =>
        String((c as Record<string, unknown>)[field] ?? "")
          .toLowerCase()
          .includes(q),
      ),
    );
  }

  return data;
}
