import { columns } from "@/app/database/columns";
import { DataTable } from "@/app/database/data-table";
import { SearchParams } from "@/app/types/types";
import {
  getClimbs,
  getFavoritesForUser,
  getSendsForUser,
} from "@/lib/data-service";
import { Climb, Favorite, Send } from "@/app/types/types";
import Link from "next/link";
import GradeChip from "./ui/GradeChip";
import TypeGlyph from "./ui/TypeGlyph";
import MonoChip from "./ui/MonoChip";
import FavoriteIcon from "./FavoriteIcon";
import TickBox from "./TickBox";

function CardView({
  climbs,
  sends,
  favorites,
}: {
  climbs: Climb[];
  sends: Send[];
  favorites: Favorite[];
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 px-4 md:px-14 max-w-[1280px] mx-auto w-full pb-16">
      {climbs.map((climb) => {
        const isSent = sends.some((s) => s.climb_id === climb.id);
        const sentDate = sends.find((s) => s.climb_id === climb.id)?.created_at;

        return (
          <div
            key={climb.id}
            className="bg-background border border-chalk-3 rounded-sm overflow-hidden group hover:border-ember transition-colors duration-150"
          >
            {/* Photo / placeholder */}
            <div className="relative" style={{ height: 200 }}>
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  background:
                    "repeating-linear-gradient(45deg, var(--chalk-2), var(--chalk-2) 8px, var(--chalk) 8px, var(--chalk) 16px)",
                }}
              >
                <MonoChip className="text-slate-400">{climb.name.toUpperCase()}</MonoChip>
              </div>

              {/* Grade chip overlay */}
              <div className="absolute top-2.5 left-2.5">
                <GradeChip
                  grade={climb.type === "boulder" ? `V${climb.grade}` : climb.grade}
                  variant={isSent ? "ember" : "solid"}
                />
              </div>

              {/* Heart overlay */}
              <div className="absolute top-2 right-2 flex gap-1.5">
                <div className="w-7 h-7 rounded-sm bg-[rgba(15,15,17,0.7)] flex items-center justify-center">
                  <FavoriteIcon climbId={climb.id} favorites={favorites} />
                </div>
              </div>

              {/* Sent badge */}
              {isSent && sentDate && (
                <div className="absolute bottom-2.5 left-2.5 bg-chalk flex items-center gap-1.5 px-2 py-0.5 rounded-sm">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6 L5 9 L10 3"
                      stroke="var(--ember)"
                      strokeWidth="2"
                      strokeLinecap="square"
                    />
                  </svg>
                  <MonoChip className="text-[9px] text-ember">
                    SENT{" "}
                    {new Date(sentDate).toLocaleDateString("en-CA").replace(/-/g, ".")}
                  </MonoChip>
                </div>
              )}
            </div>

            <div className="p-3 md:p-3.5">
              <Link href={`/database/${climb.id}-${climb.slug}`}>
                <h3 className="font-display uppercase text-[16px] md:text-[18px] leading-[1.05] text-granite-100 hover:text-ember transition-colors truncate">
                  {climb.name}
                </h3>
              </Link>
              <MonoChip className="mt-1.5 block text-slate-500">{climb.city}</MonoChip>
              <div className="mt-3 pt-2.5 border-t border-dashed border-chalk-3 flex justify-between items-center">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <TypeGlyph type={climb.type} size={12} />
                  <MonoChip className="text-slate-700">{climb.type.toUpperCase()}</MonoChip>
                </div>
                <MonoChip className="text-slate-500">{climb.area}</MonoChip>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default async function DatabaseTable({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const climbs = await getClimbs();
  const sends = await getSendsForUser();
  const favorites = await getFavoritesForUser();

  const sentClimbs = climbs.filter((climb) =>
    sends.some((send) => send.climb_id === climb.id),
  );

  const favoriteClimbs = climbs.filter((climb) =>
    favorites.some((fav) => fav.climb_id === climb.id),
  );

  let data = climbs;
  if (params.filter === "sends") {
    data = sentClimbs;
  } else if (params.filter === "favorites") {
    data = favoriteClimbs;
  }

  // Apply type filter
  if (params.type && params.type !== "all") {
    data = data.filter(
      (c) => c.type?.toLowerCase() === params.type?.toLowerCase(),
    );
  }

  // Apply text search
  if (params.q) {
    const q = params.q.toLowerCase();
    data = data.filter((c) =>
      ["name", "grade", "city", "area", "subArea"].some((field) =>
        String((c as Record<string, unknown>)[field] ?? "").toLowerCase().includes(q),
      ),
    );
  }

  const view = params.view ?? "list";

  if (view === "cards") {
    return (
      <CardView climbs={data} sends={sends} favorites={favorites} />
    );
  }

  return (
    <div className="px-4 md:px-14 max-w-[1280px] mx-auto w-full pb-16">
      <DataTable
        columns={columns}
        data={data}
        sends={sends}
        favorites={favorites}
      />
    </div>
  );
}
