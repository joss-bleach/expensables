"use client";

import { Doc } from "@convex/_generated/dataModel";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreVerticalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Doc<"projects">>[] = [
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("name")}</div>;
    },
  },
  {
    header: "Start date",
    accessorKey: "startDate",
    cell: ({ row }) => {
      const date = new Date(row.getValue("startDate"));
      const formatted = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(date);
      return <div>{formatted}</div>;
    },
  },
  {
    header: "End date",
    accessorKey: "endDate",
    cell: ({ row }) => {
      const date = new Date(row.getValue("endDate"));
      const formatted = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(date);
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "perDiemAmount",
    header: () => <div>Per diem amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("perDiemAmount"));
      const formatted = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(amount);
      return <div>{formatted}</div>;
    },
  },
  {
    header: "Rest days",
    accessorKey: "restDays",
  },
  {
    id: "totalExpense",
    header: () => <div>Total amount</div>,
    accessorFn: (row) => {
      const startDate = new Date(row.startDate);
      const endDate = new Date(row.endDate);
      const restDays = row.restDays;
      const perDiemAmount = row.perDiemAmount;

      // Calculate total days (including end date)
      const totalDays =
        Math.ceil(
          (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
        ) + 1;
      const workingDays = totalDays - restDays;
      return workingDays * perDiemAmount;
    },
    cell: ({ row }) => {
      const amount = row.getValue("totalExpense") as number;
      const formatted = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(amount);

      return <div>{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const project = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 hover:cursor-pointer"
            >
              <span className="sr-only">Open menu</span>
              <MoreVerticalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => console.log("Edit project", project._id)}
              className="hover:cursor-pointer"
            >
              Edit project
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("Delete project", project._id)}
              className="text-destructive focus:text-destructive hover:cursor-pointer"
            >
              Delete project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
