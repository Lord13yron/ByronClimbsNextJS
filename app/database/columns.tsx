"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Climb } from "../types/types";
import { gradeRank } from "@/lib/grades";

// Sort-only schema for the list view. The row markup (grade block, route, area,
// city, type, status) is rendered directly in data-table.tsx to match the
// design's CSS-grid layout; only GRADE and ROUTE are sortable.
export const columns: ColumnDef<Climb>[] = [
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
