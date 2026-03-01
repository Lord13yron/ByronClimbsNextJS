import { Skeleton } from "./ui/skeleton";

export default function DatabaseTableSkeleton() {
  return (
    <div className=" p-2 pt-8">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <Skeleton className="h-9 w-74/100 sm:w-45/100 mb-2 rounded"></Skeleton>
        <Skeleton className="h-9 w-42/100 sm:w-24/100 mb-4 rounded"></Skeleton>
      </div>
      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full border">
          <thead>
            <tr>
              {Array.from({ length: 5 }).map((_, index) => (
                <th key={index} className="px-4 py-2 border-b  ">
                  <Skeleton className="h-5 w-20  rounded mx-auto"></Skeleton>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, rowIndex) => (
              <tr key={rowIndex} className="border-b ">
                {Array.from({ length: 5 }).map((_, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-2 border-b ">
                    <Skeleton className="h-5 w-full rounded"></Skeleton>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
