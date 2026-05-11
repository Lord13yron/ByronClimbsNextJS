import { Skeleton } from "./ui/skeleton";

const s = "bg-chalk-3";

export default function UserPageSkeleton() {
  return (
    <div className="bg-chalk min-h-screen">
      {/* MASTHEAD */}
      <section className="max-w-7xl mx-auto px-4 py-10 md:px-14 md:py-16">
        {/* — ACCOUNT kicker */}
        <Skeleton className={`h-2.5 w-20 rounded-sm mb-4 ${s}`} />

        <div className="flex justify-between items-end gap-6 flex-wrap">
          <div>
            {/* h1 "Welcome," line */}
            <Skeleton className={`h-14 w-52 md:h-27 md:w-105 rounded-sm ${s}`} />
            {/* h1 "byron." line — shorter */}
            <Skeleton className={`h-14 w-40 md:h-27 md:w-72 rounded-sm mt-1 ${s}`} />
            {/* Admin: mono caption + link */}
            <Skeleton className={`h-2.5 w-44 rounded-sm mt-5 ${s}`} />
            <Skeleton className={`h-3 w-36 rounded-sm mt-2 ${s}`} />
          </div>
          {/* Sign Out button */}
          <Skeleton className={`h-9 w-24 rounded-sm ${s}`} />
        </div>
      </section>

      {/* TOPO DIVIDER */}
      <div className="max-w-7xl mx-auto px-4 md:px-14 opacity-50">
        <Skeleton className={`h-8 w-full rounded-none ${s}`} />
      </div>

      {/* RECENT SENDS */}
      <section className="max-w-7xl mx-auto px-4 py-8 md:px-14 md:py-12">
        <div className="bg-chalk-2 border border-chalk-3 rounded-md p-4.5 md:p-6">
          {/* Header row */}
          <div className="flex justify-between items-end mb-4.5 flex-wrap gap-3">
            <Skeleton className={`h-9 w-44 rounded-sm ${s}`} />
            <Skeleton className={`h-3 w-24 rounded-sm ${s}`} />
          </div>

          {/* Send rows */}
          <ul className="flex flex-col gap-2.5 m-0 p-0 list-none">
            {Array.from({ length: 6 }).map((_, i) => (
              <li
                key={i}
                className="bg-chalk border border-chalk-3 px-3.5 py-3 md:px-4.5 md:py-3.5 flex justify-between items-center gap-3"
              >
                <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                  {/* Climb name — vary widths to look natural */}
                  <Skeleton
                    className={`h-4 rounded-sm ${s}`}
                    style={{ width: `${55 + (i % 3) * 15}%` }}
                  />
                  {/* SENT ON · date */}
                  <Skeleton className={`h-2.5 w-32 rounded-sm ${s}`} />
                </div>
                {/* Grade chip */}
                <Skeleton className={`h-6 w-11 rounded-sm shrink-0 ${s}`} />
              </li>
            ))}
          </ul>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-4 mt-5.5">
            <Skeleton className={`h-8 w-20 rounded-sm ${s}`} />
            <Skeleton className={`h-2.5 w-24 rounded-sm ${s}`} />
            <Skeleton className={`h-8 w-14 rounded-sm ${s}`} />
          </div>
        </div>
      </section>

      {/* CHARTS */}
      <section className="max-w-7xl mx-auto px-4 pb-16 md:px-14 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Two pie chart cards */}
          {[0, 1].map((i) => (
            <div key={i} className="bg-chalk border border-chalk-3 rounded-md p-5.5">
              {/* Card header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col gap-1.5">
                  <Skeleton className={`h-2.5 w-16 rounded-sm ${s}`} />
                  <Skeleton className={`h-5 w-40 rounded-sm ${s}`} />
                </div>
                <Skeleton className={`h-5 w-4 rounded-sm ${s}`} />
              </div>
              {/* Donut + legend */}
              <div className="flex items-center gap-6 flex-wrap">
                <Skeleton className={`w-50 h-50 rounded-full shrink-0 ${s}`} />
                <div className="flex-1 flex flex-col gap-2.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div key={j} className="flex justify-between items-center gap-2.5">
                      <div className="flex items-center gap-2.5">
                        <Skeleton className={`w-3 h-3 rounded-[1px] ${s}`} />
                        <Skeleton
                          className={`h-3 rounded-sm ${s}`}
                          style={{ width: `${40 + (j % 3) * 12}px` }}
                        />
                      </div>
                      <Skeleton className={`h-2.5 w-5 rounded-sm ${s}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Date bar graph — full width */}
          <div className="bg-chalk border border-chalk-3 rounded-md p-5.5 md:col-span-2">
            {/* Header */}
            <div className="flex justify-between items-end mb-5 flex-wrap gap-3">
              <div className="flex flex-col gap-1.5">
                <Skeleton className={`h-2.5 w-16 rounded-sm ${s}`} />
                <Skeleton className={`h-5 w-36 rounded-sm ${s}`} />
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className={`h-2.5 w-28 rounded-sm ${s}`} />
                <Skeleton className={`h-8 w-24 rounded-sm ${s}`} />
              </div>
            </div>
            {/* Bar chart — 12 bars at varied heights */}
            <div
              className="flex items-end gap-1.5 md:gap-3 border-b border-chalk-3"
              style={{ height: 180, paddingBottom: 28 }}
            >
              {[30, 0, 50, 70, 100, 80, 45, 20, 0, 0, 20, 60].map((h, i) => (
                <div key={i} className="flex-1 flex items-end h-full">
                  {h > 0 && (
                    <Skeleton
                      className={`w-full rounded-sm ${s}`}
                      style={{ height: `${h}%` }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
