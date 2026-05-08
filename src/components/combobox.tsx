"use client";
import * as React from "react";
import { ChevronDown, Check, X } from "lucide-react";
import { cn } from "../utils/cn";

export interface ComboboxOption {
  value: string;
  label: React.ReactNode;
  /** label이 ReactNode일 때 검색 매칭용 plain text */
  searchText?: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  /** 현재 선택값 — controlled */
  value?: string | null;
  /** 변경 콜백 */
  onChange?: (value: string | null) => void;
  /** 트리거 placeholder (선택값 없을 때) */
  placeholder?: string;
  /** 검색 input placeholder */
  searchPlaceholder?: string;
  /** 검색 결과 없을 때 */
  empty?: React.ReactNode;
  /** 너비 — Tailwind className */
  width?: string;
  /** 클리어(X) 버튼 — default true */
  clearable?: boolean;
  /** 비활성화 */
  disabled?: boolean;
  /** id (htmlFor 매칭용) */
  id?: string;
}

/**
 * Combobox — Input + Dropdown 결합. 검색 가능 select.
 *
 * 안티 카드 톤: shadow X, 1px 헤어라인. 활성 옵션 zinc-100 배경,
 * 선택 옵션 우측 emerald check.
 *
 * 키보드: ↑↓ 이동, Enter 선택, ESC 닫기.
 *
 * @example
 *   <Combobox
 *     options={[
 *       { value: "preive", label: "Preive (2016~2022)" },
 *       { value: "freeive", label: "Freeive (2023~)" },
 *     ]}
 *     value={brand}
 *     onChange={setBrand}
 *     placeholder="브랜드 선택"
 *   />
 */
export function Combobox({
  options,
  value,
  onChange,
  placeholder = "선택",
  searchPlaceholder = "검색…",
  empty = "결과 없음",
  width = "w-[220px]",
  clearable = true,
  disabled,
  id,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const selected = options.find((o) => o.value === value) ?? null;

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => {
      const text = (
        o.searchText ??
        (typeof o.label === "string" ? o.label : o.value)
      ).toLowerCase();
      return text.includes(q);
    });
  }, [options, query]);

  React.useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  React.useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const click = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", click);
    return () => document.removeEventListener("mousedown", click);
  }, [open]);

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(filtered.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const opt = filtered[activeIndex];
      if (opt && !opt.disabled) {
        onChange?.(opt.value);
        setOpen(false);
        setQuery("");
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    }
  };

  return (
    <div
      ref={ref}
      data-anti-card="combobox"
      data-state={open ? "open" : "closed"}
      className={cn("relative inline-block", width)}
    >
      <button
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-md border border-zinc-200 bg-white text-left text-[13.5px] transition-colors hover:border-zinc-300 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/[0.08] dark:bg-zinc-950 dark:hover:border-white/[0.16]",
          // 우측 clear button 자리 확보 (selected + clearable일 때만 padding-right 추가)
          clearable && selected ? "py-2 pl-3 pr-9" : "py-2 pl-3 pr-3"
        )}
      >
        <span
          className={cn(
            "min-w-0 flex-1 truncate",
            selected
              ? "text-zinc-900 dark:text-zinc-100"
              : "text-zinc-400 dark:text-zinc-500"
          )}
        >
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 shrink-0 text-zinc-400 transition-transform",
            open && "rotate-180"
          )}
          strokeWidth={1.5}
        />
      </button>
      {/* clear 버튼 — 트리거 button 외부에 absolute 위치 (HTML 명세상 nested button 금지) */}
      {clearable && selected && !disabled && (
        <button
          type="button"
          aria-label="선택 지우기"
          onClick={(e) => {
            e.stopPropagation();
            onChange?.(null);
          }}
          className="absolute right-7 top-1/2 -translate-y-1/2 rounded p-0.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-white/[0.04] dark:hover:text-zinc-200"
        >
          <X className="h-3 w-3" strokeWidth={1.5} />
        </button>
      )}

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1.5 origin-top rounded-md border border-zinc-200 bg-white animate-anti-scale-in dark:border-white/[0.12] dark:bg-zinc-900">
          <div className="border-b border-zinc-200 p-2 dark:border-white/[0.06]">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={searchPlaceholder}
              className="w-full bg-transparent text-[13px] text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
            />
          </div>
          <ul
            role="listbox"
            className="thin-scroll max-h-[220px] overflow-y-auto py-1"
          >
            {filtered.length === 0 && (
              <li className="px-3 py-3 text-center text-[12.5px] text-zinc-500">
                {empty}
              </li>
            )}
            {filtered.map((o, i) => {
              const isActive = i === activeIndex;
              const isSelected = o.value === value;
              return (
                <li
                  key={o.value}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={o.disabled}
                  onClick={() => {
                    if (o.disabled) return;
                    onChange?.(o.value);
                    setOpen(false);
                    setQuery("");
                  }}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={cn(
                    "flex items-center justify-between gap-2 px-3 py-1.5 text-[13.5px]",
                    o.disabled
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer",
                    !o.disabled &&
                      isActive &&
                      "bg-zinc-100 dark:bg-white/[0.04]",
                    !o.disabled &&
                      !isActive &&
                      "hover:bg-zinc-50 dark:hover:bg-white/[0.02]",
                    "text-zinc-700 dark:text-zinc-300"
                  )}
                >
                  <span className="min-w-0 truncate">{o.label}</span>
                  {isSelected && (
                    <Check
                      className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                      strokeWidth={1.5}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
