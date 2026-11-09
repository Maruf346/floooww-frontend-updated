import { useId, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/common/utils/cn";
import { FieldShell, fieldBoxClasses } from "./FieldShell";

interface TextFieldProps extends Omit<ComponentPropsWithoutRef<"input">, "id"> {
  label: string;
  helper?: string;
  error?: string;
  icon?: ReactNode;
  containerClassName?: string;
}

export function TextField({
  label,
  helper,
  error,
  icon,
  required,
  containerClassName,
  className,
  ...inputProps
}: TextFieldProps) {
  const id = useId();
  return (
    <FieldShell
      id={id}
      label={label}
      required={required}
      helper={helper}
      error={error}
      className={containerClassName}
    >
      <div
        className={cn(
          fieldBoxClasses({ error: Boolean(error) }),
          "focus-within:border-primary focus-within:shadow-[0_0_0_0.5px_var(--color-primary)]",
        )}
      >
        {icon && <span className="flex shrink-0 text-icon-muted">{icon}</span>}
        <input
          id={id}
          required={required}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error || helper ? `${id}-message` : undefined}
          className={cn(
            "min-w-0 flex-1 bg-transparent outline-none placeholder:text-tertiary",
            className,
          )}
          {...inputProps}
        />
      </div>
    </FieldShell>
  );
}
