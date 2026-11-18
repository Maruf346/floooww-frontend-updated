import { type ReactNode, useState } from "react";
import {
  Bell,
  ChevronDown,
  CircleHelp,
  ClipboardList,
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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "@/common/components/brand/Logo";
import { ROUTES } from "@/common/constants/routes";
import {
  AgencyWorkspaceSwitcher,
  AGENCY_CLIENTS,
} from "@/agency/components/AgencyWorkspaceSwitcher";
import { AgencyLogoutModal } from "@/agency/components/AgencyLogoutModal";

const projectFilters: [string, string?][] = [
  ["Live", "5"],
  ["Upcoming", "1"],
  ["Completed", "3"],
  ["Drafts", "2"],
  ["Paused"],
  ["Archived"],
  ["Deleted"],
];

function Sidebar({ close, onLogout }: { close?: () => void; onLogout: () => void }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const clientParam = searchParams.get("client");
  const isClientMode = Boolean(clientParam);
  const activeClient =
    AGENCY_CLIENTS.find((c) => c.id === clientParam) || {
      id: "minimalist",
      name: "Minimalist",
    };

  const [projectsOpen, setProjectsOpen] = useState(true);
  const [clientsFolderOpen, setClientsFolderOpen] = useState(true);
  const [clientItemOpen, setClientItemOpen] = useState(true);

  const isNewProject = location.pathname === ROUTES.brandNewProject;
  const isProjects = location.pathname === ROUTES.brandProjects;
  const isCreatorDiscovery = location.pathname === ROUTES.brandCreatorDiscovery;
  const isContentHub = location.pathname === ROUTES.brandContentHub;
  const isPayments = location.pathname === ROUTES.brandPayments;
  const isMessages = location.pathname === ROUTES.brandMessages;
  const isHelp = location.pathname === ROUTES.brandHelp;
  const isSettings = location.pathname === ROUTES.brandSettings;
  const isCustomReports = location.pathname === ROUTES.brandCustomReports;
  const isOverview = location.pathname === ROUTES.brand;
  const closeMenu = () => close?.();

  const topLink = (active: boolean) =>
    active
      ? "bg-primary-subtle font-semibold text-primary"
      : "text-[#0d0d10] hover:bg-subtle transition-colors";

  const clientQuery = isClientMode ? `?client=${activeClient.id}` : "";

  return (
    <aside className="flex h-full w-[260px] flex-col overflow-y-auto border-r border-[#e3e5ec] bg-white px-4 pb-4 pt-5 select-none">
      <div className="flex h-11 items-center justify-between">
        <Logo className="origin-left scale-[1.22]" />
        <button type="button" onClick={closeMenu} className="lg:hidden p-1 rounded-md text-[#71717a] hover:bg-subtle">
          <X size={20} />
        </button>
      </div>

      <div className="h-2 shrink-0" />

      {/* Switcher */}
      {isClientMode ? (
        <AgencyWorkspaceSwitcher mode="client" activeClientId={activeClient.id} />
      ) : (
        <button
          type="button"
          className="flex w-full items-center gap-2.5 rounded-xl border border-[#e3e5ec] p-2.5 text-left hover:border-[#0d0d10] transition-colors cursor-pointer bg-white"
        >
          <span className="grid size-8 place-items-center rounded-lg bg-primary text-[12px] font-semibold text-white shrink-0">
            M
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[14px] font-semibold leading-5 text-[#0d0d10]">
              Minimalist
            </span>
            <span className="block truncate text-[12px] leading-4 text-[#a3a3ac]">
              Brand workspace ▾
            </span>
          </span>
          <ChevronDown size={16} className="text-[#71717a] shrink-0" />
        </button>
      )}

      {/* Navigation */}
      <nav className="mt-3 flex flex-col">
        {isClientMode ? (
          /* Client Mode Navigation (Figma Node 1716:669) */
          <>
            {/* Clients folder header */}
            <div
              onClick={() => setClientsFolderOpen((prev) => !prev)}
              className="flex h-9 w-full items-center justify-between rounded-md px-3 text-[14px] text-[#0d0d10] hover:bg-subtle cursor-pointer transition-colors"
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
                  <Link
                    to={`${ROUTES.brandNewProject}${clientQuery}`}
                    onClick={closeMenu}
                    className={`flex h-8 items-center gap-2.5 rounded-md pl-10 pr-3 text-[13px] transition-colors ${
                      isNewProject
                        ? "font-medium text-primary"
                        : "text-[#71717a] hover:bg-subtle"
                    }`}
                  >
                    <span className="size-1 rounded-full bg-current" />
                    <span>Create new project</span>
                  </Link>
                )}
              </div>
            )}

            {/* Creator discovery */}
            <Link
              to={`${ROUTES.brandCreatorDiscovery}${clientQuery}`}
              onClick={closeMenu}
              className={`mt-0.5 flex h-9 items-center gap-2.5 rounded-md px-3 text-[14px] ${topLink(
                isCreatorDiscovery
              )}`}
            >
              <Search size={18} />
              <span>Creator discovery</span>
            </Link>

            {/* Content hub */}
            <Link
              to={`${ROUTES.brandContentHub}${clientQuery}`}
              onClick={closeMenu}
              className={`flex h-9 items-center gap-2.5 rounded-md px-3 text-[14px] ${topLink(
                isContentHub
              )}`}
            >
              <Image size={18} />
              <span>Content hub</span>
            </Link>

            {/* CONTENT & DATA */}
            <p className="px-3 pb-1.5 pt-4 text-[12px] font-semibold leading-4 tracking-[.06em] text-[#a3a3ac]">
              CONTENT &amp; DATA
            </p>

            {/* Custom reports */}
            <Link
              to={`${ROUTES.brandCustomReports}${clientQuery}`}
              onClick={closeMenu}
              className={`flex h-9 items-center gap-2.5 rounded-md px-3 text-[14px] ${topLink(
                isCustomReports
              )}`}
            >
              <FileBarChart size={18} />
              <span>Custom reports</span>
            </Link>

            {/* ACCOUNT */}
            <p className="px-3 pb-1.5 pt-4 text-[12px] font-semibold leading-4 tracking-[.06em] text-[#a3a3ac]">
              ACCOUNT
            </p>

            {/* Payments */}
            <Link
              to={`${ROUTES.brandPayments}${clientQuery}`}
              onClick={closeMenu}
              className={`flex h-9 items-center gap-2.5 rounded-md px-3 text-[14px] ${topLink(
                isPayments
              )}`}
            >
              <Wallet size={18} />
              <span>Payments</span>
            </Link>

            {/* Messages */}
            <Link
              to={`${ROUTES.brandMessages}${clientQuery}`}
              onClick={closeMenu}
              className={`flex h-9 items-center gap-2.5 rounded-md px-3 text-[14px] ${topLink(
                isMessages
              )}`}
            >
              <MessageSquare size={18} />
              <span>Messages</span>
            </Link>

            {/* Settings */}
            <Link
              to={`${ROUTES.brandSettings}${clientQuery}`}
              onClick={closeMenu}
              className={`flex h-9 items-center gap-2.5 rounded-md px-3 text-[14px] ${topLink(
                isSettings
              )}`}
            >
              <Settings size={18} />
              <span>Settings</span>
            </Link>
          </>
        ) : (
          /* Standard Brand Mode Navigation */
          <>
            <p className="px-3 pb-1.5 pt-4 text-[12px] font-semibold leading-4 tracking-[.06em] text-tertiary">
              MAIN
            </p>
            <Link
              to={ROUTES.brand}
              onClick={closeMenu}
              className={
                "flex h-9 items-center gap-2.5 rounded-md px-3 text-[14px] " + topLink(isOverview)
              }
            >
              <Home size={18} />
              <span>Overview</span>
            </Link>
            <div className="mt-0.5">
              <button
                type="button"
                onClick={() => setProjectsOpen((isOpen) => !isOpen)}
                aria-expanded={projectsOpen}
                aria-controls="brand-projects-menu"
                className="flex h-9 w-full items-center gap-2.5 rounded-md px-3 text-left text-[14px] font-normal leading-[22px] text-ink transition-colors hover:bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 cursor-pointer"
              >
                <ClipboardList size={18} />
                <span className="flex-1">Projects</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    projectsOpen ? "" : "-rotate-90"
                  }`}
                />
              </button>
              {projectsOpen && (
                <div id="brand-projects-menu">
                  <Link
                    to={ROUTES.brandNewProject}
                    onClick={closeMenu}
                    className={
                      isNewProject
                        ? "flex h-8 items-center gap-2.5 rounded-md px-3 pl-10 text-[13px] font-medium text-primary"
                        : "flex h-8 items-center gap-2.5 rounded-md px-3 pl-10 text-[13px] text-secondary hover:bg-subtle"
                    }
                  >
                    <span className="size-1 rounded-full bg-current" />
                    Create new project
                  </Link>
                  <Link
                    to={ROUTES.brandProjects}
                    onClick={closeMenu}
                    className={
                      isProjects && !location.search
                        ? "flex h-8 items-center gap-2.5 rounded-md px-3 pl-10 text-[13px] font-medium text-primary"
                        : "flex h-8 items-center gap-2.5 rounded-md px-3 pl-10 text-[13px] text-secondary hover:bg-subtle"
                    }
                  >
                    <span className="size-1 rounded-full bg-current" />
                    <span className="flex-1">All projects</span>
                    <Count value="11" />
                  </Link>
                  {projectFilters.map(([label, count]) => (
                    <Link
                      to={`${ROUTES.brandProjects}?status=${encodeURIComponent(label)}`}
                      onClick={closeMenu}
                      key={label}
                      className={
                        location.pathname === ROUTES.brandProjects &&
                        new URLSearchParams(location.search).get("status") === label
                          ? "flex h-8 items-center gap-2.5 rounded-md px-3 pl-[58px] text-[13px] font-medium text-primary"
                          : "flex h-8 items-center gap-2.5 rounded-md px-3 pl-[58px] text-[13px] text-secondary hover:bg-subtle"
                      }
                    >
                      <span className="size-1 rounded-full bg-current" />
                      <span className="flex-1">{label}</span>
                      {count && <Count value={count} />}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              to={ROUTES.brandCreatorDiscovery}
              onClick={closeMenu}
              className={
                "mt-0.5 flex h-9 w-full items-center gap-2.5 rounded-md px-3 text-left text-[14px] " +
                topLink(isCreatorDiscovery)
              }
            >
              <Search size={18} />
              <span>Creator discovery</span>
            </Link>
            <Link
              to={ROUTES.brandContentHub}
              onClick={closeMenu}
              className={
                "flex h-9 w-full items-center gap-2.5 rounded-md px-3 text-left text-[14px] " +
                topLink(isContentHub)
              }
            >
              <Image size={18} />
              <span className="flex-1">Content hub</span>
              <Count active={isContentHub} value="7" />
            </Link>
            <p className="px-3 pb-1.5 pt-4 text-[12px] font-semibold leading-4 tracking-[.06em] text-tertiary">
              CONTENT &amp; DATA
            </p>
            <Link
              to={ROUTES.brandCustomReports}
              onClick={closeMenu}
              className={
                "flex h-9 w-full items-center gap-2.5 rounded-md px-3 text-left text-[14px] " +
                topLink(isCustomReports)
              }
            >
              <FileBarChart size={18} />
              Custom reports
            </Link>
            <p className="px-3 pb-1.5 pt-4 text-[12px] font-semibold leading-4 tracking-[.06em] text-tertiary">
              ACCOUNT
            </p>
            <Link
              to={ROUTES.brandPayments}
              onClick={closeMenu}
              className={
                "flex h-9 w-full items-center gap-2.5 rounded-md px-3 text-left text-[14px] " +
                topLink(isPayments)
              }
            >
              <Wallet size={18} />
              <span className="flex-1">Payments</span>
              <Count active={isPayments} value="2" />
            </Link>
            <Link
              to={ROUTES.brandMessages}
              onClick={closeMenu}
              className={
                "flex h-9 w-full items-center gap-2.5 rounded-md px-3 text-left text-[14px] " +
                topLink(isMessages)
              }
            >
              <MessageSquare size={18} />
              <span className="flex-1">Messages</span>
              <Count active={isMessages} value="4" />
            </Link>
            <Link
              to={ROUTES.brandSettings}
              onClick={closeMenu}
              className={
                "flex h-9 w-full items-center gap-2.5 rounded-md px-3 text-left text-[14px] " +
                topLink(isSettings)
              }
            >
              <Settings size={18} />
              Settings
            </Link>
          </>
        )}
      </nav>

      <div className="mt-auto border-t border-[#e3e5ec] pt-2">
        <Link
          to={`${ROUTES.brandHelp}${clientQuery}`}
          onClick={closeMenu}
          className={
            "flex h-9 w-full items-center gap-2.5 rounded-md px-3 text-[14px] " + topLink(isHelp)
          }
        >
          <CircleHelp size={18} />
          Help centre
        </Link>
        <button
          type="button"
          onClick={() => {
            closeMenu();
            onLogout();
          }}
          className="flex h-9 w-full items-center gap-2.5 px-3 text-[14px] text-[#0d0d10] hover:bg-subtle rounded-md transition-colors cursor-pointer"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

function CollapsedSidebar({ onLogout }: { onLogout: () => void }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const clientParam = searchParams.get("client");
  const clientQuery = clientParam ? `?client=${clientParam}` : "";

  const iconLinks = [
    [`${ROUTES.brand}${clientQuery}`, "Overview", Home],
    [`${ROUTES.brandProjects}${clientQuery}`, "Projects", ClipboardList],
    [`${ROUTES.brandCreatorDiscovery}${clientQuery}`, "Creator discovery", Search],
    [`${ROUTES.brandContentHub}${clientQuery}`, "Content hub", Image],
    [`${ROUTES.brandCustomReports}${clientQuery}`, "Custom reports", FileBarChart],
    [`${ROUTES.brandPayments}${clientQuery}`, "Payments", Wallet],
    [`${ROUTES.brandMessages}${clientQuery}`, "Messages", MessageSquare],
    [`${ROUTES.brandSettings}${clientQuery}`, "Settings", Settings],
    [`${ROUTES.brandHelp}${clientQuery}`, "Help centre", CircleHelp],
  ] as const;

  return (
    <aside className="flex h-full w-16 flex-col items-center border-r border-[#e3e5ec] bg-white py-5">
      <Link
        aria-label="Kreyio home"
        className="flex h-11 items-center justify-center [&>img:last-child]:hidden"
        to={ROUTES.brand}
      >
        <Logo />
      </Link>
      <nav className="mt-5 flex w-full flex-col items-center gap-2">
        {iconLinks.map(([to, label, Icon]) => {
          const active = location.pathname === to.split("?")[0];
          const classes =
            "grid size-10 place-items-center rounded-[10px] transition " +
            (active
              ? "bg-primary-subtle text-primary"
              : "text-secondary hover:bg-subtle hover:text-ink");
          return to.startsWith("#") ? (
            <button aria-label={label} className={classes} key={label} title={label} type="button">
              <Icon size={18} />
            </button>
          ) : (
            <Link aria-label={label} className={classes} key={label} title={label} to={to}>
              <Icon size={18} />
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto flex w-full flex-col items-center gap-2 border-t border-[#e3e5ec] pt-2">
        <Link
          to={`${ROUTES.brandHelp}${clientQuery}`}
          aria-label="Help centre"
          className={`grid size-10 place-items-center rounded-[10px] ${
            location.pathname === ROUTES.brandHelp
              ? "bg-primary-subtle text-primary"
              : "text-secondary hover:bg-subtle hover:text-ink"
          }`}
          title="Help centre"
        >
          <CircleHelp size={18} />
        </Link>
        <button
          aria-label="Logout"
          onClick={onLogout}
          className="grid size-10 place-items-center rounded-[10px] text-secondary hover:bg-subtle hover:text-ink cursor-pointer"
          title="Logout"
          type="button"
        >
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
}

function LogoutConfirmDialog({ close, confirm }: { close: () => void; confirm: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[70] grid place-items-center bg-[#070b13]/40 p-4"
      role="presentation"
      onMouseDown={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-dialog-title"
        onMouseDown={(event) => event.stopPropagation()}
        className="w-full max-w-[420px] rounded-2xl bg-white p-7 shadow-[0_12px_32px_rgba(0,0,0,.12)]"
      >
        <h2 id="logout-dialog-title" className="text-[16px] font-semibold leading-6 text-ink">
          Log out of Kreyio?
        </h2>
        <p className="mt-3 text-[13px] leading-5 text-secondary">
          You’ll need to log in again to see Minimalist. Drafts are saved.
        </p>
        <div className="mt-3.5 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={close}
            className="h-10 rounded-lg border border-line px-4 text-[14px] font-medium leading-5 text-ink hover:bg-subtle cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={confirm}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#dc2626] px-4 text-[14px] font-medium leading-5 text-white transition hover:bg-[#b91c1c] cursor-pointer"
          >
            <LogOut size={16} />
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

function Count({ value, active = false }: { value: string; active?: boolean }) {
  return (
    <span
      className={`inline-flex h-[18px] items-center rounded-full px-1.5 text-[12px] font-medium leading-4 ${
        active ? "bg-primary-muted text-primary" : "bg-muted text-secondary"
      }`}
    >
      {value}
    </span>
  );
}

function Topbar({ open, isClientMode }: { open: () => void; isClientMode?: boolean }) {
  return (
    <header className="flex h-16 items-center gap-3 border-b border-[#e3e5ec] bg-white px-4 sm:px-8">
      <button type="button" onClick={open} className="lg:hidden p-1 rounded-md text-[#71717a] hover:bg-subtle">
        <Menu size={20} />
      </button>
      <div className="hidden h-9 w-[380px] items-center gap-2 rounded-md border border-[#e3e5ec] bg-subtle px-3 md:flex">
        <Search size={16} className="text-[#a3a3ac]" />
        <span className="flex-1 text-[13px] text-tertiary">
          Search projects, creators, content...
        </span>
        <kbd className="rounded border border-[#e3e5ec] bg-white px-1.5 py-0.5 text-[12px] text-tertiary">
          ⌘K
        </kbd>
      </div>
      <div className="flex-1" />
      <button
        type="button"
        className="flex size-9 items-center justify-center rounded-md border border-[#e3e5ec] text-[#0d0d10] hover:bg-subtle transition-colors cursor-pointer"
        aria-label="Notifications"
      >
        <Bell size={18} />
      </button>

      {isClientMode ? (
        /* Top bar Account for Agency acting on client (Figma Node 1716:671) */
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-full bg-[#e3e9ff] text-[12px] font-medium text-[#0d0d10]">
            RV
          </span>
          <div className="hidden sm:block">
            <p className="text-[14px] font-semibold leading-5 text-[#0d0d10]">Rahul Verma</p>
            <p className="text-[12px] leading-4 text-[#a3a3ac]">Account manager · Brightside</p>
          </div>
        </div>
      ) : (
        /* Standard Brand Top bar Account */
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-full bg-primary-muted text-[12px] font-medium text-primary">
            AM
          </span>
          <div className="hidden sm:block">
            <p className="text-[14px] font-semibold leading-5 text-[#0d0d10]">Ananya Mehta</p>
            <p className="text-[12px] leading-4 text-tertiary">Owner · Minimalist</p>
          </div>
        </div>
      )}
    </header>
  );
}

export function BrandShell({
  children,
  compactSidebar = false,
  hideChat = false,
}: {
  children: ReactNode;
  compactSidebar?: boolean;
  hideChat?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isClientMode = Boolean(searchParams.get("client"));

  const navigate = useNavigate();
  const logOut = () => {
    setLogoutOpen(false);
    navigate(isClientMode ? ROUTES.agency : ROUTES.login);
  };

  return (
    <div className="min-h-dvh bg-page">
      <div className="flex min-h-dvh">
        <div className="sticky top-0 hidden h-dvh shrink-0 self-start lg:block">
          {compactSidebar ? (
            <CollapsedSidebar onLogout={() => setLogoutOpen(true)} />
          ) : (
            <Sidebar onLogout={() => setLogoutOpen(true)} />
          )}
        </div>
        {open && (
          <div className="fixed inset-0 z-50 bg-ink/30 lg:hidden">
            <div className="h-full w-[260px] bg-white">
              <Sidebar close={() => setOpen(false)} onLogout={() => setLogoutOpen(true)} />
            </div>
          </div>
        )}
        <div className="min-w-0 flex-1">
          <Topbar open={() => setOpen(true)} isClientMode={isClientMode} />
          <main
            className={
              "min-h-[calc(100dvh-64px)] p-5 " + (compactSidebar ? "sm:px-8 sm:py-5" : "sm:p-8")
            }
          >
            {children}
          </main>
        </div>
      </div>
      {logoutOpen && (
        isClientMode ? (
          <AgencyLogoutModal
            isOpen={logoutOpen}
            onClose={() => setLogoutOpen(false)}
            onConfirm={logOut}
          />
        ) : (
          <LogoutConfirmDialog close={() => setLogoutOpen(false)} confirm={logOut} />
        )
      )}
    </div>
  );
}
