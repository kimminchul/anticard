"use client";
import * as React from "react";
import { X, Info, AlertTriangle, AlertOctagon, Check } from "lucide-react";
import { cn } from "../utils/cn";

export type ToastTone = "default" | "success" | "warning" | "danger";

export type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

/* ============================================================
 * 1) 단일 Toast (저수준) — open/onOpenChange 제어
 * ============================================================ */

export interface ToastProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** 자동 닫힘 (ms). 0 또는 음수 = 영구 */
  duration?: number;
  tone?: ToastTone;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** fixed 위치 — 단독 사용 시 (Provider 사용 시 무시) */
  position?: ToastPosition;
  showClose?: boolean;
}

const TONE_ICONS: Record<ToastTone, React.ComponentType<{ className?: string }>> = {
  default: Info,
  success: Check,
  warning: AlertTriangle,
  danger: AlertOctagon,
};

/**
 * Toast — 단일 알림 (저수준).
 *
 * 단일 사용이면 이 컴포넌트로 충분. 여러 알림을 누적 표시하려면 ToastProvider + useToast 사용.
 */
export function Toast({
  open,
  onOpenChange,
  duration = 4000,
  tone = "default",
  title,
  description,
  position = "bottom-right",
  showClose = true,
}: ToastProps) {
  React.useEffect(() => {
    if (!open || duration <= 0) return;
    const id = setTimeout(() => onOpenChange(false), duration);
    return () => clearTimeout(id);
  }, [open, duration, onOpenChange]);

  if (!open) return null;

  return (
    <div
      data-anti-card="toast"
      data-position={position}
      className={cn(
        "fixed z-50",
        position === "top-right" && "top-4 right-4",
        position === "top-left" && "top-4 left-4",
        position === "bottom-right" && "bottom-4 right-4",
        position === "bottom-left" && "bottom-4 left-4",
        position === "top-center" && "top-4 left-1/2 -translate-x-1/2",
        position === "bottom-center" && "bottom-4 left-1/2 -translate-x-1/2"
      )}
    >
      <ToastCard
        tone={tone}
        title={title}
        description={description}
        onClose={showClose ? () => onOpenChange(false) : undefined}
      />
    </div>
  );
}

/* ============================================================
 * 2) ToastProvider + useToast — 누적 Toast 시스템
 * ============================================================ */

export interface ToastInput {
  tone?: ToastTone;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** ms. 0 = 영구 */
  duration?: number;
}

interface ToastEntry extends ToastInput {
  id: string;
}

interface ToastContextValue {
  toasts: ToastEntry[];
  /** 새 toast 추가. id 반환 */
  toast: (input: ToastInput) => string;
  /** 특정 id 닫기 */
  dismiss: (id: string) => void;
  /** 모두 닫기 */
  clear: () => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export interface ToastProviderProps {
  children: React.ReactNode;
  /** viewport 위치 (모든 toast가 한 위치에 누적) */
  position?: ToastPosition;
  /** 동시 표시 최대 개수 (초과 시 가장 오래된 것 자동 제거). default 5 */
  limit?: number;
  /** 기본 자동 닫힘 ms. default 4000 */
  defaultDuration?: number;
}

/**
 * ToastProvider — 앱 전역 toast 시스템.
 *
 * 자식 컴포넌트에서 `useToast()` 훅으로 호출. 여러 toast가 누적 표시됨.
 *
 * @example
 *   // app root
 *   <ToastProvider position="bottom-right">
 *     <App />
 *   </ToastProvider>
 *
 *   // 사용처 (자식 컴포넌트)
 *   const { toast } = useToast();
 *   toast({ title: "저장됨", tone: "success" });
 */
export function ToastProvider({
  children,
  position = "bottom-right",
  limit = 5,
  defaultDuration = 4000,
}: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<ToastEntry[]>([]);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clear = React.useCallback(() => setToasts([]), []);

  const toast = React.useCallback(
    (input: ToastInput) => {
      const id = `t-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((prev) => {
        const next = [...prev, { ...input, id }];
        // 한도 초과 시 가장 오래된 것 제거 (FIFO)
        return next.length > limit ? next.slice(next.length - limit) : next;
      });
      return id;
    },
    [limit]
  );

  const value = React.useMemo(
    () => ({ toasts, toast, dismiss, clear }),
    [toasts, toast, dismiss, clear]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport
        toasts={toasts}
        onDismiss={dismiss}
        position={position}
        defaultDuration={defaultDuration}
      />
    </ToastContext.Provider>
  );
}

/** useToast — Provider 안에서 toast 호출 */
export function useToast(): ToastContextValue {
  const ctx = React.useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within <ToastProvider>");
  }
  return ctx;
}

/* ============================================================
 * 3) Viewport (내부) — fixed 위치에 toast 누적 렌더
 * ============================================================ */

interface ToastViewportProps {
  toasts: ToastEntry[];
  onDismiss: (id: string) => void;
  position: ToastPosition;
  defaultDuration: number;
}

function ToastViewport({ toasts, onDismiss, position, defaultDuration }: ToastViewportProps) {
  if (toasts.length === 0) return null;

  // 위치별 stack 방향 — top-* 는 새 항목이 아래 추가 (위로 push), bottom-* 는 새 항목이 위 추가 (아래로 push)
  const isTop = position.startsWith("top");
  const ordered = isTop ? toasts : [...toasts].reverse();

  return (
    <div
      data-anti-card="toast-viewport"
      data-position={position}
      aria-live="polite"
      className={cn(
        "pointer-events-none fixed z-50 flex flex-col gap-2",
        position === "top-right" && "top-4 right-4 items-end",
        position === "top-left" && "top-4 left-4 items-start",
        position === "bottom-right" && "bottom-4 right-4 items-end",
        position === "bottom-left" && "bottom-4 left-4 items-start",
        position === "top-center" && "top-4 left-1/2 -translate-x-1/2 items-center",
        position === "bottom-center" && "bottom-4 left-1/2 -translate-x-1/2 items-center"
      )}
    >
      {ordered.map((t) => (
        <ToastQueueItem
          key={t.id}
          entry={t}
          onDismiss={onDismiss}
          defaultDuration={defaultDuration}
        />
      ))}
    </div>
  );
}

function ToastQueueItem({
  entry,
  onDismiss,
  defaultDuration,
}: {
  entry: ToastEntry;
  onDismiss: (id: string) => void;
  defaultDuration: number;
}) {
  const duration = entry.duration ?? defaultDuration;

  React.useEffect(() => {
    if (duration <= 0) return;
    const id = setTimeout(() => onDismiss(entry.id), duration);
    return () => clearTimeout(id);
  }, [duration, entry.id, onDismiss]);

  return (
    <div className="pointer-events-auto">
      <ToastCard
        tone={entry.tone ?? "default"}
        title={entry.title}
        description={entry.description}
        onClose={() => onDismiss(entry.id)}
      />
    </div>
  );
}

/* ============================================================
 * Card — 단일 toast 시각 (저수준 + Provider 공통)
 * ============================================================ */

interface ToastCardProps {
  tone: ToastTone;
  title?: React.ReactNode;
  description?: React.ReactNode;
  onClose?: () => void;
}

function ToastCard({ tone, title, description, onClose }: ToastCardProps) {
  const Icon = TONE_ICONS[tone];

  return (
    <div
      data-anti-card="toast-card"
      data-tone={tone}
      role="status"
      className={cn(
        "flex w-[min(92vw,360px)] items-start gap-3 rounded-md border bg-white p-4 dark:bg-zinc-900",
        tone === "default" && "border-zinc-200 dark:border-white/[0.08]",
        tone === "success" && "border-emerald-500/40 dark:border-emerald-400/40",
        tone === "warning" && "border-amber-500/40 dark:border-amber-400/40",
        tone === "danger" && "border-red-500/40 dark:border-red-400/40"
      )}
    >
      <Icon
        aria-hidden
        className={cn(
          "mt-0.5 h-4 w-4 shrink-0",
          tone === "default" && "text-zinc-500 dark:text-zinc-400",
          tone === "success" && "text-emerald-600 dark:text-emerald-400",
          tone === "warning" && "text-amber-600 dark:text-amber-400",
          tone === "danger" && "text-red-600 dark:text-red-400"
        )}
      />
      <div className="min-w-0 flex-1">
        {title && (
          <p className="text-[13.5px] font-medium text-zinc-900 dark:text-zinc-100">
            {title}
          </p>
        )}
        {description && (
          <p
            className={cn(
              "text-[12.5px] leading-relaxed text-zinc-600 dark:text-zinc-400",
              title && "mt-1"
            )}
          >
            {description}
          </p>
        )}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="shrink-0 text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
