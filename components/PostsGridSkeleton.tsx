import { Skeleton } from "./ui/skeleton";

const s = "bg-chalk-3 rounded-sm";

export default function PostsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="bg-chalk-2 border border-chalk-3 rounded-sm overflow-hidden">
          <Skeleton className={`h-48 w-full rounded-none ${s}`} />
          <div className="p-4">
            <Skeleton className={`h-4 w-3/4 mb-2 ${s}`} />
            <Skeleton className={`h-3 w-1/2 mb-3 ${s}`} />
            <Skeleton className={`h-3 w-full mb-1 ${s}`} />
            <Skeleton className={`h-3 w-full mb-1 ${s}`} />
            <Skeleton className={`h-3 w-2/3 ${s}`} />
          </div>
        </div>
      ))}
    </div>
  );
}
