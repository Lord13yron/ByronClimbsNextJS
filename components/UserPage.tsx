import { getUser } from "@/lib/auth-actions";
import {
  getClimbs,
  getSendsForUser,
  getFavoritesForUser,
} from "@/lib/data-service";
import { getMastheadStats, getTopCrags } from "@/lib/database-stats";
import { Climb } from "@/app/types/types";
import AccountHero from "./AccountHero";
import RecentSends from "./RecentSends";
import AccountFavorites from "./AccountFavorites";
import AccountTopCrags from "./AccountTopCrags";
import GradePieChart from "./GradePieChart";
import DateBarGraph from "./DateBarGraph";
import TopoLine from "./ui/TopoLine";
import MonoChip from "./ui/MonoChip";
import DrawOn from "./anim/DrawOn";
import ScrollRefresh from "./anim/ScrollRefresh";
import ScrollProgressBar from "./database/ScrollProgressBar";

export default async function UserPage() {
  const user = await getUser();
  const sendsForUser = await getSendsForUser();
  const climbs = await getClimbs();
  const favorites = await getFavoritesForUser();

  const sends = climbs
    .filter((climb) => sendsForUser.some((send) => send.climb_id === climb.id))
    .map((climb) => {
      const send = sendsForUser.find((send) => send.climb_id === climb.id)!;
      return { ...climb, created_at: send.created_at };
    });

  const boulderSends = sends.filter((climb) => climb.type === "boulder");
  const sportSends = sends.filter((climb) => climb.type === "sport");

  const boulderGradeData = boulderSends.reduce(
    (acc, climb) => {
      const existing = acc.find((item) => item.grade === climb.grade);
      if (existing) existing.count++;
      else acc.push({ grade: climb.grade, count: 1 });
      return acc;
    },
    [] as { grade: string; count: number }[],
  );

  const sportGradeData = sportSends.reduce(
    (acc, climb) => {
      const existing = acc.find((item) => item.grade === climb.grade);
      if (existing) existing.count++;
      else acc.push({ grade: climb.grade, count: 1 });
      return acc;
    },
    [] as { grade: string; count: number }[],
  );

  // Favorites joined to their climbs for the dark card, de-duplicated by climb
  // (the favorites table can hold multiple rows for the same climb).
  const favoriteClimbs = Array.from(
    new Map(
      favorites
        .map((fav) => climbs.find((climb) => climb.id === fav.climb_id))
        .filter((climb): climb is Climb => Boolean(climb))
        .map((climb) => [climb.id, climb]),
    ).values(),
  );

  const stats = getMastheadStats(climbs, sendsForUser);
  const topCrags = getTopCrags(climbs, sendsForUser);

  // Crags the user has actually visited (sent at), not the full database.
  const cragsVisited = new Set(
    sends.map((climb) => climb.area).filter(Boolean),
  ).size;

  const username = user?.username ?? "climber";
  const role = user?.role ?? "user";
  const memberSince = user?.created_at
    ? new Date(user.created_at).getFullYear()
    : new Date().getFullYear();

  return (
    <div className="bg-chalk min-h-screen">
      <ScrollProgressBar />
      <ScrollRefresh />

      {/* HERO */}
      <AccountHero
        username={username}
        avatarUrl={user?.avatar_url ?? null}
        role={role}
        memberSince={memberSince}
        sendsCount={sends.length}
        favoritesCount={favorites.length}
        cragsVisited={cragsVisited}
        topSend={stats.topSend}
      />

      {/* TOPO DIVIDER */}
      <DrawOn className="max-w-7xl mx-auto px-4 md:px-14 text-chalk-3 opacity-60">
        <TopoLine height={32} seed={4} />
      </DrawOn>

      {/* LATEST SENDS + FAVORITES */}
      <section className="max-w-7xl mx-auto px-4 py-8 md:px-14 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] gap-[clamp(18px,2.4vw,22px)]">
          <RecentSends sends={sends} />
          <AccountFavorites climbs={favoriteClimbs} />
        </div>
      </section>

      {/* TOPO DIVIDER */}
      <DrawOn className="max-w-7xl mx-auto px-4 md:px-14 text-chalk-3 opacity-70">
        <TopoLine height={32} seed={9} />
      </DrawOn>

      {/* BY THE NUMBERS */}
      <section className="bg-chalk-2">
        <div className="mx-auto w-full max-w-7xl px-4 py-[clamp(26px,4vw,40px)] pb-[clamp(48px,7vw,72px)] md:px-14">
          <MonoChip className="mb-2 block text-ember">— BY THE NUMBERS</MonoChip>
          <h2
            className="mb-8 font-display font-bold uppercase text-granite-100"
            style={{ fontSize: "clamp(28px,3.6vw,42px)", lineHeight: 1 }}
          >
            The shape of the grind
          </h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <GradePieChart
              data={boulderGradeData}
              type="boulder"
              footnote={`${boulderSends.length} BOULDER SENDS LOGGED`}
            />
            <GradePieChart
              data={sportGradeData}
              type="sport"
              footnote={`${sportSends.length} SPORT SENDS LOGGED`}
            />
            <div className="md:col-span-2">
              <DateBarGraph sends={sends} />
            </div>
            <div className="md:col-span-2">
              <AccountTopCrags crags={topCrags} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
