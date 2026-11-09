import { useRef, type ReactNode } from "react";
import { useElementWidth } from "@/common/hooks/useElementWidth";
import { cn } from "@/common/utils/cn";

interface ScaledFrameProps {
  /** Design width in px (the Figma frame). */
  width: number;
  /** Design height in px. */
  height: number;
  /** Optional cap on the rendered height in px (e.g. to fit a sticky viewport). */
  maxHeight?: number;
  /** Allow growing past 1× (default false). */
  upscale?: boolean;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}

/**
 * Renders a fixed-size product mockup at its exact Figma geometry and scales it
 * as a whole to fit the available width, so detailed UI never reflows or breaks.
 */
export function ScaledFrame({
  width,
  height,
  maxHeight,
  upscale = false,
  className,
  innerClassName,
  children,
}: ScaledFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const available = useElementWidth(ref);
  const byWidth = available > 0 ? available / width : 1;
  const byHeight = maxHeight ? maxHeight / height : Infinity;
  const scale = Math.min(upscale ? Infinity : 1, byWidth, byHeight);

  return (
    <div
      ref={ref}
      className={cn("relative w-full", className)}
      style={{ height: height * scale, maxWidth: upscale ? undefined : width }}
    >
      <div
        className={cn("absolute left-1/2 top-0 origin-top", innerClassName)}
        style={{ width, height, transform: `translateX(-50%) scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}
