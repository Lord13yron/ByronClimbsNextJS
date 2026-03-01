import Climb from "@/components/Climb";
import ClimbSkeleton from "@/components/ClimbSkeleton";
import { Suspense } from "react";

export default async function AdminClimbPage({
  params,
}: {
  params: Promise<{ climbId: string }>;
}) {
  const { climbId } = await params;
  const id = climbId.split("-")[0]; // Extract the ID from the URL parameter
  return (
    <Suspense fallback={<ClimbSkeleton />}>
      <Climb databaseId={id} isAdmin />
    </Suspense>
    // <div className="container mx-auto py-6 max-w-6xl">
    //   <h1 className="text-2xl font-bold mb-4">Admin Climb Page</h1>
    //   <p>This is the admin page for a specific climb. {climbId}</p>
    // </div>
  );
}
