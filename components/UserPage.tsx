import { getUser, signOutUser } from "@/lib/auth-actions";
import Link from "next/link";
import { Button } from "./ui/button";
import RecentSends from "./RecentSends";
import { getClimbs, getSendsForUser } from "@/lib/data-service";
import GradePieChart from "./GradePieChart";
import DateBarGraph from "./DateBarGraph";

export default async function UserPage() {
  const user = await getUser();
  const sendsForUser = await getSendsForUser();
  const climbs = await getClimbs();

  const sends = climbs
    .filter((climb) => sendsForUser.some((send) => send.climb_id === climb.id))
    .map((climb) => {
      const send = sendsForUser.find((send) => send.climb_id === climb.id)!;
      return {
        ...climb,
        created_at: send.created_at,
      };
    });

  const boulderSends = sends.filter((climb) => climb.type === "boulder");
  const sportSends = sends.filter((climb) => climb.type === "sport");

  const sportGradeData = sportSends.reduce(
    (acc, climb) => {
      const existingGrade = acc.find((item) => item.grade === climb.grade);
      if (existingGrade) {
        existingGrade.count++;
      } else {
        acc.push({ grade: climb.grade, count: 1 });
      }
      return acc;
    },
    [] as { grade: string; count: number }[],
  );

  const boulderGradeData = boulderSends.reduce(
    (acc, climb) => {
      const existingGrade = acc.find((item) => item.grade === climb.grade);
      if (existingGrade) {
        existingGrade.count++;
      } else {
        acc.push({ grade: climb.grade, count: 1 });
      }
      return acc;
    },
    [] as { grade: string; count: number }[],
  );

  return (
    <div className="flex flex-col justify-center max-w-6xl items-center mx-auto p-4">
      <div className="flex flex-col">
        <p>Welcome, {user?.username}!</p>
        {user?.role === "admin" && (
          <>
            <p className="text-sm text-gray-500">You have admin privileges.</p>
            <Link href="/admin" className="text-blue-500 underline">
              Go to Admin Dashboard
            </Link>
          </>
        )}
      </div>
      <div className="mt-4">
        <form action={signOutUser}>
          <Button type="submit">Sign Out</Button>
        </form>
      </div>
      <RecentSends sends={sends} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        <GradePieChart data={boulderGradeData} type="boulder" />
        <GradePieChart data={sportGradeData} type="sport" />
        <DateBarGraph sends={sends} />
      </div>
    </div>
  );
}
