import { type ReactNode, useState } from "react";
import {
  Bell,
  ChevronDown,
  CircleHelp,
  FileBarChart,
  Folder,
  Home,
  Image,
  LogOut,
  Menu,
  MessageSquare,
  Search,
  Settings,
  Wallet,
  X,
} from "lucide-react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Logo } from "@/common/components/brand/Logo";
import {
  ROUTES,
  agencyClientNewProjectRoute,
  agencyClientProjectsRoute,
} from "@/common/constants/routes";
import {
  AgencyWorkspaceSwitcher,
  AGENCY_CLIENTS,
} from "./AgencyWorkspaceSwitcher";
import { AgencyLogoutModal } from "./AgencyLogoutModal";

function CountBadge({ count, active = false }: { count: string | number; active?: boolean }) {
  return (
    <span
      className={`inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1.5 text-[11px] font-medium leading-4 ${
        active ? "bg-primary-muted text-primary" : "bg-[#edeff3] text-[#0d0d10]"
      }`}
    >
      {count}
    </span>
  );
}

export function AgencyClientShell({
  children,
  activeClientId,
}: {
  children: ReactNode;
  activeClientId?: string;
}) {
  const params = useParams<{ clientId?: string }>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const clientId = activeClientId || params.clientId || searchParams.get("client") || "minimalist";

  const activeClient =
    AGENCY_CLIENTS.find((c) => c.id === clientId) || {
      id: clientId,
      name: clientId.charAt(0).toUpperCase() + clientId.slice(1),
    };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [clientsFolderOpen, setClientsFolderOpen] = useState(true);
  const [clientItemOpen, setClientItemOpen] = useState(true);
  const [allProjectsOpen, setAllProjectsOpen] = useState(true);

  const navigate = useNavigate();

  const handleLogout = () => {
    setLogoutOpen(false);
    navigate(ROUTES.agency);
  };

  const baseClientUrl = `/agency/client/${clientId}`;
  const isOverview =
    (location.pathname === baseClientUrl ||
      location.pathname === `${baseClientUrl}/` ||
      location.pathname === "/agency/client") &&
    !location.search.includes("tab=");
  const isAllProjects = location.pathname === agencyClientProjectsRoute(clientId);
  const statusParam = searchParams.get("status");

  const navClass = (active: boolean) =>
    `flex h-9 w-full items-center gap-2.5 rounded-md px-3 text-left text-[14px] transition-colors ${
      active
        ? "bg-primary-subtle font-semibold text-primary"
        : "text-[#0d0d10] hover:bg-subtle"
    }`;

  const renderSidebar = (closeMenu?: () => void) => (
    <aside className="flex h-full w-[260px] flex-col overflow-y-auto border-r border-[#e3e5ec] bg-white px-4 pb-4 pt-5 select-none">
      {/* Brand Logo */}
      <div className="flex h-11 items-center justify-between">
        <Logo className="origin-left scale-[1.22]" />
        {closeMenu && (
          <button
            type="button"
            onClick={closeMenu}
            className="lg:hidden p-1 rounded-md text-[#71717a] hover:bg-subtle"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div className="h-2 shrink-0" />

      {/* Workspace Switcher in Client Mode (Figma 1716:394 & 1716:729) */}
      <AgencyWorkspaceSwitcher mode="client" activeClientId={clientId} />

      {/* Navigation (Figma Node 1716:729) */}
      <nav className="mt-3 flex flex-col">
        <p className="px-3 pb-1 text-[12px] font-semibold leading-4 tracking-[.06em] text-[#a3a3ac]">
          MAIN
        </p>

        {/* Overview */}
        <Link
          to={baseClientUrl}
          onClick={closeMenu}
          className={navClass(isOverview)}
        >
          <Home size={18} />
          <span>Overview</span>
        </Link>

        {/* Clients folder header */}
        <div
          onClick={() => setClientsFolderOpen((prev) => !prev)}
          className="mt-0.5 flex h-9 w-full items-center justify-between rounded-md px-3 text-[14px] text-[#0d0d10] hover:bg-subtle cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Folder size={18} className="text-[#0d0d10]" />
            <span className="font-normal">Clients</span>
          </div>
          <ChevronDown
            size={14}
            className={`text-[#71717a] transition-transform duration-200 ${
              clientsFolderOpen ? "" : "-rotate-90"
            }`}
          />
        </div>

        {clientsFolderOpen && (
          <div className="flex flex-col">
            {/* Active Client item (Minimalist) */}
            <div
              onClick={() => setClientItemOpen((prev) => !prev)}
              className="flex h-9 w-full items-center justify-between rounded-md pl-6 pr-3 text-[14px] text-[#0d0d10] hover:bg-subtle cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Folder size={18} className="text-[#0d0d10]" />
                <span className="font-normal">{activeClient.name}</span>
              </div>
              <ChevronDown
                size={14}
                className={`text-[#71717a] transition-transform duration-200 ${
                  clientItemOpen ? "" : "-rotate-90"
                }`}
              />
            </div>

            {clientItemOpen && (
              <div className="flex flex-col space-y-0.5">
                {/* Create new project link */}
                <button
                  type="button"
                  onClick={() => {
                    closeMenu?.();
                    navigate(agencyClientNewProjectRoute(clientId));
                  }}
                  className="flex h-8 items-center gap-2.5 rounded-md pl-10 pr-3 text-[13px] text-[#71717a] hover:bg-subtle transition-colors text-left cursor-pointer"
                >
                  <span className="size-1 rounded-full bg-current" />
                  <span>Create new project</span>
                </button>

                {/* All projects with count 11 */}
                <Link
                  to={agencyClientProjectsRoute(clientId)}
                  onClick={() => {
                    closeMenu?.();
                    setAllProjectsOpen(true);
                  }}
                  className={`flex h-8 items-center justify-between rounded-md pl-10 pr-3 text-[13px] transition-colors cursor-pointer ${
                    isAllProjects && !statusParam
                      ? "bg-primary-subtle font-semibold text-primary"
                      : "text-[#0d0d10] hover:bg-subtle"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="size-1 rounded-full bg-current" />
                    <span>All projects</span>
                  </div>
                  <CountBadge count={11} active={isAllProjects && !statusParam} />
                </Link>

                {allProjectsOpen && (
                  <div className="flex flex-col space-y-0.5 pl-4">
                    {[
                      { label: "Live", count: 5 },
                      { label: "Upcoming", count: 1 },
                      { label: "Completed", count: 3 },
                      { label: "Deleted", count: undefined },
                    ].map(({ label, count }) => {
                      const active = isAllProjects && statusParam === label;
                      return (
                        <Link
                          key={label}
                          to={`${agencyClientProjectsRoute(clientId)}?status=${encodeURIComponent(label)}`}
                          onClick={closeMenu}
                          className={`flex h-7 items-center justify-between rounded-md pl-10 pr-3 text-[12px] transition-colors cursor-pointer ${
                            active
                              ? "font-semibold text-primary"
                              : "text-[#71717a] hover:bg-subtle"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="size-1 rounded-full bg-current" />
                            <span>{label}</span>
                          </div>
                          {count !== undefined && <CountBadge count={count} active={active} />}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Add client button */}
            <button
              type="button"
              onClick={() => {
                closeMenu?.();
                navigate(ROUTES.agencyClientNew);
              }}
              className="flex h-8 items-center gap-2.5 rounded-md pl-6 pr-3 text-[13px] text-[#71717a] hover:bg-subtle transition-colors text-left cursor-pointer"
            >
              <span className="size-1 rounded-full bg-current" />
              <span>+ Add client</span>
            </button>
          </div>
        )}

        {/* Creator discovery */}
        <Link
          to={`${baseClientUrl}?tab=creators`}
          onClick={closeMenu}
          className={`mt-0.5 ${navClass(location.search.includes("tab=creators") || location.pathname.endsWith("/creators"))}`}
        >
          <Search size={18} />
          <span>Creator discovery</span>
        </Link>

        {/* Content hub with badge 7 */}
        <Link
          to={`${baseClientUrl}?tab=content`}
          onClick={closeMenu}
          className={`flex h-9 w-full items-center justify-between rounded-md px-3 text-[14px] transition-colors ${
            location.search.includes("tab=content") || location.pathname.includes("/content")
              ? "bg-primary-subtle font-semibold text-primary"
              : "text-[#0d0d10] hover:bg-subtle"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Image size={18} />
            <span>Content hub</span>
          </div>
          <CountBadge
            count={7}
            active={
              location.search.includes("tab=content") || location.pathname.includes("/content")
            }
          />
        </Link>

        {/* CONTENT & DATA Section */}
        <p className="px-3 pb-1.5 pt-4 text-[12px] font-semibold leading-4 tracking-[.06em] text-[#a3a3ac]">
          CONTENT &amp; DATA
        </p>

        {/* Custom reports */}
        <Link
          to={`${ROUTES.agencyReports}?client=${clientId}`}
          onClick={closeMenu}
          className={navClass(location.pathname.startsWith(ROUTES.agencyReports))}
        >
          <FileBarChart size={18} />
          <span>Custom reports</span>
        </Link>

        {/* ACCOUNT Section */}
        <p className="px-3 pb-1.5 pt-4 text-[12px] font-semibold leading-4 tracking-[.06em] text-[#a3a3ac]">
          ACCOUNT
        </p>

        {/* Payments with badge 2 */}
        <Link
          to={`${baseClientUrl}?tab=payments`}
          onClick={closeMenu}
          className={`flex h-9 w-full items-center justify-between rounded-md px-3 text-[14px] transition-colors ${
            location.search.includes("tab=payments")
              ? "bg-primary-subtle font-semibold text-primary"
              : "text-[#0d0d10] hover:bg-subtle"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Wallet size={18} />
            <span>Payments</span>
          </div>
          <CountBadge count={2} active={location.search.includes("tab=payments")} />
        </Link>

        {/* Messages with badge 4 */}
        <Link
          to={ROUTES.agencyMessages}
          onClick={closeMenu}
          className={`flex h-9 w-full items-center justify-between rounded-md px-3 text-[14px] transition-colors ${
            location.pathname === ROUTES.agencyMessages
              ? "bg-primary-subtle font-semibold text-primary"
              : "text-[#0d0d10] hover:bg-subtle"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <MessageSquare size={18} />
            <span>Messages</span>
          </div>
          <CountBadge count={4} active={location.pathname === ROUTES.agencyMessages} />
        </Link>

        {/* Settings */}
        <Link
          to={ROUTES.agencySettings}
          onClick={closeMenu}
          className={navClass(location.pathname === ROUTES.agencySettings)}
        >
          <Settings size={18} />
          <span>Settings</span>
        </Link>
      </nav>

      {/* Bottom links */}
      <div className="mt-auto border-t border-[#e3e5ec] pt-2">
        <Link
          to={ROUTES.agencyHelp}
          onClick={closeMenu}
          className="flex h-9 w-full items-center gap-2.5 rounded-md px-3 text-[14px] text-[#0d0d10] hover:bg-subtle transition-colors"
        >
          <CircleHelp size={18} />
          Help centre
        </Link>
        <button
          type="button"
          onClick={() => {
            closeMenu?.();
            setLogoutOpen(true);
          }}
          className="flex h-9 w-full items-center gap-2.5 px-3 text-[14px] text-[#0d0d10] hover:bg-subtle rounded-md transition-colors cursor-pointer"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-dvh bg-page">
      <div className="flex min-h-dvh">
        {/* Desktop Sidebar */}
        <div className="sticky top-0 hidden h-dvh shrink-0 self-start lg:block">
          {renderSidebar()}
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-[#0d0d10]/30 lg:hidden">
            <div className="h-full w-[260px] bg-white">
              {renderSidebar(() => setMobileMenuOpen(false))}
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="min-w-0 flex-1">
          {/* Top bar (Figma Node 1716:731) */}
          <header className="flex h-16 items-center gap-3 border-b border-[#e3e5ec] bg-white px-4 sm:px-8">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1 rounded-md text-[#71717a] hover:bg-subtle"
              aria-label="Open navigation"
            >
              <Menu size={20} />
            </button>

            {/* Search Input */}
            <div className="hidden h-9 w-[380px] items-center gap-2 rounded-md border border-[#e3e5ec] bg-[#f4f6fb] px-3 md:flex">
              <Search size={16} className="text-[#a3a3ac]" />
              <span className="flex-1 text-[13px] text-[#a3a3ac]">
                Search projects, creators, content…
              </span>
              <kbd className="rounded border border-[#e3e5ec] bg-white px-1.5 py-0.5 text-[12px] text-[#a3a3ac]">
                ⌘K
              </kbd>
            </div>

            <div className="flex-1" />

            {/* Notifications Button */}
            <button
              type="button"
              className="flex size-9 items-center justify-center rounded-md border border-[#e3e5ec] text-[#0d0d10] hover:bg-subtle transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell size={18} />
            </button>

            {/* Account Manager Profile: Rahul Verma · Brightside */}
            <div className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-full bg-[#e3e9ff] text-[12px] font-medium text-[#0d0d10]">
                RV
              </span>
              <div className="hidden sm:block">
                <p className="text-[14px] font-semibold leading-5 text-[#0d0d10]">Rahul Verma</p>
                <p className="text-[12px] leading-4 text-[#a3a3ac]">Account manager · Brightside</p>
              </div>
            </div>
          </header>

          <main className="min-h-[calc(100dvh-64px)] p-5 sm:p-8">{children}</main>
        </div>
      </div>

      {logoutOpen && (
        <AgencyLogoutModal
          isOpen={logoutOpen}
          onClose={() => setLogoutOpen(false)}
          onConfirm={handleLogout}
        />
      )}
    </div>
  );
}
