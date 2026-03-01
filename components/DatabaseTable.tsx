import { columns } from "@/app/database/columns";
import { DataTable } from "@/app/database/data-table";
import { SearchParams } from "@/app/types/types";
import {
  getClimbs,
  getFavoritesForUser,
  getSendsForUser,
} from "@/lib/data-service";

export default async function DatabaseTable({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const filter = await searchParams;

  const climbs = await getClimbs();
  const sends = await getSendsForUser();
  const favorites = await getFavoritesForUser();

  const sentClimbs = climbs.filter((climb) =>
    sends.some((send) => send.climb_id === climb.id),
  );

  const favoriteClimbs = climbs.filter((climb) =>
    favorites.some((fav) => fav.climb_id === climb.id),
  );

  let data = climbs;
  if (filter.filter === "sends") {
    data = sentClimbs;
  } else if (filter.filter === "favorites") {
    data = favoriteClimbs;
  }

  return (
    <DataTable
      columns={columns}
      data={data}
      sends={sends}
      favorites={favorites}
    />
  );
}
