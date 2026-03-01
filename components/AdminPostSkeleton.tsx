import { Skeleton } from "./ui/skeleton";

export default function AdminPostSkeleton() {
  return (
    <div className="flex flex-col min-h-screen max-w-6xl w-full items-center p-4">
      <Skeleton className="w-1/2 h-8 mb-4" />
      <div className="flex flex-col gap-4 w-full pr-4">
        <Skeleton className="w-1/4 h-6" />
        <Skeleton className="w-full h-6" />
        <Skeleton className="w-1/4 h-6" />
        <Skeleton className="w-full h-48" />

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
