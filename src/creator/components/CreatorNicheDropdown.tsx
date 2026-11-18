import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";

export const NICHE_OPTIONS = [
  "Beauty & skincare",
  "Fashion",
  "Haircare",
  "Wellness",
  "Food & drink",
  "Other",
] as const;

export type NicheOption = (typeof NICHE_OPTIONS)[number] | string;

type CreatorNicheDropdownProps = {
  value: string;
  onChange: (val: string) => void;
  className?: string;
  label?: string;
  showCategoryHeader?: boolean;
};

export function CreatorNicheDropdown({
  value,
  onChange,
  className = "",
  label = "Primary niche",
  showCategoryHeader = false,
}: CreatorNicheDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      className={`relative flex flex-col gap-1 ${className}`}
      ref={containerRef}
      data-name="Dropdown · Niche"
    >
      {showCategoryHeader && (
        <p className="font-['Inter:Medium'] font-medium text-[13px] text-[#8491a3] tracking-[0.1px] mb-1 select-none">
          Dropdown · Niche
        </p>
      )}
      {label && !showCategoryHeader && (
        <label className="text-[12px] font-medium text-[#4a4a55] block mb-0.5">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`bg-white flex items-center justify-between gap-2 h-10 px-3.5 py-2 rounded-[8px] cursor-pointer transition select-none w-full ${
          isOpen
            ? "border border-[#0d0d10]"
            : "border border-[#e3e5ec] hover:border-[#0d0d10]"
        }`}
      >
        <span className="truncate font-['Inter:Regular'] font-normal text-[13px] text-[#0d0d10] leading-[20px] text-left">
          {value || "Select niche"}
        </span>
        <div className="shrink-0 size-4 flex items-center justify-center text-[#0d0d10]">
          {isOpen ? (
            <ChevronUp className="size-4 stroke-[1.8]" />
          ) : (
            <ChevronDown className="size-4 stroke-[1.8]" />
          )}
        </div>
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute left-0 top-[calc(100%+4px)] z-50 w-full min-w-full bg-white border border-[#e5e7eb] rounded-[10px] p-1.5 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.08)] flex flex-col gap-0.5 animate-in fade-in zoom-in-95 duration-100"
        >
          {NICHE_OPTIONS.map((option) => {
            const isSelected = value === option;
            return (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-[6px] transition cursor-pointer text-left ${
                  isSelected
                    ? "bg-[#f1f4ff] text-[#0d0d10]"
                    : "text-[#0d0d10] hover:bg-[#f8f9fb]"
                }`}
              >
                <span className="font-['Inter:Regular'] text-[13px] leading-[20px] truncate">
                  {option}
                </span>
                {isSelected && (
                  <Check className="size-4 text-[#0d0d10] shrink-0 stroke-[2]" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
