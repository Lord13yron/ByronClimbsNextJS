import { columns } from "@/app/database/columns";
import { DataTable } from "@/app/database/data-table";
import { SearchParams } from "@/app/types/types";
import {
  getClimbs,
  getFavoritesForUser,
  getSendsForUser,
  getAllClimbImages,
} from "@/lib/data-service";
import { filterClimbs } from "@/lib/database-filter";
import { Climb, Favorite, Send } from "@/app/types/types";
import Link from "next/link";
import Image from "next/image";
import GradeChip from "./ui/GradeChip";
import TypeGlyph from "./ui/TypeGlyph";
import MonoChip from "./ui/MonoChip";
import FavoriteIcon from "./FavoriteIcon";

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-24 text-center">
      <p className="font-display text-[26px] uppercase text-slate-300">
        Nothing logged here
      </p>
      <MonoChip className="text-slate-400">Try clearing a filter or two.</MonoChip>
    </div>
  );
}

function CardView({
  climbs,
  sends,
  favorites,
  climbImageMap,
}: {
  climbs: Climb[];
  sends: Send[];
  favorites: Favorite[];
  climbImageMap: Map<number, string>;
}) {
  if (climbs.length === 0) return <EmptyState />;

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
      {climbs.map((climb) => {
        const isSent = sends.some((s) => s.climb_id === climb.id);
        const sentDate = sends.find((s) => s.climb_id === climb.id)?.created_at;
        const imageUrl = climbImageMap.get(climb.id);

        return (
          <div
            key={climb.id}
            className="group overflow-hidden rounded-sm border border-chalk-3 bg-chalk transition-colors duration-150 hover:border-ember"
          >
            {/* Photo / placeholder */}
            <div className="relative overflow-hidden" style={{ height: 180 }}>
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={climb.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center"
                  style={{
                    background:
                      "repeating-linear-gradient(45deg, var(--chalk-2), var(--chalk-2) 8px, var(--chalk) 8px, var(--chalk) 16px)",
                  }}
                >
                  <MonoChip className="text-slate-400">
                    {climb.name.toUpperCase()}
                  </MonoChip>
                </div>
              )}

              {/* Grade chip overlay */}
              <div className="absolute left-2.5 top-2.5">
                <GradeChip
                  grade={
                    climb.type === "boulder" ? `V${climb.grade}` : climb.grade
                  }
                  variant={isSent ? "ember" : "solid"}
                />
              </div>

              {/* Heart overlay */}
              <div className="absolute right-2 top-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-[rgba(15,15,17,0.7)]">
                  <FavoriteIcon climbId={climb.id} favorites={favorites} />
                </div>
              </div>

              {/* Sent badge */}
              {isSent && sentDate && (
                <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-sm bg-chalk px-2 py-0.5">
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
                    {new Date(sentDate)
                      .toLocaleDateString("en-CA")
                      .replace(/-/g, ".")}
                  </MonoChip>
                </div>
              )}
            </div>

            <div className="p-3 md:p-3.5">
              <Link href={`/database/${climb.id}-${climb.slug}`}>
                <h3 className="truncate font-display text-[16px] uppercase leading-[1.05] text-granite-100 transition-colors hover:text-ember md:text-[17px]">
                  {climb.name}
                </h3>
              </Link>
              <MonoChip className="mt-1.5 block capitalize text-slate-500">
                {climb.city}
              </MonoChip>
              <div className="mt-3 flex items-center justify-between border-t border-dashed border-chalk-3 pt-2.5">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <TypeGlyph type={climb.type} size={12} />
                  <MonoChip className="text-slate-700">
                    {climb.type.toUpperCase()}
                  </MonoChip>
                </div>
                <MonoChip className="capitalize text-slate-500">
                  {climb.area}
                </MonoChip>
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

  const [climbs, sends, favorites, climbImages] = await Promise.all([
    getClimbs(),
    getSendsForUser(),
    getFavoritesForUser(),
    getAllClimbImages(),
  ]);

  const climbImageMap = climbImages.reduce((map, img) => {
    if (!map.has(img.climb_id)) map.set(img.climb_id, img.url);
    return map;
  }, new Map<number, string>());

  const data = filterClimbs(climbs, params, {
    sends,
    favorites,
    signedIn: true,
  });

  const view = params.view ?? "list";

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-16 md:px-14">
      {view === "cards" ? (
        <CardView
          climbs={data}
          sends={sends}
          favorites={favorites}
          climbImageMap={climbImageMap}
        />
      ) : data.length === 0 ? (
        <EmptyState />
      ) : (
        <DataTable
          columns={columns}
          data={data}
          sends={sends}
          favorites={favorites}
        />
      )}
    </div>
  );
}
