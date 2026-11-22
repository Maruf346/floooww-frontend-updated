import { useEffect, useState } from "react";
import {
  Archive,
  CalendarDays,
  Check,
  ChevronDown,
  CircleCheck,
  CircleDollarSign,
  Download,
  Eye,
  FileText,
  Info,
  Inbox,
  LockKeyhole,
  Megaphone,
  MoreHorizontal,
  Pause,
  PackageCheck,
  Play,
  Pencil,
  ReceiptText,
  RotateCcw,
  Search,
  Share2,
  Trash2,
  Truck,
  Users,
  Video,
  WalletCards,
} from "lucide-react";
import { BrandShell } from "@/brand/components/BrandShell";
import { AgencyClientShell } from "@/agency/components/AgencyClientShell";
import { PlatformLogo } from "@/common/components/brand/PlatformLogo";
import { Button } from "@/common/components/ui/Button";
import { Dropdown } from "@/common/components/ui/Dropdown";
import { DateRangePicker } from "@/common/components/ui/DateRangePicker";
import { KpiTile } from "@/common/components/ui/KpiTile";
import {
  ProjectConfirmModal,
  type ProjectConfirmAction,
} from "@/brand/components/ProjectConfirmModal";
import { ShareProjectModal } from "@/brand/components/ShareProjectModal";
import { AgencyInviteCreatorToProjectModal } from "@/agency/components/AgencyInviteCreatorToProjectModal";
import { ProjectApplicationsView } from "@/brand/pages/project-applications/ProjectApplicationsPanel";
import {
  agencyClientCreatorDeliverablesRoute,
  agencyClientInvitedCreatorRoute,
  agencyClientNewProjectRoute,
  agencyClientProjectsRoute,
  brandCreatorDeliverablesRoute,
  brandInvitedCreatorRoute,
  brandProjectPerformanceRoute,
  ROUTES,
} from "@/common/constants/routes";
import type { Platform } from "@/common/types";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import {
  CustomReportCard,
  PerformanceReportBlocks,
  Reveal,
} from "@/brand/pages/BrandProjectPerformancePage";
import { getProject } from "@/brand/data/projects";
import { getProjectRules } from "@/brand/data/projectRules";

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
const projectIdsWithContent = new Set([1, 3, 4, 5, 10, 11]);
const contentCountForProject = (projectId: number) =>
  projectIdsWithContent.has(projectId) ? 4 : 0;
type Objective = "Sales" | "Awareness" | "Engagement" | "Traffic" | "Leads";

const projectObjective = (projectId: number): Objective =>
  (
    {
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
    } as Record<number, Objective>
  )[projectId] ?? "Awareness";

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
  Archived: {
    tone: "bg-[#f4f6fb] text-[#4a4a55]",
    detail: "7 Oct – 7 Nov 2026 · archived 30 Nov · read-only",
  },
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

const archivedCreators = [
  {
    name: "Meera Iyer",
    handle: "@meerabeauty",
    avatar: "/assets/creators/meera-iyer.png",
    delivered: "4 / 4",
    nextStep: "Leave a review",
    stage: "Completed",
    isDisputed: false,
    dots: [true, true, true, true, true, true, true, true],
  },
  {
    name: "Ishita Rao",
    handle: "@ishitarao",
    avatar: "/assets/creators/ishita-rao.png",
    delivered: "4 / 4",
    nextStep: "Leave a review",
    stage: "Completed",
    isDisputed: false,
    dots: [true, true, true, true, true, true, true, true],
  },
  {
    name: "Emma Clarke",
    handle: "@emmaclarke",
    avatar: "/assets/creators/emma-clarke.png",
    delivered: "4 / 4",
    nextStep: "Leave a review",
    stage: "Completed",
    isDisputed: false,
    dots: [true, true, true, true, true, true, true, true],
  },
  {
    name: "Kavya Reddy",
    handle: "@kavyareddy",
    avatar: "/assets/creators/kavya-reddy.png",
    delivered: "4 / 4",
    nextStep: "Leave a review",
    stage: "Completed",
    isDisputed: false,
    dots: [true, true, true, true, true, true, true, true],
  },
  {
    name: "Tara Bose",
    handle: "@tarabose",
    avatar: "/assets/creators/tara-bose.png",
    delivered: "3 / 4",
    nextStep: "1 post disputed and refunded",
    stage: "Disputed",
    isDisputed: true,
    dots: [true, true, true, true, true, true, true, false],
  },
];

type InvitedCreatorStatus = "Posting" | "Awaiting approval" | "Overdue" | "Not started";
type InvitedCreatorCard = {
  id: string;
  name: string;
  handle: string;
  city: string;
  avatar: string;
  progress: string;
  progressValue: number;
  status: InvitedCreatorStatus;
  platforms: [Platform, string][];
  primaryPlatform: Platform;
  deliverables: string;
  escrow: string;
  sales: string;
  next: string;
  fee: string;
  released: string;
};

const invitedCreatorCards: InvitedCreatorCard[] = [
  {
    id: "meera",
    name: "Meera Iyer",
    handle: "@meerabeauty",
    city: "Mumbai",
    avatar: "meera-iyer",
    progress: "2/3",
    progressValue: 67,
    status: "Awaiting approval",
    platforms: [
      ["Instagram", "1.4 L"],
      ["YouTube", "32K"],
      ["Snapchat", "12K"],
    ],
    primaryPlatform: "Instagram",
    deliverables: "2 / 3",
    escrow: "₹3,000",
    sales: "₹1,42,800",
    next: "Next: leave a review · 4 of 4 delivered · last Story approved 26 Oct",
    fee: "₹30,000",
    released: "₹27,000 released",
  },
  {
    id: "ishita",
    name: "Ishita Rao",
    handle: "@ishitarao",
    city: "Bengaluru",
    avatar: "ishita-rao",
    progress: "3/4",
    progressValue: 75,
    status: "Posting",
    platforms: [
      ["Instagram", "1.1 L"],
      ["YouTube", "21K"],
    ],
    primaryPlatform: "Instagram",
    deliverables: "3 / 4",
    escrow: "₹4,250",
    sales: "₹68,400",
    next: "Next: Story · last-day reminder · due 30 Oct",
    fee: "₹17,000",
    released: "₹12,750 released",
  },
  {
    id: "emma",
    name: "Emma Clarke",
    handle: "@emmaclarke",
    city: "Mumbai",
    avatar: "emma-clarke",
    progress: "3/4",
    progressValue: 75,
    status: "Posting",
    platforms: [
      ["Instagram", "96K"],
      ["YouTube", "40K"],
      ["Snapchat", "15K"],
    ],
    primaryPlatform: "Instagram",
    deliverables: "3 / 4",
    escrow: "₹3,750",
    sales: "₹54,000",
    next: "Next: Story · results check-in · due 30 Oct",
    fee: "₹15,000",
    released: "₹11,250 released",
  },
  {
    id: "kavya",
    name: "Kavya Reddy",
    handle: "@kavyareddy",
    city: "Hyderabad",
    avatar: "kavya-reddy",
    progress: "3/4",
    progressValue: 75,
    status: "Posting",
    platforms: [
      ["Instagram", "88K"],
      ["Snapchat", "11K"],
    ],
    primaryPlatform: "Instagram",
    deliverables: "3 / 4",
    escrow: "₹3,750",
    sales: "₹49,600",
    next: "Next: Story · code reminder · due 30 Oct",
    fee: "₹15,000",
    released: "₹11,250 released",
  },
  {
    id: "riya",
    name: "Riya Sen",
    handle: "@riyasen",
    city: "Kolkata",
    avatar: "ishita-rao",
    progress: "3/4",
    progressValue: 75,
    status: "Posting",
    platforms: [
      ["Instagram", "72K"],
      ["Pinterest", "8K"],
    ],
    primaryPlatform: "Instagram",
    deliverables: "3 / 4",
    escrow: "₹3,000",
    sales: "₹22,000",
    next: "Next: Story · last-day reminder · due 30 Oct",
    fee: "₹12,000",
    released: "₹9,000 released",
  },
  {
    id: "sneha",
    name: "Sneha Patil",
    handle: "@snehapatil",
    city: "Pune",
    avatar: "meera-iyer",
    progress: "2/4",
    progressValue: 50,
    status: "Posting",
    platforms: [
      ["Instagram", "64K"],
      ["YouTube", "14K"],
    ],
    primaryPlatform: "Instagram",
    deliverables: "2 / 4",
    escrow: "₹6,000",
    sales: "₹32,000",
    next: "Next: Reel · results · due 1 Nov",
    fee: "₹12,000",
    released: "₹6,000 released",
  },
  {
    id: "nisha",
    name: "Nisha Verma",
    handle: "@niashverma",
    city: "Delhi",
    avatar: "kavya-reddy",
    progress: "2/4",
    progressValue: 50,
    status: "Posting",
    platforms: [
      ["YouTube", "58K"],
      ["Instagram", "1.4 L"],
    ],
    primaryPlatform: "YouTube",
    deliverables: "2 / 4",
    escrow: "₹6,000",
    sales: "₹26,000",
    next: "Next: Short · routine · due 1 Nov",
    fee: "₹12,000",
    released: "₹6,000 released",
  },
  {
    id: "tara",
    name: "Tara Bose",
    handle: "@tarabose",
    city: "Kolkata",
    avatar: "tara-bose",
    progress: "2/4",
    progressValue: 50,
    status: "Overdue",
    platforms: [
      ["Instagram", "81K"],
      ["YouTube", "19K"],
    ],
    primaryPlatform: "Instagram",
    deliverables: "2 / 4",
    escrow: "₹7,500",
    sales: "₹18,000",
    next: "Story 2 was due 26 Oct · 2 days late · dispute open",
    fee: "₹15,000",
    released: "₹7,500 released",
  },
  {
    id: "pooja",
    name: "Pooja Menon",
    handle: "@poojamenon",
    city: "Kochi",
    avatar: "emma-clarke",
    progress: "0/4",
    progressValue: 0,
    status: "Not started",
    platforms: [
      ["Instagram", "49K"],
      ["Pinterest", "6K"],
    ],
    primaryPlatform: "Instagram",
    deliverables: "0 / 4",
    escrow: "₹12,500",
    sales: "–",
    next: "Next: Reel · festive GRWM · due 2 Nov",
    fee: "₹12,500",
    released: "₹0 released",
  },
  {
    id: "aanya",
    name: "Aanya Shah",
    handle: "@aanyashah",
    city: "Mumbai",
    avatar: "meera-iyer",
    progress: "1/4",
    progressValue: 25,
    status: "Not started",
    platforms: [["Instagram", "110K"]],
    primaryPlatform: "Instagram",
    deliverables: "1 / 4",
    escrow: "₹8,000",
    sales: "₹12,400",
    next: "Next: Carousel · due 3 Nov",
    fee: "₹16,000",
    released: "₹8,000 released",
  },
  {
    id: "zoya",
    name: "Zoya Ahmed",
    handle: "@zoyaahmed",
    city: "Hyderabad",
    avatar: "ishita-rao",
    progress: "0/3",
    progressValue: 0,
    status: "Not started",
    platforms: [["Instagram", "76K"]],
    primaryPlatform: "Instagram",
    deliverables: "0 / 3",
    escrow: "₹9,000",
    sales: "–",
    next: "Next: Reel · due 4 Nov",
    fee: "₹18,000",
    released: "₹0 released",
  },
  {
    id: "simran",
    name: "Simran Kaur",
    handle: "@simrankaur",
    city: "Chandigarh",
    avatar: "emma-clarke",
    progress: "1/3",
    progressValue: 33,
    status: "Awaiting approval",
    platforms: [
      ["Instagram", "91K"],
      ["YouTube", "15K"],
    ],
    primaryPlatform: "Instagram",
    deliverables: "1 / 3",
    escrow: "₹5,000",
    sales: "₹21,600",
    next: "Next: approve Reel · submitted 28 Oct",
    fee: "₹15,000",
    released: "₹10,000 released",
  },
  {
    id: "lina",
    name: "Lina George",
    handle: "@linageorge",
    city: "Kochi",
    avatar: "kavya-reddy",
    progress: "3/4",
    progressValue: 75,
    status: "Posting",
    platforms: [
      ["YouTube", "42K"],
      ["Instagram", "67K"],
    ],
    primaryPlatform: "YouTube",
    deliverables: "3 / 4",
    escrow: "₹4,000",
    sales: "₹37,200",
    next: "Next: Short · due 5 Nov",
    fee: "₹16,000",
    released: "₹12,000 released",
  },
  {
    id: "rhea",
    name: "Rhea Kapoor",
    handle: "@rheakapoor",
    city: "Delhi",
    avatar: "tara-bose",
    progress: "2/3",
    progressValue: 67,
    status: "Posting",
    platforms: [
      ["Instagram", "58K"],
      ["Pinterest", "9K"],
    ],
    primaryPlatform: "Instagram",
    deliverables: "2 / 3",
    escrow: "₹3,500",
    sales: "₹16,900",
    next: "Next: Idea Pin · due 5 Nov",
    fee: "₹10,500",
    released: "₹7,000 released",
  },
  {
    id: "mira",
    name: "Mira Das",
    handle: "@miradas",
    city: "Bengaluru",
    avatar: "meera-iyer",
    progress: "1/4",
    progressValue: 25,
    status: "Not started",
    platforms: [["Instagram", "63K"]],
    primaryPlatform: "Instagram",
    deliverables: "1 / 4",
    escrow: "₹7,000",
    sales: "₹8,600",
    next: "Next: Story · due 6 Nov",
    fee: "₹14,000",
    released: "₹7,000 released",
  },
  {
    id: "anika",
    name: "Anika Roy",
    handle: "@anikaroy",
    city: "Pune",
    avatar: "ishita-rao",
    progress: "2/4",
    progressValue: 50,
    status: "Posting",
    platforms: [
      ["Instagram", "82K"],
      ["YouTube", "12K"],
    ],
    primaryPlatform: "Instagram",
    deliverables: "2 / 4",
    escrow: "₹4,800",
    sales: "₹28,500",
    next: "Next: Reel · due 6 Nov",
    fee: "₹16,000",
    released: "₹11,200 released",
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

function InvitedCreatorsEmptyState({
  onGoToApplications,
  onFindCreators,
}: {
  onGoToApplications: () => void;
  onFindCreators: () => void;
}) {
  const [status, setStatus] = useState("All");
  const [platform, setPlatform] = useState("Platform");
  const [deadline, setDeadline] = useState("Deadline");
  const [sort, setSort] = useState("Sort: Next deadline");
  const segments = ["All", "Posting", "Awaiting approval", "Overdue", "Not started"];

  return (
    <section className="mt-5">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-[10px] bg-subtle p-1">
          {segments.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setStatus(item)}
              className={`flex h-8 shrink-0 items-center gap-1.5 rounded-lg px-3 text-[13px] leading-5 transition ${status === item ? "bg-white text-ink shadow-[0_1px_2px_rgba(0,0,0,.08)]" : "text-secondary hover:text-ink"}`}
            >
              <span>{item}</span>
              <span className="text-[12px] leading-4 text-secondary">0</span>
            </button>
          ))}
        </div>
        <span className="hidden h-px min-w-4 flex-1 bg-line xl:block" />
        <div className="ml-auto flex min-w-0 flex-wrap items-center justify-end gap-2">
          <Dropdown
            compact
            ariaLabel="Filter invited creators by platform"
            value={platform}
            onChange={setPlatform}
            options={["Platform", "Instagram", "YouTube", "Pinterest", "Snapchat"]}
            className="w-[98px] [&>button]:h-[38px]"
          />
          <Dropdown
            compact
            ariaLabel="Filter invited creators by deadline"
            value={deadline}
            onChange={setDeadline}
            options={["Deadline", "This week", "Next 7 days", "This month"]}
            className="w-[105px] [&>button]:h-[38px]"
          />
          <Dropdown
            compact
            ariaLabel="Sort invited creators"
            value={sort}
            onChange={setSort}
            options={["Sort: Next deadline", "Sort: Status", "Sort: Creator"]}
            className="w-[164px] [&>button]:h-[38px] [&>button]:border-0 [&>button]:bg-transparent [&>button]:px-2"
          />
        </div>
      </div>
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mt-5 flex min-h-[290px] flex-col items-center justify-center rounded-xl border border-line bg-white px-6 py-12 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.76 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="grid size-14 place-items-center rounded-full bg-subtle text-secondary"
        >
          <Inbox size={26} strokeWidth={1.7} />
        </motion.div>
        <h2 className="mt-3 text-[14px] font-semibold leading-5 text-ink">
          No creators invited yet
        </h2>
        <p className="mt-1 max-w-[600px] text-[13px] leading-5 text-secondary">
          Invite shortlisted creators from Applications. You’re charged when you invite and set
          deliverables, and the fee is held until you approve their content.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Button kind="secondary" onClick={onGoToApplications}>
            Go to Applications
          </Button>
          <Button leadingIcon={<Search size={16} />} onClick={onFindCreators}>
            Find creators
          </Button>
        </div>
      </motion.section>
    </section>
  );
}

function InvitedCreatorCard({
  creator,
  index,
  project,
  onViewProfile,
  onEditDeliverables,
  onMessage,
}: {
  creator: InvitedCreatorCard;
  index: number;
  project: ReturnType<typeof getProject>;
  onViewProfile: (creatorId: string) => void;
  onEditDeliverables: (creatorId: string) => void;
  onMessage: (creatorId: string, creatorName: string) => void;
}) {
  const rules = getProjectRules(project);
  const tone = {
    Posting: "bg-success-bg text-success",
    "Awaiting approval": "bg-[#fff3da] text-[#c77900]",
    Overdue: "bg-danger-subtle text-danger",
    "Not started": "bg-muted text-secondary",
  }[creator.status];
  const ringColor =
    creator.status === "Awaiting approval"
      ? "#149d46"
      : creator.status === "Overdue"
        ? "#e52e2e"
        : creator.status === "Not started"
          ? "#e7eaf0"
          : "#2563eb";
  const ringValue = creator.progressValue * 3.6;
  const isOverdue = creator.status === "Overdue";

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: Math.min(index, 8) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-xl border border-line bg-white p-5"
    >
      <div className="flex items-start gap-3">
        <img
          src={`/assets/creators/${creator.avatar}.png`}
          alt=""
          className="size-11 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1 pt-0.5">
          <h2 className="truncate text-[14px] font-medium leading-5 text-ink">{creator.name}</h2>
          <p className="truncate text-[12px] leading-4 text-secondary">
            {creator.handle} · {creator.city}
          </p>
        </div>
        <div
          className="grid size-[56px] shrink-0 place-items-center rounded-full p-[4px]"
          style={{
            background: `conic-gradient(${ringColor} ${ringValue}deg, #e9edf3 ${ringValue}deg)`,
          }}
          aria-label={`${creator.progress} deliverables complete`}
        >
          <span className="grid size-full place-items-center rounded-full bg-white text-[14px] font-medium text-ink">
            {creator.progress}
          </span>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {creator.platforms.map(([platform, value]) => (
            <span
              className="flex items-center gap-1 text-[12px] leading-4 text-ink"
              key={`${platform}-${value}`}
            >
              <PlatformLogo platform={platform} size={16} />
              {value}
            </span>
          ))}
        </div>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[12px] leading-4 ${tone}`}
        >
          <span className="size-1.5 rounded-full bg-current" />
          {creator.status}
        </span>
      </div>
      <p className="mt-3 text-[12px] leading-4 text-secondary">
        {creator.primaryPlatform} · last 30 days
      </p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          [creator.deliverables, rules.isAmbassador ? "This month" : "Deliverables"],
          [creator.escrow, rules.isGift ? "Kit value" : "In escrow"],
          [creator.sales, rules.resultLabel],
        ].map(([value, label]) => (
          <div key={label} className="min-w-0 rounded-lg bg-subtle px-2.5 py-2">
            <p className="truncate text-[14px] font-medium leading-5 text-ink">{value}</p>
            <p className="mt-0.5 truncate text-[12px] leading-4 text-secondary">{label}</p>
          </div>
        ))}
      </div>
      <p
        className={`mt-4 min-h-10 text-[12px] leading-5 ${isOverdue ? "text-danger" : "text-secondary"}`}
      >
        {creator.next}
      </p>
      <div className="mt-3 flex items-center justify-between rounded-lg bg-subtle px-3 py-2.5">
        <span className="text-[14px] font-medium text-ink">
          ₹ Fee {creator.fee.replace("₹", "")}
        </span>
        <span className="text-[12px] text-secondary">{creator.released}</span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onMessage(creator.id, creator.name)}
          className="h-8 rounded-md border border-line bg-white text-[13px] font-medium text-ink transition hover:bg-subtle cursor-pointer"
        >
          Message
        </button>
        <button
          type="button"
          onClick={() => onViewProfile(creator.id)}
          className="h-8 rounded-md border border-line bg-white text-[13px] font-medium text-ink transition hover:bg-subtle cursor-pointer"
        >
          View profile
        </button>
      </div>
      <button
        type="button"
        onClick={() => onEditDeliverables(creator.id)}
        className="mt-2 h-8 w-full rounded-md border border-line bg-white text-[13px] font-medium text-ink transition hover:bg-subtle cursor-pointer"
      >
        Edit deliverables
      </button>
    </motion.article>
  );
}

function InvitedCreatorsGrid({
  projectId,
  creatorCount,
  isAgencyClient = false,
  clientId = "minimalist",
}: {
  projectId: number;
  creatorCount: number;
  isAgencyClient?: boolean;
  clientId?: string;
}) {
  const navigate = useNavigate();
  const project = getProject(projectId);
  const [status, setStatus] = useState("All");
  const [platform, setPlatform] = useState("Platform");
  const [deadline, setDeadline] = useState("Deadline");
  const [sort, setSort] = useState("Sort: Next deadline");
  const [showAll, setShowAll] = useState(false);
  const creators = Array.from({ length: creatorCount }, (_, index) => {
    const creator = invitedCreatorCards[index % invitedCreatorCards.length];
    return index < invitedCreatorCards.length
      ? creator
      : { ...creator, id: `${creator.id}-${index + 1}` };
  });
  const counts: Record<string, number> = creators.reduce<Record<string, number>>(
    (totals, creator) => ({
      ...totals,
      All: totals.All + 1,
      [creator.status]: totals[creator.status] + 1,
    }),
    { All: 0, Posting: 0, "Awaiting approval": 0, Overdue: 0, "Not started": 0 },
  );
  const segments = ["All", "Posting", "Awaiting approval", "Overdue", "Not started"];
  const filtered = creators
    .filter((creator) => status === "All" || creator.status === status)
    .filter(
      (creator) => platform === "Platform" || creator.platforms.some(([item]) => item === platform),
    )
    .filter((creator) => deadline === "Deadline" || creator.next.includes("due"))
    .sort((a, b) =>
      sort === "Sort: Creator"
        ? a.name.localeCompare(b.name)
        : sort === "Sort: Status"
          ? a.status.localeCompare(b.status)
          : a.next.localeCompare(b.next),
    );
  const visible = showAll ? filtered : filtered.slice(0, 9);

  return (
    <section className="mt-5">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-[10px] bg-subtle p-1">
          {segments.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => {
                setStatus(item);
                setShowAll(false);
              }}
              className={`flex h-8 shrink-0 items-center gap-1.5 rounded-lg px-3 text-[13px] leading-5 transition ${status === item ? "bg-white text-ink shadow-[0_1px_2px_rgba(0,0,0,.08)]" : "text-secondary hover:text-ink"}`}
            >
              <span>{item}</span>
              <span className="text-[12px] leading-4 text-secondary">{counts[item]}</span>
            </button>
          ))}
        </div>
        <span className="hidden h-px min-w-4 flex-1 bg-line xl:block" />
        <div className="ml-auto flex min-w-0 flex-wrap items-center justify-end gap-2">
          <Dropdown
            compact
            ariaLabel="Filter invited creators by platform"
            value={platform}
            onChange={setPlatform}
            options={["Platform", "Instagram", "YouTube", "Pinterest", "Snapchat"]}
            className="w-[98px] [&>button]:h-[38px]"
          />
          <Dropdown
            compact
            ariaLabel="Filter invited creators by deadline"
            value={deadline}
            onChange={setDeadline}
            options={["Deadline", "This week", "Next 7 days", "This month"]}
            className="w-[105px] [&>button]:h-[38px]"
          />
          <Dropdown
            compact
            ariaLabel="Sort invited creators"
            value={sort}
            onChange={setSort}
            options={["Sort: Next deadline", "Sort: Status", "Sort: Creator"]}
            className="w-[164px] [&>button]:h-[38px] [&>button]:border-0 [&>button]:bg-transparent [&>button]:px-2"
          />
        </div>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((creator, index) => (
          <InvitedCreatorCard
            key={creator.id}
            creator={creator}
            index={index}
            project={project}
            onViewProfile={(creatorId) =>
              navigate(
                isAgencyClient
                  ? agencyClientInvitedCreatorRoute(clientId, projectId, creatorId)
                  : brandInvitedCreatorRoute(projectId, creatorId),
              )
            }
            onEditDeliverables={(creatorId) =>
              navigate(
                isAgencyClient
                  ? agencyClientCreatorDeliverablesRoute(clientId, projectId, creatorId)
                  : brandCreatorDeliverablesRoute(projectId, creatorId),
              )
            }
            onMessage={(creatorId, creatorName) =>
              navigate(
                isAgencyClient
                  ? `${ROUTES.agencyMessages}?thread=${creatorId}&name=${encodeURIComponent(creatorName)}`
                  : `${ROUTES.brandMessages}?thread=${creatorId}&name=${encodeURIComponent(creatorName)}`,
              )
            }
          />
        ))}
      </div>
      {!visible.length ? (
        <div className="mt-5 rounded-xl border border-line bg-white px-6 py-12 text-center text-[13px] text-secondary">
          No invited creators match these filters.
        </div>
      ) : null}
      <div className="mt-5 flex flex-wrap items-center gap-1 text-[12px] leading-5 text-secondary">
        <span>
          Showing {visible.length} of {filtered.length} ·
        </span>
        {!showAll && filtered.length > visible.length ? (
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="font-medium text-primary hover:underline"
          >
            show {filtered.length - visible.length} more
          </button>
        ) : null}
        <span>· fees held in escrow until you approve</span>
      </div>
    </section>
  );
}

function ProjectContentEmpty({ onGoToInvitedCreators }: { onGoToInvitedCreators: () => void }) {
  const [filter, setFilter] = useState("To review");
  const states = ["To review", "Changes requested", "Approved", "Live", "All"];

  return (
    <section className="mt-5">
      <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-[10px] bg-subtle p-1">
        {states.map((state) => (
          <button
            type="button"
            key={state}
            onClick={() => setFilter(state)}
            className={`flex h-8 shrink-0 items-center gap-1.5 rounded-lg px-3 text-[13px] leading-5 transition ${filter === state ? "bg-white text-ink shadow-[0_1px_2px_rgba(0,0,0,.08)]" : "text-secondary hover:text-ink"}`}
          >
            <span>{state}</span>
            <span className="text-[12px] leading-4 text-secondary">0</span>
          </button>
        ))}
      </div>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="mt-5 flex min-h-[290px] flex-col items-center justify-center rounded-xl border border-line bg-white px-6 py-14 text-center"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.78 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="grid size-14 place-items-center rounded-full bg-subtle text-secondary"
        >
          <FileText size={26} strokeWidth={1.7} />
        </motion.span>
        <h2 className="mt-3 text-[14px] font-semibold leading-5 text-ink">No content yet</h2>
        <p className="mt-1 max-w-[520px] text-[13px] leading-5 text-secondary">
          Drafts appear here when creators submit them. Review each one, approving releases that
          deliverable&apos;s fee from escrow.
        </p>
        <Button
          kind="secondary"
          className="mt-4"
          leadingIcon={<Users size={16} />}
          onClick={onGoToInvitedCreators}
        >
          Go to Invited creators
        </Button>
      </motion.section>
    </section>
  );
}

function ContentFilterEmpty({ onGoToInvitedCreators }: { onGoToInvitedCreators: () => void }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="mt-5 flex min-h-[290px] flex-col items-center justify-center rounded-xl border border-line bg-white px-6 py-14 text-center"
    >
      <motion.span
        initial={{ opacity: 0, scale: 0.78 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="grid size-14 place-items-center rounded-full bg-subtle text-secondary"
      >
        <FileText size={26} strokeWidth={1.7} />
      </motion.span>
      <h2 className="mt-3 text-[14px] font-semibold leading-5 text-ink">No content yet</h2>
      <p className="mt-1 max-w-[520px] text-[13px] leading-5 text-secondary">
        Drafts appear here when creators submit them. Review each one, approving releases that
        deliverable&apos;s fee from escrow.
      </p>
      <Button
        kind="secondary"
        className="mt-4"
        leadingIcon={<Users size={16} />}
        onClick={onGoToInvitedCreators}
      >
        Go to Invited creators
      </Button>
    </motion.section>
  );
}

function ProjectBriefBoard({ project }: { project: ReturnType<typeof getProject> }) {
  const rules = getProjectRules(project);
  const projectDuration = project.duration.replace(/Â/g, "");
  const targetByObjective = {
    Sales: "₹6,00,000 net sales",
    Awareness: "12 L reach",
    Engagement: "48,000 engagements",
    Traffic: "18,000 sessions",
    Leads: "1,200 qualified leads",
  } as const;
  const trackingByObjective = {
    Sales: "Shopify · code + UTM link per deliverable",
    Awareness: "Connected Instagram and YouTube accounts",
    Engagement: "Connected platform insights",
    Traffic: "UTM links + GA4",
    Leads: "Quiz form + UTM parameters",
  } as const;
  const creatorCriteria = rules.isAI
    ? `${project.creatorCount} creators · Hindi and English delivery · 3–5 day turnaround · beauty video portfolio`
    : rules.isUgc
      ? `${project.creatorCount} creators · relevant portfolio required · 5 day turnaround · beauty & skincare experience`
      : rules.isAmbassador
        ? `${project.creatorCount} creators · 3-month commitment · consistent posting · beauty & skincare audience`
        : `${project.creatorCount} creators · 10K – 5 L followers · eng. rate 3%+ · beauty & skincare · 70%+ audience in India`;
  const deliverableCopy = rules.isAI
    ? `Per creator: 3 ${rules.itemPlural} · each with a script, deadline and usage rights · Hindi and English cuts supplied`
    : rules.isUgc
      ? `Per creator: 3 files · product demo, swatch and routine · raw files supplied · drafts approved before delivery`
      : rules.isAmbassador
        ? `Per creator, every month: 1 Reel + 2 Stories · monthly content plan, deadlines and approvals`
        : `Per creator: 1 Reel + 2 Stories${project.platform.includes("YouTube") ? " (Short on YouTube)" : ""} · each with its own deadline, fee, link and coupon · drafts approved before posting`;
  const budgetCopy = rules.isGift
    ? `${project.budget} product value for ${project.creatorCount} creators · kits ship from your warehouse · no creator fee`
    : `${project.budget}${rules.isLongTerm ? " per month" : ""} for ${project.creatorCount} creators · fees ₹${rules.isUgc ? "10,000 – 15,000" : "12,000 – 30,000"} by deliverables · escrow released after approval`;
  const briefCopy = rules.isUgc
    ? "Show the product texture in natural light · no watermark or competitor products · include raw files and a clean product close-up"
    : rules.isAI
      ? "Use the approved product claims · show clear before-and-after context · no unapproved medical claims or competitor products"
      : rules.objective === "Sales"
        ? "Show the product in the first 3 seconds · say the code on camera · pin the link · #ad and paid-partnership label"
        : rules.objective === "Awareness"
          ? "Hook viewers in the first 3 seconds · show the product naturally · #ad and paid-partnership label · no competitor products in frame"
          : rules.objective === "Traffic"
            ? "Show the key benefit early · explain where the link leads · pin the link and use the supplied UTM"
            : rules.objective === "Leads"
              ? "Explain the quiz benefit clearly · prompt viewers to complete the form · use the supplied UTM link"
              : "Show the product naturally · ask a clear question · encourage saves and shares · #ad and paid-partnership label";
  const paymentCopy = rules.isGift
    ? `Kits are shipped from your warehouse${rules.isLongTerm ? " at the start of every cycle" : ""} · approving content marks each deliverable complete`
    : `UPI AutoPay · charged on invite${rules.isLongTerm ? " at the start of every cycle" : ""}, held in escrow until you approve`;
  const rows = [
    {
      label: "Tracking",
      value: `Target ${targetByObjective[rules.objective]} · ${trackingByObjective[rules.objective]}`,
      locked: true,
    },
    {
      label: "Details",
      value: `${project.name} · ${project.projectType} · ${project.platform} · English, Hindi · ${projectDuration}${rules.isLongTerm ? " · cycles run monthly" : ""}`,
    },
    { label: "Creators", value: creatorCriteria },
    { label: "Deliverables", value: deliverableCopy, locked: true },
    { label: "Budget & fees", value: budgetCopy, locked: true },
    { label: "Brief", value: briefCopy },
    { label: "Payment", value: paymentCopy },
  ];
  const history = [
    [
      rules.isLongTerm ? "Updated the next delivery cycle" : "Extended applications to 12 Oct",
      "12 Oct",
    ],
    [
      rules.isFileBased
        ? `Added ${rules.item} requirements · ${Math.max(1, Math.round(project.creatorCount / 2))} creators agreed`
        : project.platform.includes("YouTube")
          ? "Added YouTube Short for YouTube creators · 3 creators agreed"
          : "Updated creator deliverable instructions · 3 creators agreed",
      "8 Oct",
    ],
    ["Published project", "7 Oct"],
  ];

  return (
    <section className="mt-5 grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-xl border border-line bg-white p-5 sm:p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-[18px] font-semibold leading-6 text-ink">Project brief</h2>
            <p className="mt-0.5 text-[13px] leading-5 text-secondary">
              Everything creators agreed to, in one place
            </p>
          </div>
          <Button kind="secondary" size="s" leadingIcon={<Pencil size={16} />}>
            Edit brief
          </Button>
        </div>

        <div className="mt-4 flex gap-2.5 rounded-lg border border-line bg-[#f9fafb] px-3.5 py-3 text-[13px] leading-5">
          <LockKeyhole className="mt-0.5 shrink-0 text-secondary" size={16} />
          <div>
            <p className="font-medium text-ink">3 sections are locked</p>
            <p className="text-secondary">
              Creators joined based on Tracking, Deliverables and Budget. You can still change them,
              but creators have to accept first.
            </p>
          </div>
        </div>

        <div className="mt-2 divide-y divide-line">
          {rows.map((row) => (
            <div
              className="grid gap-2 py-3.5 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-6"
              key={row.label}
            >
              <div>
                <p className="text-[13px] font-medium leading-5 text-secondary">{row.label}</p>
                {row.locked && (
                  <span className="mt-1 inline-flex rounded-md bg-muted px-1.5 py-0.5 text-[11px] font-medium leading-4 text-[#394357]">
                    Locked
                  </span>
                )}
              </div>
              <p className="text-[14px] leading-5 text-ink">{row.value}</p>
            </div>
          ))}
        </div>
      </motion.article>

      <motion.aside
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-xl border border-line bg-white p-5"
      >
        <h2 className="text-[14px] font-semibold leading-[22px] text-ink">Change history</h2>
        <div className="mt-2.5 space-y-2.5">
          {history.map(([event, date]) => (
            <div key={`${event}-${date}`}>
              <p className="text-[13px] leading-5 text-ink">{event}</p>
              <p className="text-[12px] leading-4 text-secondary">{date}</p>
            </div>
          ))}
        </div>
      </motion.aside>
    </section>
  );
}

function ProjectPaymentsEmpty({
  project,
  onGoToApplications,
}: {
  project: ReturnType<typeof getProject>;
  onGoToApplications: () => void;
}) {
  const rules = getProjectRules(project);
  const tiles = rules.isGift
    ? [
        { label: "Kit value", detail: "no kits committed", icon: WalletCards, tone: "bg-ink" },
        { label: "Shipped", detail: "-", icon: CircleDollarSign, tone: "bg-[#f29b07]" },
        { label: "Delivered", detail: "-", icon: CircleCheck, tone: "bg-[#149d46]" },
      ]
    : [
        { label: "Committed", detail: "no invites yet", icon: WalletCards, tone: "bg-ink" },
        { label: "In escrow", detail: "-", icon: CircleDollarSign, tone: "bg-[#f29b07]" },
        { label: "Released", detail: "-", icon: CircleCheck, tone: "bg-[#149d46]" },
      ];

  return (
    <section className="mt-5 space-y-5">
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-xl border border-line bg-white p-5"
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {tiles.map(({ label, detail, icon: Icon, tone }, index) => (
            <motion.article
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl border border-line-subtle bg-white p-4"
              key={label}
            >
              <span className={`grid size-9 place-items-center rounded-lg ${tone} text-white`}>
                <Icon size={18} strokeWidth={1.9} />
              </span>
              <p className="mt-3.5 text-[12px] leading-4 text-secondary">{label}</p>
              <p className="mt-1 text-[22px] font-semibold leading-7 tracking-[-0.33px] text-ink">
                ₹0
              </p>
              <p className="mt-2.5 text-[12px] font-medium leading-4 text-tertiary">{detail}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="flex min-h-[294px] flex-col items-center justify-center rounded-xl border border-line bg-white px-6 py-14 text-center"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.78 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="grid size-14 place-items-center rounded-full bg-subtle text-secondary"
        >
          <WalletCards size={26} strokeWidth={1.7} />
        </motion.span>
        <h2 className="mt-3 text-[14px] font-semibold leading-5 text-ink">No payments yet</h2>
        <p className="mt-1 max-w-[560px] text-[13px] leading-5 text-secondary">
          {rules.isGift
            ? "When you invite a creator and set their deliverables, their kits are recorded here. Approving their content marks the exchange complete."
            : "When you invite a creator and set their deliverables, the fee is charged into escrow. It’s released when you approve their content and refunded automatically if they don’t deliver."}
        </p>
        <button
          type="button"
          onClick={onGoToApplications}
          className="mt-4 flex h-10 items-center justify-center gap-2 rounded-md bg-ink px-4 text-[14px] font-medium leading-5 text-white transition hover:bg-[#242832]"
        >
          <Users size={16} />
          Go to Applications
        </button>
      </motion.section>
    </section>
  );
}

function ProjectPaymentsBoard({ project }: { project: ReturnType<typeof getProject> }) {
  const rules = getProjectRules(project);
  const [filter, setFilter] = useState("All");
  const payments = [
    [
      "Meera Iyer",
      "meera-iyer",
      "@meerabeauty",
      "2 of 3",
      "Instagram",
      30000,
      27000,
      "Changes asked · 28 Oct",
      "In escrow",
    ],
    [
      "Ishita Rao",
      "ishita-rao",
      "@ishitarao",
      "2 of 4",
      "Instagram",
      17000,
      12750,
      "₹4,250 released · 21 Oct",
      "In escrow",
    ],
    [
      "Emma Clarke",
      "emma-clarke",
      "@emmaclarke",
      "3 of 4",
      "Instagram",
      15000,
      11250,
      "₹3,750 released · 24 Oct",
      "In escrow",
    ],
    [
      "Kavya Reddy",
      "kavya-reddy",
      "@kavyareddy",
      "3 of 4",
      "Instagram",
      15000,
      11250,
      "₹3,750 released · 24 Oct",
      "In escrow",
    ],
    [
      "Riya Sen",
      "meera-iyer",
      "@riyasens",
      "3 of 4",
      "Instagram",
      12000,
      9000,
      "₹3,000 released · 25 Oct",
      "In escrow",
    ],
    [
      "Sneha Patil",
      "kavya-reddy",
      "@snehapatil",
      "2 of 4",
      "Instagram",
      12000,
      6000,
      "Story due · 30 Oct",
      "In escrow",
    ],
    [
      "Nisha Verma",
      "tara-bose",
      "@nishaverma",
      "2 of 4",
      "YouTube",
      12000,
      9000,
      "₹3,000 released · 24 Oct",
      "In escrow",
    ],
    [
      "Tara Bose",
      "tara-bose",
      "@tarabose",
      "2 of 4",
      "Instagram",
      15000,
      7500,
      "Dispute open · 26 Oct",
      "Disputed",
    ],
    [
      "Pooja Menon",
      "emma-clarke",
      "@poojamenon",
      "0 of 4",
      "Instagram",
      12500,
      1500,
      "₹11,000 held · 2 Nov",
      "In escrow",
    ],
    [
      "Lara Mehta",
      "meera-iyer",
      "@laramehta",
      "4 of 4",
      "Instagram",
      10000,
      9500,
      "₹500 held · 20 Oct",
      "In escrow",
    ],
    [
      "Aditi Joshi",
      "ishita-rao",
      "@diya.glows",
      "4 of 4",
      "YouTube",
      8000,
      7500,
      "₹500 held · 20 Oct",
      "In escrow",
    ],
    [
      "Zoya Ahmed",
      "emma-clarke",
      "@zoyaahmed",
      "4 of 4",
      "Instagram",
      9000,
      8500,
      "₹500 held · 19 Oct",
      "In escrow",
    ],
    [
      "Diya Kapoor",
      "kavya-reddy",
      "@diyaglows",
      "3 of 4",
      "Instagram",
      7500,
      6250,
      "₹1,250 held · 28 Oct",
      "In escrow",
    ],
    [
      "Simran Kaur",
      "tara-bose",
      "@simrankaur",
      "3 of 4",
      "Instagram",
      7500,
      5000,
      "₹2,500 held · 29 Oct",
      "In escrow",
    ],
    [
      "Kritika Sharma",
      "meera-iyer",
      "@kritikaskincare",
      "3 of 4",
      "YouTube",
      8500,
      4500,
      "₹4,000 held · 30 Oct",
      "In escrow",
    ],
    [
      "Mehak Sethi",
      "ishita-rao",
      "@mehaksethi",
      "2 of 4",
      "Instagram",
      9000,
      6300,
      "₹2,700 held · 30 Oct",
      "In escrow",
    ],
  ] as const;
  const formatMoney = (value: number) => `₹${new Intl.NumberFormat("en-IN").format(value)}`;
  const committed = payments.reduce((total, [, , , , , fee]) => total + fee, 0);
  const released = payments.reduce((total, [, , , , , , value]) => total + value, 0);
  const escrow = committed - released;
  const statusFor = (payment: (typeof payments)[number]) => {
    if (!rules.isGift) return payment[8];
    return payment[6] === payment[5] ? "Delivered" : "In transit";
  };
  const states = rules.isGift
    ? ["All", "Delivered", "In transit"]
    : ["All", "In escrow", "Fully paid", "Disputed", "Refunded"];
  const countFor = (state: string) =>
    state === "All"
      ? payments.length
      : payments.filter((payment) => statusFor(payment) === state).length;
  const visible = payments.filter((payment) => filter === "All" || statusFor(payment) === filter);
  const tiles = rules.isGift
    ? [
        {
          label: "Product value",
          value: formatMoney(committed),
          detail: "all creator kits",
          icon: PackageCheck,
          tone: "bg-ink",
        },
        {
          label: "Kits delivered",
          value: `${payments.filter((payment) => statusFor(payment) === "Delivered").length}`,
          detail: "creator shipments",
          icon: Truck,
          tone: "bg-[#f29b07]",
        },
        {
          label: "Paid to creators",
          value: "₹0",
          detail: "gift exchange",
          icon: CircleDollarSign,
          tone: "bg-[#149d46]",
        },
        {
          label: "Fee on product value",
          value: "₹0",
          detail: "no platform fee",
          icon: ReceiptText,
          tone: "bg-primary",
        },
      ]
    : [
        {
          label: rules.isLongTerm ? "Charged to date" : "Committed",
          value: formatMoney(committed),
          detail: rules.isLongTerm ? "3 cycles so far" : "16 creators invited",
          icon: WalletCards,
          tone: "bg-ink",
        },
        {
          label: "In escrow",
          value: formatMoney(escrow),
          detail: "awaiting approval",
          icon: CircleDollarSign,
          tone: "bg-[#f29b07]",
        },
        {
          label: "Released",
          value: formatMoney(released),
          detail: "paid to creators",
          icon: CircleCheck,
          tone: "bg-[#149d46]",
        },
        {
          label: "GST",
          value: "₹11,800",
          detail: "invoiced so far",
          icon: ReceiptText,
          tone: "bg-primary",
        },
      ];

  return (
    <section className="mt-5 space-y-5">
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-xl border border-line bg-white p-5"
      >
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {tiles.map(({ label, value, detail, icon: Icon, tone }, index) => (
            <motion.article
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl border border-line-subtle bg-white p-4"
              key={label}
            >
              <span className={`grid size-9 place-items-center rounded-lg ${tone} text-white`}>
                <Icon size={18} strokeWidth={1.9} />
              </span>
              <p className="mt-3.5 text-[12px] leading-4 text-secondary">{label}</p>
              <p className="mt-1 text-[22px] font-semibold leading-7 tracking-[-0.33px] text-ink">
                {value}
              </p>
              <p className="mt-2.5 text-[12px] font-medium leading-4 text-tertiary">{detail}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-[10px] bg-subtle p-1">
          {states.map((state) => (
            <button
              type="button"
              key={state}
              onClick={() => setFilter(state)}
              className={`flex h-8 shrink-0 items-center gap-1.5 rounded-lg px-3 text-[13px] leading-5 transition ${filter === state ? "bg-white text-ink shadow-[0_1px_2px_rgba(0,0,0,.08)]" : "text-secondary hover:text-ink"}`}
            >
              <span>{state}</span>
              <span className="text-[12px] leading-4 text-secondary">{countFor(state)}</span>
            </button>
          ))}
        </div>
        <span className="hidden h-px flex-1 bg-line xl:block" />
        <button
          type="button"
          className="flex h-8 items-center gap-1.5 rounded-md border border-line bg-white px-3 text-[13px] font-medium leading-[18px] text-ink transition hover:bg-subtle"
        >
          <Download size={16} />
          Download statement
        </button>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden rounded-xl border border-line bg-white p-5"
      >
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full min-w-[1050px] border-collapse text-left">
            <thead className="bg-subtle text-[12px] font-semibold leading-4 text-secondary">
              <tr>
                <th className="w-10 px-4 py-2.5">#</th>
                <th className="min-w-[230px] px-3 py-2.5">Creator</th>
                <th className="w-20 px-3 py-2.5">Approved</th>
                <th className="w-[116px] px-3 py-2.5">Platform</th>
                <th className="w-[100px] px-3 py-2.5 text-right">
                  {rules.isGift ? "Kit value" : rules.isLongTerm ? "Fee to date" : "Fee"}
                </th>
                <th className="w-[120px] px-3 py-2.5">{rules.isGift ? "Shipped" : "Released"}</th>
                <th className="w-[154px] px-3 py-2.5">
                  {rules.isGift ? "Delivered" : "In escrow"}
                </th>
                <th className="w-[145px] px-3 py-2.5">Last activity</th>
                <th className="w-[72px] px-3 py-2.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {visible.map(
                (
                  [name, avatar, handle, approved, platform, fee, releasedAmount, activity, status],
                  index,
                ) => {
                  const inEscrow = fee - releasedAmount;
                  const rowStatus = statusFor([
                    name,
                    avatar,
                    handle,
                    approved,
                    platform,
                    fee,
                    releasedAmount,
                    activity,
                    status,
                  ]);
                  const hasEscrow = !rules.isGift && inEscrow > 0;
                  return (
                    <tr
                      className="border-t border-line-subtle text-[13px] leading-5 text-ink"
                      key={name}
                    >
                      <td className="px-4 py-3 text-[14px] font-medium">{index + 1}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={`/assets/creators/${avatar}.png`}
                            alt=""
                            className="size-10 rounded-full object-cover"
                          />
                          <div className="min-w-0">
                            <p className="truncate text-[14px] font-medium leading-[22px]">
                              {name}
                            </p>
                            <p className="truncate text-[12px] leading-4 text-secondary">
                              {approved.replace("of", "deliverables ·")} · {handle}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">{approved}</td>
                      <td className="px-3 py-3">
                        <span className="flex items-center gap-1.5">
                          <PlatformLogo platform={platform as Platform} size={16} />
                          {platform}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-right font-medium whitespace-nowrap">
                        {formatMoney(fee)}
                      </td>
                      <td className="px-3 py-3">
                        <span className="inline-flex rounded-full bg-success-bg px-2 py-0.5 text-[12px] font-medium leading-4 text-success">
                          {rules.isGift
                            ? releasedAmount === fee
                              ? "Delivered"
                              : "Shipped"
                            : formatMoney(releasedAmount)}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-[12px] font-medium leading-4 ${hasEscrow ? "bg-warning-bg text-warning" : rowStatus === "Disputed" ? "bg-danger-bg text-danger" : "bg-muted text-secondary"}`}
                        >
                          {rules.isGift
                            ? rowStatus
                            : hasEscrow
                              ? `In escrow · ${formatMoney(inEscrow)}`
                              : rowStatus}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-[12px] leading-4 text-secondary">{activity}</td>
                      <td className="px-3 py-3 text-right">
                        <button
                          type="button"
                          className="h-8 rounded-md border border-line bg-white px-3 text-[13px] font-medium leading-[18px] transition hover:bg-subtle"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
            <tfoot className="bg-subtle">
              <tr>
                <td colSpan={9} className="px-4 py-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-[14px] font-medium leading-[22px] text-ink">
                      {rules.isGift
                        ? `Total product value ${formatMoney(committed)} · ${payments.filter((payment) => statusFor(payment) === "Delivered").length} kits delivered`
                        : `Total fees ${formatMoney(committed)} · ${formatMoney(released)} released · ${formatMoney(escrow)} in escrow`}
                    </p>
                    <p className="text-[12px] leading-4 text-secondary">
                      {rules.isGift
                        ? "Kits ship from your warehouse · no creator fees"
                        : "+ ₹11,800 GST invoiced so far · no platform fee · paid by UPI"}
                    </p>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </motion.section>

      <p className="flex items-center gap-2 text-[12px] leading-4 text-secondary">
        <Info size={14} className="shrink-0" />
        {rules.isGift
          ? "Kits ship from your warehouse. Approving creator content marks the exchange complete."
          : `Every rupee sits in escrow until you approve. If a creator doesn’t deliver, it’s refunded to you automatically.${rules.isLongTerm ? " Each cycle is charged at its start." : ""}`}
      </p>
    </section>
  );
}

function ProjectContentBoard({
  project,
  onGoToInvitedCreators,
}: {
  project: ReturnType<typeof getProject>;
  onGoToInvitedCreators: () => void;
}) {
  const rules = getProjectRules(project);
  const liveLabel = rules.isFileBased ? "Delivered" : "Live";
  const [filter, setFilter] = useState("To review");
  const [reviewed, setReviewed] = useState<string[]>([]);
  const [secondaryFilter, setSecondaryFilter] = useState(rules.isUgc ? "Use" : "Platform");
  const cards = [
    ["Meera Iyer", "meera-iyer", "Story · last-minute look", "submitted yesterday", "₹3,000"],
    ["Ishita Rao", "ishita-rao", "Reel · results", "submitted 2 days ago", "₹3,000"],
    ["Kavya Reddy", "kavya-reddy", "Story · code reminder", "submitted today", "₹3,750"],
    ["Nisha Verma", "tara-bose", "Short · routine", "submitted today", "₹6,000"],
  ] as const;
  const contentPreviewByCreator: Record<
    string,
    { image: string; avatar: string; platform: Platform }
  > = {
    "Meera Iyer": {
      image: "/assets/content/meera-last-minute-look.png",
      avatar: "/assets/content/meera-iyer-avatar.png",
      platform: "Instagram",
    },
    "Ishita Rao": {
      image: "/assets/content/ishita-results.png",
      avatar: "/assets/content/ishita-rao-avatar.png",
      platform: "Instagram",
    },
    "Kavya Reddy": {
      image: "/assets/content/kavya-code-reminder.png",
      avatar: "/assets/content/kavya-reddy-avatar.png",
      platform: "Instagram",
    },
    "Nisha Verma": {
      image: "/assets/content/nisha-routine.png",
      avatar: "/assets/content/nisha-verma-avatar.png",
      platform: "YouTube",
    },
  };
  const counts: Record<string, number> = {
    "To review": cards.length - reviewed.length,
    "Changes requested": 0,
    Approved: reviewed.length,
    [liveLabel]: 0,
    All: cards.length,
  };
  const visible = cards.filter(([name]) => {
    if (filter === "All") return true;
    if (filter === "To review") return !reviewed.includes(name);
    if (filter === "Approved") return reviewed.includes(name);
    return false;
  });

  return (
    <section className="mt-5">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-[10px] bg-subtle p-1">
          {["To review", "Changes requested", "Approved", liveLabel, "All"].map((state) => (
            <button
              type="button"
              key={state}
              onClick={() => setFilter(state)}
              className={`flex h-8 shrink-0 items-center gap-1.5 rounded-lg px-3 text-[13px] leading-5 transition ${filter === state ? "bg-white text-ink shadow-[0_1px_2px_rgba(0,0,0,.08)]" : "text-secondary hover:text-ink"}`}
            >
              <span>{state}</span>
              <span className="text-[12px] leading-4 text-secondary">{counts[state]}</span>
            </button>
          ))}
        </div>
        <span className="hidden h-px flex-1 bg-line xl:block" />
        <Dropdown
          compact
          ariaLabel={rules.isUgc ? "Filter content by use" : "Filter content by platform"}
          value={secondaryFilter}
          onChange={setSecondaryFilter}
          options={
            rules.isUgc
              ? ["Use", "Organic", "Paid ads"]
              : ["Platform", "Instagram", "YouTube", "Pinterest", "Snapchat"]
          }
          className="w-[108px] [&>button]:h-9"
        />
      </div>

      {visible.length ? (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {visible.map(([name, avatar, title, submitted, held], index) => (
            <motion.article
              key={name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-xl border border-line bg-white p-3"
            >
              <div className="relative h-[260px] overflow-hidden rounded-[10px] bg-subtle sm:h-[300px]">
                <img
                  src={contentPreviewByCreator[name].image}
                  alt=""
                  className="size-full object-cover"
                />
                <span className="absolute left-2.5 top-2.5 grid size-5 place-items-center rounded bg-white/95 shadow-sm">
                  <PlatformLogo platform={contentPreviewByCreator[name].platform} size={16} />
                </span>
              </div>
              <div className="mt-2.5 flex items-center gap-2">
                <img
                  src={contentPreviewByCreator[name].avatar}
                  alt=""
                  className="size-7 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-medium leading-[22px] text-ink">{name}</p>
                  <p className="truncate text-[12px] leading-4 text-secondary">
                    {rules.isFileBased ? `${rules.item} · product demo` : title}
                  </p>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between gap-2 text-[12px] leading-4">
                <span className="text-secondary">{submitted}</span>
                <span className="font-medium text-ink">
                  {rules.isGift ? "Kit · no fee" : `${held} held`}
                </span>
              </div>
              <button
                type="button"
                disabled={reviewed.includes(name)}
                onClick={() => {
                  if (!reviewed.includes(name)) setReviewed((current) => [...current, name]);
                }}
                className={`mt-2.5 h-8 w-full rounded-md text-[13px] font-medium leading-[18px] transition ${reviewed.includes(name) ? "cursor-default bg-[#e1fce3] text-[#168a4d]" : "bg-ink text-white hover:bg-[#242832]"}`}
              >
                {reviewed.includes(name) ? "Reviewed" : "Review"}
              </button>
            </motion.article>
          ))}
        </div>
      ) : (
        <ContentFilterEmpty onGoToInvitedCreators={onGoToInvitedCreators} />
      )}
      <p className="mt-4 flex items-center gap-2 text-[12px] leading-4 text-secondary">
        <Info size={14} className="shrink-0" />
        {rules.isGift
          ? "Approving marks this deliverable complete; kits are the only payment."
          : "Approving a draft releases its fee from escrow. Creators have 48 hours to fix requested changes."}
        {rules.isFileBased ? " Approved files are added to your ad library." : ""}
      </p>
    </section>
  );
}

export type AgencyClientProjectPublishedPageProps = {
  activeClientId?: string;
  initialTab?: string;
};

export function AgencyClientProjectPublishedPage({
  activeClientId,
  initialTab,
}: AgencyClientProjectPublishedPageProps = {}) {
  const navigate = useNavigate();
  const { projectId, clientId: paramClientId } = useParams<{ projectId?: string; clientId?: string }>();
  const clientId = activeClientId || paramClientId || "minimalist";
  const project = getProject(Number(projectId) || 1);

  // Sync latest published project details if just published
  if (typeof window !== "undefined") {
    try {
      const stored = window.sessionStorage.getItem(`floooww-client-${clientId}-latest-project`);
      if (stored) {
        const latest = JSON.parse(stored);
        if (latest.name) project.name = latest.name;
        if (latest.type) project.projectType = latest.type;
      }
    } catch {
      // Ignore parse error
    }
  }
  const isAgencyClient = true;
  const projectHomeRoute = agencyClientProjectsRoute(clientId);
  const projectDiscoveryRoute = `/agency/client/${clientId}?tab=creators`;

  const isPublishedRoute =
    typeof window !== "undefined" && window.location.pathname.endsWith("/published");
  const [searchParams, setSearchParams] = useSearchParams();
  const isJustPublished =
    isPublishedRoute ||
    searchParams.get("published") === "true" ||
    searchParams.get("justPublished") === "true" ||
    searchParams.get("state") === "empty";

  const isArchivedParam =
    projectId === "archived" ||
    searchParams.get("status")?.toLowerCase() === "archived" ||
    project.detailStatus === "Archived";

  const isNoCreators =
    !isArchivedParam &&
    (isJustPublished ||
      project.creatorCount === 0 ||
      project.detailStatus === "Upcoming" ||
      (isAgencyClient &&
        project.id === 1 &&
        typeof window !== "undefined" &&
        !window.sessionStorage.getItem(`floooww-project-${project.id}-invited`)));

  const [status, setStatus] = useState<Lifecycle>(() => {
    if (isArchivedParam) return "Archived";
    if (isNoCreators) return "Upcoming";
    return project.detailStatus;
  });
  const [tab, setTab] = useState(() => {
    const qTab = searchParams.get("tab");
    if (qTab) {
      const match = tabs.find((t) => t.toLowerCase() === qTab.toLowerCase());
      if (match) return match;
    }
    if (initialTab && tabs.includes(initialTab)) {
      return initialTab;
    }
    if (typeof window === "undefined") return "Overview";
    const key = `floooww-project-${project.id}-active-tab`;
    const requestedTab = window.sessionStorage.getItem(key);
    window.sessionStorage.removeItem(key);
    return requestedTab === "Invited creators" ? requestedTab : "Overview";
  });
  const [performancePlatform, setPerformancePlatform] = useState("All platforms");
  const handleDownloadReport = () => {
    alert("Downloading campaign performance report (PDF)...");
  };
  const handleTabChange = (item: string) => {
    setTab(item);
    const nextParams = new URLSearchParams(searchParams);
    if (item === "Overview") {
      nextParams.delete("tab");
    } else {
      nextParams.set("tab", item);
    }
    setSearchParams(nextParams, { replace: true });
  };
  const [invitedCreatorCount, setInvitedCreatorCount] = useState(() => {
    if (isNoCreators) return 0;
    const newlyInvited =
      typeof window !== "undefined" &&
      window.sessionStorage.getItem(`floooww-project-${project.id}-invited`) === "true";
    return Math.max(project.creatorCount, newlyInvited ? 1 : 0);
  });
  const [more, setMore] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [selectedCreatorName, setSelectedCreatorName] = useState("Diya Kapoor");
  const [confirm, setConfirm] = useState<Confirm>(null);

  const handleOpenInvite = (name: string = "Diya Kapoor") => {
    setSelectedCreatorName(name);
    setInviteModalOpen(true);
  };

  const handleContinueInvite = (selectedProjId: number) => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(`floooww-project-${selectedProjId}-invited`, "true");
      window.sessionStorage.setItem(`floooww-project-${selectedProjId}-active-tab`, "Invited creators");
    }
    setInviteModalOpen(false);
    if (selectedProjId === project.id) {
      setInvitedCreatorCount((prev) => Math.max(prev, 1));
      setTab("Invited creators");
    } else {
      if (isAgencyClient) {
        navigate(`/agency/client/${clientId}/projects/${selectedProjId}`);
      } else {
        navigate(`/brand/projects/${selectedProjId}`);
      }
    }
  };
  const [applicationStatus, setApplicationStatus] = useState("All");
  const [applicationPlatform, setApplicationPlatform] = useState("Platform");
  const [applicationFollowers, setApplicationFollowers] = useState("Followers");
  const [applicationEngagement, setApplicationEngagement] = useState("Eng. rate");
  const [applicationFee, setApplicationFee] = useState("Fee");
  const [applicationCity, setApplicationCity] = useState("City");
  const [applicationSort, setApplicationSort] = useState("Match");
  const locked = status === "Archived" || status === "Deleted";
  const rules = getProjectRules(project);
  const objective = rules.objective;
  const longTerm = rules.isLongTerm;
  const giftExchange = rules.isGift;
  const fileDelivery = rules.isFileBased;
  const contentUnit = rules.itemPlural;
  const deliveryVerb = rules.completedVerb;
  const deliveryAction = rules.activeVerb;
  const deadlineLabel = rules.deadlineLabel;
  const milestoneItems = longTerm
    ? [
        ["Launched", "Project is live", "7 Oct"],
        [
          giftExchange ? "Kits delivered" : "Creators accepted",
          giftExchange ? "Products are on their way" : "Creator team confirmed",
          "9 Oct",
        ],
        ["Month 2 of 6", "Current delivery cycle", "Oct"],
        ["Next month starts", "Brief is sent for the next cycle", "1 Nov"],
        ["Project ends", "Final cycle and usage rights end", "28 Feb"],
      ]
    : [
        ["Launched", "Project is live", "7 Oct"],
        [
          giftExchange ? "Kits delivered" : "Creators accepted",
          giftExchange ? "Products are on their way" : "Creator team confirmed",
          "9 Oct",
        ],
        [rules.firstItemLabel, `First ${rules.item} is expected`, "15 Oct"],
        [deadlineLabel, `Final ${contentUnit} due from creators`, "3 Nov"],
        ["Project ends", "Usage rights end 7 Dec", "7 Nov"],
      ];
  const keyDates = longTerm
    ? [
        ["This month's due date", "3 Nov"],
        ["Next cycle charge", "1 Nov"],
        ["Project ends", "28 Feb 2027"],
      ]
    : [
        [deadlineLabel, "3 Nov 2026"],
        ["Usage rights end", "7 Dec 2026"],
        ["Payments", giftExchange ? "Products sent" : "On track"],
      ];
  const resultMetrics = objectiveMetrics[objective];
  const resultValues: Record<Objective, string[]> = {
    Sales: ["₹5.42L", "1,315", "4.8%", "2.7×", "₹412"],
    Awareness: ["1.8M", "6.2L", "48.6K", "2.4M", "₹83"],
    Engagement: ["5.4%", "48.2K", "8.6K", "3.9K", "₹26"],
    Traffic: ["14.8K", "18.2K", "3.1%", "8.4K", "₹11"],
    Leads: ["1,284", "3,041", "42%", "714", "₹156"],
  };
  const quickAction = locked
    ? status === "Paused"
      ? "Resume project"
      : "Restore project"
    : status === "Completed"
      ? "Leave reviews"
      : `Review ${Math.max(1, Math.round(project.deliverableCount / Math.max(project.creatorCount, 1)))} ${contentUnit}`;
  const creatorDeliverable =
    longTerm && /ambassador/i.test(project.projectType)
      ? "Month 3: 0 / 3"
      : `0 / ${fileDelivery ? 2 : 4} ${contentUnit}`;
  useEffect(() => {
    if (isArchivedParam) {
      setStatus("Archived");
    } else if (isNoCreators) {
      setStatus("Upcoming");
    } else {
      setStatus(project.detailStatus);
    }
  }, [project.id, project.detailStatus, isNoCreators, isArchivedParam]);
  // Replace this sample with the accepted/invited creator records from the project API.
  // An empty API response continues to render the existing empty state.
  const creators = isNoCreators ? [] : project.creatorCount > 0 ? invitedCreators : [];
  const creatorProgress =
    project.creatorCount > 0
      ? (() => {
          const allDelivered = Math.max(1, Math.round(project.creatorCount * 0.19));
          const inProgress = Math.max(1, Math.round(project.creatorCount * 0.31));
          const notStarted = Math.max(0, Math.round(project.creatorCount * 0.38));
          const behind = Math.max(0, project.creatorCount - allDelivered - inProgress - notStarted);
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
    <AgencyClientShell activeClientId={clientId}>
      <main className="w-full pb-10">
        <header className="flex flex-col justify-between gap-4 lg:h-[122px] lg:flex-row">
          <div>
            <div className="flex items-center gap-2 text-[12px] leading-4 text-tertiary">
              <button
                type="button"
                onClick={() => navigate(projectHomeRoute)}
                className="text-[#3B5BFF] font-medium hover:text-ink transition-colors cursor-pointer"
              >
                Projects
              </button>
              <span className="text-neutral-400">/</span>
              <span className="text-ink font-medium">{project.name}</span>
              <span className="text-neutral-400">/</span>
              <span className="text-secondary">{rules.objective}</span>
              <span className="text-neutral-400">/</span>
              <span className="text-secondary">{project.projectType === "UGC" ? "UGC" : "Influencer"}</span>
              <span className="text-neutral-400">/</span>
              <span className="text-secondary">{rules.isGift ? "Gift exchange" : "Paid"}</span>
              <span className="text-neutral-400">/</span>
              <span className="text-secondary">{rules.isLongTerm ? "Long-term" : "One-time"}</span>
            </div>
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
            {status === "Archived" ? (
              <Button
                className="bg-[#0d0d10] text-white hover:bg-black font-medium"
                leadingIcon={<RotateCcw size={16} />}
                onClick={() => {
                  setStatus("Live");
                  project.detailStatus = "Live";
                  project.status = "Live";
                }}
              >
                Restore project
              </Button>
            ) : (
              <Button
                disabled={locked}
                className="bg-[#0d0d10] text-white hover:bg-black font-medium"
                leadingIcon={<Users size={16} />}
                onClick={() => handleOpenInvite()}
              >
                Invite creators
              </Button>
            )}
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
                      onClick={() => navigate(projectHomeRoute)}
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
        {status === "Archived" && !isAgencyClient && (
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
              <Button size="s" kind="ghost" onClick={() => navigate(projectHomeRoute)}>
                Back to projects
              </Button>
            </div>
          </div>
        )}
        <nav className="mt-6 flex min-h-[37px] flex-wrap items-end justify-between gap-3 border-b border-line">
          <div className="flex max-w-full gap-6 overflow-x-auto">
            {tabs.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleTabChange(item)}
                className={`h-9 shrink-0 border-b-2 text-[14px] leading-[22px] ${tab === item ? "border-primary font-medium text-primary" : "border-transparent text-secondary"}`}
              >
                {item}
                {["Applications", "Invited creators", "Content"].includes(item) && (
                  <span className="ml-1.5 rounded-full bg-muted px-[7px] py-px text-[12px] leading-4 text-secondary">
                    {status === "Archived"
                      ? item === "Applications"
                        ? 12
                        : item === "Invited creators"
                          ? 16
                          : 63
                      : isNoCreators
                        ? 0
                        : item === "Applications"
                          ? project.apps
                          : item === "Invited creators"
                            ? invitedCreatorCount
                            : contentCountForProject(project.id)}
                  </span>
                )}
              </button>
            ))}
          </div>
          {tab === "Performance" && (
            <div className="mb-0.5 flex items-center gap-2">
              <span className="hidden text-[12px] text-tertiary sm:block">View by platform</span>
              <Dropdown
                compact
                ariaLabel="View by platform"
                className="w-[118px]"
                value={performancePlatform}
                onChange={setPerformancePlatform}
                options={["All platforms", "Instagram", "TikTok", "YouTube"]}
              />
              <button
                type="button"
                onClick={handleDownloadReport}
                aria-label="Download report"
                className="grid size-8 place-items-center rounded-md border border-line bg-white text-secondary transition hover:bg-subtle"
              >
                <Download size={16} />
              </button>
            </div>
          )}
        </nav>
        {tab === "Applications" ? (
          <ProjectApplicationsView
            projectName={project.name}
            applicationCount={project.apps}
            hasApplications={project.apps > 0}
            objective={objective}
            projectType={project.projectType}
            partnership={project.partnership}
            duration={project.duration}
            onOpenShare={() => setShareOpen(true)}
            onOpenInvite={handleOpenInvite}
          />
        ) : tab === "Invited creators" ? (
          invitedCreatorCount > 0 ? (
            <InvitedCreatorsGrid
              projectId={project.id}
              creatorCount={invitedCreatorCount}
              isAgencyClient={isAgencyClient}
              clientId={clientId}
            />
          ) : (
            <InvitedCreatorsEmptyState
              onGoToApplications={() => setTab("Applications")}
              onFindCreators={() => navigate(projectDiscoveryRoute)}
            />
          )
        ) : tab === "Brief" ? (
          <ProjectBriefBoard project={project} />
        ) : tab === "Content" ? (
          contentCountForProject(project.id) > 0 ? (
            <ProjectContentBoard
              project={project}
              onGoToInvitedCreators={() => setTab("Invited creators")}
            />
          ) : (
            <ProjectContentEmpty onGoToInvitedCreators={() => setTab("Invited creators")} />
          )
        ) : tab === "Payments" ? (
          project.id === 5 ? (
            <ProjectPaymentsEmpty
              project={project}
              onGoToApplications={() => setTab("Applications")}
            />
          ) : (
            <ProjectPaymentsBoard project={project} />
          )
        ) : false ? (
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
                    <span>{item}</span>
                    <span className="text-[12px] leading-4 text-secondary">0</span>
                  </button>
                ))}
              </div>
              <div className="hidden flex-1 xl:block" />
              <div className="flex min-w-0 flex-1 flex-wrap justify-end gap-2 xl:flex-none">
                <Dropdown
                  compact
                  ariaLabel="Filter by platform"
                  value={applicationPlatform}
                  onChange={setApplicationPlatform}
                  options={["Platform", "Instagram", "TikTok", "YouTube"]}
                  className="w-[110px] [&>button]:h-9"
                />
                <Dropdown
                  compact
                  ariaLabel="Filter by followers"
                  value={applicationFollowers}
                  onChange={setApplicationFollowers}
                  options={["Followers", "Under 10K", "10K–50K", "50K–100K", "100K+"]}
                  className="w-[112px] [&>button]:h-9"
                />
                <Dropdown
                  compact
                  ariaLabel="Filter by engagement rate"
                  value={applicationEngagement}
                  onChange={setApplicationEngagement}
                  options={["Eng. rate", "2%+", "4%+", "6%+"]}
                  className="w-[112px] [&>button]:h-9"
                />
                <Dropdown
                  compact
                  ariaLabel="Filter by fee"
                  value={applicationFee}
                  onChange={setApplicationFee}
                  options={["Fee", "Under ₹10K", "₹10K–₹25K", "₹25K+"]}
                  className="w-[84px] [&>button]:h-9"
                />
                <Dropdown
                  compact
                  ariaLabel="Filter by city"
                  value={applicationCity}
                  onChange={setApplicationCity}
                  options={["City", "Bengaluru", "Mumbai", "Delhi NCR", "Chennai"]}
                  className="w-[94px] [&>button]:h-9"
                />
              </div>
              <button
                type="button"
                aria-label="Change application sort"
                className="ml-auto flex h-9 items-center gap-1.5 px-2 text-[13px] text-secondary transition hover:text-ink"
                onClick={() =>
                  setApplicationSort((value) => (value === "Match" ? "Recent" : "Match"))
                }
              >
                Sort: {applicationSort} <ChevronDown size={14} strokeWidth={2} />
              </button>
            </div>
            <motion.section
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 flex min-h-[294px] flex-col items-center justify-center rounded-xl border border-line bg-white px-6 py-12 text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.76 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="grid size-14 place-items-center rounded-[28px] bg-subtle text-secondary"
              >
                <Users size={26} strokeWidth={1.7} />
              </motion.div>
              <h2 className="mt-3 text-[14px] font-semibold leading-5 text-ink">
                No applications yet
              </h2>
              <p className="mt-1 max-w-[520px] text-[13px] leading-5 text-secondary">
                {project.name} is live. Creators who match it can apply from the marketplace; you’ll
                see them here with their match score and fee. Share the project link or invite
                creators yourself.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Button
                  kind="secondary"
                  leadingIcon={<Share2 size={16} />}
                  onClick={() => setShareOpen(true)}
                >
                  Copy project link
                </Button>
                <Button
                  leadingIcon={<Search size={16} />}
                  onClick={() => navigate(projectDiscoveryRoute)}
                >
                  Find creators
                </Button>
              </div>
            </motion.section>
          </section>
        ) : tab === "Performance" ? (
          <div className="mt-6 space-y-6">
            <PerformanceReportBlocks project={project} />
          </div>
        ) : tab !== "Overview" ? (
          <section className="mt-6 rounded-xl border border-line bg-white px-10 py-20 text-center">
            <FileText className="mx-auto text-tertiary" size={28} />
            <h2 className="mt-3 text-[16px] font-semibold text-ink">{tab}</h2>
            <p className="mt-1 text-[13px] text-secondary">
              No {tab.toLowerCase()} yet.
            </p>
          </section>
        ) : (
          <>
            <section className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <KpiTile
                icon={Megaphone}
                iconBg="bg-[#0d0d10]"
                label="Project type"
                value={status === "Archived" ? "Influencer" : isNoCreators ? "Influencer" : project.type}
                detail={
                  status === "Archived"
                    ? "Paid · one-time · 7 Oct – 7 Nov"
                    : isNoCreators
                      ? "Paid · one-time · 7 Oct – 7 Nov"
                      : `${project.partnership} · ${project.duration}`
                }
                dataNodeId="1473:597"
              />
              <KpiTile
                icon={Users}
                iconBg={status === "Archived" ? "bg-[#0d0d10]" : "bg-[#8ec5ff]"}
                label="Creators"
                value={status === "Archived" ? "16" : isNoCreators ? "0" : String(project.creatorCount)}
                detail={
                  status === "Archived"
                    ? "16 of 16 delivered · archived 15 Nov"
                    : isNoCreators || !project.creatorCount
                      ? "of 16 places · none invited yet"
                      : `of ${project.creatorCount} places · creator team active`
                }
              />
              <KpiTile
                icon={WalletCards}
                iconBg={status === "Archived" ? "bg-[#0d0d10]" : "bg-[#f59e0b]"}
                label="Budget"
                value={status === "Archived" ? "₹6 L" : isNoCreators ? "₹6 L" : project.budget}
                detail={
                  status === "Archived"
                    ? "₹2 L committed · ₹2 L released"
                    : isNoCreators
                      ? "₹2 L funded at publish · ₹0 released"
                      : project.budgetNote
                }
              />
              <KpiTile
                icon={Video}
                iconBg={status === "Archived" ? "bg-[#0d0d10]" : "bg-[#8ec5ff]"}
                label="Content"
                value={
                  status === "Archived"
                    ? "64"
                    : isNoCreators || project.status === "Draft" || project.status === "Upcoming"
                      ? "0"
                      : String(Math.round(project.deliverableCount / 2))
                }
                detail={
                  status === "Archived"
                    ? "of 64 deliverables · 58 live"
                    : isNoCreators
                      ? "of 64 deliverables · starts 7 Oct"
                      : `of ${project.deliverableCount} deliverables · starts 7 Oct`
                }
              />
            </section>
            {status === "Archived" ? (
              <section className="mt-6 rounded-xl border border-line bg-white p-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-[16px] font-semibold text-ink">Project timeline</h2>
                    <p className="mt-0.5 text-[12px] text-secondary">
                      Showing 20 Sep – 7 Dec · archived 30 Nov · read-only
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f4f6fb] px-2.5 py-0.5 text-[12px] font-medium text-[#4a4a55]">
                    <span className="size-1.5 rounded-full bg-[#4a4a55]" />
                    Read-only
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
                  {/* Step 1: Project created */}
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center">
                      <span className="z-10 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#16a34a] text-white">
                        <Check size={14} strokeWidth={2.5} />
                      </span>
                      <span className="h-0.5 flex-1 bg-[#0d0d10]" />
                    </div>
                    <h3 className="mt-2 text-[14px] font-medium text-ink">Project created</h3>
                    <p className="mt-1 text-[12px] text-[#8491a3]">Brief and deliverables added</p>
                    <p className="mt-2 text-[12px] text-secondary">20 Sep</p>
                  </div>

                  {/* Step 2: Invited Sophie Martin */}
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center">
                      <span className="z-10 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#16a34a] text-white">
                        <Check size={14} strokeWidth={2.5} />
                      </span>
                      <span className="h-0.5 flex-1 bg-[#0d0d10]" />
                    </div>
                    <h3 className="mt-2 text-[14px] font-medium text-ink">Invited Sophie Martin</h3>
                    <p className="mt-1 text-[12px] text-[#8491a3]">and 15 more creators</p>
                    <p className="mt-2 text-[12px] text-secondary">24 Sep</p>
                  </div>

                  {/* Step 3: Launched */}
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center">
                      <span className="z-10 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#16a34a] text-white">
                        <Check size={14} strokeWidth={2.5} />
                      </span>
                      <span className="h-0.5 flex-1 bg-[#0d0d10]" />
                    </div>
                    <h3 className="mt-2 text-[14px] font-medium text-ink">Launched</h3>
                    <p className="mt-1 text-[12px] text-[#8491a3]">₹2,00,000 funded to escrow</p>
                    <p className="mt-2 text-[12px] text-secondary">7 Oct</p>
                  </div>

                  {/* Step 4: All places filled */}
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center">
                      <span className="z-10 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#16a34a] text-white">
                        <Check size={14} strokeWidth={2.5} />
                      </span>
                      <span className="h-0.5 flex-1 bg-[#0d0d10]" />
                    </div>
                    <h3 className="mt-2 text-[14px] font-medium text-ink">All places filled</h3>
                    <p className="mt-1 text-[12px] text-[#8491a3]">16 of 16 accepted</p>
                    <p className="mt-2 text-[12px] text-secondary">10 Oct</p>
                  </div>

                  {/* Step 5: Final deadline */}
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center">
                      <span className="z-10 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#16a34a] text-white">
                        <Check size={14} strokeWidth={2.5} />
                      </span>
                      <span className="h-0.5 flex-1 bg-[#0d0d10]" />
                    </div>
                    <h3 className="mt-2 text-[14px] font-medium text-ink">Final deadline</h3>
                    <p className="mt-1 text-[12px] text-[#8491a3]">63 of 64 delivered</p>
                    <p className="mt-2 text-[12px] text-secondary">3 Nov</p>
                  </div>

                  {/* Step 6: Project ended */}
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center">
                      <span className="z-10 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#16a34a] text-white">
                        <Check size={14} strokeWidth={2.5} />
                      </span>
                      <span className="h-0.5 flex-1 bg-[#0d0d10]" />
                    </div>
                    <h3 className="mt-2 text-[14px] font-medium text-ink">Project ended</h3>
                    <p className="mt-1 text-[12px] text-[#8491a3]">1 disputed post refunded</p>
                    <p className="mt-2 text-[12px] text-secondary">7 Nov</p>
                  </div>

                  {/* Step 7: Archived */}
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center">
                      <span className="z-10 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#16a34a] text-white">
                        <Check size={14} strokeWidth={2.5} />
                      </span>
                      <span className="h-0.5 flex-1 bg-[#0d0d10]" />
                    </div>
                    <h3 className="mt-2 text-[14px] font-medium text-ink">Archived</h3>
                    <p className="mt-1 text-[12px] text-[#8491a3]">by Ananya Mehta · read-only</p>
                    <p className="mt-2 text-[12px] text-secondary">30 Nov</p>
                  </div>

                  {/* Step 8: Usage rights end */}
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center">
                      <span className="z-10 flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-[#0d0d10] bg-white">
                        <span className="size-2 rounded-full bg-[#0d0d10]" />
                      </span>
                    </div>
                    <h3 className="mt-2 text-[14px] font-medium text-ink">Usage rights end</h3>
                    <p className="mt-1 text-[12px] text-[#8491a3]">Extend to keep running the Reels as ads</p>
                    <p className="mt-2 text-[12px] text-secondary">7 Dec</p>
                  </div>
                </div>
              </section>
            ) : isNoCreators ? (
              <section className="mt-6 rounded-xl border border-line bg-white p-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-[16px] font-semibold text-ink">Project timeline</h2>
                    <p className="mt-0.5 text-[12px] text-secondary">
                      Showing 20 Sep – 7 Nov · today 20 Sep · next: invite creators
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f1f4ff] px-2.5 py-0.5 text-[12px] font-medium text-[#3b5bff]">
                    <span className="size-1.5 rounded-full bg-[#3b5bff]" />
                    Not started
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
                  {/* Step 1: Project created */}
                  <div className="min-w-0 pr-3">
                    <div className="flex items-center">
                      <span className="z-10 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#16a34a] text-white">
                        <Check size={14} strokeWidth={2.5} />
                      </span>
                      <span className="h-0.5 flex-1 bg-[#0d0d10]" />
                    </div>
                    <h3 className="mt-2 text-[14px] font-medium text-ink">Project created</h3>
                    <p className="mt-1 text-[12px] text-[#8491a3]">Brief and deliverables added</p>
                    <p className="mt-2 text-[12px] text-secondary">20 Sep</p>
                  </div>

                  {/* Step 2: Published */}
                  <div className="min-w-0 pr-3">
                    <div className="flex items-center">
                      <span className="z-10 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#16a34a] text-white">
                        <Check size={14} strokeWidth={2.5} />
                      </span>
                      <span className="h-0.5 flex-1 bg-[#0d0d10]" />
                    </div>
                    <h3 className="mt-2 text-[14px] font-medium text-ink">Published</h3>
                    <p className="mt-1 text-[12px] text-[#8491a3]">₹2,00,000 funded to escrow</p>
                    <p className="mt-2 text-[12px] text-secondary">20 Sep</p>
                  </div>

                  {/* Step 3: Invite creators */}
                  <div className="min-w-0 pr-3">
                    <div className="flex items-center">
                      <span className="z-10 flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-[#0d0d10] bg-white">
                        <span className="size-2 rounded-full bg-[#0d0d10]" />
                      </span>
                      <span className="h-0.5 flex-1 bg-[#e3e5ec]" />
                    </div>
                    <h3 className="mt-2 text-[14px] font-medium text-ink">Invite creators</h3>
                    <p className="mt-1 text-[12px] text-[#8491a3]">{isNoCreators ? "16 places to fill" : `${project.creatorCount || 16} places to fill`}</p>
                    <p className="mt-2 text-[12px] font-medium text-ink">Now</p>
                  </div>

                  {/* Step 4: Launch */}
                  <div className="min-w-0 pr-3">
                    <div className="flex items-center">
                      <span className="z-10 flex size-6 shrink-0 items-center justify-center rounded-full bg-white">
                        <span className="size-1.5 rounded-full bg-[#a3a3ac]" />
                      </span>
                      <span className="h-0.5 flex-1 bg-[#e3e5ec]" />
                    </div>
                    <h3 className="mt-2 text-[14px] font-medium text-secondary">Launch</h3>
                    <p className="mt-1 text-[12px] text-[#8491a3]">Creators can start delivering</p>
                    <p className="mt-2 text-[12px] text-secondary">7 Oct</p>
                  </div>

                  {/* Step 5: Final deadline */}
                  <div className="min-w-0 pr-3">
                    <div className="flex items-center">
                      <span className="z-10 flex size-6 shrink-0 items-center justify-center rounded-full bg-white">
                        <span className="size-1.5 rounded-full bg-[#a3a3ac]" />
                      </span>
                      <span className="h-0.5 flex-1 bg-[#e3e5ec]" />
                    </div>
                    <h3 className="mt-2 text-[14px] font-medium text-secondary">Final deadline</h3>
                    <p className="mt-1 text-[12px] text-[#8491a3]">Last creator deadline</p>
                    <p className="mt-2 text-[12px] text-secondary">3 Nov</p>
                  </div>

                  {/* Step 6: Project ends */}
                  <div className="min-w-0 pr-3">
                    <div className="flex items-center">
                      <span className="z-10 flex size-6 shrink-0 items-center justify-center rounded-full bg-white">
                        <span className="size-1.5 rounded-full bg-[#a3a3ac]" />
                      </span>
                    </div>
                    <h3 className="mt-2 text-[14px] font-medium text-secondary">Project ends</h3>
                    <p className="mt-1 text-[12px] text-[#8491a3]">Usage rights until 7 Dec</p>
                    <p className="mt-2 text-[12px] text-secondary">7 Nov</p>
                  </div>
                </div>
              </section>
            ) : (
              <section className="mt-6 rounded-xl border border-line bg-white p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-[16px] font-semibold leading-6 text-ink">
                      Project milestones
                    </h2>
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
            )}
            <section className="mt-5 grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
              <div className="space-y-5">
                {/* 1. Project progress */}
                <motion.section
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="rounded-xl border border-line bg-white p-5"
                >
                  <h2 className="text-[16px] font-semibold leading-6 text-ink">Project progress</h2>
                  <p className="text-[12px] leading-4 text-secondary">
                    {status === "Archived"
                      ? "16 creators · project ended"
                      : isNoCreators || !creators.length
                        ? "16 places · no creators invited yet"
                        : `${project.creatorCount} creators in this project`}
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
                        {status === "Archived" ? (
                          <>
                            <circle
                              cx="60"
                              cy="60"
                              r="50"
                              fill="none"
                              pathLength="100"
                              stroke="#149D46"
                              strokeWidth="18"
                              strokeDasharray="94 6"
                              strokeDashoffset="0"
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
                              strokeDasharray="6 94"
                              strokeDashoffset="-94"
                              transform="rotate(-90 60 60)"
                            />
                          </>
                        ) : !isNoCreators && creators.length > 0 ? (
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
                        ) : null}
                      </svg>
                      <div className="relative grid size-[56px] place-items-center rounded-full bg-white text-center">
                        <p className="text-[14px] font-semibold leading-[20px] text-ink">
                          {status === "Archived"
                            ? "15 of 16"
                            : !isNoCreators && creators.length > 0 && creatorProgress
                              ? `${creatorProgress.delivered} of ${project.creatorCount}`
                              : "0 of 16"}
                        </p>
                        <p className="text-[12px] leading-4 text-tertiary">
                          {status === "Archived"
                            ? "completed"
                            : !isNoCreators && creators.length ? deliveryVerb.toLowerCase() : "filled"}
                        </p>
                      </div>
                    </motion.div>
                    <div className="w-full space-y-2.5">
                      {(status === "Archived"
                        ? [
                            ["All delivered", "15", "94%", "bg-[#149d46]"],
                            ["Disputed · 1 post refunded", "1", "6%", "bg-[#f29b07]"],
                          ]
                        : !isNoCreators && creators.length > 0 && creatorProgress
                          ? creatorProgress.stages.map((stage) => [
                              stage.label,
                              String(stage.count),
                              `${Math.round((stage.count / project.creatorCount) * 100)}%`,
                              stage.className,
                            ])
                          : [
                              ["Accepted", "0", "0%", "bg-[#16a34a]"],
                              ["Places open", "16", "100%", "bg-[#0d0d10]"],
                            ]
                      ).map(([label, count, percent, color]) => (
                        <div
                          className="flex items-center gap-2 text-[13px] leading-5 text-ink"
                          key={label}
                        >
                          <span className={`size-2.5 rounded-full ${color}`} />
                          <span className="flex-1">{label}</span>
                          <span className="font-medium text-secondary">{count}</span>
                          <span className="font-medium text-ink">{percent}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.section>

                {/* 2. Content pipeline */}
                <motion.section
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: 0.06, ease: "easeOut" }}
                  className="rounded-xl border border-line bg-white p-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-[16px] font-semibold text-ink">Content pipeline</h2>
                      <p className="mt-0.5 text-[12px] text-secondary">
                        {status === "Archived"
                          ? "63 deliverables live · 1 refunded after a dispute"
                          : "Nothing submitted yet · deliverables start after launch on 7 Oct"}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setTab("Content")}
                      className="text-[12px] font-medium text-[#2563eb] hover:underline cursor-pointer"
                    >
                      View Content
                    </button>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                      ["Awaiting approval", "bg-[#f59e0b]", status === "Archived" ? 0 : 0],
                      ["Changes requested", "bg-[#db231f]", status === "Archived" ? 0 : 0],
                      ["Approved · not live yet", "bg-[#0d0d10]", status === "Archived" ? 0 : 0],
                      ["Live", "bg-[#16a34a]", status === "Archived" ? 63 : 0],
                    ].map(([label, color, count]) => (
                      <div className="rounded-lg border border-line p-3.5" key={label as string}>
                        <p className="flex items-center gap-1.5 text-[12px] text-secondary">
                          <span className={`size-2 rounded-full ${color}`} />
                          {label}
                        </p>
                        <p className="mt-2 text-[16px] font-semibold text-ink">{count}</p>
                      </div>
                    ))}
                  </div>
                </motion.section>

                {/* 3. Creators */}
                <motion.section
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: 0.12, ease: "easeOut" }}
                  className="rounded-xl border border-line bg-white p-5"
                >
                  <h2 className="text-[16px] font-semibold text-ink">Creators</h2>
                  <p className="mt-0.5 text-[12px] text-secondary">
                    {status === "Archived"
                      ? "Final status for each creator"
                      : !isNoCreators && creators.length
                        ? "Who has accepted · launch on 7 Oct"
                        : "No creators yet"}
                  </p>
                  {status === "Archived" ? (
                    <div className="mt-4 overflow-x-auto rounded-lg border border-line">
                      <div className="min-w-[640px]">
                        <div className="grid grid-cols-[minmax(0,1fr)_110px_190px_110px] gap-3 bg-subtle px-3.5 py-2.5 text-[12px] font-semibold tracking-[.06em] text-secondary">
                          <span>CREATOR</span>
                          <span>DELIVERED</span>
                          <span>NEXT STEP</span>
                          <span>STAGE</span>
                        </div>
                        {archivedCreators.map((creator) => (
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
                              className={`text-[13px] font-medium leading-5 ${
                                creator.isDisputed
                                  ? "text-[#db231f]"
                                  : "text-ink hover:underline cursor-pointer"
                              }`}
                            >
                              {creator.nextStep}
                            </p>
                            <div className="space-y-[5px]">
                              <div className="flex h-2 items-center gap-1">
                                {creator.dots.map((active, dotIdx) => (
                                  <span
                                    key={dotIdx}
                                    className={`size-2 rounded-full ${
                                      active ? "bg-[#149d46]" : "bg-[#d1d5db]"
                                    }`}
                                  />
                                ))}
                              </div>
                              <p
                                className={`text-[12px] font-medium ${
                                  creator.isDisputed ? "text-[#db231f]" : "text-[#149d46]"
                                }`}
                              >
                                {creator.stage}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : !isNoCreators && creators.length ? (
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
                      <p className="text-[14px] font-medium text-ink">No creators invited yet</p>
                      <p className="mx-auto mt-2 max-w-[560px] text-[12px] leading-4 text-[#8491a3]">
                        Invite creators you’ve shortlisted, or find new ones in Creator discovery.
                        Accepted creators will appear here.
                      </p>
                      <Button
                        className="mt-4 bg-[#0d0d10] text-white hover:bg-black font-medium"
                        disabled={locked}
                        leadingIcon={<Users size={16} />}
                        onClick={() => handleOpenInvite()}
                      >
                        Invite creators
                      </Button>
                    </div>
                  )}
                </motion.section>

                {/* Additional sections for active projects with creators */}
                {status !== "Archived" && !isNoCreators && creators.length > 0 && (
                  <>
                    <section className="grid gap-5 lg:grid-cols-2">
                      <section className="rounded-xl border border-line bg-white p-5">
                        <h2 className="text-[16px] font-semibold text-ink">Key dates</h2>
                        <div className="mt-4 divide-y divide-line-subtle">
                          {keyDates.map(([label, value]) => (
                            <div
                              className="flex items-center justify-between gap-3 py-2.5 text-[13px]"
                              key={label}
                            >
                              <span className="text-secondary">{label}</span>
                              <span
                                className={
                                  label === "Payments"
                                    ? "rounded-full bg-success-bg px-2 py-0.5 text-[12px] font-medium text-success"
                                    : "font-medium text-ink"
                                }
                              >
                                {value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </section>
                      <section className="rounded-xl border border-line bg-white p-5">
                        <h2 className="text-[16px] font-semibold text-ink">Results so far</h2>
                        <p className="mt-0.5 text-[12px] text-secondary">
                          {objective} performance to date
                        </p>
                        <div className="mt-4 grid grid-cols-2 gap-3">
                          {resultMetrics.slice(0, 4).map((metric, index) => (
                            <div className="rounded-lg bg-subtle px-3 py-2.5" key={metric}>
                              <p className="text-[12px] text-secondary">{metric}</p>
                              <p className="mt-1 text-[16px] font-semibold text-ink">
                                {resultValues[objective][index]}
                              </p>
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
                            ? [
                                ["Shipped", "₹24,000"],
                                ["Ships next", "₹16,000"],
                                ["Still to ship", "₹12,000"],
                              ]
                            : [
                                ["Paid to creators", "₹1,02,000"],
                                ["Held in escrow", "₹58,000"],
                                ["Not committed", "₹40,000"],
                              ]
                          ).map(([label, value]) => (
                            <div className="flex items-center justify-between" key={label}>
                              <span className="text-secondary">{label}</span>
                              <span className="font-medium text-ink">{value}</span>
                            </div>
                          ))}
                          {longTerm && (
                            <p className="border-t border-line pt-3 text-[12px] text-secondary">
                              {project.budget} · current cycle of 6
                            </p>
                          )}
                        </div>
                      </section>
                      <section className="rounded-xl border border-line bg-white p-5">
                        <h2 className="text-[16px] font-semibold text-ink">Project details</h2>
                        <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3 text-[13px]">
                          {[
                            ["Objective", objective],
                            ["Type", project.projectType],
                            ["Partnership", project.partnership],
                            ["Duration", longTerm ? "Long-term" : "One-time"],
                            ["Platforms", project.platform],
                            [
                              "Tracking",
                              objective === "Sales"
                                ? "Shopify connected"
                                : objective === "Traffic"
                                  ? "UTM + GA4"
                                  : objective === "Leads"
                                    ? "Quiz form + UTM"
                                    : "Connected accounts",
                            ],
                          ].map(([label, value]) => (
                            <div key={label}>
                              <p className="text-[12px] text-tertiary">{label}</p>
                              <p className="mt-0.5 truncate font-medium text-ink">{value}</p>
                            </div>
                          ))}
                        </div>
                      </section>
                    </section>
                  </>
                )}
              </div>

              {/* Right column: Next actions */}
              <aside className="rounded-xl border border-line bg-white p-5 xl:sticky xl:top-6 xl:self-start">
                <h2 className="text-[16px] font-semibold text-ink">Next actions</h2>
                <p className="mt-0.5 text-[12px] text-[#8491a3]">
                  {status === "Archived"
                    ? "Archived · read-only"
                    : isNoCreators
                      ? "3 things to do before launch on 7 Oct"
                      : "Recommended actions for this project"}
                </p>
                <div className="mt-4 divide-y divide-line">
                  {status === "Archived" ? (
                    <>
                      {/* Action 1 */}
                      <div className="flex items-center justify-between gap-3 pt-3 first:pt-0">
                        <div className="min-w-0 flex-1">
                          <button
                            type="button"
                            onClick={() => {
                              setStatus("Live");
                              project.detailStatus = "Live";
                              project.status = "Live";
                            }}
                            className="text-left text-[14px] font-medium text-ink hover:text-primary transition-colors cursor-pointer block"
                          >
                            Restore project
                          </button>
                          <p className="mt-0.5 text-[12px] text-[#8491a3] leading-4">
                            Restore to edit, invite creators or duplicate
                          </p>
                        </div>
                        <span className="shrink-0 rounded-[6px] bg-[rgba(219,35,31,0.12)] px-2 py-0.5 text-[12px] font-medium text-[#db231f]">
                          Read-only
                        </span>
                      </div>

                      {/* Action 2 */}
                      <div className="flex items-center justify-between gap-3 pt-3">
                        <div className="min-w-0 flex-1">
                          <button
                            type="button"
                            onClick={() => window.print()}
                            className="text-left text-[14px] font-medium text-ink hover:text-primary transition-colors cursor-pointer block"
                          >
                            Download the final report
                          </button>
                          <p className="mt-0.5 text-[12px] text-[#8491a3] leading-4">
                            Results, content and invoices stay here
                          </p>
                        </div>
                        <span className="shrink-0 rounded-[6px] bg-[rgba(219,35,31,0.12)] px-2 py-0.5 text-[12px] font-medium text-[#db231f]">
                          Ready
                        </span>
                      </div>

                      {/* Action 3 */}
                      <div className="flex items-center justify-between gap-3 pt-3">
                        <div className="min-w-0 flex-1">
                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                isAgencyClient
                                  ? agencyClientNewProjectRoute(clientId)
                                  : ROUTES.brandNewProject,
                              )
                            }
                            className="text-left text-[14px] font-medium text-ink hover:text-primary transition-colors cursor-pointer block"
                          >
                            Duplicate project
                          </button>
                          <p className="mt-0.5 text-[12px] text-[#8491a3] leading-4">
                            Start a new project with the same setup
                          </p>
                        </div>
                        <span className="shrink-0 rounded-[6px] bg-[rgba(242,155,7,0.12)] px-2 py-0.5 text-[12px] font-medium text-[#f29b07]">
                          Suggested
                        </span>
                      </div>
                    </>
                  ) : isNoCreators ? (
                    <>
                      {/* Action 1 */}
                      <div className="flex items-center justify-between gap-3 pt-3 first:pt-0">
                        <div className="min-w-0 flex-1">
                          <button
                            type="button"
                            onClick={() => handleOpenInvite()}
                            className="text-left text-[14px] font-medium text-ink hover:text-primary transition-colors cursor-pointer block"
                          >
                            Invite creators
                          </button>
                          <p className="mt-0.5 text-[12px] text-[#8491a3] leading-4">
                            16 places to fill · invites need a few days to be accepted
                          </p>
                        </div>
                        <span className="shrink-0 rounded-[6px] bg-[rgba(219,35,31,0.12)] px-2 py-0.5 text-[12px] font-medium text-[#db231f]">
                          Now
                        </span>
                      </div>

                      {/* Action 2 */}
                      <div className="flex items-center justify-between gap-3 pt-3">
                        <div className="min-w-0 flex-1">
                          <h3 className="text-[14px] font-medium text-ink">Connect Shopify</h3>
                          <p className="mt-0.5 text-[12px] text-[#8491a3] leading-4">
                            Needed for codes and tracking links
                          </p>
                        </div>
                        <span className="shrink-0 rounded-[6px] bg-[rgba(219,35,31,0.12)] px-2 py-0.5 text-[12px] font-medium text-[#db231f]">
                          Before 7 Oct
                        </span>
                      </div>

                      {/* Action 3 */}
                      <div className="flex items-center justify-between gap-3 pt-3">
                        <div className="min-w-0 flex-1">
                          <button
                            type="button"
                            onClick={() => navigate(projectDiscoveryRoute)}
                            className="text-left text-[14px] font-medium text-ink hover:text-primary transition-colors cursor-pointer block"
                          >
                            Browse Creator discovery
                          </button>
                          <p className="mt-0.5 text-[12px] text-[#8491a3] leading-4">
                            Shortlist creators who match your requirements
                          </p>
                        </div>
                        <span className="shrink-0 rounded-[6px] bg-[rgba(242,155,7,0.12)] px-2 py-0.5 text-[12px] font-medium text-[#f29b07]">
                          Suggested
                        </span>
                      </div>
                    </>
                  ) : (
                    [
                      [
                        quickAction,
                        "16 places to fill · invites need a few days to be accepted",
                        "Now",
                        "text-[#db231f] bg-[#fde4e3]",
                      ],
                      [
                        objective === "Sales"
                          ? "Connect Shopify"
                          : objective === "Traffic"
                            ? "Confirm UTM tracking"
                            : "Check creator progress",
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
                      <div className="flex gap-3 pt-3 first:pt-0" key={title}>
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
                    ))
                  )}
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
      <AgencyInviteCreatorToProjectModal
        isOpen={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        creatorName={selectedCreatorName}
        currentProjectId={project.id}
        clientId={clientId}
        onContinueToInvite={handleContinueInvite}
      />
    </AgencyClientShell>
  );
}
