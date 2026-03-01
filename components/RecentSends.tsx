// import { Climb } from "@/app/types/types";

// type RecentsendsProps = {
//   sends: Climb[];
// };

// export default function RecentSends({ sends }: RecentsendsProps) {
//   console.log("RecentSends component received sends:", sends.slice(0, 5)); // Log the sends data received by the component
//   return (
//     <div className="mt-8 w-full max-w-6xl">
//       <h2 className="text-xl font-semibold mb-4">Recent Sends</h2>
//       {sends.length === 0 ? (
//         <p className="text-gray-500">No recent sends found.</p>
//       ) : (
//         <ul className="space-y-4">
//           {sends.map((send) => (
//             <li key={send.id} className="p-4 border rounded-lg">
//               <h3 className="text-lg font-medium">
//                 {send.name} -{" "}
//                 {send.type === "boulder" ? `V${send.grade}` : `${send.grade}`}
//               </h3>
//               <p className="text-sm text-gray-500">
//                 Sent on: {new Date(send.created_at).toLocaleDateString()}
//               </p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

"use client";

import { Climb } from "@/app/types/types";
import { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

type RecentsendsProps = {
  sends: Climb[];
};

export default function RecentSends({ sends }: RecentsendsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const sendsPerPage = 10;

  // Calculate pagination
  const indexOfLastSend = currentPage * sendsPerPage;
  const indexOfFirstSend = indexOfLastSend - sendsPerPage;
  const currentSends = sends.slice(indexOfFirstSend, indexOfLastSend);
  const totalPages = Math.ceil(sends.length / sendsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="mt-8 w-full  bg-secondary p-4 rounded-lg shadow-xl">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-4">Recent Sends</h2>
        <Link href="/database?filter=favorites" className="hover:underline">
          View Favorites
        </Link>
      </div>
      {sends.length === 0 ? (
        <p className="">No recent sends found.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {currentSends.map((send) => (
              <li key={send.id} className="p-2 border rounded-lg bg-background">
                <div className="flex justify-between">
                  <Link
                    href={`/database/${send.id}-${send.slug}`}
                    className="hover:underline"
                  >
                    <h3 className="font-medium">{send.name}</h3>
                  </Link>
                  <h3 className="border rounded bg-primary-foreground px-1">
                    {" "}
                    {send.type === "boulder"
                      ? `V${send.grade}`
                      : `${send.grade}`}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Sent on: {new Date(send.created_at).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-6">
              {/* <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                Previous
              </button> */}
              <Button onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous
              </Button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              {/* <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                Next
              </button> */}
              <Button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
