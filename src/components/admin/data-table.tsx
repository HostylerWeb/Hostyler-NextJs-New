"use client";

import { type ReactNode, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type DataTableColumn<T> = {
  key: string;
  header: string;
  cell: (row: T) => ReactNode;
  sortable?: boolean;
};

type DataTableProps<T> = {
  data: T[];
  columns: DataTableColumn<T>[];
  searchKeys?: Array<keyof T>;
  statusKey?: keyof T;
  statusOptions?: string[];
  emptyMessage?: string;
};

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  searchKeys = [],
  statusKey,
  statusOptions = [],
  emptyMessage = "No results found.",
}: DataTableProps<T>) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(() => {
    return data.filter((row) => {
      const matchesStatus =
        !statusKey || status === "all" || String(row[statusKey]) === status;

      const matchesQuery =
        !query ||
        searchKeys.some((key) =>
          String(row[key] ?? "")
            .toLowerCase()
            .includes(query.toLowerCase()),
        );

      return matchesStatus && matchesQuery;
    });
  }, [data, query, searchKeys, status, statusKey]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {searchKeys.length > 0 ? (
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search…"
            className="max-w-xs"
            rounded="md"
          />
        ) : null}
        {statusKey && statusOptions.length > 0 ? (
          <Select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="max-w-[180px]"
          >
            <option value="all">All statuses</option>
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option.replaceAll("_", " ")}
              </option>
            ))}
          </Select>
        ) : null}
      </div>

      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableHeader key={column.key}>{column.header}</TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="py-10 text-center text-muted">
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            filtered.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.key}>{column.cell(row)}</TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
