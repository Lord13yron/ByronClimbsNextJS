import { columnsAdmin } from "@/app/admin/climbs/columnsAdmin";
import DataTableAdmin from "@/app/admin/climbs/data-table-admin";
import { getClimbs } from "@/lib/data-service";

export default async function DatabaseTableAdmin() {
  const climbs = await getClimbs();

  return <DataTableAdmin columns={columnsAdmin} data={climbs} />;
}
