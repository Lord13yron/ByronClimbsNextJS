import { SearchParams } from "../types/types";
import { Suspense } from "react";
import DatabaseTableSkeleton from "@/components/DatabaseTableSkeleton";
import DatabaseWrapper from "@/components/DatabaseWrapper";
import DatabaseMasthead from "@/components/database/DatabaseMasthead";
import FieldStats from "@/components/database/FieldStats";
import MilestonesStrip from "@/components/database/MilestonesStrip";
import ScrollProgressBar from "@/components/database/ScrollProgressBar";
import TopoLine from "@/components/ui/TopoLine";
import { getClimbs, getOwnerSends } from "@/lib/data-service";
import {
  getMastheadStats,
  getGradeCounts,
  getTopCrags,
  getRegions,
} from "@/lib/database-stats";
import { resolveMilestones } from "@/lib/milestones";

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
      <ScrollProgressBar />

      <Suspense fallback={<MastheadFallback />}>
        <Masthead />
      </Suspense>

      <div className="text-chalk-3">
        <TopoLine height={38} seed={2} />
      </div>

      {/* Controls + table */}
      <Suspense fallback={<DatabaseTableSkeleton />}>
        <DatabaseWrapper searchParams={Promise.resolve(params)} />
      </Suspense>

      <div className="bg-chalk-2 text-chalk-3">
        <TopoLine height={38} seed={5} />
      </div>

      <Suspense fallback={null}>
        <FieldStatsSection />
      </Suspense>
    </div>
  );
}

function MastheadFallback() {
  return <div className="min-h-[clamp(420px,58vh,540px)] bg-granite-200" />;
}

async function Masthead() {
  try {
    const [climbs, ownerSends] = await Promise.all([
      getClimbs(),
      getOwnerSends(),
    ]);
    const stats = getMastheadStats(climbs, ownerSends);
    return <DatabaseMasthead stats={stats} />;
  } catch {
    return <MastheadFallback />;
  }
}

async function FieldStatsSection() {
  try {
    const [climbs, ownerSends] = await Promise.all([
      getClimbs(),
      getOwnerSends(),
    ]);
    const boulder = getGradeCounts(climbs, ownerSends, "boulder");
    const sport = getGradeCounts(climbs, ownerSends, "sport");
    const crags = getTopCrags(climbs, ownerSends, 6);
    const regions = getRegions(climbs);
    const { topSend } = getMastheadStats(climbs, ownerSends);
    const milestones = resolveMilestones(climbs, ownerSends);

    return (
      <>
        <FieldStats
          boulder={boulder}
          sport={sport}
          crags={crags}
          regions={regions}
          topSend={topSend}
        />
        <MilestonesStrip milestones={milestones} />
      </>
    );
  } catch {
    return null;
  }
}
