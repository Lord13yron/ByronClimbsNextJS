"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Climb } from "../types/types";
import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import TickBox from "@/components/TickBox";
import FavoriteIcon from "@/components/FavoriteIcon";
import GradeChip from "@/components/ui/GradeChip";
import MonoChip from "@/components/ui/MonoChip";
import TypeGlyph from "@/components/ui/TypeGlyph";

export const columns: ColumnDef<Climb>[] = [
  {
    id: "favorites",
    header: () => null,
    cell: ({ row, table }) => (
      <FavoriteIcon
        climbId={row.original.id}
        favorites={table.options.meta?.favorites || []}
      />
    ),
  },
  {
    accessorKey: "grade",
    header: ({ column }) => (
      <button
        className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-slate-500"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Grade
        <ChevronsUpDown className="h-2.5 w-2.5" />
      </button>
    ),
    cell: ({ row, table }) => {
      const isSent = (table.options.meta?.sends || []).some(
        (s) => s.climb_id === row.original.id,
      );
      const grade =
        row.original.type === "boulder"
          ? `V${row.getValue("grade")}`
          : `${row.getValue("grade")}`;
      return <GradeChip grade={grade} variant={isSent ? "ember" : "outline"} />;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <button
        className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-slate-500"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Route
        <ChevronsUpDown className="h-2.5 w-2.5" />
      </button>
    ),
    cell: ({ row }) => (
      <div>
        <Link
          href={`/database/${row.original.id}-${row.original.slug}`}
          className="font-display uppercase text-[17px] tracking-[0.02em] text-granite-100 hover:text-ember transition-colors duration-150"
        >
          {row.getValue("name")}
        </Link>
        <div className="md:hidden mt-0.5">
          <MonoChip>
            {row.original.area}
            {row.original.subArea ? ` · ${row.original.subArea}` : ""}
          </MonoChip>
        </div>
      </div>
    ),
  },
  {
    id: "location",
    accessorKey: "area",
    header: () => <MonoChip className="text-[9px]">Area</MonoChip>,
    cell: ({ row }) => (
      <div>
        <div className="text-[13px] font-medium text-granite-100 capitalize">
          {row.original.area}
        </div>
        {row.original.subArea && (
          <MonoChip className="mt-0.5 capitalize">{row.original.subArea}</MonoChip>
        )}
      </div>
    ),
  },
  {
    id: "city",
    accessorKey: "city",
    header: () => <MonoChip className="text-[9px]">City</MonoChip>,
    cell: ({ row }) => (
      <MonoChip className="capitalize">{row.original.city}</MonoChip>
    ),
  },
  {
    id: "type",
    accessorKey: "type",
    header: () => <MonoChip className="text-[9px]">Type</MonoChip>,
    cell: ({ row }) => {
      const t = row.original.type;
      return (
        <div className="flex items-center gap-1.5 text-slate-700">
          <TypeGlyph type={t} size={13} />
          <MonoChip className="text-granite-100">{t}</MonoChip>
        </div>
      );
    },
  },
  {
    id: "tickbox",
    header: () => <MonoChip className="text-[9px]">Status</MonoChip>,
    cell: ({ row, table }) => (
      <TickBox
        climbId={row.original.id}
        size={4}
        sends={table.options.meta?.sends || []}
      />
    ),
  },
];
