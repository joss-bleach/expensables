"use client";

import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "@convex/_generated/api";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const ProjectListSection = () => {
  const { data, isPending, error } = useQuery(
    convexQuery(api.projects.getProjects, {}),
  );

  if (isPending) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className="h-4 w-24" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-32" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-24" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-4 w-[180px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[140px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[100px]" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (error) return <div>Error: {error.message}</div>;

  if (data.length === 0)
    return (
      <div className="flex flex-col py-4">
        <h2 className="text-sm font-medium">No projects found</h2>
        <p className="text-muted-foreground text-sm">
          Create a new project to begin tracking your expenses
        </p>
      </div>
    );

  return <DataTable columns={columns} data={data} />;
};
