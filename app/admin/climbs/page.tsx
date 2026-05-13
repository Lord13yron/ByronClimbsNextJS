import DatabaseTableAdmin from "@/components/DatabaseTableAdmin";
import DatabaseTableSkeleton from "@/components/DatabaseTableSkeleton";
import MonoChip from "@/components/ui/MonoChip";
import TopoLine from "@/components/ui/TopoLine";
import { Suspense } from "react";

export default function Climbs() {
  return (
    <div className="bg-chalk min-h-screen p-6 md:p-10">
      <div className="max-w-5xl mx-auto">

        <div className="mb-6">
          <MonoChip className="text-ember mb-3 block">— THE DATABASE</MonoChip>
          <h1
            className="font-display uppercase font-extrabold leading-[0.92] tracking-[0.01em] text-granite-100"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            Climbs.
          </h1>
          <p className="mt-3 text-[15px] leading-[1.6] text-slate-700 font-body">
            Manage the route database.
          </p>
        </div>

        <div className="text-chalk-3 opacity-60">
          <TopoLine height={36} seed={2} />
        </div>

        <div className="mt-8">
          <Suspense fallback={<DatabaseTableSkeleton />}>
            <DatabaseTableAdmin />
          </Suspense>
        </div>

      </div>
    </div>
  );
}
