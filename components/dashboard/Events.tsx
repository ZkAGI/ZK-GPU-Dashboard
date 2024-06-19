import React, { useEffect, useMemo } from "react";
import useSWR from "swr";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { useEventsStore } from "@/hooks/store/useEventStore";

interface EventsData {
  severity: "SUCCESS" | "ERROR";
  hostName: string;
  sourceType: string;
  label: string;
  message: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Events: React.FC = () => {
  const { data } = useSWR(`${BASE_URL}/events`, {
    refreshInterval: 1000,
  });

  const { events, setEvents } = useEventsStore();

  useEffect(() => {
    if (data) {
      setEvents(data.data?.events?.global);
    }
  }, [data, setEvents]);

  const columns = useMemo<ColumnDef<EventsData>[]>(
    () => [
      {
        header: "Severity",
        accessorKey: "severity",
        cell: ({ getValue }) => {
          const severity = getValue() as EventsData["severity"];
          const bgColor =
            severity === "ERROR"
              ? "bg-[#FFFFFF] text-center w-20"
              : "bg-[#FFFFFF] text-center w-1/2";
          const textColor =
            severity === "ERROR" ? "text-[#FF3636]" : "text-[#01B574]";
          return (
            <div className={`p-1 rounded ${bgColor} text-white`}>
              <span className={textColor}>{severity}</span>
            </div>
          );
        },
      },
      {
        header: "Host",
        accessorKey: "hostName",
      },
      {
        header: "Source",
        accessorKey: "sourceType",
      },
      {
        header: "Label",
        accessorKey: "label",
      },
      {
        header: "Message",
        accessorKey: "message",
      },
    ],
    []
  );

  const table = useReactTable({
    data: events || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 6,
      },
    },
  });

  const successCount =
    events?.filter((event) => event.severity === "SUCCESS").length || 0;
  const errorCount =
    events?.filter((event) => event.severity === "ERROR").length || 0;

  return (
    <>
      <div>Events</div>
      <div className="flex flex-col gap-2 bg-[#2D2E5F] rounded-xl p-5 bg-opacity-50 my-4">
        <div className="flex flex-col gap-4 justify-between">
          <div className="flex flex-row gap-2">
            <div className="flex flex-row gap-6 rounded-lg p-1 px-2 bg-[#D9D9D9] bg-opacity-10">
              <div className="flex justify-center gap-2 items-center">
                <div className="rounded-full size-3 bg-[#01B574]"></div>
                <div className="text-[#A0AEC0]">Success</div>
              </div>
              <div className="text-[#A0AEC0] flex justify-end mr-2">
                {successCount}
              </div>
            </div>
            <div className="grid grid-cols-2 rounded-lg p-1 px-2 bg-[#D9D9D9] bg-opacity-10">
              <div className="flex justify-center gap-2 items-center">
                <div className="rounded-full size-3 bg-[#FF5252]"></div>
                <div className="text-[#A0AEC0]">Error</div>
              </div>
              <div className="text-[#A0AEC0] flex justify-end mr-2">
                {errorCount}
              </div>
            </div>
          </div>
        </div>
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="py-2 font-light text-left text-xs px-2"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <div className="flex justify-between items-center my-2 mb-4">
            <div className="flex gap-1 w-10">
              <button
                className="px-3 py-1 text-white rounded disabled:opacity-50"
                onClick={() => table.setPageIndex(0)}
                disabled={table.getState().pagination.pageIndex === 0}
              >
                {"<<"}
              </button>
              <button
                className="px-3 py-1 text-white rounded disabled:opacity-50"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                {"<"}
              </button>
              {Array.from(
                { length: Math.min(5, table.getPageCount()) },
                (_, index) => {
                  const pageNumber =
                    table.getState().pagination.pageIndex + index +1;
                  return pageNumber <= table.getPageCount() ? (
                    <button
                      key={pageNumber}
                      className={`px-3 py-1 text-white rounded ${
                        table.getState().pagination.pageIndex === pageNumber - 1
                          ? "border"
                          : ""
                      }`}
                      onClick={() => table.setPageIndex(pageNumber - 1)}
                    >
                      {pageNumber}
                    </button>
                  ) : null;
                }
              )}
              {table.getPageCount() > 5 && (
                <>
                  <span className="px-3 py-1 text-white">...</span>
                  <button
                    className="px-3 py-1 text-white rounded"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  >
                    {table.getPageCount()}
                  </button>
                </>
              )}
              <button
                className="px-3 py-1 text-white rounded disabled:opacity-50"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                {">"}
              </button>
              <button
                className="px-3 py-1 text-white rounded disabled:opacity-50"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={
                  table.getState().pagination.pageIndex ===
                  table.getPageCount() - 1
                }
              >
                {">>"}
              </button>
            </div>
          </div>
          <tbody className="border-t border-[#56577A]">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="text-xs mx-2">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="py-2 px-2 border-b border-[#56577A]"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Events;
