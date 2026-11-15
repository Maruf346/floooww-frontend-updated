import { motion } from "motion/react";
import type { ReactNode } from "react";
import { PlatformLogo } from "@/common/components/brand/PlatformLogo";
import type { Platform } from "@/common/types";

type CreatorPerformanceTabProps = { creatorName: string; platform: Platform };

const ease = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function Scorecards() {
  const cards = [
    ["Net sales", "₹1,21,400", "▲ 15% vs prev."],
    ["Orders", "318", "▲ 12% vs prev."],
    ["Link clicks", "2,040", "▲ 13% vs prev. · CTR 0.5%"],
    ["Engagement rate", "6.8%", "▲ 0.6 pt vs prev."],
    ["Views", "4.1 L", "▲ 19% vs prev."],
    ["Earned media value", "₹51,250", "Estimate · not in ROAS"],
  ] as const;
  return (
    <section className="grid h-[119px] overflow-hidden rounded-xl border border-line bg-white sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {cards.map(([label, value, detail], index) => (
        <motion.article
          key={label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.58, delay: index * 0.07, ease }}
          className={`relative h-full border-line px-[18px] pt-[18px] ${index === 0 ? "bg-[#f1f4ff]" : "bg-white"} ${index < cards.length - 1 ? "border-r" : ""}`}
        >
          <p className="text-[14px] leading-5 text-secondary">{label}</p>
          <p
            className={`font-semibold text-ink ${index === 5 ? "mt-0.5 text-[24px] leading-8" : "mt-[6px] text-[20px] leading-6"}`}
          >
            {value}
          </p>
          <p
            className={`text-[12px] leading-4 ${index === 5 ? "mt-0.5 text-secondary" : "mt-[6px] text-success"}`}
          >
            {detail}
          </p>
          {index === 0 ? (
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.35, ease: "easeOut" }}
              className="absolute bottom-[18px] left-[18px] right-[18px] h-[3px] origin-left rounded-full bg-primary"
            />
          ) : null}
        </motion.article>
      ))}
    </section>
  );
}

function SalesTrend() {
  const values = [22, 36, 49, 67, 79, 93, 108, 121];
  const dates = ["14 Oct", "17 Oct", "20 Oct", "23 Oct", "26 Oct", "29 Oct", "1 Nov", "4 Nov"];
  const x = (index: number) => 44 + index * (988 / 7);
  const y = (value: number) => 198 - (value / 130) * 174;
  const path = values
    .map((value, index) => `${index ? "L" : "M"}${x(index)} ${y(value)}`)
    .join(" ");
  return (
    <section className="min-h-[348px] rounded-xl border border-line bg-white p-5">
      <h2 className="text-[16px] font-semibold leading-5 text-ink">Net sales over time</h2>
      <p className="mt-1 text-[12px] leading-4 text-secondary">Vitamin-C Serum</p>
      <div className="mt-4 overflow-x-auto">
        <svg
          viewBox="0 0 1080 244"
          className="block min-w-[700px] w-full"
          role="img"
          aria-label="Net sales over time"
        >
          {[0, 30, 60, 90, 120].map((tick) => (
            <g key={tick}>
              <line x1="44" x2="1038" y1={y(tick)} y2={y(tick)} stroke="#e8edf3" />
              <text x="32" y={y(tick) + 4} textAnchor="end" fill="#8491a3" fontSize="11">
                {tick ? `₹${tick}K` : "₹0"}
              </text>
            </g>
          ))}
          {values.map((_, index) => (
            <line key={index} x1={x(index)} x2={x(index)} y1="24" y2="198" stroke="#f1f4f8" />
          ))}
          <defs>
            <linearGradient id="creator-sales-fill" x1="0" x2="0" y1="0" y2="1">
              <stop stopColor="#4f61e8" stopOpacity=".18" />
              <stop offset="1" stopColor="#4f61e8" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d={`${path} L1038 198 L44 198 Z`}
            fill="url(#creator-sales-fill)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
          <motion.path
            d={path}
            fill="none"
            stroke="#4f61e8"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, ease: "easeInOut" }}
          />
          {values.map((value, index) => (
            <motion.circle
              key={index}
              cx={x(index)}
              cy={y(value)}
              r="3"
              fill="#4f61e8"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.45 + index * 0.07 }}
            />
          ))}
          {dates.map((date, index) => (
            <text
              key={date}
              x={x(index)}
              y="238"
              textAnchor={index === 0 ? "start" : index === dates.length - 1 ? "end" : "middle"}
              fill="#8491a3"
              fontSize="11"
            >
              {date}
            </text>
          ))}
        </svg>
      </div>
    </section>
  );
}

function Funnel() {
  const rows = [
    ["Views 4.1 L", "", 420, "#4b5edd"],
    ["Link clicks 2,040", "CTR 0.5%", 340, "#566bea"],
    ["Add to cart 720", "Add-to-cart rate 35%", 270, "#7290f5"],
    ["Checkouts initiated 410", "Checkout rate 57%", 215, "#9db8fb"],
    ["Orders 318", "Purchase rate 78% · Conversion rate 15.6%", 170, "#22974f"],
  ] as const;
  return (
    <section className="min-h-[407px] rounded-xl border border-line bg-white p-5">
      <h2 className="text-[16px] font-semibold leading-6 text-ink">Conversion funnel</h2>
      <p className="mt-1 text-[12px] leading-4 text-secondary">
        From views to orders · conversion rate at each step
      </p>
      <div className="mt-4 space-y-1.5">
        {rows.map(([label, note, width, color], index) => (
          <div
            className="grid grid-cols-[minmax(454px,1fr)_162px] items-center gap-4 max-[680px]:grid-cols-1"
            key={label}
          >
            <motion.svg
              className="mx-auto h-[52px] max-w-full origin-center"
              style={{ width }}
              viewBox={`0 0 ${width} 52`}
              role="img"
              aria-label={label}
              initial={{ opacity: 0, scaleX: 0.35 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: index * 0.12, ease }}
            >
              <path
                d={`M5 0 H${width - 5} Q${width} 0 ${width - 2} 5 L${width - 21} 47 Q${width - 20} 52 ${width - 25} 52 H25 Q20 52 19 47 L2 5 Q0 0 5 0 Z`}
                fill={color}
              />
              <text
                x={width / 2}
                y="30"
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontWeight="500"
              >
                {label}
              </text>
            </motion.svg>
            <motion.p
              className="text-[12px] leading-4 text-secondary"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.12 }}
            >
              {note}
            </motion.p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Revenue() {
  const bars = [
    ["₹1,32,000", "Gross sales", "#dbe4ff", 120, "text-ink"],
    ["− ₹10,600", "Returns", "#dc2626", 10, "text-[#dc2626]"],
    ["₹1,21,400", "Net sales", "#4f61e8", 110, "text-[#4f61e8]"],
  ] as const;
  const rows = [
    ["Orders · coupon code", "201"],
    ["Orders · UTM link", "117"],
    ["Average order value (AOV)", "₹382"],
    ["ROAS (net sales ÷ fee)", "7.1×"],
  ] as const;
  return (
    <section className="min-h-[407px] rounded-xl border border-line bg-white p-5">
      <h2 className="text-[16px] font-semibold leading-6 text-ink">Revenue</h2>
      <p className="mt-1 text-[12px] leading-4 text-secondary">Gross to net sales · Shopify</p>
      <div className="mt-4 flex h-[190px] items-end justify-around border-b border-line px-2">
        {bars.map(([amount, label, color, height, tone], index) => (
          <div className="flex h-full w-20 flex-col justify-end text-center" key={label}>
            <motion.b
              className={`mb-2 text-[12px] font-semibold ${tone}`}
              initial={{ opacity: 0, y: 7 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.25 + index * 0.12 }}
            >
              {amount}
            </motion.b>
            <motion.span
              className="origin-bottom rounded-t-[4px]"
              style={{ backgroundColor: color }}
              initial={{ height: 0 }}
              whileInView={{ height }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: index * 0.14, ease }}
            />
            <small className="mt-2 text-[11px] text-secondary">{label}</small>
          </div>
        ))}
      </div>
      <dl className="mt-5 space-y-[10px]">
        {rows.map(([label, value]) => (
          <div className="flex justify-between gap-4 text-[12px] leading-[19px]" key={label}>
            <dt className="text-secondary">{label}</dt>
            <dd
              className={`font-semibold ${label.startsWith("ROAS") ? "text-[#188a52]" : "text-ink"}`}
            >
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function DeliverableBreakdown({ platform }: { platform: Platform }) {
  const rows = [
    [
      "Festive GRWM",
      "Reel",
      "live 18 Oct",
      "Approved",
      "₹8,500",
      "1.6 L",
      "7.1%",
      "820",
      "132",
      "₹50,400",
    ],
    [
      "Launch day",
      "Story",
      "live 20 Oct",
      "Approved",
      "₹4,250",
      "1.4 L",
      "6.9%",
      "710",
      "108",
      "₹41,200",
    ],
    [
      "Results after 7 days",
      "Reel",
      "sent 26 Oct",
      "Waiting for approval",
      "₹3,000",
      "1.1 L",
      "6.2%",
      "510",
      "78",
      "₹29,800",
    ],
    ["Last-day reminder", "Story", "due 30 Oct", "Not started", "₹1,250", "–", "–", "–", "–", "–"],
  ] as const;
  const headers = [
    "DELIVERABLE",
    "COUPON · UTM LINK",
    "STATUS",
    "FEE",
    "VIEWS ↓",
    "ENG. RATE",
    "CLICKS",
    "ORDERS",
    "NET SALES",
  ];
  return (
    <section className="overflow-hidden rounded-xl border border-line bg-white">
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
          <thead className="h-[34px] border-b border-line bg-subtle text-[10px] font-semibold tracking-[.06em] text-secondary">
            <tr>
              {headers.map((label, index) => (
                <th key={label} className={`px-5 ${index < 2 ? "text-left" : "text-right"}`}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(
              ([name, type, detail, status, fee, views, rate, clicks, orders, sales], index) => (
                <tr key={name} className="h-[93px] border-b border-line-subtle last:border-0">
                  <td className="px-5">
                    <div className="flex items-center gap-3">
                      <img
                        src={`/assets/creators/${index % 2 ? "meera-iyer" : "ishita-rao"}.png`}
                        alt=""
                        className="h-[52px] w-10 rounded-md object-cover"
                      />
                      <div>
                        <p className="text-[13px] font-medium leading-5 text-ink">
                          {name} · {type}
                        </p>
                        <p className="text-[11px] leading-4 text-secondary">
                          <PlatformLogo
                            platform={platform}
                            className="mr-1 inline-block size-3 align-[-2px]"
                          />
                          Instagram · {detail}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 text-[12px] leading-5">
                    <p className="font-medium text-ink">Coupon</p>
                    <p className="text-secondary">UTM link</p>
                  </td>
                  <td className="px-5 text-right">
                    <span
                      className={`inline-flex whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium ${status === "Approved" ? "bg-success-bg text-success" : status === "Waiting for approval" ? "bg-warning-bg text-warning" : "bg-muted text-secondary"}`}
                    >
                      {status}
                    </span>
                  </td>
                  {[fee, views, rate, clicks, orders, sales].map((value) => (
                    <td
                      key={`${name}-${value}`}
                      className="px-5 text-right text-[12px] font-medium leading-5 text-ink"
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ViewsCard() {
  return (
    <section className="h-[250px] rounded-xl border border-line bg-white p-5">
      <h2 className="text-[16px] font-semibold leading-6 text-ink">Views</h2>
      <p className="mt-0.5 text-[12px] leading-4 text-secondary">
        Followers vs non-followers (new audience reach)
      </p>
      <div className="mt-4 flex items-center gap-4">
        <motion.div
          className="relative grid size-[150px] shrink-0 place-items-center rounded-full"
          style={{ background: "conic-gradient(#5164e7 0 39%, #dbe4ff 39% 100%)" }}
          initial={{ opacity: 0, scale: 0.65, rotate: -45 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
        >
          <div className="grid size-[102px] place-items-center rounded-full bg-white text-center">
            <b className="text-[20px] leading-6 text-ink">4.1 L</b>
            <span className="text-[12px] leading-4 text-secondary">views</span>
          </div>
        </motion.div>
        <div className="min-w-0 space-y-2.5 text-[13px] leading-[19px]">
          <div className="flex items-center gap-2">
            <i className="size-2.5 rounded-full bg-[#5164e7]" />
            <span className="text-secondary">Followers</span>
            <b className="ml-auto whitespace-nowrap font-medium text-ink">1.6 L · 39%</b>
          </div>
          <div className="flex items-center gap-2">
            <i className="size-2.5 rounded-full bg-[#dbe4ff]" />
            <span className="text-secondary">Non-followers</span>
            <b className="ml-auto whitespace-nowrap font-medium text-ink">2.5 L · 61%</b>
          </div>
        </div>
      </div>
    </section>
  );
}

function EngagementCard() {
  const parts = [
    ["Likes", "8,400 · 30%", "#5164e7", "30%"],
    ["Comments", "2,200 · 8%", "#9caef8", "8%"],
    ["Saves", "10,500 · 38%", "#49ba8b", "38%"],
    ["Shares", "6,800 · 24%", "#eea24a", "24%"],
  ] as const;
  return (
    <section className="h-[250px] rounded-xl border border-line bg-white p-5">
      <h2 className="text-[16px] font-semibold leading-6 text-ink">Engagement breakdown</h2>
      <p className="mt-0.5 truncate text-[12px] leading-4 text-secondary">
        What the 6.8% engagement rate is made of · 27,900
      </p>
      <div className="mt-4 flex h-4 overflow-hidden rounded-full">
        {parts.map(([, , color, width], index) => (
          <motion.span
            key={color}
            className="h-full"
            style={{ backgroundColor: color }}
            initial={{ width: 0 }}
            whileInView={{ width }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: index * 0.1, ease }}
          />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-2 text-[13px] leading-[19px]">
        {parts.map(([label, value, color]) => (
          <div className="flex items-center gap-2" key={label}>
            <i className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-secondary">{label}</span>
            <b className="ml-auto whitespace-nowrap font-medium text-ink">{value}</b>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-2.5 border-t border-line-subtle pt-3 text-[12px] leading-4">
        <div className="flex justify-between">
          <span className="text-secondary">Total interactions</span>
          <b className="font-medium text-ink">27,900</b>
        </div>
        <div className="flex justify-between">
          <span className="text-secondary">Save and share rate</span>
          <b className="font-medium text-ink">4.2%</b>
        </div>
      </div>
    </section>
  );
}

function FormatCard() {
  const formats = [
    ["Festive GRWM · Reel", 65],
    ["Launch day · Story", 62],
    ["Results after 7 days · Reel", 54],
  ] as const;
  return (
    <section className="h-[250px] rounded-xl border border-line bg-white p-5">
      <h2 className="text-[16px] font-semibold leading-6 text-ink">By Format</h2>
      <p className="mt-0.5 min-h-8 text-[12px] leading-4 text-secondary">
        Share of views from people who don’t follow her
      </p>
      <div className="mt-4 space-y-3 text-[13px] leading-[19px]">
        {formats.map(([label, value], index) => (
          <div className="grid grid-cols-[1fr_110px_28px] items-center gap-3" key={label}>
            <span className="text-secondary">{label}</span>
            <span className="h-2 overflow-hidden rounded-full bg-[#edf0f7]">
              <motion.span
                className="block h-full rounded-full bg-[#5164e7]"
                initial={{ width: 0 }}
                whileInView={{ width: `${value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.12, ease }}
              />
            </span>
            <b className="text-right font-medium text-ink">{value}%</b>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[12px] leading-[17px] text-secondary">
        1.04 L, 0.87 L and 0.59 L views from new people. On YouTube: not subscribed.
      </p>
    </section>
  );
}

function CountriesCard() {
  const countries = [
    ["India", "78%"],
    ["UAE", "6%"],
    ["United States", "5%"],
    ["United Kingdom", "4%"],
    ["Singapore", "3%"],
    ["Other", "4%"],
  ] as const;
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
    <section className="h-[375px] rounded-xl border border-line bg-white p-5">
      <h2 className="text-[16px] font-semibold leading-6 text-ink">Countries</h2>
      <p className="mt-0.5 text-[12px] leading-4 text-secondary">
        Where her followers live · Instagram insights
      </p>
      <div className="mt-4 grid h-[275px] lg:grid-cols-[minmax(0,645px)_minmax(0,1fr)]">
        <div className="relative overflow-hidden border-b border-line-subtle pr-6 lg:border-b-0 lg:border-r">
          <svg
            viewBox="0 0 560 275"
            className="mx-auto h-full max-w-full"
            role="img"
            aria-label="Dotted world map showing audience countries"
          >
            <defs>
              <pattern
                id="creator-audience-dots"
                width="8"
                height="8"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="4" cy="4" r="2" fill="#d6def1" />
              </pattern>
              <clipPath id="creator-audience-land">
                {land.map((path) => (
                  <path key={path} d={path} />
                ))}
              </clipPath>
            </defs>
            <rect
              width="560"
              height="275"
              fill="url(#creator-audience-dots)"
              clipPath="url(#creator-audience-land)"
            />
            <g fill="#7186f2">
              {[
                [106, 68],
                [114, 68],
                [122, 68],
                [130, 60],
                [138, 60],
                [146, 52],
                [306, 59],
                [314, 59],
                [322, 59],
                [498, 206],
              ].map(([cx, cy]) => (
                <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" />
              ))}
            </g>
            <g fill="#3f57e8">
              {[
                [341, 97],
                [349, 97],
                [357, 97],
                [333, 105],
                [341, 105],
                [349, 105],
                [357, 105],
                [365, 105],
                [341, 113],
                [349, 113],
                [357, 113],
                [349, 121],
              ].map(([cx, cy]) => (
                <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" />
              ))}
            </g>
          </svg>
          <span className="absolute left-[42%] top-[18px] rounded-md border border-line bg-white px-2 py-1 text-[11px] text-secondary">
            United Kingdom <b className="ml-1 font-medium text-ink">4%</b>
          </span>
          <span className="absolute left-[20%] top-[106px] rounded-md border border-line bg-white px-2 py-1 text-[11px] text-secondary">
            United States <b className="ml-1 font-medium text-ink">5%</b>
          </span>
          <span className="absolute left-[57%] top-[130px] rounded-md border border-line bg-white px-2 py-1 text-[11px] text-secondary">
            UAE <b className="ml-1 font-medium text-ink">6%</b>
          </span>
          <span className="absolute left-[74%] top-[121px] rounded-md border border-line bg-white px-2 py-1 text-[11px] text-secondary">
            India <b className="ml-1 font-medium text-ink">78%</b>
          </span>
          <span className="absolute right-[17%] top-[164px] rounded-md border border-line bg-white px-2 py-1 text-[11px] text-secondary">
            Singapore <b className="ml-1 font-medium text-ink">3%</b>
          </span>
        </div>
        <div className="pt-6 lg:pl-6">
          <h3 className="text-[18px] font-semibold leading-6 text-ink">Top countries</h3>
          <p className="mt-1 text-[12px] leading-4 text-secondary">
            Share of her followers · Instagram insights
          </p>
          <div className="mt-5 space-y-3.5">
            {countries.map(([country, share], index) => (
              <div
                key={country}
                className="grid grid-cols-[122px_minmax(80px,1fr)_30px] items-center gap-3 text-[13px] leading-[19px]"
              >
                <span className="text-secondary">{country}</span>
                <span className="h-2 overflow-hidden rounded-full bg-[#edf0f7]">
                  <motion.span
                    className="block h-full rounded-full bg-[#4f61e8]"
                    initial={{ width: 0 }}
                    whileInView={{ width: share }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.75, delay: index * 0.07, ease }}
                  />
                </span>
                <b className="text-right font-medium text-ink">{share}</b>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CitiesCard() {
  const cities = [
    ["Bengaluru", "21%", 185],
    ["Mumbai", "17%", 150],
    ["Delhi NCR", "12%", 106],
    ["Chennai", "8%", 70],
    ["Hyderabad", "7%", 62],
    ["Pune", "6%", 53],
    ["Other cities", "29%", 220],
  ] as const;
  return (
    <section className="h-[316px] rounded-xl border border-line bg-white p-5">
      <h2 className="text-[16px] font-semibold leading-6 text-ink">Cities</h2>
      <p className="mt-0.5 text-[12px] leading-4 text-secondary">
        Top cities of her followers · Instagram insights
      </p>
      <div className="mt-4 space-y-3 text-[13px] leading-[19px]">
        {cities.map(([city, share, width], index) => (
          <div className="grid grid-cols-[110px_220px_28px] items-center gap-3" key={city}>
            <span className="text-secondary">{city}</span>
            <span className="h-2 overflow-hidden rounded-full bg-[#edf0f7]">
              <motion.span
                className="block h-full rounded-full bg-[#4f61e8]"
                initial={{ width: 0 }}
                whileInView={{ width }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: index * 0.07, ease }}
              />
            </span>
            <b className="font-medium text-ink">{share}</b>
          </div>
        ))}
      </div>
    </section>
  );
}

function AgeGenderCard() {
  const groups = [
    ["13–17", "3%", "0%", 10, 2],
    ["18–24", "30%", "4%", 95, 13],
    ["25–34", "41%", "5%", 130, 16],
    ["35–44", "9%", "3%", 29, 10],
    ["45+", "3%", "2%", 10, 6],
  ] as const;
  return (
    <section className="h-[316px] rounded-xl border border-line bg-white p-5">
      <h2 className="text-[16px] font-semibold leading-5 text-ink">Age and gender</h2>
      <p className="mt-0.5 text-[12px] leading-4 text-secondary">
        Share of her followers · Instagram insights
      </p>
      <div className="relative mt-4 h-[190px] border-b border-line">
        <div className="absolute inset-x-2 bottom-0 flex h-[160px] justify-between">
          {groups.map(([age, women, men, womenHeight, menHeight], index) => (
            <div className="flex w-[60px] flex-col justify-end text-center" key={age}>
              <div className="flex h-[146px] items-end justify-center gap-1">
                <div className="relative flex w-7 flex-col justify-end">
                  <span className="absolute -top-4 w-full text-center text-[11px] leading-[13px] text-secondary">
                    {women}
                  </span>
                  <motion.span
                    className="w-7 rounded-t-[3px] bg-[#4f61e8]"
                    initial={{ height: 0 }}
                    whileInView={{ height: womenHeight }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1, ease }}
                  />
                </div>
                <div className="relative flex w-7 flex-col justify-end">
                  <span className="absolute -top-4 w-full text-center text-[11px] leading-[13px] text-secondary">
                    {men}
                  </span>
                  <motion.span
                    className="w-7 rounded-t-[3px] bg-[#afbef8]"
                    initial={{ height: 0 }}
                    whileInView={{ height: menHeight }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.08 + index * 0.1, ease }}
                  />
                </div>
              </div>
              <span className="mt-2 text-[11px] leading-[13px] text-secondary">{age}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-4 text-[12px] leading-[15px]">
        <span className="flex items-center gap-1.5 text-secondary">
          <i className="size-2 rounded-full bg-[#4f61e8]" />
          Women <b className="font-medium text-ink">86%</b>
        </span>
        <span className="flex items-center gap-1.5 text-secondary">
          <i className="size-2 rounded-full bg-[#afbef8]" />
          Men <b className="font-medium text-ink">14%</b>
        </span>
      </div>
    </section>
  );
}

function BudgetCard({ creatorName }: { creatorName: string }) {
  const items = [
    [
      `Paid to ${creatorName.split(" ")[0]}`,
      "released after you approved content",
      "₹12,750",
      "75%",
      "#4f61e8",
    ],
    [
      "Held in escrow",
      "₹3,000 on Reel approval · ₹1,250 on the last Story",
      "₹4,250",
      "25%",
      "#9eaff7",
    ],
    ["Not funded yet", "fully funded", "₹0", "0%", "#e6ebf4"],
  ] as const;
  return (
    <section className="relative h-[434px] rounded-xl border border-line bg-white p-5">
      <h2 className="text-[18px] font-semibold leading-6 text-ink">Budget</h2>
      <p className="mt-0.5 text-[12px] leading-4 text-secondary">
        One-time collab · {creatorName} · ₹17,000 fee
      </p>
      <motion.div
        className="relative mx-auto mt-4 grid size-[132px] place-items-center rounded-full"
        style={{ background: "conic-gradient(#4f61e8 0 75%, #9eaff7 75% 100%)" }}
        initial={{ opacity: 0, scale: 0.65, rotate: -45 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease }}
      >
        <div className="grid size-[92px] place-items-center rounded-full bg-white text-center">
          <b className="whitespace-nowrap text-[18px] leading-6 tracking-[-.03em] text-ink">
            ₹17,000
          </b>
          <span className="text-[12px] leading-4 text-secondary">fee</span>
        </div>
      </motion.div>
      <div className="mt-4 space-y-2.5">
        {items.map(([title, detail, amount, share, color], index) => (
          <motion.div
            key={title}
            className="grid grid-cols-[10px_minmax(0,1fr)_75px] gap-2 text-[13px] leading-5"
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.2 + index * 0.08 }}
          >
            <i className="mt-1 size-2.5 rounded-full" style={{ backgroundColor: color }} />
            <div>
              <p className="font-medium text-ink">{title}</p>
              <p className="text-[12px] leading-4 text-secondary">{detail}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-ink">{amount}</p>
              <p className="text-[12px] leading-4 text-secondary">{share}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="absolute bottom-[58px] left-5 right-5 h-px bg-line" />
      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-[14px] leading-5">
        <span className="text-secondary">Total fee</span>
        <b className="text-[16px] font-semibold text-ink">₹17,000</b>
      </div>
    </section>
  );
}

function CostEfficiencyCard() {
  const metrics = [
    ["Cost per order", "CPA", "₹53", "vs ₹97", "−45%", 93],
    ["Cost per link click", "CPC", "₹8.33", "vs ₹13.60", "−39%", 104],
    ["Cost per 1,000 views", "CPM", "₹41", "vs ₹67", "−39%", 104],
    ["Cost per engagement", "CPE", "₹0.61", "vs ₹1.02", "−40%", 102],
  ] as const;
  return (
    <section className="h-[434px] rounded-xl border border-line bg-white p-5">
      <h2 className="text-[16px] font-semibold leading-[19px] text-ink">Cost efficiency</h2>
      <div className="mt-4">
        <p className="text-[12px] leading-[15px] text-secondary">Return on ad spend (ROAS)</p>
        <div className="mt-1 flex items-center gap-2">
          <motion.b
            className="text-[32px] font-semibold leading-[39px] text-ink"
            initial={{ opacity: 0, scale: 0.75 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            7.1×
          </motion.b>
          <span className="rounded-full bg-success-bg px-2 py-0.5 text-[11px] font-medium leading-[13px] text-success">
            ▲ 61% above project 4.4×
          </span>
        </div>
        <p className="mt-1 text-[12px] leading-[15px] text-secondary">
          ₹7.10 in net sales for every ₹1 of fee
        </p>
      </div>
      <div className="mt-4 h-px bg-line" />
      <div className="mt-4 flex items-center gap-3">
        <p className="text-[13px] font-medium leading-4 text-ink">Cost per result</p>
        <span className="h-px flex-1 bg-line" />
      </div>
      <div className="mt-4 space-y-3.5">
        {metrics.map(([label, code, value, previous, change, width], index) => (
          <div
            className="grid grid-cols-[140px_170px_minmax(0,1fr)_48px] items-center gap-3"
            key={code}
          >
            <div>
              <p className="text-[12px] leading-4 text-ink">{label}</p>
              <p className="text-[11px] leading-[13px] text-secondary">{code}</p>
            </div>
            <div className="space-y-1">
              <motion.span
                className="block h-[7px] rounded-full bg-[#4f61e8]"
                initial={{ width: 0 }}
                whileInView={{ width }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease }}
              />
              <span className="block h-[7px] w-[170px] rounded-full bg-[#e5eaf3]" />
            </div>
            <div className="whitespace-nowrap text-[12px] leading-[18px]">
              <b className="font-medium text-ink">{value}</b>
              <span className="ml-1 text-[11px] text-secondary">{previous}</span>
            </div>
            <span className="rounded-full bg-success-bg px-2 py-0.5 text-center text-[11px] font-medium leading-[13px] text-success">
              {change}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[11px] leading-[15px] text-tertiary">
        For costs, lower is better. Project average covers the 6 live creators in Vitamin-C Serum.
      </p>
    </section>
  );
}

function CustomReport() {
  return (
    <section className="flex min-h-[86px] flex-wrap items-center justify-between gap-4 rounded-xl border border-line bg-white px-5 py-4">
      <div>
        <h2 className="text-[16px] font-semibold leading-6 text-ink">
          Need a deeper breakdown? Make a custom report
        </h2>
        <p className="mt-1 text-[12px] leading-4 text-secondary">
          Split any number by format, platform, date, coupon vs link or audience, then save it or
          export it as a PDF or CSV.
        </p>
      </div>
      <button
        type="button"
        className="h-10 w-[200px] rounded-md bg-primary text-[14px] font-medium text-white transition-colors hover:bg-[#2949e9]"
      >
        Make custom report
      </button>
    </section>
  );
}

export function CreatorPerformanceTab({ creatorName, platform }: CreatorPerformanceTabProps) {
  return (
    <div className="mt-6 space-y-6">
      <Scorecards />
      <Reveal>
        <SalesTrend />
      </Reveal>
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <Reveal>
          <Funnel />
        </Reveal>
        <Reveal delay={0.08}>
          <Revenue />
        </Reveal>
      </section>
      <Reveal>
        <DeliverableBreakdown platform={platform} />
      </Reveal>
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.185fr)_minmax(0,1.153fr)_minmax(0,1fr)]">
        <Reveal>
          <ViewsCard />
        </Reveal>
        <Reveal delay={0.08}>
          <EngagementCard />
        </Reveal>
        <Reveal delay={0.16}>
          <FormatCard />
        </Reveal>
      </section>
      <Reveal>
        <CountriesCard />
      </Reveal>
      <section className="grid gap-6 lg:grid-cols-2">
        <Reveal>
          <CitiesCard />
        </Reveal>
        <Reveal delay={0.08}>
          <AgeGenderCard />
        </Reveal>
      </section>
      <section className="grid gap-6 lg:grid-cols-2">
        <Reveal>
          <BudgetCard creatorName={creatorName} />
        </Reveal>
        <Reveal delay={0.08}>
          <CostEfficiencyCard />
        </Reveal>
      </section>
      <Reveal>
        <CustomReport />
      </Reveal>
    </div>
  );
}
