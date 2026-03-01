import { Skeleton } from "./ui/skeleton";

export default function AdminClimbSkeleton() {
  return (
    <div className="flex flex-col min-h-screen max-w-6xl w-full p-4 items-center mx-auto">
      <Skeleton className="w-1/2 h-8 mb-4" />
      <div className="flex flex-col gap-4 w-full pr-4">
        <Skeleton className="w-1/4 h-6" />
        <Skeleton className="w-full h-6" />
        <div className="flex gap-4 w-full">
          <div className="flex flex-col gap-2">
            <Skeleton className="w-20 h-6" />
            <Skeleton className="w-45 h-6" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="w-20 h-6" />
            <Skeleton className="w-30 h-6" />
          </div>
        </div>
        <Skeleton className="w-1/4 h-6" />
        <Skeleton className="w-full h-6" />
        <Skeleton className="w-1/4 h-6" />
        <Skeleton className="w-full h-6" />
        <Skeleton className="w-1/4 h-6" />
        <Skeleton className="w-full h-6" />
        <Skeleton className="w-full h-6" />
        <div className="flex justify-between">
          <Skeleton className="w-1/2 h-6" />
          <Skeleton className="w-1/20 h-6" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="w-1/2 h-6" />
          <Skeleton className="w-1/20 h-6" />
        </div>
      </div>
    </div>
  );
}
