"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Climb } from "../types/types";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Star } from "lucide-react";
import Link from "next/link";
import TickBox from "@/components/TickBox";
import FavoriteIcon from "@/components/FavoriteIcon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const columns: ColumnDef<Climb>[] = [
  {
    id: "favorites",
    header: () => {
      return (
        <Tooltip>
          <TooltipTrigger>
            <Star className="h-4 w-4" fill="gold" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Favorites</p>
          </TooltipContent>
        </Tooltip>
      );
    },
    cell: ({ row, table }) => {
      return (
        <div className="flex gap-2">
          <FavoriteIcon
            climbId={row.original.id}
            favorites={table.options.meta?.favorites || []}
          />
        </div>
      );
    },
  },
  {
    id: "tickbox",
    cell: ({ row, table }) => {
      const climb = row.original;

      return (
        <div className="flex gap-2">
          <TickBox
            climbId={climb.id}
            size={4}
            sends={table.options.meta?.sends || []}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    // cell: ({ row }) => (
    //   <div className="flex justify-between gap-4 font-bold ">
    //     <div className="flex gap-2 ">
    //       <Link href={`/database/${row.original.slug}`}>
    //         {row.getValue("name")}
    //       </Link>
    //     </div>
    //   </div>
    // ),
    cell: ({ row }) => (
      <div className="flex justify-between gap-4 font-bold ">
        <div className="flex gap-2 ">
          <Link href={`/database/${row.original.id}-${row.original.slug}`}>
            {row.getValue("name")}
          </Link>
        </div>
      </div>
    ),
  },

  {
    accessorKey: "grade",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            className=""
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Grade
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-center ">
        {row.original.type === "boulder"
          ? `V${row.getValue("grade")}`
          : `${row.getValue("grade")}`}
      </div>
    ),
  },
  {
    accessorKey: "city",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          City
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "area",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Area
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "subArea",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sub Area
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
