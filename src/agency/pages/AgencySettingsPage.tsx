import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
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
  Download,
  Plus,
  Laptop,
  Smartphone,
  Monitor,
} from "lucide-react";
import { AgencyShell } from "@/agency/components/AgencyShell";
import { AgencyAddClientModal } from "@/agency/components/AgencyAddClientModal";
import {
  AgencyInviteMemberModal,
  TeamMemberData,
} from "@/agency/components/AgencyInviteMemberModal";
import {
  AgencyFeeRuleModal,
  FeeRuleData,
} from "@/agency/components/AgencyFeeRuleModal";
import {
  AgencyBillingDetailsModal,
  BillingDetailsData,
} from "@/agency/components/AgencyBillingDetailsModal";
import {
  ChangePasswordModal,
  BackupCodesModal,
} from "@/agency/components/AgencySecurityModals";
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

const INITIAL_FEE_RULES: FeeRuleData[] = [
  {
    id: "rule-1",
    clientId: null,
    clientName: "Default fee",
    isDefault: true,
    percent: 12,
    retainer: 0,
    effectiveFrom: "Default",
    subtitle: "Applied to every client project unless a client has its own rule",
  },
  {
    id: "rule-2",
    clientId: "minimalist",
    clientName: "Minimalist",
    isDefault: false,
    percent: 10,
    retainer: 25000,
    effectiveFrom: "Jan 2026",
    subtitle: "Client-specific rule · agreed Jan 2026",
  },
];

const INITIAL_BILLING_DETAILS: BillingDetailsData = {
  legalName: "Brightside Media Pvt Ltd",
  gstin: "27AABCG1234M1Z5",
  address: "4th floor, Kamala Mills, Lower Parel, Mumbai 400013",
  placeOfSupply: "Maharashtra",
  settlementAccount: "HDFC Bank ···· 2210 · payouts every Monday",
};

interface ServiceInvoice {
  id: string;
  date: string;
  invoiceNumber: string;
  client: string;
  clientSub?: string;
  amount: string;
  status: "paid" | "overdue" | "draft" | "sent";
}

const SERVICE_INVOICES: ServiceInvoice[] = [
  {
    id: "inv-1",
    date: "26 Oct",
    invoiceNumber: "FLW-2610-0412",
    client: "Minimalist",
    amount: "₹1,20,000",
    status: "paid",
  },
  {
    id: "inv-2",
    date: "6 Oct",
    invoiceNumber: "FLW-0610-0388",
    client: "Velvet Lip Co.",
    amount: "₹25,000",
    status: "overdue",
  },
  {
    id: "inv-3",
    date: "2 Oct",
    invoiceNumber: "FLW-0210-0371",
    client: "Dewdrop Naturals",
    clientSub: "Oct",
    amount: "₹4,500",
    status: "paid",
  },
  {
    id: "inv-4",
    date: "12 Sep",
    invoiceNumber: "FLW-1209-0322",
    client: "Minimalist",
    clientSub: "-",
    amount: "₹13,800",
    status: "paid",
  },
];

interface NotificationClientProject {
  id: string;
  title: string;
  enabled: boolean;
  disabled?: boolean;
}

interface NotificationClientGroup {
  id: string;
  name: string;
  initials: string;
  roleDesc: string;
  projects: NotificationClientProject[];
}

const INITIAL_CLIENT_NOTIFICATIONS: NotificationClientGroup[] = [
  {
    id: "minimalist",
    name: "Minimalist",
    initials: "MI",
    roleDesc: "Account manager · Approve & pay",
    projects: [
      { id: "p1", title: "Vitamin-C Serum · live", enabled: true },
      { id: "p2", title: "Glow Squad · live · cycle 2 on 2 Nov", enabled: true },
      { id: "p3", title: "Monsoon Sunscreen · live", enabled: true },
      { id: "p4", title: "Skin Quiz Leads · upcoming", enabled: false },
    ],
  },
  {
    id: "dewdrop",
    name: "Dewdrop Naturals",
    initials: "DE",
    roleDesc: "Account manager · Approve & pay",
    projects: [
      { id: "p5", title: "Hydration Bundle · live", enabled: true },
      { id: "p6", title: "Night Repair Range · upcoming", enabled: false },
    ],
  },
  {
    id: "velvet",
    name: "Velvet Lip Co.",
    initials: "VE",
    roleDesc: "Viewer · Priya Sharma owns this client",
    projects: [
      { id: "p7", title: "Lip Tint Drop · live", enabled: false, disabled: true },
      { id: "p8", title: "Matte Lip Launch · offers", enabled: false, disabled: true },
    ],
  },
];

interface NotificationEventItem {
  id: string;
  title: string;
  desc: string;
  email: boolean;
  inApp: boolean;
}

interface NotificationCategoryGroup {
  category: string;
  events: NotificationEventItem[];
}

const INITIAL_EVENT_CATEGORIES: NotificationCategoryGroup[] = [
  {
    category: "Applications and invites",
    events: [
      {
        id: "e1",
        title: "New application",
        desc: "A creator applies to a client’s project",
        email: false,
        inApp: true,
      },
      {
        id: "e2",
        title: "Invite accepted or declined",
        desc: "Including counter-offers on fee",
        email: true,
        inApp: true,
      },
    ],
  },
  {
    category: "Content",
    events: [
      {
        id: "e3",
        title: "Content sent for approval",
        desc: "Drafts and files waiting for approval on any client",
        email: true,
        inApp: true,
      },
      {
        id: "e4",
        title: "Post went live",
        desc: "We checked the link works",
        email: false,
        inApp: true,
      },
      {
        id: "e5",
        title: "Deliverable is late",
        desc: "Not posted by the date you set",
        email: true,
        inApp: true,
      },
    ],
  },
  {
    category: "Shipping",
    events: [
      {
        id: "e6",
        title: "Product delivered",
        desc: "Courier or creator confirmed it",
        email: false,
        inApp: true,
      },
      {
        id: "e7",
        title: "Delivery problem",
        desc: "Returned, damaged or wrong item",
        email: true,
        inApp: true,
      },
    ],
  },
  {
    category: "Payments",
    events: [
      {
        id: "e8",
        title: "Client funded escrow",
        desc: "A client paid into escrow for a project",
        email: false,
        inApp: true,
      },
      {
        id: "e9",
        title: "Payment released to a creator",
        desc: "After the client (or you, with Approve & pay) approves",
        email: false,
        inApp: true,
      },
      {
        id: "e10",
        title: "Refund, dispute or overdue client invoice",
        desc: "Any change to client money or your service fees",
        email: true,
        inApp: true,
      },
    ],
  },
  {
    category: "Reports",
    events: [
      {
        id: "e11",
        title: "Weekly results · all clients",
        desc: "Every Monday at 9 am · one email per client plus the agency summary",
        email: false,
        inApp: false,
      },
    ],
  },
];

interface SessionDevice {
  id: string;
  name: string;
  type: "laptop" | "phone" | "desktop";
  isCurrent: boolean;
  location: string;
  lastActive: string;
}

const INITIAL_DEVICES: SessionDevice[] = [
  {
    id: "dev-1",
    name: "MacBook Pro · Chrome",
    type: "laptop",
    isCurrent: true,
    location: "Mumbai, IN",
    lastActive: "Now",
  },
  {
    id: "dev-2",
    name: "iPhone 15 · Kreyio app",
    type: "phone",
    isCurrent: false,
    location: "Mumbai, IN",
    lastActive: "2 h ago",
  },
  {
    id: "dev-3",
    name: "Windows · Edge",
    type: "desktop",
    isCurrent: false,
    location: "Pune, IN",
    lastActive: "3 days ago",
  },
];

const easeCurve = [0.22, 1, 0.36, 1] as const;

function ToggleSwitch({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${checked ? "bg-[#0d0d10]" : "bg-[#e3e5ec]"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <span
        className={`pointer-events-none inline-block size-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${checked ? "translate-x-4" : "translate-x-0.5"
          }`}
      />
    </button>
  );
}

export function AgencySettingsPage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Tab initialization based on URL query or pathname
  const initialTab: SettingsTab =
    pathname === ROUTES.agencyTeam && !searchParams.get("tab")
      ? "team"
      : ((searchParams.get("tab") as SettingsTab) || "account");

  const [activeTab, setActiveTab] = useState<SettingsTab>(initialTab);
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Team & roles state
  const [teamMembers, setTeamMembers] = useState<TeamMemberData[]>(INITIAL_TEAM_MEMBERS);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMemberData | null>(null);

  // Billing & tax state
  const [feeRules, setFeeRules] = useState<FeeRuleData[]>(INITIAL_FEE_RULES);
  const [isFeeRuleModalOpen, setIsFeeRuleModalOpen] = useState(false);
  const [editingFeeRule, setEditingFeeRule] = useState<FeeRuleData | null>(null);

  const [billingDetails, setBillingDetails] = useState<BillingDetailsData>(INITIAL_BILLING_DETAILS);
  const [isBillingModalOpen, setIsBillingModalOpen] = useState(false);

  // Notifications state
  const [clientNotifications, setClientNotifications] = useState<NotificationClientGroup[]>(
    INITIAL_CLIENT_NOTIFICATIONS
  );
  const [eventCategories, setEventCategories] = useState<NotificationCategoryGroup[]>(
    INITIAL_EVENT_CATEGORIES
  );
  const [clientFilter, setClientFilter] = useState<"only_my" | "all">("only_my");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Security state
  const [devices, setDevices] = useState<SessionDevice[]>(INITIAL_DEVICES);
  const [requireTwoStepWorkspace, setRequireTwoStepWorkspace] = useState(true);
  const [askTwoStepHighPayments, setAskTwoStepHighPayments] = useState(true);
  const [holdNewPaymentMethods, setHoldNewPaymentMethods] = useState(true);
  const [emailNewDeviceSignIns, setEmailNewDeviceSignIns] = useState(true);

  // Security modals
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isBackupCodesOpen, setIsBackupCodesOpen] = useState(false);

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
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pathname === ROUTES.agencyTeam && !searchParams.get("tab")) {
      setActiveTab("team");
    } else {
      const tabParam = searchParams.get("tab") as SettingsTab;
      if (tabParam && ["account", "team", "billing", "notifications", "security"].includes(tabParam)) {
        setActiveTab(tabParam);
      }
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSelectTab = (tab: SettingsTab) => {
    setActiveTab(tab);
    if (pathname === ROUTES.agencyTeam) {
      navigate(`${ROUTES.agencySettings}?tab=${tab}`, { replace: true });
    } else {
      setSearchParams({ tab }, { replace: true });
    }
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

  const handleSaveFeeRule = (rule: FeeRuleData) => {
    if (editingFeeRule) {
      setFeeRules((prev) =>
        prev.map((r) => (r.id === rule.id ? { ...r, ...rule } : r))
      );
      showToast(`${rule.clientName} fee rule updated.`);
    } else {
      setFeeRules((prev) => [...prev, rule]);
      showToast(`New fee rule added for ${rule.clientName}.`);
    }
  };

  const handleDeleteFeeRule = (ruleId: string) => {
    setFeeRules((prev) => prev.filter((r) => r.id !== ruleId));
    showToast("Fee rule removed.");
  };

  const handleSaveBillingDetails = (details: BillingDetailsData) => {
    setBillingDetails(details);
    showToast("Billing details updated successfully.");
  };

  const handleDownloadInvoice = (invNum: string) => {
    showToast(`Downloading invoice ${invNum}.pdf`);
  };

  const handleDownloadAllInvoices = () => {
    showToast("Downloading all service-fee invoices (ZIP)...");
  };

  // Notification toggles
  const toggleProjectNotification = (groupId: string, projectId: string) => {
    setClientNotifications((prev) =>
      prev.map((g) => {
        if (g.id !== groupId) return g;
        return {
          ...g,
          projects: g.projects.map((p) => {
            if (p.id !== projectId || p.disabled) return p;
            return { ...p, enabled: !p.enabled };
          }),
        };
      })
    );
  };

  const toggleEventNotification = (eventId: string, channel: "email" | "inApp") => {
    setEventCategories((prev) =>
      prev.map((cat) => ({
        ...cat,
        events: cat.events.map((ev) => {
          if (ev.id !== eventId) return ev;
          return { ...ev, [channel]: !ev[channel] };
        }),
      }))
    );
  };

  const handleSignOutDevice = (id: string, name: string) => {
    setDevices((prev) => prev.filter((d) => d.id !== id));
    showToast(`Signed out of ${name}.`);
  };

  const handleSignOutAllOthers = () => {
    setDevices((prev) => prev.filter((d) => d.isCurrent));
    showToast("Signed out of all other devices.");
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
            Brightside Agency workspace
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
                  onClick={(e) => {
                    e.preventDefault();
                    handleSelectTab(tab.id as SettingsTab);
                  }}
                  className={`w-full text-left rounded-[8px] px-3 py-2.5 transition cursor-pointer select-none ${isActive
                      ? "bg-[#f1f4ff] text-[#0d0d10]"
                      : "hover:bg-[#f8f9fb] text-[#0d0d10]"
                    }`}
                >
                  <p
                    className={`text-[14px] leading-snug ${isActive ? "font-medium text-[#0d0d10]" : "font-normal text-[#0d0d10]"
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
                          className={`flex h-10 w-full items-center justify-between rounded-[8px] bg-white px-3 text-left transition cursor-pointer ${isServicesOpen
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
                                  className={`flex w-full items-center justify-between rounded-[6px] px-3 py-2 text-left text-[13px] transition cursor-pointer ${isSelected
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
                  className="flex flex-col gap-6"
                >
                  {/* Top Row: 2 Cards */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    {/* Left Card: How clients pay you */}
                    <div className="rounded-[12px] border border-[#e3e5ec] bg-white p-5 flex flex-col justify-between shadow-xs">
                      <div>
                        {/* Card Head */}
                        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#edeff3]">
                          <div className="flex flex-col gap-1 min-w-0">
                            <h2 className="text-[16px] font-semibold text-[#0d0d10] leading-snug">
                              How clients pay you
                            </h2>
                            <p className="text-[12px] text-[#71717a] leading-tight">
                              Your agency service fee · invoiced monthly per client · Kreyio collects it with the client’s project payments or you invoice directly
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingFeeRule(null);
                              setIsFeeRuleModalOpen(true);
                            }}
                            className="inline-flex h-8 items-center gap-1 rounded-[8px] border border-[#e3e5ec] bg-white px-3 text-[13px] font-medium text-[#0d0d10] transition hover:border-[#0d0d10] shrink-0 cursor-pointer"
                          >
                            <Plus size={14} />
                            <span>Add fee rule</span>
                          </button>
                        </div>

                        {/* Rules List */}
                        <div className="divide-y divide-[#f0f2f5]">
                          {feeRules.map((rule) => (
                            <div
                              key={rule.id}
                              className="py-3.5 flex items-start justify-between gap-4"
                            >
                              <div className="flex flex-col gap-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-[13px] font-medium text-[#0d0d10]">
                                    {rule.isDefault
                                      ? `Default fee · ${rule.percent}% of creator fees`
                                      : `${rule.clientName} · ${rule.percent}% of creator fees${rule.retainer
                                        ? ` + ₹${rule.retainer.toLocaleString("en-IN")} retainer`
                                        : ""
                                      }`}
                                  </span>
                                  {rule.isDefault && (
                                    <span className="inline-flex items-center rounded-full bg-[#f1f4ff] px-2 py-0.5 text-[11px] font-medium text-[#3b5bff]">
                                      Default
                                    </span>
                                  )}
                                </div>
                                <p className="text-[12px] text-[#71717a] leading-normal">
                                  {rule.subtitle}
                                </p>
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  setEditingFeeRule(rule);
                                  setIsFeeRuleModalOpen(true);
                                }}
                                className="text-[13px] font-medium text-[#3b5bff] hover:underline cursor-pointer shrink-0 pt-0.5"
                              >
                                Edit
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Card: Your billing details */}
                    <div className="rounded-[12px] border border-[#e3e5ec] bg-white p-5 flex flex-col justify-between shadow-xs">
                      <div>
                        {/* Card Head */}
                        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#edeff3]">
                          <div className="flex flex-col gap-1 min-w-0">
                            <h2 className="text-[16px] font-semibold text-[#0d0d10] leading-snug">
                              Your billing details
                            </h2>
                            <p className="text-[12px] text-[#71717a] leading-tight">
                              Printed on every service-fee invoice you send to clients
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setIsBillingModalOpen(true)}
                            className="inline-flex h-8 items-center rounded-[8px] border border-[#e3e5ec] bg-white px-3 text-[13px] font-medium text-[#0d0d10] transition hover:border-[#0d0d10] shrink-0 cursor-pointer"
                          >
                            Edit
                          </button>
                        </div>

                        {/* Key-Value Pairs */}
                        <div className="divide-y divide-[#f0f2f5] text-[13px]">
                          <div className="py-2.5 flex items-start gap-4">
                            <span className="w-[130px] shrink-0 text-[#8c94a0] font-normal">
                              Legal name
                            </span>
                            <span className="font-normal text-[#0d0d10]">
                              {billingDetails.legalName}
                            </span>
                          </div>

                          <div className="py-2.5 flex items-start gap-4">
                            <span className="w-[130px] shrink-0 text-[#8c94a0] font-normal">
                              GSTIN
                            </span>
                            <span className="font-normal text-[#0d0d10]">
                              {billingDetails.gstin}
                            </span>
                          </div>

                          <div className="py-2.5 flex items-start gap-4">
                            <span className="w-[130px] shrink-0 text-[#8c94a0] font-normal">
                              Address
                            </span>
                            <span className="font-normal text-[#0d0d10] leading-relaxed">
                              {billingDetails.address}
                            </span>
                          </div>

                          <div className="py-2.5 flex items-start gap-4">
                            <span className="w-[130px] shrink-0 text-[#8c94a0] font-normal">
                              Place of supply
                            </span>
                            <span className="font-normal text-[#0d0d10]">
                              {billingDetails.placeOfSupply}
                            </span>
                          </div>

                          <div className="py-2.5 flex items-start gap-4">
                            <span className="w-[130px] shrink-0 text-[#8c94a0] font-normal">
                              Settlement account
                            </span>
                            <span className="font-normal text-[#0d0d10]">
                              {billingDetails.settlementAccount}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Card: Service-fee invoices to clients */}
                  <div className="rounded-[12px] border border-[#e3e5ec] bg-white p-5 flex flex-col gap-4 shadow-xs">
                    {/* Head */}
                    <div className="flex items-center justify-between pb-3 border-b border-[#edeff3]">
                      <div className="flex flex-col gap-0.5">
                        <h3 className="text-[16px] font-semibold text-[#0d0d10]">
                          Service-fee invoices to clients
                        </h3>
                        <p className="text-[12px] text-[#71717a]">
                          One GST invoice per payment · Kreyio charges brands nothing
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleDownloadAllInvoices}
                        className="inline-flex h-8 items-center gap-1.5 rounded-[8px] border border-[#e3e5ec] bg-white px-3.5 text-[13px] font-medium text-[#0d0d10] transition hover:border-[#0d0d10] cursor-pointer"
                      >
                        <Download size={14} />
                        <span>Download all</span>
                      </button>
                    </div>

                    {/* Invoices Table */}
                    <div className="overflow-x-auto">
                      <div className="min-w-[700px]">
                        {/* Table Header */}
                        <div className="grid grid-cols-[1.1fr_1.4fr_1.8fr_1.2fr_1.1fr_1fr] items-center rounded-[8px] bg-[#f8f9fc] px-4 py-2.5 text-[12px] font-semibold text-[#525866] uppercase tracking-wider">
                          <span>DATE</span>
                          <span>INVOICE</span>
                          <span>CLIENT</span>
                          <span>AMOUNT</span>
                          <span>STATUS</span>
                          <span className="text-right" />
                        </div>

                        {/* Table Rows */}
                        <div className="divide-y divide-[#f0f2f5]">
                          {SERVICE_INVOICES.map((inv) => (
                            <div
                              key={inv.id}
                              className="grid grid-cols-[1.1fr_1.4fr_1.8fr_1.2fr_1.1fr_1fr] items-center px-4 py-3 text-[13px] text-[#0d0d10] hover:bg-[#fafbfd] transition-colors"
                            >
                              {/* Date */}
                              <span className="font-normal text-[#0d0d10]">
                                {inv.date}
                              </span>

                              {/* Invoice Number */}
                              <span className="font-normal text-[#0d0d10]">
                                {inv.invoiceNumber}
                              </span>

                              {/* Client */}
                              <div className="flex flex-col min-w-0 pr-2">
                                <span className="font-normal text-[#0d0d10] truncate">
                                  {inv.client}
                                </span>
                                {inv.clientSub && (
                                  <span className="text-[11px] text-[#71717a] leading-none">
                                    {inv.clientSub}
                                  </span>
                                )}
                              </div>

                              {/* Amount */}
                              <span className="font-normal text-[#0d0d10]">
                                {inv.amount}
                              </span>

                              {/* Status Badge */}
                              <div>
                                {inv.status === "paid" ? (
                                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e8fbf0] px-2.5 py-0.5 text-[12px] font-medium text-[#059669]">
                                    <span className="size-1.5 rounded-full bg-[#059669]" />
                                    Paid
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fef2f2] px-2.5 py-0.5 text-[12px] font-medium text-[#dc2626]">
                                    <span className="size-1.5 rounded-full bg-[#dc2626]" />
                                    Overdue
                                  </span>
                                )}
                              </div>

                              {/* Action: Download */}
                              <div className="text-right">
                                <button
                                  type="button"
                                  onClick={() => handleDownloadInvoice(inv.invoiceNumber)}
                                  className="text-[13px] font-medium text-[#3b5bff] hover:underline cursor-pointer"
                                >
                                  Download
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
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
                  className="flex flex-col gap-6"
                >
                  {/* Card 1: My clients and projects */}
                  <div className="rounded-[12px] border border-[#e3e5ec] bg-white p-5 flex flex-col gap-4 shadow-xs">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 pb-3 border-b border-[#edeff3]">
                      <div className="flex flex-col gap-1 min-w-0">
                        <h2 className="text-[16px] font-semibold text-[#0d0d10]">
                          My clients and projects
                        </h2>
                        <p className="text-[12px] text-[#71717a] leading-tight">
                          Rahul Verma · you manage 2 clients · 4 live projects · choose what notifies you; access itself is set in Team &amp; roles
                        </p>
                      </div>

                      {/* Dropdown filter */}
                      <div className="relative shrink-0" ref={filterDropdownRef}>
                        <button
                          type="button"
                          onClick={() => setIsFilterOpen(!isFilterOpen)}
                          className="inline-flex items-center gap-1 text-[13px] font-medium text-[#3b5bff] hover:underline cursor-pointer"
                        >
                          <span>
                            {clientFilter === "only_my"
                              ? "Only my clients ▾"
                              : "All agency clients ▾"}
                          </span>
                        </button>

                        {isFilterOpen && (
                          <div className="absolute right-0 top-[calc(100%+6px)] z-30 w-44 rounded-[8px] border border-[#e5e7eb] bg-white p-1 shadow-lg animate-in fade-in duration-100 flex flex-col gap-0.5">
                            <button
                              type="button"
                              onClick={() => {
                                setClientFilter("only_my");
                                setIsFilterOpen(false);
                              }}
                              className={`flex w-full items-center justify-between px-3 py-1.5 text-[12px] rounded text-left transition cursor-pointer ${clientFilter === "only_my"
                                  ? "bg-[#f1f4ff] font-medium text-[#0d0d10]"
                                  : "text-[#0d0d10] hover:bg-[#f8f9fb]"
                                }`}
                            >
                              <span>Only my clients</span>
                              {clientFilter === "only_my" && <Check className="size-3.5" />}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setClientFilter("all");
                                setIsFilterOpen(false);
                              }}
                              className={`flex w-full items-center justify-between px-3 py-1.5 text-[12px] rounded text-left transition cursor-pointer ${clientFilter === "all"
                                  ? "bg-[#f1f4ff] font-medium text-[#0d0d10]"
                                  : "text-[#0d0d10] hover:bg-[#f8f9fb]"
                                }`}
                            >
                              <span>All agency clients</span>
                              {clientFilter === "all" && <Check className="size-3.5" />}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Client Project Groups */}
                    <div className="flex flex-col gap-5 pt-1">
                      {clientNotifications.map((group) => (
                        <div key={group.id} className="flex flex-col gap-2.5">
                          {/* Client Title Row */}
                          <div className="flex items-center gap-2">
                            <div className="size-6 rounded-full bg-[#f1f4ff] text-[#3b5bff] text-[11px] font-semibold flex items-center justify-center shrink-0">
                              {group.initials}
                            </div>
                            <span className="text-[13px] font-semibold text-[#0d0d10]">
                              {group.name}
                            </span>
                            <span className="text-[12px] text-[#71717a]">
                              {group.roleDesc}
                            </span>
                          </div>

                          {/* Projects Checklist */}
                          <div className="flex flex-col gap-2 pl-8">
                            {group.projects.map((project) => (
                              <label
                                key={project.id}
                                className={`flex items-center gap-2.5 text-[13px] select-none ${project.disabled
                                    ? "opacity-50 cursor-not-allowed text-[#8c94a0]"
                                    : "cursor-pointer text-[#0d0d10] hover:text-black"
                                  }`}
                              >
                                <button
                                  type="button"
                                  disabled={project.disabled}
                                  onClick={() =>
                                    toggleProjectNotification(group.id, project.id)
                                  }
                                  className={`size-4 rounded-[4px] flex items-center justify-center transition-colors shrink-0 ${project.enabled
                                      ? "bg-[#0d0d10] text-white"
                                      : "border border-[#d1d5db] bg-white hover:border-[#0d0d10]"
                                    }`}
                                >
                                  {project.enabled && (
                                    <Check className="size-3 text-white stroke-[3]" />
                                  )}
                                </button>
                                <span className={project.enabled ? "text-[#0d0d10]" : "text-[#71717a]"}>
                                  {project.title}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Explanatory Note */}
                    <div className="border-t border-[#f0f2f5] pt-3 mt-1">
                      <p className="text-[12px] text-[#8c94a0] leading-relaxed">
                        New projects on a client you manage are added automatically. Members with access to one project only see that project everywhere, Overview, Clients, Custom reports and notifications.
                      </p>
                    </div>
                  </div>

                  {/* Card 2: Notifications Event Table */}
                  <div className="rounded-[12px] border border-[#e3e5ec] bg-white p-5 flex flex-col gap-4 shadow-xs">
                    {/* Header */}
                    <div className="flex flex-col gap-0.5 pb-2 border-b border-[#edeff3]">
                      <h3 className="text-[16px] font-semibold text-[#0d0d10]">
                        Notifications
                      </h3>
                      <p className="text-[12px] text-[#71717a]">
                        Per client or for all clients · account managers get their clients only
                      </p>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                      <div className="min-w-[620px] flex flex-col">
                        {/* Header Row */}
                        <div className="grid grid-cols-[1fr_80px_80px] items-center rounded-[8px] bg-[#f8f9fc] px-4 py-2 text-[12px] font-semibold text-[#525866] uppercase tracking-wider">
                          <span>EVENT</span>
                          <span className="text-center">EMAIL</span>
                          <span className="text-center">IN APP</span>
                        </div>

                        {/* Category Groups */}
                        <div className="divide-y divide-[#f0f2f5]">
                          {eventCategories.map((cat) => (
                            <div key={cat.category} className="py-2.5 flex flex-col">
                              {/* Category Title */}
                              <div className="px-4 py-1 text-[13px] font-semibold text-[#0d0d10]">
                                {cat.category}
                              </div>

                              {/* Category Event Rows */}
                              <div className="flex flex-col">
                                {cat.events.map((ev) => (
                                  <div
                                    key={ev.id}
                                    className="grid grid-cols-[1fr_80px_80px] items-center px-4 py-2.5 hover:bg-[#fafbfd] transition-colors rounded-md"
                                  >
                                    {/* Event Title & Desc */}
                                    <div className="flex flex-col min-w-0 pr-4">
                                      <span className="text-[13px] font-medium text-[#0d0d10] leading-snug">
                                        {ev.title}
                                      </span>
                                      <span className="text-[12px] text-[#71717a] leading-tight">
                                        {ev.desc}
                                      </span>
                                    </div>

                                    {/* Email Toggle */}
                                    <div className="flex justify-center">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          toggleEventNotification(ev.id, "email")
                                        }
                                        className={`size-4 rounded-[4px] flex items-center justify-center transition-colors cursor-pointer ${ev.email
                                            ? "bg-[#0d0d10] text-white"
                                            : "border border-[#d1d5db] bg-white hover:border-[#0d0d10]"
                                          }`}
                                      >
                                        {ev.email && (
                                          <Check className="size-3 text-white stroke-[3]" />
                                        )}
                                      </button>
                                    </div>

                                    {/* In App Toggle */}
                                    <div className="flex justify-center">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          toggleEventNotification(ev.id, "inApp")
                                        }
                                        className={`size-4 rounded-[4px] flex items-center justify-center transition-colors cursor-pointer ${ev.inApp
                                            ? "bg-[#0d0d10] text-white"
                                            : "border border-[#d1d5db] bg-white hover:border-[#0d0d10]"
                                          }`}
                                      >
                                        {ev.inApp && (
                                          <Check className="size-3 text-white stroke-[3]" />
                                        )}
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
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
                  className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-6 items-start"
                >
                    {/* LEFT COLUMN */}
                    <div className="flex flex-col gap-6">
                      {/* Card 1: Sign in */}
                      <div className="rounded-[12px] border border-[#e3e5ec] bg-white p-5 flex flex-col gap-3 shadow-xs">
                        {/* Head */}
                        <div className="flex flex-col gap-0.5 pb-2 border-b border-[#edeff3]">
                          <h2 className="text-[16px] font-semibold text-[#0d0d10]">
                            Sign in
                          </h2>
                          <p className="text-[12px] text-[#71717a]">
                            How you get into Kreyio
                          </p>
                        </div>

                        {/* Rows */}
                        <div className="divide-y divide-[#f0f2f5] text-[13px]">
                          <div className="py-2.5 flex items-center justify-between gap-4">
                            <span className="w-28 shrink-0 text-[#8c94a0]">
                              Email
                            </span>
                            <span className="flex-1 font-normal text-[#0d0d10] truncate">
                              rahul@brightside.agency
                            </span>
                            <button
                              type="button"
                              onClick={() => showToast("Email change verification sent.")}
                              className="text-[#3b5bff] font-medium hover:underline cursor-pointer shrink-0"
                            >
                              Change
                            </button>
                          </div>

                          <div className="py-2.5 flex items-center justify-between gap-4">
                            <span className="w-28 shrink-0 text-[#8c94a0]">
                              Password
                            </span>
                            <span className="flex-1 font-normal text-[#0d0d10] truncate">
                              Last changed 14 Aug 2026
                            </span>
                            <button
                              type="button"
                              onClick={() => setIsChangePasswordOpen(true)}
                              className="text-[#3b5bff] font-medium hover:underline cursor-pointer shrink-0"
                            >
                              Change
                            </button>
                          </div>

                          <div className="py-2.5 flex items-center justify-between gap-4">
                            <span className="w-28 shrink-0 text-[#8c94a0]">
                              Google sign-in
                            </span>
                            <span className="flex-1 font-normal text-[#0d0d10] truncate">
                              Connected · rahul@brightside.agency
                            </span>
                            <button
                              type="button"
                              onClick={() => showToast("Google account disconnected.")}
                              className="text-[#3b5bff] font-medium hover:underline cursor-pointer shrink-0"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Card 2: Two-step verification */}
                      <div className="rounded-[12px] border border-[#e3e5ec] bg-white p-5 flex flex-col gap-3 shadow-xs">
                        {/* Head */}
                        <div className="flex items-start justify-between pb-2 border-b border-[#edeff3]">
                          <div className="flex flex-col gap-0.5">
                            <h2 className="text-[16px] font-semibold text-[#0d0d10]">
                              Two-step verification
                            </h2>
                            <p className="text-[12px] text-[#71717a]">
                              A code from your phone each time you sign in
                            </p>
                          </div>
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e8fbf0] px-2.5 py-0.5 text-[12px] font-medium text-[#059669]">
                            <span className="size-1.5 rounded-full bg-[#059669]" />
                            On
                          </span>
                        </div>

                        {/* Rows */}
                        <div className="divide-y divide-[#f0f2f5] text-[13px]">
                          <div className="py-2.5 flex items-center justify-between gap-4">
                            <span className="w-28 shrink-0 text-[#8c94a0]">
                              Method
                            </span>
                            <span className="flex-1 font-normal text-[#0d0d10] truncate">
                              Authenticator app · set up 12 Mar 2026
                            </span>
                            <button
                              type="button"
                              onClick={() => showToast("Authenticator app settings opened.")}
                              className="text-[#3b5bff] font-medium hover:underline cursor-pointer shrink-0"
                            >
                              Change
                            </button>
                          </div>

                          <div className="py-2.5 flex items-center justify-between gap-4">
                            <span className="w-28 shrink-0 text-[#8c94a0]">
                              Backup codes
                            </span>
                            <span className="flex-1 font-normal text-[#0d0d10] truncate">
                              8 of 10 left
                            </span>
                            <button
                              type="button"
                              onClick={() => setIsBackupCodesOpen(true)}
                              className="text-[#3b5bff] font-medium hover:underline cursor-pointer shrink-0"
                            >
                              View codes
                            </button>
                          </div>

                          {/* Bottom toggle */}
                          <div className="pt-3 pb-1 flex items-center justify-between gap-4">
                            <span className="text-[13px] text-[#0d0d10] font-normal">
                              Require two-step for everyone in this workspace
                            </span>
                            <ToggleSwitch
                              checked={requireTwoStepWorkspace}
                              onChange={(val) => {
                                setRequireTwoStepWorkspace(val);
                                showToast(
                                  val
                                    ? "Two-step verification required for all members."
                                    : "Two-step workspace requirement disabled."
                                );
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Card 3: Where you're signed in */}
                      <div className="rounded-[12px] border border-[#e3e5ec] bg-white p-5 flex flex-col gap-4 shadow-xs">
                        {/* Head */}
                        <div className="flex items-start justify-between pb-2 border-b border-[#edeff3]">
                          <div className="flex flex-col gap-0.5">
                            <h2 className="text-[16px] font-semibold text-[#0d0d10]">
                              Where you’re signed in
                            </h2>
                            <p className="text-[12px] text-[#71717a]">
                              Sign out anything you don’t recognise
                            </p>
                          </div>
                          {devices.some((d) => !d.isCurrent) && (
                            <button
                              type="button"
                              onClick={handleSignOutAllOthers}
                              className="inline-flex h-8 items-center rounded-[8px] border border-[#e3e5ec] bg-white px-3 text-[13px] font-medium text-[#0d0d10] transition hover:border-[#0d0d10] shrink-0 cursor-pointer"
                            >
                              Sign out all others
                            </button>
                          )}
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                          <div className="min-w-[460px]">
                            {/* Table Header */}
                            <div className="grid grid-cols-[1.8fr_1fr_1fr_auto] items-center rounded-[8px] bg-[#f8f9fc] px-3.5 py-2 text-[12px] font-semibold text-[#525866] uppercase tracking-wider">
                              <span>DEVICE</span>
                              <span>LOCATION</span>
                              <span>LAST ACTIVE</span>
                              <span className="w-16" />
                            </div>

                            {/* Rows */}
                            <div className="divide-y divide-[#f0f2f5]">
                              {devices.map((dev) => (
                                <div
                                  key={dev.id}
                                  className="grid grid-cols-[1.8fr_1fr_1fr_auto] items-center px-3.5 py-3 text-[13px] hover:bg-[#fafbfd] transition-colors"
                                >
                                  {/* Device info */}
                                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                                    <div className="text-[#71717a] shrink-0">
                                      {dev.type === "laptop" && <Laptop size={16} />}
                                      {dev.type === "phone" && <Smartphone size={16} />}
                                      {dev.type === "desktop" && <Monitor size={16} />}
                                    </div>
                                    <span className="font-normal text-[#0d0d10] truncate">
                                      {dev.name}
                                    </span>
                                    {dev.isCurrent && (
                                      <span className="inline-flex items-center rounded-full bg-[#f1f4ff] px-2 py-0.5 text-[11px] font-medium text-[#3b5bff] shrink-0">
                                        This device
                                      </span>
                                    )}
                                  </div>

                                  {/* Location */}
                                  <span className="font-normal text-[#0d0d10]">
                                    {dev.location}
                                  </span>

                                  {/* Last Active */}
                                  <span className="font-normal text-[#0d0d10]">
                                    {dev.lastActive}
                                  </span>

                                  {/* Action */}
                                  <div className="w-16 text-right">
                                    {!dev.isCurrent && (
                                      <button
                                        type="button"
                                        onClick={() => handleSignOutDevice(dev.id, dev.name)}
                                        className="text-[13px] font-medium text-[#3b5bff] hover:underline cursor-pointer"
                                      >
                                        Sign out
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="flex flex-col gap-6">
                      {/* Card 4: Payment safety */}
                      <div className="rounded-[12px] border border-[#e3e5ec] bg-white p-5 flex flex-col gap-3.5 shadow-xs">
                        {/* Head */}
                        <div className="flex flex-col gap-0.5 pb-2 border-b border-[#edeff3]">
                          <h2 className="text-[16px] font-semibold text-[#0d0d10]">
                            Payment safety
                          </h2>
                          <p className="text-[12px] text-[#71717a]">
                            Extra checks before money moves
                          </p>
                        </div>

                        {/* Toggles */}
                        <div className="flex flex-col gap-3 pt-1">
                          <div className="flex items-start justify-between gap-3">
                            <span className="text-[13px] text-[#0d0d10] font-normal leading-snug">
                              Ask for a two-step code on payments over ₹50,000
                            </span>
                            <ToggleSwitch
                              checked={askTwoStepHighPayments}
                              onChange={(val) => {
                                setAskTwoStepHighPayments(val);
                                showToast(val ? "Payment 2FA threshold active." : "Payment 2FA threshold turned off.");
                              }}
                            />
                          </div>

                          <div className="flex items-start justify-between gap-3">
                            <span className="text-[13px] text-[#0d0d10] font-normal leading-snug">
                              New payment methods wait 24 h before first use
                            </span>
                            <ToggleSwitch
                              checked={holdNewPaymentMethods}
                              onChange={(val) => {
                                setHoldNewPaymentMethods(val);
                                showToast(val ? "24h new payment method hold enabled." : "24h new payment hold disabled.");
                              }}
                            />
                          </div>
                        </div>

                        {/* Note */}
                        <div className="border-t border-[#f0f2f5] pt-2.5 mt-1">
                          <p className="text-[12px] text-[#8c94a0]">
                            Works with access levels in Team &amp; roles.
                          </p>
                        </div>
                      </div>

                      {/* Card 5: Sign-in alerts */}
                      <div className="rounded-[12px] border border-[#e3e5ec] bg-white p-5 flex flex-col gap-3.5 shadow-xs">
                        {/* Head */}
                        <div className="flex flex-col gap-0.5 pb-2 border-b border-[#edeff3]">
                          <h2 className="text-[16px] font-semibold text-[#0d0d10]">
                            Sign-in alerts
                          </h2>
                          <p className="text-[12px] text-[#71717a]">
                            Know when someone signs in
                          </p>
                        </div>

                        <div className="flex items-start justify-between gap-3 pt-1">
                          <span className="text-[13px] text-[#0d0d10] font-normal leading-snug">
                            Email me about sign-ins from a new device
                          </span>
                          <ToggleSwitch
                            checked={emailNewDeviceSignIns}
                            onChange={(val) => {
                              setEmailNewDeviceSignIns(val);
                              showToast(val ? "New device sign-in alerts enabled." : "New device alerts disabled.");
                            }}
                          />
                        </div>
                      </div>

                      {/* Card 6: Recent activity */}
                      <div className="rounded-[12px] border border-[#e3e5ec] bg-white p-5 flex flex-col gap-3.5 shadow-xs">
                        {/* Head */}
                        <div className="flex items-start justify-between pb-2 border-b border-[#edeff3]">
                          <div className="flex flex-col gap-0.5">
                            <h2 className="text-[16px] font-semibold text-[#0d0d10]">
                              Recent activity
                            </h2>
                            <p className="text-[12px] text-[#71717a]">
                              Last 7 days in this workspace
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => showToast("Full activity audit log opened.")}
                            className="text-[13px] font-medium text-[#3b5bff] hover:underline cursor-pointer"
                          >
                            View all
                          </button>
                        </div>

                        {/* Activity items */}
                        <div className="divide-y divide-[#f0f2f5] text-[13px]">
                          <div className="py-2.5 flex items-start gap-4">
                            <span className="w-24 shrink-0 text-[#8c94a0] font-normal">
                              28 Oct, 10:12
                            </span>
                            <span className="font-normal text-[#0d0d10] leading-snug">
                              Rahul added client Petal &amp; Pine
                            </span>
                          </div>

                          <div className="py-2.5 flex items-start gap-4">
                            <span className="w-24 shrink-0 text-[#8c94a0] font-normal">
                              27 Oct, 18:40
                            </span>
                            <span className="font-normal text-[#0d0d10] leading-snug">
                              Priya changed Minimalist’s fee rule
                            </span>
                          </div>

                          <div className="py-2.5 flex items-start gap-4">
                            <span className="w-24 shrink-0 text-[#8c94a0] font-normal">
                              26 Oct, 09:05
                            </span>
                            <span className="font-normal text-[#0d0d10] leading-snug">
                              New sign-in · iPhone 15 · Mumbai
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
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
        onSuccess={() => { }}
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

      {/* Add / Edit Fee Rule Modal */}
      <AgencyFeeRuleModal
        isOpen={isFeeRuleModalOpen}
        onClose={() => {
          setIsFeeRuleModalOpen(false);
          setEditingFeeRule(null);
        }}
        onSave={handleSaveFeeRule}
        onDelete={handleDeleteFeeRule}
        initialRule={editingFeeRule}
      />

      {/* Edit Billing Details Modal */}
      <AgencyBillingDetailsModal
        isOpen={isBillingModalOpen}
        onClose={() => setIsBillingModalOpen(false)}
        onSave={handleSaveBillingDetails}
        initialDetails={billingDetails}
      />

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
        onSuccess={() => showToast("Password changed successfully.")}
      />

      {/* Backup Codes Modal */}
      <BackupCodesModal
        isOpen={isBackupCodesOpen}
        onClose={() => setIsBackupCodesOpen(false)}
        onCopied={() => showToast("Backup codes copied to clipboard.")}
      />
    </AgencyShell>
  );
}
