import * as React from "react";
import { cn } from "../utils/cn";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** 캡션. figure + figcaption으로 자동 감쌈 */
  caption?: React.ReactNode;
  /** 종횡비 강제. 기본 native (이미지 자체 비율) */
  ratio?: "native" | "16/9" | "4/3" | "3/2" | "1/1";
  /** figure 외곽 className */
  figureClassName?: string;
}

/**
 * Image — 본문 이미지 + caption.
 *
 * 모서리 둥글게(rounded-md) 살짝만, border 없음.
 * caption은 small smallcaps 톤 — 12.5px zinc-500.
 *
 * 주의: Next.js next/image와 다름 (anti-card는 라이브러리·환경 의존성 없음).
 * Next.js 환경에서는 직접 next/image 사용하고 figure만 anti-card 톤으로 감싸도 됨.
 *
 * @example
 *   <Image src="/screenshot.png" alt="..." caption="첫 번째 데모 화면" />
 */
export function Image({
  caption,
  ratio = "native",
  figureClassName,
  className,
  alt = "",
  ...props
}: ImageProps) {
  const ratioClass: Record<NonNullable<ImageProps["ratio"]>, string> = {
    native: "",
    "16/9": "aspect-[16/9]",
    "4/3": "aspect-[4/3]",
    "3/2": "aspect-[3/2]",
    "1/1": "aspect-square",
  };
  return (
    <figure
      data-anti-card="image"
      className={cn("my-8", figureClassName)}
    >
      <div
        className={cn(
          "overflow-hidden rounded-md bg-zinc-100 dark:bg-white/[0.04]",
          ratioClass[ratio]
        )}
      >
        <img
          alt={alt}
          className={cn(
            "block w-full",
            ratio !== "native" && "h-full object-cover",
            className
          )}
          {...props}
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-[12.5px] leading-relaxed text-zinc-500 dark:text-zinc-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
