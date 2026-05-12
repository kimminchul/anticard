"use client";
import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "../utils/cn";
import {
  DataTable,
  type DataTableProps,
  type DataTableColumn,
} from "./data-table";

export interface GroupedTableProps<T>
  extends Omit<
    DataTableProps<T>,
    | "data"
    | "rowKey"
    | "columns"
    | "onRowClick"
    | "selection"
    | "expansion"
    | "rowClassName"
    | "getCellSpan"
  > {
  data: T[];
  /** 표 컬럼 정의 — DataTable과 동일. 단 그룹 컨텍스트에서 sortable은 자동 비활성 */
  columns: DataTableColumn<T>[];
  /** 그룹 키 추출 (예: row => row.category) */
  groupBy: (row: T) => string;
  /**
   * 그룹 헤더 렌더러. 미지정 시 'group · N건' 형식.
   * @param group 그룹 키
   * @param rows 해당 그룹의 row 배열
   */
  renderGroupHeader?: (group: string, rows: T[]) => React.ReactNode;
  /** 행 unique key — collapse 키 처리에도 사용. default: 그룹키-인덱스 */
  rowKey?: (row: T, i: number) => string;
  /**
   * 그룹별 collapse 활성. default false.
   * true면 그룹 헤더에 chevron + 클릭 시 그룹 row들 숨김/표시.
   */
  collapsible?: boolean;
  /** 초기 collapsed 그룹 키 (collapsible=true 일 때) */
  defaultCollapsedGroups?: string[];
  /** controlled collapsed 그룹 키 */
  collapsedGroups?: string[];
  /** collapsed 변경 콜백 */
  onCollapsedChange?: (collapsedGroups: string[]) => void;
}

/**
 * 내부 단일-row representation — 그룹 헤더와 일반 row를 한 배열로 통합.
 * - kind='header': 그룹 헤더 행. group/rows 보유.
 * - kind='data':   일반 데이터 행. data 보유.
 */
type GroupedRow<T> =
  | { kind: "header"; key: string; group: string; rows: T[] }
  | { kind: "data"; key: string; group: string; data: T };

/**
 * GroupedTable — 그룹 헤더가 중간중간 들어가는 표.
 *
 * 카드 그리드를 거부하고 카테고리·섹터·연도 등으로 묶인 데이터를 행 + 그룹 헤더
 * 만으로 정리. Heritage 페이지의 섹터별 프로젝트, admin의 카테고리별 글 등에 자연.
 *
 * 안티 카드 톤: 그룹 헤더는 smallcaps zinc-500 + border-t 헤어라인. 박스 없음.
 *
 * collapsible=true면 그룹 헤더에 chevron + 클릭으로 그룹 row 숨김/표시.
 *
 * @example
 *   <GroupedTable
 *     data={posts}
 *     groupBy={(p) => p.category}
 *     columns={[
 *       { key: "title", header: "제목", sortable: true },
 *       { key: "publishedAt", header: "발행일", align: "right" },
 *     ]}
 *   />
 *
 * @example collapsible — 그룹별 펼침/접힘
 *   <GroupedTable
 *     collapsible
 *     defaultCollapsedGroups={["Note"]}
 *     groupBy={(p) => p.category}
 *     ...
 *   />
 */
export function GroupedTable<T>({
  data,
  groupBy,
  renderGroupHeader,
  rowKey,
  columns,
  collapsible,
  defaultCollapsedGroups = [],
  collapsedGroups: collapsedGroupsProp,
  onCollapsedChange,
  ...rest
}: GroupedTableProps<T>) {
  // ── collapsed state (uncontrolled / controlled) ─────────────
  const [internalCollapsed, setInternalCollapsed] = React.useState<string[]>(
    defaultCollapsedGroups
  );
  const isControlled = collapsedGroupsProp !== undefined;
  const collapsedGroups = isControlled ? collapsedGroupsProp : internalCollapsed;
  const collapsedSet = React.useMemo(
    () => new Set(collapsedGroups),
    [collapsedGroups]
  );

  const handleToggle = (group: string) => {
    const next = collapsedGroups.includes(group)
      ? collapsedGroups.filter((g) => g !== group)
      : [...collapsedGroups, group];
    if (!isControlled) setInternalCollapsed(next);
    onCollapsedChange?.(next);
  };

  // ── 그룹화 → header + data rows 시퀀스 생성 ─────────────────
  const groupedRows: GroupedRow<T>[] = React.useMemo(() => {
    // 등장 순서 보존 그룹화
    const groups = new Map<string, T[]>();
    data.forEach((row) => {
      const g = groupBy(row);
      const list = groups.get(g) ?? [];
      list.push(row);
      groups.set(g, list);
    });

    const out: GroupedRow<T>[] = [];
    let idx = 0;
    groups.forEach((rows, group) => {
      out.push({ kind: "header", key: `__group__${group}`, group, rows });
      if (!collapsedSet.has(group)) {
        rows.forEach((r) => {
          out.push({
            kind: "data",
            key: rowKey ? rowKey(r, idx) : `${group}-${idx}`,
            group,
            data: r,
          });
          idx++;
        });
      } else {
        // collapsed여도 idx는 증가 (key 안정성)
        idx += rows.length;
      }
    });
    return out;
  }, [data, groupBy, rowKey, collapsedSet]);

  // ── columns wrap — 첫 컬럼 cell에 group header rendering 분기 ──
  // 그룹 헤더 row는 첫 컬럼이 colSpan=columns.length로 전체 행 차지 (DataTable의
  // getCellSpan 사용). 명시 필드만 사용 (sortKey/compare는 keyof T라 호환 X).
  const wrappedColumns: DataTableColumn<GroupedRow<T>>[] = columns.map(
    (col, colIndex) => {
      return {
        key: col.key,
        header: col.header,
        width: col.width,
        align: col.align,
        sortable: false, // 그룹 컨텍스트에서 정렬은 그룹 깨뜨려 비활성
        cell: (row, i) => {
          if (row.kind === "header") {
            // 첫 컬럼만 group header label 렌더. 나머지 컬럼은 getCellSpan 처리로
            // 자동 skip되므로 여기 도달하지 않음 (안전망으로 null 반환).
            if (colIndex !== 0) return null;
            const headerNode = renderGroupHeader
              ? renderGroupHeader(row.group, row.rows)
              : (
                <>
                  {row.group}
                  <span className="ml-2 font-mono tabular-nums text-zinc-400 dark:text-zinc-500">
                    · {row.rows.length}건
                  </span>
                </>
              );
            const isCollapsed = collapsedSet.has(row.group);
            return (
              <span className="flex items-center gap-1.5 text-[11.5px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
                {collapsible && (
                  <button
                    type="button"
                    onClick={() => handleToggle(row.group)}
                    aria-expanded={!isCollapsed}
                    aria-label={isCollapsed ? `${row.group} 펼치기` : `${row.group} 접기`}
                    className="inline-flex h-4 w-4 items-center justify-center rounded transition-colors hover:bg-zinc-200/50 dark:hover:bg-white/[0.06]"
                  >
                    <ChevronRight
                      className={cn(
                        "h-3 w-3 transition-transform",
                        !isCollapsed && "rotate-90"
                      )}
                      strokeWidth={1.8}
                    />
                  </button>
                )}
                {headerNode}
              </span>
            );
          }
          // 일반 데이터 row — 원본 cell 호출 또는 row[key]
          const original = col.cell;
          if (original) return original(row.data, i);
          return (
            (row.data as Record<string, React.ReactNode>)[col.key] ?? null
          );
        },
      };
    }
  );

  return (
    <DataTable<GroupedRow<T>>
      {...rest}
      data={groupedRows}
      columns={wrappedColumns}
      rowKey={(r) => r.key}
      // 그룹 헤더 행 시각 분리 — border-t 헤어라인 강조 + zinc 배경 + 위 간격
      rowClassName={(row) =>
        row.kind === "header"
          ? "!border-t border-zinc-300 bg-zinc-100/50 dark:!border-white/[0.08] dark:bg-white/[0.03]"
          : undefined
      }
      // 그룹 헤더 첫 컬럼이 전체 columns 차지 (colSpan)
      getCellSpan={(row, _i, ci) =>
        row.kind === "header" && ci === 0 ? columns.length : 1
      }
    />
  );
}
