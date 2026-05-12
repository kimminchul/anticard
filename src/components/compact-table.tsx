"use client";
import * as React from "react";
import { cn } from "../utils/cn";
import { DataTable, type DataTableProps } from "./data-table";

export interface CompactTableProps<T> extends DataTableProps<T> {
  /**
   * 폰트 — default mono.
   * - `mono`: ui-monospace (로그·JSON·디버깅 뷰)
   * - `sans`: 일반 sans-serif (정보 밀도만 높이고 싶을 때)
   */
  font?: "mono" | "sans";
  /** 행 hover 강조 (default true) — 로그 뷰에서 false로 끄면 깔끔. */
  hoverable?: boolean;
}

/**
 * CompactTable — 매우 좁은 행 간격 + 작은 폰트 + monospace 표.
 *
 * 로그 뷰어 / 시스템 데이터 / JSON 행 / 디버깅 정보처럼 정보 밀도가 중요하고
 * 시각 장식이 방해되는 표에 적합. 안티 카드 헤어라인 톤은 유지.
 *
 * 강제되는 차이:
 * - density='tight' (행 간격 최소)
 * - 폰트 12px (vs 기본 13.5px)
 * - 헤더 10.5px smallcaps
 * - font='mono'(default): ui-monospace로 자릿수·코드·timestamp 정렬 안정
 *
 * @example 로그 뷰어
 *   <CompactTable<LogEntry>
 *     data={logs}
 *     columns={[
 *       { key: "ts", header: "TIME", width: "w-[160px]" },
 *       { key: "level", header: "LV", width: "w-[60px]" },
 *       { key: "msg", header: "MESSAGE" },
 *     ]}
 *   />
 */
export function CompactTable<T>({
  font = "mono",
  hoverable = true,
  className,
  ...rest
}: CompactTableProps<T>) {
  return (
    <DataTable<T>
      {...rest}
      density="tight"
      className={cn(
        // 표 본문 12px, 헤더 10.5px — 정보 밀도 우선
        "[&_table]:text-[12px] [&_th]:text-[10.5px]",
        // 컬럼 패딩 — px-2.5로 좁힘 (기본 px-3보다 더 압축)
        "[&_th]:!px-2.5 [&_td]:!px-2.5",
        font === "mono" && "[&_table]:font-mono [&_td]:tabular-nums",
        !hoverable && "[&_tbody_tr]:!cursor-default [&_tbody_tr]:!bg-transparent",
        className
      )}
    />
  );
}
