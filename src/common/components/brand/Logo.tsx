import { ASSETS } from "@/common/constants/assets";
import { cn } from "@/common/utils/cn";

interface LogoProps {
  theme?: "on-light" | "on-dark";
  /** `nav` uses the homepage nav lockup (37.8 px mark), `default` the 36 px Logo component. */
  variant?: "nav" | "default";
  className?: string;
}

/** Floooww lockup. Scale only as a whole; never change proportions or colours. */
export function Logo({ theme = "on-light", variant = "default", className }: LogoProps) {
  if (variant === "nav") {
    return (
      <span className={cn("flex items-center gap-[9.45px]", className)}>
        <img
          src={ASSETS.logo.navMark}
          alt=""
          width={25.753}
          height={37.8}
          className="block h-[37.8px] w-[25.753px]"
        />
        <img
          src={ASSETS.logo.navWordmark}
          alt="Floooww"
          width={87.518}
          height={9.345}
          className="block h-[9.345px] w-[87.518px]"
        />
      </span>
    );
  }

  return (
    <span className={cn("flex items-center gap-[9px]", className)}>
      <img
        src={ASSETS.logo.mark}
        alt=""
        width={24.527}
        height={36}
        className="block h-9 w-[24.527px]"
      />
      <img
        src={theme === "on-dark" ? ASSETS.logo.wordmarkOnDark : ASSETS.logo.wordmarkOnLight}
        alt="Floooww"
        width={83.351}
        height={8.9}
        className="block h-[8.9px] w-[83.351px]"
      />
    </span>
  );
}
