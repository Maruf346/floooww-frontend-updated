import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { ROUTES } from "@/common/constants/routes";

export interface AgencyClient {
  id: string;
  name: string;
  category?: string;
  statusText?: string;
  statusTone?: "active" | "onboarding" | "paused";
  initials: string;
  liveProjectsCount?: number;
}

export const AGENCY_CLIENTS: AgencyClient[] = [
  {
    id: "minimalist",
    name: "Minimalist",
    category: "Beauty & skincare",
    statusText: "Beauty & skincare · 3 live projects",
    statusTone: "active",
    initials: "MI",
    liveProjectsCount: 3,
  },
  {
    id: "velvet_lip",
    name: "Velvet Lip Co.",
    category: "Make-up",
    statusText: "Make-up · 2 live",
    statusTone: "active",
    initials: "VL",
    liveProjectsCount: 2,
  },
  {
    id: "dewdrop",
    name: "Dewdrop Naturals",
    category: "Skincare",
    statusText: "Skincare · 1 live",
    statusTone: "active",
    initials: "DN",
    liveProjectsCount: 1,
  },
  {
    id: "strand_studio",
    name: "Strand Studio",
    category: "Haircare",
    statusText: "Haircare · 1 live",
    statusTone: "active",
    initials: "SS",
    liveProjectsCount: 1,
  },
  {
    id: "petal_pine",
    name: "Petal & Pine",
    category: "Wellness",
    statusText: "Wellness · onboarding",
    statusTone: "onboarding",
    initials: "PP",
    liveProjectsCount: 0,
  },
  {
    id: "kumkum_naturals",
    name: "Kumkum Naturals",
    category: "Ayurvedic skincare",
    statusText: "Ayurvedic skincare · paused",
    statusTone: "paused",
    initials: "KN",
    liveProjectsCount: 0,
  },
];

interface AgencyWorkspaceSwitcherProps {
  mode?: "agency" | "client";
  activeClientId?: string;
}

/**
 * Workspace switcher dropdown matching Figma node 1795:24
 * Dropdown · Client switcher (open): Agency overview · clients · add client
 */
export function AgencyWorkspaceSwitcher({
  mode = "agency",
  activeClientId = "minimalist",
}: AgencyWorkspaceSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const currentClient =
    AGENCY_CLIENTS.find((c) => c.id === activeClientId) || AGENCY_CLIENTS[0];

  const handleSelectAgency = () => {
    setIsOpen(false);
    navigate(ROUTES.agency);
  };

  const handleSelectClient = (clientId: string) => {
    setIsOpen(false);
    navigate(`/agency/client/${clientId}`);
  };

  const handleCreateProject = (clientId: string) => {
    setIsOpen(false);
    navigate(`/agency/client/${clientId}?action=new-project`);
  };

  const handleAddClient = () => {
    setIsOpen(false);
    navigate(ROUTES.agencyClientNew);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Switcher trigger button (Figma 1716:394) */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center gap-2.5 rounded-xl border border-[#e3e5ec] p-2.5 text-left hover:border-[#0d0d10] transition-colors cursor-pointer bg-white"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="grid size-8 place-items-center rounded-lg bg-[#0d0d10] text-[12px] font-semibold text-white shrink-0">
          BA
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-semibold leading-5 text-[#0d0d10]">
            Brightside Agency
          </span>
          <span className="block truncate text-[12px] leading-4 text-[#a3a3ac]">
            {mode === "client" ? `Client · ${currentClient.name} ▾` : "Agency workspace ▾"}
          </span>
        </span>
        <ChevronDown
          size={16}
          className={`text-[#71717a] shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Switcher Dropdown Popover matching Figma Node 1795:24 */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 z-50 w-[300px] rounded-[12px] border border-[#d4d7df] bg-white py-2 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.1)] animate-in fade-in zoom-in-95 duration-150">
          {/* Section: AGENCY */}
          <div className="px-3 pt-2.5 pb-1">
            <p className="text-[11px] font-semibold text-[#8491a3] tracking-wider">AGENCY</p>
          </div>

          {/* Item: Brightside Agency */}
          <button
            type="button"
            onClick={handleSelectAgency}
            className="flex w-full items-center gap-2.5 px-3 py-2 text-left hover:bg-[#f4f6fb] transition-colors cursor-pointer"
          >
            <div className="grid size-7 place-items-center rounded-[8px] bg-[#3b5bff] text-[11px] font-semibold text-white shrink-0">
              BA
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-[#070b13] leading-tight truncate">
                Brightside Agency
              </p>
              <p className="text-[11px] text-[#8491a3] leading-tight truncate">
                Agency overview · all clients
              </p>
            </div>
          </button>

          <div className="h-px bg-[#edeff3] my-1" />

          {/* Section: CLIENTS · 6 */}
          <div className="px-3 pt-2 pb-1">
            <p className="text-[11px] font-semibold text-[#8491a3] tracking-wider">
              CLIENTS · {AGENCY_CLIENTS.length}
            </p>
          </div>

          <div className="max-h-[350px] overflow-y-auto">
            {AGENCY_CLIENTS.map((client) => {
              const isSelected = mode === "client" && currentClient.id === client.id;
              const isActiveTone = client.statusTone === "active";

              return (
                <div key={client.id} className="flex flex-col">
                  {/* Client Row */}
                  <button
                    type="button"
                    onClick={() => handleSelectClient(client.id)}
                    className={`flex w-full items-center gap-2.5 px-3 py-2 text-left transition-colors cursor-pointer ${
                      isSelected ? "bg-[#eff4ff]" : "hover:bg-[#f4f6fb]"
                    }`}
                  >
                    <div
                      className={`grid size-7 place-items-center rounded-full text-[11px] font-semibold shrink-0 ${
                        isActiveTone
                          ? "bg-[#dee8fe] text-[#3b5bff]"
                          : "bg-[#edeff3] text-[#8491a3]"
                      }`}
                    >
                      {client.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-[13px] leading-tight truncate ${
                          isSelected
                            ? "font-semibold text-[#070b13]"
                            : isActiveTone
                              ? "font-medium text-[#070b13]"
                              : "font-medium text-[#8491a3]"
                        }`}
                      >
                        {client.name}
                      </p>
                      <p className="text-[11px] text-[#8491a3] leading-tight truncate">
                        {client.statusText}
                      </p>
                    </div>
                    {isSelected && (
                      <span className="text-[13px] font-semibold text-[#3b5bff]">✓</span>
                    )}
                  </button>

                  {/* If active client, show nested "+ Create new project · {client.name}" (Figma 1800:24) */}
                  {isSelected && (
                    <button
                      type="button"
                      onClick={() => handleCreateProject(client.id)}
                      className="flex w-full items-center gap-2.5 pl-6 pr-3 py-2 text-left hover:bg-[#f4f6fb] transition-colors cursor-pointer"
                    >
                      <div className="grid size-7 place-items-center rounded-full bg-[#edeff3] text-[11px] font-semibold text-[#8491a3] shrink-0">
                        +
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-[#8491a3] hover:text-[#070b13] leading-tight truncate">
                          + Create new project · {client.name}
                        </p>
                        <p className="text-[11px] text-[#8491a3] leading-tight">
                          Opens the brand create-project flow (F1–F8) for this client
                        </p>
                      </div>
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <div className="h-px bg-[#edeff3] my-1" />

          {/* Item: + Add client (Figma 1795:74) */}
          <button
            type="button"
            onClick={handleAddClient}
            className="flex w-full items-center gap-2.5 px-3 py-2 text-left hover:bg-[#f4f6fb] transition-colors cursor-pointer"
          >
            <div className="grid size-7 place-items-center rounded-full bg-[#edeff3] text-[11px] font-semibold text-[#8491a3] shrink-0">
              +
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-[#8491a3] hover:text-[#070b13] leading-tight">
                + Add client
              </p>
              <p className="text-[11px] text-[#8491a3] leading-tight">
                Same steps as a brand sign-up · AG-08
              </p>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
