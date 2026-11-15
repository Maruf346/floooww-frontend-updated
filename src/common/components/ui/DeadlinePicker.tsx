import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

const toIsoDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const formatDeadline = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(
    new Date(`${iso}T00:00:00`),
  );

type DeadlinePickerProps = {
  value: string;
  onChange: (value: string) => void;
  pickerId: string;
  minDate?: string;
  maxDate?: string;
  className?: string;
};

/** The shared deadline picker used by campaign invitations and deliverable edits. */
export function DeadlinePicker({
  value,
  onChange,
  pickerId,
  minDate = "2026-11-02",
  maxDate = "2027-01-31",
  className = "",
}: DeadlinePickerProps) {
  const selectedDate = value ? new Date(`${value}T00:00:00`) : null;
  const [open, setOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(() => selectedDate ?? new Date(2026, 11, 1));
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ left: 0, top: 0, width: 300 });
  const calendarStart = new Date(`${minDate}T00:00:00`);
  const calendarEnd = new Date(`${maxDate}T00:00:00`);
  const monthStart = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1);
  const mondayOffset = (monthStart.getDay() + 6) % 7;
  const daysInMonth = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth() + 1,
    0,
  ).getDate();
  const cellCount = Math.ceil((mondayOffset + daysInMonth) / 7) * 7;
  const gridStart = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1 - mondayOffset);
  const days = Array.from({ length: cellCount }, (_, index) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);
    return date;
  });

  const updatePosition = () => {
    const bounds = triggerRef.current?.getBoundingClientRect();
    if (!bounds) return;
    setPosition({
      left: Math.max(12, Math.min(bounds.left, window.innerWidth - 312)),
      top: bounds.bottom + 6,
      width: 300,
    });
  };

  useEffect(() => {
    if (!open) return;
    updatePosition();
    const close = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!triggerRef.current?.contains(target) && !menuRef.current?.contains(target))
        setOpen(false);
    };
    window.addEventListener("mousedown", close);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("mousedown", close);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  const describeCycle = () => {
    if (!selectedDate) return "Choose a deadline to see which project cycle it belongs to.";
    const iso = toIsoDate(selectedDate);
    if (iso >= "2026-12-02" && iso <= "2027-01-01")
      return `${formatDeadline(iso).replace(" 2026", "")} falls in Cycle 2 · 2 Dec – 1 Jan`;
    if (iso >= "2027-01-02")
      return `${formatDeadline(iso).replace(" 2027", "")} falls in Cycle 3 · 2 Jan – 31 Jan`;
    return `${formatDeadline(iso).replace(" 2026", "")} falls in Cycle 1 · 2 Nov – 1 Dec`;
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-controls={pickerId}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => {
          if (!open) setVisibleMonth(selectedDate ?? new Date(2026, 11, 1));
          setOpen((current) => !current);
        }}
        className={`flex h-10 w-full items-center gap-2 rounded-md border bg-white px-3 text-left text-[13px] text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 ${open ? "border-primary" : "border-line"} ${className}`}
      >
        <CalendarDays size={15} className="shrink-0 text-secondary" />
        <span className="min-w-0 flex-1 truncate">
          {value ? formatDeadline(value) : "dd/mm/yyyy"}
        </span>
      </button>
      {open &&
        createPortal(
          <div
            ref={menuRef}
            id={pickerId}
            role="dialog"
            aria-label="Choose deadline"
            className="fixed z-[10000] overflow-hidden rounded-lg border border-line bg-white p-3 shadow-[0_14px_30px_rgba(11,20,39,0.22)]"
            style={position}
          >
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() =>
                  setVisibleMonth((date) => new Date(date.getFullYear(), date.getMonth() - 1, 1))
                }
                className="grid size-7 place-items-center rounded-md text-secondary hover:bg-subtle"
                aria-label="Previous month"
              >
                <ChevronLeft size={16} />
              </button>
              <p className="text-[14px] font-medium text-ink">
                {new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" }).format(
                  visibleMonth,
                )}
              </p>
              <button
                type="button"
                onClick={() =>
                  setVisibleMonth((date) => new Date(date.getFullYear(), date.getMonth() + 1, 1))
                }
                className="grid size-7 place-items-center rounded-md text-secondary hover:bg-subtle"
                aria-label="Next month"
              >
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="mt-2 grid grid-cols-7 gap-1 text-center">
              {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                <span className="h-5 text-[12px] leading-5 text-secondary" key={day}>
                  {day}
                </span>
              ))}
              {days.map((date) => {
                const iso = toIsoDate(date);
                const outside = date.getMonth() !== visibleMonth.getMonth();
                const blocked = date < calendarStart || date > calendarEnd || outside;
                return (
                  <button
                    key={iso}
                    type="button"
                    disabled={blocked}
                    onClick={() => {
                      onChange(iso);
                      setOpen(false);
                    }}
                    className={`h-8 rounded-md text-[13px] transition ${iso === value ? "bg-primary text-white" : outside || blocked ? "text-tertiary" : "bg-subtle text-ink hover:bg-primary-subtle"}`}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
            <div className="mt-3 rounded-md bg-primary-subtle px-3 py-2">
              <p className="text-[12px] font-medium text-ink">{describeCycle()}</p>
              <p className="mt-1 text-[12px] leading-4 text-secondary">
                Shaded days are cycle 2. Dates after 31 Jan 2027 are blocked; the project ends then.
              </p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
