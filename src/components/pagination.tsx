import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../utils/cn";

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** 현재 페이지 양 옆에 노출할 페이지 수. default 1 */
  siblings?: number;
}

/**
 * Pagination — 페이지네이션.
 *
 * 안티 카드 톤: shadcn처럼 채움 X. 헤어라인 박스 + 활성만 emerald 배경.
 * 페이지 수 적으면 모두, 많으면 1 ... siblings ... last 형태.
 *
 * @example
 *   <Pagination
 *     currentPage={5}
 *     totalPages={20}
 *     onPageChange={(p) => setPage(p)}
 *   />
 */
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblings = 1,
  className,
  ...props
}: PaginationProps) {
  const pages = computePageRange(currentPage, totalPages, siblings);
  const baseBtn =
    "inline-flex h-8 min-w-8 items-center justify-center rounded-md border px-2 text-[13px] tabular-nums transition-colors";
  const inactiveBtn =
    "border-zinc-200 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 dark:border-white/[0.08] dark:text-zinc-300 dark:hover:border-white/[0.15] dark:hover:bg-white/[0.03]";
  const activeBtn =
    "border-emerald-500/50 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400/50 dark:text-emerald-400";
  const navBtn = cn(baseBtn, inactiveBtn, "disabled:cursor-not-allowed disabled:opacity-40");

  return (
    <nav
      aria-label="pagination"
      data-anti-card="pagination"
      className={cn("flex flex-wrap items-center gap-1.5", className)}
      {...props}
    >
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={navBtn}
        aria-label="이전 페이지"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {pages.map((p, i) =>
        p === "..." ? (
          <span
            key={`gap-${i}`}
            aria-hidden
            className="px-1 text-[13px] text-zinc-400 dark:text-zinc-500"
          >
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            aria-current={p === currentPage ? "page" : undefined}
            aria-label={`페이지 ${p}`}
            className={cn(baseBtn, p === currentPage ? activeBtn : inactiveBtn)}
          >
            {p}
          </button>
        )
      )}
      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={navBtn}
        aria-label="다음 페이지"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}

function computePageRange(
  current: number,
  total: number,
  siblings: number
): (number | "...")[] {
  const range: (number | "...")[] = [];
  const totalWindow = 5 + siblings * 2;
  if (total <= totalWindow) {
    for (let i = 1; i <= total; i++) range.push(i);
    return range;
  }
  const left = Math.max(2, current - siblings);
  const right = Math.min(total - 1, current + siblings);
  range.push(1);
  if (left > 2) range.push("...");
  for (let i = left; i <= right; i++) range.push(i);
  if (right < total - 1) range.push("...");
  range.push(total);
  return range;
}
