"use client";
import * as React from "react";
import { DataTable, type DataTableProps } from "./data-table";

export interface SelectableTableProps<T>
  extends Omit<DataTableProps<T>, "selection"> {
  /**
   * 행 선택 키 함수. 미지정 시 rowKey 사용, rowKey도 없으면 index 기반.
   * 정렬·필터 시 일관된 선택 유지를 위해 안정적인 unique key 권장 (DB id 등).
   */
  selectKey?: (row: T, i: number) => string;
  /** 초기 선택 (uncontrolled). */
  defaultSelectedKeys?: string[];
  /** 선택된 row 키 (controlled). 지정 시 onSelectionChange 필수. */
  selectedKeys?: string[];
  /** 선택 변경 콜백 */
  onSelectionChange?: (selectedKeys: string[]) => void;
  /** 일괄 액션 영역 (선택된 row 있을 때 노출). */
  bulkActions?:
    | React.ReactNode
    | ((selectedKeys: string[]) => React.ReactNode);
  /** 'N개 선택됨' 카운트 표시 (default true) */
  showCount?: boolean;
}

/**
 * SelectableTable — DataTable + 행 선택 (체크박스 + 일괄 액션).
 *
 * 안티 카드 톤: 헤어라인 헤더, 선택 시 emerald accent, 일괄 액션 영역은
 * 헤더 위 헤어라인 박스로 부드럽게. shadow X.
 *
 * controlled (`selectedKeys` + `onSelectionChange`) / uncontrolled
 * (`defaultSelectedKeys`) 둘 다 지원.
 *
 * @example uncontrolled — admin 리스트의 일괄 처리
 *   <SelectableTable
 *     data={posts}
 *     columns={[
 *       { key: "title", header: "제목", sortable: true },
 *       { key: "status", header: "상태", sortable: true },
 *     ]}
 *     selectKey={(p) => String(p.id)}
 *     bulkActions={(keys) => (
 *       <>
 *         <button onClick={() => publish(keys)}>일괄 발행</button>
 *         <button onClick={() => trash(keys)}>휴지통</button>
 *       </>
 *     )}
 *   />
 *
 * @example controlled — 상위 컴포넌트가 선택 상태 보유
 *   const [keys, setKeys] = useState<string[]>([]);
 *   <SelectableTable
 *     selectedKeys={keys}
 *     onSelectionChange={setKeys}
 *     ...
 *   />
 */
export function SelectableTable<T>({
  defaultSelectedKeys = [],
  selectedKeys: selectedKeysProp,
  onSelectionChange,
  selectKey,
  bulkActions,
  showCount,
  ...rest
}: SelectableTableProps<T>) {
  const [internalKeys, setInternalKeys] =
    React.useState<string[]>(defaultSelectedKeys);

  const isControlled = selectedKeysProp !== undefined;
  const selectedKeys = isControlled ? selectedKeysProp : internalKeys;

  const handleChange = React.useCallback(
    (keys: string[]) => {
      if (!isControlled) setInternalKeys(keys);
      onSelectionChange?.(keys);
    },
    [isControlled, onSelectionChange]
  );

  return (
    <DataTable<T>
      {...rest}
      selection={{
        selectedKeys,
        onSelectionChange: handleChange,
        selectKey,
        bulkActions,
        showCount,
      }}
    />
  );
}
