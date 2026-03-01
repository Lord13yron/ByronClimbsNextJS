import AdminClimb from "@/components/AdminClimb";
import AdminClimbSkeleton from "@/components/AdminClimbSkeleton";

import { Suspense } from "react";

export default async function AdminEditClimbPage({
  params,
}: {
  params: Promise<{ climbId: string }>;
}) {
  const { climbId } = await params;
  const id = climbId.split("-")[0]; // Extract the ID from the URL parameter
  return (
    <Suspense fallback={<AdminClimbSkeleton />}>
      <AdminClimb climbId={id} />
    </Suspense>
  );
}
