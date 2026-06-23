import AboutHero from "@/components/about/AboutHero";
import PitchTimeline from "@/components/about/PitchTimeline";
import StatsBand from "@/components/about/StatsBand";
import HomeCrags from "@/components/about/HomeCrags";
import DisciplineCompare from "@/components/about/DisciplineCompare";
import ConnectCTA from "@/components/about/ConnectCTA";
import { getClimbs, getOwnerSends } from "@/lib/data-service";
import { getMastheadStats, getTopCrags } from "@/lib/database-stats";
import type { CragCount } from "@/lib/database-stats";

export const metadata = {
  title: "About Byron",
  description:
    "Discover the climbing journey of Byron, a passionate climber who started at 38. Learn about his experiences, favorite crags in Kelowna, and his transition from bouldering to sport climbing.",
};

const FIRST_YEAR = 2019;

export default async function AboutPage() {
  const yearsOnRock = new Date().getFullYear() - FIRST_YEAR;

  let stats = { routes: 0, sends: 0, crags: 0, topSend: "—" };
  let crags: CragCount[] = [];
  try {
    const [climbs, ownerSends] = await Promise.all([
      getClimbs(),
      getOwnerSends(),
    ]);
    stats = getMastheadStats(climbs, ownerSends);
    crags = getTopCrags(climbs, ownerSends, 5);
  } catch {
    // Fall back to zeros / empty chips — the page still renders.
  }

  return (
    <div className="bg-chalk">
      <AboutHero />
      <PitchTimeline routes={stats.routes} />
      <StatsBand
        yearsOnRock={yearsOnRock}
        routes={stats.routes}
        sends={stats.sends}
        crags={stats.crags}
      />
      <HomeCrags crags={crags} />
      <DisciplineCompare />
      <ConnectCTA />
    </div>
  );
}
