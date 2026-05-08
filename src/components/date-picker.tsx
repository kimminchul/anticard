"use client";
import * as React from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "../utils/cn";

export interface DatePickerProps {
  /** 선택된 날짜 — controlled */
  value?: Date | null;
  /** 변경 콜백 */
  onChange?: (date: Date | null) => void;
  /** 처음 열었을 때 보이는 달 */
  defaultViewDate?: Date;
  /** 비활성 날짜 — true면 선택 불가 */
  disabledDate?: (date: Date) => boolean;
  /** 트리거 placeholder */
  placeholder?: string;
  /** 트리거 너비 */
  width?: string;
  /** locale — 요일·월 라벨 */
  locale?: "ko" | "en";
  /** 트리거 비활성화 */
  disabled?: boolean;
  /** input id (htmlFor 매칭용) */
  id?: string;
}

const KO_WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];
const EN_WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const isSameDay = (a: Date | null, b: Date | null) => {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

const fmt = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;

/**
 * DatePicker — Popover 위 캘린더.
 *
 * 안티 카드 톤: shadow X, 1px 헤어라인, smallcaps 요일,
 * emerald 선택일 / emerald-outline 오늘.
 *
 * 키보드: 트리거 focus → Enter/Space로 열기, ESC로 닫기.
 * (날짜 grid 키보드 네비게이션은 단순화 — focus는 마지막 클릭 셀에 머무름)
 *
 * @example
 *   const [date, setDate] = useState<Date | null>(null);
 *   <DatePicker value={date} onChange={setDate} />
 */
export function DatePicker({
  value,
  onChange,
  defaultViewDate,
  disabledDate,
  placeholder = "날짜 선택",
  width = "w-[160px]",
  locale = "ko",
  disabled,
  id,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const [viewDate, setViewDate] = React.useState<Date>(
    value ?? defaultViewDate ?? new Date()
  );

  React.useEffect(() => {
    if (value) setViewDate(value);
  }, [value]);

  React.useEffect(() => {
    if (!open) return;
    const click = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", click);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("mousedown", click);
      document.removeEventListener("keydown", key);
    };
  }, [open]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weekdays = locale === "ko" ? KO_WEEKDAYS : EN_WEEKDAYS;

  const cells: { date: Date | null }[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push({ date: null });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ date: new Date(year, month, d) });
  while (cells.length % 7 !== 0) cells.push({ date: null });

  const today = new Date();
  const monthLabel =
    locale === "ko"
      ? `${year}년 ${month + 1}월`
      : new Date(year, month).toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        });

  return (
    <div
      ref={ref}
      data-anti-card="date-picker"
      data-state={open ? "open" : "closed"}
      className="relative inline-block"
    >
      <button
        id={id}
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center justify-between gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2 text-[13.5px] text-zinc-700 transition-colors hover:border-zinc-300 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/[0.08] dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-white/[0.16]",
          width
        )}
      >
        <span className={cn(!value && "text-zinc-400 dark:text-zinc-500")}>
          {value ? fmt(value) : placeholder}
        </span>
        <CalendarIcon
          className="h-3.5 w-3.5 shrink-0 text-zinc-400"
          strokeWidth={1.5}
        />
      </button>

      {open && (
        <div
          role="dialog"
          className="absolute left-0 top-full z-50 mt-1.5 w-[280px] origin-top rounded-md border border-zinc-200 bg-white p-3 animate-anti-scale-in dark:border-white/[0.12] dark:bg-zinc-900"
        >
          <div className="mb-2 flex items-center justify-between">
            <button
              type="button"
              aria-label={locale === "ko" ? "이전 달" : "Previous month"}
              onClick={() => setViewDate(new Date(year, month - 1, 1))}
              className="rounded-md p-1 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/[0.04] dark:hover:text-zinc-100"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <div className="text-[13px] font-medium text-zinc-900 dark:text-zinc-100">
              {monthLabel}
            </div>
            <button
              type="button"
              aria-label={locale === "ko" ? "다음 달" : "Next month"}
              onClick={() => setViewDate(new Date(year, month + 1, 1))}
              className="rounded-md p-1 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/[0.04] dark:hover:text-zinc-100"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>

          <div className="mb-1 grid grid-cols-7 gap-0.5 text-center text-[10.5px] uppercase tracking-[0.08em] text-zinc-400">
            {weekdays.map((w) => (
              <div key={w} className="py-1">
                {w}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-0.5">
            {cells.map((c, i) => {
              if (!c.date) return <div key={`empty-${i}`} className="h-7" />;
              const d = c.date;
              const isSelected = isSameDay(d, value ?? null);
              const isToday = isSameDay(d, today);
              const isDis = disabledDate?.(d) ?? false;
              return (
                <button
                  key={d.toISOString()}
                  type="button"
                  disabled={isDis}
                  onClick={() => {
                    onChange?.(d);
                    setOpen(false);
                  }}
                  className={cn(
                    "h-7 rounded text-[12.5px] transition-colors disabled:cursor-not-allowed disabled:opacity-30",
                    isSelected
                      ? "bg-emerald-500 text-white hover:bg-emerald-500 dark:bg-emerald-500 dark:text-white"
                      : isToday
                      ? "border border-emerald-500/40 text-emerald-700 hover:bg-emerald-500/[0.08] dark:text-emerald-400 dark:hover:bg-emerald-400/[0.08]"
                      : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/[0.04]"
                  )}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>

          <div className="mt-2 flex items-center justify-between border-t border-zinc-200 pt-2 dark:border-white/[0.06]">
            <button
              type="button"
              onClick={() => {
                onChange?.(new Date());
                setOpen(false);
              }}
              className="text-[12.5px] text-emerald-600 hover:underline dark:text-emerald-400"
            >
              {locale === "ko" ? "오늘" : "Today"}
            </button>
            <button
              type="button"
              onClick={() => {
                onChange?.(null);
                setOpen(false);
              }}
              className="text-[12.5px] text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              {locale === "ko" ? "지우기" : "Clear"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
