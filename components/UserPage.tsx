import { getUser, signOutUser } from "@/lib/auth-actions";
import Link from "next/link";
import { Button } from "./ui/button";
import RecentSends from "./RecentSends";
import { getClimbs, getSendsForUser } from "@/lib/data-service";
import GradePieChart from "./GradePieChart";
import DateBarGraph from "./DateBarGraph";
import TopoLine from "./ui/TopoLine";
import MonoChip from "./ui/MonoChip";
import UsernameEditor from "./UsernameEditor";

export default async function UserPage() {
  const user = await getUser();
  const sendsForUser = await getSendsForUser();
  const climbs = await getClimbs();

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

  const username = user?.username ?? "climber";

  return (
    <div className="bg-chalk min-h-screen">
      {/* MASTHEAD */}
      <section className="max-w-7xl mx-auto px-4 py-10 md:px-14 md:py-16">
        <MonoChip className="text-ember mb-3 block">— ACCOUNT</MonoChip>
        <div className="flex justify-between items-end gap-6 flex-wrap">
          <div>
            <h1 className="font-display uppercase text-[56px] md:text-[108px] text-granite-100 m-0 leading-[0.92] tracking-[0.01em]">
              Welcome,
            </h1>
            <UsernameEditor username={username} />
            {user?.role === "admin" && (
              <>
                <MonoChip className="mt-4 text-slate-500 block">
                  YOU HAVE ADMIN PRIVILEGES.
                </MonoChip>
                <Link
                  href="/admin"
                  className="font-display uppercase text-[13px] text-ember border-b border-ember pb-0.5 mt-2.5 inline-block tracking-[0.01em]"
                >
                  Go to admin dashboard →
                </Link>
              </>
            )}
          </div>
          <form action={signOutUser}>
            <Button type="submit" variant="default">
              Sign Out
            </Button>
          </form>
        </div>
      </section>

      {/* TOPO DIVIDER */}
      <div className="max-w-7xl mx-auto px-4 md:px-14 text-chalk-3 opacity-60">
        <TopoLine height={32} seed={4} />
      </div>

      {/* RECENT SENDS */}
      <section className="max-w-7xl mx-auto px-4 py-8 md:px-14 md:py-12">
        <RecentSends sends={sends} />
      </section>

      {/* CHARTS */}
      <section className="max-w-7xl mx-auto px-4 pb-16 md:px-14 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <GradePieChart data={boulderGradeData} type="boulder" />
          <GradePieChart data={sportGradeData} type="sport" />
          <div className="md:col-span-2">
            <DateBarGraph sends={sends} />
          </div>
        </div>
      </section>
    </div>
  );
}
