"use client";

import { Climb } from "@/app/types/types";
import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import GradeChip from "./ui/GradeChip";
import MonoChip from "./ui/MonoChip";
import Reveal from "./anim/Reveal";

type RecentsendsProps = {
  sends: Climb[];
};

export default function RecentSends({ sends }: RecentsendsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const sendsPerPage = 10;

  const indexOfLastSend = currentPage * sendsPerPage;
  const indexOfFirstSend = indexOfLastSend - sendsPerPage;
  const currentSends = sends.slice(indexOfFirstSend, indexOfLastSend);
  const totalPages = Math.max(1, Math.ceil(sends.length / sendsPerPage));

  return (
    <div className="bg-chalk-2 border border-chalk-3 rounded-md p-[clamp(18px,2.4vw,26px)]">
      {/* Header */}
      <div className="flex justify-between items-end mb-4.5 flex-wrap gap-3">
        <div>
          <MonoChip className="text-ember mb-1.5 block">— THE LOGBOOK</MonoChip>
          <h2 className="font-display uppercase text-[clamp(26px,3.2vw,38px)] m-0 leading-none text-granite-100">
            Latest sends
          </h2>
        </div>
        <Link
          href="/database"
          className="font-display uppercase text-xs text-granite-100 border-b border-granite-100 pb-0.5 tracking-[0.01em] transition-colors hover:text-ember hover:border-ember"
        >
          View all →
        </Link>
      </div>

      {sends.length === 0 ? (
        <MonoChip className="text-slate-500 block py-4">
          No sends recorded yet.
        </MonoChip>
      ) : (
        <>
          <Reveal
            y={18}
            stagger={0.06}
            duration={0.5}
            selector="li"
            start="top 95%"
          >
            <ul className="flex flex-col gap-2.5 m-0 p-0 list-none">
            {currentSends.map((send) => {
              const sector = [send.area, send.subArea]
                .filter(Boolean)
                .join(" · ");
              return (
                <li
                  key={send.id}
                  className="bg-chalk border border-chalk-3 px-3.5 py-3 md:px-4.5 md:py-3.5 flex justify-between items-center gap-3 transition-colors hover:bg-chalk-2 hover:border-ember"
                >
                  <div className="min-w-0">
                    <h3 className="font-display uppercase text-[16px] md:text-[18px] leading-[1.1] m-0 text-granite-100 truncate">
                      {send.name}
                    </h3>
                    {sector && (
                      <MonoChip className="mt-1.5 text-slate-500 block">
                        {sector}
                      </MonoChip>
                    )}
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="inline-flex items-center gap-1 text-ember">
                      <Check className="h-3.5 w-3.5" />
                      <MonoChip className="text-ember">SENT</MonoChip>
                    </span>
                    <GradeChip
                      grade={
                        send.type === "boulder" ? `V${send.grade}` : send.grade
                      }
                      variant="ember"
                    />
                  </div>
                </li>
              );
            })}
            </ul>
          </Reveal>

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
