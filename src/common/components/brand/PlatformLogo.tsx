import type { Platform, PlatformLogoStyle } from "@/common/types";
import { ASSETS } from "@/common/constants/assets";
import { cn } from "@/common/utils/cn";

interface PlatformLogoProps {
  platform: Platform;
  /** Color = default · Mono = dense tables/print · White = on dark or photos. */
  variant?: PlatformLogoStyle;
  size?: number;
  className?: string;
}

/** Official platform glyphs (Figma 96:45). Never recolour or stretch. Min size 16 px. */
export function PlatformLogo({
  platform,
  variant = "Color",
  size = 24,
  className,
}: PlatformLogoProps) {
  const dimension = Math.max(16, size);
  return (
    <img
      src={ASSETS.platform[platform][variant]}
      alt={platform}
      width={dimension}
      height={dimension}
      style={{ width: dimension, height: dimension }}
      className={cn("block shrink-0", className)}
    />
  );
}
