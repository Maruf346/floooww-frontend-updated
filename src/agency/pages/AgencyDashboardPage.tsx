import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  FileText,
  FolderKanban,
  MoreVertical,
  Package,
  Plus,
  Receipt,
  Scale,
  Sparkles,
  Users,
  Video,
} from "lucide-react";
import { AgencyShell } from "@/agency/components/AgencyShell";
import { AgencyAddClientModal } from "@/agency/components/AgencyAddClientModal";
import { DateRangePicker } from "@/common/components/ui/DateRangePicker";
import { ROUTES } from "@/common/constants/routes";

// KPI Tiles
const kpiTiles = [
  {
    label: "Total clients",
    value: "6",
    subtext: "5 active · 1 onboarding",
    icon: "/assets/agency/icons/total_clients.svg",
    iconBg: "bg-[#0d0d10]",
  },
  {
    label: "Projects",
    value: "11",
    subtext: "9 live · 2 upcoming",
    icon: "/assets/agency/icons/projects.svg",
    iconBg: "bg-[#3b5bff]",
  },
  {
    label: "Creators",
    value: "41",
    subtext: "in live projects · across clients",
    icon: "/assets/agency/icons/creators.svg",
    iconBg: "bg-[#8ec5ff]",
  },
  {
    label: "Content",
    value: "63",
    subtext: "14 awaiting review · 49 live",
    icon: "/assets/agency/icons/content.svg",
    iconBg: "bg-[#3b5bff]",
  },
];

// Action Required items
const actionItems = [
  {
    id: "act-1",
    icon: AlertTriangle,
    title: "Reconnect Shopify · Minimalist",
    desc: "Minimalist’s store disconnected 26 Oct · Vitamin-C Serum and Glow Squad sales aren't tracked",
    badge: "Now",
    badgeTone: "danger",
    client: "minimalist",
  },
  {
    id: "act-2",
    icon: FileText,
    title: "Approve 4 Reels · Minimalist",
    desc: "Vitamin-C Serum · waiting up to 52 h · releases ₹30,000 from Minimalist’s escrow",
    badge: "Overdue",
    badgeTone: "danger",
    client: "minimalist",
  },
  {
    id: "act-3",
    icon: Scale,
    title: "Reply to a dispute · Minimalist",
    desc: "Monsoon Sunscreen · Rohan Desai · ₹7,500 on hold · decision by 6 Nov",
    badge: "In 1 d",
    badgeTone: "warning",
    client: "minimalist",
  },
  {
    id: "act-4",
    icon: Package,
    title: "Ship 3 gift products · Dewdrop Naturals",
    desc: "Hydration Bundle · Ishita Rao and 2 others · Dewdrop ships by 3 Nov",
    badge: "Due today",
    badgeTone: "warning",
    client: "dewdrop",
  },
  {
    id: "act-5",
    icon: Receipt,
    title: "Chase overdue invoice · Velvet Lip Co.",
    desc: "₹25,000 Oct service fee · 1 day overdue · reminder not sent yet",
    badge: "Overdue",
    badgeTone: "danger",
    client: "velvet-lip",
  },
];

// Upcoming deadlines
const upcomingDeadlines = [
  {
    day: "1",
    month: "Nov",
    title: "Glow Squad month 4 · Minimalist",
    desc: "₹79,425 charged from Minimalist’s UPI AutoPay",
  },
  {
    day: "2",
    month: "Nov",
    title: "Monsoon Sunscreen ends · Minimalist",
    desc: "12 creators · last deliverables due",
  },
  {
    day: "3",
    month: "Nov",
    title: "Hydration kits ship · Dewdrop Naturals",
    desc: "3 creators · Delhivery pickup booked",
  },
  {
    day: "4",
    month: "Nov",
    title: "Skin Quiz Leads starts · Petal & Pine",
    desc: "3 creators · UGC · first project for this client",
  },
  {
    day: "4",
    month: "Nov",
    title: "Oct service fee due · Velvet Lip Co.",
    desc: "₹25,000 invoice · overdue from today",
  },
];

// Top client campaign performance
const clientPerformanceData = [
  {
    id: "minimalist",
    name: "Minimalist",
    owner: "Rahul Verma · Beauty & skincare",
    logo: "/assets/agency/brands/minimalist.png",
    liveProjects: 3,
    creators: 24,
    spend: "₹2,45,000",
    escrow: "₹2,00,000 in escrow",
    netSales: "₹4,12,600",
    roas: "4.1×",
    content: "21 live · 4 waiting",
    health: "Attention",
    healthTone: "warning",
  },
  {
    id: "velvet-lip",
    name: "Velvet Lip Co.",
    owner: "Priya Sharma · Make-up",
    logo: "/assets/agency/brands/velvet_lip.png",
    liveProjects: 2,
    creators: 6,
    spend: "₹60,000",
    escrow: "₹65,000 in escrow",
    netSales: "₹1,38,400",
    roas: "2.3×",
    content: "8 live · 1 waiting",
    health: "On track",
    healthTone: "success",
  },
  {
    id: "dewdrop",
    name: "Dewdrop Naturals",
    owner: "Rahul Verma · Skincare",
    logo: "/assets/agency/brands/dewdrop.png",
    liveProjects: 1,
    creators: 3,
    spend: "₹18,000",
    escrow: "₹18,000 in escrow",
    netSales: "₹41,200",
    roas: "2.3× · gift + fee",
    content: "2 live · 3 kits to ship",
    health: "Attention",
    healthTone: "warning",
  },
  {
    id: "strand-studio",
    name: "Strand Studio",
    owner: "Karan Mehta · Haircare",
    logo: "/assets/agency/brands/strand_studio.png",
    liveProjects: 1,
    creators: 3,
    spend: "₹27,000",
    escrow: "₹27,000 in escrow",
    netSales: "-",
    roas: "UGC · brand posts",
    content: "3 files due 14 Nov",
    health: "On track",
    healthTone: "success",
  },
  {
    id: "petal-pine",
    name: "Petal & Pine",
    owner: "Priya Sharma · Wellness",
    logo: "/assets/agency/brands/petal_pine.png",
    liveProjects: 0,
    creators: "-",
    spend: "-",
    escrow: "not funded yet",
    netSales: "-",
    roas: "-",
    content: "first invites 10 Nov",
    health: "Onboarding",
    healthTone: "info",
  },
];

// Team members
const teamMembers = [
  {
    id: "rahul",
    name: "Rahul Verma",
    role: "Account manager",
    avatar: "/assets/agency/avatars/rahul_avatar.png",
    badge: "● 4 live projects",
    badgeTone: "info",
    clients: "Minimalist · Dewdrop Naturals",
    openTasks: "7 open · 4 approvals · 3 shipments",
  },
  {
    id: "priya",
    name: "Priya Sharma",
    role: "Account manager",
    avatar: "/assets/agency/avatars/priya_avatar.png",
    badge: "● 2 live · 1 upcoming",
    badgeTone: "info",
    clients: "Velvet Lip Co. · Petal & Pine",
    openTasks: "3 open · 1 approval · 4 offers",
  },
  {
    id: "karan",
    name: "Karan Mehta",
    role: "Campaign executive",
    avatar: "/assets/agency/avatars/karan_avatar.png",
    badge: "● 1 live project",
    badgeTone: "info",
    clients: "Strand Studio",
    openTasks: "1 open · files due 14 Nov",
  },
  {
    id: "neha",
    name: "Neha Kapoor",
    role: "Finance & billing",
    avatar: "/assets/agency/avatars/neha_avatar.png",
    badge: "● All clients",
    badgeTone: "warning",
    clients: "Invoices · payouts · GST",
    openTasks: "2 open · 2 overdue invoices",
  },
  {
    id: "aarav",
    name: "Aarav Singh",
    role: "Creator relations",
    initials: "AS",
    badge: "● 41 creators",
    badgeTone: "info",
    clients: "All clients",
    openTasks: "5 open · 2 contracts, 3 onboardings",
  },
  {
    id: "sana",
    name: "Sana Qureshi",
    role: "Content lead",
    initials: "SQ",
    badge: "● 14 to review",
    badgeTone: "warning",
    clients: "Minimalist · Velvet Lip Co.",
    openTasks: "4 open · 14 pieces awaiting review",
  },
];

// Content awaiting review
const reviewContent = [
  {
    id: "rev-1",
    creator: "Meera Iyer",
    creatorAvatar: "/assets/agency/content/meera_avatar.png",
    project: "Minimalist · Vitamin-C Serum",
    status: "Awaiting approval · 2 days",
    statusTone: "normal",
    thumbnail: "/assets/agency/content/meera_post.png",
  },
  {
    id: "rev-2",
    creator: "Nisha Verma",
    creatorAvatar: "/assets/agency/content/nisha_avatar.png",
    project: "Minimalist · Monsoon Sunscreen",
    status: "Awaiting approval · 1 day",
    statusTone: "normal",
    thumbnail: "/assets/agency/content/nisha_post.png",
  },
  {
    id: "rev-3",
    creator: "Tanvi Shah",
    creatorAvatar: "/assets/agency/content/tanvi_avatar.png",
    project: "Velvet Lip Co. · Lip Tint Drop",
    status: "Revision requested",
    statusTone: "warning",
    thumbnail: "/assets/agency/content/tanvi_post.png",
  },
  {
    id: "rev-4",
    creator: "Riya Sen",
    creatorAvatar: "/assets/agency/content/riya_avatar.png",
    project: "Minimalist · Glow Squad",
    status: "Awaiting approval · 3 days",
    statusTone: "normal",
    thumbnail: "/assets/agency/content/riya_post.png",
  },
];

export function AgencyDashboardPage() {
  const navigate = useNavigate();
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const openClientMode = (clientId: string) => {
    showToast(`Switching to ${clientId} workspace in Client Mode...`);
    navigate(`/agency/client/${clientId}`);
  };

  return (
    <AgencyShell>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 pb-10"
      >
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-bold text-[#0d0d10] tracking-tight leading-9">
              Welcome, Rahul
            </h1>
            <p className="text-[13px] text-[#71717a] mt-1">
              Across all clients · Brightside Agency · 1–28 Oct 2026 compared with 3–30 Sep
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <DateRangePicker value="1 Oct – 28 Oct 2026" showCompare={true} />
            <button
              type="button"
              onClick={() => navigate(ROUTES.agencyClientNew)}
              className="h-10 px-4 rounded-lg bg-[#0d0d10] text-[13px] font-medium text-white hover:bg-black transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs select-none"
            >
              <Plus size={16} />
              <span>Add client</span>
            </button>
          </div>
        </div>

        {/* 1. Results KPI Tiles */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          data-name="Results"
          className="bg-white border border-[#e3e5ec] rounded-[12px] p-5 shadow-2xs"
        >
          <div
            data-name="Tiles"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full"
          >
            {kpiTiles.map((tile, idx) => (
              <motion.div
                key={tile.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 + idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                data-name="KPI tile"
                className="bg-white border border-[#edeff3] rounded-[12px] p-4 flex flex-col items-start min-w-0 hover:border-[#0d0d10] transition-colors"
              >
                <div
                  className={`size-[36px] rounded-[8px] ${tile.iconBg} flex items-center justify-center shrink-0`}
                >
                  <img src={tile.icon} alt="" className="size-[18px]" />
                </div>
                <p className="text-[12px] font-normal leading-4 text-[#0d0d10] mt-3.5">
                  {tile.label}
                </p>
                <p className="text-[22px] font-semibold leading-7 tracking-[-0.33px] text-[#0d0d10] mt-0.5">
                  {tile.value}
                </p>
                <p className="text-[12px] font-medium leading-4 text-[#a3a3ac] mt-2.5 truncate w-full">
                  {tile.subtext}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 2. Action Required + Upcoming deadlines */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Action Required (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-[#e3e5ec] rounded-[12px] p-5 shadow-2xs flex flex-col">
            <div className="mb-4">
              <h2 className="text-[16px] font-semibold text-[#0d0d10] leading-6">
                Action Required
              </h2>
              <p className="text-[12px] text-[#71717a]">
                8 things need you · across 5 clients · sorted by urgency
              </p>
            </div>

            <div className="divide-y divide-[#edeff3]">
              {actionItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => openClientMode(item.client)}
                    className="py-3 flex items-center justify-between gap-3 hover:bg-[#f8f9fb] px-2 rounded-lg -mx-2 transition cursor-pointer select-none"
                  >
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <div className="size-8 rounded-lg bg-[#f4f6fb] border border-[#e3e5ec] flex items-center justify-center text-[#71717a] shrink-0 mt-0.5">
                        <Icon size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[13px] font-medium text-[#0d0d10] leading-snug truncate">
                          {item.title}
                        </h3>
                        <p className="text-[12px] text-[#71717a] leading-relaxed truncate">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {item.badgeTone === "danger" && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-[#fef2f2] text-[#dc2626]">
                          {item.badge}
                        </span>
                      )}
                      {item.badgeTone === "warning" && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-[#fffbeb] text-[#d97706]">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming deadlines (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-[#e3e5ec] rounded-[12px] p-5 shadow-2xs flex flex-col">
            <div className="mb-4">
              <h2 className="text-[16px] font-semibold text-[#0d0d10] leading-6">
                Upcoming deadlines
              </h2>
              <p className="text-[12px] text-[#71717a]">
                Next 14 days · 8 dates across 4 clients
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="size-11 rounded-lg bg-[#f4f6fb] border border-[#e3e5ec] flex flex-col items-center justify-center shrink-0">
                    <span className="text-[15px] font-bold text-[#0d0d10] leading-none">
                      {deadline.day}
                    </span>
                    <span className="text-[11px] font-medium text-[#71717a] leading-none mt-0.5">
                      {deadline.month}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-[13px] font-medium text-[#0d0d10] leading-snug truncate">
                      {deadline.title}
                    </h4>
                    <p className="text-[12px] text-[#71717a] leading-tight truncate mt-0.5">
                      {deadline.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Top client campaign performance */}
        <div className="bg-white border border-[#e3e5ec] rounded-[12px] p-5 shadow-2xs flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-[16px] font-semibold text-[#0d0d10] leading-6">
                Top client campaign performance
              </h2>
              <p className="text-[12px] text-[#71717a]">
                6 clients · this month · sorted by net sales · spend is creator fees committed
              </p>
            </div>
            <button
              type="button"
              onClick={() => showToast("Showing all agency clients")}
              className="text-[#3b5bff] text-[13px] font-medium hover:underline inline-flex items-center gap-1 cursor-pointer select-none"
            >
              <span>View all clients</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="overflow-x-auto border border-[#e3e5ec] rounded-xl">
            <table className="w-full text-left text-[13px] border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-[#f8f9fb] border-b border-[#e3e5ec] text-[12px] font-semibold text-[#0d0d10] tracking-wider uppercase">
                  <th className="py-3 px-4">CLIENT · OWNER</th>
                  <th className="py-3 px-3">LIVE</th>
                  <th className="py-3 px-3">CREATORS</th>
                  <th className="py-3 px-4">SPEND · ESCROW</th>
                  <th className="py-3 px-4">NET SALES</th>
                  <th className="py-3 px-4">ROAS · CONTENT</th>
                  <th className="py-3 px-4">HEALTH</th>
                  <th className="py-3 px-4 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edeff3]">
                {clientPerformanceData.map((client) => (
                  <tr
                    key={client.id}
                    className="hover:bg-[#fafafa] transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={client.logo}
                          alt={client.name}
                          className="size-11 rounded-lg border border-[#e3e5ec] object-cover shrink-0 bg-white"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-[#0d0d10] leading-snug">
                            {client.name}
                          </p>
                          <p className="text-[12px] text-[#71717a] leading-tight mt-0.5 truncate max-w-[200px]">
                            {client.owner}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-medium text-[#0d0d10]">
                      {client.liveProjects}
                    </td>
                    <td className="py-3 px-3 font-medium text-[#0d0d10]">
                      {client.creators}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-[#0d0d10] leading-snug">
                        {client.spend}
                      </p>
                      <p className="text-[12px] text-[#71717a] leading-tight mt-0.5">
                        {client.escrow}
                      </p>
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#0d0d10]">
                      {client.netSales}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-[#0d0d10] leading-snug">
                        {client.roas}
                      </p>
                      <p className="text-[12px] text-[#71717a] leading-tight mt-0.5">
                        {client.content}
                      </p>
                    </td>
                    <td className="py-3 px-4">
                      {client.healthTone === "warning" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-[#feefce] text-[#d97706]">
                          <span className="size-1.5 rounded-full bg-[#d97706]" />
                          <span>{client.health}</span>
                        </span>
                      )}
                      {client.healthTone === "success" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-[#e1fce3] text-[#16a34a]">
                          <span className="size-1.5 rounded-full bg-[#16a34a]" />
                          <span>{client.health}</span>
                        </span>
                      )}
                      {client.healthTone === "info" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-[#f1f4ff] text-[#3b5bff]">
                          <span className="size-1.5 rounded-full bg-[#3b5bff]" />
                          <span>{client.health}</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openClientMode(client.id)}
                          className="h-8 px-3 rounded-lg border border-[#e3e5ec] text-[13px] font-medium text-[#0d0d10] hover:bg-[#f8f9fb] transition cursor-pointer select-none"
                        >
                          Open
                        </button>
                        <button
                          type="button"
                          onClick={() => showToast(`Options for ${client.name}`)}
                          className="size-8 rounded-lg flex items-center justify-center text-[#71717a] hover:bg-[#f4f6fb] transition cursor-pointer"
                        >
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Team + Budget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Team (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-[#e3e5ec] rounded-[12px] p-5 shadow-2xs flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-[16px] font-semibold text-[#0d0d10] leading-6">
                  Team
                </h2>
                <p className="text-[12px] text-[#71717a]">
                  6 team members · who owns which clients and projects · open tasks this week
                </p>
              </div>
              <button
                type="button"
                onClick={() => showToast("Opening team management")}
                className="text-[#3b5bff] text-[13px] font-medium hover:underline inline-flex items-center gap-1 cursor-pointer select-none"
              >
                <span>Manage team</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="p-3.5 rounded-xl border border-[#e3e5ec] bg-white hover:border-[#0d0d10] transition-colors flex flex-col gap-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      {member.avatar ? (
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="size-10 rounded-lg object-cover border border-[#e3e5ec]"
                        />
                      ) : (
                        <div className="size-10 rounded-lg bg-[#f4f6fb] border border-[#e3e5ec] flex items-center justify-center text-[13px] font-semibold text-[#0d0d10]">
                          {member.initials}
                        </div>
                      )}
                      <div>
                        <h4 className="text-[14px] font-semibold text-[#0d0d10] leading-tight">
                          {member.name}
                        </h4>
                        <p className="text-[12px] text-[#71717a] leading-tight mt-0.5">
                          {member.role}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium whitespace-nowrap ${
                        member.badgeTone === "warning"
                          ? "bg-[#feefce] text-[#d97706]"
                          : "bg-[#f1f4ff] text-[#3b5bff]"
                      }`}
                    >
                      {member.badge}
                    </span>
                  </div>

                  <div className="text-[12px] flex flex-col gap-1 border-t border-[#f4f6fb] pt-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-[#a3a3ac] shrink-0 w-16">Clients:</span>
                      <span className="text-[#0d0d10] truncate font-medium">
                        {member.clients}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-[#a3a3ac] shrink-0 w-16">Open tasks:</span>
                      <span className="text-[#0d0d10] truncate font-medium">
                        {member.openTasks}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Budget (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-[#e3e5ec] rounded-[12px] p-5 shadow-2xs flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-[16px] font-semibold text-[#0d0d10] leading-6">
                  Budget
                </h2>
                <p className="text-[12px] text-[#71717a]">
                  Service fees, client invoices and payouts
                </p>
              </div>
              <button
                type="button"
                onClick={() => showToast("Opening billing overview")}
                className="text-[#3b5bff] text-[13px] font-medium hover:underline inline-flex items-center gap-1 cursor-pointer select-none"
              >
                <span>Billing</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <div>
              <p className="text-[12px] font-medium text-[#71717a]">
                Agency revenue this month
              </p>
              <p className="text-[30px] font-bold text-[#0d0d10] tracking-tight leading-none mt-1">
                ₹1,12,400
              </p>
            </div>

            {/* Segmented bar */}
            <div className="h-2 rounded-full overflow-hidden flex gap-1 mt-4">
              <div className="w-[30%] bg-[#0d0d10] rounded-full" />
              <div className="w-[25%] bg-[#014ef6] rounded-full" />
              <div className="w-[15%] bg-[#f59e0b] rounded-full" />
              <div className="w-[30%] bg-[#cbd5e1] rounded-full" />
            </div>

            {/* Breakdown */}
            <div className="flex flex-col gap-2 mt-4 text-[13px]">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[#4a4a55]">
                  <span className="size-2 rounded-full bg-[#0d0d10]" />
                  <span>Service fees billed</span>
                </span>
                <span className="font-semibold text-[#0d0d10]">₹1,38,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[#4a4a55]">
                  <span className="size-2 rounded-full bg-[#014ef6]" />
                  <span>Collected from clients</span>
                </span>
                <span className="font-semibold text-[#0d0d10]">₹98,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[#4a4a55]">
                  <span className="size-2 rounded-full bg-[#f59e0b]" />
                  <span>Overdue from clients</span>
                </span>
                <span className="font-semibold text-[#0d0d10]">₹40,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[#4a4a55]">
                  <span className="size-2 rounded-full bg-[#cbd5e1]" />
                  <span>Payouts to creators this week</span>
                </span>
                <span className="font-semibold text-[#0d0d10]">₹2,61,900</span>
              </div>
            </div>

            {/* Due Invoices Box */}
            <div className="mt-4 p-3.5 rounded-lg bg-[#f8f9fb] border border-[#e3e5ec] text-[12px] flex flex-col gap-2">
              <div className="flex items-center justify-between font-semibold text-[#0d0d10]">
                <span>Invoices due in the next 14 days</span>
                <span>₹2,40,000</span>
              </div>
              <div className="flex items-center justify-between text-[#71717a]">
                <span>1 Nov · Minimalist · Oct service fee</span>
                <span className="font-medium text-[#0d0d10]">₹1,20,000</span>
              </div>
              <div className="flex items-center justify-between text-[#71717a]">
                <span>4 Nov · Velvet Lip Co. · Oct service fee (overdue)</span>
                <span className="font-medium text-[#dc2626]">₹25,000</span>
              </div>

              <div className="border-t border-[#e3e5ec] my-1" />

              <div className="flex items-center justify-between font-semibold text-[#0d0d10]">
                <span>Payouts going out · next 14 days</span>
                <span>₹2,61,900</span>
              </div>
              <div className="flex items-center justify-between text-[#71717a]">
                <span>2 Nov · Glow Squad cycle 2 · 6 creators</span>
                <span className="font-medium text-[#0d0d10]">₹1,62,000</span>
              </div>
              <div className="flex items-center justify-between text-[#71717a]">
                <span>5 Nov · Vitamin-C Serum · approvals</span>
                <span className="font-medium text-[#0d0d10]">₹99,900</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Content awaiting review */}
        <div className="bg-white border border-[#e3e5ec] rounded-[12px] p-5 shadow-2xs flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-[16px] font-semibold text-[#0d0d10] leading-6">
                Content awaiting review
              </h2>
              <p className="text-[12px] text-[#71717a]">
                4 of 9 items shown · 3 clients · oldest waiting 3 days
              </p>
            </div>
            <button
              type="button"
              onClick={() => showToast("Opening all pending content reviews")}
              className="text-[#3b5bff] text-[13px] font-medium hover:underline inline-flex items-center gap-1 cursor-pointer select-none"
            >
              <span>Review all content</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {reviewContent.map((item) => (
              <div
                key={item.id}
                onClick={() => showToast(`Opening review modal for ${item.creator}`)}
                className="flex flex-col gap-2 group cursor-pointer"
              >
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden border border-[#e3e5ec] bg-[#f4f6fb]">
                  <img
                    src={item.thumbnail}
                    alt={item.creator}
                    className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-[12px] font-medium text-white">
                      Click to review
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-1">
                  <img
                    src={item.creatorAvatar}
                    alt={item.creator}
                    className="size-5 rounded-full object-cover"
                  />
                  <span className="text-[12px] font-medium text-[#0d0d10] truncate">
                    {item.creator}
                  </span>
                </div>

                <p className="text-[12px] text-[#a3a3ac] leading-tight truncate">
                  {item.project}
                </p>

                <p
                  className={`text-[13px] font-medium leading-snug truncate ${
                    item.statusTone === "warning"
                      ? "text-[#d97706]"
                      : "text-[#0d0d10]"
                  }`}
                >
                  {item.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Add Client Modal */}
      <AgencyAddClientModal
        isOpen={isAddClientOpen}
        onClose={() => setIsAddClientOpen(false)}
        onSuccess={(clientName) => {
          showToast(`Client "${clientName}" created successfully!`);
        }}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0d0d10] text-white text-[13px] font-medium px-4 py-2.5 rounded-lg shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-150">
          {toastMessage}
        </div>
      )}
    </AgencyShell>
  );
}
