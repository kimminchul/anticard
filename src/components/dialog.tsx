"use client";
import * as React from "react";
import { X } from "lucide-react";
import { cn } from "../utils/cn";

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** 헤더 제목 */
  title?: React.ReactNode;
  /** 헤더 설명 */
  description?: React.ReactNode;
  /** 본문 */
  children?: React.ReactNode;
  /** 푸터 (예: secondary cancel + primary confirm) */
  footer?: React.ReactNode;
  /** 너비 — narrow=400 / default=520 / wide=720 */
  size?: "narrow" | "default" | "wide";
  /** 닫기 버튼 표시 (default true) */
  showClose?: boolean;
}

/**
 * Dialog — 모달 다이얼로그.
 *
 * native `<dialog>` + showModal() 사용 — focus trap·ESC·backdrop 자동.
 * 안티 카드 톤: shadow X, 헤어라인 1px, 큰 padding (24~32px).
 *
 * 사용처: confirm/cancel, 짧은 폼, 알림 등. 큰 폼은 Drawer 권장.
 *
 * @example
 *   const [open, setOpen] = useState(false);
 *   <Dialog
 *     open={open}
 *     onOpenChange={setOpen}
 *     title="삭제 확인"
 *     description="이 작업은 되돌릴 수 없습니다."
 *     footer={
 *       <>
 *         <Button variant="secondary" onClick={() => setOpen(false)}>취소</Button>
 *         <Button tone="accent" onClick={handleDelete}>삭제</Button>
 *       </>
 *     }
 *   />
 */
export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = "default",
  showClose = true,
}: DialogProps) {
  const ref = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (open && !dlg.open) {
      dlg.showModal();
    } else if (!open && dlg.open) {
      dlg.close();
    }
  }, [open]);

  const handleClose = () => {
    onOpenChange(false);
  };

  // backdrop click closes
  const handleClick: React.MouseEventHandler<HTMLDialogElement> = (e) => {
    if (e.target === ref.current) onOpenChange(false);
  };

  return (
    <dialog
      ref={ref}
      onClose={handleClose}
      onClick={handleClick}
      data-anti-card="dialog"
      className={cn(
        "rounded-md border border-zinc-200 bg-white p-0 text-zinc-900 backdrop:bg-zinc-900/40 backdrop:animate-anti-fade-in animate-anti-dialog-in dark:border-white/[0.08] dark:bg-zinc-900 dark:text-zinc-100 dark:backdrop:bg-black/60",
        size === "narrow" && "w-[min(92vw,400px)]",
        size === "default" && "w-[min(92vw,520px)]",
        size === "wide" && "w-[min(92vw,720px)]"
      )}
    >
      <div className="relative p-6 md:p-8">
        {(title || showClose) && (
          <div className="flex items-start justify-between gap-4">
            {title ? (
              <h2 className="text-[18px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                {title}
              </h2>
            ) : (
              <span aria-hidden />
            )}
            {showClose && (
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                aria-label="닫기"
                className="text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
        {description && (
          <p className="mt-2 text-[13.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
        )}
        {children && <div className={cn(title || description ? "mt-5" : "mt-0")}>{children}</div>}
        {footer && (
          <div className="mt-7 flex flex-wrap items-center justify-end gap-3 border-t border-zinc-200 pt-5 dark:border-white/[0.06]">
            {footer}
          </div>
        )}
      </div>
    </dialog>
  );
}
