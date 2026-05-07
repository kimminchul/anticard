import * as React from "react";
import { cn } from "../utils/cn";

export interface GalleryItem {
  src: string;
  alt: string;
  caption?: React.ReactNode;
  href?: string;
}

export interface GalleryProps extends React.HTMLAttributes<HTMLUListElement> {
  items: GalleryItem[];
  /** 데스크톱 컬럼 수. 기본 3 */
  columns?: 2 | 3 | 4;
  /** 종횡비 강제 */
  ratio?: "native" | "16/9" | "4/3" | "1/1";
  /** 항목 간격 */
  gap?: "tight" | "default" | "loose";
}

/**
 * Gallery — 이미지 그리드.
 *
 * Image 컴포넌트 패턴 + grid. 모서리 살짝(rounded-md), shadow X.
 * caption 자동 figcaption.
 *
 * @example
 *   <Gallery
 *     columns={3}
 *     ratio="1/1"
 *     items={[
 *       { src: "/1.jpg", alt: "...", caption: "데모 화면 1" },
 *       { src: "/2.jpg", alt: "...", href: "/lab/demo-2" },
 *     ]}
 *   />
 */
export function Gallery({
  items,
  columns = 3,
  ratio = "4/3",
  gap = "default",
  className,
  ...props
}: GalleryProps) {
  const ratioClass: Record<NonNullable<GalleryProps["ratio"]>, string> = {
    native: "",
    "16/9": "aspect-[16/9]",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-square",
  };
  return (
    <ul
      data-anti-card="gallery"
      data-columns={columns}
      className={cn(
        "grid grid-cols-1",
        columns === 2 && "md:grid-cols-2",
        columns === 3 && "md:grid-cols-3",
        columns === 4 && "md:grid-cols-2 lg:grid-cols-4",
        gap === "tight" && "gap-2",
        gap === "default" && "gap-4 md:gap-6",
        gap === "loose" && "gap-8 md:gap-10",
        className
      )}
      {...props}
    >
      {items.map((item, i) => {
        const inner = (
          <figure className="m-0">
            <div
              className={cn(
                "overflow-hidden rounded-md bg-zinc-100 dark:bg-white/[0.04]",
                ratioClass[ratio]
              )}
            >
              <img
                src={item.src}
                alt={item.alt}
                className={cn(
                  "block w-full transition-transform duration-500",
                  ratio !== "native" && "h-full object-cover",
                  item.href && "group-hover:scale-[1.02]"
                )}
                loading="lazy"
              />
            </div>
            {item.caption && (
              <figcaption className="mt-2 text-[12.5px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                {item.caption}
              </figcaption>
            )}
          </figure>
        );
        return (
          <li key={i} className="m-0">
            {item.href ? (
              <a
                href={item.href}
                className="group block transition-opacity hover:opacity-90"
              >
                {inner}
              </a>
            ) : (
              inner
            )}
          </li>
        );
      })}
    </ul>
  );
}
