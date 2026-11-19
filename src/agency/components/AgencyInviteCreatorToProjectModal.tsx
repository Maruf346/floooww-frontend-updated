import { useState } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { agencyClientNewProjectRoute } from "@/common/constants/routes";

export type ProjectOption = {
  id: number;
  name: string;
  type: string;
  partnership: string;
  duration: string;
  note: string;
  statusBadge: "Applied" | "Live" | "Upcoming" | "Draft";
  badgeTone: string;
  isDraft?: boolean;
};

const defaultProjects: ProjectOption[] = [
  {
    id: 1,
    name: "Vitamin-C Serum",
    type: "Influencer",
    partnership: "Paid",
    duration: "One-time",
    note: "She applied to this one · ends 7 Nov",
    statusBadge: "Applied",
    badgeTone: "bg-[rgba(59,91,255,0.12)] text-[#3b5bff]",
    isDraft: false,
  },
  {
    id: 3,
    name: "Glow Squad",
    type: "Influencer",
    partnership: "Paid",
    duration: "Long-term",
    note: "Month 4 starts 1 Nov · 6 creators",
    statusBadge: "Live",
    badgeTone: "bg-[rgba(20,157,70,0.12)] text-[#149d46]",
    isDraft: false,
  },
  {
    id: 4,
    name: "Monsoon Sunscreen",
    type: "Influencer",
    partnership: "Paid",
    duration: "One-time",
    note: "12 creators · ends 2 Nov",
    statusBadge: "Live",
    badgeTone: "bg-[rgba(20,157,70,0.12)] text-[#149d46]",
    isDraft: false,
  },
  {
    id: 6,
    name: "Skin Quiz Leads",
    type: "UGC",
    partnership: "Paid",
    duration: "One-time",
    note: "3 of 6 places filled · starts 4 Nov",
    statusBadge: "Upcoming",
    badgeTone: "bg-[rgba(59,91,255,0.12)] text-[#3b5bff]",
    isDraft: false,
  },
  {
    id: 5,
    name: "Hydration Bundle",
    type: "Influencer",
    partnership: "Gift exchange",
    duration: "One-time",
    note: "Product only, no fee · ends 1 Nov",
    statusBadge: "Live",
    badgeTone: "bg-[rgba(20,157,70,0.12)] text-[#149d46]",
    isDraft: false,
  },
  {
    id: 7,
    name: "Holi Colour Care",
    type: "Influencer",
    partnership: "Paid",
    duration: "One-time",
    note: "Publish this draft before inviting",
    statusBadge: "Draft",
    badgeTone: "bg-[rgba(242,155,7,0.12)] text-[#f29b07]",
    isDraft: true,
  },
];

export type AgencyInviteCreatorToProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  creatorName?: string;
  currentProjectId?: number | string;
  clientId?: string;
  onContinueToInvite?: (selectedProjectId: number) => void;
};

export function AgencyInviteCreatorToProjectModal({
  isOpen,
  onClose,
  creatorName = "Diya Kapoor",
  currentProjectId = 1,
  clientId = "minimalist",
  onContinueToInvite,
}: AgencyInviteCreatorToProjectModalProps) {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<number>(Number(currentProjectId) || 1);
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  const filteredProjects = defaultProjects.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.note.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateNewProject = () => {
    onClose();
    navigate(agencyClientNewProjectRoute(clientId));
  };

  const handleContinue = () => {
    if (onContinueToInvite) {
      onContinueToInvite(selectedId);
    } else {
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(`floooww-project-${selectedId}-invited`, "true");
        window.sessionStorage.setItem(`floooww-project-${selectedId}-active-tab`, "Invited creators");
      }
      onClose();
      if (Number(currentProjectId) !== selectedId) {
        navigate(`/agency/client/${clientId}/projects/${selectedId}`);
      }
    }
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px]"
        onClick={onClose}
        aria-labelledby="invite-modal-title"
        role="dialog"
        aria-modal="true"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="relative flex w-full max-w-[560px] flex-col gap-4 rounded-[16px] bg-white p-6 shadow-[0px_16px_24px_rgba(0,0,0,0.18)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Head */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h2
                id="invite-modal-title"
                className="text-[18px] font-semibold text-[#070b13] tracking-[-0.01em]"
              >
                Invite {creatorName} to a project
              </h2>
              <p className="mt-1 text-[13px] text-[#8491a3]">
                Pick one. Next you’ll set her deliverables, deadlines and fee.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="grid size-8 shrink-0 place-items-center rounded-lg text-secondary transition-colors hover:bg-subtle hover:text-ink cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} strokeWidth={2} />
            </button>
          </div>

          {/* Search */}
          <div className="relative flex items-center rounded-lg border border-[#e5e7eb] px-3 py-2.5 transition-colors focus-within:border-primary">
            <Search size={16} className="shrink-0 text-[#8491a3] mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your projects…"
              className="w-full bg-transparent text-[14px] text-ink placeholder:text-[#8491a3] focus:outline-none"
            />
          </div>

          {/* Projects list */}
          <div className="flex max-h-[380px] flex-col gap-2 overflow-y-auto pr-0.5">
            {filteredProjects.map((proj) => {
              const isSelected = selectedId === proj.id;
              const isDraft = proj.isDraft;

              return (
                <div
                  key={proj.id}
                  onClick={() => !isDraft && setSelectedId(proj.id)}
                  className={`flex items-center gap-3 rounded-[10px] px-3.5 py-3 transition-all cursor-pointer ${
                    isSelected
                      ? "border-[1.5px] border-[#2563eb] bg-[#eff3ff]"
                      : isDraft
                        ? "border border-[#e5e7eb] bg-white opacity-55 cursor-not-allowed"
                        : "border border-[#e5e7eb] bg-white hover:border-gray-300"
                  }`}
                >
                  {/* Custom Radio Button */}
                  <div
                    className={`grid size-[18px] shrink-0 place-items-center rounded-full border transition-all ${
                      isSelected
                        ? "border-[#2563eb] bg-[#eff3ff]"
                        : "border-[#d1d5db] bg-white"
                    }`}
                  >
                    {isSelected && (
                      <span className="size-2 rounded-full bg-[#2563eb]" />
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-medium text-[#070b13]">
                      {proj.name}
                    </p>
                    <p className="truncate text-[12px] text-[#8491a3]">
                      {proj.type} · {proj.partnership} · {proj.duration} · {proj.note}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`shrink-0 rounded-[6px] px-2 py-0.5 text-[12px] font-medium leading-[normal] ${proj.badgeTone}`}
                  >
                    {proj.statusBadge}
                  </span>
                </div>
              );
            })}
            {filteredProjects.length === 0 && (
              <div className="py-6 text-center text-[13px] text-secondary">
                No projects found matching "{searchQuery}"
              </div>
            )}
          </div>

          {/* Create new project link */}
          <button
            type="button"
            onClick={handleCreateNewProject}
            className="self-start text-[13px] font-medium text-[#3b5bff] hover:underline cursor-pointer"
          >
            + Create a new project for her
          </button>

          {/* Footer */}
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 flex-1 items-center justify-center rounded-lg border border-[#e3e5ec] bg-white text-[14px] font-medium text-[#0d0d10] transition-colors hover:bg-subtle cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleContinue}
              className="flex h-10 flex-1 items-center justify-center rounded-lg bg-[#0d0d10] text-[14px] font-medium text-white transition-colors hover:bg-black cursor-pointer"
            >
              Continue to invite
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
