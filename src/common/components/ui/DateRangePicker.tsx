import { useMemo, useState } from "react";
import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  value?: string;
  showCompare?: boolean;
  onApply?: (range: { start: Date; end: Date; compare: boolean }) => void;
};
type Preset =
  | "Today"
  | "Yesterday"
  | "Last 7 days"
  | "Last 28 days"
  | "Last 90 days"
  | "This month"
  | "Last month"
  | "This year"
  | "Custom";

const presets: Preset[] = [
  "Today",
  "Yesterday",
  "Last 7 days",
  "Last 28 days",
  "Last 90 days",
  "This month",
  "Last month",
  "This year",
  "Custom",
];
const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const day = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
const offset = (date: Date, count: number) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + count);
const equal = (left: Date, right: Date) => left.toDateString() === right.toDateString();
const dateInput = (date: Date) => date.toISOString().slice(0, 10);
const inputDate = (value: string) => new Date(value + "T00:00:00");

function rangeFor(preset: Preset) {
  const today = day(new Date());
  if (preset === "Today") return [today, today] as const;
  if (preset === "Yesterday") return [offset(today, -1), offset(today, -1)] as const;
  if (preset === "Last 7 days") return [offset(today, -6), today] as const;
  if (preset === "Last 28 days") return [offset(today, -27), today] as const;
  if (preset === "Last 90 days") return [offset(today, -89), today] as const;
  if (preset === "This month")
    return [new Date(today.getFullYear(), today.getMonth(), 1), today] as const;
  if (preset === "Last month")
    return [
      new Date(today.getFullYear(), today.getMonth() - 1, 1),
      new Date(today.getFullYear(), today.getMonth(), 0),
    ] as const;
  return [new Date(today.getFullYear(), 0, 1), today] as const;
}

function textRange(start: Date, end: Date) {
  const format: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" };
  return (
    start.toLocaleDateString("en-GB", format) + " - " + end.toLocaleDateString("en-GB", format)
  );
}

/** Reusable Figma range selector for all dashboard and report screens. */
export function DateRangePicker({
  value = "1 Oct - 28 Oct 2026",
  showCompare = true,
  onApply,
}: Props) {
  const initialStart = useMemo(() => new Date(2026, 9, 1), []);
  const initialEnd = useMemo(() => new Date(2026, 9, 28), []);
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState(initialStart);
  const [end, setEnd] = useState(initialEnd);
  const [draftStart, setDraftStart] = useState(initialStart);
  const [draftEnd, setDraftEnd] = useState(initialEnd);
  const [month, setMonth] = useState(initialStart);
  const [preset, setPreset] = useState<Preset>("Custom");
  const [compare, setCompare] = useState(showCompare);
  const [label, setLabel] = useState(value);

  const cells = useMemo(() => {
    const first = new Date(month.getFullYear(), month.getMonth(), 1);
    const blankCount = (first.getDay() + 6) % 7;
    const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    return [
      ...Array<Date | undefined>(blankCount),
      ...Array.from(
        { length: days },
        (_, index) => new Date(month.getFullYear(), month.getMonth(), index + 1),
      ),
    ];
  }, [month]);

  const pick = (date: Date) => {
    setPreset("Custom");
    if (draftEnd || date < draftStart) {
      setDraftStart(date);
      setDraftEnd(undefined as unknown as Date);
    } else {
      setDraftEnd(date);
    }
  };
  const choosePreset = (next: Preset) => {
    setPreset(next);
    if (next === "Custom") return;
    const selected = rangeFor(next);
    setDraftStart(selected[0]);
    setDraftEnd(selected[1]);
    setMonth(selected[1]);
  };
  const cancel = () => {
    setDraftStart(start);
    setDraftEnd(end);
    setOpen(false);
  };
  const apply = () => {
    const actualEnd = draftEnd || draftStart;
    setStart(draftStart);
    setEnd(actualEnd);
    setLabel(textRange(draftStart, actualEnd));
    onApply?.({ start: draftStart, end: actualEnd, compare });
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => {
          setDraftStart(start);
          setDraftEnd(end);
          setMonth(start);
          setOpen(true);
        }}
        className="flex h-10 items-center gap-2 rounded-md border border-line bg-white px-3 text-[12px] font-medium text-ink hover:bg-subtle"
      >
        <CalendarDays size={16} />
        <span>{label}</span>
        {showCompare && compare && <span className="font-normal text-tertiary">vs previous</span>}
        <ChevronDown size={14} />
      </button>
      {open && (
        <div className="fixed inset-x-4 top-20 z-40 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-xl border border-line bg-white shadow-[0_12px_32px_rgba(0,0,0,.14)] sm:absolute sm:inset-x-auto sm:right-0 sm:top-auto sm:mt-2 sm:max-h-none sm:w-[474px] sm:overflow-visible">
          <div className="flex flex-col sm:flex-row">
            <nav className="flex gap-1 overflow-x-auto border-b border-line-subtle p-3 sm:w-[180px] sm:flex-col sm:overflow-visible sm:border-b-0 sm:border-r">
              {presets.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => choosePreset(item)}
                  className={
                    preset === item
                      ? "shrink-0 rounded-md bg-primary-subtle px-2.5 py-2 text-left text-[13px] leading-5 text-primary"
                      : "shrink-0 rounded-md px-2.5 py-2 text-left text-[13px] leading-5 hover:bg-subtle"
                  }
                >
                  {item}
                </button>
              ))}
            </nav>
            <section className="p-5">
              <div className="flex h-6 items-center justify-between">
                <button
                  type="button"
                  aria-label="Previous month"
                  onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
                >
                  <ChevronLeft size={16} />
                </button>
                <p className="text-[14px] font-medium leading-[22px]">
                  {month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </p>
                <button
                  type="button"
                  aria-label="Next month"
                  onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className="mt-2 grid grid-cols-7">
                {weekdays.map((weekday) => (
                  <span
                    key={weekday}
                    className="flex h-6 w-9 items-center justify-center text-[12px] text-tertiary"
                  >
                    {weekday}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-7">
                {cells.map((date, index) => {
                  if (!date) return <span key={"blank-" + index} className="size-9" />;
                  const isStart = equal(date, draftStart);
                  const isEnd = Boolean(draftEnd && equal(date, draftEnd));
                  const inRange = Boolean(draftEnd && date > draftStart && date < draftEnd);
                  const background =
                    isStart && !isEnd
                      ? "rounded-l-full bg-primary-subtle"
                      : isEnd && !isStart
                        ? "rounded-r-full bg-primary-subtle"
                        : inRange
                          ? "bg-primary-subtle"
                          : "";
                  const circle =
                    isStart || isEnd
                      ? "flex size-9 items-center justify-center rounded-full bg-primary text-[12px] font-medium text-white"
                      : "flex size-9 items-center justify-center rounded-full text-[13px] hover:border hover:border-line-strong";
                  return (
                    <button
                      key={date.toISOString()}
                      type="button"
                      onClick={() => pick(date)}
                      className={"flex size-9 items-center justify-center " + background}
                    >
                      <span className={circle}>{date.getDate()}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>
          <div className="flex flex-col gap-3 border-t border-line-subtle px-5 py-3.5">
            {showCompare && (
              <div className="flex flex-wrap items-center gap-[10px]">
                <button
                  type="button"
                  role="switch"
                  aria-label="Compare with previous period"
                  aria-checked={compare}
                  onClick={() => setCompare((enabled) => !enabled)}
                  className={
                    compare
                      ? "flex h-5 w-9 shrink-0 items-center rounded-full bg-primary p-0.5 transition-colors"
                      : "flex h-5 w-9 shrink-0 items-center rounded-full bg-muted p-0.5 transition-colors"
                  }
                >
                  <span
                    className={
                      compare
                        ? "ml-auto size-4 rounded-full bg-white shadow-sm"
                        : "mr-auto size-4 rounded-full bg-white shadow-sm"
                    }
                  />
                </button>
                <span className="shrink-0 text-[13px] leading-5">Compare with</span>
                {compare && (
                  <button
                    type="button"
                    className="ml-0 inline-flex h-9 items-center gap-2 rounded-md border border-line px-2.5 text-[13px]"
                  >
                    Previous period - 3-30 Sep 2026 <ChevronDown size={14} />
                  </button>
                )}
              </div>
            )}
            <div className="flex flex-wrap items-center gap-2.5">
              <label className="flex h-9 items-center gap-2 rounded-md border border-line px-2.5">
                <CalendarDays size={14} />
                <input
                  aria-label="Start date"
                  type="date"
                  value={dateInput(draftStart)}
                  onChange={(event) => {
                    setDraftStart(inputDate(event.target.value));
                    setPreset("Custom");
                  }}
                  className="w-[112px] bg-transparent text-[13px] outline-none"
                />
              </label>
              <span className="text-[13px] text-tertiary">-</span>
              <label className="flex h-9 items-center gap-2 rounded-md border border-line px-2.5">
                <CalendarDays size={14} />
                <input
                  aria-label="End date"
                  type="date"
                  value={dateInput(draftEnd || draftStart)}
                  onChange={(event) => {
                    setDraftEnd(inputDate(event.target.value));
                    setPreset("Custom");
                  }}
                  className="w-[112px] bg-transparent text-[13px] outline-none"
                />
              </label>
              <div className="flex-1" />
              <button
                type="button"
                onClick={cancel}
                className="h-8 rounded-md px-3 text-[13px] font-medium hover:bg-subtle"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={apply}
                className="h-8 rounded-md bg-primary px-3 text-[13px] font-medium text-white"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
