import { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

/** Reusable compact dashboard/report date selector. */
export function DateRangePicker({ value = "1–28 Oct 2026" }: { value?: string }) {
  const [open, setOpen] = useState(false);
  return <div className="relative"><button type="button" onClick={() => setOpen(!open)} className="flex h-9 items-center gap-2 rounded-md border border-line bg-white px-3 text-[13px] font-medium text-ink hover:bg-subtle"><CalendarDays size={16}/>{value}</button>{open && <div className="absolute right-0 z-30 mt-2 w-[308px] rounded-xl border border-line bg-white p-3 shadow-lg"><div className="mb-3 flex items-center justify-between"><ChevronLeft size={16}/><span className="text-[14px] font-medium">October 2026</span><ChevronRight size={16}/></div><div className="grid grid-cols-7 text-center">{DAYS.map(d=><span key={d} className="h-6 text-[12px] leading-6 text-tertiary">{d}</span>)}{[null,null,null,1,2,3,4,...Array.from({length:27},(_,i)=>i+5)].map((d,i)=><button key={i} disabled={!d} className={`m-0.5 flex size-8 items-center justify-center rounded-full text-[13px] ${!d?"invisible":d===1||d===28?"bg-primary text-white":"bg-primary-subtle text-ink"}`}>{d}</button>)}</div><div className="mt-3 flex justify-end gap-2 border-t border-line-subtle pt-3"><button onClick={()=>setOpen(false)} className="h-8 px-3 text-[13px]">Cancel</button><button onClick={()=>setOpen(false)} className="h-8 rounded-md bg-primary px-3 text-[13px] text-white">Apply</button></div></div>}</div>;
}
