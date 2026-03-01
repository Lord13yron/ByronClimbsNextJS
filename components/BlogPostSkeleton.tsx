import { Skeleton } from "./ui/skeleton";

export default function BlogPostSkeleton() {
  return (
    <div className="w-full flex flex-col justify-center items-center max-w-6xl mx-auto p-2">
      <Skeleton className="h-8 w-3/4 mt-8 mb-2" />
      <Skeleton className="h-4 w-1/4 mb-2" />
      <Skeleton className="w-[80%] h-48 sm:h-54 md:h-75 lg:h-105 xl:h-135 mb-8" />
      <Skeleton className="h-4 w-full m-1 p-1" />
      <Skeleton className="h-4 w-full m-1 p-1" />
      <Skeleton className="h-4 w-full m-1 p-1" />
      <Skeleton className="h-4 w-full m-1 p-1" />
      <Skeleton className="h-4 w-full m-1 p-1" />
      <Skeleton className="w-[80%] h-48 sm:h-54 md:h-75 lg:h-105 xl:h-135 mt-4" />
    </div>
  );
}
