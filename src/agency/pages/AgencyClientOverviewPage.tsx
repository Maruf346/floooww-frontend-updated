import { useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import {
  Plus,
  Check,
  Megaphone,
  MessageSquare,
  X,
  Sparkles,
  ShoppingBag,
  Store,
  Play,
  FileText,
  ArrowRight,
  TrendingUp,
  Clock,
  CircleDollarSign,
  Users,
  Calendar,
  Gift,
  AlertTriangle,
  FileCheck2,
  Scale,
  ChevronRight,
  ChevronDown,
  Eye,
} from "lucide-react";
import { AgencyClientShell } from "../components/AgencyClientShell";
import { AGENCY_CLIENTS } from "../components/AgencyWorkspaceSwitcher";
import { DateRangePicker } from "@/common/components/ui/DateRangePicker";
import { ROUTES, agencyClientNewProjectRoute } from "@/common/constants/routes";
import { asset } from "@/common/utils/asset";

const ACTIONS = [
  {
    icon: AlertTriangle,
    title: "Reconnect Shopify",
    body: "Sales for Vitamin-C Serum and Glow Squad aren’t being tracked since 26 Oct",
    due: "Now",
    badgeClass: "bg-[#fde4e3] text-[#dc2626]",
  },
  {
    icon: FileCheck2,
    title: "Approve 4 Reels",
    body: "Vitamin-C Serum · waiting up to 52 h · releases ₹30,000",
    due: "Overdue",
    badgeClass: "bg-[#fde4e3] text-[#dc2626]",
  },
  {
    icon: Scale,
    title: "Reply to a dispute",
    body: "Monsoon Sunscreen · Rohan Desai · ₹7,500 on hold",
    due: "In 1 d",
    badgeClass: "bg-[#fef3c7] text-[#d97706]",
  },
  {
    icon: Gift,
    title: "Ship 3 gift products",
    body: "Hydration Bundle · Ishita Rao and 2 others · dispatch by 3 Nov",
    due: "Due today",
    badgeClass: "bg-[#fef3c7] text-[#d97706]",
  },
];

const DEADLINES = [
  { day: "1", month: "Nov", title: "Glow Squad month 4", body: "₹79,425 held from UPI AutoPay" },
  { day: "2", month: "Nov", title: "Monsoon Sunscreen ends", body: "Projected 49 L reach (98%)" },
  { day: "4", month: "Nov", title: "Skin Quiz Leads starts", body: "3 creators · UGC" },
];

const PROJECTS = [
  {
    name: "Vitamin-C Serum",
    meta: "Influencer · Paid · One-time",
    status: "On track",
    statusTone: "success",
    accepted: "8 of 16",
    spend: "₹2,00,000",
    image: asset("dashboard/project-vitamin-c.png"),
  },
  {
    name: "Glow Squad · Month 3 of 6",
    meta: "Influencer · Paid · Long-term",
    status: "On track",
    statusTone: "success",
    accepted: "6 of 6",
    spend: "₹2,25,000",
    image: asset("dashboard/project-glow-squad.png"),
  },
  {
    name: "Monsoon Sunscreen",
    meta: "Influencer · Paid · One-time",
    status: "On track",
    statusTone: "success",
    accepted: "10 of 12",
    spend: "₹1,20,000",
    image: asset("dashboard/project-monsoon-sunscreen.png"),
  },
  {
    name: "Lip Tint Drop",
    meta: "UGC · Paid · One-time",
    status: "Ahead",
    statusTone: "success",
    accepted: "6 of 6",
    spend: "₹60,000",
    image: asset("dashboard/project-lip-tint.png"),
  },
  {
    name: "Hydration Bundle",
    meta: "Influencer · Gift exchange · One-time",
    status: "Behind",
    statusTone: "danger",
    accepted: "5 of 8",
    spend: "₹52,000 value",
    image: asset("dashboard/project-hydration-bundle.png"),
  },
  {
    name: "Skin Quiz Leads",
    meta: "UGC · Paid · One-time",
    status: "Upcoming",
    statusTone: "info",
    accepted: "3 accepted",
    spend: "Not funded",
    image: asset("dashboard/project-skin-quiz.png"),
  },
];

const CONTENT_REVIEW = [
  {
    creator: "Meera Iyer",
    avatar: asset("creators/meera-iyer.png"),
    project: "Vitamin-C Serum",
    status: "Awaiting approval · 2 days",
    statusClass: "text-[#0d0d10]",
    image: asset("dashboard/project-vitamin-c.png"),
  },
  {
    creator: "Nisha Verma",
    avatar: asset("creators/ishita-rao.png"),
    project: "Monsoon Sunscreen",
    status: "Awaiting approval · 1 day",
    statusClass: "text-[#0d0d10]",
    image: asset("dashboard/project-monsoon-sunscreen.png"),
  },
  {
    creator: "Tanvi Shah",
    avatar: asset("creators/tara-bose.png"),
    project: "Lip Tint Drop",
    status: "Revision requested",
    statusClass: "text-[#d97706] font-medium",
    image: asset("dashboard/project-lip-tint.png"),
  },
  {
    creator: "Riya Sen",
    avatar: asset("creators/kavya-reddy.png"),
    project: "Glow Squad",
    status: "Awaiting approval · 3 days",
    statusClass: "text-[#0d0d10]",
    image: asset("dashboard/project-glow-squad.png"),
  },
];

export function AgencyClientOverviewPage() {
  const params = useParams<{ clientId?: string }>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const clientId = params.clientId || searchParams.get("client") || "minimalist";

  const activeClient =
    AGENCY_CLIENTS.find((c) => c.id === clientId) || {
      id: clientId,
      name: clientId.charAt(0).toUpperCase() + clientId.slice(1),
      category: "Beauty & skincare",
    };

  // Default to campaigns view (Figma 1716:728), with easy toggle to setup view (Figma 1716:668)
  const [viewState, setViewState] = useState<"campaigns" | "setup">(
    searchParams.get("view") === "setup" ? "setup" : "campaigns"
  );

  const [storeModalOpen, setStoreModalOpen] = useState(false);
  const [storeConnected, setStoreConnected] = useState(false);
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [overviewVideoOpen, setOverviewVideoOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [newProjectModalOpen, setNewProjectModalOpen] = useState(false);
  const [selectedProjectType, setSelectedProjectType] = useState<"influencer" | "ugc" | null>(null);

  const [chatMessages, setChatMessages] = useState<Array<{ role: "assistant" | "user"; text: string }>>([
    {
      role: "assistant",
      text: `Hi Rahul! Acting on behalf of ${activeClient.name}. How can I assist with this client workspace today?`,
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const userText = inputMessage;
    setInputMessage("");
    setChatMessages((prev) => [
      ...prev,
      { role: "user", text: userText },
      {
        role: "assistant",
        text: `I've prepared recommended creator tiers and brief targets for ${activeClient.name}. Click "Create new project" to launch the campaign brief!`,
      },
    ]);
  };

  const handleStartProject = (type?: "influencer" | "ugc") => {
    navigate(agencyClientNewProjectRoute(clientId) + (type ? `?type=${type}` : ""));
  };

  return (
    <AgencyClientShell activeClientId={clientId}>
      <div className="relative pb-16">
        {/* State Toggle Pill */}
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-lg border border-[#e3e5ec] bg-[#f8f9fb] px-3.5 py-2">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[12px] font-medium text-[#0d0d10]">
              {viewState === "campaigns"
                ? `AG · BR-01 · Overview: 2 · With campaigns (Figma 1716:728) · ${activeClient.name}`
                : `AG · BR-01 · Overview: 1 · No campaigns yet (Figma 1716:668) · ${activeClient.name}`}
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg border border-[#e3e5ec] bg-white p-0.5 text-[11px] font-medium self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setViewState("campaigns")}
              className={`rounded-md px-2.5 py-1 transition-colors cursor-pointer ${
                viewState === "campaigns"
                  ? "bg-[#0d0d10] text-white"
                  : "text-[#71717a] hover:text-[#0d0d10]"
              }`}
            >
              2 · With campaigns (1716:728)
            </button>
            <button
              type="button"
              onClick={() => setViewState("setup")}
              className={`rounded-md px-2.5 py-1 transition-colors cursor-pointer ${
                viewState === "setup"
                  ? "bg-[#0d0d10] text-white"
                  : "text-[#71717a] hover:text-[#0d0d10]"
              }`}
            >
              1 · No campaigns yet (1716:668)
            </button>
          </div>
        </div>

        {viewState === "campaigns" ? (
          /* ========================================================================= */
          /* AG · BR-01 · Overview: 2 · With campaigns (Figma Node 1716:728)            */
          /* ========================================================================= */
          <div className="flex flex-col gap-6">
            {/* Page Header (1716:733) */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-1">
                <h1 className="text-[26px] font-bold tracking-[-0.13px] text-[#0d0d10]">
                  Welcome, Ananya
                </h1>
                <p className="text-[13px] text-[#71717a]">
                  Across all active projects, 1–28 Oct 2026 , updated just now
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Date range picker reused from creator dashboard (Figma 1716:739) */}
                <DateRangePicker value="1 Oct - 28 Oct 2026" showCompare={true} />

                {/* Create new project button (1716:740) */}
                <button
                  type="button"
                  onClick={() => handleStartProject()}
                  className="inline-flex h-[40px] items-center justify-center gap-2 rounded-lg bg-[#0d0d10] px-4 text-[14px] font-medium text-white transition hover:bg-black cursor-pointer shadow-sm"
                >
                  <Plus size={16} />
                  <span>Create new project</span>
                </button>
              </div>
            </div>

            {/* Results / 4 KPI Tiles (1716:741) */}
            <div className="rounded-xl border border-[#e3e5ec] bg-white p-5 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Tile 1: Active projects */}
                <div className="flex flex-col gap-3 rounded-lg border border-[#e3e5ec] p-4 bg-white">
                  <div className="flex items-center gap-2.5">
                    <div className="grid size-9 place-items-center rounded-lg bg-[#3b5bff] text-white">
                      <Folder size={18} />
                    </div>
                    <span className="text-[13px] font-medium text-[#71717a]">Active projects</span>
                  </div>
                  <div>
                    <p className="text-[28px] font-bold leading-tight text-[#0d0d10]">5</p>
                    <p className="mt-1 text-[12px] text-[#71717a]">1 starting 4 Nov</p>
                  </div>
                </div>

                {/* Tile 2: Creators accepted */}
                <div className="flex flex-col gap-3 rounded-lg border border-[#e3e5ec] p-4 bg-white">
                  <div className="flex items-center gap-2.5">
                    <div className="grid size-9 place-items-center rounded-lg bg-[#3b5bff] text-white">
                      <Users size={18} />
                    </div>
                    <span className="text-[13px] font-medium text-[#71717a]">Creators accepted</span>
                  </div>
                  <div>
                    <p className="text-[28px] font-bold leading-tight text-[#0d0d10]">38</p>
                    <p className="mt-1 text-[12px] text-[#71717a]">Across 6 projects</p>
                  </div>
                </div>

                {/* Tile 3: Deliverables due this week */}
                <div className="flex flex-col gap-3 rounded-lg border border-[#e3e5ec] p-4 bg-white">
                  <div className="flex items-center gap-2.5">
                    <div className="grid size-9 place-items-center rounded-lg bg-[#3b5bff] text-white">
                      <Calendar size={18} />
                    </div>
                    <span className="text-[13px] font-medium text-[#71717a]">Deliverables due this week</span>
                  </div>
                  <div>
                    <p className="text-[28px] font-bold leading-tight text-[#0d0d10]">14</p>
                    <p className="mt-1 text-[12px] text-[#dc2626] font-medium">3 overdue</p>
                  </div>
                </div>

                {/* Tile 4: Shipments in transit */}
                <div className="flex flex-col gap-3 rounded-lg border border-[#e3e5ec] p-4 bg-white">
                  <div className="flex items-center gap-2.5">
                    <div className="grid size-9 place-items-center rounded-lg bg-[#3b5bff] text-white">
                      <Gift size={18} />
                    </div>
                    <span className="text-[13px] font-medium text-[#71717a]">Shipments in transit</span>
                  </div>
                  <div>
                    <p className="text-[28px] font-bold leading-tight text-[#0d0d10]">4</p>
                    <p className="mt-1 text-[12px] text-[#71717a]">2 delivered this week</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 1: Action Required + Upcoming Deadlines (1716:747) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Action Required (1716:748) */}
              <div className="lg:col-span-2 rounded-xl border border-[#e3e5ec] bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-0.5">
                  <h2 className="text-[16px] font-semibold text-[#0d0d10]">Action required</h2>
                  <p className="text-[12px] text-[#71717a]">4 things need your attention</p>
                </div>

                <div className="mt-3 divide-y divide-[#edeff3]">
                  {ACTIONS.map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-3.5 py-3.5 hover:bg-[#fafbfd] transition-colors rounded-lg px-2"
                      >
                        <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#f4f6fb] text-[#0d0d10]">
                          <IconComponent size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-medium text-[#0d0d10] leading-snug">{item.title}</p>
                          <p className="text-[12px] text-[#71717a] truncate">{item.body}</p>
                        </div>
                        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${item.badgeClass}`}>
                          {item.due}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Upcoming Deadlines (1716:757) */}
              <div className="rounded-xl border border-[#e3e5ec] bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-0.5">
                  <h2 className="text-[16px] font-semibold text-[#0d0d10]">Upcoming deadlines</h2>
                  <p className="text-[12px] text-[#71717a]">Next 14 days</p>
                </div>

                <div className="mt-4 space-y-4">
                  {DEADLINES.map((d, idx) => (
                    <div key={idx} className="flex items-center gap-3.5">
                      <div className="flex size-11 shrink-0 flex-col items-center justify-center rounded-lg border border-[#e3e5ec] bg-[#f8f9fb]">
                        <span className="text-[14px] font-bold text-[#0d0d10] leading-none">{d.day}</span>
                        <span className="text-[11px] text-[#71717a] leading-tight">{d.month}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-medium text-[#0d0d10] truncate">{d.title}</p>
                        <p className="text-[12px] text-[#71717a] truncate">{d.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 2: Projects Table + Budget Breakdown (1716:783) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Projects Table (1716:784) */}
              <div className="lg:col-span-2 rounded-xl border border-[#e3e5ec] bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-[16px] font-semibold text-[#0d0d10]">Projects</h2>
                    <p className="text-[12px] text-[#71717a]">6 projects · 5 live, 1 starting 4 Nov</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate(`/agency/client/${clientId}?tab=projects`)}
                    className="flex items-center gap-1 text-[13px] font-medium text-[#3b5bff] hover:underline cursor-pointer"
                  >
                    <span>View All Projects</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#edeff3] text-[12px] font-semibold text-[#71717a]">
                        <th className="pb-3 font-medium">Project</th>
                        <th className="pb-3 font-medium">Status</th>
                        <th className="pb-3 font-medium">Accepted</th>
                        <th className="pb-3 font-medium">Committed spend</th>
                        <th className="pb-3 w-6"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#edeff3] text-[13px]">
                      {PROJECTS.map((proj, idx) => (
                        <tr key={idx} className="hover:bg-[#fafbfd] transition-colors group cursor-pointer">
                          <td className="py-3 pr-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={proj.image}
                                alt={proj.name}
                                className="size-10 rounded-lg object-cover border border-[#e3e5ec]"
                              />
                              <div>
                                <p className="font-semibold text-[#0d0d10] leading-snug">{proj.name}</p>
                                <p className="text-[12px] text-[#71717a]">{proj.meta}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 pr-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                                proj.statusTone === "danger"
                                  ? "bg-[#fde4e3] text-[#dc2626]"
                                  : proj.statusTone === "info"
                                    ? "bg-[#e3e9ff] text-[#3b5bff]"
                                    : "bg-[#e1fce3] text-[#16a34a]"
                              }`}
                            >
                              <span
                                className={`size-1.5 rounded-full ${
                                  proj.statusTone === "danger"
                                    ? "bg-[#dc2626]"
                                    : proj.statusTone === "info"
                                      ? "bg-[#3b5bff]"
                                      : "bg-[#16a34a]"
                                }`}
                              />
                              <span>{proj.status}</span>
                            </span>
                          </td>
                          <td className={`py-3 pr-4 font-medium whitespace-nowrap ${proj.statusTone === "danger" ? "text-[#dc2626]" : "text-[#0d0d10]"}`}>
                            {proj.accepted}
                          </td>
                          <td className="py-3 pr-4 font-semibold text-[#0d0d10] whitespace-nowrap">
                            {proj.spend}
                          </td>
                          <td className="py-3 text-right">
                            <ChevronRight size={16} className="text-[#a3a3ac] group-hover:text-[#0d0d10] transition-colors" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Budget Breakdown (1716:902) */}
              <div className="rounded-xl border border-[#e3e5ec] bg-white p-5 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-[16px] font-semibold text-[#0d0d10]">Budget</h2>
                      <p className="text-[12px] text-[#71717a]">₹10,00,000 across 6 projects</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate(`/agency/client/${clientId}?tab=payments`)}
                      className="flex items-center gap-1 text-[13px] font-medium text-[#3b5bff] hover:underline cursor-pointer"
                    >
                      <span>Payments</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  <div className="mt-4">
                    <p className="text-[12px] text-[#71717a]">Left to commit</p>
                    <p className="text-[32px] font-bold text-[#0d0d10] leading-tight">₹1,10,000</p>
                  </div>

                  {/* Segmented bar */}
                  <div className="mt-3 flex h-2 w-full overflow-hidden rounded-full gap-1">
                    <span className="w-[43.4%] bg-[#0d0d10] rounded-l-full" title="Released to creators (43.4%)" />
                    <span className="w-[17.1%] bg-[#f59e0b]" title="Escrow balance (17.1%)" />
                    <span className="w-[28.5%] bg-[#3b82f6]" title="Awaiting funding (28.5%)" />
                    <span className="w-[11%] bg-[#e3e5ec] rounded-r-full" title="Not committed (11%)" />
                  </div>

                  {/* Legend */}
                  <div className="mt-4 space-y-2 text-[13px]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-[#0d0d10]" />
                        <span className="text-[#71717a]">Released to creators</span>
                      </div>
                      <span className="font-semibold text-[#0d0d10]">₹4,33,800</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-[#f59e0b]" />
                        <span className="text-[#71717a]">Escrow balance</span>
                      </div>
                      <span className="font-semibold text-[#0d0d10]">₹1,71,200</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-[#3b82f6]" />
                        <span className="text-[#71717a]">Awaiting funding</span>
                      </div>
                      <span className="font-semibold text-[#0d0d10]">₹2,85,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-[#a3a3ac]" />
                        <span className="text-[#71717a]">Not committed</span>
                      </div>
                      <span className="font-semibold text-[#0d0d10]">₹1,10,000</span>
                    </div>
                  </div>
                </div>

                {/* Due Container (1716:934) */}
                <div className="mt-5 rounded-xl border border-[#e3e5ec] bg-[#f8f9fb] p-3 text-[12px] space-y-2.5">
                  <div className="flex items-center justify-between font-semibold text-[#0d0d10]">
                    <span>Due in the next 14 days</span>
                    <span>₹1,42,965</span>
                  </div>
                  <div className="space-y-1 text-[#71717a]">
                    <div className="flex items-center justify-between">
                      <span>1 Nov · Glow Squad month 4</span>
                      <span className="font-medium text-[#0d0d10]">₹79,425</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Before 4 Nov · Skin Quiz Leads</span>
                      <span className="font-medium text-[#0d0d10]">₹63,540</span>
                    </div>
                  </div>

                  <div className="h-px bg-[#e3e5ec] my-1" />

                  <div className="flex items-center justify-between font-semibold text-[#0d0d10]">
                    <span>Due in the next 30 days</span>
                    <span>₹1,20,750</span>
                  </div>
                  <div className="space-y-1 text-[#71717a]">
                    <div className="flex items-center justify-between">
                      <span>15 Nov · Fitness Challenge</span>
                      <span className="font-medium text-[#0d0d10]">₹85,300</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Before 20 Nov · Wellness Webinar</span>
                      <span className="font-medium text-[#0d0d10]">₹50,450</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3: Content awaiting review (1716:953) */}
            <div className="rounded-xl border border-[#e3e5ec] bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-[16px] font-semibold text-[#0d0d10]">Content awaiting review</h2>
                  <p className="text-[12px] text-[#71717a]">4 of 9 items shown · oldest waiting 3 days</p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate(`/agency/client/${clientId}?tab=content`)}
                  className="flex items-center gap-1 text-[13px] font-medium text-[#3b5bff] hover:underline cursor-pointer"
                >
                  <span>Review all content</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {CONTENT_REVIEW.map((post, idx) => (
                  <div
                    key={idx}
                    onClick={() => navigate(`/agency/client/${clientId}?tab=content`)}
                    className="flex flex-col rounded-xl border border-[#e3e5ec] bg-white p-3 hover:border-[#0d0d10] transition-colors cursor-pointer group"
                  >
                    <div className="aspect-[4/3] w-full rounded-lg overflow-hidden bg-[#0d0d10] relative">
                      <img src={post.image} alt={post.project} className="size-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <img src={post.avatar} alt={post.creator} className="size-5 rounded-full object-cover" />
                      <span className="text-[12px] font-semibold text-[#0d0d10]">{post.creator}</span>
                    </div>
                    <p className="mt-1 text-[12px] text-[#71717a] truncate">{post.project}</p>
                    <p className={`mt-1 text-[12px] ${post.statusClass}`}>{post.status}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* AG · BR-01 · Overview: 1 · No campaigns yet (Figma Node 1716:668)          */
          /* ========================================================================= */
          <div className="flex flex-col gap-6">
            {/* Page Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-1">
                <h1 className="text-[26px] font-bold tracking-[-0.13px] text-[#0d0d10]">
                  Welcome, Ananya
                </h1>
                <p className="text-[13px] text-[#71717a]">
                  {activeClient.name} · Complete your account setup to start working with creators
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleStartProject()}
                  className="inline-flex h-[40px] items-center justify-center gap-2 rounded-lg bg-[#0d0d10] px-4 text-[14px] font-medium text-white transition hover:bg-black cursor-pointer shadow-sm"
                >
                  <Plus size={16} />
                  <span>Create new project</span>
                </button>
              </div>
            </div>

            {/* Account Setup Card (1716:682) */}
            <div className="rounded-xl border border-[#e3e5ec] bg-white p-5 flex flex-col gap-4 shadow-sm">
              <div className="flex flex-col gap-0.5">
                <h2 className="text-[16px] font-semibold text-[#0d0d10]">Account setup</h2>
                <p className="text-[12px] text-[#71717a]">
                  {storeConnected
                    ? "2 of 3 steps complete · approx. 3 minutes"
                    : "1 of 3 steps complete · approx. 5 minutes"}
                </p>
              </div>

              {/* Progress Bar (1716:687) */}
              <div className="h-[6px] w-full overflow-hidden rounded-[3px] bg-[#edeff3]">
                <div
                  className="h-full rounded-[3px] bg-[#0d0d10] transition-all duration-300"
                  style={{ width: storeConnected ? "66.6%" : "33.3%" }}
                />
              </div>

              {/* Step 1: Business email verified (1716:689) */}
              <div className="flex items-center gap-3.5 border-b border-[#edeff3] py-3.5">
                <div className="grid size-9 shrink-0 place-items-center rounded-full bg-[#e1fce3] text-[#16a34a]">
                  <Check size={18} strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-medium text-[#0d0d10]">Business email verified</p>
                  <p className="text-[12px] text-[#71717a]">ananya@{activeClient.id}.in</p>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#e1fce3] px-2 py-0.5 text-[12px] font-medium text-[#16a34a] shrink-0">
                  <span className="size-1.5 rounded-full bg-[#16a34a]" />
                  <span>Complete</span>
                </div>
              </div>

              {/* Step 2: Connect your store (1716:696) */}
              <div className="flex items-center gap-3.5 border-b border-[#edeff3] py-3.5">
                <div
                  className={`grid size-9 shrink-0 place-items-center rounded-full text-[12px] font-medium ${
                    storeConnected
                      ? "bg-[#e1fce3] text-[#16a34a]"
                      : "bg-[#f4f6fb] text-[#0d0d10]"
                  }`}
                >
                  {storeConnected ? <Check size={18} strokeWidth={2.5} /> : "2"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-medium text-[#0d0d10]">Connect your store</p>
                  <p className="text-[12px] text-[#71717a]">
                    For e-commerce brands. Enables automatic attribution of creator-driven sales and orders. Supports Shopify, WooCommerce and tracking links.
                  </p>
                </div>
                {storeConnected ? (
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-[#e1fce3] px-2 py-0.5 text-[12px] font-medium text-[#16a34a] shrink-0">
                    <span className="size-1.5 rounded-full bg-[#16a34a]" />
                    <span>Shopify connected</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setStoreModalOpen(true)}
                    className="inline-flex h-8 items-center justify-center rounded-lg border border-[#e3e5ec] bg-white px-3 text-[13px] font-medium text-[#0d0d10] transition hover:bg-[#f4f6fb] shrink-0 cursor-pointer"
                  >
                    Connect store
                  </button>
                )}
              </div>

              {/* Step 3: Create your first project (1716:703) */}
              <div className="flex items-center gap-3.5 py-3.5">
                <div className="grid size-9 shrink-0 place-items-center rounded-full bg-[#f4f6fb] text-[12px] font-medium text-[#0d0d10]">
                  3
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-medium text-[#0d0d10]">Create your first project</p>
                  <p className="text-[12px] text-[#71717a]">
                    Select a project type. You will define the budget, brief and creator criteria in the next steps.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleStartProject()}
                  className="inline-flex h-8 items-center justify-center rounded-lg border border-[#e3e5ec] bg-white px-3 text-[13px] font-medium text-[#0d0d10] transition hover:bg-[#f4f6fb] shrink-0 cursor-pointer"
                >
                  Start a project
                </button>
              </div>

              {/* Nested Project Types (1716:710) */}
              <div className="pl-0 sm:pl-[50px] pt-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div
                    onClick={() => handleStartProject("influencer")}
                    className="flex flex-col gap-2 rounded-lg border border-[#e3e5ec] bg-white p-4 transition-all hover:border-[#0d0d10] hover:shadow-sm cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[18px] font-bold text-[#0d0d10]">₹</span>
                      <ArrowRight size={14} className="text-[#a3a3ac] group-hover:text-[#0d0d10] group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-[#0d0d10]">Influencer marketing</p>
                      <p className="mt-1 text-[12px] text-[#71717a]">
                        Creators publish sponsored content on their own channels
                      </p>
                      <p className="mt-1 text-[12px] text-[#a3a3ac]">
                        Paid or gift exchange
                      </p>
                    </div>
                  </div>

                  <div
                    onClick={() => handleStartProject("ugc")}
                    className="flex flex-col gap-2 rounded-lg border border-[#e3e5ec] bg-white p-4 transition-all hover:border-[#0d0d10] hover:shadow-sm cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <Megaphone size={18} className="text-[#0d0d10]" />
                      <ArrowRight size={14} className="text-[#a3a3ac] group-hover:text-[#0d0d10] group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-[#0d0d10]">User-generated content</p>
                      <p className="mt-1 text-[12px] text-[#71717a]">
                        Content produced for your brand channels and ads
                      </p>
                      <p className="mt-1 text-[12px] text-[#a3a3ac]">
                        Includes usage rights
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Need help getting started? Banner (1716:721) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl bg-[#f4f6fb] p-5 pr-6 sm:pr-12">
              <div className="flex flex-col gap-0.5">
                <h3 className="text-[14px] font-medium text-[#0d0d10]">Need help getting started?</h3>
                <p className="text-[12px] text-[#71717a]">
                  Our assistant can draft a project from your brief, or you can review how similar brands structured their first project.
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setGuideModalOpen(true)}
                  className="inline-flex h-8 items-center justify-center rounded-lg px-3 text-[13px] font-medium text-[#0d0d10] hover:bg-black/5 transition cursor-pointer"
                >
                  Read the guide
                </button>
                <button
                  type="button"
                  onClick={() => setOverviewVideoOpen(true)}
                  className="inline-flex h-8 items-center justify-center rounded-lg border border-[#e3e5ec] bg-white px-3 text-[13px] font-medium text-[#0d0d10] hover:bg-[#edeff3] transition cursor-pointer shadow-xs"
                >
                  Watch overview
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Floating Chatbot Launcher (1716:727) */}
        <button
          type="button"
          onClick={() => setChatOpen((prev) => !prev)}
          className="fixed bottom-6 right-6 z-40 grid size-14 place-items-center rounded-full bg-[#0d0d10] text-white shadow-[0px_16px_40px_-8px_rgba(8,10,20,0.22)] transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Toggle assistant"
        >
          <MessageSquare size={22} className="fill-white" />
        </button>

        {/* Floating Chatbot Drawer / Popover */}
        {chatOpen && (
          <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] rounded-2xl border border-[#e3e5ec] bg-white shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
            <div className="flex items-center justify-between bg-[#0d0d10] px-4 py-3.5 text-white">
              <div className="flex items-center gap-2.5">
                <div className="grid size-7 place-items-center rounded-full bg-white/10">
                  <Sparkles size={14} className="text-amber-300" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold leading-4">Floooww Agency Assistant</p>
                  <p className="text-[11px] text-[#a3a3ac]">Managing {activeClient.name}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setChatOpen(false)}
                className="p-1 rounded-md text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="max-h-[300px] min-h-[220px] overflow-y-auto p-4 space-y-3 bg-[#fbfcfd]">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 text-[13px] leading-5 ${
                      msg.role === "user"
                        ? "bg-[#0d0d10] text-white"
                        : "bg-[#f4f6fb] border border-[#e3e5ec] text-[#0d0d10]"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick starter chips */}
            <div className="border-t border-[#e3e5ec] bg-white px-3 py-2 flex gap-1.5 overflow-x-auto text-[11px]">
              <button
                type="button"
                onClick={() => {
                  setInputMessage(`Draft influencer brief for ${activeClient.name}`);
                }}
                className="rounded-full bg-[#f4f6fb] px-2.5 py-1 text-[#0d0d10] hover:bg-[#e3e5ec] whitespace-nowrap cursor-pointer transition-colors"
              >
                Draft influencer brief
              </button>
              <button
                type="button"
                onClick={() => {
                  setInputMessage("Recommend top creators for this niche");
                }}
                className="rounded-full bg-[#f4f6fb] px-2.5 py-1 text-[#0d0d10] hover:bg-[#e3e5ec] whitespace-nowrap cursor-pointer transition-colors"
              >
                Top creators
              </button>
            </div>

            <div className="flex items-center gap-2 border-t border-[#e3e5ec] bg-white p-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask anything or request a brief..."
                className="flex-1 rounded-lg border border-[#e3e5ec] px-3 py-1.5 text-[13px] outline-none focus:border-[#0d0d10]"
              />
              <button
                type="button"
                onClick={handleSendMessage}
                className="rounded-lg bg-[#0d0d10] px-3 py-1.5 text-[13px] font-medium text-white hover:bg-black cursor-pointer"
              >
                Send
              </button>
            </div>
          </div>
        )}

        {/* Connect Store Modal */}
        {storeModalOpen && (
          <div
            className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
            role="presentation"
            onClick={() => setStoreModalOpen(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[480px] rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-[18px] font-semibold text-[#0d0d10]">Connect store for {activeClient.name}</h3>
                  <p className="mt-1 text-[13px] text-[#71717a]">
                    Link client e-commerce store to track automatic sales attribution and creator coupon redemptions.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStoreModalOpen(false)}
                  className="p-1 rounded-lg text-[#71717a] hover:bg-[#f4f6fb] cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-5 space-y-3">
                <div
                  onClick={() => {
                    setStoreConnected(true);
                    setStoreModalOpen(false);
                  }}
                  className="flex items-center gap-3.5 rounded-xl border border-[#e3e5ec] p-3.5 hover:border-[#0d0d10] hover:bg-[#fcfdfd] transition-colors cursor-pointer group"
                >
                  <div className="grid size-10 place-items-center rounded-lg bg-[#95BF47]/15 text-[#95BF47] font-bold">
                    <ShoppingBag size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-[14px] font-semibold text-[#0d0d10]">Shopify</p>
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-600">
                        Recommended
                      </span>
                    </div>
                    <p className="text-[12px] text-[#71717a]">
                      Instant 1-click sync for orders, discounts &amp; tracking.
                    </p>
                  </div>
                  <ArrowRight size={16} className="text-[#a3a3ac] group-hover:text-[#0d0d10] group-hover:translate-x-0.5 transition-all" />
                </div>

                <div
                  onClick={() => {
                    setStoreConnected(true);
                    setStoreModalOpen(false);
                  }}
                  className="flex items-center gap-3.5 rounded-xl border border-[#e3e5ec] p-3.5 hover:border-[#0d0d10] hover:bg-[#fcfdfd] transition-colors cursor-pointer group"
                >
                  <div className="grid size-10 place-items-center rounded-lg bg-[#7F54B3]/15 text-[#7F54B3] font-bold">
                    <Store size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] font-semibold text-[#0d0d10]">WooCommerce</p>
                    <p className="text-[12px] text-[#71717a]">
                      Connect via Consumer Key &amp; Webhook integration.
                    </p>
                  </div>
                  <ArrowRight size={16} className="text-[#a3a3ac] group-hover:text-[#0d0d10] group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStoreModalOpen(false)}
                  className="h-9 px-4 text-[13px] font-medium text-[#71717a] hover:text-[#0d0d10] cursor-pointer"
                >
                  Connect later
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Start Project Modal */}
        {newProjectModalOpen && (
          <div
            className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
            role="presentation"
            onClick={() => setNewProjectModalOpen(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[500px] rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-[18px] font-semibold text-[#0d0d10]">Create project for {activeClient.name}</h3>
                  <p className="mt-1 text-[13px] text-[#71717a]">
                    Brightside Agency manages execution, approvals and creator disbursements.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setNewProjectModalOpen(false)}
                  className="p-1 rounded-lg text-[#71717a] hover:bg-[#f4f6fb] cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-5 space-y-3">
                <div
                  onClick={() => {
                    setNewProjectModalOpen(false);
                    setViewState("campaigns");
                  }}
                  className={`flex items-start gap-3 rounded-xl border p-3.5 transition-colors cursor-pointer ${
                    selectedProjectType === "influencer"
                      ? "border-[#0d0d10] bg-[#fcfdfd]"
                      : "border-[#e3e5ec] hover:border-[#0d0d10]"
                  }`}
                >
                  <span className="text-[20px] font-bold text-[#0d0d10] shrink-0">₹</span>
                  <div className="flex-1">
                    <p className="text-[14px] font-medium text-[#0d0d10]">Influencer marketing</p>
                    <p className="text-[12px] text-[#71717a]">Creators post sponsored reels, videos, stories on their accounts.</p>
                  </div>
                </div>

                <div
                  onClick={() => {
                    setNewProjectModalOpen(false);
                    setViewState("campaigns");
                  }}
                  className={`flex items-start gap-3 rounded-xl border p-3.5 transition-colors cursor-pointer ${
                    selectedProjectType === "ugc"
                      ? "border-[#0d0d10] bg-[#fcfdfd]"
                      : "border-[#e3e5ec] hover:border-[#0d0d10]"
                  }`}
                >
                  <Megaphone size={20} className="text-[#0d0d10] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-[14px] font-medium text-[#0d0d10]">User-generated content (UGC)</p>
                    <p className="text-[12px] text-[#71717a]">High-performance video ads &amp; creative assets for client channels.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setNewProjectModalOpen(false)}
                  className="h-9 px-4 text-[13px] font-medium text-[#71717a] hover:text-[#0d0d10] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNewProjectModalOpen(false);
                    setViewState("campaigns");
                  }}
                  className="h-9 rounded-lg bg-[#0d0d10] px-4 text-[13px] font-medium text-white hover:bg-black cursor-pointer"
                >
                  Proceed to brief
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Guide Modal */}
        {guideModalOpen && (
          <div
            className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
            role="presentation"
            onClick={() => setGuideModalOpen(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[520px] rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="grid size-9 place-items-center rounded-full bg-[#f4f6fb] text-[#0d0d10]">
                    <FileText size={18} />
                  </div>
                  <h3 className="text-[17px] font-semibold text-[#0d0d10]">Client Onboarding Guide</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setGuideModalOpen(false)}
                  className="p-1 rounded-lg text-[#71717a] hover:bg-[#f4f6fb] cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-4 space-y-3.5 text-[13px] text-[#71717a] leading-5">
                <p>
                  As an agency manager, you can run full campaigns under your client's brand identity:
                </p>
                <div className="rounded-xl bg-[#f4f6fb] p-3.5 space-y-2 text-[#0d0d10]">
                  <p className="font-semibold text-[13px]">1. Client isolation</p>
                  <p className="text-[12px] text-[#71717a]">
                    Creators only see the client brand ({activeClient.name}) and never your internal agency rate cards or client margins.
                  </p>
                  <p className="font-semibold text-[13px]">2. Attribution &amp; Store Sync</p>
                  <p className="text-[12px] text-[#71717a]">
                    Connect client Shopify/WooCommerce store to tie creator clicks to actual checkout GMV.
                  </p>
                  <p className="font-semibold text-[13px]">3. Custom Reports</p>
                  <p className="text-[12px] text-[#71717a]">
                    Export branded executive performance PDFs directly from Agency Custom Reports.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setGuideModalOpen(false)}
                  className="h-9 rounded-lg bg-[#0d0d10] px-4 text-[13px] font-medium text-white hover:bg-black cursor-pointer"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Video Overview Modal */}
        {overviewVideoOpen && (
          <div
            className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"
            role="presentation"
            onClick={() => setOverviewVideoOpen(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[560px] rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#e3e5ec]">
                <div className="flex items-center gap-2">
                  <Play size={16} className="text-[#0d0d10]" />
                  <h3 className="text-[16px] font-semibold text-[#0d0d10]">Platform Overview (2 min)</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setOverviewVideoOpen(false)}
                  className="p-1 rounded-lg text-[#71717a] hover:bg-[#f4f6fb] cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-4 aspect-video rounded-xl bg-[#0d0d10] flex flex-col items-center justify-center text-white relative overflow-hidden group">
                <div className="grid size-14 place-items-center rounded-full bg-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform cursor-pointer">
                  <Play size={24} className="fill-white translate-x-0.5" />
                </div>
                <p className="mt-3 text-[13px] text-white/80">Interactive Video Walkthrough</p>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setOverviewVideoOpen(false)}
                  className="h-9 rounded-lg bg-[#0d0d10] px-4 text-[13px] font-medium text-white hover:bg-black cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AgencyClientShell>
  );
}
