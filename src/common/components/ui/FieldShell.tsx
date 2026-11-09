import type { ReactNode } from "react";
import { cn } from "@/common/utils/cn";

export interface FieldShellProps {
  id: string;
  label: string;
  required?: boolean;
  helper?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

/** Figma Field (6:130): 12 px Medium label above, red * for required, 12 px helper below. */
export function FieldShell({
  id,
  label,
  required,
  helper,
  error,
  className,
  children,
}: FieldShellProps) {
  const message = error ?? helper;
  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)}>
      <label
        htmlFor={id}
        className="flex gap-1 font-inter-medium text-[12px] font-medium leading-4 text-ink"
      >
        {label}
        {required && (
          <span className="text-danger" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {message && (
        <p
          id={`${id}-message`}
          className={cn("text-[12px] leading-4", error ? "text-danger" : "text-tertiary")}
          role={error ? "alert" : undefined}
        >
          {message}
        </p>
      )}
    </div>
  );
}

/** Box styles shared by text inputs and select triggers so every field matches. */
export function fieldBoxClasses({ error, open }: { error?: boolean; open?: boolean } = {}) {
  return cn(
    "flex h-10 w-full items-center gap-2 rounded-md border bg-surface px-3 text-[13px] leading-5 text-ink",
    "transition-[border-color,box-shadow] duration-200 ease-out outline-none",
    "disabled:cursor-not-allowed disabled:bg-subtle disabled:text-tertiary",
    error
      ? "border-danger"
      : open
        ? "border-primary shadow-[0_0_0_0.5px_var(--color-primary)]"
        : "border-line hover:border-line-strong focus-visible:border-primary focus-visible:shadow-[0_0_0_0.5px_var(--color-primary)]",
  );
}
