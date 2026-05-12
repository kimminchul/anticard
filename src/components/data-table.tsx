"use client";
import * as React from "react";
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronRight,
  Check,
  Minus,
} from "lucide-react";
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

/**
 * 행 선택 옵션. 지정 시 첫 열에 체크박스가 자동 노출되고,
 * 선택된 row 있을 때 헤더 위에 일괄 액션 영역이 노출됨.
 *
 * SelectableTable wrapper에서 state를 내장해서 더 간단히 쓸 수 있음.
 */
export interface DataTableSelection<T> {
  /** 선택된 row 키 (controlled) */
  selectedKeys: string[];
  /** 선택 변경 콜백 */
  onSelectionChange: (selectedKeys: string[]) => void;
  /**
   * row → 선택용 unique key. 미지정 시 DataTable의 rowKey 사용.
   * rowKey도 없으면 index 기반(권장하지 않음 — sort/filter 시 일관성 깨짐).
   */
  selectKey?: (row: T, i: number) => string;
  /** 일괄 액션 영역 — N개 선택 시 노출. 함수 형태면 선택 키 배열 받음. */
  bulkActions?: React.ReactNode | ((selectedKeys: string[]) => React.ReactNode);
  /** 'N개 선택됨' 카운트 표시 (default true) */
  showCount?: boolean;
}

/**
 * 행 펼침 옵션. 지정 시 첫 컬럼에 chevron 버튼 자동 노출,
 * 클릭 시 다음 줄에 renderExpanded 결과를 colSpan으로 출력.
 */
export interface DataTableExpansion<T> {
  /** 펼쳐진 row 키 (controlled) */
  expandedKeys: string[];
  /** 펼침 변경 콜백 */
  onExpandedChange: (expandedKeys: string[]) => void;
  /** 펼침용 unique key. 미지정 시 rowKey 사용. */
  expandKey?: (row: T, i: number) => string;
  /** 펼침 영역 렌더러 */
  renderExpanded: (row: T) => React.ReactNode;
  /**
   * 한 번에 하나만 펼침 (accordion). default false (다중).
   * true면 다른 행 펼칠 때 기존 펼침 자동 닫힘.
   */
  single?: boolean;
  /** 행 자체 클릭으로도 toggle 가능 (default false — chevron만) */
  toggleOnRowClick?: boolean;
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
  /** 행 선택 — 지정 시 체크박스 컬럼 + 일괄 액션 영역 자동. */
  selection?: DataTableSelection<T>;
  /** 행 펼침 — 지정 시 첫 컬럼 chevron + 펼침 영역 자동. */
  expansion?: DataTableExpansion<T>;
  /**
   * 행마다 추가 className. group header / disabled row / 강조 등에 사용.
   * 결과가 빈 문자열 또는 undefined면 무시.
   *
   * @example GroupedTable이 그룹 헤더 행에 별도 톤
   *   rowClassName={(row) => row.kind === "header" ? "bg-zinc-50/60" : ""}
   */
  rowClassName?: (row: T, i: number) => string | undefined;
  /**
   * 한 셀이 colSpan으로 여러 컬럼 차지. 기본 1.
   *
   * 같은 row의 다음 cell들은 자동 skip (예: span=3이면 다음 2개 cell skip).
   * selection/expansion 컬럼은 별도 — getCellSpan은 columns 컬럼만 대상.
   *
   * @example group header row가 첫 컬럼에서 전체 columns 차지
   *   getCellSpan={(row, _i, col) =>
   *     row.kind === "header" && col === 0 ? columns.length : 1
   *   }
   */
  getCellSpan?: (row: T, rowIndex: number, columnIndex: number) => number;
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
  selection,
  expansion,
  rowClassName,
  getCellSpan,
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

  // ── selection 관련 helpers ──────────────────────────────────
  const selectionEnabled = !!selection;
  // 선택 키 생성 — selection.selectKey > rowKey > index 순.
  const getSelectKey = React.useCallback(
    (row: T, i: number): string => {
      if (selection?.selectKey) return selection.selectKey(row, i);
      if (rowKey) return rowKey(row, i);
      return String(i);
    },
    [selection, rowKey]
  );
  const selectedSet = React.useMemo(
    () => new Set(selection?.selectedKeys ?? []),
    [selection?.selectedKeys]
  );
  const allKeys = React.useMemo(
    () => sorted.map((row, i) => getSelectKey(row, i)),
    [sorted, getSelectKey]
  );
  const selectedCount = selectedSet.size;
  const allSelected = selectedCount > 0 && allKeys.every((k) => selectedSet.has(k));
  const someSelected = selectedCount > 0 && !allSelected;

  const toggleAll = () => {
    if (!selection) return;
    if (allSelected) {
      // 전체 해제 — 현재 화면 키만 빼서 다른 페이지 선택 보존
      const remaining = (selection.selectedKeys ?? []).filter(
        (k) => !allKeys.includes(k)
      );
      selection.onSelectionChange(remaining);
    } else {
      const next = new Set(selection.selectedKeys ?? []);
      allKeys.forEach((k) => next.add(k));
      selection.onSelectionChange(Array.from(next));
    }
  };
  const toggleRow = (key: string) => {
    if (!selection) return;
    const next = new Set(selection.selectedKeys ?? []);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    selection.onSelectionChange(Array.from(next));
  };

  // ── expansion 관련 helpers ──────────────────────────────────
  const expansionEnabled = !!expansion;
  const getExpandKey = React.useCallback(
    (row: T, i: number): string => {
      if (expansion?.expandKey) return expansion.expandKey(row, i);
      if (rowKey) return rowKey(row, i);
      return String(i);
    },
    [expansion, rowKey]
  );
  const expandedSet = React.useMemo(
    () => new Set(expansion?.expandedKeys ?? []),
    [expansion?.expandedKeys]
  );
  const toggleExpand = (key: string) => {
    if (!expansion) return;
    const current = expansion.expandedKeys ?? [];
    if (current.includes(key)) {
      expansion.onExpandedChange(current.filter((k) => k !== key));
    } else {
      expansion.onExpandedChange(
        expansion.single ? [key] : [...current, key]
      );
    }
  };

  const totalCols =
    columns.length + (selectionEnabled ? 1 : 0) + (expansionEnabled ? 1 : 0);
  const bulkActionsNode =
    selection?.bulkActions && selectedCount > 0
      ? typeof selection.bulkActions === "function"
        ? selection.bulkActions(selection.selectedKeys)
        : selection.bulkActions
      : null;
  const showCount = selection?.showCount !== false;

  return (
    <div
      data-anti-card="data-table"
      data-density={density}
      data-selectable={selectionEnabled ? "true" : undefined}
      data-expandable={expansionEnabled ? "true" : undefined}
      className={cn("w-full overflow-x-auto", className)}
      {...props}
    >
      {/* 일괄 액션 영역 — selection mode + 선택된 row 있을 때만 노출.
          헤어라인 톤 유지 (shadow X, border-b 1px). */}
      {selectionEnabled && selectedCount > 0 && (
        <div className="flex items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-50/60 px-3 py-2 text-[12.5px] dark:border-white/[0.08] dark:bg-white/[0.02]">
          {showCount ? (
            <span className="font-mono tabular-nums text-zinc-600 dark:text-zinc-300">
              {selectedCount}개 선택됨
            </span>
          ) : (
            <span />
          )}
          {bulkActionsNode && (
            <div className="flex items-center gap-2">{bulkActionsNode}</div>
          )}
        </div>
      )}
      <table className="w-full text-[13.5px]">
        {caption && (
          <caption className="mb-2 text-left text-[11.5px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-500">
            {caption}
          </caption>
        )}
        <thead>
          <tr className="border-b border-zinc-200 dark:border-white/[0.08]">
            {expansionEnabled && (
              <th
                scope="col"
                className={cn("w-[32px] px-2", cellPadding)}
                aria-hidden
              />
            )}
            {selectionEnabled && (
              <th
                scope="col"
                className={cn("w-[36px] px-3", cellPadding)}
                aria-label="전체 선택"
              >
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={
                    allSelected ? "true" : someSelected ? "mixed" : "false"
                  }
                  onClick={toggleAll}
                  className={cn(
                    "inline-flex h-4 w-4 items-center justify-center rounded border transition-colors",
                    allSelected || someSelected
                      ? "border-emerald-500 bg-emerald-500 text-white dark:border-emerald-400 dark:bg-emerald-400 dark:text-zinc-950"
                      : "border-zinc-300 hover:border-zinc-500 dark:border-white/20 dark:hover:border-white/40"
                  )}
                >
                  {allSelected && <Check className="h-3 w-3" strokeWidth={2.5} />}
                  {someSelected && <Minus className="h-3 w-3" strokeWidth={2.5} />}
                </button>
              </th>
            )}
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
                colSpan={totalCols}
                className="py-10 text-center text-[13.5px] text-zinc-500 dark:text-zinc-500"
              >
                {empty}
              </td>
            </tr>
          )}
          {sorted.map((row, i) => {
            const key = rowKey ? rowKey(row, i) : String(i);
            const selKey = getSelectKey(row, i);
            const isSelected = selectedSet.has(selKey);
            const expKey = getExpandKey(row, i);
            const isExpanded = expandedSet.has(expKey);
            const rowInteractive =
              !!onRowClick ||
              (expansionEnabled && expansion?.toggleOnRowClick);
            const handleRowClick = () => {
              if (expansion?.toggleOnRowClick) toggleExpand(expKey);
              if (onRowClick) onRowClick(row);
            };
            return (
              <React.Fragment key={key}>
              <tr
                onClick={rowInteractive ? handleRowClick : undefined}
                className={cn(
                  "border-b border-zinc-200/70 dark:border-white/[0.04]",
                  rowInteractive &&
                    "cursor-pointer transition-colors hover:bg-zinc-50 dark:hover:bg-white/[0.02]",
                  isSelected && "bg-emerald-50/40 dark:bg-emerald-500/[0.04]",
                  isExpanded && "bg-zinc-50/60 dark:bg-white/[0.02]",
                  rowClassName?.(row, i)
                )}
              >
                {expansionEnabled && (
                  <td
                    className={cn("w-[32px] px-2", cellPadding)}
                    onClick={(e) => e.stopPropagation() /* 행 onClick 분리 */}
                  >
                    <button
                      type="button"
                      onClick={() => toggleExpand(expKey)}
                      aria-expanded={isExpanded}
                      aria-label={isExpanded ? "닫기" : "열기"}
                      className="inline-flex h-5 w-5 items-center justify-center rounded text-zinc-500 transition-colors hover:bg-zinc-200/50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/[0.06] dark:hover:text-zinc-100"
                    >
                      <ChevronRight
                        className={cn(
                          "h-3.5 w-3.5 transition-transform",
                          isExpanded && "rotate-90"
                        )}
                        strokeWidth={1.8}
                      />
                    </button>
                  </td>
                )}
                {selectionEnabled && (
                  <td
                    className={cn("w-[36px] px-3", cellPadding)}
                    onClick={(e) => e.stopPropagation() /* 행 onClick과 분리 */}
                  >
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={isSelected}
                      aria-label={`${i + 1}번 행 선택`}
                      onClick={() => toggleRow(selKey)}
                      className={cn(
                        "inline-flex h-4 w-4 items-center justify-center rounded border transition-colors",
                        isSelected
                          ? "border-emerald-500 bg-emerald-500 text-white dark:border-emerald-400 dark:bg-emerald-400 dark:text-zinc-950"
                          : "border-zinc-300 hover:border-zinc-500 dark:border-white/20 dark:hover:border-white/40"
                      )}
                    >
                      {isSelected && <Check className="h-3 w-3" strokeWidth={2.5} />}
                    </button>
                  </td>
                )}
                {(() => {
                  // colSpan + skip 처리 — 한 row 안에서 이전 cell이 span으로
                  // 차지한 컬럼은 render skip.
                  let skipCount = 0;
                  return columns.map((c, ci) => {
                    if (skipCount > 0) {
                      skipCount--;
                      return null;
                    }
                    const span = getCellSpan?.(row, i, ci) ?? 1;
                    if (span > 1) skipCount = span - 1;
                    const alignCls =
                      c.align === "right"
                        ? "text-right"
                        : c.align === "center"
                        ? "text-center"
                        : "text-left";
                    return (
                      <td
                        key={c.key}
                        colSpan={span > 1 ? span : undefined}
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
                  });
                })()}
              </tr>
              {expansionEnabled && isExpanded && (
                <tr
                  data-anti-card="data-table-expanded"
                  className="border-b border-zinc-200/70 bg-zinc-50/60 dark:border-white/[0.04] dark:bg-white/[0.02]"
                >
                  <td colSpan={totalCols} className="px-3 py-4">
                    {expansion?.renderExpanded(row)}
                  </td>
                </tr>
              )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
