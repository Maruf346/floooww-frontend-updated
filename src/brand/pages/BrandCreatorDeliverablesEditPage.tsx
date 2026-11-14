import { useMemo, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import {
  CalendarDays,
  Check,
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
import { Dropdown } from "@/common/components/ui/Dropdown";
import {
  brandCreatorProfileRoute,
  brandProjectRoute,
} from "@/common/constants/routes";
import { getCreatorProfile } from "./project-applications/creatorProfileData";

type Status =
  | "Approved · locked"
  | "Posted · locked"
  | "Not started"
  | "Upcoming"
  | "Added · new";
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
const usageOptions = [
  "Organic",
  "Paid social · 30 days",
  "Paid social · 90 days",
  "Perpetual",
];
const productOptions = [
  "Glow Squad kit",
  "Vitamin C Glow Serum",
  "Festive gift set",
];
const shipmentOptions = [
  "Delivered 4 Nov",
  "Glow Squad kit · BD7731045…",
  "Select shipments",
];

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

function InputShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
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
            Editing:{" "}
            {item.type.replace(
              "1 Story · code + swatch",
              "1 Story · code reminder",
            )}
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
        <InputShell>
          <CalendarDays size={15} className="mr-2 shrink-0 text-secondary" />
          <input
            aria-label="Deadline"
            type="date"
            value={item.deadline}
            onChange={(event) => onChange({ deadline: event.target.value })}
            className="min-w-0 flex-1 bg-transparent text-[13px] outline-none"
          />
        </InputShell>
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
            onChange={(event) =>
              onChange({ fee: event.target.value.replace(/[^0-9]/g, "") })
            }
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
          <p className="text-[12px] text-secondary">
            Was 15 Dec · moved 2 days, note updated
          </p>
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

export function BrandCreatorDeliverablesEditPage() {
  const { projectId = "1", creatorId = "diya" } = useParams();
  const navigate = useNavigate();
  const creator = useMemo(() => getCreatorProfile(creatorId), [creatorId]);
  const [cycleOne, setCycleOne] = useState(firstCycle);
  const [cycleTwo, setCycleTwo] = useState(secondCycle);
  const [editingId, setEditingId] = useState<string | null>("cycle-2-reminder");
  const [repeat, setRepeat] = useState(true);
  const [notice, setNotice] = useState("");
  const hasChanges =
    cycleTwo.some((item) => item.changed) || editingId !== null;
  const patchCycle = (
    setter: Dispatch<SetStateAction<Deliverable[]>>,
    id: string,
    data: Partial<Deliverable>,
  ) =>
    setter((current) =>
      current.map((item) =>
        item.id === id ? { ...item, ...data, changed: true } : item,
      ),
    );
  const save = () => {
    setEditingId(null);
    setNotice("Deliverable saved. Send changes when you are ready.");
  };
  const send = () => {
    setCycleTwo((items) => items.map((item) => ({ ...item, changed: false })));
    setEditingId(null);
    setNotice(`Changes sent to ${creator.name.split(" ")[0]}.`);
  };
  return (
    <BrandShell>
      <div className="w-full pb-10">
        <nav className="flex flex-wrap items-center gap-2 text-[12px] text-secondary">
          <Link to="/brand/projects">Projects</Link>
          <span>/</span>
          <Link to={brandProjectRoute(projectId)}>Glow Squad</Link>
          <span>/</span>
          <Link to={brandProjectRoute(projectId)}>Invited creators</Link>
          <span>/</span>
          <Link
            to={brandCreatorProfileRoute(projectId, creator.handle.slice(1))}
          >
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
            Repeating every cycle until 31 Jan 2027 · today 16 Nov · opened from
            Invited creators → {creator.name.split(" ")[0]} → Edit deliverables
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
                <h2 className="text-[14px] font-semibold text-ink">
                  Glow Squad
                </h2>
                <p className="mt-1 text-[12px] text-secondary">
                  Influencer · Paid · Long-term
                </p>
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
              Cycles are made automatically from the day{" "}
              {creator.name.split(" ")[0]} accepted (2 Nov). You never pick a
              cycle; the deadline you choose puts a deliverable in the right
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
                    <ChevronDown size={16} className="-rotate-90" />3
                    deliverables · Reel 10 Jan, Stories 15 and 28 Jan · ₹12,500
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
                <h2 className="text-[14px] font-medium text-ink">
                  How edits work
                </h2>
                <ul className="mt-2 space-y-1 text-[12px] leading-4 text-secondary">
                  <li>
                    ✓ Completed deliverables (posted or approved) are locked.
                  </li>
                  <li>
                    ✓ Anything not started, in this cycle or later ones, can be
                    edited, added or removed.
                  </li>
                  <li>
                    ✓ {creator.name.split(" ")[0]} accepts changes in Messages;
                    extra cost in the current cycle is charged now.
                  </li>
                  <li>
                    ✓ Turn off repeating any time; nothing is charged after the
                    current cycle.
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
                  Repeating every cycle ·{" "}
                  {hasChanges ? "2 changes to send" : "up to date"}
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
              <Button onClick={send} leadingIcon={<Send size={16} />}>
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
