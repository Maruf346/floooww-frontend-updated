import { useState, useRef, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronUp,
  ChevronDown,
  Check,
  Shield,
  Bell,
  Receipt,
  Users,
  Building2,
  UserPlus,
} from "lucide-react";
import { AgencyShell } from "@/agency/components/AgencyShell";
import { AgencyAddClientModal } from "@/agency/components/AgencyAddClientModal";
import {
  AgencyInviteMemberModal,
  TeamMemberData,
} from "@/agency/components/AgencyInviteMemberModal";
import { ROUTES } from "@/common/constants/routes";

type SettingsTab = "account" | "team" | "billing" | "notifications" | "security";

const SERVICE_OPTIONS = [
  "Influencer marketing",
  "UGC",
  "Paid social",
  "Creative strategy",
  "Content production",
  "Influencer casting",
];

const INITIAL_TEAM_MEMBERS: TeamMemberData[] = [
  {
    id: "1",
    name: "Rahul Verma",
    email: "rahul@brightside.agency",
    role: "Owner",
    clients: ["Minimalist", "Dewdrop Naturals", "Velvet Lip Co."],
    projects: "All projects of these clients (4 live)",
    accessLevel: "full",
    lastActive: "Now",
    avatarUrl: "/assets/agency/avatars/rahul_avatar.png",
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priya@brightside.agency",
    role: "Account manager",
    clients: ["Minimalist", "Dewdrop Naturals"],
    projects: "All projects of these clients (4 live)",
    accessLevel: "approve_content",
    lastActive: "2 h ago",
    avatarUrl: "/assets/agency/avatars/priya_avatar.png",
  },
  {
    id: "3",
    name: "Neha Kapoor",
    email: "neha@brightside.agency",
    role: "Finance",
    clients: ["Minimalist", "Dewdrop Naturals", "Velvet Lip Co."],
    projects: "All projects of these clients (4 live)",
    accessLevel: "approve_pay",
    lastActive: "Yesterday",
    avatarUrl: "/assets/agency/avatars/neha_avatar.png",
  },
  {
    id: "4",
    name: "Karan Mehta",
    email: "karan@brightside.agency",
    role: "Campaign exec.",
    clients: ["Minimalist"],
    projects: "Diwali Campaign 2024",
    accessLevel: "edit",
    lastActive: "3 d ago",
    avatarUrl: "/assets/agency/avatars/karan_avatar.png",
  },
  {
    id: "5",
    name: "Sana Qureshi",
    email: "sana@brightside.agency",
    role: "Agency · Admin",
    clients: ["Minimalist", "Dewdrop Naturals", "Velvet Lip Co."],
    projects: "All projects of these clients (4 live)",
    accessLevel: "full",
    lastActive: "1 h ago",
    avatarUrl: "/assets/agency/avatars/sana_avatar.png",
  },
];

const PERMISSIONS_MATRIX = [
  {
    permission: "Create & edit client projects",
    owner: true,
    accountManager: true,
    finance: false,
    campaignExec: true,
    clientGuest: false,
  },
  {
    permission: "Invite creators & approve content",
    owner: true,
    accountManager: true,
    finance: false,
    campaignExec: true,
    clientGuest: false,
  },
  {
    permission: "Fund client escrow & see invoices",
    owner: true,
    accountManager: false,
    finance: true,
    campaignExec: false,
    clientGuest: false,
  },
  {
    permission: "Manage team, clients & billing",
    owner: true,
    accountManager: true,
    finance: false,
    campaignExec: false,
    clientGuest: false,
  },
  {
    permission: "View dashboards & reports",
    owner: true,
    accountManager: true,
    finance: true,
    campaignExec: true,
    clientGuest: true,
  },
];

const easeCurve = [0.22, 1, 0.36, 1] as const;

export function AgencySettingsPage() {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Tab initialization based on URL query or pathname
  const initialTab: SettingsTab =
    pathname === ROUTES.agencyTeam || searchParams.get("tab") === "team"
      ? "team"
      : ((searchParams.get("tab") as SettingsTab) || "account");

  const [activeTab, setActiveTab] = useState<SettingsTab>(initialTab);
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Team & roles state
  const [teamMembers, setTeamMembers] = useState<TeamMemberData[]>(INITIAL_TEAM_MEMBERS);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMemberData | null>(null);

  // Form State for "Account" tab
  const [agencyName, setAgencyName] = useState("Brightside Agency");
  const [websiteUrl, setWebsiteUrl] = useState("https://brightside.agency");
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Influencer marketing",
    "UGC",
    "Paid social",
  ]);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [gstin, setGstin] = useState("27AABCG1234M1Z5");
  const [instagram, setInstagram] = useState("instagram.com/brightside.agency");
  const [youtube, setYoutube] = useState("youtube.com/@brightsideagency");
  const [linkedin, setLinkedin] = useState("linkedin.com/company/brightside-agency");
  const [teamSize, setTeamSize] = useState("6 people · 4 account managers");
  const [aboutAgency, setAboutAgency] = useState(
    "Influencer-marketing agency · runs campaigns for 6 beauty brands and manages 14 creators"
  );
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const servicesRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (pathname === ROUTES.agencyTeam) {
      setActiveTab("team");
    } else {
      const tabParam = searchParams.get("tab") as SettingsTab;
      if (tabParam && tabParam !== activeTab) {
        setActiveTab(tabParam);
      }
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSelectTab = (tab: SettingsTab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoPreview(url);
      showToast("Logo updated successfully.");
    }
  };

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSaveAccount = () => {
    showToast("Agency profile saved successfully.");
  };

  const handleSaveMember = (member: TeamMemberData) => {
    if (editingMember) {
      setTeamMembers((prev) =>
        prev.map((m) => (m.id === member.id ? { ...m, ...member } : m))
      );
      showToast(`${member.name}'s permissions updated.`);
    } else {
      setTeamMembers((prev) => [...prev, member]);
      showToast(`Invitation sent to ${member.email}.`);
    }
  };

  const handleRemoveMember = (memberId: string) => {
    setTeamMembers((prev) => prev.filter((m) => m.id !== memberId));
    showToast("Member removed from agency workspace.");
  };

  return (
    <AgencyShell onAddClient={() => setIsAddClientOpen(true)}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: easeCurve }}
        className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 pb-12"
      >
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-lg bg-[#0d0d10] px-4 py-2.5 text-[13px] font-medium text-white shadow-xl animate-in fade-in slide-in-from-bottom-2">
            {toastMessage}
          </div>
        )}

        {/* Page Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-[26px] font-bold tracking-[-0.13px] text-[#0d0d10] leading-[34px]">
            Settings
          </h1>
          <p className="text-[13px] text-[#0d0d10] font-normal leading-[20px]">
            Brightside Agency · agency workspace
          </p>
        </div>

        {/* Settings Body: 2 Columns */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Left Sub-navigation Menu */}
          <div className="w-full md:w-[240px] rounded-[12px] border border-[#e3e5ec] bg-white p-2 shrink-0 flex flex-col gap-0.5 shadow-xs">
            {[
              {
                id: "account",
                title: "Account",
                subtitle: "Agency name, logo, website",
                icon: Building2,
              },
              {
                id: "team",
                title: "Team & roles",
                subtitle: "Members, clients, access levels",
                icon: Users,
              },
              {
                id: "billing",
                title: "Billing & tax",
                subtitle: "Your GSTIN, invoice template, how cl...",
                icon: Receipt,
              },
              {
                id: "notifications",
                title: "Notifications",
                subtitle: "Email, WhatsApp, in-app · per client",
                icon: Bell,
              },
              {
                id: "security",
                title: "Security",
                subtitle: "Password, 2-step, devices",
                icon: Shield,
              },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleSelectTab(tab.id as SettingsTab)}
                  className={`w-full text-left rounded-[8px] px-3 py-2.5 transition cursor-pointer select-none ${
                    isActive
                      ? "bg-[#f1f4ff] text-[#0d0d10]"
                      : "hover:bg-[#f8f9fb] text-[#0d0d10]"
                  }`}
                >
                  <p
                    className={`text-[14px] leading-snug ${
                      isActive ? "font-medium text-[#0d0d10]" : "font-normal text-[#0d0d10]"
                    }`}
                  >
                    {tab.title}
                  </p>
                  <p className="text-[12px] text-[#a3a3ac] leading-tight mt-0.5 truncate">
                    {tab.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Main Content Panel */}
          <div className="flex-1 w-full min-w-0">
            <AnimatePresence mode="wait">
              {/* TAB 1: Account */}
              {activeTab === "account" && (
                <motion.div
                  key="account"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: easeCurve }}
                  className="rounded-[12px] border border-[#e3e5ec] bg-white p-6 flex flex-col gap-6 shadow-xs"
                >
                  {/* Card Head */}
                  <div className="flex flex-col gap-1 border-b border-[#edeff3] pb-4">
                    <h2 className="text-[16px] font-semibold text-[#0d0d10] leading-6">
                      Agency profile
                    </h2>
                    <p className="text-[12px] text-[#0d0d10] font-normal leading-4">
                      Shown to clients when you add them and on invoices · creators see the client brand, not the agency
                    </p>
                  </div>

                  {/* Logo Row */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3.5">
                      {logoPreview ? (
                        <img
                          src={logoPreview}
                          alt="Agency Logo"
                          className="size-16 rounded-[12px] object-cover border border-[#e3e5ec]"
                        />
                      ) : (
                        <div className="size-16 rounded-[12px] bg-[#f1f4ff] grid place-items-center text-[16px] font-semibold text-[#0d0d10] shrink-0 border border-[#e3e5ec]">
                          BA
                        </div>
                      )}

                      <div>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleLogoUpload}
                          accept="image/png, image/jpeg"
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="inline-flex h-8 items-center gap-1.5 rounded-[8px] border border-[#e3e5ec] bg-white px-3 text-[13px] font-medium text-[#0d0d10] transition hover:border-[#0d0d10] cursor-pointer"
                        >
                          <img
                            src="/assets/agency/icons/upload.svg"
                            alt=""
                            className="size-4 shrink-0"
                          />
                          <span>Upload logo</span>
                        </button>
                      </div>
                    </div>
                    <p className="text-[12px] text-[#8591a3] font-normal leading-normal">
                      Square, at least 400 × 400 px, JPG or PNG. Shown next to your brand name on project pages and in creators’ invites.
                    </p>
                  </div>

                  {/* Form Grid */}
                  <div className="flex flex-col gap-4">
                    {/* Row 1: Agency name & Website URL */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[12px] font-medium text-[#0d0d10] block mb-1">
                          Agency name
                        </label>
                        <input
                          type="text"
                          value={agencyName}
                          onChange={(e) => setAgencyName(e.target.value)}
                          className="h-10 w-full rounded-[8px] border border-[#e3e5ec] bg-white px-3 text-[13px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[12px] font-medium text-[#0d0d10] block mb-1">
                          Website URL
                        </label>
                        <input
                          type="text"
                          value={websiteUrl}
                          onChange={(e) => setWebsiteUrl(e.target.value)}
                          className="h-10 w-full rounded-[8px] border border-[#e3e5ec] bg-white px-3 text-[13px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Row 2: Services & GSTIN */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Services Custom Dropdown */}
                      <div className="relative" ref={servicesRef}>
                        <label className="text-[12px] font-medium text-[#0d0d10] block mb-1">
                          Services
                        </label>
                        <button
                          type="button"
                          onClick={() => setIsServicesOpen(!isServicesOpen)}
                          className={`flex h-10 w-full items-center justify-between rounded-[8px] bg-white px-3 text-left transition cursor-pointer ${
                            isServicesOpen
                              ? "border border-[#0d0d10]"
                              : "border border-[#e3e5ec] hover:border-[#0d0d10]"
                          }`}
                        >
                          <span className="text-[13px] text-[#0d0d10] truncate">
                            {selectedServices.length > 0
                              ? selectedServices.join(" · ")
                              : "Select services"}
                          </span>
                          <div className="size-4 shrink-0 grid place-items-center text-[#71717a]">
                            {isServicesOpen ? (
                              <ChevronUp className="size-4 stroke-[1.8]" />
                            ) : (
                              <ChevronDown className="size-4 stroke-[1.8]" />
                            )}
                          </div>
                        </button>

                        {isServicesOpen && (
                          <div className="absolute left-0 top-[calc(100%+4px)] z-40 w-full rounded-[10px] border border-[#e5e7eb] bg-white p-1.5 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.08)] animate-in fade-in zoom-in-95 duration-100 flex flex-col gap-0.5">
                            {SERVICE_OPTIONS.map((service) => {
                              const isSelected = selectedServices.includes(service);
                              return (
                                <button
                                  key={service}
                                  type="button"
                                  onClick={() => toggleService(service)}
                                  className={`flex w-full items-center justify-between rounded-[6px] px-3 py-2 text-left text-[13px] transition cursor-pointer ${
                                    isSelected
                                      ? "bg-[#f1f4ff] text-[#0d0d10]"
                                      : "text-[#0d0d10] hover:bg-[#f8f9fb]"
                                  }`}
                                >
                                  <span>{service}</span>
                                  {isSelected && (
                                    <Check className="size-4 text-[#0d0d10] stroke-[2] shrink-0" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* GSTIN */}
                      <div>
                        <label className="text-[12px] font-medium text-[#0d0d10] block mb-1">
                          GSTIN
                        </label>
                        <input
                          type="text"
                          value={gstin}
                          onChange={(e) => setGstin(e.target.value)}
                          className="h-10 w-full rounded-[8px] border border-[#e3e5ec] bg-white px-3 text-[13px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Row 3: Instagram & YouTube */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[12px] font-medium text-[#0d0d10] block mb-1">
                          Instagram
                        </label>
                        <input
                          type="text"
                          value={instagram}
                          onChange={(e) => setInstagram(e.target.value)}
                          className="h-10 w-full rounded-[8px] border border-[#e3e5ec] bg-white px-3 text-[13px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[12px] font-medium text-[#0d0d10] block mb-1">
                          YouTube
                        </label>
                        <input
                          type="text"
                          value={youtube}
                          onChange={(e) => setYoutube(e.target.value)}
                          className="h-10 w-full rounded-[8px] border border-[#e3e5ec] bg-white px-3 text-[13px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Row 4: LinkedIn & Team size */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[12px] font-medium text-[#0d0d10] block mb-1">
                          LinkedIn
                        </label>
                        <input
                          type="text"
                          value={linkedin}
                          onChange={(e) => setLinkedin(e.target.value)}
                          className="h-10 w-full rounded-[8px] border border-[#e3e5ec] bg-white px-3 text-[13px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[12px] font-medium text-[#0d0d10] block mb-1">
                          Team size
                        </label>
                        <input
                          type="text"
                          value={teamSize}
                          onChange={(e) => setTeamSize(e.target.value)}
                          className="h-10 w-full rounded-[8px] border border-[#e3e5ec] bg-white px-3 text-[13px] text-[#a2a7b3] focus:border-[#0d0d10] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Row 5: About the agency */}
                    <div>
                      <label className="text-[12px] font-medium text-[#0d0d10] block mb-1">
                        About the agency
                      </label>
                      <textarea
                        rows={4}
                        maxLength={300}
                        value={aboutAgency}
                        onChange={(e) => setAboutAgency(e.target.value)}
                        className="w-full rounded-[8px] border border-[#e3e5ec] bg-white p-3 text-[13px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none resize-none leading-relaxed"
                      />
                      <div className="flex items-center justify-between text-[12px] text-[#a3a3ac] mt-1 font-normal">
                        <span>Shown to creators on every project page</span>
                        <span>{aboutAgency.length} / 300</span>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleSaveAccount}
                        className="inline-flex h-10 items-center justify-center rounded-[8px] bg-[#0d0d10] px-5 text-[14px] font-medium text-white transition hover:bg-black cursor-pointer shadow-xs"
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: AG-04 · Team & roles */}
              {activeTab === "team" && (
                <motion.div
                  key="team"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: easeCurve }}
                  className="flex flex-col gap-6"
                >
                  {/* Top Bar: Subtitle & Invite Member Button */}
                  <div className="flex items-center justify-between">
                    <p className="text-[14px] text-[#0d0d10] font-normal">
                      6 members · 2 clients have guest seats
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingMember(null);
                        setIsInviteModalOpen(true);
                      }}
                      className="inline-flex h-9 items-center gap-1.5 rounded-[8px] bg-[#0d0d10] px-4 text-[13px] font-medium text-white transition hover:bg-black cursor-pointer shadow-xs"
                    >
                      <UserPlus size={15} />
                      <span>Invite member</span>
                    </button>
                  </div>

                  {/* Card 1: Members Table */}
                  <div className="rounded-[12px] border border-[#e3e5ec] bg-white overflow-hidden shadow-xs">
                    {/* Header */}
                    <div className="grid grid-cols-[1.8fr_1.3fr_1fr_auto] items-center bg-[#f8f9fc] border-b border-[#e3e5ec] px-5 py-3 text-[13px] font-medium text-[#525866]">
                      <span>Campaign executive</span>
                      <span>Role</span>
                      <span>Last active</span>
                      <span className="w-16" />
                    </div>

                    {/* Table Rows */}
                    <div className="divide-y divide-[#f0f2f5]">
                      {teamMembers.map((member) => (
                        <div
                          key={member.id}
                          className="grid grid-cols-[1.8fr_1.3fr_1fr_auto] items-center px-5 py-3.5 hover:bg-[#fafbfd] transition-colors"
                        >
                          {/* Member info */}
                          <div className="flex items-center gap-3 min-w-0 pr-2">
                            <img
                              src={member.avatarUrl}
                              alt={member.name}
                              className="size-9 rounded-full object-cover shrink-0 border border-[#e3e5ec]"
                            />
                            <div className="min-w-0 flex flex-col">
                              <span className="text-[14px] font-medium text-[#0d0d10] leading-snug truncate">
                                {member.name}
                              </span>
                              <span className="text-[12px] text-[#71717a] leading-tight truncate">
                                {member.email}
                              </span>
                            </div>
                          </div>

                          {/* Role Badge */}
                          <div>
                            {member.role === "Owner" ? (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f1f4ff] px-2.5 py-1 text-[12px] font-medium text-[#3b5bff]">
                                <span className="size-1.5 rounded-full bg-[#3b5bff]" />
                                Owner
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f4f6fb] px-2.5 py-1 text-[12px] font-medium text-[#4a4a55]">
                                <span className="size-1.5 rounded-full bg-[#6b7280]" />
                                {member.role}
                              </span>
                            )}
                          </div>

                          {/* Last Active */}
                          <span className="text-[13px] text-[#525866]">
                            {member.lastActive}
                          </span>

                          {/* Action */}
                          <div className="w-16 text-right">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingMember(member);
                                setIsInviteModalOpen(true);
                              }}
                              className="text-[13px] font-medium text-[#0d0d10] hover:text-[#3b5bff] transition-colors cursor-pointer"
                            >
                              Manage
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card 2: Permissions Matrix */}
                  <div className="rounded-[12px] border border-[#e3e5ec] bg-white p-5 shadow-xs flex flex-col gap-4">
                    <div className="flex flex-col gap-0.5">
                      <h3 className="text-[15px] font-semibold text-[#0d0d10]">
                        What each role can do · per client and per project
                      </h3>
                    </div>

                    <div className="overflow-x-auto">
                      <div className="min-w-[620px]">
                        {/* Table Header */}
                        <div className="grid grid-cols-[2fr_repeat(5,1fr)] items-center rounded-[8px] bg-[#f8f9fc] px-4 py-2.5 text-[13px] font-medium text-[#525866]">
                          <span className="text-left">Permission</span>
                          <span className="text-center">Owner</span>
                          <span className="text-center">Account manager</span>
                          <span className="text-center">Finance</span>
                          <span className="text-center">Campaign exec.</span>
                          <span className="text-center">Client guest</span>
                        </div>

                        {/* Table Rows */}
                        <div className="divide-y divide-[#f0f2f5]">
                          {PERMISSIONS_MATRIX.map((row) => (
                            <div
                              key={row.permission}
                              className="grid grid-cols-[2fr_repeat(5,1fr)] items-center px-4 py-3 text-[13px] text-[#0d0d10] hover:bg-[#fafbfd] transition-colors"
                            >
                              <span className="font-normal text-[#0d0d10]">
                                {row.permission}
                              </span>
                              <span className="text-center font-semibold text-[#0d0d10]">
                                {row.owner ? "✓" : <span className="text-[#a3a3ac] font-normal">-</span>}
                              </span>
                              <span className="text-center font-semibold text-[#0d0d10]">
                                {row.accountManager ? "✓" : <span className="text-[#a3a3ac] font-normal">-</span>}
                              </span>
                              <span className="text-center font-semibold text-[#0d0d10]">
                                {row.finance ? "✓" : <span className="text-[#a3a3ac] font-normal">-</span>}
                              </span>
                              <span className="text-center font-semibold text-[#0d0d10]">
                                {row.campaignExec ? "✓" : <span className="text-[#a3a3ac] font-normal">-</span>}
                              </span>
                              <span className="text-center font-semibold text-[#0d0d10]">
                                {row.clientGuest ? "✓" : <span className="text-[#a3a3ac] font-normal">-</span>}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 3: AG-05b · Billing & tax */}
              {activeTab === "billing" && (
                <motion.div
                  key="billing"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: easeCurve }}
                  className="rounded-[12px] border border-[#e3e5ec] bg-white p-6 flex flex-col gap-4 shadow-xs"
                >
                  <div className="border-b border-[#edeff3] pb-3">
                    <h2 className="text-[16px] font-semibold text-[#0d0d10]">
                      Billing & tax (AG-05b)
                    </h2>
                    <p className="text-[12px] text-[#71717a]">
                      Your GSTIN, invoice template, and how clients pay you (FeeRules)
                    </p>
                  </div>
                  <p className="text-[13px] text-[#71717a]">
                    Billing & tax configuration will be implemented in the AG-05b step.
                  </p>
                </motion.div>
              )}

              {/* TAB 4: AG-05c · Notifications */}
              {activeTab === "notifications" && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: easeCurve }}
                  className="rounded-[12px] border border-[#e3e5ec] bg-white p-6 flex flex-col gap-4 shadow-xs"
                >
                  <div className="border-b border-[#edeff3] pb-3">
                    <h2 className="text-[16px] font-semibold text-[#0d0d10]">
                      Notifications (AG-05c)
                    </h2>
                    <p className="text-[12px] text-[#71717a]">
                      Email, WhatsApp, and in-app alerts per client & project scope
                    </p>
                  </div>
                  <p className="text-[13px] text-[#71717a]">
                    Notification scopes will be implemented in the AG-05c step.
                  </p>
                </motion.div>
              )}

              {/* TAB 5: AG-05d · Security */}
              {activeTab === "security" && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: easeCurve }}
                  className="rounded-[12px] border border-[#e3e5ec] bg-white p-6 flex flex-col gap-4 shadow-xs"
                >
                  <div className="border-b border-[#edeff3] pb-3">
                    <h2 className="text-[16px] font-semibold text-[#0d0d10]">
                      Security
                    </h2>
                    <p className="text-[12px] text-[#71717a]">
                      Password, two-factor authentication, and connected devices
                    </p>
                  </div>
                  <p className="text-[13px] text-[#71717a]">
                    Security settings will be implemented in the security step.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Add Client Modal */}
      <AgencyAddClientModal
        isOpen={isAddClientOpen}
        onClose={() => setIsAddClientOpen(false)}
        onSuccess={() => {}}
      />

      {/* Invite / Manage Team Member Modal */}
      <AgencyInviteMemberModal
        isOpen={isInviteModalOpen}
        onClose={() => {
          setIsInviteModalOpen(false);
          setEditingMember(null);
        }}
        onSuccess={handleSaveMember}
        onRemove={handleRemoveMember}
        initialMember={editingMember}
      />
    </AgencyShell>
  );
}
