import { asset } from "@/common/utils/asset";
import { cn } from "@/common/utils/cn";

interface LogoProps {
  theme?: "on-light" | "on-dark";
  /** `nav` uses the compact homepage lockup; `default` is used throughout app shells. */
  variant?: "nav" | "default";
  className?: string;
}

/** Kreyio wordmark. Scale only as a whole; never change its proportions. */
export function Logo({ theme = "on-light", variant = "default", className }: LogoProps) {
  return (
    <img
      src={asset("Logo.png")}
      alt="Kreyio"
      className={cn(
        "block h-7 w-auto object-contain",
        theme === "on-dark" && "brightness-0 invert",
        className,
      )}
    />
  );
}
