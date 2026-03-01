import { Skeleton } from "./ui/skeleton";

export default function PostsGridSkeleton() {
  return (
    <div className="min-h-screen grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="w-full ">
          <Skeleton className="h-64 w-full mt-4 mx-auto" />
          <Skeleton className="h-8 w-3/4 mt-2 mx-auto" />
          <Skeleton className="h-4 w-1/2 mt-2 mx-auto" />
          <Skeleton className="h-4 w-full mt-2 mx-auto" />
          <Skeleton className="h-4 w-full mt-2 mx-auto" />
          <Skeleton className="h-4 w-full mt-2 mx-auto" />
          <Skeleton className="h-4 w-full mt-2 mx-auto" />
          <Skeleton className="h-4 w-1/2 mt-2 mx-auto" />
        </div>
      ))}
    </div>
  );
}
