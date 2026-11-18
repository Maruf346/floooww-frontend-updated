import { useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  CircleHelp,
  FileBarChart,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Plus,
  Search,
  Settings,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import { Logo } from "@/common/components/brand/Logo";
import { ROUTES } from "@/common/constants/routes";
import { AgencyLogoutModal } from "./AgencyLogoutModal";
import { AgencyWorkspaceSwitcher } from "./AgencyWorkspaceSwitcher";

type AgencyShellProps = {
  children: ReactNode;
  onAddClient?: () => void;
};

export const AGENCY_CLIENTS = [
  { id: "minimalist", name: "Minimalist", count: 3, category: "Beauty & skincare", owner: "Rahul Verma" },
  { id: "velvet-lip", name: "Velvet Lip Co.", count: 2, category: "Make-up", owner: "Priya Sharma" },
  { id: "dewdrop", name: "Dewdrop Naturals", count: 1, category: "Skincare", owner: "Rahul Verma" },
  { id: "strand-studio", name: "Strand Studio", count: 1, category: "Haircare", owner: "Karan Mehta" },
  { id: "petal-pine", name: "Petal & Pine", count: 0, category: "Wellness", owner: "Priya Sharma" },
] as const;

function AgencySidebar({
  close,
  onLogout,
  onAddClient,
}: {
  close?: () => void;
  onLogout: () => void;
  onAddClient?: () => void;
}) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [clientsOpen, setClientsOpen] = useState(true);

  const navClass =
    "flex h-9 w-full items-center gap-2.5 rounded-md px-3 text-[14px] transition-colors";
  const overviewActive = pathname === ROUTES.agency;
  const clientsActive = pathname.startsWith(ROUTES.agencyClients);
  const billingActive = pathname === ROUTES.agencyBilling;
  const reportsActive = pathname.startsWith(ROUTES.agencyReports);
  const teamActive = pathname === ROUTES.agencyTeam;
  const messagesActive = pathname === ROUTES.agencyMessages;
  const settingsActive = pathname === ROUTES.agencySettings;
  const helpActive = pathname === ROUTES.agencyHelp;

  return (
    <aside className="flex h-full w-[260px] flex-col overflow-y-auto border-r border-[#e3e5ec] bg-white px-4 pb-4 pt-5 select-none">
      <div className="flex h-11 items-center justify-between">
        <Logo className="origin-left scale-[1.22]" />
        <button
          className="lg:hidden p-1 rounded-md text-[#71717a] hover:bg-[#f4f6fb]"
          onClick={close}
          type="button"
          aria-label="Close navigation"
        >
          <X size={20} />
        </button>
      </div>

      <div className="h-4 shrink-0" />

      {/* Workspace Switcher */}
      <AgencyWorkspaceSwitcher mode="agency" />

      <nav className="mt-4 flex flex-col">
        <p className="px-3 pb-1.5 text-[12px] font-semibold leading-4 tracking-[.06em] text-[#a3a3ac]">
          MAIN
        </p>

        <Link
          to={ROUTES.agency}
          onClick={close}
          className={`${navClass} ${
            overviewActive
              ? "bg-primary-subtle font-semibold text-primary"
              : "text-ink hover:bg-subtle"
          }`}
        >
          <Home size={18} />
          <span>Overview</span>
        </Link>

        {/* Foldable Clients Menu */}
        <div className="mt-0.5">
          <div
            className={`flex h-9 w-full items-center justify-between rounded-md px-3 text-[14px] transition-colors select-none ${
              clientsActive
                ? "bg-primary-subtle font-semibold text-primary"
                : "text-ink hover:bg-subtle"
            }`}
          >
            <Link
              to={ROUTES.agencyClients}
              onClick={() => {
                close?.();
                setClientsOpen(true);
              }}
              className="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer"
            >
              <Users size={18} className="shrink-0" />
              <span className="truncate text-left flex-1 font-normal">Clients</span>
            </Link>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setClientsOpen((prev) => !prev);
              }}
              className="p-1 text-[#71717a] hover:text-ink cursor-pointer shrink-0 rounded"
              aria-label="Toggle clients menu"
              aria-expanded={clientsOpen}
            >
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${
                  clientsOpen ? "rotate-0" : "-rotate-90"
                }`}
              />
            </button>
          </div>

          {clientsOpen && (
            <div className="mt-0.5 flex flex-col gap-0.5 animate-in fade-in duration-150">
              {AGENCY_CLIENTS.map((client) => (
                <button
                  key={client.id}
                  type="button"
                  onClick={() => {
                    close?.();
                    // Opens Agency client mode for this client
                    navigate(`/agency/client/${client.id}`);
                  }}
                  className="flex h-8 w-full items-center gap-2.5 rounded-md px-3 pl-9 text-[13px] text-ink hover:bg-subtle transition-colors text-left cursor-pointer"
                >
                  <span className="size-1 rounded-full bg-[#a3a3ac] shrink-0" />
                  <span className="flex-1 truncate">{client.name}</span>
                  {client.count > 0 && (
                    <span className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#edeff3] px-1.5 text-[12px] font-medium leading-4 text-ink">
                      {client.count}
                    </span>
                  )}
                </button>
              ))}

              <button
                type="button"
                onClick={() => {
                  close?.();
                  navigate("/brand/projects/new");
                }}
                className="flex h-8 w-full items-center gap-2.5 rounded-md px-3 pl-9 text-[13px] text-ink hover:bg-subtle transition-colors text-left cursor-pointer"
              >
                <span className="size-1 rounded-full bg-[#a3a3ac] shrink-0" />
                <span className="flex-1 truncate font-medium">+ Create new project</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  close?.();
                  if (onAddClient) onAddClient();
                  else navigate(ROUTES.agencyClientNew);
                }}
                className="flex h-8 w-full items-center gap-2.5 rounded-md px-3 pl-9 text-[13px] text-ink hover:bg-subtle transition-colors text-left cursor-pointer"
              >
                <span className="size-1 rounded-full bg-[#a3a3ac] shrink-0" />
                <span className="flex-1 truncate font-medium">+ Add client</span>
              </button>
            </div>
          )}
        </div>

        <Link
          to={ROUTES.agencyBilling}
          onClick={close}
          className={`${navClass} mt-0.5 ${
            billingActive
              ? "bg-primary-subtle font-semibold text-primary"
              : "text-ink hover:bg-subtle"
          }`}
        >
          <WalletCards size={18} />
          <span>Billing</span>
        </Link>

        <Link
          to={ROUTES.agencyReports}
          onClick={close}
          className={`${navClass} mt-0.5 ${
            reportsActive
              ? "bg-primary-subtle font-semibold text-primary"
              : "text-ink hover:bg-subtle"
          }`}
        >
          <FileBarChart size={18} />
          <span>Custom reports</span>
        </Link>

        <p className="px-3 pb-1.5 pt-4 text-[12px] font-semibold leading-4 tracking-[.06em] text-[#a3a3ac]">
          ACCOUNT
        </p>

        <Link
          to={ROUTES.agencyTeam}
          onClick={close}
          className={`${navClass} mt-0.5 ${
            teamActive
              ? "bg-primary-subtle font-semibold text-primary"
              : "text-ink hover:bg-subtle"
          }`}
        >
          <Users size={18} />
          <span>Team &amp; roles</span>
        </Link>

        <Link
          to={ROUTES.agencyMessages}
          onClick={close}
          className={`${navClass} mt-0.5 ${
            messagesActive
              ? "bg-primary-subtle font-semibold text-primary"
              : "text-ink hover:bg-subtle"
          }`}
        >
          <MessageSquare size={18} />
          <span className="flex-1">Messages</span>
          <span className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#edeff3] px-1.5 text-[12px] font-medium leading-4 text-ink">
            4
          </span>
        </Link>

        <Link
          to={ROUTES.agencySettings}
          onClick={close}
          className={`${navClass} mt-0.5 ${
            settingsActive
              ? "bg-primary-subtle font-semibold text-primary"
              : "text-ink hover:bg-subtle"
          }`}
        >
          <Settings size={18} />
          <span>Settings</span>
        </Link>
      </nav>

      <div className="mt-auto border-t border-[#e3e5ec] pt-2">
        <Link
          to={ROUTES.agencyHelp}
          onClick={close}
          className={`${navClass} ${
            helpActive
              ? "bg-primary-subtle font-semibold text-primary"
              : "text-ink hover:bg-subtle"
          }`}
        >
          <CircleHelp size={18} />
          <span>Help centre</span>
        </Link>

        <button
          type="button"
          onClick={() => {
            close?.();
            onLogout();
          }}
          className={`${navClass} text-ink hover:bg-subtle cursor-pointer`}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export function AgencyShell({ children, onAddClient }: AgencyShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white text-[#0d0d10]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block shrink-0 h-full">
        <AgencySidebar
          onLogout={() => setLogoutModalOpen(true)}
          onAddClient={onAddClient}
        />
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex lg:hidden bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="w-[280px] h-full bg-white animate-in slide-in-from-left duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <AgencySidebar
              close={() => setMenuOpen(false)}
              onLogout={() => {
                setMenuOpen(false);
                setLogoutModalOpen(true);
              }}
              onAddClient={onAddClient}
            />
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden bg-[#fbfcfd]">
        {/* Top Bar */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#e3e5ec] bg-white px-4 lg:px-8">
          <div className="flex items-center gap-3 flex-1 max-w-xl">
            <button
              type="button"
              className="lg:hidden p-2 rounded-md text-[#71717a] hover:bg-[#f4f6fb]"
              onClick={() => setMenuOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>

            <div className="relative w-full max-w-md hidden sm:block">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a3a3ac]"
              />
              <input
                type="text"
                placeholder="Search projects, creators, content..."
                className="w-full h-9 pl-9 pr-12 rounded-lg border border-[#e3e5ec] bg-white text-[13px] text-[#0d0d10] placeholder:text-[#a3a3ac] focus:outline-none focus:border-[#0d0d10] transition-colors"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-medium text-[#a3a3ac] bg-[#f4f6fb] border border-[#e3e5ec] rounded px-1.5 py-0.5">
                ⌘K
              </kbd>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="relative p-2 rounded-full text-[#71717a] hover:bg-[#f4f6fb] transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-[#014ef6]" />
            </button>

            <div className="flex items-center gap-2.5 border-l border-[#e3e5ec] pl-4">
              <div className="size-8 rounded-full bg-[#f4f6fb] border border-[#e3e5ec] flex items-center justify-center text-[12px] font-semibold text-[#0d0d10]">
                RV
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-[13px] font-semibold text-[#0d0d10] leading-none">
                  Rahul Verma
                </span>
                <span className="text-[11px] text-[#a3a3ac] leading-tight mt-0.5">
                  Account manager · Brightside
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-subtle/50 px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>

      {/* Logout Modal */}
      <AgencyLogoutModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={() => {
          setLogoutModalOpen(false);
          navigate("/login");
        }}
      />
    </div>
  );
}
