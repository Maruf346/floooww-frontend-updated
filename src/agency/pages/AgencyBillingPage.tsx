import { useState } from "react";
import { motion } from "motion/react";
import {
  Calendar,
  ChevronDown,
} from "lucide-react";
import { AgencyShell } from "@/agency/components/AgencyShell";
import { AgencyAddClientModal } from "@/agency/components/AgencyAddClientModal";

type BillingTab = "overview" | "clients" | "invoices" | "payment_methods" | "refunds" | "disputes";

type Transaction = {
  id: string;
  date: string;
  description: string;
  project: string;
  type: "Released" | "Held" | "Fee" | "Refunded";
  amount: string;
  isNegative?: boolean;
};

const TRANSACTIONS: Transaction[] = [
  {
    id: "tx-1",
    date: "28 Oct",
    description: "Meera Iyer · Story with link",
    project: "Vitamin-C Serum",
    type: "Released",
    amount: "₹7,500",
  },
  {
    id: "tx-2",
    date: "27 Oct",
    description: "Nisha Verma accepted · held",
    project: "Vitamin-C Serum",
    type: "Held",
    amount: "₹15,356",
  },
  {
    id: "tx-3",
    date: "26 Oct",
    description: "GST (18%)",
    project: "Monsoon Sunscreen",
    type: "Fee",
    amount: "₹2,950",
  },
  {
    id: "tx-4",
    date: "24 Oct",
    description: "Refund · Pooja Menon declined",
    project: "Vitamin-C Serum",
    type: "Refunded",
    amount: "−₹13,215",
    isNegative: true,
  },
];

const UPCOMING_14_DAYS = [
  {
    date: "30 Oct",
    label: "Release · Meera Iyer · Short",
    amount: "₹7,500",
  },
  {
    date: "1 Nov",
    label: "Hold · Glow Squad month 4",
    amount: "₹79,425",
  },
  {
    date: "2 Nov",
    label: "Release · 2 Monsoon Shorts",
    amount: "₹12,000",
  },
  {
    date: "4 Nov",
    label: "Hold · Skin Quiz Leads (3 creators)",
    amount: "₹63,540",
  },
];

const MONTHLY_SPEND = [
  {
    month: "May",
    amount: 38000,
    label: "₹38,000",
    height: 57,
    isHighlight: false,
    colSpan: "May",
  },
  {
    month: "Jun",
    amount: 52000,
    label: "₹52,000",
    height: 78,
    isHighlight: false,
    colSpan: "Jun",
  },
  {
    month: "Jul",
    amount: 61000,
    label: "₹61,000",
    height: 92,
    isHighlight: false,
    colSpan: "Jul",
  },
  {
    month: "Aug",
    amount: 74000,
    label: "₹74,000",
    height: 111,
    isHighlight: false,
    colSpan: "Aug",
  },
  {
    month: "Sep",
    amount: 96000,
    label: "₹96,000",
    height: 144,
    isHighlight: false,
    colSpan: "Sep",
  },
  {
    month: "Oct",
    amount: 113000,
    label: "₹1,13,000",
    height: 169,
    isHighlight: true,
    colSpan: "Oct (so far)",
    badge: "₹1.13 L",
  },
];

const easeCurve = [0.22, 1, 0.36, 1] as const;

export function AgencyBillingPage() {
  const [activeTab, setActiveTab] = useState<BillingTab>("overview");
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);
  const [hoveredBarIdx, setHoveredBarIdx] = useState<number | null>(null);

  const triggerDownload = (filename: string) => {
    setDownloadNotice(`Downloading ${filename}...`);
    setTimeout(() => setDownloadNotice(null), 2500);
  };

  return (
    <AgencyShell>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: easeCurve }}
        className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 pb-12"
      >
        {/* Toast Notification */}
        {downloadNotice && (
          <div className="fixed bottom-6 right-6 z-50 rounded-lg bg-[#0d0d10] px-4 py-2.5 text-[13px] font-medium text-white shadow-xl animate-in fade-in slide-in-from-bottom-2">
            {downloadNotice}
          </div>
        )}

        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-[26px] font-bold tracking-[-0.13px] text-[#0d0d10] leading-[34px]">
              Billing
            </h1>
            <p className="text-[13px] text-[#0d0d10] font-normal leading-[20px]">
              All clients · escrow, payouts and agency service fees · Oct 2026
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {/* DateRange */}
            <div className="flex h-10 items-center gap-2 rounded-lg border border-[#e3e5ec] bg-white px-3 text-[12px] font-medium text-[#0d0d10]">
              <Calendar className="size-4 text-[#71717a]" />
              <span>1 Oct – 28 Oct 2026</span>
              <span className="text-[#a3a3ac] font-normal">vs previous</span>
              <ChevronDown className="size-3.5 text-[#71717a]" />
            </div>

            {/* Download Statement */}
            <button
              type="button"
              onClick={() => triggerDownload("Statement_Oct_2026.pdf")}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#e3e5ec] bg-white px-4 text-[14px] font-medium text-[#0d0d10] transition hover:border-[#0d0d10] hover:bg-[#fafafa]"
            >
              <img
                src="/assets/agency/billing/download.svg"
                alt=""
                className="size-4 shrink-0"
              />
              <span>Download statement</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-6 border-b border-[#e3e5ec] overflow-x-auto no-scrollbar">
          {[
            { key: "overview", label: "Overview" },
            { key: "clients", label: "Clients" },
            { key: "invoices", label: "Invoices" },
            { key: "payment_methods", label: "Payment methods" },
            { key: "refunds", label: "Refunds" },
            { key: "disputes", label: "Disputes", count: 2 },
          ].map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key as BillingTab)}
                className={`relative flex items-center gap-1.5 pb-3 text-[14px] font-medium transition cursor-pointer ${
                  isActive
                    ? "text-[#0d0d10] border-b-2 border-[#0d0d10]"
                    : "text-[#71717a] hover:text-[#0d0d10]"
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="inline-flex items-center justify-center rounded-full bg-[#edeff3] px-2 py-0.5 text-[12px] font-medium text-[#71717a]">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Top KPI Metric Tiles Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: easeCurve }}
          className="rounded-[12px] border border-[#e3e5ec] bg-white p-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Committed */}
            <div className="flex flex-col rounded-[12px] border border-[#edeff3] bg-white p-4">
              <div className="grid size-9 place-items-center rounded-[8px] bg-[#070b13] shrink-0">
                <img
                  src="/assets/agency/billing/wallet.svg"
                  alt=""
                  className="size-[18px]"
                />
              </div>
              <div className="h-3.5" />
              <p className="text-[12px] font-normal leading-4 text-[#0d0d10]">
                Committed
              </p>
              <p className="text-[22px] font-semibold leading-7 tracking-[-0.33px] text-[#0d0d10]">
                ₹8,90,000
              </p>
              <div className="h-2.5" />
              <p className="text-[12px] font-medium leading-4 text-[#a3a3ac]">
                89% of ₹10,00,000 budget
              </p>
            </div>

            {/* In escrow */}
            <div className="flex flex-col rounded-[12px] border border-[#edeff3] bg-white p-4">
              <div className="grid size-9 place-items-center rounded-[8px] bg-[#f29b07] shrink-0">
                <img
                  src="/assets/agency/billing/shield.svg"
                  alt=""
                  className="size-[18px]"
                />
              </div>
              <div className="h-3.5" />
              <p className="text-[12px] font-normal leading-4 text-[#0d0d10]">
                In escrow
              </p>
              <p className="text-[22px] font-semibold leading-7 tracking-[-0.33px] text-[#0d0d10]">
                ₹1,71,200
              </p>
              <div className="h-2.5" />
              <p className="text-[12px] font-medium leading-4 text-[#a3a3ac]">
                14 creators
              </p>
            </div>

            {/* Released */}
            <div className="flex flex-col rounded-[12px] border border-[#edeff3] bg-white p-4">
              <div className="grid size-9 place-items-center rounded-[8px] bg-[#149d46] shrink-0">
                <img
                  src="/assets/agency/billing/released.svg"
                  alt=""
                  className="size-[18px]"
                />
              </div>
              <div className="h-3.5" />
              <p className="text-[12px] font-normal leading-4 text-[#0d0d10]">
                Released
              </p>
              <p className="text-[22px] font-semibold leading-7 tracking-[-0.33px] text-[#0d0d10]">
                ₹4,33,800
              </p>
              <div className="h-2.5" />
              <p className="text-[12px] font-medium leading-4 text-[#16a34a]">
                ↑ 42.7%
              </p>
            </div>

            {/* GST */}
            <div className="flex flex-col rounded-[12px] border border-[#edeff3] bg-white p-4">
              <div className="grid size-9 place-items-center rounded-[8px] bg-[#070b13] shrink-0">
                <img
                  src="/assets/agency/billing/gst.svg"
                  alt=""
                  className="size-[18px]"
                />
              </div>
              <div className="h-3.5" />
              <p className="text-[12px] font-normal leading-4 text-[#0d0d10]">
                GST
              </p>
              <p className="text-[22px] font-semibold leading-7 tracking-[-0.33px] text-[#0d0d10]">
                ₹35,695
              </p>
              <div className="h-2.5" />
              <p className="text-[12px] font-medium leading-4 text-[#a3a3ac]">
                ₹30,250 + ₹5,445
              </p>
            </div>

            {/* Frozen in disputes */}
            <div className="flex flex-col rounded-[12px] border border-[#edeff3] bg-white p-4">
              <div className="grid size-9 place-items-center rounded-[8px] bg-[#db231f] shrink-0">
                <img
                  src="/assets/agency/billing/disputes.svg"
                  alt=""
                  className="size-[18px]"
                />
              </div>
              <div className="h-3.5" />
              <p className="text-[12px] font-normal leading-4 text-[#0d0d10]">
                Frozen in disputes
              </p>
              <p className="text-[22px] font-semibold leading-7 tracking-[-0.33px] text-[#0d0d10]">
                ₹15,000
              </p>
              <div className="h-2.5" />
              <p className="text-[12px] font-medium leading-4 text-[#a3a3ac]">
                2 open
              </p>
            </div>
          </div>
        </motion.div>

        {/* Middle Section: Spend by Month Chart & Next 14 Days */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch">
          {/* Spend by month */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: easeCurve }}
            className="flex-1 rounded-[12px] border border-[#e3e5ec] bg-white p-5 flex flex-col gap-4"
          >
            <div className="flex flex-col gap-0.5">
              <h2 className="text-[16px] font-semibold leading-6 text-[#0d0d10]">
                Spend by month
              </h2>
              <p className="text-[12px] leading-4 text-[#0d0d10]">
                ₹4,33,800 released since May
              </p>
            </div>

            {/* Inner Chart Box: Full-width responsive with animated bars */}
            <div className="rounded-[12px] border border-[#e3e5ec] bg-white p-5 flex flex-col gap-4 w-full">
              <p className="text-[12px] text-[#0d0d10] font-normal leading-4">
                Released to creators each month
              </p>

              {/* Chart Plot Area */}
              <div className="flex flex-col gap-2 w-full">
                <div className="flex gap-3 items-start w-full">
                  {/* Y Axis Labels */}
                  <div className="flex flex-col justify-between h-[180px] w-12 text-[11px] leading-[14px] text-[#a3a3ac] shrink-0 select-none text-right pr-2">
                    <span>₹1.2 L</span>
                    <span>₹90K</span>
                    <span>₹60K</span>
                    <span>₹30K</span>
                    <span>0</span>
                  </div>

                  {/* Responsive Full-Width Chart Area with Animated Bars */}
                  <div className="relative h-[180px] flex-1 w-full min-w-0">
                    {/* Horizontal Dashed Grid Lines (Span full 100% width) */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none select-none">
                      <div className="w-full border-b border-dashed border-[#edeff3]" />
                      <div className="w-full border-b border-dashed border-[#edeff3]" />
                      <div className="w-full border-b border-dashed border-[#edeff3]" />
                      <div className="w-full border-b border-dashed border-[#edeff3]" />
                      <div className="w-full border-b border-[#edeff3]" />
                    </div>

                    {/* Bars Grid Container: 6 columns spanning entire 100% width */}
                    <div className="relative z-10 grid grid-cols-6 h-[180px] w-full items-end justify-items-center">
                      {MONTHLY_SPEND.map((bar, idx) => {
                        const isHovered = hoveredBarIdx === idx;
                        return (
                          <div
                            key={bar.month}
                            className="relative flex flex-col items-center justify-end h-full w-full group cursor-pointer"
                            onMouseEnter={() => setHoveredBarIdx(idx)}
                            onMouseLeave={() => setHoveredBarIdx(null)}
                          >
                            {/* Hover Tooltip */}
                            {isHovered && !bar.isHighlight && (
                              <div className="absolute -top-9 z-30 rounded-[4px] bg-[#0d0d10] px-2 py-1 text-[11px] font-medium text-white shadow-md whitespace-nowrap animate-in fade-in duration-100 pointer-events-none">
                                {bar.label}
                              </div>
                            )}

                            {/* Oct Highlight Badge */}
                            {bar.badge && (
                              <motion.div
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  duration: 0.35,
                                  delay: 5 * 0.08 + 0.45,
                                  ease: easeCurve,
                                }}
                                className="absolute -top-7 z-20 rounded-[4px] bg-[#2a44cc] px-2 py-0.5 text-[12px] font-medium leading-4 text-white shadow-sm whitespace-nowrap pointer-events-none select-none"
                              >
                                {bar.badge}
                              </motion.div>
                            )}

                            {/* Animated Bar */}
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: bar.height }}
                              transition={{
                                duration: 0.75,
                                delay: idx * 0.08,
                                ease: easeCurve,
                              }}
                              className={`w-7 sm:w-9 md:w-11 lg:w-12 rounded-t-[4px] transition-colors ${
                                bar.isHighlight
                                  ? isHovered
                                    ? "bg-[#2546db]"
                                    : "bg-[#3b5bff]"
                                  : isHovered
                                  ? "bg-[#27272a]"
                                  : "bg-[#070b13]"
                              }`}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* X Axis Labels: Aligned under the 6 columns */}
                <div className="pl-14 w-full">
                  <div className="grid grid-cols-6 text-center text-[11px] text-[#a3a3ac] w-full">
                    {MONTHLY_SPEND.map((bar) => (
                      <span
                        key={bar.month}
                        className={`truncate px-1 ${
                          bar.isHighlight
                            ? "font-medium text-[#0d0d10]"
                            : "font-normal"
                        }`}
                      >
                        {bar.colSpan}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Next 14 days */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: easeCurve }}
            className="w-full lg:w-[400px] rounded-[12px] border border-[#e3e5ec] bg-white p-5 flex flex-col gap-4"
          >
            <div className="flex flex-col gap-0.5">
              <h2 className="text-[16px] font-semibold leading-6 text-[#0d0d10]">
                Next 14 days
              </h2>
              <p className="text-[12px] leading-4 text-[#0d0d10]">
                Releases and holds
              </p>
            </div>

            <div className="flex flex-col divide-y divide-[#f4f6fb]">
              {UPCOMING_14_DAYS.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 py-3 first:pt-1 last:pb-1 text-[13px]"
                >
                  <span className="w-12 text-[12px] font-medium text-[#0d0d10] shrink-0">
                    {item.date}
                  </span>
                  <span className="flex-1 text-[#0d0d10] truncate">
                    {item.label}
                  </span>
                  <span className="font-medium text-[#0d0d10] shrink-0">
                    {item.amount}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: easeCurve }}
          className="rounded-[12px] border border-[#e3e5ec] bg-white p-5 flex flex-col gap-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-semibold leading-6 text-[#0d0d10]">
              Recent transactions
            </h2>
            <button
              type="button"
              className="text-[12px] font-medium text-[#3b5bff] hover:underline cursor-pointer"
            >
              View all
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[720px]">
              <thead>
                <tr className="bg-[#f4f6fb] text-[12px] font-semibold text-[#0d0d10]">
                  <th className="py-2.5 px-4 w-[90px]">Date</th>
                  <th className="py-2.5 px-4">Description</th>
                  <th className="py-2.5 px-4 w-[180px]">Project</th>
                  <th className="py-2.5 px-4 w-[120px]">Type</th>
                  <th className="py-2.5 px-4 text-right w-[120px]">Amount</th>
                  <th className="py-2.5 px-4 w-[80px] text-center">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edeff3] text-[13px]">
                {TRANSACTIONS.map((tx) => (
                  <tr key={tx.id} className="transition hover:bg-[#fafafa]">
                    {/* Date */}
                    <td className="py-3 px-4 font-medium text-[14px] text-[#0d0d10]">
                      {tx.date}
                    </td>

                    {/* Description */}
                    <td className="py-3 px-4 text-[#0d0d10]">
                      {tx.description}
                    </td>

                    {/* Project */}
                    <td className="py-3 px-4 text-[#0d0d10]">
                      {tx.project}
                    </td>

                    {/* Type badge */}
                    <td className="py-3 px-4">
                      {tx.type === "Released" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e1fce3] px-2 py-0.5 text-[12px] font-medium text-[#16a34a]">
                          <span className="size-1.5 rounded-full bg-[#16a34a]" />
                          Released
                        </span>
                      )}
                      {tx.type === "Held" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#feefce] px-2 py-0.5 text-[12px] font-medium text-[#f59e0b]">
                          <span className="size-1.5 rounded-full bg-[#f59e0b]" />
                          Held
                        </span>
                      )}
                      {tx.type === "Fee" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f4f6fb] px-2 py-0.5 text-[12px] font-medium text-[#4a4a55]">
                          <span className="size-1.5 rounded-full bg-[#8491a3]" />
                          Fee
                        </span>
                      )}
                      {tx.type === "Refunded" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f1f4ff] px-2 py-0.5 text-[12px] font-medium text-[#3b5bff]">
                          <span className="size-1.5 rounded-full bg-[#3b5bff]" />
                          Refunded
                        </span>
                      )}
                    </td>

                    {/* Amount */}
                    <td className="py-3 px-4 text-right font-medium text-[#0d0d10]">
                      {tx.amount}
                    </td>

                    {/* Invoice Download */}
                    <td className="py-3 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => triggerDownload(`Invoice_${tx.id}.pdf`)}
                        className="inline-flex items-center justify-center p-1 rounded hover:bg-[#edeff3] text-[#71717a] hover:text-[#0d0d10] transition"
                        title="Download invoice"
                      >
                        <img
                          src="/assets/agency/billing/invoice_download.svg"
                          alt=""
                          className="size-4"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
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
