import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "../utils/cn";

export interface BreadcrumbItem {
  label: React.ReactNode;
  /** 마지막 항목은 보통 href 없음 (현재 페이지) */
  href?: string;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  /** 구분 기호. default = ChevronRight */
  separator?: React.ReactNode;
}

/**
 * Breadcrumb — 사용자 위치 표시.
 *
 * 안티 카드 톤: 12.5px, smallcaps 톤은 아니지만 본문보다 흐림.
 * 마지막 항목은 자동으로 진한 색 + aria-current="page".
 *
 * @example
 *   <Breadcrumb items={[
 *     { label: "Home", href: "/" },
 *     { label: "Lab", href: "/lab" },
 *     { label: "안티 카드" },
 *   ]} />
 */
export function Breadcrumb({ items, separator, className, ...props }: BreadcrumbProps) {
  return (
    <nav
      aria-label="breadcrumb"
      data-anti-card="breadcrumb"
      className={cn("text-[12.5px]", className)}
      {...props}
    >
      <ol className="flex flex-wrap items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="inline-flex items-center gap-1.5">
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  {item.label}
                </a>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? "font-medium text-zinc-900 dark:text-zinc-100" : ""}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span aria-hidden className="opacity-60">
                  {separator ?? <ChevronRight className="h-3 w-3" />}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
