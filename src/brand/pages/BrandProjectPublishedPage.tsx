import { useEffect, useState } from "react";
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
  RotateCcw,
  Share2,
  Trash2,
  Users,
  Video,
  WalletCards,
} from "lucide-react";
import { BrandShell } from "@/brand/components/BrandShell";
import { Button } from "@/common/components/ui/Button";
import { DateRangePicker } from "@/common/components/ui/DateRangePicker";
import {
  ProjectConfirmModal,
  type ProjectConfirmAction,
} from "@/brand/components/ProjectConfirmModal";
import { ROUTES } from "@/common/constants/routes";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { getProject } from "@/brand/data/projects";

type Lifecycle = "Draft" | "Upcoming" | "Live" | "Paused" | "Completed" | "Archived" | "Deleted";
type Confirm = ProjectConfirmAction | null;
type ProjectCreator = {
  name: string;
  handle: string;
  avatar: string;
  delivered: string;
  nextStep: string;
  stage: "Accepted" | "Invited";
};
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
  Draft: { tone: "bg-muted text-secondary", detail: "Draft · not published" },
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
type ProjectProfile = {
  id: number;
  name: string;
  status: Lifecycle;
  type: string;
  partnership: string;
  duration: string;
  budget: string;
  budgetNote: string;
  creators: number;
  deliverables: number;
};
const projectProfiles: ProjectProfile[] = [
  {
    id: 1,
    name: "Vitamin-C Serum",
    status: "Live",
    type: "Influencer",
    partnership: "Paid · one-time",
    duration: "7 Oct – 7 Nov",
    budget: "₹2 L",
    budgetNote: "₹58,000 in escrow",
    creators: 16,
    deliverables: 64,
  },
  {
    id: 2,
    name: "Lip Tint Drop",
    status: "Live",
    type: "UGC",
    partnership: "Paid · one-time",
    duration: "10 Oct – 24 Oct",
    budget: "₹80,000",
    budgetNote: "₹15,200 in escrow",
    creators: 6,
    deliverables: 18,
  },
  {
    id: 3,
    name: "Glow Squad",
    status: "Live",
    type: "Influencer",
    partnership: "Paid · long-term",
    duration: "1 Sep – 28 Feb",
    budget: "₹75,000 / month",
    budgetNote: "₹4.5 L total commitment",
    creators: 6,
    deliverables: 36,
  },
  {
    id: 4,
    name: "Monsoon Sunscreen",
    status: "Live",
    type: "Influencer",
    partnership: "Paid · one-time",
    duration: "15 Sep – 15 Oct",
    budget: "₹1.5 L",
    budgetNote: "₹24,000 in escrow",
    creators: 12,
    deliverables: 48,
  },
  {
    id: 5,
    name: "Hydration Bundle",
    status: "Live",
    type: "Influencer",
    partnership: "Gift exchange",
    duration: "1 Oct – 31 Oct",
    budget: "₹52,000",
    budgetNote: "Product-only partnerships",
    creators: 8,
    deliverables: 24,
  },
  {
    id: 6,
    name: "Skin Quiz Leads",
    status: "Upcoming",
    type: "UGC",
    partnership: "Paid · one-time",
    duration: "4 Nov – 4 Dec",
    budget: "₹1.2 L",
    budgetNote: "₹63,540 left to fund",
    creators: 0,
    deliverables: 24,
  },
  {
    id: 7,
    name: "Holi Colour Care",
    status: "Draft",
    type: "Influencer",
    partnership: "Paid · one-time",
    duration: "1 Mar – 31 Mar",
    budget: "₹1.6 L",
    budgetNote: "Not funded",
    creators: 0,
    deliverables: 40,
  },
  {
    id: 8,
    name: "Winter Lip Care",
    status: "Draft",
    type: "Influencer",
    partnership: "Gift exchange",
    duration: "1 Dec – 31 Dec",
    budget: "Gift",
    budgetNote: "Not funded",
    creators: 0,
    deliverables: 20,
  },
  {
    id: 9,
    name: "Summer Essentials",
    status: "Completed",
    type: "Influencer",
    partnership: "Paid · one-time",
    duration: "1 Jun – 30 Jun",
    budget: "₹1.8 L",
    budgetNote: "Fully paid",
    creators: 15,
    deliverables: 60,
  },
  {
    id: 10,
    name: "Daily Sunscreen",
    status: "Completed",
    type: "Influencer",
    partnership: "Paid · one-time",
    duration: "1 May – 31 May",
    budget: "₹1.1 L",
    budgetNote: "Fully paid",
    creators: 12,
    deliverables: 36,
  },
  {
    id: 11,
    name: "Glow Routine",
    status: "Completed",
    type: "UGC",
    partnership: "Paid · one-time",
    duration: "1 Apr – 30 Apr",
    budget: "₹90,000",
    budgetNote: "Fully paid",
    creators: 9,
    deliverables: 27,
  },
  {
    id: 12,
    name: "Monsoon Edit",
    status: "Archived",
    type: "Influencer",
    partnership: "Paid · one-time",
    duration: "1 Jul – 31 Jul",
    budget: "₹1.25 L",
    budgetNote: "Archived",
    creators: 18,
    deliverables: 54,
  },
  {
    id: 13,
    name: "Skin Barrier Set",
    status: "Archived",
    type: "Influencer",
    partnership: "Gift exchange",
    duration: "1 Aug – 31 Aug",
    budget: "Gift",
    budgetNote: "Archived",
    creators: 7,
    deliverables: 21,
  },
  {
    id: 14,
    name: "Raksha Bandhan Gifting",
    status: "Deleted",
    type: "Influencer",
    partnership: "Gift exchange",
    duration: "1 Aug – 20 Aug",
    budget: "Gift",
    budgetNote: "Deleted",
    creators: 0,
    deliverables: 16,
  },
];
const invitedCreators: ProjectCreator[] = [
  {
    name: "Meera Iyer",
    handle: "@meerabeauty",
    avatar: "/assets/creators/meera-iyer.png",
    delivered: "0 / 4",
    nextStep: "Accepted · brief shared",
    stage: "Accepted",
  },
  {
    name: "Ishita Rao",
    handle: "@ishitarao",
    avatar: "/assets/creators/ishita-rao.png",
    delivered: "0 / 4",
    nextStep: "Accepted · brief shared",
    stage: "Accepted",
  },
  {
    name: "Emma Clarke",
    handle: "@emmaclarke",
    avatar: "/assets/creators/emma-clarke.png",
    delivered: "0 / 4",
    nextStep: "Accepted · brief shared",
    stage: "Accepted",
  },
  {
    name: "Kavya Reddy",
    handle: "@kavyareddy",
    avatar: "/assets/creators/kavya-reddy.png",
    delivered: "–",
    nextStep: "Invite pending · expires 3 Oct",
    stage: "Invited",
  },
  {
    name: "Tara Bose",
    handle: "@tarabose",
    avatar: "/assets/creators/tara-bose.png",
    delivered: "–",
    nextStep: "Invite pending · expires 3 Oct",
    stage: "Invited",
  },
];

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

export function BrandProjectPublishedPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const project = getProject(Number(projectId));
  const [status, setStatus] = useState<Lifecycle>(project.detailStatus);
  const [tab, setTab] = useState("Overview");
  const [more, setMore] = useState(false);
  const [confirm, setConfirm] = useState<Confirm>(null);
  const locked = status === "Archived" || status === "Deleted";
  useEffect(() => setStatus(project.detailStatus), [project.id, project.detailStatus]);
  // Replace this sample with the accepted/invited creator records from the project API.
  // An empty API response continues to render the existing empty state.
  const creators = project.creatorCount > 0 ? invitedCreators : [];
  const creatorProgress =
    project.creators > 0
      ? (() => {
          const allDelivered = Math.max(1, Math.round(project.creators * 0.19));
          const inProgress = Math.max(1, Math.round(project.creators * 0.31));
          const notStarted = Math.max(0, Math.round(project.creators * 0.38));
          const behind = Math.max(0, project.creators - allDelivered - inProgress - notStarted);
          const stages = [
            {
              label: "All delivered",
              count: allDelivered,
              color: "#149D46",
              className: "bg-success",
            },
            {
              label: "In progress",
              count: inProgress,
              color: "#2563EB",
              className: "bg-[#2563EB]",
            },
            {
              label: "Not started",
              count: notStarted,
              color: "#7399F2",
              className: "bg-[#7399F2]",
            },
            {
              label: "Behind or disputed",
              count: behind,
              color: "#F29B07",
              className: "bg-[#F29B07]",
            },
          ];
          return { delivered: allDelivered + inProgress, stages };
        })()
      : null;

  const resolve = (action: ProjectConfirmAction) => {
    if (action === "Pause") {
      setStatus("Paused");
      project.detailStatus = "Paused";
      project.status = "Paused";
    } else if (action === "Archive") {
      setStatus("Archived");
      project.detailStatus = "Archived";
      project.status = "Archived";
    } else if (action === "Delete") {
      setStatus("Deleted");
      project.detailStatus = "Deleted";
      project.status = "Deleted";
      project.deletedAt = "Today";
      project.deletedBy = "Ananya Mehta";
      project.removalAt = "In 30 days";
    }
    setConfirm(null);
    setMore(false);
  };
  return (
    <BrandShell>
      <main className="w-full pb-10">
        <header className="flex flex-col justify-between gap-4 lg:h-[122px] lg:flex-row">
          <div>
            <p className="text-[12px] leading-4 text-tertiary">
              Projects&nbsp;&nbsp;/&nbsp;&nbsp;{project.name}
            </p>
            <h1 className="mt-1 text-[26px] font-bold leading-[34px] tracking-[-.02em] text-ink">
              {project.name}
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
                className="flex size-10 items-center justify-center rounded-md border border-line bg-white transition hover:bg-subtle"
              >
                <MoreHorizontal size={18} />
              </button>
              {more && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setMore(false)}
                    aria-hidden="true"
                  />
                  <div className="absolute right-0 top-12 z-50 w-[204px] rounded-lg border border-line bg-white p-1.5 shadow-[0_8px_24px_rgba(0,0,0,.12)]">
                    <button
                      className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[13px] hover:bg-subtle"
                      onClick={() => navigate(ROUTES.brandProjects)}
                    >
                      <Eye size={14} />
                      Back to projects
                    </button>
                    {status === "Paused" ? (
                      <button
                        className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[13px] font-medium text-[#c77900] hover:bg-[#fff3da]/50"
                        onClick={() => {
                          setStatus("Live");
                          project.detailStatus = "Live";
                          project.status = "Live";
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
                          onClick={() => {
                            setConfirm("Pause");
                            setMore(false);
                          }}
                        >
                          <Pause size={14} />
                          Pause project
                        </button>
                      )
                    )}
                    {locked && (
                      <button
                        className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[13px] font-medium text-primary hover:bg-primary-subtle/50"
                        onClick={() => {
                          setStatus("Live");
                          project.detailStatus = "Live";
                          project.status = "Live";
                          setMore(false);
                        }}
                      >
                        <RotateCcw size={14} />
                        Restore project
                      </button>
                    )}
                    {status !== "Archived" && status !== "Deleted" && (
                      <button
                        className="mt-1 flex w-full items-center gap-2.5 border-t border-line px-2.5 pt-3 pb-2 text-left text-[13px] hover:bg-subtle"
                        onClick={() => {
                          setConfirm("Archive");
                          setMore(false);
                        }}
                      >
                        <Archive size={14} />
                        Archive
                      </button>
                    )}
                    {status !== "Deleted" && (
                      <button
                        className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[13px] text-[#db231f] hover:bg-[#fde4e3]"
                        onClick={() => {
                          setConfirm("Delete");
                          setMore(false);
                        }}
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </header>
        {status === "Paused" && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#f5d996] bg-[#fff9eb] px-4 py-3 text-[13px] leading-5 text-[#945800]">
            <div className="flex items-center gap-2.5">
              <Pause size={16} className="shrink-0 fill-[#945800]" />
              <span>
                Project is paused. Deadlines are on hold and creators cannot post new content.
                Nothing is cancelled and no money moves.
              </span>
            </div>
            <Button
              size="s"
              onClick={() => {
                setStatus("Live");
                project.detailStatus = "Live";
                project.status = "Live";
              }}
              className="bg-[#c77900] hover:bg-[#a36300] text-white"
            >
              Resume project
            </Button>
          </div>
        )}
        {status === "Archived" && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-muted px-4 py-3 text-[13px] leading-5 text-secondary">
            <div className="flex items-center gap-2.5">
              <Archive size={16} className="shrink-0 text-secondary" />
              <span>
                This project is archived and read-only. Results, content and invoices stay
                available.
              </span>
            </div>
            <Button
              size="s"
              kind="secondary"
              onClick={() => {
                setStatus("Live");
                project.detailStatus = "Live";
                project.status = "Live";
              }}
            >
              Restore project
            </Button>
          </div>
        )}
        {status === "Deleted" && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#f9c0be] bg-[#fde4e3] px-4 py-3 text-[13px] leading-5 text-[#991b1b]">
            <div className="flex items-center gap-2.5">
              <Trash2 size={16} className="shrink-0 text-[#db231f]" />
              <span>
                This project has been moved to Deleted. It will be kept for 30 days before permanent
                removal.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="s"
                kind="secondary"
                onClick={() => {
                  setStatus("Live");
                  project.detailStatus = "Live";
                  project.status = "Live";
                }}
              >
                Restore project
              </Button>
              <Button size="s" kind="ghost" onClick={() => navigate(ROUTES.brandProjects)}>
                Back to projects
              </Button>
            </div>
          </div>
        )}
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
            <section className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <Metric
                icon={Megaphone}
                color="bg-primary"
                label="Project type"
                value={project.type}
                detail={`${project.partnership} · ${project.duration}`}
              />
              <Metric
                icon={Users}
                color="bg-[#1eb2fd]"
                label="Creators"
                value={String(project.creators)}
                detail={
                  project.creators
                    ? `of ${project.creators} places · creator team active`
                    : "No creators invited yet"
                }
              />
              <Metric
                icon={WalletCards}
                color="bg-[#f29b07]"
                label="Budget"
                value={project.budget}
                detail={project.budgetNote}
              />
              <Metric
                icon={Video}
                color="bg-[#1eb2fd]"
                label="Content"
                value={
                  project.status === "Draft" || project.status === "Upcoming"
                    ? "0"
                    : String(Math.round(project.deliverables / 2))
                }
                detail={`of ${project.deliverables} deliverables · ${project.status === "Completed" ? "complete" : "in progress"}`}
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
                    {creators.length
                      ? `${project.creators} creators in this project`
                      : "No creators invited yet"}
                  </p>
                  <div className="mt-4 flex flex-col items-center gap-5 sm:flex-row">
                    <motion.div
                      initial={{ scale: 0.9, rotate: -24 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="relative grid size-[120px] shrink-0 place-items-center"
                    >
                      <svg
                        aria-hidden="true"
                        className="absolute inset-0 size-full"
                        viewBox="0 0 120 120"
                      >
                        <circle
                          cx="60"
                          cy="60"
                          r="50"
                          fill="none"
                          stroke="#edeff3"
                          strokeWidth="18"
                        />
                        {creators.length > 0 && (
                          <>
                            <circle
                              cx="60"
                              cy="60"
                              r="50"
                              fill="none"
                              pathLength="100"
                              stroke="#149D46"
                              strokeWidth="18"
                              strokeDasharray="17.5 82.5"
                              transform="rotate(-90 60 60)"
                            />
                            <circle
                              cx="60"
                              cy="60"
                              r="50"
                              fill="none"
                              pathLength="100"
                              stroke="#2563EB"
                              strokeWidth="18"
                              strokeDasharray="30 70"
                              strokeDashoffset="-18.75"
                              transform="rotate(-90 60 60)"
                            />
                            <circle
                              cx="60"
                              cy="60"
                              r="50"
                              fill="none"
                              pathLength="100"
                              stroke="#7399F2"
                              strokeWidth="18"
                              strokeDasharray="36.25 63.75"
                              strokeDashoffset="-50"
                              transform="rotate(-90 60 60)"
                            />
                            <circle
                              cx="60"
                              cy="60"
                              r="50"
                              fill="none"
                              pathLength="100"
                              stroke="#F29B07"
                              strokeWidth="18"
                              strokeDasharray="11.25 88.75"
                              strokeDashoffset="-87.5"
                              transform="rotate(-90 60 60)"
                            />
                          </>
                        )}
                      </svg>
                      <div className="relative grid size-[56px] place-items-center rounded-full bg-white text-center">
                        <p className="text-[14px] font-medium leading-[22px] text-ink">
                          {creatorProgress
                            ? `${creatorProgress.delivered} of ${project.creators}`
                            : "0 of 16"}
                        </p>
                        <p className="text-[12px] leading-4 text-tertiary">
                          {creators.length ? "delivered" : "filled"}
                        </p>
                      </div>
                    </motion.div>
                    <div className="w-full space-y-2.5">
                      {(creatorProgress
                        ? creatorProgress.stages.map((stage) => [
                            stage.label,
                            String(stage.count),
                            `${Math.round((stage.count / project.creators) * 100)}%`,
                            stage.className,
                          ])
                        : [
                            ["Accepted", "0", "0%", "bg-success"],
                            ["Places open", "16", "100%", "bg-primary"],
                          ]
                      ).map(([label, count, percent, color]) => (
                        <div
                          className="flex items-center gap-2 text-[13px] leading-5 text-ink"
                          key={label}
                        >
                          <span className={`size-2.5 rounded-full ${color}`} />
                          <span className="flex-1">{label}</span>
                          <span className="font-medium text-secondary">{count}</span>
                          <span className="font-medium">{percent}</span>
                        </div>
                      ))}
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
                  <p className="text-[12px] text-secondary">
                    {creators.length ? "Who has accepted · launch on 7 Oct" : "No creators yet"}
                  </p>
                  {creators.length ? (
                    <div className="mt-4 overflow-x-auto rounded-lg border border-line">
                      <div className="min-w-[640px]">
                        <div className="grid grid-cols-[minmax(0,1fr)_110px_190px_110px] gap-3 bg-subtle px-3.5 py-2.5 text-[12px] font-semibold tracking-[.06em] text-secondary">
                          <span>CREATOR</span>
                          <span>DELIVERED</span>
                          <span>NEXT STEP</span>
                          <span>STAGE</span>
                        </div>
                        {creators.map((creator) => {
                          const accepted = creator.stage === "Accepted";
                          return (
                            <div
                              className="grid grid-cols-[minmax(0,1fr)_110px_190px_110px] items-center gap-3 border-t border-line-subtle px-3.5 py-[11px]"
                              key={creator.handle}
                            >
                              <div className="flex min-w-0 items-center gap-2.5">
                                <img
                                  src={creator.avatar}
                                  alt=""
                                  className="size-8 shrink-0 rounded-full object-cover"
                                />
                                <div className="min-w-0">
                                  <p className="truncate text-[14px] font-medium leading-[22px] text-ink">
                                    {creator.name}
                                  </p>
                                  <p className="truncate text-[12px] leading-4 text-secondary">
                                    {creator.handle}
                                  </p>
                                </div>
                              </div>
                              <p className="text-[13px] font-medium leading-5 text-ink">
                                {creator.delivered}
                              </p>
                              <p
                                className={`text-[13px] font-medium leading-5 ${accepted ? "text-ink" : "text-[#f29b07]"}`}
                              >
                                {creator.nextStep}
                              </p>
                              <div className="space-y-[5px]">
                                <div className="flex h-2 w-[85px] items-center gap-1">
                                  {Array.from({ length: 5 }, (_, index) => (
                                    <span
                                      className={`size-2 rounded-full ${accepted ? (index < 2 ? "bg-success" : "bg-line") : index === 0 ? "bg-[#f29b07]" : "bg-line"}`}
                                      key={index}
                                    />
                                  ))}
                                </div>
                                <p
                                  className={`text-[12px] font-medium ${accepted ? "text-success" : "text-[#f29b07]"}`}
                                >
                                  {creator.stage}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
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
                  )}
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
      <ProjectConfirmModal
        action={confirm}
        project={project}
        isOpen={Boolean(confirm)}
        onConfirm={resolve}
        onCancel={() => setConfirm(null)}
      />
    </BrandShell>
  );
}
