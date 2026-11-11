import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown, Plus, X } from "lucide-react";

export type DropdownOption = { value: string; label?: string; description?: string };

type DropdownProps = {
  value: string;
  options: DropdownOption[] | string[];
  onChange: (value: string) => void;
  ariaLabel: string;
  icon?: React.ReactNode;
  placeholder?: string;
  displayValue?: string;
  otherLabel?: string;
  otherPlaceholder?: string;
  onOther?: (value: string) => void;
  compact?: boolean;
  className?: string;
};

type MultiDropdownProps = Omit<DropdownProps, "value" | "onChange" | "onOther"> & {
  values: string[];
  onChange: (values: string[]) => void;
  hint?: string;
  onOther?: (value: string) => void;
  removableValues?: string[];
  onRemoveOption?: (value: string) => void;
};

export function Dropdown({ value, options, onChange, ariaLabel, icon, placeholder, displayValue, otherLabel, otherPlaceholder = "Describe the content", onOther, compact = false, className = "" }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [addingOther, setAddingOther] = useState(false);
  const [otherValue, setOtherValue] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const items = options.map((option) => typeof option === "string" ? { value: option } : option);
  const selected = items.find((item) => item.value === value);

  useEffect(() => {
    const close = (event: MouseEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
    window.addEventListener("mousedown", close);
    return () => window.removeEventListener("mousedown", close);
  }, []);

  const choose = (next: string) => { onChange(next); setOpen(false); };
  const saveOther = () => { const next = otherValue.trim(); if (!next) return; onOther?.(next); choose(next); setOtherValue(""); setAddingOther(false); };
  return <div className={`relative min-w-0 ${open ? "z-[100]" : "z-0"} ${className}`} ref={root}>
    <button aria-controls={menuId} aria-expanded={open} aria-haspopup="listbox" aria-label={ariaLabel} className={`flex w-full items-center gap-2 rounded-md border bg-white text-left text-[13px] leading-5 text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 ${compact ? "h-8 px-2.5" : "h-10 px-3"} ${open ? "border-primary" : "border-line"}`} onClick={() => setOpen((current) => !current)} type="button">
      {icon && <span className="flex size-4 shrink-0 items-center justify-center">{icon}</span>}
      <span className="min-w-0 flex-1 truncate">{displayValue ?? selected?.label ?? selected?.value ?? placeholder}</span><ChevronDown className={`shrink-0 text-secondary transition-transform duration-150 ${open ? "rotate-180" : ""}`} size={compact ? 13 : 16} />
    </button>
    {open && <div className="absolute left-0 top-[calc(100%+6px)] z-[100] w-full min-w-max overflow-hidden rounded-md border border-line bg-white p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.12)]" id={menuId} role="listbox" aria-label={ariaLabel}>
      {items.map((item) => { const active = item.value === value; return <button aria-selected={active} className={`flex w-full items-center gap-2.5 rounded-sm px-2.5 py-2 text-left text-[13px] leading-5 transition-colors ${active ? "bg-primary-subtle text-primary" : "text-ink hover:bg-subtle"}`} key={item.value} onClick={() => choose(item.value)} role="option" type="button"><span className="min-w-0 flex-1">{item.label ?? item.value}{item.description && <span className="mt-px block text-[12px] leading-4 text-tertiary">{item.description}</span>}</span>{active && <Check className="shrink-0" size={14} />}</button>; })}
      {otherLabel && <><div className="my-1 h-px bg-line-subtle" />{addingOther ? <div className="flex gap-2 px-2.5 py-2"><input autoFocus aria-label="Custom option" className="h-8 min-w-0 flex-1 rounded-md border border-line px-2 text-[13px] leading-5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" onChange={(event) => setOtherValue(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); saveOther(); } }} placeholder={otherPlaceholder} value={otherValue} /><button className="h-8 rounded-md bg-primary px-3 text-[13px] font-medium text-white disabled:opacity-45" disabled={!otherValue.trim()} onClick={saveOther} type="button">Save</button></div> : <button className="flex w-full items-center gap-2 rounded-sm px-2.5 py-2 text-left text-[13px] leading-5 text-link transition-colors hover:bg-primary-subtle" onClick={() => setAddingOther(true)} type="button"><Plus size={14} />{otherLabel}</button>}</>}
    </div>}
  </div>;
}

export function MultiDropdown({ values, options, onChange, ariaLabel, icon, placeholder = "Select options", otherLabel, otherPlaceholder = "Type an option", onOther, removableValues = [], onRemoveOption, compact = false, className = "", hint = "Pick one or more" }: MultiDropdownProps) {
  const [open, setOpen] = useState(false);
  const [addingOther, setAddingOther] = useState(false);
  const [otherValue, setOtherValue] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const items = options.map((option) => typeof option === "string" ? { value: option } : option);
  const selectedText = values.length ? values.join(", ") : placeholder;
  useEffect(() => {
    const close = (event: MouseEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
    window.addEventListener("mousedown", close);
    return () => window.removeEventListener("mousedown", close);
  }, []);
  const toggle = (item: string) => onChange(values.includes(item) ? values.filter((value) => value !== item) : [...values, item]);
  const saveOther = () => { const next = otherValue.trim(); if (!next) return; onOther?.(next); setOtherValue(""); setAddingOther(false); };

  return <div className={`relative min-w-0 ${open ? "z-[100]" : "z-0"} ${className}`} ref={root}>
    <button aria-controls={menuId} aria-expanded={open} aria-haspopup="listbox" aria-label={ariaLabel} className={`flex w-full items-center gap-2 rounded-md border bg-white text-left text-[13px] leading-5 text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 ${compact ? "h-8 px-2.5" : "h-10 px-3"} ${open ? "border-[1.5px] border-primary" : "border-line"}`} onClick={() => setOpen((current) => !current)} type="button">
      {icon && <span className="flex size-4 shrink-0 items-center justify-center">{icon}</span>}<span className="min-w-0 flex-1 truncate">{selectedText}</span><ChevronDown className={`shrink-0 text-secondary transition-transform duration-150 ${open ? "rotate-180" : ""}`} size={compact ? 13 : 16} />
    </button>
    {open && <div className="absolute left-0 top-[calc(100%+6px)] z-[100] w-full min-w-max overflow-hidden rounded-md border border-line bg-white p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.12)]" id={menuId} role="listbox" aria-label={ariaLabel} aria-multiselectable="true">
      <p className="px-2.5 py-1.5 text-[12px] leading-4 text-tertiary">{hint}</p>
      {items.map((item) => { const selected = values.includes(item.value); const removable = removableValues.includes(item.value); return <div className="flex w-full items-center rounded-sm transition-colors hover:bg-subtle" key={item.value}><button aria-selected={selected} className="flex min-w-0 flex-1 items-center gap-2.5 px-2.5 py-2 text-left text-[13px] leading-5 text-ink" onClick={() => toggle(item.value)} role="option" type="button"><span className={`flex size-4 shrink-0 items-center justify-center rounded-[4px] border ${selected ? "border-primary bg-primary text-white" : "border-line-strong bg-white"}`}>{selected && <Check size={12} strokeWidth={3} />}</span><span className="min-w-0">{item.label ?? item.value}{item.description && <span className="mt-px block text-[12px] leading-4 text-tertiary">{item.description}</span>}</span></button>{removable && <button aria-label={`Remove ${item.label ?? item.value}`} className="mr-1 flex size-7 shrink-0 items-center justify-center rounded-sm text-secondary hover:bg-muted hover:text-ink" onClick={() => onRemoveOption?.(item.value)} type="button"><X size={14} /></button>}</div>; })}
      {otherLabel && <><div className="my-1 h-px bg-line-subtle" />{addingOther ? <div className="flex gap-2 px-2.5 py-2"><input autoFocus aria-label="Custom option" className="h-8 min-w-0 flex-1 rounded-md border border-line px-2 text-[13px] leading-5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" onChange={(event) => setOtherValue(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); saveOther(); } }} placeholder={otherPlaceholder} value={otherValue} /><button className="h-8 rounded-md bg-primary px-3 text-[13px] font-medium text-white transition hover:bg-primary-hover disabled:opacity-45" disabled={!otherValue.trim()} onClick={saveOther} type="button">Save</button></div> : <button className="flex w-full items-center gap-2 rounded-sm px-2.5 py-2 text-left text-[13px] leading-5 text-link transition-colors hover:bg-primary-subtle" onClick={() => setAddingOther(true)} type="button"><Plus size={14} />{otherLabel}</button>}</>}
    </div>}
  </div>;
}
