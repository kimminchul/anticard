"use client";
import * as React from "react";
import { cn } from "../utils/cn";

export interface TabItem {
  id: string;
  label: React.ReactNode;
  panel: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TabItem[];
  /** 시작 활성 탭 — 미지정 시 첫 항목 */
  defaultActiveId?: string;
  /** 시각:
   *  - "line"  (default): 하단 헤어라인 + 활성 emerald 언더라인
   *  - "pills" : Pill 스타일 (rounded-md + active emerald 배경)
   */
  variant?: "line" | "pills";
}

/**
 * Tabs — 탭 메뉴.
 *
 * 안티 카드 톤:
 * - line variant = 박스 거부 (1px 헤어라인 + 활성 emerald 1px)
 * - pills variant = Pill 컴포넌트와 동일 톤
 *
 * 접근성: role=tablist/tab/tabpanel + aria-selected/aria-controls/id 자동.
 * 키보드: 네이티브 button focus 동작 (← → 화살표 추가는 별도 hook 권장).
 *
 * @example
 *   <Tabs items={[
 *     { id: "overview", label: "개요", panel: <p>...</p> },
 *     { id: "spec", label: "스펙", panel: <p>...</p> },
 *   ]} />
 */
export function Tabs({
  items,
  defaultActiveId,
  variant = "line",
  className,
  ...props
}: TabsProps) {
  const [activeId, setActiveId] = React.useState(
    defaultActiveId ?? items[0]?.id
  );
  const active = items.find((it) => it.id === activeId);

  return (
    <div
      data-anti-card="tabs"
      data-variant={variant}
      className={cn(className)}
      {...props}
    >
      <div
        role="tablist"
        className={cn(
          variant === "line" &&
            "flex flex-wrap border-b border-zinc-200 dark:border-white/[0.08]",
          variant === "pills" && "flex flex-wrap gap-1.5"
        )}
      >
        {items.map((it) => {
          const isActive = it.id === activeId;
          return (
            <button
              key={it.id}
              role="tab"
              type="button"
              id={`tab-${it.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${it.id}`}
              tabIndex={isActive ? 0 : -1}
              disabled={it.disabled}
              onClick={() => !it.disabled && setActiveId(it.id)}
              className={cn(
                "transition-colors disabled:cursor-not-allowed disabled:opacity-50",
                variant === "line" && [
                  "relative px-3 py-2.5 text-[13.5px]",
                  isActive
                    ? "text-emerald-700 dark:text-emerald-400"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100",
                ],
                variant === "pills" && [
                  "rounded-md border px-3 py-1.5 text-[13px]",
                  isActive
                    ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400/50 dark:text-emerald-400"
                    : "border-transparent text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-white/[0.04]",
                ]
              )}
            >
              {it.label}
              {variant === "line" && isActive && (
                <span
                  aria-hidden
                  className="absolute inset-x-2 -bottom-px h-px bg-emerald-500 dark:bg-emerald-400"
                />
              )}
            </button>
          );
        })}
      </div>
      {active && (
        <div
          // key 변경 시 React가 unmount/remount → animate-anti-fade-in 재실행
          key={active.id}
          role="tabpanel"
          id={`panel-${active.id}`}
          aria-labelledby={`tab-${active.id}`}
          className="pt-5 animate-anti-fade-in-fast"
        >
          {active.panel}
        </div>
      )}
    </div>
  );
}
