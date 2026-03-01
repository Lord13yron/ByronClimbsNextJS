import { SearchParams } from "@/app/types/types";
import { getUser } from "@/lib/auth-actions";
import { Suspense } from "react";
import DatabaseTableSkeleton from "./DatabaseTableSkeleton";
import DatabaseTable from "./DatabaseTable";
import DatabaseTableSignedout from "./DatabaseTableSignedout";

type DatabaseWrapperProps = {
  searchParams: Promise<SearchParams>;
};

export default async function DatabaseWrapper({
  searchParams,
}: DatabaseWrapperProps) {
  const user = await getUser();
  return (
    // <div className="container mx-auto py-6 max-w-6xl">
    //   {user ? (
    //     <Suspense fallback={<DatabaseTableSkeleton />}>
    //       <DatabaseTable searchParams={searchParams} />
    //     </Suspense>
    //   ) : (
    //     <Suspense fallback={<DatabaseTableSkeleton />}>
    //       <DatabaseTableSignedout />
    //     </Suspense>
    //   )}
    // </div>
    <>
      {user ? (
        <Suspense fallback={<DatabaseTableSkeleton />}>
          <DatabaseTable searchParams={searchParams} />
        </Suspense>
      ) : (
        <Suspense fallback={<DatabaseTableSkeleton />}>
          <DatabaseTableSignedout />
        </Suspense>
      )}
    </>
  );
}
