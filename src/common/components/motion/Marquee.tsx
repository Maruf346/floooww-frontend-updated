import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/common/utils/cn";

interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full loop. Larger = slower. */
  duration?: number;
  gap?: number;
  pauseOnHover?: boolean;
  className?: string;
}

/**
 * Seamless right-to-left loop. Content is rendered twice and the track moves by
 * exactly half its width, so the seam is invisible. GPU-only transform animation.
 */
export function Marquee({
  children,
  duration = 40,
  gap = 44,
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  const trackStyle = { "--marquee-duration": `${duration}s` } as CSSProperties;
  const groupStyle: CSSProperties = { gap, paddingRight: gap };

  return (
    <div
      className={cn(
        "flex w-max animate-marquee will-change-transform",
        pauseOnHover && "hover:[animation-play-state:paused]",
        className,
      )}
      style={trackStyle}
    >
      <div className="flex shrink-0 items-center" style={groupStyle}>
        {children}
      </div>
      <div className="flex shrink-0 items-center" style={groupStyle} aria-hidden="true">
        {children}
      </div>
    </div>
  );
}
