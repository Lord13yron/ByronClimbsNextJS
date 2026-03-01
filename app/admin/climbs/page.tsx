import DatabaseTableAdmin from "@/components/DatabaseTableAdmin";
import DatabaseTableSkeleton from "@/components/DatabaseTableSkeleton";
import { Suspense } from "react";

export default function Climbs() {
  return (
    <div className="container mx-auto py-6 max-w-6xl">
      <Suspense fallback={<DatabaseTableSkeleton />}>
        <DatabaseTableAdmin />
      </Suspense>
    </div>
  );
}
