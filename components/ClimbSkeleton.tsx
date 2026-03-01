import { Skeleton } from "./ui/skeleton";

export default function ClimbSkeleton() {
  return (
    <div className="w-full flex flex-col justify-center items-center max-w-6xl mx-auto">
      <Skeleton className="h-10 w-1/2 mt-12 mb-2" />
      <Skeleton className="h-8 w-1/20 mb-2" />
      <Skeleton className="h-4 w-7/20" />
      <Skeleton className="w-[80%] h-48 sm:h-54 md:h-75 lg:h-105 xl:h-135 m-8" />
      <Skeleton className="w-[80%] h-48 sm:h-54 md:h-75 lg:h-105 xl:h-135" />
      <Skeleton className="w-[95%] max-w-3xl h-30 m-8 rounded-lg " />
    </div>
  );
}
