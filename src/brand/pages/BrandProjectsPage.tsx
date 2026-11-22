import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  Archive,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Copy,
  Download,
  Eye,
  Folder,
  Mail,
  MoreHorizontal,
  Pause,
  Pencil,
  Phone,
  Play,
  Plus,
  QrCode,
  Search,
  Share2,
  Trash2,
  UserRoundPlus,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BrandShell } from "@/brand/components/BrandShell";
import { Button } from "@/common/components/ui/Button";
import { DateRangePicker } from "@/common/components/ui/DateRangePicker";
import { KpiTile } from "@/common/components/ui/KpiTile";
import {
  brandProjectRoute,
  ROUTES,
} from "@/common/constants/routes";
import { asset } from "@/common/utils/asset";
import { projects, type Project } from "@/brand/data/projects";
import {
  ProjectConfirmModal,
  type ProjectConfirmAction,
} from "@/brand/components/ProjectConfirmModal";

type Status = "Live" | "Upcoming" | "Completed" | "Drafts" | "Paused" | "Archived" | "Deleted";

const tabs: Array<Status | "All"> = [
  "All",
  "Live",
  "Upcoming",
  "Completed",
  "Drafts",
  "Paused",
  "Archived",
  "Deleted",
];
const liveProjectEnds: Record<number, { date: string; relative: string }> = {
  1: { date: "7 Nov", relative: "in 10 days" },
  2: { date: "4 Nov", relative: "in 7 days" },
  3: { date: "31 Jan", relative: "month 4 on 1 Nov" },
  4: { date: "2 Nov", relative: "in 5 days" },
  5: { date: "1 Nov", relative: "in 4 days" },
};

const upcomingProjectStarts: Record<number, { date: string; relative: string }> = {
  6: { date: "4 Nov", relative: "in 7 days" },
};

const kpis = [
  {
    icon: Folder,
    label: "New projects",
    value: "11",
    detail: "5 live · 1 upcoming · 3 done · 2 drafts",
    iconClass: "bg-primary",
  },
  {
    icon: Play,
    label: "Live projects",
    value: "5",
    detail: "4 on track · 1 behind",
    iconClass: "bg-[#16a34a]",
  },
  {
    icon: UserRoundPlus,
    label: "New applications",
    value: "23",
    detail: "Across 3 projects",
    iconClass: "bg-primary",
  },
  {
    icon: Clock,
    label: "Upcoming projects",
    value: "1",
    detail: "Skin Quiz Leads · starts 4 Nov",
    iconClass: "bg-[#16a34a]",
  },
];

function FilterDropdown({
  label,
  value,
  values,
  width,
  onChange,
}: {
  label: string;
  value: string;
  values: string[];
  width: number;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const options = ["All", ...values];
  const anchor = trigger.current?.getBoundingClientRect();

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (
        !trigger.current?.contains(event.target as Node) &&
        !menu.current?.contains(event.target as Node)
      )
        setOpen(false);
    };
    window.addEventListener("mousedown", close);
    return () => window.removeEventListener("mousedown", close);
  }, []);

  const popup =
    open &&
    anchor &&
    createPortal(
      <div
        ref={menu}
        role="listbox"
        aria-label={label}
        style={{
          left: Math.max(8, Math.min(anchor.left, window.innerWidth - Math.max(width, 176) - 8)),
          top: Math.min(anchor.bottom + 6, window.innerHeight - (options.length * 36 + 20)),
        }}
        className="fixed z-[10000] min-w-[176px] rounded-lg border border-line bg-white p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
      >
        {options.map((option) => {
          const selected = option === value;
          return (
            <button
              key={option}
              type="button"
              role="option"
              aria-selected={selected}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`flex h-9 w-full items-center gap-2.5 rounded-md px-2.5 text-left text-[13px] leading-5 ${selected ? "bg-primary-subtle text-primary" : "text-ink hover:bg-subtle"}`}
            >
              <span className="flex-1">
                {option === "All" ? `All ${label.toLowerCase()}s` : option}
              </span>
              {selected && <Check size={14} />}
            </button>
          );
        })}
      </div>,
      document.body,
    );

  return (
    <>
      <button
        ref={trigger}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        style={{ width }}
        className={`mt-[5px] inline-flex h-[30px] shrink-0 items-center justify-between gap-1 rounded-full border bg-white pl-3 pr-2 text-[13px] leading-5 outline-none transition ${open ? "border-primary text-primary" : "border-line text-body"}`}
      >
        <span className="truncate">{value === "All" ? label : value}</span>
        <ChevronDown
          size={14}
          className={`shrink-0 text-secondary transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {popup}
    </>
  );
}

function PlatformLogos({ platform }: { platform: string }) {
  return (
    <div className="flex items-center gap-1.5">
      {platform.includes("Instagram") && (
        <img src="/assets/platform-instagram.svg" alt="Instagram" className="size-5" />
      )}
      {platform.includes("YouTube") && (
        <img src="/assets/platform-youtube.svg" alt="YouTube" className="size-5" />
      )}
      {platform.includes("Pinterest") && (
        <img src="/assets/platform-pinterest.svg" alt="Pinterest" className="size-5" />
      )}
      {platform.includes("Snapchat") && (
        <img src="/assets/platform-snapchat.svg" alt="Snapchat" className="size-5" />
      )}
    </div>
  );
}

function EmptyProjectsState({ paused, onGoToLive }: { paused: boolean; onGoToLive: () => void }) {
  const title = paused ? "No paused projects" : "No projects found";
  const description = paused
    ? "Pause a live project from its ⋯ menu when you need a break, for example while stock runs out. You can resume it any time."
    : "Try changing your search or filters to find the projects you’re looking for.";
  const details = paused
    ? [
        "New applications and invites stop. Creators already working are told to hold.",
        "Deadlines stop counting down and restart when you resume.",
        "Money in escrow stays held. Nothing new is charged while paused.",
        "Content that is already live stays live and keeps being tracked.",
      ]
    : [
        "Change or clear a filter to broaden the list.",
        "Check your spelling in the project search.",
      ];

  return (
    <section className="mt-6 flex w-full flex-col items-center rounded-xl border border-line bg-white px-10 py-14 text-center">
      <span className="flex size-[50px] items-center justify-center rounded-full bg-subtle text-secondary">
        <Pause size={22} />
      </span>
      <h2 className="mt-3 text-[16px] font-semibold leading-6 text-ink">{title}</h2>
      <p className="mt-3 w-full max-w-[520px] text-[13px] leading-5 text-secondary">
        {description}
      </p>
      <div className="mt-5 w-full max-w-[560px] rounded-md bg-subtle p-5 text-left">
        <h3 className="text-[14px] font-medium leading-[22px] text-ink">
          {paused ? "What happens when you pause" : "What you can do"}
        </h3>
        <div className="mt-2.5 space-y-2.5">
          {details.map((detail) => (
            <div className="flex items-start gap-2" key={detail}>
              <Check size={14} className="mt-0.5 shrink-0 text-secondary" />
              <p className="text-[12px] leading-4 text-secondary">{detail}</p>
            </div>
          ))}
        </div>
      </div>
      {paused && (
        <Button kind="secondary" size="s" className="mt-5" onClick={onGoToLive}>
          Go to live projects
        </Button>
      )}
    </section>
  );
}

function ShareProjectMenu({ anchor, onClose }: { anchor: DOMRect; onClose: () => void }) {
  const shareUrl = `${window.location.origin}${ROUTES.brandProjects}`;
  const copyLink = async () => {
    await navigator.clipboard?.writeText(shareUrl);
    onClose();
  };
  const option = (label: string, logo: ReactNode, onClick: () => void) => (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-[7px] text-left text-[14px] leading-5 text-ink hover:bg-subtle"
    >
      <span className="flex size-6 shrink-0 items-center justify-center rounded-lg">{logo}</span>
      <span>{label}</span>
    </button>
  );
  const width = 232;
  const height = 366;
  const left =
    anchor.right + 8 + width <= window.innerWidth
      ? anchor.right + 8
      : Math.max(8, anchor.left - width - 8);
  const top = Math.max(8, Math.min(anchor.top, window.innerHeight - height - 8));

  return createPortal(
    <div
      role="menu"
      aria-label="Share project"
      style={{ left, top }}
      className="fixed z-[10000] w-[232px] rounded-[10px] border border-line bg-white p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
    >
      {option(
        "Copy link",
        <span className="flex size-6 items-center justify-center rounded-lg bg-subtle">
          <Copy size={14} />
        </span>,
        copyLink,
      )}
      <div className="mx-auto h-px w-[220px] bg-muted" />
      {option(
        "WhatsApp",
        <span className="flex size-6 items-center justify-center rounded-lg bg-[#25d366] text-white">
          <Phone size={14} />
        </span>,
        onClose,
      )}
      {option(
        "Instagram Story",
        <span className="flex size-6 items-center justify-center rounded-lg border border-line bg-white">
          <img src="/assets/platform-instagram.svg" alt="" className="size-4" />
        </span>,
        onClose,
      )}
      {option(
        "LinkedIn",
        <span className="flex size-6 items-center justify-center rounded-lg bg-[#0a66c2] text-[13px] font-bold text-white">
          in
        </span>,
        onClose,
      )}
      {option(
        "X (Twitter)",
        <span className="flex size-6 items-center justify-center rounded-lg bg-ink text-[13px] font-bold text-white">
          X
        </span>,
        onClose,
      )}
      {option(
        "Facebook",
        <span className="flex size-6 items-center justify-center rounded-lg bg-[#1877f2] text-[13px] font-bold text-white">
          f
        </span>,
        onClose,
      )}
      <div className="mx-auto h-px w-[220px] bg-muted" />
      {option(
        "Email",
        <span className="flex size-6 items-center justify-center rounded-lg bg-subtle">
          <Mail size={14} />
        </span>,
        () => {
          window.location.href = `mailto:?body=${encodeURIComponent(shareUrl)}`;
          onClose();
        },
      )}
      {option(
        "QR code",
        <span className="flex size-6 items-center justify-center rounded-lg bg-subtle">
          <QrCode size={14} />
        </span>,
        onClose,
      )}
    </div>,
    document.body,
  );
}

function ProjectActionsMenu({
  project,
  anchor,
  onView,
  onClose,
  onAction,
}: {
  project: Project;
  anchor: DOMRect;
  onView: () => void;
  onClose: () => void;
  onAction?: (action: ProjectConfirmAction, project: Project) => void;
}) {
  const [shareOpen, setShareOpen] = useState(false);
  const [shareAnchor, setShareAnchor] = useState<DOMRect | null>(null);
  const menuItem = (
    label: string,
    icon: ReactNode,
    onClick: () => void,
    danger = false,
    trailing = false,
    divider = false,
  ) => (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-9 w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[13px] leading-5 hover:bg-subtle ${danger ? "text-[#db231f]" : "text-ink"} ${divider ? "mt-1 border-t border-line pt-3" : ""}`}
    >
      <span className="shrink-0">{icon}</span>
      <span className="flex-1">{label}</span>
      {trailing && <ChevronRight size={14} className="shrink-0 text-secondary" />}
    </button>
  );
  const width = 208;
  const height = 320;
  const left = Math.max(8, Math.min(anchor.right - width, window.innerWidth - width - 8));
  const top =
    anchor.bottom + 6 + height <= window.innerHeight
      ? anchor.bottom + 6
      : Math.max(8, anchor.top - height - 6);

  return createPortal(
    <div
      role="menu"
      aria-label={`Actions for ${project.name}`}
      style={{ left, top }}
      className="fixed z-[9999] w-[208px] rounded-lg border border-line bg-white p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
    >
      {menuItem("View project", <Eye size={14} />, onView)}
      {menuItem("Edit project", <Pencil size={14} />, onView)}
      <button
        type="button"
        onMouseEnter={(event) => {
          setShareAnchor(event.currentTarget.getBoundingClientRect());
          setShareOpen(true);
        }}
        onClick={(event) => {
          setShareAnchor(event.currentTarget.getBoundingClientRect());
          setShareOpen((open) => !open);
        }}
        className="flex min-h-9 w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[13px] leading-5 text-ink hover:bg-subtle"
      >
        <Share2 size={14} />
        <span className="flex-1">Share</span>
        <ChevronRight size={14} className="text-secondary" />
      </button>
      {menuItem("Duplicate", <Copy size={14} />, onClose)}
      {menuItem("Pause project", <Pause size={14} />, () => {
        onClose();
        onAction?.("Pause", project);
      })}
      {menuItem("Download report", <Download size={14} />, onClose)}
      {menuItem(
        "Archive",
        <Archive size={14} />,
        () => {
          onClose();
          onAction?.("Archive", project);
        },
        false,
        false,
        true,
      )}
      {menuItem(
        "Delete",
        <Trash2 size={14} />,
        () => {
          onClose();
          onAction?.("Delete", project);
        },
        true,
      )}
      {shareOpen && shareAnchor && <ShareProjectMenu anchor={shareAnchor} onClose={onClose} />}
    </div>,
    document.body,
  );
}

export function BrandProjectsPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const requestedStatus = params.get("status");
  const [active, setActive] = useState<Status | "All">(
    requestedStatus && tabs.includes(requestedStatus as Status)
      ? (requestedStatus as Status)
      : "All",
  );

  useEffect(() => {
    if (requestedStatus && tabs.includes(requestedStatus as Status)) {
      setActive(requestedStatus as Status);
      setPage(1);
    } else if (!requestedStatus) {
      setActive("All");
      setPage(1);
    }
  }, [requestedStatus]);

  const [nudgeToast, setNudgeToast] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [partnership, setPartnership] = useState("All");
  const [duration, setDuration] = useState("All");
  const [platform, setPlatform] = useState("All");
  const [budget, setBudget] = useState("All");
  const [selected, setSelected] = useState<number[]>([]);
  const [restoredProjectIds, setRestoredProjectIds] = useState<number[]>([]);
  const [actionMenuId, setActionMenuId] = useState<number | null>(null);
  const [actionMenuAnchor, setActionMenuAnchor] = useState<DOMRect | null>(null);
  const [page, setPage] = useState(1);
  const [confirmAction, setConfirmAction] = useState<ProjectConfirmAction | null>(null);
  const [targetProject, setTargetProject] = useState<Project | null>(null);
  const [, setTick] = useState(0);

  const handleAction = (action: ProjectConfirmAction, project: Project) => {
    setTargetProject(project);
    setConfirmAction(action);
  };

  const handleConfirmAction = (action: ProjectConfirmAction) => {
    if (!targetProject) return;
    if (action === "Pause") {
      targetProject.status = "Paused";
      targetProject.detailStatus = "Paused";
    } else if (action === "Archive") {
      targetProject.status = "Archived";
      targetProject.detailStatus = "Archived";
    } else if (action === "Delete") {
      targetProject.status = "Deleted";
      targetProject.detailStatus = "Deleted";
      targetProject.deletedAt = "Today";
      targetProject.deletedBy = "Ananya Mehta";
      targetProject.removalAt = "In 30 days";
    }
    setTick((t) => t + 1);
    setConfirmAction(null);
    setTargetProject(null);
  };
  const getProjectStatus = (project: Project): Status =>
    restoredProjectIds.includes(project.id) ? "Drafts" : project.status;

  const filtered = useMemo(
    () =>
      projects.filter((project) => {
        const budgetAmount = Number(project.budget.replace(/[^\d]/g, ""));
        const budgetMatches =
          budget === "All" ||
          (budget === "Gift only" && project.budget === "Gift") ||
          (budget === "Under ₹1,00,000" && budgetAmount > 0 && budgetAmount < 100000) ||
          (budget === "₹1,00,000–₹2,00,000" && budgetAmount >= 100000 && budgetAmount <= 200000) ||
          (budget === "Over ₹2,00,000" && budgetAmount > 200000);
        return (
          (active === "All"
            ? !["Archived", "Deleted"].includes(getProjectStatus(project))
            : getProjectStatus(project) === active) &&
          (type === "All" || project.type.startsWith(type)) &&
          (partnership === "All" || project.type.includes(partnership)) &&
          (duration === "All" || project.type.includes(duration)) &&
          (platform === "All" || project.platform.includes(platform)) &&
          budgetMatches &&
          `${project.name} ${project.type}`.toLowerCase().includes(search.toLowerCase())
        );
      }),
    [active, budget, duration, partnership, platform, restoredProjectIds, search, type],
  );

  const tabCounts = useMemo(
    () =>
      Object.fromEntries(
        tabs.map((tab) => [
          tab,
          tab === "All"
            ? projects.filter(
                (project) => !["Archived", "Deleted"].includes(getProjectStatus(project)),
              ).length
            : projects.filter((project) => getProjectStatus(project) === tab).length,
        ]),
      ) as Record<Status | "All", number>,
    [restoredProjectIds],
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / 8));
  const visibleProjects = filtered.slice((page - 1) * 8, page * 8);
  const isEmpty = filtered.length === 0;
  const isDeletedView = active === "Deleted";
  const pageSubtitle = isDeletedView
    ? `${tabCounts.Deleted} deleted project${tabCounts.Deleted === 1 ? "" : "s"} · kept for 30 days`
    : active === "Live"
      ? `${tabCounts.Live} projects running now`
      : active === "Upcoming"
        ? `${tabCounts.Upcoming} project${tabCounts.Upcoming === 1 ? "" : "s"} starting soon`
        : `Minimalist · ${tabCounts.All} projects · plus ${tabCounts.Archived} archived`;
  const allSelected =
    visibleProjects.length > 0 && visibleProjects.every((project) => selected.includes(project.id));
  const toggle = (id: number) =>
    setSelected((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id],
    );
  const clearFilters = () => {
    setType("All");
    setPartnership("All");
    setDuration("All");
    setPlatform("All");
    setBudget("All");
    setPage(1);
  };

  const handleCreateNewProject = () => {
    navigate(ROUTES.brandNewProject);
  };

  const getProjectRoute = (projectId: number | string) => {
    return brandProjectRoute(projectId);
  };

  return (
    <BrandShell>
      <div className="-mt-1 mx-auto w-full max-w-[1440px]">
        <header className="flex h-[58px] items-end justify-between gap-4">
          <div>
            <h1 className="text-[26px] font-bold leading-[34px] tracking-[-0.5px] text-ink">
              All projects
            </h1>
            <p className="mt-1 text-[13px] leading-5 text-secondary">{pageSubtitle}</p>
          </div>
          <div className="flex h-10 items-center gap-[10px]">
            <DateRangePicker value="1 Oct - 28 Oct 2026" />
            <Button
              className="w-[184px]"
              onClick={handleCreateNewProject}
              leadingIcon={<Plus size={16} />}
            >
              Create new project
            </Button>
          </div>
        </header>

        <nav
          className="mt-6 flex h-[37px] gap-6 overflow-x-auto border-b border-line"
          aria-label="Project status"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setActive(tab);
                setPage(1);
                const newParams = new URLSearchParams(params);
                if (tab === "All") {
                  newParams.delete("status");
                } else {
                  newParams.set("status", tab);
                }
                navigate({ search: newParams.toString() }, { replace: true });
              }}
              className={`flex h-9 shrink-0 items-start gap-1.5 border-b-2 text-[14px] leading-[22px] ${active === tab ? "border-primary font-medium text-primary" : "border-transparent text-secondary hover:text-ink"}`}
            >
              {tab}
              <span
                className={`mt-0.5 min-w-[20px] rounded-full px-[7px] text-center text-[12px] leading-[18px] ${active === tab ? "bg-primary-subtle text-primary" : "bg-muted text-secondary"}`}
              >
                {tabCounts[tab]}
              </span>
            </button>
          ))}
        </nav>

        {!isEmpty && !isDeletedView && active === "All" && (
          <section
            className="mt-6 grid h-[196px] grid-cols-4 gap-3 rounded-xl border border-line bg-white p-5"
            aria-label="Project metrics"
          >
            {kpis.map(({ icon: Icon, label, value, detail, iconClass }) => (
              <KpiTile
                key={label}
                icon={Icon}
                iconBg={iconClass}
                label={label}
                value={value}
                detail={detail}
              />
            ))}
          </section>
        )}

        <div className="mt-6 flex h-10 items-start gap-2">
          <label className="flex h-10 w-[280px] shrink-0 items-center gap-2 rounded-md border border-line bg-white px-3">
            <Search size={16} className="text-tertiary" />
            <input
              className="min-w-0 flex-1 bg-transparent text-[13px] leading-5 text-ink outline-none placeholder:text-tertiary"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search projects"
            />
          </label>
          <FilterDropdown
            label="Type"
            value={type}
            values={["Influencer", "UGC"]}
            width={75}
            onChange={(value) => {
              setType(value);
              setPage(1);
            }}
          />
          <FilterDropdown
            label="Partnership"
            value={partnership}
            values={["Paid", "Gift exchange"]}
            width={113}
            onChange={(value) => {
              setPartnership(value);
              setPage(1);
            }}
          />
          <FilterDropdown
            label="Duration"
            value={duration}
            values={["One-time", "Long-term"]}
            width={96}
            onChange={(value) => {
              setDuration(value);
              setPage(1);
            }}
          />
          <FilterDropdown
            label="Platform"
            value={platform}
            values={["Instagram", "YouTube", "Pinterest", "Snapchat"]}
            width={95}
            onChange={(value) => {
              setPlatform(value);
              setPage(1);
            }}
          />
          <FilterDropdown
            label="Budget"
            value={budget}
            values={["Under ₹1,00,000", "₹1,00,000–₹2,00,000", "Over ₹2,00,000", "Gift only"]}
            width={88}
            onChange={(value) => {
              setBudget(value);
              setPage(1);
            }}
          />
        </div>

        {isDeletedView && !isEmpty && (
          <div className="mt-6 flex items-center gap-2.5 rounded-md bg-[#fde4e3] px-4 py-3 text-[13px] leading-5 text-ink">
            <Trash2 size={16} className="shrink-0 text-[#db231f]" />
            <p>
              Deleted projects are kept for 30 days, then removed for good. Only drafts and projects
              with no payments can be deleted; others can be archived.
            </p>
          </div>
        )}

        {selected.length > 0 && (
          <div className="absolute z-10 mt-2 flex items-center gap-3 rounded-md bg-primary-subtle px-3 py-2 text-[13px] text-primary">
            <span>{selected.length} selected</span>
            <button type="button" onClick={() => setSelected([])} className="font-medium">
              Clear selection
            </button>
          </div>
        )}

        {!isEmpty ? (
          isDeletedView ? (
            <section className="mt-6 overflow-x-auto rounded-xl border border-line bg-white">
              <table className="w-full min-w-[860px] table-fixed border-collapse text-left">
                <colgroup>
                  <col className="w-[52px]" />
                  <col className="w-[240px]" />
                  <col className="w-[140px]" />
                  <col className="w-[92px]" />
                  <col className="w-[108px]" />
                  <col className="w-[152px]" />
                  <col className="w-[172px]" />
                </colgroup>
                <thead className="bg-subtle text-[12px] font-semibold leading-4 tracking-[0.06em] text-secondary">
                  <tr className="h-10">
                    <th className="pl-5">
                      <input
                        aria-label="Select all deleted projects"
                        checked={allSelected}
                        onChange={() =>
                          setSelected(
                            allSelected
                              ? selected.filter(
                                  (id) => !visibleProjects.some((project) => project.id === id),
                                )
                              : [
                                  ...new Set([
                                    ...selected,
                                    ...visibleProjects.map((project) => project.id),
                                  ]),
                                ],
                          )
                        }
                        type="checkbox"
                        className="size-[18px] rounded border-line cursor-pointer"
                      />
                    </th>
                    {[
                      "PROJECT",
                      "OBJECTIVE",
                      "PLATFORM",
                      "STATUS",
                      "DELETED",
                      "REMOVED FOR GOOD",
                    ].map((heading) => (
                      <th className="pr-3" key={heading}>
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visibleProjects.map((project) => (
                    <tr
                      className="h-[72px] border-t border-line-subtle text-[13px] leading-5 hover:bg-subtle/60 cursor-pointer"
                      key={project.id}
                      onClick={() => {
                        setSelected((current) =>
                          current.includes(project.id)
                            ? current.filter((id) => id !== project.id)
                            : [...current, project.id],
                        );
                      }}
                    >
                      <td className="pl-5" onClick={(e) => e.stopPropagation()}>
                        <input
                          aria-label={`Select ${project.name}`}
                          checked={selected.includes(project.id)}
                          onChange={() => toggle(project.id)}
                          type="checkbox"
                          className="size-[18px] rounded border-line cursor-pointer"
                        />
                      </td>
                      <td className="pr-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={project.image}
                            alt=""
                            className="size-11 shrink-0 rounded-lg object-cover"
                          />
                          <div className="min-w-0">
                            <p className="truncate text-[14px] font-medium leading-[22px] text-ink">
                              {project.name}
                            </p>
                            <p className="truncate text-[12px] leading-4 text-secondary">
                              {project.type}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="pr-2 text-[13px] font-medium text-ink">
                        {project.objective || "Sales"}
                      </td>
                      <td>
                        <PlatformLogos platform={project.platform} />
                      </td>
                      <td>
                        <span className="inline-flex h-5 items-center gap-1.5 rounded-full bg-[#fde4e3] px-2 text-[12px] font-medium leading-4 text-[#db231f]">
                          <span className="size-1.5 rounded-full bg-[#db231f]" />
                          Deleted
                        </span>
                      </td>
                      <td>
                        <p className="font-medium text-ink">{project.deletedAt}</p>
                        <p className="text-[12px] leading-4 text-secondary">{project.deletedBy}</p>
                      </td>
                      <td>
                        <p className="font-medium text-[#db231f]">{project.removalAt}</p>
                        <p className="text-[12px] leading-4 text-secondary">
                          {project.removalNote}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          ) : (
            <section className="mt-6 overflow-x-auto rounded-xl border border-line bg-white">
              <table className="w-full min-w-[1000px] table-fixed border-collapse text-left">
                <colgroup>
                  <col className="w-[51px]" />
                  <col className="w-[240px]" />
                  <col className="w-[140px]" />
                  <col className="w-[92px]" />
                  <col className="w-[104px]" />
                  <col className="w-[88px]" />
                  <col className="w-[148px]" />
                  <col className="w-[140px]" />
                </colgroup>
                <thead className="bg-subtle text-[11px] font-semibold leading-4 tracking-[0.06em] text-secondary">
                  <tr className="h-[42px]">
                    <th className="pl-5">
                      <input
                        aria-label="Select all visible projects"
                        checked={allSelected}
                        onChange={() =>
                          setSelected(
                            allSelected
                              ? selected.filter(
                                  (id) => !visibleProjects.some((project) => project.id === id),
                                )
                              : [
                                  ...new Set([
                                    ...selected,
                                    ...visibleProjects.map((project) => project.id),
                                  ]),
                                ],
                          )
                        }
                        type="checkbox"
                        className="size-[18px] rounded border-line cursor-pointer"
                      />
                    </th>
                    {[
                      "PROJECT",
                      "OBJECTIVE",
                      "PLATFORM",
                      "STATUS",
                      "APPROVED",
                      "BUDGET",
                      active === "Live" ? "ENDS" : active === "Upcoming" ? "STARTS" : "UPDATED",
                    ].map((heading) => (
                      <th className="pr-2" key={heading}>
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visibleProjects.map((project) => {
                    const status = getProjectStatus(project);
                    return (
                      <tr
                        style={{ height: project.rowHeight }}
                        onClick={() => navigate(getProjectRoute(project.id))}
                        className="border-t border-line-subtle text-[13px] leading-5 hover:bg-subtle/60 cursor-pointer"
                        key={project.id}
                      >
                        <td className="pl-5" onClick={(e) => e.stopPropagation()}>
                          <input
                            aria-label={`Select ${project.name}`}
                            checked={selected.includes(project.id)}
                            onChange={() => toggle(project.id)}
                            type="checkbox"
                            className="size-[18px] rounded border-line cursor-pointer"
                          />
                        </td>
                        <td className="pr-3">
                          <div className="flex items-center gap-3">
                            {project.image ? (
                              <img
                                src={project.image}
                                alt=""
                                className="size-11 shrink-0 rounded-lg object-cover"
                              />
                            ) : (
                              <span className={`size-11 shrink-0 rounded-lg ${project.accent}`} />
                            )}
                            <div className="min-w-0">
                              <p className="truncate text-[14px] font-medium leading-[22px] text-ink">
                                {project.name}
                              </p>
                              <p className="text-[12px] leading-4 text-secondary">{project.type}</p>
                              {project.cycle && (
                                <span className="mt-[3px] inline-flex h-5 items-center rounded-full bg-muted px-2 text-[12px] leading-4 text-secondary">
                                  {project.cycle}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="pr-2 text-[13px] font-medium text-ink">
                          {project.objective || "Awareness"}
                        </td>
                        <td>
                          <PlatformLogos platform={project.platform} />
                        </td>
                        <td>
                          <span
                            className={`inline-flex h-5 items-center rounded-full px-2 text-[12px] font-medium leading-4 ${
                              status === "Live"
                                ? "bg-success-bg text-success"
                                : status === "Drafts"
                                  ? "bg-muted text-secondary"
                                  : status === "Paused"
                                    ? "bg-amber-100 text-amber-700"
                                    : status === "Archived"
                                      ? "bg-slate-100 text-slate-600"
                                      : status === "Completed"
                                        ? "bg-emerald-50 text-emerald-700"
                                        : "bg-primary-subtle text-primary"
                            }`}
                          >
                            {status}
                          </span>
                        </td>
                        <td className="text-ink">
                          {active === "Upcoming" && project.id === 6 ? "3 of 6" : project.approved}
                        </td>
                        <td>
                          <p className="font-medium text-ink">{project.budget}</p>
                          <p className="text-[12px] leading-4 text-secondary">
                            {project.budgetNote}
                          </p>
                        </td>
                        <td>
                          {active === "Live" && liveProjectEnds[project.id] ? (
                            <div>
                              <p className="font-medium text-ink">{liveProjectEnds[project.id].date}</p>
                              <p className="text-[12px] leading-4 text-secondary">
                                {liveProjectEnds[project.id].relative}
                              </p>
                            </div>
                          ) : active === "Upcoming" && upcomingProjectStarts[project.id] ? (
                            <div>
                              <p className="font-medium text-ink">{upcomingProjectStarts[project.id].date}</p>
                              <p className="text-[12px] leading-4 text-secondary">
                                {upcomingProjectStarts[project.id].relative}
                              </p>
                            </div>
                          ) : (
                            <span className="text-[12px] leading-4 text-secondary">{project.updated}</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
          )
        ) : (
          <EmptyProjectsState
            paused={active === "Paused"}
            onGoToLive={() => {
              setSearch("");
              clearFilters();
              setActive("Live");
              setPage(1);
            }}
          />
        )}

        {!isEmpty &&
          (isDeletedView ? (
            <footer className="mt-6 text-[12px] leading-4 text-secondary">
              Showing {(page - 1) * 8 + 1} to {Math.min(page * 8, filtered.length)} of{" "}
              {filtered.length} deleted project{filtered.length === 1 ? "" : "s"}
            </footer>
          ) : totalPages <= 1 ? (
            <footer className="mt-6 text-[13px] leading-5 text-secondary">
              Showing 1 to {filtered.length} of {filtered.length} {active === "Live" ? "live " : active === "Upcoming" ? "upcoming " : ""}project{filtered.length === 1 ? "" : "s"}
            </footer>
          ) : (
            <footer className="mt-6 flex h-7 w-[720px] items-center justify-between text-[13px] leading-5 text-secondary">
              <span>
                Showing{" "}
                {filtered.length
                  ? `${(page - 1) * 8 + 1}–${Math.min(page * 8, filtered.length)}`
                  : "0"}{" "}
                of {filtered.length} projects
              </span>
              <div className="flex h-7 items-center gap-2">
                <Button
                  kind="secondary"
                  size="s"
                  disabled={page === 1}
                  onClick={() => setPage((value) => Math.max(1, value - 1))}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
                  <button
                    type="button"
                    key={number}
                    onClick={() => setPage(number)}
                    className={`size-7 rounded-md text-[12px] font-medium ${page === number ? "bg-primary text-white" : "text-secondary hover:bg-muted"}`}
                  >
                    {number}
                  </button>
                ))}
                <Button
                  kind="secondary"
                  size="s"
                  disabled={page === totalPages}
                  onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                >
                  Next
                </Button>
              </div>
            </footer>
          ))}
      </div>
      {targetProject && (
        <ProjectConfirmModal
          action={confirmAction}
          project={targetProject}
          isOpen={Boolean(confirmAction)}
          onConfirm={handleConfirmAction}
          onCancel={() => {
            setConfirmAction(null);
            setTargetProject(null);
          }}
        />
      )}
      {nudgeToast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-lg bg-[#0d0d10] px-4 py-2.5 text-[13px] font-medium text-white shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-150">
          {nudgeToast}
        </div>
      )}
    </BrandShell>
  );
}
