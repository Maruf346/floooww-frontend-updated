import { useMemo, useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronRight, FileBarChart, Info, Plus, Search } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { AgencyShell } from "@/agency/components/AgencyShell";
import { AgencyAddClientModal } from "@/agency/components/AgencyAddClientModal";
import { Button } from "@/common/components/ui/Button";
import { ROUTES } from "@/common/constants/routes";

const SORT_OPTIONS = ["Last modified (newest)", "Last modified (oldest)", "Name (A-Z)"];

type SavedReport = {
  id: string;
  name: string;
  status: "Draft" | "Saved";
  detail: string;
  author: string;
  date: string;
  relativeDate: string;
  scope: string;
};

const SAVED_REPORTS_DATA: SavedReport[] = [
  {
    id: "untitled",
    name: "Untitled report",
    status: "Draft",
    detail: "Being customised now",
    author: "Ananya Mehta",
    date: "Today",
    relativeDate: "Just now",
    scope: "Multiple projects",
  },
  {
    id: "festive-sales",
    name: "Festive sales review",
    status: "Saved",
    detail: "7 results · 6 analyses",
    author: "Ananya Mehta",
    date: "Today",
    relativeDate: "2 hours ago",
    scope: "Minimalist · Vitamin-C Serum, Minimalist · Glow Squad",
  },
  {
    id: "monthly-summary",
    name: "Monthly brand summary",
    status: "Saved",
    detail: "12 results · 8 analyses",
    author: "Ananya Mehta",
    date: "28 Oct",
    relativeDate: "3 days ago",
    scope: "All 6 projects",
  },
  {
    id: "creator-review",
    name: "Creator review · October",
    status: "Saved",
    detail: "6 results · 4 analyses",
    author: "Rahul Shah",
    date: "27 Oct",
    relativeDate: "4 days ago",
    scope: "All 6 projects",
  },
];

const easeCurve = [0.22, 1, 0.36, 1] as const;

function ReportStatusBadge({ status }: { status: SavedReport["status"] }) {
  const isDraft = status === "Draft";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[12px] font-medium leading-4 ${
        isDraft
          ? "bg-[#fff7ed] text-[#ea580c]"
          : "bg-[#e8fbf0] text-[#059669]"
      }`}
    >
      <span
        className={`size-1.5 rounded-full ${
          isDraft ? "bg-[#ea580c]" : "bg-[#059669]"
        }`}
      />
      {status}
    </span>
  );
}

export function AgencyCustomReportsPage() {
  const navigate = useNavigate();
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState(SORT_OPTIONS[0]);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const [reports] = useState<SavedReport[]>(SAVED_REPORTS_DATA);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const visibleReports = useMemo(() => {
    const matching = reports.filter((report) =>
      [report.name, report.author, report.scope].some((value) =>
        value.toLowerCase().includes(query.trim().toLowerCase())
      )
    );
    if (sort === "Last modified (oldest)") return [...matching].reverse();
    if (sort === "Name (A-Z)") return [...matching].sort((a, b) => a.name.localeCompare(b.name));
    return matching;
  }, [query, reports, sort]);

  const handleOpenReport = (_reportId: string) => {
    // Reuses the exact brand custom report builder as requested
    navigate(ROUTES.brandCustomReportNew);
  };

  return (
    <AgencyShell onAddClient={() => setIsAddClientOpen(true)}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: easeCurve }}
        className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 pb-12"
      >
        {/* Page Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-[26px] font-bold tracking-[-0.13px] text-[#0d0d10] leading-[34px]">
            Custom reports
          </h1>
          <p className="text-[13px] text-[#71717a] font-normal leading-[20px]">
            Create, manage and reopen your custom influencer marketing reports.
          </p>
        </div>

        {/* Section 1: Start a new report */}
        <section className="flex flex-col gap-2.5">
          <h2 className="text-[16px] font-semibold text-[#0d0d10] leading-6">
            Start a new report
          </h2>
          <p className="flex items-center gap-1.5 text-[13px] text-[#71717a] leading-5">
            <Info size={14} className="text-[#8c94a0]" />
            <span>Your reports save automatically as you build them.</span>
          </p>

          <button
            type="button"
            onClick={() => navigate(ROUTES.brandCustomReportNew)}
            className="flex w-full items-center gap-4 rounded-[12px] border border-[#e3e5ec] bg-white p-5 text-left transition hover:border-[#0d0d10] hover:shadow-xs focus-visible:outline-none cursor-pointer"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#f4f6fb] text-[#0d0d10]">
              <Plus size={18} strokeWidth={2} />
            </span>
            <div className="min-w-0 flex-1">
              <span className="block text-[14px] font-medium leading-[22px] text-[#0d0d10]">
                Blank report
              </span>
              <span className="block text-[12px] leading-4 text-[#71717a]">
                Create a new custom report from scratch.
              </span>
            </div>
            <ChevronRight size={18} className="text-[#8c94a0] shrink-0" />
          </button>
        </section>

        {/* Section 2: Saved reports */}
        <section className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div className="flex flex-col gap-1">
              <h2 className="text-[16px] font-semibold text-[#0d0d10] leading-6">
                Saved reports
              </h2>
              <p className="text-[13px] text-[#71717a] leading-5">
                Reopen and manage your saved reports.
              </p>
            </div>

            {/* Search & Sort Filters */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative w-full sm:w-[240px]">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8c94a0]"
                />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search reports..."
                  className="h-10 w-full rounded-[8px] border border-[#e3e5ec] bg-white pl-9 pr-3 text-[13px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none placeholder:text-[#a3a3ac]"
                />
              </div>

              <div className="relative w-full sm:w-[220px]" ref={sortRef}>
                <button
                  type="button"
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex h-10 w-full items-center justify-between rounded-[8px] border border-[#e3e5ec] bg-white px-3 text-[13px] text-[#0d0d10] hover:border-[#0d0d10] transition-colors cursor-pointer"
                >
                  <span className="truncate">{sort}</span>
                  <ChevronDown
                    size={15}
                    className={`text-[#71717a] transition-transform duration-200 ${
                      isSortOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isSortOpen && (
                  <div className="absolute right-0 top-[calc(100%+6px)] z-30 w-full rounded-[10px] border border-[#e5e7eb] bg-white p-1.5 shadow-lg animate-in fade-in zoom-in-95 duration-100 flex flex-col gap-0.5">
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setSort(opt);
                          setIsSortOpen(false);
                        }}
                        className={`w-full rounded-[6px] px-3 py-2 text-left text-[13px] transition cursor-pointer ${
                          opt === sort
                            ? "bg-[#f1f4ff] font-medium text-[#0d0d10]"
                            : "text-[#0d0d10] hover:bg-[#f8f9fb]"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Table or Empty State */}
          {visibleReports.length === 0 ? (
            <div className="flex min-h-[188px] flex-col items-center justify-center rounded-[12px] border border-[#e3e5ec] bg-white px-6 py-12 text-center shadow-xs">
              <span className="grid size-12 place-items-center rounded-full bg-[#f4f6fb] text-[#8c94a0]">
                <FileBarChart size={22} strokeWidth={1.7} />
              </span>
              <h3 className="mt-3 text-[14px] font-semibold text-[#0d0d10]">
                No reports found
              </h3>
              <p className="mt-1 text-[13px] text-[#71717a]">
                Try adjusting your search query or sorting options.
              </p>
            </div>
          ) : (
            <div className="rounded-[12px] border border-[#e3e5ec] bg-white overflow-hidden shadow-xs">
              {/* Header */}
              <div className="hidden md:grid grid-cols-[1.8fr_1.1fr_1.1fr_1.8fr_auto] items-center gap-4 bg-[#f8f9fc] border-b border-[#e3e5ec] px-5 py-3 text-[12px] font-semibold text-[#525866]">
                <span>Report name</span>
                <span>Created by</span>
                <span>Last modified</span>
                <span>Scope / project</span>
                <span className="w-16 text-right">Actions</span>
              </div>

              {/* Rows */}
              <div className="divide-y divide-[#f0f2f5]">
                {visibleReports.map((report) => (
                  <div
                    key={report.id}
                    className="grid grid-cols-1 md:grid-cols-[1.8fr_1.1fr_1.1fr_1.8fr_auto] items-center gap-3 md:gap-4 px-5 py-3.5 hover:bg-[#fafbfd] transition-colors"
                  >
                    {/* Report Name & Status */}
                    <div className="flex flex-col min-w-0 pr-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[14px] font-medium text-[#0d0d10] leading-snug truncate">
                          {report.name}
                        </span>
                        <ReportStatusBadge status={report.status} />
                      </div>
                      <span className="text-[12px] text-[#8c94a0] leading-tight">
                        {report.detail}
                      </span>
                    </div>

                    {/* Created By */}
                    <div className="text-[13px] text-[#0d0d10]">
                      <span className="text-[12px] text-[#8c94a0] md:hidden mr-1">
                        Created by:
                      </span>
                      {report.author}
                    </div>

                    {/* Last Modified */}
                    <div className="flex flex-col text-[13px]">
                      <span className="text-[#0d0d10] font-normal leading-snug">
                        {report.date}
                      </span>
                      <span className="text-[11px] text-[#8c94a0] leading-none">
                        {report.relativeDate}
                      </span>
                    </div>

                    {/* Scope / Project */}
                    <div className="text-[13px] text-[#0d0d10] truncate pr-2">
                      <span className="text-[12px] text-[#8c94a0] md:hidden mr-1">
                        Scope:
                      </span>
                      {report.scope}
                    </div>

                    {/* Action */}
                    <div className="w-16 text-right">
                      <Button
                        kind="secondary"
                        size="s"
                        onClick={() => handleOpenReport(report.id)}
                        className="cursor-pointer"
                      >
                        Open
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Count */}
          <p className="text-[12px] text-[#8c94a0]">
            Showing {visibleReports.length} of {reports.length} reports
          </p>
        </section>
      </motion.div>

      {/* Add Client Modal */}
      <AgencyAddClientModal
        isOpen={isAddClientOpen}
        onClose={() => setIsAddClientOpen(false)}
        onSuccess={() => {}}
      />
    </AgencyShell>
  );
}
