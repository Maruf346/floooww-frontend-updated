import type { ReactNode } from "react";
import { cn } from "@/common/utils/cn";

export const STAGE_WIDTH = 1440;
export const STAGE_HEIGHT = 760;

/** A 1440 × 760 layer (the Figma frame), centred on the hero and scaled as a whole. */
export function HeroStage({
  scale,
  className,
  children,
}: {
  scale: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute left-1/2 top-0 origin-top", className)}
      style={{
        width: STAGE_WIDTH,
        height: STAGE_HEIGHT,
        transform: `translateX(-50%) scale(${scale})`,
      }}
    >
      {children}
    </div>
  );
}
