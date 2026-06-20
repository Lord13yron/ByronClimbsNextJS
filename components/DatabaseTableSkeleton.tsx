import { Skeleton } from "./ui/skeleton";

const s = "bg-chalk-3";

export default function DatabaseTableSkeleton() {
  return (
    <div className="px-4 md:px-14 max-w-7xl mx-auto w-full">
      {/* Controls */}
      <div className="pb-4">
        {/* Filter chips */}
        <div className="flex flex-wrap items-center gap-2 pb-3">
          <Skeleton className={`h-8 w-12 rounded-sm ${s}`} />
          <Skeleton className={`h-8 w-16 rounded-sm ${s}`} />
          <Skeleton className={`h-8 w-20 rounded-sm ${s}`} />
          <div className="w-px h-5 bg-chalk-3 mx-1 hidden sm:block" />
          <Skeleton className={`h-8 w-18 rounded-sm ${s}`} />
          <Skeleton className={`h-8 w-14 rounded-sm ${s}`} />
          <Skeleton className={`h-8 w-12 rounded-sm ${s}`} />
        </div>
        {/* Grade left · search centered (right on small) · toggle right */}
        <div className="flex items-center gap-2">
          <div className="lg:flex-1">
            <Skeleton className={`h-9 w-30 rounded-sm ${s}`} />
          </div>
          <div className="ml-auto flex flex-1 justify-end lg:ml-0 lg:justify-center">
            <Skeleton className={`h-9 w-48 sm:w-65 rounded-sm ${s}`} />
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Skeleton className={`h-9 w-24 rounded-sm ${s}`} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="border border-chalk-3 rounded-sm overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-chalk-2 border-b border-chalk-3">
              <th className="px-4 py-3 w-10">
                <Skeleton className={`h-4 w-4 rounded-sm ${s}`} />
              </th>
              <th className="px-4 py-3">
                <Skeleton className={`h-4 w-12 rounded-sm ${s}`} />
              </th>
              <th className="px-4 py-3">
                <Skeleton className={`h-4 w-16 rounded-sm ${s}`} />
              </th>
              <th className="px-4 py-3 hidden md:table-cell">
                <Skeleton className={`h-4 w-14 rounded-sm ${s}`} />
              </th>
              <th className="px-4 py-3 hidden md:table-cell">
                <Skeleton className={`h-4 w-12 rounded-sm ${s}`} />
              </th>
              <th className="px-4 py-3 hidden md:table-cell">
                <Skeleton className={`h-4 w-12 rounded-sm ${s}`} />
              </th>
              <th className="px-4 py-3">
                <Skeleton className={`h-4 w-14 rounded-sm ${s}`} />
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, i) => (
              <tr
                key={i}
                className={`border-b border-chalk-2 ${i % 2 === 0 ? "bg-chalk" : "bg-[rgba(236,231,222,0.4)]"}`}
              >
                <td className="px-4 py-4">
                  <Skeleton className={`h-4 w-4 rounded-sm ${s}`} />
                </td>
                <td className="px-4 py-4">
                  <Skeleton className={`h-5 w-12 rounded-sm ${s}`} />
                </td>
                <td className="px-4 py-4">
                  <Skeleton className={`h-5 w-40 rounded-sm ${s}`} />
                </td>
                <td className="px-4 py-4 hidden md:table-cell">
                  <Skeleton className={`h-4 w-28 rounded-sm ${s}`} />
                </td>
                <td className="px-4 py-4 hidden md:table-cell">
                  <Skeleton className={`h-4 w-20 rounded-sm ${s}`} />
                </td>
                <td className="px-4 py-4 hidden md:table-cell">
                  <Skeleton className={`h-4 w-16 rounded-sm ${s}`} />
                </td>
                <td className="px-4 py-4">
                  <Skeleton className={`h-5 w-5 rounded-sm ${s}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-6 py-3">
        <div className="flex items-center gap-2">
          <Skeleton className={`h-4 w-24 rounded-sm ${s}`} />
          <Skeleton className={`h-8 w-17 rounded-sm ${s}`} />
        </div>
        <Skeleton className={`h-4 w-20 rounded-sm ${s}`} />
        <div className="flex gap-1.5">
          <Skeleton className={`h-8 w-8 rounded-sm ${s}`} />
          <Skeleton className={`h-8 w-8 rounded-sm ${s}`} />
          <Skeleton className={`h-8 w-8 rounded-sm ${s}`} />
          <Skeleton className={`h-8 w-8 rounded-sm ${s}`} />
        </div>
      </div>
    </div>
  );
}
