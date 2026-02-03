"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  RowSelectionState,
  ColumnSizingState,
  ColumnPinningState,
  PaginationState,
  useReactTable,
  Table as TanstackTable,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table"
import { Button } from "./button"
import { Input } from "./input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu"

import { useState, useEffect } from "react"
import { ChevronDown, Download, X, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import * as XLSX from "xlsx"
import { getCommonPinningStyles } from "../tablecn/lib/data-table"


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey?: string
  searchPlaceholder?: string
  enableRowSelection?: boolean
  enableExport?: boolean
  exportFilename?: string
  customFilters?: (table: TanstackTable<TData>) => React.ReactNode
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Search...",
  enableRowSelection = false,
  enableExport = false,
  exportFilename = "export",
  customFilters,
}: DataTableProps<TData, TValue>) {
  const storageKey = `data-table-prediction-${exportFilename}`

  const [sorting, setSorting] = useState<SortingState>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`${storageKey}-sorting`)
      return stored ? JSON.parse(stored) : []
    }
    return []
  })
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`${storageKey}-columnFilters`)
      return stored ? JSON.parse(stored) : []
    }
    return []
  })
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`${storageKey}-columnVisibility`)
      return stored ? JSON.parse(stored) : {}
    }
    return {}
  })
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`${storageKey}-columnSizing`)
      return stored ? JSON.parse(stored) : {}
    }
    return {}
  })
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`${storageKey}-columnPinning`)
      return stored ? JSON.parse(stored) : {}
    }
    return {}
  })
  const [pagination, setPagination] = useState<PaginationState>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`${storageKey}-pagination`)
      return stored ? JSON.parse(stored) : { pageIndex: 0, pageSize: 20 }
    }
    return { pageIndex: 0, pageSize: 20 }
  })
  const [contextMenu, setContextMenu] = useState<{
    open: boolean;
    x: number;
    y: number;
    columnId: string | null;
  }>({
    open: false,
    x: 0,
    y: 0,
    columnId: null,
  })

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem(`${storageKey}-sorting`, JSON.stringify(sorting))
  }, [sorting, storageKey])

  useEffect(() => {
    localStorage.setItem(`${storageKey}-columnFilters`, JSON.stringify(columnFilters))
  }, [columnFilters, storageKey])

  useEffect(() => {
    localStorage.setItem(`${storageKey}-columnVisibility`, JSON.stringify(columnVisibility))
  }, [columnVisibility, storageKey])

  useEffect(() => {
    localStorage.setItem(`${storageKey}-columnSizing`, JSON.stringify(columnSizing))
  }, [columnSizing, storageKey])

  useEffect(() => {
    localStorage.setItem(`${storageKey}-columnPinning`, JSON.stringify(columnPinning))
  }, [columnPinning, storageKey])

  useEffect(() => {
    localStorage.setItem(`${storageKey}-pagination`, JSON.stringify(pagination))
  }, [pagination, storageKey])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onColumnSizingChange: setColumnSizing,
    onColumnPinningChange: setColumnPinning,
    onPaginationChange: setPagination,

    enableRowSelection,
    columnResizeMode: "onChange",
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      columnSizing,
      columnPinning,
      pagination,
    },
  })

  const handleExport = () => {
    const exportData = table.getFilteredRowModel().rows.map((row) => {
      const rowData: Record<string, unknown> = {}
      row.getVisibleCells().forEach((cell) => {
        const columnId = cell.column.id
        if (columnId !== "select" && columnId !== "actions") {
          rowData[columnId] = cell.getValue()
        }
      })
      return rowData
    })

    const ws = XLSX.utils.json_to_sheet(exportData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1")
    XLSX.writeFile(wb, `${exportFilename}.xlsx`)
  }

  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-1 items-center gap-2">
          {searchKey && (
            <Input
              placeholder={searchPlaceholder}
              value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn(searchKey)?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          )}
          {customFilters && customFilters(table)}
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          {enableExport && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              disabled={table.getFilteredRowModel().rows.length === 0}
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {enableRowSelection && table.getFilteredSelectedRowModel().rows.length > 0 && (
        <div className="flex items-center justify-between rounded-md bg-muted p-2">
          <div className="text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.resetRowSelection()}
          >
            Clear selection
          </Button>
        </div>
      )}
      <div className="rounded-md border overflow-auto max-h-[600px]">
        <Table style={{ width: table.getTotalSize() }}>
          <TableHeader className="sticky top-0 z-10 bg-background">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{
                      width: header.getSize(),
                      ...getCommonPinningStyles({ column: header.column, withBorder: true }),
                      ...((header.column.getIsPinned() === 'left') && {
                        backgroundColor: 'var(--background)',
                        boxShadow: header.column.getIsLastColumn('left')
                          ? '-4px 0 4px -4px var(--border) inset'
                          : 'none'
                      })
                    }}
                    className={`bg-background font-semibold border border-border/20 ${header.column.getIsPinned() === 'left' ? 'relative after:absolute after:right-0 after:top-0 after:bottom-0 after:w-0.5 after:bg-blue-500 after:content-[""]' : ''}`}
                    onContextMenu={(e) => {
                      e.preventDefault()
                      setContextMenu({
                        open: true,
                        x: e.clientX,
                        y: e.clientY,
                        columnId: header.column.id,
                      })
                    }}
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <div
                        className="flex items-center gap-2 cursor-pointer select-none"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getIsSorted() === "asc" ? (
                          <ArrowUp className="h-4 w-4" />
                        ) : header.column.getIsSorted() === "desc" ? (
                          <ArrowDown className="h-4 w-4" />
                        ) : (
                          <ArrowUpDown className="h-4 w-4 opacity-50" />
                        )}
                      </div>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    )}
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className={`absolute right-0 top-0 h-full w-1 cursor-col-resize select-none touch-none bg-border opacity-0 hover:opacity-100 ${
                        header.column.getIsResizing() ? "opacity-100 bg-primary" : ""
                      }`}
                    />
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="!bg-white">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        width: cell.column.getSize(),
                        ...getCommonPinningStyles({ column: cell.column, withBorder: true })
                      }}
                      className="!bg-white border border-border/20"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="!bg-white">
                <TableCell colSpan={columns.length} className="h-24 text-center !bg-white">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} row(s) total
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value))
              }}
              className="h-8 w-[70px] rounded-md border border-input bg-background px-2 text-sm"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              First
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              Last
            </Button>
          </div>
        </div>
      </div>
      {contextMenu.open && contextMenu.columnId && (
        <DropdownMenu
          open={contextMenu.open}
          onOpenChange={(open) => setContextMenu(prev => ({ ...prev, open }))}
        >
          <DropdownMenuTrigger
            style={{
              position: "fixed",
              left: `${contextMenu.x}px`,
              top: `${contextMenu.y}px`,
              width: "1px",
              height: "1px",
              padding: 0,
              margin: 0,
              border: "none",
              background: "transparent",
              pointerEvents: "none",
              opacity: 0,
            }}
          />
          <DropdownMenuContent align="start" className="w-48">
            {(() => {
              const column = table.getColumn(contextMenu.columnId!)
              if (!column || !column.getCanPin()) return null

              const pinnedPosition = column.getIsPinned()
              const isPinnedLeft = pinnedPosition === "left"
              const isPinnedRight = pinnedPosition === "right"

              return (
                <>
                  {isPinnedLeft ? (
                    <DropdownMenuItem
                      onClick={() => {
                        column.pin(false)
                        setContextMenu({ open: false, x: 0, y: 0, columnId: null })
                      }}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Unpin column
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem
                      onClick={() => {
                        column.pin("left")
                        setContextMenu({ open: false, x: 0, y: 0, columnId: null })
                      }}
                    >
                      <ArrowUpDown className="mr-2 h-4 w-4" />
                      Pin column
                    </DropdownMenuItem>
                  )}
                </>
              )
            })()}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}
