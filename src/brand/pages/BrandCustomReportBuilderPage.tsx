import { useMemo, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  Download,
  FilePenLine,
  Info,
  PencilLine,
  Plus,
  Search,
  Share2,
} from "lucide-react";
import { motion } from "motion/react";
import { BrandShell } from "@/brand/components/BrandShell";
import { PerformanceReportBlocks } from "@/brand/pages/BrandProjectPerformancePage";
import { Button } from "@/common/components/ui/Button";

type FilterGroup = { title: string; fields: [string, string][] };
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

const projectFilterFields: ProjectFilter[] = [
  {
    label: "Projects",
    placeholder: "Search projects",
    searchable: true,
    options: [
      "All projects",
      "Vitamin-C Serum - Live",
      "Glow Squad - Live - month 3 of 6",
      "Monsoon Sunscreen - Live",
      "Lip Tint Drop - Live",
      "Hydration Bundle - Live",
      "Skin Quiz Leads - Upcoming",
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
      "Minimalist store - Bandra",
      "Office - Andheri East",
    ],
  },
];

const filterGroups: FilterGroup[] = [];

function StaticFilter({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-medium leading-4 text-[#394357]">{label}</span>
      <button
        className="flex min-h-9 w-full items-center gap-1.5 rounded-md border border-line bg-white px-2.5 py-2 text-left text-[12px] leading-4 text-secondary transition hover:bg-subtle"
        type="button"
      >
        <span className="min-w-0 flex-1 truncate">{value}</span>
        <ChevronDown className="shrink-0 text-tertiary" size={13} />
      </button>
    </label>
  );
}

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
        <span className="min-w-0 flex-1 truncate">{mode + " " + value}</span>
        <ChevronDown
          className={"shrink-0 text-tertiary transition-transform " + (open ? "rotate-180" : "")}
          size={13}
        />
      </button>
      {open && (
        <div className="absolute left-0 top-[calc(100%+4px)] z-[90] w-full min-w-[184px] rounded-md border border-line bg-white p-2 shadow-[0_12px_28px_rgba(15,23,42,0.14)]">
          <div className="flex gap-1 rounded-full bg-subtle p-0.5">
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
  searchable = false,
  searchPlaceholder,
  onApply,
}: ProjectFilter & { onApply?: (label: string, values: string[]) => void }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");
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
        <div className="absolute left-0 top-[calc(100%+4px)] z-[90] w-full min-w-[154px] overflow-hidden rounded-md border border-line bg-white shadow-[0_12px_28px_rgba(15,23,42,0.14)]">
          {searchable && (
            <div className="p-1.5 pb-1">
              <label className="flex h-7 items-center gap-1.5 rounded border border-line bg-white px-2 text-tertiary">
                <Search size={11} />
                <input
                  autoFocus
                  className="min-w-0 flex-1 bg-transparent text-[10px] outline-none placeholder:text-tertiary"
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={searchPlaceholder ?? "Search projects"}
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
                  className="flex w-full items-center gap-1.5 rounded px-1.5 py-1 text-left text-[10px] leading-4 text-ink hover:bg-subtle"
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
              className="text-tertiary hover:text-ink"
              onClick={() => setDraft([...options])}
              type="button"
            >
              Select all
            </button>
            <span className="flex-1" />
            <button
              className="text-tertiary hover:text-ink"
              onClick={() => setDraft([])}
              type="button"
            >
              Clear
            </button>
            <button
              className="rounded bg-ink px-2 py-1 font-medium text-white"
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

export function BrandCustomReportBuilderPage() {
  const [dateRange, setDateRange] = useState("");
  const [comparison, setComparison] = useState("");
  const [audienceMatch, setAudienceMatch] = useState("Any");
  const [rating, setRating] = useState("Any");
  const [adUsage, setAdUsage] = useState("All content");
  const [funnelStage, setFunnelStage] = useState("Ordered");
  const [refunded, setRefunded] = useState("Any");
  const [filterVersion, setFilterVersion] = useState(0);
  const [reportTitle, setReportTitle] = useState("Untitled report");
  const [titleDraft, setTitleDraft] = useState(reportTitle);
  const [isRenaming, setIsRenaming] = useState(false);
  const [hasReport, setHasReport] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<Record<string, string[]>>({});
  const [isDownloading, setIsDownloading] = useState(false);
  const [exportError, setExportError] = useState("");
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
    : "All projects, creators, sales and content";

  return (
    <BrandShell compactSidebar hideChat>
      <div className="mx-auto w-full max-w-[1680px] pb-10">
        <motion.header
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-2.5"
          initial={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[12px] leading-4 text-tertiary">Custom reports / New report</p>
          <div className="flex flex-wrap items-center gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                {isRenaming ? (
                  <input
                    aria-label="Report title"
                    autoFocus
                    className="h-8 w-full max-w-[320px] rounded-md border border-primary bg-white px-2 text-[24px] font-semibold leading-8 text-ink outline-none ring-1 ring-primary"
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
                    <h1 className="truncate text-[24px] font-semibold leading-8 text-tertiary">
                      {reportTitle}
                    </h1>
                    <button
                      aria-label="Rename report"
                      className="text-primary hover:text-primary-hover"
                      onClick={() => {
                        setTitleDraft(reportTitle);
                        setIsRenaming(true);
                      }}
                      type="button"
                    >
                      <PencilLine size={15} />
                    </button>
                  </>
                )}
              </div>
              <p className="mt-1 text-[12px] leading-4 text-tertiary">Auto-saves as you build</p>
            </div>
            <Button kind="secondary" size="s" leadingIcon={<Share2 size={15} />}>
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
              {isDownloading ? "Preparing PDF…" : "Download"}
            </Button>
            <Button
              className="bg-ink hover:bg-ink/90"
              onClick={() => setHasReport(true)}
              size="s"
              leadingIcon={<Plus size={15} />}
            >
              Add block
            </Button>
          </div>
          {exportError && (
            <p aria-live="polite" className="text-[12px] leading-4 text-danger">
              {exportError}
            </p>
          )}
        </motion.header>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 flex flex-col gap-5 lg:flex-row"
          initial={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.44, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
        >
          <aside className="w-full shrink-0 self-start rounded-xl border border-line bg-white p-4 lg:sticky lg:top-4 lg:max-h-[calc(100dvh-2rem)] lg:w-[260px] lg:overflow-y-auto lg:overscroll-contain">
            <div className="flex items-center">
              <h2 className="flex-1 text-[15px] font-semibold leading-5 text-ink">Filters</h2>
              <button
                className="text-[11px] font-medium text-primary hover:text-primary-hover"
                onClick={clearAllFilters}
                type="button"
              >
                Clear all
              </button>
            </div>
            <p className="mt-2 text-[11px] leading-4 text-tertiary">
              Set once: every block follows these.
            </p>
            <section className="mt-3">
              <h3 className="mb-3 pt-1 text-[10px] font-semibold leading-4 tracking-[0.04em] text-tertiary">
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
            <div className="my-3 h-px bg-muted" />
            <div className="space-y-4" key={filterVersion}>
              <section>
                <h3 className="mb-3 pt-1 text-[10px] font-semibold leading-4 tracking-[0.04em] text-tertiary">
                  PROJECT
                </h3>
                <div className="space-y-3">
                  {projectFilterFields.map((field) => (
                    <ProjectMultiSelect
                      key={field.label}
                      onApply={updateAppliedFilter}
                      {...field}
                    />
                  ))}
                </div>
              </section>
              <section>
                <h3 className="mb-3 pt-1 text-[10px] font-semibold leading-4 tracking-[0.04em] text-tertiary">
                  CREATORS
                </h3>
                <div className="space-y-3">
                  {creatorFilterFields.slice(0, 7).map((field) => (
                    <ProjectMultiSelect
                      key={field.label}
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
                      onApply={updateAppliedFilter}
                      {...field}
                    />
                  ))}
                </div>
              </section>
              <section>
                <h3 className="mb-3 pt-1 text-[10px] font-semibold leading-4 tracking-[0.04em] text-tertiary">
                  PLATFORM
                </h3>
                <ProjectMultiSelect {...platformFilter} onApply={updateAppliedFilter} />
                <p className="mt-1.5 text-[10px] leading-4 text-[#b7791f]">
                  Earnings always shown separately
                </p>
              </section>
              <section>
                <h3 className="mb-3 pt-1 text-[10px] font-semibold leading-4 tracking-[0.04em] text-tertiary">
                  CONTENT
                </h3>
                <div className="space-y-3">
                  {contentFilterFields.slice(0, 8).map((field) => (
                    <ProjectMultiSelect
                      key={field.label}
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
                      onApply={updateAppliedFilter}
                      {...field}
                    />
                  ))}
                </div>
              </section>
              <section>
                <h3 className="mb-3 pt-1 text-[10px] font-semibold leading-4 tracking-[0.04em] text-tertiary">
                  CONVERSIONS
                </h3>
                <div className="space-y-3">
                  {conversionFilterFields.slice(0, 2).map((field) => (
                    <ProjectMultiSelect
                      key={field.label}
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
                      onApply={updateAppliedFilter}
                      {...field}
                    />
                  ))}
                </div>
              </section>
              <section>
                <h3 className="mb-3 pt-1 text-[10px] font-semibold leading-4 tracking-[0.04em] text-tertiary">
                  AUDIENCE
                </h3>
                <div className="space-y-3">
                  {audienceFilterFields.map((field) => (
                    <ProjectMultiSelect
                      key={field.label}
                      onApply={updateAppliedFilter}
                      {...field}
                    />
                  ))}
                </div>
              </section>
              <section>
                <h3 className="mb-3 pt-1 text-[10px] font-semibold leading-4 tracking-[0.04em] text-tertiary">
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
              <section>
                <h3 className="mb-3 pt-1 text-[10px] font-semibold leading-4 tracking-[0.04em] text-tertiary">
                  PAYMENTS
                </h3>
                <div className="space-y-3">
                  <ProjectMultiSelect {...paymentFilterFields[0]} onApply={updateAppliedFilter} />
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
                      onApply={updateAppliedFilter}
                      {...field}
                    />
                  ))}
                </div>
              </section>
              <section>
                <h3 className="mb-3 pt-1 text-[10px] font-semibold leading-4 tracking-[0.04em] text-tertiary">
                  DELIVERY
                </h3>
                <div className="space-y-3">
                  {deliveryFilterFields.map((field) => (
                    <ProjectMultiSelect
                      key={field.label}
                      onApply={updateAppliedFilter}
                      {...field}
                    />
                  ))}
                </div>
              </section>
              {filterGroups.map((group) => (
                <section key={group.title}>
                  <h3 className="mb-3 pt-1 text-[10px] font-semibold leading-4 tracking-[0.04em] text-tertiary">
                    {group.title}
                  </h3>
                  <div className="space-y-3">
                    {group.fields.map(([label, value]) => (
                      <StaticFilter key={label} label={label} value={value} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
            <p className="mt-4 text-[10px] leading-4 text-tertiary">
              71 filters - all from what you set up in Floooww
            </p>
          </aside>
          <div className="min-w-0 flex-1" ref={reportExportRef}>
            <div aria-hidden="true" className="hidden pb-6 pt-1 text-center" data-pdf-title>
              <h1 className="text-[28px] font-bold leading-[34px] tracking-[-0.02em] text-ink">
                {reportTitle}
              </h1>
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
                  className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-primary/40 bg-white text-[13px] font-medium text-primary transition hover:bg-primary-subtle"
                  data-pdf-exclude
                  onClick={() => setHasReport(true)}
                  type="button"
                >
                  <Plus size={16} />
                  Add block
                </button>
              </motion.section>
            ) : (
              <section className="flex min-h-[620px] min-w-0 flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-line bg-white px-6 text-center">
                <div className="grid size-12 place-items-center rounded-full bg-subtle text-secondary">
                  <FilePenLine size={22} strokeWidth={1.7} />
                </div>
                <h2 className="mt-3 text-[16px] font-medium leading-6 text-ink">
                  Your report will appear here
                </h2>
                <p className="mt-1 text-[13px] leading-5 text-secondary">
                  Choose filters on the left, then add a block.
                </p>
                <p className="mt-4 flex items-center gap-1.5 text-[12px] leading-4 text-tertiary">
                  <Info size={14} />
                  Every block shares these filters.
                </p>
              </section>
            )}
          </div>
        </motion.div>
      </div>
    </BrandShell>
  );
}
