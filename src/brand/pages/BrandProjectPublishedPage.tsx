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
  Search,
  Share2,
  Trash2,
  Users,
  Video,
  WalletCards,
} from "lucide-react";
import { BrandShell } from "@/brand/components/BrandShell";
import { Button } from "@/common/components/ui/Button";
import { DateRangePicker } from "@/common/components/ui/DateRangePicker";
import { Dropdown } from "@/common/components/ui/Dropdown";
import { KpiTile } from "@/common/components/ui/KpiTile";
import {
  ProjectConfirmModal,
  type ProjectConfirmAction,
} from "@/brand/components/ProjectConfirmModal";
import { ShareProjectModal } from "@/brand/components/ShareProjectModal";
import { brandProjectPerformanceRoute, ROUTES } from "@/common/constants/routes";
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
type Objective = "Sales" | "Awareness" | "Engagement" | "Traffic" | "Leads";

const projectObjective = (projectId: number): Objective =>
  ({
    1: "Sales",
    2: "Engagement",
    3: "Awareness",
    4: "Awareness",
    5: "Engagement",
    6: "Leads",
    7: "Awareness",
    8: "Engagement",
    9: "Sales",
    10: "Awareness",
    11: "Traffic",
    12: "Awareness",
    13: "Engagement",
    14: "Awareness",
  } as Record<number, Objective>)[projectId] ?? "Awareness";

const objectiveMetrics: Record<Objective, [string, string, string, string, string]> = {
  Sales: ["Net sales", "Orders", "CVR", "ROAS", "CPO"],
  Awareness: ["Reach", "Views", "Profile visits", "Impressions", "CPM"],
  Engagement: ["Engagement rate", "Engagements", "Saves", "Shares", "CPE"],
  Traffic: ["Sessions", "Clicks", "CTR", "Engaged sessions", "CPC"],
  Leads: ["Leads", "Quiz starts", "Completion", "Qualified leads", "CPL"],
};
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

export function BrandProjectPublishedPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const project = getProject(Number(projectId));
  const [status, setStatus] = useState<Lifecycle>(project.detailStatus);
  const [tab, setTab] = useState("Overview");
  const [more, setMore] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [confirm, setConfirm] = useState<Confirm>(null);
  const [applicationStatus, setApplicationStatus] = useState("All");
  const [applicationPlatform, setApplicationPlatform] = useState("Platform");
  const [applicationFollowers, setApplicationFollowers] = useState("Followers");
  const [applicationEngagement, setApplicationEngagement] = useState("Eng. rate");
  const [applicationFee, setApplicationFee] = useState("Fee");
  const [applicationCity, setApplicationCity] = useState("City");
  const [applicationSort, setApplicationSort] = useState("Match");
  const locked = status === "Archived" || status === "Deleted";
  const objective = projectObjective(project.id);
  const longTerm = project.partnership.toLowerCase().includes("long-term");
  const giftExchange = project.partnership.toLowerCase().includes("gift");
  const fileDelivery = /ugc|ai video/i.test(project.projectType);
  const contentUnit = fileDelivery ? (project.projectType.toLowerCase().includes("ai") ? "videos" : "files") : "posts";
  const deliveryVerb = fileDelivery ? "Delivered" : "Posted";
  const deliveryAction = fileDelivery ? "Delivering" : "Posting";
  const deadlineLabel = fileDelivery ? "Delivery deadline" : "Posting deadline";
  const milestoneItems = longTerm
    ? [
        ["Launched", "Project is live", "7 Oct"],
        [giftExchange ? "Kits delivered" : "Creators accepted", giftExchange ? "Products are on their way" : "Creator team confirmed", "9 Oct"],
        ["Month 2 of 6", "Current delivery cycle", "Oct"],
        ["Next month starts", "Brief is sent for the next cycle", "1 Nov"],
        ["Project ends", "Final cycle and usage rights end", "28 Feb"],
      ]
    : [
        ["Launched", "Project is live", "7 Oct"],
        [giftExchange ? "Kits delivered" : "Creators accepted", giftExchange ? "Products are on their way" : "Creator team confirmed", "9 Oct"],
        [fileDelivery ? "First files delivered" : "First post live", `First ${contentUnit.slice(0, -1)} is expected`, "15 Oct"],
        [deadlineLabel, `Final ${contentUnit} due from creators`, "3 Nov"],
        ["Project ends", "Usage rights end 7 Dec", "7 Nov"],
      ];
  const keyDates = longTerm
    ? [["This month's due date", "3 Nov"], ["Next cycle charge", "1 Nov"], ["Project ends", "28 Feb 2027"]]
    : [[deadlineLabel, "3 Nov 2026"], ["Usage rights end", "7 Dec 2026"], ["Payments", giftExchange ? "Products sent" : "On track"]];
  const resultMetrics = objectiveMetrics[objective];
  const resultValues: Record<Objective, string[]> = {
    Sales: ["₹5.42L", "1,315", "4.8%", "2.7×", "₹412"],
    Awareness: ["1.8M", "6.2L", "48.6K", "2.4M", "₹83"],
    Engagement: ["5.4%", "48.2K", "8.6K", "3.9K", "₹26"],
    Traffic: ["14.8K", "18.2K", "3.1%", "8.4K", "₹11"],
    Leads: ["1,284", "3,041", "42%", "714", "₹156"],
  };
  const quickAction = locked
    ? status === "Paused" ? "Resume project" : "Restore project"
    : status === "Completed" ? "Leave reviews" : `Review ${Math.max(1, Math.round(project.deliverableCount / Math.max(project.creatorCount, 1)))} ${contentUnit}`;
  const creatorDeliverable = longTerm && /ambassador/i.test(project.projectType)
    ? "Month 3: 0 / 3"
    : `0 / ${fileDelivery ? 2 : 4} ${contentUnit}`;
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
              label: `All ${deliveryVerb.toLowerCase()}`,
              count: allDelivered,
              color: "#149D46",
              className: "bg-success",
            },
            {
              label: deliveryAction,
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
              onClick={() => setShareOpen(true)}
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
              onClick={() =>
                item === "Performance"
                  ? navigate(brandProjectPerformanceRoute(project.id))
                  : setTab(item)
              }
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
        {tab === "Applications" ? (
          <section className="mt-6">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-[10px] bg-subtle p-1">
                {["All", "New", "Shortlisted", "Reviewed", "Declined"].map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => setApplicationStatus(item)}
                    className={`flex h-8 shrink-0 items-center gap-1.5 rounded-lg px-3 text-[13px] leading-5 transition ${applicationStatus === item ? "bg-white text-ink shadow-[0_1px_2px_rgba(0,0,0,.08)]" : "text-secondary hover:text-ink"}`}
                  >
                    <span>{item}</span><span className="text-[12px] leading-4 text-secondary">0</span>
                  </button>
                ))}
              </div>
              <div className="hidden flex-1 xl:block" />
              <div className="flex min-w-0 flex-1 flex-wrap justify-end gap-2 xl:flex-none">
                <Dropdown compact ariaLabel="Filter by platform" value={applicationPlatform} onChange={setApplicationPlatform} options={["Platform", "Instagram", "TikTok", "YouTube"]} className="w-[110px] [&>button]:h-9" />
                <Dropdown compact ariaLabel="Filter by followers" value={applicationFollowers} onChange={setApplicationFollowers} options={["Followers", "Under 10K", "10K–50K", "50K–100K", "100K+"]} className="w-[112px] [&>button]:h-9" />
                <Dropdown compact ariaLabel="Filter by engagement rate" value={applicationEngagement} onChange={setApplicationEngagement} options={["Eng. rate", "2%+", "4%+", "6%+"]} className="w-[112px] [&>button]:h-9" />
                <Dropdown compact ariaLabel="Filter by fee" value={applicationFee} onChange={setApplicationFee} options={["Fee", "Under ₹10K", "₹10K–₹25K", "₹25K+"]} className="w-[84px] [&>button]:h-9" />
                <Dropdown compact ariaLabel="Filter by city" value={applicationCity} onChange={setApplicationCity} options={["City", "Bengaluru", "Mumbai", "Delhi NCR", "Chennai"]} className="w-[94px] [&>button]:h-9" />
              </div>
              <button type="button" aria-label="Change application sort" className="ml-auto flex h-9 items-center gap-1.5 px-2 text-[13px] text-secondary transition hover:text-ink" onClick={() => setApplicationSort((value) => value === "Match" ? "Recent" : "Match")}>Sort: {applicationSort} <span className="text-[16px] leading-none">⌄</span></button>
            </div>
            <motion.section
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 flex min-h-[294px] flex-col items-center justify-center rounded-xl border border-line bg-white px-6 py-12 text-center"
            >
              <motion.div initial={{ opacity: 0, scale: 0.76 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }} className="grid size-14 place-items-center rounded-[28px] bg-subtle text-secondary"><Users size={26} strokeWidth={1.7} /></motion.div>
              <h2 className="mt-3 text-[14px] font-semibold leading-5 text-ink">No applications yet</h2>
              <p className="mt-1 max-w-[520px] text-[13px] leading-5 text-secondary">{project.name} is live. Creators who match it can apply from the marketplace; you’ll see them here with their match score and fee. Share the project link or invite creators yourself.</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Button kind="secondary" leadingIcon={<Share2 size={16} />} onClick={() => setShareOpen(true)}>Copy project link</Button>
                <Button leadingIcon={<Search size={16} />}>Find creators</Button>
              </div>
            </motion.section>
          </section>
        ) : tab !== "Overview" ? (
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
              <KpiTile
                icon={Megaphone}
                iconBg="bg-primary"
                label="Project type"
                value={project.type}
                detail={`${project.partnership} · ${project.duration}`}
                dataNodeId="1473:597"
              />
              <KpiTile
                icon={Users}
                iconBg="bg-[#1eb2fd]"
                label="Creators"
                value={String(project.creators)}
                detail={
                  project.creators
                    ? `of ${project.creators} places · creator team active`
                    : "No creators invited yet"
                }
              />
              <KpiTile
                icon={WalletCards}
                iconBg="bg-[#f29b07]"
                label="Budget"
                value={project.budget}
                detail={project.budgetNote}
              />
              <KpiTile
                icon={Video}
                iconBg="bg-[#1eb2fd]"
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
                  <h2 className="text-[16px] font-semibold leading-6 text-ink">Project milestones</h2>
                  <p className="text-[12px] leading-4 text-secondary">
                    Milestones update automatically as your project moves forward.
                  </p>
                </div>
                <Badge status={status} />
              </div>
              <div className="mt-5 grid gap-5 sm:grid-cols-3 xl:grid-cols-6">
                {milestoneItems.map(([title, detail, date], index) => (
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
                          {creators.length ? deliveryVerb.toLowerCase() : "filled"}
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
                <section className="grid gap-5 lg:grid-cols-2">
                  <section className="rounded-xl border border-line bg-white p-5">
                    <h2 className="text-[16px] font-semibold text-ink">Key dates</h2>
                    <div className="mt-4 divide-y divide-line-subtle">
                      {keyDates.map(([label, value]) => (
                        <div className="flex items-center justify-between gap-3 py-2.5 text-[13px]" key={label}>
                          <span className="text-secondary">{label}</span>
                          <span className={label === "Payments" ? "rounded-full bg-success-bg px-2 py-0.5 text-[12px] font-medium text-success" : "font-medium text-ink"}>{value}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                  <section className="rounded-xl border border-line bg-white p-5">
                    <h2 className="text-[16px] font-semibold text-ink">Results so far</h2>
                    <p className="mt-0.5 text-[12px] text-secondary">{objective} performance to date</p>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {resultMetrics.slice(0, 4).map((metric, index) => (
                        <div className="rounded-lg bg-subtle px-3 py-2.5" key={metric}>
                          <p className="text-[12px] text-secondary">{metric}</p>
                          <p className="mt-1 text-[16px] font-semibold text-ink">{resultValues[objective][index]}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-[13px]">
                      <span className="text-secondary">{resultMetrics[4]}</span>
                      <span className="font-semibold text-ink">{resultValues[objective][4]}</span>
                    </div>
                  </section>
                </section>
                <section className="grid gap-5 lg:grid-cols-2">
                  <section className="rounded-xl border border-line bg-white p-5">
                    <h2 className="text-[16px] font-semibold text-ink">Budget</h2>
                    <div className="mt-4 space-y-3 text-[13px]">
                      {(giftExchange
                        ? [["Shipped", "₹24,000"], ["Ships next", "₹16,000"], ["Still to ship", "₹12,000"]]
                        : [["Paid to creators", "₹1,02,000"], ["Held in escrow", "₹58,000"], ["Not committed", "₹40,000"]]
                      ).map(([label, value]) => (
                        <div className="flex items-center justify-between" key={label}>
                          <span className="text-secondary">{label}</span>
                          <span className="font-medium text-ink">{value}</span>
                        </div>
                      ))}
                      {longTerm && <p className="border-t border-line pt-3 text-[12px] text-secondary">{project.budget} · current cycle of 6</p>}
                    </div>
                  </section>
                  <section className="rounded-xl border border-line bg-white p-5">
                    <h2 className="text-[16px] font-semibold text-ink">Project details</h2>
                    <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3 text-[13px]">
                      {[["Objective", objective], ["Type", project.projectType], ["Partnership", project.partnership], ["Duration", longTerm ? "Long-term" : "One-time"], ["Platforms", project.platform], ["Tracking", objective === "Sales" ? "Shopify connected" : objective === "Traffic" ? "UTM + GA4" : objective === "Leads" ? "Quiz form + UTM" : "Connected accounts"]].map(([label, value]) => (
                        <div key={label}>
                          <p className="text-[12px] text-tertiary">{label}</p>
                          <p className="mt-0.5 truncate font-medium text-ink">{value}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </section>
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
                      [deliveryVerb, "bg-success"],
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
                          <span>{deliveryVerb.toUpperCase()}</span>
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
                                {creator.stage === "Accepted" ? creatorDeliverable : "—"}
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
              <aside className="rounded-xl border border-line bg-white p-5 xl:sticky xl:top-6 xl:self-start">
                <h2 className="text-[16px] font-semibold text-ink">What to do next</h2>
                <p className="text-[12px] text-secondary">Recommended actions for this project</p>
                <div className="mt-4 space-y-3">
                  {[
                    [
                      quickAction,
                      "16 places to fill · invites need a few days to be accepted",
                      "Now",
                      "text-[#db231f] bg-[#fde4e3]",
                    ],
                    [
                      objective === "Sales" ? "Connect Shopify" : objective === "Traffic" ? "Confirm UTM tracking" : "Check creator progress",
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
      <ShareProjectModal project={project} isOpen={shareOpen} onClose={() => setShareOpen(false)} />
    </BrandShell>
  );
}
