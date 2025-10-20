/**
 * DataTable Component
 * Generic, type-safe table component for displaying tabular data
 * Single Responsibility: Render tables with consistent styling and behavior
 *
 * Used in: All detail screens for data display
 * Replaces: 300+ lines of duplicate table code
 *
 * Features:
 * - TypeScript generics for type-safe columns and data
 * - Responsive with horizontal scrolling
 * - Hover states and proper spacing
 * - Custom cell renderers via accessor functions
 */

import { ReactNode } from 'react';

export interface Column<T> {
  /** Column header text */
  header: string;
  /**
   * Data accessor - can be a key name or a function that returns a ReactNode
   * Function receives (row, index) for accessing row index in rendering
   * Use function for custom rendering (badges, icons, formatted values, etc.)
   */
  accessor: keyof T | ((row: T, index: number) => ReactNode);
  /** Optional CSS class for both header and cells in this column */
  className?: string;
  /** Optional CSS class for header only */
  headerClassName?: string;
  /** Optional CSS class for cells only */
  cellClassName?: string;
}

export interface DataTableProps<T> {
  /** Array of column definitions */
  columns: Column<T>[];
  /** Array of data rows */
  data: T[];
  /** Function to extract unique key from each row */
  keyExtractor: (row: T, index: number) => string | number;
  /** Optional CSS class for table container */
  className?: string;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  className = ''
}: DataTableProps<T>) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full">
        <thead>
          <tr className="text-left border-b border-border">
            {columns.map((column, idx) => (
              <th
                key={idx}
                className={`pb-3 text-xs font-medium text-text-tertiary uppercase ${
                  column.headerClassName || column.className || ''
                }`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((row, rowIdx) => (
            <tr
              key={keyExtractor(row, rowIdx)}
              className="hover:bg-background-secondary transition-colors"
            >
              {columns.map((column, colIdx) => {
                // Determine cell content based on accessor type
                const cellContent = typeof column.accessor === 'function'
                  ? column.accessor(row, rowIdx)
                  : row[column.accessor];

                return (
                  <td
                    key={colIdx}
                    className={`py-4 ${
                      column.cellClassName || column.className || ''
                    }`}
                  >
                    {cellContent as ReactNode}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="py-8 text-center text-text-tertiary text-sm">
          No data available
        </div>
      )}
    </div>
  );
}
