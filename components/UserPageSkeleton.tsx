import { Skeleton } from "./ui/skeleton";

export default function UserPageSkeleton() {
  return (
    <div className="flex flex-col justify-center max-w-6xl items-center mx-auto p-4">
      <Skeleton className="h-4  w-40 m-1"></Skeleton>
      <Skeleton className="h-4  w-40 m-1"></Skeleton>
      <Skeleton className="h-4  w-40 m-1"></Skeleton>
      <Skeleton className="h-8  w-20 m-4"></Skeleton>
      <Skeleton className="h-100  w-full m-4"></Skeleton>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        <div>
          <Skeleton className="h-6 w-60 rounded-lg mx-auto"></Skeleton>
          <Skeleton className="h-64 w-64 rounded-full mx-auto mt-4"></Skeleton>
        </div>
        <div>
          <Skeleton className="h-6 w-60 rounded-lg mx-auto "></Skeleton>
          <Skeleton className="h-64 w-64 rounded-full mx-auto mt-4"></Skeleton>
        </div>
      </div>
    </div>
  );
}
