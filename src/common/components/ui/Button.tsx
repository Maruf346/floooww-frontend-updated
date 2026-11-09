import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/common/utils/cn";

export type ButtonKind = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "m" | "s";
export type ButtonShape = "rounded" | "pill";

interface ButtonStyleProps {
  kind?: ButtonKind;
  size?: ButtonSize;
  shape?: ButtonShape;
  fullWidth?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  className?: string;
  children?: ReactNode;
}

type ButtonAsButton = ButtonStyleProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof ButtonStyleProps> & { to?: never; href?: never };
type ButtonAsLink = ButtonStyleProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof ButtonStyleProps> & {
    to: string;
    href?: never;
  };
type ButtonAsAnchor = ButtonStyleProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof ButtonStyleProps> & { href: string; to?: never };

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

/* Figma 03 · Basics › Button (5:100): M 40 px, S 32 px, radius 8, Button/M & Button/S type. */
const KIND_CLASSES: Record<ButtonKind, string> = {
  primary: "bg-primary text-on-primary hover:bg-primary-hover",
  secondary: "border border-line bg-surface text-ink hover:bg-subtle",
  ghost: "text-ink hover:bg-subtle",
  danger: "bg-danger text-on-primary hover:bg-[linear-gradient(rgba(0,0,0,0.12),rgba(0,0,0,0.12))]",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  m: "h-10 gap-2 px-4 text-[14px] leading-5",
  s: "h-8 gap-1.5 px-3 text-[13px] leading-[18px]",
};

export function buttonClasses({
  kind = "primary",
  size = "m",
  shape = "rounded",
  fullWidth,
  className,
}: Pick<ButtonStyleProps, "kind" | "size" | "shape" | "fullWidth" | "className">) {
  return cn(
    "inline-flex shrink-0 items-center justify-center whitespace-nowrap font-inter-medium font-medium",
    "transition-[background-color,color,box-shadow,transform] duration-200 ease-out active:scale-[0.98]",
    "disabled:pointer-events-none disabled:opacity-45 aria-disabled:pointer-events-none aria-disabled:opacity-45",
    shape === "pill" ? "rounded-full" : "rounded-md",
    KIND_CLASSES[kind],
    SIZE_CLASSES[size],
    fullWidth && "w-full",
    className,
  );
}

export function Button(props: ButtonProps) {
  const { kind, size, shape, fullWidth, leadingIcon, trailingIcon, className, children, ...rest } =
    props;
  const classes = buttonClasses({ kind, size, shape, fullWidth, className });
  const content = (
    <>
      {leadingIcon}
      {children}
      {trailingIcon}
    </>
  );

  if ("to" in rest && rest.to !== undefined) {
    return (
      <Link {...(rest as ComponentPropsWithoutRef<typeof Link>)} className={classes}>
        {content}
      </Link>
    );
  }

  if ("href" in rest && rest.href !== undefined) {
    return (
      <a {...(rest as ComponentPropsWithoutRef<"a">)} className={classes}>
        {content}
      </a>
    );
  }

  const buttonProps = rest as ComponentPropsWithoutRef<"button">;
  return (
    <button type="button" {...buttonProps} className={classes}>
      {content}
    </button>
  );
}
