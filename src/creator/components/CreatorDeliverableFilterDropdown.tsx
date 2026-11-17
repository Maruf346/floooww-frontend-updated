import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";

export type DeliverableFilterOption =
  | "All deliverables"
  | "Festive GRWM · Reel"
  | "Launch day · Story"
  | "Results after 7 days · Reel";

const DELIVERABLE_OPTIONS: DeliverableFilterOption[] = [
  "All deliverables",
  "Festive GRWM · Reel",
  "Launch day · Story",
  "Results after 7 days · Reel",
];

type CreatorDeliverableFilterDropdownProps = {
  value?: DeliverableFilterOption;
  onChange?: (value: DeliverableFilterOption) => void;
  className?: string;
};

export function CreatorDeliverableFilterDropdown({
  value = "All deliverables",
  onChange,
  className = "",
}: CreatorDeliverableFilterDropdownProps) {
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

  const handleSelect = (option: DeliverableFilterOption) => {
    onChange?.(option);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block text-left ${className}`}
      data-node-id="747:9573"
      data-name="Dropdown · Deliverable filter"
    >
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`bg-white content-stretch flex gap-[8px] h-[40px] items-center overflow-hidden px-[12px] py-[8px] rounded-[8px] cursor-pointer transition select-none w-full min-w-[200px] justify-between ${
          isOpen
            ? "border-2 border-[#0d0d10]"
            : "border border-[#e3e5ec] hover:border-[#0d0d10]"
        }`}
        data-node-id="747:9574"
        data-name="Trigger"
      >
        <span className="truncate font-['Inter:Regular'] font-normal text-[13px] text-[#0d0d10] leading-[20px]">
          {value}
        </span>
        <div className="shrink-0 size-[14px] flex items-center justify-center text-[#0d0d10]">
          {isOpen ? <ChevronUp className="size-3.5 stroke-[2.2]" /> : <ChevronDown className="size-3.5 stroke-[2.2]" />}
        </div>
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Filter deliverables"
          className="absolute left-0 top-[calc(100%+6px)] z-50 w-full min-w-[240px] bg-white border border-[#e3e5ec] rounded-[8px] p-[6px] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)] flex flex-col gap-[2px] animate-in fade-in zoom-in-95 duration-100"
          data-node-id="747:9577"
          data-name="Menu"
        >
          {DELIVERABLE_OPTIONS.map((option) => {
            const isSelected = value === option;
            return (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(option)}
                className={`w-full content-stretch flex items-center justify-between px-[10px] py-[8px] rounded-[6px] transition cursor-pointer text-left ${
                  isSelected
                    ? "bg-[#f1f4ff] text-[#0d0d10]"
                    : "text-[#0d0d10] hover:bg-[#f8f9fb]"
                }`}
              >
                <span className="font-['Inter:Regular'] font-normal text-[13px] leading-[20px] truncate">
                  {option}
                </span>
                {isSelected && (
                  <Check className="size-3.5 text-[#0d0d10] shrink-0 stroke-[2.4]" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
