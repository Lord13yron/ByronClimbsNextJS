import { columnsSignedOut } from "@/app/database/columnsSignedout";

import { DataTableSignedOut } from "@/app/database/data-table-signed-out";
import { getClimbs } from "@/lib/data-service";

export default async function DatabaseTableSignedout() {
  const climbs = await getClimbs();

  return <DataTableSignedOut columns={columnsSignedOut} data={climbs} />;
}
