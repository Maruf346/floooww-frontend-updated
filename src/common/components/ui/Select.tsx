import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown } from "lucide-react";
import type { SelectOption } from "@/common/types";
import { useOutsideClick } from "@/common/hooks/useOutsideClick";
import { EASE_OUT } from "@/common/constants/motion";
import { cn } from "@/common/utils/cn";
import { FieldShell, fieldBoxClasses } from "./FieldShell";

export interface SelectProps<T extends string> {
  label: string;
  options: SelectOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
  placeholder?: string;
  helper?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * The one dropdown used everywhere (Figma Field › Select + Dropdown menu 8:69).
 * Fully keyboard accessible listbox; never use a native <select>.
 */
export function Select<T extends string>({
  label,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  helper,
  error,
  required,
  disabled,
  className,
}: SelectProps<T>) {
  const id = useId();
  const listId = `${id}-list`;
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const selectedIndex = options.findIndex((option) => option.value === value);
  const [activeIndex, setActiveIndex] = useState(selectedIndex);

  const close = useCallback(() => setOpen(false), []);
  useOutsideClick(rootRef, close, open);

  useEffect(() => {
    if (open) setActiveIndex(selectedIndex >= 0 ? selectedIndex : firstEnabled(options));
  }, [open, selectedIndex, options]);

  useEffect(() => {
    if (!open || activeIndex < 0) return;
    const item = listRef.current?.children[activeIndex] as HTMLElement | undefined;
    item?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  const commit = (index: number) => {
    const option = options[index];
    if (!option || option.disabled) return;
    onChange(option.value);
    setOpen(false);
  };

  const move = (direction: 1 | -1) => {
    setActiveIndex((current) => {
      let next = current;
      for (let step = 0; step < options.length; step += 1) {
        next = (next + direction + options.length) % options.length;
        if (!options[next]?.disabled) return next;
      }
      return current;
    });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!open) setOpen(true);
        else move(1);
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!open) setOpen(true);
        else move(-1);
        break;
      case "Home":
        if (open) {
          event.preventDefault();
          setActiveIndex(firstEnabled(options));
        }
        break;
      case "End":
        if (open) {
          event.preventDefault();
          setActiveIndex(lastEnabled(options));
        }
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (open) commit(activeIndex);
        else setOpen(true);
        break;
      case "Escape":
        if (open) {
          event.preventDefault();
          setOpen(false);
        }
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  const selected = selectedIndex >= 0 ? options[selectedIndex] : null;

  return (
    <FieldShell
      id={id}
      label={label}
      required={required}
      helper={helper}
      error={error}
      className={className}
    >
      <div ref={rootRef} className="relative w-full">
        <button
          id={id}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-invalid={Boolean(error) || undefined}
          aria-activedescendant={open && activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
          disabled={disabled}
          onClick={() => setOpen((current) => !current)}
          onKeyDown={onKeyDown}
          className={cn(fieldBoxClasses({ error: Boolean(error), open }), "text-left")}
        >
          <span className={cn("min-w-0 flex-1 truncate", !selected && "text-tertiary")}>
            {selected?.label ?? placeholder}
          </span>
          <ChevronDown
            size={16}
            strokeWidth={2}
            aria-hidden="true"
            className={cn(
              "shrink-0 text-icon transition-transform duration-300 ease-out",
              open && "rotate-180",
            )}
          />
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              ref={listRef}
              id={listId}
              role="listbox"
              aria-labelledby={id}
              initial={{ opacity: 0, y: -4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={{ duration: 0.18, ease: EASE_OUT }}
              className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 flex max-h-[360px] origin-top flex-col gap-0.5 overflow-y-auto rounded-lg border border-line bg-surface p-1.5 shadow-md"
            >
              {options.map((option, index) => {
                const isSelected = option.value === value;
                const isActive = index === activeIndex;
                return (
                  <li
                    key={option.value}
                    id={`${listId}-${index}`}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={option.disabled || undefined}
                    onMouseEnter={() => !option.disabled && setActiveIndex(index)}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => commit(index)}
                    className={cn(
                      "flex cursor-pointer items-center gap-2.5 rounded-sm px-2.5 py-2 text-[13px] leading-5 transition-colors duration-150",
                      isSelected ? "bg-primary-subtle text-primary" : "text-ink",
                      !isSelected && isActive && "bg-subtle",
                      option.disabled && "cursor-not-allowed text-tertiary",
                    )}
                  >
                    <Check
                      size={16}
                      strokeWidth={2}
                      aria-hidden="true"
                      className={cn("shrink-0 text-primary", !isSelected && "opacity-0")}
                    />
                    <span className="min-w-0 flex-1">{option.label}</span>
                    {option.hint && (
                      <span className="shrink-0 text-[12px] leading-4 text-tertiary">
                        {option.hint}
                      </span>
                    )}
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </FieldShell>
  );
}

function firstEnabled(options: SelectOption[]) {
  return options.findIndex((option) => !option.disabled);
}

function lastEnabled(options: SelectOption[]) {
  for (let index = options.length - 1; index >= 0; index -= 1) {
    if (!options[index]?.disabled) return index;
  }
  return -1;
}
