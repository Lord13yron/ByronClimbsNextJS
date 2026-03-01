"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import { Climb } from "@/app/types/types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DeleteClimb from "@/components/DeleteClimb";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columnsAdmin: ColumnDef<Climb>[] = [
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
    cell: ({ row }) => (
      <div className="flex justify-between gap-4 font-bold ">
        <div className="flex gap-2 ">
          <Link href={`/admin/climbs/${row.original.id}-${row.original.slug}`}>
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
        {" "}
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
  {
    id: "Edit",
    header: () => {
      return (
        <Tooltip>
          <TooltipTrigger>
            <SquarePen className="h-4 w-4" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit Climb</p>
          </TooltipContent>
        </Tooltip>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <Tooltip>
            <TooltipTrigger>
              <Link
                href={`/admin/edit-climb/${row.original.id}-${row.original.slug}`}
              >
                <SquarePen className="h-4 w-4 hover:text-green-800" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit {row.original.name}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      );
    },
  },
  {
    id: "Delete",
    header: () => {
      return (
        <Tooltip>
          <TooltipTrigger>
            <Trash2 className="h-4 w-4" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete Climb</p>
          </TooltipContent>
        </Tooltip>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <Tooltip>
            <TooltipTrigger>
              <DeleteClimb climb={row.original} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete {row.original.name}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      );
    },
  },
];
