import { Skeleton } from "./ui/skeleton";

const s = "bg-chalk-3 rounded-sm";

export default function AdminClimbSkeleton() {
  return (
    <div className="bg-chalk min-h-screen p-6 md:p-10">
      <div className="max-w-5xl mx-auto">

        <div className="mb-6">
          <Skeleton className={`w-28 h-4 mb-3 ${s}`} />
          <Skeleton className={`w-64 h-14 mb-3 ${s}`} />
          <Skeleton className={`w-56 h-4 ${s}`} />
        </div>

        <Skeleton className={`w-full h-9 opacity-30 ${s}`} />

        <div className="mt-8 bg-chalk-2 border border-chalk-3 rounded-sm p-8">
          <Skeleton className={`w-28 h-4 mb-3 ${s}`} />
          <Skeleton className={`w-52 h-8 mb-6 ${s}`} />

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <Skeleton className={`w-12 h-3 ${s}`} />
              <Skeleton className={`w-full h-9 ${s}`} />
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col gap-1.5">
                <Skeleton className={`w-10 h-3 ${s}`} />
                <Skeleton className={`w-45 h-9 ${s}`} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Skeleton className={`w-12 h-3 ${s}`} />
                <Skeleton className={`w-45 h-9 ${s}`} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <Skeleton className={`w-10 h-3 ${s}`} />
                <Skeleton className={`w-full h-9 ${s}`} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Skeleton className={`w-10 h-3 ${s}`} />
                <Skeleton className={`w-full h-9 ${s}`} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Skeleton className={`w-16 h-3 ${s}`} />
                <Skeleton className={`w-full h-9 ${s}`} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Skeleton className={`w-32 h-9 ${s}`} />
        </div>

        <div className="mt-4 bg-chalk-2 border border-chalk-3 rounded-sm p-8">
          <Skeleton className={`w-20 h-4 mb-3 ${s}`} />
          <Skeleton className={`w-44 h-8 mb-6 ${s}`} />
          <div className="flex flex-col gap-4">
            <Skeleton className={`w-full h-24 ${s}`} />
            <Skeleton className={`w-full h-16 ${s}`} />
          </div>
        </div>

      </div>
    </div>
  );
}
