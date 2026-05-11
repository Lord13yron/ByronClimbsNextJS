"use client";

import { Climb } from "@/app/types/types";
import { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import GradeChip from "./ui/GradeChip";
import MonoChip from "./ui/MonoChip";

type RecentsendsProps = {
  sends: Climb[];
};

function formatSentDate(dateStr: string): string {
  const d = new Date(dateStr);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}.${mm}.${dd}`;
}

export default function RecentSends({ sends }: RecentsendsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const sendsPerPage = 10;

  const indexOfLastSend = currentPage * sendsPerPage;
  const indexOfFirstSend = indexOfLastSend - sendsPerPage;
  const currentSends = sends.slice(indexOfFirstSend, indexOfLastSend);
  const totalPages = Math.max(1, Math.ceil(sends.length / sendsPerPage));

  return (
    <div className="bg-chalk-2 border border-chalk-3 rounded-md p-4.5 md:p-6">
      {/* Header */}
      <div className="flex justify-between items-end mb-4.5 flex-wrap gap-3">
        <div>
          <h2 className="font-display uppercase text-[28px] md:text-[36px] m-0 leading-none text-granite-100">
            Recent sends.
          </h2>
        </div>
        <Link
          href="/database?filter=favorites"
          className="font-display uppercase text-xs text-granite-100 border-b border-granite-100 pb-0.5 tracking-[0.01em]"
        >
          View favorites →
        </Link>
      </div>

      {sends.length === 0 ? (
        <MonoChip className="text-slate-500 block py-4">
          No sends recorded yet.
        </MonoChip>
      ) : (
        <>
          <ul className="flex flex-col gap-2.5 m-0 p-0 list-none">
            {currentSends.map((send) => (
              <li
                key={send.id}
                className="bg-chalk border border-chalk-3 px-3.5 py-3 md:px-4.5 md:py-3.5 flex justify-between items-center gap-3"
              >
                <div className="min-w-0">
                  <h3 className="font-display uppercase text-[16px] md:text-[18px] leading-[1.1] m-0 text-granite-100 truncate">
                    {send.name}
                  </h3>
                  <MonoChip className="mt-1.5 text-slate-500 block">
                    SENT ON · {formatSentDate(send.created_at)}
                  </MonoChip>
                </div>
                <GradeChip
                  grade={
                    send.type === "boulder" ? `V${send.grade}` : send.grade
                  }
                  variant="outline"
                />
              </li>
            ))}
          </ul>

          {/* Pagination — always visible so layout is stable */}
          <div className="flex items-center justify-center gap-4 mt-5.5">
            <Button
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
              variant="secondary"
              size="sm"
            >
              Previous
            </Button>
            <MonoChip>
              PAGE {currentPage} OF {totalPages}
            </MonoChip>
            <Button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages}
              size="sm"
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
