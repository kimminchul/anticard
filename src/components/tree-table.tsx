"use client";
import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "../utils/cn";
import {
  DataTable,
  type DataTableProps,
  type DataTableColumn,
} from "./data-table";

export interface TreeTableProps<T>
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
  /** 트리 노드 배열 (루트). */
  data: T[];
  /** 자식 노드 추출 (없거나 빈 배열이면 leaf) */
  getChildren: (row: T) => T[] | undefined;
  /** 노드의 unique key. 부모 key와 인덱스를 받아 안정적 키 생성 권장. */
  rowKey: (row: T, parentKey: string, i: number) => string;
  /** 표 컬럼. 첫 컬럼이 indent + chevron 자동 부여됨. */
  columns: DataTableColumn<T>[];
  /** 행 클릭 (인터랙티브 행) */
  onRowClick?: (row: T) => void;
  /** 초기 펼친 노드 키 (uncontrolled). */
  defaultExpandedKeys?: string[];
  /** controlled 펼친 키. */
  expandedKeys?: string[];
  /** 펼침 변경 콜백 */
  onExpandedChange?: (expandedKeys: string[]) => void;
  /** indent 단위 px (default 18). 깊이당 추가 padding. */
  indentSize?: number;
}

interface FlatRow<T> {
  data: T;
  key: string;
  depth: number;
  hasChildren: boolean;
}

function flattenTree<T>(
  nodes: T[],
  getChildren: (row: T) => T[] | undefined,
  keyFn: (row: T, parentKey: string, i: number) => string,
  expanded: Set<string>,
  depth: number,
  parentKey: string
): FlatRow<T>[] {
  const out: FlatRow<T>[] = [];
  nodes.forEach((node, i) => {
    const key = keyFn(node, parentKey, i);
    const children = getChildren(node);
    const hasChildren = !!children && children.length > 0;
    out.push({ data: node, key, depth, hasChildren });
    if (hasChildren && expanded.has(key)) {
      out.push(
        ...flattenTree(children!, getChildren, keyFn, expanded, depth + 1, key)
      );
    }
  });
  return out;
}

/**
 * TreeTable — 계층 구조를 표로 (indent + chevron + 노드별 펼침).
 *
 * 첫 컬럼이 자동으로 indent + chevron 부여되어 부모/자식 관계가 시각적으로
 * 표현됨. leaf 노드는 chevron 자리에 빈 공간만 유지하여 정렬 안정.
 *
 * @example 파일 트리 / 카테고리 트리 / 조직도
 *   <TreeTable<Node>
 *     data={tree}
 *     getChildren={(n) => n.children}
 *     rowKey={(n) => String(n.id)}
 *     defaultExpandedKeys={["root"]}
 *     columns={[
 *       { key: "name", header: "이름" },
 *       { key: "size", header: "크기", align: "right" },
 *     ]}
 *   />
 */
export function TreeTable<T>({
  data,
  getChildren,
  rowKey,
  columns,
  onRowClick,
  defaultExpandedKeys = [],
  expandedKeys: expandedKeysProp,
  onExpandedChange,
  indentSize = 18,
  ...rest
}: TreeTableProps<T>) {
  const [internalKeys, setInternalKeys] =
    React.useState<string[]>(defaultExpandedKeys);
  const isControlled = expandedKeysProp !== undefined;
  const expandedKeys = isControlled ? expandedKeysProp : internalKeys;
  const expandedSet = React.useMemo(
    () => new Set(expandedKeys),
    [expandedKeys]
  );

  const toggle = (key: string) => {
    const next = expandedKeys.includes(key)
      ? expandedKeys.filter((k) => k !== key)
      : [...expandedKeys, key];
    if (!isControlled) setInternalKeys(next);
    onExpandedChange?.(next);
  };

  // 평탄화 (depth 누적)
  const flat = React.useMemo(
    () => flattenTree(data, getChildren, rowKey, expandedSet, 0, ""),
    [data, getChildren, rowKey, expandedSet]
  );

  // 첫 컬럼에만 indent + chevron 부여. 나머지는 원본 cell 호출.
  const wrappedColumns: DataTableColumn<FlatRow<T>>[] = columns.map(
    (col, colIndex) => ({
      key: col.key,
      header: col.header,
      width: col.width,
      align: col.align,
      sortable: false, // 트리 컨텍스트에서 정렬은 계층 깨뜨려 비활성
      cell: (row, i) => {
        const original = col.cell;
        const valueNode = original
          ? original(row.data, i)
          : ((row.data as Record<string, React.ReactNode>)[col.key] ?? null);

        if (colIndex !== 0) return valueNode;

        // 첫 컬럼 — indent + chevron(leaf면 빈 자리)
        const padLeft = row.depth * indentSize;
        return (
          <span
            className="inline-flex items-center gap-1"
            style={{ paddingLeft: `${padLeft}px` }}
          >
            {row.hasChildren ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(row.key);
                }}
                aria-expanded={expandedSet.has(row.key)}
                aria-label={
                  expandedSet.has(row.key) ? "접기" : "펼치기"
                }
                className="inline-flex h-4 w-4 items-center justify-center rounded text-zinc-500 transition-colors hover:bg-zinc-200/50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/[0.06] dark:hover:text-zinc-100"
              >
                <ChevronRight
                  className={cn(
                    "h-3 w-3 transition-transform",
                    expandedSet.has(row.key) && "rotate-90"
                  )}
                  strokeWidth={1.8}
                />
              </button>
            ) : (
              // leaf — chevron 자리에 빈 공간 (16px) 유지로 컬럼 정렬 안정
              <span className="inline-block h-4 w-4" aria-hidden />
            )}
            <span>{valueNode}</span>
          </span>
        );
      },
    })
  );

  return (
    <DataTable<FlatRow<T>>
      {...rest}
      data={flat}
      columns={wrappedColumns}
      rowKey={(r) => r.key}
      onRowClick={onRowClick ? (r) => onRowClick(r.data) : undefined}
    />
  );
}
