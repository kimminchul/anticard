import * as React from "react";
import { cn } from "../utils/cn";

export interface CompareColumn {
  /** 컬럼 헤더 (예: "Free", "Pro") */
  name: React.ReactNode;
  /** 강조 컬럼 (살짝 emerald) */
  highlighted?: boolean;
}

export interface CompareRow {
  /** 행 라벨 (예: "API 호출 / 월") */
  feature: React.ReactNode;
  /** 보조 설명 (작은 글씨) */
  hint?: React.ReactNode;
  /** 각 컬럼별 값 — boolean(✓/-)도 OK */
  values: Array<React.ReactNode | boolean>;
}

export interface CompareTableProps extends React.HTMLAttributes<HTMLTableElement> {
  columns: CompareColumn[];
  rows: CompareRow[];
}

/**
 * CompareTable — 기능·플랜 비교 표.
 *
 * 박스 거부 — 헤어라인 only. boolean 값은 ✓/− 자동.
 *
 * @example
 *   <CompareTable
 *     columns={[
 *       { name: "Free" },
 *       { name: "Pro", highlighted: true },
 *       { name: "Team" },
 *     ]}
 *     rows={[
 *       { feature: "API 호출 / 월", values: ["1,000", "100,000", "Unlimited"] },
 *       { feature: "팀 멤버", values: [false, "5", "Unlimited"] },
 *     ]}
 *   />
 */
export function CompareTable({
  columns,
  rows,
  className,
  ...props
}: CompareTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table
        data-anti-card="compare-table"
        className={cn("w-full text-left text-[14px]", className)}
        {...props}
      >
        <thead>
          <tr className="border-y border-zinc-200 dark:border-white/[0.06]">
            <th className="py-4 pr-4 text-[12px] uppercase tracking-[0.08em] font-medium text-zinc-500 dark:text-zinc-400">
              Feature
            </th>
            {columns.map((col, i) => (
              <th
                key={i}
                className={cn(
                  "py-4 pr-4 text-[12px] uppercase tracking-[0.08em] font-medium",
                  col.highlighted
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-zinc-500 dark:text-zinc-400"
                )}
              >
                {col.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-white/[0.06]">
          {rows.map((row, i) => (
            <tr key={i}>
              <th
                scope="row"
                className="py-4 pr-4 align-top font-medium text-zinc-900 dark:text-zinc-100"
              >
                <div>{row.feature}</div>
                {row.hint && (
                  <div className="mt-1 text-[12.5px] font-normal text-zinc-500 dark:text-zinc-400">
                    {row.hint}
                  </div>
                )}
              </th>
              {row.values.map((v, j) => (
                <td
                  key={j}
                  className={cn(
                    "py-4 pr-4 align-top",
                    columns[j]?.highlighted
                      ? "text-zinc-900 dark:text-zinc-50"
                      : "text-zinc-700 dark:text-zinc-300"
                  )}
                >
                  {v === true ? (
                    <span className="text-emerald-600 dark:text-emerald-400" aria-label="포함">
                      ✓
                    </span>
                  ) : v === false ? (
                    <span className="text-zinc-300 dark:text-zinc-600" aria-label="미포함">
                      −
                    </span>
                  ) : (
                    v
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
