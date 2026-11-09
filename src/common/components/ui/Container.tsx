import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/common/utils/cn";

type ContainerProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

/** Page gutter matching the 1440 frame (100 px side padding at full width). */
export function Container<T extends ElementType = "div">({
  as,
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";
  return (
    <Component
      className={cn("mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-[100px]", className)}
      {...props}
    />
  );
}
