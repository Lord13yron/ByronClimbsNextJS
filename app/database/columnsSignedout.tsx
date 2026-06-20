"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Climb } from "../types/types";
import { gradeRank } from "@/lib/grades";

// Sort-only schema for the signed-out list view. Row markup lives in
// data-table-signed-out.tsx.
export const columnsSignedOut: ColumnDef<Climb>[] = [
  {
    accessorKey: "grade",
    sortingFn: (a, b) =>
      gradeRank(a.original.grade, a.original.type) -
      gradeRank(b.original.grade, b.original.type),
  },
  {
    accessorKey: "name",
  },
];
