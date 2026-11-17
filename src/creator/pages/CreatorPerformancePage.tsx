import { useState, useRef, useEffect, type ReactNode } from "react";
import { motion } from "motion/react";
import { Download, ChevronDown, Check, Calendar, ArrowUp, ArrowDown } from "lucide-react";
import { CreatorShell } from "@/creator/components/CreatorShell";

// Assets for project breakdown thumbnails
const imgMedia = "https://www.figma.com/api/mcp/asset/68cedca7-52b0-416c-95de-53535f43429b.png";
const imgMedia1 = "https://www.figma.com/api/mcp/asset/0033c0aa-89d5-4d44-819c-96d7ac983e8b.png";
const imgMedia2 = "https://www.figma.com/api/mcp/asset/bdce2aee-2a5e-48c9-9175-14fba945ec9e.png";
const imgMedia4 = "https://www.figma.com/api/mcp/asset/6b6bfc90-1140-44a4-8587-9c2325aadbc2.png";
const imgMedia6 = "https://www.figma.com/api/mcp/asset/d4aeeab2-b085-4de4-b2a9-432cb0d5d860.png";
const imgMedia7 = "https://www.figma.com/api/mcp/asset/2db90e42-6aed-4c08-8d4f-658e66696684.png";

const ease = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.65, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

// Filter Dropdown helper component
function FilterPill({
  label,
  value,
  options,
  onSelect,
  isOpen,
  onToggle,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onSelect: (val: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const isCustom = value !== options[0];
  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={onToggle}
        className={`h-9 px-3.5 bg-white flex items-center gap-2 rounded-lg text-[13px] transition select-none cursor-pointer ${
          isOpen
            ? "border-2 border-[#0d0d10] font-medium text-[#0d0d10]"
            : isCustom
            ? "border border-[#0d0d10] font-medium text-[#0d0d10] bg-[#f8f9fb]"
            : "border border-[#e3e5ec] text-[#0d0d10] hover:border-[#0d0d10]"
        }`}
      >
        <span className="truncate">{value}</span>
        <ChevronDown className="size-3 text-[#8491a3]" />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-[calc(100%+6px)] z-50 min-w-[180px] bg-white border border-[#e3e5ec] rounded-lg p-1.5 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)] flex flex-col gap-0.5 animate-in fade-in zoom-in-95 duration-100">
          {options.map((option) => {
            const isSelected = value === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => onSelect(option)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-[13px] text-left transition cursor-pointer ${
                  isSelected
                    ? "bg-[#f1f4ff] text-[#0d0d10] font-medium"
                    : "text-[#0d0d10] hover:bg-[#f8f9fb]"
                }`}
              >
                <span>{option}</span>
                {isSelected && <Check className="size-3.5 text-[#0d0d10] shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// 1. Scorecards matching Figma node 1683:10606
function PerformanceScorecards({ activeMetric, onSelectMetric }: { activeMetric: string; onSelectMetric: (m: string) => void }) {
  const cards = [
    { label: "Net sales", value: "₹3,36,800", delta: "▲ 15% vs prev.", positive: true },
    { label: "Orders", value: "890", delta: "▲ 12% vs prev.", positive: true },
    { label: "Link clicks", value: "9,570", delta: "▲ 12% vs prev. · CTR 0.7%", positive: true },
    { label: "Engagement rate", value: "6.2%", delta: "▲ 0.6 pt vs prev.", positive: true },
    { label: "Views", value: "14.5 L", delta: "▲ 19% vs prev.", positive: true },
    { label: "Earned media value", value: "₹1,80,000", delta: "Estimate · not in ROAS", positive: null },
  ] as const;

  return (
    <section className="grid overflow-hidden rounded-xl border border-[#e5e7eb] bg-white sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 shadow-xs">
      {cards.map((card, index) => {
        const isSelected = activeMetric === card.label;
        return (
          <button
            key={card.label}
            type="button"
            onClick={() => onSelectMetric(card.label)}
            className={`relative flex flex-col justify-start text-left h-[117px] px-[18px] pt-[18px] transition cursor-pointer select-none ${
              isSelected ? "bg-[#f1f4ff]" : "bg-white hover:bg-[#fafbfe]"
            } ${index < cards.length - 1 ? "border-r border-[#e5e7eb]" : ""}`}
          >
            <p className="text-[13px] font-normal leading-5 text-[#8491a3]">{card.label}</p>
            <p className={`font-semibold text-[#0d0d10] ${index === 5 ? "mt-0.5 text-[22px] leading-8" : "mt-1.5 text-[20px] leading-6"}`}>
              {card.value}
            </p>
            <p className={`text-[12px] leading-4 ${card.positive ? "mt-1.5 text-[#188a52]" : "mt-1.5 text-[#8491a3]"}`}>
              {card.delta}
            </p>
            {isSelected && (
              <motion.span
                layoutId="active-scorecard-indicator"
                className="absolute bottom-[18px] left-[18px] right-[18px] h-[3px] rounded-full bg-[#3b5bff]"
              />
            )}
          </button>
        );
      })}
    </section>
  );
}

// 2. Net Sales Over Time chart matching Figma node 1683:10633
function SalesTrendSection() {
  const values = [65, 110, 155, 138, 220, 260, 215, 180];
  const dates = ["14 Oct", "17 Oct", "20 Oct", "23 Oct", "26 Oct", "29 Oct", "1 Nov", "4 Nov"];
  const x = (index: number) => 44 + index * (988 / 7);
  const y = (val: number) => 210 - (val / 300) * 180;

  const path = values
    .map((val, idx) => `${idx === 0 ? "M" : "L"}${x(idx)} ${y(val)}`)
    .join(" ");

  return (
    <section className="min-h-[348px] rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[16px] font-semibold leading-5 text-[#0d0d10]">Net sales over time</h2>
          <p className="mt-1 text-[12px] leading-4 text-[#8491a3]">All projects · all platforms</p>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <svg
          viewBox="0 0 1080 250"
          className="block min-w-[700px] w-full"
          role="img"
          aria-label="Net sales over time chart"
        >
          {/* Y-axis grid ticks */}
          {[0, 75, 150, 225, 300].map((tick) => (
            <g key={tick}>
              <line x1="44" x2="1038" y1={y(tick)} y2={y(tick)} stroke="#f1f4f8" strokeDasharray="3 3" />
              <text x="36" y={y(tick) + 4} textAnchor="end" fill="#8491a3" fontSize="11" fontFamily="Inter">
                {tick === 0 ? "₹0" : `₹${tick}K`}
              </text>
            </g>
          ))}

          {/* Vertical subtle grid lines */}
          {values.map((_, index) => (
            <line key={index} x1={x(index)} x2={x(index)} y1="30" y2="210" stroke="#f8fafc" />
          ))}

          {/* Area Gradient fill */}
          <defs>
            <linearGradient id="creator-perf-sales-fill" x1="0" x2="0" y1="0" y2="1">
              <stop stopColor="#3b5bff" stopOpacity="0.22" />
              <stop offset="1" stopColor="#3b5bff" stopOpacity="0.01" />
            </linearGradient>
          </defs>

          <motion.path
            d={`${path} L1038 210 L44 210 Z`}
            fill="url(#creator-perf-sales-fill)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />

          {/* Smooth line */}
          <motion.path
            d={path}
            fill="none"
            stroke="#3b5bff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          {/* Data Points */}
          {values.map((val, index) => (
            <motion.circle
              key={index}
              cx={x(index)}
              cy={y(val)}
              r="4"
              fill="#ffffff"
              stroke="#3b5bff"
              strokeWidth="2"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.06 }}
            />
          ))}

          {/* X-axis labels */}
          {dates.map((date, index) => (
            <text
              key={date}
              x={x(index)}
              y="242"
              textAnchor={index === 0 ? "start" : index === dates.length - 1 ? "end" : "middle"}
              fill="#8491a3"
              fontSize="11"
              fontFamily="Inter"
            >
              {date}
            </text>
          ))}
        </svg>
      </div>
    </section>
  );
}

// 3. Conversion Funnel matching Figma node 1683:10658
function FunnelSection() {
  const steps = [
    { label: "Views 14.5 L", width: 420, color: "#3b5bff", note: "CTR 0.7%" },
    { label: "Link clicks 9,570", width: 340, color: "#4f6cf7", note: "Add-to-cart rate 35%" },
    { label: "Add to cart 3,350", width: 270, color: "#6a85f8", note: "Checkout rate 57%" },
    { label: "Checkouts initiated 1,910", width: 215, color: "#8da2fa", note: "Purchase rate 47%" },
    { label: "Orders 890", width: 170, color: "#149d46", note: "Conversion rate 9.3%" },
  ];

  return (
    <section className="min-h-[407px] rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-xs flex flex-col justify-between">
      <div>
        <h2 className="text-[16px] font-semibold leading-6 text-[#0d0d10]">Conversion funnel</h2>
        <p className="mt-1 text-[12px] leading-4 text-[#8491a3]">
          From views to orders · conversion rate at each step
        </p>
      </div>

      <div className="mt-4 space-y-2">
        {steps.map((step, index) => (
          <div
            key={step.label}
            className="grid grid-cols-[minmax(320px,1fr)_160px] items-center gap-4 max-[680px]:grid-cols-1"
          >
            <motion.svg
              className="mx-auto h-[52px] max-w-full origin-center"
              style={{ width: step.width }}
              viewBox={`0 0 ${step.width} 52`}
              role="img"
              aria-label={step.label}
              initial={{ opacity: 0, scaleX: 0.35 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: index * 0.1, ease }}
            >
              <path
                d={`M5 0 H${step.width - 5} Q${step.width} 0 ${step.width - 2} 5 L${step.width - 21} 47 Q${step.width - 20} 52 ${step.width - 25} 52 H25 Q20 52 19 47 L2 5 Q0 0 5 0 Z`}
                fill={step.color}
              />
              <text
                x={step.width / 2}
                y="30"
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontWeight="500"
                fontFamily="Inter"
              >
                {step.label}
              </text>
            </motion.svg>
            <motion.p
              className="text-[12px] leading-4 text-[#8491a3]"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
            >
              {step.note}
            </motion.p>
          </div>
        ))}
      </div>
    </section>
  );
}

// 4. Revenue Waterfall matching Figma node 1683:10679
function RevenueSection() {
  const bars = [
    { amount: "₹3,66,100", label: "Gross sales", color: "#dbe4ff", height: 120, tone: "text-[#0d0d10]" },
    { amount: "− ₹29,300", label: "Returns", color: "#dc2626", height: 12, tone: "text-[#dc2626]" },
    { amount: "₹3,36,800", label: "Net sales", color: "#3b5bff", height: 110, tone: "text-[#3b5bff]" },
  ];
  const rows = [
    { label: "Orders · coupon code", value: "560" },
    { label: "Orders · UTM link", value: "330" },
    { label: "Average order value (AOV)", value: "₹378" },
    { label: "Net sales ÷ your fees", value: "2.3×", isRoas: true },
  ];

  return (
    <section className="min-h-[407px] rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-xs flex flex-col justify-between">
      <div>
        <h2 className="text-[16px] font-semibold leading-6 text-[#0d0d10]">Revenue</h2>
        <p className="mt-1 text-[12px] leading-4 text-[#8491a3]">Gross to net sales · brands’ stores</p>
      </div>

      <div className="mt-4 flex h-[190px] items-end justify-around border-b border-[#e5e7eb] px-2 pb-2">
        {bars.map((bar, index) => (
          <div key={bar.label} className="flex h-full w-24 flex-col justify-end text-center">
            <motion.span
              className={`mb-2 text-[12px] font-semibold ${bar.tone}`}
              initial={{ opacity: 0, y: 7 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
            >
              {bar.amount}
            </motion.span>
            <motion.span
              className="origin-bottom rounded-t-[4px]"
              style={{ backgroundColor: bar.color }}
              initial={{ height: 0 }}
              whileInView={{ height: bar.height }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: index * 0.14, ease }}
            />
            <small className="mt-2 text-[11px] text-[#8491a3]">{bar.label}</small>
          </div>
        ))}
      </div>

      <dl className="mt-4 space-y-[8px]">
        {rows.map((row) => (
          <div key={row.label} className="flex justify-between gap-4 text-[12px] leading-[19px]">
            <dt className="text-[#8491a3]">{row.label}</dt>
            <dd className={`font-semibold ${row.isRoas ? "text-[#188a52]" : "text-[#0d0d10]"}`}>
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

// 5. Project Breakdown Table matching Figma node 1683:10708
function ProjectBreakdownTable() {
  const projects = [
    {
      name: "Glow Squad",
      type: "Minimalist · Long-term",
      thumb: imgMedia4,
      tracking: "Coupon · UTM link",
      status: "Live",
      fee: "₹54,000",
      views: "5.2 L",
      er: "6.4%",
      clicks: "4,120",
      orders: "374",
      sales: "₹1,42,800",
      roi: "2.6×",
    },
    {
      name: "Vitamin-C Serum",
      type: "Minimalist · One-time",
      thumb: imgMedia2,
      tracking: "Coupon · UTM link",
      status: "Live",
      fee: "₹17,000",
      views: "4.1 L",
      er: "6.8%",
      clicks: "2,040",
      orders: "318",
      sales: "₹1,21,400",
      roi: "7.1×",
    },
    {
      name: "Summer Glow Edit",
      type: "Minimalist · One-time",
      thumb: imgMedia,
      tracking: "Coupon · UTM link",
      status: "Completed",
      fee: "₹46,000",
      views: "2.4 L",
      er: "5.1%",
      clicks: "1,110",
      orders: "140",
      sales: "₹51,200",
      roi: "1.1×",
    },
    {
      name: "Lip Liner Collab",
      type: "Velvet Lip Co. · One-time",
      thumb: imgMedia6,
      tracking: "Coupon · UTM link",
      status: "Completed",
      fee: "₹25,080",
      views: "1.8 L",
      er: "5.8%",
      clicks: "1,460",
      orders: "58",
      sales: "₹21,400",
      roi: "0.8×",
    },
    {
      name: "Mist launch",
      type: "Dewdrop Naturals · Gift + fee",
      thumb: imgMedia7,
      tracking: "Coupon · UTM link",
      status: "Completed",
      fee: "₹6,000",
      views: "96K",
      er: "6.9%",
      clicks: "840",
      orders: "–",
      sales: "–",
      roi: null,
    },
    {
      name: "Matte Lip Launch",
      type: "Velvet Lip Co. · Offer",
      thumb: imgMedia1,
      tracking: "Coupon · UTM link",
      status: "Offer",
      fee: "₹15,000",
      views: "–",
      er: "–",
      clicks: "–",
      orders: "–",
      sales: "–",
      roi: null,
    },
  ];

  const headers = [
    "PROJECT",
    "BRAND · TYPE",
    "STATUS",
    "FEE",
    "VIEWS ↓",
    "ENG. RATE",
    "CLICKS",
    "ORDERS",
    "NET SALES",
  ];

  return (
    <section className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1116px] table-fixed">
          <colgroup>
            <col className="w-[244px]" />
            <col className="w-[180px]" />
            <col className="w-[120px]" />
            <col className="w-[90px]" />
            <col className="w-[90px]" />
            <col className="w-[90px]" />
            <col className="w-[80px]" />
            <col className="w-[80px]" />
            <col className="w-[100px]" />
          </colgroup>
          <thead className="h-[34px] border-b border-[#e5e7eb] bg-[#f8fafc] text-[10px] font-semibold tracking-[.06em] text-[#8491a3]">
            <tr>
              {headers.map((label, index) => (
                <th key={label} className={`px-5 ${index < 2 ? "text-left" : "text-right"}`}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.name} className="h-[80px] border-b border-[#f1f4f8] last:border-0 hover:bg-[#fafbfe] transition">
                {/* Project */}
                <td className="px-5">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.thumb}
                      alt=""
                      className="size-[42px] rounded-lg object-cover border border-[#e3e5ec]"
                    />
                    <div className="min-w-0">
                      <p className="text-[13px] font-medium leading-5 text-[#0d0d10] truncate">
                        {p.name}
                      </p>
                      <p className="text-[11px] leading-4 text-[#8491a3] truncate">
                        {p.type}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Tracking / Brand Type */}
                <td className="px-5 text-[12px] leading-5">
                  <p className="font-medium text-[#0d0d10]">Coupon</p>
                  <p className="text-[#8491a3]">UTM link</p>
                </td>

                {/* Status Badge */}
                <td className="px-5 text-right">
                  <span
                    className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                      p.status === "Live"
                        ? "bg-[#ecfdf3] text-[#149d46]"
                        : p.status === "Completed"
                        ? "bg-[#f1f4ff] text-[#3b5bff]"
                        : "bg-[#f4f6fb] text-[#8491a3]"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>

                {/* Fee */}
                <td className="px-5 text-right text-[12px] font-medium leading-5 text-[#0d0d10]">
                  {p.fee}
                </td>

                {/* Views */}
                <td className="px-5 text-right text-[12px] font-medium leading-5 text-[#0d0d10]">
                  {p.views}
                </td>

                {/* ER */}
                <td className="px-5 text-right text-[12px] font-medium leading-5 text-[#0d0d10]">
                  {p.er}
                </td>

                {/* Clicks */}
                <td className="px-5 text-right text-[12px] font-medium leading-5 text-[#0d0d10]">
                  {p.clicks}
                </td>

                {/* Orders */}
                <td className="px-5 text-right text-[12px] font-medium leading-5 text-[#0d0d10]">
                  {p.orders}
                </td>

                {/* Net Sales */}
                <td className="px-5 text-right text-[12px] leading-5">
                  <p className="font-medium text-[#0d0d10]">{p.sales}</p>
                  {p.roi && (
                    <p className="text-[11px] font-medium text-[#188a52]">ROAS {p.roi}</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// 6. Views Donut, Engagement Breakdown, Non-Follower Reach matching Figma 1683:10854
function EngagementAndViewsSection() {
  const engagementParts = [
    { label: "Likes", value: "27,000 · 30%", color: "#3b5bff", width: "30%" },
    { label: "Comments", value: "7,200 · 8%", color: "#9caef8", width: "8%" },
    { label: "Saves", value: "34,200 · 38%", color: "#49ba8b", width: "38%" },
    { label: "Shares", value: "21,500 · 24%", color: "#eea24a", width: "24%" },
  ];

  const projectsReach = [
    { name: "Glow Squad", pct: 63 },
    { name: "Vitamin-C Serum", pct: 61 },
    { name: "Summer Glow Edit", pct: 55 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* 1. Views Donut */}
      <section className="h-[250px] rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-xs flex flex-col justify-between">
        <div>
          <h2 className="text-[16px] font-semibold leading-6 text-[#0d0d10]">Views</h2>
          <p className="mt-0.5 text-[12px] leading-4 text-[#8491a3]">
            Followers vs non-followers (new audience reach)
          </p>
        </div>

        <div className="flex items-center gap-4">
          <motion.div
            className="relative grid size-[140px] shrink-0 place-items-center rounded-full"
            style={{ background: "conic-gradient(#3b5bff 0 40%, #dbe4ff 40% 100%)" }}
            initial={{ opacity: 0, scale: 0.65, rotate: -45 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
          >
            <div className="grid size-[96px] place-items-center rounded-full bg-white text-center">
              <b className="text-[20px] leading-6 text-[#0d0d10]">14.5 L</b>
              <span className="text-[12px] leading-4 text-[#8491a3]">views</span>
            </div>
          </motion.div>
          <div className="min-w-0 space-y-2.5 text-[13px] leading-[19px] flex-1">
            <div className="flex items-center gap-2">
              <i className="size-2.5 rounded-full bg-[#3b5bff] shrink-0" />
              <span className="text-[#8491a3]">Followers</span>
              <b className="ml-auto whitespace-nowrap font-medium text-[#0d0d10]">5.8 L · 40%</b>
            </div>
            <div className="flex items-center gap-2">
              <i className="size-2.5 rounded-full bg-[#dbe4ff] shrink-0" />
              <span className="text-[#8491a3]">Non-followers</span>
              <b className="ml-auto whitespace-nowrap font-medium text-[#0d0d10]">8.7 L · 60%</b>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Engagement Breakdown */}
      <section className="h-[250px] rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-xs flex flex-col justify-between">
        <div>
          <h2 className="text-[16px] font-semibold leading-6 text-[#0d0d10]">Engagement breakdown</h2>
          <p className="mt-0.5 truncate text-[12px] leading-4 text-[#8491a3]">
            What the 6.2% engagement rate is made of · 89,900
          </p>
        </div>

        <div>
          <div className="flex h-3.5 overflow-hidden rounded-full">
            {engagementParts.map((part, index) => (
              <motion.span
                key={part.label}
                className="h-full"
                style={{ backgroundColor: part.color }}
                initial={{ width: 0 }}
                whileInView={{ width: part.width }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: index * 0.1, ease }}
              />
            ))}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[12px] leading-[17px]">
            {engagementParts.map((part) => (
              <div className="flex items-center gap-1.5" key={part.label}>
                <i className="size-2 shrink-0 rounded-full" style={{ backgroundColor: part.color }} />
                <span className="text-[#8491a3]">{part.label}</span>
                <b className="ml-auto whitespace-nowrap font-medium text-[#0d0d10]">{part.value}</b>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-1.5 border-t border-[#f1f4f8] pt-2 text-[12px] leading-4">
          <div className="flex justify-between">
            <span className="text-[#8491a3]">Total interactions</span>
            <b className="font-medium text-[#0d0d10]">89,900</b>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8491a3]">Save and share rate</span>
            <b className="font-medium text-[#0d0d10]">4.2%</b>
          </div>
        </div>
      </section>

      {/* 3. By project reach */}
      <section className="h-[250px] rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-xs flex flex-col justify-between">
        <div>
          <h2 className="text-[16px] font-semibold leading-6 text-[#0d0d10]">By project</h2>
          <p className="mt-0.5 text-[12px] leading-4 text-[#8491a3]">
            Share of views from people who don’t follow you
          </p>
        </div>

        <div className="space-y-2.5 text-[13px] leading-[19px]">
          {projectsReach.map((item, index) => (
            <div className="grid grid-cols-[1fr_110px_28px] items-center gap-3" key={item.name}>
              <span className="text-[#4a4a55] truncate text-[12px]">{item.name}</span>
              <span className="h-2 overflow-hidden rounded-full bg-[#edf0f7]">
                <motion.span
                  className="block h-full rounded-full bg-[#3b5bff]"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.12, ease }}
                />
              </span>
              <b className="text-right font-medium text-[#0d0d10] text-[12px]">{item.pct}%</b>
            </div>
          ))}
        </div>

        <p className="text-[11px] leading-[15px] text-[#8491a3]">
          3.3 L, 2.5 L and 1.3 L views from new people. Older campaigns reach fewer new viewers.
        </p>
      </section>
    </div>
  );
}

// 7. Countries Map matching Figma 1683:10932
function CountriesSection() {
  const countries = [
    { name: "India", share: "78%" },
    { name: "UAE", share: "6%" },
    { name: "United States", share: "5%" },
    { name: "United Kingdom", share: "4%" },
    { name: "Singapore", share: "3%" },
    { name: "Other", share: "4%" },
  ];

  const land = [
    "M47 58l17-20 47-10 35 10 10 20-18 15-17 1-10 19-24 5-19-16-25-4-6-19z",
    "M138 125l22 8 20 34-12 61-16 21-13-37 4-35-15-23z",
    "M249 48l47-19 56 5 34 21-5 24-27 7-17 19-44-3-9-22-35-9z",
    "M293 101l39 7 31 31-11 61-26 34-27-23-13-51z",
    "M374 52l43-8 54 19 34 34-13 26-28-8-27 15-31-6-26-31z",
    "M434 151l24 10 20 36-17 47-25-26-4-34z",
    "M484 196l29-10 31 12 5 27-33 17-28-19z",
  ];

  return (
    <section className="min-h-[375px] rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-xs">
      <div>
        <h2 className="text-[16px] font-semibold leading-6 text-[#0d0d10]">Countries</h2>
        <p className="mt-0.5 text-[12px] leading-4 text-[#8491a3]">
          Where your followers live · Instagram insights
        </p>
      </div>

      <div className="mt-4 grid min-h-[275px] lg:grid-cols-[minmax(0,645px)_minmax(0,1fr)] gap-6 items-center">
        {/* World Map SVG */}
        <div className="relative overflow-hidden border-b border-[#f1f4f8] pb-6 lg:border-b-0 lg:border-r lg:pr-6">
          <svg
            viewBox="0 0 560 275"
            className="mx-auto h-full max-w-full"
            role="img"
            aria-label="Dotted world map"
          >
            <defs>
              <pattern id="perf-audience-dots" width="8" height="8" patternUnits="userSpaceOnUse">
                <circle cx="4" cy="4" r="2" fill="#d6def1" />
              </pattern>
              <clipPath id="perf-audience-land">
                {land.map((path, i) => (
                  <path key={i} d={path} />
                ))}
              </clipPath>
            </defs>
            <rect
              width="560"
              height="275"
              fill="url(#perf-audience-dots)"
              clipPath="url(#perf-audience-land)"
            />
            {/* Global Highlighted nodes */}
            <g fill="#7186f2">
              {[
                [106, 68], [114, 68], [122, 68], [130, 60], [138, 60],
                [146, 52], [306, 59], [314, 59], [322, 59], [498, 206],
              ].map(([cx, cy]) => (
                <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" />
              ))}
            </g>
            {/* India intense node cluster */}
            <g fill="#3b5bff">
              {[
                [341, 97], [349, 97], [357, 97], [333, 105], [341, 105],
                [349, 105], [357, 105], [365, 105], [341, 113], [349, 113],
                [357, 113], [349, 121],
              ].map(([cx, cy]) => (
                <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" />
              ))}
            </g>
          </svg>

          {/* Map Location Pills */}
          <span className="absolute left-[42%] top-[18px] rounded-md border border-[#e5e7eb] bg-white px-2 py-1 text-[11px] text-[#8491a3] shadow-xs">
            United Kingdom <b className="ml-1 font-medium text-[#0d0d10]">4%</b>
          </span>
          <span className="absolute left-[20%] top-[106px] rounded-md border border-[#e5e7eb] bg-white px-2 py-1 text-[11px] text-[#8491a3] shadow-xs">
            United States <b className="ml-1 font-medium text-[#0d0d10]">5%</b>
          </span>
          <span className="absolute left-[57%] top-[130px] rounded-md border border-[#e5e7eb] bg-white px-2 py-1 text-[11px] text-[#8491a3] shadow-xs">
            UAE <b className="ml-1 font-medium text-[#0d0d10]">6%</b>
          </span>
          <span className="absolute left-[74%] top-[121px] rounded-md border border-[#e5e7eb] bg-white px-2 py-1 text-[11px] text-[#8491a3] shadow-xs">
            India <b className="ml-1 font-medium text-[#0d0d10]">78%</b>
          </span>
          <span className="absolute right-[17%] top-[164px] rounded-md border border-[#e5e7eb] bg-white px-2 py-1 text-[11px] text-[#8491a3] shadow-xs">
            Singapore <b className="ml-1 font-medium text-[#0d0d10]">3%</b>
          </span>
        </div>

        {/* Top Countries Bar Breakdown */}
        <div className="pt-2 lg:pl-4">
          <h3 className="text-[16px] font-semibold leading-6 text-[#0d0d10]">Top countries</h3>
          <p className="mt-0.5 text-[12px] leading-4 text-[#8491a3]">
            Share of your followers · Instagram insights
          </p>
          <div className="mt-5 space-y-3.5">
            {countries.map((item, index) => (
              <div
                key={item.name}
                className="grid grid-cols-[122px_minmax(80px,1fr)_30px] items-center gap-3 text-[13px] leading-[19px]"
              >
                <span className="text-[#4a4a55]">{item.name}</span>
                <span className="h-2 overflow-hidden rounded-full bg-[#edf0f7]">
                  <motion.span
                    className="block h-full rounded-full bg-[#3b5bff]"
                    initial={{ width: 0 }}
                    whileInView={{ width: item.share }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.75, delay: index * 0.07, ease }}
                  />
                </span>
                <b className="text-right font-medium text-[#0d0d10]">{item.share}</b>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// 8. Cities & Age matching Figma 1683:11797
function CitiesAndAgeSection() {
  const cities = [
    { city: "Bengaluru", share: "21%" },
    { city: "Mumbai", share: "17%" },
    { city: "Delhi NCR", share: "21%" },
    { city: "Chennai", share: "8%" },
    { city: "Hyderabad", share: "7%" },
    { city: "Pune", share: "6%" },
    { city: "Other cities", share: "29%" },
  ];

  const ageGroups = [
    { age: "13–17", women: "3%", men: "0%", wHeight: 10, mHeight: 2 },
    { age: "18–24", women: "30%", men: "4%", wHeight: 95, mHeight: 13 },
    { age: "25–34", women: "41%", men: "5%", wHeight: 130, mHeight: 16 },
    { age: "35–44", women: "9%", men: "3%", wHeight: 29, mHeight: 10 },
    { age: "45+", women: "3%", men: "2%", wHeight: 10, mHeight: 6 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Cities Card */}
      <section className="h-[320px] rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-xs flex flex-col justify-between">
        <div>
          <h2 className="text-[16px] font-semibold leading-6 text-[#0d0d10]">Cities</h2>
          <p className="mt-0.5 text-[12px] leading-4 text-[#8491a3]">
            Top cities of your followers · Instagram insights
          </p>
        </div>

        <div className="space-y-2.5 text-[13px] leading-[19px]">
          {cities.map((item, index) => (
            <div className="grid grid-cols-[110px_1fr_36px] items-center gap-3" key={item.city}>
              <span className="text-[#4a4a55] truncate text-[12px]">{item.city}</span>
              <span className="h-2 overflow-hidden rounded-full bg-[#edf0f7]">
                <motion.span
                  className="block h-full rounded-full bg-[#3b5bff]"
                  initial={{ width: 0 }}
                  whileInView={{ width: item.share }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.75, delay: index * 0.06, ease }}
                />
              </span>
              <b className="font-medium text-[#0d0d10] text-[12px] text-right">{item.share}</b>
            </div>
          ))}
        </div>
      </section>

      {/* Age & Gender Card */}
      <section className="h-[320px] rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-xs flex flex-col justify-between">
        <div>
          <h2 className="text-[16px] font-semibold leading-5 text-[#0d0d10]">Age and gender</h2>
          <p className="mt-0.5 text-[12px] leading-4 text-[#8491a3]">
            Share of your followers · Instagram insights
          </p>
        </div>

        <div className="relative mt-2 h-[170px] border-b border-[#e5e7eb]">
          <div className="absolute inset-x-2 bottom-0 flex h-[150px] justify-between">
            {ageGroups.map((group, index) => (
              <div className="flex w-[56px] flex-col justify-end text-center" key={group.age}>
                <div className="flex h-[130px] items-end justify-center gap-1">
                  {/* Women bar */}
                  <div className="relative flex w-6 flex-col justify-end">
                    <span className="absolute -top-4 w-full text-center text-[10px] leading-[13px] text-[#8491a3]">
                      {group.women}
                    </span>
                    <motion.span
                      className="w-6 rounded-t-[3px] bg-[#3b5bff]"
                      initial={{ height: 0 }}
                      whileInView={{ height: group.wHeight }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.1, ease }}
                    />
                  </div>
                  {/* Men bar */}
                  <div className="relative flex w-6 flex-col justify-end">
                    <span className="absolute -top-4 w-full text-center text-[10px] leading-[13px] text-[#8491a3]">
                      {group.men}
                    </span>
                    <motion.span
                      className="w-6 rounded-t-[3px] bg-[#afbef8]"
                      initial={{ height: 0 }}
                      whileInView={{ height: group.mHeight }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.08 + index * 0.1, ease }}
                    />
                  </div>
                </div>
                <span className="mt-2 text-[11px] leading-[13px] text-[#8491a3]">{group.age}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 text-[12px] leading-[15px]">
          <span className="flex items-center gap-1.5 text-[#8491a3]">
            <i className="size-2 rounded-full bg-[#3b5bff]" />
            Women <b className="font-medium text-[#0d0d10]">86%</b>
          </span>
          <span className="flex items-center gap-1.5 text-[#8491a3]">
            <i className="size-2 rounded-full bg-[#afbef8]" />
            Men <b className="font-medium text-[#0d0d10]">14%</b>
          </span>
        </div>
      </section>
    </div>
  );
}

// 9. Delivery & Budget + Value Delivered matching Figma 1683:11879
function DeliveryAndBudgetSection() {
  const feeItems = [
    {
      title: "Paid to you",
      detail: "released after Minimalist approved content",
      amount: "₹1,05,000",
      pct: "71%",
      color: "#3b5bff",
    },
    {
      title: "Held in escrow",
      detail: "Vitamin-C Serum ₹4,250 · Glow Squad cycle 2 ₹27,000",
      amount: "₹31,250",
      pct: "21%",
      color: "#9eaff7",
    },
    {
      title: "Not funded yet",
      detail: "Summer Glow Edit · closed",
      amount: "₹11,830",
      pct: "8%",
      color: "#e6ebf4",
    },
  ];

  const compareMetrics = [
    { label: "Cost per order", sub: "CPA", yourVal: "₹166", avgVal: "₹180", diff: "−8%", yourWidth: 93 },
    { label: "Cost per link click", sub: "CPC", yourVal: "₹15.50", avgVal: "₹16.90", diff: "−8%", yourWidth: 104 },
    { label: "Cost per 1,000 views", sub: "CPM", yourVal: "₹102", avgVal: "₹110", diff: "−8%", yourWidth: 104 },
    { label: "Cost per engagement", sub: "CPE", yourVal: "₹1.65", avgVal: "₹1.02", diff: "−40%", yourWidth: 102 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Your Fee Card */}
      <section className="min-h-[434px] rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-xs flex flex-col justify-between">
        <div>
          <h2 className="text-[18px] font-semibold leading-6 text-[#0d0d10]">Your fee</h2>
          <p className="mt-0.5 text-[12px] leading-4 text-[#8491a3]">
            All projects · your fees to date
          </p>
        </div>

        {/* Donut Chart */}
        <motion.div
          className="relative mx-auto my-3 grid size-[132px] place-items-center rounded-full"
          style={{ background: "conic-gradient(#3b5bff 0 71%, #9eaff7 71% 92%, #e6ebf4 92% 100%)" }}
          initial={{ opacity: 0, scale: 0.65, rotate: -45 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
        >
          <div className="grid size-[92px] place-items-center rounded-full bg-white text-center">
            <b className="whitespace-nowrap text-[18px] leading-6 tracking-[-.03em] text-[#0d0d10]">
              ₹1,48,080
            </b>
            <span className="text-[12px] leading-4 text-[#8491a3]">fee</span>
          </div>
        </motion.div>

        {/* Items Breakdown */}
        <div className="space-y-3.5">
          {feeItems.map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <span
                className="mt-1 size-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium leading-5 text-[#0d0d10]">{item.title}</p>
                <p className="text-[11px] leading-4 text-[#8491a3]">{item.detail}</p>
              </div>
              <div className="text-right">
                <p className="text-[13px] font-semibold leading-5 text-[#0d0d10]">{item.amount}</p>
                <p className="text-[11px] text-[#8491a3]">{item.pct}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Total Footer */}
        <div className="border-t border-[#e5e7eb] pt-3 flex items-center justify-between text-[13px]">
          <span className="font-normal text-[#8491a3]">Total fees</span>
          <span className="font-semibold text-[#0d0d10]">₹1,48,080</span>
        </div>
      </section>

      {/* Value Delivered Card */}
      <section className="min-h-[434px] rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-xs flex flex-col justify-between">
        <div>
          <h2 className="text-[16px] font-semibold leading-5 text-[#0d0d10]">Value you delivered</h2>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-[34px] font-bold text-[#0d0d10] tracking-tight leading-none">
              2.3×
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#ecfdf3] px-2.5 py-0.5 text-[11px] font-medium text-[#188a52]">
              Best project · Vitamin-C Serum 7.1×
            </span>
          </div>
          <p className="mt-1 text-[12px] leading-4 text-[#8491a3]">
            ₹2.30 in brand net sales for every ₹1 of your fees
          </p>
        </div>

        <div className="border-t border-[#e5e7eb] pt-4">
          <p className="text-[12px] font-semibold tracking-wide text-[#8491a3] uppercase">
            Brands’ cost per result
          </p>
          <div className="mt-3 space-y-3">
            {compareMetrics.map((m) => (
              <div key={m.label} className="grid grid-cols-[140px_1fr_110px_48px] items-center gap-3 text-[12px]">
                <div>
                  <p className="font-medium text-[#0d0d10]">{m.label}</p>
                  <p className="text-[10px] text-[#8491a3]">{m.sub}</p>
                </div>
                {/* Comparison double bar */}
                <div className="space-y-1">
                  <div className="h-1.5 w-full bg-[#f1f4f8] rounded-full overflow-hidden">
                    <div className="h-full bg-[#3b5bff] rounded-full" style={{ width: `${(m.yourWidth / 170) * 100}%` }} />
                  </div>
                  <div className="h-1.5 w-full bg-[#f1f4f8] rounded-full overflow-hidden">
                    <div className="h-full bg-[#8491a3] rounded-full" style={{ width: "100%" }} />
                  </div>
                </div>
                <div>
                  <span className="font-semibold text-[#0d0d10]">{m.yourVal}</span>
                  <span className="text-[#8491a3] ml-1 text-[11px]">vs {m.avgVal}</span>
                </div>
                <div className="text-right">
                  <span className="inline-block rounded-md bg-[#ecfdf3] px-1.5 py-0.5 text-[10px] font-semibold text-[#188a52]">
                    {m.diff}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[11px] text-[#8491a3] pt-2">
          For costs, lower is better. Project average covers the 6 live creators in Vitamin-C Serum.
        </p>
      </section>
    </div>
  );
}

export default function CreatorPerformancePage() {
  const [selectedDateRange, setSelectedDateRange] = useState("1 Oct – 28 Oct 2026");
  const [selectedProject, setSelectedProject] = useState("All projects");
  const [selectedBrand, setSelectedBrand] = useState("All brands");
  const [selectedPlatform, setSelectedPlatform] = useState("All platforms");
  const [selectedFormat, setSelectedFormat] = useState("All formats");

  const [activeScorecard, setActiveScorecard] = useState("Net sales");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dateRangeOptions = [
    "1 Oct – 28 Oct 2026",
    "Last 7 days",
    "Last 30 days",
    "Last 90 days",
    "All time",
  ] as const;

  const projectOptions = [
    "All projects",
    "Glow Squad",
    "Vitamin-C Serum",
    "Summer Glow Edit",
    "Lip Liner Collab",
    "Mist launch",
    "Matte Lip Launch",
  ] as const;

  const brandOptions = [
    "All brands",
    "Minimalist",
    "Velvet Lip Co.",
    "Dewdrop Naturals",
  ] as const;

  const platformOptions = [
    "All platforms",
    "Instagram",
    "YouTube",
    "TikTok",
  ] as const;

  const formatOptions = [
    "All formats",
    "Reels",
    "Stories",
    "Shorts",
    "Videos",
    "UGC files",
  ] as const;

  const handleDownloadReport = () => {
    alert("Generating & downloading Creator Performance Report (PDF)...");
  };

  return (
    <CreatorShell>
      <div className="min-h-screen bg-white text-[#0d0d10]" ref={containerRef}>
        <div className="w-full px-[20px] sm:px-[32px] pt-[28px] pb-[48px] flex flex-col gap-[24px]">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-[26px] font-bold text-[#0d0d10] tracking-tight leading-8">
                Performance
              </h1>
              <p className="mt-1 text-[13px] text-[#8491a3] leading-5">
                Your results across every brand · 1 Oct – 28 Oct 2026
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleDownloadReport}
                className="inline-flex items-center gap-2 h-10 px-4 bg-white border border-[#e3e5ec] rounded-lg text-[13px] font-medium text-[#0d0d10] hover:bg-[#f8f9fb] transition cursor-pointer shadow-xs"
              >
                <Download className="size-4 text-[#4a4a55]" />
                <span>Download report</span>
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-2.5 z-30 relative">
            <FilterPill
              label="Date range"
              value={selectedDateRange}
              options={dateRangeOptions}
              onSelect={(val) => {
                setSelectedDateRange(val);
                setOpenDropdown(null);
              }}
              isOpen={openDropdown === "date"}
              onToggle={() => setOpenDropdown(openDropdown === "date" ? null : "date")}
            />

            <FilterPill
              label="Project"
              value={selectedProject}
              options={projectOptions}
              onSelect={(val) => {
                setSelectedProject(val);
                setOpenDropdown(null);
              }}
              isOpen={openDropdown === "project"}
              onToggle={() => setOpenDropdown(openDropdown === "project" ? null : "project")}
            />

            <FilterPill
              label="Brand"
              value={selectedBrand}
              options={brandOptions}
              onSelect={(val) => {
                setSelectedBrand(val);
                setOpenDropdown(null);
              }}
              isOpen={openDropdown === "brand"}
              onToggle={() => setOpenDropdown(openDropdown === "brand" ? null : "brand")}
            />

            <FilterPill
              label="Platform"
              value={selectedPlatform}
              options={platformOptions}
              onSelect={(val) => {
                setSelectedPlatform(val);
                setOpenDropdown(null);
              }}
              isOpen={openDropdown === "platform"}
              onToggle={() => setOpenDropdown(openDropdown === "platform" ? null : "platform")}
            />

            <FilterPill
              label="Format"
              value={selectedFormat}
              options={formatOptions}
              onSelect={(val) => {
                setSelectedFormat(val);
                setOpenDropdown(null);
              }}
              isOpen={openDropdown === "format"}
              onToggle={() => setOpenDropdown(openDropdown === "format" ? null : "format")}
            />

            {(selectedProject !== "All projects" ||
              selectedBrand !== "All brands" ||
              selectedPlatform !== "All platforms" ||
              selectedFormat !== "All formats" ||
              selectedDateRange !== "1 Oct – 28 Oct 2026") && (
              <button
                type="button"
                onClick={() => {
                  setSelectedDateRange("1 Oct – 28 Oct 2026");
                  setSelectedProject("All projects");
                  setSelectedBrand("All brands");
                  setSelectedPlatform("All platforms");
                  setSelectedFormat("All formats");
                }}
                className="text-[12px] font-medium text-[#8491a3] hover:text-[#0d0d10] underline px-2 cursor-pointer transition"
              >
                Reset filters
              </button>
            )}
          </div>

          {/* 1. Scorecards */}
          <Reveal delay={0.05}>
            <PerformanceScorecards
              activeMetric={activeScorecard}
              onSelectMetric={setActiveScorecard}
            />
          </Reveal>

          {/* 2. Net Sales Trend */}
          <Reveal delay={0.1}>
            <SalesTrendSection />
          </Reveal>

          {/* 3. Conversion Funnel & Revenue Waterfall */}
          <Reveal delay={0.15}>
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px] gap-6">
              <FunnelSection />
              <RevenueSection />
            </div>
          </Reveal>

          {/* 4. Project Breakdown Table */}
          <Reveal delay={0.2}>
            <ProjectBreakdownTable />
          </Reveal>

          {/* 5. Views Donut, Engagement Breakdown, Non-Follower Reach */}
          <Reveal delay={0.25}>
            <EngagementAndViewsSection />
          </Reveal>

          {/* 6. Countries Map & Distribution */}
          <Reveal delay={0.3}>
            <CountriesSection />
          </Reveal>

          {/* 7. Cities & Age/Gender Distribution */}
          <Reveal delay={0.35}>
            <CitiesAndAgeSection />
          </Reveal>

          {/* 8. Delivery & Budget + Value Delivered (End of page, custom report omitted) */}
          <Reveal delay={0.4}>
            <DeliveryAndBudgetSection />
          </Reveal>
        </div>
      </div>
    </CreatorShell>
  );
}
