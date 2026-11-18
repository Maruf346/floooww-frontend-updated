import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronDown, Check, Plus, LayoutDashboard, Building2 } from "lucide-react";
import { ROUTES } from "@/common/constants/routes";

export interface AgencyClient {
  id: string;
  name: string;
  category?: string;
  status?: string;
  initials?: string;
}

export const AGENCY_CLIENTS: AgencyClient[] = [
  { id: "minimalist", name: "Minimalist", category: "Beauty & skincare", status: "Active", initials: "M" },
  { id: "velvet_lip", name: "Velvet Lip Co.", category: "Make-up", status: "Active", initials: "VL" },
  { id: "dewdrop", name: "Dewdrop Naturals", category: "Skincare", status: "Active", initials: "DN" },
  { id: "strand_studio", name: "Strand Studio", category: "Haircare", status: "Active", initials: "SS" },
  { id: "petal_pine", name: "Petal & Pine", category: "Wellness", status: "Onboarding", initials: "PP" },
];

interface AgencyWorkspaceSwitcherProps {
  mode?: "agency" | "client";
  activeClientId?: string;
}

export function AgencyWorkspaceSwitcher({
  mode = "agency",
  activeClientId,
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
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
    // If we're already on a brand route, retain the route but update client param
    const currentPath = location.pathname.startsWith("/brand") ? location.pathname : ROUTES.brand;
    navigate(`${currentPath}?client=${clientId}`);
  };

  const handleAddClient = () => {
    setIsOpen(false);
    navigate(ROUTES.agencyClientNew);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Switcher trigger button */}
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

      {/* Switcher Dropdown Popover */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 z-50 rounded-xl border border-[#e3e5ec] bg-white p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.12)] animate-in fade-in zoom-in-95 duration-150">
          {/* Agency Overview Option */}
          <button
            type="button"
            onClick={handleSelectAgency}
            className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] transition-colors cursor-pointer ${
              mode === "agency"
                ? "bg-[#f4f6fb] font-semibold text-[#0d0d10]"
                : "text-[#0d0d10] hover:bg-[#f4f6fb]"
            }`}
          >
            <div className="grid size-6 place-items-center rounded-md bg-[#0d0d10] text-[10px] font-semibold text-white shrink-0">
              BA
            </div>
            <div className="flex-1 min-w-0">
              <span className="block truncate font-medium text-[#0d0d10]">Agency overview</span>
              <span className="block truncate text-[11px] text-[#a3a3ac]">Brightside Agency</span>
            </div>
            {mode === "agency" && <Check size={14} className="text-[#0d0d10] shrink-0" />}
          </button>

          <div className="my-1.5 h-px bg-[#e3e5ec]" />

          {/* Section header */}
          <div className="px-2.5 py-1 text-[11px] font-semibold tracking-wider text-[#a3a3ac] uppercase">
            Clients
          </div>

          {/* Client List */}
          <div className="max-h-[220px] overflow-y-auto space-y-0.5">
            {AGENCY_CLIENTS.map((client) => {
              const isSelected = mode === "client" && currentClient.id === client.id;
              return (
                <button
                  key={client.id}
                  type="button"
                  onClick={() => handleSelectClient(client.id)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-[#f4f6fb] font-semibold text-[#0d0d10]"
                      : "text-[#0d0d10] hover:bg-[#f4f6fb]"
                  }`}
                >
                  <div className="grid size-6 place-items-center rounded-md bg-[#edeff3] text-[11px] font-medium text-[#0d0d10] shrink-0">
                    {client.initials || client.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block truncate font-medium text-[#0d0d10]">{client.name}</span>
                    {client.category && (
                      <span className="block truncate text-[11px] text-[#a3a3ac]">
                        {client.category}
                      </span>
                    )}
                  </div>
                  {isSelected && <Check size={14} className="text-[#0d0d10] shrink-0" />}
                </button>
              );
            })}
          </div>

          <div className="my-1.5 h-px bg-[#e3e5ec]" />

          {/* Add Client Option */}
          <button
            type="button"
            onClick={handleAddClient}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] font-medium text-[#0d0d10] hover:bg-[#f4f6fb] transition-colors cursor-pointer"
          >
            <div className="grid size-6 place-items-center rounded-md border border-dashed border-[#a3a3ac] text-[#71717a] shrink-0">
              <Plus size={14} />
            </div>
            <span className="flex-1">Add client</span>
          </button>
        </div>
      )}
    </div>
  );
}
