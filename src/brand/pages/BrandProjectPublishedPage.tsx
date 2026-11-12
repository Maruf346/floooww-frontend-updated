import { useState } from "react";
import {
  Archive,
  CalendarDays,
  Check,
  Eye,
  FileText,
  Megaphone,
  MoreHorizontal,
  Pause,
  Play,
  Share2,
  Trash2,
  Users,
  Video,
  WalletCards,
} from "lucide-react";
import { BrandShell } from "@/brand/components/BrandShell";
import { Button } from "@/common/components/ui/Button";
import { DateRangePicker } from "@/common/components/ui/DateRangePicker";
import { ROUTES } from "@/common/constants/routes";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

type Lifecycle = "Upcoming" | "Live" | "Paused" | "Completed" | "Archived" | "Deleted";
type Confirm = "Pause" | "Archive" | "Delete" | null;
const tabs = [
  "Overview",
  "Applications",
  "Invited creators",
  "Content",
  "Payments",
  "Performance",
  "Brief",
];
const timeline = [
  ["Project created", "Brief and deliverables added", "20 Sep"],
  ["Published", "₹2,00,000 funded to escrow", "20 Sep"],
  ["Invite creators", "16 places to fill", "Now"],
  ["Launch", "Creators can start delivering", "7 Oct"],
  ["Final deadline", "Last creator deadline", "3 Nov"],
  ["Project ends", "Usage rights until 7 Dec", "7 Nov"],
];
const meta: Record<Lifecycle, { tone: string; detail: string }> = {
  Upcoming: {
    tone: "bg-primary-subtle text-primary",
    detail: "7 Oct – 7 Nov 2026 · starts in 17 days",
  },
  Live: { tone: "bg-success-bg text-success", detail: "7 Oct – 7 Nov 2026 · live now" },
  Paused: { tone: "bg-[#fff3da] text-[#c77900]", detail: "Paused · deadlines are on hold" },
  Completed: { tone: "bg-success-bg text-success", detail: "7 Oct – 7 Nov 2026 · completed" },
  Archived: { tone: "bg-muted text-secondary", detail: "Archived · read-only" },
  Deleted: { tone: "bg-[#fde4e3] text-[#db231f]", detail: "Deleted · kept for 30 days" },
};

function Badge({ status }: { status: Lifecycle }) {
  return (
    <span
      className={`inline-flex h-5 items-center gap-1.5 rounded-full px-2 text-[12px] font-medium ${meta[status].tone}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
function Metric({
  icon: Icon,
  color,
  label,
  value,
  detail,
}: {
  icon: typeof Megaphone;
  color: string;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <article className="rounded-xl border border-line-subtle bg-white p-4">
      <span className={`flex size-9 items-center justify-center rounded-md text-white ${color}`}>
        <Icon size={18} />
      </span>
      <p className="mt-3 text-[12px] leading-4 text-secondary">{label}</p>
      <p className="text-[22px] font-semibold leading-7 tracking-[-.06em] text-ink">{value}</p>
      <p className="mt-2 text-[12px] font-medium leading-4 text-tertiary">{detail}</p>
    </article>
  );
}
function ConfirmDialog({
  action,
  done,
  cancel,
}: {
  action: Exclude<Confirm, null>;
  done: () => void;
  cancel: () => void;
}) {
  const desc =
    action === "Pause"
      ? "New applications and invites will stop. Existing creators will be told to hold, and deadlines will pause."
      : action === "Archive"
        ? "It will become read-only and move to archived projects. You can restore it later."
        : "It will be kept for 30 days before removal.";
  return (
    <div className="fixed inset-0 z-[10000] grid place-items-center bg-ink/30 p-4">
      <section className="w-full max-w-[420px] rounded-xl border border-line bg-white p-6 shadow-[0_16px_40px_rgba(8,10,20,.18)]">
        <h2 className="text-[18px] font-semibold text-ink">{action} this project?</h2>
        <p className="mt-2 text-[14px] leading-[22px] text-secondary">{desc}</p>
        <div className="mt-6 flex justify-end gap-2">
          <Button kind="secondary" onClick={cancel}>
            Cancel
          </Button>
          <Button
            className={action === "Delete" ? "bg-[#db231f] hover:bg-[#b91c1c]" : ""}
            onClick={done}
          >
            {action} project
          </Button>
        </div>
      </section>
    </div>
  );
}

export function BrandProjectPublishedPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<Lifecycle>("Upcoming");
  const [tab, setTab] = useState("Overview");
  const [more, setMore] = useState(false);
  const [confirm, setConfirm] = useState<Confirm>(null);
  const locked = status === "Archived" || status === "Deleted";
  const resolve = () => {
    if (confirm === "Pause") setStatus("Paused");
    if (confirm === "Archive") setStatus("Archived");
    if (confirm === "Delete") setStatus("Deleted");
    setConfirm(null);
    setMore(false);
  };
  return (
    <BrandShell>
      <main className="mx-auto w-full max-w-[1440px] pb-10">
        <header className="flex flex-col justify-between gap-4 lg:h-[122px] lg:flex-row">
          <div>
            <p className="text-[12px] leading-4 text-tertiary">
              Projects&nbsp;&nbsp;/&nbsp;&nbsp;Vitamin-C Serum
            </p>
            <h1 className="mt-1 text-[26px] font-bold leading-[34px] tracking-[-.02em] text-ink">
              Vitamin-C Serum
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <Badge status={status} />
              <p className="text-[13px] leading-5 text-secondary">{meta[status].detail}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-end gap-2">
            <DateRangePicker value="1 Oct - 28 Oct 2026" showCompare={false} />
            <Button
              kind="secondary"
              leadingIcon={<Share2 size={16} />}
              onClick={() => navigator.clipboard?.writeText(window.location.href)}
            >
              Share
            </Button>
            <Button disabled={locked} leadingIcon={<Users size={16} />}>
              Invite creators
            </Button>
            <div className="relative">
              <button
                title="More project actions"
                type="button"
                onClick={() => setMore(!more)}
                className="flex size-10 items-center justify-center rounded-md border border-line bg-white hover:bg-subtle"
              >
                <MoreHorizontal size={18} />
              </button>
              {more && (
                <div className="absolute right-0 top-12 z-50 w-[196px] rounded-lg border border-line bg-white p-1.5 shadow-[0_8px_24px_rgba(0,0,0,.12)]">
                  <button
                    className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[13px] hover:bg-subtle"
                    onClick={() => navigate(ROUTES.brandProjects)}
                  >
                    <Eye size={14} />
                    Back to projects
                  </button>
                  {status === "Paused" ? (
                    <button
                      className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[13px] hover:bg-subtle"
                      onClick={() => {
                        setStatus("Live");
                        setMore(false);
                      }}
                    >
                      <Play size={14} />
                      Resume project
                    </button>
                  ) : (
                    !locked && (
                      <button
                        className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[13px] hover:bg-subtle"
                        onClick={() => setConfirm("Pause")}
                      >
                        <Pause size={14} />
                        Pause project
                      </button>
                    )
                  )}
                  <button
                    className="mt-1 flex w-full items-center gap-2.5 border-t border-line px-2.5 pt-3 pb-2 text-left text-[13px] hover:bg-subtle"
                    onClick={() => setConfirm("Archive")}
                  >
                    <Archive size={14} />
                    Archive
                  </button>
                  <button
                    className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[13px] text-[#db231f] hover:bg-[#fde4e3]"
                    onClick={() => setConfirm("Delete")}
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        <nav className="mt-6 flex h-[37px] gap-6 overflow-x-auto border-b border-line">
          {tabs.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              className={`h-9 shrink-0 border-b-2 text-[14px] leading-[22px] ${tab === item ? "border-primary font-medium text-primary" : "border-transparent text-secondary"}`}
            >
              {item}
              {["Applications", "Invited creators", "Content"].includes(item) && (
                <span className="ml-1.5 rounded-full bg-muted px-[7px] py-px text-[12px] leading-4">
                  0
                </span>
              )}
            </button>
          ))}
        </nav>
        {tab !== "Overview" ? (
          <section className="mt-6 rounded-xl border border-line bg-white px-10 py-20 text-center">
            <FileText className="mx-auto text-tertiary" size={28} />
            <h2 className="mt-3 text-[16px] font-semibold text-ink">{tab}</h2>
            <p className="mt-1 text-[13px] text-secondary">
              {tab === "Performance"
                ? "Results will appear here as creator content goes live."
                : `No ${tab.toLowerCase()} yet.`}
            </p>
          </section>
        ) : (
          <>
            <section className="mt-6 grid gap-3 rounded-xl border border-line bg-white p-2 sm:grid-cols-2 xl:grid-cols-4">
              <Metric
                icon={Megaphone}
                color="bg-primary"
                label="Project type"
                value="Influencer"
                detail="Paid · one-time · 7 Oct – 7 Nov"
              />
              <Metric
                icon={Users}
                color="bg-[#1eb2fd]"
                label="Creators"
                value="0"
                detail="of 16 places · none invited yet"
              />
              <Metric
                icon={WalletCards}
                color="bg-[#f29b07]"
                label="Budget"
                value="₹6 L"
                detail="₹2 L funded at publish · ₹0 released"
              />
              <Metric
                icon={Video}
                color="bg-[#1eb2fd]"
                label="Content"
                value="0"
                detail="of 64 deliverables · starts 7 Oct"
              />
            </section>
            <section className="mt-6 rounded-xl border border-line bg-white p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-[16px] font-semibold leading-6 text-ink">Project timeline</h2>
                  <p className="text-[12px] leading-4 text-secondary">
                    Showing 20 Sep – 7 Nov · today 20 Sep · next: invite creators
                  </p>
                </div>
                <Badge status={status} />
              </div>
              <div className="mt-5 grid gap-5 sm:grid-cols-3 xl:grid-cols-6">
                {timeline.map(([title, detail, date], index) => (
                  <div className="min-w-0" key={title}>
                    <div className="mb-2 flex items-center">
                      <span
                        className={`z-10 flex size-6 shrink-0 items-center justify-center rounded-full ${index < 2 ? "bg-success text-white" : index === 2 ? "border-2 border-primary bg-white text-primary" : "border-2 border-line bg-white"}`}
                      >
                        {index < 2 && <Check size={14} strokeWidth={3} />}
                      </span>
                      {index < 5 && (
                        <span
                          className={`hidden h-0.5 flex-1 sm:block ${index < 2 ? "bg-primary" : "bg-line"}`}
                        />
                      )}
                    </div>
                    <h3
                      className={`text-[14px] font-medium leading-[22px] ${index > 2 ? "text-secondary" : "text-ink"}`}
                    >
                      {title}
                    </h3>
                    <p className="mt-1 text-[12px] leading-4 text-secondary">{detail}</p>
                    <p
                      className={`mt-2 text-[12px] ${index === 2 ? "text-primary" : "text-secondary"}`}
                    >
                      {date}
                    </p>
                  </div>
                ))}
              </div>
            </section>
            <section className="mt-5 grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
              <div className="space-y-5">
                <motion.section
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="rounded-xl border border-line bg-white p-5"
                >
                  <h2 className="text-[16px] font-semibold leading-6 text-ink">Project progress</h2>
                  <p className="text-[12px] leading-4 text-secondary">
                    16 places · no creators invited yet
                  </p>
                  <div className="mt-4 flex flex-col items-center gap-5 sm:flex-row">
                    <motion.div
                      initial={{ scale: 0.9, rotate: -24 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="relative grid size-[120px] shrink-0 place-items-center"
                    >
                      <svg aria-hidden="true" className="absolute inset-0 size-full" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="55" fill="none" stroke="#edeff3" strokeWidth="10" />
                      </svg>
                      <div className="relative grid size-[100px] place-items-center rounded-full bg-white text-center">
                        <p className="text-[14px] font-medium leading-[22px] text-ink">0 of 16</p>
                        <p className="text-[12px] leading-4 text-tertiary">filled</p>
                      </div>
                    </motion.div>
                    <div className="w-full space-y-2.5">
                      <div className="flex items-center gap-2 text-[13px] leading-5 text-ink">
                        <span className="size-2.5 rounded-full bg-success" />
                        <span className="flex-1">Accepted</span>
                        <span className="font-medium text-secondary">0</span>
                        <span className="font-medium">0%</span>
                      </div>
                      <div className="flex items-center gap-2 text-[13px] leading-5 text-ink">
                        <span className="size-2.5 rounded-full bg-primary" />
                        <span className="flex-1">Places open</span>
                        <span className="font-medium text-secondary">16</span>
                        <span className="font-medium">100%</span>
                      </div>
                    </div>
                  </div>
                </motion.section>
                <motion.section
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: 0.06, ease: "easeOut" }}
                  className="rounded-xl border border-line bg-white p-5"
                >
                  <h2 className="text-[16px] font-semibold text-ink">Content pipeline</h2>
                  <p className="text-[12px] text-secondary">
                    Nothing submitted yet · deliverables start after launch on 7 Oct
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                      ["Awaiting approval", "bg-[#f29b07]"],
                      ["Changes requested", "bg-[#db231f]"],
                      ["Approved · not live yet", "bg-primary"],
                      ["Live", "bg-success"],
                    ].map(([label, color]) => (
                      <div className="rounded-md border border-line p-3.5" key={label}>
                        <p className="flex items-center gap-1.5 text-[12px] text-secondary">
                          <span className={`size-2 rounded-full ${color}`} />
                          {label}
                        </p>
                        <p className="mt-1 text-[16px] font-semibold">0</p>
                      </div>
                    ))}
                  </div>
                </motion.section>
                <motion.section
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: 0.12, ease: "easeOut" }}
                  className="rounded-xl border border-line bg-white p-5"
                >
                  <h2 className="text-[16px] font-semibold text-ink">Creators</h2>
                  <p className="text-[12px] text-secondary">No creators yet</p>
                  <div className="mt-4 rounded-lg bg-[#f8f9fb] px-5 py-10 text-center">
                    <p className="text-[14px] font-medium">No creators invited yet</p>
                    <p className="mx-auto mt-2 max-w-[560px] text-[12px] leading-4 text-secondary">
                      Invite creators you’ve shortlisted, or find new ones in Creator discovery.
                      Accepted creators will appear here.
                    </p>
                    <Button className="mt-4" disabled={locked} leadingIcon={<Users size={16} />}>
                      Invite creators
                    </Button>
                  </div>
                </motion.section>
              </div>
              <aside className="rounded-xl border border-line bg-white p-5">
                <h2 className="text-[16px] font-semibold text-ink">Next actions</h2>
                <p className="text-[12px] text-secondary">3 things to do before launch on 7 Oct</p>
                <div className="mt-4 space-y-3">
                  {[
                    [
                      "Invite creators",
                      "16 places to fill · invites need a few days to be accepted",
                      "Now",
                      "text-[#db231f] bg-[#fde4e3]",
                    ],
                    [
                      "Connect Shopify",
                      "Needed for codes and tracking links",
                      "Before 7 Oct",
                      "text-[#db231f] bg-[#fde4e3]",
                    ],
                    [
                      "Browse Creator discovery",
                      "Shortlist creators who match your requirements",
                      "Suggested",
                      "text-[#c77900] bg-[#fff3da]",
                    ],
                  ].map(([title, detail, tag, colors]) => (
                    <div className="flex gap-3 border-t border-line pt-3" key={title}>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[14px] font-medium">{title}</h3>
                        <p className="mt-0.5 text-[12px] leading-4 text-secondary">{detail}</p>
                      </div>
                      <span
                        className={`h-fit shrink-0 rounded-md px-2 py-0.5 text-[12px] font-medium ${colors}`}
                      >
                        {tag}
                      </span>
                    </div>
                  ))}
                </div>
              </aside>
            </section>
          </>
        )}
      </main>
      {confirm && <ConfirmDialog action={confirm} done={resolve} cancel={() => setConfirm(null)} />}
    </BrandShell>
  );
}
