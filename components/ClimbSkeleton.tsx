import { Skeleton } from "./ui/skeleton";

const s = "bg-chalk-3";

export default function ClimbSkeleton() {
  return (
    <div className="bg-background">
      {/* Title block */}
      <section className="px-4 md:px-14 py-6 md:py-8 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-end gap-6">
          <div>
            {/* Grade chip + type glyph */}
            <div className="flex items-center gap-3.5 mb-3.5">
              <Skeleton className={`h-6 w-10 rounded-sm ${s}`} />
              <Skeleton className={`h-4 w-20 rounded-sm ${s}`} />
            </div>
            {/* Big name */}
            <Skeleton className={`h-16 w-72 sm:w-120 rounded-sm ${s}`} />
            {/* Coord strip */}
            <div className="flex gap-4 mt-4">
              <div className="flex flex-col gap-1">
                <Skeleton className={`h-2.5 w-8 rounded-sm ${s}`} />
                <Skeleton className={`h-3.5 w-20 rounded-sm ${s}`} />
              </div>
              <div className="flex flex-col gap-1">
                <Skeleton className={`h-2.5 w-8 rounded-sm ${s}`} />
                <Skeleton className={`h-3.5 w-24 rounded-sm ${s}`} />
              </div>
              <div className="flex flex-col gap-1">
                <Skeleton className={`h-2.5 w-12 rounded-sm ${s}`} />
                <Skeleton className={`h-3.5 w-20 rounded-sm ${s}`} />
              </div>
            </div>
          </div>
          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <Skeleton className={`h-10 w-28 rounded-sm ${s}`} />
            <Skeleton className={`h-10 w-20 rounded-sm ${s}`} />
          </div>
        </div>
      </section>

      {/* Hero image + session stats */}
      <section className="px-4 md:px-14 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-6">
          <Skeleton className={`rounded-sm ${s}`} style={{ height: 460 }} />
          <div className="bg-granite-200 p-6 rounded-sm">
            <Skeleton className={`h-3 w-24 rounded-sm mb-5 bg-granite-100/20`} />
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[rgba(244,241,236,0.15)]">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <Skeleton className="h-2.5 w-10 rounded-sm bg-granite-100/20" />
                  <Skeleton className="h-6 w-16 rounded-sm bg-granite-100/20" />
                </div>
              ))}
            </div>
            <div className="pt-4 flex flex-col gap-2">
              <Skeleton className="h-3 w-full rounded-sm bg-granite-100/20" />
              <Skeleton className="h-3 w-4/5 rounded-sm bg-granite-100/20" />
              <Skeleton className="h-3 w-3/5 rounded-sm bg-granite-100/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Notes + related */}
      <section className="px-4 md:px-14 max-w-7xl mx-auto mt-12 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10 md:gap-12">
          <div className="flex flex-col gap-3">
            <Skeleton className={`h-3 w-16 rounded-sm ${s}`} />
            <Skeleton className={`h-4 w-full rounded-sm ${s}`} />
            <Skeleton className={`h-4 w-5/6 rounded-sm ${s}`} />
            <Skeleton className={`h-4 w-4/6 rounded-sm ${s}`} />
          </div>
          <div className="flex flex-col gap-4">
            <Skeleton className={`h-3 w-28 rounded-sm ${s}`} />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 py-1">
                <Skeleton className={`h-6 w-10 rounded-sm ${s}`} />
                <div className="flex flex-col gap-1 flex-1">
                  <Skeleton className={`h-4 w-32 rounded-sm ${s}`} />
                  <Skeleton className={`h-3 w-20 rounded-sm ${s}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
