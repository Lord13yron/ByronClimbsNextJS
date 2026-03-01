import { SearchParams } from "../types/types";
import { Suspense } from "react";
import DatabaseTableSkeleton from "@/components/DatabaseTableSkeleton";

import DatabaseWrapper from "@/components/DatabaseWrapper";

export const metadata = {
  title: "Climbing Database",
  description:
    "Explore our comprehensive climbing database, featuring detailed information on climbing routes, grades, locations, and user-generated content to help you plan your next adventure.",
};

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
