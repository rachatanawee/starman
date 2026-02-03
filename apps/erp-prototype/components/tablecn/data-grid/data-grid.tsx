"use client";

import { flexRender } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import * as React from "react";
import { DataGridColumnHeader } from "@/components/tablecn/data-grid/data-grid-column-header";
import { DataGridContextMenu } from "@/components/tablecn/data-grid/data-grid-context-menu";
import { DataGridRow } from "@/components/tablecn/data-grid/data-grid-row";
import { DataGridSearch } from "@/components/tablecn/data-grid/data-grid-search";
import type { useDataGrid } from "@/components/tablecn/hooks/use-data-grid";
import { getCommonPinningStyles } from "@/components/tablecn/lib/data-table";
import { cn } from "@/lib/utils";

interface DataGridProps<TData>
  extends ReturnType<typeof useDataGrid<TData>>,
    React.ComponentProps<"div"> {
  height?: number;
}

export function DataGrid<TData>({
  dataGridRef,
  headerRef,
  rowMapRef,
  footerRef,
  table,
  rowVirtualizer,
  height = 600,
  searchState,
  columnSizeVars,
  onRowAdd,
  className,
  ...props
}: DataGridProps<TData>) {
  const rows = table.getRowModel().rows;
  const columns = table.getAllColumns();

  const meta = table.options.meta;
  const rowHeight = meta?.rowHeight ?? "short";
  const focusedCell = meta?.focusedCell ?? null;

  const onGridContextMenu = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
    },
    [],
  );

  const onAddRowKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!onRowAdd) return;

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onRowAdd();
      }
    },
    [onRowAdd],
  );

  React.useEffect(() => {
    const gridElement = dataGridRef.current;
    if (!gridElement) return;

    let startX = 0;
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (gridElement.scrollLeft === 0) {
        const currentX = e.touches[0].clientX;
        if (currentX > startX) {
          e.preventDefault();
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (gridElement.scrollLeft === 0 && e.deltaX < 0) {
        e.preventDefault();
      }
    };

    gridElement.addEventListener('touchstart', handleTouchStart, { passive: true });
    gridElement.addEventListener('touchmove', handleTouchMove, { passive: false });
    gridElement.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      gridElement.removeEventListener('touchstart', handleTouchStart);
      gridElement.removeEventListener('touchmove', handleTouchMove);
      gridElement.removeEventListener('wheel', handleWheel);
    };
  }, [dataGridRef]);

  return (
    <div
      data-slot="grid-wrapper"
      className={cn("relative flex w-full flex-col", className)}
      {...props}
    >
      {searchState && <DataGridSearch {...searchState} />}
      <DataGridContextMenu table={table} />
      <div
        role="grid"
        aria-label="Data grid"
        aria-rowcount={rows.length + (onRowAdd ? 1 : 0)}
        aria-colcount={columns.length}
        data-slot="grid"
        data-testid="data-grid"
        tabIndex={0}
        ref={dataGridRef}
        className="relative flex flex-col select-none overflow-auto rounded-md border focus:outline-none"
        style={{
          ...columnSizeVars,
          maxHeight: `${height}px`,
        }}
        onContextMenu={onGridContextMenu}
      >
        <div
          role="rowgroup"
          data-slot="grid-header"
          ref={headerRef}
          className="sticky top-0 z-10 grid border-b bg-background"
        >
          {table.getHeaderGroups().map((headerGroup, rowIndex) => (
            <div
              key={headerGroup.id}
              role="row"
              aria-rowindex={rowIndex + 1}
              data-slot="grid-header-row"
              tabIndex={-1}
              className="flex"
            >
              {headerGroup.headers.map((header, colIndex) => {
                const sorting = table.getState().sorting;
                const currentSort = sorting.find(
                  (sort) => sort.id === header.column.id,
                );
                const isSortable = header.column.getCanSort();

                return (
                  <div
                    key={header.id}
                    role="columnheader"
                    aria-colindex={colIndex + 1}
                    aria-sort={
                      currentSort?.desc === false
                        ? "ascending"
                        : currentSort?.desc === true
                          ? "descending"
                          : isSortable
                            ? "none"
                            : undefined
                    }
                    data-slot="grid-header-cell"
                    data-testid={`grid-header-${header.column.id}`}
                    tabIndex={-1}
                    className={cn("relative", {
                      "border-r": header.column.id !== "select",
                    })}
                    style={{
                      ...getCommonPinningStyles({ column: header.column }),
                      width: `calc(var(--header-${header.id}-size) * 1px)`,
                    }}
                  >
                  {header.isPlaceholder ? null : (
                    <div className="size-full px-2 py-1 font-semibold text-xs">
                      {typeof header.column.columnDef.header === "function" ? (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )
                      ) : (
                        <DataGridColumnHeader header={header} table={table} />
                      )}
                    </div>
                  )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div
          role="rowgroup"
          data-slot="grid-body"
          className="relative flex flex-col"
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}
        >
          {rowVirtualizer.getVirtualIndexes().map((virtualRowIndex) => {
            const row = rows[virtualRowIndex];
            if (!row) return null;

            return (
              <DataGridRow
                key={row.id}
                row={row}
                rowMapRef={rowMapRef}
                virtualRowIndex={virtualRowIndex}
                rowVirtualizer={rowVirtualizer}
                rowHeight={rowHeight}
                focusedCell={focusedCell}
                totalSize={table.getTotalSize()}
              />
            );
          })}
        </div>
        {onRowAdd && (
          <div
            role="rowgroup"
            data-slot="grid-footer"
            ref={footerRef}
            className="sticky bottom-0 z-10 grid border-t bg-background"
          >
            <div
              role="row"
              aria-rowindex={rows.length + 2}
              data-slot="grid-add-row"
              tabIndex={-1}
              className="flex w-full"
            >
              <div
                role="gridcell"
                tabIndex={0}
                className="relative flex h-8 grow items-center bg-muted/30 transition-colors hover:bg-muted/50 focus:bg-muted/50 focus:outline-none"
                style={{
                  width: table.getTotalSize(),
                  minWidth: table.getTotalSize(),
                }}
                onClick={onRowAdd}
                onKeyDown={onAddRowKeyDown}
              >
                <div className="sticky left-0 flex items-center gap-2 px-2 text-muted-foreground">
                  <Plus className="size-3" />
                  <span className="text-xs">Add row</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
