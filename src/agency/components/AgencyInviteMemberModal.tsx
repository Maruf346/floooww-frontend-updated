import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Check, ChevronDown, UserPlus, Trash2 } from "lucide-react";

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
  "Minimalist · Vitamin-C Serum",
  "Minimalist · Glow Squad",
  "Dewdrop · Monsoon Sunscreen",
  "Velvet Lip · Lip Tint Drop",
];

const ACCESS_LEVELS: { id: TeamMemberData["accessLevel"]; label: string; desc: string }[] = [
  { id: "view", label: "View only", desc: "Read dashboards, projects & reports" },
  { id: "edit", label: "Edit (brief, deliverables, creators)", desc: "Create/edit projects & briefs" },
  { id: "approve_content", label: "Approve content", desc: "Approve deliverables, mark live" },
  { id: "approve_pay", label: "Approve & pay (fund escrow, release payments)", desc: "Fund escrow, release payouts" },
  { id: "full", label: "Full", desc: "Full management on selected clients" },
];

export function AgencyInviteMemberModal({
  isOpen,
  onClose,
  onSuccess,
  onRemove,
  initialMember,
}: AgencyInviteMemberModalProps) {
  const isEditing = Boolean(initialMember);

  const [nameAndEmail, setNameAndEmail] = useState("Meera Nair · meera@brightside.agency");
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
  const firstName = displayName.split(" ")[0] || displayName;
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
    accessLevel === "approve_content"
      ? "Approve content"
      : accessLevel === "view"
        ? "View only"
        : accessLevel === "edit"
          ? "Edit (brief, deliverables, creators)"
          : accessLevel === "approve_pay"
            ? "Approve & pay (fund escrow, release payments)"
            : "Full";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 8 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-[560px] rounded-[16px] bg-white p-[24px] shadow-[0px_12px_32px_0px_rgba(0,0,0,0.12)] flex flex-col gap-[16px] border border-[#e5e7eb] max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex flex-col gap-[4px] items-start w-full">
          <h2 className="text-[18px] font-semibold text-[#070b13] leading-tight">
            {isEditing ? "Manage team member" : "Invite a team member"}
          </h2>
          <p className="text-[13px] text-[#8491a3] font-normal leading-normal">
            Give access per client and per project · you can change it any time in Team &amp; roles
          </p>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-[16px] w-full">
          {/* Field 1: Name and work email */}
          <div className="flex flex-col gap-[6px] w-full">
            <label className="text-[12px] font-medium leading-[16px] text-[#0d0d10]">
              Name and work email
            </label>
            <input
              type="text"
              value={nameAndEmail}
              onChange={(e) => setNameAndEmail(e.target.value)}
              placeholder="Full name · email@brightside.agency"
              className="h-[40px] w-full rounded-[8px] border border-[#e3e5ec] bg-white px-[12px] text-[13px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none transition-colors"
            />
            <p className="text-[12px] text-[#a3a3ac] leading-[16px]">
              They get an email with a link · expires in 7 days
            </p>
          </div>

          {/* Field 2: Role */}
          <div className="relative flex flex-col gap-[6px] w-full" ref={roleRef}>
            <label className="text-[12px] font-medium leading-[16px] text-[#0d0d10]">
              Role
            </label>
            <button
              type="button"
              onClick={() => setIsRoleOpen(!isRoleOpen)}
              className="flex h-[40px] w-full items-center justify-between rounded-[8px] border border-[#e3e5ec] bg-white px-[12px] text-left text-[13px] text-[#0d0d10] hover:border-[#0d0d10] transition-colors cursor-pointer"
            >
              <span>{role}</span>
              <ChevronDown
                className={`size-[16px] text-[#8491a3] transition-transform duration-150 ${
                  isRoleOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <p className="text-[12px] text-[#a3a3ac] leading-[16px]">
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
          <div className="relative flex flex-col gap-[6px] w-full" ref={clientsRef}>
            <label className="text-[12px] font-medium leading-[16px] text-[#0d0d10]">
              Clients
            </label>
            <button
              type="button"
              onClick={() => setIsClientsOpen(!isClientsOpen)}
              className="flex h-[40px] w-full items-center justify-between rounded-[8px] border border-[#e3e5ec] bg-white px-[12px] text-left text-[13px] text-[#0d0d10] hover:border-[#0d0d10] transition-colors cursor-pointer"
            >
              <span className="truncate">
                {selectedClients.length > 0
                  ? selectedClients.join(", ")
                  : "Select clients"}
              </span>
              <ChevronDown
                className={`size-[16px] text-[#8491a3] shrink-0 transition-transform duration-150 ${
                  isClientsOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <p className="text-[12px] text-[#a3a3ac] leading-[16px]">
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
          <div className="relative flex flex-col gap-[6px] w-full" ref={projectsRef}>
            <label className="text-[12px] font-medium leading-[16px] text-[#0d0d10]">
              Projects
            </label>
            <button
              type="button"
              onClick={() => setIsProjectsOpen(!isProjectsOpen)}
              className="flex h-[40px] w-full items-center justify-between rounded-[8px] border border-[#e3e5ec] bg-white px-[12px] text-left text-[13px] text-[#0d0d10] hover:border-[#0d0d10] transition-colors cursor-pointer"
            >
              <span className="truncate">{projectOption}</span>
              <ChevronDown
                className={`size-[16px] text-[#8491a3] shrink-0 transition-transform duration-150 ${
                  isProjectsOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <p className="text-[12px] text-[#a3a3ac] leading-[16px]">
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
          <div className="relative flex flex-col gap-[6px] w-full" ref={accessRef}>
            <label className="text-[12px] font-medium leading-[16px] text-[#0d0d10]">
              Access level
            </label>
            <button
              type="button"
              onClick={() => setIsAccessOpen(!isAccessOpen)}
              className="flex h-[40px] w-full items-center justify-between rounded-[8px] border border-[#e3e5ec] bg-white px-[12px] text-left text-[13px] text-[#0d0d10] hover:border-[#0d0d10] transition-colors cursor-pointer"
            >
              <span>{currentAccessLabel}</span>
              <ChevronDown
                className={`size-[16px] text-[#8491a3] shrink-0 transition-transform duration-150 ${
                  isAccessOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <p className="text-[12px] text-[#a3a3ac] leading-[16px]">
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
        <div className="rounded-[10px] bg-[#f3f5f7] px-[14px] py-[12px] flex flex-col gap-[6px] text-[12px] w-full">
          <h4 className="font-semibold text-[#394357]">
            What {firstName} will be able to do
          </h4>
          <div className="flex flex-col gap-[4px] leading-normal">
            <p className="text-[#394357] whitespace-pre-wrap">
              ✓  See and edit {clientText} projects
            </p>
            {accessLevel !== "view" && (
              <p className="text-[#394357] whitespace-pre-wrap">
                ✓  Approve or request changes on content
              </p>
            )}
            <p className="text-[#394357] whitespace-pre-wrap">
              ✓  Message creators and brands
            </p>
            {accessLevel === "full" ? (
              <p className="text-[#394357] whitespace-pre-wrap">
                ✓  Fund escrow, release payments, view invoices and manage workspace
              </p>
            ) : accessLevel === "approve_pay" ? (
              <p className="text-[#394357] whitespace-pre-wrap">
                ✓  Fund escrow, release payments and see client invoices
              </p>
            ) : (
              <p className="text-[#8491a3] whitespace-pre-wrap">
                ✕  Fund escrow, release payments, see invoices or manage the team
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-1 w-full">
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

          <div className="flex items-center gap-[12px] justify-end">
            <button
              type="button"
              onClick={onClose}
              className="h-[32px] px-[12px] rounded-[8px] text-[13px] font-medium leading-[18px] text-[#0d0d10] hover:text-[#71717a] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSend}
              className="h-[40px] px-[16px] rounded-[8px] bg-[#0d0d10] hover:bg-black text-[14px] font-medium leading-[20px] text-white flex items-center gap-[8px] cursor-pointer shadow-xs transition"
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
