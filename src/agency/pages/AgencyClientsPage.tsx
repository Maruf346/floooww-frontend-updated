import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  Plus,
  Search,
  ChevronDown,
  Calendar,
  MoreHorizontal,
  ExternalLink,
  Check,
  PauseCircle,
  Archive,
  Trash2,
  Settings,
} from "lucide-react";
import { AgencyShell } from "@/agency/components/AgencyShell";
import { AgencyAddClientModal } from "@/agency/components/AgencyAddClientModal";
import { ROUTES } from "@/common/constants/routes";

type ClientStatus = "Active" | "Onboarding" | "Paused" | "Archived" | "Deleted";

type ClientItem = {
  id: string;
  name: string;
  industry: string;
  since: string;
  status: ClientStatus;
  logo: string;
  projectsCount: number;
  liveCount: number;
  inEscrow: string;
  creatorsText: string;
  deadlineDate: string;
  deadlineLabel: string;
};

const INITIAL_CLIENTS: ClientItem[] = [
  {
    id: "minimalist",
    name: "Minimalist",
    industry: "Beauty & skincare",
    since: "since Jan 2026",
    status: "Active",
    logo: "/assets/agency/brands/minimalist.png",
    projectsCount: 11,
    liveCount: 5,
    inEscrow: "₹2,00,000",
    creatorsText: "16 creators",
    deadlineDate: "7 Nov",
    deadlineLabel: "Vitamin-C Serum ends",
  },
  {
    id: "velvet_lip",
    name: "Velvet Lip Co.",
    industry: "Make-up",
    since: "since Mar 2026",
    status: "Active",
    logo: "/assets/agency/brands/velvet_lip.png",
    projectsCount: 4,
    liveCount: 2,
    inEscrow: "₹65,000",
    creatorsText: "6 creators",
    deadlineDate: "2 Nov",
    deadlineLabel: "offers close",
  },
  {
    id: "dewdrop",
    name: "Dewdrop Naturals",
    industry: "Skincare",
    since: "since Jun 2026",
    status: "Active",
    logo: "/assets/agency/brands/dewdrop.png",
    projectsCount: 3,
    liveCount: 1,
    inEscrow: "₹18,000",
    creatorsText: "3 creators",
    deadlineDate: "3 Nov",
    deadlineLabel: "kits ship",
  },
  {
    id: "strand_studio",
    name: "Strand Studio",
    industry: "Haircare",
    since: "since Aug 2026",
    status: "Active",
    logo: "/assets/agency/brands/strand_studio.png",
    projectsCount: 2,
    liveCount: 1,
    inEscrow: "₹27,000",
    creatorsText: "3 creators",
    deadlineDate: "30 Nov",
    deadlineLabel: "project ends",
  },
  {
    id: "petal_pine",
    name: "Petal & Pine",
    industry: "Wellness",
    since: "onboarding",
    status: "Onboarding",
    logo: "/assets/agency/brands/petal_pine.png",
    projectsCount: 1,
    liveCount: 0,
    inEscrow: "-",
    creatorsText: "-",
    deadlineDate: "10 Nov",
    deadlineLabel: "first invites",
  },
  {
    id: "kumkum",
    name: "Kumkum Naturals",
    industry: "Ayurvedic skincare",
    since: "since May 2026",
    status: "Paused",
    logo: "/assets/agency/brands/kumkum.png",
    projectsCount: 2,
    liveCount: 0,
    inEscrow: "-",
    creatorsText: "-",
    deadlineDate: "-",
    deadlineLabel: "2 invoices overdue",
  },
];

type TabKey = "all" | "active" | "onboarding" | "paused" | "archived" | "deleted";

export function AgencyClientsPage() {
  const navigate = useNavigate();
  const [clients, setClients] = useState<ClientItem[]>(INITIAL_CLIENTS);
  const [activeTab, setActiveTab] = useState<TabKey>("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [activeActionMenuId, setActiveActionMenuId] = useState<string | null>(null);

  // Filter dropdown states
  const [typeFilter, setTypeFilter] = useState("All");
  const [partnershipFilter, setPartnershipFilter] = useState("All");
  const [durationFilter, setDurationFilter] = useState("All");
  const [platformFilter, setPlatformFilter] = useState("All");
  const [budgetFilter, setBudgetFilter] = useState("All");

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
      if (activeActionMenuId && !(event.target as HTMLElement).closest(".action-menu-container")) {
        setActiveActionMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeActionMenuId]);

  // Counts for tabs
  const tabCounts = useMemo(() => {
    return {
      all: 6,
      active: 5,
      onboarding: 1,
      paused: 0,
      archived: 2,
      deleted: 1,
    };
  }, []);

  // Filtered rows
  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      // Tab filter
      if (activeTab === "active" && c.status !== "Active") return false;
      if (activeTab === "onboarding" && c.status !== "Onboarding") return false;
      if (activeTab === "paused" && c.status !== "Paused") return false;
      if (activeTab === "archived" && c.status !== "Archived") return false;
      if (activeTab === "deleted" && c.status !== "Deleted") return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = c.name.toLowerCase().includes(query);
        const matchesIndustry = c.industry.toLowerCase().includes(query);
        if (!matchesName && !matchesIndustry) return false;
      }

      return true;
    });
  }, [clients, activeTab, searchQuery]);

  const handleOpenClient = (clientId: string) => {
    navigate(`${ROUTES.brandOverview}?client=${clientId}`);
  };

  const handleAddClientSuccess = (clientName: string) => {
    const newClient: ClientItem = {
      id: clientName.toLowerCase().replace(/\s+/g, "_"),
      name: clientName,
      industry: "Beauty & skincare",
      since: "since Nov 2026",
      status: "Active",
      logo: "/assets/agency/brands/dewdrop.png",
      projectsCount: 1,
      liveCount: 1,
      inEscrow: "₹50,000",
      creatorsText: "1 creator",
      deadlineDate: "15 Dec",
      deadlineLabel: "first campaign",
    };
    setClients((prev) => [newClient, ...prev]);
  };

  return (
    <AgencyShell
      onAddClient={() => setIsAddClientOpen(true)}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 pb-12"
      >
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-[26px] font-bold tracking-[-0.13px] text-[#0d0d10] leading-[34px]">
              Clients
            </h1>
            <p className="text-[13px] text-[#0d0d10] font-normal leading-[20px]">
              6 clients · 9 live projects · ₹5,52,000 held in escrow across clients
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {/* DateRange */}
            <div className="flex h-10 items-center gap-2 rounded-lg border border-[#e3e5ec] bg-white px-3 text-[12px] font-medium text-[#0d0d10]">
              <Calendar className="size-4 text-[#71717a]" />
              <span>1 Oct – 28 Oct 2026</span>
              <span className="text-[#a3a3ac] font-normal">vs previous</span>
              <ChevronDown className="size-3.5 text-[#71717a]" />
            </div>

            {/* Add client button */}
            <button
              type="button"
              onClick={() => navigate(ROUTES.agencyClientNew)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0d0d10] px-4 text-[14px] font-medium text-white transition hover:bg-black cursor-pointer shadow-xs"
            >
              <Plus className="size-4" />
              <span>Add client</span>
            </button>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-6 border-b border-[#e3e5ec] overflow-x-auto no-scrollbar">
          {[
            { key: "all", label: "All", count: tabCounts.all },
            { key: "active", label: "Active", count: tabCounts.active },
            { key: "onboarding", label: "Onboarding", count: tabCounts.onboarding },
            { key: "paused", label: "Paused", count: tabCounts.paused },
            { key: "archived", label: "Archived", count: tabCounts.archived },
            { key: "deleted", label: "Deleted", count: tabCounts.deleted },
          ].map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key as TabKey)}
                className={`relative flex items-center gap-1.5 pb-3 text-[14px] font-medium transition cursor-pointer ${
                  isActive
                    ? "text-[#0d0d10] border-b-2 border-[#0d0d10]"
                    : "text-[#71717a] hover:text-[#0d0d10]"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-[12px] font-medium ${
                    isActive
                      ? "bg-[#f1f4ff] text-[#0d0d10]"
                      : "bg-[#edeff3] text-[#71717a]"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" ref={dropdownRef}>
          <div className="relative w-full sm:w-[280px]">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#a3a3ac]">
              <Search className="size-4" />
            </div>
            <input
              type="text"
              placeholder="Search projects…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-lg border border-[#e3e5ec] bg-white pl-9 pr-3 text-[13px] text-[#0d0d10] placeholder:text-[#a3a3ac] focus:border-[#0d0d10] focus:outline-none"
            />
          </div>

          {/* Chips dropdown filters */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              {
                id: "type",
                label: typeFilter === "All" ? "Type" : `Type: ${typeFilter}`,
                val: typeFilter,
                setVal: setTypeFilter,
                options: ["All", "Influencer", "UGC", "Paid", "Gift exchange"],
              },
              {
                id: "partnership",
                label: partnershipFilter === "All" ? "Partnership" : `Partnership: ${partnershipFilter}`,
                val: partnershipFilter,
                setVal: setPartnershipFilter,
                options: ["All", "Direct", "Agency managed", "Co-funded"],
              },
              {
                id: "duration",
                label: durationFilter === "All" ? "Duration" : `Duration: ${durationFilter}`,
                val: durationFilter,
                setVal: setDurationFilter,
                options: ["All", "Active now", "Ending this month", "Q4 2026"],
              },
              {
                id: "platform",
                label: platformFilter === "All" ? "Platform" : `Platform: ${platformFilter}`,
                val: platformFilter,
                setVal: setPlatformFilter,
                options: ["All", "Instagram", "YouTube", "TikTok", "LinkedIn"],
              },
              {
                id: "budget",
                label: budgetFilter === "All" ? "Budget" : `Budget: ${budgetFilter}`,
                val: budgetFilter,
                setVal: setBudgetFilter,
                options: ["All", "< ₹50,000", "₹50k - ₹1L", "₹1L - ₹5L", "> ₹5L"],
              },
            ].map((chip) => {
              const isOpen = openDropdown === chip.id;
              const hasSelection = chip.val !== "All";
              return (
                <div key={chip.id} className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(isOpen ? null : chip.id)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-medium transition cursor-pointer ${
                      hasSelection || isOpen
                        ? "border-[#0d0d10] bg-white text-[#0d0d10]"
                        : "border-[#e3e5ec] bg-white text-[#0d0d10] hover:border-[#0d0d10]"
                    }`}
                  >
                    <span>{chip.label}</span>
                    <ChevronDown className="size-3.5 text-[#71717a]" />
                  </button>

                  {/* Matching Dropdown Popover */}
                  {isOpen && (
                    <div className="absolute right-0 top-[calc(100%+6px)] z-30 min-w-[180px] rounded-[10px] border border-[#e5e7eb] bg-white p-1.5 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.08)] animate-in fade-in zoom-in-95 duration-100 flex flex-col gap-0.5">
                      {chip.options.map((opt) => {
                        const isSelected = chip.val === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              chip.setVal(opt);
                              setOpenDropdown(null);
                            }}
                            className={`flex w-full items-center justify-between rounded-[6px] px-3 py-2 text-left text-[13px] transition cursor-pointer ${
                              isSelected
                                ? "bg-[#f1f4ff] text-[#0d0d10] font-medium"
                                : "text-[#0d0d10] hover:bg-[#f8f9fb]"
                            }`}
                          >
                            <span>{opt}</span>
                            {isSelected && <Check className="size-4 text-[#0d0d10] stroke-[2]" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Clients Table Card */}
        <div className="overflow-hidden rounded-[12px] border border-[#e3e5ec] bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[960px]">
              <thead>
                <tr className="bg-[#f4f6fb] border-b border-[#e3e5ec] text-[12px] font-semibold tracking-[0.72px] text-[#0d0d10]">
                  <th className="py-3 px-5 w-[280px]">CLIENT · INDUSTRY</th>
                  <th className="py-3 px-3 w-[110px]">STATUS</th>
                  <th className="py-3 px-3 w-[80px]">PROJECTS</th>
                  <th className="py-3 px-3 w-[60px]">LIVE</th>
                  <th className="py-3 px-3 w-[130px]">IN ESCROW</th>
                  <th className="py-3 px-3 w-[110px]">CREATORS</th>
                  <th className="py-3 px-3 w-[180px]">NEXT DEADLINE</th>
                  <th className="py-3 px-5 text-right w-[110px]"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edeff3] text-[13px]">
                {filteredClients.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-[#71717a]">
                      No clients found in this view.
                    </td>
                  </tr>
                ) : (
                  filteredClients.map((client, idx) => {
                    const isMenuOpen = activeActionMenuId === client.id;
                    return (
                      <motion.tr
                        key={client.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
                        className="transition hover:bg-[#fcfdfe] group"
                      >
                        {/* Client & Industry */}
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-3">
                            <img
                              src={client.logo}
                              alt={client.name}
                              className="size-11 rounded-[8px] object-cover shrink-0 border border-[#e3e5ec]"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = "none";
                              }}
                            />
                            <div className="flex flex-col min-w-0">
                              <span className="font-medium text-[14px] text-[#0d0d10] truncate">
                                {client.name}
                              </span>
                              <span className="text-[12px] text-[#71717a] truncate">
                                {client.industry} · {client.since}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-3">
                          {client.status === "Active" && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e1fce3] px-2 py-0.5 text-[12px] font-medium text-[#16a34a]">
                              <span className="size-1.5 rounded-full bg-[#16a34a]" />
                              Active
                            </span>
                          )}
                          {client.status === "Onboarding" && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f1f4ff] px-2 py-0.5 text-[12px] font-medium text-[#3b5bff]">
                              <span className="size-1.5 rounded-full bg-[#3b5bff]" />
                              Onboarding
                            </span>
                          )}
                          {client.status === "Paused" && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f4f6fb] px-2 py-0.5 text-[12px] font-medium text-[#4a4a55]">
                              <span className="size-1.5 rounded-full bg-[#8491a3]" />
                              Paused
                            </span>
                          )}
                          {client.status === "Archived" && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f4f6fb] px-2 py-0.5 text-[12px] font-medium text-[#71717a]">
                              Archived
                            </span>
                          )}
                          {client.status === "Deleted" && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fee2e2] px-2 py-0.5 text-[12px] font-medium text-[#ef4444]">
                              Deleted
                            </span>
                          )}
                        </td>

                        {/* Projects */}
                        <td className="py-3.5 px-3 font-medium text-[#71717a]">
                          {client.projectsCount}
                        </td>

                        {/* Live */}
                        <td className="py-3.5 px-3 font-medium text-[#71717a]">
                          {client.liveCount}
                        </td>

                        {/* In Escrow */}
                        <td className="py-3.5 px-3 font-medium text-[#0d0d10]">
                          {client.inEscrow}
                        </td>

                        {/* Creators */}
                        <td className="py-3.5 px-3 font-medium text-[#0d0d10]">
                          {client.creatorsText}
                        </td>

                        {/* Next Deadline */}
                        <td className="py-3.5 px-3">
                          <div className="flex flex-col">
                            <span className="font-medium text-[#0d0d10]">
                              {client.deadlineDate}
                            </span>
                            <span className="text-[12px] text-[#71717a]">
                              {client.deadlineLabel}
                            </span>
                          </div>
                        </td>

                        {/* Action buttons */}
                        <td className="py-3.5 px-5 text-right">
                          <div className="flex items-center justify-end gap-2.5 action-menu-container relative">
                            <button
                              type="button"
                              onClick={() => handleOpenClient(client.id)}
                              className="inline-flex h-8 items-center justify-center rounded-[8px] border border-[#e3e5ec] bg-white px-3 text-[13px] font-medium text-[#0d0d10] transition hover:border-[#0d0d10]"
                            >
                              Open
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                setActiveActionMenuId(isMenuOpen ? null : client.id)
                              }
                              className="inline-flex size-8 items-center justify-center rounded-[8px] text-[#71717a] hover:bg-[#f4f6fb] hover:text-[#0d0d10] transition"
                            >
                              <MoreHorizontal className="size-4" />
                            </button>

                            {/* Row Action Menu */}
                            {isMenuOpen && (
                              <div className="absolute right-0 top-9 z-40 w-48 rounded-[10px] border border-[#e5e7eb] bg-white p-1.5 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)] text-left flex flex-col gap-0.5 animate-in fade-in zoom-in-95 duration-100">
                                <button
                                  type="button"
                                  onClick={() => handleOpenClient(client.id)}
                                  className="flex w-full items-center gap-2 rounded-[6px] px-3 py-2 text-[13px] text-[#0d0d10] hover:bg-[#f8f9fb]"
                                >
                                  <ExternalLink className="size-4 text-[#71717a]" />
                                  <span>Open client workspace</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setActiveActionMenuId(null)}
                                  className="flex w-full items-center gap-2 rounded-[6px] px-3 py-2 text-[13px] text-[#0d0d10] hover:bg-[#f8f9fb]"
                                >
                                  <Settings className="size-4 text-[#71717a]" />
                                  <span>Client settings</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setClients((prev) =>
                                      prev.map((c) =>
                                        c.id === client.id
                                          ? {
                                              ...c,
                                              status:
                                                c.status === "Paused"
                                                  ? "Active"
                                                  : "Paused",
                                            }
                                          : c
                                      )
                                    );
                                    setActiveActionMenuId(null);
                                  }}
                                  className="flex w-full items-center gap-2 rounded-[6px] px-3 py-2 text-[13px] text-[#0d0d10] hover:bg-[#f8f9fb]"
                                >
                                  <PauseCircle className="size-4 text-[#71717a]" />
                                  <span>
                                    {client.status === "Paused"
                                      ? "Resume client"
                                      : "Pause client"}
                                  </span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setClients((prev) =>
                                      prev.map((c) =>
                                        c.id === client.id
                                          ? { ...c, status: "Archived" }
                                          : c
                                      )
                                    );
                                    setActiveActionMenuId(null);
                                  }}
                                  className="flex w-full items-center gap-2 rounded-[6px] px-3 py-2 text-[13px] text-[#0d0d10] hover:bg-[#f8f9fb]"
                                >
                                  <Archive className="size-4 text-[#71717a]" />
                                  <span>Archive</span>
                                </button>
                                <div className="my-1 h-px bg-[#edeff3]" />
                                <button
                                  type="button"
                                  onClick={() => {
                                    setClients((prev) =>
                                      prev.filter((c) => c.id !== client.id)
                                    );
                                    setActiveActionMenuId(null);
                                  }}
                                  className="flex w-full items-center gap-2 rounded-[6px] px-3 py-2 text-[13px] text-[#ef4444] hover:bg-[#fef2f2]"
                                >
                                  <Trash2 className="size-4" />
                                  <span>Delete client</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-[12px] text-[#71717a]">
          Showing {filteredClients.length} of {clients.length} clients
        </div>
      </motion.div>

      {/* Add Client Modal */}
      <AgencyAddClientModal
        isOpen={isAddClientOpen}
        onClose={() => setIsAddClientOpen(false)}
        onSuccess={handleAddClientSuccess}
      />
    </AgencyShell>
  );
}
