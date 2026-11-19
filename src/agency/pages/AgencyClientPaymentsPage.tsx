import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownToLine,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  Clock3,
  CreditCard,
  FileText,
  Landmark,
  LockKeyhole,
  ReceiptText,
  Scale,
  UploadCloud,
  WalletCards,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AgencyClientShell } from "@/agency/components/AgencyClientShell";
import { DateRangePicker } from "@/common/components/ui/DateRangePicker";
import { agencyClientPaymentDisputeRoute } from "@/common/constants/routes";

type TransactionState = "Released" | "Held" | "Fee" | "Refunded";

type Transaction = {
  date: string;
  description: string;
  project: string;
  state: TransactionState;
  amount: string;
};

const tabs = [
  "Overview",
  "Collaborations",
  "Invoices",
  "Payment methods",
  "Refunds",
  "Disputes",
] as const;
type PaymentTab = (typeof tabs)[number];

const transactionRows: Transaction[] = [
  {
    date: "28 Oct",
    description: "Meera Iyer · Story with link",
    project: "Vitamin-C Serum",
    state: "Released",
    amount: "₹7,500",
  },
  {
    date: "27 Oct",
    description: "Nisha Verma accepted · held",
    project: "Vitamin-C Serum",
    state: "Held",
    amount: "₹15,356",
  },
  {
    date: "26 Oct",
    description: "18% GST on ₹42,500 releases",
    project: "GST filing",
    state: "Fee",
    amount: "₹7,650",
  },
  {
    date: "24 Oct",
    description: "Tara Bose declined · refunded",
    project: "Monsoon Sunscreen",
    state: "Refunded",
    amount: "₹12,000",
  },
  {
    date: "22 Oct",
    description: "Rohan Desai · YouTube Short",
    project: "Glow Squad",
    state: "Released",
    amount: "₹14,500",
  },
  {
    date: "20 Oct",
    description: "Kavya Reddy · Reel deliverable",
    project: "Lip Tint Drop",
    state: "Released",
    amount: "₹11,000",
  },
];

const upcomingReleases = [
  { date: "31 Oct", detail: "Sneha Patil · 1 Reel", project: "Vitamin-C", amount: "₹12,500" },
  { date: "2 Nov", detail: "Aisha Khan · 2 UGC cuts", project: "Monsoon", amount: "₹10,000" },
  { date: "5 Nov", detail: "Tanvi Shah · Static post", project: "Hydration", amount: "₹6,000" },
];

export type DisputeStatus = "Waiting for you" | "Under review" | "Resolved";

export type Dispute = {
  id: string;
  creator: string;
  avatar: string;
  project: string;
  reason: string;
  amount: string;
  status: DisputeStatus;
  next: string;
};

export const disputes: Dispute[] = [
  {
    id: "DSP-0418",
    creator: "Rohan Desai",
    avatar: "https://www.figma.com/api/mcp/asset/c88ee9d0-1b77-4c07-b379-3ba3c78a3c8e.png",
    project: "Monsoon Sunscreen",
    reason: "Deliverable delay · 6 days",
    amount: "₹7,500",
    status: "Waiting for you",
    next: "Reply by 29 Oct",
  },
  {
    id: "DSP-0421",
    creator: "Tara Bose",
    avatar: "https://www.figma.com/api/mcp/asset/b8377c8e-db83-4a17-91fb-db6ee2e2d93e.png",
    project: "Glow Squad",
    reason: "Brief mismatch · CTA omitted",
    amount: "₹14,000",
    status: "Under review",
    next: "Mediation call today 4:30 PM",
  },
  {
    id: "DSP-0377",
    creator: "Riya Sen",
    avatar: "https://www.figma.com/api/mcp/asset/5231c261-2680-4b24-91ba-68936ad9ad33.png",
    project: "Lip Tint Drop",
    reason: "Deliverable defect · reshot",
    amount: "₹8,000",
    status: "Resolved",
    next: "₹4,000 released · ₹4,000 refunded",
  },
];

const reasons = [
  "Deliverable delay (>5 days overdue)",
  "Brief mismatch (missing brand guidelines or CTA)",
  "Deliverable quality / defect",
  "Creator unresponsive",
  "Unauthorized content reuse",
  "Other",
] as const;

function StatusPill({ state }: { state: TransactionState }) {
  const styles: Record<TransactionState, string> = {
    Released: "bg-[#eaf8ee] text-[#1e8a44]",
    Held: "bg-[#f4f6fb] text-[#4a4a55]",
    Fee: "bg-[#f4f6fb] text-[#4a4a55]",
    Refunded: "bg-[#e7edff] text-primary",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium leading-4 ${styles[state]}`}
    >
      {state}
    </span>
  );
}

function DisputePill({ status }: { status: DisputeStatus }) {
  const styles: Record<DisputeStatus, string> = {
    "Waiting for you": "bg-[#fde4e3] text-[#db231f]",
    "Under review": "bg-[#feefce] text-[#d97706]",
    Resolved: "bg-[#f4f6fb] text-[#4a4a55]",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium leading-4 ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function Tile({
  icon: Icon,
  label,
  value,
  hint,
  tone,
}: {
  icon: typeof Landmark;
  label: string;
  value: string;
  hint: string;
  tone?: "warn" | "neutral";
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-line bg-white p-4">
      <div className="flex items-center gap-2 text-secondary">
        <span className="grid size-8 place-items-center rounded-lg bg-subtle text-ink">
          <Icon size={16} />
        </span>
        <span className="text-[12px] font-medium leading-4">{label}</span>
      </div>
      <div>
        <p className="text-[22px] font-bold leading-7 text-ink">{value}</p>
        <p
          className={`mt-1 text-[12px] leading-4 ${tone === "warn" ? "text-status-warning-fg" : "text-secondary"}`}
        >
          {hint}
        </p>
      </div>
    </div>
  );
}

function SpendChart() {
  const bars = [
    { label: "May", spend: 42, escrow: 18 },
    { label: "Jun", spend: 68, escrow: 22 },
    { label: "Jul", spend: 94, escrow: 28 },
    { label: "Aug", spend: 130, escrow: 36 },
    { label: "Sep", spend: 184, escrow: 44 },
    { label: "Oct", spend: 248, escrow: 62 },
  ];
  const max = 260;

  return (
    <div className="rounded-xl border border-line bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-[16px] font-semibold leading-6 text-ink">Spend over time</h2>
          <p className="mt-0.5 text-[12px] leading-4 text-secondary">
            Monthly released fees vs escrow held (in ₹ thousands)
          </p>
        </div>
        <div className="flex items-center gap-4 text-[12px] text-secondary">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-primary" /> Released
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-[#c7d5ff]" /> Escrow
          </span>
        </div>
      </div>

      <div className="mt-6 flex h-48 items-end gap-3 border-b border-line pb-2 sm:gap-6">
        {bars.map((bar) => {
          const spendH = Math.round((bar.spend / max) * 100);
          const escrowH = Math.round((bar.escrow / max) * 100);
          return (
            <div className="flex flex-1 flex-col items-center gap-2" key={bar.label}>
              <div className="flex w-full max-w-10 items-end justify-center gap-1.5">
                <div
                  className="w-1/2 rounded-t bg-primary transition-all duration-300"
                  style={{ height: `${spendH}%` }}
                  title={`Released ₹${bar.spend}K`}
                />
                <div
                  className="w-1/2 rounded-t bg-[#c7d5ff] transition-all duration-300"
                  style={{ height: `${escrowH}%` }}
                  title={`Escrow ₹${bar.escrow}K`}
                />
              </div>
              <span className="text-[11px] text-secondary">{bar.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function UpcomingCard() {
  return (
    <aside className="rounded-xl border border-line bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-[16px] font-semibold leading-6 text-ink">Upcoming releases</h2>
        <span className="text-[12px] text-secondary">Next 7 days</span>
      </div>
      <p className="mt-1 text-[12px] leading-4 text-secondary">
        Releases trigger automatically upon deliverable approval.
      </p>

      <ul className="mt-4 space-y-3">
        {upcomingReleases.map((item) => (
          <li
            key={item.detail}
            className="flex items-center justify-between gap-3 rounded-lg border border-line p-3"
          >
            <div className="min-w-0">
              <p className="truncate text-[13px] font-medium leading-5 text-ink">{item.detail}</p>
              <p className="text-[12px] leading-4 text-secondary">
                {item.project} · {item.date}
              </p>
            </div>
            <span className="shrink-0 text-[14px] font-semibold leading-5 text-ink">
              {item.amount}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function DisputesBoard({ onOpen }: { onOpen: (dispute: Dispute) => void }) {
  return (
    <section className="rounded-xl border border-line bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-[16px] font-semibold leading-6 text-ink">Active disputes (2)</h2>
          <p className="mt-0.5 text-[12px] leading-4 text-secondary">
            Kreyio holds escrow until disputes are resolved or mutual release is agreed.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-status-warning-bg px-2.5 py-1 text-[12px] font-medium text-status-warning-fg">
          <CircleAlert size={14} /> ₹21,500 held in dispute
        </span>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-[13px]">
          <thead className="border-b border-line bg-subtle text-[12px] text-secondary">
            <tr>
              <th className="px-4 py-2.5 font-medium">Case ID</th>
              <th className="px-4 py-2.5 font-medium">Creator</th>
              <th className="px-4 py-2.5 font-medium">Project</th>
              <th className="px-4 py-2.5 font-medium">Reason</th>
              <th className="px-4 py-2.5 font-medium">Amount</th>
              <th className="px-4 py-2.5 font-medium">Status</th>
              <th className="px-4 py-2.5 font-medium">Next step</th>
              <th className="px-4 py-2.5 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {disputes.map((dispute) => (
              <tr className="border-t border-[#edeff3]" key={dispute.id}>
                <td className="px-4 py-3 font-semibold text-ink">{dispute.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <img className="size-8 rounded-full object-cover" src={dispute.avatar} alt="" />
                    <span className="font-medium text-ink">{dispute.creator}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-secondary">{dispute.project}</td>
                <td className="px-4 py-3 text-[13px] leading-5 text-ink">{dispute.reason}</td>
                <td className="px-4 py-3 font-semibold text-ink">{dispute.amount}</td>
                <td className="px-4 py-3">
                  <DisputePill status={dispute.status} />
                </td>
                <td className="px-4 py-3 text-[12px] text-secondary">{dispute.next}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => onOpen(dispute)}
                    className="inline-flex h-8 items-center rounded-md border border-line bg-white px-2.5 text-[12px] font-medium text-ink transition hover:bg-subtle"
                  >
                    View case
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function RaiseDisputeModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: () => void }) {
  const [project, setProject] = useState("Monsoon Sunscreen");
  const [creator, setCreator] = useState("Rohan Desai · ₹7,500 on hold");
  const [reason, setReason] = useState<string>(reasons[0]);
  const [details, setDetails] = useState("");
  const [requestedOutcome, setRequestedOutcome] = useState("Full refund (₹7,500)");
  const [files, setFiles] = useState<string[]>([]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="raise-dispute-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-full max-w-xl rounded-2xl border border-line bg-white p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between">
          <div>
            <h2
              id="raise-dispute-title"
              className="text-[18px] font-bold leading-6 text-ink"
            >
              Raise a dispute
            </h2>
            <p className="mt-1 text-[12px] text-secondary">
              Freezes the deliverable escrow. Kreyio mediation team reviews evidence within 24 hours.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close raise dispute dialog"
            className="rounded-md p-1.5 text-secondary hover:bg-subtle"
          >
            <X size={18} />
          </button>
        </div>

        <form
          className="mt-5 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div>
            <label className="block text-[12px] font-medium text-ink">Project</label>
            <select
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="mt-1.5 h-10 w-full rounded-lg border border-line bg-white px-3 text-[13px] text-ink outline-none focus:border-primary"
            >
              <option>Monsoon Sunscreen</option>
              <option>Vitamin-C Serum</option>
              <option>Glow Squad</option>
            </select>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-ink">Creator / Deliverable</label>
            <select
              value={creator}
              onChange={(e) => setCreator(e.target.value)}
              className="mt-1.5 h-10 w-full rounded-lg border border-line bg-white px-3 text-[13px] text-ink outline-none focus:border-primary"
            >
              <option>Rohan Desai · ₹7,500 on hold</option>
              <option>Tara Bose · ₹14,000 on hold</option>
              <option>Sneha Patil · ₹12,500 on hold</option>
            </select>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-ink">Primary reason</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mt-1.5 h-10 w-full rounded-lg border border-line bg-white px-3 text-[13px] text-ink outline-none focus:border-primary"
            >
              {reasons.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-ink">What happened?</label>
            <textarea
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Explain the timeline, agreed dates, what was delivered or missing..."
              className="mt-1.5 w-full rounded-lg border border-line bg-white p-3 text-[13px] text-ink outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-ink">Requested outcome</label>
            <div className="mt-1.5 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {["Full refund (₹7,500)", "Partial release (₹3,500)", "Redo by 3 Nov"].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setRequestedOutcome(opt)}
                  className={`rounded-lg border p-2.5 text-left text-[12px] transition ${
                    requestedOutcome === opt
                      ? "border-primary bg-primary-subtle font-medium text-primary"
                      : "border-line bg-white text-ink hover:bg-subtle"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-ink">
              Evidence (screenshots, brief, chat)
            </label>
            <label className="mt-1.5 flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-line bg-subtle/50 px-4 py-5 text-center hover:bg-subtle">
              <UploadCloud size={20} className="text-secondary" />
              <span className="mt-1.5 text-[12px] font-medium text-ink">
                Upload PNG, PDF or MP4
              </span>
              <span className="text-[11px] text-secondary">Up to 25 MB</span>
              <input
                type="file"
                multiple
                className="hidden"
                onChange={(e) => {
                  const names = Array.from(e.target.files ?? []).map((f) => f.name);
                  setFiles((prev) => [...prev, ...names]);
                }}
              />
            </label>
            {files.length > 0 && (
              <ul className="mt-2 space-y-1 text-[12px] text-secondary">
                {files.map((name, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <FileText size={14} /> {name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 items-center rounded-lg border border-line bg-white px-4 text-[13px] font-medium text-ink hover:bg-subtle"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex h-9 items-center rounded-lg bg-[#db231f] px-4 text-[13px] font-medium text-white hover:bg-[#b91c1c]"
            >
              Raise dispute
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function TransactionsTable({ rows = transactionRows }: { rows?: Transaction[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-[13px]">
        <thead className="border-b border-line bg-subtle text-[12px] text-secondary">
          <tr>
            <th className="px-4 py-2.5 font-medium">Date</th>
            <th className="px-4 py-2.5 font-medium">Description</th>
            <th className="px-4 py-2.5 font-medium">Project</th>
            <th className="px-4 py-2.5 font-medium">Type</th>
            <th className="px-4 py-2.5 text-right font-medium">Amount</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr className="border-t border-[#edeff3]" key={idx}>
              <td className="px-4 py-3 text-secondary">{row.date}</td>
              <td className="px-4 py-3 font-medium text-ink">{row.description}</td>
              <td className="px-4 py-3 text-secondary">{row.project}</td>
              <td className="px-4 py-3">
                <StatusPill state={row.state} />
              </td>
              <td className="px-4 py-3 text-right font-semibold text-ink">{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Overview({ onViewAll }: { onViewAll: () => void }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Tile
          icon={Landmark}
          label="Total spend"
          value="₹2,48,000"
          hint="+₹38,000 vs previous 28 days"
        />
        <Tile
          icon={LockKeyhole}
          label="Escrow balance"
          value="₹62,400"
          hint="Held across 8 deliverables"
        />
        <Tile
          icon={CheckCircle2}
          label="Released to creators"
          value="₹1,85,600"
          hint="Across 18 approved tasks"
        />
        <Tile
          icon={Scale}
          label="Frozen in disputes"
          value="₹21,500"
          hint="2 cases pending resolution"
          tone="warn"
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SpendChart />
        </div>
        <UpcomingCard />
      </div>

      <section className="rounded-xl border border-line bg-white p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[16px] font-semibold leading-6 text-ink">Recent transactions</h2>
            <p className="mt-0.5 text-[12px] leading-4 text-secondary">
              Escrow funding, deliverable payouts and GST filings
            </p>
          </div>
          <button
            type="button"
            onClick={onViewAll}
            className="text-[13px] font-medium text-primary hover:underline"
          >
            View all
          </button>
        </div>
        <div className="mt-4">
          <TransactionsTable />
        </div>
      </section>
    </div>
  );
}

function TabPanel({ tab }: { tab: Exclude<PaymentTab, "Overview"> }) {
  const detail = useMemo(() => {
    if (tab === "Collaborations")
      return {
        title: "Creator collaborations",
        description: "Fees, escrow and releases across active collaborations.",
        rows: transactionRows.filter((row) => row.state !== "Fee" && row.state !== "Refunded"),
      };
    if (tab === "Invoices")
      return {
        title: "Invoices",
        description: "Download every GST invoice and transaction receipt for your records.",
        rows: transactionRows.filter((row) => row.state !== "Held"),
      };
    if (tab === "Refunds")
      return {
        title: "Refunds",
        description: "Refunds return automatically to the original payment method.",
        rows: transactionRows.filter((row) => row.state === "Refunded"),
      };
    return {
      title: "Payment methods",
      description: "Choose which account pays for creator fees, escrow and GST.",
      rows: [] as Transaction[],
    };
  }, [tab]);

  if (tab === "Payment methods") {
    return (
      <section className="max-w-3xl rounded-xl border border-line bg-white p-5">
        <h2 className="text-[16px] font-semibold leading-6 text-ink">Payment methods</h2>
        <p className="mt-0.5 text-[12px] leading-4 text-secondary">{detail.description}</p>
        <div className="mt-5 space-y-3">
          <div className="flex items-center gap-3 rounded-xl border border-primary bg-primary-subtle p-4">
            <span className="grid size-9 place-items-center rounded-lg bg-primary text-white">
              <Landmark size={18} />
            </span>
            <span className="flex-1">
              <b className="block text-[14px] leading-5 text-ink">
                UPI AutoPay · minimalist@okhdfcbank
              </b>
              <span className="block text-[12px] leading-4 text-secondary">
                Default · mandate up to ₹16,000 per cycle
              </span>
            </span>
            <CheckCircle2 size={18} className="text-primary" />
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-line p-4">
            <span className="grid size-9 place-items-center rounded-lg bg-subtle text-secondary">
              <CreditCard size={18} />
            </span>
            <span>
              <b className="block text-[14px] leading-5 text-ink">Visa ·•••• 4242</b>
              <span className="block text-[12px] leading-4 text-secondary">Expires 08/28</span>
            </span>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="rounded-xl border border-line bg-white p-5">
      <h2 className="text-[16px] font-semibold leading-6 text-ink">{detail.title}</h2>
      <p className="mt-0.5 text-[12px] leading-4 text-secondary">{detail.description}</p>
      <div className="mt-5">
        <TransactionsTable rows={detail.rows} />
      </div>
    </section>
  );
}

export function AgencyClientPaymentsPage({
  activeClientId,
}: {
  activeClientId?: string;
} = {}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { clientId: paramClientId } = useParams<{ clientId?: string }>();
  const clientId = activeClientId || paramClientId || "minimalist";

  const resolveActiveTab = (): PaymentTab => {
    const sp = new URLSearchParams(location.search);
    const sub = sp.get("subtab") || sp.get("paymentTab");
    if (sub) {
      const match = tabs.find((t) => t.toLowerCase() === sub.toLowerCase());
      if (match) return match;
    }
    const tabParam = sp.get("tab");
    if (tabParam && tabParam.toLowerCase() === "disputes") {
      return "Disputes";
    }
    return "Overview";
  };

  const [activeTab, setActiveTab] = useState<PaymentTab>(resolveActiveTab);
  const [raiseDispute, setRaiseDispute] = useState(false);

  useEffect(() => {
    const sp = new URLSearchParams(location.search);
    const sub = sp.get("subtab") || sp.get("paymentTab");
    if (sub) {
      const match = tabs.find((t) => t.toLowerCase() === sub.toLowerCase());
      if (match) {
        setActiveTab(match);
        return;
      }
    }
    if (sp.get("tab") === "disputes") {
      setActiveTab("Disputes");
    }
  }, [location.search]);

  const downloadStatement = () => {
    const lines = [
      "Date,Description,Project,Type,Amount",
      ...transactionRows.map((row) =>
        [row.date, row.description, row.project, row.state, row.amount]
          .map((value) => `\"${value}\"`)
          .join(","),
      ),
    ];
    const url = URL.createObjectURL(
      new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "Kreyio-payments-statement-Oct-2026.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AgencyClientShell activeClientId={clientId}>
      <div className="mx-auto w-full max-w-[1440px] space-y-6 pb-10">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-[26px] font-bold leading-[34px] tracking-[-.01em] text-ink">
              Payments
            </h1>
            {activeTab !== "Disputes" && (
              <p className="mt-1 text-[13px] leading-5 text-secondary">
                Every rupee across projects: budget, escrow, released and GST. Kreyio is free for
                brands; you only pay creators plus GST.
              </p>
            )}
          </div>
          {activeTab === "Disputes" ? (
            <button
              type="button"
              onClick={() => setRaiseDispute(true)}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#0d0d10] px-4 text-[14px] font-medium text-white transition hover:bg-[#27272a]"
            >
              <Scale size={16} />
              Raise a dispute
            </button>
          ) : (
            <div className="flex flex-wrap items-center gap-2.5">
              <DateRangePicker value="1 Oct - 28 Oct 2026" />
              <button
                type="button"
                onClick={downloadStatement}
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-line bg-white px-4 text-[14px] font-medium text-ink transition hover:bg-subtle"
              >
                <ArrowDownToLine size={16} />
                Download statement
              </button>
            </div>
          )}
        </header>

        <nav className="flex overflow-x-auto border-b border-line" aria-label="Payments navigation">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`relative shrink-0 px-0 pb-3 pr-6 text-[14px] leading-[22px] transition ${activeTab === tab ? "font-medium text-ink" : "text-secondary hover:text-ink"}`}
            >
              {tab}
              {tab === "Disputes" && (
                <span className="ml-1.5 inline-flex h-[18px] items-center rounded-full bg-muted px-1.5 text-[12px] font-medium leading-4 text-secondary">
                  2
                </span>
              )}
              {activeTab === tab && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-ink" />}
            </button>
          ))}
        </nav>

        {activeTab === "Overview" ? (
          <Overview onViewAll={() => setActiveTab("Collaborations")} />
        ) : activeTab === "Disputes" ? (
          <DisputesBoard
            onOpen={(dispute) =>
              navigate(agencyClientPaymentDisputeRoute(clientId, dispute.id.toLowerCase()))
            }
          />
        ) : (
          <TabPanel tab={activeTab} />
        )}
      </div>
      {raiseDispute && (
        <RaiseDisputeModal
          onClose={() => setRaiseDispute(false)}
          onSubmit={() => setRaiseDispute(false)}
        />
      )}
    </AgencyClientShell>
  );
}
