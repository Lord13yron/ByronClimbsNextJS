import { SearchParams } from "../types/types";
import { Suspense } from "react";
import DatabaseTableSkeleton from "@/components/DatabaseTableSkeleton";
import DatabaseWrapper from "@/components/DatabaseWrapper";
import MonoChip from "@/components/ui/MonoChip";

export const metadata = {
  title: "The Logbook",
  description:
    "Every climb, logged honestly — routes across the Okanagan and various other crags I've visited, with sends, projects, and personal notes.",
};

export default async function DatabasePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  return (
    <div className="bg-background">
      {/* Page header */}
      <div className="px-4 md:px-14 py-8 md:py-14 max-w-7xl mx-auto w-full">
        <MonoChip className="text-ember mb-3 block">— THE DATABASE</MonoChip>
        <div className="flex flex-wrap justify-between items-end gap-6">
          <div>
            <h1
              className="font-display uppercase font-bold text-granite-100 leading-[0.95] tracking-[0.01em]"
              style={{
                fontSize: "clamp(44px, 6vw, 72px)",
                textWrap: "balance",
              }}
            >
              The logbook
            </h1>
            <p
              className="mt-3 text-[15px] text-slate-700 max-w-145 leading-[1.55] font-body"
              style={{ textWrap: "pretty" }}
            >
              Climbs across the Okanagan, Sea-to-Sky, and a handful of road-trip
              detours. Filter by what you&apos;d like to see — sends, favorites,
              or everything I&apos;ve ever touched.
            </p>
          </div>
          <div className="text-right">
            <Suspense fallback={null}>
              <DatabaseMeta />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Controls + table */}
      <Suspense fallback={<DatabaseTableSkeleton />}>
        <DatabaseWrapper searchParams={Promise.resolve(params)} />
      </Suspense>
    </div>
  );
}

async function DatabaseMeta() {
  const { getClimbs, getSendsForUser } = await import("@/lib/data-service");
  const { getUser } = await import("@/lib/auth-actions");

  try {
    const [climbs, user] = await Promise.all([getClimbs(), getUser()]);
    const now = new Date();
    const lastUpdated = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")}`;

    if (!user) {
      return (
        <MonoChip className="text-slate-500 leading-[1.7] block">
          LAST UPDATED {lastUpdated}
          <br />
          {climbs.length} ROUTES
        </MonoChip>
      );
    }

    const sends = await getSendsForUser();
    return (
      <MonoChip className="text-slate-500 leading-[1.7] block">
        LAST UPDATED {lastUpdated}
        <br />
        {climbs.length} ROUTES · {sends.length} SENDS
      </MonoChip>
    );
  } catch {
    return null;
  }
}
