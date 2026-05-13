"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown, SquarePen } from "lucide-react";
import Link from "next/link";
import { Climb } from "@/app/types/types";
import DeleteClimb from "@/components/DeleteClimb";
import GradeChip from "@/components/ui/GradeChip";
import MonoChip from "@/components/ui/MonoChip";
import TypeGlyph from "@/components/ui/TypeGlyph";

export const columnsAdmin: ColumnDef<Climb>[] = [
  {
    id: "edit",
    header: () => null,
    cell: ({ row }) => (
      <Link href={`/admin/edit-climb/${row.original.id}-${row.original.slug}`}>
        <SquarePen className="h-4 w-4 text-slate-400 hover:text-ember transition-colors duration-150" />
      </Link>
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
    cell: ({ row }) => {
      const grade =
        row.original.type === "boulder"
          ? `V${row.getValue("grade")}`
          : `${row.getValue("grade")}`;
      return <GradeChip grade={grade} variant="outline" />;
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
          href={`/admin/climbs/${row.original.id}-${row.original.slug}`}
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
    id: "delete",
    header: () => null,
    cell: ({ row }) => <DeleteClimb climb={row.original} />,
  },
];
