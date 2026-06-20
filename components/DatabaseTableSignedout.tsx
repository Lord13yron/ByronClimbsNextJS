import { columnsSignedOut } from "@/app/database/columnsSignedout";
import { DataTableSignedOut } from "@/app/database/data-table-signed-out";
import { getClimbs } from "@/lib/data-service";
import { filterClimbs } from "@/lib/database-filter";
import { SearchParams } from "@/app/types/types";
import MonoChip from "@/components/ui/MonoChip";

export default async function DatabaseTableSignedout({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const climbs = await getClimbs();
  const data = filterClimbs(climbs, params, { signedIn: false });

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-16 md:px-14">
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-24 text-center">
          <p className="font-display text-[26px] uppercase text-slate-300">
            Nothing logged here
          </p>
          <MonoChip className="text-slate-400">
            Try clearing a filter or two.
          </MonoChip>
        </div>
      ) : (
        <DataTableSignedOut columns={columnsSignedOut} data={data} />
      )}
    </div>
  );
}
