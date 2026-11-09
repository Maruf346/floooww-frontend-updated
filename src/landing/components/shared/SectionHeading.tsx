import type { ReactNode } from "react";
import { RevealGroup, RevealItem } from "@/common/components/motion/Reveal";
import { cn } from "@/common/utils/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  /** Title parts; the `highlight` part gets the brand gradient (#014EF6 → #1EB2FD). */
  title: { before?: string; highlight: string; after?: string };
  description?: ReactNode;
  align?: "center" | "left";
  id?: string;
  className?: string;
  titleClassName?: string;
}

/** Website section title: 52/60 Bold, -1.3 tracking (Figma section headers). */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  id,
  className,
  titleClassName,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <RevealGroup
      stagger={0.1}
      className={cn(
        "flex flex-col",
        centered ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <RevealItem
          as="p"
          className="font-inter-semibold text-[13px] font-semibold leading-normal tracking-[1.82px] text-primary"
        >
          {eyebrow}
        </RevealItem>
      )}
      <RevealItem>
        <h2
          id={id}
          className={cn(
            "font-inter-bold text-[34px] font-bold leading-[40px] tracking-[-0.85px] text-ink text-balance sm:text-[44px] sm:leading-[52px] lg:text-[52px] lg:leading-[60px] lg:tracking-[-1.3px]",
            eyebrow && (centered ? "mt-4" : "mt-3.5"),
            titleClassName,
          )}
        >
          {title.before}
          <span className="text-gradient-brand">{title.highlight}</span>
          {title.after}
        </h2>
      </RevealItem>
      {description && (
        <RevealItem
          as="p"
          className={cn(
            "mt-4 max-w-[640px] text-[16px] leading-[26px] text-neutral sm:text-[18px] sm:leading-7",
          )}
        >
          {description}
        </RevealItem>
      )}
    </RevealGroup>
  );
}
