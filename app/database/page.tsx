import { SearchParams } from "../types/types";
import { Suspense } from "react";
import DatabaseTableSkeleton from "@/components/DatabaseTableSkeleton";

import DatabaseWrapper from "@/components/DatabaseWrapper";

export default async function DatabasePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return (
    <div className="container mx-auto py-6 max-w-6xl">
      <Suspense fallback={<DatabaseTableSkeleton />}>
        <DatabaseWrapper searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
