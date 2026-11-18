import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, ChevronDown, ChevronUp, UserPlus, Trash2 } from "lucide-react";

export interface TeamMemberData {
  id: string;
  name: string;
  email: string;
  role: string;
  clients: string[];
  projects: string;
  accessLevel: "view" | "edit" | "approve_content" | "approve_pay" | "full";
  lastActive?: string;
  avatarUrl?: string;
}

interface AgencyInviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (member: TeamMemberData) => void;
  onRemove?: (memberId: string) => void;
  initialMember?: TeamMemberData | null;
}

const ROLES = [
  "Owner",
  "Account manager",
  "Campaign executive",
  "Finance",
  "Content lead",
  "Client guest",
];

const AVAILABLE_CLIENTS = [
  "Minimalist",
  "Dewdrop Naturals",
  "Velvet Lip Co.",
  "Strand Studio",
  "Petal & Pine",
];

const PROJECT_OPTIONS = [
  "All projects of these clients (4 live)",
  "Diwali Campaign 2024",
  "Winter Glow Serum",
  "Matte Lip Launch",
  "Summer Essentials Promo",
];

const ACCESS_LEVELS: { id: TeamMemberData["accessLevel"]; label: string; desc: string }[] = [
  { id: "view", label: "View only", desc: "Read dashboards, projects & reports" },
  { id: "edit", label: "Edit", desc: "Brief, deliverables, creators" },
  { id: "approve_content", label: "Approve content", desc: "Approve deliverables, mark live" },
  { id: "approve_pay", label: "Approve & pay", desc: "Fund escrow, release payments, invoices" },
  { id: "full", label: "Full", desc: "Full brand management on selected clients" },
];

export function AgencyInviteMemberModal({
  isOpen,
  onClose,
  onSuccess,
  onRemove,
  initialMember,
}: AgencyInviteMemberModalProps) {
  const isEditing = Boolean(initialMember);

  const [nameAndEmail, setNameAndEmail] = useState("");
  const [role, setRole] = useState("Account manager");
  const [selectedClients, setSelectedClients] = useState<string[]>([
    "Minimalist",
    "Dewdrop Naturals",
  ]);
  const [projectOption, setProjectOption] = useState("All projects of these clients (4 live)");
  const [accessLevel, setAccessLevel] = useState<TeamMemberData["accessLevel"]>("approve_content");

  // Dropdown popover open states
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [isClientsOpen, setIsClientsOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isAccessOpen, setIsAccessOpen] = useState(false);

  const roleRef = useRef<HTMLDivElement>(null);
  const clientsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const accessRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialMember) {
      setNameAndEmail(`${initialMember.name} · ${initialMember.email}`);
      setRole(initialMember.role);
      setSelectedClients(initialMember.clients.length ? initialMember.clients : ["Minimalist"]);
      setProjectOption(initialMember.projects || "All projects of these clients (4 live)");
      setAccessLevel(initialMember.accessLevel);
    } else {
      setNameAndEmail("Meera Nair · meera@brightside.agency");
      setRole("Account manager");
      setSelectedClients(["Minimalist", "Dewdrop Naturals"]);
      setProjectOption("All projects of these clients (4 live)");
      setAccessLevel("approve_content");
    }
  }, [initialMember, isOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (roleRef.current && !roleRef.current.contains(e.target as Node)) {
        setIsRoleOpen(false);
      }
      if (clientsRef.current && !clientsRef.current.contains(e.target as Node)) {
        setIsClientsOpen(false);
      }
      if (projectsRef.current && !projectsRef.current.contains(e.target as Node)) {
        setIsProjectsOpen(false);
      }
      if (accessRef.current && !accessRef.current.contains(e.target as Node)) {
        setIsAccessOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const displayName = nameAndEmail.split("·")[0]?.trim() || "The member";
  const clientText =
    selectedClients.length > 0
      ? selectedClients.join(" and ")
      : "selected client";

  const toggleClient = (c: string) => {
    setSelectedClients((prev) =>
      prev.includes(c) ? prev.filter((item) => item !== c) : [...prev, c]
    );
  };

  const handleSend = () => {
    const parts = nameAndEmail.split("·").map((s) => s.trim());
    const memberName = parts[0] || "New Member";
    const memberEmail = parts[1] || `${memberName.toLowerCase().replace(/\s+/g, ".")}@brightside.agency`;

    onSuccess({
      id: initialMember?.id || String(Date.now()),
      name: memberName,
      email: memberEmail,
      role,
      clients: selectedClients,
      projects: projectOption,
      accessLevel,
      lastActive: initialMember?.lastActive || "Just now",
      avatarUrl: initialMember?.avatarUrl || "/assets/agency/avatars/priya_avatar.png",
    });
    onClose();
  };

  const currentAccessLabel =
    ACCESS_LEVELS.find((a) => a.id === accessLevel)?.label || "Approve content";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-[560px] rounded-[16px] bg-white p-6 shadow-2xl flex flex-col gap-5 border border-[#e3e5ec] max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-start justify-between pr-2">
          <div className="flex flex-col gap-1">
            <h2 className="text-[20px] font-semibold text-[#0d0d10] leading-snug">
              {isEditing ? "Manage team member" : "Invite a team member"}
            </h2>
            <p className="text-[13px] text-[#71717a] leading-tight">
              Give access per client and per project · you can change it any time in Team &amp; roles
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-[#71717a] hover:bg-[#f4f6fb] hover:text-[#0d0d10] transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-4">
          {/* Field 1: Name and work email */}
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-medium text-[#0d0d10]">
              Name and work email
            </label>
            <input
              type="text"
              value={nameAndEmail}
              onChange={(e) => setNameAndEmail(e.target.value)}
              placeholder="Full name · email@brightside.agency"
              className="h-10 w-full rounded-[8px] border border-[#e3e5ec] bg-white px-3.5 text-[14px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none"
            />
            <p className="text-[12px] text-[#8c94a0] leading-none mt-0.5">
              They get an email with a link · expires in 7 days
            </p>
          </div>

          {/* Field 2: Role */}
          <div className="relative flex flex-col gap-1" ref={roleRef}>
            <label className="text-[13px] font-medium text-[#0d0d10]">
              Role
            </label>
            <button
              type="button"
              onClick={() => setIsRoleOpen(!isRoleOpen)}
              className="flex h-10 w-full items-center justify-between rounded-[8px] border border-[#e3e5ec] bg-white px-3.5 text-left text-[14px] text-[#0d0d10] hover:border-[#0d0d10] transition-colors cursor-pointer"
            >
              <span>{role}</span>
              {isRoleOpen ? (
                <ChevronUp className="size-4 text-[#71717a]" />
              ) : (
                <ChevronDown className="size-4 text-[#71717a]" />
              )}
            </button>
            <p className="text-[12px] text-[#8c94a0] leading-none mt-0.5">
              Owner · Account manager · Campaign executive · Finance · Content lead · Client guest
            </p>

            {isRoleOpen && (
              <div className="absolute top-[calc(100%+4px)] left-0 z-20 w-full rounded-[10px] border border-[#e5e7eb] bg-white p-1.5 shadow-lg animate-in fade-in zoom-in-95 duration-100 flex flex-col gap-0.5">
                {ROLES.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      setRole(r);
                      setIsRoleOpen(false);
                    }}
                    className={`flex items-center justify-between px-3 py-2 text-[13px] rounded-[6px] text-left transition cursor-pointer ${
                      role === r
                        ? "bg-[#f1f4ff] font-medium text-[#0d0d10]"
                        : "text-[#0d0d10] hover:bg-[#f8f9fb]"
                    }`}
                  >
                    <span>{r}</span>
                    {role === r && <Check className="size-4 text-[#0d0d10]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Field 3: Clients */}
          <div className="relative flex flex-col gap-1" ref={clientsRef}>
            <label className="text-[13px] font-medium text-[#0d0d10]">
              Clients
            </label>
            <button
              type="button"
              onClick={() => setIsClientsOpen(!isClientsOpen)}
              className="flex h-10 w-full items-center justify-between rounded-[8px] border border-[#e3e5ec] bg-white px-3.5 text-left text-[14px] text-[#0d0d10] hover:border-[#0d0d10] transition-colors cursor-pointer"
            >
              <span className="truncate">
                {selectedClients.length > 0
                  ? selectedClients.join(", ")
                  : "Select clients"}
              </span>
              {isClientsOpen ? (
                <ChevronUp className="size-4 text-[#71717a] shrink-0" />
              ) : (
                <ChevronDown className="size-4 text-[#71717a] shrink-0" />
              )}
            </button>
            <p className="text-[12px] text-[#8c94a0] leading-none mt-0.5">
              Pick one, several or all clients · they only see the clients you choose
            </p>

            {isClientsOpen && (
              <div className="absolute top-[calc(100%+4px)] left-0 z-20 w-full rounded-[10px] border border-[#e5e7eb] bg-white p-1.5 shadow-lg animate-in fade-in zoom-in-95 duration-100 flex flex-col gap-0.5">
                {AVAILABLE_CLIENTS.map((c) => {
                  const isChecked = selectedClients.includes(c);
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => toggleClient(c)}
                      className={`flex items-center justify-between px-3 py-2 text-[13px] rounded-[6px] text-left transition cursor-pointer ${
                        isChecked
                          ? "bg-[#f1f4ff] font-medium text-[#0d0d10]"
                          : "text-[#0d0d10] hover:bg-[#f8f9fb]"
                      }`}
                    >
                      <span>{c}</span>
                      {isChecked && <Check className="size-4 text-[#0d0d10]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Field 4: Projects */}
          <div className="relative flex flex-col gap-1" ref={projectsRef}>
            <label className="text-[13px] font-medium text-[#0d0d10]">
              Projects
            </label>
            <button
              type="button"
              onClick={() => setIsProjectsOpen(!isProjectsOpen)}
              className="flex h-10 w-full items-center justify-between rounded-[8px] border border-[#e3e5ec] bg-white px-3.5 text-left text-[14px] text-[#0d0d10] hover:border-[#0d0d10] transition-colors cursor-pointer"
            >
              <span className="truncate">{projectOption}</span>
              {isProjectsOpen ? (
                <ChevronUp className="size-4 text-[#71717a] shrink-0" />
              ) : (
                <ChevronDown className="size-4 text-[#71717a] shrink-0" />
              )}
            </button>
            <p className="text-[12px] text-[#8c94a0] leading-none mt-0.5">
              All projects of the chosen client(s), or specific ones · new projects are not added automatically
            </p>

            {isProjectsOpen && (
              <div className="absolute top-[calc(100%+4px)] left-0 z-20 w-full rounded-[10px] border border-[#e5e7eb] bg-white p-1.5 shadow-lg animate-in fade-in zoom-in-95 duration-100 flex flex-col gap-0.5">
                {PROJECT_OPTIONS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setProjectOption(p);
                      setIsProjectsOpen(false);
                    }}
                    className={`flex items-center justify-between px-3 py-2 text-[13px] rounded-[6px] text-left transition cursor-pointer ${
                      projectOption === p
                        ? "bg-[#f1f4ff] font-medium text-[#0d0d10]"
                        : "text-[#0d0d10] hover:bg-[#f8f9fb]"
                    }`}
                  >
                    <span>{p}</span>
                    {projectOption === p && <Check className="size-4 text-[#0d0d10]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Field 5: Access level */}
          <div className="relative flex flex-col gap-1" ref={accessRef}>
            <label className="text-[13px] font-medium text-[#0d0d10]">
              Access level
            </label>
            <button
              type="button"
              onClick={() => setIsAccessOpen(!isAccessOpen)}
              className="flex h-10 w-full items-center justify-between rounded-[8px] border border-[#e3e5ec] bg-white px-3.5 text-left text-[14px] text-[#0d0d10] hover:border-[#0d0d10] transition-colors cursor-pointer"
            >
              <span>{currentAccessLabel}</span>
              {isAccessOpen ? (
                <ChevronUp className="size-4 text-[#71717a] shrink-0" />
              ) : (
                <ChevronDown className="size-4 text-[#71717a] shrink-0" />
              )}
            </button>
            <p className="text-[12px] text-[#8c94a0] leading-none mt-0.5">
              View only · Edit (brief, deliverables, creators) · Approve content · Approve &amp; pay (fund escrow, release payments) · Full
            </p>

            {isAccessOpen && (
              <div className="absolute top-[calc(100%+4px)] left-0 z-20 w-full rounded-[10px] border border-[#e5e7eb] bg-white p-1.5 shadow-lg animate-in fade-in zoom-in-95 duration-100 flex flex-col gap-0.5">
                {ACCESS_LEVELS.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => {
                      setAccessLevel(a.id);
                      setIsAccessOpen(false);
                    }}
                    className={`flex items-center justify-between px-3 py-2 text-[13px] rounded-[6px] text-left transition cursor-pointer ${
                      accessLevel === a.id
                        ? "bg-[#f1f4ff] font-medium text-[#0d0d10]"
                        : "text-[#0d0d10] hover:bg-[#f8f9fb]"
                    }`}
                  >
                    <div>
                      <p className="font-medium text-[#0d0d10]">{a.label}</p>
                      <p className="text-[11px] text-[#71717a]">{a.desc}</p>
                    </div>
                    {accessLevel === a.id && <Check className="size-4 text-[#0d0d10] shrink-0" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Summary Card */}
        <div className="rounded-[10px] bg-[#f4f6fb] p-4 flex flex-col gap-2">
          <h4 className="text-[13px] font-semibold text-[#0d0d10]">
            What {displayName} will be able to do
          </h4>
          <div className="flex flex-col gap-1.5 text-[13px] text-[#0d0d10]">
            <p className="flex items-center gap-2">
              <span className="text-[#0d0d10] font-bold">✓</span>
              <span>See and edit {clientText} projects</span>
            </p>
            {accessLevel !== "view" && (
              <p className="flex items-center gap-2">
                <span className="text-[#0d0d10] font-bold">✓</span>
                <span>Approve or request changes on content</span>
              </p>
            )}
            <p className="flex items-center gap-2">
              <span className="text-[#0d0d10] font-bold">✓</span>
              <span>Message creators and brands</span>
            </p>
            {accessLevel === "full" ? (
              <p className="flex items-center gap-2">
                <span className="text-[#0d0d10] font-bold">✓</span>
                <span>Fund escrow, release payments, view invoices and manage workspace</span>
              </p>
            ) : accessLevel === "approve_pay" ? (
              <p className="flex items-center gap-2">
                <span className="text-[#0d0d10] font-bold">✓</span>
                <span>Fund escrow, release payments and see client invoices</span>
              </p>
            ) : (
              <p className="flex items-center gap-2 text-[#71717a]">
                <span className="text-[#8c94a0]">✕</span>
                <span>Fund escrow, release payments, see invoices or manage the team</span>
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-1">
          {isEditing && onRemove && initialMember ? (
            <button
              type="button"
              onClick={() => {
                onRemove(initialMember.id);
                onClose();
              }}
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-rose-600 hover:text-rose-700 transition cursor-pointer"
            >
              <Trash2 size={15} />
              <span>Remove member</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[14px] font-medium text-[#0d0d10] hover:text-[#71717a] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSend}
              className="inline-flex h-10 items-center gap-2 rounded-[8px] bg-[#0d0d10] px-4 py-2 text-[14px] font-medium text-white transition hover:bg-black cursor-pointer shadow-xs"
            >
              <UserPlus size={16} />
              <span>{isEditing ? "Save changes" : "Send invite"}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
