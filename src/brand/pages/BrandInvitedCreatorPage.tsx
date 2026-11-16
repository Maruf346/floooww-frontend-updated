import { type ReactNode, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  ChartNoAxesCombined,
  Check,
  ClipboardList,
  Clock3,
  Download,
  Ellipsis,
  ExternalLink,
  FileCheck2,
  FileUp,
  Flag,
  Link2,
  MessageSquare,
  Paperclip,
  Pencil,
  Play,
  Send,
  Star,
  TriangleAlert,
  WalletCards,
  X,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { BrandShell } from "@/brand/components/BrandShell";
import { DateRangePicker } from "@/common/components/ui/DateRangePicker";
import { CreatorPerformanceTab } from "@/brand/components/CreatorPerformanceTab";
import { Dropdown } from "@/common/components/ui/Dropdown";
import { PlatformLogo } from "@/common/components/brand/PlatformLogo";
import { brandCreatorDeliverablesRoute, brandProjectRoute } from "@/common/constants/routes";
import { getProject, type Project } from "@/brand/data/projects";
import { getProjectRules } from "@/brand/data/projectRules";
import type { Platform } from "@/common/types";

type CreatorStatus = "Posting" | "Awaiting approval" | "Overdue" | "Not started";
type CreatorDetail = {
  name: string;
  handle: string;
  city: string;
  avatar: string;
  status: CreatorStatus;
  platform: Platform;
  channels: string[];
  completed: number;
  total: number;
  fee: string;
  released: string;
  escrow: string;
  sales: string;
  hasPerformance?: boolean;
  deliverables: Array<{
    name: string;
    type: string;
    deadline: string;
    status: "Approved · paid" | "Awaiting approval" | "Not started";
    live: boolean;
  }>;
};

const creatorDetails: Record<string, CreatorDetail> = {
  ishita: {
    name: "Ishita Rao",
    handle: "@ishitarao",
    city: "Bengaluru, Karnataka",
    avatar: "ishita-rao",
    hasPerformance: true,
    status: "Posting",
    platform: "Instagram",
    channels: ["Instagram 1.1 L", "YouTube 18K", "Skincare"],
    completed: 3,
    total: 4,
    fee: "₹17,000",
    released: "₹12,750",
    escrow: "₹4,250",
    sales: "₹68,400",
    deliverables: [
      {
        name: "Festive GRWM",
        type: "Reel · ₹7,500",
        deadline: "18 Oct",
        status: "Approved · paid",
        live: true,
      },
      {
        name: "Launch day",
        type: "Story · ₹2,450",
        deadline: "20 Oct",
        status: "Approved · paid",
        live: true,
      },
      {
        name: "Results after 7 days",
        type: "Reel · ₹3,000",
        deadline: "26 Oct",
        status: "Awaiting approval",
        live: true,
      },
      {
        name: "Last-day reminder",
        type: "Story · ₹1,250",
        deadline: "30 Oct",
        status: "Not started",
        live: false,
      },
    ],
  },
  meera: {
    name: "Meera Iyer",
    handle: "@meerabeauty",
    city: "Mumbai",
    avatar: "meera-iyer",
    status: "Awaiting approval",
    platform: "Instagram",
    channels: ["Instagram 1.4 L", "YouTube 32K", "Skincare"],
    completed: 2,
    total: 3,
    fee: "₹30,000",
    released: "₹27,000",
    escrow: "₹3,000",
    sales: "₹1,42,800",
    deliverables: [
      {
        name: "Morning routine",
        type: "Reel · ₹15,000",
        deadline: "15 Oct",
        status: "Approved · paid",
        live: true,
      },
      {
        name: "Ingredient callout",
        type: "Carousel · ₹7,500",
        deadline: "22 Oct",
        status: "Approved · paid",
        live: true,
      },
      {
        name: "Final review",
        type: "Story · ₹7,500",
        deadline: "29 Oct",
        status: "Awaiting approval",
        live: false,
      },
    ],
  },
  emma: {
    name: "Emma Clarke",
    handle: "@emmaclarke",
    city: "Mumbai",
    avatar: "emma-clarke",
    status: "Posting",
    platform: "Instagram",
    channels: ["Instagram 96K", "YouTube 40K", "Skincare"],
    completed: 3,
    total: 4,
    fee: "₹15,000",
    released: "₹11,250",
    escrow: "₹3,750",
    sales: "₹54,000",
    deliverables: [
      {
        name: "Brightening routine",
        type: "Reel · ₹7,500",
        deadline: "16 Oct",
        status: "Approved · paid",
        live: true,
      },
      {
        name: "Launch Story",
        type: "Story · ₹2,500",
        deadline: "20 Oct",
        status: "Approved · paid",
        live: true,
      },
      {
        name: "Results check-in",
        type: "Reel · ₹2,500",
        deadline: "26 Oct",
        status: "Approved · paid",
        live: true,
      },
      {
        name: "Final Story",
        type: "Story · ₹2,500",
        deadline: "30 Oct",
        status: "Not started",
        live: false,
      },
    ],
  },
  simran: {
    name: "Simran Kaur",
    handle: "@simrankaur",
    city: "Chandigarh",
    avatar: "tara-bose",
    hasPerformance: true,
    status: "Awaiting approval",
    platform: "Instagram",
    channels: ["Instagram 91K", "YouTube 15K", "Skincare"],
    completed: 1,
    total: 3,
    fee: "\u20b915,000",
    released: "\u20b910,000",
    escrow: "\u20b95,000",
    sales: "\u20b921,600",
    deliverables: [
      {
        name: "Glow routine",
        type: "Reel \u00b7 \u20b97,500",
        deadline: "18 Oct",
        status: "Approved \u00b7 paid",
        live: true,
      },
      {
        name: "Results check-in",
        type: "Reel \u00b7 \u20b95,000",
        deadline: "28 Oct",
        status: "Awaiting approval",
        live: true,
      },
      {
        name: "Last-day reminder",
        type: "Story \u00b7 \u20b92,500",
        deadline: "3 Nov",
        status: "Not started",
        live: false,
      },
    ],
  },
};

function fallbackCreator(id: string): CreatorDetail {
  const label = id.replace(/[-_]/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
  return {
    ...creatorDetails.ishita,
    name: label,
    handle: `@${id.replace(/[^a-z]/gi, "")}`,
    avatar: "kavya-reddy",
  };
}

function StatusPill({
  status,
}: {
  status: CreatorStatus | "Approved · paid" | "Awaiting approval" | "Not started" | "Overdue";
}) {
  const tone =
    status === "Posting" || status === "Approved · paid"
      ? "bg-success-bg text-success"
      : status === "Awaiting approval"
        ? "bg-[#fff3da] text-[#bf7600]"
        : status === "Overdue"
          ? "bg-danger-subtle text-danger"
          : "bg-muted text-secondary";
  return (
    <span
      className={`inline-flex whitespace-nowrap items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium leading-4 ${tone}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function Panel({
  title,
  subtitle,
  action,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-xl border border-line bg-white p-5 ${className}`}>
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="!m-0 text-[15px] font-bold leading-tight tracking-[-.01em] text-ink">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-1 text-[12px] leading-4 text-secondary">{subtitle}</p>
          ) : null}
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}

function Timeline({ creator, project }: { creator: CreatorDetail; project: Project }) {
  const rules = getProjectRules(project);
  const projectName = project.name;
  const items = [
    ["Invited", "5 Oct", "₹17,000 funded to escrow", true],
    ["Accepted", "6 Oct", "Within 1 day", true],
    ["Product delivered", "11 Oct", "Delivery · sent 9 Oct", true],
    ["First deliverable", "18 Oct", "Festive GRWM · Reel", true],
    ["Story live", "20 Oct", "Launch day · Story", true],
    ["Reel submitted", "26 Oct", "Results after 7 days", true],
    ["Next deadline", "30 Oct", "Last-day reminder · Story", false],
    ["Project ends", "7 Nov", "Usage rights until 7 Dec", false],
  ];
  const timelineItems = rules.isLongTerm
    ? [
        [
          "Invited",
          "5 Oct",
          rules.isGift ? "Kit value reserved" : `${creator.fee} funded to escrow`,
          true,
        ],
        ["Accepted", "6 Oct", "Within 1 day", true],
        ["Month 3 of 6", "Oct", `This month's ${rules.progressNoun}`, true],
        ["Next month starts", "2 Nov", "Next brief and cycle begin", false],
        ["Project ends", "31 Jan", "Final cycle and usage rights end", false],
      ]
    : [
        [
          "Invited",
          "5 Oct",
          rules.isGift ? "Product kit reserved" : `${creator.fee} funded to escrow`,
          true,
        ],
        ["Accepted", "6 Oct", "Within 1 day", true],
        [
          rules.isGift ? "Kit delivered" : "Brief sent",
          "11 Oct",
          rules.isGift ? "Delivery confirmed" : "Creator brief shared",
          true,
        ],
        [
          rules.firstItemLabel,
          "18 Oct",
          creator.deliverables[0]?.name ?? "First deliverable",
          true,
        ],
        [rules.deadlineLabel, "30 Oct", `Last ${rules.item} due`, false],
        ["Project ends", "7 Nov", "Usage rights until 7 Dec", false],
      ];
  return (
    <Panel
      title="Collaboration timeline"
      subtitle={`Showing 5 Oct – 7 Nov · today 28 Oct · ${projectName}`}
      action={<StatusPill status={rules.activeVerb as CreatorStatus} />}
    >
      <ol className="grid gap-4 sm:grid-cols-4 xl:grid-cols-8">
        {timelineItems.map(([label, date, note, complete], index) => (
          <li className="relative min-w-0 xl:pr-3" key={String(label)}>
            <span
              className={`relative z-[1] mb-2 grid size-7 place-items-center rounded-full text-[11px] ${complete ? "bg-success text-white" : index === 6 ? "border-2 border-ink bg-white text-ink" : "bg-muted text-tertiary"}`}
            >
              {complete ? <Check size={14} strokeWidth={2.8} /> : index + 1}
            </span>
            {index < items.length - 1 ? (
              <i
                className={`absolute left-7 top-[13px] hidden h-[2px] w-[calc(100%-18px)] xl:block ${complete ? "bg-ink" : "bg-line"}`}
              />
            ) : null}
            <b className="block text-[12px] leading-4 text-ink">{label}</b>
            <p className="mt-1 min-h-8 text-[11px] leading-4 text-secondary">{note}</p>
            <time className="mt-1 block text-[11px] font-medium text-ink">{date}</time>
          </li>
        ))}
      </ol>
    </Panel>
  );
}

function DeliverableProgress({ creator, project }: { creator: CreatorDetail; project: Project }) {
  const rules = getProjectRules(project);
  const ratio = creator.completed / creator.total;
  return (
    <Panel
      title="Deliverable progress"
      subtitle={`${rules.isAmbassador ? "Month 3: " : ""}${creator.completed} / ${creator.total} ${rules.progressNoun} from ${creator.name}`}
    >
      <div className="flex flex-wrap items-center gap-5">
        <motion.div
          className="relative grid size-[112px] shrink-0 place-items-center rounded-full"
          style={{
            background: `conic-gradient(#149d46 0 ${ratio * 360}deg, #f3ad1b ${ratio * 360}deg ${Math.min(360, ratio * 360 + 68)}deg, #e8edf3 ${Math.min(360, ratio * 360 + 68)}deg 360deg)`,
          }}
          initial={{ scale: 0.72, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid size-[78px] place-items-center rounded-full bg-white text-center">
            <b className="text-[17px] leading-5 text-ink">
              {creator.completed} of {creator.total}
            </b>
            <span className="text-[11px] text-secondary">{rules.completedVerb.toLowerCase()}</span>
          </div>
        </motion.div>
        <div className="min-w-[220px] flex-1 space-y-2.5">
          {[
            ["Approved · paid", "50%", "#149d46"],
            ["Awaiting approval", "25%", "#1b1f27"],
            ["Not started", "25%", "#8a9cff"],
            ["Behind or disputed", "0%", "#f2a414"],
          ].map(([label, value, color]) => (
            <div className="grid grid-cols-[minmax(0,1fr)_28px] gap-3 text-[12px]" key={label}>
              <span className="flex items-center gap-2 text-secondary">
                <i className="size-2 rounded-full" style={{ background: color }} />
                {label}
              </span>
              <b className="text-right text-ink">{value}</b>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function Pipeline({ onView }: { onView: () => void }) {
  const states = [
    ["Awaiting approval", "1", "#f2a414"],
    ["Changes requested", "0", "#e24545"],
    ["Approved · not live yet", "0", "#1b1f27"],
    ["Live", "3", "#149d46"],
  ];
  return (
    <Panel
      title="Content pipeline"
      subtitle="3 of 4 deliverables submitted · from submitted to live"
      action={
        <button
          type="button"
          onClick={onView}
          className="border-0 bg-transparent p-0 text-[12px] font-medium text-primary"
        >
          View Content
        </button>
      }
    >
      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {states.map(([label, value, color], index) => (
          <div key={label} className="rounded-lg border border-line bg-[#fbfcfd] px-3 py-2.5">
            <span className="flex items-center gap-1.5 text-[11px] leading-4 text-secondary">
              <i className="size-1.5 rounded-full" style={{ background: color }} />
              {label}
            </span>
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="mt-1 text-[16px] font-semibold leading-5 text-ink"
            >
              {value}
            </motion.p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function Deliverables({ creator, onViewAll }: { creator: CreatorDetail; onViewAll: () => void }) {
  return (
    <Panel
      title="Deliverables"
      subtitle={`${creator.total} deliverables · deadline, product, code and link set at invite · fee ${creator.fee}`}
      action={
        <button
          type="button"
          onClick={onViewAll}
          className="border-0 bg-transparent p-0 text-[12px] font-medium text-primary"
        >
          View all
        </button>
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left">
          <thead className="bg-subtle text-[10px] font-semibold uppercase tracking-[.02em] text-secondary">
            <tr>
              <th className="w-9 px-2 py-2">#</th>
              <th className="px-2 py-2">Deliverable</th>
              <th className="px-2 py-2">Deadline</th>
              <th className="px-2 py-2">Product · code</th>
              <th className="px-2 py-2">Status</th>
              <th className="px-2 py-2">Post</th>
              <th className="w-8 px-2 py-2" />
            </tr>
          </thead>
          <tbody>
            {creator.deliverables.map((item, index) => (
              <tr className="border-b border-line last:border-0" key={item.name}>
                <td className="px-2 py-2.5 text-[12px] text-secondary">{index + 1}</td>
                <td className="px-2 py-2.5">
                  <span className="flex items-center gap-2">
                    <img
                      src={`/assets/brand-assets/${(index % 4) + 1}.png`}
                      onError={(event) => {
                        event.currentTarget.src = `/assets/creators/${creator.avatar}.png`;
                      }}
                      alt=""
                      className="size-7 rounded object-cover"
                    />
                    <span>
                      <b className="block text-[12px] leading-4 text-ink">{item.name}</b>
                      <small className="text-[10px] leading-4 text-secondary">{item.type}</small>
                    </span>
                  </span>
                </td>
                <td className="px-2 py-2.5 text-[11px] text-ink">{item.deadline}</td>
                <td className="px-2 py-2.5">
                  <b className="block text-[11px] font-medium text-ink">Vitamin C Glow Serum</b>
                  <small className="text-[10px] text-secondary">ISHITA15 · 1 link</small>
                </td>
                <td className="px-2 py-2.5">
                  <StatusPill status={item.status} />
                </td>
                <td className="px-2 py-2.5 text-[11px] text-ink">
                  <span className="flex items-center gap-1.5">
                    <i
                      className={`size-2 rounded-full ${item.live ? "bg-success" : "border border-secondary"}`}
                    />
                    {item.live ? "Live" : "Not live yet"}
                  </span>
                  <small className="text-[10px] text-secondary">
                    {item.live ? item.deadline : "—"}
                  </small>
                </td>
                <td className="px-2 py-2.5">
                  <button
                    type="button"
                    aria-label={`More actions for ${item.name}`}
                    className="text-secondary"
                  >
                    <Ellipsis size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

function DeliverableDetailPanel({
  creator,
  item,
  index,
  onClose,
}: {
  creator: CreatorDetail;
  item: CreatorDetail["deliverables"][number];
  index: number;
  onClose: () => void;
}) {
  const [detailTab, setDetailTab] = useState<"Content" | "Comments" | "History">("Content");
  const [comment, setComment] = useState("");
  const [thread, setThread] = useState([
    {
      author: "Ananya Mehta",
      meta: "Minimalist · 26 Oct, 19:02",
      body: "Love the before/after. Can you pin a comment with ISHITA15 so people find the code?",
      tone: "brand",
    },
    {
      author: "Ishita Rao",
      meta: "Creator · 26 Oct, 19:40",
      body: "Pinned it. I also added the link sticker to tonight's Story.",
      tone: "creator",
      attachment: "pinned-comment.png · 240 KB",
    },
  ]);
  const kind = item.type.split("\u00b7")[0].trim();
  const fee = item.type.split("\u00b7")[1]?.trim() ?? "\u20b93,000";
  const waiting = item.status === "Awaiting approval";
  const tabs = ["Content", "Comments", "History"] as const;
  const historyEvents = [
    [
      "Waiting for your approval",
      "Now",
      `Approving releases ${fee} from escrow to the creator`,
      Clock3,
    ],
    [
      "Went live on Instagram",
      "26 Oct, 18:30",
      "instagram.com/reel/C9xIshita3 · tracking link connected",
      ExternalLink,
    ],
    [
      "Final file sent",
      "26 Oct, 11:05",
      `${creator.handle.slice(1)}_results.mp4 · 31.2 MB · v2`,
      FileCheck2,
    ],
    [
      "Changes requested by Ananya Mehta",
      "24 Oct, 18:05",
      "“Show the date on the before shot.”",
      MessageSquare,
    ],
    [
      "Draft sent for review",
      "24 Oct, 17:20",
      `${creator.handle.slice(1)}_results_v1.mp4 · v1`,
      FileUp,
    ],
    [
      "Tracking link and coupon created",
      "8 Oct, 09:40",
      `flw.to/${creator.handle.slice(1)}-reel-2 · ISHITA15`,
      Link2,
    ],
    [`${fee} held in escrow`, "6 Oct, 10:12", "Part of ₹20,060 paid on invite", WalletCards],
    [
      "Deliverable set by Ananya Mehta",
      "6 Oct, 10:12",
      `1 ${kind} · ${item.name.toLowerCase()} · deadline ${item.deadline} · ${fee} · 30 days organic`,
      ClipboardList,
    ],
  ] as const;

  return (
    <aside className="rounded-xl border border-line bg-white p-5">
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="!m-0 text-[16px] font-semibold leading-6 text-ink">
            {kind} {"\u00b7"} {item.name.toLowerCase()}
          </h2>
          <p className="mt-1 flex items-center gap-1.5 text-[12px] leading-4 text-secondary">
            <PlatformLogo platform={creator.platform} size={16} />
            {creator.platform} {"\u00b7"} {kind} {"\u00b7"} deliverable {index + 1} of{" "}
            {creator.total}
          </p>
          <p className="mt-1 text-[12px] leading-4 text-secondary">
            Vitamin-C Serum {"\u00b7"} 7 Oct {"\u2013"} 7 Nov 2026
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close deliverable detail"
            className="text-secondary hover:text-ink"
          >
            <X size={16} />
          </button>
          <StatusPill status={item.status} />
        </div>
      </header>

      <div
        className="mt-4 flex gap-6 border-b border-line"
        role="tablist"
        aria-label="Deliverable detail"
      >
        {tabs.map((tab) => (
          <button
            type="button"
            role="tab"
            aria-selected={detailTab === tab}
            onClick={() => setDetailTab(tab)}
            key={tab}
            className={`relative pb-3 text-[14px] leading-[22px] ${detailTab === tab ? "font-medium text-ink" : "text-secondary"}`}
          >
            {tab}
            {tab === "Comments" ? (
              <span className="ml-1.5 rounded-full bg-muted px-1.5 py-0.5 text-[12px] leading-4 text-secondary">
                2
              </span>
            ) : null}
            {detailTab === tab ? (
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-ink" />
            ) : null}
          </button>
        ))}
      </div>

      {detailTab === "Content" ? (
        <div className="space-y-4 pt-4">
          <div>
            <p className="text-[14px] font-medium leading-[22px] text-ink">
              {item.live ? "Live post" : "Submitted content"}{" "}
              {waiting ? "· waiting for your approval" : ""}
            </p>
            <p className="mt-0.5 text-[12px] leading-4 text-secondary">
              Posted by {creator.name.split(" ")[0]} on {item.deadline}. Approving releases {fee}.
            </p>
          </div>

          <div className="flex gap-3">
            <div className="relative h-[266px] w-[150px] shrink-0 overflow-hidden rounded-[10px] bg-subtle">
              <img
                src={`/assets/creators/${creator.avatar}.png`}
                alt={`${item.name} submission`}
                className="size-full object-cover"
              />
              <span className="absolute inset-0 bg-black/20" />
              <span className="absolute left-1/2 top-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink">
                <Play size={16} fill="currentColor" />
              </span>
              <span className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-[12px] leading-4 text-white">
                0:41
              </span>
            </div>
            <section className="min-w-0 flex-1 rounded-md border border-line p-3">
              <h3 className="!m-0 text-[14px] font-medium leading-[22px] text-ink">File details</h3>
              <dl className="mt-2 space-y-2">
                {[
                  ["File", `${creator.handle.slice(1)}_results.mp4`],
                  ["Size", "31.2 MB"],
                  ["Format", "MP4 · 9:16"],
                  ["Resolution", "1080 × 1920"],
                  ["Sent", `${item.deadline}, 11:05`],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-[12px] leading-4 text-tertiary">{label}</dt>
                    <dd className="text-[13px] leading-5 text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>

          <section className="rounded-md bg-subtle p-3">
            <p className="text-[12px] leading-4 text-tertiary">Post caption</p>
            <p className="mt-1 text-[13px] leading-5 text-ink">
              7 days with the Minimalist Vitamin-C Serum, before vs after. Use ISHITA15 for 15% off.
              #minimalistVitaminC #ad
            </p>
          </section>

          <section className="rounded-md border border-line p-3">
            <h3 className="!m-0 text-[14px] font-medium leading-[22px] text-ink">Live post</h3>
            <dl className="mt-2 space-y-2 text-[13px] leading-5">
              <div className="flex justify-between gap-3">
                <dt className="text-secondary">Post link</dt>
                <dd className="truncate text-primary">instagram.com/reel/C9xIshita3</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-secondary">Went live</dt>
                <dd className="text-ink">{item.deadline}, 18:30</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-secondary">Tracking link</dt>
                <dd>
                  <span className="inline-flex items-center gap-1 rounded-full bg-success-bg px-2 py-0.5 text-[12px] font-medium leading-4 text-success">
                    <span className="size-1.5 rounded-full bg-current" />
                    Connected
                  </span>
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-secondary">Coupon</dt>
                <dd className="text-ink">ISHITA15 · 47 orders</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-secondary">Last synced</dt>
                <dd className="text-ink">28 Oct, 16:20 · 18 min ago</dd>
              </div>
            </dl>
          </section>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="flex h-10 items-center gap-2 rounded-md border border-line bg-white px-4 text-[14px] font-medium text-ink"
            >
              <MessageSquare size={16} />
              Request changes
            </button>
            <button
              type="button"
              className="flex h-10 items-center gap-2 rounded-md bg-ink px-4 text-[14px] font-medium text-white"
            >
              <Check size={16} />
              Approve {"\u00b7"} {fee}
            </button>
          </div>
          <button
            type="button"
            className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-line bg-white px-4 text-[14px] font-medium text-ink"
          >
            <ExternalLink size={16} />
            View post performance
          </button>
        </div>
      ) : detailTab === "Comments" ? (
        <div className="space-y-4 pt-4">
          <div>
            <p className="text-[14px] font-medium leading-[22px] text-ink">
              Comments on this deliverable
            </p>
            <p className="mt-0.5 text-[12px] leading-4 text-secondary">
              Visible to the creator {"\u00b7"} also shown in Messages
            </p>
          </div>

          <div className="space-y-3">
            {thread.map((entry, entryIndex) => (
              <div className="flex items-start gap-2.5" key={`${entry.author}-${entryIndex}`}>
                {entry.tone === "brand" ? (
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary-muted text-[11px] font-medium text-primary">
                    AM
                  </span>
                ) : (
                  <img
                    src={`/assets/creators/${creator.avatar}.png`}
                    alt=""
                    className="size-8 shrink-0 rounded-full object-cover"
                  />
                )}
                <div
                  className={`min-w-0 flex-1 rounded-md p-3 ${entry.tone === "brand" ? "bg-primary-subtle" : "bg-subtle"}`}
                >
                  <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
                    <b className="text-[14px] font-medium leading-[22px] text-ink">
                      {entry.author}
                    </b>
                    <span className="text-[12px] leading-4 text-tertiary">{entry.meta}</span>
                  </div>
                  <p className="mt-1 text-[13px] leading-5 text-ink">{entry.body}</p>
                  {"attachment" in entry ? (
                    <span className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-line bg-white px-2 py-1.5 text-[12px] leading-4 text-secondary">
                      <Paperclip size={14} />
                      {entry.attachment}
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-md border border-line p-3">
            <textarea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Write a comment… mention a time in the video, e.g. 0:12"
              className="min-h-16 w-full resize-y border-0 bg-transparent p-0 text-[13px] leading-5 text-ink placeholder:text-tertiary focus:outline-none"
            />
            <div className="mt-2 flex items-center gap-2">
              <button
                type="button"
                aria-label="Attach a file"
                className="text-secondary hover:text-ink"
              >
                <Paperclip size={16} />
              </button>
              <span className="flex-1" />
              <button
                type="button"
                disabled={!comment.trim()}
                onClick={() => {
                  const body = comment.trim();
                  if (!body) return;
                  setThread((entries) => [
                    ...entries,
                    { author: "Ananya Mehta", meta: "Minimalist · now", body, tone: "brand" },
                  ]);
                  setComment("");
                }}
                className="flex h-8 items-center gap-1.5 rounded-md bg-ink px-3 text-[13px] font-medium leading-[18px] text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send size={14} />
                Send
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              className="flex h-10 items-center justify-center gap-2 rounded-md border border-line bg-white px-3 text-[14px] font-medium text-ink"
            >
              <MessageSquare size={16} />
              Request changes
            </button>
            <button
              type="button"
              className="flex h-10 items-center justify-center gap-2 rounded-md bg-ink px-3 text-[14px] font-medium text-white"
            >
              <Check size={16} />
              Approve {"\u00b7"} {fee}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 pt-4">
          <div>
            <p className="text-[14px] font-medium leading-[22px] text-ink">History</p>
            <p className="mt-0.5 text-[12px] leading-4 text-secondary">
              Every change to this deliverable, newest first
            </p>
          </div>

          <ol>
            {historyEvents.map(([title, timestamp, description, Icon], eventIndex) => (
              <li className="flex gap-3" key={title}>
                <div className="flex w-7 shrink-0 flex-col items-center">
                  <span className="grid size-7 place-items-center rounded-full border border-[#e3e5ec] bg-[#f4f6fb] text-[#667085]">
                    {eventIndex === 1 ? (
                      <PlatformLogo platform={creator.platform} size={16} />
                    ) : (
                      <Icon size={14} strokeWidth={1.8} />
                    )}
                  </span>
                  {eventIndex < historyEvents.length - 1 ? (
                    <span className="h-[22px] w-0.5 bg-[#e3e5ec]" />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1 pb-3 pt-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[14px] font-medium leading-[22px] text-ink">{title}</p>
                    <time className="shrink-0 text-[12px] leading-4 text-tertiary">
                      {timestamp}
                    </time>
                  </div>
                  <p className="mt-0.5 text-[12px] leading-4 text-secondary">{description}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              className="flex h-10 items-center justify-center gap-2 rounded-md border border-line bg-white px-3 text-[14px] font-medium text-ink"
            >
              <MessageSquare size={16} />
              Request changes
            </button>
            <button
              type="button"
              className="flex h-10 items-center justify-center gap-2 rounded-md bg-ink px-3 text-[14px] font-medium text-white"
            >
              <Check size={16} />
              Approve {"\u00b7"} {fee}
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}

function DeliverablesListTab({ creator, project }: { creator: CreatorDetail; project: Project }) {
  const rules = getProjectRules(project);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  return (
    <div
      className={`mt-4 grid items-start gap-5 ${selectedIndex !== null ? "xl:grid-cols-[minmax(0,1fr)_420px]" : ""}`}
    >
      <section
        className={`rounded-xl border border-line bg-white p-5 ${selectedIndex !== null ? "xl:sticky xl:top-6" : ""}`}
      >
        <header className="mb-4">
          <h2 className="!m-0 text-[16px] font-semibold leading-6 text-ink">Deliverables</h2>
          <p className="mt-0.5 text-[12px] leading-4 text-secondary">
            {`Track each ${rules.item} from brief to ${rules.isFileBased ? "delivery" : "live post"}`}
          </p>
        </header>

        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full min-w-[780px] border-collapse text-left">
            <thead className="bg-subtle text-[12px] font-semibold leading-4 text-secondary">
              <tr>
                <th className="w-[46px] px-4 py-2.5">#</th>
                <th className="px-4 py-2.5">Deliverable</th>
                <th className="w-[128px] whitespace-nowrap px-4 py-2.5">Status</th>
                <th className="w-[116px] whitespace-nowrap px-4 py-2.5">{rules.liveColumnLabel}</th>
                <th className="w-[116px] px-4 py-2.5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {creator.deliverables.map((item, index) => (
                <tr className="border-t border-subtle" key={item.name}>
                  <td className="px-4 py-3 text-[14px] font-medium leading-[22px] text-ink">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={`/assets/creators/${creator.avatar}.png`}
                        alt=""
                        className="size-12 rounded-md object-cover"
                      />
                      <div>
                        <p className="text-[14px] font-medium leading-[22px] text-ink">
                          {item.name}
                        </p>
                        <span className="mt-0.5 flex items-center gap-1.5 text-[12px] leading-4 text-secondary">
                          <PlatformLogo platform={creator.platform} size={16} />
                          {item.type.split("\u00b7")[0].trim()} {"\u00b7"} due {item.deadline}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <StatusPill status={item.status} />
                  </td>
                  <td className="px-4 py-3">
                    {item.live ? (
                      <span className="flex whitespace-nowrap items-center gap-1.5 text-[13px] leading-5 text-ink">
                        <PlatformLogo platform={creator.platform} size={16} />
                        {item.deadline}
                      </span>
                    ) : (
                      <span className="flex whitespace-nowrap items-center gap-1.5 text-[13px] leading-5 text-secondary">
                        <span className="size-3.5 rounded-full border border-secondary" />
                        {rules.isFileBased ? "Not delivered yet" : "Not live yet"}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setSelectedIndex(index)}
                        className="h-8 rounded-md border border-line bg-white px-3 text-[13px] font-medium leading-[18px] text-ink hover:bg-subtle"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        aria-label={`More actions for ${item.name}`}
                        className="grid size-8 place-items-center rounded-md border border-line bg-white text-secondary hover:bg-subtle"
                      >
                        <Ellipsis size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {selectedIndex !== null ? (
        <DeliverableDetailPanel
          creator={creator}
          item={creator.deliverables[selectedIndex]}
          index={selectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      ) : null}
    </div>
  );
}

function PaymentPill({
  label,
  tone,
}: {
  label: string;
  tone: "success" | "warning" | "info" | "neutral";
}) {
  const styles = {
    success: "bg-[#e1fce3] text-[#16a34a]",
    warning: "bg-[#feefce] text-[#f59e0b]",
    info: "bg-[#f1f4ff] text-[#3b5bff]",
    neutral: "bg-[#f4f6fb] text-[#4a4a55]",
  };
  return (
    <span
      className={`inline-flex whitespace-nowrap items-center gap-1.5 rounded-full px-2 py-0.5 text-[12px] font-medium leading-4 ${styles[tone]}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

function inr(value: number) {
  return `\u20b9${value.toLocaleString("en-IN")}`;
}

function PaymentsTab({ creator, project }: { creator: CreatorDetail; project: Project }) {
  const rules = getProjectRules(project);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (selectedIndex !== null) {
    return (
      <PaymentsSplitView
        creator={creator}
        selectedIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
      />
    );
  }

  const creatorFee = Number(creator.fee.replace(/[^\d]/g, ""));
  const gst = Math.round(creatorFee * 0.18);
  const invoiceTotal = creatorFee + gst;
  const approvedDates = ["19 Oct", "21 Oct", "-"];

  return (
    <section className="mt-4 rounded-xl border border-line bg-white p-5">
      <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="!m-0 text-[16px] font-semibold leading-6 text-ink">
            Deliverables &amp; payments
          </h2>
          <p className="mt-0.5 text-[12px] leading-4 text-secondary">
            You paid {inr(invoiceTotal)} on 6 Oct. Each fee is held in escrow and released when you
            approve that deliverable.
          </p>
        </div>
        <button
          type="button"
          className="flex h-8 items-center gap-1.5 rounded-md border border-line bg-white px-3 text-[13px] font-medium leading-[18px] text-ink transition-colors hover:bg-subtle"
        >
          <Download size={16} />
          Download invoice
        </button>
      </header>

      <div className="overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[1060px] border-collapse text-left">
          <thead className="bg-subtle text-[12px] font-semibold leading-4 text-secondary">
            <tr>
              <th className="w-[42px] px-4 py-2.5">#</th>
              <th className="min-w-[230px] px-4 py-2.5">Deliverable</th>
              <th className="w-[74px] px-3 py-2.5">Type</th>
              <th className="w-[126px] px-3 py-2.5">Platform</th>
              <th className="w-[94px] px-3 py-2.5 text-right">
                {rules.isGift ? "Kit value" : "Amount"}
              </th>
              <th className="w-[158px] px-3 py-2.5">Content status</th>
              <th className="w-[132px] px-3 py-2.5">
                {rules.isGift ? "Shipment" : "Payment status"}
              </th>
              <th className="w-[104px] px-3 py-2.5">
                {rules.isGift ? "Delivered on" : "Approved on"}
              </th>
              <th className="w-[82px] px-3 py-2.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {creator.deliverables.map((item, index) => {
              const [type, amount] = item.type.split("\u00b7").map((part) => part.trim());
              const isReleased = item.status === "Approved \u00b7 paid";
              const content = isReleased
                ? "Live \u00b7 approved"
                : item.status === "Awaiting approval"
                  ? "Awaiting approval"
                  : "Not started";
              return (
                <tr className="border-t border-subtle" key={item.name}>
                  <td className="px-4 py-3 text-[14px] font-medium leading-[22px] text-ink">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={`/assets/creators/${creator.avatar}.png`}
                        alt=""
                        className="size-12 rounded-md object-cover"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-[14px] font-medium leading-[22px] text-ink">
                          {item.name}
                        </p>
                        <p className="truncate text-[12px] leading-4 text-secondary">
                          {index === 0
                            ? "Main project"
                            : type === "Story"
                              ? "3–4 story frames"
                              : "Before / after"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-[13px] leading-5 text-ink">
                    {type}
                  </td>
                  <td className="px-3 py-3">
                    <span className="flex items-center gap-1.5 whitespace-nowrap text-[13px] leading-5 text-ink">
                      <PlatformLogo platform={creator.platform} size={16} />
                      {creator.platform}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-right text-[13px] font-medium leading-5 text-ink">
                    {amount}
                  </td>
                  <td className="px-3 py-3">
                    <PaymentPill
                      label={content}
                      tone={
                        isReleased
                          ? "success"
                          : item.status === "Awaiting approval"
                            ? "info"
                            : "neutral"
                      }
                    />
                  </td>
                  <td className="px-3 py-3">
                    <PaymentPill
                      label={
                        rules.isGift
                          ? isReleased
                            ? "Delivered"
                            : "In transit"
                          : isReleased
                            ? "Released"
                            : "In escrow"
                      }
                      tone={isReleased ? "success" : "warning"}
                    />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-[13px] leading-5 text-ink">
                    {isReleased ? (approvedDates[index] ?? "-") : "-"}
                  </td>
                  <td className="px-3 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedIndex(index)}
                      className="h-8 rounded-md border border-line bg-white px-3 text-[13px] font-medium leading-[18px] text-ink transition-colors hover:bg-subtle"
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="bg-subtle">
            <tr>
              <td colSpan={9} className="px-4 py-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-[14px] font-medium leading-[22px] text-ink">
                    Total fee {creator.fee} <span className="text-secondary">·</span>{" "}
                    {creator.released} released <span className="text-secondary">·</span>{" "}
                    {creator.escrow} in escrow
                  </p>
                  <p className="text-[12px] leading-4 text-secondary">
                    + {inr(gst)} GST (18%) = {inr(invoiceTotal)} · no Kreyio fee paid by UPI
                  </p>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <p className="mt-4 flex items-center gap-2 text-[12px] leading-4 text-secondary">
        <Clock3 size={14} className="shrink-0" />
        If a deliverable isn't posted by 7 Nov, its fee is refunded to you automatically.
      </p>
    </section>
  );
}

function PaymentsSplitView({
  creator,
  selectedIndex,
  onClose,
}: {
  creator: CreatorDetail;
  selectedIndex: number;
  onClose: () => void;
}) {
  const [detailTab, setDetailTab] = useState<"Details" | "Receipt" | "History">("Details");
  const selected = creator.deliverables[selectedIndex];
  const [type, amount] = selected.type.split("\u00b7").map((part) => part.trim());
  const amountValue = Number(amount.replace(/[^\d]/g, ""));
  const gst = Math.round(amountValue * 0.18);
  const released = selected.status === "Approved \u00b7 paid";
  const tabs = ["Details", "Receipt", "History"] as const;

  return (
    <div className="mt-4 grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
      <section className="rounded-xl border border-line bg-white p-5 xl:sticky xl:top-6">
        <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="!m-0 text-[16px] font-semibold leading-6 text-ink">
              Deliverables &amp; payments
            </h2>
            <p className="mt-0.5 text-[12px] leading-4 text-secondary">
              You paid for this invite on 6 Oct. Each fee is released when you approve it.
            </p>
          </div>
          <button
            type="button"
            className="flex h-8 items-center gap-1.5 rounded-md border border-line bg-white px-3 text-[13px] font-medium leading-[18px] text-ink transition-colors hover:bg-subtle"
          >
            <Download size={16} />
            Download invoice
          </button>
        </header>

        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full min-w-[590px] border-collapse text-left">
            <thead className="bg-subtle text-[12px] font-semibold leading-4 text-secondary">
              <tr>
                <th className="w-[42px] px-4 py-2.5">#</th>
                <th className="min-w-[240px] px-4 py-2.5">Deliverable</th>
                <th className="w-[90px] px-3 py-2.5 text-right">Amount</th>
                <th className="w-[132px] px-3 py-2.5">Payment status</th>
              </tr>
            </thead>
            <tbody>
              {creator.deliverables.map((item, index) => {
                const [, itemAmount] = item.type.split("\u00b7").map((part) => part.trim());
                const itemReleased = item.status === "Approved \u00b7 paid";
                return (
                  <tr
                    className={`border-t border-subtle ${index === selectedIndex ? "bg-[#f1f4ff]" : ""}`}
                    key={item.name}
                  >
                    <td className="px-4 py-3 text-[14px] font-medium leading-[22px] text-ink">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={`/assets/creators/${creator.avatar}.png`}
                          alt=""
                          className="size-12 rounded-md object-cover"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-[14px] font-medium leading-[22px] text-ink">
                            {item.name}
                          </p>
                          <p className="truncate text-[12px] leading-4 text-secondary">
                            {index === 0
                              ? "Main project"
                              : item.type.startsWith("Story")
                                ? "3–4 story frames"
                                : "Before / after"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-right text-[13px] font-medium leading-5 text-ink">
                      {itemAmount}
                    </td>
                    <td className="px-3 py-3">
                      <PaymentPill
                        label={itemReleased ? "Released" : "In escrow"}
                        tone={itemReleased ? "success" : "warning"}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-subtle">
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-3 text-[14px] font-medium leading-[22px] text-ink"
                >
                  Total fee {creator.fee} <span className="text-secondary">·</span>{" "}
                  {creator.released} released <span className="text-secondary">·</span>{" "}
                  {creator.escrow} in escrow
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <p className="mt-4 flex items-center gap-2 text-[12px] leading-4 text-secondary">
          <Clock3 size={14} className="shrink-0" />
          If a deliverable isn't posted by 7 Nov, its fee is refunded to you automatically.
        </p>
      </section>

      <aside className="rounded-xl border border-line bg-white p-5">
        <header className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="!m-0 truncate text-[16px] font-semibold leading-6 text-ink">
              Payment · {selected.name}
            </h2>
            <p className="mt-1 flex items-center gap-1.5 text-[12px] leading-4 text-secondary">
              <PlatformLogo platform={creator.platform} size={16} />
              {creator.platform} · {type} · deliverable {selectedIndex + 1} of {creator.total}
            </p>
            <p className="mt-1 text-[12px] leading-4 text-secondary">
              Vitamin-C Serum · 7 Oct – 7 Nov 2026
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2">
            <button
              type="button"
              aria-label="Close payment details"
              onClick={onClose}
              className="grid size-5 place-items-center rounded text-secondary transition-colors hover:bg-subtle hover:text-ink"
            >
              <X size={16} />
            </button>
            <PaymentPill
              label={released ? "Released" : "In escrow"}
              tone={released ? "success" : "warning"}
            />
          </div>
        </header>

        <div
          className="mt-4 flex gap-6 border-b border-line"
          role="tablist"
          aria-label="Payment detail tabs"
        >
          {tabs.map((tab) => (
            <button
              type="button"
              role="tab"
              aria-selected={detailTab === tab}
              onClick={() => setDetailTab(tab)}
              className={`relative pb-3 text-[14px] leading-[22px] ${detailTab === tab ? "font-medium text-ink" : "text-secondary"}`}
              key={tab}
            >
              {tab}
              {detailTab === tab ? (
                <i className="absolute inset-x-0 bottom-0 h-0.5 bg-ink" />
              ) : null}
            </button>
          ))}
        </div>

        {detailTab === "Details" ? (
          <div className="space-y-4 pt-4">
            <PaymentInfoCard
              title="Amount"
              rows={[
                ["Fee", amount],
                ["GST (18%)", inr(gst)],
                ["You paid", inr(amountValue + gst)],
              ]}
            />
            <PaymentInfoCard
              title="Escrow"
              rows={[
                ["Funded in escrow", "6 Oct"],
                [`${type} posted`, selected.live ? selected.deadline : "–"],
                ["Approved on", released ? selected.deadline : "–"],
                [`Released to ${creator.name.split(" ")[0]}`, released ? selected.deadline : "–"],
                ["Refunded if not posted by", "7 Nov"],
              ]}
            />
          </div>
        ) : detailTab === "Receipt" ? (
          <div className="pt-4">
            <PaymentInfoCard
              title="Payment receipt"
              rows={[
                ["Payment method", "UPI · minimalist@okhdfcbank"],
                ["Payment ID", `FLO-${creator.handle.slice(1).toUpperCase()}-${selectedIndex + 1}`],
                ["Paid on", "6 Oct 2026, 10:12"],
                ["Invoice total", inr(amountValue + gst)],
              ]}
            />
          </div>
        ) : (
          <ol className="space-y-4 pt-4">
            {[
              ["Fee funded in escrow", "6 Oct, 10:12"],
              [
                `${type} ${selected.live ? "posted" : "scheduled"}`,
                selected.live ? `${selected.deadline}, 18:30` : "Due 7 Nov",
              ],
              [
                released ? "Payment released to creator" : "Waiting for approval",
                released ? selected.deadline : "Now",
              ],
            ].map(([event, timestamp], eventIndex, events) => (
              <li className="flex gap-3" key={event}>
                <div className="flex w-7 shrink-0 flex-col items-center">
                  <span className="grid size-7 place-items-center rounded-full border border-[#e3e5ec] bg-[#f4f6fb] text-[#667085]">
                    {eventIndex === 1 ? (
                      <PlatformLogo platform={creator.platform} size={16} />
                    ) : (
                      <WalletCards size={14} strokeWidth={1.8} />
                    )}
                  </span>
                  {eventIndex < events.length - 1 ? (
                    <span className="h-7 w-0.5 bg-[#e3e5ec]" />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1 pt-1">
                  <p className="text-[14px] font-medium leading-[22px] text-ink">{event}</p>
                  <p className="text-[12px] leading-4 text-secondary">{timestamp}</p>
                </div>
              </li>
            ))}
          </ol>
        )}

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            className="flex h-10 items-center justify-center gap-2 rounded-md border border-line bg-white px-3 text-[14px] font-medium text-ink"
          >
            <Download size={16} />
            Download receipt
          </button>
          {!released ? (
            <button
              type="button"
              className="flex h-10 flex-1 items-center justify-center gap-2 rounded-md bg-ink px-3 text-[14px] font-medium text-white"
            >
              <Check size={16} />
              Approve · {amount}
            </button>
          ) : null}
        </div>
      </aside>
    </div>
  );
}

function PaymentInfoCard({ title, rows }: { title: string; rows: Array<[string, string]> }) {
  return (
    <section className="rounded-md border border-line p-3">
      <h3 className="!m-0 text-[14px] font-medium leading-[22px] text-ink">{title}</h3>
      <dl className="mt-2 space-y-2">
        {rows.map(([label, value]) => (
          <div
            className="flex items-center justify-between gap-3 text-[13px] leading-5"
            key={label}
          >
            <dt className="min-w-0 text-secondary">{label}</dt>
            <dd className="shrink-0 text-right text-ink">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function ReviewTab({ creator, project }: { creator: CreatorDetail; project: Project }) {
  const rules = getProjectRules(project);
  const criteria = [
    "Content quality",
    "Professionalism",
    "On-time posting",
    rules.isFileBased ? "File quality" : "Engagement",
    "Communication",
    "Creativity",
    "Brand fit",
    "Overall experience",
  ];
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [review, setReview] = useState("");
  const [saved, setSaved] = useState(false);
  const canSave = criteria.every((criterion) => ratings[criterion]) && review.trim().length > 0;

  return (
    <section className="mt-4 w-full max-w-[760px] rounded-xl border border-line bg-white p-5">
      <header>
        <h2 className="!m-0 text-[16px] font-semibold leading-6 text-ink">Leave a review</h2>
        <p className="mt-0.5 text-[12px] leading-4 text-secondary">
          Helps other brands choose creators. {creator.name.split(" ")[0]} sees it after the project
          {rules.isLongTerm ? " reaches the end of the current cycle." : " ends on 7 Nov."}
        </p>
      </header>

      <div className="mt-4 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
        {criteria.map((criterion) => {
          const rating = ratings[criterion] ?? 0;
          return (
            <div className="flex items-center gap-2" key={criterion}>
              <p className="min-w-0 flex-1 text-[14px] leading-[22px] text-ink">{criterion}</p>
              <div className="flex gap-2" aria-label={`${criterion} rating`}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    onClick={() => setRatings((current) => ({ ...current, [criterion]: star }))}
                    aria-label={`Rate ${criterion} ${star} out of 5`}
                    aria-pressed={rating === star}
                    className="grid size-5 place-items-center rounded-sm text-[#a3a3ac] transition-colors hover:text-[#f59e0b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    key={star}
                  >
                    <Star
                      size={20}
                      strokeWidth={1.8}
                      fill={star <= rating ? "#f59e0b" : "none"}
                      className={star <= rating ? "text-[#f59e0b]" : ""}
                    />
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <label
        className="mt-4 block text-[14px] font-medium leading-[22px] text-ink"
        htmlFor="creator-review"
      >
        Written review
      </label>
      <textarea
        id="creator-review"
        value={review}
        onChange={(event) => {
          setReview(event.target.value);
          setSaved(false);
        }}
        placeholder={`Share what it was like working with ${creator.name.split(" ")[0]}…`}
        className="mt-2 h-[110px] w-full resize-none rounded-md border border-line bg-white p-3 text-[14px] leading-[22px] text-ink outline-none placeholder:text-tertiary focus:border-primary"
      />

      <footer className="mt-4 flex flex-wrap items-center gap-2.5">
        <p className="min-w-[220px] flex-1 text-[12px] leading-4 text-secondary">
          {saved
            ? "Review saved. Thank you for sharing your experience."
            : "Rate all eight and write a few lines to save."}
        </p>
        <button
          type="button"
          onClick={() => {
            setRatings({});
            setReview("");
            setSaved(false);
          }}
          className="h-10 rounded-md border border-line bg-white px-4 text-[14px] font-medium text-ink transition-colors hover:bg-subtle"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={!canSave}
          onClick={() => setSaved(true)}
          className="h-10 rounded-md bg-ink px-4 text-[14px] font-medium text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-45"
        >
          Save review
        </button>
      </footer>
    </section>
  );
}

function PerformanceEmptyTab({ onViewDeliverables }: { onViewDeliverables: () => void }) {
  const scorecards = [
    "Net sales",
    "Orders",
    "Link clicks",
    "Engagement rate",
    "Views",
    "Earned media value",
  ];

  return (
    <div className="mt-4 space-y-4">
      <section className="overflow-hidden rounded-xl border border-line bg-white">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {scorecards.map((label, index) => (
            <div
              className={`relative min-h-[118px] p-[18px] ${index === 0 ? "bg-[#f1f4ff]" : "bg-white"}`}
              key={label}
            >
              <p
                className={`text-[13px] leading-5 ${index === 0 ? "text-primary" : "text-secondary"}`}
              >
                {label}
              </p>
              <p
                className={`mt-1.5 font-semibold text-ink ${index === 5 ? "text-[22px] leading-8" : "text-[16px] leading-6"}`}
              >
                –
              </p>
              <p className="mt-1.5 text-[12px] leading-4 text-[#a2a7b3]">Waiting for first post</p>
              {index === 0 ? (
                <span className="absolute inset-x-[18px] bottom-[18px] h-[3px] bg-ink" />
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="flex min-h-[226px] flex-col items-center justify-center gap-4 rounded-xl border border-[#edeff3] bg-white px-10 py-12 text-center">
        <span className="grid size-14 place-items-center rounded-[28px] bg-[#eff4ff] text-primary">
          <ChartNoAxesCombined size={24} strokeWidth={1.8} />
        </span>
        <h2 className="!m-0 text-[20px] font-semibold leading-7 text-[#070b13]">
          No performance data yet
        </h2>
        <button
          type="button"
          onClick={onViewDeliverables}
          className="rounded-md bg-[#3b5bff] px-4 py-2.5 text-[14px] font-semibold leading-5 text-white transition-colors hover:bg-[#2949e9]"
        >
          View deliverables
        </button>
      </section>
    </div>
  );
}

function NextActions({ onApprove }: { onApprove: () => void }) {
  const tasks = [
    [
      "Approve 1 Reel",
      "Results after 7 days · waiting up to 52 h · releases ₹3,000 from escrow",
      "Overdue",
      "danger",
    ],
    ["Nudge Ishita", "Last-day reminder · Story is due 30 Oct and not started", "Today", "amber"],
    ["Review 1 change request", "Ishita re-submitted a Story", "In 2 d", "amber"],
  ] as const;
  return (
    <Panel title="Next actions" subtitle="3 things need you · sorted by urgency">
      <div className="divide-y divide-line">
        {tasks.map(([title, description, due, tone], index) => (
          <button
            type="button"
            onClick={index === 0 ? onApprove : undefined}
            className="flex w-full items-center justify-between gap-3 py-3 text-left first:pt-0 last:pb-0"
            key={title}
          >
            <span>
              <b className="block text-[12px] leading-4 text-ink">{title}</b>
              <small className="mt-1 block text-[10px] leading-4 text-secondary">
                {description}
              </small>
            </span>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${tone === "danger" ? "bg-danger-subtle text-danger" : "bg-[#fff3da] text-[#b56d00]"}`}
            >
              {due}
            </span>
          </button>
        ))}
      </div>
    </Panel>
  );
}

function Budget({ creator, project }: { creator: CreatorDetail; project: Project }) {
  const rules = getProjectRules(project);
  const rows = [
    [rules.isGift ? "Shipped" : "Paid to creator", creator.released, "75%", "#171a20"],
    [rules.isGift ? "Ships next" : "Held in escrow", creator.escrow, "25%", "#7b6cf6"],
    ["Not funded", "₹0", "0%", "#dbe1e8"],
  ];
  return (
    <Panel title="Budget" subtitle={`One-time collab · ${creator.name} · ${creator.fee} fee`}>
      <div className="flex items-center gap-4">
        <motion.div
          className="relative grid size-[116px] shrink-0 place-items-center rounded-full"
          style={{ background: "conic-gradient(#7b6cf6 0 90deg, #171a20 90deg 360deg)" }}
          initial={{ scale: 0.7, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid size-[80px] place-items-center rounded-full bg-white text-center">
            <b className="text-[14px] text-ink">{creator.fee}</b>
            <span className="text-[10px] text-secondary">fee</span>
          </div>
        </motion.div>
        <div className="min-w-0 flex-1 space-y-3">
          {rows.map(([label, amount, share, color]) => (
            <div key={label}>
              <div className="flex items-center justify-between gap-2 text-[11px]">
                <span className="flex items-center gap-1.5 text-secondary">
                  <i className="size-2 rounded-full" style={{ background: color }} />
                  {label}
                </span>
                <b className="text-ink">{amount}</b>
              </div>
              <p className="mt-0.5 text-right text-[10px] text-secondary">{share}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex justify-between border-t border-line pt-3 text-[12px]">
        <span className="text-secondary">Total fee</span>
        <b className="text-ink">{creator.fee}</b>
      </div>
    </Panel>
  );
}

function ProjectDetails({
  project,
  creator,
}: {
  project: ReturnType<typeof getProject>;
  creator: CreatorDetail;
}) {
  const rows = [
    ["Type", project.projectType],
    ["Partnership", project.partnership],
    ["Duration", "One-time · 7 Oct – 7 Nov 2026"],
    ["Platforms", creator.platform],
    ["Tracking", "Shopify · code ISHITA15"],
    ["Deliverables", "2 Reels, 2 Stories"],
    ["Usage rights", "Until 7 Dec 2026"],
  ];
  return (
    <Panel title="Project details">
      <dl className="space-y-2.5">
        {rows.map(([label, value]) => (
          <div
            className="grid grid-cols-[86px_minmax(0,1fr)] gap-3 text-[11px] leading-4"
            key={label}
          >
            <dt className="text-secondary">{label}</dt>
            <dd className="text-right font-medium text-ink">{value}</dd>
          </div>
        ))}
      </dl>
    </Panel>
  );
}

function ReportDeliverableModal({
  open,
  creator,
  projectName,
  onClose,
}: {
  open: boolean;
  creator: CreatorDetail;
  projectName: string;
  onClose: () => void;
}) {
  const [action, setAction] = useState("report");
  const [note, setNote] = useState("We sent the product and haven't heard back.");
  const firstName = creator.name.split(" ")[0];
  const facts = [
    ["Product", "Vitamin C Glow Serum × 1 · ₹899 value"],
    ["Delivered", "14 Oct · creator confirmed 15 Oct"],
    ["Post was due", "22 Oct · 6 days late"],
    ["Reminders sent", "18 Oct, 21 Oct, 23 Oct"],
    [`${firstName}'s on-time score`, "88% → would drop to 81%"],
  ];
  if (!open) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
        <motion.button
          type="button"
          aria-label="Close report dialog"
          onClick={onClose}
          className="absolute inset-0 cursor-default bg-ink/40 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        <motion.section
          role="dialog"
          aria-modal="true"
          aria-labelledby="report-deliverable-title"
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative z-10 w-full max-w-[520px] rounded-2xl bg-white p-6 shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
        >
          <header className="flex items-start justify-between gap-3">
            <div>
              <h2
                id="report-deliverable-title"
                className="text-[20px] font-semibold leading-6 text-ink"
              >
                Deliverable not posted
              </h2>
              <p className="mt-1 text-[13px] leading-5 text-secondary">
                {creator.name} · {projectName} · Reel
              </p>
            </div>
            <button
              type="button"
              aria-label="Close dialog"
              onClick={onClose}
              className="grid size-8 place-items-center rounded-md text-secondary hover:bg-subtle hover:text-ink"
            >
              <X size={18} />
            </button>
          </header>

          <dl className="mt-4 overflow-hidden rounded-[10px] border border-line text-[13px]">
            {facts.map(([label, value], index) => (
              <div
                key={label}
                className={`flex items-start justify-between gap-4 px-3 py-2.5 ${index ? "border-t border-line" : ""}`}
              >
                <dt className="text-secondary">{label}</dt>
                <dd className="text-right font-medium text-ink">{value}</dd>
              </div>
            ))}
          </dl>

          <fieldset className="mt-4">
            <legend className="text-[13px] font-medium text-[#394357]">
              What would you like to do?
            </legend>
            <div className="mt-3 space-y-2.5">
              {[
                ["extend", "Give 3 more days"],
                ["return", `Ask ${firstName} to return the product`],
                ["report", "Close this deliverable and report it"],
              ].map(([value, label]) => (
                <label
                  key={value}
                  className="flex cursor-pointer items-center gap-2 text-[13px] text-ink"
                >
                  <input
                    className="sr-only peer"
                    type="radio"
                    name="report-action"
                    value={value}
                    checked={action === value}
                    onChange={() => setAction(value)}
                  />
                  <span className="grid size-[18px] place-items-center rounded-full border-2 border-line peer-checked:border-primary">
                    <span
                      className={`size-2 rounded-full bg-primary ${action === value ? "block" : "hidden"}`}
                    />
                  </span>
                  {label}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="mt-4 block text-[12px] font-medium leading-4 text-ink">
            Note to {firstName} (optional)
            <input
              value={note}
              onChange={(event) => setNote(event.target.value)}
              className="mt-1.5 h-10 w-full rounded-md border border-line bg-white px-3 text-[13px] font-normal text-ink outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </label>

          <aside className="mt-4 flex gap-2.5 rounded-md bg-warning-bg px-3.5 py-3">
            <TriangleAlert size={18} className="mt-0.5 shrink-0 text-warning" />
            <div>
              <h3 className="text-[14px] font-medium leading-[22px] text-ink">
                {firstName} gets 48 hours to reply
              </h3>
              <p className="text-[13px] leading-5 text-ink">
                If there’s no reply, the report stands: the on-time score drops and gift projects
                pause for 60 days. Kreyio reviews repeat cases.
              </p>
            </div>
          </aside>

          <footer className="mt-6 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="h-10 rounded-md border border-line bg-white px-4 text-[14px] font-medium text-ink hover:bg-subtle"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onClose}
              className="h-10 rounded-md bg-danger px-4 text-[14px] font-medium text-white hover:bg-danger/90"
            >
              Report not posted
            </button>
          </footer>
        </motion.section>
      </div>
    </AnimatePresence>,
    document.body,
  );
}

export function BrandInvitedCreatorPage() {
  const navigate = useNavigate();
  const { projectId = "1", creatorId = "ishita" } = useParams();
  const project = getProject(Number(projectId));
  const creator = useMemo(
    () => creatorDetails[creatorId] ?? fallbackCreator(creatorId),
    [creatorId],
  );
  const [tab, setTab] = useState("Overview");
  const [performancePlatform, setPerformancePlatform] = useState("All platforms");
  const [approved, setApproved] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const tabs = ["Overview", "Deliverables", "Payments", "Review", "Performance"];
  const alternateMessage = {
    Deliverables: "Every deliverable and its current status is shown in the overview table.",
    Payments: `${creator.released} is released; ${creator.escrow} remains held in escrow.`,
    Review: approved
      ? "The Reel is approved and release has been queued."
      : "One submitted Reel is waiting for your approval.",
    Performance: "Performance becomes available as each approved deliverable goes live.",
  } as const;

  return (
    <BrandShell>
      <div className="w-full pb-10">
        <nav
          className="flex flex-wrap items-center gap-2 text-[12px] leading-4 text-secondary"
          aria-label="Breadcrumb"
        >
          <Link to="/brand/projects" className="hover:text-primary">
            Projects
          </Link>
          <span>/</span>
          <Link to={brandProjectRoute(project.id)} className="hover:text-primary">
            {project.name}
          </Link>
          <span>/</span>
          <Link to={brandProjectRoute(project.id)} className="hover:text-primary">
            Invited creators
          </Link>
          <span>/</span>
          <span className="text-ink">{creator.name}</span>
        </nav>
        <header className="mt-3 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <img
                src={`/assets/creators/${creator.avatar}.png`}
                alt=""
                className="size-8 rounded-full object-cover"
              />
              <h1 className="!m-0 text-[28px] font-bold leading-8 tracking-[-.02em] text-ink">
                {creator.name}
              </h1>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <StatusPill status={creator.status} />
              {creator.channels.map((label) => (
                <span
                  className="rounded-full bg-muted px-2 py-0.5 text-[12px] font-medium leading-4 text-secondary"
                  key={label}
                >
                  <span className="mr-1 text-[10px]">{"\u2022"}</span>
                  {label}
                </span>
              ))}
            </div>
            <p className="mt-1 text-[13px] leading-5 text-secondary">
              {creator.handle} {"\u00b7"} Skincare creator {"\u00b7"} {creator.city} {"\u00b7"}{" "}
              {project.name} {"\u00b7"} 7 Oct {"\u2013"} 7 Nov 2026
            </p>
            <p className="hidden">
              <StatusPill status={creator.status} />
              <span className="ml-2">Instagram 1.1 L · YouTube 18K · Skincare</span>
              <span className="ml-2">
                {creator.handle} · {creator.city} · {project.name} · 7 Oct – 7 Nov 2026
              </span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <DateRangePicker value="7 Oct - 28 Oct 2026" showCompare={false} />
            <button
              type="button"
              className="flex h-10 items-center gap-2 rounded-md border border-line bg-white px-3 text-[13px] font-medium text-ink"
              onClick={() => {
                window.location.href = `mailto:?subject=${encodeURIComponent(`${project.name} collaboration — ${creator.name}`)}`;
              }}
            >
              <MessageSquare size={16} />
              Message
            </button>
            <button
              type="button"
              onClick={() => navigate(brandCreatorDeliverablesRoute(project.id, creatorId))}
              className="flex h-10 items-center gap-2 rounded-md bg-ink px-3 text-[13px] font-medium text-white"
            >
              <Pencil size={16} />
              Edit deliverables
            </button>
            <div className="relative">
              <button
                type="button"
                aria-label="More actions"
                aria-expanded={moreOpen}
                onClick={() => setMoreOpen((current) => !current)}
                className="grid size-10 place-items-center rounded-md border border-line bg-white text-secondary transition hover:bg-subtle hover:text-ink"
              >
                <Ellipsis size={18} />
              </button>
              {moreOpen && (
                <div className="absolute right-0 top-[calc(100%+6px)] z-30 min-w-[176px] rounded-lg border border-line bg-white p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                  <button
                    type="button"
                    onClick={() => {
                      setMoreOpen(false);
                      setReportOpen(true);
                    }}
                    className="flex h-9 w-full items-center gap-2 rounded-md px-2.5 text-left text-[13px] font-medium text-danger transition hover:bg-danger-subtle"
                  >
                    <Flag size={16} />
                    Report deliverable
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        <div className="mt-4 flex gap-6 overflow-x-auto border-b border-line" role="tablist">
          {tabs.map((item) => (
            <button
              type="button"
              role="tab"
              aria-selected={tab === item}
              onClick={() => setTab(item)}
              className={`relative shrink-0 border-0 bg-transparent pb-3 text-[14px] leading-[22px] ${tab === item ? "font-medium text-ink" : "text-secondary hover:text-primary"}`}
              key={item}
            >
              {item}
              {item === "Deliverables" ? (
                <span className="ml-1.5 rounded-full bg-muted px-1.5 py-0.5 text-[12px] leading-4 text-secondary">
                  {creator.total}
                </span>
              ) : null}
              {tab === item ? <i className="absolute inset-x-0 bottom-0 h-0.5 bg-ink" /> : null}
            </button>
          ))}
          {tab === "Performance" ? (
            <div className="ml-auto flex shrink-0 items-center gap-2 pb-1">
              <span className="text-[12px] font-medium text-[#8491a3]">View by platform</span>
              <Dropdown
                compact
                ariaLabel="View performance by platform"
                className="w-[142px]"
                value={performancePlatform}
                onChange={setPerformancePlatform}
                options={["All platforms", "Instagram", "YouTube", "Pinterest", "Snapchat"]}
              />
              <button
                type="button"
                aria-label="Download performance report"
                className="grid size-8 place-items-center rounded-md border border-line bg-white text-secondary transition-colors hover:bg-subtle hover:text-ink"
              >
                <Download size={16} />
              </button>
            </div>
          ) : null}
        </div>
        {tab === "Deliverables" ? (
          <DeliverablesListTab creator={creator} project={project} />
        ) : tab === "Payments" ? (
          <PaymentsTab creator={creator} project={project} />
        ) : tab === "Review" ? (
          <ReviewTab creator={creator} project={project} />
        ) : tab === "Performance" ? (
          creator.hasPerformance ? (
            <CreatorPerformanceTab creatorName={creator.name} platform={creator.platform} />
          ) : (
            <PerformanceEmptyTab onViewDeliverables={() => setTab("Deliverables")} />
          )
        ) : tab !== "Overview" ? (
          <section className="mt-4 rounded-xl border border-line bg-white p-5">
            <h2 className="!m-0 text-[15px] font-bold leading-tight text-ink">{tab}</h2>
            <p className="mt-2 text-[12px] text-secondary">
              {alternateMessage[tab as keyof typeof alternateMessage]}
            </p>
          </section>
        ) : (
          <>
            <div className="mt-4">
              <Timeline creator={creator} project={project} />
            </div>
            <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.8fr)_minmax(290px,.9fr)]">
              <main className="space-y-4">
                <DeliverableProgress creator={creator} project={project} />
                <Pipeline onView={() => setTab("Deliverables")} />
                <Deliverables creator={creator} onViewAll={() => setTab("Deliverables")} />
              </main>
              <aside className="space-y-4">
                <NextActions onApprove={() => setApproved(true)} />
                <Budget creator={creator} project={project} />
                <ProjectDetails project={project} creator={creator} />
              </aside>
            </div>
          </>
        )}
      </div>
      <ReportDeliverableModal
        open={reportOpen}
        creator={creator}
        projectName={project.name}
        onClose={() => setReportOpen(false)}
      />
    </BrandShell>
  );
}
