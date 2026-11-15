import { useMemo, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  Info,
  Link2,
  Lock,
  Pencil,
  Plus,
  RotateCcw,
  Send,
  Tag,
} from "lucide-react";
import { BrandShell } from "@/brand/components/BrandShell";
import { Button } from "@/common/components/ui/Button";
import { DeadlinePicker } from "@/common/components/ui/DeadlinePicker";
import { Dropdown } from "@/common/components/ui/Dropdown";
import {
  brandCreatorProfileRoute,
  brandInvitedCreatorRoute,
  brandProjectRoute,
} from "@/common/constants/routes";
import { getProject } from "@/brand/data/projects";
import { getProjectRules } from "@/brand/data/projectRules";
import { getCreatorProfile } from "./project-applications/creatorProfileData";

type Status = "Approved · locked" | "Posted · locked" | "Not started" | "Upcoming" | "Added · new";
type Deliverable = {
  id: string;
  type: string;
  platform: string;
  deadline: string;
  tracking: string;
  coupon: string;
  status: Status;
  fee: string;
  usage: string;
  product: string;
  shipping: string;
  brief: string;
  locked?: boolean;
  changed?: boolean;
};

const typeOptions = [
  "1 Reel · kit routine",
  "1 Story · code reminder",
  "1 Story · results check-in",
  "1 Story · code + swatch",
  "1 Short · gifting",
];
const platforms = ["Instagram", "YouTube", "Pinterest", "Snapchat"];
const usageOptions = ["Organic", "Paid social · 30 days", "Paid social · 90 days", "Perpetual"];
const productOptions = ["Glow Squad kit", "Vitamin C Glow Serum", "Festive gift set"];
const shipmentOptions = ["Delivered 4 Nov", "Glow Squad kit · BD7731045…", "Select shipments"];

const firstCycle: Deliverable[] = [
  {
    id: "cycle-1-reel",
    type: "1 Reel · kit routine",
    platform: "Instagram",
    deadline: "2026-11-10",
    tracking: "flw.to/diya-reel",
    coupon: "SQUADDIYA",
    status: "Approved · locked",
    fee: "7500",
    usage: "Organic",
    product: "Glow Squad kit",
    shipping: "Delivered 4 Nov",
    brief: "Unbox the kit in the first 3 seconds; say the code at the end",
    locked: true,
  },
  {
    id: "cycle-1-reminder",
    type: "1 Story · code reminder",
    platform: "Instagram",
    deadline: "2026-11-15",
    tracking: "flw.to/diya-st1",
    coupon: "SQUADDIYA",
    status: "Posted · locked",
    fee: "2500",
    usage: "Organic",
    product: "Glow Squad kit",
    shipping: "Select shipments",
    brief: "Link sticker to flw.to/diya-st1; mention 10% off",
    locked: true,
  },
  {
    id: "cycle-1-check-in",
    type: "1 Story · results check-in",
    platform: "Instagram",
    deadline: "2026-11-28",
    tracking: "flw.to/diya-st2",
    coupon: "SQUADDIYA",
    status: "Not started",
    fee: "2500",
    usage: "Organic",
    product: "Vitamin C Glow Serum",
    shipping: "Select shipments",
    brief: "Share your before/after; tag @minimalist",
  },
];

const secondCycle: Deliverable[] = [
  {
    id: "cycle-2-reel",
    type: "1 Reel · kit routine",
    platform: "Instagram",
    deadline: "2026-12-10",
    tracking: "flw.to/diya-reel2",
    coupon: "SQUADDIYA",
    status: "Upcoming",
    fee: "7500",
    usage: "Organic",
    product: "Glow Squad kit",
    shipping: "Select shipments",
    brief: "Unbox the kit in the first 3 seconds; say the code at the end",
  },
  {
    id: "cycle-2-reminder",
    type: "1 Story · code + swatch",
    platform: "Instagram",
    deadline: "2026-12-17",
    tracking: "flw.to/diya-st3",
    coupon: "SQUADDIYA",
    status: "Upcoming",
    fee: "2500",
    usage: "Organic",
    product: "Vitamin C Glow Serum",
    shipping: "Select shipments",
    brief: "Show a swatch of the serum on your hand, then the link sticker",
    changed: true,
  },
  {
    id: "cycle-2-short",
    type: "1 Short · gifting",
    platform: "YouTube",
    deadline: "2026-12-20",
    tracking: "flw.to/diya-sh1",
    coupon: "SQUADDIYA",
    status: "Added · new",
    fee: "2500",
    usage: "Organic",
    product: "Festive gift set",
    shipping: "Select shipments",
    brief: "Gift-wrap the kit and show it under the tree",
    changed: true,
  },
  {
    id: "cycle-2-check-in",
    type: "1 Story · results check-in",
    platform: "Instagram",
    deadline: "2026-12-28",
    tracking: "flw.to/diya-st4",
    coupon: "SQUADDIYA",
    status: "Upcoming",
    fee: "2500",
    usage: "Organic",
    product: "Vitamin C Glow Serum",
    shipping: "Select shipments",
    brief: "Share your before/after; tag @minimalist",
  },
];

function InputShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`flex h-10 min-w-0 items-center rounded-md border border-line bg-white px-3 text-[13px] text-ink ${className}`}
    >
      {children}
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const tone = status.startsWith("Approved")
    ? "bg-success-bg text-success"
    : status.startsWith("Added")
      ? "bg-primary-subtle text-primary"
      : "bg-neutral-bg text-neutral";
  return (
    <span
      className={`inline-flex max-w-full items-center gap-1.5 truncate rounded-full px-2 py-1 text-[12px] leading-4 ${tone}`}
    >
      <i className="size-1.5 shrink-0 rounded-full bg-current" />
      {status}
    </span>
  );
}

function DeliverableRow({
  item,
  editing,
  onEdit,
  onSave,
  onChange,
}: {
  item: Deliverable;
  editing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onChange: (data: Partial<Deliverable>) => void;
}) {
  const disabled = item.locked;
  return (
    <article
      className={`border-b border-line-subtle px-4 py-3 last:border-b-0 ${editing ? "border-2 border-primary bg-white px-3.5 py-3" : item.changed ? "bg-primary-subtle/50" : "bg-white"}`}
    >
      {editing && (
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-[14px] font-medium text-ink">
            <Pencil size={15} className="text-primary" />
            Editing: {item.type.replace("1 Story · code + swatch", "1 Story · code reminder")}
          </p>
          <span className="rounded-full bg-warning-bg px-2 py-0.5 text-[12px] font-medium text-warning">
            • Unsaved changes
          </span>
        </div>
      )}
      <div
        className={`grid gap-2 xl:grid-cols-[minmax(190px,1.45fr)_130px_140px_minmax(160px,1fr)_170px_minmax(130px,1fr)_30px] ${disabled ? "pointer-events-none" : ""}`}
      >
        <Dropdown
          value={item.type}
          options={typeOptions}
          onChange={(type) => onChange({ type })}
          ariaLabel="Deliverable type"
        />
        <Dropdown
          value={item.platform}
          options={platforms}
          onChange={(platform) => onChange({ platform })}
          ariaLabel="Platform"
        />
        <DeadlinePicker
          value={item.deadline}
          onChange={(deadline) => onChange({ deadline })}
          pickerId={`deliverable-deadline-${item.id}`}
        />
        <button
          type="button"
          className="flex h-10 min-w-0 items-center gap-2 rounded-md border border-line bg-white px-3 text-left text-[13px] text-primary"
        >
          <Link2 size={15} className="shrink-0" />
          <span className="truncate">{item.tracking}</span>
          <Copy size={14} className="ml-auto shrink-0 text-secondary" />
        </button>
        <InputShell>
          <Tag size={15} className="mr-2 shrink-0 text-secondary" />
          <span className="truncate">{item.coupon}</span>
        </InputShell>
        <div className="flex min-w-0 items-center">
          {" "}
          <StatusBadge status={item.status} />
        </div>
        {disabled ? (
          <span className="grid place-items-center text-secondary">
            <Lock size={15} />
          </span>
        ) : (
          <button
            type="button"
            onClick={editing ? onSave : onEdit}
            className="grid size-8 place-items-center rounded-md border border-line text-primary hover:bg-primary-subtle"
            aria-label={editing ? "Save deliverable" : "Edit deliverable"}
          >
            {editing ? <Check size={16} /> : <Pencil size={16} />}
          </button>
        )}
      </div>
      <div
        className={`mt-2 grid gap-2 xl:grid-cols-[150px_180px_minmax(180px,1fr)_minmax(190px,1fr)] ${disabled ? "pointer-events-none" : ""}`}
      >
        <InputShell>
          <span className="mr-2 text-secondary">Fee</span>
          <input
            inputMode="numeric"
            value={Number(item.fee).toLocaleString("en-IN")}
            onChange={(event) => onChange({ fee: event.target.value.replace(/[^0-9]/g, "") })}
            className="min-w-0 flex-1 bg-transparent outline-none"
          />
        </InputShell>
        <Dropdown
          value={item.usage}
          options={usageOptions}
          onChange={(usage) => onChange({ usage })}
          ariaLabel="Usage rights"
          displayValue={`Usage  ${item.usage}`}
        />
        <Dropdown
          value={item.product}
          options={productOptions}
          onChange={(product) => onChange({ product })}
          ariaLabel="Product"
          displayValue={`Product  ${item.product}`}
        />
        <Dropdown
          value={item.shipping}
          options={shipmentOptions}
          onChange={(shipping) => onChange({ shipping })}
          ariaLabel="Shipping"
          displayValue={`Shipping  ${item.shipping}`}
        />
      </div>
      <label
        className={`mt-2 flex min-h-[63px] rounded-md border border-line bg-white px-3 py-3 text-[13px] ${disabled ? "pointer-events-none" : ""}`}
      >
        <b className="mr-2 font-medium text-ink">Brief:</b>
        <textarea
          value={item.brief}
          onChange={(event) => onChange({ brief: event.target.value })}
          className="min-h-[35px] min-w-0 flex-1 resize-none bg-transparent outline-none"
        />
      </label>
      {editing && (
        <footer className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3">
          <p className="text-[12px] text-secondary">Was 15 Dec · moved 2 days, note updated</p>
          <div className="flex gap-2">
            <Button size="s" kind="secondary" onClick={onEdit}>
              Cancel
            </Button>
            <Button size="s" onClick={onSave} leadingIcon={<Check size={14} />}>
              Save deliverable
            </Button>
          </div>
        </footer>
      )}
    </article>
  );
}

function CycleCard({
  title,
  subtitle,
  status,
  items,
  editingId,
  onEdit,
  onSave,
  onChange,
  addLabel,
}: {
  title: string;
  subtitle: string;
  status: string;
  items: Deliverable[];
  editingId: string | null;
  onEdit: (id: string | null) => void;
  onSave: () => void;
  onChange: (id: string, data: Partial<Deliverable>) => void;
  addLabel: string;
}) {
  return (
    <section className="overflow-hidden rounded-lg border border-line bg-white">
      <header className="flex flex-wrap items-center justify-between gap-3 bg-subtle px-4 py-3">
        <div className="flex items-start gap-2">
          <RotateCcw size={16} className="mt-0.5 text-secondary" />
          <div>
            <h2 className="text-[14px] font-semibold text-ink">{title}</h2>
            <p className="mt-1 text-[12px] text-secondary">{subtitle}</p>
          </div>
        </div>
        <span className="rounded-full px-2 py-0.5 text-[12px] font-medium text-primary">
          • {status}
        </span>
      </header>
      <div className="overflow-x-auto">
        <div className="min-w-[1080px]">
          <div className="grid grid-cols-[minmax(190px,1.45fr)_130px_140px_minmax(160px,1fr)_170px_minmax(130px,1fr)_30px] gap-2 px-4 py-3 text-[12px] text-secondary">
            <span>Deliverable</span>
            <span>Platform</span>
            <span>Deadline</span>
            <span>Tracking link</span>
            <span>Coupon code</span>
            <span>Status</span>
            <span />
          </div>
          {items.map((item) => (
            <DeliverableRow
              key={item.id}
              item={item}
              editing={editingId === item.id}
              onEdit={() => onEdit(editingId === item.id ? null : item.id)}
              onSave={onSave}
              onChange={(data) => onChange(item.id, data)}
            />
          ))}
          <button
            type="button"
            className="flex h-12 items-center gap-2 px-4 text-[13px] font-medium text-primary transition hover:bg-primary-subtle"
          >
            <Plus size={16} />
            {addLabel}
          </button>
        </div>
      </div>
    </section>
  );
}

type OneTimeRow = {
  id: string;
  type: string;
  platform: string;
  deadline: string;
  tracking: string;
  coupon: string;
  status: "Approved · locked" | "Posted · locked" | "Not started" | "Added · new";
  fee: string;
  brief: string;
  locked?: boolean;
  added?: boolean;
};

const oneTimeRows: OneTimeRow[] = [
  {
    id: "festive",
    type: "1 Reel · festive GRWM",
    platform: "Instagram",
    deadline: "2026-10-18",
    tracking: "flw.to/ishita-reel-1",
    coupon: "ISHITA15",
    status: "Approved · locked",
    fee: "8500",
    brief: "Show a festive GRWM featuring Vitamin-C Serum; say code ISHITA15 at the end.",
    locked: true,
  },
  {
    id: "launch",
    type: "1 Story · launch reminder",
    platform: "Instagram",
    deadline: "2026-10-20",
    tracking: "flw.to/ishita-st1",
    coupon: "ISHITA15",
    status: "Posted · locked",
    fee: "4250",
    brief: "Use the link sticker and mention the launch offer.",
    locked: true,
  },
  {
    id: "results",
    type: "1 Reel · results check-in",
    platform: "Instagram",
    deadline: "2026-10-31",
    tracking: "flw.to/ishita-reel-3",
    coupon: "ISHITA15",
    status: "Not started",
    fee: "3000",
    brief: "Show your results after 7 days and tag @minimalist.",
  },
  {
    id: "new-reel",
    type: "1 Reel · full routine",
    platform: "Instagram",
    deadline: "2026-11-04",
    tracking: "flw.to/ishita-reel-4",
    coupon: "ISHITA15",
    status: "Added · new",
    fee: "4000",
    brief: "Show the full look with the kit; offer ends 7 Nov.",
    added: true,
  },
];

function OneTimeStatus({ status }: { status: OneTimeRow["status"] }) {
  const tone = status.startsWith("Approved")
    ? "bg-success-bg text-success"
    : status.startsWith("Added")
      ? "bg-primary-subtle text-primary"
      : status.startsWith("Posted")
        ? "bg-muted text-neutral"
        : "bg-neutral-bg text-neutral";
  return (
    <span
      className={`inline-flex whitespace-nowrap items-center gap-1.5 rounded-full px-2 py-0.5 text-[12px] font-medium leading-4 ${tone}`}
    >
      <i className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function OneTimeControl({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`flex h-10 min-w-0 items-center rounded-md border border-line bg-white px-3 text-[13px] leading-5 text-ink ${className}`}
    >
      {children}
    </div>
  );
}

function OneTimeRowEditor({
  row,
  editing,
  onEdit,
  onSave,
  onChange,
}: {
  row: OneTimeRow;
  editing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onChange: (change: Partial<OneTimeRow>) => void;
}) {
  const locked = row.locked;
  const fieldClass = locked ? "bg-[#f3f5f7]" : "bg-white";
  return (
    <article
      className={`border-b border-line-subtle px-4 py-3 last:border-b-0 ${editing ? "border-2 border-primary bg-white px-3.5" : row.added ? "bg-primary-subtle" : "bg-white"}`}
    >
      {editing && (
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-[14px] font-medium text-ink">
            <Pencil size={15} className="text-primary" />
            Editing: 1 Reel · results check-in
          </p>
          <span className="rounded-full bg-warning-bg px-2 py-0.5 text-[12px] font-medium text-warning">
            • Unsaved changes
          </span>
        </div>
      )}
      <div
        className={`grid min-w-[1080px] grid-cols-[220px_130px_140px_170px_170px_130px_24px] gap-2 ${locked ? "pointer-events-none" : ""}`}
      >
        <Dropdown
          value={row.type}
          options={[
            "1 Reel · festive GRWM",
            "1 Story · launch reminder",
            "1 Reel · results check-in",
            "1 Reel · full routine",
            "1 Story · last reminder",
          ]}
          onChange={(type) => onChange({ type })}
          ariaLabel="Deliverable type"
          className={fieldClass}
        />
        <Dropdown
          value={row.platform}
          options={platforms}
          onChange={(platform) => onChange({ platform })}
          ariaLabel="Platform"
          className={fieldClass}
        />
        <DeadlinePicker
          value={row.deadline}
          onChange={(deadline) => onChange({ deadline })}
          pickerId={`one-time-deadline-${row.id}`}
          minDate="2026-10-07"
          maxDate="2026-11-07"
          className={fieldClass}
        />
        <button
          type="button"
          className={`flex h-10 min-w-0 items-center gap-2 rounded-md border border-line px-3 text-left text-[13px] text-primary ${fieldClass}`}
        >
          <Link2 size={15} className="shrink-0" />
          <span className="truncate">{row.tracking}</span>
          <Copy size={14} className="ml-auto shrink-0 text-secondary" />
        </button>
        <OneTimeControl className={fieldClass}>
          <Tag size={15} className="mr-2 shrink-0 text-secondary" />
          <span className="truncate">{row.coupon}</span>
        </OneTimeControl>
        <div className="flex items-center">
          <OneTimeStatus status={row.status} />
        </div>
        {locked ? (
          <span className="grid place-items-center text-secondary">
            <Lock size={15} />
          </span>
        ) : (
          <button
            type="button"
            aria-label={editing ? "Save deliverable" : "Edit deliverable"}
            onClick={editing ? onSave : onEdit}
            className="grid size-6 place-items-center rounded-md border border-line bg-white text-primary transition-colors hover:bg-primary-subtle"
          >
            {editing ? <Check size={15} /> : <Pencil size={14} />}
          </button>
        )}
      </div>
      <div
        className={`mt-2 grid min-w-[1080px] grid-cols-[150px_180px_260px_248px] gap-2 ${locked ? "pointer-events-none" : ""}`}
      >
        <OneTimeControl className={fieldClass}>
          <span className="mr-2 text-secondary">Fee</span>
          <input
            value={Number(row.fee).toLocaleString("en-IN")}
            onChange={(event) => onChange({ fee: event.target.value.replace(/[^0-9]/g, "") })}
            className="min-w-0 flex-1 bg-transparent outline-none"
          />
        </OneTimeControl>
        <Dropdown
          value="Organic"
          options={usageOptions}
          onChange={() => undefined}
          ariaLabel="Usage rights"
          displayValue="Usage  Organic"
          className={fieldClass}
        />
        <Dropdown
          value="Vitamin C Glow Serum"
          options={productOptions}
          onChange={() => undefined}
          ariaLabel="Product"
          displayValue="Product  Vitamin C Glow Serum"
          className={fieldClass}
        />
        <Dropdown
          value="Select shipments"
          options={shipmentOptions}
          onChange={() => undefined}
          ariaLabel="Shipping"
          displayValue="Shipping  Select shipments"
          className={fieldClass}
        />
      </div>
      <label
        className={`mt-2 flex min-h-[64px] min-w-[1080px] rounded-md border border-line px-3 py-3 text-[13px] ${fieldClass} ${locked ? "pointer-events-none" : ""}`}
      >
        <b className="mr-2 font-medium text-ink">Brief:</b>
        <textarea
          value={row.brief}
          onChange={(event) => onChange({ brief: event.target.value })}
          className="min-h-[35px] min-w-0 flex-1 resize-none bg-transparent outline-none"
        />
      </label>
      {editing && (
        <footer className="mt-3 flex min-w-[1080px] items-center justify-between gap-3 border-t border-line pt-3">
          <p className="text-[12px] text-secondary">Was 28 Oct · moved 3 days, note updated</p>
          <div className="flex gap-2">
            <Button size="s" kind="secondary" onClick={onEdit}>
              Cancel
            </Button>
            <Button size="s" onClick={onSave} leadingIcon={<Check size={14} />}>
              Save deliverable
            </Button>
          </div>
        </footer>
      )}
    </article>
  );
}

function ChangesSentConfirmation({
  creator,
  projectId,
  projectName,
  oneTime,
  chargedNow,
  creatorFee,
}: {
  creator: { name: string; handle: string; avatar: string };
  projectId: string;
  projectName: string;
  oneTime: boolean;
  chargedNow: number;
  creatorFee: number;
}) {
  const navigate = useNavigate();
  const firstName = creator.name.split(" ")[0];
  const money = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;
  const addedType = oneTime ? "Reel" : "Short";
  const addedDetail = oneTime ? "Launch day look" : "gifting";
  const adjustedType = oneTime ? "Story · last-day reminder" : "Story · code reminder";
  const deadline = oneTime ? "4 Nov" : "20 Dec";

  return (
    <BrandShell>
      <div className="w-full pb-10">
        <nav className="flex flex-wrap items-center gap-2 text-[12px] leading-4 text-secondary">
          <Link to="/brand/projects">Projects</Link>
          <span>/</span>
          <Link to={brandProjectRoute(projectId)}>{projectName}</Link>
          <span>/</span>
          <Link to={brandProjectRoute(projectId)}>Invited creators</Link>
          <span>/</span>
          <span>{creator.name}</span>
          <span>/</span>
          <span className="text-ink">Edit deliverables</span>
        </nav>
        <header className="mt-2">
          <h1 className="!m-0 text-[26px] font-bold leading-[34px] tracking-[-.02em] text-ink">
            Changes sent to {creator.name}
          </h1>
          <p className="mt-1 text-[13px] leading-5 text-secondary">
            {creator.handle} · Bengaluru · Instagram 1.1 L · {projectName}
          </p>
        </header>

        <motion.main
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 overflow-hidden rounded-xl border border-line bg-white"
        >
          <div className="space-y-4 px-6 pb-5 pt-8">
            <div className="grid size-14 place-items-center rounded-full bg-success-bg text-success">
              <CheckCircle2 size={28} />
            </div>
            <p className="text-[13px] leading-5 text-secondary">
              {money(chargedNow)} paid · held until you approve the new {addedType}
            </p>

            <section className="grid gap-2 sm:grid-cols-2">
              <article className="rounded-lg border border-line px-3 py-2.5">
                <h2 className="text-[14px] font-medium leading-[22px] text-ink">{adjustedType}</h2>
                <span className="mt-1 inline-flex rounded-full bg-primary-subtle px-2 py-0.5 text-[12px] font-medium text-primary">
                  • date change · waiting for OK
                </span>
              </article>
              <article className="rounded-lg border border-line px-3 py-2.5">
                <h2 className="text-[14px] font-medium leading-[22px] text-ink">
                  {addedType} · {addedDetail}
                </h2>
                <span className="mt-1 inline-flex rounded-full bg-warning-bg px-2 py-0.5 text-[12px] font-medium text-warning">
                  • {deadline} · {money(chargedNow)} held
                </span>
              </article>
            </section>

            <section className="rounded-lg bg-subtle px-3.5 py-3">
              <h2 className="text-[14px] font-medium leading-[22px] text-ink">What happens next</h2>
              <ul className="mt-2 space-y-2 text-[12px] leading-4 text-secondary">
                <li className="flex gap-2">
                  <Check size={14} className="mt-0.5 shrink-0 text-success" />
                  {firstName} gets both changes, the brief, tracking link and coupon in Messages.
                </li>
                <li className="flex gap-2">
                  <Check size={14} className="mt-0.5 shrink-0 text-success" />
                  The creator has 48 hours to accept. If not accepted, {money(chargedNow)} is
                  refunded automatically.
                </li>
                <li className="flex gap-2">
                  <Check size={14} className="mt-0.5 shrink-0 text-success" />
                  Nothing changes until accepted; the revised date and new {addedType} remain
                  pending.
                </li>
              </ul>
            </section>
          </div>
          <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-line bg-subtle px-6 py-4">
            <div>
              <p className="text-[14px] font-medium leading-[22px] text-ink">
                {projectName} · creator changes awaiting approval
              </p>
              <p className="mt-0.5 text-[12px] leading-4 text-secondary">
                Creator fee becomes {money(creatorFee)} once accepted
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button kind="secondary" onClick={() => navigate(brandProjectRoute(projectId))}>
                Done
              </Button>
              <Button
                onClick={() =>
                  navigate(brandInvitedCreatorRoute(projectId, creator.handle.slice(1)))
                }
                leadingIcon={<ArrowLeft size={16} />}
              >
                Back to creator page
              </Button>
            </div>
          </footer>
        </motion.main>
      </div>
    </BrandShell>
  );
}

function OneTimeReviewPay({
  creator,
  addedFee,
  projectId = "1",
  projectName = "Vitamin-C Serum",
  oneTime = true,
  onBack,
}: {
  creator: { name: string; handle: string; avatar: string };
  addedFee: number;
  projectId?: string;
  projectName?: string;
  oneTime?: boolean;
  onBack: () => void;
}) {
  const [consented, setConsented] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card">("upi");
  const [paymentSent, setPaymentSent] = useState(false);
  const gst = Math.round(addedFee * 0.18);
  const chargedNow = addedFee + gst;
  const previousFee = 17000;
  const nextFee = previousFee + addedFee;
  const firstName = creator.name.split(" ")[0];
  const money = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;
  if (paymentSent) {
    return (
      <ChangesSentConfirmation
        creator={creator}
        projectId={projectId}
        projectName={projectName}
        oneTime={oneTime}
        chargedNow={chargedNow}
        creatorFee={nextFee}
      />
    );
  }

  return (
    <BrandShell>
      <div className="w-full pb-10">
        <nav className="flex flex-wrap items-center gap-2 text-[12px] leading-4 text-secondary">
          <Link to="/brand/projects">Projects</Link>
          <span>/</span>
          <Link to={brandProjectRoute(projectId)}>{projectName}</Link>
          <span>/</span>
          <Link to={brandProjectRoute(projectId)}>Invited creators</Link>
          <span>/</span>
          <span>{creator.name}</span>
          <span>/</span>
          <span className="text-ink">Edit deliverables</span>
        </nav>
        <header className="mt-2">
          <div className="flex items-center gap-2">
            <img
              src={`/assets/creators/${creator.avatar}.png`}
              alt=""
              className="size-9 rounded-full object-cover"
            />
            <h1 className="!m-0 text-[26px] font-bold leading-[34px] tracking-[-.02em] text-ink">
              Review changes · {creator.name}
            </h1>
          </div>
          <p className="mt-1 text-[13px] leading-5 text-secondary">
            {creator.handle} · Bengaluru · Instagram 1.1 L · {projectName}
          </p>
        </header>

        <section className="mt-5 flex items-center rounded-xl border border-line bg-white px-5 py-3.5">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <span className="grid size-[22px] shrink-0 place-items-center rounded-full bg-primary text-[12px] text-white">
              <Check size={13} strokeWidth={2.5} />
            </span>
            <span className="shrink-0 text-[13px] text-secondary">Edit deliverables</span>
            <span className="h-0.5 min-w-5 flex-1 bg-primary" />
          </div>
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <span className="grid size-[22px] shrink-0 place-items-center rounded-full bg-primary text-[12px] font-medium text-white">
              2
            </span>
            <span className="shrink-0 text-[13px] font-medium text-ink">Review &amp; pay</span>
          </div>
        </section>

        <motion.main
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 overflow-hidden rounded-xl border border-line bg-white"
        >
          <div className="space-y-4 px-6 pb-5 pt-2">
            <section className="overflow-hidden rounded-lg border border-line text-[13px] leading-5">
              <div className="flex items-center justify-between gap-4 px-3.5 py-2.5">
                <span className="text-secondary">
                  New deliverable · {oneTime ? "1 Reel · Launch day look" : "1 Short · gifting"} ·
                  creator fee
                </span>
                <strong className="font-medium text-ink">{money(addedFee)}</strong>
              </div>
              <div className="flex items-center justify-between gap-4 px-3.5 py-2.5">
                <span className="text-secondary">Floooww fee</span>
                <span className="text-ink">Free</span>
              </div>
              <div className="flex items-center justify-between gap-4 px-3.5 py-2.5">
                <span className="text-secondary">GST (18%)</span>
                <span className="text-ink">{money(gst)}</span>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-line bg-subtle px-3.5 py-2.5 text-[14px]">
                <strong className="font-medium">Charged now</strong>
                <strong className="font-semibold">{money(chargedNow)}</strong>
              </div>
            </section>

            <label className="flex cursor-pointer gap-2.5 rounded-[10px] border border-primary bg-primary-subtle px-3.5 py-3">
              <input
                checked={consented}
                onChange={(event) => setConsented(event.target.checked)}
                type="checkbox"
                className="sr-only peer"
              />
              <span className="grid size-[18px] shrink-0 place-items-center rounded border-[1.5px] border-primary bg-white text-white transition peer-checked:bg-primary">
                {consented && <Check size={14} strokeWidth={2.5} />}
              </span>
              <span>
                <span className="block text-[14px] font-medium leading-[22px] text-ink">
                  I agree to be charged {money(chargedNow)} now for the added{" "}
                  {oneTime ? "Reel" : "Short"}
                </span>
                <span className="mt-0.5 block text-[12px] leading-4 text-secondary">
                  Held in escrow and released to {firstName} only after I approve the Reel. If the
                  creator declines within 48 hours, {money(chargedNow)} is refunded automatically.
                  The Story date change has no cost.
                </span>
              </span>
            </label>

            <p className="text-[12px] leading-4 text-secondary">Pay with</p>
            <section className="overflow-hidden rounded-lg border border-line">
              <button
                type="button"
                onClick={() => setPaymentMethod("upi")}
                className={`flex w-full items-center gap-2.5 px-3.5 py-3 text-left ${paymentMethod === "upi" ? "bg-primary-subtle" : "bg-white"}`}
              >
                <span
                  className={`grid size-[18px] shrink-0 place-items-center rounded-full border-2 ${paymentMethod === "upi" ? "border-primary" : "border-line"}`}
                >
                  <span
                    className={
                      paymentMethod === "upi" ? "size-2 rounded-full bg-primary" : "hidden"
                    }
                  />
                </span>
                <span>
                  <span className="block text-[14px] font-medium leading-[22px] text-ink">
                    UPI · minimalist@okhdfcbank
                  </span>
                  <span className="block text-[12px] leading-4 text-secondary">
                    Approve once in your UPI app
                  </span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`flex w-full items-center gap-2.5 border-t border-line px-3.5 py-3 text-left ${paymentMethod === "card" ? "bg-primary-subtle" : "bg-white"}`}
              >
                <span
                  className={`grid size-[18px] shrink-0 place-items-center rounded-full border-2 ${paymentMethod === "card" ? "border-primary" : "border-line"}`}
                >
                  <span
                    className={
                      paymentMethod === "card" ? "size-2 rounded-full bg-primary" : "hidden"
                    }
                  />
                </span>
                <span>
                  <span className="block text-[14px] font-medium leading-[22px] text-ink">
                    Visa •••• 4242
                  </span>
                  <span className="block text-[12px] leading-4 text-secondary">
                    Card charged once · expires 08/28
                  </span>
                </span>
              </button>
              <button
                type="button"
                className="flex w-full items-center gap-2 border-t border-line px-3.5 py-2.5 text-[13px] text-primary"
              >
                <Plus size={14} />
                Add another payment method
              </button>
            </section>
          </div>
          <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-line bg-subtle px-6 py-4">
            <div>
              <p className="text-[14px] font-medium leading-[22px] text-ink">
                Today {money(chargedNow)} ·{" "}
                {oneTime
                  ? "one-time project, nothing else is charged"
                  : "this cycle's change is charged now"}
              </p>
              <p className="mt-0.5 text-[12px] leading-4 text-secondary">
                Creator fee {money(previousFee)} → {money(nextFee)} · GST invoice on payment
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button kind="secondary" onClick={onBack} leadingIcon={<ArrowLeft size={16} />}>
                Back
              </Button>
              <Button
                disabled={!consented}
                onClick={() => setPaymentSent(true)}
                leadingIcon={<Send size={16} />}
              >
                {`Pay ${money(chargedNow)} & send to ${firstName}`}
              </Button>
            </div>
          </footer>
        </motion.main>
      </div>
    </BrandShell>
  );
}

function OneTimeDeliverablesEditor({
  projectId,
  creator,
  project,
}: {
  projectId: string;
  creator: { name: string; handle: string; avatar: string };
  project: ReturnType<typeof getProject>;
}) {
  const navigate = useNavigate();
  const [rows, setRows] = useState(oneTimeRows);
  const [editingId, setEditingId] = useState<string | null>("results");
  const [reviewing, setReviewing] = useState(false);
  const firstName = creator.name.split(" ")[0];
  const patch = (id: string, change: Partial<OneTimeRow>) =>
    setRows((current) => current.map((row) => (row.id === id ? { ...row, ...change } : row)));
  const changes = rows.filter((row) => row.added).length + (editingId ? 1 : 0);
  const addedFee = rows
    .filter((row) => row.added)
    .reduce((total, row) => total + Number(row.fee), 0);
  if (reviewing) {
    return (
      <OneTimeReviewPay creator={creator} addedFee={addedFee} onBack={() => setReviewing(false)} />
    );
  }
  return (
    <BrandShell>
      <div className="w-full pb-10">
        <nav className="flex flex-wrap items-center gap-2 text-[12px] leading-4 text-secondary">
          <Link to="/brand/projects">Projects</Link>
          <span>/</span>
          <Link to={brandProjectRoute(projectId)}>{project.name}</Link>
          <span>/</span>
          <Link to={brandProjectRoute(projectId)}>Invited creators</Link>
          <span>/</span>
          <Link to={brandCreatorProfileRoute(projectId, creator.handle.slice(1))}>
            {creator.name}
          </Link>
          <span>/</span>
          <span className="text-ink">Edit deliverables</span>
        </nav>
        <header className="mt-2">
          <div className="flex items-center gap-2">
            <img
              src={`/assets/creators/${creator.avatar}.png`}
              alt=""
              className="size-9 rounded-full object-cover"
            />
            <h1 className="!m-0 text-[26px] font-bold leading-[34px] tracking-[-.02em] text-ink">
              Edit {firstName}’s deliverables · Vitamin-C Serum
            </h1>
          </div>
          <p className="mt-1 text-[13px] leading-5 text-secondary">
            One-time project · ends 7 Nov · today 28 Oct · opened from Invited creators →{" "}
            {firstName} → Edit deliverables
          </p>
        </header>
        <motion.main
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 overflow-hidden rounded-xl border border-line bg-white"
        >
          <div className="space-y-4 p-6">
            <section className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-subtle px-4 py-3.5">
              <div>
                <h2 className="text-[14px] font-semibold text-ink">Vitamin-C Serum</h2>
                <p className="mt-0.5 text-[12px] text-secondary">Influencer · Paid · One-time</p>
                <p className="mt-3 text-[12px] text-secondary">Dates</p>
                <p className="mt-1 text-[13px] text-ink">7 Oct – 7 Nov 2026 · 10 days left</p>
              </div>
              <span className="h-fit rounded-full bg-success-bg px-2 py-0.5 text-[12px] font-medium text-success">
                • Live · 10 days left
              </span>
            </section>
            <p className="flex items-center gap-2 text-[12px] leading-5 text-secondary">
              <Info size={15} />
              One-time project, one period, no repeating cycles. Completed deliverables are locked;
              the deadline must fall before 7 Nov.
            </p>
            <section className="overflow-hidden rounded-lg border border-line">
              <header className="flex flex-wrap items-center justify-between gap-3 bg-subtle px-4 py-3">
                <div className="flex items-start gap-2">
                  <RotateCcw size={16} className="mt-0.5 text-secondary" />
                  <div>
                    <h2 className="text-[14px] font-semibold text-ink">
                      Deliverables · 7 Oct – 7 Nov
                    </h2>
                    <p className="mt-1 text-[12px] text-secondary">
                      Paid ₹20,060 on 6 Oct · held in escrow · released as you approve each
                      deliverable
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-primary-subtle px-2 py-0.5 text-[12px] font-medium text-primary">
                  • In progress
                </span>
              </header>
              <div className="overflow-x-auto">
                <div className="min-w-[1080px]">
                  <div className="grid grid-cols-[220px_130px_140px_170px_170px_130px_24px] gap-2 bg-subtle px-4 py-3 text-[12px] font-medium text-secondary">
                    <span>Deliverable</span>
                    <span>Platform</span>
                    <span>Deadline</span>
                    <span>Tracking link</span>
                    <span>Coupon code</span>
                    <span>Status</span>
                    <span />
                  </div>
                  {rows.map((row) => (
                    <OneTimeRowEditor
                      key={row.id}
                      row={row}
                      editing={editingId === row.id}
                      onEdit={() => setEditingId(editingId === row.id ? null : row.id)}
                      onSave={() => setEditingId(null)}
                      onChange={(change) => patch(row.id, change)}
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      setRows((current) => [
                        ...current,
                        {
                          ...oneTimeRows[3],
                          id: `new-${current.length}`,
                          added: true,
                          status: "Added · new",
                        },
                      ])
                    }
                    className="flex h-12 items-center gap-2 px-4 text-[13px] font-medium text-primary transition hover:bg-primary-subtle"
                  >
                    <Plus size={16} />
                    Add deliverable · extra cost charged now
                  </button>
                </div>
              </div>
            </section>
            <section className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-lg border border-line px-4 py-3">
                <h2 className="text-[14px] font-medium text-ink">
                  What changes when {firstName} accepts
                </h2>
                <dl className="mt-2 space-y-1 text-[13px] leading-5">
                  <div className="flex justify-between">
                    <dt className="text-secondary">Charged now · new Reel</dt>
                    <dd className="font-medium text-ink">₹4,720</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-secondary">Story moved 30 → 31 Oct</dt>
                    <dd className="font-medium text-ink">No change</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-secondary">Creator fee</dt>
                    <dd className="font-medium text-ink">₹17,000 → ₹21,000</dd>
                  </div>
                </dl>
              </div>
              <div className="rounded-lg bg-subtle px-4 py-3">
                <h2 className="text-[14px] font-medium text-ink">How edits work</h2>
                <ul className="mt-2 space-y-1 text-[12px] leading-4 text-secondary">
                  <li>✓ Completed deliverables (posted or approved) are locked.</li>
                  <li>
                    ✓ Anything not started can be edited, added or removed until the project ends on
                    7 Nov.
                  </li>
                  <li>
                    ✓ {firstName} accepts changes in Messages; extra cost is charged now, savings
                    refunded now.
                  </li>
                  <li>
                    ✓ Extra fees are held in escrow and refunded automatically if the creator
                    declines within 48 hours.
                  </li>
                </ul>
              </div>
            </section>
          </div>
          <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-line bg-subtle px-6 py-4">
            <div>
              <p className="text-[14px] font-medium text-ink">{`${changes} changes to send`}</p>
              <p className="mt-0.5 text-[12px] text-secondary">
                Story moved to 31 Oct · Reel added (₹4,000)
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button kind="secondary" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setEditingId(null);
                  setReviewing(true);
                }}
                leadingIcon={<Send size={16} />}
              >
                Review changes
              </Button>
            </div>
          </footer>
        </motion.main>
      </div>
    </BrandShell>
  );
}

export function BrandCreatorDeliverablesEditPage() {
  const { projectId = "1", creatorId = "diya" } = useParams();
  const navigate = useNavigate();
  const creator = useMemo(() => getCreatorProfile(creatorId), [creatorId]);
  const project = getProject(Number(projectId));
  const rules = getProjectRules(project);
  const [cycleOne, setCycleOne] = useState(firstCycle);
  const [cycleTwo, setCycleTwo] = useState(secondCycle);
  const [editingId, setEditingId] = useState<string | null>("cycle-2-reminder");
  const [repeat, setRepeat] = useState(true);
  const [notice, setNotice] = useState("");
  const [reviewingChanges, setReviewingChanges] = useState(false);
  const hasChanges = cycleTwo.some((item) => item.changed) || editingId !== null;
  const patchCycle = (
    setter: Dispatch<SetStateAction<Deliverable[]>>,
    id: string,
    data: Partial<Deliverable>,
  ) =>
    setter((current) =>
      current.map((item) => (item.id === id ? { ...item, ...data, changed: true } : item)),
    );
  const save = () => {
    setEditingId(null);
    setNotice("Deliverable saved. Send changes when you are ready.");
  };
  if (!rules.isLongTerm) {
    return <OneTimeDeliverablesEditor projectId={projectId} creator={creator} project={project} />;
  }
  if (reviewingChanges) {
    return (
      <OneTimeReviewPay
        creator={creator}
        projectId={projectId}
        projectName={project.name}
        oneTime={false}
        addedFee={2500}
        onBack={() => setReviewingChanges(false)}
      />
    );
  }
  return (
    <BrandShell>
      <div className="w-full pb-10">
        <nav className="flex flex-wrap items-center gap-2 text-[12px] text-secondary">
          <Link to="/brand/projects">Projects</Link>
          <span>/</span>
          <Link to={brandProjectRoute(projectId)}>{project.name}</Link>
          <span>/</span>
          <Link to={brandProjectRoute(projectId)}>Invited creators</Link>
          <span>/</span>
          <Link to={brandCreatorProfileRoute(projectId, creator.handle.slice(1))}>
            {creator.name}
          </Link>
          <span>/</span>
          <span className="text-ink">Edit deliverables</span>
        </nav>
        <header className="mt-2">
          <h1 className="text-[28px] font-semibold leading-8 tracking-[-.02em] text-ink">
            Edit {creator.name.split(" ")[0]}’s deliverables · Glow Squad
          </h1>
          <p className="mt-1 text-[13px] leading-5 text-secondary">
            Repeating every cycle until 31 Jan 2027 · today 16 Nov · opened from Invited creators →{" "}
            {creator.name.split(" ")[0]} → Edit deliverables
          </p>
        </header>
        <motion.main
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 overflow-hidden rounded-xl border border-line bg-white"
        >
          <div className="p-5">
            <div className="flex flex-wrap justify-between gap-3 rounded-lg bg-subtle px-4 py-3.5">
              <div>
                <h2 className="text-[14px] font-semibold text-ink">{project.name}</h2>
                <p className="mt-1 text-[12px] text-secondary">Influencer · Paid · Long-term</p>
                <p className="mt-3 text-[12px] text-secondary">Dates</p>
                <p className="mt-1 text-[13px] text-ink">
                  1 Aug 2026 – 31 Jan 2027 · 3 months left
                </p>
              </div>
              <span className="h-fit rounded-full bg-success-bg px-2 py-0.5 text-[12px] font-medium text-success">
                • Live · month 4 of 6
              </span>
            </div>
            <p className="mt-4 flex items-center gap-2 text-[12px] leading-5 text-secondary">
              <Info size={15} />
              Cycles are made automatically from the day {creator.name.split(" ")[0]} accepted (2
              Nov). You never pick a cycle; the deadline you choose puts a deliverable in the right
              one.
            </p>
            <div className="mt-4 space-y-4">
              <CycleCard
                title="Cycle 1 · 2 Nov – 1 Dec"
                subtitle="Charged ₹14,750 on 2 Nov · held in escrow"
                status="In progress"
                items={cycleOne}
                editingId={editingId}
                onEdit={setEditingId}
                onSave={save}
                onChange={(id, data) => patchCycle(setCycleOne, id, data)}
                addLabel="Add deliverable to cycle 1 · extra cost charged now"
              />
              <CycleCard
                title="Cycle 2 · 2 Dec – 1 Jan"
                subtitle="Charged on 2 Dec · ₹15,000 with the new Short"
                status="Upcoming"
                items={cycleTwo}
                editingId={editingId}
                onEdit={setEditingId}
                onSave={save}
                onChange={(id, data) => patchCycle(setCycleTwo, id, data)}
                addLabel="Add deliverable to cycle 2"
              />
              <section className="overflow-hidden rounded-lg border border-line">
                <header className="flex flex-wrap items-center justify-between gap-3 bg-subtle px-4 py-3">
                  <div className="flex items-start gap-2">
                    <RotateCcw size={16} className="mt-0.5 text-secondary" />
                    <div>
                      <h2 className="text-[14px] font-semibold text-ink">
                        Cycle 3 · 2 Jan – 31 Jan
                      </h2>
                      <p className="mt-1 text-[12px] text-secondary">
                        Charged on 2 Jan · ₹12,500 · same as cycle 1
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full px-2 py-0.5 text-[12px] font-medium text-neutral">
                    • Upcoming
                  </span>
                </header>
                <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                  <p className="flex items-center gap-2 text-[13px] text-secondary">
                    <ChevronDown size={16} className="-rotate-90" />3 deliverables · Reel 10 Jan,
                    Stories 15 and 28 Jan · ₹12,500
                  </p>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 text-[13px] font-medium text-primary"
                  >
                    <Pencil size={15} />
                    Edit cycle 3
                  </button>
                </div>
              </section>
              <section className="rounded-lg bg-subtle px-4 py-3">
                <h2 className="text-[14px] font-medium text-ink">How edits work</h2>
                <ul className="mt-2 space-y-1 text-[12px] leading-4 text-secondary">
                  <li>✓ Completed deliverables (posted or approved) are locked.</li>
                  <li>
                    ✓ Anything not started, in this cycle or later ones, can be edited, added or
                    removed.
                  </li>
                  <li>
                    ✓ {creator.name.split(" ")[0]} accepts changes in Messages; extra cost in the
                    current cycle is charged now.
                  </li>
                  <li>
                    ✓ Turn off repeating any time; nothing is charged after the current cycle.
                  </li>
                </ul>
              </section>
            </div>
          </div>
          <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-line bg-subtle/70 px-5 py-4">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={repeat}
                onChange={(event) => setRepeat(event.target.checked)}
                className="sr-only peer"
              />
              <span className="relative h-5 w-9 rounded-full bg-line-strong transition peer-checked:bg-primary after:absolute after:left-0.5 after:top-0.5 after:size-4 after:rounded-full after:bg-white after:transition peer-checked:after:translate-x-4" />
              <span>
                <span className="block text-[14px] font-medium text-ink">
                  Repeating every cycle · {hasChanges ? "2 changes to send" : "up to date"}
                </span>
                <span className="mt-0.5 block text-[12px] text-secondary">
                  Story moved to 17 Dec · Short added to cycle 2
                </span>
              </span>
            </label>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setRepeat(false)}
                className="text-[13px] font-medium text-danger"
              >
                Stop repeating
              </button>
              <Button kind="secondary" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button onClick={() => setReviewingChanges(true)} leadingIcon={<Send size={16} />}>
                Send changes to {creator.name.split(" ")[0]}
              </Button>
            </div>
          </footer>
        </motion.main>
        {notice && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-lg bg-ink px-4 py-3 text-[13px] font-medium text-white shadow-lg"
          >
            {notice}
          </motion.div>
        )}
      </div>
    </BrandShell>
  );
}
