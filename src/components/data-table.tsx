"use client";
import * as React from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { cn } from "../utils/cn";

export interface DataTableColumn<T> {
  /** key — 데이터 객체의 필드 또는 합성 컬럼 식별자 */
  key: string;
  /** 헤더 라벨 */
  header: React.ReactNode;
  /** 셀 렌더 — 기본은 row[key] */
  cell?: (row: T, rowIndex: number) => React.ReactNode;
  /** 정렬 가능 */
  sortable?: boolean;
  /** 정렬용 키 (key와 다를 때) */
  sortKey?: keyof T;
  /** 정렬 비교 — 미지정 시 자동 (number / string) */
  compare?: (a: T, b: T) => number;
  /** 너비 — Tailwind className. e.g. "w-[120px]" */
  width?: string;
  /** 정렬 (text-right 등) */
  align?: "left" | "right" | "center";
}

export interface DataTableProps<T>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  data: T[];
  columns: DataTableColumn<T>[];
  /** 행 unique key — default: index */
  rowKey?: (row: T, i: number) => string;
  /** 행 클릭 (인터랙티브 행) */
  onRowClick?: (row: T) => void;
  /** 빈 상태 메시지 */
  empty?: React.ReactNode;
  /** 셀 패딩 — tight=py-2 / default=py-3 / loose=py-4 */
  density?: "tight" | "default" | "loose";
  /** 표 위 caption (smallcaps) */
  caption?: React.ReactNode;
}

/**
 * DataTable — 정렬·필터 가능한 표.
 *
 * 안티 카드 톤: shadow X, 헤더 bottom 1px 헤어라인, 행 사이 1px(zinc-200/70).
 * 헤더 smallcaps zinc-500. 정렬 아이콘 lucide.
 *
 * generic — `<DataTable<Project> data={...} columns={...} />`
 *
 * @example
 *   <DataTable
 *     data={projects}
 *     columns={[
 *       { key: "name", header: "이름", sortable: true },
 *       { key: "year", header: "연도", sortable: true, align: "right" },
 *     ]}
 *   />
 */
export function DataTable<T>({
  data,
  columns,
  rowKey,
  onRowClick,
  empty = "데이터 없음",
  density = "default",
  caption,
  className,
  ...props
}: DataTableProps<T>) {
  const [sort, setSort] = React.useState<{
    key: string;
    dir: "asc" | "desc";
  } | null>(null);

  const sorted = React.useMemo(() => {
    if (!sort) return data;
    const col = columns.find((c) => c.key === sort.key);
    if (!col?.sortable) return data;
    const sk = (col.sortKey ?? (col.key as keyof T)) as keyof T;
    const cmp =
      col.compare ??
      ((a: T, b: T) => {
        const va = a[sk] as unknown;
        const vb = b[sk] as unknown;
        if (va == null && vb == null) return 0;
        if (va == null) return -1;
        if (vb == null) return 1;
        if (typeof va === "number" && typeof vb === "number") return va - vb;
        return String(va).localeCompare(String(vb));
      });
    // dir에 따라 cmp 부호를 뒤집어 stable sort 유지 (reverse는 동률 순서를 깨뜨림)
    const dir = sort.dir === "asc" ? 1 : -1;
    return [...data].sort((a, b) => dir * cmp(a, b));
  }, [data, columns, sort]);

  const onSort = (key: string) => {
    setSort((s) => {
      if (s?.key !== key) return { key, dir: "asc" };
      if (s.dir === "asc") return { key, dir: "desc" };
      return null;
    });
  };

  const cellPadding =
    density === "tight" ? "py-2" : density === "loose" ? "py-4" : "py-3";

  return (
    <div
      data-anti-card="data-table"
      data-density={density}
      className={cn("w-full overflow-x-auto", className)}
      {...props}
    >
      <table className="w-full text-[13.5px]">
        {caption && (
          <caption className="mb-2 text-left text-[11.5px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-500">
            {caption}
          </caption>
        )}
        <thead>
          <tr className="border-b border-zinc-200 dark:border-white/[0.08]">
            {columns.map((c) => {
              const isSorted = sort?.key === c.key;
              const alignCls =
                c.align === "right"
                  ? "text-right"
                  : c.align === "center"
                  ? "text-center"
                  : "text-left";
              return (
                <th
                  key={c.key}
                  scope="col"
                  className={cn(
                    "px-3 text-[11.5px] font-medium uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400",
                    cellPadding,
                    alignCls,
                    c.width
                  )}
                  aria-sort={
                    isSorted
                      ? sort?.dir === "asc"
                        ? "ascending"
                        : "descending"
                      : undefined
                  }
                >
                  {c.sortable ? (
                    <button
                      type="button"
                      onClick={() => onSort(c.key)}
                      className={cn(
                        "inline-flex items-center gap-1 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100",
                        isSorted && "text-zinc-900 dark:text-zinc-100"
                      )}
                    >
                      {c.header}
                      {!isSorted && (
                        <ChevronsUpDown
                          className="h-3 w-3 opacity-60"
                          strokeWidth={1.5}
                        />
                      )}
                      {isSorted && sort.dir === "asc" && (
                        <ChevronUp className="h-3 w-3" strokeWidth={1.5} />
                      )}
                      {isSorted && sort.dir === "desc" && (
                        <ChevronDown className="h-3 w-3" strokeWidth={1.5} />
                      )}
                    </button>
                  ) : (
                    c.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="py-10 text-center text-[13.5px] text-zinc-500 dark:text-zinc-500"
              >
                {empty}
              </td>
            </tr>
          )}
          {sorted.map((row, i) => {
            const key = rowKey ? rowKey(row, i) : String(i);
            return (
              <tr
                key={key}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={cn(
                  "border-b border-zinc-200/70 dark:border-white/[0.04]",
                  onRowClick &&
                    "cursor-pointer transition-colors hover:bg-zinc-50 dark:hover:bg-white/[0.02]"
                )}
              >
                {columns.map((c) => {
                  const alignCls =
                    c.align === "right"
                      ? "text-right"
                      : c.align === "center"
                      ? "text-center"
                      : "text-left";
                  return (
                    <td
                      key={c.key}
                      className={cn(
                        "px-3 text-zinc-700 dark:text-zinc-300",
                        cellPadding,
                        alignCls,
                        c.width
                      )}
                    >
                      {c.cell
                        ? c.cell(row, i)
                        : ((row as Record<string, React.ReactNode>)[c.key] ?? null)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
