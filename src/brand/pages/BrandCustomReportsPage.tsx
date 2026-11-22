import { useState, useMemo, useRef, useEffect } from "react";
import {
  Download,
  ChevronDown,
  ExternalLink,
  Search,
  Check,
  TrendingUp,
  TrendingDown,
  Info,
  CalendarDays,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { BrandShell } from "@/brand/components/BrandShell";
import { Button } from "@/common/components/ui/Button";
import { DateRangePicker } from "@/common/components/ui/DateRangePicker";
import { ROUTES } from "@/common/constants/routes";

// --- Types & Data ---

interface CampaignOption {
  id: string;
  name: string;
  objective: "Sales" | "Awareness" | "Engagement" | "Traffic" | "Lead generation";
  type: string;
  status: "Live" | "Behind" | "Upcoming" | "Completed";
  period: string;
  daysLeft?: string;
  brandId: string;
}

const BRANDS = [
  { id: "all", name: "All brands", meta: "2 brands · 6 campaigns · 38 creators" },
  { id: "minimalist", name: "Minimalist", meta: "1 brand · 5 campaigns · 38 creators" },
  { id: "minimalist-baby", name: "Minimalist Baby", meta: "1 brand · 1 campaign · 0 creators" },
];

const CAMPAIGNS: CampaignOption[] = [
  {
    id: "all",
    name: "All campaigns",
    objective: "Sales",
    type: "Total brand performance",
    status: "Live",
    period: "All campaigns",
    brandId: "all",
  },
  {
    id: "vitamin-c",
    name: "Vitamin-C Serum",
    objective: "Sales",
    type: "Influencer · Paid · One-time",
    status: "Live",
    period: "7 Oct – 7 Nov 2026",
    daysLeft: "10 days left",
    brandId: "minimalist",
  },
  {
    id: "glow-squad",
    name: "Glow Squad",
    objective: "Awareness",
    type: "Influencer · Paid · Long-term",
    status: "Live",
    period: "Month 3 of 6 · ends 6 Jan 2027",
    brandId: "minimalist",
  },
  {
    id: "hydration-bundle",
    name: "Hydration Bundle",
    objective: "Engagement",
    type: "Influencer · Gift exchange · One-time",
    status: "Live",
    period: "1 Oct – 31 Oct 2026",
    daysLeft: "3 days left",
    brandId: "minimalist",
  },
  {
    id: "monsoon-sunscreen",
    name: "Monsoon Sunscreen",
    objective: "Awareness",
    type: "Influencer · Paid · One-time",
    status: "Live",
    period: "Ends 2 Nov 2026",
    brandId: "minimalist",
  },
  {
    id: "lip-tint",
    name: "Lip Tint Drop",
    objective: "Traffic",
    type: "UGC · Paid · One-time",
    status: "Live",
    period: "Ends 5 Nov 2026",
    brandId: "minimalist",
  },
];

// All campaigns table rows
const ALL_CAMPAIGNS_TABLE = [
  {
    id: "vitamin-c",
    name: "Vitamin-C Serum",
    sub: "Influencer · Paid · One-time",
    objective: "Sales",
    objectiveDetail: "codes + links",
    status: "Live",
    spend: "₹2,00,000",
    mainResult: "₹5,42,000",
    mainResultSub: "net sales",
    vsTarget: 68,
    vsTargetLabel: "68%",
    cost: "3.8× ROAS",
    costSub: "net sales ÷ fees",
    creators: 16,
    ends: "7 Nov",
  },
  {
    id: "glow-squad",
    name: "Glow Squad",
    sub: "Influencer · Paid · Long-term",
    objective: "Awareness",
    objectiveDetail: "month 3 of 6",
    status: "Live",
    spend: "₹2,25,000",
    mainResult: "41.2 L reach",
    mainResultSub: "reach",
    vsTarget: 92,
    vsTargetLabel: "92%",
    cost: "₹55 CPM",
    costSub: "per 1,000 reached",
    creators: 6,
    ends: "6 Jan",
  },
  {
    id: "monsoon-sunscreen",
    name: "Monsoon Sunscreen",
    sub: "Influencer · Paid · One-time",
    objective: "Awareness",
    objectiveDetail: "2 overdue",
    status: "Live",
    spend: "₹1,20,000",
    mainResult: "38.5 L reach",
    mainResultSub: "reach",
    vsTarget: 77,
    vsTargetLabel: "77%",
    cost: "₹31 CPM",
    costSub: "per 1,000 reached",
    creators: 12,
    ends: "2 Nov",
  },
  {
    id: "lip-tint",
    name: "Lip Tint Drop",
    sub: "UGC · Paid · One-time",
    objective: "Traffic",
    objectiveDetail: "files only",
    status: "Live",
    spend: "₹60,000",
    mainResult: "16 videos",
    mainResultSub: "usable videos",
    vsTarget: 89,
    vsTargetLabel: "89%",
    cost: "₹3,750",
    costSub: "per usable video",
    creators: 6,
    ends: "5 Nov",
  },
  {
    id: "hydration-bundle",
    name: "Hydration Bundle",
    sub: "Influencer · Gift · One-time",
    objective: "Engagement",
    objectiveDetail: "8 creators · gifted",
    status: "Behind",
    spend: "₹53,440",
    mainResult: "5.8% rate",
    mainResultSub: "engagement rate",
    vsTarget: 129,
    vsTargetLabel: "129%",
    cost: "₹0.37",
    costSub: "CPE",
    creators: 8,
    ends: "31 Oct",
  },
];

// Single campaign (Vitamin-C) creator table rows
const VITAMIN_C_CREATORS = [
  {
    name: "Meera Iyer",
    handle: "@meerabeauty",
    deliverables: "4 of 4 delivered",
    platform: "Instagram",
    code: "MEERA15 · 1 link",
    status: "Completed",
    fee: "₹22,000",
    views: "5.2 L",
    engRate: "5.9%",
    clicks: "6,240",
    orders: "410",
    netSales: "₹1,68,000",
    roas: "7.6×",
  },
  {
    name: "Ishita Rao",
    handle: "@ishitarao",
    deliverables: "3 of 4 delivered",
    platform: "Instagram · YouTube",
    code: "ISHITA15 · 2 links",
    status: "Completed",
    fee: "₹22,000",
    views: "4.1 L",
    engRate: "6.8%",
    clicks: "2,040",
    orders: "318",
    netSales: "₹1,21,400",
    roas: "7.1×",
  },
  {
    name: "Emma Clarke",
    handle: "@emmaclarke",
    deliverables: "3 of 4 delivered",
    platform: "Instagram",
    code: "EMMA15 · 1 link",
    status: "Completed",
    fee: "₹15,000",
    views: "2.6 L",
    engRate: "4.6%",
    clicks: "1,320",
    orders: "184",
    netSales: "₹76,000",
    roas: "5.1×",
  },
  {
    name: "Kavya Reddy",
    handle: "@kavyareddy",
    deliverables: "3 of 4 delivered",
    deliverableWarning: "1 deliverable overdue",
    platform: "Instagram",
    code: "KAVYA15 · 1 link",
    status: "Behind",
    fee: "₹12,000",
    views: "—",
    engRate: "—",
    clicks: "—",
    orders: "—",
    netSales: "—",
    roas: "—",
  },
];

export function BrandCustomReportsPage() {
  const [selectedBrandId, setSelectedBrandId] = useState("minimalist");
  const [selectedCampaignId, setSelectedCampaignId] = useState("all");
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const [campaignDropdownOpen, setCampaignDropdownOpen] = useState(false);
  const [brandSearch, setBrandSearch] = useState("");
  const [campaignSearch, setCampaignSearch] = useState("");

  const brandRef = useRef<HTMLDivElement>(null);
  const campaignRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (brandRef.current && !brandRef.current.contains(e.target as Node)) {
        setBrandDropdownOpen(false);
      }
      if (campaignRef.current && !campaignRef.current.contains(e.target as Node)) {
        setCampaignDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedBrand = useMemo(
    () => BRANDS.find((b) => b.id === selectedBrandId) || BRANDS[1],
    [selectedBrandId],
  );

  const selectedCampaign = useMemo(
    () => CAMPAIGNS.find((c) => c.id === selectedCampaignId) || CAMPAIGNS[0],
    [selectedCampaignId],
  );

  const filteredBrands = useMemo(() => {
    return BRANDS.filter((b) => b.name.toLowerCase().includes(brandSearch.toLowerCase()));
  }, [brandSearch]);

  const filteredCampaigns = useMemo(() => {
    return CAMPAIGNS.filter(
      (c) =>
        (selectedBrandId === "all" || c.brandId === selectedBrandId || c.id === "all") &&
        c.name.toLowerCase().includes(campaignSearch.toLowerCase()),
    );
  }, [campaignSearch, selectedBrandId]);

  const isAllCampaigns = selectedCampaignId === "all";

  const handleDownload = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      (isAllCampaigns
        ? "Campaign,Objective,Status,Spend,Main Result,Cost,Creators,Ends\n" +
          ALL_CAMPAIGNS_TABLE.map(
            (c) =>
              `"${c.name}","${c.objective}","${c.status}","${c.spend}","${c.mainResult}","${c.cost}",${c.creators},"${c.ends}"`,
          ).join("\n")
        : "Creator,Platform,Status,Fee,Views,Engagement,Clicks,Orders,Net Sales\n" +
          VITAMIN_C_CREATORS.map(
            (c) =>
              `"${c.name}","${c.platform}","${c.status}","${c.fee}","${c.views}","${c.engRate}","${c.clicks}","${c.orders}","${c.netSales}"`,
          ).join("\n"));

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `report-${selectedCampaign.id}-${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <BrandShell>
      <div className="min-h-screen bg-white text-neutral-900 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
          {/* 1. Page Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-neutral-200 pb-5">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">Reports</h1>
              <p className="mt-1 text-sm text-neutral-500">
                {selectedBrand.name} · {selectedCampaign.name.toLowerCase()} · updated 2 h ago
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <DateRangePicker showCompare={true} value="1 Oct – 28 Oct 2026" />
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-3.5 py-2 text-sm font-medium text-neutral-700 shadow-xs hover:bg-neutral-50 active:bg-neutral-100 transition-colors"
              >
                <Download size={16} className="text-neutral-500" />
                Download
              </button>
            </div>
          </div>

          {/* 2. Campaign Picker */}
          <div className="rounded-xl border border-neutral-200 bg-neutral-50/70 p-4 shadow-xs">
            <div className="flex flex-wrap items-center gap-4">
              {/* Brand Dropdown */}
              <div className="relative" ref={brandRef}>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-1">
                  Brand
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setBrandDropdownOpen((prev) => !prev);
                    setCampaignDropdownOpen(false);
                  }}
                  className="flex h-10 w-56 items-center justify-between rounded-lg border border-neutral-300 bg-white px-3 text-sm font-medium text-neutral-800 shadow-xs hover:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#3B5BFF]/30"
                >
                  <span className="truncate">{selectedBrand.name}</span>
                  <ChevronDown size={16} className="text-neutral-400 shrink-0 ml-2" />
                </button>

                {brandDropdownOpen && (
                  <div className="absolute left-0 top-full z-30 mt-1.5 w-72 rounded-xl border border-neutral-200 bg-white p-2 shadow-xl">
                    <div className="relative mb-2">
                      <Search size={14} className="absolute left-2.5 top-2.5 text-neutral-400" />
                      <input
                        type="text"
                        placeholder="Search brands"
                        value={brandSearch}
                        onChange={(e) => setBrandSearch(e.target.value)}
                        className="w-full rounded-md border border-neutral-200 py-1.5 pl-8 pr-3 text-xs focus:border-[#3B5BFF] focus:outline-none"
                      />
                    </div>
                    <div className="max-h-60 overflow-y-auto space-y-0.5">
                      {filteredBrands.map((b) => {
                        const isSelected = b.id === selectedBrandId;
                        return (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => {
                              setSelectedBrandId(b.id);
                              setBrandDropdownOpen(false);
                            }}
                            className={`flex w-full items-start justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                              isSelected ? "bg-neutral-100 font-medium" : "hover:bg-neutral-50"
                            }`}
                          >
                            <div>
                              <div className="text-neutral-900 font-medium">{b.name}</div>
                              <div className="text-xs text-neutral-500">{b.meta}</div>
                            </div>
                            {isSelected && <Check size={16} className="text-[#3B5BFF] mt-0.5" />}
                          </button>
                        );
                      })}
                    </div>
                    <div className="mt-2 border-t border-neutral-100 pt-2 px-1 text-[11px] text-neutral-500 leading-tight">
                      Pick a brand to see only its campaigns. The Campaign list follows the brand you
                      pick.
                    </div>
                  </div>
                )}
              </div>

              {/* Campaign Dropdown */}
              <div className="relative" ref={campaignRef}>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-1">
                  Campaign
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setCampaignDropdownOpen((prev) => !prev);
                    setBrandDropdownOpen(false);
                  }}
                  className="flex h-10 w-64 items-center justify-between rounded-lg border border-neutral-300 bg-white px-3 text-sm font-medium text-neutral-800 shadow-xs hover:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#3B5BFF]/30"
                >
                  <span className="truncate">{selectedCampaign.name}</span>
                  <ChevronDown size={16} className="text-neutral-400 shrink-0 ml-2" />
                </button>

                {campaignDropdownOpen && (
                  <div className="absolute left-0 top-full z-30 mt-1.5 w-80 rounded-xl border border-neutral-200 bg-white p-2 shadow-xl">
                    <div className="relative mb-2">
                      <Search size={14} className="absolute left-2.5 top-2.5 text-neutral-400" />
                      <input
                        type="text"
                        placeholder="Search campaigns"
                        value={campaignSearch}
                        onChange={(e) => setCampaignSearch(e.target.value)}
                        className="w-full rounded-md border border-neutral-200 py-1.5 pl-8 pr-3 text-xs focus:border-[#3B5BFF] focus:outline-none"
                      />
                    </div>
                    <div className="max-h-60 overflow-y-auto space-y-0.5">
                      {filteredCampaigns.map((c) => {
                        const isSelected = c.id === selectedCampaignId;
                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => {
                              setSelectedCampaignId(c.id);
                              setCampaignDropdownOpen(false);
                            }}
                            className={`flex w-full items-start justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                              isSelected ? "bg-neutral-100 font-medium" : "hover:bg-neutral-50"
                            }`}
                          >
                            <div>
                              <div className="text-neutral-900 font-medium">{c.name}</div>
                              <div className="text-xs text-neutral-500">
                                {c.id === "all" ? "Total brand performance" : `${c.objective} · ${c.type}`}
                              </div>
                            </div>
                            {isSelected && <Check size={16} className="text-[#3B5BFF] mt-0.5" />}
                          </button>
                        );
                      })}
                    </div>
                    <div className="mt-2 border-t border-neutral-100 pt-2 px-1 text-[11px] text-neutral-500 leading-tight">
                      The report changes to match the campaign’s objective and type.
                    </div>
                  </div>
                )}
              </div>

              {/* Badges / Meta row */}
              <div className="flex flex-wrap items-center gap-2 pt-5">
                {isAllCampaigns ? (
                  <>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 border border-emerald-200">
                      <span className="size-1.5 rounded-full bg-emerald-500" />5 live
                    </span>
                    <span className="inline-flex items-center rounded-full bg-neutral-200/60 px-2.5 py-1 text-xs font-medium text-neutral-700">
                      1 upcoming · each objective keeps its own measure
                    </span>
                  </>
                ) : (
                  <>
                    <span className="inline-flex items-center rounded-full bg-neutral-900 text-white px-2.5 py-1 text-xs font-medium">
                      {selectedCampaign.objective}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700 border border-neutral-200">
                      {selectedCampaign.type}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 border border-emerald-200">
                      <span className="size-1.5 rounded-full bg-emerald-500" />
                      {selectedCampaign.status}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600">
                      {selectedCampaign.period}
                      {selectedCampaign.daysLeft ? ` · ${selectedCampaign.daysLeft}` : ""}
                    </span>
                    <Link
                      to={ROUTES.brandProjects}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#3B5BFF] hover:underline ml-2"
                    >
                      Open campaign page <ExternalLink size={12} />
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* 3. Scorecards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {isAllCampaigns ? (
              <>
                <div className="relative rounded-xl border border-neutral-200 bg-white p-4 shadow-xs hover:border-neutral-300 transition-colors">
                  <div className="text-xs font-medium text-neutral-500">Total spend</div>
                  <div className="mt-2 text-2xl font-bold tracking-tight text-neutral-950">
                    ₹6,58,440
                  </div>
                  <div className="mt-1 text-xs text-neutral-500">5 live campaigns</div>
                  <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#3B5BFF] rounded-full" />
                </div>
                <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-xs hover:border-neutral-300 transition-colors">
                  <div className="text-xs font-medium text-neutral-500">Reach</div>
                  <div className="mt-2 text-2xl font-bold tracking-tight text-neutral-950">
                    79.7 L
                  </div>
                  <div className="mt-1 text-xs font-medium text-emerald-600">▲ 20% vs prev.</div>
                </div>
                <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-xs hover:border-neutral-300 transition-colors">
                  <div className="text-xs font-medium text-neutral-500">Engagements</div>
                  <div className="mt-2 text-2xl font-bold tracking-tight text-neutral-950">
                    6.36 L
                  </div>
                  <div className="mt-1 text-xs font-medium text-emerald-600">▲ 14% vs prev.</div>
                </div>
                <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-xs hover:border-neutral-300 transition-colors">
                  <div className="text-xs font-medium text-neutral-500">Link clicks</div>
                  <div className="mt-2 text-2xl font-bold tracking-tight text-neutral-950">
                    14,800
                  </div>
                  <div className="mt-1 text-xs font-medium text-emerald-600">▲ 9% vs prev.</div>
                </div>
                <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-xs hover:border-neutral-300 transition-colors">
                  <div className="text-xs font-medium text-neutral-500">Net sales</div>
                  <div className="mt-2 text-2xl font-bold tracking-tight text-neutral-950">
                    ₹5,42,000
                  </div>
                  <div className="mt-1 text-xs font-medium text-emerald-600">▲ 18% vs prev.</div>
                </div>
                <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-xs hover:border-neutral-300 transition-colors">
                  <div className="text-xs font-medium text-neutral-500">Usable videos</div>
                  <div className="mt-2 text-2xl font-bold tracking-tight text-neutral-950">
                    16 of 18
                  </div>
                  <div className="mt-1 text-xs text-neutral-500">UGC · Lip Tint Drop</div>
                </div>
              </>
            ) : selectedCampaign.id === "glow-squad" ? (
              <>
                <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-xs">
                  <div className="text-xs font-medium text-neutral-500">Reach</div>
                  <div className="mt-2 text-2xl font-bold tracking-tight text-neutral-950">
                    41.2 L
                  </div>
                  <div className="mt-1 text-xs font-medium text-emerald-600">▲ 22% vs prev.</div>
                </div>
                <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-xs">
                  <div className="text-xs font-medium text-neutral-500">Impressions</div>
                  <div className="mt-2 text-2xl font-bold tracking-tight text-neutral-950">
                    96.8 L
                  </div>
                  <div className="mt-1 text-xs font-medium text-emerald-600">▲ 18% vs prev.</div>
                </div>
                <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-xs">
                  <div className="text-xs font-medium text-neutral-500">Video views</div>
                  <div className="mt-2 text-2xl font-bold tracking-tight text-neutral-950">
                    32.5 L
                  </div>
                  <div className="mt-1 text-xs font-medium text-emerald-600">▲ 25% vs prev.</div>
                </div>
                <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-xs">
                  <div className="text-xs font-medium text-neutral-500">Frequency</div>
                  <div className="mt-2 text-2xl font-bold tracking-tight text-neutral-950">2.3×</div>
                  <div className="mt-1 text-xs text-neutral-500">healthy · 2–3× is ideal</div>
                </div>
                <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-xs">
                  <div className="text-xs font-medium text-neutral-500">Engagement rate</div>
                  <div className="mt-2 text-2xl font-bold tracking-tight text-neutral-950">6.1%</div>
                  <div className="mt-1 text-xs font-medium text-emerald-600">
                    ▲ 0.3 pt vs prev.
                  </div>
                </div>
                <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-xs">
                  <div className="text-xs font-medium text-neutral-500">Earned media value</div>
                  <div className="mt-2 text-2xl font-bold tracking-tight text-neutral-950">
                    ₹3,10,000
                  </div>
                  <div className="mt-1 text-xs text-neutral-500">Estimate · not a cost</div>
                </div>
              </>
            ) : selectedCampaign.id === "hydration-bundle" ? (
              <>
                <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-xs">
                  <div className="text-xs font-medium text-neutral-500">Total Engagement</div>
                  <div className="mt-2 text-2xl font-bold tracking-tight text-neutral-950">
                    1.46 L
                  </div>
                  <div className="mt-1 text-xs font-medium text-emerald-600">▲ 12% vs prev.</div>
                </div>
                <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-xs">
                  <div className="text-xs font-medium text-neutral-500">Engagement rate</div>
                  <div className="mt-2 text-2xl font-bold tracking-tight text-neutral-950">5.8%</div>
                  <div className="mt-1 text-xs font-medium text-emerald-600">
                    ▲ 1.3 pt vs 4.5% target
                  </div>
                </div>
                <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-xs">
                  <div className="text-xs font-medium text-neutral-500">Saves</div>
                  <div className="mt-2 text-2xl font-bold tracking-tight text-neutral-950">
                    12.4K
                  </div>
                  <div className="mt-1 text-xs font-medium text-emerald-600">▲ 21% vs prev.</div>
                </div>
                <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-xs">
                  <div className="text-xs font-medium text-neutral-500">Shares</div>
                  <div className="mt-2 text-2xl font-bold tracking-tight text-neutral-950">
                    6,850
                  </div>
                  <div className="mt-1 text-xs font-medium text-emerald-600">▲ 9% vs prev.</div>
                </div>
                <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-xs">
                  <div className="text-xs font-medium text-neutral-500">Comments</div>
                  <div className="mt-2 text-2xl font-bold tracking-tight text-neutral-950">
                    9,320
                  </div>
                  <div className="mt-1 text-xs font-medium text-emerald-600">▲ 15% vs prev.</div>
                </div>
                <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-xs">
                  <div className="text-xs font-medium text-neutral-500">Views</div>
                  <div className="mt-2 text-2xl font-bold tracking-tight text-neutral-950">
                    25.2 L
                  </div>
                  <div className="mt-1 text-xs font-medium text-emerald-600">▲ 10% vs prev.</div>
                </div>
              </>
            ) : (
              // Vitamin-C Serum & default single campaign (Sales)
              <>
                <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-xs">
                  <div className="text-xs font-medium text-neutral-500">Net sales</div>
                  <div className="mt-2 text-2xl font-bold tracking-tight text-neutral-950">
                    ₹5,42,000
                  </div>
                  <div className="mt-1 text-xs font-medium text-emerald-600">▲ 18% vs prev.</div>
                </div>
                <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-xs">
                  <div className="text-xs font-medium text-neutral-500">Orders</div>
                  <div className="mt-2 text-2xl font-bold tracking-tight text-neutral-950">
                    1,315
                  </div>
                  <div className="mt-1 text-xs font-medium text-emerald-600">▲ 14% vs prev.</div>
                </div>
                <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-xs">
                  <div className="text-xs font-medium text-neutral-500">Link clicks</div>
                  <div className="mt-2 text-2xl font-bold tracking-tight text-neutral-950">
                    14,800
                  </div>
                  <div className="mt-1 text-xs font-medium text-emerald-600">
                    ▲ 9% vs prev. · CTR 0.8%
                  </div>
                </div>
                <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-xs">
                  <div className="text-xs font-medium text-neutral-500">Engagement rate</div>
                  <div className="mt-2 text-2xl font-bold tracking-tight text-neutral-950">5.4%</div>
                  <div className="mt-1 text-xs font-medium text-emerald-600">
                    ▲ 0.4 pt vs prev.
                  </div>
                </div>
                <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-xs">
                  <div className="text-xs font-medium text-neutral-500">Views</div>
                  <div className="mt-2 text-2xl font-bold tracking-tight text-neutral-950">
                    18.4 L
                  </div>
                  <div className="mt-1 text-xs font-medium text-emerald-600">▲ 19% vs prev.</div>
                </div>
                <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-xs">
                  <div className="text-xs font-medium text-neutral-500">Earned media value</div>
                  <div className="mt-2 text-2xl font-bold tracking-tight text-neutral-950">
                    ₹2,28,000
                  </div>
                  <div className="mt-1 text-xs text-neutral-500">Estimate · not in ROAS</div>
                </div>
              </>
            )}
          </div>

          {/* 4. Row · Trend & Platforms */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Trend Card */}
            <div className="lg:col-span-2 rounded-xl border border-neutral-200 bg-white p-5 shadow-xs">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold text-neutral-900">
                    {isAllCampaigns ? "Reach over time" : "Net sales over time"}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {isAllCampaigns
                      ? "All campaigns · cumulative reach · change the metric to see any other result"
                      : "All 16 creators · Shopify codes and links"}
                  </p>
                </div>
                {!isAllCampaigns && (
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-[#3B5BFF] border border-blue-200">
                    36% of brand sales
                  </span>
                )}
              </div>

              {/* Line Chart (SVG) */}
              <div className="mt-6 h-56 w-full">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 680 180">
                  <defs>
                    <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B5BFF" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#3B5BFF" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal grid lines */}
                  <line x1="0" y1="30" x2="680" y2="30" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="75" x2="680" y2="75" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="120" x2="680" y2="120" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="165" x2="680" y2="165" stroke="#f1f5f9" strokeWidth="1" />

                  {/* Area fill */}
                  <path
                    d="M 20 155 C 80 145, 140 135, 200 120 C 260 105, 320 85, 380 65 C 440 50, 520 40, 600 32 C 640 28, 660 25, 670 25 L 670 165 L 20 165 Z"
                    fill="url(#trendGradient)"
                  />

                  {/* Stroke path */}
                  <path
                    d="M 20 155 C 80 145, 140 135, 200 120 C 260 105, 320 85, 380 65 C 440 50, 520 40, 600 32 C 640 28, 660 25, 670 25"
                    fill="none"
                    stroke="#3B5BFF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Highlight point on curve */}
                  <circle cx="380" cy="65" r="4.5" fill="#3B5BFF" stroke="#fff" strokeWidth="2" />
                  <circle cx="670" cy="25" r="4.5" fill="#3B5BFF" stroke="#fff" strokeWidth="2" />
                </svg>

                {/* X-axis dates */}
                <div className="flex justify-between text-[11px] text-neutral-400 mt-2 px-1">
                  <span>14 Oct</span>
                  <span>17 Oct</span>
                  <span>20 Oct</span>
                  <span>23 Oct</span>
                  <span>26 Oct</span>
                  <span>29 Oct</span>
                  <span>1 Nov</span>
                  <span>4 Nov</span>
                </div>
              </div>
            </div>

            {/* By Platform Card */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-base font-semibold text-neutral-900">By platform</h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {isAllCampaigns ? "Share of views · all campaigns" : "Share of net sales · orders"}
                </p>

                <div className="mt-5">
                  <div className="text-3xl font-extrabold tracking-tight text-neutral-950">74%</div>
                  <div className="text-xs text-neutral-600 mt-0.5 font-medium">
                    {isAllCampaigns
                      ? "of views came from Instagram"
                      : "of net sales came from Instagram"}
                  </div>
                </div>

                <div className="mt-6 space-y-3.5">
                  <div>
                    <div className="flex justify-between text-xs font-medium text-neutral-700 mb-1">
                      <span>{isAllCampaigns ? "Instagram Reels" : "Instagram Reels · code"}</span>
                      <span className="font-semibold text-neutral-900">
                        {isAllCampaigns ? "58%" : "52%"}
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                      <div
                        className="h-full bg-neutral-900 rounded-full"
                        style={{ width: isAllCampaigns ? "58%" : "52%" }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-neutral-700 mb-1">
                      <span>{isAllCampaigns ? "Instagram Stories" : "Instagram Stories · link"}</span>
                      <span className="font-semibold text-neutral-900">
                        {isAllCampaigns ? "16%" : "22%"}
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                      <div
                        className="h-full bg-neutral-700 rounded-full"
                        style={{ width: isAllCampaigns ? "16%" : "22%" }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-neutral-700 mb-1">
                      <span>
                        {isAllCampaigns ? "YouTube Shorts" : "YouTube · description link"}
                      </span>
                      <span className="font-semibold text-neutral-900">26%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                      <div className="h-full bg-neutral-400 rounded-full" style={{ width: "26%" }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-neutral-100 pt-3 text-[11px] text-neutral-500 leading-normal">
                {isAllCampaigns
                  ? "UGC files go to your Content hub and aren’t posted, so they aren’t counted here."
                  : "Codes in Reels drove the most orders; YouTube links had the highest AOV."}
              </div>
            </div>
          </div>

          {/* 5. Row · Results vs Target & Spend / Creator breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {isAllCampaigns ? (
              <>
                {/* Results vs Target by Campaign */}
                <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-neutral-900">
                        Results vs target by campaign
                      </h3>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        Each campaign against its own target · objectives are never added together
                      </p>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-neutral-600">
                    <span className="flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-emerald-500" />
                      On or above target
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-neutral-400" />
                      Below target
                    </span>
                    <span className="text-neutral-400">┆ 100% = that campaign’s target</span>
                  </div>

                  {/* Progress bars list */}
                  <div className="mt-5 space-y-4">
                    <div>
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-neutral-900">Hydration Bundle</span>
                        <span className="text-neutral-500">
                          Engagement · rate <span className="font-semibold text-emerald-600 ml-1">5.8% vs 4.5% · 129%</span>
                        </span>
                      </div>
                      <div className="mt-1.5 h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: "100%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-neutral-900">Glow Squad</span>
                        <span className="text-neutral-500">
                          Awareness · reach <span className="font-semibold text-neutral-900 ml-1">41.2 of 45 L · 92%</span>
                        </span>
                      </div>
                      <div className="mt-1.5 h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                        <div className="h-full bg-neutral-800 rounded-full" style={{ width: "92%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-neutral-900">Lip Tint Drop</span>
                        <span className="text-neutral-500">
                          Traffic · UGC videos <span className="font-semibold text-neutral-900 ml-1">16 of 18 · 89%</span>
                        </span>
                      </div>
                      <div className="mt-1.5 h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                        <div className="h-full bg-neutral-800 rounded-full" style={{ width: "89%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-neutral-900">Monsoon Sunscreen</span>
                        <span className="text-neutral-500">
                          Awareness · reach <span className="font-semibold text-neutral-900 ml-1">38.5 of 50 L · 77%</span>
                        </span>
                      </div>
                      <div className="mt-1.5 h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                        <div className="h-full bg-neutral-700 rounded-full" style={{ width: "77%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-neutral-900">Vitamin-C Serum</span>
                        <span className="text-neutral-500">
                          Sales · net sales <span className="font-semibold text-neutral-900 ml-1">₹5.42 of 8 L · 68%</span>
                        </span>
                      </div>
                      <div className="mt-1.5 h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                        <div className="h-full bg-neutral-600 rounded-full" style={{ width: "68%" }} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-neutral-100 pt-3 text-[11px] text-neutral-500">
                    Skin Quiz Leads (Lead generation) starts 4 Nov · ₹63,540 still to fund
                  </div>
                </div>

                {/* Spend by Objective */}
                <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-neutral-900">Spend by objective</h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Fees, products and shipping · to date
                    </p>

                    <div className="mt-4">
                      <div className="text-3xl font-extrabold tracking-tight text-neutral-950">
                        ₹6,58,440
                      </div>
                      <div className="text-xs text-neutral-500 mt-0.5 font-medium">
                        spent across 5 live campaigns
                      </div>
                    </div>

                    {/* Stacked multi-color bar */}
                    <div className="mt-5 h-3.5 w-full rounded-full bg-neutral-100 flex overflow-hidden">
                      <div className="bg-neutral-900 h-full" style={{ width: "52%" }} title="Awareness 52%" />
                      <div className="bg-[#3B5BFF] h-full" style={{ width: "30%" }} title="Sales 30%" />
                      <div className="bg-emerald-500 h-full" style={{ width: "9%" }} title="Traffic 9%" />
                      <div className="bg-amber-400 h-full" style={{ width: "9%" }} title="Engagement 8%" />
                    </div>

                    {/* Breakdown legend */}
                    <div className="mt-5 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-2 text-neutral-700">
                          <span className="size-2 rounded-full bg-neutral-900" />
                          Awareness · 2 campaigns
                        </span>
                        <span className="font-semibold text-neutral-900">₹3,45,000 · 52%</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-2 text-neutral-700">
                          <span className="size-2 rounded-full bg-[#3B5BFF]" />
                          Sales · 1 campaign
                        </span>
                        <span className="font-semibold text-neutral-900">₹2,00,000 · 30%</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-2 text-neutral-700">
                          <span className="size-2 rounded-full bg-emerald-500" />
                          Traffic · UGC
                        </span>
                        <span className="font-semibold text-neutral-900">₹60,000 · 9%</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-2 text-neutral-700">
                          <span className="size-2 rounded-full bg-amber-400" />
                          Engagement · gift
                        </span>
                        <span className="font-semibold text-neutral-900">₹53,440 · 8%</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-neutral-100 pt-3 text-[11px] text-neutral-500 flex justify-between">
                    <span>Target: 45 L</span>
                    <span>Still to reach: − 3.8 L</span>
                    <span className="font-medium text-neutral-800">Reached: 41.2 L</span>
                  </div>
                </div>
              </>
            ) : (
              // Single campaign (Vitamin-C Serum) view
              <>
                {/* Net sales by creator */}
                <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-neutral-900">
                        Net sales by creator
                      </h3>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        Net sales per creator · dashed line = ₹50,000 each
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-neutral-600">
                    <span className="flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-emerald-500" />
                      Above target
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-neutral-400" />
                      Below target
                    </span>
                    <span className="text-neutral-400">┆ Target ₹50,000 per creator · ₹8 L total</span>
                  </div>

                  <div className="mt-5 space-y-3.5">
                    <div>
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-neutral-900">Meera Iyer</span>
                        <span className="text-emerald-600 font-semibold">₹1,68,000 · 7.6×</span>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: "100%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-neutral-900">Ishita Rao</span>
                        <span className="text-emerald-600 font-semibold">₹1,21,400 · 7.1×</span>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: "72%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-neutral-900">Emma Clarke</span>
                        <span className="text-emerald-600 font-semibold">₹76,000 · 5.1×</span>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: "45%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-neutral-900">Riya Sen</span>
                        <span className="text-emerald-600 font-semibold">₹54,000 · 4.2×</span>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: "32%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-neutral-900">Nisha Verma</span>
                        <span className="text-neutral-500">₹41,000 · 3.4×</span>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                        <div className="h-full bg-neutral-700 rounded-full" style={{ width: "24%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-neutral-900">Kavya Reddy</span>
                        <span className="text-neutral-400 italic">posting</span>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                        <div className="h-full bg-neutral-300 rounded-full" style={{ width: "8%" }} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-neutral-100 pt-3 text-[11px] text-neutral-500">
                    Top 6 of 16 creators · ₹5,42,000 net sales so far (68% of ₹8 L)
                  </div>
                </div>

                {/* Revenue breakdown */}
                <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-neutral-900">Revenue</h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Gross to net sales · Shopify · all creators
                    </p>

                    <div className="mt-4 grid grid-cols-3 gap-2 border-b border-neutral-100 pb-4">
                      <div>
                        <div className="text-xs text-neutral-500">Gross sales</div>
                        <div className="text-lg font-bold text-neutral-900 mt-1">₹5,96,000</div>
                      </div>
                      <div>
                        <div className="text-xs text-neutral-500">Returns</div>
                        <div className="text-lg font-bold text-rose-600 mt-1">− ₹54,000</div>
                      </div>
                      <div>
                        <div className="text-xs text-neutral-500">Net sales</div>
                        <div className="text-lg font-bold text-emerald-600 mt-1">₹5,42,000</div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="rounded-lg bg-neutral-50 p-3">
                        <div className="text-xs text-neutral-500">Orders · coupon code</div>
                        <div className="text-xl font-bold text-neutral-900 mt-1">824</div>
                      </div>
                      <div className="rounded-lg bg-neutral-50 p-3">
                        <div className="text-xs text-neutral-500">Orders · UTM link</div>
                        <div className="text-xl font-bold text-neutral-900 mt-1">491</div>
                      </div>
                      <div className="rounded-lg bg-neutral-50 p-3">
                        <div className="text-xs text-neutral-500">Average order value (AOV)</div>
                        <div className="text-xl font-bold text-neutral-900 mt-1">₹412</div>
                      </div>
                      <div className="rounded-lg bg-neutral-50 p-3">
                        <div className="text-xs text-neutral-500">ROAS (net sales ÷ fees)</div>
                        <div className="text-xl font-bold text-[#3B5BFF] mt-1">3.8×</div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* 6. Breakdown Table */}
          <div className="rounded-xl border border-neutral-200 bg-white shadow-xs overflow-hidden">
            <div className="p-5 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="text-base font-semibold text-neutral-900">
                  {isAllCampaigns ? "Campaigns" : "Creators"}
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {isAllCampaigns
                    ? "5 live · 1 upcoming · click any row to open that campaign’s report"
                    : "16 creators · sorted by net sales"}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              {isAllCampaigns ? (
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-50/80 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider border-b border-neutral-200">
                    <tr>
                      <th className="py-3 px-4">Campaign</th>
                      <th className="py-3 px-4">Objective</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Spend</th>
                      <th className="py-3 px-4 text-right">Main Result</th>
                      <th className="py-3 px-4 text-center">Vs Target</th>
                      <th className="py-3 px-4 text-right">Cost</th>
                      <th className="py-3 px-4 text-center">Creators</th>
                      <th className="py-3 px-4 text-right">Ends</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {ALL_CAMPAIGNS_TABLE.map((row) => (
                      <tr
                        key={row.id}
                        onClick={() => setSelectedCampaignId(row.id)}
                        className="hover:bg-neutral-50/80 cursor-pointer transition-colors"
                      >
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-neutral-900 hover:text-[#3B5BFF]">
                            {row.name}
                          </div>
                          <div className="text-[11px] text-neutral-500">{row.sub}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-medium text-neutral-900">{row.objective}</span>
                          <div className="text-[11px] text-neutral-500">{row.objectiveDetail}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                              row.status === "Live"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            <span
                              className={`size-1.5 rounded-full ${
                                row.status === "Live" ? "bg-emerald-500" : "bg-amber-500"
                              }`}
                            />
                            {row.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right font-medium text-neutral-900">
                          {row.spend}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="font-semibold text-neutral-900">{row.mainResult}</div>
                          <div className="text-[11px] text-neutral-500">{row.mainResultSub}</div>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span
                            className={`inline-block font-semibold ${
                              row.vsTarget >= 100 ? "text-emerald-600" : "text-neutral-800"
                            }`}
                          >
                            {row.vsTargetLabel}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="font-semibold text-neutral-900">{row.cost}</div>
                          <div className="text-[11px] text-neutral-500">{row.costSub}</div>
                        </td>
                        <td className="py-3.5 px-4 text-center font-medium text-neutral-800">
                          {row.creators}
                        </td>
                        <td className="py-3.5 px-4 text-right text-neutral-600">{row.ends}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-50/80 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider border-b border-neutral-200">
                    <tr>
                      <th className="py-3 px-4">Creator</th>
                      <th className="py-3 px-4">Platform · Code</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Fee</th>
                      <th className="py-3 px-4 text-right">Views ↓</th>
                      <th className="py-3 px-4 text-right">Eng. Rate</th>
                      <th className="py-3 px-4 text-right">Clicks</th>
                      <th className="py-3 px-4 text-right">Orders</th>
                      <th className="py-3 px-4 text-right">Net Sales</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {VITAMIN_C_CREATORS.map((row, idx) => (
                      <tr key={idx} className="hover:bg-neutral-50/80 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-neutral-900">{row.name}</div>
                          <div className="text-[11px] text-neutral-500">
                            {row.handle} · {row.deliverables}
                          </div>
                          {row.deliverableWarning && (
                            <div className="text-[11px] text-amber-600 font-medium">
                              {row.deliverableWarning}
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-medium text-neutral-900">{row.platform}</div>
                          <div className="text-[11px] text-neutral-500">{row.code}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                              row.status === "Completed"
                                ? "bg-neutral-100 text-neutral-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            <span
                              className={`size-1.5 rounded-full ${
                                row.status === "Completed" ? "bg-neutral-500" : "bg-amber-500"
                              }`}
                            />
                            {row.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right font-medium text-neutral-900">
                          {row.fee}
                        </td>
                        <td className="py-3.5 px-4 text-right font-semibold text-neutral-900">
                          {row.views}
                        </td>
                        <td className="py-3.5 px-4 text-right text-neutral-800">{row.engRate}</td>
                        <td className="py-3.5 px-4 text-right text-neutral-800">{row.clicks}</td>
                        <td className="py-3.5 px-4 text-right text-neutral-800">{row.orders}</td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="font-semibold text-neutral-900">{row.netSales}</div>
                          {row.roas !== "—" && (
                            <div className="text-[11px] text-emerald-600 font-medium">
                              ROAS {row.roas}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* 7. Row · Engagement & Views */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Views Donut Card */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-base font-semibold text-neutral-900">Views</h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Followers vs non-followers · all influencer campaigns
                </p>

                {/* Donut Chart representation */}
                <div className="mt-5 flex items-center justify-center">
                  <div className="relative size-36 flex items-center justify-center">
                    <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="3.8"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#0f172a"
                        strokeWidth="3.8"
                        strokeDasharray="63, 100"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <div className="text-base font-extrabold text-neutral-950">
                        {isAllCampaigns ? "1.04 Cr" : "18.4 L"}
                      </div>
                      <div className="text-[10px] text-neutral-500 uppercase font-medium">views</div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 text-neutral-700">
                      <span className="size-2 rounded-full bg-neutral-300" />
                      Followers
                    </span>
                    <span className="font-semibold text-neutral-900">
                      {isAllCampaigns ? "38.5 L · 37%" : "7.2 L · 39%"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 text-neutral-700">
                      <span className="size-2 rounded-full bg-neutral-900" />
                      Non-followers
                    </span>
                    <span className="font-semibold text-neutral-900">
                      {isAllCampaigns ? "65.5 L · 63%" : "11.2 L · 61%"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Engagement Breakdown Card */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-base font-semibold text-neutral-900">Engagement breakdown</h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {isAllCampaigns
                    ? "What the 6.1% engagement rate is made of · 6.36 L"
                    : "What the 5.4% engagement rate is made of · 1,18,000"}
                </p>

                {/* Stacked Horizontal Bar */}
                <div className="mt-5 h-3.5 w-full rounded-full bg-neutral-100 flex overflow-hidden">
                  <div className="bg-neutral-900 h-full" style={{ width: isAllCampaigns ? "72%" : "31%" }} />
                  <div className="bg-neutral-700 h-full" style={{ width: isAllCampaigns ? "6%" : "8%" }} />
                  <div className="bg-neutral-500 h-full" style={{ width: isAllCampaigns ? "13%" : "38%" }} />
                  <div className="bg-neutral-300 h-full" style={{ width: isAllCampaigns ? "9%" : "23%" }} />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-neutral-500">Likes</span>
                    <div className="font-semibold text-neutral-900 mt-0.5">
                      {isAllCampaigns ? "4.58 L · 72%" : "36,600 · 31%"}
                    </div>
                  </div>
                  <div>
                    <span className="text-neutral-500">Comments</span>
                    <div className="font-semibold text-neutral-900 mt-0.5">
                      {isAllCampaigns ? "38,000 · 6%" : "9,400 · 8%"}
                    </div>
                  </div>
                  <div>
                    <span className="text-neutral-500">Saves</span>
                    <div className="font-semibold text-neutral-900 mt-0.5">
                      {isAllCampaigns ? "84,000 · 13%" : "44,800 · 38%"}
                    </div>
                  </div>
                  <div>
                    <span className="text-neutral-500">Shares</span>
                    <div className="font-semibold text-neutral-900 mt-0.5">
                      {isAllCampaigns ? "58,000 · 9%" : "27,200 · 23%"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 border-t border-neutral-100 pt-3 flex justify-between text-xs">
                <div>
                  <span className="text-neutral-500">Total interactions</span>
                  <div className="font-semibold text-neutral-900">
                    {isAllCampaigns ? "6.36 L" : "1,18,000"}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-neutral-500">Save & share rate</span>
                  <div className="font-semibold text-neutral-900">
                    {isAllCampaigns ? "22%" : "3.9%"}
                  </div>
                </div>
              </div>
            </div>

            {/* By Format Card */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-base font-semibold text-neutral-900">By format</h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Share of views from people who don’t follow the creator
                </p>

                <div className="mt-5 space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-neutral-800">Reels</span>
                      <span className="font-semibold text-neutral-900">63%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                      <div className="h-full bg-neutral-900 rounded-full" style={{ width: "63%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-neutral-800">Shorts</span>
                      <span className="font-semibold text-neutral-900">58%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                      <div className="h-full bg-neutral-700 rounded-full" style={{ width: "58%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-neutral-800">Stories</span>
                      <span className="font-semibold text-neutral-900">41%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                      <div className="h-full bg-neutral-500 rounded-full" style={{ width: "41%" }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 border-t border-neutral-100 pt-3 text-[11px] text-neutral-500 leading-normal">
                Reels reach the most new people. On YouTube: not subscribed.
              </div>
            </div>
          </div>

          {/* 8. Row · Audience (Countries) */}
          <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-semibold text-neutral-900">Countries</h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Where viewers live · Instagram + YouTube insights
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* World Dot Map SVG */}
              <div className="lg:col-span-2 relative h-56 w-full flex items-center justify-center bg-neutral-50/50 rounded-xl border border-neutral-100 p-4">
                <svg className="w-full h-full text-neutral-300" viewBox="0 0 600 300" fill="none">
                  {/* Stylized world dot pattern */}
                  <g fill="currentColor" opacity="0.4">
                    {/* North America */}
                    <circle cx="120" cy="80" r="2.5" />
                    <circle cx="140" cy="85" r="2.5" />
                    <circle cx="160" cy="90" r="2.5" />
                    <circle cx="180" cy="95" r="2.5" />
                    <circle cx="130" cy="110" r="2.5" />
                    <circle cx="150" cy="115" r="2.5" />
                    <circle cx="170" cy="120" r="2.5" />
                    <circle cx="190" cy="125" r="2.5" />
                    {/* Europe */}
                    <circle cx="310" cy="80" r="2.5" />
                    <circle cx="325" cy="85" r="2.5" />
                    <circle cx="340" cy="90" r="2.5" />
                    <circle cx="315" cy="100" r="2.5" />
                    <circle cx="330" cy="105" r="2.5" />
                    {/* Middle East & Asia */}
                    <circle cx="380" cy="125" r="2.5" />
                    <circle cx="395" cy="130" r="2.5" />
                    <circle cx="430" cy="135" r="3" />
                    <circle cx="445" cy="140" r="3.5" />
                    <circle cx="435" cy="155" r="4" />
                    <circle cx="450" cy="160" r="3.5" />
                    <circle cx="470" cy="145" r="2.5" />
                    <circle cx="485" cy="150" r="2.5" />
                    <circle cx="480" cy="175" r="2.5" />
                    <circle cx="495" cy="180" r="2.5" />
                    {/* Africa & South America */}
                    <circle cx="210" cy="190" r="2.5" />
                    <circle cx="225" cy="210" r="2.5" />
                    <circle cx="330" cy="160" r="2.5" />
                    <circle cx="345" cy="180" r="2.5" />
                    <circle cx="360" cy="200" r="2.5" />
                    {/* Australia */}
                    <circle cx="520" cy="220" r="2.5" />
                    <circle cx="540" cy="230" r="2.5" />
                  </g>

                  {/* Highlighted Hubs */}
                  {/* India (Hub) */}
                  <circle cx="440" cy="148" r="14" fill="#3B5BFF" fillOpacity="0.15" />
                  <circle cx="440" cy="148" r="6" fill="#3B5BFF" />
                  <text x="440" y="172" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle">
                    India (78%)
                  </text>

                  {/* UAE */}
                  <circle cx="385" cy="128" r="8" fill="#0f172a" fillOpacity="0.15" />
                  <circle cx="385" cy="128" r="4" fill="#0f172a" />

                  {/* USA */}
                  <circle cx="150" cy="105" r="8" fill="#0f172a" fillOpacity="0.15" />
                  <circle cx="150" cy="105" r="4" fill="#0f172a" />

                  {/* UK */}
                  <circle cx="315" cy="85" r="8" fill="#0f172a" fillOpacity="0.15" />
                  <circle cx="315" cy="85" r="4" fill="#0f172a" />

                  {/* Singapore */}
                  <circle cx="485" cy="175" r="7" fill="#0f172a" fillOpacity="0.15" />
                  <circle cx="485" cy="175" r="3.5" fill="#0f172a" />
                </svg>
              </div>

              {/* Countries Ranking */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider mb-2">
                  Top countries
                </h4>

                <div>
                  <div className="flex justify-between text-xs font-medium text-neutral-800 mb-1">
                    <span className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-[#3B5BFF]" />
                      India
                    </span>
                    <span className="font-semibold text-neutral-950">78%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-neutral-100 overflow-hidden">
                    <div className="h-full bg-[#3B5BFF] rounded-full" style={{ width: "78%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-neutral-800 mb-1">
                    <span className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-neutral-800" />
                      UAE
                    </span>
                    <span className="font-semibold text-neutral-950">6%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-neutral-100 overflow-hidden">
                    <div className="h-full bg-neutral-800 rounded-full" style={{ width: "6%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-neutral-800 mb-1">
                    <span className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-neutral-700" />
                      United States
                    </span>
                    <span className="font-semibold text-neutral-950">5%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-neutral-100 overflow-hidden">
                    <div className="h-full bg-neutral-700 rounded-full" style={{ width: "5%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-neutral-800 mb-1">
                    <span className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-neutral-600" />
                      United Kingdom
                    </span>
                    <span className="font-semibold text-neutral-950">4%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-neutral-100 overflow-hidden">
                    <div className="h-full bg-neutral-600 rounded-full" style={{ width: "4%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-neutral-800 mb-1">
                    <span className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-neutral-500" />
                      Singapore
                    </span>
                    <span className="font-semibold text-neutral-950">3%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-neutral-100 overflow-hidden">
                    <div className="h-full bg-neutral-500 rounded-full" style={{ width: "3%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-neutral-800 mb-1">
                    <span className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-neutral-400" />
                      Other
                    </span>
                    <span className="font-semibold text-neutral-950">4%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-neutral-100 overflow-hidden">
                    <div className="h-full bg-neutral-400 rounded-full" style={{ width: "4%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 9. Row · Cities & Age / Gender */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Cities */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs">
              <h3 className="text-base font-semibold text-neutral-900">Cities</h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Top cities of viewers · Instagram + YouTube insights
              </p>

              <div className="mt-5 space-y-3">
                {[
                  { city: "Bengaluru", pct: "21%" },
                  { city: "Mumbai", pct: "17%" },
                  { city: "Delhi NCR", pct: "12%" },
                  { city: "Chennai", pct: "8%" },
                  { city: "Hyderabad", pct: "7%" },
                  { city: "Pune", pct: "6%" },
                  { city: "Other cities", pct: "29%" },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs font-medium text-neutral-800 mb-1">
                      <span>{item.city}</span>
                      <span className="font-semibold text-neutral-950">{item.pct}</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-neutral-100 overflow-hidden">
                      <div
                        className="h-full bg-neutral-800 rounded-full"
                        style={{ width: item.pct }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Age & Gender */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-neutral-900">Age and gender</h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Share of viewers · Instagram + YouTube insights
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1.5 font-medium text-neutral-800">
                      <span className="size-2 rounded-full bg-neutral-900" />
                      Women 86%
                    </span>
                    <span className="flex items-center gap-1.5 font-medium text-neutral-500">
                      <span className="size-2 rounded-full bg-neutral-400" />
                      Men 14%
                    </span>
                  </div>
                </div>

                {/* Age brackets chart */}
                <div className="mt-8 space-y-4">
                  {[
                    { bracket: "13–17", women: "3%", men: "0%" },
                    { bracket: "18–24", women: "30%", men: "4%" },
                    { bracket: "25–34", women: "41%", men: "5%" },
                    { bracket: "35–44", women: "9%", men: "3%" },
                    { bracket: "45+", women: "3%", men: "2%" },
                  ].map((row, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs">
                      <span className="w-12 text-neutral-500 font-medium">{row.bracket}</span>
                      <div className="flex-1 flex gap-1 h-3 rounded-full bg-neutral-100 overflow-hidden">
                        <div
                          className="bg-neutral-900 h-full rounded-l-full"
                          style={{ width: row.women }}
                          title={`Women ${row.women}`}
                        />
                        <div
                          className="bg-neutral-400 h-full rounded-r-full"
                          style={{ width: row.men }}
                          title={`Men ${row.men}`}
                        />
                      </div>
                      <span className="w-20 text-right text-neutral-600 font-medium">
                        {row.women} / {row.men}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-neutral-100 pt-3 text-[11px] text-neutral-500">
                Primary demographic is women aged 18–34 (71% of all reached audience).
              </div>
            </div>
          </div>

          {/* 10. Row · Delivery & Budget and Cost Efficiency */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Budget Card */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-base font-semibold text-neutral-900">Budget</h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {isAllCampaigns
                    ? "All campaigns · fees, products and shipping"
                    : "Paid · one-time · 16 creators · ₹2,00,000 funded"}
                </p>

                <div className="mt-6 flex flex-col sm:flex-row items-center gap-6">
                  {/* Budget Donut */}
                  <div className="relative size-36 shrink-0 flex items-center justify-center">
                    <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="3.8"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#0f172a"
                        strokeWidth="3.8"
                        strokeDasharray={isAllCampaigns ? "43, 100" : "71, 100"}
                      />
                    </svg>
                    <div className="absolute text-center">
                      <div className="text-base font-extrabold text-neutral-950">
                        {isAllCampaigns ? "₹10 L" : "₹2,00,000"}
                      </div>
                      <div className="text-[10px] text-neutral-500 uppercase font-medium">total</div>
                    </div>
                  </div>

                  {/* Slices details */}
                  <div className="flex-1 w-full space-y-3">
                    <div>
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-neutral-800">
                          {isAllCampaigns ? "Released to creators" : "Paid to creators"}
                        </span>
                        <span className="font-semibold text-neutral-950">
                          {isAllCampaigns ? "₹4,33,800 · 43%" : "₹1,42,800 · 71%"}
                        </span>
                      </div>
                      <div className="text-[11px] text-neutral-500">
                        {isAllCampaigns ? "after you approved" : "released after you approved content"}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-neutral-800">Held in escrow</span>
                        <span className="font-semibold text-neutral-950">
                          {isAllCampaigns ? "₹1,71,200 · 17%" : "₹57,200 · 29%"}
                        </span>
                      </div>
                      <div className="text-[11px] text-neutral-500">releases as you approve</div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-neutral-800">
                          {isAllCampaigns ? "Awaiting funding" : "Not yet committed"}
                        </span>
                        <span className="font-semibold text-neutral-950">
                          {isAllCampaigns ? "₹2,85,000 · 29%" : "₹0 · 0%"}
                        </span>
                      </div>
                      <div className="text-[11px] text-neutral-500">
                        {isAllCampaigns ? "still to fund" : "fully funded"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 border-t border-neutral-100 pt-3 flex justify-between text-xs font-medium text-neutral-700">
                <span>{isAllCampaigns ? "Total budget" : "Total committed"}</span>
                <span className="font-bold text-neutral-950">
                  {isAllCampaigns ? "₹10,00,000" : "₹2,00,000"}
                </span>
              </div>
            </div>

            {/* Cost Efficiency Card */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-base font-semibold text-neutral-900">Cost efficiency</h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {isAllCampaigns
                    ? "Cost per piece of content"
                    : "Return on ad spend (ROAS)"}
                </p>

                <div className="mt-4">
                  <div className="text-3xl font-extrabold tracking-tight text-neutral-950">
                    {isAllCampaigns ? "₹7,656" : "3.8×"}
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs font-medium text-emerald-600">
                    <span>{isAllCampaigns ? "▼ ₹540 vs previous period" : "▲ 0.5× vs previous period"}</span>
                  </div>
                  <div className="text-xs text-neutral-500 mt-0.5">
                    {isAllCampaigns
                      ? "₹6,58,440 across 86 posts and files · see each objective below"
                      : "₹3.80 in net sales for every ₹1 of fees"}
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {isAllCampaigns ? (
                    <>
                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <div className="font-semibold text-neutral-900">Awareness</div>
                          <div className="text-[11px] text-neutral-500">CPM · per 1,000 reached</div>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-neutral-900">₹43</span>
                          <span className="text-neutral-500 ml-1.5">vs ₹49</span>
                          <span className="ml-2 font-semibold text-emerald-600">−12%</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <div className="font-semibold text-neutral-900">Engagement</div>
                          <div className="text-[11px] text-neutral-500">CPE · per engagement</div>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-neutral-900">₹0.37</span>
                          <span className="text-neutral-500 ml-1.5">vs ₹0.42</span>
                          <span className="ml-2 font-semibold text-emerald-600">−12%</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <div className="font-semibold text-neutral-900">Traffic (UGC)</div>
                          <div className="text-[11px] text-neutral-500">per usable video</div>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-neutral-900">₹3,750</span>
                          <span className="text-neutral-500 ml-1.5">vs ₹4,200</span>
                          <span className="ml-2 font-semibold text-emerald-600">−11%</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <div className="font-semibold text-neutral-900">Sales</div>
                          <div className="text-[11px] text-neutral-500">ROAS · return on spend</div>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-neutral-900">3.8×</span>
                          <span className="text-neutral-500 ml-1.5">vs 3.3×</span>
                          <span className="ml-2 font-semibold text-emerald-600">+15%</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <div className="font-semibold text-neutral-900">Cost per order</div>
                          <div className="text-[11px] text-neutral-500">CPA</div>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-neutral-900">₹109</span>
                          <span className="text-neutral-500 ml-1.5">vs ₹120 prev.</span>
                          <span className="ml-2 font-semibold text-emerald-600">−9%</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <div className="font-semibold text-neutral-900">Cost per link click</div>
                          <div className="text-[11px] text-neutral-500">CPC</div>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-neutral-900">₹9.65</span>
                          <span className="text-neutral-500 ml-1.5">vs ₹10.05 prev.</span>
                          <span className="ml-2 font-semibold text-emerald-600">−4%</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <div className="font-semibold text-neutral-900">Cost per 1,000 views</div>
                          <div className="text-[11px] text-neutral-500">CPM</div>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-neutral-900">₹329</span>
                          <span className="text-neutral-500 ml-1.5">vs ₹319 prev.</span>
                          <span className="ml-2 font-semibold text-emerald-600">−4%</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <div className="font-semibold text-neutral-900">Cost per engagement</div>
                          <div className="text-[11px] text-neutral-500">CPE</div>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-neutral-900">₹5.31</span>
                          <span className="text-neutral-500 ml-1.5">vs ₹5.42 prev.</span>
                          <span className="ml-2 font-semibold text-emerald-600">−2%</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-5 border-t border-neutral-100 pt-3 text-[11px] text-neutral-500">
                For costs, lower is better. Compared with the previous period of the same length.
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrandShell>
  );
}
