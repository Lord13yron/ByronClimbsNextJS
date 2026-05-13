import { SearchParams } from "@/app/types/types";
import { getUser } from "@/lib/auth-actions";
import { getClimbs, getFavoritesForUser, getSendsForUser } from "@/lib/data-service";
import { Suspense } from "react";
import DatabaseTableSkeleton from "./DatabaseTableSkeleton";
import DatabaseTable from "./DatabaseTable";
import DatabaseTableSignedout from "./DatabaseTableSignedout";
import DatabasePageControls from "./DatabasePageControls";

type DatabaseWrapperProps = {
  searchParams: Promise<SearchParams>;
};

export default async function DatabaseWrapper({
  searchParams,
}: DatabaseWrapperProps) {
  const user = await getUser();

  if (!user) {
    const climbs = await getClimbs();
    return (
      <>
        <DatabasePageControls
          totalCount={climbs.length}
          sendsCount={0}
          favoritesCount={0}
          isLoggedIn={false}
        />
        <Suspense fallback={<DatabaseTableSkeleton />}>
          <DatabaseTableSignedout searchParams={searchParams} />
        </Suspense>
      </>
    );
  }

  const [climbs, sends, favorites] = await Promise.all([
    getClimbs(),
    getSendsForUser(),
    getFavoritesForUser(),
  ]);

  return (
    <>
      <DatabasePageControls
        totalCount={climbs.length}
        sendsCount={sends.length}
        favoritesCount={favorites.length}
        isLoggedIn={true}
      />
      <Suspense fallback={<DatabaseTableSkeleton />}>
        <DatabaseTable searchParams={searchParams} />
      </Suspense>
    </>
  );
}
