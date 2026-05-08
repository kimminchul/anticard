"use client";
import * as React from "react";
import { cn } from "../utils/cn";

export interface DropdownItem {
  /** 표시 라벨 */
  label: React.ReactNode;
  /** 클릭 시 — onClick 또는 href 중 하나 사용 */
  onClick?: () => void;
  href?: string;
  /** 외부 링크 */
  external?: boolean;
  /** 위험 액션 (삭제 등) — 빨간색 */
  danger?: boolean;
  /** 비활성 */
  disabled?: boolean;
  /** 좌측 작은 아이콘 */
  icon?: React.ReactNode;
  /** 이 항목 위에 구분선 */
  separator?: boolean;
}

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 트리거 요소 (button 권장) */
  trigger: React.ReactNode;
  items: DropdownItem[];
  /** 정렬 — start = trigger 좌측 / end = trigger 우측 */
  align?: "start" | "end";
}

/**
 * Dropdown — 드롭다운 메뉴.
 *
 * 안티 카드 톤: shadow X, 헤어라인 1px, 작은 padding.
 * 외부 클릭·ESC 키로 자동 닫힘.
 *
 * @example
 *   <Dropdown
 *     trigger={<Button variant="ghost">메뉴</Button>}
 *     items={[
 *       { label: "편집", onClick: () => edit() },
 *       { label: "공유하기", href: "/share" },
 *       { label: "삭제", onClick: () => del(), danger: true, separator: true },
 *     ]}
 *     align="end"
 *   />
 */
export function Dropdown({
  trigger,
  items,
  align = "start",
  className,
  ...props
}: DropdownProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const clickHandler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", clickHandler);
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("mousedown", clickHandler);
      document.removeEventListener("keydown", keyHandler);
    };
  }, [open]);

  const itemBase =
    "flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13.5px] transition-colors disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div
      ref={ref}
      data-anti-card="dropdown"
      data-state={open ? "open" : "closed"}
      className={cn("relative inline-flex", className)}
      {...props}
    >
      <span onClick={() => setOpen((v) => !v)}>{trigger}</span>
      {open && (
        <div
          role="menu"
          className={cn(
            "absolute top-full z-50 mt-1.5 min-w-[180px] rounded-md border border-zinc-200 bg-white py-1 dark:border-white/[0.12] dark:bg-zinc-900",
            align === "start" && "left-0",
            align === "end" && "right-0"
          )}
        >
          {items.map((it, i) => {
            const cls = cn(
              itemBase,
              it.danger
                ? "text-red-600 hover:bg-red-500/[0.08] dark:text-red-400 dark:hover:bg-red-400/[0.08]"
                : "text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-white/[0.04]"
            );
            const inner = (
              <>
                {it.icon && (
                  <span aria-hidden className="shrink-0 text-zinc-500 dark:text-zinc-400">
                    {it.icon}
                  </span>
                )}
                <span>{it.label}</span>
              </>
            );
            return (
              <React.Fragment key={i}>
                {it.separator && (
                  <div
                    role="separator"
                    aria-hidden
                    className="my-1 h-px bg-zinc-200 dark:bg-white/[0.06]"
                  />
                )}
                {it.href ? (
                  <a
                    href={it.href}
                    role="menuitem"
                    target={it.external ? "_blank" : undefined}
                    rel={it.external ? "noopener noreferrer" : undefined}
                    onClick={() => setOpen(false)}
                    className={cls}
                  >
                    {inner}
                  </a>
                ) : (
                  <button
                    type="button"
                    role="menuitem"
                    disabled={it.disabled}
                    onClick={() => {
                      it.onClick?.();
                      setOpen(false);
                    }}
                    className={cls}
                  >
                    {inner}
                  </button>
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
}
