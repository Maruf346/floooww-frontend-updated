import { useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Copy,
  Download,
  FilePenLine,
  Info,
  PencilLine,
  Plus,
  Search,
  Share2,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { AgencyShell } from "@/agency/components/AgencyShell";
import { PerformanceReportBlocks } from "@/brand/pages/BrandProjectPerformancePage";
import { Button } from "@/common/components/ui/Button";
import { ROUTES } from "@/common/constants/routes";

type ProjectFilter = {
  label: string;
  placeholder: string;
  options: readonly string[];
  searchable?: boolean;
  searchPlaceholder?: string;
};

const dateOptions = [
  "Project dates",
  "Today",
  "Yesterday",
  "Last 7 days",
  "Last 28 days",
  "Last 90 days",
  "This month",
  "Last month",
  "This year",
  "Custom...",
];

const comparisonOptions = [
  "Previous period",
  "Same period last year",
  "Project average",
  "No comparison",
];

const clientFilterField: ProjectFilter = {
  label: "Clients",
  placeholder: "Search clients",
  searchable: true,
  searchPlaceholder: "Search clients",
  options: [
    "All clients",
    "Minimalist",
    "Dewdrop Naturals",
    "Velvet Lip Co.",
    "Strand Studio",
    "Petal & Pine",
  ],
};

const projectFilterFields: ProjectFilter[] = [
  {
    label: "Projects",
    placeholder: "Search projects",
    searchable: true,
    searchPlaceholder: "Search projects",
    options: [
      "All projects",
      "Minimalist · Vitamin-C Serum - Live",
      "Minimalist · Glow Squad - Live - month 3 of 6",
      "Dewdrop · Monsoon Sunscreen - Live",
      "Velvet Lip · Lip Tint Drop - Live",
      "Dewdrop · Hydration Bundle - Live",
      "Strand Studio · Skin Quiz Leads - Upcoming",
    ],
  },
  { label: "Project type", placeholder: "Select...", options: ["Influencer marketing", "UGC"] },
  { label: "Partnership", placeholder: "Select...", options: ["Paid", "Gift exchange"] },
  { label: "Duration", placeholder: "Select...", options: ["One-time", "Long-term"] },
  {
    label: "Project status",
    placeholder: "Select...",
    options: ["Live", "Paused", "Upcoming", "Completed", "Draft", "Archived"],
  },
  {
    label: "Cycle (long-term)",
    placeholder: "Select...",
    options: ["Cycle 1", "Cycle 2", "Cycle 3", "Current cycle"],
  },
  { label: "Target type", placeholder: "Select...", options: ["Net sales", "Orders", "Views"] },
  {
    label: "Content language",
    placeholder: "Select...",
    options: ["English", "Hindi", "Tamil", "Telugu", "Kannada", "Marathi", "Bengali"],
  },
];

const creatorFilterFields: ProjectFilter[] = [
  {
    label: "Creators",
    placeholder: "Search invited creators",
    searchable: true,
    searchPlaceholder: "Search invited creators",
    options: [
      "All creators",
      "Meera Iyer · @meerabeauty",
      "Ishita Rao · @ishitarao",
      "Emma Clarke · @emmaclarke",
      "Kavya Reddy · @kavyareddy",
      "Tara Bose · @tarabose",
      "Diya Kapoor · @diyaglows",
    ],
  },
  {
    label: "Deliverable progress",
    placeholder: "Select...",
    options: ["Completed", "In progress", "Behind", "Not started"],
  },
  {
    label: "Invite status",
    placeholder: "Select...",
    options: ["Invited", "Accepted", "Declined", "Applied", "Shortlisted"],
  },
  {
    label: "Followers",
    placeholder: "Select...",
    options: ["10K - 50K", "50K - 1 L", "1 L - 5 L", "5 L +"],
  },
  {
    label: "Niche",
    placeholder: "Select...",
    options: ["Beauty", "Skincare", "Fashion", "Lifestyle", "Wellness", "Men's grooming"],
  },
  {
    label: "Creator city",
    placeholder: "Select...",
    options: [
      "Mumbai",
      "Delhi NCR",
      "Bengaluru",
      "Pune",
      "Chennai",
      "Hyderabad",
      "Kolkata",
      "Kochi",
    ],
  },
  {
    label: "Language",
    placeholder: "Select...",
    options: ["English", "Hindi", "Tamil", "Telugu", "Kannada", "Marathi", "Bengali"],
  },
  {
    label: "Rate vs budget",
    placeholder: "Select...",
    options: ["At your budget", "Above budget", "Below budget"],
  },
  {
    label: "Creator relationship",
    placeholder: "Select...",
    options: ["New", "Returning"],
  },
];

const platformFilter: ProjectFilter = {
  label: "Platform",
  placeholder: "Select...",
  options: ["Instagram", "YouTube", "Pinterest", "Snapchat"],
};

const contentFilterFields: ProjectFilter[] = [
  {
    label: "Content type",
    placeholder: "Select...",
    options: [
      "Reel",
      "Story",
      "Story with link",
      "Short",
      "Video",
      "Carousel",
      "Photo post",
      "Idea Pin",
      "Snap Story",
      "UGC file",
    ],
  },
  {
    label: "Content status",
    placeholder: "Select...",
    options: [
      "Awaiting approval",
      "Changes requested",
      "Approved - not live",
      "Live",
      "Overdue - not live",
    ],
  },
  {
    label: "Deliverable",
    placeholder: "Search deliverables",
    searchable: true,
    searchPlaceholder: "Search deliverables",
    options: [
      "Reel 1 - festive GRWM",
      "Reel 2 - beach-day reapply",
      "Short - SPF myths",
      "Story - last reminder",
    ],
  },
  {
    label: "Product in deliverable",
    placeholder: "Search products",
    searchable: true,
    searchPlaceholder: "Search products",
    options: [
      "Vitamin C Glow Serum",
      "Sunscreen gel SPF 50",
      "Glow Squad kit",
      "Festive gift set",
      "Winter Lip Care Kit",
    ],
  },
  {
    label: "Reel length",
    placeholder: "Select...",
    options: ["15-30 s", "30-45 s", "45-90 s"],
  },
  {
    label: "UGC content type",
    placeholder: "Select...",
    options: [
      "Unboxing",
      "Product demo",
      "Before and after",
      "Testimonial",
      "How-to",
      "Lifestyle photo set",
      "Short ad cut",
      "Routine walkthrough",
    ],
  },
  {
    label: "UGC delivered as",
    placeholder: "Select...",
    options: ["Video file", "Photo files", "Video and photos"],
  },
  {
    label: "Usage rights",
    placeholder: "Select...",
    options: ["Organic", "Paid ads", "Perpetual"],
  },
  {
    label: "Rights ending",
    placeholder: "Select...",
    options: ["Active", "Ends in 30 days", "Expired"],
  },
  {
    label: "Approval",
    placeholder: "Select...",
    options: ["Approved first time", "Changes requested"],
  },
  {
    label: "Change-request reason",
    placeholder: "Select...",
    options: [
      "Paid-partnership label missing",
      "Code not said or shown",
      "Wrong product or shade",
      "Too short or too long",
      "Off-brief message",
      "Audio or lighting issue",
    ],
  },
  {
    label: "Posting time",
    placeholder: "Select...",
    options: ["Weekday - Mon-Fri", "Weekend", "Morning", "Afternoon", "Evening", "Night"],
  },
];

const conversionFilterFields: ProjectFilter[] = [
  {
    label: "Attribution source",
    placeholder: "Search codes and links",
    searchable: true,
    searchPlaceholder: "Search codes and links",
    options: [
      "ISHITA15 - coupon",
      "ISHITA7DAY - coupon",
      "flw.to/diya-reel - link",
      "utm_content=reel_grwm - link",
    ],
  },
  {
    label: "Attribution type",
    placeholder: "Select...",
    options: ["Coupon code", "UTM link"],
  },
  {
    label: "Customer status",
    placeholder: "Select...",
    options: ["New", "Returning"],
  },
  {
    label: "Order status",
    placeholder: "Select...",
    options: ["Fulfilled", "Returned", "Cancelled"],
  },
  {
    label: "Products ordered",
    placeholder: "Search store products",
    searchable: true,
    searchPlaceholder: "Search store products",
    options: ["Vitamin C Glow Serum", "Sunscreen gel SPF 50", "Glow Squad kit", "Festive gift set"],
  },
];

const audienceFilterFields: ProjectFilter[] = [
  {
    label: "Audience reach",
    placeholder: "Select...",
    options: ["Followers", "New audience (non-followers)"],
  },
  {
    label: "Age",
    placeholder: "Select...",
    options: ["13-17", "18-24", "25-34", "35-44", "45+"],
  },
  {
    label: "Gender",
    placeholder: "Select...",
    options: ["Women", "Men"],
  },
  {
    label: "Country",
    placeholder: "Select...",
    options: ["India", "UAE", "United States", "United Kingdom", "Singapore"],
  },
  {
    label: "City",
    placeholder: "Select...",
    options: ["Bengaluru", "Mumbai", "Delhi NCR", "Chennai", "Hyderabad", "Pune"],
  },
];

type ThresholdFilterConfig = {
  label: string;
  value: string;
  mode: "Above" | "Below" | "Between";
  lowerIsBetter?: boolean;
};

const performanceThresholds: ThresholdFilterConfig[] = [
  { label: "ROAS", value: "3x", mode: "Above" },
  { label: "Net sales", value: "₹50,000", mode: "Above" },
  { label: "Orders", value: "100", mode: "Above" },
  { label: "Link clicks", value: "1,000", mode: "Above" },
  { label: "Add to cart", value: "200", mode: "Above" },
  { label: "Checkouts", value: "100", mode: "Above" },
  { label: "Conversion rate", value: "10%", mode: "Above" },
  { label: "Returning customers", value: "20%", mode: "Above" },
  { label: "Views", value: "1 L", mode: "Above" },
  { label: "Engagement rate", value: "4%", mode: "Above" },
  { label: "Cost per order (CPA)", value: "₹150", mode: "Below", lowerIsBetter: true },
  { label: "Cost per new customer (CAC)", value: "₹300", mode: "Below", lowerIsBetter: true },
  { label: "Cost per link click (CPC)", value: "₹15", mode: "Below", lowerIsBetter: true },
  { label: "Cost per 1,000 views (CPM)", value: "₹100", mode: "Below", lowerIsBetter: true },
  { label: "Cost per engagement (CPE)", value: "₹2", mode: "Below", lowerIsBetter: true },
];

const paymentFilterFields: ProjectFilter[] = [
  {
    label: "Payment status",
    placeholder: "Select...",
    options: ["Paid", "Held in escrow", "Not funded", "Refunded"],
  },
  {
    label: "Dispute",
    placeholder: "Select...",
    options: ["Open", "Under review", "Resolved", "No dispute"],
  },
  {
    label: "Dispute reason",
    placeholder: "Select...",
    options: ["Late delivery", "Doesn't match brief", "Posted then deleted", "Other"],
  },
  {
    label: "Payment method",
    placeholder: "Select...",
    options: ["UPI AutoPay", "Card"],
  },
  {
    label: "Invoice",
    placeholder: "Select...",
    options: ["With GST invoice", "Without"],
  },
];

const deliveryFilterFields: ProjectFilter[] = [
  {
    label: "Delivery status",
    placeholder: "Select...",
    options: ["On time", "Overdue", "Delivered", "Not started"],
  },
  {
    label: "Shipment status",
    placeholder: "Select...",
    options: ["Sent", "In transit", "Out for delivery", "Delivered"],
  },
  {
    label: "Courier",
    placeholder: "Select...",
    options: ["Delhivery", "Blue Dart", "DTDC", "Shiprocket", "Ecom", "XpressBees", "India Post"],
  },
  {
    label: "UGC turnaround",
    placeholder: "Select...",
    options: ["Within 2 days", "Within 3 days", "Within 5 days", "Within 7 days", "Within 10 days"],
  },
  {
    label: "Fulfilment method",
    placeholder: "Select...",
    options: ["₹0 Shopify order", "Own shipping", "Shiprocket", "Store pickup", "Gift card"],
  },
  {
    label: "Ship from",
    placeholder: "Select...",
    options: [
      "Minimalist warehouse - Bhiwandi",
      "Dewdrop warehouse - Bengaluru",
      "Velvet Lip Co. - Mumbai",
      "Office - Andheri East",
    ],
  },
];

function ThresholdFilter({
  label,
  value: initialValue,
  mode: initialMode,
  lowerIsBetter,
  onChange,
}: ThresholdFilterConfig & { onChange?: (label: string, value: string) => void }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<ThresholdFilterConfig["mode"]>(initialMode);
  const [value, setValue] = useState(initialValue);
  return (
    <div className={"relative " + (open ? "z-[80]" : "z-10")}>
      <span className="mb-1 block text-[11px] font-medium leading-4 text-[#394357]">{label}</span>
      <button
        aria-expanded={open}
        className={
          "flex h-9 w-full items-center gap-1.5 rounded-md border bg-white px-2.5 text-left text-[12px] leading-4 text-ink " +
          (open ? "border-primary ring-1 ring-primary" : "border-line hover:bg-subtle")
        }
        onClick={() => setOpen((shown) => !shown)}
        type="button"
      >
        <span className="min-w-0 flex-1 truncate">
          {mode} {value}
        </span>
        <ChevronDown
          className={"shrink-0 text-tertiary transition-transform " + (open ? "rotate-180" : "")}
          size={13}
        />
      </button>
      {open && (
        <div className="absolute left-0 top-[calc(100%+4px)] z-[90] w-full min-w-[200px] rounded-md border border-line bg-white p-2.5 shadow-[0_12px_28px_rgba(15,23,42,0.14)]">
          <div className="flex rounded-full bg-subtle p-0.5">
            {(["Above", "Below", "Between"] as const).map((option) => (
              <button
                className={
                  "flex-1 rounded-full px-1.5 py-1 text-[9px] leading-3 " +
                  (option === mode
                    ? "bg-ink font-medium text-white"
                    : "text-secondary hover:bg-white")
                }
                key={option}
                onClick={() => {
                  setMode(option);
                  onChange?.(label, option + " " + value);
                }}
                type="button"
              >
                {option}
              </button>
            ))}
          </div>
          <div className="mt-2 flex gap-1.5">
            <input
              className="h-8 min-w-0 flex-1 rounded border border-line bg-white px-2 text-[11px] text-ink outline-none placeholder:text-tertiary focus:border-primary"
              onChange={(event) => {
                setValue(event.target.value);
                onChange?.(label, mode + " " + event.target.value);
              }}
              value={value}
            />
            {mode === "Between" && (
              <input
                aria-label={label + " upper value"}
                className="h-8 min-w-0 flex-1 rounded border border-line bg-white px-2 text-[11px] text-ink outline-none placeholder:text-tertiary focus:border-primary"
                placeholder="To"
              />
            )}
          </div>
          <p className="mt-1.5 text-[9px] leading-3 text-tertiary">
            {lowerIsBetter ? "For costs, lower is better" : "Compared with the project average"}
          </p>
        </div>
      )}
    </div>
  );
}

function RadioFilter({
  label,
  value,
  onChange,
  options,
  placeholder = "Select...",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={"relative " + (open ? "z-[80]" : "z-10")}>
      <span className="mb-1 block text-[11px] font-medium leading-4 text-[#394357]">{label}</span>
      <button
        aria-expanded={open}
        className={
          "flex h-9 w-full items-center gap-1.5 rounded-md border bg-white px-2.5 text-left text-[12px] leading-4 text-ink " +
          (open ? "border-primary ring-1 ring-primary" : "border-line hover:bg-subtle")
        }
        onClick={() => setOpen((shown) => !shown)}
        type="button"
      >
        <span className={"min-w-0 flex-1 truncate " + (value ? "" : "text-tertiary")}>
          {value || placeholder}
        </span>
        <ChevronDown
          className={"shrink-0 text-tertiary transition-transform " + (open ? "rotate-180" : "")}
          size={13}
        />
      </button>
      {open && (
        <div className="absolute left-0 top-[calc(100%+4px)] z-[90] w-full min-w-[154px] rounded-md border border-line bg-white p-1 shadow-[0_12px_28px_rgba(15,23,42,0.14)]">
          {options.map((option) => (
            <button
              className={
                "flex w-full items-center gap-2 rounded px-1.5 py-1 text-left text-[10px] leading-4 " +
                (option === value ? "bg-primary-subtle text-ink" : "text-ink hover:bg-subtle")
              }
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              type="button"
            >
              <span
                className={
                  "grid size-3 shrink-0 place-items-center rounded-full border " +
                  (option === value ? "border-primary bg-primary" : "border-line bg-white")
                }
              >
                {option === value && <span className="size-1 rounded-full bg-white" />}
              </span>
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectMultiSelect({
  label,
  placeholder,
  options,
  searchable,
  searchPlaceholder,
  onApply,
  defaultSelected = [],
}: ProjectFilter & {
  defaultSelected?: string[];
  onApply?: (label: string, values: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>(defaultSelected);
  const [draft, setDraft] = useState<string[]>(defaultSelected);

  const filtered = useMemo(
    () => options.filter((option) => option.toLowerCase().includes(search.toLowerCase())),
    [options, search],
  );

  const shown =
    selected.length === 0
      ? placeholder
      : selected.length === 1
        ? selected[0]
        : selected.length + " selected";

  const toggle = (option: string) =>
    setDraft((items) =>
      items.includes(option) ? items.filter((item) => item !== option) : [...items, option],
    );

  return (
    <div className={"relative " + (open ? "z-[70]" : "z-10")}>
      <span className="mb-1 block text-[11px] font-medium leading-4 text-[#394357]">{label}</span>
      <button
        aria-expanded={open}
        className={
          "flex h-9 w-full items-center gap-1.5 rounded-md border bg-white px-2.5 text-left text-[12px] leading-4 " +
          (open
            ? "border-primary ring-1 ring-primary text-ink"
            : "border-line text-tertiary hover:bg-subtle")
        }
        onClick={() => {
          setDraft(selected);
          setOpen((shown) => !shown);
        }}
        type="button"
      >
        <span className="min-w-0 flex-1 truncate">{shown}</span>
        <ChevronDown
          className={
            "shrink-0 transition-transform " + (open ? "rotate-180 text-primary" : "text-tertiary")
          }
          size={13}
        />
      </button>
      {open && (
        <div className="absolute left-0 top-[calc(100%+4px)] z-[90] w-full min-w-[170px] overflow-hidden rounded-md border border-line bg-white shadow-[0_12px_28px_rgba(15,23,42,0.14)]">
          {searchable && (
            <div className="p-1.5 pb-1">
              <label className="flex h-7 items-center gap-1.5 rounded border border-line bg-white px-2 text-tertiary">
                <Search size={11} />
                <input
                  autoFocus
                  className="min-w-0 flex-1 bg-transparent text-[10px] outline-none placeholder:text-tertiary"
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={searchPlaceholder ?? "Search"}
                  value={search}
                />
              </label>
            </div>
          )}
          <div className="max-h-[214px] overflow-y-auto px-1.5 pb-1">
            {filtered.map((option) => {
              const checked = draft.includes(option);
              return (
                <button
                  className="flex w-full items-center gap-1.5 rounded px-1.5 py-1 text-left text-[10px] leading-4 text-ink hover:bg-subtle cursor-pointer"
                  key={option}
                  onClick={() => toggle(option)}
                  type="button"
                >
                  <span
                    className={
                      "grid size-3 shrink-0 place-items-center rounded-sm border " +
                      (checked ? "border-primary bg-primary text-white" : "border-line bg-white")
                    }
                  >
                    {checked && <Check size={10} strokeWidth={3} />}
                  </span>
                  <span className="min-w-0 truncate">{option}</span>
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-1 border-t border-line px-1.5 py-1.5 text-[9px]">
            <button
              className="text-tertiary hover:text-ink cursor-pointer"
              onClick={() => setDraft([...options])}
              type="button"
            >
              Select all
            </button>
            <span className="flex-1" />
            <button
              className="text-tertiary hover:text-ink cursor-pointer"
              onClick={() => setDraft([])}
              type="button"
            >
              Clear
            </button>
            <button
              className="rounded bg-ink px-2 py-1 font-medium text-white cursor-pointer"
              onClick={() => {
                setSelected(draft);
                onApply?.(label, draft);
                setOpen(false);
                setSearch("");
              }}
              type="button"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ShareModal({
  isOpen,
  onClose,
  reportTitle,
}: {
  isOpen: boolean;
  onClose: () => void;
  reportTitle: string;
}) {
  const [copied, setCopied] = useState(false);
  const [permission, setPermission] = useState("view");
  const shareUrl = `${window.location.origin}/agency/reports/${encodeURIComponent(
    reportTitle.toLowerCase().replace(/\s+/g, "-"),
  )}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-[#e3e5ec]">
        <div className="flex items-center justify-between pb-3 border-b border-[#e3e5ec]">
          <div>
            <h3 className="text-[16px] font-semibold text-[#0d0d10]">Share custom report</h3>
            <p className="text-[12px] text-[#71717a] mt-0.5">{reportTitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#71717a] hover:bg-[#f4f6fb] hover:text-[#0d0d10] cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <div>
            <label className="text-[12px] font-medium text-[#394357] block mb-1.5">
              Report share link
            </label>
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={shareUrl}
                className="flex-1 h-9 px-3 rounded-lg border border-[#e3e5ec] bg-[#f8fafc] text-[12px] text-[#0d0d10] outline-none"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 h-9 px-3.5 rounded-lg bg-[#0d0d10] text-white text-[12px] font-medium hover:bg-[#202024] cursor-pointer shrink-0"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>

          <div>
            <label className="text-[12px] font-medium text-[#394357] block mb-1.5">
              Access permissions
            </label>
            <div className="space-y-2">
              {[
                {
                  id: "view",
                  title: "Anyone in Brightside Agency can view",
                  desc: "Team members can open and read this report",
                },
                {
                  id: "edit",
                  title: "Anyone in Brightside Agency can edit",
                  desc: "Team members can tweak filters and export",
                },
                {
                  id: "client",
                  title: "Client read-only link",
                  desc: "Shared with client guests in their workspace",
                },
              ].map((item) => (
                <label
                  key={item.id}
                  onClick={() => setPermission(item.id)}
                  className={`flex items-start gap-2.5 p-2.5 rounded-xl border transition cursor-pointer ${
                    permission === item.id
                      ? "border-primary bg-primary-subtle/40"
                      : "border-[#e3e5ec] hover:bg-[#f8fafc]"
                  }`}
                >
                  <input
                    type="radio"
                    name="permission"
                    checked={permission === item.id}
                    onChange={() => setPermission(item.id)}
                    className="mt-0.5 text-primary focus:ring-primary"
                  />
                  <div>
                    <p className="text-[12px] font-medium text-[#0d0d10]">{item.title}</p>
                    <p className="text-[11px] text-[#71717a]">{item.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button kind="secondary" size="s" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}

const REPORT_PRESETS: Record<
  string,
  {
    title: string;
    hasReport: boolean;
    filters: Record<string, string[]>;
  }
> = {
  "festive-sales": {
    title: "Festive sales review",
    hasReport: true,
    filters: {
      Clients: ["Minimalist"],
      Projects: [
        "Minimalist · Vitamin-C Serum - Live",
        "Minimalist · Glow Squad - Live - month 3 of 6",
      ],
      "Date range": ["Last 28 days"],
    },
  },
  "monthly-summary": {
    title: "Monthly brand summary",
    hasReport: true,
    filters: {
      Clients: ["All clients"],
      Projects: ["All projects"],
      "Date range": ["This month"],
    },
  },
  "creator-review": {
    title: "Creator review · October",
    hasReport: true,
    filters: {
      Clients: ["All clients"],
      Projects: ["All projects"],
      "Date range": ["Last month"],
    },
  },
  "untitled-report-draft": {
    title: "Untitled report",
    hasReport: true,
    filters: {
      Clients: ["Minimalist", "Velvet Lip Co."],
      "Date range": ["Last 7 days"],
    },
  },
};

export function AgencyCustomReportBuilderPage() {
  const { reportId } = useParams<{ reportId?: string }>();
  const navigate = useNavigate();

  const preset = reportId ? REPORT_PRESETS[reportId] : undefined;

  const [dateRange, setDateRange] = useState(preset?.filters["Date range"]?.[0] ?? "");
  const [comparison, setComparison] = useState("");
  const [audienceMatch, setAudienceMatch] = useState("Any");
  const [rating, setRating] = useState("Any");
  const [adUsage, setAdUsage] = useState("All content");
  const [funnelStage, setFunnelStage] = useState("Ordered");
  const [refunded, setRefunded] = useState("Any");
  const [filterVersion, setFilterVersion] = useState(0);
  const [reportTitle, setReportTitle] = useState(preset?.title ?? "Untitled report");
  const [titleDraft, setTitleDraft] = useState(reportTitle);
  const [isRenaming, setIsRenaming] = useState(false);
  const [hasReport, setHasReport] = useState(preset?.hasReport ?? false);
  const [appliedFilters, setAppliedFilters] = useState<Record<string, string[]>>(
    preset?.filters ?? {},
  );
  const [isDownloading, setIsDownloading] = useState(false);
  const [exportError, setExportError] = useState("");
  const [isShareOpen, setIsShareOpen] = useState(false);
  const reportExportRef = useRef<HTMLDivElement>(null);

  const updateAppliedFilter = (label: string, values: string[]) => {
    setAppliedFilters((current) => ({ ...current, [label]: values }));
    setHasReport(true);
  };

  const updateSingleFilter = (label: string, value: string) => {
    setAppliedFilters((current) => ({ ...current, [label]: value ? [value] : [] }));
    if (value) setHasReport(true);
  };

  const clearAllFilters = () => {
    setDateRange("");
    setComparison("");
    setAudienceMatch("Any");
    setRating("Any");
    setAdUsage("All content");
    setFunnelStage("Ordered");
    setRefunded("Any");
    setAppliedFilters({});
    setHasReport(false);
    setFilterVersion((version) => version + 1);
  };

  const saveReportTitle = () => {
    setReportTitle(titleDraft.trim() || "Untitled report");
    setIsRenaming(false);
  };

  const downloadPdf = async () => {
    const report = reportExportRef.current;
    if (!report || isDownloading) return;

    setIsDownloading(true);
    setExportError("");
    try {
      const [{ toCanvas }, { jsPDF }] = await Promise.all([
        import("html-to-image"),
        import("jspdf"),
      ]);
      const motionNodes = Array.from(report.querySelectorAll<HTMLElement>("[style]")).filter(
        (node) => node.style.opacity || node.style.transform,
      );
      const originalStyles = motionNodes.map((node) => [node, node.getAttribute("style")] as const);
      const pdfTitle = report.querySelector<HTMLElement>("[data-pdf-title]");
      const pdfExcluded = Array.from(report.querySelectorAll<HTMLElement>("[data-pdf-exclude]"));
      const exportStyles = [
        ...(pdfTitle ? [[pdfTitle, pdfTitle.getAttribute("style")] as const] : []),
        ...pdfExcluded.map((node) => [node, node.getAttribute("style")] as const),
      ];
      let canvas: HTMLCanvasElement;

      try {
        if (pdfTitle) pdfTitle.style.display = "block";
        pdfExcluded.forEach((node) => {
          node.style.display = "none";
        });
        motionNodes.forEach((node) => {
          node.style.opacity = "1";
          node.style.transform = "none";
          node.style.transition = "none";
        });
        await new Promise<void>((resolve) => window.requestAnimationFrame(() => resolve()));
        canvas = await toCanvas(report, {
          backgroundColor: "#f8fafc",
          cacheBust: true,
          height: report.scrollHeight,
          pixelRatio: 2,
          width: report.scrollWidth,
        });
      } finally {
        originalStyles.forEach(([node, style]) => {
          if (style === null) node.removeAttribute("style");
          else node.setAttribute("style", style);
        });
        exportStyles.forEach(([node, style]) => {
          if (style === null) node.removeAttribute("style");
          else node.setAttribute("style", style);
        });
      }
      const pdf = new jsPDF({ compress: true, format: "a4", orientation: "landscape", unit: "mm" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const contentWidth = pageWidth - margin * 2;
      const contentHeight = pageHeight - margin * 2;
      const pixelsPerMillimetre = canvas.width / contentWidth;
      const sourcePageHeight = Math.max(1, Math.floor(contentHeight * pixelsPerMillimetre));
      const reportBounds = report.getBoundingClientRect();
      const documentScale = canvas.width / report.scrollWidth;
      const blocksRoot = report.querySelector<HTMLElement>("[data-pdf-report-blocks]");
      const blockBounds = blocksRoot
        ? Array.from(blocksRoot.children).map((block) => {
            const bounds = block.getBoundingClientRect();
            return {
              top: Math.round((bounds.top - reportBounds.top) * documentScale),
              bottom: Math.round((bounds.bottom - reportBounds.top) * documentScale),
            };
          })
        : [];
      const pages: Array<{ start: number; height: number }> = [];
      let sourceY = 0;

      while (sourceY < canvas.height) {
        const maximumEnd = Math.min(sourceY + sourcePageHeight, canvas.height);
        const splitBlock = blockBounds.find(
          (block) => block.top > sourceY && block.top < maximumEnd && block.bottom > maximumEnd,
        );
        const safeEnd =
          splitBlock && splitBlock.top - sourceY > sourcePageHeight * 0.32
            ? splitBlock.top
            : maximumEnd;
        pages.push({ start: sourceY, height: safeEnd - sourceY });
        sourceY = safeEnd;
      }

      for (const [page, { start, height }] of pages.entries()) {
        const slice = document.createElement("canvas");
        slice.width = canvas.width;
        slice.height = height;
        const context = slice.getContext("2d");
        if (!context) throw new Error("Unable to prepare the report page.");
        context.fillStyle = "#f8fafc";
        context.fillRect(0, 0, slice.width, slice.height);
        context.drawImage(canvas, 0, start, canvas.width, height, 0, 0, canvas.width, height);

        if (page) pdf.addPage();
        pdf.addImage(
          slice.toDataURL("image/png"),
          "PNG",
          margin,
          margin,
          contentWidth,
          height / pixelsPerMillimetre,
        );
        pdf.setFontSize(8);
        pdf.setTextColor(132, 145, 163);
        pdf.text(
          `${reportTitle}  ·  ${page + 1} / ${pages.length}`,
          pageWidth - margin,
          pageHeight - 4,
          {
            align: "right",
          },
        );
      }

      const safeFileName =
        reportTitle
          .trim()
          .replace(/[^a-z0-9]+/gi, "-")
          .replace(/^-|-$/g, "") || "custom-report";
      const pdfUrl = URL.createObjectURL(pdf.output("blob"));
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = `${safeFileName}.pdf`;
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(pdfUrl), 1_000);
    } catch (error) {
      console.error("Unable to export custom report PDF", error);
      setExportError("Couldn’t create the PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const activeFilterEntries = Object.entries(appliedFilters).filter(
    ([, values]) => values.length > 0,
  );
  const targetMetric = appliedFilters["Target type"]?.[0];
  const focusMetric =
    targetMetric === "Orders" || targetMetric === "Views" ? targetMetric : "Net sales";
  const selectedCreators = (appliedFilters["Creators"] ?? [])
    .filter((creator) => creator !== "All creators")
    .map((creator) => creator.split(" · ")[0]);
  const scopeLabel = activeFilterEntries.length
    ? activeFilterEntries
        .slice(0, 3)
        .map(([label, values]) => label + ": " + values.join(", "))
        .join("  /  ") +
      (activeFilterEntries.length > 3 ? "  /  +" + (activeFilterEntries.length - 3) + " more" : "")
    : "All clients, projects, creators, sales and content";

  return (
    <AgencyShell>
      <div className="mx-auto flex w-full max-w-[1560px] flex-col gap-5 pb-12">
        {/* Top Header */}
        <motion.header
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-2.5"
          initial={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-[12px] leading-4 text-tertiary">
            <button
              type="button"
              onClick={() => navigate(ROUTES.agencyReports)}
              className="flex items-center gap-1 hover:text-ink transition cursor-pointer"
            >
              <ArrowLeft size={13} />
              <span>Back to Reports</span>
            </button>
            <span>/</span>
            <span className="font-medium text-[#0d0d10]">{reportTitle}</span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2.5">
                {isRenaming ? (
                  <input
                    aria-label="Report title"
                    autoFocus
                    className="h-9 w-full max-w-[360px] rounded-lg border border-primary bg-white px-2.5 text-[22px] font-semibold leading-8 text-ink outline-none ring-2 ring-primary/20"
                    onBlur={saveReportTitle}
                    onChange={(event) => setTitleDraft(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") saveReportTitle();
                      if (event.key === "Escape") {
                        setTitleDraft(reportTitle);
                        setIsRenaming(false);
                      }
                    }}
                    value={titleDraft}
                  />
                ) : (
                  <>
                    <h1 className="truncate text-[24px] font-bold tracking-[-0.13px] leading-8 text-[#0d0d10]">
                      {reportTitle}
                    </h1>
                    <button
                      aria-label="Rename report"
                      className="text-primary hover:text-primary-hover p-1 rounded hover:bg-primary-subtle cursor-pointer transition"
                      onClick={() => {
                        setTitleDraft(reportTitle);
                        setIsRenaming(true);
                      }}
                      type="button"
                    >
                      <PencilLine size={16} />
                    </button>
                  </>
                )}
              </div>
              <p className="mt-1 text-[12px] leading-4 text-[#71717a]">
                Auto-saves as you build · Agency aggregate & client scoping enabled
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                kind="secondary"
                size="s"
                leadingIcon={<Share2 size={15} />}
                onClick={() => setIsShareOpen(true)}
              >
                Share
              </Button>
              <Button
                aria-label="Download report as PDF"
                disabled={!hasReport || isDownloading}
                kind="secondary"
                leadingIcon={<Download size={15} />}
                onClick={downloadPdf}
                size="s"
                title={hasReport ? "Download report as PDF" : "Add a block to enable PDF export"}
              >
                {isDownloading ? "Preparing PDF…" : "Download PDF"}
              </Button>
              <Button
                className="bg-ink hover:bg-ink/90 text-white"
                onClick={() => setHasReport(true)}
                size="s"
                leadingIcon={<Plus size={15} />}
              >
                Add block
              </Button>
            </div>
          </div>

          {exportError && (
            <p className="text-[12px] text-danger" role="alert">
              {exportError}
            </p>
          )}
        </motion.header>

        {/* Content Layout */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-start gap-6 lg:flex-row"
          initial={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Filters Sidebar */}
          <aside className="w-full shrink-0 rounded-2xl border border-line bg-white p-4 shadow-xs lg:w-[260px]">
            <div className="flex items-center justify-between">
              <h2 className="text-[13px] font-semibold leading-5 text-ink">Filters</h2>
              <button
                className="text-[11px] font-medium text-primary hover:text-primary-hover cursor-pointer"
                onClick={clearAllFilters}
                type="button"
              >
                Clear all
              </button>
            </div>
            <p className="mt-1 text-[11px] leading-4 text-tertiary">
              Set once: every block follows these.
            </p>

            {/* AGENCY EXCLUSIVE: CLIENTS FILTER */}
            <section className="mt-3.5 pt-3 border-t border-line">
              <h3 className="mb-2.5 text-[10px] font-semibold leading-4 tracking-[0.06em] text-primary">
                CLIENTS (AGENCY SCOPE)
              </h3>
              <ProjectMultiSelect
                key={`clients-${filterVersion}`}
                defaultSelected={appliedFilters["Clients"] ?? []}
                onApply={updateAppliedFilter}
                {...clientFilterField}
              />
            </section>

            {/* DATES */}
            <section className="mt-4 pt-3 border-t border-line">
              <h3 className="mb-2.5 text-[10px] font-semibold leading-4 tracking-[0.04em] text-tertiary">
                DATES
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <RadioFilter
                  label="Date range"
                  onChange={(value) => {
                    setDateRange(value);
                    updateSingleFilter("Date range", value);
                  }}
                  options={dateOptions}
                  value={dateRange}
                />
                <RadioFilter
                  label="Compare with"
                  onChange={(value) => {
                    setComparison(value);
                    updateSingleFilter("Compare with", value);
                  }}
                  options={comparisonOptions}
                  value={comparison}
                />
              </div>
            </section>

            <div className="space-y-4 mt-4 pt-3 border-t border-line" key={filterVersion}>
              {/* PROJECT */}
              <section>
                <h3 className="mb-2.5 text-[10px] font-semibold leading-4 tracking-[0.04em] text-tertiary">
                  PROJECT
                </h3>
                <div className="space-y-3">
                  {projectFilterFields.map((field) => (
                    <ProjectMultiSelect
                      key={field.label}
                      defaultSelected={appliedFilters[field.label] ?? []}
                      onApply={updateAppliedFilter}
                      {...field}
                    />
                  ))}
                </div>
              </section>

              {/* CREATORS */}
              <section className="pt-3 border-t border-line">
                <h3 className="mb-2.5 text-[10px] font-semibold leading-4 tracking-[0.04em] text-tertiary">
                  CREATORS
                </h3>
                <div className="space-y-3">
                  {creatorFilterFields.slice(0, 7).map((field) => (
                    <ProjectMultiSelect
                      key={field.label}
                      defaultSelected={appliedFilters[field.label] ?? []}
                      onApply={updateAppliedFilter}
                      {...field}
                    />
                  ))}
                  <RadioFilter
                    label="Audience match"
                    onChange={(value) => {
                      setAudienceMatch(value);
                      updateSingleFilter("Audience match", value);
                    }}
                    options={["Any", "70%+", "80%+", "90%+"]}
                    value={audienceMatch}
                  />
                  <RadioFilter
                    label="Rating"
                    onChange={(value) => {
                      setRating(value);
                      updateSingleFilter("Rating", value);
                    }}
                    options={["Any", "4+", "4.5+"]}
                    value={rating}
                  />
                  {creatorFilterFields.slice(7).map((field) => (
                    <ProjectMultiSelect
                      key={field.label}
                      defaultSelected={appliedFilters[field.label] ?? []}
                      onApply={updateAppliedFilter}
                      {...field}
                    />
                  ))}
                </div>
              </section>

              {/* PLATFORM */}
              <section className="pt-3 border-t border-line">
                <h3 className="mb-2.5 text-[10px] font-semibold leading-4 tracking-[0.04em] text-tertiary">
                  PLATFORM
                </h3>
                <ProjectMultiSelect
                  {...platformFilter}
                  defaultSelected={appliedFilters[platformFilter.label] ?? []}
                  onApply={updateAppliedFilter}
                />
                <p className="mt-1.5 text-[10px] leading-4 text-[#b7791f]">
                  Earnings always shown separately
                </p>
              </section>

              {/* CONTENT */}
              <section className="pt-3 border-t border-line">
                <h3 className="mb-2.5 text-[10px] font-semibold leading-4 tracking-[0.04em] text-tertiary">
                  CONTENT
                </h3>
                <div className="space-y-3">
                  {contentFilterFields.slice(0, 8).map((field) => (
                    <ProjectMultiSelect
                      key={field.label}
                      defaultSelected={appliedFilters[field.label] ?? []}
                      onApply={updateAppliedFilter}
                      {...field}
                    />
                  ))}
                  <RadioFilter
                    label="Ad usage"
                    onChange={(value) => {
                      setAdUsage(value);
                      updateSingleFilter("Ad usage", value);
                    }}
                    options={["All content", "Ad-ready only"]}
                    value={adUsage}
                  />
                  {contentFilterFields.slice(8).map((field) => (
                    <ProjectMultiSelect
                      key={field.label}
                      defaultSelected={appliedFilters[field.label] ?? []}
                      onApply={updateAppliedFilter}
                      {...field}
                    />
                  ))}
                </div>
              </section>

              {/* CONVERSIONS */}
              <section className="pt-3 border-t border-line">
                <h3 className="mb-2.5 text-[10px] font-semibold leading-4 tracking-[0.04em] text-tertiary">
                  CONVERSIONS
                </h3>
                <div className="space-y-3">
                  {conversionFilterFields.slice(0, 2).map((field) => (
                    <ProjectMultiSelect
                      key={field.label}
                      defaultSelected={appliedFilters[field.label] ?? []}
                      onApply={updateAppliedFilter}
                      {...field}
                    />
                  ))}
                  <RadioFilter
                    label="Funnel stage"
                    onChange={(value) => {
                      setFunnelStage(value);
                      updateSingleFilter("Funnel stage", value);
                    }}
                    options={[
                      "Clicked",
                      "Visited store",
                      "Viewed product",
                      "Added to cart",
                      "Started checkout",
                      "Ordered",
                    ]}
                    value={funnelStage}
                  />
                  {conversionFilterFields.slice(2).map((field) => (
                    <ProjectMultiSelect
                      key={field.label}
                      defaultSelected={appliedFilters[field.label] ?? []}
                      onApply={updateAppliedFilter}
                      {...field}
                    />
                  ))}
                </div>
              </section>

              {/* AUDIENCE */}
              <section className="pt-3 border-t border-line">
                <h3 className="mb-2.5 text-[10px] font-semibold leading-4 tracking-[0.04em] text-tertiary">
                  AUDIENCE
                </h3>
                <div className="space-y-3">
                  {audienceFilterFields.map((field) => (
                    <ProjectMultiSelect
                      key={field.label}
                      defaultSelected={appliedFilters[field.label] ?? []}
                      onApply={updateAppliedFilter}
                      {...field}
                    />
                  ))}
                </div>
              </section>

              {/* PERFORMANCE THRESHOLDS */}
              <section className="pt-3 border-t border-line">
                <h3 className="mb-2.5 text-[10px] font-semibold leading-4 tracking-[0.04em] text-tertiary">
                  PERFORMANCE THRESHOLDS
                </h3>
                <div className="space-y-3">
                  {performanceThresholds.map((threshold) => (
                    <ThresholdFilter
                      key={threshold.label}
                      onChange={(label, value) => updateSingleFilter(label, value)}
                      {...threshold}
                    />
                  ))}
                </div>
              </section>

              {/* PAYMENTS */}
              <section className="pt-3 border-t border-line">
                <h3 className="mb-2.5 text-[10px] font-semibold leading-4 tracking-[0.04em] text-tertiary">
                  PAYMENTS
                </h3>
                <div className="space-y-3">
                  <ProjectMultiSelect
                    {...paymentFilterFields[0]}
                    defaultSelected={appliedFilters[paymentFilterFields[0].label] ?? []}
                    onApply={updateAppliedFilter}
                  />
                  <RadioFilter
                    label="Refunded"
                    onChange={(value) => {
                      setRefunded(value);
                      updateSingleFilter("Refunded", value);
                    }}
                    options={["Any", "Refunded only", "Not refunded"]}
                    value={refunded}
                  />
                  {paymentFilterFields.slice(1).map((field) => (
                    <ProjectMultiSelect
                      key={field.label}
                      defaultSelected={appliedFilters[field.label] ?? []}
                      onApply={updateAppliedFilter}
                      {...field}
                    />
                  ))}
                </div>
              </section>

              {/* DELIVERY */}
              <section className="pt-3 border-t border-line">
                <h3 className="mb-2.5 text-[10px] font-semibold leading-4 tracking-[0.04em] text-tertiary">
                  DELIVERY
                </h3>
                <div className="space-y-3">
                  {deliveryFilterFields.map((field) => (
                    <ProjectMultiSelect
                      key={field.label}
                      defaultSelected={appliedFilters[field.label] ?? []}
                      onApply={updateAppliedFilter}
                      {...field}
                    />
                  ))}
                </div>
              </section>
            </div>

            <p className="mt-4 pt-3 border-t border-line text-[10px] leading-4 text-tertiary">
              72 filters - configured across all clients and projects
            </p>
          </aside>

          {/* Report Canvas */}
          <div className="min-w-0 flex-1" ref={reportExportRef}>
            <div aria-hidden="true" className="hidden pb-6 pt-1 text-center" data-pdf-title>
              <h1 className="text-[28px] font-bold leading-[34px] tracking-[-0.02em] text-ink">
                {reportTitle}
              </h1>
              <p className="text-[12px] text-tertiary mt-1">Brightside Agency · {scopeLabel}</p>
            </div>

            {hasReport ? (
              <motion.section
                animate={{ opacity: 1, y: 0 }}
                className="min-w-0 flex-1"
                initial={{ opacity: 0, y: 12 }}
                key={scopeLabel + focusMetric}
                transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
              >
                <PerformanceReportBlocks
                  focusMetric={focusMetric}
                  scopeLabel={scopeLabel}
                  selectedCreators={selectedCreators}
                />
                <button
                  className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-primary/40 bg-white text-[13px] font-medium text-primary transition hover:bg-primary-subtle cursor-pointer"
                  data-pdf-exclude
                  onClick={() => setHasReport(true)}
                  type="button"
                >
                  <Plus size={16} />
                  <span>Add block</span>
                </button>
              </motion.section>
            ) : (
              <section className="flex min-h-[620px] min-w-0 flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-white px-6 text-center shadow-xs">
                <div className="grid size-14 place-items-center rounded-full bg-subtle text-secondary">
                  <FilePenLine size={24} strokeWidth={1.7} />
                </div>
                <h2 className="mt-4 text-[17px] font-semibold leading-6 text-ink">
                  Your report will appear here
                </h2>
                <p className="mt-1.5 text-[13px] leading-5 text-secondary max-w-sm">
                  Choose client and project filters on the left, then click Add block to build your custom report.
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <Button
                    className="bg-ink hover:bg-ink/90 text-white"
                    onClick={() => setHasReport(true)}
                    size="s"
                    leadingIcon={<Plus size={15} />}
                  >
                    Add block
                  </Button>
                </div>
                <p className="mt-5 flex items-center gap-1.5 text-[12px] leading-4 text-tertiary">
                  <Info size={14} />
                  <span>Every block shares the filters chosen on the left.</span>
                </p>
              </section>
            )}
          </div>
        </motion.div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        reportTitle={reportTitle}
      />
    </AgencyShell>
  );
}
