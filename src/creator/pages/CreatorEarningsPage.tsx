import { useState, useRef, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  WalletCards,
  Clock,
  CalendarDays,
  IndianRupee,
  Check,
  CheckCircle2,
  Download,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Info,
  Building2,
  CreditCard,
  FileText,
  X,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import { CreatorShell } from "@/creator/components/CreatorShell";
import { CreatorDisputesListContent } from "../components/CreatorDisputesListContent";
import { creatorDisputeRoute, ROUTES } from "@/common/constants/routes";

// Period options matching Figma node Dropdown · Period
const PERIOD_OPTIONS = [
  "This month",
  "Last 3 months",
  "This year",
  "Last year",
  "Custom range…",
] as const;

type PeriodOption = (typeof PERIOD_OPTIONS)[number];

// 1. Dropdown · Period component
function PeriodDropdown({
  value,
  onChange,
  isOpen,
  onToggle,
}: {
  value: PeriodOption;
  onChange: (val: PeriodOption) => void;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="relative inline-block text-left w-[180px] sm:w-[190px]"
      data-name="Dropdown · Period"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`bg-white flex items-center justify-between gap-2 h-[40px] px-[12px] py-[8px] rounded-[8px] cursor-pointer transition select-none w-full ${
          isOpen
            ? "border-2 border-[#0d0d10]"
            : "border border-[#e3e5ec] hover:border-[#0d0d10]"
        }`}
      >
        <span className="truncate font-['Inter:Regular'] font-normal text-[13px] text-[#0d0d10] leading-[20px] text-left">
          {value}
        </span>
        <div className="shrink-0 size-[14px] flex items-center justify-center text-[#0d0d10]">
          {isOpen ? (
            <ChevronUp className="size-3.5 stroke-[2.2]" />
          ) : (
            <ChevronDown className="size-3.5 stroke-[2.2]" />
          )}
        </div>
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute left-0 top-[calc(100%+6px)] z-50 w-full min-w-full bg-white border border-[#e3e5ec] rounded-[8px] p-[6px] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)] flex flex-col gap-[2px] animate-in fade-in zoom-in-95 duration-100"
        >
          {PERIOD_OPTIONS.map((option) => {
            const isSelected = value === option;
            return (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => onChange(option)}
                className={`w-full flex items-center justify-between px-[10px] py-[8px] rounded-[6px] transition cursor-pointer text-left ${
                  isSelected
                    ? "bg-[#f1f4ff] text-[#0d0d10] font-medium"
                    : "text-[#0d0d10] hover:bg-[#f8f9fb]"
                }`}
              >
                <span className="font-['Inter:Regular'] font-normal text-[13px] leading-[20px] truncate">
                  {option}
                </span>
                {isSelected && (
                  <Check className="size-3.5 text-[#0d0d10] shrink-0 stroke-[2.2]" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// 2. Dropdown · Download statement component
function DownloadStatementDropdown({
  isOpen,
  onToggle,
  onSelectAction,
}: {
  isOpen: boolean;
  onToggle: () => void;
  onSelectAction: (actionKey: "pdf" | "csv" | "itr") => void;
}) {
  return (
    <div
      className="relative inline-block text-left w-[200px] sm:w-[220px]"
      data-name="Dropdown · Download statement"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className={`bg-white flex items-center justify-between gap-2 h-[40px] px-[12px] py-[8px] rounded-[8px] cursor-pointer transition select-none w-full ${
          isOpen
            ? "border-2 border-[#0d0d10]"
            : "border border-[#e3e5ec] hover:border-[#0d0d10]"
        }`}
      >
        <span className="truncate font-['Inter:Regular'] font-normal text-[13px] text-[#0d0d10] leading-[20px] text-left">
          Download statement
        </span>
        <div className="shrink-0 size-[14px] flex items-center justify-center text-[#0d0d10]">
          {isOpen ? (
            <ChevronUp className="size-3.5 stroke-[2.2]" />
          ) : (
            <ChevronDown className="size-3.5 stroke-[2.2]" />
          )}
        </div>
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+6px)] z-50 w-full min-w-full bg-white border border-[#e3e5ec] rounded-[8px] p-[6px] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)] flex flex-col gap-[2px] animate-in fade-in zoom-in-95 duration-100"
        >
          <button
            type="button"
            role="menuitem"
            onClick={() => onSelectAction("pdf")}
            className="w-full flex items-center gap-2.5 px-[10px] py-[8px] rounded-[6px] transition cursor-pointer text-left text-[#0d0d10] hover:bg-[#f8f9fb]"
          >
            <Download className="size-4 text-[#4a4a55] shrink-0" />
            <span className="font-['Inter:Regular'] font-normal text-[13px] leading-[20px] truncate">
              PDF statement
            </span>
          </button>

          <button
            type="button"
            role="menuitem"
            onClick={() => onSelectAction("csv")}
            className="w-full flex items-center gap-2.5 px-[10px] py-[8px] rounded-[6px] transition cursor-pointer text-left text-[#0d0d10] hover:bg-[#f8f9fb]"
          >
            <Download className="size-4 text-[#4a4a55] shrink-0" />
            <span className="font-['Inter:Regular'] font-normal text-[13px] leading-[20px] truncate">
              CSV for your accountant
            </span>
          </button>

          <button
            type="button"
            role="menuitem"
            onClick={() => onSelectAction("itr")}
            className="w-full flex items-center gap-2.5 px-[10px] py-[8px] rounded-[6px] transition cursor-pointer text-left text-[#0d0d10] hover:bg-[#f8f9fb]"
          >
            <FileText className="size-4 text-[#4a4a55] shrink-0" />
            <span className="font-['Inter:Regular'] font-normal text-[13px] leading-[20px] truncate">
              Annual statement for ITR
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

// Monthly earnings bar chart data
const MONTHLY_EARNINGS = [
  { month: "May", amount: 23500, label: "₹23.5K", height: 80, items: "Summer Glow Edit" },
  { month: "Jun", amount: 31200, label: "₹31.2K", height: 107, items: "Summer Glow Edit · Velvet Lip" },
  { month: "Jul", amount: 29600, label: "₹29.6K", height: 101, items: "Velvet Lip Collab · 2 posts" },
  { month: "Aug", amount: 33400, label: "₹33.4K", height: 114, items: "Lip Liner Collab + Minimalist" },
  { month: "Sep", amount: 40800, label: "₹40.8K", height: 140, items: "Glow Squad cycle 1 & Dewdrop (Peak)" },
  { month: "Oct", amount: 33400, label: "₹33.4K", height: 114, items: "Vitamin-C Serum Reel 1 & Reel 2" },
];

// Brand distribution donut data
const BRAND_EARNINGS = [
  {
    name: "Minimalist",
    amount: "₹1,12,850",
    percent: "75%",
    pctNumber: 75,
    color: "#3b5bff", // Primary blue
  },
  {
    name: "Velvet Lip Co.",
    amount: "₹25,080",
    percent: "15%",
    pctNumber: 15,
    color: "#8b5cf6", // Purple
  },
  {
    name: "Dewdrop Naturals",
    amount: "₹6,000",
    percent: "4%",
    pctNumber: 4,
    color: "#0d9488", // Teal
  },
  {
    name: "Other brands",
    amount: "₹23,980",
    percent: "14%",
    pctNumber: 14,
    color: "#a1a1aa", // Neutral gray
  },
];

// Payments table data
interface PaymentRow {
  id: string;
  date: string;
  brandCode: "MI" | "DN" | "VL";
  brandColor: string;
  projectAndDeliverable: string;
  fee: string;
  youGet: string;
  status: "Paid" | "In escrow" | "Funded on 2 Nov";
  statusTone: "Success" | "Info" | "Neutral";
}

const PAYMENTS_DATA: PaymentRow[] = [
  {
    id: "pay-1",
    date: "21 Oct",
    brandCode: "MI",
    brandColor: "bg-[#3b5bff]",
    projectAndDeliverable: "Vitamin-C Serum · Reel 2",
    fee: "₹4,250",
    youGet: "₹3,698",
    status: "Paid",
    statusTone: "Success",
  },
  {
    id: "pay-2",
    date: "19 Oct",
    brandCode: "MI",
    brandColor: "bg-[#3b5bff]",
    projectAndDeliverable: "Vitamin-C Serum · Reel 1",
    fee: "₹8,500",
    youGet: "₹7,397",
    status: "Paid",
    statusTone: "Success",
  },
  {
    id: "pay-3",
    date: "–",
    brandCode: "MI",
    brandColor: "bg-[#3b5bff]",
    projectAndDeliverable: "Vitamin-C Serum · Story",
    fee: "₹3,000",
    youGet: "₹2,611",
    status: "In escrow",
    statusTone: "Info",
  },
  {
    id: "pay-4",
    date: "2 Nov",
    brandCode: "MI",
    brandColor: "bg-[#3b5bff]",
    projectAndDeliverable: "Glow Squad · Cycle 2 · 2 Reels + 1 Story",
    fee: "₹27,000",
    youGet: "₹23,814",
    status: "Funded on 2 Nov",
    statusTone: "Neutral",
  },
  {
    id: "pay-5",
    date: "28 Sep",
    brandCode: "MI",
    brandColor: "bg-[#3b5bff]",
    projectAndDeliverable: "Glow Squad · Cycle 1",
    fee: "₹27,000",
    youGet: "₹23,814",
    status: "Paid",
    statusTone: "Success",
  },
  {
    id: "pay-6",
    date: "12 Sep",
    brandCode: "DN",
    brandColor: "bg-[#0d9488]",
    projectAndDeliverable: "Dewdrop Naturals · Reel",
    fee: "₹6,000",
    youGet: "₹5,292",
    status: "Paid",
    statusTone: "Success",
  },
];

const EARNINGS_TABS = [
  { label: "Overview", key: "overview" },
  { label: "Projects", key: "projects" },
  { label: "Statements", key: "statements" },
  { label: "Where we pay you", key: "payouts" },
  { label: "Tax details", key: "tax" },
  { label: "Disputes", key: "disputes", badge: "2" },
] as const;

export default function CreatorEarningsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = (searchParams.get("tab") || "overview").toLowerCase();

  const handleTabChange = (key: string) => {
    if (key === "payouts") {
      setIsPayoutModalOpen(true);
      return;
    }
    if (key === "tax") {
      setIsTaxModalOpen(true);
      return;
    }
    if (key === "statements") {
      setIsStatementModalOpen(true);
      return;
    }
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (key === "overview") {
        next.delete("tab");
      } else {
        next.set("tab", key);
      }
      return next;
    });
  };

  const [selectedPeriod, setSelectedPeriod] = useState<PeriodOption>("This year");
  const [openDropdown, setOpenDropdown] = useState<"period" | "download" | null>(null);
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  // Modals state
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [isTaxModalOpen, setIsTaxModalOpen] = useState(false);
  const [isStatementModalOpen, setIsStatementModalOpen] = useState(false);

  // Bank & Tax state
  const [payoutInfo, setPayoutInfo] = useState({
    bank: "HDFC ···· 4821",
    ifsc: "HDFC0001234",
    accountHolder: "Ishita Rao",
    upi: "ishita@okhdfc",
  });

  const [taxInfo, setTaxInfo] = useState({
    pan: "·····4F",
    gstin: "Not registered",
    isGstRegistered: false,
  });

  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (toolbarRef.current && !toolbarRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleDownloadStatement = () => {
    setIsStatementModalOpen(true);
  };

  const handleDownloadAction = (actionKey: "pdf" | "csv" | "itr") => {
    setOpenDropdown(null);
    if (actionKey === "pdf") {
      setIsStatementModalOpen(true);
    } else if (actionKey === "csv") {
      alert(`Exporting "CSV for your accountant" for ${selectedPeriod}...`);
    } else if (actionKey === "itr") {
      alert(`Generating "Annual statement for ITR" (FY 2026–27)...`);
    }
  };

  return (
    <CreatorShell>
      <div className="w-full bg-white text-[#0d0d10]">
        <div className="w-full px-[20px] sm:px-[32px] pt-[28px] pb-[48px] flex flex-col gap-[24px]">
          {/* 1. Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex flex-col gap-[4px] max-w-2xl">
              <h1 className="text-[28px] font-semibold tracking-[-0.14px] text-[#0d0d10] leading-[34px]">
                Earnings
              </h1>
              <p className="text-[14px] text-[#4a4a55] leading-[20px]">
                After the 11% Kreyio fee. Brands pay any GST on top. Paid as soon as the brand approves.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 relative" ref={toolbarRef} data-name="Actions">
              {/* 1. Dropdown · Period */}
              <PeriodDropdown
                value={selectedPeriod}
                onChange={(val) => {
                  setSelectedPeriod(val);
                  setOpenDropdown(null);
                }}
                isOpen={openDropdown === "period"}
                onToggle={() => setOpenDropdown(openDropdown === "period" ? null : "period")}
              />

              {/* 2. Dropdown · Download statement */}
              <DownloadStatementDropdown
                isOpen={openDropdown === "download"}
                onToggle={() => setOpenDropdown(openDropdown === "download" ? null : "download")}
                onSelectAction={handleDownloadAction}
              />
            </div>
          </div>

          {/* Navigation Tabs matching Figma Node 1664:53813 */}
          <div className="border-b border-[#e5e7eb] flex items-center gap-6 overflow-x-auto">
            {EARNINGS_TABS.map((tab) => {
              const isActive = currentTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => handleTabChange(tab.key)}
                  className={`flex items-center gap-2 pb-3 text-[14px] transition whitespace-nowrap relative cursor-pointer ${
                    isActive
                      ? "font-semibold text-[#3b5bff]"
                      : "font-medium text-[#6b7280] hover:text-[#0d0d10]"
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="inline-flex items-center justify-center h-4.5 min-w-4.5 px-1.5 rounded-full text-[11px] font-semibold bg-[#feefce] text-[#d97706]">
                      {tab.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#3b5bff]" />
                  )}
                </button>
              );
            })}
          </div>

          {currentTab === "disputes" ? (
            <CreatorDisputesListContent />
          ) : (
            <>
              {/* Active dispute banner in overview */}
              <div className="bg-[#feefce] border border-[#fde68a] rounded-[12px] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-[#f59e0b] text-white grid place-items-center shrink-0">
                    <AlertTriangle size={16} />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#92400e]">
                      Dispute pending your reply: Velvet Lip Co. (DSP-0418)
                    </p>
                    <p className="text-[12px] text-[#b45309]">
                      ₹7,500 frozen in escrow for Lip Liner Collab · Reply required by 30 Oct
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    to={creatorDisputeRoute("DSP-0418")}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[8px] bg-[#92400e] text-white text-[12px] font-medium hover:bg-[#78350f] transition"
                  >
                    <span>View dispute</span>
                    <ArrowRight size={13} />
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleTabChange("disputes")}
                    className="px-3 py-1.5 rounded-[8px] border border-[#d97706]/40 text-[12px] font-medium text-[#92400e] hover:bg-black/5 transition cursor-pointer"
                  >
                    All disputes (2)
                  </button>
                </div>
              </div>

              {/* 2. Top Row KPI Tiles */}
          <div className="bg-white border border-[#e5e7eb] rounded-[12px] p-5 shadow-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Tile 1: Paid in October */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white border border-[#edeff3] rounded-[12px] p-4 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="size-9 rounded-[8px] bg-[#149d46] flex items-center justify-center text-white shadow-xs">
                    <WalletCards className="size-4.5 stroke-[2.2]" />
                  </div>
                </div>
                <div className="mt-3.5">
                  <p className="text-[12px] text-[#4a4a55] font-normal leading-4">
                    Paid in October
                  </p>
                  <p className="text-[22px] font-semibold text-[#0d0d10] tracking-[-0.33px] leading-7 mt-0.5">
                    ₹12,750
                  </p>
                </div>
                <p className="mt-2.5 text-[12px] font-medium text-[#16a34a] leading-4">
                  2 payments
                </p>
              </motion.div>

              {/* Tile 2: In escrow */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 }}
                className="bg-white border border-[#edeff3] rounded-[12px] p-4 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="size-9 rounded-[8px] bg-[#f29b07] flex items-center justify-center text-white shadow-xs">
                    <Clock className="size-4.5 stroke-[2.2]" />
                  </div>
                </div>
                <div className="mt-3.5">
                  <p className="text-[12px] text-[#4a4a55] font-normal leading-4">
                    In escrow
                  </p>
                  <p className="text-[22px] font-semibold text-[#0d0d10] tracking-[-0.33px] leading-7 mt-0.5">
                    ₹4,250
                  </p>
                </div>
                <p className="mt-2.5 text-[12px] font-medium text-[#a3a3ac] leading-4">
                  waiting for approval
                </p>
              </motion.div>

              {/* Tile 3: Coming up */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.16 }}
                className="bg-white border border-[#edeff3] rounded-[12px] p-4 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="size-9 rounded-[8px] bg-[#3b5bff] flex items-center justify-center text-white shadow-xs">
                    <CalendarDays className="size-4.5 stroke-[2.2]" />
                  </div>
                </div>
                <div className="mt-3.5">
                  <p className="text-[12px] text-[#4a4a55] font-normal leading-4">
                    Coming up
                  </p>
                  <p className="text-[22px] font-semibold text-[#0d0d10] tracking-[-0.33px] leading-7 mt-0.5">
                    ₹27,000
                  </p>
                </div>
                <p className="mt-2.5 text-[12px] font-medium text-[#a3a3ac] leading-4 truncate">
                  2 Nov · Glow Squad cycle 2
                </p>
              </motion.div>

              {/* Tile 4: Paid this year */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.24 }}
                className="bg-white border border-[#edeff3] rounded-[12px] p-4 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="size-9 rounded-[8px] bg-[#0d0d10] flex items-center justify-center text-white shadow-xs">
                    <IndianRupee className="size-4.5 stroke-[2.2]" />
                  </div>
                </div>
                <div className="mt-3.5">
                  <p className="text-[12px] text-[#4a4a55] font-normal leading-4">
                    Paid this year
                  </p>
                  <p className="text-[22px] font-semibold text-[#0d0d10] tracking-[-0.33px] leading-7 mt-0.5">
                    ₹1,67,910
                  </p>
                </div>
                <p className="mt-2.5 text-[12px] font-medium text-[#16a34a] leading-4">
                  14 payments
                </p>
              </motion.div>
            </div>
          </div>

          {/* 3. Middle Row: Monthly Bar Chart & Earned by Brand Donut */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-5 items-stretch">
            {/* Card: Paid to you by month */}
            <div className="bg-white border border-[#e5e7eb] rounded-[12px] p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-[16px] font-semibold text-[#070b13] leading-6">
                      Paid to you by month
                    </h2>
                    <p className="text-[12px] text-[#8491a3] leading-4 mt-0.5">
                      After platform &amp; service fee · May to October
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleDownloadStatement}
                    className="text-[12px] font-medium text-[#3b5bff] hover:underline cursor-pointer"
                  >
                    Download statement →
                  </button>
                </div>

                {/* Bar Chart Area */}
                <div className="mt-6 relative h-[210px] w-full flex flex-col justify-end">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pr-2">
                    {[
                      { val: "₹40K", top: "0%" },
                      { val: "₹30K", top: "25%" },
                      { val: "₹20K", top: "50%" },
                      { val: "₹10K", top: "75%" },
                      { val: "0", top: "100%" },
                    ].map((tick) => (
                      <div key={tick.val} className="flex items-center w-full gap-3">
                        <span className="w-[36px] text-left text-[11px] text-[#8491a3] font-normal select-none">
                          {tick.val}
                        </span>
                        <div className="flex-1 h-px bg-[#edeff3]" />
                      </div>
                    ))}
                  </div>

                  {/* Bars Container */}
                  <div className="relative pl-[44px] h-[170px] flex items-end justify-around w-full z-10">
                    {MONTHLY_EARNINGS.map((item, idx) => {
                      const isHovered = hoveredBarIndex === idx;
                      return (
                        <div
                          key={item.month}
                          className="flex flex-col items-center group relative cursor-pointer"
                          onMouseEnter={() => setHoveredBarIndex(idx)}
                          onMouseLeave={() => setHoveredBarIndex(null)}
                        >
                          {/* Tooltip */}
                          {isHovered && (
                            <div className="absolute -top-12 z-20 bg-[#0d0d10] text-white text-[11px] px-2.5 py-1 rounded shadow-lg whitespace-nowrap animate-in fade-in duration-150">
                              <span className="font-semibold">{item.label}</span>
                              <span className="text-[#a1a1aa] ml-1">· {item.items}</span>
                            </div>
                          )}

                          {/* Bar */}
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: item.height }}
                            transition={{ duration: 0.65, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                            className={`w-[14px] sm:w-[18px] rounded-t-[3px] transition-colors ${
                              isHovered ? "bg-[#2845d4]" : "bg-[#3b5bff]"
                            }`}
                          />

                          {/* Month Label */}
                          <span className="mt-2 text-[11px] text-[#8491a3] font-normal">
                            {item.month}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Alert Footer Pill */}
              <div className="mt-5 bg-[#f1f4ff] rounded-[8px] px-3.5 py-3 flex items-center gap-2.5">
                <Info className="size-4 text-[#3b5bff] shrink-0" />
                <p className="text-[13px] font-medium text-[#0d0d10] leading-5">
                  Best month: September · ₹33,000 · Glow Squad cycle 1 and Dewdrop Naturals
                </p>
              </div>
            </div>

            {/* Card: Earned by brand */}
            <div className="bg-white border border-[#e5e7eb] rounded-[12px] p-5 shadow-xs flex flex-col justify-between">
              <div>
                <h2 className="text-[16px] font-semibold text-[#070b13] leading-6">
                  Earned by brand
                </h2>
                <p className="text-[12px] text-[#8491a3] leading-4 mt-0.5">
                  This year · ₹1,67,910
                </p>

                {/* Donut Chart */}
                <div className="my-5 flex justify-center items-center">
                  <div className="relative size-[140px] flex items-center justify-center">
                    <svg className="size-full -rotate-90 transform" viewBox="0 0 100 100">
                      {/* Background circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="#f4f6fb"
                        strokeWidth="14"
                      />
                      {/* Segment 1: Minimalist 75% */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="#3b5bff"
                        strokeWidth="14"
                        strokeDasharray="179 238.7"
                        strokeDashoffset="0"
                        strokeLinecap="butt"
                      />
                      {/* Segment 2: Velvet Lip Co 15% */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="#8b5cf6"
                        strokeWidth="14"
                        strokeDasharray="35.8 238.7"
                        strokeDashoffset="-179"
                        strokeLinecap="butt"
                      />
                      {/* Segment 3: Dewdrop Naturals 4% */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="#0d9488"
                        strokeWidth="14"
                        strokeDasharray="9.5 238.7"
                        strokeDashoffset="-214.8"
                        strokeLinecap="butt"
                      />
                      {/* Segment 4: Other brands 6% */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="#a1a1aa"
                        strokeWidth="14"
                        strokeDasharray="14.4 238.7"
                        strokeDashoffset="-224.3"
                        strokeLinecap="butt"
                      />
                    </svg>

                    {/* Donut Center */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-[20px] font-bold text-[#070b13] leading-6 tracking-tight">
                        ₹1.68 L
                      </span>
                      <span className="text-[11px] text-[#8491a3] leading-4">
                        this year
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Donut Legend */}
              <div className="flex flex-col gap-1.5 pt-2 border-t border-[#edeff3]">
                {BRAND_EARNINGS.map((item) => (
                  <div key={item.name} className="flex items-center justify-between py-1 text-[13px]">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className="size-2 rounded-full shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-[#394357] truncate">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-semibold text-[#070b13]">{item.amount}</span>
                      <span className="font-semibold text-[#070b13] w-9 text-right">{item.percent}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Bottom Row: Payments Table & Right Side Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-5 items-start">
            {/* Payments Table */}
            <div className="bg-white border border-[#e5e7eb] rounded-[12px] p-5 shadow-xs">
              <div>
                <h2 className="text-[16px] font-semibold text-[#0d0d10] leading-6">
                  Payments
                </h2>
                <p className="text-[12px] text-[#8491a3] leading-4 mt-0.5">
                  Every payment to you
                </p>
              </div>

              <div className="mt-4 border border-[#e3e5ec] rounded-[10px] overflow-x-auto">
                <table className="w-full min-w-[560px] text-left border-collapse">
                  <thead>
                    <tr className="bg-[#f4f6fb] h-[36px] text-[11px] font-medium text-[#8491a3] tracking-[0.02em]">
                      <th className="px-4 font-medium w-[80px]">DATE</th>
                      <th className="px-4 font-medium">PROJECT · DELIVERABLE</th>
                      <th className="px-4 font-medium text-right w-[90px]">FEE</th>
                      <th className="px-4 font-medium text-right w-[90px]">YOU GET</th>
                      <th className="px-4 font-medium w-[130px]">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#edeff3]">
                    {PAYMENTS_DATA.map((row) => (
                      <tr key={row.id} className="h-[52px] hover:bg-[#fafbfe] transition">
                        {/* Date */}
                        <td className="px-4 text-[13px] font-medium text-[#4a4a55] whitespace-nowrap">
                          {row.date}
                        </td>

                        {/* Project & Deliverable */}
                        <td className="px-4">
                          <div className="flex items-center gap-2.5">
                            <span
                              className={`size-7 rounded-[6px] flex items-center justify-center text-white text-[11px] font-semibold shrink-0 ${row.brandColor}`}
                            >
                              {row.brandCode}
                            </span>
                            <span className="text-[13px] text-[#0d0d10] font-normal truncate">
                              {row.projectAndDeliverable}
                            </span>
                          </div>
                        </td>

                        {/* Fee */}
                        <td className="px-4 text-right text-[13px] font-medium text-[#0d0d10] whitespace-nowrap">
                          {row.fee}
                        </td>

                        {/* You Get */}
                        <td className="px-4 text-right text-[13px] font-medium text-[#0d0d10] whitespace-nowrap">
                          {row.youGet}
                        </td>

                        {/* Status Badge */}
                        <td className="px-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[12px] font-medium whitespace-nowrap ${
                              row.statusTone === "Success"
                                ? "bg-[#e1fce3] text-[#16a34a]"
                                : row.statusTone === "Info"
                                ? "bg-[#f1f4ff] text-[#3b5bff]"
                                : "bg-[#f4f6fb] text-[#4a4a55]"
                            }`}
                          >
                            <span
                              className={`size-1.5 rounded-full ${
                                row.statusTone === "Success"
                                  ? "bg-[#16a34a]"
                                  : row.statusTone === "Info"
                                  ? "bg-[#3b5bff]"
                                  : "bg-[#71717a]"
                              }`}
                            />
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Side Stack: 3 Information Cards */}
            <div className="flex flex-col gap-4">
              {/* Card 1: Where we pay you */}
              <div className="bg-white border border-[#e5e7eb] rounded-[12px] p-5 shadow-xs flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-[16px] font-semibold text-[#0d0d10] leading-6">
                    Where we pay you
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsPayoutModalOpen(true)}
                    className="text-[12px] font-medium text-[#3b5bff] hover:underline cursor-pointer"
                  >
                    Change
                  </button>
                </div>
                <div className="divide-y divide-[#edeff3]">
                  <div className="flex items-center justify-between py-2 text-[13px]">
                    <span className="text-[#4a4a55]">Bank</span>
                    <span className="font-medium text-[#0d0d10]">{payoutInfo.bank}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 text-[13px]">
                    <span className="text-[#4a4a55]">UPI</span>
                    <span className="font-medium text-[#0d0d10]">{payoutInfo.upi}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 text-[13px]">
                    <span className="text-[#4a4a55]">Usually arrives</span>
                    <span className="font-medium text-[#0d0d10]">within 2 working days</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Tax details */}
              <div className="bg-white border border-[#e5e7eb] rounded-[12px] p-5 shadow-xs flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-[16px] font-semibold text-[#0d0d10] leading-6">
                    Tax details
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsTaxModalOpen(true)}
                    className="text-[12px] font-medium text-[#3b5bff] hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
                <div className="divide-y divide-[#edeff3]">
                  <div className="flex items-center justify-between py-2 text-[13px]">
                    <span className="text-[#4a4a55]">PAN</span>
                    <span className="font-medium text-[#0d0d10]">{taxInfo.pan}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 text-[13px]">
                    <span className="text-[#4a4a55]">GSTIN</span>
                    <span className="font-medium text-[#0d0d10]">{taxInfo.gstin}</span>
                  </div>
                </div>
                <p className="text-[12px] text-[#a3a3ac] leading-4 pt-1">
                  Annual statement for ITR is ready each April.
                </p>
              </div>

              {/* Card 3: How a payment works */}
              <div className="bg-white border border-[#e5e7eb] rounded-[12px] p-5 shadow-xs flex flex-col gap-3">
                <h3 className="text-[16px] font-semibold text-[#0d0d10] leading-6">
                  How a payment works
                </h3>
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-start gap-2.5 text-[13px] leading-5 text-[#0d0d10]">
                    <div className="size-4 rounded-full bg-[#e1fce3] text-[#16a34a] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="size-3 stroke-[2.5]" />
                    </div>
                    <span>Brand funds your post into escrow</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-[13px] leading-5 text-[#0d0d10]">
                    <div className="size-4 rounded-full bg-[#e1fce3] text-[#16a34a] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="size-3 stroke-[2.5]" />
                    </div>
                    <span>You post, brand approves</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-[13px] leading-5 text-[#0d0d10]">
                    <div className="size-4 rounded-full bg-[#e1fce3] text-[#16a34a] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="size-3 stroke-[2.5]" />
                    </div>
                    <span>
                      Your fee minus Kreyio’s platform &amp; service fee (11% + GST) reaches your bank
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  </div>

      {/* MODAL 1: Change Payout Details */}
      <AnimatePresence>
        {isPayoutModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[12px] border border-[#e3e5ec] shadow-[0px_16px_40px_-8px_rgba(8,10,20,0.18)] max-w-md w-full p-6 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="size-8 rounded-lg bg-[#f1f4ff] text-[#3b5bff] flex items-center justify-center">
                    <Building2 className="size-4" />
                  </div>
                  <h3 className="text-[17px] font-semibold text-[#0d0d10]">Change payout details</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPayoutModalOpen(false)}
                  className="size-8 rounded-md flex items-center justify-center text-[#71717a] hover:bg-[#f4f6fb]"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="flex flex-col gap-3 text-[13px]">
                <div>
                  <label className="block text-[12px] font-medium text-[#4a4a55] mb-1">
                    Bank Account Number / Masked
                  </label>
                  <input
                    type="text"
                    defaultValue={payoutInfo.bank}
                    id="bank-input"
                    className="w-full h-10 px-3 border border-[#e3e5ec] rounded-lg text-[#0d0d10] focus:outline-hidden focus:border-[#0d0d10]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[#4a4a55] mb-1">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    defaultValue={payoutInfo.ifsc}
                    id="ifsc-input"
                    className="w-full h-10 px-3 border border-[#e3e5ec] rounded-lg text-[#0d0d10] uppercase focus:outline-hidden focus:border-[#0d0d10]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[#4a4a55] mb-1">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    defaultValue={payoutInfo.upi}
                    id="upi-input"
                    className="w-full h-10 px-3 border border-[#e3e5ec] rounded-lg text-[#0d0d10] focus:outline-hidden focus:border-[#0d0d10]"
                  />
                </div>
                <div className="p-3 bg-[#f8f9fb] rounded-lg flex items-start gap-2 text-[12px] text-[#4a4a55]">
                  <ShieldCheck className="size-4 text-[#16a34a] shrink-0 mt-0.5" />
                  <span>
                    Your payout account is verified with penny drop. Payouts automatically credit via NEFT/IMPS.
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPayoutModalOpen(false)}
                  className="px-4 h-9 rounded-lg border border-[#e3e5ec] text-[13px] font-medium text-[#4a4a55] hover:bg-[#f8f9fb]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const bankVal = (document.getElementById("bank-input") as HTMLInputElement)?.value;
                    const upiVal = (document.getElementById("upi-input") as HTMLInputElement)?.value;
                    setPayoutInfo((prev) => ({
                      ...prev,
                      bank: bankVal || prev.bank,
                      upi: upiVal || prev.upi,
                    }));
                    setIsPayoutModalOpen(false);
                  }}
                  className="px-4 h-9 rounded-lg bg-[#0d0d10] text-[13px] font-medium text-white hover:bg-black"
                >
                  Save changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: Edit Tax Details */}
      <AnimatePresence>
        {isTaxModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[12px] border border-[#e3e5ec] shadow-[0px_16px_40px_-8px_rgba(8,10,20,0.18)] max-w-md w-full p-6 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="size-8 rounded-lg bg-[#f1f4ff] text-[#3b5bff] flex items-center justify-center">
                    <FileText className="size-4" />
                  </div>
                  <h3 className="text-[17px] font-semibold text-[#0d0d10]">Edit tax details</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsTaxModalOpen(false)}
                  className="size-8 rounded-md flex items-center justify-center text-[#71717a] hover:bg-[#f4f6fb]"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="flex flex-col gap-3 text-[13px]">
                <div>
                  <label className="block text-[12px] font-medium text-[#4a4a55] mb-1">
                    Permanent Account Number (PAN)
                  </label>
                  <input
                    type="text"
                    defaultValue="ABCDE1234F"
                    id="pan-input"
                    className="w-full h-10 px-3 border border-[#e3e5ec] rounded-lg text-[#0d0d10] uppercase focus:outline-hidden focus:border-[#0d0d10]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[#4a4a55] mb-1">
                    GSTIN (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="22AAAAA0000A1Z5"
                    defaultValue=""
                    id="gstin-input"
                    className="w-full h-10 px-3 border border-[#e3e5ec] rounded-lg text-[#0d0d10] uppercase focus:outline-hidden focus:border-[#0d0d10]"
                  />
                  <p className="mt-1 text-[11px] text-[#8491a3]">
                    Leave blank if your annual turnover is below the threshold (₹20 Lakhs).
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsTaxModalOpen(false)}
                  className="px-4 h-9 rounded-lg border border-[#e3e5ec] text-[13px] font-medium text-[#4a4a55] hover:bg-[#f8f9fb]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const panVal = (document.getElementById("pan-input") as HTMLInputElement)?.value;
                    const gstinVal = (document.getElementById("gstin-input") as HTMLInputElement)?.value;
                    setTaxInfo({
                      pan: panVal ? `·····${panVal.slice(-2)}` : "·····4F",
                      gstin: gstinVal.trim() || "Not registered",
                      isGstRegistered: Boolean(gstinVal.trim()),
                    });
                    setIsTaxModalOpen(false);
                  }}
                  className="px-4 h-9 rounded-lg bg-[#0d0d10] text-[13px] font-medium text-white hover:bg-black"
                >
                  Save tax details
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 3: Download Statement */}
      <AnimatePresence>
        {isStatementModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[12px] border border-[#e3e5ec] shadow-[0px_16px_40px_-8px_rgba(8,10,20,0.18)] max-w-md w-full p-6 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="size-8 rounded-lg bg-[#e1fce3] text-[#16a34a] flex items-center justify-center">
                    <Download className="size-4" />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-semibold text-[#0d0d10]">Download Statement</h3>
                    <p className="text-[12px] text-[#8491a3]">Official GST &amp; TDS compliance document</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsStatementModalOpen(false)}
                  className="size-8 rounded-md flex items-center justify-center text-[#71717a] hover:bg-[#f4f6fb]"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="flex flex-col gap-3 text-[13px]">
                <div className="p-3 bg-[#f8f9fb] rounded-lg border border-[#e3e5ec]">
                  <div className="flex justify-between items-center text-[13px] font-medium text-[#0d0d10]">
                    <span>Statement period</span>
                    <span className="text-[#3b5bff]">{selectedPeriod}</span>
                  </div>
                  <div className="flex justify-between items-center text-[12px] text-[#4a4a55] mt-1.5">
                    <span>Total disbursements</span>
                    <span className="font-semibold text-[#0d0d10]">₹1,67,910</span>
                  </div>
                  <div className="flex justify-between items-center text-[12px] text-[#4a4a55] mt-1">
                    <span>TDS (Section 194J)</span>
                    <span>₹0 (Under threshold)</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-medium text-[#4a4a55]">File format</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      className="h-10 rounded-lg border-2 border-[#0d0d10] font-medium text-[13px] text-[#0d0d10] bg-[#f8f9fb] flex items-center justify-center gap-2"
                    >
                      <FileText className="size-4" />
                      <span>PDF Format</span>
                    </button>
                    <button
                      type="button"
                      className="h-10 rounded-lg border border-[#e3e5ec] font-normal text-[13px] text-[#4a4a55] hover:border-[#0d0d10] flex items-center justify-center gap-2"
                    >
                      <span>CSV (Excel)</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsStatementModalOpen(false)}
                  className="px-4 h-9 rounded-lg border border-[#e3e5ec] text-[13px] font-medium text-[#4a4a55] hover:bg-[#f8f9fb]"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert(`Statement for "${selectedPeriod}" generated and downloaded successfully!`);
                    setIsStatementModalOpen(false);
                  }}
                  className="px-4 h-9 rounded-lg bg-[#0d0d10] text-[13px] font-medium text-white hover:bg-black inline-flex items-center gap-1.5"
                >
                  <Download className="size-4" />
                  <span>Download file</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </CreatorShell>
  );
}
