import { Skeleton } from "./ui/skeleton";

export default function AdminsidebarSkeleton() {
  return (
    <div className="w-60 h-120 p-4 m-2 rounded-lg bg-chalk-2 border border-chalk-3 hidden md:flex flex-col justify-between">
      <div>
        <Skeleton className="h-8 rounded-sm w-3/4 mb-6" />
        <Skeleton className="h-4 rounded-sm w-1/3 mb-4" />
        <Skeleton className="h-5 rounded-sm w-full mb-2" />
        <Skeleton className="h-5 rounded-sm w-full mb-2" />
        <Skeleton className="h-5 rounded-sm w-full mb-2" />
        <Skeleton className="h-5 rounded-sm w-full mb-2" />
      </div>
      <Skeleton className="h-5 rounded-sm w-full" />
    </div>
  );
}
