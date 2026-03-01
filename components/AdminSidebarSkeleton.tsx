import { Skeleton } from "./ui/skeleton";

export default function AdminsidebarSkeleton() {
  return (
    <div className="w-60 h-120 p-4 m-2 rounded-lg bg-sidebar border hidden md:flex flex-col justify-between">
      <div>
        <Skeleton className="h-6  rounded w-3/4 mb-8"></Skeleton>
        <Skeleton className="h-6  rounded w-full mb-2"></Skeleton>
        <Skeleton className="h-6  rounded w-full mb-2"></Skeleton>
        <Skeleton className="h-6  rounded w-full mb-2"></Skeleton>
        <Skeleton className="h-6 rounded w-full mb-2"></Skeleton>
        <Skeleton className="h-6  rounded w-full mb-2"></Skeleton>
      </div>
      <Skeleton className="h-6  rounded w-full"></Skeleton>
    </div>
  );
}
