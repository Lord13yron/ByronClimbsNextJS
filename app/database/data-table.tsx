"use client";

import {
  ColumnDef,
  SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { Climb, Favorite, Send } from "../types/types";
import { cn } from "@/lib/utils";
import MonoChip from "@/components/ui/MonoChip";
import TypeGlyph from "@/components/ui/TypeGlyph";
import FavoriteIcon from "@/components/FavoriteIcon";
import TickBox from "@/components/TickBox";

const PAGE_SIZES = [12, 24, 48, 96] as const;
const DEFAULT_SORT: SortingState = [{ id: "grade", desc: true }];

// Mirrors the prototype's .db-lgrid: GRADE · ROUTE · AREA · CITY · TYPE · STATUS.
// Below md the AREA/CITY/TYPE columns drop and the route gets a mono sub-line.
const ROW_GRID =
  "grid items-center gap-3.5 px-4 grid-cols-[52px_minmax(0,1fr)_76px] " +
  "md:gap-[18px] md:grid-cols-[72px_minmax(0,1.5fr)_minmax(0,1.05fr)_92px_104px_76px]";

interface DataTableProps {
  columns: ColumnDef<Climb>[];
  data: Climb[];
  sends: Send[];
  favorites: Favorite[];
}

export function DataTable({ columns, data, sends, favorites }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>(DEFAULT_SORT);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
    initialState: { pagination: { pageSize: 12 } },
  });

  return (
    <div>
      <div className="overflow-hidden rounded-sm border border-chalk-3">
        {/* Header */}
        <div className={cn(ROW_GRID, "border-b border-chalk-3 bg-chalk-2 py-3")}>
          <SortButton column={table.getColumn("grade")} label="Grade" />
          <SortButton column={table.getColumn("name")} label="Route" />
          <ColLabel className="hidden md:block">Area</ColLabel>
          <ColLabel className="hidden md:block">City</ColLabel>
          <ColLabel className="hidden md:block">Type</ColLabel>
          <ColLabel className="justify-self-end text-right">Status</ColLabel>
        </div>

        {/* Rows */}
        {table.getRowModel().rows.map((row) => {
          const c = row.original;
          const isSent = sends.some((s) => s.climb_id === c.id);
          return (
            <div
              key={c.id}
              className={cn(
                ROW_GRID,
                "border-b border-chalk-2 py-2.5 transition-colors hover:bg-chalk-2",
              )}
            >
              {/* Grade block */}
              <span
                className={cn(
                  "rounded-sm py-0.75 text-center font-display text-[14px] font-bold tracking-[0.05em] text-chalk",
                  isSent ? "bg-ember" : "bg-granite-100",
                )}
              >
                {c.type === "boulder" ? `V${c.grade}` : c.grade}
              </span>

              {/* Route */}
              <span className="min-w-0">
                <Link
                  href={`/database/${c.id}-${c.slug}`}
                  className="block truncate font-display text-[17px] uppercase leading-[1.08] text-granite-100 transition-colors hover:text-ember"
                >
                  {c.name}
                </Link>
                <MonoChip className="mt-1 block truncate md:hidden">
                  {c.area}
                  {c.subArea ? ` · ${c.subArea}` : ""}
                </MonoChip>
              </span>

              {/* Area */}
              <span className="hidden min-w-0 md:block">
                <span className="block truncate font-display text-[14px] uppercase leading-none tracking-[0.02em] text-granite-100">
                  {c.area}
                </span>
                {c.subArea && (
                  <MonoChip className="mt-1 block truncate">
                    {c.subArea}
                  </MonoChip>
                )}
              </span>

              {/* City */}
              <MonoChip className="hidden truncate text-slate-700 md:block">
                {c.city}
              </MonoChip>

              {/* Type */}
              <span className="hidden min-w-0 items-center gap-1.5 text-slate-700 md:flex">
                <TypeGlyph type={c.type} size={13} />
                <MonoChip className="truncate text-slate-700">{c.type}</MonoChip>
              </span>

              {/* Status */}
              <span className="flex items-center justify-end gap-2.5">
                <FavoriteIcon climbId={c.id} favorites={favorites} size={4} />
                <TickBox climbId={c.id} sends={sends} size={4} />
              </span>
            </div>
          );
        })}
      </div>

      <Pagination table={table} dataLength={data.length} />
    </div>
  );
}

function SortButton({
  column,
  label,
}: {
  column: ReturnType<ReturnType<typeof useReactTable<Climb>>["getColumn"]>;
  label: string;
}) {
  if (!column) return null;
  const sorted = column.getIsSorted();
  const Icon =
    sorted === "asc" ? ChevronUp : sorted === "desc" ? ChevronDown : ChevronsUpDown;
  return (
    <button
      onClick={() => column.toggleSorting(sorted === "asc")}
      className={cn(
        "flex cursor-pointer items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors",
        sorted ? "text-ember" : "text-slate-400 hover:text-granite-100",
      )}
    >
      {label}
      <Icon className="h-2.5 w-2.5" />
    </button>
  );
}

function ColLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <MonoChip className={cn("tracking-[0.14em] text-slate-400", className)}>
      {children}
    </MonoChip>
  );
}

// Shared pagination footer (per-page chips + prev/page/next).
export function Pagination({
  table,
  dataLength,
}: {
  table: { // narrow structural type — both tables pass a useReactTable instance
    getState: () => { pagination: { pageSize: number; pageIndex: number } };
    setPageSize: (n: number) => void;
    getPageCount: () => number;
    previousPage: () => void;
    nextPage: () => void;
    getCanPreviousPage: () => boolean;
    getCanNextPage: () => boolean;
  };
  dataLength: number;
}) {
  const pageSize = table.getState().pagination.pageSize;
  return (
    <div className="mt-px flex flex-wrap items-center justify-between gap-4 border-t border-chalk-3 py-4">
      <div className="flex items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
          Per page
        </span>
        {PAGE_SIZES.map((size) => (
          <button
            key={size}
            onClick={() => table.setPageSize(size)}
            className={cn(
              "rounded-sm px-2 py-1 font-mono text-[10px] tracking-widest transition-colors",
              pageSize === size
                ? "bg-granite-100 text-chalk"
                : "bg-chalk-2 text-slate-500 hover:text-granite-100",
            )}
          >
            {size}
          </button>
        ))}
        <button
          onClick={() => table.setPageSize(dataLength || 1)}
          className={cn(
            "rounded-sm px-2 py-1 font-mono text-[10px] tracking-widest transition-colors",
            pageSize >= dataLength && dataLength > 0
              ? "bg-granite-100 text-chalk"
              : "bg-chalk-2 text-slate-500 hover:text-granite-100",
          )}
        >
          ALL
        </button>
      </div>

      {table.getPageCount() > 1 && (
        <div className="flex items-center gap-4">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="font-mono text-[10px] uppercase tracking-widest text-granite-100 transition-colors hover:text-ember disabled:text-[#C7C0B2]"
          >
            ← Prev
          </button>
          <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="font-mono text-[10px] uppercase tracking-widest text-granite-100 transition-colors hover:text-ember disabled:text-[#C7C0B2]"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
