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
import { BrandShell } from "@/brand/components/BrandShell";
import { DateRangePicker } from "@/common/components/ui/DateRangePicker";
import { brandPaymentDisputeRoute } from "@/common/constants/routes";

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
    description: "GST (18%)",
    project: "Monsoon Sunscreen",
    state: "Fee",
    amount: "₹2,950",
  },
  {
    date: "24 Oct",
    description: "Refund · Pooja Menon declined",
    project: "Vitamin-C Serum",
    state: "Refunded",
    amount: "−₹13,215",
  },
];

const upcomingRows = [
  ["30 Oct", "Release · Meera Iyer · Short", "₹7,500"],
  ["1 Nov", "Hold · Glow Squad month 4", "₹79,425"],
  ["2 Nov", "Release · 2 Monsoon Shorts", "₹12,000"],
  ["4 Nov", "Hold · Skin Quiz Leads (3 creators)", "₹63,540"],
] as const;

const spend = [41, 58, 48, 72, 67, 94];

const stateTone: Record<TransactionState, string> = {
  Released: "bg-[#e1fce3] text-[#16a34a]",
  Held: "bg-[#feefce] text-[#d97706]",
  Fee: "bg-[#f4f6fb] text-[#4a4a55]",
  Refunded: "bg-[#f1f4ff] text-[#3b5bff]",
};

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
    avatar: "https://www.figma.com/api/mcp/asset/b2043c84-88f8-45ab-8085-3de23d863a87.png",
    project: "Monsoon Sunscreen",
    reason: "Late delivery",
    amount: "₹7,500",
    status: "Waiting for you",
    next: "Reply by 30 Oct",
  },
  {
    id: "DSP-0421",
    creator: "Tara Bose",
    avatar: "https://www.figma.com/api/mcp/asset/3cd695a6-cf4c-49b8-9030-9453d79576ca.png",
    project: "Vitamin-C Serum",
    reason: "Doesn’t match brief",
    amount: "₹7,500",
    status: "Under review",
    next: "Decision by 4 Nov",
  },
  {
    id: "DSP-0377",
    creator: "Riya Sen",
    avatar: "https://www.figma.com/api/mcp/asset/5d846c24-5e8d-4dec-8d60-3e25146862f9.png",
    project: "Lip Tint Drop",
    reason: "Posted then deleted",
    amount: "₹5,000",
    status: "Resolved",
    next: "Partial refund",
  },
];

function StatusPill({ state }: { state: TransactionState }) {
  return (
    <span
      className={`inline-flex h-5 items-center gap-1.5 whitespace-nowrap rounded-full px-2 text-[12px] font-medium leading-4 ${stateTone[state]}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {state}
    </span>
  );
}

function DisputePill({ status }: { status: DisputeStatus }) {
  const tone = {
    "Waiting for you": "bg-[#fde4e3] text-[#db231f]",
    "Under review": "bg-[#feefce] text-[#d97706]",
    Resolved: "bg-[#f4f6fb] text-[#4a4a55]",
  }[status];
  return (
    <span
      className={`inline-flex h-5 items-center gap-1.5 whitespace-nowrap rounded-full px-2 text-[12px] font-medium leading-4 ${tone}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function Tile({
  icon: Icon,
  iconClass,
  label,
  value,
  detail,
  delay,
}: {
  icon: typeof WalletCards;
  iconClass: string;
  label: string;
  value: string;
  detail: string;
  delay: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay }}
      className="min-w-0 rounded-xl border border-[#edeff3] bg-white p-4"
    >
      <span className={`grid size-9 place-items-center rounded-lg text-white ${iconClass}`}>
        <Icon size={18} strokeWidth={2} />
      </span>
      <p className="mt-3.5 text-[12px] leading-4 text-secondary">{label}</p>
      <p className="mt-0.5 text-[22px] font-semibold leading-7 tracking-[-.015em] text-ink">
        {value}
      </p>
      <p
        className={`mt-2.5 text-[12px] font-medium leading-4 ${label === "Released" ? "text-[#16a34a]" : "text-tertiary"}`}
      >
        {detail}
      </p>
    </motion.article>
  );
}

function SpendChart() {
  return (
    <div className="rounded-xl border border-line bg-white p-5">
      <div>
        <h2 className="text-[16px] font-semibold leading-6 text-ink">Spend by month</h2>
        <p className="text-[12px] leading-4 text-secondary">₹4,33,800 released since May</p>
      </div>
      <div className="mt-4 rounded-xl border border-line p-5">
        <p className="text-[12px] leading-4 text-secondary">Released to creators each month</p>
        <div className="mt-4 flex gap-2">
          <div className="flex h-[180px] w-11 flex-col justify-between text-right text-[11px] leading-[14px] text-tertiary">
            <span>₹1.2 L</span>
            <span>₹90K</span>
            <span>₹60K</span>
            <span>₹30K</span>
            <span>₹0</span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="relative flex h-[180px] items-end justify-around border-b border-l border-line/90 bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_43px,#edeff3_44px)] px-2">
              {spend.map((height, index) => (
                <div
                  key={index}
                  className="group relative flex h-full flex-1 items-end justify-center"
                >
                  {index === spend.length - 1 && (
                    <span className="absolute -top-3 z-10 rounded bg-[#2a44cc] px-1.5 py-0.5 text-[12px] font-medium leading-4 text-white">
                      ₹1.13 L
                    </span>
                  )}
                  <motion.span
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.72, delay: index * 0.07, ease: "easeOut" }}
                    className={`mx-2 w-full max-w-10 rounded-t-md ${index === spend.length - 1 ? "bg-[#2a44cc]" : "bg-[#dfe6ff]"}`}
                  />
                </div>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-6 text-center text-[11px] leading-[14px] text-tertiary">
              {["May", "Jun", "Jul", "Aug", "Sep", "Oct (so far)"].map((month) => (
                <span key={month}>{month}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UpcomingCard() {
  return (
    <section className="rounded-xl border border-line bg-white p-5 lg:min-h-[378px]">
      <h2 className="text-[16px] font-semibold leading-6 text-ink">Next 14 days</h2>
      <p className="text-[12px] leading-4 text-secondary">Releases and holds</p>
      <div className="mt-5 space-y-4">
        {upcomingRows.map(([date, text, amount], index) => (
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex items-center gap-2.5"
            key={date}
          >
            <span className="w-12 shrink-0 text-[12px] font-medium leading-4 text-secondary">
              {date}
            </span>
            <span className="min-w-0 flex-1 text-[13px] leading-5 text-ink">{text}</span>
            <span className="shrink-0 text-[13px] font-medium leading-5 text-ink">{amount}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function DisputesBoard({ onOpen }: { onOpen: (dispute: Dispute) => void }) {
  return (
    <>
      <section className="grid gap-3 rounded-xl border border-line bg-white p-5 sm:grid-cols-3">
        <Tile
          icon={CircleAlert}
          iconClass="bg-[#f29b07]"
          label="Open"
          value="2"
          detail="1 needs your reply"
          delay={0}
        />
        <Tile
          icon={LockKeyhole}
          iconClass="bg-[#f29b07]"
          label="Money frozen"
          value="₹15,000"
          detail="held until decided"
          delay={0.05}
        />
        <Tile
          icon={Clock3}
          iconClass="bg-primary"
          label="Avg days to resolve"
          value="4.2"
          detail="last 90 days"
          delay={0.1}
        />
      </section>
      <section className="overflow-x-auto rounded-xl border border-line bg-white">
        <table className="w-full min-w-[960px] border-collapse text-left">
          <thead className="bg-subtle text-[12px] font-semibold leading-4 text-secondary">
            <tr>
              <th className="w-[90px] px-4 py-2.5">ID</th>
              <th className="w-[170px] px-4 py-2.5">Creator</th>
              <th className="w-40 px-4 py-2.5">Project</th>
              <th className="px-4 py-2.5">Reason</th>
              <th className="w-20 px-4 py-2.5 text-right">Amount</th>
              <th className="w-[130px] px-4 py-2.5">Status</th>
              <th className="w-[120px] px-4 py-2.5">Next</th>
              <th className="w-[70px] px-4 py-2.5">
                <span className="sr-only">Open case</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {disputes.map((dispute) => (
              <tr className="border-t border-[#edeff3]" key={dispute.id}>
                <td className="whitespace-nowrap px-4 py-3 text-[14px] font-medium leading-[22px] text-ink">
                  {dispute.id}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <img className="size-8 rounded-full object-cover" src={dispute.avatar} alt="" />
                    <span className="whitespace-nowrap text-[14px] font-medium leading-[22px] text-ink">
                      {dispute.creator}
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-[13px] leading-5 text-ink">
                  {dispute.project}
                </td>
                <td className="px-4 py-3 text-[13px] leading-5 text-ink">{dispute.reason}</td>
                <td className="whitespace-nowrap px-4 py-3 text-right text-[13px] font-medium leading-5 text-ink">
                  {dispute.amount}
                </td>
                <td className="px-4 py-3">
                  <DisputePill status={dispute.status} />
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-[13px] leading-5 text-ink">
                  {dispute.next}
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => onOpen(dispute)}
                    className="inline-flex h-8 items-center justify-center rounded-lg border border-line bg-white px-3 text-[13px] font-medium leading-[18px] text-ink transition hover:bg-subtle"
                  >
                    Open
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

function RaiseDisputeModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: () => void }) {
  const [collaboration, setCollaboration] = useState("Tara Bose · Vitamin-C Serum");
  const [deliverable, setDeliverable] = useState("Reel 2: Launch look");
  const [reason, setReason] = useState("Doesn’t match the brief");
  const [amount, setAmount] = useState("₹7,500");
  const [description, setDescription] = useState(
    "The Reel doesn’t show the 3 steps and the code isn’t mentioned in the video.",
  );
  const [fileName, setFileName] = useState("");

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-[#070b13]/40 p-4 sm:p-8"
      role="presentation"
      onMouseDown={onClose}
    >
      <motion.section
        role="dialog"
        aria-modal="true"
        aria-labelledby="raise-dispute-title"
        onMouseDown={(event) => event.stopPropagation()}
        initial={{ opacity: 0, y: 16, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
        className="my-auto w-full max-w-[640px] rounded-2xl bg-white p-5 shadow-[0_24px_60px_rgba(0,0,0,.20)] sm:p-7"
      >
        <div className="flex items-center gap-3">
          <h2
            id="raise-dispute-title"
            className="flex-1 text-[26px] font-bold leading-[34px] tracking-[-.01em] text-ink"
          >
            Raise a dispute
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="grid size-8 place-items-center rounded-md text-secondary transition hover:bg-subtle hover:text-ink"
            aria-label="Close raise dispute dialog"
          >
            <X size={20} />
          </button>
        </div>
        <p className="mt-3 text-[13px] leading-5 text-secondary">
          The money for this deliverable stays frozen in escrow until Kreyio decides. Both sides
          reply within 48 hours.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="grid gap-1.5 text-[12px] font-medium leading-4 text-ink">
            Collaboration
            <span className="relative">
              <select
                value={collaboration}
                onChange={(event) => setCollaboration(event.target.value)}
                className="h-10 w-full appearance-none rounded-lg border border-line bg-white px-3 pr-9 text-[13px] font-normal leading-5 text-ink outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option>Tara Bose · Vitamin-C Serum</option>
                <option>Rohan Desai · Monsoon Sunscreen</option>
                <option>Riya Sen · Lip Tint Drop</option>
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-3 text-secondary"
              />
            </span>
          </label>
          <label className="grid gap-1.5 text-[12px] font-medium leading-4 text-ink">
            Deliverable
            <span className="relative">
              <select
                value={deliverable}
                onChange={(event) => setDeliverable(event.target.value)}
                className="h-10 w-full appearance-none rounded-lg border border-line bg-white px-3 pr-9 text-[13px] font-normal leading-5 text-ink outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option>Reel 2: Launch look</option>
                <option>Story: code reminder</option>
                <option>Short: product demo</option>
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-3 text-secondary"
              />
            </span>
          </label>
          <label className="grid gap-1.5 text-[12px] font-medium leading-4 text-ink">
            Reason
            <span className="relative">
              <select
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                className="h-10 w-full appearance-none rounded-lg border border-line bg-white px-3 pr-9 text-[13px] font-normal leading-5 text-ink outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option>Doesn’t match the brief</option>
                <option>Late delivery</option>
                <option>Content quality issue</option>
                <option>Rights or usage issue</option>
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-3 text-secondary"
              />
            </span>
          </label>
          <label className="grid gap-1.5 text-[12px] font-medium leading-4 text-ink">
            Amount in question
            <input
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              className="h-10 rounded-lg border border-line px-3 text-[13px] font-normal leading-5 text-ink outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </label>
        </div>

        <label className="mt-4 grid gap-1.5 text-[12px] font-medium leading-4 text-ink">
          What happened?
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value.slice(0, 1000))}
            className="min-h-28 w-full resize-y rounded-lg border border-line px-3 py-2.5 text-[13px] font-normal leading-5 text-ink outline-none transition placeholder:text-tertiary focus:border-primary focus:ring-1 focus:ring-primary"
          />
          <span className="flex justify-between gap-4 text-[12px] font-normal leading-4 text-tertiary">
            <span>Be specific: what was agreed and what was delivered</span>
            <span className="shrink-0">{description.length} / 1,000</span>
          </span>
        </label>

        <label className="mt-4 flex min-h-[126px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#d4d7df] bg-subtle px-5 py-4 text-center transition hover:border-primary hover:bg-[#f8faff]">
          <UploadCloud size={20} className="text-secondary" />
          <span className="text-[13px] leading-5 text-ink">
            Drag a file here or <span className="font-medium text-primary">browse</span>
          </span>
          <span className="text-[12px] leading-4 text-tertiary">JPG or PNG · 16:5 · max 5 MB</span>
          {fileName && (
            <span className="max-w-full truncate text-[12px] font-medium leading-4 text-primary">
              {fileName}
            </span>
          )}
          <input
            type="file"
            accept="image/jpeg,image/png"
            className="sr-only"
            onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
          />
        </label>

        <div className="mt-4 flex justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-line bg-white px-4 text-[14px] font-medium text-ink transition hover:bg-subtle"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSubmit}
            disabled={!description.trim()}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#dc2626] px-4 text-[14px] font-medium text-white transition hover:bg-[#b91c1c] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Scale size={16} />
            Raise dispute
          </button>
        </div>
      </motion.section>
    </div>
  );
}

function TransactionsTable({ rows = transactionRows }: { rows?: Transaction[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line">
      <table className="w-full min-w-[720px] border-collapse text-left">
        <thead className="bg-subtle text-[12px] font-semibold leading-4 text-secondary">
          <tr>
            <th className="w-20 px-4 py-2.5">Date</th>
            <th className="px-4 py-2.5">Description</th>
            <th className="w-40 px-4 py-2.5">Project</th>
            <th className="w-[110px] px-4 py-2.5">Type</th>
            <th className="w-[110px] px-4 py-2.5 text-right">Amount</th>
            <th className="w-20 px-4 py-2.5">Invoice</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.date}-${row.description}`} className="border-t border-[#edeff3]">
              <td className="whitespace-nowrap px-4 py-3 text-[13px] font-medium leading-5 text-ink">
                {row.date}
              </td>
              <td className="px-4 py-3 text-[13px] leading-5 text-ink">{row.description}</td>
              <td className="whitespace-nowrap px-4 py-3 text-[13px] leading-5 text-ink">
                {row.project}
              </td>
              <td className="px-4 py-3">
                <StatusPill state={row.state} />
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right text-[13px] font-medium leading-5 text-ink">
                {row.amount}
              </td>
              <td className="px-4 py-3">
                <button
                  type="button"
                  title={`Download invoice for ${row.description}`}
                  className="text-secondary transition hover:text-primary"
                >
                  <FileText size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Overview({ onViewAll }: { onViewAll: () => void }) {
  return (
    <>
      <section className="grid gap-3 rounded-xl border border-line bg-white p-5 sm:grid-cols-2 xl:grid-cols-5">
        <Tile
          icon={WalletCards}
          iconClass="bg-[#070b13]"
          label="Committed"
          value="₹8,90,000"
          detail="89% of ₹10,00,000 budget"
          delay={0}
        />
        <Tile
          icon={LockKeyhole}
          iconClass="bg-[#f29b07]"
          label="In escrow"
          value="₹1,71,200"
          detail="14 creators"
          delay={0.04}
        />
        <Tile
          icon={CheckCircle2}
          iconClass="bg-[#149d46]"
          label="Released"
          value="₹4,33,800"
          detail="↑ 42.7%"
          delay={0.08}
        />
        <Tile
          icon={ReceiptText}
          iconClass="bg-primary"
          label="GST"
          value="₹35,695"
          detail="₹30,250 + ₹5,445"
          delay={0.12}
        />
        <Tile
          icon={CircleAlert}
          iconClass="bg-[#f29b07]"
          label="Frozen in disputes"
          value="₹15,000"
          detail="2 open"
          delay={0.16}
        />
      </section>
      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_400px]">
        <SpendChart />
        <UpcomingCard />
      </section>
      <section className="rounded-xl border border-line bg-white p-5">
        <div className="mb-4 flex items-center gap-2">
          <h2 className="flex-1 text-[16px] font-semibold leading-6 text-ink">
            Recent transactions
          </h2>
          <button
            type="button"
            onClick={onViewAll}
            className="text-[12px] font-medium leading-4 text-primary hover:text-[#1d4ed8]"
          >
            View all
          </button>
        </div>
        <TransactionsTable />
      </section>
    </>
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

export function BrandPaymentsPage() {
  const navigate = useNavigate();
  const location = useLocation();

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
    <BrandShell>
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
              navigate(brandPaymentDisputeRoute(dispute.id.toLowerCase()))
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
    </BrandShell>
  );
}
