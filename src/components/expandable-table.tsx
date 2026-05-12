"use client";
import * as React from "react";
import { DataTable, type DataTableProps } from "./data-table";

export interface ExpandableTableProps<T>
  extends Omit<DataTableProps<T>, "expansion"> {
  /** 펼침용 unique key. 미지정 시 rowKey 사용, rowKey도 없으면 index 기반. */
  expandKey?: (row: T, i: number) => string;
  /** 초기 펼침 (uncontrolled). */
  defaultExpandedKeys?: string[];
  /** 펼친 row 키 (controlled). 지정 시 onExpandedChange 필수. */
  expandedKeys?: string[];
  /** 펼침 변경 콜백 */
  onExpandedChange?: (expandedKeys: string[]) => void;
  /** 펼침 영역 렌더러 — 행의 상세를 자유롭게 표시 */
  renderExpanded: (row: T) => React.ReactNode;
  /** 한 번에 하나만 펼침 (accordion) */
  single?: boolean;
  /** 행 클릭으로 toggle (default: chevron만) */
  toggleOnRowClick?: boolean;
}

/**
 * ExpandableTable — DataTable + 행 펼침 (chevron + 상세 panel).
 *
 * 행을 펼치면 다음 줄에 colSpan 전체로 상세 영역을 렌더. 카드 그리드 대안 —
 * 표 자체는 좁게 유지하면서 깊은 정보를 같은 줄 컨텍스트에 보여줌.
 *
 * @example admin 글 리스트 — 행 펼침으로 본문 미리보기
 *   <ExpandableTable
 *     data={posts}
 *     columns={[
 *       { key: "title", header: "제목", sortable: true },
 *       { key: "status", header: "상태" },
 *     ]}
 *     expandKey={(p) => String(p.id)}
 *     renderExpanded={(p) => (
 *       <div className="prose-sm">
 *         <p>{p.summary}</p>
 *         <a href={`/admin/posts/${p.id}`}>전체 보기 →</a>
 *       </div>
 *     )}
 *   />
 *
 * @example accordion (한 개만) + 행 클릭으로 toggle
 *   <ExpandableTable
 *     single
 *     toggleOnRowClick
 *     ...
 *   />
 */
export function ExpandableTable<T>({
  defaultExpandedKeys = [],
  expandedKeys: expandedKeysProp,
  onExpandedChange,
  expandKey,
  renderExpanded,
  single,
  toggleOnRowClick,
  ...rest
}: ExpandableTableProps<T>) {
  const [internalKeys, setInternalKeys] =
    React.useState<string[]>(defaultExpandedKeys);

  const isControlled = expandedKeysProp !== undefined;
  const expandedKeys = isControlled ? expandedKeysProp : internalKeys;

  const handleChange = React.useCallback(
    (keys: string[]) => {
      if (!isControlled) setInternalKeys(keys);
      onExpandedChange?.(keys);
    },
    [isControlled, onExpandedChange]
  );

  return (
    <DataTable<T>
      {...rest}
      expansion={{
        expandedKeys,
        onExpandedChange: handleChange,
        expandKey,
        renderExpanded,
        single,
        toggleOnRowClick,
      }}
    />
  );
}
