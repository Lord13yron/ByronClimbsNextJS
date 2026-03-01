import Climb from "@/components/Climb";
import ClimbSignedOut from "@/components/ClimbSignedOut";
import ClimbSkeleton from "@/components/ClimbSkeleton";
import { getUser } from "@/lib/auth-actions";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ databaseId: string }>;
}) {
  const { databaseId } = await params;
  const id = databaseId.split("-")[0]; // Extract the numeric ID from the slug
  const user = await getUser();

  return (
    <Suspense fallback={<ClimbSkeleton />}>
      {user ? <Climb databaseId={id} /> : <ClimbSignedOut databaseId={id} />}
    </Suspense>
  );
}
