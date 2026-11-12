import {
  AlertTriangle,
  CircleDollarSign,
  FileCheck2,
  Gift,
  Plus,
  Scale,
  UserCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ContentAwaitingReview } from "@/brand/components/ContentAwaitingReview";
import { ROUTES } from "@/common/constants/routes";
import { DateRangePicker } from "@/common/components/ui/DateRangePicker";
import { KpiTile } from "@/common/components/ui/KpiTile";
import { asset } from "@/common/utils/asset";

const actions = [
  [
    AlertTriangle,
    "Reconnect Shopify",
    "Sales for Vitamin-C Serum and Glow Squad are not being tracked since 26 Oct",
    "Now",
    "bg-danger-bg text-danger",
  ],
  [
    FileCheck2,
    "Approve 4 Reels",
    "Vitamin-C Serum - waiting up to 52 h - releases \u20B930,000",
    "Overdue",
    "bg-danger-bg text-danger",
  ],
  [
    Scale,
    "Reply to a dispute",
    "Monsoon Sunscreen - Rohan Desai - \u20B97,500 on hold",
    "In 1 d",
    "bg-warning-bg text-warning",
  ],
  [
    Gift,
    "Ship 3 gift products",
    "Hydration Bundle - Ishita Rao and 2 others - dispatch by 3 Nov",
    "Due today",
    "bg-warning-bg text-warning",
  ],
] as const;

const projects = [
  [
    "Vitamin-C Serum",
    "Influencer - Paid - One-time",
    "On track",
    "8 of 16",
    "\u20B92,00,000",
    asset("dashboard/project-vitamin-c.png"),
  ],
  [
    "Glow Squad - Month 3 of 6",
    "Influencer - Paid - Long-term",
    "On track",
    "6 of 6",
    "\u20B92,25,000",
    asset("dashboard/project-glow-squad.png"),
  ],
  [
    "Monsoon Sunscreen",
    "Influencer - Paid - One-time",
    "On track",
    "10 of 12",
    "\u20B91,20,000",
    asset("dashboard/project-monsoon-sunscreen.png"),
  ],
  [
    "Lip Tint Drop",
    "UGC - Paid - One-time",
    "Ahead",
    "6 of 6",
    "\u20B960,000",
    asset("dashboard/project-lip-tint.png"),
  ],
  [
    "Hydration Bundle",
    "Influencer - Gift exchange - One-time",
    "Behind",
    "5 of 8",
    "\u20B952,000 value",
    asset("dashboard/project-hydration-bundle.png"),
  ],
  [
    "Skin Quiz Leads",
    "UGC - Paid - One-time",
    "Upcoming",
    "3 accepted",
    "Not funded",
    asset("dashboard/project-skin-quiz.png"),
  ],
] as const;

const deadlines = [
  ["1", "Nov", "Glow Squad month 4", "\u20B979,425 held from UPI AutoPay"],
  ["2", "Nov", "Monsoon Sunscreen ends", "Projected 49 L reach (98%)"],
  ["4", "Nov", "Skin Quiz Leads starts", "3 creators - UGC"],
] as const;

export function BrandOverviewWithCampaigns() {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-bold leading-[34px] tracking-[-.02em]">
            Welcome, Ananya
          </h1>
          <p className="text-[13px] leading-5 text-secondary">
            Across all active projects, 1-28 Oct 2026 - updated just now
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <DateRangePicker value="1 Oct - 28 Oct 2026" />
          <Link
            to={ROUTES.brandNewProject}
            className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-[14px] font-medium text-white"
          >
            <Plus size={16} />
            Create new project
          </Link>
        </div>
      </header>
      <section className="rounded-xl border border-line bg-white p-5">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            [CircleDollarSign, "Active projects", "5", "1 starting 4 Nov"],
            [UserCheck, "Creators accepted", "38", "Across 6 projects"],
            [FileCheck2, "Deliverables due this week", "14", "3 overdue"],
            [Gift, "Shipments in transit", "4", "2 delivered this week"],
          ].map(([Icon, label, value, detail]) => {
            const MetricIcon = Icon as typeof Gift;
            return (
              <KpiTile
                key={label as string}
                icon={MetricIcon}
                iconBg="bg-primary"
                label={label as string}
                value={value as string}
                detail={detail as string}
              />
            );
          })}
        </div>
      </section>
      <div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(280px,360px)]">
        <ActionRequired />
        <UpcomingDeadlines />
      </div>
      <div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(280px,360px)]">
        <Projects />
        <Budget />
      </div>
      <ContentAwaitingReview />
    </div>
  );
}

function ActionRequired() {
  return (
    <section className="rounded-xl border border-line bg-white p-5">
      <h2 className="text-[16px] font-semibold leading-6">Action required</h2>
      <p className="text-[12px] leading-4 text-secondary">4 things need your attention</p>
      <div className="mt-3">
        {actions.map(([Icon, title, body, due, tone]) => {
          const ActionIcon = Icon as typeof Gift;
          return (
            <button
              type="button"
              key={title}
              className="flex w-full items-center gap-3 border-t border-line-subtle py-3 text-left"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-subtle">
                <ActionIcon size={16} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[14px] font-medium leading-[22px]">{title}</span>
                <span className="block truncate text-[12px] leading-4 text-secondary">{body}</span>
              </span>
              <span
                className={`shrink-0 rounded-md px-2 py-0.5 text-[12px] font-medium leading-4 ${tone}`}
              >
                {due}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function UpcomingDeadlines() {
  return (
    <section className="rounded-xl border border-line bg-white p-5">
      <h2 className="text-[16px] font-semibold leading-6">Upcoming deadlines</h2>
      <p className="text-[12px] leading-4 text-secondary">Next 14 days</p>
      {deadlines.map(([day, month, title, body]) => (
        <div key={title} className="mt-3 flex gap-3">
          <div className="w-11 shrink-0 rounded-md bg-subtle py-1 text-center">
            <b className="block text-[14px] leading-5">{day}</b>
            <span className="text-[12px] leading-4 text-tertiary">{month}</span>
          </div>
          <div className="min-w-0">
            <p className="text-[14px] font-medium leading-[22px]">{title}</p>
            <p className="text-[12px] leading-4 text-secondary">{body}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

function Projects() {
  return (
    <section className="overflow-hidden rounded-xl border border-line bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-[16px] font-semibold leading-6">Projects</h2>
          <p className="text-[12px] leading-4 text-secondary">
            6 projects - 5 live, 1 starting 4 Nov
          </p>
        </div>
        <button type="button" className="shrink-0 text-[12px] font-medium text-link">
          View All Projects
        </button>
      </div>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[700px] text-left">
          <thead className="bg-subtle text-[12px] leading-4 text-secondary">
            <tr>
              <th className="rounded-l-md p-3 font-semibold">Project</th>
              <th className="font-semibold">Status</th>
              <th className="font-semibold">Accepted</th>
              <th className="rounded-r-md font-semibold">Committed spend</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(([name, meta, status, accepted, spend, image]) => (
              <tr key={name} className="border-b border-line-subtle">
                <td className="p-3">
                  <div className="flex min-w-[250px] items-center gap-3">
                    <img src={image} alt="" className="size-10 shrink-0 rounded-lg object-cover" />
                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-medium leading-[22px]">{name}</p>
                      <p className="truncate text-[12px] leading-4 text-secondary">{meta}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    className={`rounded-full px-2 py-1 text-[12px] font-medium ${status === "Behind" ? "bg-danger-bg text-danger" : status === "Upcoming" ? "bg-primary-subtle text-primary" : "bg-success-bg text-success"}`}
                  >
                    {status}
                  </span>
                </td>
                <td
                  className={`text-[13px] font-medium ${status === "Behind" ? "text-danger" : ""}`}
                >
                  {accepted}
                </td>
                <td className="text-[13px] font-medium">{spend}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Budget() {
  const lines = [
    ["Released to creators", "\u20B94,33,800"],
    ["Escrow balance", "\u20B91,71,200"],
    ["Awaiting funding", "\u20B92,85,000"],
    ["Not committed", "\u20B91,10,000"],
  ];
  return (
    <section className="rounded-xl border border-line bg-white p-5">
      <div className="flex justify-between gap-3">
        <div>
          <h2 className="text-[16px] font-semibold leading-6">Budget</h2>
          <p className="text-[12px] leading-4 text-secondary">
            {"\u20B910,00,000 across 6 projects"}
          </p>
        </div>
        <button type="button" className="text-[12px] font-medium text-link">
          Payments
        </button>
      </div>
      <p className="mt-5 text-[12px] leading-4 text-secondary">Left to commit</p>
      <p className="text-[28px] font-semibold leading-[34px] tracking-[-.02em]">
        {"\u20B91,10,000"}
      </p>
      <div className="mt-3 flex h-2 overflow-hidden rounded-full">
        <span className="w-[43%] bg-ink" />
        <span className="w-[17%] bg-warning" />
        <span className="w-[29%] bg-primary" />
        <span className="flex-1 bg-muted" />
      </div>
      {lines.map(([label, value]) => (
        <p key={label} className="mt-3 flex justify-between text-[13px] leading-5">
          <span className="text-secondary">{label}</span>
          <b className="font-medium">{value}</b>
        </p>
      ))}
    </section>
  );
}
