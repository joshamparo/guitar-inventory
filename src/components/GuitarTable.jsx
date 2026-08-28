import React, { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender
} from '@tanstack/react-table';

export default function GuitarTable({ data, onSelectRow, selectedId }) {
  const columns = useMemo(() => [
    { header: 'Model', accessorKey: 'model' },
    { header: 'Brand', accessorKey: 'brand' },
    { header: 'Type', accessorKey: 'bodyType' },
    { header: 'Stock', accessorKey: 'stock' },
    { header: 'Role', accessorKey: 'userRole' }
  ], []);

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 4
      }
    }
  });

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl space-y-4 text-slate-100">
      <div className="flex items-center justify-between border-b border-slate-700 pb-3">
        <h2 className="text-lg font-bold tracking-wide uppercase text-amber-500">Inventory Registry</h2>
        <span className="text-xs text-slate-400 font-mono">{data ? data.length : 0} total guitars</span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-700">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900 text-slate-400 font-mono text-xs uppercase tracking-wider">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="p-3 border-b border-slate-700 font-semibold">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-700">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map(row => {
                const isSelected = selectedId === row.original.id;
                return (
                  <tr
                    key={row.id}
                    onClick={() => onSelectRow(row.original)}
                    className={`cursor-pointer transition ${
                      isSelected
                        ? 'bg-amber-500/20 text-amber-300 font-medium'
                        : 'hover:bg-slate-700/50 text-slate-300'
                    }`}
                  >
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="p-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-slate-500">
                  No guitars registered yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          type="button"
          className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 disabled:opacity-40 rounded text-xs font-semibold text-slate-300 transition"
        >
          ← Previous
        </button>

        <span className="text-xs font-mono text-slate-400">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
        </span>

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          type="button"
          className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 disabled:opacity-40 rounded text-xs font-semibold text-slate-300 transition"
        >
          Next →
        </button>
      </div>
    </div>
  );
}