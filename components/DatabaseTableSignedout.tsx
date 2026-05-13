import { columnsSignedOut } from "@/app/database/columnsSignedout";
import { DataTableSignedOut } from "@/app/database/data-table-signed-out";
import { getClimbs } from "@/lib/data-service";
import { SearchParams } from "@/app/types/types";

export default async function DatabaseTableSignedout({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  let climbs = await getClimbs();

  if (params.q) {
    const q = params.q.toLowerCase();
    climbs = climbs.filter((c) =>
      ["name", "grade", "city", "area", "subArea"].some((field) =>
        String((c as Record<string, unknown>)[field] ?? "").toLowerCase().includes(q),
      ),
    );
  }

  return (
    <div className="px-4 md:px-14 max-w-[1280px] mx-auto w-full pb-16">
      <DataTableSignedOut columns={columnsSignedOut} data={climbs} />
    </div>
  );
}
