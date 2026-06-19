"use client";

import { Climb } from "@/app/types/types";
import { useState } from "react";
import { Button } from "./ui/button";
import GradeChip from "./ui/GradeChip";
import MonoChip from "./ui/MonoChip";
import Reveal from "./anim/Reveal";

type AccountFavoritesProps = {
  climbs: Climb[];
};

export default function AccountFavorites({ climbs }: AccountFavoritesProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const favoritesPerPage = 10;

  const indexOfLast = currentPage * favoritesPerPage;
  const indexOfFirst = indexOfLast - favoritesPerPage;
  const currentFavorites = climbs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.max(1, Math.ceil(climbs.length / favoritesPerPage));

  return (
    <div className="relative overflow-hidden rounded-md bg-granite-100 p-[clamp(18px,2.4vw,26px)]">
      {/* Faint ember radial, top-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(200,84,30,0.16), transparent 60%)",
        }}
      />

      <div className="relative">
        {/* Header */}
        <div className="mb-4.5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <MonoChip className="mb-1.5 block text-ember-soft">
              — STARRED
            </MonoChip>
            <h2 className="m-0 font-display text-[clamp(26px,3.2vw,38px)] uppercase leading-none text-chalk">
              Favorites
            </h2>
          </div>
          <MonoChip className="text-[rgba(244,241,236,0.5)]">
            {climbs.length} SAVED
          </MonoChip>
        </div>

        {climbs.length === 0 ? (
          <MonoChip className="block py-4 text-[rgba(244,241,236,0.5)]">
            No favorites starred yet.
          </MonoChip>
        ) : (
          <>
            <Reveal x={16} stagger={0.06} duration={0.5} selector="li">
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                {currentFavorites.map((c) => {
                  const meta = [c.area, c.city].filter(Boolean).join(" · ");
                  return (
                    <li
                      key={c.id}
                      className="flex items-center justify-between gap-3 rounded-sm border border-transparent px-3.5 py-3 transition-all hover:translate-x-0.75 hover:border-ember"
                      style={{ background: "rgba(244,241,236,0.05)" }}
                    >
                      <div className="min-w-0">
                        <h3 className="m-0 truncate font-display text-[16px] uppercase leading-[1.1] text-chalk md:text-[18px]">
                          {c.name}
                        </h3>
                        {meta && (
                          <MonoChip className="mt-1.5 block text-[rgba(244,241,236,0.5)]">
                            {meta}
                          </MonoChip>
                        )}
                      </div>
                      <GradeChip
                        grade={c.type === "boulder" ? `V${c.grade}` : c.grade}
                        variant="outline"
                        className="shrink-0 border-ember-soft/50 bg-transparent text-ember-soft"
                      />
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            {/* Pagination — always visible so layout is stable */}
            <div className="mt-5.5 flex items-center justify-center gap-4">
              <Button
                onClick={() => setCurrentPage((p) => p - 1)}
                disabled={currentPage === 1}
                variant="secondary"
                size="sm"
              >
                Previous
              </Button>
              <MonoChip className="text-[rgba(244,241,236,0.7)]">
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
    </div>
  );
}
