import { useState, useRef, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

type CreatorDateRangeDropdownProps = {
  className?: string;
  initialSelectedDay?: number; // default 31 (for 31 Oct)
  onSelectDate?: (dateStr: string) => void;
};

export function CreatorDateRangeDropdown({
  className = "",
  initialSelectedDay = 31,
  onSelectDate,
}: CreatorDateRangeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Month navigation: 0 = October 2026, 1 = November 2026
  const [currentMonthIndex, setCurrentMonthIndex] = useState<0 | 1>(0);
  const [selectedDate, setSelectedDate] = useState<{ day: number; month: "Oct" | "Nov" }>({
    day: initialSelectedDay,
    month: "Oct",
  });

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

  const monthName = currentMonthIndex === 0 ? "October 2026" : "November 2026";
  const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  // October 2026: 1 Oct was Thursday (day index 3 if Mo=0)
  // Grid layout matching Figma node 747:9899 exactly:
  // Week 1: 28 (Sep), 29 (Sep), 30 (Sep), 1, 2, 3, 4
  // Week 2: 5, 6, 7, 8, 9, 10, 11
  // Week 3: 12, 13, 14, 15, 16, 17, 18
  // Week 4: 19, 20, 21, 22, 23, 24, 25
  // Week 5: 26, 27, 28, 29, 30, 31, 1 (Nov)
  const octoberWeeks = [
    [
      { day: 28, isCurrentMonth: false, disabled: true },
      { day: 29, isCurrentMonth: false, disabled: true },
      { day: 30, isCurrentMonth: false, disabled: true },
      { day: 1, isCurrentMonth: true, disabled: true },
      { day: 2, isCurrentMonth: true, disabled: true },
      { day: 3, isCurrentMonth: true, disabled: true },
      { day: 4, isCurrentMonth: true, disabled: true },
    ],
    [
      { day: 5, isCurrentMonth: true, disabled: true },
      { day: 6, isCurrentMonth: true, disabled: true },
      { day: 7, isCurrentMonth: true, disabled: false },
      { day: 8, isCurrentMonth: true, disabled: false },
      { day: 9, isCurrentMonth: true, disabled: false },
      { day: 10, isCurrentMonth: true, disabled: false },
      { day: 11, isCurrentMonth: true, disabled: false },
    ],
    [
      { day: 12, isCurrentMonth: true, disabled: false },
      { day: 13, isCurrentMonth: true, disabled: false },
      { day: 14, isCurrentMonth: true, disabled: false },
      { day: 15, isCurrentMonth: true, disabled: false },
      { day: 16, isCurrentMonth: true, disabled: false },
      { day: 17, isCurrentMonth: true, disabled: false },
      { day: 18, isCurrentMonth: true, disabled: false },
    ],
    [
      { day: 19, isCurrentMonth: true, disabled: false },
      { day: 20, isCurrentMonth: true, disabled: false },
      { day: 21, isCurrentMonth: true, disabled: false },
      { day: 22, isCurrentMonth: true, disabled: false },
      { day: 23, isCurrentMonth: true, disabled: false },
      { day: 24, isCurrentMonth: true, disabled: false },
      { day: 25, isCurrentMonth: true, disabled: false },
    ],
    [
      { day: 26, isCurrentMonth: true, disabled: false },
      { day: 27, isCurrentMonth: true, disabled: false },
      { day: 28, isCurrentMonth: true, disabled: false },
      { day: 29, isCurrentMonth: true, disabled: false },
      { day: 30, isCurrentMonth: true, disabled: false },
      { day: 31, isCurrentMonth: true, disabled: false },
      { day: 1, isCurrentMonth: false, disabled: true },
    ],
  ];

  // November 2026: 1 Nov is Sunday
  const novemberWeeks = [
    [
      { day: 26, isCurrentMonth: false, disabled: true },
      { day: 27, isCurrentMonth: false, disabled: true },
      { day: 28, isCurrentMonth: false, disabled: true },
      { day: 29, isCurrentMonth: false, disabled: true },
      { day: 30, isCurrentMonth: false, disabled: true },
      { day: 31, isCurrentMonth: false, disabled: true },
      { day: 1, isCurrentMonth: true, disabled: false },
    ],
    [
      { day: 2, isCurrentMonth: true, disabled: false },
      { day: 3, isCurrentMonth: true, disabled: false },
      { day: 4, isCurrentMonth: true, disabled: false },
      { day: 5, isCurrentMonth: true, disabled: false },
      { day: 6, isCurrentMonth: true, disabled: false },
      { day: 7, isCurrentMonth: true, disabled: false }, // project ends
      { day: 8, isCurrentMonth: true, disabled: true },
    ],
    [
      { day: 9, isCurrentMonth: true, disabled: true },
      { day: 10, isCurrentMonth: true, disabled: true },
      { day: 11, isCurrentMonth: true, disabled: true },
      { day: 12, isCurrentMonth: true, disabled: true },
      { day: 13, isCurrentMonth: true, disabled: true },
      { day: 14, isCurrentMonth: true, disabled: true },
      { day: 15, isCurrentMonth: true, disabled: true },
    ],
    [
      { day: 16, isCurrentMonth: true, disabled: true },
      { day: 17, isCurrentMonth: true, disabled: true },
      { day: 18, isCurrentMonth: true, disabled: true },
      { day: 19, isCurrentMonth: true, disabled: true },
      { day: 20, isCurrentMonth: true, disabled: true },
      { day: 21, isCurrentMonth: true, disabled: true },
      { day: 22, isCurrentMonth: true, disabled: true },
    ],
    [
      { day: 23, isCurrentMonth: true, disabled: true },
      { day: 24, isCurrentMonth: true, disabled: true },
      { day: 25, isCurrentMonth: true, disabled: true },
      { day: 26, isCurrentMonth: true, disabled: true },
      { day: 27, isCurrentMonth: true, disabled: true },
      { day: 28, isCurrentMonth: true, disabled: true },
      { day: 29, isCurrentMonth: true, disabled: true },
    ],
  ];

  const currentWeeks = currentMonthIndex === 0 ? octoberWeeks : novemberWeeks;
  const currentMonthCode = currentMonthIndex === 0 ? "Oct" : "Nov";

  const handleDateClick = (day: number, disabled: boolean, isCurrentMonth: boolean) => {
    if (disabled || !isCurrentMonth) return;
    setSelectedDate({ day, month: currentMonthCode });
    onSelectDate?.(`${day} ${currentMonthCode} 2026`);
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block text-left ${className}`}
      data-node-id="747:9890"
      data-name="Dropdown · Date range · Project"
    >
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className={`bg-white content-stretch flex gap-[8px] h-[40px] items-center px-[12px] py-[8px] rounded-[8px] cursor-pointer transition select-none ${
          isOpen
            ? "border-2 border-[#0d0d10]"
            : "border border-[#e3e5ec] hover:border-[#0d0d10]"
        }`}
        data-node-id="747:9891"
        data-name="Trigger"
      >
        <div className="shrink-0 size-[14px] flex items-center justify-center text-[#0d0d10]" data-name="Icon">
          <Calendar className="size-3.5 stroke-[2]" />
        </div>
        <span className="font-['Inter:Regular'] font-normal text-[13px] text-[#0d0d10] leading-[20px] whitespace-nowrap">
          7 Oct – 7 Nov 2026
        </span>
      </button>

      {/* Popover Calendar */}
      {isOpen && (
        <div
          className="absolute right-0 top-[calc(100%+6px)] z-50 w-[300px] bg-white border border-[#e3e5ec] rounded-[8px] p-[14px] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)] flex flex-col gap-[10px] animate-in fade-in zoom-in-95 duration-100"
          data-node-id="747:9894"
          data-name="Calendar"
        >
          {/* Header */}
          <div className="flex items-center justify-between w-full" data-name="h">
            <button
              type="button"
              onClick={() => setCurrentMonthIndex(0)}
              disabled={currentMonthIndex === 0}
              className="size-6 flex items-center justify-center rounded hover:bg-[#f4f6fb] text-[#0d0d10] disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition"
              title="Previous month"
            >
              <ChevronLeft className="size-4" />
            </button>
            <p className="font-['Inter:Medium'] font-medium text-[14px] text-[#0d0d10] leading-[22px]">
              {monthName}
            </p>
            <button
              type="button"
              onClick={() => setCurrentMonthIndex(1)}
              disabled={currentMonthIndex === 1}
              className="size-6 flex items-center justify-center rounded hover:bg-[#f4f6fb] text-[#0d0d10] disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition"
              title="Next month"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>

          {/* Grid */}
          <div className="flex flex-col gap-[2px] w-full" data-name="Grid">
            {/* Days of Week Header */}
            <div className="flex justify-between w-full" data-name="w">
              {daysOfWeek.map((d) => (
                <div key={d} className="w-[36px] h-[24px] flex items-center justify-center text-[12px] font-normal text-[#8491a3]">
                  {d}
                </div>
              ))}
            </div>

            {/* Weeks and Days */}
            {currentWeeks.map((week, wIdx) => (
              <div key={wIdx} className="flex justify-between w-full" data-name="wk">
                {week.map((cell, cIdx) => {
                  const isSelected =
                    selectedDate.day === cell.day &&
                    selectedDate.month === currentMonthCode &&
                    cell.isCurrentMonth &&
                    !cell.disabled;

                  return (
                    <button
                      key={cIdx}
                      type="button"
                      disabled={cell.disabled || !cell.isCurrentMonth}
                      onClick={() => handleDateClick(cell.day, cell.disabled, cell.isCurrentMonth)}
                      className={`w-[36px] h-[32px] rounded-[6px] flex items-center justify-center text-[12px] transition ${
                        isSelected
                          ? "bg-[#0d0d10] text-white font-medium"
                          : cell.disabled || !cell.isCurrentMonth
                            ? "text-[#a3a3ac] cursor-not-allowed opacity-75"
                            : "text-[#0d0d10] font-normal hover:bg-[#f1f4ff] hover:text-[#3b5bff] cursor-pointer"
                      }`}
                    >
                      {cell.day}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Legend Banner at Bottom */}
          <div
            className="bg-[#f1f4ff] rounded-[6px] px-[12px] py-[10px] flex flex-col gap-[4px] text-[12px] font-normal leading-[16px] w-full text-left"
            data-node-id="747:9990"
            data-name="Legend"
          >
            <p className="text-[#0d0d10] font-medium">
              {selectedDate.day} {selectedDate.month} · inside the project (7 Oct – 7 Nov)
            </p>
            <p className="text-[#4a4a55] text-[11px] leading-[15px]">
              Past dates are off. Dates after 7 Nov are blocked, the project ends then.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
