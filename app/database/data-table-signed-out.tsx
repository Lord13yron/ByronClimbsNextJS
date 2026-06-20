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
import { Climb } from "../types/types";
import { cn } from "@/lib/utils";
import MonoChip from "@/components/ui/MonoChip";
import TypeGlyph from "@/components/ui/TypeGlyph";
import { Pagination } from "./data-table";

const DEFAULT_SORT: SortingState = [{ id: "grade", desc: true }];

// Signed-out list: GRADE · ROUTE · AREA · CITY · TYPE (no Status column).
const ROW_GRID =
  "grid items-center gap-3.5 px-4 grid-cols-[52px_minmax(0,1fr)] " +
  "md:gap-[18px] md:grid-cols-[72px_minmax(0,1.5fr)_minmax(0,1.05fr)_92px_104px]";

interface DataTableProps {
  columns: ColumnDef<Climb>[];
  data: Climb[];
}

export function DataTableSignedOut({ columns, data }: DataTableProps) {
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
        </div>

        {/* Rows */}
        {table.getRowModel().rows.map((row) => {
          const c = row.original;
          return (
            <div
              key={c.id}
              className={cn(
                ROW_GRID,
                "border-b border-chalk-2 py-2.5 transition-colors hover:bg-chalk-2",
              )}
            >
              <span className="rounded-sm bg-granite-100 py-0.75 text-center font-display text-[14px] font-bold tracking-[0.05em] text-chalk">
                {c.type === "boulder" ? `V${c.grade}` : c.grade}
              </span>

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

              <MonoChip className="hidden truncate text-slate-700 md:block">
                {c.city}
              </MonoChip>

              <span className="hidden min-w-0 items-center gap-1.5 text-slate-700 md:flex">
                <TypeGlyph type={c.type} size={13} />
                <MonoChip className="truncate text-slate-700">{c.type}</MonoChip>
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
