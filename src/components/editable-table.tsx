"use client";
import * as React from "react";
import { Check, X } from "lucide-react";
import { cn } from "../utils/cn";
import { DataTable, type DataTableProps, type DataTableColumn } from "./data-table";

/**
 * EditableTable의 컬럼 정의 — DataTableColumn 확장.
 *
 * `editable: true` 컬럼은 셀 클릭 시 inline input으로 전환되고,
 * Enter / blur로 저장, Esc로 취소.
 */
export interface EditableTableColumn<T> extends DataTableColumn<T> {
  /** 이 컬럼 inline 편집 활성 (default false) */
  editable?: boolean;
  /** input type — default 'text'. number면 type=number로 렌더. */
  editorType?: "text" | "number";
  /** 셀 값을 string으로 변환 (default: String(row[key])) */
  toEditValue?: (row: T) => string;
}

export interface EditableTableProps<T>
  extends Omit<DataTableProps<T>, "columns"> {
  columns: EditableTableColumn<T>[];
  /** 행 unique key — editable에서는 필수. 셀 편집 상태 추적용. */
  rowKey: (row: T, i: number) => string;
  /**
   * 셀 저장 콜백. 사용자가 Enter/blur로 commit하면 호출.
   * 부모는 이 콜백에서 데이터 업데이트 + 영속 처리.
   * @param row 원본 row
   * @param colKey 컬럼 key
   * @param newValue 새 문자열 값 (number editor도 string으로 — 부모가 parseFloat)
   */
  onCellSave: (row: T, colKey: string, newValue: string) => void;
}

/**
 * EditableTable — DataTable + inline 셀 편집.
 *
 * 셀 클릭 → input으로 전환. Enter / blur로 저장, Esc로 취소.
 * editable=true 컬럼만 편집 가능. 다른 컬럼은 일반 표시.
 *
 * 안티 카드 톤: input은 1px 헤어라인 + emerald focus ring. shadow X.
 * 편집 중인 셀은 emerald accent ring으로 표시.
 *
 * @example
 *   <EditableTable
 *     data={rows}
 *     rowKey={(r) => String(r.id)}
 *     columns={[
 *       { key: "name", header: "이름", editable: true, sortable: true },
 *       { key: "price", header: "가격", editable: true, editorType: "number", align: "right" },
 *       { key: "status", header: "상태" },
 *     ]}
 *     onCellSave={(row, key, value) =>
 *       updateRow(row.id, { [key]: key === "price" ? Number(value) : value })
 *     }
 *   />
 */
export function EditableTable<T>({
  columns,
  rowKey,
  onCellSave,
  ...rest
}: EditableTableProps<T>) {
  const [editing, setEditing] = React.useState<{
    rowKey: string;
    colKey: string;
  } | null>(null);
  const [draft, setDraft] = React.useState<string>("");

  const commit = (row: T, colKey: string) => {
    onCellSave(row, colKey, draft);
    setEditing(null);
    setDraft("");
  };
  const cancel = () => {
    setEditing(null);
    setDraft("");
  };

  // 각 column의 cell render를 wrapping — editable 컬럼만 inline editor 분기
  const wrappedColumns: DataTableColumn<T>[] = columns.map((col) => {
    if (!col.editable) {
      // 비편집 컬럼 — 그대로 전달 (editable/editorType/toEditValue는 DataTable이 무시)
      return col;
    }
    const original = col.cell;
    return {
      ...col,
      cell: (row, i) => {
        const rk = rowKey(row, i);
        const isEditing = editing?.rowKey === rk && editing?.colKey === col.key;
        const displayValue = original
          ? original(row, i)
          : ((row as Record<string, React.ReactNode>)[col.key] ?? null);

        if (isEditing) {
          return (
            <span className="inline-flex items-center gap-1">
              <input
                autoFocus
                type={col.editorType === "number" ? "number" : "text"}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onBlur={() => commit(row, col.key)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    commit(row, col.key);
                  } else if (e.key === "Escape") {
                    e.preventDefault();
                    cancel();
                  }
                }}
                className={cn(
                  "w-full rounded-sm border border-emerald-500 bg-white px-1.5 py-0.5 text-[13.5px] text-zinc-900 outline-none ring-2 ring-emerald-500/15 dark:bg-zinc-950 dark:text-zinc-100",
                  col.align === "right" && "text-right",
                  col.align === "center" && "text-center"
                )}
              />
              {/* 저장/취소 아이콘 — 모바일 등 blur 발화 어려울 때 mousedown 사용 */}
              <button
                type="button"
                aria-label="저장"
                onMouseDown={(e) => {
                  e.preventDefault();
                  commit(row, col.key);
                }}
                className="inline-flex h-4 w-4 items-center justify-center rounded text-emerald-600 transition-colors hover:bg-emerald-500/10 dark:text-emerald-400"
              >
                <Check className="h-3 w-3" strokeWidth={2.5} />
              </button>
              <button
                type="button"
                aria-label="취소"
                onMouseDown={(e) => {
                  e.preventDefault();
                  cancel();
                }}
                className="inline-flex h-4 w-4 items-center justify-center rounded text-zinc-400 transition-colors hover:bg-zinc-200/50 hover:text-zinc-700 dark:hover:bg-white/[0.06] dark:hover:text-zinc-200"
              >
                <X className="h-3 w-3" strokeWidth={2.5} />
              </button>
            </span>
          );
        }

        const currentEditValue = col.toEditValue
          ? col.toEditValue(row)
          : String((row as Record<string, unknown>)[col.key] ?? "");

        return (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setEditing({ rowKey: rk, colKey: col.key });
              setDraft(currentEditValue);
            }}
            className={cn(
              "group inline-flex w-full items-center gap-1 rounded-sm border border-transparent px-1 py-0.5 text-left transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:hover:border-white/15 dark:hover:bg-white/[0.03]",
              col.align === "right" && "justify-end text-right",
              col.align === "center" && "justify-center text-center"
            )}
            title="클릭으로 편집"
          >
            <span className={cn(!displayValue && "text-zinc-400 dark:text-zinc-500")}>
              {displayValue || "(편집)"}
            </span>
          </button>
        );
      },
    };
  });

  return <DataTable<T> {...rest} columns={wrappedColumns} rowKey={rowKey} />;
}
