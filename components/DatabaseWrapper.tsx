import { SearchParams } from "@/app/types/types";
import { getUser } from "@/lib/auth-actions";
import {
  getClimbs,
  getFavoritesForUser,
  getSendsForUser,
} from "@/lib/data-service";
import { getGradeCounts } from "@/lib/database-stats";
import { filterClimbs } from "@/lib/database-filter";
import { Suspense } from "react";
import DatabaseTableSkeleton from "./DatabaseTableSkeleton";
import DatabaseTable from "./DatabaseTable";
import DatabaseTableSignedout from "./DatabaseTableSignedout";
import DatabasePageControls from "./DatabasePageControls";

type DatabaseWrapperProps = {
  searchParams: Promise<SearchParams>;
};

const toOptions = (counts: { grade: string; label: string; total: number }[]) =>
  counts.map(({ grade, label, total }) => ({ grade, label, count: total }));

export default async function DatabaseWrapper({
  searchParams,
}: DatabaseWrapperProps) {
  const [user, params, climbs] = await Promise.all([
    getUser(),
    searchParams,
    getClimbs(),
  ]);

  const boulderGrades = toOptions(getGradeCounts(climbs, [], "boulder"));
  const sportGrades = toOptions(getGradeCounts(climbs, [], "sport"));

  const countType = (type: string) =>
    climbs.filter((c) => c.type?.toLowerCase() === type).length;
  const typeCounts = {
    all: climbs.length,
    boulder: countType("boulder"),
    sport: countType("sport"),
    trad: countType("trad"),
  };

  if (!user) {
    const filteredCount = filterClimbs(climbs, params, {
      signedIn: false,
    }).length;
    return (
      <>
        <DatabasePageControls
          totalCount={climbs.length}
          filteredCount={filteredCount}
          sendsCount={0}
          favoritesCount={0}
          isLoggedIn={false}
          boulderGrades={boulderGrades}
          sportGrades={sportGrades}
          typeCounts={typeCounts}
        />
        <Suspense fallback={<DatabaseTableSkeleton />}>
          <DatabaseTableSignedout searchParams={Promise.resolve(params)} />
        </Suspense>
      </>
    );
  }

  const [sends, favorites] = await Promise.all([
    getSendsForUser(),
    getFavoritesForUser(),
  ]);

  const filteredCount = filterClimbs(climbs, params, {
    sends,
    favorites,
    signedIn: true,
  }).length;

  return (
    <>
      <DatabasePageControls
        totalCount={climbs.length}
        filteredCount={filteredCount}
        sendsCount={sends.length}
        favoritesCount={favorites.length}
        isLoggedIn={true}
        boulderGrades={boulderGrades}
        sportGrades={sportGrades}
        typeCounts={typeCounts}
      />
      <Suspense fallback={<DatabaseTableSkeleton />}>
        <DatabaseTable searchParams={Promise.resolve(params)} />
      </Suspense>
    </>
  );
}
